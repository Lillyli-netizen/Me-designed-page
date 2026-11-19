const example = document.querySelector("#example");
const format = document.querySelector("#format");
const fill = document.querySelector("#fill");
const source = document.querySelector("#source");
const result = document.querySelector("#result");
const resultLabel = document.querySelector("#result-label");
const run = document.querySelector("#run");
const copy = document.querySelector("#copy");
const download = document.querySelector("#download");
const status = document.querySelector("#status");
const preview = document.querySelector("#preview");
const grid = document.querySelector("#grid");
const gridMeta = document.querySelector("#grid-meta");
const gridKey = document.querySelector("#grid-key");
const emptyGrid = document.querySelector("#empty-grid");
const showPreview = document.querySelector("#show-preview");
const showRaw = document.querySelector("#show-raw");
let worker;
let ready = false;
let output = "";
let busy = false;

async function readExample(path) {
  const response = await fetch("examples/" + path);
  if (!response.ok) throw new Error("Could not load the example.");
  return response.text();
}

function showRawOutput(raw) {
  preview.hidden = raw;
  result.hidden = !raw;
  showPreview.setAttribute("aria-pressed", String(!raw));
  showRaw.setAttribute("aria-pressed", String(raw));
}

function renderGrid(rows, cells) {
  const body = document.createElement("tbody");
  const width = rows[0]?.length ?? 0;
  const covered = new Set();
  const headers = new Set();
  for (const cell of cells) {
    const anchor = cell.row * width + cell.column;
    if (cell.kind === "th") headers.add(anchor);
    for (let y = cell.row; y < Math.min(rows.length, cell.row + cell.rowspan); y++) {
      for (let x = cell.column; x < Math.min(width, cell.column + cell.colspan); x++) {
        const position = y * width + x;
        if (position !== anchor) covered.add(position);
      }
    }
  }

  for (const [y, row] of rows.entries()) {
    const tr = body.insertRow();
    for (const [x, value] of row.entries()) {
      const position = y * width + x;
      const td = tr.insertCell();
      td.textContent = value;
      if (headers.has(position)) td.classList.add("source-header");
      if (covered.has(position)) {
        td.classList.add("covered");
        td.title = "Covered by a merged cell";
      }
    }
  }

  grid.replaceChildren(body);
  grid.hidden = !width;
  emptyGrid.hidden = Boolean(width);
  gridKey.hidden = !covered.size;
}

function updateExports() {
  copy.disabled = busy || !output;
  download.disabled = copy.disabled;
}

function setBusy(value) {
  busy = value;
  for (const control of [run, example, format, fill]) control.disabled = value;
  source.readOnly = value;
  updateExports();
}

function showResult(data, type) {
  const label = type.toUpperCase();
  output = data?.output ?? "";
  result.value = output;
  resultLabel.textContent = label + " output";
  download.textContent = "Download " + label;
  renderGrid(data?.grid ?? [], data?.cells ?? []);
  emptyGrid.textContent = data ? "This table has no cells." : "Convert a table to see a preview.";
  gridMeta.textContent = data ? data.rows + " rows · " + data.columns + " columns" : "";
  if (data && (data.rows > data.grid.length || data.columns > (data.grid[0]?.length ?? 0))) {
    gridMeta.textContent += " · Preview limited to 100 rows and 30 columns";
  }
  updateExports();
}

async function loadExample() {
  const name = example.value;
  const type = name === "experiment" ? "csv" : "json";
  setBusy(true);
  status.textContent = "Loading example…";
  try {
    const [html, previewText] = await Promise.all([
      readExample(name + ".html"), readExample(name + ".json"),
    ]);
    const data = JSON.parse(previewText);
    data.output = type === "json" ? previewText : await readExample(name + ".csv");
    data.rows = data.grid.length;
    data.columns = data.grid[0]?.length ?? 0;
    source.value = html;
    format.value = type;
    fill.value = type === "csv" ? "repeat" : "blank";
    showResult(data, type);
    status.textContent = "Example loaded.";
  } catch (error) {
    showResult(null, format.value);
    status.textContent = error.message;
  } finally {
    setBusy(false);
  }
}

function convert() {
  if (busy) return;
  if (source.value.length > 500_000) {
    showResult(null, format.value);
    status.textContent = "Use an HTML input under 500,000 characters in the demo.";
    return;
  }
  setBusy(true);
  status.textContent = ready ? "Converting table…" : "Loading the Python runtime. The first run may take a moment.";
  if (!worker) {
    worker = new Worker("assets/worker.js?v=2");
    worker.onmessage = ({ data }) => {
      ready = data.ready;
      showResult(data.error ? null : data, format.value);
      status.textContent = data.error || "Conversion complete.";
      setBusy(false);
    };
    worker.onerror = () => {
      worker.terminate();
      worker = undefined;
      ready = false;
      showResult(null, format.value);
      status.textContent = "Could not start the Python runtime. Try again.";
      setBusy(false);
    };
  }
  worker.postMessage({ source: source.value, type: format.value, fill: fill.value });
}

run.addEventListener("click", convert);
format.addEventListener("change", convert);
fill.addEventListener("change", convert);
example.addEventListener("change", loadExample);
showPreview.addEventListener("click", () => showRawOutput(false));
showRaw.addEventListener("click", () => showRawOutput(true));
source.addEventListener("input", () => {
  showResult(null, format.value);
  status.textContent = "Input changed. Convert to update the output.";
});

copy.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(output);
    status.textContent = "Output copied.";
  } catch {
    showRawOutput(true);
    result.focus();
    result.select();
    status.textContent = "Output selected. Use your keyboard to copy it.";
  }
});

download.addEventListener("click", () => {
  const type = format.value;
  const mime = type === "csv" ? "text/csv" : "application/json";
  const url = URL.createObjectURL(new Blob([output], { type: mime + ";charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "table-grid." + type;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

loadExample();
