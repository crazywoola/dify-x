# Dify x PUPU 

## Title

从 Low-Code 到 Pro-Code：程序员如何驾驭 Dify 进行 LLM 应用开发

Speaker: 郑立 Dify 开源生态负责人

## Outline

- **破局 —— 下一代 LLM 应用开发范式**
    - 1.1 现状痛点：碎片化、协作难、工程缺口
    - 1.2 Dify 的技术定位：编排、工程、扩展、可观测
    - **1.3 为什么是现在？**：技术临界点 (Transformer -> GPT-3 -> Dify)
    - **1.4 传统开发 vs LLM 原生开发**：确定性 vs 概率性，单元测试 vs Eval
    - **1.5 Dify 生态全景**：连接模型、基础设施与最终用户

- **融合 —— 打破“低代码”的刻板印象**
    - 2.1 可视化的辩证统一：Low-Code (编程语言) vs Pro-Code (调试视图)
    - 2.2 最佳实践：Visual DSL 处理胶水逻辑，Code Node 处理核心计算
    - 2.3 调试视图：变量快照、Token 成本、Trace 链路
    - **2.4 Prompt Engineering as Code**：版本控制与差异对比
    - **2.5 团队协作机制**：Admin (Infra), Builder (App), Operator (Biz)
    - **2.6 复杂逻辑编排**：循环、迭代与条件判断的可视化

- **扩展 —— 构建你的军火库 (Marketplace & Plugins)**
    - 3.1 Dify Plugin 架构解析：Runtime, Auth, Billing, Packaging
    - 3.2 实战：由浅入深开发一个 Slack Bot Tool
    - **3.3 工具安全与沙箱机制**：Namespace 隔离与资源限制
    - **3.4 进阶：工具逆向调用 Workflow**：Agentic Behavior
    - **3.5 插件市场经济展望**：开发者、平台与企业的价值闭环

- **连接 —— 事件驱动的自动化 (Trigger)**
    - 4.1 Trigger 的本质：从 Passive Response 到 Active Execution
    - 4.2 场景演示：Webhook -> LLM Routing -> Action
    - 4.3 Trigger 类型：Schedule, Plugin, Webhook
    - 4.4 用例矩阵：实时/批量/复杂/标准
    - 4.5 实战：GitHub PR 自动审查
    - **4.6 技术揭秘：高并发事件总线架构**：Redis Broker + Celery Worker
    - **4.7 真实案例：智能客服工单路由**：Email -> Intent -> RAG/Action -> Human Loop

- **洞察 —— 开源社区的极客精神**
    - 5.1 OTEL 全链路追踪：Monkey Patch (Python) & Compile Probe (Go)
    - 5.2 数据库适配的架构解耦：PostgreSQL / MySQL / OceanBase
    - 5.3 质量保障：差异化 Matrix CI/CD
    - 5.4 代码重构：SQL 兼容性抽象
    - **5.5 成本分析与优化**：精细化运营，Token/Storage 成本可视化

- **总结**
    - 进化路径：范式升级 -> 工程护栏 -> 生态扩展 -> 数据透明
    - Call for Action：欢迎提交 PR，参与开源生态建设

## 视觉 & 版式更新

- **UI 风格统一**：采用弥散蓝色主题，Tailwind CSS 重构，与 Dify 品牌色保持一致。
- **内容增强**：每个章节补充 3-4 页深度内容，覆盖技术原理、生态图谱与真实案例。
- **中英同步**：`index.html` 与 `index_en.html` 内容完全对齐。
- **可视化升级**：新增时间轴、架构图、代码窗口、对比表格等多种可视化组件。
