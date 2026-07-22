# 企业 Agent 插件治理实践与协作新模式

这是一套双语 reveal.js 演示文稿。内容以 Dify 插件生态治理提案为基础，并结合 Dify `1.15.0` / `1.16.0` 官方发布说明，讨论开放插件怎样进入企业、怎样长期治理，以及人与 Agent 如何重新分工。

- 中文：`index.html`
- English: `index_en.html`
- 样式：`styles.css`
- 画布：1920 × 1080
- 导航：方向键切页，`S` 打开讲者视图，`Esc` 查看总览

## 内容结构

1. 装上一个插件，等于交出代码运行、数据处理和外部连接三把钥匙
2. 安全、法务、产品、工程、社区、商业六个团队各自关心什么
3. 怎样按 L1/L2/L3 分风险，并把治理贯穿开发、上架、安装和更新
4. 怎样让检查证据走出 CI 日志，成为用户看得懂的可信信息
5. 从 Dify 1.15/1.16 已有能力归纳出的四种协作方式
6. Human / Agent / Workflow / Governance 四类责任如何各归其位

## 视觉系统

- 字体：标题与正文使用 `Inter + Noto Sans SC`，标签与证据字段使用 `JetBrains Mono`
- Accent：品牌强调统一使用钴蓝 `--accent: #3157ff`；深色背景使用 `--accent-bright`
- 语义色：成功、提醒、风险分别使用 `--status-positive`、`--status-caution`、`--status-danger`
- 设计变量（Design tokens）：颜色、字体、字号、行高、间距、圆角、边框和阴影统一定义在 `styles.css` 的 `:root`
- 排版：每页先给一句短标题，再用副标题说清完整判断
- 双语字距：`html[lang="zh-CN"]` 使用更自然的中文字面与较宽行距；`html[lang="en"]` 保留适度紧凑的英文 display tracking

## 中文表达

- 中文版采用适合现场讲述的短句，普通技术词先给中文，再在首次出现时附上英文
- 六处典故分别引自《孟子》《论语》《道德经》和《礼记》，原文之后都紧跟白话解释
- 页面文案与讲者备注使用同一套术语，避免生硬的翻译腔、咨询腔和 AI 套话

## 主要来源

- 飞书 Wiki：`https://langgenius.feishu.cn/wiki/Eh4lw1YQKiSzMokiEP0coR7XnHc`
- Dify 1.15.0：`https://github.com/langgenius/dify/releases/tag/1.15.0`
- Dify 1.16.0：`https://github.com/langgenius/dify/releases/tag/1.16.0`

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
