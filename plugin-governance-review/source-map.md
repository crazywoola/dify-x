# Plugin governance review · Source Map

## Deck contract

- Chinese and English decks: 15 slides each, 15 speaker-note blocks each.
- Both languages share the same `data-slide-id` order, figures and sources.
- No photographs are used. The only image is a crop of the Marketplace ops dashboard.

## Sources by slide

| Slides | Source | Use | Boundary |
|---|---|---|---|
| `s02`, `s07`–`s10`, `s12`, `s15` | Plugin governance review, Feishu, 23 Nov 2026 | Timeline, Phase 1 deliverables, audit findings, November rules, next steps | Internal review document; figures are as stated there. |
| `s03`, `s04`, `s14`, `s15` | CMO Office Bi-Weekly group discussion and attached research, 21–24 Nov 2026 | Leadership goals and pain points | Paraphrased by Community Ops. Roles only, no quotations. |
| `s04`, `s05` | Marketplace ops dashboard, snapshot 24 Nov 2026, 30-day view | Totals and 30-day gains | Read from a screenshot. "1 in 8" is derived. |
| `s04`, `s07`, `s11`, `s14` | Community Ops data: production plugin calls, 21 Oct – 19 Nov 2026 | 12.83M calls, 868 plugins, concentration, official versus community share | Rolling 30-day window; the last day is partial. Read shares, not daily peaks. |
| `s07` | Community Ops data: self-hosted telemetry as of 17 Nov 2026 | Daily and monthly active instances | Telemetry live since 28 Jul 2026; no growth claim is made. |
| `s02`, `s04`, `s06`, `s13`, `s14` | GitHub, [langgenius/dify-plugins](https://github.com/langgenius/dify-plugins), counted 24 Nov 2026 | Submissions per month, time to merge, governance check outcomes, replies to notices | See counting rules below. |
| `s07` | Japan enterprise survey, Sep 2026 (38 valid responses) | What enterprise users asked for | Survey of Japanese enterprise users only. |
| `s12` | [Marketplace Curation Policy](https://github.com/langgenius/dify-plugins/blob/main/docs/marketplace-curation-policy.md) | Published rules for authors | Public document. |

## Counting rules

- **Submissions per month (`s06`)**: pull requests opened on langgenius/dify-plugins in each calendar month of 2026. November covers 1–24 Nov. Opened: May 98, Jun 138, Jul 168, Aug 186, Sep 183, Oct 347, Nov 331. Merged: 83, 113, 143, 113, 142, 286, 264.
- **Time to merge (`s06`)**: median hours from open to merge for merged pull requests opened in that month. Sep 14.2, Oct 17.6, Nov 15.8.
- **Governance check outcomes (`s13`)**: 331 runs of the Governance workflow between 11 and 24 Nov, grouped by pull request title into 188 submissions. 122 never failed. 66 failed at least once; 31 of those passed on their latest run and 35 did not. A failed run can occasionally be a workflow error rather than a rule, so the 35% is approximate.
- **Replies to notices (`s13`)**: for each of the 36 request threads, whether the plugin author commented after the request. 7 of 36 as of 24 Nov 2026 14:30 CST.

## Not claimed

- No claim that governance caused growth in installs, usage or revenue.
- No cost in money: reviewer time is not recorded (slide `s14`).
- No outcome for the 24 November deadline; cases are reviewed one by one.
