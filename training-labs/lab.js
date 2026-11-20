const node = (id) => document.getElementById(id);

async function loadData(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error("Could not load " + path);
  return response.json();
}

function cell(row, type, value) {
  const element = document.createElement(type);
  element.textContent = value;
  row.append(element);
  return element;
}

function renderCheckpoints(rows) {
  const body = node("checkpoints-body");
  for (const summary of rows) {
    const row = body.insertRow();
    const step = cell(row, "th", summary.step.toLocaleString("en"));
    step.scope = "row";
    if (summary.pinned) {
      const pin = document.createElement("span");
      pin.className = "tag";
      pin.textContent = "Pinned";
      step.append(pin);
    }
    cell(row, "td", summary.missing_state.length ? "Missing: " + summary.missing_state.join(", ") : "State files present");
    const inference = cell(row, "td", summary.inference === "issues" ? "Issues found" : "File checks passed");
    if (summary.issues.length) {
      const list = document.createElement("ul");
      for (const issue of summary.issues) cell(list, "li", issue);
      inference.append(list);
    }
  }
  node("disk-load").hidden = true;
}

function estimateCapacity() {
  const free = node("free");
  const next = node("next");
  const output = node("capacity");
  if (!free.value || !next.value || !free.validity.valid || !next.validity.valid) {
    output.textContent = "Enter valid values for free space and space per save.";
    return;
  }
  const saves = Math.floor(free.valueAsNumber / next.valueAsNumber);
  output.textContent = saves === 0
    ? "The next save exceeds the available space."
    : "Estimated additional saves: " + saves.toLocaleString("en") + ".";
}

node("free").addEventListener("input", estimateCapacity);
node("next").addEventListener("input", estimateCapacity);
estimateCapacity();
loadData("checkpoints.json").then(renderCheckpoints).catch((error) => {
  node("disk-load").textContent = error.message;
});

function renderExperiment(data) {
  const selected = data.conditions[Number(node("motion").value)];
  const maximum = Math.max(...data.conditions.flatMap((condition) => condition.offsets.map((point) => point.mean)));
  const bars = node("bars");
  bars.replaceChildren();
  for (const point of selected.offsets) {
    const row = document.createElement("li");
    row.className = "bar-row";
    cell(row, "span", point.frames + (point.frames === 1 ? " frame" : " frames"));
    const track = cell(row, "span", "");
    track.className = "bar-track";
    track.setAttribute("aria-hidden", "true");
    const bar = cell(track, "span", "");
    bar.className = "bar-value";
    bar.style.width = (point.mean / maximum * 100) + "%";
    cell(row, "span", point.mean.toFixed(4) + " ± " + point.sd.toFixed(4)).className = "bar-readout";
    bars.append(row);
  }
  node("motion-note").textContent = selected.correlation
    ? "Adjacent states are generated with correlation 0.9."
    : "Adjacent states are sampled independently.";
  node("experiment-details").textContent = "Mean ± sample standard deviation across " + data.trials + " random seeds. The bar scale is shared across both conditions.";
}

loadData("alignment.json").then((data) => {
  node("motion").disabled = false;
  renderExperiment(data);
  node("motion").addEventListener("change", () => renderExperiment(data));
}).catch((error) => {
  node("experiment-details").textContent = error.message;
});
