const runtimeUrl = new URL("../vendor/pyodide/", self.location.href).href;
let runtime;

async function startRuntime() {
  if (!self.loadPyodide) importScripts(`${runtimeUrl}pyodide.js`);
  const python = await loadPyodide({ indexURL: runtimeUrl });
  const response = await fetch("../table_grid.py?v=2");
  if (!response.ok) throw new Error("Could not load Table Grid.");
  python.FS.writeFile("table_grid.py", await response.text());
  await python.runPythonAsync(`
import json
from dataclasses import asdict
from table_grid import expand_table, format_output

def browser_result(source, fill, output_format):
    grid, cells = expand_table(source, fill=fill)
    return json.dumps({
        "output": format_output(grid, cells, output_format),
        "grid": [row[:30] for row in grid[:100]],
        "cells": [asdict(cell) for cell in cells if cell.row < 100 and cell.column < 30],
        "rows": len(grid),
        "columns": len(grid[0]) if grid else 0,
    })
`);
  return python;
}

self.onmessage = async ({ data }) => {
  try {
    runtime ??= await startRuntime();
    runtime.globals.set("html_input", data.source);
    runtime.globals.set("fill_mode", data.fill);
    runtime.globals.set("output_format", data.type);
    const output = runtime.runPython(
      "browser_result(html_input, fill_mode, output_format)"
    );
    self.postMessage({ ready: true, ...JSON.parse(output) });
  } catch (error) {
    const summary = error.message.trim().split("\n").at(-1);
    self.postMessage({ ready: Boolean(runtime), error: summary });
  }
};
