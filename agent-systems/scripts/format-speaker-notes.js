(function () {
  const palette = {
    heading: "margin:0 0 10px 0;font-size:15px;font-weight:700;color:#0f172a;",
    note: "margin:0 0 10px 0;padding:8px 10px;border-left:3px solid #cbd5e1;background:#f8fafc;border-radius:8px;color:#475569;white-space:pre-wrap;line-height:1.5;",
    speech: "margin:0 0 10px 0;padding:10px 12px;border-left:3px solid #2563eb;background:#eff6ff;border-radius:8px;color:#0f172a;white-space:pre-wrap;line-height:1.55;",
    stage: "margin:0 0 10px 0;padding:7px 10px;border-left:3px solid #f59e0b;background:#fffbeb;border-radius:8px;color:#92400e;white-space:pre-wrap;line-height:1.5;",
    chipBase: "display:inline-block;margin:0 0 6px 0;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:0.02em;",
    cue: "background:#dbeafe;color:#1d4ed8;",
    stageCue: "background:#fef3c7;color:#92400e;",
  };

  function getLocaleLabels() {
    const isZh = /^zh/i.test(document.documentElement.lang || "");
    return isZh
      ? { speak: "口播", stage: "动作" }
      : { speak: "Say", stage: "Stage" };
  }

  function stripMarker(line) {
    return line.replace(/^[-*]\s*/, "").replace(/^[→★]\s*/, "").trim();
  }

  function countQuoteMarks(line) {
    return (line.match(/["“”]/g) || []).length;
  }

  function isHeading(line) {
    const clean = stripMarker(line);
    return clean.length > 0 && clean.length <= 36 && /[:：]$/.test(clean) && countQuoteMarks(clean) === 0;
  }

  function buildBlock(doc, text, style, cueLabel, cueStyle) {
    const wrapper = doc.createElement("div");

    if (cueLabel) {
      const chip = doc.createElement("div");
      chip.textContent = cueLabel;
      chip.setAttribute("style", palette.chipBase + cueStyle);
      wrapper.appendChild(chip);
    }

    const body = doc.createElement("div");
    body.textContent = text;
    body.setAttribute("style", style);
    wrapper.appendChild(body);

    return wrapper;
  }

  function parseSpeechLine(line) {
    const clean = stripMarker(line);
    if (countQuoteMarks(clean) !== 2) return null;

    const openIndex = clean.search(/["“]/);
    const closeIndex = Math.max(clean.lastIndexOf('"'), clean.lastIndexOf("”"));

    if (openIndex < 0 || closeIndex <= openIndex) return null;

    const prefix = clean.slice(0, openIndex).trim();
    const speech = clean.slice(openIndex + 1, closeIndex).trim();
    const tail = clean.slice(closeIndex + 1).trim();

    if (!speech) return null;

    let cue = "";
    let preface = "";

    if (prefix) {
      const strippedPrefix = prefix.replace(/[:：]\s*$/, "").trim();
      const colonIndex = Math.max(strippedPrefix.lastIndexOf(":"), strippedPrefix.lastIndexOf("："));

      if (colonIndex >= 0) {
        const maybeCue = strippedPrefix.slice(colonIndex + 1).trim();
        const maybePreface = strippedPrefix.slice(0, colonIndex).trim();

        if (maybeCue && maybeCue.length <= 16 && !/[。.!?]/.test(maybeCue)) {
          cue = maybeCue;
          preface = maybePreface;
        } else {
          preface = strippedPrefix;
        }
      } else if (strippedPrefix.length <= 16 && !/[。.!?]/.test(strippedPrefix)) {
        cue = strippedPrefix;
      } else {
        preface = strippedPrefix;
      }

      if (!cue && preface) {
        const trailingCueMatch = preface.match(/^(.*[。.!?])\s*([^。.!?，,;；]{1,16})$/);

        if (trailingCueMatch) {
          preface = trailingCueMatch[1].trim();
          cue = trailingCueMatch[2].trim();
        }
      }
    }

    return { cue, preface, speech, tail };
  }

  function enhanceNote(noteEl) {
    if (noteEl.dataset.enhanced === "true") return;

    const labels = getLocaleLabels();
    const raw = noteEl.textContent.replace(/\r\n?/g, "\n");
    const lines = raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    noteEl.innerHTML = "";

    for (const line of lines) {
      if (isHeading(line)) {
        const heading = document.createElement("div");
        heading.textContent = stripMarker(line).replace(/[:：]\s*$/, "");
        heading.setAttribute("style", palette.heading);
        noteEl.appendChild(heading);
        continue;
      }

      const parsed = parseSpeechLine(line);

      if (parsed) {
        if (parsed.preface) {
          noteEl.appendChild(buildBlock(document, parsed.preface, palette.note));
        }

        noteEl.appendChild(
          buildBlock(
            document,
            parsed.speech,
            palette.speech,
            parsed.cue || labels.speak,
            palette.cue
          )
        );

        if (parsed.tail) {
          noteEl.appendChild(
            buildBlock(document, parsed.tail, palette.stage, labels.stage, palette.stageCue)
          );
        }

        continue;
      }

      noteEl.appendChild(buildBlock(document, stripMarker(line), palette.note));
    }

    noteEl.dataset.enhanced = "true";
  }

  window.SpeakerNotesFormatter = {
    enhance() {
      document.querySelectorAll("aside.notes").forEach(enhanceNote);
    },
  };

  // Hide the upcoming-slide panel in the speaker notes window.
  // The notes plugin writes HTML into an about:blank popup (same-origin),
  // so we can inject CSS after the document.write() completes.
  const _open = window.open;
  window.open = function () {
    const win = _open.apply(this, arguments);
    if (win && arguments[1] === "reveal.js - Notes") {
      setTimeout(function () {
        try {
          const style = win.document.createElement("style");
          style.textContent = [
            /* Hide upcoming slide in every layout */
            "#upcoming-slide { display: none !important; }",

            /* Default: speaker controls expands to fill the freed right column */
            "#speaker-controls { top: 0 !important; height: 100% !important; }",

            /* Wide: current-slide was paired 50%/45% top; make it full-height left half.
               Speaker controls was bottom-full-width; move it to right half, full height. */
            "body[data-speaker-layout='wide'] #current-slide { height: 100% !important; }",
            "body[data-speaker-layout='wide'] #speaker-controls { top: 0 !important; left: 50% !important; width: 50% !important; height: 100% !important; }",

            /* Tall: current-slide was top-left 45%/50%; expand it to full height on the left.
               Speaker controls already covers right column at full height — no change needed. */
            "body[data-speaker-layout='tall'] #current-slide { height: 100% !important; }",
          ].join("\n");
          win.document.head.appendChild(style);
        } catch (e) {
          // cross-origin guard — no-op if somehow blocked
        }
      }, 0);
    }
    return win;
  };
})();
