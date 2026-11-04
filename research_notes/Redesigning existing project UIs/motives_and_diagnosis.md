# Redesigning existing product UIs: meaning, motives, diagnosis, and decision criteria (as of Nov 2026)

Evidence tags used on every claim:
- **[measured]**: a controlled study, experiment, or large dataset produced the number.
- **[expert consensus]**: several recognised practitioner sources (NN/g, Spool, Baymard, Google UX) agree, but nothing was measured.
- **[opinion]**: one practitioner, agency, or vendor said it.
- **[UNVERIFIED THIS SESSION]**: the domain was blocked in this cloud session (nngroup.com, research.google, research.google.com, library.gv.com, archive.uie.com, web.archive.org, smart-interface-design-patterns.com and blog.icons8.com would not resolve). The claim comes from search-result snippets or from the researcher's prior knowledge of a well-known source. A report writer should spot-check these before quoting them.

---

## 1. Definitions and scope: redesign vs refresh vs realign vs restyle vs rebrand vs iterative improvement. What counts as "surface" and what counts as "structure"?

### Takeaway
No authority sets a standard vocabulary. Agencies use "refresh" and "redesign" interchangeably. The distinction that does hold up is about which layer you touch. A **refresh/restyle** changes the visual skin: type, colour, spacing, imagery and component styling. It keeps information architecture (IA), navigation, flows and URLs. A **redesign** changes structure: IA, navigation, page templates, flows and often features or content. A **rebrand** changes identity (name, logo, voice, positioning), and a visual refresh usually follows from it. **Iterative improvement** is a stream of small, measured changes, the approach NN/g and Spool recommend over a "big-bang" change.

### Cited Findings
- Agencies, freelancers and clients use the two terms interchangeably. **[opinion, widely repeated]** ([Oyova](https://www.oyova.com/blog/gradual-changes-at-your-website-vs-relaunch/); [WebFX](https://www.webfx.com/blog/web-design/website-refresh-vs-redesign/))
- Refresh means "minor functional or visual enhancements". Redesign is "often long-term and comprises major changes to the website including its structure and functionality". **[opinion, agency consensus]** ([Kellton](https://design.kellton.com/node/63); [Huemor](https://huemor.rocks/blog/website-refresh-vs-redesign/))
- A refresh mostly preserves site architecture, and a redesign often reconsiders it. A refresh "more easily maintains current SEO efforts". **[opinion, agency consensus]** ([Webstacks](https://www.webstacks.com/blog/website-refresh-vs-website-redesign); [Lowcode Agency](https://www.lowcode.agency/blog/website-redesign-vs-website-refresh-whats-the-difference))
- Some agencies add a third option, "growth-driven design": launch a minimal improved site, then iterate continuously on data instead of rebuilding every few years. **[opinion]** ([Lean Labs](https://www.leanlabs.com/faq/b2b-websites/website-redesign-vs-website-refresh-vs-growth-driven-design-whats-the-difference))
- UX Myths lists "You need to redesign your website periodically" as a myth. It argues for continuous improvement instead of periodic overhauls. **[expert opinion]** ([UX Myths](https://uxmyths.com/post/712537920/myth-you-need-to-redesign-your-website-periodically))
- NN/g, in Jakob Nielsen's Alertbox piece "Fresh vs. Familiar: How Aggressively to Redesign", says: "Users hate change… get it right, and then change slowly". The piece names two situations where a more radical approach is appropriate. The snippet did not show what they are. **[expert consensus] [UNVERIFIED THIS SESSION: snippet only]** ([NN/g, Fresh vs Familiar](https://www.nngroup.com/articles/fresh-vs-familiar-aggressive-redesign/); [NN/g "Users Hate Change" video](https://www.nngroup.com/videos/users-hate-change/))
- Jared Spool's "Extraordinarily Radical Redesign Strategies" calls the "Flip-the-Switch" (big-bang) launch "the most ineffective way to get major changes into a design". He recommends incremental and parallel approaches, such as running the old and new versions side by side and letting users opt in. **[expert opinion] [UNVERIFIED THIS SESSION: snippet only]** ([Center Centre / UIE](https://articles.centercentre.com/?p=320))
- Vitaly Friedman (Smart Interface Design Patterns): "sometimes big-bang-redesigns are necessary, yet more often than not they can be avoided with a series of strategic incremental changes." **[expert opinion] [UNVERIFIED THIS SESSION: snippet only]** ([Smart Interface Design Patterns](https://smart-interface-design-patterns.com/articles/how-to-redesign-guide/))

### Inferences
- A practical, layered vocabulary the skill can use, ordered from least to most disruptive:
  1. **Targeted fix**: one defect (a contrast failure, a broken focus state, a CLS shift, a confusing label).
  2. **Polish/restyle (surface)**: tokens only (type scale, colour, spacing, radius, shadow, icon set, imagery, motion). The DOM structure, navigation and content order stay the same.
  3. **Realign (component and layout)**: hierarchy, layout grids, component choice and density change within the same IA and flows.
  4. **Redesign (structure)**: IA, navigation, templates, flows, content model.
  5. **Rebrand (identity)**: logo, name, voice and positioning. It usually forces level 2 and sometimes level 4.
- "Surface" means anything a user does not have to relearn. "Structure" means anything that moves where things are or changes how a task is done. The change-aversion literature in section 5 suggests relearning cost is what drives backlash, so this is the line that matters for risk.

### Gaps
- I found no NN/g, IDEO or academic source that formally defines "realign" or "restyle". Those terms are proposed working vocabulary, not established usage.
- The text of NN/g's two exceptions for radical redesign could not be retrieved (nngroup.com was blocked).

---

## 2. Motives: which reasons for redesigning are valid and which are invalid?

### Takeaway
Measured evidence most strongly supports four motives: usability or task-failure problems, conversion problems in well-studied flows such as checkout, accessibility non-compliance (now a legal driver in the US and EU), and performance. "Looks dated/generic/AI-made" is a legitimate motive because first-impression aesthetics are formed in 17–500 ms and affect trust. But evidence on what users prefer favours **simple and familiar** over novel, so this motive usually calls for a visual refresh, not a structural redesign. "We're bored of it", "a competitor redesigned", or redesigning on a calendar schedule are weak motives.

### Cited Findings

**Usability and task success (valid; measured)**
- Tuch et al. 2012 (*Computers in Human Behavior*, n=80, 4 versions of an online shop) found that manipulating aesthetics did **not** change perceived usability after use. Poor usability **did** lower post-use aesthetic ratings, with frustration as the proposed mediator. In the authors' words, "what is beautiful is usable" can reverse into "what is usable is beautiful". **[measured, single study]** ([Google Research listing](https://research.google/pubs/is-beautiful-really-usable-toward-understanding-the-relation-between-usability-aesthetics-and-affect-in-hci/); [InfoQ summary](https://www.infoq.com/news/2012/05/Aesthetics-Usability); [Google AI blog](https://ai.googleblog.com/2012/05/is-beautiful-usable-what-is-influence.html))
- Earlier work points the other way. Kurosu & Kashimura 1995 (ATM layouts) and Tractinsky, Katz & Ikar 2000 ("What is beautiful is usable") found apparent beauty raised perceived usability, at least before use. NN/g popularised this as the "aesthetic-usability effect" (Moran, 2017). **[measured, mixed and pre-use] [UNVERIFIED THIS SESSION: prior knowledge]** ([NN/g Aesthetic-Usability Effect](https://www.nngroup.com/articles/aesthetic-usability-effect/))

**Brand perception, "dated", generic, or AI-made look (valid for first impressions; measured)**
- Tuch et al. 2012 (*IJHCS*) showed 119 website screenshots and found that visual complexity (VC) and prototypicality (PT) affect aesthetic judgements within **17–50 ms**. Sites with **low complexity and high prototypicality** (simple and familiar) were rated most appealing. Unfamiliar sites were rated less attractive even when they were simple. **[measured]** ([Google Research listing](https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/); [Google Research blog](https://research.google/blog/users-love-simple-and-familiar-designs-why-websites-need-to-make-a-great-first-impression/); [edoc Basel](https://edoc.unibas.ch/21676))
- Reinecke et al. 2013 (CHI; 450 sites, 548 raters) built models from image statistics that explain about **half the variance** in appeal ratings after 500 ms. Visual complexity mattered far more than colourfulness. Age, gender and education moderated preferences. The paper says first impressions are "influential enough to later affect their opinions of a site's usability and trustworthiness". **[measured]** ([Harvard PDF](https://kgajos.seas.harvard.edu/papers/reinecke13aesthetics.pdf); [Harvard summary](https://www.eecs.harvard.edu/~kgajos/papers/2013/reinecke13predicting.shtml))
- Practitioners describe the "AI slop" look as purple-to-indigo gradients, Inter, and rounded cards in a grid. They explain it by models reproducing the statistical average of training data, for example Tailwind's indigo-500 default. They also note the problem is **unchosen defaults**, not any single colour. A brand that owns purple can use purple. Banning one tell just moves the model to the next most probable look. **[opinion, many blogs; no peer-reviewed data]** ([prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website); [dev.to, alanwest](https://dev.to/alanwest/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500-3h2p); [925studios](https://www.925studios.co/blog/ai-slop-web-design-guide); [Kosta Canatselis](https://world.hey.com/kostac/spot-the-slop-a-ui-designer-s-guide-to-fixing-ai-defaults-4c448c9c))

**Accessibility (valid and increasingly mandatory; measured prevalence)**
- WebAIM Million 2026: about 95.9% of the top 1M home pages have detectable WCAG 2 failures, averaging 56.1 errors per page. Low-contrast text appears on **83.9%** of pages (up from 79.1% in 2025) and is the most common failure for the eighth year running. Missing alt text affects 53.1%, missing form labels 51% and empty links 46.3%. **[measured, automated detection only] [2026 figures from secondary write-ups; webaim.org's own 2026 page was not directly checked]** ([WebAIM Million](https://webaim.org/projects/million/); [Priority Pixels summary](https://prioritypixels.co.uk/insights/web-accessibility-is-getting-worse-according-to-the-2026-webaim-million-report/); [Aaron Gustafson](https://www.aaron-gustafson.com/notebook/links/the-webaim-million-the-2026-report-on-the-accessibility-of-the-top-1000000-home-pages/))
- Legal drivers: the European Accessibility Act has applied since 28 June 2025. The US DOJ's ADA Title II rule (April 2024) requires state and local governments to meet WCAG 2.1 AA, with the first compliance date in April 2026. **[fact] [UNVERIFIED THIS SESSION: prior knowledge; check whether DOJ deadlines changed in 2025–26]** ([digitalapplied 2026 accessibility/lawsuit stats](https://www.digitalapplied.com/blog/web-accessibility-statistics-2026-wcag-lawsuit-data))

**Performance (valid, but usually an engineering fix rather than a redesign)**
- Core Web Vitals "good" thresholds, at the 75th percentile, are LCP ≤ 2.5 s, INP ≤ 200 ms (INP replaced FID in March 2024) and CLS ≤ 0.1. **[fact] [UNVERIFIED THIS SESSION: prior knowledge]** ([web.dev Web Vitals](https://web.dev/articles/vitals))

**Conversion and metrics (valid when a specific funnel step is measured)**
- Baymard's checkout research reports roughly 70% average documented cart abandonment, with a sizeable share caused by an overly long or complicated checkout. Baymard estimates large e-commerce sites can gain about 35% in conversion from better checkout design. **[measured, Baymard's benchmark] [UNVERIFIED THIS SESSION: prior knowledge; numbers update yearly]** ([Baymard cart abandonment](https://baymard.com/lists/cart-abandonment-rate))

**Invalid or weak motives, and what bad redesigns cost**
- Laura Klein: users' anger after a launch is sometimes not change aversion. "Sometimes the new design is simply worse." **[expert opinion]** ([O'Reilly, *Managing Startups*, ch. 31](https://www.oreilly.com/library/view/managing-startups-best/9781449370473/ch31.html))
- Christina Wodtke: "Users don't hate change, they hate you." Backlash follows changes that serve the company rather than the user. **[expert opinion]** ([eleganthack](https://eleganthack.com/user-dont-hate-change-they-hate-you); [Medium](https://cwodtke.medium.com/users-dont-hate-change-they-hate-you-461772fbcac7))
- Case reports of failed redesigns:
  - Digg's 2010 redesign was followed by a rapid traffic collapse.
  - Gap's 2010 logo change was reversed within about a week.
  - Australia's Bureau of Meteorology site, which cost more than A$4m, drew enough backlash that the federal government intervened.
  - Icons8 reports it "lost 47% of our users after a redesign".
  **[case reports; causality not isolated]** ([SitePoint](https://www.sitepoint.com/3-painful-site-redesign-disasters/); [Creative Bloq](https://creativebloq.com/features/7-of-the-most-hated-redesigns-of-all-time); [The Daily Aus](https://thedailyaus.com.au/podcast/did-the-bom-get-it-wrong-again); [Icons8](https://blog.icons8.com/articles/how-we-lost-47-of-our-users-after-a-redesign/) [Icons8 page itself UNVERIFIED THIS SESSION: blocked])
- A vendor claims redesigns "can cause a 10–40% drop in organic traffic", and another vendor says "80% of website redesigns fail". **[opinion/vendor marketing; no methodology, treat as unreliable]** ([Lollypop](https://lollypop.design/blog/2025/september/why-80-percent-website-redesigns-fail/))

### Inferences
- **Valid motives tie to a measurable symptom.** Examples: a task users fail, a funnel step that leaks, a WCAG failure, a CWV metric above threshold, inconsistency that measurably slows the team, or a first impression that reads as generic or untrustworthy to the target audience.
- **"AI slop" is a valid motive**, because generic defaults erode distinctiveness and the trust that first impressions drive (Reinecke; Tuch IJHCS). The research gives a precise target, though: lower visual complexity and keep layouts prototypical (familiar), while making a few deliberate, owned style choices (type, palette, imagery). An AI should not answer "looks AI-made" by inventing a novel layout or navigation. Familiar structure is rewarded, and the "slop" lives mostly in the surface layer of tokens, imagery and copy.
- **"Too dense vs too sparse"**: both studies above found complexity to be the strongest single predictor of appeal, with lower complexity rated better, so "too much" is the more common failure for marketing pages. Dense work tools (dashboards, admin screens) are a different context with no comparable data. There, density serves expert users, and stripping it out can hurt task success.
- **Performance** almost never justifies a visual redesign on its own. LCP, INP and CLS are fixed with images, fonts, scripts and layout reservation. A redesign is only warranted when the design itself causes the problem, such as a hero video, huge client-side bundles, or layout that shifts.
- **Tech debt and design-system debt** (inconsistent components, hard-coded values) justify a refactor to tokens and components. That can ship as visually neutral, or as a "restyle via tokens" that is cheap and low-risk.

### Gaps
- I found no rigorous, controlled study of how often redesigns improve or harm business metrics. The "80% fail" and "10–40% SEO drop" figures are vendor claims.
- I found no peer-reviewed study on user perception of "AI-generated-looking" UIs specifically (as of Nov 2026). All the evidence is practitioner commentary.
- I could not retrieve the Marks & Spencer (2014) or Snapchat (2018) redesign figures from accessible sources.

---

## 3. Diagnosis before changing anything: which methods find which problems, and what is the minimum viable diagnosis for a solo developer?

### Takeaway
Diagnosis methods fall into four kinds:
- **Inspection**: heuristic evaluation, expert or UX audit, consistency audit, automated accessibility and performance audits. Cheap, finds likely problems.
- **Behavioural data**: analytics, funnels, HEART metrics, session recordings. Tells you *where* and *how much*, not *why*.
- **Observation**: usability testing. Tells you *why*.
- **Perception tests**: 5-second, first-click, preference tests. Measures first impressions and findability.

One evaluator finds only about 20–51% of usability problems. Three to five evaluators together find roughly 75%. That is why a single expert pass (including an AI's pass) should be treated as a partial list.

### Cited Findings
- Nielsen & Molich 1990 (CHI): individual evaluators "found between 20 and 51% of the usability problems", while aggregated evaluations by three to five people "performed well". **[measured]** ([Nielsen & Molich 1990 PDF](https://blogs.fu-berlin.de/hci2023/files/2023/06/Nielsen-and-Molich-1990-Heuristic-evaluation-of-user-interfaces.pdf))
- Nielsen's later aggregation: one evaluator finds about 35% of problems, and five evaluators find about 75%. A reanalysis reports a 55–90% range for five evaluators depending on the interface. **[measured, variable]** ([Cornell lecture slides](https://kharms.infosci.cornell.edu/downloads/cse-556a/10-heuristic-evaluation.pdf); [MeasuringU, multiple evaluators](https://measuringu.com/he-multiple/))
- Heuristic evaluation is an expert inspection against Nielsen's 10 heuristics, typically by 2–3 people. A UX audit is broader. It combines heuristic analysis with analytics or session-recording review and a WCAG accessibility check. It outputs a prioritised backlog, where a heuristic evaluation outputs a list of likely issues. **[opinion, practitioner consensus]** ([Design Monks](https://www.designmonks.co/blog/ux-audit-vs-heuristic-evaluation); [AufaitUX](https://www.aufaitux.com/blog/custom-ux-audit-vs-heuristic-evaluation/); [TMS Outsource](https://tms-outsource.com/blog/posts/ux-audit-vs-usability-testing-vs-heuristic-evaluation/))
- Google's HEART framework (Rodden, Hutchinson & Fu, CHI 2010) groups metrics into Happiness, Engagement, Adoption, Retention and Task success. It pairs them with a **Goals → Signals → Metrics** process, so every metric traces back to an explicit product goal. **[expert framework, widely adopted]** ([Google Research PDF](https://research.google.com/pubs/archive/36299.pdf); [Amplitude explainer](https://www.amplitude.com/blog/heart-framework-software-ux.md))
- First-impression tests are valid because judgements form in 17–500 ms (Tuch 2012 IJHCS; Reinecke 2013, cited above). **[measured basis for the method]**
- The "5 users find about 85% of problems" heuristic for usability testing is attributed to Nielsen and Landauer (1993) and Virzi (1992). It is a rough, interface-dependent estimate, and later work (e.g. MeasuringU) qualifies it heavily. **[measured but contested] [UNVERIFIED THIS SESSION]** ([MeasuringU](https://measuringu.com/he-multiple/))

### Inferences
Which method finds which kind of problem:

| Problem type | Best method(s) | Cheap solo or AI version |
|---|---|---|
| Interaction and usability flaws (feedback, error recovery, consistency) | Heuristic evaluation, usability test | AI walks every key task against Nielsen's 10 heuristics, logging severity 0–4 |
| Where users drop off, and how much | Analytics funnel, HEART task-success and adoption metrics | Ask the user for their top 3 tasks and any funnel numbers. If there are none, say diagnosis is limited |
| Why users fail | Moderated or unmoderated usability test (about 5 users per round) | 3–5 friends or customers doing think-aloud on the top task |
| Accessibility | Automated (axe, Lighthouse) plus manual keyboard and screen-reader check | axe or Lighthouse run, plus a keyboard-only pass |
| Performance | Field CWV (CrUX) plus lab (Lighthouse) | Lighthouse and PageSpeed Insights |
| Generic or dated look, unclear value proposition | 5-second test, preference test, competitor comparison | Screenshot at 50%/100%: "what is this, who is it for, what's the next action?" |
| Findability and IA | First-click test, tree test, card sort | First-click on 3 tasks with 3 people |
| Inconsistency or design debt | Interface inventory or consistency audit (count distinct colours, font sizes, spacings, button styles, radii) | Scripted CSS value extraction: count unique values |

- **Minimum viable diagnosis (solo developer or AI agent), in order:**
  1. State the goal and the 1–3 primary tasks or conversions.
  2. Run automated accessibility and performance checks.
  3. Do a heuristic pass over the primary tasks.
  4. Run a consistency inventory of tokens.
  5. Do a 5-second, squint-level first-impression read.
  6. Use any real analytics, support complaints or user quotes available.

  Steps 2, 4 and 5 are objective enough for an AI to run alone. Steps 1 and 6 need input from the user. Without real behavioural data, structural (IA/flow) changes are guesses and should be proposed rather than shipped.

### Gaps
- I found no comparative study of AI-performed heuristic evaluation accuracy against human evaluators (as of Nov 2026).
- Primary NN/g pages on UX audits, 5-second tests and first-click testing were unreachable (nngroup.com blocked), so method descriptions rely on secondary sources.

---

## 4. Criteria for "what to change": mapping findings to levers, and which levers most affect perceived quality and usability

### Takeaway
The strongest measured evidence for perceived quality points at **visual complexity** (amount of elements, alignment, grouping, and how much competes for attention) and **prototypicality** (does it look like its category). Colourfulness matters much less. Perceived usability after use is driven mainly by actual usability, not by beauty. So the lever order for a "make it look designed" request is: reduce complexity and fix hierarchy first, then consistency (spacing and type scale), then typography and palette. Novelty in layout and navigation comes last, if at all.

### Cited Findings
- Visual complexity is the dominant predictor of first-impression appeal, and colourfulness is "not nearly as important". **[measured]** ([Reinecke et al. 2013](https://kgajos.seas.harvard.edu/papers/reinecke13aesthetics.pdf))
- Low complexity plus high prototypicality gives the highest appeal. Complexity is processed before prototypicality: it matters at 17 ms, and prototypicality catches up by about 50 ms or more. **[measured]** ([Tuch et al. 2012 IJHCS, Google Research](https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/); [Google blog](https://research.google/blog/users-love-simple-and-familiar-designs-why-websites-need-to-make-a-great-first-impression/))
- After real use, usability shapes aesthetic ratings more than the reverse. **[measured]** ([Tuch et al. 2012 CiHB](https://research.google/pubs/is-beautiful-really-usable-toward-understanding-the-relation-between-usability-aesthetics-and-affect-in-hci/))
- Contrast is the single most common accessibility failure (83.9% of pages in 2026). Fixing colour tokens is the highest-leverage accessibility change. **[measured]** ([WebAIM Million](https://webaim.org/projects/million/); [Priority Pixels](https://prioritypixels.co.uk/insights/web-accessibility-is-getting-worse-according-to-the-2026-webaim-million-report/))
- For AI-made looks, practitioners recommend overriding theme tokens, a deliberate palette, at most one restrained gradient, and non-default type. They warn that removing tells without positive direction just yields the next average. **[opinion]** ([dev.to, fixing the AI look](https://dev.to/alanwest/how-to-fix-the-ai-generated-look-in-your-frontend-1ahh); [Capital & Compute](https://capitalandcompute.net/blog/fix-ai-slop-design/); [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website))

### Inferences
Mapping findings to levers (proposed; built from the evidence above):

| Finding | Lever(s) | Layer | Relearning cost |
|---|---|---|---|
| Too busy, no clear focal point, high complexity | Hierarchy (one lead element per view), remove or merge elements, grouping and whitespace, fewer competing colours | Surface/realign | Low |
| Looks generic or AI-made | Type pairing and scale, palette (one owned accent), real imagery instead of stock or abstract blobs, specific copy, icon set consistency, remove default gradients and glows | Surface | None |
| Looks dated | Type, spacing rhythm, radii and shadows, imagery, motion restraint | Surface | None |
| Inconsistent (many unique sizes, colours, spacings) | Token consolidation, component unification | Surface or system | None |
| Low contrast, missing states, keyboard traps | Colour tokens, focus styles, semantics | Surface/code | None |
| Users can't find things, wrong first clicks | Navigation labels first, then IA and navigation structure | Structure | High |
| Task drop-off at a specific step | That step's form, flow, copy and error handling | Structure (local) | Medium |
| Slow LCP, INP or CLS | Images, fonts, JS, reserved space (engineering, not visual) | Code | None |
| Too sparse (low information scent, lots of scrolling for little) | Increase density in content areas, tighten spacing scale, surface key data | Realign | Low |
| New features don't fit the navigation | IA extension or restructure | Structure | High |

- The skill should touch **cheap-to-learn layers first** (tokens, hierarchy, copy). It should touch **expensive-to-learn layers** (navigation, IA, flows) only when evidence of findability or task failure exists.

### Gaps
- I found no measured ranking of individual visual levers against each other (for example, typography vs colour vs spacing effect sizes on perceived quality). Reinecke's complexity-vs-colourfulness comparison is the closest.
- Typography-readability research (line length, size, contrast) was not retrieved in this session.
- I found no measured evidence on density preferences for expert or work tools. The density inference is theoretical.

---

## 5. When NOT to redesign: incremental vs radical, change aversion, relearning cost

### Takeaway
Expert consensus (Nielsen, Spool, Friedman) is to change incrementally and avoid big-bang launches, especially for navigation and core flows. Google's change-aversion work treats a negative short-term reaction as expected and manageable. Their recipe: prime users, offer opt-in or opt-out periods, and judge on behaviour over time, not first-week sentiment. Critics (Spool, Klein, Wodtke) add that backlash often signals a real loss: users' accumulated knowledge or a genuinely worse design. Change aversion should not be used to dismiss feedback.

### Cited Findings
- Sedley & Müller 2013 (CHI EA, pp. 2351–2354) describe managing change aversion during the move from the Google Docs List to Google Drive. They define change aversion as negative reactions to alterations of a familiar product, varying in **intensity** and **duration**. Their steps include planning launch stages, assessing user impact before launch, and priming users. **[case study; Google-internal outcome] [details UNVERIFIED THIS SESSION: abstract and snippets only]** ([Google Research](https://research.google/pubs/minimizing-change-aversion-for-the-google-drive-launch/); [ACM DOI 10.1145/2468356.2468767](https://doi.org/10.1145/2468356.2468767))
- GV's library (Aaron Sedley) defines change aversion as "the negative short-term reaction to changes in a product or service". **[expert opinion] [UNVERIFIED THIS SESSION: blocked]** ([GV Library](https://library.gv.com/change-aversion-why-users-hate-what-you-launched-and-what-to-do-about-it-2fb94ce65766))
- Jared Spool argued that Google's framing "misses the point". Users don't hate change. They hate losing accumulated expertise and feeling less capable after a change. **[expert opinion] [UNVERIFIED THIS SESSION: snippet only]** ([UIE archive](https://archive.uie.com/brainsparks/2012/07/16/googles-take-on-change-aversion-misses-the-point/))
- A Spotify "Your Library" redesign case study applied mixed methods to minimise change aversion. This suggests the practice continues at major product companies. **[case study; details not retrieved]** ([CAS catalogue record](https://katalog.lib.cas.cz/KNAV/EdsRecord/edsair,edsair.doi...........fc98a7da7e3799f105b0a49d3b62a3a4))
- Nielsen/NN/g: "Users hate change… get it right, and then change slowly." **[expert consensus] [snippet only]** ([NN/g Fresh vs Familiar](https://www.nngroup.com/articles/fresh-vs-familiar-aggressive-redesign/))
- Prototypicality research: unfamiliar designs are judged less attractive even when simple. This is measured support for keeping category conventions and existing layout patterns users already know. **[measured]** ([Google Research blog](https://research.google/blog/users-love-simple-and-familiar-designs-why-websites-need-to-make-a-great-first-impression/))
- Klein: sometimes "the new design is simply worse". Separate aversion from regression by watching behaviour (task success, retention) after the novelty period. **[expert opinion]** ([O'Reilly ch. 31](https://www.oreilly.com/library/view/managing-startups-best/9781449370473/ch31.html))

### Inferences
- **Don't redesign structure when:**
  - there's no evidence of findability or task failure;
  - the user base is large and habitual (power users, daily tools);
  - the motive is purely aesthetic (handle that in the surface layer);
  - there is no way to measure before and after;
  - URLs or SEO equity would be lost without redirects.
- **A radical redesign is more defensible when:**
  - the product is early with few habituated users;
  - the current structure can't hold the product's new scope;
  - the measured problems are pervasive across most tasks;
  - a rebrand forces a new identity anyway.

  This list is inferred, because NN/g's exact two exceptions could not be retrieved.
- When structural change is warranted, ship it like Google/Spotify: stage it, preview it, offer an opt-in toggle where possible, keep the old labels and positions for primary actions, and evaluate on behaviour over weeks, not day-one sentiment.

### Gaps
- Sedley & Müller's full text, including the exact tactics and any outcome metrics, was not retrievable (research.google and research.google.com were blocked).
- No quantitative data was found on how long change aversion typically lasts. Practitioner lore says "a few weeks", but that is unsourced here.

---

## 6. Concrete decision criteria an AI can apply when a user says "redesign this"

### Takeaway
Treat "redesign this" as ambiguous. Diagnose first. Pick the **least disruptive layer that fixes the measured or observed problems**. Default to surface-level (token, hierarchy, copy) changes. Escalate to structural redesign only when there is evidence of task or findability failure, or the user explicitly asks for structural change and accepts the relearning cost.

### Cited Findings
- First impressions form in 17–500 ms and are driven mostly by complexity, then prototypicality. **[measured]** ([Tuch 2012 IJHCS](https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/); [Reinecke 2013](https://kgajos.seas.harvard.edu/papers/reinecke13aesthetics.pdf))
- A single evaluator catches only about 20–51% of usability problems. **[measured]** ([Nielsen & Molich 1990](https://blogs.fu-berlin.de/hci2023/files/2023/06/Nielsen-and-Molich-1990-Heuristic-evaluation-of-user-interfaces.pdf))
- Incremental change is preferred over big-bang change. **[expert consensus]** ([NN/g](https://www.nngroup.com/articles/fresh-vs-familiar-aggressive-redesign/); [Center Centre/Spool](https://articles.centercentre.com/?p=320); [UX Myths](https://uxmyths.com/post/712537920/myth-you-need-to-redesign-your-website-periodically))
- Metrics should map from explicit goals (Goals → Signals → Metrics). **[expert framework]** ([HEART, Rodden et al. 2010](https://research.google.com/pubs/archive/36299.pdf))
- Usability shapes post-use beauty judgements. **[measured]** ([Tuch 2012 CiHB](https://research.google/pubs/is-beautiful-really-usable-toward-understanding-the-relation-between-usability-aesthetics-and-affect-in-hci/))

### Inferences
These are proposed decision rules for skills/taste, derived from the findings above. They are synthesis, not sourced claims.

**Step 0: Clarify (ask at most 2 questions, or infer and state the assumption):**
- What prompted this? (looks generic or dated / users struggle / conversion / accessibility / speed / brand change / new features)
- Who uses it, and how often? (new visitors vs habitual users)
- What must not move? (navigation, URLs, primary actions)

**Step 1: Run the minimum diagnosis (objective checks first):**
1. Automated accessibility (contrast, labels, alt text, focus) and performance (LCP, INP, CLS) checks.
2. Token inventory: count unique font sizes, colours, spacings, radii and shadows. More than about 8 font sizes or more than about 12 greys/colours signals inconsistency. These thresholds are a heuristic, not a measured cut-off.
3. A heuristic pass over the top 1–3 tasks, logging severity.
4. A first-impression read of a screenshot: can a stranger tell what it is, who it's for and what to do next in about 5 seconds? Count the elements competing for attention above the fold.
5. A generic-default check: stock framework palette, default font, gradient or glow decorations, placeholder-y copy, icon soup, identical card grids.

**Step 2: Classify each finding by layer** (fix, surface, realign, structure, code) using the table in section 4.

**Step 3: Choose the scope:**
- **Targeted fix** if findings are few, local and do not involve the look as a whole.
- **Refresh/restyle (default for "make it look better / less AI / less dated")** if findings are mainly surface: generic defaults, inconsistency, weak hierarchy, contrast. Keep IA, navigation order, labels, URLs and primary-action positions. Change tokens, type, palette, imagery, copy, spacing and component styling. Reduce complexity.
- **Realign** if hierarchy or density is the problem within otherwise sound flows. Change layouts and grouping inside the same pages.
- **Structural redesign** only if at least one of these holds:
  - there is evidence (data, tests, or severe heuristic findings on primary tasks) of findability or task failure;
  - new scope doesn't fit the current IA;
  - the user explicitly requests it and the product has few habituated users.

  Then: change navigation labels before structure, preserve primary-action locations, propose a staged or opt-in rollout, and define HEART-style before/after metrics.

**Step 4: Guardrails:**
- Keep layouts prototypical for their category. Express "distinctive" through type, colour, imagery and copy, not through novel navigation or interaction patterns.
- Never trade accessibility or performance for style. Contrast must pass WCAG AA after a restyle.
- Never call a redesign "better" without stating which finding each change addresses. Every change should trace to a finding (Goals → Signals → Metrics logic).
- Treat an AI's own audit as one evaluator, likely to miss many problems (single-evaluator coverage was about 20–51% in human studies). Say so, and recommend a 3–5 person check for structural changes.
- Treat backlash after shipping as data. Separate change aversion (fades, behaviour recovers) from regression (task success or retention stays down).

### Gaps
- None of these rules has been validated empirically as an AI decision procedure. The numeric thresholds for the token inventory are heuristics with no source found.
- I found no published research comparing outcomes of refresh-only versus structural redesign for the same product.
