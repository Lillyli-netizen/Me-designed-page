#!/usr/bin/env python3
"""Inspect LingBot-style checkpoint files and disk headroom without loading weights."""

import argparse
import json
import os
import re
import shutil
import sys
from pathlib import Path

STEP = re.compile(r"global_step_(\d+)\Z")
INDEX_NAME = "model.safetensors.index.json"
GIB = 1024**3
MAX_HEADER = 100_000_000


def read_json(path):
    if path.is_symlink():
        raise ValueError("expected a local file, found a symbolic link")
    with path.open(encoding="utf-8") as stream:
        return json.load(stream)


def check_shard(path):
    """Check payload bounds using the public safetensors header format."""
    if path.is_symlink():
        raise ValueError("expected a local shard, found a symbolic link")
    with path.open("rb") as stream:
        size = os.fstat(stream.fileno()).st_size
        prefix = stream.read(8)
        length = int.from_bytes(prefix, "little")
        if len(prefix) != 8 or length == 0 or length > min(MAX_HEADER, size - 8):
            raise ValueError("invalid or truncated header")
        header = json.loads(stream.read(length))

    if not isinstance(header, dict):
        raise ValueError("header must be a JSON object")
    end = 0
    for name, tensor in header.items():
        if name == "__metadata__":
            continue
        offsets = tensor.get("data_offsets") if isinstance(tensor, dict) else None
        if (
            not isinstance(offsets, list)
            or len(offsets) != 2
            or any(type(offset) is not int for offset in offsets)
            or not (0 <= offsets[0] <= offsets[1])
        ):
            raise ValueError(f"invalid data_offsets for {name}")
        end = max(end, offsets[1])
    if size != 8 + length + end:
        raise ValueError("payload size disagrees with the header")
    return header.keys() - {"__metadata__"}


def check_inference(directory):
    if directory.is_symlink():
        return "issues", ["hf_ckpt is a symbolic link"]
    if not directory.is_dir():
        return "absent", ["hf_ckpt directory is missing"]
    issues = []
    try:
        if not isinstance(read_json(directory / "config.json"), dict):
            raise ValueError("expected a JSON object")
    except (OSError, ValueError) as error:
        issues.append(f"config.json: {error}")

    index = directory / INDEX_NAME
    expected = {}
    try:
        if index.exists():
            metadata = read_json(index)
            mapping = metadata.get("weight_map") if isinstance(metadata, dict) else None
            if not isinstance(mapping, dict) or not mapping:
                raise ValueError("weight_map is missing or empty")
            for tensor, filename in mapping.items():
                if (
                    not isinstance(filename, str)
                    or filename != Path(filename).name
                    or "\\" in filename
                    or not filename.endswith(".safetensors")
                ):
                    raise ValueError(f"unsupported shard filename for {tensor}")
                expected.setdefault(filename, set()).add(tensor)
        elif (directory / "model.safetensors").is_file():
            expected["model.safetensors"] = set()
        else:
            return ("issues", issues) if issues else ("unrecognized", ["no safetensors model or index found"])
    except (OSError, ValueError) as error:
        return "issues", issues + [f"{INDEX_NAME}: {error}"]

    for filename, tensor_names in sorted(expected.items()):
        try:
            actual = check_shard(directory / filename)
            missing = tensor_names - actual
            if missing or not actual:
                raise ValueError(f"{len(missing)} indexed tensors missing" if missing else "no tensor entries")
        except (OSError, ValueError) as error:
            issues.append(f"{filename}: {error}")
    return ("issues", issues) if issues else ("file checks passed", [])


def inspect_checkpoints(root, pinned, next_bytes=None):
    rows = []
    for entry in root.iterdir():
        match = STEP.fullmatch(entry.name)
        if not match or entry.is_symlink() or not entry.is_dir():
            continue
        step = int(match[1])
        files = [p for p in entry.rglob("*") if p.is_file() and not p.is_symlink()]
        size = sum(p.stat().st_size for p in files)
        state_dirs = {p.relative_to(entry).parts[0] for p in files if p.stat().st_size > 0}
        missing_state = sorted({"model", "optimizer", "extra_state"} - state_dirs)
        inference, issues = check_inference(entry / "hf_ckpt")
        rows.append({
            "step": step, "directory": entry.name, "bytes": size, "pinned": step in pinned,
            "missing_state": missing_state, "inference": inference, "issues": issues,
        })
    rows.sort(key=lambda row: row["step"])
    free = shutil.disk_usage(root).free
    return {
        "checkpoints": rows, "free_bytes": free, "next_bytes": next_bytes,
        "additional_saves": free // next_bytes if next_bytes else None,
    }


def print_report(report):
    for row in report["checkpoints"]:
        state = "missing " + ", ".join(row["missing_state"]) if row["missing_state"] else "state files present"
        pinned = " [pinned]" if row["pinned"] else ""
        print(f"step {row['step']:>6}  {row['bytes'] / GIB:8.2f} GiB{pinned}  resume: {state}  |  inference: {row['inference']}")
        for issue in row["issues"]:
            print(f"  - {issue}")
    print(f"Free space: {report['free_bytes'] / GIB:.2f} GiB")
    if report["additional_saves"] is not None:
        print(f"Estimated additional saves: {report['additional_saves']} at {report['next_bytes'] / GIB:g} GiB each")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("root", type=Path, help="directory holding global_step_* directories")
    parser.add_argument("--pin", type=int, action="append", default=[], help="mark a step as a retention reference")
    parser.add_argument("--next-gib", type=float, help="expected size of a future save in GiB")
    parser.add_argument("--json", action="store_true", help="print a machine-readable report")
    args = parser.parse_args()
    next_bytes = None
    if args.next_gib is not None:
        if not (1 / GIB <= args.next_gib < float("inf")):
            parser.error("--next-gib must be finite and at least one byte")
        numerator, denominator = args.next_gib.as_integer_ratio()
        next_bytes = numerator * GIB // denominator
    try:
        report = inspect_checkpoints(args.root, set(args.pin), next_bytes)
    except OSError as error:
        print(f"checkpoint-inspect: {error}", file=sys.stderr)
        return 2
    if args.json:
        print(json.dumps(report, indent=2))
    else:
        print_report(report)
    return 0


if __name__ == "__main__":
    sys.exit(main())
