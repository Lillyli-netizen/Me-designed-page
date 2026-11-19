"""Expand merged HTML table cells and export the result as CSV or JSON."""

import argparse
import csv
import io
import json
import sys
from dataclasses import asdict, dataclass
from html.parser import HTMLParser
from pathlib import Path


@dataclass
class Cell:
    text: str
    kind: str
    rowspan: int
    colspan: int


@dataclass
class Placement:
    row: int
    column: int
    text: str
    kind: str
    rowspan: int
    colspan: int


def span_value(attrs, key, limit, *, allow_zero=False):
    value = (dict(attrs).get(key) or "").strip()
    if not value.isascii() or not value.isdecimal():
        return 1
    digits = value.lstrip("0") or "0"
    number = limit if len(digits) > len(str(limit)) else min(int(digits), limit)
    return number if allow_zero else max(1, number)


class TableParser(HTMLParser):
    """Collect the rows and row groups of each top-level table."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.tables = []
        self.depth = 0
        self.group = None
        self.row = None
        self.cell = None
        self.parts = []
        self.hidden = None

    def close_cell(self):
        if self.cell is not None:
            self.cell.text = " ".join("".join(self.parts).split())
            self.cell = None
            self.parts.clear()

    def close_row(self):
        self.close_cell()
        self.row = None

    def close_group(self):
        self.close_row()
        self.group = None

    def handle_starttag(self, tag, attrs):
        if tag == "table":
            if self.depth == 0:
                self.tables.append([])
            self.depth += 1
        if self.depth != 1:
            return
        if tag in {"thead", "tbody", "tfoot"}:
            self.close_group()
            self.group = []
            self.tables[-1].append(self.group)
        elif tag == "tr":
            self.close_row()
            if self.group is None:
                self.group = []
                self.tables[-1].append(self.group)
            self.row = []
            self.group.append(self.row)
        elif tag in {"th", "td"} and self.row is not None:
            self.close_cell()
            self.cell = Cell(
                text="", kind=tag,
                rowspan=span_value(attrs, "rowspan", 65534, allow_zero=True),
                colspan=span_value(attrs, "colspan", 1000),
            )
            self.row.append(self.cell)
        elif tag in {"script", "style"}:
            self.hidden = tag
        elif tag in {"br", "p", "div", "li"} and self.cell is not None:
            self.parts.append(" ")

    def handle_endtag(self, tag):
        if tag == "table" and self.depth:
            self.depth -= 1
            if self.depth == 0:
                self.close_group()
            return
        if self.depth != 1:
            return
        if tag == self.hidden:
            self.hidden = None
        elif tag in {"td", "th"}:
            self.close_cell()
        elif tag == "tr":
            self.close_row()
        elif tag in {"thead", "tbody", "tfoot"}:
            self.close_group()
        elif tag in {"p", "div", "li"} and self.cell is not None:
            self.parts.append(" ")

    def handle_data(self, data):
        if self.depth == 1 and self.cell is not None and not self.hidden:
            self.parts.append(data)


MAX_GRID_CELLS = 200_000


def expand_table(source, table=1, fill="repeat"):
    parser = TableParser()
    parser.feed(source)
    parser.close()
    parser.close_group()
    if table < 1 or table > len(parser.tables):
        raise ValueError(f"table {table} does not exist ({len(parser.tables)} top-level tables found)")

    groups = parser.tables[table - 1]
    height = sum(map(len, groups))
    if height > MAX_GRID_CELLS:
        raise ValueError(f"table exceeds the {MAX_GRID_CELLS:,}-cell grid limit")

    slots = [{} for _ in range(height)]
    placements = []
    row_offset = 0
    width = 0
    for group in groups:
        for index, cells in enumerate(group):
            row = row_offset + index
            col = 0
            for cell in cells:
                while col in slots[row]:
                    col += 1
                remaining = len(group) - index
                rowspan = min(cell.rowspan or remaining, remaining)
                right_edge = col + cell.colspan
                width = max(width, right_edge)
                if height * width > MAX_GRID_CELLS:
                    raise ValueError(f"table exceeds the {MAX_GRID_CELLS:,}-cell grid limit")
                for target_row in range(row, row + rowspan):
                    for target_col in range(col, right_edge):
                        if target_col in slots[target_row]:
                            raise ValueError(f"overlapping merged cells at row {target_row + 1}, column {target_col + 1}")
                        anchor = target_row == row and target_col == col
                        slots[target_row][target_col] = cell.text if anchor or fill == "repeat" else ""
                placements.append(Placement(row, col, cell.text, cell.kind, rowspan, cell.colspan))
                col = right_edge
        row_offset += len(group)

    grid = [[row.get(col, "") for col in range(width)] for row in slots]
    return grid, placements


def convert(source, table=1, fill="repeat", output_format="csv"):
    grid, placements = expand_table(source, table, fill)
    if output_format == "json":
        return json.dumps(
            {"grid": grid, "cells": [asdict(cell) for cell in placements]},
            ensure_ascii=False,
            indent=2,
        ) + "\n"
    output = io.StringIO(newline="")
    csv.writer(output).writerows(grid)
    return output.getvalue()


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("input", help="UTF-8 HTML file, or - for stdin")
    parser.add_argument("--table", type=int, default=1, help="top-level table number, starting at 1")
    parser.add_argument("--fill", choices=("repeat", "blank"), default="repeat", help="how to fill merged cells")
    parser.add_argument("--format", choices=("csv", "json"), default="csv", help="output format")
    parser.add_argument("-o", "--output", type=Path, help="write to a UTF-8 file instead of stdout")
    args = parser.parse_args(argv)
    try:
        source = (sys.stdin.buffer.read() if args.input == "-" else Path(args.input).read_bytes()).decode("utf-8-sig")
        result = convert(source, args.table, args.fill, args.format)
        if args.output:
            args.output.write_bytes(result.encode("utf-8"))
        else:
            sys.stdout.buffer.write(result.encode("utf-8"))
    except (OSError, ValueError) as error:
        parser.exit(1, f"table-grid: {error}\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
