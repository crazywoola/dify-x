# Dify x AISPEECH

企业高频痛点的 AI Workflow 解决方案（35 页纵向堆叠讲解，含中/英文双版本）。

## 查看方式
- 中文：打开 `aispeech/index.html`（Reveal.js deck，支持键盘 ↑/↓ 纵向查看同主题细节）。
- English：打开 `aispeech/index_en.html`（内容完全翻译，结构与中文一致）。
- 若需调整主题或字体，可编辑 `aispeech/styles/nordic.css`；Reveal 初始化在 `aispeech/scripts/deck.js`。

## 设计与依赖
- Reveal.js 4.5 + Highlight.js + Tailwind CDN + Font Awesome 图标（流程用 HTML div 绘制，不依赖 Mermaid）。
- 品牌色：`#0033ff`；字体优先 Söhne / Inter / Noto Sans SC / JetBrains Mono。
- 样式与脚本已拆分：`styles/nordic.css`（视觉与组件）、`scripts/deck.js`（Tailwind 配色 + Reveal 初始化）。

## 幻灯结构（纵向分层）
- 01 现状与共性：Why now → 跨岗重复动作 → 归并场景。
- 02 工作流深潜：5 套场景，每个 2 页（问题 → 开始到结束的 HTML Flow）。
- 03 模板复用：跨岗位矩阵 → 知识资产 → 运营玩法。
- 04 基座与集成：Workflow 编排基座 → 企业系统连接。
- 05 落地与收益：4 周计划 → 可观测 → ROI 指标。
- 06 风险 / FAQ：风险缓解 → 常见疑问。
- 07 行动：首批试点与下一步。

## 内容要点
- 提取跨岗位重复动作（同步、数据整理、问答、Bug Intake、会议 PMO），形成可复用模板库。
- 每个痛点配套 Dify Workflow 流程（触发 → 清洗/检索 → LLM/工具 → 推送/回执），用 HTML 卡片 + 图标描述全链路。
- 治理关注安全/审计/成本，支持私有化、评测集、模板市场、Owner 制运营。
