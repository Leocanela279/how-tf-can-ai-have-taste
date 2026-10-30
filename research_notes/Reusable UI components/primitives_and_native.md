# Tested, reusable UI behaviour in 2026: headless libraries and native HTML/CSS

Research date: 2026-10-30. Labels: **[measured]** = I pulled it this session from the npm registry, the npm downloads API, the GitHub API, the webstatus.dev API, or MDN browser-compat-data on GitHub. **[doc]** = the project's own docs or changelog. **[vendor claim]** = an accessibility or quality claim the project makes about itself. **[3rd-party]** = blog or aggregator.

npm and GitHub figures were pulled on 2026-10-30. Weekly downloads cover 2026-10-22 to 2026-10-28.

## Q1. Headless libraries: status as of late October 2026

### Takeaway
Every major headless library except Headless UI (Vue side), Melt UI and vaul shipped a release in Sept or Oct 2026. Base UI (v1 since Dec 2025, now 1.9.0) is the fastest-moving React option and became shadcn/ui's default in July 2026. Radix is still maintained by WorkOS and not deprecated, but it moves slowly and has no Combobox or date picker. React Aria remains the most thoroughly documented and tested for hard patterns. Ark UI/Zag is the multi-framework option. Avoid vaul (README says unmaintained). cmdk has not released since March 2025.

### Cited Findings

**Snapshot table [measured, 2026-10-30]**

| Package | Latest | Published | Weekly dl | Repo last push | Notes |
|---|---|---|---|---|---|
| `radix-ui` (unified) | 1.8.1 | 2026-10-12 | 24.7M | 2026-10-14 | 258 open issues |
| `@base-ui/react` | 1.9.0 | 2026-10-09 | 26.0M | 2026-10-30 | 454 open issues |
| `react-aria-components` | 1.22.1 | 2026-10-09 | 7.5M | 2026-10-29 | `react-aria` 3.53.1 same day |
| `@ark-ui/react` | 5.40.0 | 2026-10-29 | 1.4M | 2026-10-30 | `@zag-js/core` 1.47.0 (2026-10-26); 5 open issues |
| `@headlessui/react` | 2.2.10 | 2026-04-07 | 9.9M | 2026-04-13 | `@headlessui/vue` 1.7.23 last published 2024-09-09 |
| `reka-ui` | 2.11.0 | 2026-10-05 | 2.8M | 2026-10-29 | `radix-vue` frozen at 1.9.17 (2025-02-28) |
| `bits-ui` | 2.20.2 | 2026-10-23 | 1.6M | 2026-10-29 | Svelte 5 |
| `melt` (next-gen) | 0.44.0 | 2026-01-04 | n/a | next-gen repo 2026-03-04 | legacy `@melt-ui/svelte` 0.86.6 (2025-03-28) |
| `@kobalte/core` | 0.13.14 | 2026-09-07 | 4.96M | 2026-10-29 | still pre-1.0 |
| `@ariakit/react` | 0.4.42 | 2026-10-14 | 1.8M | 2026-10-30 | still 0.x |
| `sonner` | 2.0.8 | 2026-08-09 | 56.5M | 2026-08-10 | |
| `cmdk` | 1.1.1 | 2025-03-14 | 46.3M | 2025-10-29 (repo now `dip/cmdk`) | no release in ~19 months |
| `vaul` | 1.1.2 | 2024-12-14 | 33.4M | 2025-10-03 | README: unmaintained |
| `@tanstack/react-table` | 9.3.1 | 2026-10-12 | n/a | 2026-10-21 | now on major v9 |
| `@floating-ui/dom` / `@floating-ui/react` | 1.8.0 / 0.27.20 | 2026-07-11 | n/a | 2026-10-27 | |
| `react-day-picker` | 10.0.2 | 2026-09-30 | n/a | 2026-10-21 | now on major v10 |
| `shadcn` (CLI) | 4.23.0 | 2026-10-27 | n/a | 2026-10-30 | 127k stars |

Sources: [npm registry](https://registry.npmjs.org/), [npm downloads API](https://api.npmjs.org/downloads/point/last-week/radix-ui), [GitHub API](https://api.github.com/repos/radix-ui/primitives).

Caveat: the `radix-ui` count covers only the unified package. Projects that still install individual `@radix-ui/react-*` packages are not counted, so Radix's total reach is understated here.

**Radix Primitives (React; WorkOS)**
- GitHub repo description: "Maintained by @workos." [measured] — [GitHub](https://github.com/radix-ui/primitives)
- The unified `radix-ui` package shipped on 2025-01-22 and exposes every primitive from one entry point. Subpath imports (`radix-ui/<primitive>`) and tree-shaking improvements followed on 2026-07-20. [doc] — [Radix releases](https://www.radix-ui.com/primitives/docs/overview/releases)
- 2026 releases are mostly fixes: Dialog ARIA, Toast Escape, Tooltip double-mount, a React 19 infinite re-render, and Roving Focus. On 2026-06-06 Radix added `unstable_` composition parts (Provider, Trigger, BubbleInput) for Radio Group, Select, Slider, Switch and Checkbox. [doc] — [Radix releases](https://www.radix-ui.com/primitives/docs/overview/releases)
- New primitives since 2025 are previews only: OneTimePasswordField (April 2025) and PasswordToggleField (May 2025), both `unstable_`. Form has been a preview since March 2023. The changelog lists no Combobox and no date picker. [doc] — [Radix releases](https://www.radix-ui.com/primitives/docs/overview/releases)
- Radix's accessibility claim: "Radix Primitives follow the WAI-ARIA authoring practices guidelines" and are "tested in a wide selection of modern browsers and commonly used assistive technologies." No test matrix is published. [vendor claim] — [Radix accessibility](https://www.radix-ui.com/primitives/docs/overview/accessibility)
- Recent open issues per a search snippet: Dialog content not clickable for the first frame after open in production builds since 1.1.19, and a RadioGroup form-reset bug. I did not open these issues to verify. [3rd-party/unverified] — [GitHub issues](https://github.com/radix-ui/primitives/issues)
- Composition uses `asChild` (Slot). shadcn's migration tool renames `asChild` to Base UI's `render` mechanically. [doc] — [shadcn July 2026 changelog](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default)

**Base UI (React; MUI team)**
- GitHub description: "From the creators of Radix, Floating UI, and Material UI." [measured] — [GitHub](https://github.com/mui/base-ui)
- v1 was announced 2025-12-11, per a third-party X post that also references the official announcement. [3rd-party] — [X post](https://x.com/nztm_tw/status/1999537325571821630)
- The old package `@base-ui-components/react` is deprecated with the message "Package was renamed to @base-ui/react". Current version is 1.9.0 (2026-10-09). [measured] — [npm](https://registry.npmjs.org/@base-ui-components/react)
- 37 documented components, including Autocomplete, Combobox, Context Menu, Drawer, Menubar, Navigation Menu, Number Field, OTP Field, Preview Card, Scroll Area, Toast, Toolbar and Tooltip. No Calendar or date picker. [doc] — [base-ui.com/llms.txt](https://base-ui.com/llms.txt)
- Composition and styling: "composable and styling agnostic". Composition goes through the `render` prop, the `useRender` hook (adds a render prop to your own components) and `mergeProps`. A CSP Provider applies nonces to inline style and script tags. [doc] — [base-ui.com/llms.txt](https://base-ui.com/llms.txt)
- Accessibility claim: components follow APG keyboard behaviour and are "tested on a broad spectrum of browsers, devices, platforms, screen readers, and environments". The developer still owns visible focus styles, colour contrast and accessible names. No test matrix is published. [vendor claim] — [Base UI accessibility](https://base-ui.com/react/overview/accessibility)

**shadcn/ui (copy-in model)**
- July 2026: "Base UI is now the default component library." `npx shadcn init` defaults to Base UI, and `-b radix` keeps Radix. Reasons given: "Base UI is stable" (1.6.0 at the time, 6M+ weekly downloads), the team ships new components regularly, the team uses it for every new project, and shadcn/create users chose Base UI over Radix roughly 2 to 1. [doc] — [shadcn changelog 2026-07](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default)
- "Radix is not being deprecated." Updates ship for both libraries unless a component exists only in Base UI. The team still runs Radix in production. [doc] — [same](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default)
- shadcn ships an agent migration skill (`pnpm dlx skills add shadcn/ui`). It was tested on 60+ components, takes about 25 minutes for a full migration at roughly 10k tokens per component, commits once per component, and flags behaviour changes "never silently patched". [doc] — [same](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default)
- Base UI support first arrived in January 2026 (changelog entry "2026-01 base ui"). [doc] — [shadcn changelog](https://ui.shadcn.com/docs/changelog/2026-01-base-ui)

**React Aria / React Aria Components (Adobe)**
- Docs moved from react-spectrum.adobe.com/react-aria to **react-aria.adobe.com** (301 redirect). [measured] — [react-aria.adobe.com/quality](https://react-aria.adobe.com/quality)
- Published screen-reader matrix: VoiceOver on macOS (Safari, Chrome), JAWS and NVDA on Windows (Firefox, Chrome), VoiceOver on iOS, and TalkBack on Android (Chrome). Localized strings for "30+ languages" (36 locales listed), RTL keyboard interactions, many calendar and numbering systems, and normalized press, hover and focus across input types (no sticky hover on touch). [vendor claim] — [React Aria Quality](https://react-aria.adobe.com/quality)
- The date and time components support 13 calendar systems, locale-specific formatting, number systems, and 12/24-hour time. [doc] — [React Aria blog via llms.txt](https://react-aria.adobe.com/llms.txt)
- Components include Autocomplete, ComboBox (with dedicated "Testing ComboBox" utilities), DatePicker, DateRangePicker, Calendar, RangeCalendar, Table, GridList, NavigationTree, PreviewTrigger (hover card), Menu with submenus, Modal, Popover, Select and Tabs. [doc] — [react-aria.adobe.com/llms.txt](https://react-aria.adobe.com/llms.txt)
- Styling: unstyled, with state exposed as `data-*` attributes such as `data-hovered`. [vendor claim] — [React Aria Quality](https://react-aria.adobe.com/quality)

**Ark UI / Zag.js (Chakra team)**
- Supports React, Vue, Svelte and Solid. Built on Zag.js state machines. 52 components, including Combobox, Date Picker, Date Input, Tree View, Listbox, Toast, Tour, Color Picker, File Upload, Tags Input, Splitter, Floating Panel and Image Cropper. [doc] — [ark-ui.com/llms.txt](https://ark-ui.com/llms.txt)
- Zag also targets vanilla JS ("Build your design system in React, Solid, Vue, Svelte or Vanilla. Powered by finite state machines"). [measured] — [GitHub chakra-ui/zag](https://github.com/chakra-ui/zag)

**Headless UI (Tailwind Labs)**
- React 2.2.10 (2026-04-07) fixed Portal rendering during hydration and Fragment prop passing. 2.2.9 shipped 2025-09-25. Cadence is slow. [3rd-party mirror of changelog] — [releases.sh](https://releases.sh/tailwind-css/headless-ui-releases.md); version and date confirmed on npm [measured].
- The Vue package has not published since 2024-09-09 (1.7.23). [measured] — [npm](https://registry.npmjs.org/@headlessui/vue)

**Reka UI (Vue; formerly Radix Vue)**
- 2.11.0 (2026-10-05). Repo description: "Previously Radix Vue". `radix-vue` is frozen at 1.9.17. [measured] — [GitHub unovue/reka-ui](https://github.com/unovue/reka-ui)
- Coverage goes beyond Radix: Combobox, Autocomplete, Listbox, Tag Group, Rating, Color Area and Color Swatch Picker, plus a full date suite (Calendar, Date Field, Date Picker, Date Range Field and Picker, RangeCalendar, Month, MonthRange, Year and YearRange pickers). [doc] — [reka-ui.com/llms.txt](https://reka-ui.com/llms.txt)
- Accessibility claim: "follow the WAI-ARIA authoring practices guidelines and are tested in a wide selection of modern browsers and commonly used assistive technologies" (same wording as Radix). [vendor claim] — [reka-ui.com/llms.txt](https://reka-ui.com/llms.txt)

**Bits UI and Melt UI (Svelte)**
- Bits UI calls itself "headless component primitives for Svelte 5". 2.20.2 (2026-10-23). Includes Calendar, Combobox, Date Field, Date Picker, Date Range Field and Picker, Range Calendar, Menubar, Navigation Menu, Select, Tabs and Tooltip. [doc] — [bits-ui.com getting started](https://bits-ui.com/docs/getting-started/llms.txt), [bits-ui.com/llms.txt](https://bits-ui.com/llms.txt)
- Melt has split in two. The legacy `@melt-ui/svelte` last published 2025-03-28. The next-gen `melt` package (Svelte 5) last published 0.44.0 on 2026-01-04, and its repo `melt-ui/next-gen` was last pushed 2026-03-04 (332 stars). [measured] — [GitHub melt-ui/next-gen](https://github.com/melt-ui/next-gen)
- Bits UI's README credits Melt UI as inspiration for its internal architecture. The claim that Bits wraps Melt is not officially backed. [3rd-party] — [sveltekitui comparison](https://sveltekitui.pages.dev/blog/bits-ui-vs-melt-ui/)

**Kobalte (Solid)**
- 0.13.14 (2026-09-07), still pre-1.0. Repo active (pushed 2026-10-29, 105 open issues). Ships Tailwind and vanilla-extract plugins that style `data-*` state, such as `ui-expanded:*`. [measured/doc] — [GitHub kobaltedev/kobalte](https://github.com/kobaltedev/kobalte)

**Ariakit**
- 0.4.42 (2026-10-14), still 0.x. Repo active (pushed 2026-10-30, 53 open issues). [measured] — [GitHub ariakit/ariakit](https://github.com/ariakit/ariakit)

**Satellites: Sonner, cmdk, vaul, TanStack Table, Floating UI, react-day-picker**
- vaul's README: "This repo is unmaintained. I might come back to it at some point, but not in the near future." It still gets 33M weekly downloads, mostly through shadcn's Drawer. [measured] — [vaul README](https://github.com/emilkowalski/vaul)
- cmdk moved from `pacocoursey/cmdk` to `dip/cmdk` (GitHub 301). Last npm release 1.1.1 was on 2025-03-14 and the last repo push on 2025-10-29. [measured] — [GitHub dip/cmdk](https://github.com/dip/cmdk)
- Sonner 2.0.8 shipped 2026-08-09. [measured] — [GitHub emilkowalski/sonner](https://github.com/emilkowalski/sonner)
- TanStack Table is on v9 (9.3.1, 2026-10-12) and react-day-picker on v10 (10.0.2, 2026-09-30). Code written against v8 and v9 APIs respectively may be stale. [measured] — [npm](https://registry.npmjs.org/@tanstack/react-table), [npm](https://registry.npmjs.org/react-day-picker)
- Floating UI: `@floating-ui/dom` 1.8.0 and `@floating-ui/react` 0.27.20, both 2026-07-11. [measured] — [GitHub floating-ui](https://github.com/floating-ui/floating-ui)

### Inferences
- For new React work, the defensible defaults are **Base UI** (shadcn default, broad coverage, active releases) or **React Aria Components** (strongest i18n, date and collection handling, plus a published AT matrix). Radix is fine to keep in existing code but is a weaker choice for new hard widgets.
- An agent generating shadcn code in late 2026 should expect Base UI's `render` prop, not Radix's `asChild`, unless the project was initialised with `-b radix`. It should check `components.json` or the imports before writing either.
- Do not add vaul to new projects without noting it is unmaintained. Base UI now ships a Drawer and Ark has a Drawer, so both are maintained alternatives. Use cmdk with caution, or build a command palette on Base UI or React Aria Autocomplete/Combobox.
- Multi-framework parity: Ark UI (React, Vue, Svelte, Solid) for one mental model, or the per-framework Radix-lineage ports: Reka (Vue), Bits (Svelte) and Kobalte (Solid).
- Headless UI is low-risk but narrow, and the Vue package is effectively stale.

### Gaps
- **Bundle size per component**: I did not get measured per-component sizes from bundlephobia or pkg-size this session. Treat any size number as unverified.
- I did not open Radix GitHub issues, so the Dialog first-frame bug is snippet-level only.
- No independent (non-vendor) screen-reader audits comparing these libraries were found. Every accessibility claim above is self-reported. React Aria is the only one that publishes a concrete AT and browser matrix.
- React Aria's Toast status (stable or `UNSTABLE_`) was not confirmed this session.
- Kobalte's 4.96M weekly downloads look high for Solid. They may be inflated by dependents or CI; not investigated.

## Q2. Which library is strongest for which hard pattern

### Takeaway
Date pickers and comboboxes are where libraries differ most. React Aria (React), Reka UI (Vue), Bits UI (Svelte) and Ark UI (all four frameworks) ship full date suites. **Radix and Base UI ship no date picker**, so shadcn uses react-day-picker for its Calendar. Radix has no Combobox. Base UI added Combobox and Autocomplete. Native `<dialog>` and `popover` now cover simple dialogs, popovers and disclosures without a library.

### Cited Findings
- **Date picker**: React Aria has DatePicker, DateRangePicker, Calendar and RangeCalendar, with 13 calendar systems, locale number systems, 12/24h time and RTL fixes. — [React Aria llms.txt](https://react-aria.adobe.com/llms.txt). Reka UI has date, range, month and year pickers. — [Reka llms.txt](https://reka-ui.com/llms.txt). Bits UI has Date Field, Date Picker and Range variants. — [Bits llms.txt](https://bits-ui.com/llms.txt). Ark UI has Date Picker and Date Input. — [Ark llms.txt](https://ark-ui.com/llms.txt). Base UI has no date picker. — [Base UI llms.txt](https://base-ui.com/llms.txt). Radix's changelog lists none. — [Radix releases](https://www.radix-ui.com/primitives/docs/overview/releases). react-day-picker is at v10.0.2 and is a calendar grid, not a segmented date field. [measured] — [npm](https://registry.npmjs.org/react-day-picker)
- **Combobox / autocomplete**: React Aria ComboBox resulted from "many months of research, development, and extensive testing across browsers, devices, and assistive technology" and ships test utilities ("Testing ComboBox"). [vendor claim] — [React Aria llms.txt](https://react-aria.adobe.com/llms.txt). Base UI has Combobox and Autocomplete. — [Base UI llms.txt](https://base-ui.com/llms.txt). Reka has Combobox and Autocomplete, distinguished as "the value is the input text itself rather than a selected item". — [Reka llms.txt](https://reka-ui.com/llms.txt). Ark has Combobox and Bits UI has Combobox. Radix has none. — [Radix releases](https://www.radix-ui.com/primitives/docs/overview/releases)
- **Menu / menubar / submenus**: React Aria documents pointer-friendly submenus (a blog post on safe-triangle handling). — [React Aria llms.txt](https://react-aria.adobe.com/llms.txt). Base UI has Menu, Menubar, Context Menu and Navigation Menu. — [Base UI](https://base-ui.com/llms.txt). Radix and Reka have Dropdown, Context, Menubar and Navigation Menu. — [Reka](https://reka-ui.com/llms.txt)
- **Toast**: Base UI Toast, Ark Toast and Radix Toast all exist; Radix fixed Toast accessibility and Escape in 2025–2026. — [Radix releases](https://www.radix-ui.com/primitives/docs/overview/releases). Sonner (2.0.8, Aug 2026) is the most downloaded at 56M per week [measured]. I found no published AT test matrix for Sonner.
- **Table / data grid**: React Aria Table and GridList give accessible keyboard navigation, selection, column resizing and virtualization, demonstrated in the CRUD table and photo-library examples. — [React Aria llms.txt](https://react-aria.adobe.com/llms.txt). TanStack Table v9 is logic-only (headless) and leaves grid semantics and keyboard behaviour to you. [measured version] — [GitHub TanStack/table](https://github.com/TanStack/table)
- **Tree**: React Aria has NavigationTree, Ark has Tree View. — [React Aria](https://react-aria.adobe.com/llms.txt), [Ark](https://ark-ui.com/llms.txt)
- **Dialog / popover / tooltip / tabs / accordion**: all major libraries cover these. Native options (Q3) now cover modal dialogs (`<dialog>`, widely available), popovers (Baseline Jan 2025), and exclusive accordions (`<details name>`, Baseline Sept 2024). [measured] — [webstatus.dev API](https://api.webstatus.dev/v1/features/popover)
- **Select**: Base UI, Radix, React Aria, Reka, Bits and Ark all ship Select. Native customizable select is not Baseline (Q3).

### Inferences
- Pattern-to-primitive picks for an agent:
  - **Date or date-range input**: React Aria (React), Reka (Vue), Bits (Svelte), Ark (any framework). In a shadcn project, use shadcn's Calendar (react-day-picker) for a grid only, and do not hand-roll a segmented date field.
  - **Combobox / autocomplete / command palette**: React Aria ComboBox/Autocomplete or Base UI Combobox/Autocomplete. Never use Radix Popover plus a hand-rolled listbox.
  - **Data table**: TanStack Table for state, plus React Aria Table if keyboard grid semantics matter.
  - **Simple dialog, popover, disclosure, accordion**: native first (Q3). Use a library when you need nested-layer management, scroll lock, focus return across portals, or animation presence.
- "Strongest" here rests on breadth of coverage plus vendor-published testing. No independent conformance benchmark across libraries was found.

### Gaps
- No public, current APG-conformance test results comparing libraries pattern by pattern were found.
- Issue counts per pattern (for example, open Combobox bugs per library) were not collected.

## Q3. Native platform in 2026: what is Baseline and what is progressive

### Takeaway
Safe to use without fallback: `<dialog>` with `showModal()`, `inert`, `:user-invalid`, `<details name>`, `::details-content`, `popover`, invoker commands (`commandfor`/`command`), `dialog.requestClose()`, and now `field-sizing` (Baseline June 2026).

Use as progressive enhancement:
- Customizable `<select>` (Chrome 135 and Safari 27, not Firefox).
- Interest invokers (Chrome/Edge only).
- `dialog closedby` and `popover="hint"` (no Safari).

CSS anchor positioning core properties now ship in all three engines (Chrome 125+, Firefox 147+, Safari 26+). The web-features rollup still marks the group "limited" because of newer sub-features.

### Cited Findings
webstatus.dev API, queried 2026-10-30 [measured]. "Widely" means Baseline widely available, "newly" means newly available, "limited" means not Baseline.

| Feature | Status | Chrome / Edge | Firefox | Safari | Baseline date |
|---|---|---|---|---|---|
| `<dialog>` | widely | 37 / 79 | 98 | 15.4 | newly 2022-03-14, widely 2024-09-14 |
| `dialog.requestClose()` | newly | 134 | 139 | 18.4 | 2025-05-27 |
| `<dialog closedby>` | limited | 134 | 141 | — | — |
| `popover` | newly | 116 | 125 | 17 (iOS 18.3) | 2025-01-27 |
| `popover="hint"` | limited | 151 (2026-07-28) | 153 (2026-07-21) | — | — |
| Invoker commands (`commandfor`/`command`) | newly | 135 | 144 | 26.2 | 2025-12-12 |
| Interest invokers (`interestfor`) | limited | 142 | — | — | — |
| Customizable `<select>` (`appearance: base-select`) | limited | 135 | — | 27 (2026-09-14) | — |
| Anchor positioning (group rollup) | limited | see below | see below | 27 listed | — |
| `<details name>` (exclusive) | newly | 120 | 130 | 17.2 | 2024-09-03 |
| `::details-content` | newly | 131 | 143 | 18.4 | 2025-09-16 |
| `inert` | widely | 102 | 112 | 15.5 | widely 2025-10-11 |
| `:user-valid` / `:user-invalid` | widely | 119 | 88 | 16.5 | widely 2026-05-02 |
| `field-sizing` | newly | 123 | 152 (2026-06-16) | 26.2 | 2026-06-16 |
| `showPicker()` for `<select>` | limited | 121 | 122 | — | — |

Sources: [webstatus.dev API](https://api.webstatus.dev/v1/features/invoker-commands) (one URL per feature id, e.g. `/v1/features/customizable-select`, `/dialog-closedby`, `/interest-invokers`, `/field-sizing`).

- **Anchor positioning detail**: per MDN browser-compat-data, `anchor-name` ships in Chrome 125, Firefox 147 and Safari 26. `position-area` ships in Chrome 129, Firefox 147 and Safari 26, with some keywords added in Chrome 144 and Firefox 148. `position-try-fallbacks` ships in Chrome 128, Firefox 147 and Safari 26. The `anchor-name` "position_after_layout" sub-feature is Chrome 144 and Safari 27, not Firefox. [measured] — [BCD anchor-name.json](https://github.com/mdn/browser-compat-data/blob/main/css/properties/anchor-name.json), [BCD position-area.json](https://github.com/mdn/browser-compat-data/blob/main/css/properties/position-area.json)
- webstatus.dev marks the `anchor-positioning` feature as "limited". WPT stable scores: Chrome 95.6%, Edge 95.4%, Firefox 83.3%. Experimental: Firefox 100%, Safari 94.0%. Developer-signals upvotes: 279. [measured] — [webstatus.dev API](https://api.webstatus.dev/v1/features/anchor-positioning). The definition comprises many compat keys (including the `CSSPositionTryDescriptors` APIs). — [web-features anchor-positioning.yml](https://github.com/web-platform-dx/web-features/blob/main/features/anchor-positioning.yml)
- Conflict: several 2026 blogs say anchor positioning "reached Baseline" in January 2026 when Firefox 147 shipped. — [refontelearning](https://www.refontelearning.com/blog/css-anchor-positioning-reaches-baseline), [dev.to](https://dev.to/rashadmehtab/dropdowns-that-position-themselves-css-anchor-positioning-is-baseline-now-450d). The official web-features status still says "limited". The core properties are cross-engine, but the full feature as defined is not Baseline.
- Invoker commands: `commandfor` takes the target's id and `command` names the action. Built-ins shown include `show-modal`, `close`, `toggle-popover` and `hide-popover`. Custom commands use a `--` prefix plus a `command` event listener. "Baseline 2025 newly available… since December 2025." [doc] — [MDN Invoker Commands API](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API)
- Interest invokers: `interestfor` points at the target id and gives hover, focus or long-press popovers (the tooltip use case). [doc] — [MDN Using interest invokers](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using_interest_invokers). A polyfill exists in the `invokers` npm package. [3rd-party] — [npm invokers](https://www.npmjs.com/package/invokers)
- Customizable select is "not Baseline". It falls back gracefully: the `<button><selectedcontent>` markup is ignored, non-text option content is stripped, and the value is still submitted. `::checkmark` and `::picker-icon` are not in the accessibility tree. Some frameworks block these features or hit hydration failures with SSR. Detect support with `@supports (appearance: base-select)`. [doc] — [MDN Customizable select](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select)

**SwiftUI system controls (brief)**: I did not fetch Apple sources this session. The general point is that SwiftUI's system controls (`DatePicker`, `Picker`, `Menu`, `.sheet`, `.popover`, `.alert`/`.confirmationDialog`, `Toggle`, `.searchable`) carry platform accessibility, Dynamic Type and localization. They are the "tested primitive" on Apple platforms. This is unverified in this session; see Gaps.

### Inferences
- Agent rules for the web:
  - Use `<dialog>` + `showModal()` (or `commandfor`/`command="show-modal"`) for modals.
  - Use `popover` for menus, popovers and toasts that need top-layer and light-dismiss.
  - Use `<details name>` for exclusive accordions, and `::details-content` to animate them.
  - Use `inert` for background blocking.
  - Use `:user-invalid` for post-interaction validation styling.
  - Use `field-sizing: content` for auto-growing textareas. All are Baseline.
- Use anchor positioning for tooltip and popover placement where minor sub-feature gaps are acceptable. Keep Floating UI, or a library that bundles it (Base UI, Radix, Ark), when collision handling must be pixel-identical across engines or older browsers matter.
- Customizable select is fine as enhancement because fallback is a working native select. Do not depend on rich option content for meaning, since it is stripped in Firefox.
- Use interest invokers and `popover="hint"` only with a fallback. A tooltip still needs a focus trigger and should not hold essential content.
- In plain HTML or Astro without a framework, native features now cover dialog, popover, disclosure and accordion. Combobox, date picker, menu with typeahead and submenus, tree, and grid still need a library (Ark/Zag vanilla, or Web Components) or careful APG work.

### Gaps
- Exact Firefox 147 release date was not confirmed from Mozilla; blogs place it in January 2026.
- Safari 27's anchor-positioning entry looks like a re-dated rollup of newer sub-features rather than a first implementation (BCD shows core properties in Safari 26). I did not resolve the exact cause of the rollup's "limited" status.
- SwiftUI control capabilities and Apple HIG citations were not fetched this session.
- No data on screen-reader quality of native customizable select or anchor-positioned popovers (accessibility mapping maturity) was found.

## Q4. WAI-ARIA Authoring Practices Guide: the spec libraries implement, and its gaps

### Takeaway
Radix, Base UI, Reka and React Aria all say they follow the APG. The APG itself says its examples are not production-tested and do not work around AT or browser support gaps. It also does not say which patterns work on mobile or touch. Library conformance claims are therefore claims about following a reference, not about passing a certified test.

### Cited Findings
- APG's principle "No ARIA is better than Bad ARIA". [doc] — [APG Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- "Testing assistive technology interoperability is essential before using code from this guide in production." [doc] — [APG Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- APG examples "intentionally do not describe and implement coding techniques for working around problems caused by gaps in support". [doc] — [same](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- "Currently, this guide does not indicate which examples are compatible with mobile browsers or touch interfaces." [doc] — [same](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- Library claims of following the APG:
  - Radix [vendor claim] — [Radix a11y](https://www.radix-ui.com/primitives/docs/overview/accessibility)
  - Base UI [vendor claim] — [Base UI a11y](https://base-ui.com/react/overview/accessibility)
  - Reka [vendor claim] — [Reka llms.txt](https://reka-ui.com/llms.txt)
  - React Aria, with its AT matrix including mobile VoiceOver and TalkBack [vendor claim] — [React Aria Quality](https://react-aria.adobe.com/quality)
- React Aria notes that automated tools report false positives on its components and keeps a wiki of them. [vendor claim] — [React Aria Quality](https://react-aria.adobe.com/quality)

### Inferences
- Because the APG excludes mobile and AT workarounds, the libraries that add their own touch and AT testing provide value beyond the APG. React Aria publishes that testing explicitly; Base UI says it does, without a matrix. That added testing is the real reason to prefer a library over an agent hand-rolling from the APG.
- An agent that hand-rolls from APG examples gets a desktop-keyboard reference implementation without mobile or AT hardening. That is the specific risk the "taste" skill should warn about.

### Gaps
- I did not fetch the APG pattern index or the ARIA-AT project's per-pattern AT support results (aria-at.w3.org). Those would give measured screen-reader support per pattern and are the next source to pull.
- Known APG pattern gaps (for example, no date-picker-with-segmented-field pattern, and a combobox pattern that has changed across ARIA versions) were not verified this session.
