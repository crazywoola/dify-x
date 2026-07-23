# AMD × Dify Hackathon 演讲备注

## 中文

### 01 · 封面

今天只讲一件事：怎样把一句提示词，做成一个完整、能现场演示的私有智能体。Dify 负责任务规划、知识检索、工具调用和记忆，AMD Radeon 负责运行本地模型。接下来，我们一起看整体架构、Dify 的本地部署方法，以及评委最看重哪些证据。

### 02 · Dify 开源社区

截至准备这次演示时，Dify 的 GitHub 仓库约有十五万 Stars。这个数字背后，是全球开发者对开源智能体平台的持续关注和共同建设。大家可以在一个协作空间里搭建工作流和 RAG 应用，连接模型与工具，再根据需要选择云端、VPC 或私有化部署。认识 Dify 之后，我们回到比赛本身，看看 Track 2 到底看重什么。

### 03 · Track 2

Track 2 的评分重点很明确：六十分看智能体是否完整、是否有实际价值，四十分看 Radeon 和 ROCm 上的本地推理与性能优化。先讲清楚它能替用户完成什么，再展示本地运行方式、优化方法和测量结果。

### 04 · 分工

韩愈在《师说》中说：“术业有专攻。”这套方案也是如此。Dify 负责任务目标、资料、规划、知识检索和工具调用；Radeon 负责运行本地模型。分工清楚，既便于追踪智能体的判断过程，也能让评委一眼看懂 AMD 在项目中发挥了什么作用。

### 05 · 架构

这套流程可以反复使用。任务先进入 Dify，智能体结合私有知识和历史记录制定计划；本地模型服务在 Radeon 上完成推理；Workflow 再调用工具、核对结果，并决定交付、调整还是安全结束。演示时把任务、推理过程、工具操作和运行数据完整展示出来，评委就能一眼看懂系统如何工作。

### 06 · Docker Quick Start

Dify 社区版的最低要求是两核 CPU、四 GiB 内存，并提前安装 Docker 和 Docker Compose。屏幕上的四条命令来自项目 README。容器启动后，打开 localhost/install 完成初始化。这里启动的是智能体的编排服务；Radeon 本地推理仍由独立服务提供，再交给 Dify 调用。

### 07 · Lemonade Quick Start

Lemonade 把 AMD 硬件上的本地模型封装成标准 API，让我们不必直接处理底层推理代码。安装后先运行 lemonade status 检查服务，再用一条 run 命令下载并启动模型；支持的 AMD 显卡可以指定 llama.cpp 的 ROCm 后端。服务默认通过 13305 端口提供 OpenAI-compatible API，现有应用通常只需更换 Base URL。Lemonade 的日志还会显示 TTFT、TPS 和 Token 数，正好可以成为参赛演示中的性能证据。

### 08 · Dify Lemonade 插件

接入 Dify 只需要三步：从 Marketplace 安装 Lemonade 插件，配置模型类型、名称和 Server Endpoint，然后在 Agent 或 Workflow 中选择它。插件不只支持文本生成，也覆盖视觉、结构化输出、Embedding、Rerank、语音转文字和文字转语音。Dify 如果运行在 Docker 里，localhost 指向容器自身，因此要填写容器能够访问的宿主机地址。上下文大小既可以在插件中声明，也可以用 Lemonade 的 ctx_size 统一配置；llama.cpp 后端则可以切换为 ROCm。更多参数以屏幕下方的官方文档和 GitHub 为准。

### 09 · 官方 Workflow

这是 Dify 文档中的 Workflow 示例，并不是最终参赛项目，但方法完全适用：先明确任务和所需资料，再检索知识、调用模型与工具，最后核对结果。换成项目截图时，仍然保留这条从左到右的执行顺序，观众就能跟得上。

### 10 · Workflow 模式

《战国策》说：“行百里者半九十。”调用一次模型只是一项功能，把任务做完才是真本事。先明确目标和权限，查询知识并制定计划，在 Radeon 上完成本地推理，再调用工具、核对结果；达标就交付，遇到问题就补充信息、调整计划或安全结束。现场演示一次异常处理，会比只展示顺利过程更有说服力。

### 11 · Demo Storyboard

这三张图可以直接作为演示顺序。先让观众看到完整的智能体 Workflow，再放大本地推理和工具节点，最后展示任务结果、执行记录与运行数据。项目截图准备好后，只需替换图片，讲述顺序不用改变。

### 12 · 证据

《礼记·中庸》说：“无征不信。”没有证据，就难以让人信服。Track 2 有四十分来自 Radeon 和 ROCm 优化，因此要记录首个 Token 返回时间、每秒生成 Token 数、显存峰值和任务完成率，还要证明模型与数据确实在本地运行。优化前后使用同一任务、模型和上下文，数字才有可比性。参赛项目如果使用 Dify 并获奖，还将额外获得 Dify SaaS Pro 12 个月订阅。

### 13 · 报名

陆游在《冬夜读书示子聿》中写道：“纸上得来终觉浅，绝知此事要躬行。”现在就轮到大家动手了。扫码报名 AMD AI DevMaster Hackathon，选择 Track 2。先找一项适合在本地完成的真实任务，理清智能体如何规划、查询知识、调用工具和处理异常，再展示 Radeon 上的本地推理与优化结果。期待看到大家做出的私有智能体。

## English

### 01 · Cover

Today is about one outcome: turn a prompt into a complete, demonstrable private agent. Dify orchestrates reasoning, planning, tools, and memory. AMD Radeon runs the local model path we can measure and prove. Next, I will show the architecture, the local Dify setup, and the evidence judges need to see.

### 02 · Dify open-source community

At the time this deck was prepared, the Dify repository had about one hundred and fifty thousand GitHub stars. That number reflects a global developer community building an open-source platform for agentic AI applications. Teams can create workflows and RAG applications, connect models and tools, and deploy to cloud, VPC, or self-hosted environments. With that context, let us return to the hackathon and see exactly what Track 2 rewards.

### 03 · Track 2

Track 2 changes the emphasis: sixty points reward agent completeness and application value; forty points reward local inference and speed optimization on Radeon and ROCm. Start with the task the agent completes, then make the local execution path, optimization, and measurements visible in the demo.

### 04 · Division of labor

Keep the responsibilities simple. Dify is the control plane for goals, context, planning, retrieval, tools, UI, and API. Radeon is the compute plane for local inference. This separation makes agent decisions traceable and the AMD contribution easy to demonstrate.

### 05 · Architecture

Here is the reusable architecture. A task enters Dify; the agent plans with private knowledge and memory. A local model endpoint runs inference on Radeon. The workflow then uses tools, checks the outcome, and decides whether to deliver or recover. Expose the task, inference, action, and evidence so judges can follow the complete loop.

### 06 · Docker quick start

Dify Community Edition needs only two CPU cores, four GiB of memory, Docker, and Docker Compose for this quick start. The commands shown are copied from the current repository README. After the containers start, open localhost slash install and complete the first-run setup. This runs the agent orchestration layer; the Radeon local inference service remains a separate endpoint that Dify calls.

### 07 · Lemonade quick start

Lemonade packages local inference on AMD hardware behind a standard API, so application builders do not need to manage low-level runtime code. Start by checking the service with lemonade status, then use one run command to download and launch a model. On supported AMD GPUs, select the llama.cpp ROCm backend. The server exposes an OpenAI-compatible endpoint on port 13305, so most existing applications only need a new base URL. Lemonade also reports TTFT, TPS, and token counts—useful evidence for the hackathon demo.

### 08 · Dify Lemonade plugin

The Dify connection takes three steps: install the Lemonade plugin from the Marketplace, configure the model type, model name, and server endpoint, then select it inside an Agent or Workflow. The integration covers more than text generation: vision, structured output, embeddings, reranking, speech-to-text, and text-to-speech are also available for supported models. If Dify runs in Docker, localhost points back to the container, so use a host address the container can reach. Declare the model context in Dify, configure the shared server context with ctx_size, and select the ROCm llama.cpp backend when appropriate. The official documentation and GitHub repository contain the complete option set.

### 09 · Official workflow overview

This official Dify workflow example is not the final Track 2 agent, but the orchestration mechanics transfer directly: collect the task and context, retrieve knowledge, invoke the model and tools, then verify the result. When the project screenshots arrive, preserve this readable left-to-right agent path.

### 10 · Winning workflow pattern

One model call is a feature; task completion is the agent. Define the goal and permissions, retrieve knowledge and plan, infer locally on Radeon, use tools, and verify the result. Then deliver, ask for clarification, re-plan, or exit safely. One controlled recovery makes the demo far more credible.

### 11 · Demo storyboard

These three frames become the backbone of the submission video. First show the complete agent workflow. Then zoom into local inference and tool use. Finally show the completed task, execution trace, and performance evidence. The official images are temporary; your screenshots can replace them without changing the narrative.

### 12 · Evidence

Forty Track 2 points come from Radeon and ROCm optimization, so make the evidence specific: time to first token, tokens per second, peak VRAM, task success, and proof that model and data stay local. Use the same task, model, and context before and after optimization so the comparison is credible. Winning projects built with Dify will also receive a twelve-month Dify SaaS Pro subscription.

### 13 · Registration

Now it is your turn. Scan the QR code, register for the AMD AI DevMaster Hackathon, and choose Track 2. Start with a real task worth keeping local, make the agent's planning, knowledge, tools, and recovery legible, and make Radeon inference and optimization measurable. I cannot wait to see what you build.
