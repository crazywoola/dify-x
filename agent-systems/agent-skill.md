## context

### What problem are we solving?
Background: Dify is now clearly behind the market in the Agent space. As the Agent paradigm becomes more mature, Dify should carry out a holistic redesign of Workflow. This PRD is broken down into three major parts:
1. Part 1: What problems do Dify's current Agents have, what does the demand look like, and how is the market addressing it today?
2. Part 2: What does industry best practice look like?
3. Part 3: How should we redesign Agents, what will the post-redesign Dify user story look like, and what value will it create?

### What problems do Dify's current Agents have?

1. People use Agent App instead of Agents inside Workflow, because Agent App supports multi-turn conversation, while Workflow is single-turn. Chatflow Agent Memory lacks isolation, the overall experience feels flimsy, and there is no MultiAgent capability.
2. The Agent core loop is implemented through LangGraph and then connected back into Dify through HTTP nodes.
3. From an enterprise management perspective, C-level leaders choose Dify, but frontline employees use LangGraph instead, often from the Data Science team.
4. To avoid context chaos caused by too many tools, teams use EasyTool to provide different tools to the LLM in different scenarios, instead of using Dify's native strategy.

#### Multimodal problems

If we continue down the current path, we will run into many issues, including but not limited to:
- Files must be passed between tools through an implicit `file_id`
- We need to provide the LLM with a large number of tools such as `view_file`, `search_file`, `find`, or `grep`, which means we must invent our own tool layer without a standard and expose it by default to the LLM. That is highly risky.
- The Agent strategy execution path is too long, and it is difficult to debug if anything in the chain goes wrong.

#### Agent deliverables inside Workflow are unclear, and downstream nodes cannot access the outputs of upstream nodes

`agent-systems/assets/workflow.png`

1. Example 1: In the diagram above, the Agent may call multiple tools, but we have no good way to tell whether a tool execution "succeeded." The only workaround is to check whether the Agent's output string contains the word `success`, which is very indirect and not robust.
2. Example 2: If the Agent reads an online spreadsheet through tools such as ReadExcel, the raw data exists only in the Agent's internal Memory. The Agent only returns the user-facing answer, and downstream nodes cannot access the full Excel data. The root cause is the same as in Example 1.
3. Example 3: If there are multiple Agents on the canvas, they also cannot share their deliverables. A later Agent does not know what the previous Agent did, what it delivered, or how to continue working from that result.

#### Lack of support for Agent Skills / historical gap in Context Engineering
At this stage, model benchmark gains are already showing clear diminishing returns, while differences in Context Engineering can still produce dramatically different outcomes. But Dify's current context management is still just a text editor that can reference variables.

That variable-reference text editor was one of the key reasons we stayed ahead over the past few months. A point from Anker Innovation was especially important: n8n places the prompt editor at the same level as an ordinary input field, which implies they do not really value prompts. Writing SOPs, business process instructions, or multimodal handling there is simply too painful.

At the same time, many of our users' best practices in Workflow are essentially "turning SOPs into workflows," but there is an obvious difference:

- Chatflow / Agent: the LLM directly serves as the answer-producing node, and all deliverables are returned through many Answer blocks inside the chat window
- Workflow: the LLM is only responsible for formatting or one-shot content generation tasks, and it barely participates in reasoning

It is easy to see that these LLMs inside Workflow almost never collaborate with each other. In many cases the same context has to be written multiple times. For example, via Template nodes, the SOPs for the previous Agent node and the next Agent node are often almost identical, with only the final task being different.

LLMs are barely doing reasoning work inside Workflow today.

#### Sandbox permission requirements are too strict

Although Sandbox is not currently connected to Agents inside Workflow, Sandbox is ideally the container that should host the Agent execution environment. The tension is that Agents often need a realistic sandbox environment, and the permissions they require will inevitably exceed a narrowly safe scope. In practice the problem becomes:
- Either you need a sandbox that causes zero damage even if it is compromised: extremely high runtime cost, and difficult to deliver technically in the community edition
- Or you need a sandbox that is theoretically impossible to attack while still allowing code execution: very high development cost

This leads to two observations:

1. Both point toward "standardized SOPs" and "providing a Unix-like environment instead of a tool list"
2. Human-to-human collaboration is degrading in noticeable ways: individual productivity goes up, but organization-level knowledge flow, culture, and promotion pathways are weakened. People become less willing to collaborate, but very willing to define AI usage rules and best practices. In the end, many of the things they build mainly serve themselves. A report mentioned that:
  1. 8.6% of Claude tasks are fixing "papercuts", 31% are building new features, and 27% are Claude-assisted side work such as writing small tools
  2. Claude takes away some opportunities to ask colleagues, which reduces knowledge transfer, and reinforces the familiar fear that AI will eventually absorb all work and make individuals feel irrelevant

Starting from the first point, the LLM's pretraining corpus contains a large amount of Posix / Unix material. File handling and image handling are often command-based. The LLM does not need an extra tool list. It only needs to run `ls /bin` to understand what tools are available. This is a very natural paradigm.
The second point leads to another observation: people are happy to specify what AI should do, but they have not enabled good AI-to-AI collaboration. The small tools being built each have isolated responsibilities and are poorly linked together. The same is true of Dify Apps: they do not enable strong AI-to-human collaboration either, and may even reduce human-to-human collaboration.

### How should we redesign Agents, and what will the new Dify user story and value look like?

#### A Unix-like system plus external file storage, following POSIX

From the discussion above, we already know that current best practice is essentially a sandbox built as a Unix-like system plus a POSIX-style runtime. Why not directly let the LLM generate commands? Every tool call is just a command execution, every tool is an executable, and tool input/output is command line plus stdio. This becomes a lever that takes advantage of the LLM's built-in pretraining corpus.

Previously, Dify's type system required tool calls to follow a strict typed path, which led to rigid type constraints, file types falling outside JSON Schema, unclear tool deliverables, and many related problems.

Before moving to POSIX, chaining two tool calls requires storing the previous call results in LLM Memory and then asking the LLM to generate parameters for the next call. This is slower and consumes valuable context size:
```text
step1: A = google_search(query="Dify", max_size=30)
step2: B = summary(query=A)
```

After moving to POSIX, the same tool calls become:
```text
summary --query "$(google_search --query dify --max_size 30)"
```

This change even lets Dify's type system "skip class" on type conversion to some extent, because every parameter is now just a string.

Once we make this change, we no longer need to provide the LLM with a tool list. We only need to provide an `ls` command so it can see what tools exist, and then perhaps organize those tools through some category-based interaction. At that point, all tools can simply exist inside the Agent's Unix environment, and the UX no longer needs an "Add Tool" interaction at all.

Introduce a Command node:
it can execute a command inside the sandbox, takes a single command line as input, and returns stdout as plain text.

#### An Agent memory extraction mechanism that includes Memory / Context

To solve the problem above, where Agent deliverables are unclear and downstream nodes cannot use upstream outputs, we propose that each LLM should provide a way to access its Memory. The logic is:
whenever a node's input exists in the upstream LLM's context, a background LLM reads the previous LLM's Memory, then uses a parameter-extractor-like method to pull out the final parameter values, including files, and pass them into the target node.

`agent-systems/assets/memory.png`

- This means each LLM should have its own Memory. In other words, the output of an LLM / Agent node is not just `text` / `files`; its Context / Memory itself should become one of its deliverables. As shown in the diagram, parameters can be extracted from Context.
- Likewise, files created by the Agent can also be extracted from context in a similar way and passed into tools.

#### Skill-like context management interaction, built into the Agent filesystem

On the canvas, introduce an SOP management center. At its core, it is a text editor for writing SOPs. The core strategy is to "tell the LLM" how it should perform a task and which tools it should use.

At the same time, those SOPs are injected into the Agent's working environment, so the Agent can list them through `ls /sops`. That means everything is visible to the Agent. For different Agent nodes, the difference is simply which files are referenced in Instruction / Prompts. That changes the Agent's SOP entry point, and therefore what part of the SOP space it focuses on.

In the final MVP scope, the full top-down interaction model of the system is shown below: POSIX is the core, carrying external service interaction, SOPs, the filesystem, and deliverables, while the LLM's Context also becomes one of the deliverables.
