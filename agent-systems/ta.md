# TA Speaker Cheat Sheet — From Autonomous AI to Production-Grade Agent Systems

## Talk at a glance

| # | Section | Slides | Time | Key point to land |
|---|---------|--------|------|-------------------|
| — | Title + Why Now | 1, 1b | 2 min | Gap is engineering, not model quality |
| — | Agenda | 2 | <20 s | Map the journey, don't read it |
| 01 | The Evolution | 3–5 | 3 min | Gen 3 friction = compliance, repeatability, team scale |
| 02 | Human-in-the-Loop | 6–13 | 8 min | HITL is a native node, not a webhook |
| 03 | Agent × Skills | 14–22 | 12 min | Think in SOPs, files, and artifacts — not tool menus |
| 04 | Sandbox & Collab | 23–28 | 10 min | Safe capability + team lifecycle |
| — | Putting It Together | — | 1 min | You don't need all three on day one |
| — | Social Proof + CTA | — | 2 min | Give the audience one concrete next step |
| — | Q&A + Demo | — | 5 min | See demo script below |

**Total: ~38 min + 5 min Q&A**

---

## Opening (Slide 1–1b) — 2 min

**Opening line:**
> "We're at an inflection point — LLMs can now act, not just answer. The question is no longer 'can AI do this?' but 'how do we trust it in production?'"

**Audience check-in (Slide 1b):**
> "Quick show of hands — how many of you have hit at least one of these three walls in the past six months?"

Pause. Scan the room. Then: "That's exactly why we're here."

---

## Part 1 · The Evolution (Slides 3–5) — 3 min

**Bridge into Part 1:**
> "Before we get into the features, let's spend 3 minutes on why the shift to agent systems happened at all."

**Gen 3 punchline (Slide 4):**
> "Gen 3 is where production teams are hitting friction today — not because the models aren't good enough, but because the runtime around them isn't."

**Bridge out of Part 1:**
> "HITL, Skills, Sandbox — each one maps to a real pain point. Let's start with HITL: it's the feature that unlocks regulated deployments on day one."

---

## Part 2 · HITL (Slides 6–13) — 8 min (~2 min/slide)

**Bridge into Part 2 (Slide 6):**
> "HITL in Dify is not an external approval queue with webhooks. It is a first-class node you drop directly into the workflow graph."

**Audience check-in (Slide 7):**
> "Raise your hand if you've ever had to build a custom approval integration for an AI workflow — webhooks, Slack bots, manual email chains..."

**HITL flow (Slide 8) — key line:**
> "The review page IS the job surface. If the reviewer needs to open another system to finish the task, the node design is incomplete."

**Liang story (Slide 12) — narrative arc:**
1. Open: "Liang runs an investment services team. 100+ clients, 40 min of manual work each — that's 67 hours daily."
2. Problem: "They automated report generation. But compliance still needed a human eye before anything financial reached a client."
3. Solution: "Three HITL nodes: after synthesis, on anomalies, before send."
4. Result: "By June, all 100 clients received consistent daily reports."
5. Close with the quote naturally.

**Min story (Slide 13) — key reframe:**
> "That was a compliance story. This one is about HITL as context collection — not just approval."

Jason scenario: workflow notices missing office location, asks via HITL, resumes with the correct Shanghai policy.

Close: "That's not approval — that's collaborative intelligence."

---

## Part 3 · Agent × Skills (Slides 14–22) — 12 min ⚠️ densest section

**Bridge into Part 3 (Slide 14):**
> "HITL handles the human judgment layer. Now let's look at the AI side: making it easier to build, maintain, and hand off."

**Core failure mode (Slide 17):**
> "Teams end up writing conditions like: 'if the output contains the word success, continue.' That is not state management — that is hoping."

**The analogy that makes Skills click (Slide 16):**
> "Skills are to agents what functions are to software: reusable units with explicit inputs and outputs."

**SOP duplication problem (Slide 20):**
> "I've talked to teams with the same three-paragraph playbook copy-pasted into eleven workflows. When policy changes, someone updates eleven files. And they always miss one."

**Memory Extraction (Slide 22) — ★ most novel, allocate 2 full minutes:**

The analogy:
> "Think of RAG as going to the library to look up a book. Memory Extraction is reading the notes you already wrote during this run — no library trip, no vector DB, no cross-session retrieval."

Address cost proactively (teams always ask):
> "The extraction call is lightweight by design — under 1 second and 500 tokens. If it fails, the workflow falls back to the upstream agent's raw text output — it never silently breaks."

**Audience check-in after Slide 22:**
> "Any questions on this before I move on? This is where most 'aha' moments happen — but also where most confusion lives."

---

## Part 4 · Sandbox & Collaboration (Slides 23–28) — 10 min

**Bridge into Part 4 (Slide 23):**
> "We now have agents that reason over SOPs, call skills, and leave structured artifacts. But where does this actually execute — and who owns the workflow once it leaves the builder?"

**Command node punchline (Slide 24):**
> "Models already understand commands, pipes, and file paths from pretraining. You don't need to teach the LLM a custom tool schema — it already knows what ls /bin does."

**POSIX double win (Slide 25):**
> "The runtime becomes simpler for humans AND more legible to LLMs. That's a rare double win."

**Sandbox purpose (Slide 26):**
> "The goal is not to reduce capability. It is to contain it — safe capability inside hard boundaries."

**Collaboration (Slide 28) — closing line:**
> "This is the difference between a team that builds workflows and a team that operates them."

---

## Putting It All Together — ★ most important line in the talk

Say this out loud clearly and slowly:
> "You don't need all three on day one. HITL alone unlocks regulated deployments. Skills alone reduces maintenance debt. Start with whichever pain point is costing you the most right now."

---

## Social Proof (20 s max)

Companies slide:
> "From Series A startups to Fortune 500 — the same three production problems show up regardless of company size."

---

## Next Steps CTA

> "Pick the pain point that's costing you the most and start there. HITL is available right now — drop a Human Input node into any workflow in the latest release."

---

## Q&A + Demo Script

**Demo options (pick one based on audience):**
- **HITL demo**: Show a workflow pausing at a Human Input node, a reviewer editing a variable, and the workflow resuming on the correct branch.
- **Skills canvas**: Show a Skill being invoked from an Agent node, with the structured deliverable surfacing downstream.
- **Memory Extraction**: Show two nodes passing structured context via Memory Extraction rather than text parsing.

**Common questions — prepared answers:**

| Question | Answer |
|----------|--------|
| "How does HITL handle timeouts if a reviewer is unavailable?" | Configurable timeout per node; routes to a fallback branch automatically. |
| "Is Memory Extraction a separate LLM call I pay for?" | Yes, but lightweight — &lt;500 tokens, &lt;1s. Can be disabled with fallback to raw text. |
| "When are Skills generally available?" | Coming soon — follow the GitHub roadmap at langgenius/dify. |
| "Can I use my own sandbox environment?" | Self-hosted: configure the sandbox yourself. Cloud: managed and on by default. |
| "How does this compare to LangGraph?" | LangGraph is a lower-level graph execution library. Dify adds the product layer: visual canvas, HITL nodes, version history, team collaboration, and managed infrastructure. Many teams use both. |
| "What models are supported?" | Any model Dify supports — OpenAI, Anthropic, local via Ollama, and 20+ others. Skills and HITL are model-agnostic. |

---

## Timing safety net

If you're running long:
- Cut Slide 20b (e-commerce example) — the SOP concept is covered by Slide 20.
- Compress Slide 27b (Observability) to 30 s.
- Skip Slide 23b (Collaboration visual) and go straight to Slide 28.

If you have extra time:
- Expand the Liang or Min story with an additional detail.
- Ask the audience: "What's the workflow in your org that would benefit most from a HITL node?" — gets good discussion.
