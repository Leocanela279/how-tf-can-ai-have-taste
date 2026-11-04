# Redesigning an existing product UI: process, safe rollout, measurement, user reaction, and lessons from failed redesigns

Research date: 2026-11-04. Evidence-strength tags used on every claim:
- **[measured]**: third-party measurement or a company's own published numbers (earnings, traffic panels, opt-out stats)
- **[company-reported]**: company blog, docs, changelog, or exec statement (not independently verified)
- **[journalism]**: reputable news coverage reporting events or unattributed numbers
- **[opinion]**: expert or practitioner guidance, no data attached

Access note: nngroup.com, research.google.com and library.gv.com could not be fetched from this session (blocked by network allowlist). NN/g, the Sedley & Müller (2013) paper and the HEART (2010) paper are therefore cited via their indexed abstracts and search-result excerpts, not full text. Treat their detailed wording as unverified; the core claims are consistent across several summaries.

---

## 1. Incremental vs big-bang redesign (NN/g, strangler fig, design-system migrations)

### Takeaway
Expert guidance and every design-system migration found point the same way: default to incremental change, run old and new side by side behind a stable boundary, and reserve a "big-bang" swap for cases where data shows incremental fixes cannot reach the goal. Even then, ship it as an opt-in beta first. The failures in section 5 are almost all forced, all-at-once switches.

### Cited Findings
- **[opinion]** NN/g (Hoa Loranger, "Radical Redesign or Incremental Change?"): make incremental changes to reach goals and resort to a complete redesign only if the data supports it; "never make radical changes when minimal adjustments will suffice"; radical changes "have a higher chance of inadvertently breaking something critical for users." — [NN/g](https://www.nngroup.com/articles/radical-incremental-redesign/)
- **[opinion]** The same NN/g article names when a radical redesign is justified: when incremental gains are "miniscule or nonexistent," or when problems are so tangled that no amount of incremental fixes can raise conversion to an acceptable level. It also concedes that changing everything at once can produce a larger quality jump than incremental tweaks. — [NN/g](https://www.nngroup.com/articles/radical-incremental-redesign/); companion video [NN/g: Product Redesigns, Incremental or Overhaul](https://www.nngroup.com/videos/redesign-incremental-vs-overhaul/) (says big change is "risky but necessary in 3 cases")
- **[opinion]** Jared Spool (as summarized by third parties) favours incremental approaches because all-at-once redesigns are costly and risky, and is quoted calling a sudden full switch "the most ineffective way to get major changes into a design." Secondary summary only. — [Tenrec summary](https://www.tenrec.com/resource/rebuild-vs-evolve-your-website/)
- **[opinion]** UX Myths: "You need to redesign your website periodically" is listed as a myth. — [uxmyths.com](https://uxmyths.com/post/712537920/myth-you-need-to-redesign-your-website-periodically)
- **[opinion]** Strangler fig (Martin Fowler, coined ~2001): build the new system around the edges of the old one and replace functionality piece by piece, with old and new coexisting behind a stable boundary while traffic shifts gradually. Fowler's related "Branch by Abstraction" is cited as the closer fit for in-process UI rewrites. — [Steve Kinney, Enterprise UI course](https://stevekinney.com/courses/enterprise-ui/strangler-fig-introduction); [tianpan.co forum summary](https://tianpan.co/forum/t/the-strangler-pattern-why-netflix-amazon-and-uber-all-use-it-for-modernization/331)
- **[company-reported]** Thoughtworks applied strangler fig to large AngularJS front-end migrations: old and new UI ran side by side, with cross-framework communication via native custom events, explicitly contrasted with the riskier big-bang rewrite. — [Thoughtworks, "Farewell AngularJS"](https://www.thoughtworks.com/en-th/insights/articles/farewell-angularjs)
- **[company-reported]** GitHub Primer React rolls out changes behind feature flags "alongside the feature flag system at GitHub": flags are prefixed `primer_react_`, read via a `useFeatureFlag` hook, default to `false` when unknown, and can be set in tests via a `FeatureFlags` provider. Its CSS Modules migration moved many components behind one shared `primer_react_css_modules_ga` flag, i.e. a component-by-component migration gated by a flag. (PR detail seen only via a mirror.) — [Primer React feature-flags skill doc](https://tessl.io/registry/skills/github/primer/react/feature-flags); [primer/react PR #5380 (redirect mirror)](https://redirect.github.com/primer/react/pull/5380)
- **[company-reported]** GitHub's 2023 global navigation redesign: public beta via Feature Preview toggle (5 Apr 2023) → enabled by default for all users but still switchable off, with changes made from feedback including accessibility fixes and a separate menu button (15 Jun 2023) → GA for all users (17 Oct 2023). Roughly six months from opt-in to mandatory. — [GitHub changelog, 2023-04-05](https://github.blog/changelog/2023-04-05-redesigned-navigation-available-in-public-beta/); [2023-06-15](https://github.blog/changelog/2023-06-15-redesigned-navigation-enabled-for-all-users-beta/); [2023-10-17](https://github.blog/changelog/2023-10-17-redesigned-navigation-now-available-to-all-users/)
- **[company-reported]** GitHub's repository-page redesign: "the new design is opt-in for the next two weeks, and after that, you'll switch over automatically." — [GitHub blog, "A new look for repositories"](https://github.blog/news-insights/a-new-look-for-repositories/)
- **[company-reported]** Gmail's 2018 redesign went through three stages: an opt-in Early Adopter Program (from late April 2018, admins enable it, users opt in) → GA in July 2018 with admin choice of immediate switch or user opt-in → forced migration after 16 Oct 2018, with no opt-out after that date. — [Google Workspace Updates, new Gmail timeline](https://workspaceupdates.googleblog.com/2018/06/new-gmail-timeline.html); [new Gmail GA](https://workspaceupdates.googleblog.com/2018/07/new-gmail-ga.html)
- **[company-reported]** Atlassian's token rollout: teams "apply and test tokens across an experience before releasing new colors (dark mode) or other tokens publicly"; an internal Chrome extension lets Atlassians view migration progress and toggle themes during migration. Announced October 2022 with Figma, ESLint and Stylelint tooling. — [Atlassian, Migrate to tokens](https://atlassian.design/foundations/tokens/migrate-to-tokens); [Atlassian developer community, Oct 2022](https://community.developer.atlassian.com/t/introducing-design-tokens-new-colour-foundations-and-dark-mode/62258)

### Inferences
- The industry pattern is **dark-launch, then opt-in, then default-on with opt-out, then mandatory**. GitHub took about 6 months for navigation and Gmail about 6 months; GitHub's smaller repo-page change used a 2-week opt-in window. The size of the change should set the window length.
- For an AI agent working in a codebase, "incremental" means: a redesign lands as a series of small, separately reviewable and revertible PRs (tokens, then primitives, then one screen at a time), never as one PR that restyles and restructures everything.
- A big-bang rewrite is only defensible when the agent can point to evidence that the current structure blocks the goal. Even then the new UI should ship behind a flag next to the old one (strangler fig), not replace it in place.

### Gaps
- Could not access the full NN/g article text (domain blocked); quotes are from search excerpts.
- Found no Basecamp-specific writing on redesign process.
- Did not find a GitHub Engineering blog post on the Primer React migration; evidence is from Primer's docs and PRs.
- No controlled study comparing incremental vs big-bang outcomes was found. The evidence is expert opinion plus case outcomes.

---

## 2. Mechanics in code: tokens first, component-by-component, flags, visual regression, codemods

### Takeaway
Mature design systems migrate in a fixed order. First, semantic tokens with fallbacks are introduced so most of the restyle can happen centrally. Next, codemods do the mechanical renames and are committed separately from manual fixes. Lint rules then stop regressions, flags gate component swaps, and visual-regression snapshots make every pixel change an explicit accept/deny decision.

### Cited Findings
- **[company-reported]** Atlassian token migration tooling: codemods run via `@hypermod/cli`, with `theme-to-design-tokens` for CSS-in-JS and `css-to-design-tokens` for CSS/Sass/Less. The codemod "only provides token suggestions," so manual review is required afterwards. — [Atlassian, Migrate to tokens](https://atlassian.design/foundations/tokens/migrate-to-tokens)
- **[company-reported]** Atlassian ESLint rules: `ensure-design-token-usage` flags hardcoded values; `no-deprecated-design-token-usage` flags deprecated tokens, and `eslint --fix` auto-applies replacements where they exist; `no-unsafe-design-token-usage` with `fallbackUsage: 'none'` prevents new fallbacks being added. — [Atlassian ESLint: no-deprecated-design-token-usage](https://atlassian.design/components/eslint-plugin-design-system/no-deprecated-design-token-usage/usage); [no-unsafe-design-token-usage](https://atlassian.design/components/eslint-plugin-design-system/no-unsafe-design-token-usage); [ensure-design-token-usage](https://atlassian.design/components/eslint-plugin-design-system/ensure-design-token-usage)
- **[company-reported]** Atlassian's babel plugin inserts a fallback value when none is given; "if fallback values were used during the migration to tokens, it is essential to remove them from the codebase once migration is complete and themes are enabled." Fallbacks are scaffolding to remove, not a permanent state. — [Atlassian, Use tokens in code](https://atlassian.design/foundations/tokens/use-tokens-in-code)
- **[company-reported]** Shopify Polaris v11→v12 migration: each codemod runs as `npx @shopify/polaris-migrator <migration> <path>`. Examples: `v12-react-update-button-component` folds Button booleans (`monochrome`, `outline`) into `variant`/`tone`; `react-update-component-prop` renames Badge/Banner `status`→`tone`; `react-rename-component` renames HorizontalStack→InlineStack. Token codemods (`v12-styles-replace-custom-property-*`) remap custom properties, e.g. `--p-shadow-xs`→`--p-shadow-100`. — [Polaris, Migrating from v11 to v12](https://polaris-react.shopify.com/version-guides/migrating-from-v11-to-v12); [Polaris Migrator](https://polaris-react.shopify.com/tools/polaris-migrator)
- **[company-reported]** Polaris workflow details: run Prettier on changed files and commit the automated changes, then do manual fixes in a second commit. Some migrations are order-dependent ("You must run the color -> tone migration after running the tone rename migrations"). Where a change is unsafe, the migrator inserts `polaris-migrator:` comments or skips the instance; the guide says to grep for those comments. stylelint-polaris is run on stylesheets. — [Polaris, Migrating from v11 to v12](https://polaris.shopify.com/version-guides/migrating-from-v11-to-v12)
- **[company-reported / practitioner]** Chromatic's workflow for Storybook-based component libraries: each build lists visual diffs per story, each marked Unreviewed, Accepted or Denied. Accepting updates the baseline; otherwise you publish a build that reverts the change. Dynamic content (animations, GIFs) must be excluded to avoid false diffs. A public Storybook build showed 1,373 unreviewed changes in one build, which shows how large a restyle diff can get. — [Chromatic build page, storybookjs project](https://www.chromatic.com/build?appId=635781f3500dd2c49e189caf&number=27267)
- **[opinion / practitioner]** Playwright `toHaveScreenshot` is the lowest-friction way to add visual coverage to an existing Playwright suite. Screenshots must be made deterministic: mask dynamic content, disable animations, wait for fonts, and allow a small tolerance such as `maxDiffPixelRatio`. Baselines differ by OS, browser version and hardware, so generate them in the same environment as CI. A screenshot diff is "a review signal rather than a verdict." Chromatic also offers a Playwright integration (`npx chromatic --playwright`). Third-party guides only, not official docs. — [qaskills.sh Playwright visual guide](https://qaskills.sh/blog/playwright-visual-comparison-snapshots-guide); [Smithery: Playwright visual testing](https://smithery.ai/skills/the-answerai/playwright-visual-testing)
- **[company-reported]** GitHub Primer: feature flags gate component-level changes, and tests can wrap components in a `FeatureFlags` provider to snapshot both states. — [Primer React feature-flags doc](https://tessl.io/registry/skills/github/primer/react/feature-flags)

### Inferences
Rules for an AI agent (derived from the above):
1. **Baseline screenshots before touching anything.** Capture Playwright (or Storybook/Chromatic) snapshots of every key route and state (empty, loading, error, long content, dark mode, mobile width) on the current code. Every later diff is then a deliberate, reviewable change, not an accident.
2. **Token-first.** Introduce or rename semantic tokens (`--color-surface`, `--color-text-muted`, etc.), mapping them first to the *current* values so the screenshot diff is zero. Then change the token values in a separate commit. This splits "refactor" from "restyle", so each can be reviewed and reverted on its own.
3. **Separate mechanical and manual changes.** Codemod or regex-driven renames go in one commit, hand fixes in another (Polaris workflow). Leave grep-able markers (e.g. `// redesign-todo:`) where automation was unsafe.
4. **Lock in progress with lint.** After migrating, add or enable a rule that forbids hardcoded colours/spacing and deprecated tokens, so new code cannot regress.
5. **Remove scaffolding.** Fallbacks, compatibility aliases and old components are temporary. Track them and delete them when migration completes (Atlassian).
6. **Component-by-component behind a flag.** Swap components one at a time, ideally behind a flag (`useFeatureFlag('redesign_x')`) so old and new can be compared and rolled back without a revert.
7. **Keep behaviour intact.** Routes, URLs, form field names, keyboard shortcuts, analytics event names, `data-testid`s and ARIA roles are contracts. A visual redesign must not change them unless the change is called out explicitly. Existing functional/e2e tests should pass unchanged.

### Gaps
- Official Chromatic docs (TurboSnap mechanics, baseline branching rules) and official Playwright docs were not retrieved; the Playwright tactics come from third-party guides.
- No published data was found on how many regressions visual testing catches during design-system migrations.
- No first-party GitHub or Shopify engineering-blog postmortems on these migrations were retrieved, so the evidence is from docs and tooling.

---

## 3. Measuring before and after: baselines, HEART, A/B testing redesigns, novelty and change-aversion bias

### Takeaway
Define success metrics before redesigning: task success, conversion, retention, satisfaction, and also performance and accessibility. Short A/B tests of redesigns are biased in both directions. Novelty inflates early gains, and primacy/change aversion depresses early results. Measure over weeks, keep a holdout on the old design, and track satisfaction through each launch stage.

### Cited Findings
- **[company-reported / research]** HEART framework (Rodden, Hutchinson & Fu, Google, CHI 2010): five user-centred metric categories (Happiness, Engagement, Adoption, Retention, Task success), each broken into Goals → Signals → Metrics. The categories are a starting point from which teams define product-specific metrics, and teams need not use all five. Secondary sources report it was applied to 20+ Google products (unverified against the full text). — [Google Research, Measuring the User Experience on a Large Scale (PDF)](https://research.google.com/pubs/archive/36299.pdf); [abstract page](https://research.google.com/pubs/pub36299.html?frame=0)
- **[opinion]** HEART practitioner guidance: signals should be "sensitive and specific to the goal, moving only when the experience gets better or worse"; run it as a workshop with PM, designer, researcher and engineer. — [Amplitude, HEART framework](https://www.amplitude.com/blog/heart-framework-software-ux.md); [Pratt IXD](https://ixd.prattsi.org/2018/12/googles-heart-framework-measuring-and-tracking-progress-towards-key-goals/)
- **[company-reported / research]** Sedley & Müller, "Minimizing change aversion for the Google Drive launch," CHI 2013 Extended Abstracts, pp. 2351–2354. They tracked a satisfaction survey question across launch stages of the Docs List → Google Drive transition (from May 2012) and report steps that allowed "a launch with no aversion." Full numbers were not retrievable. — [Google Research publication page](https://research.google/pubs/minimizing-change-aversion-for-the-google-drive-launch/); [PDF](https://research.google.com/pubs/archive/41221.pdf)
- **[research]** Novelty effect: a short-term bump in response to something new that fades over time, so early treatment effects look stronger than they are. Primacy effect (the inverse): new UI or workflows initially hurt task completion while users relearn habits, then recover. "If your treatment effect varies over time, the naive mean lift is biased for the long-run effect." — [Sadeghi et al. 2021, Microsoft, arXiv 2102.12893](https://arxiv.org/pdf/2102.12893.pdf); [Estimating Effects of Long-Term Treatments, arXiv 2308.08152](https://arxiv.org/pdf/2308.08152)
- **[opinion]** Mitigations: long-running holdouts that keep a slice of users on the old experience for weeks or months, giving a steady-state estimate; plot the treatment effect over time and check whether it trends. Cost: holdout users miss improvements. — [Metricgate, holdout experiment](https://metricgate.com/docs/holdout-experiment); [Metricgate, novelty detection](https://metricgate.com/blogs/ab-test-novelty-effect-detection/)
- **[company-reported]** Reddit's 2018 redesign kept 10% of logged-out users on old Reddit as a holdout to compare metrics. By September 2018, 68% of users were on new Reddit, and the daily opt-out rate among logged-in users was about 0.29%. The most common opt-out reason given was simply "Prefer old Reddit." — [r/beta admin post, Sep 2018 (mirror)](https://reddit.birdcat.cafe/r/beta/comments/9iu1ax/we_conducted_an_opt_out_survey_on_new_reddit_here)
- **[journalism]** Instagram 2022: Mosseri paused the full-screen feed test with the words "people are frustrated and the usage data isn't great." Both qualitative backlash and quantitative usage were negative, so it was not just change aversion. — [Engadget, Jul 2022](https://www.engadget.com/instagram-full-screen-feed-recommended-posts-185859342.html); [CNN, 28 Jul 2022](https://us.cnn.com/2022/07/28/tech/instagram-walks-back-updates)
- **[journalism]** Snapchat 2018: Spiegel reportedly pushed the redesign live for everyone in February 2018 "despite metric concerns" and warnings from internal product experts (The Information, via coverage). — [Android Headlines, May 2018](https://www.androidheadlines.com/2018/05/ceo-pushed-snapchat-redesign-despite-internal-warnings-report.html); [Ubergizmo](https://www.ubergizmo.com/2018/05/snap-designers-warned-against-new-design)

### Inferences
- **Baseline checklist before a redesign** (synthesised from HEART and the cases): task-success rate and time-on-task for the top 3–5 tasks; conversion and funnel step rates; retention/DAU; a satisfaction or CSAT question; support-ticket volume by topic; Core Web Vitals (LCP, INP, CLS) and bundle size; automated accessibility violations (axe) and contrast failures; and a screenshot inventory of every route and state. Without these, "better" cannot be shown and regressions cannot be caught.
- For an AI agent in a codebase, the measurable things it can baseline itself are screenshots, axe violations, contrast ratios, Lighthouse/CWV numbers, bundle size and test pass rate. It should record these before and after in the PR description and refuse to call the redesign "done" if any regress without explanation.
- Read early results with caution. A dip in week 1 does not prove the design is bad (primacy/change aversion), and a week-1 lift does not prove it is good (novelty). Satisfaction plus behavioural data that stay bad after weeks (Instagram, Snapchat) mean a bad design, not aversion.

### Gaps
- Full text of Sedley & Müller 2013 and of the HEART paper was not retrievable, so specific satisfaction numbers and Drive tactics are missing.
- Kohavi, Tang & Xu, *Trustworthy Online Controlled Experiments* (2020), the canonical reference, was not accessed directly.
- No published quantitative data was found on support-ticket spikes after redesigns.

---

## 4. User reaction: change aversion curve, duration, communication, opt-outs

### Takeaway
Change aversion is a real, predictable short-term negative reaction to changes in familiar products. Advance notice, explanation, a way to switch back during transition, and visible responsiveness to feedback reduce it. It is not an excuse for a worse product, and critics argue much "aversion" is really users correctly detecting a worse design.

### Cited Findings
- **[company-reported]** Google defines change aversion as "the negative short-term reaction to changes in a product or service." Its suggested mitigations include acknowledging feedback, and Google says change aversion "isn't an excuse for worsening user experience." — [Google Drive change aversion paper page](https://research.google/pubs/minimizing-change-aversion-for-the-google-drive-launch/); [Sedley, "Change aversion: why users hate what you launched" (GV Library)](https://library.gv.com/change-aversion-why-users-hate-what-you-launched-and-what-to-do-about-it-2fb94ce65766) (not fetchable; summary via search)
- **[opinion]** Sedley's three mitigations (talk summary): (1) tell users about changes in advance and explain them afterwards; (2) let users switch back, and do not cut off the revert option abruptly; (3) keep collecting and acting on feedback. — [tianpan.co notes on Sedley talk](https://tianpan.co/notes/128-change-aversion)
- **[opinion]** Jared Spool's critique (UIE, July 2012): Google's framing "misses the point". Users react not because of aversion but because of poor design of the change, and the problem is how the change is designed and introduced. — [UIE Brainsparks](https://archive.uie.com/brainsparks/2012/07/16/googles-take-on-change-aversion-misses-the-point/)
- **[opinion]** UX Collective on change aversion: resistance is driven by disrupted habits and perceived loss of control. — [uxdesign.cc, Design psychology: change aversion](https://uxdesign.cc/design-psychology-change-aversion-cbc10066c41f)
- **[company-reported]** Communication patterns in practice: GitHub announced each stage in its changelog, used Feature Preview toggles, ran a feedback portal and shipped accessibility fixes before making the redesign mandatory. — [GitHub changelog 2023-06-15](https://github.blog/changelog/2023-06-15-redesigned-navigation-enabled-for-all-users-beta/). Gmail announced fixed dates ahead of time (opt-out ends 16 Oct 2018). — [Workspace Updates](https://workspaceupdates.googleblog.com/2018/06/new-gmail-timeline.html)
- **[journalism]** Facebook 2006 News Feed: users "almost uniformly hated it," with petitions and threats to quit. Within days Zuckerberg apologised that Facebook "did a bad job of explaining what the new features were and an even worse job of giving you control of them," and added privacy controls. News Feed stayed and became core to the product. This is the classic case of aversion plus a real defect (missing control) being fixed without reverting the change. — [The Harvard Crimson, Sep 2006](https://thecrimson.com/article/2006/9/11/facebookcom-news-feeds-cause-dissent-in); [Fortune, 2016 retrospective](https://fortune.com/2016/09/06/facebook-news-feed-anniversary/amp)
- **[measured / company-reported]** Reddit 2018: offering old.reddit as a permanent opt-out kept the daily opt-out rate around 0.29% of logged-in users by Sept 2018 [company-reported]. Contested community analysis (Dec 2018) argued only 41% of logged-in users who had made an explicit choice chose the redesign. — [r/beta admin post](https://reddit.birdcat.cafe/r/beta/comments/9iu1ax/we_conducted_an_opt_out_survey_on_new_reddit_here); [r/redesign Dec 2018 thread](https://reddit.birdcat.cafe/r/redesign/comments/a80s15/tis_the_season_to_give_a_linkfilled_recap_of/ec7fs7r)

### Inferences
- Treat negative reaction as data to sort, not noise. Check whether complaints name a specific lost capability, a performance or accessibility problem (Twitter's contrast/eye-strain complaints, Sonos's missing accessibility), or a broken task. If so, it is a defect. Generic "I liked the old one" that fades while behavioural metrics recover is aversion.
- Communication artifacts an AI agent can produce alongside a redesign PR: a changelog entry listing what changed and **where moved things went**; a "what's new" note or one-time tour for relocated controls; and, for large changes, an opt-in/opt-out toggle with a stated end date.

### Gaps
- No reliable published figure was found for how long change aversion typically lasts (days vs weeks). The Sedley/Müller satisfaction-over-stages data could not be retrieved, so the "curve" shape is described only qualitatively.
- No study was found comparing the effectiveness of product tours vs changelogs vs opt-outs.

---

## 5. Failure case studies (with causes and data) and recoveries

### Takeaway
The failures share a few causes. Change was forced on everyone at once with no opt-out. Core habits or features were removed or relocated. Leadership overrode warning data or internal research. And the redesign served the company's goals (ads, publishers, TikTok parity, Stories parity) over users' tasks. Recoveries came from fast partial rollbacks and restoring removed features, not from waiting out the backlash.

### Cited Findings

**Digg v4 (launched 25 Aug 2010)**
- **[journalism]** v4 removed the bury button and let publishers auto-submit via RSS. Users held "Quit Digg Day" on 30 Aug 2010 and flooded the front page with Reddit links. — [Know Your Meme, Digg v4](https://knowyourmeme.com/memes/events/digg-v4); [The Mary Sue](https://www.themarysue.com/digg-v4-bury-button/)
- **[measured]** Hitwise: UK traffic to Digg fell 34% and US visits 26% from end of August to late September 2010. Hitwise also noted Reddit did not see a matching spike, so the migration story is only partly true. — [Computerworld, "Users drop Digg after unpopular redesign"](https://www.computerworld.com/article/1515228/users-drop-digg-after-unpopular-redesign.html); [TechRadar](https://www.techradar.com/news/internet/uk-digg-traffic-down-34-after-redesign-718917)
- **[company-reported]** Reddit said it gained almost 9,000 new users and 250,000 visits from Digg on 30 Aug alone. — [vator.tv](https://vator.tv/2012-07-15-digg-is-a-cautionary-tale-for-other-websites/)
- **[measured, single publisher]** TechRadar's own referral traffic from Digg fell 86% after v4 and 97% year on year. — [TechRadar, "The death of Digg is not exaggerated"](https://www.techradar.com/news/internet/web/the-death-of-digg-is-not-exaggerated-720550)
- **[journalism]** Rollback came too late. Kevin Rose polled users in Oct 2010 (TechCrunch reported 68% wanted bury back), and Digg ended RSS auto-submission in Feb 2011, saying RSS-submitted stories were "hurting Digg." Digg laid off 25 of 67 staff in Oct 2010. Rose later called v4 one of his biggest regrets. — [TechCrunch, Feb 2011](https://techcrunch.com/2011/02/11/digg-removing-rss-option-for-publishers); [TechCrunch poll](https://techcrunch.com/?p=228368); [The Next Web, Oct 2010](https://thenextweb.com/news/kevin-rose-puts-up-a-poll-asking-if-digg-should-bring-back-the-bury-feature); [ProductMint](https://productmint.com/what-happened-to-digg)

**Snapchat (redesign rolled out late 2017 to Feb 2018)**
- **[journalism]** By Feb 2018 more than 1.2 million people had signed a Change.org petition to reverse the redesign. — [Guardian via inkl](https://www.inkl.com/news/shares-in-snapchat-owner-plummet-as-redesign-hits-results)
- **[measured]** On 21 Feb 2018 Kylie Jenner tweeted to 24M followers asking if anyone still opened Snapchat. Snap shares closed about 6% lower, wiping roughly $1.3B in market value. — [BreakingNews.ie](https://www.breakingnews.ie/business/kylie-jenner-tweet-sends-snapchat-stock-tumbling-829519.html); [BuzzFeed News](https://www.buzzfeednews.com/article/williamalden/snap-stock-is-tanking-after-snapchat-redesign-fails)
- **[measured / company-reported]** Q1 2018 DAU was 191M vs 194.15M expected, and the stock fell up to 17% after hours. Q2 2018 DAU fell to 188M (−1.5%), the first decline Snap had reported. Spiegel attributed it to "disruption caused by our redesign." — [inkl/Guardian](https://www.inkl.com/news/shares-in-snapchat-owner-plummet-as-redesign-hits-results); [Inverse, Q1 2018 call](https://nc.inverse.com/article/44394-snapchat-q1-2018-earnings-call)
- **[journalism / company-reported]** Causes: one feed mixing friends' messages and Stories, celebrity/publisher content split from friends, iOS prioritised over Android, pushed live to everyone despite internal warnings. In a Sept 2018 memo Spiegel admitted the redesign was "rushed" and that Snap did not test it enough with the community. — [9to5Mac, May 2018](https://9to5mac.com/2018/05/19/snapchat-redesign-rushed/); [Digital Journal](https://www.digitaljournal.com/social-media/snap-admits-major-redesign-was-rushed/article/533978); [Cheddar/Medium, Spiegel memo](https://medium.com/cheddar/snap-ceo-evan-spiegel-outlines-the-companys-future-db59a862ffec)
- **[journalism]** Partial reversal in May 2018: friends' Stories moved back and Stories content moved to Discover. Spiegel later credited the Android app rewrite with recovery. — [TechCrunch, May 2018](https://techcrunch.com/2018/05/01/snapchat-reredesign/embed/); [BusinessLIVE](https://www.businesslive.co.za/bd/companies/2018-05-14-snapchat-relents-on-software-changes-amid-backlash/)

**Skype (redesign June 2017; rolled back Sept 2018)**
- **[company-reported, via journalism]** The 2017 redesign added Snapchat-style "Highlights" (Stories), a Capture button, colourful themes and decorative "squiggle" notification shapes. Design director Peter Skillman wrote in Sept 2018: "Calling became harder to execute and Highlights didn't resonate with a majority of users." Skype 8.29 removed Highlights, the mobile Capture button and the squiggles, and brought back a classic blue theme. Microsoft also delayed retiring the classic desktop app (planned 1 Sep 2018) to add missing features to Skype 8. — [TechCrunch, 3 Sep 2018](https://techcrunch.com/2018/09/03/skype-rolls-back-its-redesign-by-ditching-stories-squiggles-and-over-the-top-color); [Windows Central](https://windowscentral.com/skype-ditches-highlights-design-shift-simplicity-and-familiarity); [CNBC](https://www.cnbc.com/2018/09/03/microsoft-owned-skype-redesign-ditches-snapchat-like-highlights.html)
- **[journalism]** The Next Web's verdict: the new redesign "hasn't fixed its core problems." Simplifying chrome does not fix a degraded core task. — [TNW, 4 Sep 2018](https://thenextweb.com/apps/2018/09/04/skype-has-yet-another-new-design-but-hasnt-fixed-its-core-problems/)

**Instagram (full-screen feed test, July 2022)**
- **[journalism]** Kim Kardashian and Kylie Jenner shared "Make Instagram Instagram Again" (from a petition with hundreds of thousands of signatures). On 28 Jul 2022 Meta paused the full-screen test and temporarily reduced recommendations. Mosseri: "people are frustrated and the usage data isn't great." — [CNN](https://us.cnn.com/2022/07/28/tech/instagram-walks-back-updates); [Engadget](https://www.engadget.com/instagram-full-screen-feed-recommended-posts-185859342.html); [TheWrap](https://www.thewrap.com/instagram-format-return-kardashian-criticism)
- Lesson: it was run as a *test* on a subset, so a rollback was cheap. That is the system working as intended.

**Twitter (Aug 2021 Chirp font and high-contrast buttons)**
- **[journalism / company-reported]** Released ~11–12 Aug 2021 with higher-contrast buttons, the Chirp font and left-aligned text, sold as an accessibility improvement. Users reported eye strain, headaches and migraines, plus Windows font-rendering problems. Within ~2 days Twitter Accessibility said it was changing contrast on all buttons; the font stayed. — [Engadget](https://www.engadget.com/twitter-tones-down-buttons-eye-strain-154418283.html); [TechSpot](https://www.techspot.com/news/90821-twitter-redesigning-redesign-after-users-complain-headaches-eyestrain.html); [MobileSyrup](https://mobilesyrup.com/2021/08/14/twitter-update-buttons-contrast-eye-strain/)
- Lesson: "more contrast" is not automatically "more accessible." Extreme contrast and new fonts need testing on real platforms (Windows rendering) and with users who have light sensitivity.

**Sonos app (rewrite released 7 May 2024)**
- **[journalism]** The new app replaced the old one before feature parity. It shipped without sleep timers, queue and playlist editing, and local library management, and broke screen-reader accessibility for blind users. Sonos initially said the redesign took "courage." — [MacRumors, 10 May 2024](https://www.macrumors.com/2024/05/10/sonos-said-rolling-out-widely-criticized-app-redesign-took-courage/); [What Hi-Fi](https://www.whathifi.com/news/sonos-ceo-apologises-for-the-app-redesign-that-deleted-key-features); [Engadget](https://www.engadget.com/audio/speakers/why-is-the-sonos-app-so-broken-140028060.html)
- **[company-reported / measured]** CEO Patrick Spence apologised (July 2024). The fix effort was put at $20–30M across two quarters (Oct 2024 earnings call). Two finished hardware products were delayed. Fiscal Q4 2024 revenue fell 16%, and FY2024 revenue was $1.52B (−8%). Spence called the app problems a headwind to sales. He stepped down on 13 Jan 2025, and board member Tom Conrad became interim CEO. — [Customer Experience Dive](https://www.customerexperiencedive.com/news/sonos-ceo-departs-botched-app-roll-out/737177/); [MacTrast, Jan 2025](https://www.mactrast.com/2025/01/sonos-ceo-stepping-down-following-failed-app-redesign/); [The Logic](https://thelogic.co/briefing/sonos-replaces-ceo-after-botched-app-release/)
- **[journalism, unverified]** CMSWire attributed a ~25% stock decline to the episode. This was not corroborated. — [CMSWire](https://www.cmswire.com/customer-experience/sonos-app-redesign-fail-customer-outrage-and-falling-stock-prices)
- **[opinion]** Analysis: the redesign "replaced the previous experience instead of being offered as an opt-in beta alongside it." — [Tom's Guide](https://www.tomsguide.com/audio/speakers/sonos-is-returning-the-features-its-courageous-app-redesign-left-behind)

**Successes after rough launches / well-run rollouts**
- **[journalism]** Facebook News Feed (2006): massive backlash, then an apology plus added privacy controls. The feature stayed and became the core of the product. — [Harvard Crimson](https://thecrimson.com/article/2006/9/11/facebookcom-news-feeds-cause-dissent-in)
- **[company-reported]** GitHub navigation (2023) and Gmail (2018): staged opt-in → default-on with opt-out → mandatory, with published dates and feedback channels. Neither produced a sustained public revolt in the coverage found. — [GitHub changelog](https://github.blog/changelog/2023-10-17-redesigned-navigation-now-available-to-all-users/); [Workspace Updates](https://workspaceupdates.googleblog.com/2018/07/new-gmail-ga.html)
- **[company-reported]** Reddit (2018): kept old.reddit available as a permanent opt-out plus a 10% logged-out holdout, and measured opt-out rates. — [r/beta admin post](https://reddit.birdcat.cafe/r/beta/comments/9iu1ax/we_conducted_an_opt_out_survey_on_new_reddit_here)

### Inferences
Common failure causes, turned into agent rules:
1. **No forced, all-at-once cutover** (Snapchat, Skype, Sonos, Digg). Ship behind a flag or toggle and keep the old path working until the new one is proven.
2. **No removing or relocating core-task controls without a mapping** (Digg bury, Sonos sleep timer/queue, Skype calling made harder). Inventory every feature and action first; the redesign must keep 100% of them reachable, or explicitly list what is removed for human sign-off.
3. **Don't let the redesign's agenda override the user's job** (Digg publishers, Snapchat/Skype/Instagram copying a competitor's format). The core task should get easier or stay the same.
4. **Accessibility and rendering regressions are failure-grade, not polish** (Sonos screen readers, Twitter contrast and Windows fonts). Run automated a11y and cross-platform screenshots before and after.
5. **Make rollback cheap** (Instagram's test vs Sonos's irreversible app replacement). Fast reversibility separates an embarrassing week from a CEO departure.
6. **Heed warning signals** (Snapchat shipped despite metric concerns). If before/after measurements regress, stop and report rather than rationalise.

### Gaps
- **Facebook 2008 redesign and 2018 changes**: only thin secondary coverage was found ("more angry members"); no data. Not usable as a detailed case.
- **Netflix**: no redesign failure case with data was found in this session. Netflix is better known for A/B-testing UI continuously, which was not researched here.
- **Twitter → X (2023 rebrand)**: not researched. The 2021 Chirp/contrast episode is used instead.
- Digg's "16M → 6M monthly users" figure appeared only in unsourced secondary content and is excluded.
- Snapchat's long-term recovery numbers after the Android rewrite were not retrieved.

---

## 6. Redesigns that removed or hid features users relied on

### Takeaway
Removing or burying a habitual feature is the most reliable way to turn a redesign into a revolt. In every case found, the company ended up restoring the feature, at higher cost than keeping it.

### Cited Findings
- **[journalism / company-reported]** Digg v4 removed bury → TechCrunch poll found 68% wanted it back → a later CEO promised to restore it. — [TechCrunch poll](https://techcrunch.com/?p=228368); [Digital Trends](https://qa2.www.digitaltrends.com/computing/new-digg-ceo-unburies-old-features-woos-commenters)
- **[journalism]** Spotify's June 2019 mobile update stripped Your Library features (the alphabetical scroll bar, among others) to make room for Podcasts. Users threatened to move to Apple Music, and Digital Music News reported Spotify rolled the update back. A 2021 library redesign again drew complaints that users could not list their whole library by artist or song, which beta testers had raised in February before launch. — [MacRumors, Jun 2019](https://macrumors.com/2019/06/20/spotify-users-frustrated-update); [Inverse](https://www.inverse.com/science/56923-spotify-update-backlash-recently-played-alphabetical-scrolling); [Digital Music News](https://www.digitalmusicnews.com/2019/06/21/spotify-axes-mobile-features/)
- **[journalism]** Sonos 2024 shipped without sleep timer, queue editing and local library management, then restored them in updates every two weeks over the following months. — [Tom's Guide](https://www.tomsguide.com/audio/speakers/sonos-is-returning-the-features-its-courageous-app-redesign-left-behind); [Digital Music News, Jul 2024](https://www.digitalmusicnews.com/2024/07/26/sonos-ceo-apologizes-for-bump-app-redesign-amid-user-uproar-online/)
- **[company-reported]** Skype 2017 made "calling harder to execute," its core task, and the 2018 rollback was framed around "simplicity and familiarity." — [Windows Central](https://windowscentral.com/skype-ditches-highlights-design-shift-simplicity-and-familiarity)
- **[journalism]** Snapchat 2018 split friends from publishers and merged Stories with chat, hiding where friends' Stories lived. Partly reversed in May 2018. — [TechCrunch](https://techcrunch.com/2018/05/01/snapchat-reredesign/embed/)

### Inferences
- **Feature-parity inventory is a hard gate.** Before redesigning, the agent should list every route, interactive control, keyboard shortcut, setting and visible data field in the affected surfaces. After the redesign it should check each item is still present and reachable in no more clicks than before. Any removal or added depth is flagged to the human, never silently decided.
- **Moving is a form of removing.** If a control changes location, the agent should note it in the changelog and consider a one-time pointer.
- **Beta feedback is an early warning.** Spotify's 2021 complaint was raised by beta testers months before launch. When a beta or opt-in exists, unresolved feature-loss feedback should block GA.

### Gaps
- No quantitative study was found on retention impact specifically attributable to feature removal (vs restyling) in redesigns. The evidence is case-based.
- Spotify's 2019 rollback scope is reported briefly by one outlet and was not independently confirmed.
