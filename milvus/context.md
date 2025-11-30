RAG 的演进之路：从“状态”到“记忆”

副标题：Dify × Milvus 联合技术分享
演讲者：郑立（Zheng Li），Dify 开源生态负责人
Key Visual：Dify Logo + Milvus 字标（文字呈现即可）

Slide 2: RAG 的真正价值：为 LLM 构建“记忆”

LLM 的“计算” vs “记忆”
- 大模型擅长“计算”（推理），其参数承载的是训练期的“静态知识”。
- RAG 的本质：为 LLM 挂载一个外部的、动态的“记忆”（Memory）。

行业共识（Latent Space × Chroma）：
- “RAG 是一个谱系（Spectrum）”，从简到繁持续演进。

核心问题：
- 我们如何“构建（Build）—管理（Manage）—使用（Use）”这份“记忆”？

[图示建议] 左：LLM（静态知识）；右：外部记忆（动态知识）；中：RAG 总线。

Slide 3: RAG 演进谱系（Agenda）

- Naive RAG（起点）：简易“状态（State）”检索
- Advanced RAG（攻坚）：系统性提升“状态”的质量
- Agentic RAG（智能化）：让“记忆”成为 Agent 的一部分
- Knowledge Pipeline（基石）：高质量“记忆”的生产线

Slide 4: 阶段一 · Naive RAG（简单“状态”检索）

典型流程：Query → Embedding → 向量检索（Milvus）→ Chunks → LLM

主要问题：
- 语义割裂：固定窗口切分导致上下文断裂。
- 检索噪音：召回不相关或次相关片段。
- Lost in the Middle：关键信息被淹没在长上下文中。

结论：能用但不好用，属于“静态、低质量的状态”。

Slide 5: 阶段二 · Advanced RAG（系统性提质）

三条硬原则（结合 Chroma/业界最佳实践）：
1) 混合召回（Hybrid Recall）：向量 + 关键词/正则 + 元数据过滤；候选池 100–300 条足够。
2) 先精排后组装（Re-rank before assemble）：用 Cross-Encoder 或 LLM 精排至 Top 20–40。
3) 尊重“Context Rot”：结构化、紧凑的上下文优于堆满最大窗口。

上下文组装要点：
- 先放指令/System Prompt；去重合并近重复；多样化来源；严格 Token 上限。

Dify 的关键实践：
- 父子文档检索（Parent–Child Retrieval）：命中“子块”，回传“父块”保障上下文完整。
- Reranking（重排序）：Milvus 快速召回 → 精排再喂入模型。

Slide 6: 阶段三 · Agentic RAG（从“状态”到“记忆”）

范式转变：RAG 不再被动，成为 Agent 的主动工具。

Agent 的“记忆”用法：
- 意图识别与查询重写：先把问题问清楚再检索。
- 多步推理与循环检索：基于阶段结果决定下一步取数与行动。

Dify 实践：
- 在 Dify Agent 编排中，将 RAG 作为 Tool 管道化，支持规划→检索→反思→迭代的闭环。

Slide 7: 根基 · Knowledge Pipeline（高质量“记忆”的生产线）

天花板定律：Garbage In, Garbage Out。

以应用为中心的知识管道：
[Ingest]
- 解析 + 分块（领域感知：标题、代码块、表格）
- 富化：标题、锚点、符号、元数据
- 可选：LLM 生成块摘要（代码/API 的 NL gloss）
- 向量嵌入（dense）+ 可选稀疏信号
- 写入 Milvus（文本、向量、元数据）

[Query]
- 第一阶段混合召回：向量 + 词法/正则 + 元数据过滤
- 候选池：约 100–300
- 精排（LLM 或 cross-encoder）→ Top 20–40
- 上下文组装：指令优先、去重合并、多样化、硬性 Token 上限

Slide 8: 外环（Outer Loop）：评估与运营闭环

- 缓存与成本护栏（Guardrails）
- 小规模黄金集（Gold Set）基准：一顿披萨之夜搞定；接入 CI 与看板
- 误差分析：重分块/调过滤/精排 Prompt 调优
- 记忆压缩（Memory/Compaction）：把交互轨迹总结为可检索事实

价值：把“记忆质量”做成工程化与可观测体系。

Slide 9: “一次处理，多处使用”

核心价值：
- 解耦：知识处理与应用研发分离。
- 复用：一个 Milvus 知识库可同时服务多应用（分析 Agent / 客服 / 内部助手）。
- 质量：集中治理“记忆”，统一迭代，持续抬高上层应用上限。

[图示建议] 底：Milvus 知识库；上：多个 Dify 应用共享调用。

Slide 10: Dify × Milvus：各司其职，协同增效

Milvus = 高性能“记忆基座”
- 向量/元数据的存储、索引与高效召回；稳定、可靠、可扩展。

Dify = 智能“记忆与应用中台”
- 角色 1：Knowledge Pipeline → 构建/管理/优化“记忆”（写入 Milvus）
- 角色 2：Application Engine → 编排与使用“记忆”（Advanced/Agentic RAG）

Slide 11: Dify 平台能力（一站式）

- 提示词工程（Prompt）与评测
- 知识管道（父子文档、混合召回、精排）
- Agent 编排（工具化、可视化流程）
- 全生命周期运营（日志、标注、分析、Finetune）

愿景：帮助开发者交付生产级、高质量 AI 应用。

Slide 12: 总结与行动

总结：
- RAG 正从“静态状态”进化为“动态记忆”。
- “记忆”的上限由知识管道与外环评估决定。
- Dify × Milvus 提供端到端的“记忆构建—存储—使用”。

行动：
- GitHub 加入我们（Dify）
- 联系方式：banana@dify.ai
- Q&A

演讲者备注（Speaker Notes）

开场：
- 简短自我介绍与场景设定；抛出“计算 vs 记忆”。

Advanced RAG 强调点：
- 明确“两阶段检索 + 精排优先 + 结构化组装”的基本盘。
- 提醒“Context Rot”：尽量提供结构化上下文而非堆字数。

Outer Loop 提醒：
- 请务必准备一小份黄金集，接入 CI；哪怕 1 晚完成，也能极大提升团队复盘效率。
- 错误分类后，优先从分块策略、过滤规则、精排 Prompt 着手迭代。

Agentic RAG：
- 强调用“查询重写 + 循环检索 + 工具编排”把 RAG 纳入 Agent 的“思考”链。

收束：
- 重申“Dify × Milvus”的角色分工与协同场景；引导关注开源与生态。
