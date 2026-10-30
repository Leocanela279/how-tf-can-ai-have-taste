# Reusable UI Components and Design Systems: Value and Evidence

Evidence labels used throughout:
- **[measured]**: a controlled or instrumented measurement
- **[survey]**: self-reported practitioner survey
- **[case study]**: one organization reporting on itself
- **[standard/guidance]**: W3C, GOV.UK or NN/g normative guidance
- **[opinion]**: practitioner essay or blog
- **[vendor]**: produced by a company that sells design-system tooling, so read with that in mind

Research date: 2026-10-30.

---

## 1. Measured and surveyed benefits (speed, consistency, quality)

### Takeaway
Only two controlled studies came up, and both were small and run by interested parties. They show real gains in speed and consistency when an up-to-date system already exists:
- Figma: designers were about 34% faster.
- Sparkbox, using IBM Carbon: developers were about 47% faster and built forms that matched the design more closely.
- Neither study found an accessibility advantage worth relying on.

Survey data mostly shows what practitioners value: consistency and efficiency. It also shows that most teams never measure their system. Several numbers that circulate for big-company systems, such as "Carbon cut design costs 75%", could not be traced to a primary source.

### Cited Findings
**Figma design-system efficiency study [measured, vendor]**
- Method: a within-subject test with Figma's own designers. Each designer did two tasks of matched difficulty in a bank-account aggregator app (a transactions/trends screen and an add-account flow), one with a design system and one with old design files. Task order was alternated, and designers chose when they were done. — [Figma blog: Measuring the value of design systems](https://www.figma.com/blog/measuring-the-value-of-design-systems/)
- Result: designers finished their task **34% faster** with the design system. Figma extrapolated this for its team of 7 designers to "equivalent to adding another 3.5 designers". — [Figma](https://www.figma.com/blog/measuring-the-value-of-design-systems/)
- Caveats:
  - The author says 34% is likely the *maximum* real-world saving, because the system was directly relevant and up to date.
  - No sample size, variance or significance is reported.
  - Quality was not measured. Participants only reported, qualitatively, that they felt more confident about consistency.
  - The piece promotes Figma's Design System Analytics feature.
  - The hours extrapolation is internally inconsistent: 140 h × 1.34 ≈ 188 h, not 212 h. — [Figma](https://www.figma.com/blog/measuring-the-value-of-design-systems/)

**Sparkbox / IBM Carbon developer experiment [measured, small-N, agency]**
- Setup: 8 developers each built the same Figma contact form twice, once from scratch and once with IBM's Carbon design system. A separate group of 8 reviewers ranked the submissions for visual consistency and accessibility. — [Sparkbox: Yes, Design Systems Do Improve Developer Efficiency and Design Consistency](https://sparkbox.com/foundry/design_system_roi_impact_of_design_systems_business_value_carbon_design_system)
- Speed: Carbon was **47% faster**. Median time was 4.2 h from scratch vs 2.0 h with Carbon, and averages were 3.84 h vs 2.04 h. The Carbon times *include* time spent learning the system. — [Sparkbox](https://sparkbox.com/foundry/design_system_roi_impact_of_design_systems_business_value_carbon_design_system)
- Visual consistency: the top two submissions used Carbon. With Carbon, 5 of 8 developers improved, 2 stayed about the same and 1 got worse. — [Sparkbox](https://sparkbox.com/foundry/design_system_roi_impact_of_design_systems_business_value_carbon_design_system)
- Accessibility (mixed):
  - One developer moved from last place to mid-pack with Carbon.
  - Two improved slightly and three stayed about the same.
  - **Two from-scratch submissions beat their Carbon versions.** Two of the participants were IAAP-certified accessibility specialists. Sparkbox says teams with less accessibility expertise may see different results. — [Sparkbox](https://sparkbox.com/foundry/design_system_roi_impact_of_design_systems_business_value_carbon_design_system)
- Limitations Sparkbox states itself: "a small study of a handful of excellent developers", subjective rankings, self-timed work, and gaps of days to months between attempts. — [Sparkbox](https://sparkbox.com/foundry/design_system_roi_impact_of_design_systems_business_value_carbon_design_system)

**Sparkbox Design Systems Surveys, 2018–2022 [survey]**
- 2019 (256 responses): consistency and efficiency were the most valued attributes of design systems. — [Sparkbox 2019 survey](https://designsystemssurvey.seesparkbox.com/2019)
- 2020 (269 respondents):
  - Adoption was the top challenge for both in-house and agency respondents.
  - 81% of respondents who called their system successful had a maintenance process. — [Sparkbox 2020 survey results](https://sparkbox.com/foundry/announcing_the_2020_design_systems_survey_results)
- 2021 (370+ respondents): adoption difficulties had stayed a recurring concern since 2018. — [Sparkbox 2021 survey](https://sparkbox.com/foundry/2021_design_systems_survey)
- 2022 (200+ respondents):
  - **Only 16% tracked metrics.**
  - Successful systems had onboarding, training and support set up for subscribers and contributors. — [Sparkbox 2022 survey](https://sparkbox.com/foundry/2022_design_systems_survey)

**zeroheight Design Systems Report 2025 [survey, vendor]**
- Data was collected Sept–Nov 2024, from about 294 participants according to a secondary summary.
- Teams with a dedicated design-system team rose from 72% to 79%.
- Resourcing was strained after 2024 funding cuts, and demand for support outpaced supply.
- Leaders were asking for proof of value.
- Designers were 63% of respondents, and engineer participation doubled. — [zeroheight report PDF](https://othr.zeroheight.com/hubfs/zeroheight%20-%20Design%20System%20Report%202025%20-%20release%20version.pdf); summary via [Web Designer Depot](https://webdesignerdepot.com/?p=63603) (secondary, figures not checked against the PDF line by line)

**GOV.UK Design System [case study, government self-report]**
- A GDS post from 2020 estimated the system saves government about **£17 million a year**. It also said the code was used in more than 300 services. — [GDS blog podcast post, 2020-02-28](https://gds.blog.gov.uk/2020/02/28/podcast-gov-uk-design-system/)
- The method behind the estimate was not given in what I found, and I found no newer figure.

**Peer-reviewed practice research [academic]**
- Lamine & Cheng, "Understanding and Supporting the Design Systems Practice", accepted to *Empirical Software Engineering*, 2022:
  - Open-source design-system communities mostly discuss issues with UI component *behavior*.
  - Project leaders struggle to capture stable design knowledge while staying flexible across products.
  - Leaders prefer a **bottom-up** approach, in which components are elevated and merged from evolving products. — [arXiv 2205.10713](https://arxiv.org/abs/2205.10713)

**Big-company case-study numbers [unverified]**
- One blog claims IBM Carbon cut design costs 75% and development costs 66%, but cites no primary source. — [easy.bi blog](https://www.easy.bi/blog/design-systems-siemens-case-study/) (secondary, unsourced; do not use as fact)
- Some articles cite "30–50% design time / up to 37% dev time" ranges and attribute them only to "industry findings". — [AppStudio blog](https://www.appstudio.ca/blog/design-system-roi-feature-delivery-time/) (vendor, unsourced)
- **Airbnb DLS** (Karri Saarinen, "Building a Visual Language", c. 2016) gives a *qualitative* rationale and no numbers in what I found:
  - Growing design teams drift into inconsistent styles.
  - Products span platforms.
  - "The code is the source of truth". — summarized via [informationdesign.org repost](https://informationdesign.org/building-a-visual-language-behind-the-scenes-of-the-new-airbnb-design-system) and [Google Design: Airbnb invites you in](https://design.google/library/airbnb-invites-you-in)

### Inferences
- The two controlled studies suggest a credible range of about **30–50% time savings on routine screens or forms**. This applies when the system already exists, fits the task and is current. Neither study counts the cost of building or maintaining the system.
- Consistency gains are more reliable than accessibility gains. A component library does not automatically beat a skilled developer on accessibility.
- Most organizations do not measure their system (only 16% in Sparkbox 2022). As a result, most published ROI numbers are estimates or marketing.
- For an AI agent, the relevant result is the "from scratch vs reuse" contrast. Reusing a tested component removes a whole class of variance, and the Carbon study found that reuse helped the weakest submission most.

### Gaps
- I found no primary, numbered outcome data for Shopify Polaris, Atlassian, GitHub Primer, Salesforce Lightning or IBM Carbon. Their own sites and blogs were not reached within the search budget. Treat any circulating percentages for these systems as unverified.
- I did not retrieve zeroheight's 2026 report findings or Knapsack's "State of Design Systems" data. I found no independent Forrester TEI study of a design-system product.
- I found no studies on end-user outcomes, such as task success or conversion, that are attributable to adopting a design system.

---

## 2. Accessibility: reuse vs hand-rolling

### Takeaway
Hand-rolled interactive widgets are where accessibility breaks. The web overall is in poor shape: 95.9% of top home pages have detected WCAG failures. Pages that use ARIA show *more* detected errors. The W3C's own guidance says that bad ARIA is worse than none. That guidance favors (a) native HTML first and (b) vetted, assistive-technology-tested components for complex widgets. However, GOV.UK and Sparkbox both warn that a good component library does not make a product accessible on its own.

### Cited Findings
**WebAIM Million, 2026 edition: top 1,000,000 home pages, analyzed February 2026 [measured, automated]** — [WebAIM Million](https://webaim.org/projects/million/)
- Overall failures:
  - **95.9%** of home pages had detected WCAG 2 failures, up from 94.8% in 2025.
  - Pages averaged **56.1 errors**, up from 51.
- Most common failures:
  - low-contrast text: 83.9%
  - missing alt text: 53.1%
  - missing form labels: 51%
  - empty links: 46.3%
  - empty buttons: 30.6%
  - missing document language: 13.5%
  - Several of these (empty buttons, missing labels) are exactly what a well-built component library prevents by construction.
- ARIA usage:
  - **82.7%** of pages used ARIA, averaging more than 133 ARIA attributes per page, up 27% in one year.
  - Pages averaged 30.4 tabindex attributes and 4.8 `role="button"`.
- ARIA vs no ARIA: pages with ARIA averaged **59.1 errors vs 42** without. WebAIM notes this is a correlation, partly because pages with ARIA are more complex.
- ARIA menus: **5.7%** of pages used `role="menu"`, and **22% of those introduced accessibility barriers**. ARIA menus are a classic hand-rolled-widget failure.
- Frameworks and libraries:
  - Nearly all popular JS libraries are "associated with an increase in detected accessibility errors".
  - Average errors by framework: Astro 9.0, Next.js 40.9, React 43.5, Vue.js 64.6, AngularJS 76.6.
  - Bootstrap averaged 63.3, and the SweetAlert2 modal library 101.6.
  - These are correlations, not causes.

**W3C WAI-ARIA Authoring Practices Guide, "Read Me First" [standard/guidance]** — [APG: Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- The section "No ARIA is better than Bad ARIA" makes two points:
  - "A role is a promise": unlike native HTML, ARIA roles do not give keyboard behavior or styling. Adding `role="button"` commits the author to building all the expected keyboard behavior.
  - ARIA can "cloak" semantics, so authors can accidentally hide table or list structure.
- APG patterns target ARIA 1.2 without workarounds for gaps in browser and assistive-technology support. Testing that combination is "essential before using code from this guide in production". In other words, even W3C's reference examples are not drop-in production components.

**W3C "Using ARIA", first rule of ARIA [standard/guidance]**
- If a native HTML element or attribute already has the semantics and behavior you need, use it rather than repurposing an element and adding ARIA. — [W3C Using ARIA, Rule 1](https://www.w3.org/TR/using-aria/#rule1) (well-known wording, but the page was not re-fetched this session)

**GOV.UK Design System [standard/guidance, case study]**
- Using the Design System "does not immediately make that service accessible". Services still need their own research, design, development and testing. — [GOV.UK Design System: Accessibility](https://design-system.service.gov.uk/accessibility/)
- The GOV.UK service manual says the Design System is regularly tested against the most common assistive-technology and browser combinations and meets WCAG 2.2 AA. — [GOV.UK Service Manual: Making your frontend accessible](https://gov.uk/service-manual/technology/accessibility-for-developers-an-introduction) (search snippet, not fetched)
- A 2018 GDS post describes testing GOV.UK Elements with JAWS, NVDA, Dragon NaturallySpeaking, ZoomText and VoiceOver. — [GDS accessibility blog, 2018-02-28](https://accessibility.blog.gov.uk/2018/02/28/how-weve-made-gov-uk-elements-even-more-accessible) (snippet)
- Even this mature system has known component-level assistive-technology bugs. For example, the Details component works poorly with Dragon and VoiceOver, and this is tracked on GitHub. — via [National Archives design system accessibility statement](https://design-system.nationalarchives.gov.uk/accessibility-statement/) (snippet)

**Sparkbox Carbon experiment [measured, small-N]**
- With Carbon, the weakest developer went from last to mid-pack on accessibility. However, two experts' hand-built forms beat their Carbon versions. — [Sparkbox](https://sparkbox.com/foundry/design_system_roi_impact_of_design_systems_business_value_carbon_design_system)

### Inferences
- The strongest accessibility case for reuse applies to **complex composite widgets** such as comboboxes, menus, dialogs/modals, tabs, date pickers and listboxes. These need focus management, keyboard models and a correct ARIA state machine, and the APG says that work must be tested across browser and assistive-technology pairs. Most developers, and an AI agent, cannot do that testing per project, so using a maintained, AT-tested primitive is the rational choice.
- For simple controls, native HTML elements (`<button>`, `<a>`, `<label>`+`<input>`, `<dialog>`, `<details>`) are the "reusable component" that browsers have already tested. The first rule of ARIA puts these ahead of any library.
- Reuse lifts the floor rather than the ceiling. It mainly protects against the worst outcomes, but it does not replace contrast checks, labels and alt text, which remain the top WebAIM failures.

### Gaps
- I found no large-sample study directly comparing the accessibility error rates of headless/accessible primitive libraries (Radix, React Aria, Headless UI, Ark) with hand-rolled widgets.
- GOV.UK research on teams reusing its components, such as audit pass rates before and after adoption, was not found in this session.
- The specific failure catalogue for custom comboboxes and modals (from Adrian Roselli, Sarah Higley, or TPGi/Deque audits) was not retrieved. Only WebAIM's 22% ARIA-menu figure is quantified here.

---

## 3. Usability and consistency (Jakob's law, NN/g heuristic #4, design debt)

### Takeaway
NN/g's long-standing guidance supports consistency as a usability property:
- Internal consistency: the same patterns within a product.
- External consistency: following web and platform conventions.

NN/g explicitly recommends a design system as a way to achieve it. Jakob's law argues for conventional interaction patterns over novel ones, which is the "millions of engineers have tested it" argument applied to *users*.

### Cited Findings
- **NN/g heuristic #4, "Consistency and Standards"** (Rachel Krause, 10 Jan 2021) [standard/guidance] — [NN/g](https://www.nngroup.com/articles/consistency-and-standards/)
  - Users should not have to wonder whether different words, situations or actions mean the same thing.
  - The article distinguishes internal consistency (within a product or family) from external consistency (industry and web conventions such as the logo top-left or a magnifier icon for search).
  - It recommends that teams "create a design system" for an application or product family. Users find it familiar, and teams cut redundant work and gain a single source of truth.
  - It also recommends regular cross-team design reviews and a yearly consistency review to reduce UX debt.
  - Break conventions only when the task or efficiency requires it, because doing so increases cognitive load.
- **Jakob's law** (as described in the same NN/g article): users spend most of their time on *other* sites and bring those expectations to yours. Conventional interactions therefore lower the learning curve, and novelty for its own sake can drive users away. — [NN/g](https://www.nngroup.com/articles/consistency-and-standards/)
- Sparkbox 2019 survey: practitioners rank consistency as the top-valued attribute of design systems. — [Sparkbox 2019](https://designsystemssurvey.seesparkbox.com/2019) [survey]
- Airbnb DLS rationale [case study, qualitative]:
  - Inconsistency grows as design teams scale.
  - The goal was for Airbnb to be recognizable on every platform while following each platform's navigation and interaction conventions. — [Google Design: Airbnb invites you in](https://design.google/library/airbnb-invites-you-in) (snippet)

### Inferences
- This gives a split rule for taste:
  - **Be conventional in behavior.** Controls should work like users expect, which favors reused, standard components.
  - **Be distinctive in visual expression.** Typography, color, composition and imagery are where originality belongs.
- Hand-rolling *interaction* is where the risk sits. Hand-rolling *visual style* is where a solo developer can differentiate.
- "Design debt" or "UX debt" builds up as inconsistent one-offs: several button styles, spacing values and modal behaviors. Tokens (spacing, color, radius, type scale) plus a few core components are the cheapest defense.

### Gaps
- I found no recent quantitative study measuring the learnability or error-rate cost of internal inconsistency. The NN/g material here is expert guidance, not a new experiment.

---

## 4. Costs and risks (maintenance, over-abstraction, premature systems, homogeneity, lock-in, bundle size)

### Takeaway
A design system is a second product that needs upkeep. Surveys repeatedly name **adoption** and **maintenance** as the hard parts, and practitioners warn against building one too early. Default kits bring a further risk: a recognizable "same-y" look (the "shadcn look"), which AI generation makes worse. These risk claims are mostly opinion; I found no measured data on the risks.

### Cited Findings
**Maintenance and adoption [survey]**
- Adoption is the top challenge for both in-house and agency teams. 81% of "successful" systems had a maintenance process. — [Sparkbox 2020](https://sparkbox.com/foundry/announcing_the_2020_design_systems_survey_results)
- Adoption problems have persisted since 2018. — [Sparkbox 2021](https://sparkbox.com/foundry/2021_design_systems_survey)
- Demand outpaces design-system team capacity, and leaders demand proof of value. — [zeroheight 2025 via Web Designer Depot](https://webdesignerdepot.com/?p=63603)
- Leaders struggle to keep a system stable yet flexible across products. — [Lamine & Cheng, EMSE](https://arxiv.org/abs/2205.10713) [academic]

**When not to build one** (Bryan Braun, Sparkbox, 29 May 2018) [opinion] — [Sparkbox: When not to use a design system](https://sparkbox.com/foundry/when_not_to_use_a_design_system)
1. Small, well-communicating teams: a system there is "premature abstraction". A Sass variables file or better docs may be enough.
2. Little active development, such as build-once CMS or **time-boxed marketing sites**.
3. Short business runway: the payoff comes too late.
4. Simply building the wrong thing: weigh the true costs and benefits.

**"You don't need a design system" pieces [opinion]**
- Several practitioner pieces argue that close-knit small teams converge on good practice without the overhead. — [Folly Systems: You don't need a design system](https://medium.com/folly-systems/you-dont-need-a-design-system-38a59cc6be91); [Does your teeny-tiny team need a design system?](https://medium.com/@emmartin.design/does-your-teeny-tiny-team-need-a-design-system-d27cd560d61d)
- Counter-claim: a vendor blog says a system pays back within 2–3 months for a team of 3–5 engineers. No evidence is given. — via search summary (unverified, vendor)

**Rule of three and extraction timing [opinion/folklore]**
- The rule was popularized in Fowler's *Refactoring* and attributed to Don Roberts. Refactoring too early risks picking the wrong abstraction. — [Wikipedia: Rule of three](https://en.wikipedia.org/wiki/Rule_of_three_(computer_programming))
- Applied to React: wait until similar components exist in three places before sharing them. — [DEV: How to avoid premature abstraction in React](https://dev.to/falldowngoboone/how-to-avoid-premature-abstraction-in-react-5672)
- This matches the academic finding that leaders prefer bottom-up extraction from real products. — [arXiv 2205.10713](https://arxiv.org/abs/2205.10713)
- Sandi Metz's "duplication is far cheaper than the wrong abstraction" is the classic statement of this view. — [Sandi Metz: The Wrong Abstraction](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction) (well-known; not re-fetched this session)

**Homogeneity, "the shadcn look" [opinion]**
- Developers and critics argue that Tailwind + shadcn/ui defaults produce a recognizable "SaaS dashboard" look: the same radii, shadows, greys, cards and indigo accents. They compare it to the Bootstrap era.
- The usual diagnosis is that people ship the defaults unchanged.
- AI code generators amplify this, because they pattern-match to the same stack. — [DEV: Every Next.js website is starting to look the same](https://dev.to/dellboyan/every-nextjs-website-is-starting-to-look-the-same-12a6); [DEV: Why every AI-built website looks the same (indigo-500)](https://dev.to/alanwest/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500-3h2p); [DEV: How to fix the AI-generated look](https://dev.to/alanwest/how-to-fix-the-ai-generated-look-in-your-frontend-1ahh); [Northeast Times, 2026-07-31: AI design tools are making every website look the same](https://northeasttimes.com/2026/07/31/ai-design-tools-are-making-every-website-look-the-same/); [Design Systems Collective: tired of every Tailwind/shadcn app looking the same](https://www.designsystemscollective.com/is-anyone-else-tired-of-every-tailwind-shadcn-app-looking-the-same-69c545e73114) (member-only)
- The same critics concede that the defaults are accessible and well built, which is why teams keep them. The suggested fix is to treat shadcn as *editable source*: override tokens and component defaults at the source, and choose one radius vocabulary. — [skrd: Stop using shadcn/ui wrong](https://skrd.vercel.app/blog/stop-using-shadcn-ui-wrong); [DEV](https://dev.to/alanwest/how-to-fix-the-ai-generated-look-in-your-frontend-1ahh)

**Lock-in and bundle size**
- No sourced findings were gathered in this session (see Gaps).

### Inferences
- The costs fall mostly on **building and maintaining** a system. *Consuming* well-maintained open components (native HTML, headless accessible primitives, copy-in source such as shadcn) avoids most of the maintenance cost while keeping the accessibility and speed benefits.
- The homogeneity risk comes from **unchanged visual defaults**, not from reuse itself. Reusing behavior (headless primitives) while owning the tokens and visual layer resolves the tension.
- For an AI agent, the practical rules are:
  - Reuse behavior.
  - Never ship kit default tokens unchanged.
  - Do not create speculative abstractions. Extract on the third repetition, or sooner if duplicates must change together.

### Gaps
- I found no measured data on the bundle-size cost of styled kits (MUI, Chakra, Ant) versus headless or copy-in approaches.
- I found no evidence on lock-in or migration cost, such as published migration post-mortems with effort figures.
- I found no empirical study of visual homogeneity. All sources are opinion.

---

## 5. What this means for a solo engineer (portfolio vs app vs SaaS)

### Takeaway
No source gives a sized prescription for solo developers. The evidence above supports a graded answer:
- A **portfolio or marketing site** needs tokens and native HTML, not a design system.
- An **app** needs tokens plus accessible primitives for any complex widget.
- A **SaaS** with many screens and a long life benefits from a small in-repo component library, grown bottom-up.

In every case, *reuse tested behavior* rather than reinventing it, and *own the visual layer*.

### Cited Findings
- The case against a system for small teams and rarely changed or marketing sites is Braun's [Sparkbox: When not to use a design system](https://sparkbox.com/foundry/when_not_to_use_a_design_system) [opinion], summarized in section 4.
- Value appears during *active development* of many interfaces, which is when the 34–47% speed gains were measured. — [Figma](https://www.figma.com/blog/measuring-the-value-of-design-systems/); [Sparkbox Carbon](https://sparkbox.com/foundry/design_system_roi_impact_of_design_systems_business_value_carbon_design_system)
- Complex widgets are where hand-rolling fails: 22% of ARIA menus introduce barriers, and ARIA-using pages show more errors. — [WebAIM Million 2026](https://webaim.org/projects/million/). APG: "a role is a promise". — [W3C APG](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- Even with a vetted system, you must still test your own product. — [GOV.UK Design System](https://design-system.service.gov.uk/accessibility/)
- NN/g recommends a design system for an "application or product family". This frames it as a product-scale tool, not a page-scale one. — [NN/g](https://www.nngroup.com/articles/consistency-and-standards/)

### Inferences (synthesis; not directly sourced)
- **Portfolio or marketing site**
  - Use a token file (color, type scale, spacing, radius, motion) and semantic HTML.
  - Use one or two accessible primitives only if needed, for example a dialog or a mobile nav disclosure.
  - Distinctiveness matters most here, so avoid kit defaults.
  - A "design system" would be premature abstraction (Braun, case 2).
- **App (a handful of screens, one developer)**
  - Use tokens plus headless or accessible primitives for menus, comboboxes, dialogs, tabs, popovers and toasts.
  - Keep a small in-repo `components/` folder of things used three or more times.
  - Skip documentation sites and versioned packages.
- **SaaS (many screens, long life, possible future hires)**
  - Use tokens, a curated in-repo component set (Button, Input/Field, Select/Combobox, Dialog, Menu, Table, Toast, Empty/Loading states) and a minimal usage doc or Storybook.
  - Add lint rules against raw hex or spacing values.
  - This is where the Figma and Sparkbox-style speed gains compound, and where internal consistency (NN/g #4) pays off for users.
  - It still does not need a dedicated team. Grow it bottom-up (Lamine & Cheng).
- **Answer to "why reinvent the wheel?"**
  - Do not reinvent *behavior*. Native HTML and well-tested accessible primitives encode keyboard, focus and assistive-technology work that most hand-rolled versions get wrong (WebAIM, APG).
  - Do not over-invest in *infrastructure*. Building a system is a cost that pays off only at scale and with active development (Sparkbox, zeroheight).
  - Do not adopt *visual defaults* unexamined, because they produce the homogeneous look (opinion sources).

### Gaps
- I found no survey or study of solo developers or indie SaaS founders on component-library or design-system ROI.
- I found no data on how much time an existing open-source kit (shadcn, Radix, React Aria) saves compared with Carbon in the Sparkbox setup. That extrapolation is unsupported.
