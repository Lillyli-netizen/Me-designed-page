const example = document.querySelector("#example");
const format = document.querySelector("#format");
const fill = document.querySelector("#fill");
const source = document.querySelector("#source");
const result = document.querySelector("#result");
const resultLabel = document.querySelector("#result-label");
const run = document.querySelector("#run");
const copy = document.querySelector("#copy");
const status = document.querySelector("#status");
let worker;
let ready = false;

async function readExample(path) {
  const response = await fetch(`examples/${path}`);
  if (!response.ok) throw new Error("Could not load the example.");
  return response.text();
}

function showResult(value, type) {
  result.value = value;
  resultLabel.textContent = `${type.toUpperCase()} output`;
  copy.disabled = !value;
}

async function loadExample() {
  const name = example.value;
  const type = name === "experiment" ? "csv" : "json";
  run.disabled = true;
  example.disabled = true;
  try {
    const [html, output] = await Promise.all([
      readExample(`${name}.html`), readExample(`${name}.${type}`),
    ]);
    source.value = html;
    format.value = type;
    fill.value = type === "csv" ? "repeat" : "blank";
    showResult(output, type);
    status.textContent = "Example output loaded. Edit the input or convert it again.";
  } catch (error) {
    status.textContent = error.message;
  } finally {
    run.disabled = false;
    example.disabled = false;
  }
}

function enableConversion() {
  for (const control of [run, example, format, fill]) control.disabled = false;
}

run.addEventListener("click", () => {
  if (source.value.length > 500_000) {
    status.textContent = "Use an HTML input under 500,000 characters in the demo.";
    return;
  }

  for (const control of [run, example, format, fill]) control.disabled = true;
  status.textContent = ready ? "Converting table…" : "Loading the Python runtime. The first run may take a moment.";
  if (!worker) {
    worker = new Worker("assets/worker.js");
    worker.onmessage = ({ data }) => {
      ready = data.ready;
      if (data.error) {
        showResult("", format.value);
        status.textContent = data.error;
      } else {
        showResult(data.output, format.value);
        status.textContent = "Conversion complete.";
      }
      enableConversion();
    };
    worker.onerror = () => {
      worker.terminate();
      worker = undefined;
      ready = false;
      status.textContent = "Could not start the Python runtime. Try again.";
      enableConversion();
    };
  }
  worker.postMessage({ source: source.value, type: format.value, fill: fill.value });
});

copy.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(result.value);
    status.textContent = "Output copied.";
  } catch {
    result.select();
    status.textContent = "Output selected. Use your keyboard to copy it.";
  }
});

example.addEventListener("change", loadExample);
loadExample();
