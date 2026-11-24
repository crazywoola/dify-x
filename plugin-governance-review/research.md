# Plugin governance review · Research notes

Outside evidence behind the deck, gathered on 24 November 2026. Every figure below was read on the page linked; the quotes are copied from those pages. Figures we could not confirm on a primary page are listed at the end and are not used in the deck.

## 1. How other ecosystems signal trust (slide 12)

| Ecosystem | Practice | Quote from the source | Source |
|---|---|---|---|
| Terraform Registry | Official, Partner and Community tiers; the Partner badge requires joining the partner programme | "To earn a partner provider badge the partner must participate in the HashiCorp Technology Partner Program." | [HashiCorp docs](https://developer.hashicorp.com/terraform/registry/providers) |
| Docker Hub | Docker Official Images, Verified Publisher and Docker-Sponsored Open Source badges | "Images that are part of this program have a special badge on Docker Hub" | [Docker docs](https://docs.docker.com/docker-hub/image-library/trusted-content/) |
| VS Code Marketplace | Verified publisher badge | "verified both the existence of the domain name and the good standing of the publisher on the Marketplace for at least six months" | [VS Code docs](https://code.visualstudio.com/docs/configure/extensions/extension-runtime-security) |
| VS Code Marketplace | Scan on every upload, plus a block list | "The scan, which uses several antivirus engines, is run for each new extension and for each extension update." | [VS Code docs](https://code.visualstudio.com/docs/configure/extensions/extension-runtime-security) |
| npm | Two-step sign-in to publish any package | "All packages now require two-factor authentication (2FA) or a granular access tokens with bypass 2FA enabled for creating and publishing packages." | [npm docs](https://docs.npmjs.com/requiring-2fa-for-package-publishing-and-settings-modification) |
| npm | Signed build record (provenance), with a stated limit | "it does not guarantee the package has no malicious code" | [npm docs](https://docs.npmjs.com/generating-provenance-statements) |
| PyPI | Two-step sign-in for every account | "Starting January 1, 2024, all users must enable 2FA for their PyPI accounts." | [PyPI blog, 13 Dec 2023](https://blog.pypi.org/posts/2023-12-13-2fa-enforcement/) |
| PyPI | Trusted publishing and signed attestations | "These pages document PyPI's implementation of digital attestations (PEP 740)" | [PyPI docs](https://docs.pypi.org/attestations/) |
| GitHub | Signed build records (artifact attestations, built on Sigstore) | "uses Sigstore, which is an open source project that offers a comprehensive solution for signing and verifying software artifacts" | [GitHub docs](https://docs.github.com/en/actions/concepts/security/artifact-attestations) |
| GitHub | Cap on open pull requests per outside contributor | "you can now set a maximum number of open pull requests that users without write access may have open in your repository at one time" | [GitHub changelog, 17 Jun 2026](https://github.blog/changelog/2026-06-17-limit-open-pull-requests-for-users-without-write-access/) |
| GitHub | Exemptions from that cap by account age or merge history | "Account age: Exempt contributors whose accounts meet or exceed the minimum age you set." | [GitHub changelog, 28 Oct 2026](https://github.blog/changelog/2026-10-28-pull-request-limits-exempt-contributors-by-age-or-history/) |
| Chrome Web Store | No duplicate listings | "We don't allow any developer, related developer accounts, or their affiliates to submit multiple extensions that provide duplicate experiences or functionality" | [Chrome Web Store policy](https://developer.chrome.com/docs/webstore/program-policies/spam-and-abuse) |
| curl | AI use must be disclosed and checked by the reporter | "If you asked an AI tool to find problems in curl, you must make sure to reveal this fact in your report." | [curl contribution guide](https://curl.se/dev/contribute.html) |
| curl | Bug bounty ended | "There is no longer a curl bug-bounty program. It officially stops on January 31, 2026." | [Daniel Stenberg, 26 Jan 2026](https://daniel.haxx.se/blog/2026/01/26/the-end-of-the-curl-bug-bounty/) |
| Gentoo | AI-assisted contributions banned (Council vote of 14 Apr 2024) | "It is expressly forbidden to contribute to Gentoo any content that has been created with the assistance of Natural Language Processing artificial intelligence tools." | [Gentoo Council policy](https://wiki.gentoo.org/wiki/Project:Council/AI_policy) |
| QEMU | AI-generated contributions declined | "Current QEMU project policy is to DECLINE any contributions which are believed to include or derive from AI generated content." | [QEMU docs](https://www.qemu.org/docs/master/devel/code-provenance.html) |

We found no GitHub feature that labels AI-written pull requests. That is "none found", not proof that none exists.

## 2. The closest peer: n8n verified community nodes (slide 12)

- **Launched** on 27 May 2025 with about 25 nodes, marked with a shield icon. "Nodes that appear in the editor have been manually vetted for quality and security." ([n8n blog](https://blog.n8n.io/community-nodes-available-on-n8n-cloud/))
- **Requirements** ([verification guidelines](https://docs.n8n.io/connect/create-nodes/build-your-node/reference/verification-guidelines)):
  - MIT licence: "Make sure your package license is MIT."
  - No run-time dependencies.
  - No access to environment variables or the file system.
  - One service per package, and no copies: "The node MUST not be an existing node".
  - Since 1 May 2026, published from GitHub Actions with a provenance statement.
- **Review** takes up to four weeks, through the n8n Creator Portal.
- **Commercial carve-out:** n8n reserves the right to reject nodes that compete with its paid features.

The official registry for MCP servers has been in preview since 8 September 2025. It verifies who owns a name (by GitHub login or DNS record) but states that "consumers should assume minimal-to-no moderation" ([MCP Registry moderation policy](https://modelcontextprotocol.io/registry/moderation-policy)).

## 3. The review load is industry-wide (slides 5 and 15)

| Fact | Quote from the source | Source |
|---|---|---|
| Pull requests merged on GitHub rose about 3.6 times since January 2023 | "In January 2023, developers merged about 25 million pull requests a month across GitHub. Today that number tops 90 million" | [GitHub blog, 18 Jun 2026](https://github.blog/open-source/maintainers/how-pull-request-limits-are-cutting-down-the-noise/) |
| Creating got cheaper, reviewing did not | "The cost to create has dropped but the cost to review has not." | [GitHub blog, 12 Feb 2026](https://github.blog/open-source/maintainers/welcome-to-the-eternal-september-of-open-source-heres-what-we-plan-to-do-for-maintainers/) |
| WordPress.org absorbed 40.6% more plugin reviews with a team of the same size | "reviewed 12,713 plugins, representing a 40.6% increase compared to 2024" and "the team has remained the same size. The queue has stayed stable thanks to improvements in the tools" | [WordPress plugins team, 7 Jan 2026](https://make.wordpress.org/plugins/2026/01/07/a-year-in-the-plugins-team-2025/) |
| curl's share of valid security reports fell | "Starting 2025, the confirmed-rate plummeted to below 5%." | [Daniel Stenberg, 26 Jan 2026](https://daniel.haxx.se/blog/2026/01/26/the-end-of-the-curl-bug-bounty/) |

## 4. Why enterprise buyers care (slide 13)

| Fact | Quote from the source | Source |
|---|---|---|
| Avoiding lock-in is a leading reason to adopt open source (55%; 63% in the EU and the UK) | "Avoiding vendor lock-in has emerged as a leading driver of open source software adoption, cited by 55% of respondents" | [Perforce press release, 24 Mar 2026](https://www.perforce.com/press-releases/2026-state-of-open-source-report) |
| A worm spread through the npm registry | "A self-replicating worm—publicly known as “Shai-Hulud”—has compromised over 500 packages" | [CISA alert, 23 Sep 2025](https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem) |
| Microsoft removes malicious extensions from its marketplace | "So far this year, we’ve reviewed 136 extensions for malicious code and removed 110" | [Microsoft developer blog, 11 Jun 2025](https://developer.microsoft.com/blog/security-and-trust-in-visual-studio-marketplace/) |
| Few buyers require a software bill of materials in contracts yet | "Only 10 % of respondents reported… mandatory SBOM requirements within supplier contracts." (n=334) | [ENISA, June 2026](https://www.enisa.europa.eu/sites/default/files/2026-06/SBOM%20Adoption%20State%20of%20Play%202026.pdf) |

The last row is why the deck proposes a security-review pack and does not lead with a bill of materials: demand for it in contracts is still low.

## 5. A marketplace as a channel (slide 14)

| Fact | Quote from the source | Source |
|---|---|---|
| Atlassian Marketplace | "The Atlassian Marketplace has surpassed $7B in lifetime sales" and "more than 40% of Atlassian customers had at least one Marketplace app installed" (end of June 2026) | [Atlassian blog, 26 Oct 2026](https://www.atlassian.com/blog/teamwork/atlassian-marketplace-7-billion) |
| Salesforce AppExchange | "91% of Salesforce customers use at least one AppExchange app." | [Salesforce blog, 12 May 2025](https://www.salesforce.com/blog/what-is-a-salesforce-partner/) |

Both companies report the share of customers who use a marketplace app, not the number of listings. That is the measure slide 14 proposes to add.

## 6. Business systems in Japan (slide 11)

The list is built around what large Japanese companies run. Figures are vendor-stated and their definitions differ, so do not rank across rows.

| System | Why it is on the list | Dify connector today | Source |
|---|---|---|---|
| Microsoft 365 | Microsoft 365 Copilot in use at 94% of Nikkei 225 companies (Mar 2026) | Official plugins for Teams, Outlook, SharePoint and OneDrive | [Microsoft](https://news.microsoft.com/source/asia/features/microsoft-ai-tour-tokyo-2026-main-blog/?lang=ja) |
| Salesforce | Largest share of Japan's CRM market (IDC Japan, via Toyo Keizai, Sep 2026) | Official plugin | [Toyo Keizai](https://toyokeizai.net/articles/-/958792) |
| Box | 22,000 companies in Japan; 85% of the Nikkei 225 (Mar 2026) | Official data-source plugin | [ASCII.jp](https://ascii.jp/elem/000/004/385/4385333/) |
| Slack | Owned by Salesforce; no Japan figure found | Official plugins | — |
| kintone | 43,000 companies (Sep 2026) | Two community plugins from one author | [Cybozu](https://cybozu.co.jp/kviewer-json/public-number/jp.json) |
| LINE | 100 million monthly users in Japan (Dec 2025); a customer channel, not an internal system | Three community plugins | [LY Corporation](https://www.lycorp.co.jp/ja/news/release/020058/) |
| SAP | Included by judgement; no Japan customer count found | None | — |
| ServiceNow | Included by judgement; no Japan customer count found | None | — |
| Garoon | 8,700 companies (Sep 2026) | None | [Cybozu](https://cybozu.co.jp/kviewer-json/public-number/jp.json) |
| intra-mart | 11,900 companies (Mar 2025) | None | [NTT DATA INTRAMART](https://www.intra-mart.jp/topics/006657.html) |
| SAP Concur | 42.8% of Japan's expense-management revenue (ITR, FY2025) | None | [SAP Concur](https://www.concur.co.jp/blog/article/concur-itr2026-pr) |
| Sansan | 12,580 contracts (Aug 2026; read from a chart in the investor deck, not page text) | None | [Sansan IR](https://ir.corp-sansan.com/ja/ir/library/latest-earnings.html) |

**How coverage was checked.** Keyword search over the names and descriptions of 1,026 community plugins and 279 official plugin folders, then over every text file in the latest version of each community package. No connector was found either for LINE WORKS, Chatwork, Money Forward, SmartHR, CloudSign, KING OF TIME, COMPANY, desknet's NEO, OBIC or HENNGE; these mostly serve smaller companies and are left off the slide. Backlog has one community plugin and freee appears only inside another plugin.

**What is judgement.** The choice of twelve systems is ours. It rests on the penetration figures above and on general knowledge of what integrators implement; it is not a survey of integrators, and the Japan team has not reviewed it.

## 7. Looked for and not used

- **Partner-sourced revenue benchmarks.** We found no 2025–2026 survey that states both a partner-sourced revenue share and its sample size on a page we could read, so the deck makes no such claim.
- **Microsoft Teams, Slack, SAP and ServiceNow customer counts for Japan.** Not found on a primary page.
- **Tackle, Canalys, Crossbeam and Benchmarkit figures.** Not confirmed on a primary page.
