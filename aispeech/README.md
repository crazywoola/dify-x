# Dify × AISPEECH

企业高频痛点的 AI Workflow 解决方案（30+ 页纵向堆叠讲解，含中/英文双版本）。

## 中文
### 查看方式
- 中文：打开 `aispeech/index.html`（Reveal.js deck，支持键盘 ↑/↓ 纵向查看同主题细节）。
- English：打开 `aispeech/index_en.html`（内容完全翻译，结构与中文一致）。
- 主题默认 `aispeech/styles/popart.css`，可切换为 `aispeech/styles/nordic.css`；Reveal 初始化在 `aispeech/scripts/deck.js`。

### 设计与依赖
- Reveal.js 4.5 + Highlight.js + Tailwind CDN + Font Awesome（流程用 HTML div 绘制，不依赖 Mermaid）。
- 品牌色：`#0033ff`；字体优先 Inter / Noto Sans SC / JetBrains Mono。
- 样式与脚本已拆分：`aispeech/styles/*.css`（视觉与组件）、`aispeech/scripts/deck.js`（Tailwind 配色 + Reveal 初始化）。

### 幻灯结构（纵向分层）
- 01 概览：价值公式 → 6 个关键数字 → 社区背书。
- 02 痛点与方法：跨岗重复动作 → Why Now → 从动作到模板的闭环方法论。
- 03 五套工作流：统一骨架 → 场景 1-5（问题/张力/流程/闭环），含法务工作流与 AISPEECH 语音能力。
- 04 平台与治理：Workflow 基座 → 系统/法务集成 → 模板库与资产化 → 可观测与风险对策。
- 05 落地与收益：4 周落地节奏 → ROI 与拆解 → 运营模型。
- 06 Q&A。

### 内容要点
- 把跨岗位重复动作（同步、分析、问答、Bug Intake、会议 PMO）抽象成可复用模板库。
- 每个痛点配套 Dify Workflow：触发 → 清洗/检索 → LLM/工具 → 推送/回执，用卡片 + 图标呈现全链路。
- 治理重点：安全/审计/成本，支持私有化、评测集、模板市场与 Owner 制运营。

## English
### How to view
- Open `aispeech/index.html` for Chinese.
- Open `aispeech/index_en.html` for the English version (fully translated, same structure).
- Default theme: `aispeech/styles/popart.css`; optional: `aispeech/styles/nordic.css`. Reveal init lives in `aispeech/scripts/deck.js`.

### Design & dependencies
- Reveal.js 4.5 + Highlight.js + Tailwind CDN + Font Awesome (flows are HTML divs, no Mermaid).
- Brand color: `#0033ff`; font stack: Inter / Noto Sans SC / JetBrains Mono.
- Styles & scripts: `aispeech/styles/*.css` (visuals & components), `aispeech/scripts/deck.js` (Tailwind config + Reveal init).

### Deck outline (vertical stacks)
- 01 Overview: value formula → 6 key numbers → community proof.
- 02 Pain points & method: cross-role repetition → Why Now → action-to-template methodology.
- 03 Five workflows: common backbone → scenarios 1-5 (problem/tension/flow/loop), incl. legal workflow + AISPEECH speech capability.
- 04 Platform & governance: workflow base → system/legal integration → template library & assetization → observability & risk mitigation.
- 05 Delivery & ROI: 4-week rollout → ROI & decomposition → operating model.
- 06 Q&A.

### Key takeaways
- Abstract repetitive cross-role actions into reusable workflow templates.
- Map each pain point to a Dify workflow: trigger → clean/retrieve → LLM/tools → push/receipt, visualized with cards + icons.
- Governance focus: security/audit/cost, with private deployment, eval sets, template marketplace, and owner-led ops.
