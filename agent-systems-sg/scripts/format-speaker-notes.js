(function () {
  const palette = {
    heading: "margin:0 0 10px 0;font-size:15px;font-weight:700;color:#10213d;letter-spacing:0.01em;",
    note: "margin:0 0 10px 0;padding:9px 11px;border-left:3px solid #c8d6f3;background:#f8fbff;border-radius:10px;color:#4a5c79;white-space:pre-wrap;line-height:1.55;",
    speech: "margin:0 0 10px 0;padding:11px 13px;border-left:3px solid #245dff;background:#eef4ff;border-radius:10px;color:#10213d;white-space:pre-wrap;line-height:1.6;",
    stage: "margin:0 0 10px 0;padding:9px 11px;border-left:3px solid #0ea5a4;background:#effcf9;border-radius:10px;color:#0f5f67;white-space:pre-wrap;line-height:1.55;",
    chipBase: "display:inline-block;margin:0 0 6px 0;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:0.02em;",
    cue: "background:#dce8ff;color:#1f49c7;",
    stageCue: "background:#ccfbf1;color:#0f766e;",
  };

  function getLocaleLabels() {
    const isZh = /^zh/i.test(document.documentElement.lang || "");
    return isZh
      ? { speak: "口播", stage: "提示" }
      : { speak: "Say", stage: "Focus" };
  }

  function stripMarker(line) {
    return line.replace(/^[-*]\s*/, "").replace(/^[→★]\s*/, "").trim();
  }

  function countQuoteMarks(line) {
    return (line.match(/["“”]/g) || []).length;
  }

  function isHeading(line) {
    const clean = stripMarker(line);
    return clean.length > 0 && clean.length <= 42 && /[:：]$/.test(clean) && countQuoteMarks(clean) === 0;
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

  const _open = window.open;
  window.open = function () {
    const win = _open.apply(this, arguments);

    if (win && arguments[1] === "reveal.js - Notes") {
      setTimeout(function () {
        try {
          const style = win.document.createElement("style");
          style.textContent = [
            "body { background: linear-gradient(180deg, #f8fbff 0%, #edf4ff 100%) !important; color: #10213d !important; font-family: 'IBM Plex Sans', sans-serif !important; }",
            "#speaker-layout { background: transparent !important; }",
            "#current-slide, #speaker-controls { box-shadow: none !important; }",
            "#speaker-controls { top: 0 !important; height: 100% !important; padding: 20px 24px !important; background: rgba(248, 251, 255, 0.95) !important; }",
            "#speaker-controls-notes { font-size: 18px !important; line-height: 1.65 !important; }",
            "#upcoming-slide { display: none !important; }",
            "body[data-speaker-layout='wide'] #current-slide { height: 100% !important; }",
            "body[data-speaker-layout='wide'] #speaker-controls { top: 0 !important; left: 50% !important; width: 50% !important; height: 100% !important; }",
            "body[data-speaker-layout='tall'] #current-slide { height: 100% !important; }",
          ].join("\n");
          win.document.head.appendChild(style);
        } catch (error) {
          void error;
        }
      }, 0);
    }

    return win;
  };
})();
