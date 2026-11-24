# Plugin governance review · Source Map

## Deck contract

- Chinese and English decks: 17 slides each, 17 speaker-note blocks each.
- Both languages share the same `data-slide-id` order, figures and sources.
- No photographs are used. The only image is a crop of the Marketplace ops dashboard.

## Sources by slide

| Slides | Source | Use | Boundary |
|---|---|---|---|
| `s02`, `s06`, `s07`, `s09` | Plugin governance review, Feishu, 23 Nov 2026 | Timeline, Phase 1 deliverables, audit findings, November rules | Internal review document; figures are as stated there. |
| `s03`, `s14`, `s16` | CMO Office Bi-Weekly group discussion and attached research, 21–24 Nov 2026 | The questions raised, and the reasoning behind each proposed move | Paraphrased and anonymised by Community Ops: no speaker or team is named, and no claim is made about what leadership wants. |
| `s04` | Marketplace ops dashboard, snapshot 24 Nov 2026, 30-day view | Totals and 30-day gains | Read from a screenshot. "1 in 8" is derived. |
| `s02`, `s08`, `s10`, `s14`, `s17` | Community Ops data: production plugin calls, 21 Oct – 19 Nov 2026 | 12.83M calls, 868 plugins, concentration, community share | Rolling 30-day window; the last day is partial. Read shares, not daily peaks. |
| `s02`, `s05`, `s09`, `s16`, `s17` | GitHub, [langgenius/dify-plugins](https://github.com/langgenius/dify-plugins) and [langgenius/dify](https://github.com/langgenius/dify), counted 24 Nov 2026 | Submissions per month, reviewer concentration, time to merge, check outcomes, replies to requests | See counting rules below. |
| `s02`, `s10`, `s11`, `s12`, `s17` | Package metadata of 1,026 plugins in langgenius/dify-plugins and 279 plugin folders in [langgenius/dify-official-plugins](https://github.com/langgenius/dify-official-plugins), 24 Nov 2026 | Verified mark, vendor-published heuristic, connector coverage, Japanese descriptions | See counting rules below. |
| `s13` | [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) (public, MIT) and [@deepseek-ai/dsh on npm](https://registry.npmjs.org/@deepseek-ai/dsh); package documentation and CONTRIBUTING.md, read 24 Nov 2026 | How a parallel agent-harness ecosystem lists plugins, signals trust and declares compatibility | Quotes and links in [research.md](research.md), section 8. A harness plugin installs into a local profile and a Dify plugin runs as a hosted service: compared for design, not like for like. |
| `s15` | Community Ops data (21 Oct – 19 Nov); GitHub, langgenius/dify-plugins (24 Nov); [WordPress.org plugins team](https://make.wordpress.org/plugins/2026/01/07/a-year-in-the-plugins-team-2025/) | The four returns: brand, distinctive features, data, efficiency | Internal figures as elsewhere in the deck; WordPress.org is context. No claim that governance caused growth. |
| `s12` | [Terraform Registry](https://developer.hashicorp.com/terraform/registry/providers), [Docker Hub trusted content](https://docs.docker.com/docker-hub/image-library/trusted-content/), VS Code Marketplace, npm, PyPI, GitHub and Chrome Web Store documentation; contribution policies of curl, Gentoo and QEMU | How other ecosystems signal trust | Each practice was read on the provider's own documentation on 24 Nov 2026; quotes and links are in [research.md](research.md). n8n is included as the closest peer. |
| `s05`, `s14`, `s15`, `s16` | Public sources quoted in [research.md](research.md): GitHub blog, WordPress.org plugins team, Perforce, CISA, Atlassian, Salesforce | Industry context for review load, buyer concerns and marketplace attach rates | Quoted from the linked pages on 24 Nov 2026. Context only; not evidence about Dify. |
| `s11` | Vendor-stated adoption figures in [research.md](research.md), section 6 | Why each system is on the Japan list | Definitions differ between vendors; SAP and ServiceNow have no verified Japan figure. |
| `s12` | [Marketplace Curation Policy](https://github.com/langgenius/dify-plugins/blob/main/docs/marketplace-curation-policy.md) | Our own duplicate rule | Public document. |

## Counting rules

- **Submissions per month (`s05`)**: pull requests opened on langgenius/dify-plugins in each calendar month of 2026. November covers 1–24 Nov. Opened: May 98, Jun 138, Jul 168, Aug 186, Sep 183, Oct 347, Nov 331.
- **Reviewer concentration (`s02`, `s05`, `s14`)**: merged pull requests in the month that carry a review by the most active reviewer. Sep 140 of 142, Oct 279 of 286, Nov 255 of 264.
- **Time to merge (`s05`)**: median hours from open to merge. Sep 14.2, Oct 17.6, Nov 15.8.
- **Main repository (`s05`)**: pull requests opened on langgenius/dify: 379 in Oct 2025, 1,442 in Oct 2026.
- **Check outcomes (`s02`, `s09`, `s14`)**: 331 runs of the Governance workflow between 11 and 24 Nov, grouped by pull request title into 188 submissions. 122 never failed. 66 failed at least once; 31 of those passed on their latest run and 35 did not. A failed run can occasionally be a workflow error rather than a rule, so "one in three" is approximate.
- **Replies to requests (`s09`)**: for each of the 36 request threads, whether the plugin author commented after the request. 7 of 36 as of 24 Nov 2026 14:30 CST.
- **Community plugin calls (`s10`)**: calls to plugins not published under the official account: 391,322 in the window. Shares are of that total. The chat-bot line sums six plugins in the top 20.
- **Vendor-published (`s10`)**: 282 plugins whose author name appears in the plugin name (or the reverse); 49 had at least one call; 3,011 calls in total.
- **Connector coverage (`s11`)**: keyword search over plugin names and descriptions, then over every text file in the latest version of each package. The twelve systems were chosen by Community Ops for large Japanese companies: four have official plugins (Microsoft 365, Salesforce, Box, Slack), two have community plugins only (kintone, LINE), six have none (SAP, ServiceNow, Garoon, intra-mart, SAP Concur, Sansan).
- **Japanese descriptions (`s11`)**: plugins whose Japanese description field contains kana: 260 of 1,026. 403 fill the field at all.
- **Verified mark (`s02`, `s12`)**: packages whose metadata sets the verified flag: 7 of 1,026.

## Not claimed

- No claim that governance caused growth in installs, usage or revenue.
- No cost in money: reviewer time is not recorded (slide `s16` lists it as a line to add).
- No outcome for the 24 November deadline; cases are reviewed one by one.
- No claim that a trust tier certifies code as safe (slide `s12` says the opposite).
- No claim about what leadership wants: slide `s03` presents the questions raised at the bi-weekly, paraphrased and anonymised.
- No like-for-like product claim against DeepSeek Harness: slide `s13` compares ecosystem design only, and the two plugins differ in kind.
- No claim on slide `s15` beyond the internal figures used elsewhere in the deck and the WordPress.org context.
- Slide `s17` makes no ask, sets no threshold and proposes nothing: it states what the data shows and what we are watching next.
- Slide `s17` makes no ask, sets no threshold and proposes nothing: it states what the data shows and what we are watching next.
- No partner-sourced revenue benchmark: none could be confirmed with its sample size.
