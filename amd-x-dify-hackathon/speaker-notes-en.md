# AMD × Dify Hackathon | 15-Minute English Speaker Notes

> Total runtime: 15:00
>
> Suggested pace: approximately 120–130 spoken words per minute.
>
> Stage directions in italics are not meant to be spoken.

## 01 · Cover (00:00–00:40)

Hello everyone. I’m Banana from Dify Developer Relations. Today I want to answer one practical question: how do we turn a prompt into a private agent that can plan, use tools, and finish a real task?

The stack has two clear roles. Dify provides the workflow, knowledge, tools, and application experience. AMD Radeon runs the model locally. In the next fifteen minutes, I’ll connect Dify, Lemonade, and Radeon in one working path, then show what a judge-ready demo looks like.

**Transition:** First, a quick look at the platform and community behind Dify.

## 02 · Contributors (00:40–01:30)

Dify is an open-source platform for building agentic applications. The core platform, plugins, documentation, examples, and everyday practices are developed in public by a global community.

That matters during a hackathon. You can inspect how features work, extend the platform with models and tools, and learn from patterns that other builders have already tested. Instead of spending the event rebuilding accounts, knowledge ingestion, workflow execution, and an application shell, you can spend more time on the task that makes your project valuable.

The community is not just a number on GitHub. It is an operating advantage: code you can inspect, integrations you can reuse, and contributors you can learn from.

**Transition:** Let’s see what you can build on top of that foundation.

## 03 · Workflow Studio and Agent (01:30–02:25)

The first capability is orchestration. In Workflow Studio, the agent’s logic is visible: what starts the run, which knowledge is retrieved, which model is called, which tool can act, and what happens when a step fails.

The workflow view is useful for deterministic paths and reviewable business logic. The Agent node adds controlled autonomy: it can reason about the next step, choose approved tools, and use context or memory within boundaries you define.

For a hackathon team, this gives everyone the same execution map. A product teammate can discuss the user journey, an engineer can inspect the model and tool calls, and a judge can see that the result came from a real system rather than one large hidden prompt.

**Transition:** Agent logic is only reliable when its context is reliable, so the next layer is knowledge.

## 04 · Knowledge Pipeline (02:25–03:15)

The Knowledge Pipeline prepares the private context your application depends on. You can bring files, websites, online documents, or connected drives into one processing flow.

The important part is control. You can inspect extraction, clean the content, choose chunking and indexing behavior, and test retrieval before the knowledge base reaches an agent. That makes grounding an engineering step, not a checkbox.

Once the content is prepared, the same knowledge base can support more than one agent or workflow. For our demo later, we will use a small internal launch plan. The model should use what the document actually says, clearly mark missing facts, and avoid inventing an owner or deadline.

**Transition:** With logic and knowledge in place, Dify can connect the rest of the application stack.

## 05 · Marketplace, Publish, and Monitor (03:15–04:05)

The Marketplace is where you extend the system with approved model providers, tools, data sources, and MCP integrations. This is also how Lemonade will enter our stack: as a model provider, without changing the rest of the application design.

After the workflow is ready, you can publish the same logic as a web app, an API, an embedded experience, or a tool. Monitoring then shows how the application behaves in real runs, including usage and model activity.

So Dify is not only a canvas for a prototype. It connects building, publishing, and observing the application. That lets a team improve the workflow without rebuilding the interface or the integration layer every time.

**Transition:** Now let’s connect these platform capabilities to the Track 2 judging brief.

## 06 · Track 2 Scoring (04:05–05:05)

Track 2 has two scoring priorities. Sixty points focus on functional completeness and application value. The question is not whether the model produces fluent text. The question is whether the agent can take a goal, reason about it, plan, use tools and memory, and complete a meaningful task.

The other forty points focus on AMD Radeon and ROCm optimization. Your project should make local execution clear and explain the evidence you collected while improving it. Keep that evidence connected to the application: model choice, runtime settings, time to first token, throughput, memory use, and the trade-offs that affected the user experience.

A strong project therefore starts with a task worth completing, then places local inference inside the full path. Judges should see one coherent product, not an application demo and a separate hardware demo that never meet.

**Transition:** This architecture shows exactly where the two parts meet.

## 07 · Roles and Architecture (05:05–06:25)

*Walk through the diagram from left to right.*

The flow begins with a user task. Do not capture only the prompt. Capture the private data the agent may use, its permission boundary, and a clear definition of done.

Dify becomes the control plane. The Agent or Workflow interprets the goal, retrieves relevant knowledge, chooses an approved tool, and checks whether the result satisfies the completion criteria. Dify coordinates the work, but it does not need to perform the model computation itself.

When the workflow needs inference, it sends the request to the local service on Radeon. The connection can use an OpenAI-compatible API, a Tool node, or an HTTP Request. Radeon and ROCm execute the model while the model and sensitive context remain in the controlled environment.

The result then returns to Dify. The workflow can verify sources and tool results before delivery. If information is missing, it can ask the user. If an action fails, it can retry, choose another safe path, or stop with a clear explanation.

This separation also keeps the system replaceable: change the model without rewriting the application, or improve the workflow without changing the inference service.

**Transition:** Let’s start both sides, beginning with Dify.

## 08 · Dify Docker Quick Start (06:25–07:25)

For Dify Community Edition, start with Docker and Docker Compose. The minimum recommendation shown here is two CPU cores and four gibibytes of memory.

If you do not already have the repository, clone it first. Then enter the Dify directory, move into the Docker folder, copy the example environment file, and run Docker Compose in detached mode. When the services are ready, open `localhost/install` and complete the initial administrator setup.

This starts the application and workflow services. It does not mean the Radeon model is running inside the Dify containers. We will start that model separately with Lemonade, then connect it to Dify through the provider endpoint.

During a live presentation, do not narrate every container. Show that the services are healthy and the install page is reachable, then move on.

**Transition:** Next, we start the service that actually runs the local model.

## 09 · Lemonade Quick Start (07:25–08:45)

Lemonade packages local model execution on AMD hardware behind an application-ready API. That means the application team can work with a standard interface instead of embedding low-level inference code into the project.

First run `lemonade status` to confirm the server and hardware state. Then start a model with `lemonade run`. This example uses Gemma and explicitly selects the ROCm backend with `--llamacpp rocm`.

When the service starts, the OpenAI-compatible endpoint is available at `localhost:13305/api/v1`. For software that already supports the OpenAI API format, moving to local inference can be as simple as changing the base URL and model name.

The four points on the right summarize why this fits the hackathon. The API is standard. Execution can use AMD GPU, NPU, or hybrid modes where supported. Models and context stay on the machine. And the runtime exposes evidence such as time to first token, tokens per second, and token counts.

Before the demo, verify three things: the service is healthy, the model returns a response, and the request is reaching the local endpoint.

**Transition:** Now we connect this local server to Dify.

## 10 · Install Lemonade from the Marketplace (08:45–09:35)

In the Dify Marketplace, search for Lemonade and install the official model provider. This gives Dify a clean connection to the Lemonade Server running on the AMD machine.

The provider covers more than basic text generation. Depending on the model, it can expose vision, structured JSON output, embeddings, reranking, speech to text, and text to speech. A project does not need to demonstrate every capability. Choose the two or three that directly improve the task you are solving.

The architectural point is simple: local inference becomes one provider in Dify. Your knowledge pipeline, tools, workflow, application interface, and monitoring remain in the same stack.

**Transition:** Installation is the first step; the next slide shows the three configuration steps that make the model usable.

## 11 · Configure Lemonade and Build (09:35–10:25)

Configuration has three steps. First, open Model Provider settings and select Lemonade. Second, add the local model with its type, exact model name, reachable server endpoint, context size, and supported capabilities. Third, select that model in an Agent or Workflow node.

There is one common networking trap. If Dify runs in Docker, `localhost` inside the container refers to the container itself, not the host machine. Use a host address that the Dify container can actually reach, then check the port and firewall if the connection still fails.

Once the provider is configured, Dify can call the local model in the same way it calls any other model. Now we are ready to run the whole path.

**Transition:** Let’s stop looking at setup screens and complete one real task.

## 12 · Live Demo: Private Document Agent (10:25–12:40)

*Switch to the Dify application. Keep the Lemonade service and Radeon status ready in a terminal.*

This demo has one goal: turn a short internal project document into a task list that a team can act on immediately.

*Open the downloadable file briefly, then return to the Dify knowledge base.*

The document is already indexed in the local knowledge base. The prompt asks for this week’s unfinished tasks, with owner, due date, and risk. It also gives an important safety rule: when a fact is missing, mark it as “Needs confirmation.” Do not invent it.

*Paste the prompt and start the run.*

Dify retrieves the relevant sections, sends the context through the Lemonade provider to the model running on Radeon, and then structures the response into fixed fields. The workflow can also check whether the owner and date are present before it accepts the result.

*While the model runs, show one local request in the Lemonade terminal, then return to the Dify result.*

Now look at the output. “Post reminder” has enough information to be ready. “Confirm livestream” needs a confirmation step. “Verify prize list” is missing both owner and due date, so the agent asks for input instead of guessing.

*Open one citation and match it to the source document.*

We will accept the run only if it passes three checks: every task can be traced to the document; missing facts remain missing; and the output is actionable. In one run, that demonstrates local inference, retrieval, structured output, and task value.

If the live service is unavailable, keep this slide as the walkthrough and show a saved result from the same prompt. Do not change the task during the presentation.

**Transition:** This specific run gives us a reusable pattern for a strong Track 2 agent.

## 13 · Winning Workflow Pattern (12:40–14:00)

A reliable agent does not stop when the model has produced an answer. It closes the loop from intent to verified delivery.

The demo maps to these five steps. First, define the goal, private context, permissions, and completion criteria. Second, retrieve local knowledge and decide what the next action should be. Third, call the ROCm-backed model on Radeon and capture performance evidence at the same time. Fourth, use tools where needed and verify the result, its sources, and its constraints. Fifth, either deliver a complete result or recover in a controlled way.

For your own project, prepare one recovery scenario on purpose. A tool might time out. The document may not contain an owner. The user may lack permission. A result may fail a validation rule. The agent should explain what happened, ask for the missing input, re-plan, or stop safely.

One completed task plus one controlled recovery is more persuasive than several successful chat responses. It shows the beginning, middle, and end of the work—and proves that your system can behave responsibly when reality is incomplete.

**Transition:** The architecture is ready. The final step is to choose a task and build it.

## 14 · Registration and Dify Bonus (14:00–15:00)

If you are ready to participate, scan the code and register for the AMD AI DevMaster Hackathon, then choose Track 2. The event supports online participation, individually or as a team.

Start with one real task that benefits from local execution. Define why the user needs it, build the shortest complete workflow, and only then add knowledge, tools, memory, and recovery behavior. Keep the value story and the Radeon evidence inside the same demo.

Dify organizes the application and workflow. Lemonade and Radeon provide the local model service. Winning projects built with Dify also receive a twelve-month Dify SaaS Pro subscription.

So the challenge is straightforward: choose a clear task, build one complete execution path, and demonstrate it reliably. Thank you—and I’m looking forward to seeing the private agents you create.
