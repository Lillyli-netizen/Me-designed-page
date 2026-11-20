"""Write three tiny, synthetic checkpoints to a new directory."""

import argparse
import json
from pathlib import Path
import struct


def write_shard(path, tensor, truncated=False):
    header = json.dumps({tensor: {"dtype": "F32", "shape": [1], "data_offsets": [0, 4]}}).encode()
    header += b" " * ((-len(header)) % 8)
    payload = struct.pack("<f", 1.0)
    path.write_bytes(len(header).to_bytes(8, "little") + header + (payload[:2] if truncated else payload))


def make_fixture(root):
    root.mkdir()
    for step in (5000, 10000, 15000):
        checkpoint = root / f"global_step_{step}"
        export = checkpoint / "hf_ckpt"
        export.mkdir(parents=True)
        (export / "config.json").write_text('{"model_type":"example"}\n', encoding="utf-8")
        index = {"weight_map": {"left": "model-00001.safetensors", "right": "model-00002.safetensors"}}
        (export / "model.safetensors.index.json").write_text(json.dumps(index), encoding="utf-8")
        write_shard(export / "model-00001.safetensors", "left", truncated=step == 10000)
        if step != 10000:
            write_shard(export / "model-00002.safetensors", "right")
            for part in ("model", "optimizer", "extra_state"):
                state = checkpoint / part
                state.mkdir()
                (state / "example.txt").write_text("Synthetic fixture\n", encoding="utf-8")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("directory", type=Path, help="new output directory")
    args = parser.parse_args()
    make_fixture(args.directory)
