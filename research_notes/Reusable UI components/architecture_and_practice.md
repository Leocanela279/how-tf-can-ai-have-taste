# Architecting your own reusable component system on tested primitives (architecture and practice)

Scope: a playbook for one engineer, plus an AI agent working for him, to build a component system that follows the tokens → primitives → components → patterns model across a portfolio, an app and a SaaS, and that keeps a distinct look. Stacks: React/Next + Tailwind, Vue, Astro, plain HTML. Research date: 2026-10-30.
Labels used below: **[guideline]** is official documentation or a spec. **[case study]** is a named product or team describing its own work. **[opinion]** is a practitioner's view or blog post. **[inference]** is my own reasoning.

---

## 1. Layering models: atomic design, EightShapes, three-tier tokens, DTCG, Tailwind v4 @theme, and how mature systems map tokens to components

### Takeaway
Treat "tokens → primitives → components → patterns" as a mental model, not a folder taxonomy. Atomic design's own author says it is neither linear nor rigid, and the molecule/organism split is the most criticised part of it. The token layer has stabilised:
- The W3C DTCG Format Module reached its first stable version, 2025.10, on 28 Oct 2025.
- Primer's base → functional → component tiers and shadcn's semantic `--primary`/`--primary-foreground` pairs, exposed through Tailwind v4 `@theme inline`, are the most practical patterns to copy.

### Cited Findings
**Atomic design and its critiques**
- [guideline] Atomic design has five stages: atoms (label, input, button), molecules (simple groups such as a search form), organisms (complex sections such as a header), templates (layout without final content), and pages (templates filled with real content, used to test the system) — [Atomic Design ch. 2, Brad Frost](https://atomicdesign.bradfrost.com/chapter-2/)
- [opinion, from the author] Frost says atomic design is "not a linear process." He calls it "merely a mental model," and says carrying the chemistry analogy too far "might confuse your stakeholders." He cites GE building its own taxonomy, so teams should use whatever labels communicate clearly — [Atomic Design ch. 2](https://atomicdesign.bradfrost.com/chapter-2/)
- [opinion] The common critique is that the molecule/organism boundary is fuzzy:
  - Teams lose time to "taxonomy wars" (is a search bar a molecule or an organism?).
  - Developers look in the wrong folder for a component.
  - Several writers recommend organising by function, or merging molecules and organisms into one tier.
  - A secondary write-up reports that Frost has said the labels "have never been the point."
  - Sources: [Webstacks](https://www.webstacks.com/blog/4-misconceptions-of-atomic-design-and-how-to-get-around-them); [Qt, "why the labels don't matter"](https://www.qt.io/software-insights/atomic-design-systems-why-the-labels-dont-matter); [FutureLearn](https://www.futurelearn.com/info/?p=62341); [Design Systems Collective](https://www.designsystemscollective.com/atomic-design-misconceptions-that-lead-to-rigid-implementations-abdd829cec72). These are practitioner blogs, not studies.

**EightShapes / Nathan Curtis**
- [opinion] Curtis's 2016 article "Tokens in Design Systems" splits tokens into *options* and *decisions*:
  - Options are the available raw values, such as the palette.
  - Decisions apply options to contexts, such as "background colour on a dark surface."
  - Options come first, then decisions.
  - Start with colour and type, then extend decisions to the rest of the design language.
  - Sources: [EightShapes, Tokens in Design Systems](https://eightshapes.com/articles/tokens-in-design-systems/); [Medium original](https://medium.com/eightshapes-llc/25dd82d58421). Summarised via secondary sources because the Medium page returned 403.
- [opinion] Curtis's 2026 work treats a component as a strict typed contract defined by a schema:
  - Good contracts are well typed, platform-independent and verifiable.
  - They are "normalized": each decision is stated once. His counter-example is a disabled opacity repeated across 96 Figma variants.
  - His specs cover three concerns: API (props and elements), variants (layered styling, token bindings, slots, layout), and examples. Behaviour and accessibility are authored as supplements.
  - Sources: [Component Contracts and Schemas, Jul 2026](https://medium.com/@nathanacurtis/component-contracts-and-schemas-f7c7a6651273); [Spec-Driven UI Component Development, Aug 2026](https://medium.com/@nathanacurtis/spec-driven-ui-component-development-6e3f43f52450). Summarised from his Medium RSS feed; the full articles were not fetched.

**Three-tier tokens in practice: GitHub Primer**
- [guideline] Primer uses three tiers:
  - **Base** maps to raw values (`base-color-green-5`, `base-size-4`).
  - **Functional** covers global UI patterns (`bgColor-inset`, `borderColor-default`).
  - **Component/pattern** tokens (`button-primary-bgColor-hover`, `control-danger-borderColor-rest`) "should only be used in component CSS."
- [guideline] Primer's name grammar is prefix › namespace › pattern › variant › property › scale.
  - Only one variant is allowed per token.
  - Property is required and usually matches a CSS property.
  - camelCase is used inside a block; blocks are separated by `-` in CSS and `.` in JS.
  - Source for both: [Primer token names](https://primer.style/foundations/primitives/token-names)

**W3C Design Tokens Community Group (DTCG) format**
- [guideline] The first stable version, **2025.10**, was published on 28 Oct 2025 as a Final Community Group Report. Tools are encouraged to use the date string as their compliance version — [W3C DTCG announcement](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/); [Format Module 2025.10](https://w3c.github.io/cg-reports/design-tokens/CG-FINAL-format-20251028/); [designtokens.org](https://designtokens.org/)
- [guideline] The FAQ says the core format is ready for production but still evolving, and it is *not* on the W3C Standards Track — [DTCG FAQ](https://www.designtokens.org/faq/)
- [guideline] Properties use the `$` prefix (`$value`, `$type`), and token and group names cannot start with `$` — [Format Module 2025.10](https://w3c.github.io/cg-reports/design-tokens/CG-FINAL-format-20251028/)

**Tailwind v4 `@theme`**
- [guideline] Variables declared in `@theme` become CSS variables *and* generate utilities. For example, `--color-mint-500` yields `bg-mint-500` and `text-mint-500`, and `var(--color-mint-500)` also works.
- [guideline] Use `:root` instead for variables that should not generate utilities. `@theme` must be top-level, not nested under selectors or media queries.
- [guideline] The namespace decides which utilities are generated: `--color-*`, `--font-*`, `--text-*`, `--font-weight-*`, `--tracking-*`, `--leading-*`, `--breakpoint-*`, `--container-*`, `--spacing-*`, `--radius-*`, `--shadow-*`, `--ease-*`, `--animate-*`.
- [guideline] Resetting defaults:
  - `--color-*: initial;` clears one namespace, so only your colours exist.
  - `--*: initial;` clears all defaults.
  - This is the mechanism for escaping the default Tailwind palette.
- [guideline] `@theme inline` is for variables that reference other variables, so the value resolves where the utility is used. `@theme static` emits every variable even when unused.
- [guideline] Theme files can be shared across projects by importing a CSS file, such as `packages/brand/theme.css`, in a monorepo or as an npm package.
- Source for all Tailwind points: [Tailwind docs: Theme variables](https://tailwindcss.com/docs/theme)

**How shadcn maps tokens to components**
- [guideline] shadcn/ui uses semantic CSS variables such as `background`, `foreground` and `primary`.
  - Components use those tokens, so you restyle by overriding tokens rather than editing classes.
  - Dark mode re-declares the same tokens under `.dark`.
  - Tokens come in surface/`-foreground` pairs: `--primary` and `--primary-foreground` give `bg-primary text-primary-foreground`.
- [guideline] The token list:
  - Surfaces: `background`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`.
  - Status and form: `destructive`, `border`, `input`, `ring`.
  - Charts: `chart-1` to `chart-5`.
  - Sidebar: `sidebar-*`.
  - One base `--radius`, with `--radius-sm`, `--radius-xl` and so on derived through `calc()`, so one value rescales every radius.
  - Values are written in OKLCH.
  - Mapping to Tailwind goes through `@theme inline { --color-primary: var(--primary); }`.
- [guideline] To add a colour such as `warning`, declare it in `:root` and `.dark`, then expose it in `@theme inline`.
- Source for all shadcn points: [shadcn/ui Theming](https://ui.shadcn.com/docs/theming)

**Radix Themes**
- [guideline] Radix Themes is configured with "a minimal set of configuration options" on `<Theme>`: `accentColor`, `grayColor`, `panelBackground`, `scaling`, `radius`.
  - Components carry their own variants; Button, for example, has `classic`, `solid` and `soft`.
  - Theme values are exposed as tokens (colour, typography, spacing, radius, shadows, cursors) for building custom components.
  - Source: [Radix Themes overview](https://www.radix-ui.com/themes/docs/theme/overview)

### Inferences
- [inference] For a solo system, collapse atomic design to the four layers in the brief, organised by role rather than chemistry:
  1. `tokens/`: DTCG-style JSON or plain CSS.
  2. `primitives/`: Radix, Base UI, React Aria or native HTML behaviour.
  3. `components/`: your styled, token-bound wrappers.
  4. `patterns/`: compositions such as AuthForm, PricingTable or EmptyState.
  Skip the molecule/organism debate entirely.
- [inference] Tokens should have three tiers but stay small:
  - **Primitive:** OKLCH palette ramps, a spacing base, a type scale, a radius base.
  - **Semantic:** shadcn-style surface/foreground pairs plus `border`, `ring` and the status colours.
  - **Component:** only where a component really diverges, such as `--button-primary-bg-hover`.
  - Primer's rule that component tokens appear "only in component CSS" is a good lint rule for the agent.
- [inference] Tailwind v4 lets one CSS file serve as the token source for every stack. React, Vue, Astro and plain HTML can all consume the same `@theme` utilities and `var(--…)` values, which is stronger than a JS token object for a multi-stack portfolio. Use `--color-*: initial` to stop the agent reaching for default palette classes like `bg-blue-500`.
- [inference] Keep a DTCG JSON only if tokens must feed Figma or native platforms. For web-only, a hand-written `theme.css` is enough, and DTCG 2025.10 can be adopted later via Style Dictionary or Tokens Studio.

### Gaps
- I could not fetch Nathan Curtis's "Naming Tokens in Design Systems" article: Medium returned 403 and the mirror returned 404. His namespace/object/base/modifier taxonomy is therefore not cited here.
- I did not fetch Shopify Polaris's token docs, so Polaris's token-to-component mapping is not covered.
- I did not confirm which DTCG modules beyond Format, such as Color or Resolver for theming, shipped as stable in 2025.10.

---

## 2. Component API design: variants, composition, controlled vs uncontrolled, naming, states, accessibility contracts

### Takeaway
Keep visual options in a typed variant recipe (cva or Tailwind Variants) and behaviour in a tested headless primitive (Radix, Base UI, React Aria). Style states through the primitive's `data-*` attributes. Curtis's 2026 rule sums up the API strategy: "Make the common configurable. Make the uncommon composable." Configure the common cases with enum props, cover the rare ones with slots and children, and let `asChild`/polymorphism swap the rendered element.

### Cited Findings
- [guideline] cva builds type-safe variant class names, works with Tailwind or any other styling approach, and is framework-agnostic (examples for React, Vue, Svelte, Astro, 11ty).
  - cva@1.0 is in beta under the package name `cva`. The stable package is still `class-variance-authority`, at about 65M weekly downloads.
  - Source: [cva docs](https://cva.style/docs)
- [guideline] Tailwind Variants adds the following on top of the cva idea (it credits cva as inspiration):
  - **Slots:** named parts, e.g. `base`, `icon` and `label`, each with its own variants.
  - **compoundVariants.**
  - **Responsive variants.**
  - **`extend`,** for composing recipes.
  - **Built-in Tailwind class-conflict merging.**
  - Source: [Tailwind Variants intro](https://www.tailwind-variants.org/docs/introduction)
- [guideline] `asChild` contract in Radix:
  - The primitive does not render its default element. It clones your child and passes it props and behaviour.
  - A custom component used this way must spread all props and forward its ref to the DOM node.
  - `asChild` nests, e.g. Tooltip.Trigger › Dialog.Trigger › your Button.
  - If you swap the element (e.g. to an `<a>`), you must keep it focusable and keyboard-operable.
  - Source: [Radix composition guide](https://www.radix-ui.com/primitives/docs/guides/composition)
- [guideline] React Aria Components ship unstyled. Their state hooks for styling:
  - `className`, `style` and `children` accept functions of component state (render props).
  - States are exposed as `data-*` attributes: `data-hovered`, `data-pressed`, `data-focused`, `data-focus-visible`, `data-disabled`, `data-selected`, `data-entering`/`data-exiting`, `data-orientation`, `data-placement`.
  - A `slot` prop distinguishes repeated parts, such as the increment and decrement buttons in NumberField.
  - The `tailwindcss-react-aria-components` plugin adds `pressed:`, `selected:` and similar modifiers.
  - Hover and press behave consistently across mouse, touch and keyboard.
  - Source: [React Aria styling](https://react-aria.adobe.com/styling)
- [opinion] Nathan Curtis, "Component Examples as Data" (May 2026): examples form a composition layer *beside* the configurable component, not extra variants. His principle is "Make the common configurable. Make the uncommon composable." Slot default content counts as an example — [Medium RSS summary](https://medium.com/@nathanacurtis/component-examples-as-data-11f56b1b9130). The article itself returned 403; this comes from the feed excerpt.
- [opinion] Curtis, "Implementing Slots in a Figma Library" (Mar 2026), chooses a slot approach per component:
  - empty default
  - default content
  - configuration-first with a custom escape hatch
  - named or items slots
  - no slot
  He also decides how permissive each slot is (minItems, maxItems, open or closed child sets) — [Medium](https://medium.com/@nathanacurtis/implementing-slots-in-a-figma-library-a9d6185318c2) (summarised via RSS)
- [opinion] Curtis argues contracts should be typed: an enum `size` prop, each decision stated once — [Component Contracts and Schemas](https://medium.com/@nathanacurtis/component-contracts-and-schemas-f7c7a6651273)
- [opinion] shadcn's "Composition" principle: every component shares a predictable, composable interface, and missing pieces are brought in and adapted — [shadcn/ui intro](https://ui.shadcn.com/docs)

### Inferences
- [inference] API checklist for the agent, drawn from the sources above:
  1. Visual axes are enum props from a cva/tv recipe, typically `variant` (intent) and `size`. Use no boolean style flags such as `isBig` or `isRed`.
  2. Multi-part components use compound sub-components or tv slots, e.g. `Card.Header`, rather than a long list of `title`/`subtitle`/`icon` props.
  3. Element swapping goes through `asChild` (Radix/shadcn) or `render` (Base UI) instead of hand-rolled polymorphic `as` typing.
  4. Stateful inputs accept both `value`+`onValueChange` (controlled) and `defaultValue` (uncontrolled), mirroring the primitives.
  5. Styles hook into `data-[state]`, `data-disabled` and `focus-visible`, never into JS-toggled class names.
  6. Every component forwards its ref and spreads remaining props, so it satisfies the `asChild` contract.
- [inference] A practical prop budget is about five configuration props per component. Past that, Curtis's rule says to move rare cases to composition. The number is my heuristic, not from a source.
- [inference] A workable state list for the "8 states": default, hover, focus-visible, active/pressed, disabled, loading, error/invalid, selected/checked. These map almost one-to-one onto React Aria and Radix data attributes, plus `aria-invalid` and `aria-busy`. No canonical source for "8" was found.

### Gaps
- I found nothing attributable to "Jenna Gorton" on component APIs, so that name is unverified.
- No authoritative source gives a numeric prop-count limit.
- React Aria's styling page does not cover controlled vs uncontrolled props. The `value`/`defaultValue` convention above is general React and primitive practice, not cited.
- I did not find a primary statement from Adam Wathan on why Catalyst ships as copy-in code. A search snippet said this explicitly.

---

## 3. Process: when to extract, documentation, visual and accessibility testing, versioning, monorepo vs copy-in

### Takeaway
Extract late, and be willing to un-extract. Sandi Metz argues that a wrong abstraction costs more than duplication. Treat stories (Storybook, or a lighter Ladle-style story file) as the single source for docs, render smoke tests, interaction tests, axe-based accessibility checks and screenshot baselines. One person rarely needs a published, versioned package: copy-in, in the shadcn style, plus a shared `theme.css` is the default.

### Cited Findings
- [opinion] Sandi Metz, "The Wrong Abstraction":
  - When new requirements stop fitting an abstraction, developers add parameters and conditionals, and sunk cost keeps them going.
  - Her remedy is to inline the abstraction back into every caller, delete the unused branches, and re-extract from current needs: "the fastest way forward is back."
  - Source: [sandimetz.com](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction)
- [guideline] Storybook treats stories as "test cases for your UI components in their various states":
  - **Render tests:** a story that renders without errors acts as a smoke test.
  - **Interaction tests:** `play` functions.
  - **Accessibility tests:** the A11y addon checks keyboard, screen reader and contrast.
  - **Visual tests:** comparison against baselines through Chromatic.
  - **Vitest addon:** turns stories into Vitest browser-mode tests, run in CI via `vitest --project=storybook`.
  - **Reuse:** stories can be imported into Playwright, Cypress, Vitest or Jest.
  - **Coverage:** off by default, and meant to guide rather than chase 100%.
  - Source: [Storybook: writing tests](https://storybook.js.org/docs/writing-tests)
- [guideline] Playwright `toHaveScreenshot()`:
  - Baselines are stored per test, browser and platform, e.g. `chromium-darwin`, and committed to version control.
  - Rendering differs by OS, browser and headless mode, so baselines must be generated in the same environment.
  - Tolerance comes from `threshold` (default 0.2) and `maxDiffPixels`.
  - Run `--update-snapshots` when a change is intended.
  - `stylePath` injects CSS to hide dynamic content.
  - Source: [Playwright visual comparisons](https://playwright.dev/docs/test-snapshots)
- [guideline] shadcn distribution model:
  - "This is not a component library. It is how you build your component library."
  - Open code means you edit the source rather than wrap or override a package.
  - A flat-file registry schema and a CLI distribute components across projects.
  - It is framed as "AI-Ready" because open code with a consistent API is easy for models to read and modify.
  - Source: [shadcn/ui intro](https://ui.shadcn.com/docs)
- [guideline] Tailwind v4 themes can be shared as a CSS file imported across a monorepo or published as an npm package — [Tailwind theme docs](https://tailwindcss.com/docs/theme)
- [opinion] The general case for copy-in:
  - Customisation through immutable npm packages is hard.
  - With source files, a bug can be fixed instantly rather than waiting for a publish and an upgrade.
  - Sources: [DEV: copy vs install](https://dev.to/bitdev_/sharing-ui-components-copy-vs-install-4mii); [DEV: copy-paste vs npm install](https://dev.to/7onic/design-to-code-3-copy-paste-vs-npm-install-2ai5). These are blog posts.

### Inferences
- [inference] Extraction rule for the agent:
  - Inline the first use.
  - On the second, copy and note the duplication.
  - On the third use with the *same* shape and intent, extract.
  - If an extracted component grows a third boolean or conditional to serve one caller, apply Metz's remedy: inline it and split.
- [inference] Docs for a solo system: one story file per component, with one story per variant and per state, and an MDX or README page covering:
  - when to use it
  - when not to use it
  - the props table, auto-generated from types
  - the accessibility contract (keyboard map, required labels)
  Ladle is a lighter Storybook-compatible option for Vite and React. It was not verified in this research.
- [inference] Minimum test gate:
  1. Story render smoke test.
  2. axe run (Storybook A11y or `@axe-core/playwright`) over every story.
  3. Playwright screenshots of a "kitchen sink" page in light and dark, in one pinned Docker or CI environment.
  4. A token lint that bans raw hex values and default-palette classes.
- [inference] Versioning for one person:
  - With copy-in, there are no semver releases. Keep a `CHANGELOG` in the registry or template repo, and use `@deprecated` JSDoc so the IDE and the agent see deprecations.
  - Move to a monorepo package with Changesets only when three or more live projects must receive fixes at the same time.
  - Even then, keep the theme CSS as the shared package and components as copy-in.

### Gaps
- I did not verify Ladle's current status or features in this session.
- I did not research Changesets or other release tooling.
- I found no case study of a solo developer's versioning practice.

---

## 4. Keeping it distinctive on top of a kit

### Takeaway
Kit sameness is now acknowledged by the kit's own authors. shadcn's December 2025 `shadcn create` says "all apps started looking the same" because the defaults were "a little *too* good." It responds with five structural styles and a choice of primitive library. Distinct products such as Linear keep the headless primitives and own the token *generator*, the type, the density and the surface logic.

### Cited Findings
- [guideline / case study] shadcn create (Dec 2025):
  - It "rewrites the component code to match your setup."
  - You choose Radix or Base UI as the primitive library.
  - You choose one of five styles: Vega (the classic look, formerly "New York"), Nova (compact), Maia (soft, rounded, generous spacing), Lyra (boxy, sharp, pairs with mono fonts), Mira (dense).
  - Base colour, theme, icon library and font are also choices.
  - Its stated goal is "something that doesn't look like everything else."
  - Source: [shadcn changelog: shadcn create](https://ui.shadcn.com/docs/changelog/2025-12-shadcn-create)
- [guideline] The style is stored in `components.json` as `{library}-{style}`, e.g. `radix-vega` or `base-maia` — [shadcnblocks write-up](https://www.shadcnblocks.com/blog/shadcn-component-styles-vega-nova-maia-lyra-mira). This is a third-party source, and one of its pages mislabels Nova as rounded. The official changelog says Nova is compact.
- [guideline] shadcn base colours now include Neutral, Stone, Zinc, Mauve, Olive, Mist and Taupe. A single `--radius` drives the whole radius scale — [shadcn Theming](https://ui.shadcn.com/docs/theming)
- [case study] Linear:
  - Its themes went from 98 hand-set variables each to **three inputs**: base colour, accent colour and contrast.
  - It uses a generator in **LCH** rather than HSL, for perceptual uniformity.
  - The contrast input allows high-contrast accessible themes.
  - LCH also drives surface elevation (background, panels, dialogs, modals).
  - Headings use Inter Display and body text uses Inter.
  - The team limited how much chrome colour (blue) fed into the calculations, for a "more neutral and timeless appearance."
  - Source: [Linear: How we redesigned the Linear UI](https://linear.app/blog/how-we-redesigned-the-linear-ui)
- [case study] Linear adopted Radix Primitives inside its own design system, Orbiter, and planned to replace its checkboxes, switches, radios and dialogs with them — [Radix case study: Linear](https://www.radix-ui.com/case-studies/linear). The case study is undated.
- [case study] Supabase publishes its own design system, with colours, theming, UI patterns, "fragment" and "atom" components. It describes the system as inspired by Radix, shadcn/ui and Geist — [Supabase Design System](https://supabase.com/design-system); [atom components](https://supabase-design-system.vercel.app/design-system/docs/components/atom-components)
- [opinion, unverified] Third-party reconstructions of Vercel's Geist report:
  - borders drawn with a 0-offset, 1px-spread box-shadow
  - a near-black `#171717` text colour
  - Geist and Geist Mono typefaces
  - Source: [shadcn.io Vercel DESIGN.md](https://www.shadcn.io/design/vercel). This is not official Vercel documentation, and nothing confirms that Geist uses Radix.

### Inferences
- [inference] Distinctiveness comes from the layers a kit doesn't own. Restyling recipe:
  1. Generate the palette from 2–3 OKLCH inputs (base, accent, contrast), as Linear does. Do not use a stock base colour.
  2. Pick a non-default type pairing: a display face plus a text face, and possibly a mono.
  3. Set density and radius on purpose, either by choosing Lyra, Mira or Maia as the starting style or by editing `--radius` and the spacing base.
  4. Define elevation and border logic, such as shadow-as-border or tinted surfaces.
  5. Edit the component code itself. Copy-in exists for this.
  6. Add 2–3 signature components no kit has. For a portfolio these are hero, project card and case-study layout; for a SaaS, the domain-specific table or editor.
- [inference] An agent's "kit look" detector should flag:
  - untouched shadcn token values, such as `--radius: 0.625rem` with neutral/zinc and Inter
  - default Tailwind palette classes
  - unmodified Card/Button shapes on every page
- [inference] Behaviour should stay boringly standard: Radix, Base UI or React Aria. Identity lives in tokens, type, motion and composition. That keeps accessibility in tested code and taste in your code.

### Gaps
- I found no primary source on Raycast's or Vercel's component stack, or on whether they use Radix.
- I found no quantitative evidence, such as a study, that shadcn sites look alike. The claim rests on shadcn's own changelog statement.

---

## 5. Sizing the system to the product

### Takeaway
Size the system to the interactivity and lifespan of the product:
- A portfolio needs tokens plus a handful of mostly static, framework-free components, which suits Astro components with a few islands.
- An app needs a primitives-backed set of roughly 20–30 interactive components.
- A SaaS needs that set plus patterns (forms, tables, empty, loading and error states), a story-driven test gate, and a shared theme package.
The counts are my inference; no source gives benchmarks.

### Cited Findings
- [guideline] Astro ships zero JavaScript by default:
  - `.astro` components are for static markup and layout and never ship JS.
  - Framework components (React, Vue, Svelte, Solid, Preact) become interactive only with `client:load`, `client:idle` or `client:visible`.
  - Each island hydrates independently, and several frameworks can share a page.
  - `server:defer` renders personalised fragments separately so the shell can be cached.
  - Source: [Astro islands](https://docs.astro.build/en/concepts/islands/)
- [guideline] Tailwind `@theme` files can be imported by any project, so one token file serves Astro, Next and Vue projects alike — [Tailwind theme docs](https://tailwindcss.com/docs/theme)
- [guideline] cva is framework-agnostic, with examples for Astro, Vue, Svelte and 11ty, so one variant recipe can be reused across stacks — [cva docs](https://cva.style/docs)
- [guideline] Radix Themes, a fully styled kit, aims at a configured look out of the box through a few Theme props. shadcn's open code aims at owning and editing the source — [Radix Themes overview](https://www.radix-ui.com/themes/docs/theme/overview); [shadcn intro](https://ui.shadcn.com/docs)

### Inferences
- [inference] **Portfolio (Astro or plain HTML):**
  - `theme.css` with `@theme`, a type scale, and 8–15 `.astro` components: Layout, Nav, Footer, Section, ProjectCard, CaseStudy blocks, Button/Link, Tag, Image/Figure, Prose.
  - Islands only for real interactivity, such as a filter, a lightbox or a contact form, with `client:visible`.
  - No kit. Share cva recipes so the same `button()` classes render in `.astro` and any island.
- [inference] **App (Next/React or Vue):**
  - Headless primitives: Radix or Base UI via shadcn copy-in, React Aria, or Reka UI for Vue (Reka was not verified here).
  - About 20–30 components: Button, IconButton, Input, Textarea, Select, Combobox, Checkbox, Switch, Radio, Dialog, Sheet, Popover, Tooltip, DropdownMenu, Tabs, Toast, Card, Badge, Avatar, Skeleton, EmptyState, and form field wrappers.
  - Start from a non-default shadcn style and replace the tokens on day one.
- [inference] **SaaS:**
  - The app set, plus patterns: DataTable, Filters, Pagination, Settings layout, Billing/Pricing, Auth flows, CommandMenu, Notifications, and the loading, empty and error triad.
  - Add a Storybook or Ladle catalogue with axe and screenshot gates.
  - Extract `theme.css` and, optionally, the registry into a shared package once two or more products ship.
  - Add component-tier tokens only for components themed per tenant or brand.
- [inference] **Across all three:**
  - Tokens and the variant recipes are the reusable core.
  - Components are copied and adapted per product.
  - This matches shadcn's "build your component library" philosophy and avoids a solo maintainer running a versioned package.

### Gaps
- I found no published component counts or sizing benchmarks for portfolios, apps or SaaS products.
- I did not verify Vue headless options (Reka UI, Headless UI for Vue) or shadcn-vue in this session.
- I did not research Astro-specific component libraries such as Starlight components.
