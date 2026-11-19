const runtimeUrl = new URL("../vendor/pyodide/", self.location.href).href;
let runtime;

async function startRuntime() {
  if (!self.loadPyodide) importScripts(`${runtimeUrl}pyodide.js`);
  const python = await loadPyodide({ indexURL: runtimeUrl });
  const response = await fetch("../table_grid.py");
  if (!response.ok) throw new Error("Could not load Table Grid.");
  python.FS.writeFile("table_grid.py", await response.text());
  await python.runPythonAsync("from table_grid import convert");
  return python;
}

self.onmessage = async ({ data }) => {
  try {
    runtime ??= await startRuntime();
    runtime.globals.set("html_input", data.source);
    runtime.globals.set("fill_mode", data.fill);
    runtime.globals.set("output_format", data.type);
    const output = runtime.runPython(
      "convert(html_input, fill=fill_mode, output_format=output_format)"
    );
    self.postMessage({ ready: true, output });
  } catch (error) {
    const summary = error.message.trim().split("\n").at(-1);
    self.postMessage({ ready: Boolean(runtime), error: summary });
  }
};
