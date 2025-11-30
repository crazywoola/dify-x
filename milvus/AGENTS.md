# AGENTS: Project Guide and Directives

Scope: Applies to the entire repository (slides/, docs/, assets/).

## Slides Framework & Format
- Framework: Reveal.js.
- Canvas: 1920×1080 (16:9).
- Plugins: enable notes (speaker view), slide numbers (`c/t`), progress, `transition: fade`.

## Brand, Typography, Tone
- Brand tone: minimal, confident, humanistic; Swiss‑style inspiration.
- Color: Dify Blue `#0033FF` as the primary accent; “DY” in black; use blue for emphasis on key terms.
- Style: abstract gradients, geometric forms, hand‑drawn accents; textures (pencil/pen/brush) allowed subtly.
- Backgrounds: diffused blue gradients with optional abstract light waves; optional random diffused shapes.
- Fonts: English Söhne / Söhne Mono; Chinese/Japanese Mi Sans (fallbacks allowed if not installed). Use larger type than default.

## Assets
- Logo: use `assets/dify-design-kit/dify-logo/dify-logo.svg` in slides.
- Provide alt text for images (e.g., Dify).

## Structure & Content
- Base content source: `context.md` (optimize based on `interview.md`).
- Target audience: use `target_audience.md` to shape tone/content but do not mention audience explicitly in slides.
- Core storyline: RAG spectrum — Naive → Advanced → Agentic; Knowledge Pipeline as the foundation; Dify × Milvus roles.
- Duration: 30 minutes. Aim for ~15 slides for pacing.

## Interview Integration
- Extract high‑impact and controversial viewpoints from `interview.md` (Latent Space × Chroma).
- Translate quotes when surfaced on slides as needed.
- Distribute viewpoints across relevant slides to support arguments (avoid a dedicated quotes page unless explicitly requested).
- When requested, create a single “controversial viewpoints × tension” slide that interprets trade‑offs.

## Knowledge Pipeline (Blog) Integration
- May pull content from “Introducing Knowledge Pipeline” to enrich slides.
- Include: connectors (file/web/API/repo), processing (clean/standardize, parent‑child, tables/code, OCR/multimodal), enrichment (titles/anchors/tags/entities), embeddings (dense + optional sparse), index to Milvus (field mapping/metadata), governance (versioning/rollback, snapshots/backfill, PII, access control).

## Visual & Layout Requirements
- Extract CSS to external files. Keep HTML lean.
- Provide 3 theme variants and keyboard toggles: `1` Swiss, `2` Atelier (diffused gradient), `3` Night.
- Add card‑like slides: subtle 1px border, generous radius, layered “premium” shadows, glass‑like background.
- Layout can be bold: increased type scale, generous spacing.
- Use Dify Blue to emphasize key terms (e.g., via a reusable `.emph` class); bullet markers may inherit accent color.
- Add speaker notes to every slide, including definitions for core terms (e.g., RAG, hybrid recall, re‑rank, Context Rot, Gold Set, Compaction).
- Allow per‑slide diffused gradient overlays via `.accent` class.
- Optional background random shapes: low‑opacity, blurred; keep to small count for performance; throttle on resize.

## Content Rules & Best Practices
- Advanced RAG principles: hybrid recall (~100–300 candidates), always re‑rank before context assembly, respect Context Rot; structured, deduped, diverse context; hard token limits.
- Agentic RAG: query rewriting, multi‑step/cyclic retrieval, tool orchestration.
- Outer loop: cache/cost guardrails, small gold set wired into CI/dashboards, error analysis, memory compaction.
- Dify × Milvus: Milvus = memory base (store/index/retrieve); Dify = memory & application hub (pipeline + orchestration).
- Closing slide: provide standalone final slide with logo + contact info (email/GitHub); remove Q&A mention from the summary slide when this is present.

## Hosting & Repo Structure
- Primary working deck: `slides/` (source of truth during development).
- GitHub Pages: serve from `docs/` with mirrored `index.html`, `styles/`, and minimal `assets/` (logo) to run standalone.
- Provide `README.md` describing usage (open, theme toggles, speaker notes) and GitHub Pages setup instructions.

## Implementation Conventions
- Keep CSS extracted (`slides/styles/*.css`, mirrored in `docs/styles`).
- Theme files: `theme-swiss.css`, `theme-atelier.css`, `theme-night.css`.
- Use `.accent` for slides that need stronger diffused gradients.
- Keep performance in mind: limit random background shapes (~9), blur, throttle on resize.
- Ensure Reveal notes plugin is enabled; maintain slide numbers and progress.

## Don’ts
- Do not mention target audience explicitly in slide content.
- Do not in‑line heavy CSS inside HTML except minimal utility or vendor links.
- Do not change brand colors or logo without explicit instruction.

