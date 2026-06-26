const iconFor = {
  orchestration: "ri-flow-chart",
  governance: "ri-shield-check-line",
  observability: "ri-radar-line",
  trust: "ri-scales-3-line",
  aws: "ri-cloud-line",
  plugin: "ri-plug-line",
  people: "ri-team-line",
  code: "ri-code-box-line",
  warning: "ri-error-warning-line",
  route: "ri-route-line",
  skill: "ri-booklet-line",
  lock: "ri-lock-password-line",
  graph: "ri-node-tree",
  start: "ri-rocket-line",
  close: "ri-flag-line",
};

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function richText(value) {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

function kicker(slide) {
  const icon = iconFor[slide.icon] || slide.icon || "ri-sparkling-line";
  return `<div class="kicker"><i class="${icon}"></i>${escapeHtml(slide.kicker || "")}</div>`;
}

function notes(slide) {
  return slide.notes ? `<aside class="notes">${escapeHtml(slide.notes)}</aside>` : "";
}

function tileList(items) {
  return `<div class="tiles">${items.map((item) => `
    <div class="tile">
      <i class="${iconFor[item.icon] || item.icon || "ri-checkbox-circle-line"}"></i>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.body)}</p>
    </div>
  `).join("")}</div>`;
}

function riskGrid(items) {
  return `<div class="risk-grid">${items.map((item) => `
    <div class="risk">
      <i class="${iconFor[item.icon] || item.icon || "ri-error-warning-line"}"></i>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.body)}</p>
    </div>
  `).join("")}</div>`;
}

function numbers(items) {
  return `<div class="number-row">${items.map((item) => `
    <div class="number">
      <b>${escapeHtml(item.value)}</b>
      <span>${escapeHtml(item.label)}</span>
    </div>
  `).join("")}</div>`;
}

function flow(items) {
  return `<div class="flow">${items.map((item, index) => `
    <div class="step">
      <b>${String(index + 1).padStart(2, "0")}</b>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.body)}</p>
    </div>
  `).join("")}</div>`;
}

function phases(items) {
  return `<div class="flow">${items.map((item) => `
    <div class="phase">
      <b>${escapeHtml(item.label)}</b>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.body)}</p>
    </div>
  `).join("")}</div>`;
}

function stage(slide) {
  const nodes = (slide.nodes || []).map((row) => `
    <div class="node-row">
      <div class="node"><b>${escapeHtml(row[0].title)}</b><span>${escapeHtml(row[0].body)}</span></div>
      <div class="connector">→</div>
      <div class="node"><b>${escapeHtml(row[1].title)}</b><span>${escapeHtml(row[1].body)}</span></div>
    </div>
  `).join("");
  return `<div class="stage" aria-hidden="true">
    <div class="window-bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
    <div class="canvas">${nodes}</div>
  </div>`;
}

function renderSlide(slide) {
  const cls = slide.blue ? " class=\"blue-slide\"" : "";
  const title = slide.h1 ? `<h1>${richText(slide.h1)}</h1>` : `<h2>${richText(slide.h2)}</h2>`;
  const lead = slide.lead ? `<p class="lead">${richText(slide.lead)}</p>` : "";
  const quote = slide.quote ? `<div class="quote"><div class="q">${richText(slide.quote)}</div><div class="source">${escapeHtml(slide.source || "")}</div></div>` : "";
  const oneLine = slide.oneLine ? `<div class="one-line">${richText(slide.oneLine)}</div>` : "";
  const code = slide.code ? `<div class="code">${richText(slide.code)}</div>` : "";
  const meta = slide.meta ? `<div class="meta">${richText(slide.meta)}</div>` : "";
  const extras = [
    slide.numbers ? numbers(slide.numbers) : "",
    slide.tiles ? tileList(slide.tiles) : "",
    slide.risks ? riskGrid(slide.risks) : "",
    slide.flow ? flow(slide.flow) : "",
    slide.phases ? phases(slide.phases) : "",
    code,
    oneLine,
    quote,
    meta,
  ].join("");

  if (slide.layout === "split") {
    return `<section${cls}><div class="slide wide split">
      <div>${kicker(slide)}${title}${lead}${extras}</div>
      ${stage(slide)}
    </div>${notes(slide)}</section>`;
  }

  if (slide.layout === "split-left-wide") {
    return `<section${cls}><div class="slide wide split-left-wide">
      <div>${kicker(slide)}${title}${lead}${extras}</div>
      <div>${slide.sideCode ? `<div class="code">${richText(slide.sideCode)}</div>` : stage(slide)}</div>
    </div>${notes(slide)}</section>`;
  }

  return `<section${cls}><div class="slide ${slide.wide ? "wide" : ""}">
    ${kicker(slide)}${title}${lead}${extras}
  </div>${notes(slide)}</section>`;
}

function renderDeck(slides) {
  document.getElementById("slides").innerHTML = slides.map(renderSlide).join("");
}
