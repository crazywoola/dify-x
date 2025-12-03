# Dify X
Reveal.js deck collection from the Dify team, covering risk control, RAG evolution, low-/pro-code collaboration, and integration demos.

Online:
- CN home: https://crazywoola.github.io/dify-x/
- EN home: https://crazywoola.github.io/dify-x/index_en.html

## Quick start
- Entry point: open `index.html` or `index_en.html` for the card-based navigator.
- Local preview: serve the repo root and visit `http://localhost:8000/index.html`:
  ```bash
  python -m http.server 8000
  ```
- Single decks: open each directory’s `index.html` (CN) or `index_en.html` (EN).

## Repo map
- `assets/`: brand assets (`logo.svg`, `bilibili.png`, `xiaohongshu.png`).
- `ctrip/`: automated risk control deck (CN/EN) plus outline (`ctrip/README.md`).
- `pupu/`: low-to-pro-code developer practice (CN/EN) with slide visuals.
- `milvus/`: RAG evolution + vector DB collaboration deck, shared styles in `milvus/styles/` and notes (`AGENTS.md`, `context.md`, `target_audience.md`).
- `oceanbase/`: Dify × Oceanbase integration guide and sample `docker-compose.yaml`.
- `legalai/`: legal workflow samples (YAML in `legalai/demo/`).

## Decks
- `ctrip/index.html`: automated risk control and adversarial demos (layered defense, attribution, counter-strategy).
- `pupu/index.html`: building with Dify as a developer (plugin architecture, triggers, observability).
- `milvus/index.html`: RAG evolution with vector DB practice (theme switching, context/role docs).
- English versions live in each folder’s `index_en.html`.

## Tech & design
- Slides: Reveal.js with Tailwind/Highlight.js as needed.
- Brand: `#0033ff` (Dify Blue); logo in `assets/logo.svg`.
- Fonts: prefer Söhne / Söhne Mono; fallbacks Inter, JetBrains Mono, Mi Sans / Noto Sans SC / Noto Sans Mono SC.
- Hosting: GitHub Pages (https://crazywoola.github.io/dify-x/).

## Contribute & extend
- Copy any deck directory as a template; tweak theme variables in `milvus/styles/dify-theme.css`.
- PRs and feedback welcome via `banana@dify.ai`.
