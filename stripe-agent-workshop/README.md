# Dify × Stripe Workshop：Workflow Generator，从一句话到一张能跑的图

面向开发者的 20 分钟分享：拆开 Dify Workflow Generator（⌘K → `/create` / `/refine`）的实现——Planner、Builder、Validator 三层设计，以及把它从原型带到生产的三个问题。

## 结构（20 分钟）

| 页 | 内容 | 时间 |
|---|---|---|
| 01 | 封面 · 郑立 · Head of DevRel @ Dify | 0:00–1:00 |
| 02 | Workflow Generator 演示视频（占位，正式视频后补，约 2 分钟） | 1:00–3:00 |
| 03 | 问题的形状：输出是一张要在画布上活下来的图 | 3:00–5:00 |
| 04 | 四段流水线：Tool Router → Planner → Node Builders → Assembler + Validator | 5:00–7:00 |
| 05 | 早期实现：单次全图生成（[PR #31944](https://github.com/langgenius/dify/pull/31944)） | 7:00–8:30 |
| 06 | Planner：先出计划，plan 事件先行 | 8:30–10:00 |
| 07 | Builder：每个节点一次专注调用 | 10:00–11:30 |
| 08 | 问题一 · 工具太多 → 动态注入（[PR #40611](https://github.com/langgenius/dify/pull/40611)） | 11:30–13:30 |
| 09 | 问题二 · 图必须正确展示 → Validator（[PR #32130](https://github.com/langgenius/dify/pull/32130)） | 13:30–15:30 |
| 10 | 问题三 · 生成太慢 → 并行节点构建（[PR #38975](https://github.com/langgenius/dify/pull/38975)） | 15:30–17:00 |
| 11 | 与其他自动生成 DSL 方案的差异 | 17:00–19:00 |
| 12–13 | 结语 + Thank You（图片作者致谢） | 19:00–20:00 |

## 文件

- `index.html`：中文演示稿。
- `index_en.html`：英文演示稿。
- `styles.css`：本 deck 的视觉样式（全覆盖 Unsplash 氛围背景 + 玻璃拟态排版）。
- `starter/`：上一版动手 Workshop 保留的备用 Stripe Skill，与本次分享内容无关。

## 视频占位

第 2 页当前是占位框。正式视频就绪后，把 `assets/workflow-generator-demo.mp4` 放入本目录的 `assets/` 文件夹，并按 `index.html` / `index_en.html` 中占位块旁的注释替换为 `<video>` 标签。

## 背景图片

背景图复用 `../agent-plugin-governance/assets/` 中的 Unsplash 图片（Ruido 98、Reinhart Julian、Pawel Czerwinski、Jakub Żerdzicki、Richard Horvath、Darkhan Basshybayev、Sean Sinclair、Kevin Ache、Asif Aether、Joshua Gandara、Codioful），作者统一列在 Thank You 页。

## 参考 PR

- [PR #31944](https://github.com/langgenius/dify/pull/31944) — 功能早期实现（单次全图生成原型）
- [PR #32130](https://github.com/langgenius/dify/pull/32130) — Validator / Postprocessor：保证生成的图能正确加载
- [PR #38975](https://github.com/langgenius/dify/pull/38975) — 并行节点构建，改善生成性能
- [PR #40611](https://github.com/langgenius/dify/pull/40611) — Tool Router：工具目录动态注入
