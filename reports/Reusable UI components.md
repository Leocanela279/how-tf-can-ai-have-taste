# Reuse tested behaviour, never ship kit defaults

Reusable UI components matter because they hold the hardest, least visible part of an interface: keyboard models, focus management, screen-reader state, positioning and touch handling. That is exactly where hand-written code fails, and it is what users expect to work the way it works everywhere else. The evidence is uneven. Two small controlled studies found people worked **34% and 47% faster** when a fitting design system already existed **[M]**. A web-wide audit found that pages using ARIA average more errors than pages without it, and that **22% of hand-built ARIA menus introduce barriers** **[M]**. Almost everything else is survey data, vendor claims or opinion: ROI figures, library accessibility claims, and the "shadcn look". So a solo full-stack engineer does need reusable components, in a specific sense. He should *consume* tested behaviour, native HTML first and then one maintained headless library. He should not *build* design-system infrastructure, which is a second product, and surveys repeatedly name its upkeep as the hard part. "Millions of engineers have tested it" holds for the browser's own elements. It only partly holds for libraries. Their accessibility claims are self-reported, only React Aria publishes an assistive-technology test matrix, the W3C's reference patterns are not production-tested on mobile, and two of the most downloaded packages (vaul and cmdk) are unmaintained or stalled. The system that follows from this is small. It needs one token file, copy-in components styled only through tokens and state attributes, extraction on the third use, and stories that double as accessibility and screenshot tests. Distinctiveness comes from the layers a kit does not own. The skill's current `components.md` has the right thesis, but several of its facts are now outdated. Those are listed at the end.

Evidence labels: **[M]** measured (controlled experiment, automated audit, or registry/API data pulled on 2026-10-30); **[S]** practitioner survey; **[C]** case study, an organisation reporting on itself; **[G]** standard or official guidance (W3C, GOV.UK, NN/g, framework docs); **[V]** a vendor's claim about its own product, or a study run by a company that sells the tooling; **[O]** practitioner opinion; **[R]** first-hand reading of this repository; **[I]** this report's inference.

## Hand-rolled widgets are where accessibility breaks, and reuse lifts the floor

The case for reusable components rests first on failure data. The 2026 WebAIM Million audit of the top million home pages found detected WCAG failures on **95.9%** of them, an average of **56.1 errors per page**, and both numbers are up on 2025 **[M]** ([WebAIM Million](https://webaim.org/projects/million/)). Several of the most common failures are ones a decent component prevents by construction: missing form labels on 51% of pages, empty links on 46.3%, empty buttons on 30.6% **[M]** ([WebAIM](https://webaim.org/projects/million/)). The ARIA numbers are more telling. **82.7%** of pages use ARIA, averaging over 133 attributes each, and those pages averaged **59.1 errors against 42** on pages without ARIA. Of the 5.7% of pages that use `role="menu"`, **22% introduced accessibility barriers** **[M]** ([WebAIM](https://webaim.org/projects/million/)). WebAIM is careful to call this correlation, since ARIA-heavy pages are also more complex. It still matches the mechanism the W3C describes. In the Authoring Practices Guide's words, "a role is a promise": adding `role="button"` or `role="menu"` gives no keyboard behaviour, so the author must then build the whole expected interaction, and "no ARIA is better than bad ARIA" **[G]** ([W3C APG](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)). The first rule of ARIA follows from this. If a native element already has the semantics and behaviour, use it **[G]** ([W3C Using ARIA](https://www.w3.org/TR/using-aria/#rule1)).

Reuse raises the floor more than the ceiling. In Sparkbox's experiment, eight developers built the same form with and without IBM's Carbon system. With Carbon, the weakest developer moved from last to mid-pack on accessibility. Yet **two from-scratch forms beat their Carbon versions**, and two of the participants were certified accessibility specialists **[M, small-N]** ([Sparkbox](https://sparkbox.com/foundry/design_system_roi_impact_of_design_systems_business_value_carbon_design_system)). GOV.UK, whose system is tested against common assistive-technology and browser pairs, still warns that using it "does not immediately make that service accessible" **[G]** ([GOV.UK Design System](https://design-system.service.gov.uk/accessibility/)). Mature systems still ship component-level bugs. Its Details component, for example, has known problems with Dragon and VoiceOver **[C]** ([National Archives accessibility statement](https://design-system.nationalarchives.gov.uk/accessibility-statement/)). A component library protects against the worst hand-rolled outcomes. It does nothing about contrast, alt text or labels written by the product team, which remain the top failures on the web.

The second argument is about users, not code. NN/g's heuristic #4 separates *internal* consistency (one product behaves the same throughout) from *external* consistency (it follows web conventions). It recommends a design system as the way to get both. Jakob's law adds that users spend most of their time on other sites and bring those expectations with them, so novel interaction raises cognitive load **[G]** ([NN/g](https://www.nngroup.com/articles/consistency-and-standards/)). This gives the taste skill its central split: **behaviour should be conventional and borrowed, visual expression should be distinctive and owned [I]**. Hand-rolling interaction is where the risk sits. Hand-rolling the look is where a solo developer differentiates.

## Reuse saves 34–47% on routine screens, but building a system is a second product

The speed evidence is real but thin, and both studies were run by interested parties. Figma had its own designers do matched tasks with and without a design system and found them **34% faster** with one. The author calls this a likely *maximum*, because the system was current and directly relevant. No sample size or variance was reported, and the piece promotes a Figma feature **[M, V]** ([Figma](https://www.figma.com/blog/measuring-the-value-of-design-systems/)). Sparkbox's eight developers were **47% faster** with Carbon (median 4.2 h from scratch against 2.0 h, learning time included). Five of the eight produced visually more consistent forms, and the two best submissions both used Carbon **[M, small-N]** ([Sparkbox](https://sparkbox.com/foundry/design_system_roi_impact_of_design_systems_business_value_carbon_design_system)). Neither study counts what it costs to build or maintain the system. A credible reading is a **30–50% saving on routine screens and forms when a fitting, up-to-date system already exists [I]**.

Survey data mostly records what practitioners value and struggle with. Consistency and efficiency are the most valued attributes **[S]** ([Sparkbox 2019](https://designsystemssurvey.seesparkbox.com/2019)). Adoption has been the top challenge since 2018. **81%** of teams that called their system successful had a maintenance process **[S]** ([Sparkbox 2020](https://sparkbox.com/foundry/announcing_the_2020_design_systems_survey_results); [Sparkbox 2021](https://sparkbox.com/foundry/2021_design_systems_survey)). Only **16% tracked any metrics** **[S]** ([Sparkbox 2022](https://sparkbox.com/foundry/2022_design_systems_survey)). zeroheight's 2025 report describes demand outpacing design-system teams after 2024 budget cuts, with leaders asking for proof of value **[S, V]** ([zeroheight PDF](https://othr.zeroheight.com/hubfs/zeroheight%20-%20Design%20System%20Report%202025%20-%20release%20version.pdf); [Web Designer Depot summary](https://webdesignerdepot.com/?p=63603)). The largest public number is GOV.UK's own estimate that its system saves government about **£17 million a year** across 300+ services. That is a 2020 self-report with no stated method **[C]** ([GDS](https://gds.blog.gov.uk/2020/02/28/podcast-gov-uk-design-system/)). Widely repeated figures such as "Carbon cut design costs 75%" trace to no primary source and should not be used **[unverified]** ([easy.bi](https://www.easy.bi/blog/design-systems-siemens-case-study/)).

The cost side is mostly opinion, but it is consistent opinion. Bryan Braun argues that a design system is "premature abstraction" for small, well-communicating teams, for time-boxed marketing sites and for products with a short runway **[O]** ([Sparkbox](https://sparkbox.com/foundry/when_not_to_use_a_design_system)). Sandi Metz's "duplication is far cheaper than the wrong abstraction" supplies the remedy when a shared component sprouts conditionals for divergent callers: inline it back into each caller and re-extract from current needs **[O]** ([Metz](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction)). The rule of three sets the timing **[O]** ([Wikipedia](https://en.wikipedia.org/wiki/Rule_of_three_(computer_programming))). The one peer-reviewed study of design-system practice found that project leaders prefer **bottom-up** extraction from evolving products and struggle to stay stable yet flexible **[M, qualitative]** ([Lamine & Cheng, EMSE](https://arxiv.org/abs/2205.10713)). Homogeneity is the newest cost. Critics argue that Tailwind and shadcn defaults, amplified by AI generators, have produced a recognisable look of identical radii, greys, cards and indigo accents **[O]** ([DEV](https://dev.to/dellboyan/every-nextjs-website-is-starting-to-look-the-same-12a6); [DEV](https://dev.to/alanwest/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500-3h2p); [Northeast Times](https://northeasttimes.com/2026/07/31/ai-design-tools-are-making-every-website-look-the-same/)). shadcn's own December 2025 changelog concedes the point: "all apps started looking the same" because the defaults were "a little *too* good" **[C]** ([shadcn create](https://ui.shadcn.com/docs/changelog/2025-12-shadcn-create)).

| Question | Best evidence | Type | How far it goes |
|---|---|---|---|
| Does reuse make work faster? | Figma 34%, Sparkbox/Carbon 47% | [M], small or vendor-run | Only when a fitting system already exists; build cost excluded |
| Does reuse improve consistency? | Sparkbox rankings; practitioner rankings | [M] small-N, [S] | Reliable direction, no effect size |
| Does reuse improve accessibility? | Carbon helped the weakest developer, experts did better by hand; GOV.UK caveat | [M] small-N, [G] | Raises the floor, does not guarantee the outcome |
| Do hand-rolled widgets fail? | WebAIM ARIA errors, 22% of ARIA menus | [M] correlational | Strongest data in the field |
| Is a design system worth building? | £17M/yr GOV.UK; adoption and maintenance pain | [C], [S] | Only at product-family scale |
| Do kits make sites look alike? | Critics; shadcn's own admission | [O], [C] | No measurement exists |

So, **do you need them? You need to reuse components, but you do not need to build a design system [I].** No study has measured solo developers or indie SaaS founders. The defensible answer is to grade the investment by how much interactivity a product has and how long it will live. A portfolio needs tokens and native elements. An app needs tokens plus tested primitives for every complex widget. A SaaS benefits from a small in-repo library grown bottom-up. That is the scale at which the 30–50% speed gains and NN/g's internal consistency start to compound.

## The browser is the most-tested wheel; libraries are tested by their own account

"Why reinvent the wheel" has a layered answer, because not every wheel has been tested equally. The most tested ones are the browser's own elements: `<button>`, `<a>`, `<label>`+`<input>`, `<select>`, `<details>`, `<dialog>`, `<table>`. Each ships in every engine and is mapped to the accessibility tree by the browser vendor. Since 2024 the platform has absorbed several patterns that used to require libraries. As of 2026-10-30, webstatus.dev reports the following **[M]**:

- **Widely available:** `<dialog>` with `showModal()`, `inert`, and `:user-invalid`. `:user-invalid` became widely available on 2026-05-02.
- **Baseline newly available:** `popover` (Baseline 2025-01-27), `<details name>` for exclusive accordions (2024-09), `::details-content` (2025-09), `dialog.requestClose()` (2025-05), invoker commands (`commandfor`/`command`, Baseline 2025-12-12), and `field-sizing` (Baseline 2026-06-16).

([webstatus.dev popover](https://api.webstatus.dev/v1/features/popover); [invoker commands](https://api.webstatus.dev/v1/features/invoker-commands); [MDN Invoker Commands](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API))

Other features are still progressive enhancement:

- **Customizable `<select>`** (`appearance: base-select`) shipped in Chrome 135 and **Safari 27 (2026-09-14)**, but not Firefox. Its fallback is a working native select, but rich option content is stripped there **[M, G]** ([MDN Customizable select](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select)).
- **Interest invokers and `popover="hint"`** lack Safari, and interest invokers lack Firefox too.
- **`dialog closedby`** lacks Safari **[M]** ([MDN interest invokers](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using_interest_invokers)).
- **CSS anchor positioning** is a split verdict. Its core properties ship in all three engines (Chrome 125, Firefox 147, Safari 26), yet the web-features rollup still reads "limited" because of newer sub-features. Several 2026 blogs announcing that it "reached Baseline" overstate this **[M]** ([MDN BCD anchor-name](https://github.com/mdn/browser-compat-data/blob/main/css/properties/anchor-name.json); [webstatus.dev anchor-positioning](https://api.webstatus.dev/v1/features/anchor-positioning)).

The platform still has no native combobox, date-field segments, menu with typeahead and submenus, tabs, tree or grid. Those are the patterns where a library earns its place **[I]**.

Headless libraries are the second-most-tested wheel, but their testing is self-reported. Radix, Base UI and Reka all say they follow the APG and are tested across browsers and assistive technologies, and **none publishes a test matrix** **[V]** ([Radix](https://www.radix-ui.com/primitives/docs/overview/accessibility); [Base UI](https://base-ui.com/react/overview/accessibility); [Reka](https://reka-ui.com/llms.txt)). React Aria is the exception. It publishes the combinations it tests: VoiceOver on macOS and iOS, JAWS and NVDA on Windows, and TalkBack on Android. It also lists 36 locales, RTL keyboard behaviour and 13 calendar systems **[V]** ([React Aria Quality](https://react-aria.adobe.com/quality)). The APG itself is not production code. It says AT interoperability testing is "essential before using code from this guide in production," that its examples deliberately skip workarounds for support gaps, and that it "does not indicate which examples are compatible with mobile browsers or touch interfaces" **[G]** ([W3C APG](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)). That last point is the concrete reason to prefer a library over an agent hand-rolling from the APG. An APG-faithful widget is a desktop-keyboard reference with no mobile or AT hardening, and the libraries' added testing is the part worth borrowing **[I]**. Base UI is explicit that the developer still owns visible focus styles, colour contrast and accessible names **[V]** ([Base UI](https://base-ui.com/react/overview/accessibility)). No independent audit comparing these libraries exists **[gap]**.

Maintenance status matters as much as testing, and it changed during 2025–2026. In July 2026 shadcn/ui made **Base UI its default** primitive library. `npx shadcn init` now produces Base UI code, `-b radix` keeps Radix, and the team states Radix "is not being deprecated" **[C]** ([shadcn changelog 2026-07](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default)). Radix is maintained by WorkOS but moves slowly. Its 2026 releases are mostly fixes, its newer primitives are still `unstable_`, and it has **no Combobox and no date picker** **[M, G]** ([Radix releases](https://www.radix-ui.com/primitives/docs/overview/releases)). Two satellites that shadcn-era code depends on have stalled. **vaul's README says "This repo is unmaintained"**, yet it still gets 33M weekly downloads **[M]** ([vaul](https://github.com/emilkowalski/vaul)). **cmdk** has not released since March 2025 and its repository has moved to `dip/cmdk` **[M]** ([cmdk](https://github.com/dip/cmdk)). Headless UI's Vue package last published in September 2024 **[M]** ([npm](https://registry.npmjs.org/@headlessui/vue)), and the legacy Melt UI package in March 2025 **[M]** ([Melt next-gen](https://github.com/melt-ui/next-gen)). Download counts are therefore not a maintenance signal. A tested wheel that nobody maintains slowly becomes an untested one **[I]**.

## One theme file, copy-in components and stories that test themselves

The architecture that follows from this evidence has four layers, organised by role rather than by chemistry. Atomic design's author calls his own taxonomy "merely a mental model" and "not a linear process" **[O]** ([Brad Frost](https://atomicdesign.bradfrost.com/chapter-2/)). The molecule/organism boundary is the most criticised part of it **[O]** ([Webstacks](https://www.webstacks.com/blog/4-misconceptions-of-atomic-design-and-how-to-get-around-them)). The four layers are:

1. **Tokens.** Every raw value the system uses.
2. **Primitives.** Borrowed behaviour: native elements or a headless library.
3. **Components.** Primitives styled through tokens, which the developer owns.
4. **Patterns.** Compositions such as an auth form, a pricing table or an empty state.

The token layer has stabilised. The W3C Design Tokens Community Group published its first stable format, **2025.10**, on 28 October 2025. It is production-ready but not on the W3C Standards Track **[G]** ([W3C DTCG](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/); [DTCG FAQ](https://www.designtokens.org/faq/)). GitHub's Primer shows the three-tier practice in production:

- **Base** tokens hold raw values.
- **Functional** tokens hold global decisions such as `borderColor-default`.
- **Component** tokens such as `button-primary-bgColor-hover` "should only be used in component CSS."

([Primer](https://primer.style/foundations/primitives/token-names)) Nathan Curtis's older framing of *options* first and *decisions* second describes the same split **[O]** ([EightShapes](https://eightshapes.com/articles/tokens-in-design-systems/)).

For a solo developer working across stacks, Tailwind v4's `@theme` is the strongest delivery mechanism. Variables declared in `@theme` become both CSS custom properties and utilities. `--color-*: initial` removes the default palette, so only your colours exist. `@theme inline` lets utilities reference variables that change per theme. A theme file can be imported by any project, and that includes Astro, Next, Vue and plain HTML **[G]** ([Tailwind docs](https://tailwindcss.com/docs/theme)). shadcn already uses this mapping. It defines semantic surface/foreground pairs (`--primary` and `--primary-foreground`) in OKLCH, re-declares them under `.dark`, exposes them with `@theme inline`, and derives every radius from a single `--radius` **[G]** ([shadcn Theming](https://ui.shadcn.com/docs/theming)). A DTCG JSON file is only worth keeping when tokens must also feed Figma or a native platform **[I]**.

Component APIs should follow Curtis's 2026 principle: "Make the common configurable. Make the uncommon composable" **[O]** ([Curtis](https://medium.com/@nathanacurtis/component-examples-as-data-11f56b1b9130)). He also argues that a component is a typed contract in which each decision is stated once **[O]** ([Curtis](https://medium.com/@nathanacurtis/component-contracts-and-schemas-f7c7a6651273)). In practice, visual options belong in a typed variant recipe. `class-variance-authority` is the stable package, at about 65M weekly downloads, framework-agnostic, with `cva@1.0` in beta **[M, G]** ([cva](https://cva.style/docs)). Tailwind Variants adds slots, compound variants and conflict merging **[G]** ([Tailwind Variants](https://www.tailwind-variants.org/docs/introduction)). Behaviour belongs to the primitive, and so does the element swap: Radix uses `asChild`, which requires your component to spread props and forward its ref **[G]** ([Radix composition](https://www.radix-ui.com/primitives/docs/guides/composition)), and Base UI uses `render` and `useRender` **[G]** ([Base UI](https://base-ui.com/llms.txt)). States are styled through attributes the primitive exposes. React Aria, for example, exposes `data-hovered`, `data-pressed`, `data-focus-visible`, `data-disabled`, `data-selected`, and `data-entering` and `data-exiting` for animation. It also normalises hover so touch screens get no sticky hover **[G]** ([React Aria styling](https://react-aria.adobe.com/styling)).

Distribution should be copy-in. shadcn describes itself as "not a component library" but "how you build your component library". It distributes open source code through a CLI and a flat-file registry schema, and calls this "AI-Ready" because models can read and edit the code **[G]** ([shadcn/ui](https://ui.shadcn.com/docs)). For one person, copying beats a versioned package, because a bug fix is an edit rather than a publish-and-upgrade cycle **[O]** ([DEV](https://dev.to/bitdev_/sharing-ui-components-copy-vs-install-4mii)). The token file is the one thing worth sharing as a package, and only once two products ship **[I]**. Testing comes from the same source. Storybook treats each story as a render smoke test, a `play`-function interaction test, an accessibility test (A11y addon) and a visual baseline, and can run stories as Vitest browser tests in CI **[G]** ([Storybook](https://storybook.js.org/docs/writing-tests)). Playwright's `toHaveScreenshot()` keeps baselines per browser and platform. They have to be generated in the same pinned environment that checks them **[G]** ([Playwright](https://playwright.dev/docs/test-snapshots)).

The owner's portfolio shows where this already works and where it leaks **[R]**. It is plain HTML built with the Tailwind **3.4.17** CLI. This fixes the earlier finding that the experiment page loaded the render-blocking Play CDN, which is 123 KB gzip and which Tailwind itself calls "for development purposes only" ([Tailwind](https://v3.tailwindcss.com/docs/installation/play-cdn)). Its tokens are already semantic names (`paper`, `card`, `ink`, `muted`, `line`, `signal`). Its project index uses **five native `<details>` rows** rather than a library accordion, which is native-first done right. There are two leaks. First, the colours sit under `theme.extend.colors`, so Tailwind's default palette (`bg-blue-500` and the rest) remains available to an agent. Second, an inline style hard-codes `#ec7044` for the hover colour instead of the `signal` token. Both are the token-discipline failures a lint should catch. The fix is a one-word config change (`extend.colors` to `colors`) in v3, or `--color-*: initial` after a v4 upgrade.

Distinct products show that the look comes from layers a kit does not own. Linear runs on Radix primitives inside its own system **[C]** ([Radix case study](https://www.radix-ui.com/case-studies/linear)). It cut each theme from 98 hand-set variables to **three inputs (base colour, accent and contrast)**, fed through an LCH generator that also derives elevation. It deliberately limited how much accent colour reaches the chrome **[C]** ([Linear](https://linear.app/blog/how-we-redesigned-the-linear-ui)). shadcn's response to sameness was structural. `shadcn create` offers five styles, Vega (the classic look), Nova (compact), Maia (soft and rounded), Lyra (boxy, sharp, mono-friendly) and Mira (dense), and rewrites the component code to match **[C]** ([shadcn create](https://ui.shadcn.com/docs/changelog/2025-12-shadcn-create)). The critics who coined the "shadcn look" agree that the defaults are accessible and well built. Their complaint is that people ship them unchanged **[O]** ([skrd](https://skrd.vercel.app/blog/stop-using-shadcn-ui-wrong)).

## Specs the taste skill can adopt

### 1. Decision rule: native HTML, headless primitive or own component

Apply the steps in order and stop at the first that fits. The rule combines the first rule of ARIA **[G]**, the APG's "role is a promise" and its mobile gap **[G]**, the WebAIM menu data **[M]**, the rule of three **[O]**, and this report's synthesis **[I]**.

| Step | Ask | If yes |
|---|---|---|
| 1 | Does a **native element** have the semantics and behaviour? This covers button, link, form field, `<select>`, disclosure or accordion, modal dialog, non-modal popover, progress, meter and table. | Use it. Wire behaviour with `commandfor`/`command` and `popover` before writing JS. Use a Baseline-limited feature (customizable select, `closedby`, `popover="hint"`, `interestfor`) only when its fallback is acceptable. |
| 2 | Does the native version miss a **requirement you actually have**? Examples: nested layers, scroll lock, focus return across portals, exit animation tied to presence, collision-aware positioning in older engines, rich option content that Firefox must render. | Use the same pattern from the project's headless library. |
| 3 | Does the pattern need a **keyboard model, focus management or AT state the platform lacks**? Examples: action menu with typeahead or submenus, combobox, autocomplete, listbox, tabs, date field or picker, tree, grid, toast queue, tooltip. | Use the project's headless library. If that family lacks the pattern (Radix and Base UI have no date picker; Radix has no combobox), add the library that has it, styled with the same tokens. Never hand-roll it. |
| 4 | Is it **display, layout or domain composition**? Examples: card, project row, pricing table, empty state, hero, page header. | Build your own component from native elements and primitives, styled only with tokens. |
| 5 | Is there **no tested implementation anywhere**, such as a canvas control or a novel gesture? | Build it from the APG pattern. Treat it as high-risk: test with keyboard, VoiceOver, NVDA and touch, and record the test in the component's docs. |
| Extract | Does the same shape and intent appear for the **third** time? | Extract a shared component. If a shared component grows a third boolean or branch for one caller, inline it and split it (Metz). |

### 2. Pattern-by-pattern picks per stack, late October 2026

"Any framework" means Ark UI (React, Vue, Svelte, Solid; Zag.js also runs in vanilla JS). For Astro and plain HTML, use the native column and add a framework island with `client:visible` only for the patterns in the lower half of the table **[G]** ([Astro islands](https://docs.astro.build/en/concepts/islands/)).

| Pattern | Native first (any stack, Astro, plain HTML) | React / Next | Vue · Svelte · Solid | Never |
|---|---|---|---|---|
| Button, link | `<button>`, `<a href>` | Same, wrapped in your token-styled `Button`/`Link` | Same | Clickable `<div>`; a button that navigates |
| Disclosure, accordion, FAQ | `<details>`/`<summary>`; `name` for exclusive; animate with `::details-content` (height-to-auto via `interpolate-size` is Chromium-only) | Native; a library Accordion only for controlled animation needs | Native | JS height toggles on a div |
| Modal dialog | `<dialog>` + `showModal()` or `command="show-modal"`; `inert`; `@starting-style` for entry/exit | Native for simple cases; Base UI, React Aria or Radix Dialog for nested layers, portals or scroll lock | Reka · Bits · Kobalte/Ark Dialog | Fixed div with a manual focus trap |
| Drawer, sheet | `<dialog>` styled as a sheet | Base UI Drawer or Dialog; **not vaul** | Ark Drawer; Reka/Bits Dialog | New vaul installs |
| Popover (non-modal) | `popover` + anchor positioning core, with a fallback | Base UI, React Aria or Radix Popover (Floating UI inside) | Reka · Bits · Kobalte/Ark | Absolutely positioned div with click-outside JS |
| Tooltip | `interestfor` + `popover="hint"` only as enhancement | Base UI, React Aria or Radix Tooltip | Reka · Bits · Kobalte/Ark | Essential info in a tooltip; hover-only on touch |
| Action menu (typeahead, submenus) | None native; a nav-link list can be a `popover` disclosure **[I]** | React Aria Menu (documented submenu handling) or Base UI Menu/Menubar; Radix DropdownMenu in existing code | Reka · Bits · Kobalte/Ark Menu | `role="menu"` written by hand |
| Select | `<select>`; `appearance: base-select` behind `@supports` | Base UI, React Aria or Radix Select | Reka · Bits · Kobalte/Ark Select | Text input plus a hand-built list |
| Combobox, autocomplete | None native | React Aria ComboBox/Autocomplete (ships test utilities) or Base UI Combobox/Autocomplete; **not Radix (none)** | Reka Combobox/Autocomplete · Bits Combobox · Ark/Kobalte | Radix Popover plus a hand-rolled listbox |
| Command palette | `<dialog>` plus a combobox island | Base UI Autocomplete or React Aria Autocomplete in a Dialog; cmdk only with a "stalled since 2025-03" note | Reka Combobox in a Dialog · Ark | New cmdk dependency without the flag |
| Tabs | None native | Base UI, React Aria or Radix Tabs | Reka · Bits · Kobalte/Ark Tabs | Buttons swapping panels with no `tablist` or arrow keys |
| Date, date range | `<input type="date">` for simple forms **[I]** | React Aria DatePicker/DateRangePicker (13 calendar systems); shadcn Calendar is react-day-picker **v10**, a grid only | Reka date suite · Bits Date Picker · Ark Date Picker | A hand-rolled segmented date field |
| Toast | `popover="manual"` + `role="status"` region **[I]** | Sonner 2.x (no published AT matrix) or Base UI Toast | Ark Toast · Reka Toast | Toasts for errors that need action |
| Data table | `<table>`, `<caption>`, `<th scope>` | TanStack Table **v9** for state, plus React Aria Table when keyboard grid or selection matters | TanStack Table adapters | A grid of divs pretending to be a table |
| Tree | None native | React Aria Tree, Ark Tree View | Ark Tree View | Nested lists with click handlers |
| Field validation, auto-grow | `:user-invalid`, `<label>`, `<output>`, `field-sizing: content` | Same; Base UI Field/Number Field or React Aria fields for i18n numbers | Same | Validation styled on first keystroke |

Sources for the table: [webstatus.dev](https://api.webstatus.dev/v1/features/invoker-commands), [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API), [React Aria](https://react-aria.adobe.com/llms.txt), [Base UI](https://base-ui.com/llms.txt), [Reka](https://reka-ui.com/llms.txt), [Bits](https://bits-ui.com/llms.txt), [Ark](https://ark-ui.com/llms.txt), [Radix](https://www.radix-ui.com/primitives/docs/overview/releases), [@starting-style](https://api.webstatus.dev/v1/features/starting-style), [interpolate-size](https://api.webstatus.dev/v1/features/interpolate-size).

Library status, pulled from npm and GitHub on 2026-10-30 **[M]** ([npm registry](https://registry.npmjs.org/); [npm downloads API](https://api.npmjs.org/downloads/point/last-week/radix-ui)). Flags: **Active** means a release within about two months. **Slow** means maintained but releasing rarely or with a narrow scope. **Stale** means no release in over a year. **Unmaintained** means the project says so. **Pre-1.0** means the API can still break.

| Package | Latest (date) | Weekly downloads | Flag | Note for the agent |
|---|---|---|---|---|
| `@base-ui/react` | 1.9.0 (2026-10-09) | 26.0M | Active | shadcn default since July 2026; composes with `render`; no date picker; old `@base-ui-components/react` name is deprecated |
| `radix-ui` | 1.8.1 (2026-10-12) | 24.7M (unified package only) | Slow | Keep in existing code; composes with `asChild`; no Combobox or date picker; newer parts are `unstable_` |
| `react-aria-components` | 1.22.1 (2026-10-09) | 7.5M | Active | Only library with a published AT matrix; best for dates, combobox, tables, i18n; docs moved to react-aria.adobe.com |
| `@ark-ui/react` (+ Zag 1.47) | 5.40.0 (2026-10-29) | 1.4M | Active | 52 components across 4 frameworks plus vanilla |
| `reka-ui` (Vue) | 2.11.0 (2026-10-05) | 2.8M | Active | Replaces `radix-vue`, which is frozen at 1.9.17 |
| `bits-ui` (Svelte 5) | 2.20.2 (2026-10-23) | 1.6M | Active | Full date suite |
| `@kobalte/core` (Solid) | 0.13.14 (2026-09-07) | 4.96M (unexplained) | Active, pre-1.0 | Pin versions |
| `@ariakit/react` | 0.4.42 (2026-10-14) | 1.8M | Active, pre-1.0 | Pin versions |
| `@headlessui/react` | 2.2.10 (2026-04-07) | 9.9M | Slow | Narrow scope |
| `@headlessui/vue` | 1.7.23 (2024-09-09) | n/a | **Stale** | Do not start new Vue work on it |
| `melt` / `@melt-ui/svelte` | 0.44.0 (2026-01-04) / 0.86.6 (2025-03-28) | n/a | Low activity / **Stale** | Prefer Bits UI |
| `sonner` | 2.0.8 (2026-08-09) | 56.5M | Active | No published AT matrix |
| `cmdk` | 1.1.1 (2025-03-14) | 46.3M | **Stale** | Repo moved to `dip/cmdk`; about 19 months without a release |
| `vaul` | 1.1.2 (2024-12-14) | 33.4M | **Unmaintained** | Its README says so |
| `@tanstack/react-table` | 9.3.1 (2026-10-12) | n/a | Active, new major | Code written against v8 is stale; headless, so grid semantics are yours |
| `react-day-picker` | 10.0.2 (2026-09-30) | n/a | Active, new major | Calendar grid, not a date field |
| `@floating-ui/dom` / `react` | 1.8.0 / 0.27.20 (2026-07-11) | n/a | Active | Still needed where anchor-positioning gaps matter |
| `shadcn` CLI | 4.23.0 (2026-10-27) | n/a | Active | Check `components.json` style (`base-*` or `radix-*`) before writing code |
| `class-variance-authority` | stable; `cva@1.0` in beta | ~65M | Active | Use the stable name until 1.0 ships |

SwiftUI system controls (`Menu`, `Picker`, `DatePicker`, `.sheet`, `.popover`, `.confirmationDialog`) are the tested primitive on Apple platforms. This research did not verify them against Apple sources.

### 3. Architecture: token → primitive → component → pattern

**Folders by role.** Use `styles/theme.css` (tokens), `components/ui/` (primitive wrappers copied in from shadcn or written over a headless library), `components/` (your own display components) and `patterns/` (compositions). Do not create molecule or organism folders **[I]**.

**Token tiers.**

| Tier | Holds | Declared in | Makes utilities? | Example | Who may reference it |
|---|---|---|---|---|---|
| Primitive (options) | OKLCH ramps generated from 2–3 inputs, the spacing base, the type scale, a radius base, durations and easings | `:root` | No | `--sand-50`, `--ember-600`, `--radius-base` | Only semantic tokens |
| Semantic (decisions) | Surface/foreground pairs, `border`, `ring`, status colours, re-declared per theme | `:root`, `[data-theme="dark"]` | Yes, via `@theme inline` | `--surface`, `--on-surface`, `--accent`, `--on-accent`, `--danger` | Components and patterns |
| Component (exceptions) | Values that genuinely differ from semantics, or are themed per tenant | The component's own CSS | No | `--button-accent-bg-hover` | Only that component's file (Primer's rule) |

```css
@import "tailwindcss";

/* Tier 1: options. In :root, so they create no utilities and cannot leak into markup. */
:root {
  --sand-50: oklch(0.97 0.01 80);   --sand-900: oklch(0.21 0.01 80);
  --ember-500: oklch(0.68 0.17 40); --ember-600: oklch(0.6 0.17 40);
  --radius-base: 0.25rem;
}

/* Tier 2: decisions, one block per theme. */
:root {
  --surface: var(--sand-50);  --on-surface: var(--sand-900);
  --accent: var(--ember-600); --on-accent: var(--sand-50);
  --line: oklch(0.88 0.01 80); --ring: var(--ember-500);
  --danger: oklch(0.55 0.2 25); --on-danger: var(--sand-50);
}
[data-theme="dark"] {
  --surface: var(--sand-900); --on-surface: var(--sand-50);
  --accent: var(--ember-500); --on-accent: var(--sand-900);
  --line: oklch(0.3 0.01 80);
}

/* Only semantic names become utilities; Tailwind's default palette is removed. */
@theme { --color-*: initial; }
@theme inline {
  --color-surface: var(--surface);   --color-on-surface: var(--on-surface);
  --color-accent: var(--accent);     --color-on-accent: var(--on-accent);
  --color-line: var(--line);         --color-ring: var(--ring);
  --color-danger: var(--danger);     --color-on-danger: var(--on-danger);
  --radius-sm: calc(var(--radius-base) * 0.5);
  --radius-md: var(--radius-base);
  --radius-lg: calc(var(--radius-base) * 2);
  --font-display: "Your Display", ui-serif, serif;
  --font-body: "Your Text", ui-sans-serif, system-ui, sans-serif;
}
```

The same file serves Astro, Next, Vue and plain HTML builds. Tailwind v3 projects get the same guardrail by defining `theme.colors` instead of `theme.extend.colors` **[G]** ([Tailwind](https://tailwindcss.com/docs/theme)).

**Variant recipes.** Each component gets at most two enum axes, `intent` and `size`. Add `tone` or `density` only when a real second dimension exists. Do not use boolean style flags (`isBig`, `isRed`). Use `compoundVariants` for combinations, Tailwind Variants slots for multi-part components, and cap the configuration props at about five. Anything rarer becomes composition through children or slots. The number five is a heuristic **[I]**, and the principle behind it is Curtis's **[O]**.

```ts
export const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring " +
  "disabled:opacity-60 aria-busy:cursor-progress",
  {
    variants: {
      intent: {
        accent: "bg-accent text-on-accent hover:bg-accent/90",
        quiet: "bg-transparent text-on-surface hover:bg-on-surface/5",
        danger: "bg-danger text-on-danger hover:bg-danger/90",
      },
      size: { sm: "h-8 px-3 text-sm", md: "h-10 px-4", lg: "h-12 px-6 text-lg" },
    },
    defaultVariants: { intent: "accent", size: "md" },
  }
);
```

**Composition.** Every component spreads remaining props and forwards its ref, so it satisfies `asChild` (Radix) and `render` (Base UI). Before writing a trigger, the agent reads `components.json` or the imports. The two libraries compose differently:

- Base UI: `<Dialog.Trigger render={<Button intent="quiet" />}>Edit</Dialog.Trigger>`
- Radix: `<Dialog.Trigger asChild><Button intent="quiet">Edit</Button></Dialog.Trigger>`

Multi-part components use compound parts (`Card.Header`, `Card.Body`) rather than a row of `title`, `subtitle` and `icon` props. Stateful inputs accept both `value` with `onValueChange` (controlled) and `defaultValue` (uncontrolled), the same way the primitives do **[G, I]**.

**States.** Every interactive component is styled for each state that applies, through attributes. JS-toggled class names are never used for state.

| State | Native CSS | Radix | React Aria |
|---|---|---|---|
| Hover | `:hover` inside `@media (hover: hover)` | `:hover`; `data-highlighted` on items | `data-hovered` (touch-safe) |
| Focus visible | `:focus-visible` | `:focus-visible` | `data-focus-visible` |
| Pressed | `:active` | `:active` | `data-pressed` |
| Disabled | `:disabled` | `data-disabled` | `data-disabled` |
| Loading | `[aria-busy="true"]` | same | same |
| Invalid | `:user-invalid`, `[aria-invalid="true"]` | `[aria-invalid]` | `data-invalid` |
| Selected or checked | `:checked` | `data-state="checked"` or `"active"` | `data-selected` |
| Open, entering, exiting | `[open]`, `:popover-open`, `:modal`, `@starting-style` | `data-state="open"` | `data-entering`, `data-exiting` |

Base UI also exposes state as `data-*` attributes. Read each component's docs for the exact names. Sources: [React Aria styling](https://react-aria.adobe.com/styling), [Radix composition](https://www.radix-ui.com/primitives/docs/guides/composition).

**Testing gate.** Write one story per variant and per state. The gate then runs, in order:

1. Render smoke test (Storybook Vitest addon, or plain Vitest).
2. Keyboard interaction test in a `play` function or in Playwright: Tab reaches the control, Enter or Space activates it, Escape closes it, focus returns to the trigger.
3. axe on every story, through the A11y addon or `@axe-core/playwright`. React Aria documents known false positives on its components, so triage the results rather than treating every violation as a bug **[V]** ([React Aria](https://react-aria.adobe.com/quality)).
4. `toHaveScreenshot()` of a kitchen-sink page in light and dark, generated and checked in one pinned CI environment.
5. Token lint: no raw hex, px or ms values in component files; no default-palette classes; no untouched kit tokens; component-tier tokens only inside their own component.

Hard widgets that you own (decision step 5) also get a manual VoiceOver, NVDA and touch pass, because the APG gives no mobile guidance **[G, I]** ([Storybook](https://storybook.js.org/docs/writing-tests); [Playwright](https://playwright.dev/docs/test-snapshots); [APG](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)).

### 4. Sizing: portfolio, app, SaaS

No source publishes component counts by product type. The numbers below are this report's synthesis **[I]**, anchored to Braun's "time-boxed marketing site" exception **[O]**, NN/g's "application or product family" framing **[G]**, and the condition the speed studies share: active development of many screens **[M]**.

| | Portfolio or marketing site | App (one developer, a handful of screens) | SaaS (many screens, long life, possible hires) |
|---|---|---|---|
| Tokens | One `theme.css`, with semantic colours, type scale, spacing, radius and motion; default palette removed | The same, plus a dark theme | The same, plus component-tier tokens only where tenants or brands differ |
| Behaviour | Native elements; at most one or two islands (a filter, a lightbox, a contact form) with `client:visible` | One headless family (Base UI or React Aria in React; Reka, Bits or Ark elsewhere), plus a gap-filler for dates if needed | Same as the app |
| Own components | 8–15 static ones: Layout, Nav, Footer, Section, ProjectRow, CaseStudy blocks, Button/Link, Tag, Figure, Prose | 20–30: Button, IconButton, Field wrappers, Select, Combobox, Checkbox, Switch, Dialog, Sheet, Popover, Tooltip, Menu, Tabs, Toast, Badge, Avatar, Skeleton, EmptyState | The app set plus patterns: DataTable, Filters, Pagination, Settings layout, Billing, Auth, CommandMenu, Notifications, and a loading/empty/error triad |
| Docs | None beyond comments | A README per folder | One story file per component; when to use it, when not to, the keyboard map |
| Tests | Lint, axe on the built page, one screenshot | Lint, axe, keyboard checks on interactive components | The full gate in spec 3 |
| Distribution | Inside the site's repo | Copy-in (shadcn CLI, then edit) | Copy-in components; `theme.css`, and optionally a private shadcn registry, become a shared package once two products ship; Changesets only once three or more live projects need the same fix at once |

For the owner's current portfolio, that means: keep the native `<details>` index, move colours from `extend.colors` to `colors`, and replace the hard-coded `#ec7044` with the `signal` token. Add nothing else **[R, I]**.

### 5. Rules for a distinct look on top of a kit

| Rule | Why | What the lint or critic checks |
|---|---|---|
| Behaviour stays conventional; the visual layer is owned | NN/g heuristic #4 and Jakob's law favour familiar interaction **[G]** | Widget roles appear only in files that import a primitive |
| Replace kit tokens before building any screen | Unchanged defaults are the cause of sameness, by the critics' and shadcn's own account **[O, C]** | Untouched shadcn values (neutral `--primary: oklch(0.205 0 0)`, `--radius: 0.625rem`), MUI `#1976d2`, Bootstrap `#0d6efd`, default palette classes such as `indigo-500` |
| Generate the palette from 2–3 inputs in OKLCH or LCH, and limit how much accent reaches the chrome | Linear's three-input generator and its restrained chrome colour **[C]** | Accent used on more than about 10% of the screen's area **[I]** |
| Pair a non-default display face with a text face (and a mono only if it carries meaning) | The kit look includes Inter or Geist everywhere **[O]** | Display face missing from headings |
| Choose density and radius deliberately; derive every radius from one base | shadcn's single `--radius` and its Lyra, Mira and Maia styles exist for this **[G, C]** | More than one unrelated radius value; Vega style left as is |
| Define elevation and border logic once (tinted surfaces, shadow-as-border, or hairlines) | Linear derives elevation from the same generator **[C]** | Stock `shadow-md` on every card |
| Edit the copied component source, including shapes and spacing, not only colours | The copy-in model exists for this **[G]** | `components/ui/` byte-identical to the registry version **[I]** |
| Add 2–3 signature components no kit ships (portfolio: project index row, spec sheet, colophon; SaaS: the domain table or editor) | Distinctiveness lives where the kit has nothing to offer **[I]** | Every section built from Card + Button |

## What the current components.md gets wrong or leaves out

The draft's thesis holds up. "Borrow the behaviour, own the look", the four layers, native-first, extracting on the third use, keyboard checks and "size the system to the product" all match the evidence. The items below are contradicted or outdated, or need a qualifier.

| # | The draft says | The evidence says | Change |
|---|---|---|---|
| 1 | "shadcn/ui (copies Radix-based code into the repo)" | Since July 2026 `shadcn init` defaults to **Base UI**; `-b radix` keeps Radix; styles are stored as `{library}-{style}` ([shadcn](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default)) | Say Base UI by default; tell the agent to read `components.json` and use `render` or `asChild` to match |
| 2 | React row lists "Radix Primitives, React Aria Components, Base UI" as equals | Radix has no Combobox or date picker and its new parts are `unstable_`; Base UI is the most active option and shadcn's default ([Radix](https://www.radix-ui.com/primitives/docs/overview/releases)) | For new work: Base UI or React Aria. Keep Radix where it already exists |
| 3 | "Command menu: cmdk (React)" | No release since 2025-03-14; the repo moved to `dip/cmdk` ([GitHub](https://github.com/dip/cmdk)) | Flag it as stalled; prefer Base UI or React Aria Autocomplete inside a Dialog |
| 4 | (vaul not mentioned) | The README says "unmaintained", yet it gets 33M weekly downloads through older shadcn Drawers ([vaul](https://github.com/emilkowalski/vaul)) | Add: no new vaul installs; use Base UI or Ark Drawer |
| 5 | Vue: "Reka UI, Ark UI, Headless UI" | `@headlessui/vue` last published 2024-09-09 ([npm](https://registry.npmjs.org/@headlessui/vue)) | Drop Headless UI for Vue; note that `radix-vue` is frozen and is now Reka |
| 6 | Svelte: "Bits UI, Melt UI, Ark UI" | Legacy Melt last published 2025-03; next-gen Melt last released 2026-01 ([GitHub](https://github.com/melt-ui/next-gen)) | Bits UI first, Ark second, Melt with a low-activity flag |
| 7 | Solid: "Ark UI, Kobalte" (no flag) | Kobalte is still 0.13.x ([GitHub](https://github.com/kobaltedev/kobalte)) | Add "pre-1.0, pin versions" |
| 8 | "Date picking: React Aria's date pickers, or react-day-picker" | react-day-picker is a calendar grid, now at v10; Radix and Base UI ship no date picker; Reka, Bits and Ark do ([npm](https://registry.npmjs.org/react-day-picker); [Reka](https://reka-ui.com/llms.txt)) | Use react-day-picker only for the grid; never hand-roll segmented fields; list the per-framework date suites |
| 9 | "Tables: TanStack Table (headless, any framework)" | Now v9; it leaves grid semantics and keyboard handling to you ([npm](https://registry.npmjs.org/@tanstack/react-table)) | Note the v9 API; add React Aria Table where keyboard grid or selection matters |
| 10 | Popover: "all major browsers since 2024" | Baseline newly available **2025-01-27** (Safari 17, iOS 18.3) ([webstatus.dev](https://api.webstatus.dev/v1/features/popover)) | Correct the date |
| 11 | Popover positioning "needs CSS anchor positioning (not everywhere yet)" | The core properties ship in Chrome 125, Firefox 147 and Safari 26; only the rollup still reads "limited" ([BCD](https://github.com/mdn/browser-compat-data/blob/main/css/properties/anchor-name.json)) | Use anchor positioning with a fallback; keep Floating UI when collision handling must be pixel-identical |
| 12 | Popover for a "simple menu" | `popover` gives top layer and light dismiss, not menu semantics or arrow keys; "a role is a promise" ([APG](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)) | Popover for a nav-link disclosure; an action menu needs a primitive **[I]** |
| 13 | Customizable `<select>` "Chromium-only so far" | Chrome 135 **and Safari 27** (2026-09-14); not Firefox; still not Baseline ([MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select)) | Update; add `@supports (appearance: base-select)`; never put meaning in rich option content |
| 14 | Disclosure: "Animate the content with `@starting-style`" | The Baseline hook is `::details-content` (2025-09); `<details name>` gives exclusive accordions (2024-09); animating to `height: auto` needs `interpolate-size`, Chromium only | Name `::details-content` and `name`; treat height animation as Chromium-only enhancement. The portfolio's `@starting-style` on `.proj-body` should be checked in Firefox and Safari |
| 15 | Modal dialog row lists only `showModal()` | Invoker commands (`command="show-modal"`, Baseline 2025-12), `requestClose()` (2025-05), `inert` (widely available); `closedby` lacks Safari ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API)) | Add them: no JS is needed to open or close a modal |
| 16 | Native table omits validation and auto-grow | `:user-invalid` is widely available (2026-05); `field-sizing` became Baseline 2026-06 ([webstatus.dev](https://api.webstatus.dev/v1/features/field-sizing)) | Add rows |
| 17 | "Pick one family per project ... Don't mix libraries" | No single family covers every pattern (Base UI and Radix lack dates; Radix lacks combobox); shadcn itself combines a primitive library with Sonner and react-day-picker | One family for overlapping patterns; a second library only to fill a named gap, styled with the same tokens |
| 18 | Behaviour where "millions of users have already found its bugs in good libraries" | Library accessibility claims are self-reported; only React Aria publishes an AT matrix; Radix has 258 open issues; in the Carbon study experts beat the library on accessibility; GOV.UK says reuse is not accessibility | Rephrase: libraries raise the floor and you still test. Hand-rolled widgets are the larger, measured risk |
| 19 | "One component per job. When two drift apart, merge them; don't add a third." | Right for visual duplicates (NN/g consistency); wrong when one abstraction is accumulating branches for divergent callers (Metz) ([Metz](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction)) | Merge look-alike duplicates; inline and split an abstraction that is serving divergent intents |
| 20 | Tokens: "CSS custom properties (or a Tailwind theme that points at them)" | Three tiers, `@theme inline`, `--color-*: initial`, `:root` for primitives, component tokens only in component CSS ([Tailwind](https://tailwindcss.com/docs/theme); [Primer](https://primer.style/foundations/primitives/token-names)) | Add the tier table and the `theme.css` skeleton from spec 3 |

Three adjacent fixes apply to `scripts/lint.mjs` **[I]**. First, its `PRIMITIVE_IMPORT` list exempts files importing `cmdk`, `radix-vue` and `@headlessui/` from the hand-rolled-widget warning. That is fine for detection, but those three are now stale and should carry their own WARN. Second, `@zag-js/` is missing from the list. Third, `kit-default-theme` matches shadcn's neutral primary but not `--radius: 0.625rem` or default-palette classes such as `indigo-500`. The SwiftUI row stays as it is but is unverified by this research. The eight-state list is a sound house rule, though no canonical source defines "eight".

## Conclusion

The question "should I reuse or build?" splits along a line most advice blurs. Behaviour and appearance have opposite economics. Behaviour is expensive to get right, invisible when it works, and judged against every other site the user has visited, so the rational move is to borrow it from the most-tested source available: the browser first, then a maintained headless library. Appearance is cheap to change, and it is the only thing that makes the work recognisably his. The kit's real risk is not lock-in or bundle size, for which this research found no data. The risk is that its visual defaults get adopted along with its behaviour. For an AI agent this matters doubly, because the agent's pull toward the statistical mean lands exactly on unchanged kit defaults.

The second insight is that maintenance status has become part of the "is it tested?" question. In 2026, two of the most downloaded UI packages are unmaintained or stalled. The most popular kit switched its primitive library mid-year. The platform absorbed dialogs, popovers, accordions and invokers. A component rule written eighteen months ago is now partly wrong. That argues for the skill holding its library picks as dated data, a status table with a check date, rather than as prose rules, and for re-pulling registry dates before recommending any dependency. The architecture can stay fixed: one token file, borrowed behaviour, owned components, extraction on the third use, and stories that test themselves. The library names inside it have to be rechecked from time to time.
