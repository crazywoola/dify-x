# Dify x PUPU

从 Low-Code 到 Pro-Code：程序员如何驾驭 Dify 进行 LLM 应用开发  
郑立 · Dify 开源生态负责人

- 演示文稿：`index.html`（中文） / `index_en.html`（EN）

---

## 内容地图（Nordic · 一页版）

```mermaid
flowchart LR
  A[破局<br/>范式与定位] --> B[融合<br/>Low ↔ Pro]
  B --> C[扩展<br/>Plugins & Marketplace]
  C --> D[连接<br/>Trigger 自动化]
  D --> E[洞察<br/>工程与社区]
  E --> F[总结<br/>路径与行动]
```

| 模块 | 你会解决的问题 | 你会带走的东西 |
| --- | --- | --- |
| 破局 | LLM 应用开发为什么“换了范式” | Dify 的定位、生态全景、传统开发 vs LLM 原生开发 |
| 融合 | Low-Code 能否承载工程化 | Visual DSL + Code Node 的分工、调试视图、Prompt 版本化、协作角色 |
| 扩展 | 如何把能力变成可复用“军火库” | 插件架构、工具安全/沙箱、Marketplace 的价值闭环 |
| 连接 | 如何让系统从“被动”变“主动” | Trigger 的事件链路、类型与用例矩阵、PR 审查/工单路由案例 |
| 洞察 | 开源工程如何稳、快、可控 | OTEL、数据库适配解耦、Matrix CI、成本可视化 |

## Trigger（连接）— 用图替代 4.1 / 4.2 的重复描述

```mermaid
flowchart LR
  S[事件源<br/>Webhook / Schedule / Plugin] --> T[Trigger<br/>Active Execution]
  T --> R[LLM Routing<br/>Intent / Context]
  R --> W[Workflow]
  W --> A[Action<br/>Tool / Plugin]
  A --> O[Outcome<br/>回写 / 通知 / 升级]
```

| 维度 | 说明 |
| --- | --- |
| 本质 | 从 Passive Response → Active Execution |
| 最小闭环 | Event → Route → Action → Outcome |
| 类型 | Schedule / Plugin / Webhook |
| 典型用例 | GitHub PR 自动审查、智能客服工单路由 |

## 关键对比（去重版）

| 维度 | 传统开发 | LLM 原生开发 |
| --- | --- | --- |
| 行为 | 确定性（输入 → 输出可预期） | 概率性（需要约束、回归与评估） |
| 质量保障 | 单元测试为主 | Eval / 回归集 + 可观测数据驱动迭代 |
| 调试视角 | 代码与日志 | Trace 链路 + Token 成本 + 变量快照 |

## 视觉与版式（Nordic Minimal）

| 原则 | 落地 |
| --- | --- |
| 低噪声 | 少层级、短句、信息块化（表格/图优先） |
| 强对比 | 黑白灰为底，少量品牌蓝作强调 |
| 留白 | 章节之间留足空行；避免长段落堆叠 |
| 可视化优先 | 时间轴、架构图、对比表、流程图用于替代重复叙述 |
