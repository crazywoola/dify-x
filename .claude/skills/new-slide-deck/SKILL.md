---
name: new-slide-deck
description: Create a new reveal.js slide deck for dify-x and register it on the index pages. Use when asked to add a new presentation, create a new deck, or add slides for a new customer/event.
---

# New Slide Deck

This skill creates a new reveal.js presentation inside `/Users/minibanana/Program/dify-x/` and wires it into the navigation index.

## Project Structure

Each deck lives in its own directory at the repo root, e.g. `agent-systems/`. A typical deck contains:

```
<deck-dir>/
  index.html        # Chinese version (lang="zh-CN")
  index_en.html     # English version (lang="en")
  styles.css        # Optional – copy from an existing deck if needed
  assets/           # Images, diagrams
  scripts/          # Optional JS helpers
```

Global shared assets are in `/Users/minibanana/Program/dify-x/assets/` (e.g. `logo.svg`).

## Steps

### 1. Gather info from the user
Ask (or infer from context) before starting:
- **`deck-dir`** – directory name, e.g. `acme` (lowercase, kebab-case)
- **pill label** – e.g. `Dify × Acme` (shown on the index card)
- **ZH title & description** – for `index.html` and the `index.html` card
- **EN title & description** – for `index_en.html` and the `index_en.html` card
- **Slides content** – outline or full slide text

### 2. Create the deck directory and files

Use the `agent-systems` deck as the canonical template. Key patterns:

**HTML skeleton (`index.html`)**
```html
<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>{ZH_TITLE} — Dify</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reset.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/theme/white.css" id="theme">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/highlight/github.css">
    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="../agent-systems/styles.css">
</head>
<body>
    <div class="lang-switch">
        <a class="active" href="index.html">中文</a>
        <span>/</span>
        <a href="index_en.html">EN</a>
    </div>
    <div class="nordic-logo">
        <img src="../assets/logo.svg" alt="Dify" class="nordic-logo-img">
        <span class="nordic-logo-text">{SHORT_LABEL}</span>
    </div>
    <div class="reveal">
        <div class="slides">
            <!-- Slide 1 · Cover -->
            <section data-background-color="#fafafa">
                <div class="slide-hero text-center" style="max-width:860px;">
                    <h1 style="font-size:2.8rem;line-height:1.1;">{ZH_TITLE}</h1>
                    <p class="slide-subtitle" style="margin:1.2rem auto 0;max-width:560px;">{ZH_SUBTITLE}</p>
                    <div style="width:48px;height:3px;background:var(--dify-blue);border-radius:2px;margin:2rem 0 1.5rem;"></div>
                    <div class="author-block" style="align-items:center;margin-top:0;">
                        <div class="author-name">crazywoola（Banana）</div>
                        <div class="author-meta">Developer Relations @ Dify</div>
                        <div class="author-email">banana@dify.ai</div>
                    </div>
                </div>
                <aside class="notes">Speaker notes here.</aside>
            </section>
            <!-- Add more <section> slides here -->
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/dist/reveal.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/notes/notes.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.5.0/plugin/highlight/highlight.js"></script>
    <script>
        Reveal.initialize({
            hash: true,
            plugins: [RevealNotes, RevealHighlight],
            transition: 'fade',
            backgroundTransition: 'fade',
        });
    </script>
</body>
</html>
```

Mirror the same structure for `index_en.html` with `lang="en"` and English content.

### 3. Register the deck in index.html and index_en.html

Append a new `<a class="card">` block **inside** `<div class="deck-grid">` in both `/Users/minibanana/Program/dify-x/index.html` and `index_en.html`.

**Card template:**
```html
        <a class="card" href="{DECK_DIR}/index.html">
          <div class="pill-wrapper"><span class="pill">{PILL_LABEL}</span></div>
          <h3>{ZH_TITLE}</h3>
          <p>{ZH_DESCRIPTION}</p>
          <div class="card-footer">Start Presentation<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div>
        </a>
```

Use `{DECK_DIR}/index_en.html` and EN title/description for the `index_en.html` entry.

Insert before the closing `</div>` of `.deck-grid`.

### 4. Verify

- Confirm the new directory and both HTML files exist.
- Confirm both index pages now contain the new card.
- Remind the user to open the deck in a browser to verify it renders correctly.

## Slide Design Conventions

- Each `<section>` is one slide.
- Vertical stacks use nested `<section>` elements.
- Use `data-background-color="#fafafa"` for light slides, `"#0033ff"` for dark/brand slides.
- Tailwind utility classes are available (`text-center`, `flex`, etc.).
- Speaker notes go in `<aside class="notes">`.
- Images go in `assets/` relative to the deck directory.
- Reference existing decks (`agent-systems`, `milvus`, `pupu`) for advanced layouts.
