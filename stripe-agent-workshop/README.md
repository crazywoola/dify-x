# Dify × Stripe Workshop：一句话，搭出会收款的 Agent

这是一套面向 Dify 1.16.x 的 20 分钟动手 Workshop。目标不是覆盖全部产品能力，而是让参与者完成一条可复刻的闭环：

> 自然语言定义意图 → 构建可复用 Agent → `/create` 生成 Workflow → `/refine` 补齐护栏 → Stripe Sandbox 验证 → 返回证据。

演示案例是 **Stripe Payment Link Copilot**：操作员输入客户邮箱、方案、金额和币种；Workflow 校验并请求人工确认；确认后由 Dify Agent 在 Stripe Sandbox 中创建 Product、Price 和 Payment Link。

## 文件

- `index.html`：中文演示稿。
- `index_en.html`：英文演示稿。
- `styles.css`：Dify × Stripe Workshop 视觉样式。
- `starter/stripe-billing/`：现场 Agent Builder 失败时使用的备用 Skill。
- `starter/stripe-billing.skill`：可直接导入 Dify Agent 的备用包（运行打包命令后生成）。

## 讲师准备

1. 使用 Dify 1.16.1 或更新的 1.16.x 版本。
2. 准备支持工具调用与推理的聊天模型。
3. 准备 Stripe Sandbox，不使用 Live Mode。
4. 创建 Stripe Restricted Test Key，建议只授予：
   - Customers：Read
   - Subscriptions：Read
   - Products：Write
   - Prices：Write
   - Payment Links：Write
5. 在 Agent Advanced Settings 中添加：
   - `STRIPE_SECRET_KEY`：标记为 Secret。
   - `ALLOW_STRIPE_WRITES=true`：仅用于 Workshop Sandbox。
6. 准备一个浏览器页签打开 Dify，另一个打开 Stripe Sandbox Dashboard。

不要把 `sk_live_*`、`rk_live_*`、真实卡号或生产客户数据放进 Workshop。

## 20 分钟 Run of Show

| 时间 | 内容 | 讲师动作 |
|---|---|---|
| 0:00–3:00 | 目标、版本、心智模型 | 解释 Workflow / Agent / Skill / Stripe 四层职责 |
| 3:00–8:00 | Build Agent | 粘贴 Builder Prompt，审查 Build draft，Apply 后发布 |
| 8:00–13:00 | 生成 Workflow | 运行 `/create`，检查 node plan，再用 `/refine` 补护栏 |
| 13:00–17:00 | Sandbox 实跑 | 先展示 proposed action，再 Approve，核对 Stripe object IDs |
| 17:00–20:00 | 护栏与复刻 | 讲五道护栏、适用边界和通用配方 |

## Prompt 1：Agent Builder

在 **Agents → Create → Build mode** 中粘贴：

```text
构建一个 Stripe Billing Operator：
1. 仅允许 Stripe Sandbox；密钥来自 Secret 环境变量 STRIPE_SECRET_KEY。
2. 创建 stripe-billing Skill；支持按 email 查询客户/订阅，和创建 Payment Link。
3. 默认只读；写操作先返回 proposed_action，仅当任务包含 APPROVED=true 才执行。
4. 禁止退款、取消订阅、删除对象；禁止接收或输出卡号。
5. 输出严格 JSON：status, action, customer_id, payment_link, object_ids, evidence, error。
6. 使用 Stripe Python SDK，并生成一份可读的 build note。
```

审查 Build draft 时只看四项：Prompt、Skill、Secret 环境变量、build note。先运行只读测试，再 Apply 和 Publish。

### Agent 只读测试

```text
查询 alice@example.com 对应的 Stripe 客户与订阅。只读，不创建或修改任何对象。返回约定 JSON。
```

### Agent 写入预览测试

```text
为 alice@example.com 创建 Growth Monthly，unit_amount=9900，currency=usd，request_id=agent-preview-001。
没有 APPROVED=true；只返回 proposed_action，不执行写入。
```

## Prompt 2：`/create`

在 Workflow 画布按 `⌘K`，选择 `/create`：

```text
创建一个 Workflow：Stripe Payment Link Copilot。
输入：customer_email、plan_name、unit_amount、currency、request_id。
先校验 email 非空、unit_amount > 0、currency ∈ usd/eur/gbp；生成 proposed_action 摘要。
通过 Human Input 节点让操作员确认；仅确认后调用已发布的 Stripe Billing Operator Agent，任务中加入 APPROVED=true。
要求 Agent 返回 JSON；成功输出 payment_link 与 object_ids，失败进入可读错误分支。
不要创建退款、取消或删除路径。
```

生成 node plan 后确认以下结构：

```text
Start → Validate → proposed_action → Human Input → Agent → Parse JSON → End
                                      ↘ Reject → End
```

## Prompt 3：`/refine`

```text
Refine this workflow:
1. Reject 分支必须直接结束，不能调用 Agent。
2. 给 Agent task 增加 request_id 和 APPROVED=true。
3. Agent 输出必须包含 status 与 evidence；解析失败进入错误分支。
4. 最终输出不得包含任何 Secret 或完整卡号。
5. 保留现有输入字段，不改变 unit_amount 的整数单位。
```

接受变更前检查：它修改了哪些节点；是否扩大工具权限；失败会停在哪里。

## 现场测试数据

```json
{
  "customer_email": "alice@example.com",
  "plan_name": "Growth Monthly",
  "unit_amount": 9900,
  "currency": "usd",
  "request_id": "ws-001"
}
```

必须跑三条测试：

1. **Reject**：不得调用 Agent，Stripe 中无新对象。
2. **Approve**：返回 `payment_link`、`prod_*`、`price_*`、`plink_*`。
3. **重复 request_id**：不应重复创建对象；若生成 Skill 未实现幂等，记录为发布前缺陷。

可选：打开测试 Payment Link，使用 Stripe 测试卡 `4242 4242 4242 4242`、未来日期与任意 CVC 完成测试。不要使用真实卡信息。

## 备用 Skill

如果 Agent Builder 在现场超时或生成的脚本不可用，可以打包仓库内的备用 Skill：

```bash
cd stripe-agent-workshop/starter/stripe-billing
zip -r ../stripe-billing.skill . -x '*.pyc' -x '*/__pycache__/*'
```

然后在 Agent 的 Skills 区域导入 `stripe-billing.skill`，并设置 `STRIPE_SECRET_KEY` 与 `ALLOW_STRIPE_WRITES=true`。

本地可先验证预览模式，不需要 Stripe Key：

```bash
python stripe-agent-workshop/starter/stripe-billing/scripts/stripe_billing.py \
  create-payment-link \
  --customer-email alice@example.com \
  --plan-name "Growth Monthly" \
  --unit-amount 9900 \
  --currency usd \
  --mode subscription \
  --request-id ws-001 \
  --dry-run
```

## 生产化之前

- 从 Sandbox 开始，不直接替换为 Live Key。
- 升级到 Dify 1.16.1+，替换 Agent 服务的开发默认 Secrets。
- 限制 Agent Sandbox 网络出口与内部服务访问。
- 使用 Restricted Live Key，并定期复审权限。
- 对退款、取消、高金额或不可逆动作增加独立政策引擎与人工授权。
- 加入评估集、告警、SLO、审计保留与回滚方案。
- 让 `request_id` 贯穿业务工单、Workflow、Agent run 与 Stripe object metadata。

## 参考资料

- [Dify 1.16.0 Release](https://github.com/langgenius/dify/releases/tag/1.16.0)
- [Dify 1.16.1 Release](https://github.com/langgenius/dify/releases/tag/1.16.1)
- [Dify New Agent overview](https://docs.dify.ai/en/self-host/use-dify/build/new-agent/overview)
- [Dify Build an Agent](https://docs.dify.ai/en/self-host/use-dify/build/new-agent/build)
- [Stripe agentic workflows](https://docs.stripe.com/agents)
- [Stripe Testing](https://docs.stripe.com/testing)

内容结构借鉴了参考文章的教程方法：版本/状态声明、最小使用画面、核心概念、机制拆解、完整实战、收益与代价、FAQ；并针对 20 分钟现场演示进行了压缩。
