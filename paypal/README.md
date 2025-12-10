# Dify x PayPal

## Title

自动化支付风控：从入门到精通（基于 Dify 的反欺诈实战指南）

Speaker: 郑立 · DevRel @ Dify

## Outline

- 开场 —— 风控痛点与路线图  
  - 盗刷/薅补贴/账户接管三大威胁  
  - 传统硬编码 vs Dify Workflow（分钟级编排）
- 神话破解 —— LLM 在风控中的定位  
  - 迷思一：LLM 会幻觉？MADRA 多智能体辩论约束  
  - 迷思二：LLM 太慢？分层防御（L1 极速 / L2 智能 / 事后阻断）
- 模型基础 —— 两个“傻瓜”模型  
  - 简单线性归因（打分阈值）  
  - 朴素贝叶斯（概率归因）
- 实操 —— Dify 工作流拆解  
  - Workflow 全景图  
  - Node1 数据富化（画像、上下文）  
  - Node2 LLM 鉴诈（读“黑话”）  
  - Node3 Python 判分（决策与理由）
- 动态防御 —— 进阶策略  
  - 动态策略（吊桥模式，自动收紧阈值）  
  - 异动归因（信息增益找“元凶”）  
  - 对抗哲学（提高攻击成本）
- 侦探实录 —— CASE 007: 授权通过率暴跌  
  - SQL Boy 噩梦与切片排查  
  - 切蛋糕理论 + Adtributor 算法  
  - 自动化侦探团（Python/LLM/通知链路）
- 剧场 —— PayPal 实战  
  - 黑五 Checkout 防刷  
  - 账户接管 & 盗刷处置  
  - 退款 / 纠纷滥用减损策略
- 专业进阶 —— AI 安全落地  
  - 对抗性强化学习 (Red Teaming)  
  - 思维链与风险解释性 (CoT)  
  - 提示词注入防御 (Sandwich Defense)
- 收尾 —— Q&A 与触点  
  - 联系方式：banana@dify.ai  
  - 小红书 & Bilibili 二维码
