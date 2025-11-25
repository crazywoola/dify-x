# Dify x PUPU 

## Title

从 Low-Code 到 Pro-Code：程序员如何驾驭 Dify 进行 LLM 应用开发

## Outline

- 破局 —— 下一代 LLM 应用开发范式
    1.1 现状痛点
    1.2 Dify 的技术定位
- 融合 —— 打破“低代码”的刻板印象
    2.1 低代码 vs 高代码的辩证关系
    2.2 程序员的最佳实践
- 扩展 —— 构建你的军火库 (Marketplace & Plugins)
    3.1 Dify Plugin 架构解析
    3.2 实战：由浅入深开发一个 Tool
- 连接 —— 事件驱动的自动化 (Trigger)
    4.1 Trigger 的本质
        从 "Passive Response" (用户问) 到 "Active Execution" (事件触发)
    4.2 场景演示
        Workflow：外部 Webhook 触发 -> Dify 解析 Payload -> 运行 LLM 决策 ->输出结果
- 洞察 —— 开源社区的极客精神
    5.1 让黑盒变透明：OTEL (OpenTelemetry) 全链路追踪
        痛点：LLM 调用链长，Token 消耗不明，延迟难定位
    5.2 数据库适配的架构解耦
        从 PostgreSQL-only 到支持 MySQL
        ORM 层 (SQLAlchemy) 的抽象与迁移挑战
- 总结
    Dify 对程序员的价值：快速原型 -> 生产级 API 的最短路径
    Call for Action：欢迎提交 PR，参与开源生态建设