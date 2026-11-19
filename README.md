# Dify X

Reveal.js deck collection from the Dify team, covering production-grade agent systems, risk control, RAG evolution, low-/pro-code collaboration, and integration demos.

Online:
- Home (bilingual): https://crazywoola.github.io/dify-x/index.html — language follows the visitor's system setting, with an EN / 中文 toggle in the top bar (`?lang=en` / `?lang=zh` override, choice is remembered in `localStorage`).

## Quick start
- Entry point: open `index.html` — the single bilingual navigator. Language is auto-detected from `navigator.languages` (zh → 中文, otherwise EN); the top-bar toggle switches instantly without a reload.
- Local preview: serve the repo root and visit `http://localhost:8000/index.html`:
  ```bash
  python3 -m http.server 8000
  ```
- Single decks: open each directory's `index.html` (CN) or `index_en.html` (EN).

## Repo map
- `marketplace-partners/`: bilingual Dify Marketplace guide for technology partners.
- `index.html`: single bilingual home page (EN / 中文) — the **SIGNAL** redesign: warm-charcoal darkroom palette with bone type and one signal vermilion, Instrument Serif display + JetBrains Mono metadata, full-viewport hero cover (char-mask title, cursor parallax + lamp, particle canvas with click ripples, marquee divider) above a scrolling archive with sticky filter bar and **list / grid dual views** (FLIP-switched, keys `1` / `2`). Codrops-style motion throughout: staggered flip-wave language switch, odometer counters, ⌘K quick-jump overlay, `?` shortcuts help, signal-panel page transition into decks, j/k row navigation, directional row reveals, per-letter hover wave, sweep + tilt + press-feedback hover, magnetic chips and asterisk, elastic language pill, text-roll footer links, velocity-driven marquee with letter wave, live clock, ghost-number parallax, footer letter draw-in. `L` toggles language. Decks live in the `DECKS` array in this file.
- `assets/`: brand assets (`logo.svg`, `bilibili.png`, `xiaohongshu.png`).
- `agent-plugin-governance/`: 29-slide bilingual Enterprise Agent deck on plugin governance and the Dify 1.15 → 1.16.0 → 1.16.1 production path. Also bundles a vendored reveal.js 4.5.0 runtime under `assets/reveal/` that other decks reuse.
- `agent-systems/`: production-grade agent systems deck (CN/EN) covering HITL placement and reviewer UX, explicit node deliverables, SOP-backed Agent × Skills, command-node / POSIX-style sandbox execution, and collaborative workflow development.
- `agent-systems-sg/`: Singapore variant of the agent systems deck, rebuilt as a full-screen reveal.js image deck using 21 slide images and preserved speaker notes. English only.
- `agent-last-mile/`: field-note deck on orchestration, governance, observability, HITL design, and AWS reference architecture. Slides are rendered from `deck.js`, so both `index.html` and `index_en.html` share one `shared.css`.
- `amd-x-dify-hackathon/`: AMD AI DevMaster Hackathon Track 2 deck — orchestrating a private agent with Dify while running inference locally on AMD Radeon via Lemonade. Chinese and English speaker scripts in `speaker-notes.md` / `speaker-notes-en.md`, demo launch plan in `assets/demo-launch-plan-*.md`.
- `aispeech/`: AI workflow solutions for AISPEECH (CN/EN) with vertical stacks and shared `styles/nordic.css` + `styles/popart.css`.
- `ctrip/`: automated risk control deck (CN/EN) plus outline (`ctrip/README.md`).
- `dentsply/`: digital dentistry deck (CN/EN) covering triage, ortho, lab, and claims.
- `enterprise-agent-campus/`: 45-minute bilingual campus lecture on Agent product forms and scenario fit, built on an editorial grid. See `README.md` and `source-map.md`.
- `hongkong-oss/`: Dify 101 workshop deck (CN/EN) split into two 30-min sessions, plus a hands-on `GUIDE.md`. Session 1 covers Dify platform overview (Visual Orchestration, Knowledge Base, Plugin Ecosystem, Observability, HITL, Skills, Triggers), Workflow core, Knowledge/RAG, and production essentials; Session 2 covers Code Node, low-code vs pro-code, plugin ecosystem deep dive, optional advanced topics (RAG eval, Agent architecture, guardrails), and hands-on projects (Apple Watch workflow, GDPR chatbot). Schedule: 15:10–15:40 S1 / break / 15:50–16:20 S2.
- `legalai/`: legal workflow samples (YAML in `legalai/demo/`). No deck of its own.
- `milvus/`: RAG evolution + vector DB collaboration deck (CN/EN) with three switchable themes (Swiss / Atelier / Ukiyo) and notes in `AGENTS.md`, `context.md`, `target_audience.md`.
- `oceanbase/`: Dify × Oceanbase integration guide and sample `docker-compose.yaml`.
- `osmo-banana/`: 12-minute demo deck on a local-first Mac screen recording workbench.
- `paypal/`: payment risk control deck (CN/EN) covering auth rate defense, ATO, and dispute-abuse playbooks.
- `pupu/`: low-to-pro-code developer practice (CN/EN) with slide visuals.
- `stripe-agent-workshop/`: bilingual 45-minute workshop "From Scenario to System" — Agent product forms plus the Dify Workflow Generator pipeline. See `README.md` and `source-map.md`; `starter/stripe-billing/` holds an unrelated Stripe Sandbox skill kept for reference.

## Decks
- [Marketplace partner program](marketplace-partners/index_en.html) · [中文](marketplace-partners/index.html) — eight slides on plugins, workflows, RAG and partner engagements.
- `agent-plugin-governance/index.html`: Enterprise Agents from plugin governance to production collaboration — L1/L2/L3 controls, Agent system architecture, sandbox security, observability, upgrade gates, and the Human × Agent × Workflow × Governance operating model.
- `agent-systems/index.html`: production-grade agent systems — HITL review points, explicit deliverables, SOP-driven Skills, command-node / POSIX-style sandbox runtime, and collaborative workflow development.
- `agent-systems-sg/index.html`: full-screen image-based agent systems deck variant for SG, with existing speaker notes retained for presenter mode. No English variant.
- `agent-last-mile/index.html`: Agent deployment field notes — the orchestration, governance, observability, HITL, and AWS reference architecture that bridge demos to production.
- `amd-x-dify-hackathon/index.html`: AMD AI DevMaster Hackathon Track 2 — Dify orchestration plus Lemonade / Radeon local inference, quick starts, live demo, and the agent build loop.
- `aispeech/index.html`: cross-role AI workflows for AISPEECH (sync officer, auto analyst, legal QA, bug intake, meeting PMO, ROI).
- `ctrip/index.html`: automated risk control and adversarial demos (layered defense, attribution, counter-strategy).
- `dentsply/index.html`: digital dentistry (smart triage, ortho monitoring, lab automation, voice perio).
- `enterprise-agent-campus/index.html`: Enterprise Agents: product forms and scenario fit — six product forms, the four questions, and one capability built three ways.
- `hongkong-oss/index.html`: Dify 101 workshop — Session 1 (30 min): platform overview, Workflow, Knowledge/RAG, production essentials; Session 2 (30 min): Code Node, low-code vs pro-code, Plugin Ecosystem, optional deep dives, hands-on projects.
- `milvus/index.html`: RAG evolution with vector DB practice (theme switching, context/role docs).
- `osmo-banana/index.html`: a 12-minute demo on a local-first Mac screen recording workbench (local recording, polished exports, auto zoom, smoothed cursor, webcam cutout, annotations, batch export).
- `paypal/index.html`: payment risk & auth-defense playbook (card testing, ATO, dispute/chargeback abuse mitigation).
- `pupu/index.html`: building with Dify as a developer (plugin architecture, triggers, observability).
- `stripe-agent-workshop/index.html`: From Scenario to System — choosing the Agent product form from the work itself, then the Dify Workflow Generator path from one sentence to an inspectable plan and a runnable graph.
- English versions live in each folder's `index_en.html`, except `agent-systems-sg/` which is English-only.

## Tech & design
- Slides: Reveal.js 4.5.0 across most decks; `ctrip/`, `dentsply/`, and `paypal/` use 5.0.4 and `milvus/` uses 5.x with theme switching. The runtime comes from a CDN except in `agent-plugin-governance/` and `stripe-agent-workshop/`, which reuse the vendored copy at `agent-plugin-governance/assets/reveal/`.
- Design systems: Nordic (`agent-systems/styles.css`), editorial grid (`enterprise-agent-campus/editorial.css` + `editorial-zh.css`, reused by `stripe-agent-workshop/editorial-*.css`), Milvus three-theme set (`milvus/styles/`), Pop Art (`aispeech/styles/`).
- Brand: `#0033ff` (Dify Blue); logo in `assets/logo.svg`.
- Fonts: prefer Söhne / Söhne Mono; fallbacks Inter, JetBrains Mono, Mi Sans / Noto Sans SC / Noto Sans Mono SC.
- Hosting: GitHub Pages (https://crazywoola.github.io/dify-x/).
- Every deck ships a Chinese and an English page with the same slide order and speaker notes (`enterprise-agent-campus` and `stripe-agent-workshop` additionally use `data-slide-id`s). A few decks — `paypal`, `pupu`, `amd-x-dify-hackathon` — differ slightly in slide count between the two languages.

## Contribute & extend
- Use the in-repo skill: `.agents/skills/new-slide-deck/SKILL.md` — it covers theme selection, deck skeletons, and index registration.
- Copy any deck directory as a template; tweak theme variables in `milvus/styles/dify-theme.css`.
- PRs and feedback welcome via `banana@dify.ai`.
