# 企业 Agent：从插件治理到生产协作

这是一套 29 页双语 reveal.js 演示文稿。内容以 Dify 插件生态治理提案为基础，并结合 Dify `1.15.0` / `1.16.0` / `1.16.1` 官方发布说明，讨论开放插件怎样进入企业、Agent 怎样从可构建角色走向生产系统，以及 Human / Agent / Workflow / Governance 如何重新分工。

- 中文：`index.html`
- English: `index_en.html`
- 样式：`styles.css`
- 画布：1920 × 1080
- 导航：方向键切页，`S` 打开讲者视图，`Esc` 查看总览

## 内容结构

1. 1–2 页：封面与四章 TOC
2. 3–5 页：风险暴露——三类权限、包污染与 `.difyignore` 根因、六类企业评估
3. 6–12 页：治理证据——风险分级、生命周期、Policy as Code、三层治理、Trust Center、迁移设计与能力成熟度
4. 13–20 页：Agent 系统——三版本演进、系统全景、角色运行包、构建发布、流程生成、Workflow 控制面与 MCP 接口
5. 21–27 页：生产落地——Agent 资产、安全边界、协作可靠性、可观测链、升级清单、管理决策与 30/90/365 行动
6. 28–29 页：结论与图片致谢

## 视觉系统

- 字体：标题与正文使用 `Inter + Noto Sans SC`，标签与证据字段使用 `JetBrains Mono`
- Accent：品牌强调统一使用钴蓝 `--accent: #3157ff`；深色背景使用 `--accent-bright`
- 语义色：成功、提醒、风险分别使用 `--status-positive`、`--status-caution`、`--status-danger`
- 设计变量（Design tokens）：颜色、字体、字号、行高、间距、圆角、边框和阴影统一定义在 `styles.css` 的 `:root`
- 排版：每页先给一句短标题，再用副标题说清完整判断
- 双语字距：`html[lang="zh-CN"]` 使用更自然的中文字面与较宽行距；`html[lang="en"]` 保留适度紧凑的英文 display tracking
- 节奏：氛围图页与高密度系统图页交替；图片约占 35–45%，信息区域约占 55–65%
- 新增版式：四章 TOC、三版本时间线、Agent 系统图、安全网络边界、可靠性修复矩阵、可观测链与生产升级看板

## 中文表达

- 中文版按现场讲述的节奏重写，不逐句对应英文原稿
- 技术词优先使用业内常见说法；产品名和标准缩写保留英文，不再堆叠括号注释
- 标题先给判断，正文补证据；页面文案与讲者备注使用同一套术语

## 主要来源

- 飞书 Wiki：`https://langgenius.feishu.cn/wiki/Eh4lw1YQKiSzMokiEP0coR7XnHc`
- Dify 1.15.0：`https://github.com/langgenius/dify/releases/tag/1.15.0`
- Dify 1.16.0：`https://github.com/langgenius/dify/releases/tag/1.16.0`
- Dify 1.16.1：`https://github.com/langgenius/dify/releases/tag/1.16.1`

1.16.0 官方发布说明的数据库迁移总数在正文与升级指南中表述不一致，因此演示只保留“需要执行迁移”的升级动作，不写精确总数；1.16.1 明确列出的 4 个 additive migrations 则在升级页展示。

图片作者统一列在 Thank You 结尾页，并以低对比度词云呈现。

## 背景图片

- [Ruido 98 — blue and orange abstract light](https://unsplash.com/photos/SytlpdDJ1lk)
- [Asif Aether — blue, white, and orange gradient](https://unsplash.com/photos/4KRfJsZIra0)
- [Sean Sinclair — blue and orange defocused light](https://unsplash.com/photos/2jYK_Bloby4)
- [Darkhan Basshybayev — iridescent abstract texture](https://unsplash.com/photos/o6uvtosEZeo)
- [Pawel Czerwinski — teal abstract layers](https://unsplash.com/photos/ERcQ81KaX9g)
- [Sean Sinclair — rainbow light leak](https://unsplash.com/photos/1xZ0SqLPE4E)
- [Richard Horvath — indigo flowing shapes](https://unsplash.com/photos/_nWaeTF6qo0)
- [Codioful — soft pastel gradient](https://unsplash.com/photos/LeG68PrXA6Y)
