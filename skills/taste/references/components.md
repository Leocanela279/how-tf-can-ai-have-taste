# Components

**Borrow the behaviour, own the look.**

A component has two layers:

- **Behaviour** is the hard part:
  - keyboard: Tab, arrows, Esc, typeahead
  - focus: trapping it, and returning it to the trigger
  - ARIA roles and announcements
  - positioning: flipping near edges
  - scroll lock, touch vs mouse, right-to-left text
- **Look** is identity: colours, type, spacing, radius, motion.

The evidence (sources in the repo's `reports/Reusable UI components.md`):

- **Hand-rolled ARIA fails often.** Across the top million home pages, pages that use ARIA average
  59 detected errors against 42 without, and 22% of pages with ARIA menus introduce barriers
  (WebAIM 2026; a correlation, partly because those pages are more complex). The W3C's own rule is
  that no ARIA is better than bad ARIA.
- **Reuse is faster and more faithful.** In one controlled study, 8 developers built a form 47% faster
  with IBM's Carbon components, and 5 of 8 matched the design better.
- **Reuse raises the floor, not the ceiling.** In the same study, two hand-built forms beat their
  Carbon versions on accessibility, and GOV.UK says its system "does not immediately make a service
  accessible". Test anyway.
- **Kit defaults look like every other site.** shadcn's maintainers wrote in 2025 that "all apps
  started looking the same" because the defaults were "a little too good".

So behaviour comes from native HTML or a tested headless primitive, and the look comes from
DESIGN.md's tokens. Never hand-roll a dialog, menu, select, combobox, tooltip, tabs, toast or date
picker.

## Decide in this order

1. **Native HTML does it?** Use it. It costs no JavaScript, and the browser maintains it.
2. **A tested headless primitive does it?** Use it, from one library family per project.
3. **Neither?** Build your own component, composed from the two above. Only then write ARIA by
   hand, following the W3C ARIA Authoring Practices pattern, and test it with a keyboard and a
   screen reader.

## Native first (support as of 2026-10)

| Need | Native | Status |
| --- | --- | --- |
| Accordion, FAQ, disclosure | `<details>` + `<summary>`; `<details name>` for one-open-at-a-time; `::details-content` to style the content | All major browsers. Animating to `height: auto` is Chromium-only, so fade or slide the content instead |
| Modal dialog, sheet | `<dialog>` + `showModal()`, `inert` background, `dialog.requestClose()` | All major browsers |
| Open and close without JS | Invoker commands: `commandfor` + `command="show-modal"` / `"close"` / `"toggle-popover"` | All major browsers since Dec 2025 |
| Popover: a panel, or a list of plain links | `popover` attribute: light dismiss, top layer | All major browsers since Jan 2025. It gives no menu keyboard behaviour (arrow keys, typeahead), so it is not an ARIA menu |
| Placing a popover beside its trigger | CSS anchor positioning | Core properties in Chrome 125+, Firefox 147+, Safari 26+; newer sub-features are still limited. Keep a fallback position |
| Validation styling | `:user-invalid` | All major browsers |
| Auto-sizing textarea | `field-sizing: content` | All major browsers since Jun 2026 |
| Styled select | Customisable `<select>` (`appearance: base-select`) | Chrome 135+ and Safari 27, not Firefox: enhance progressively, or use a primitive |
| Hover-to-preview | Interest invokers, `popover="hint"`, `dialog closedby` | Chromium only or no Safari: enhancement only |

## Primitives by stack

Pick one main family per project and use it wherever it has the pattern. No single library covers
everything, so add a specialist only for what the main family lacks (React Aria for dates is the
usual case) and style it from the same tokens.

| Stack | Use | Notes |
| --- | --- | --- |
| React / Next.js, general | **Base UI** (`@base-ui/react`, 1.x) | 37 components including Combobox, Autocomplete, Drawer, Toast and OTP field. Composes with a `render` prop. The shadcn default since July 2026. No date picker |
| React, hardest patterns | **React Aria Components** (Adobe) | The only library that publishes a screen-reader test matrix (VoiceOver, JAWS, NVDA, TalkBack). Strongest DatePicker, DateRangePicker, ComboBox, Table and Tree, with 13 calendar systems. States are exposed as `data-*` attributes |
| React, existing projects | **Radix Primitives** (`radix-ui`) | Maintained (WorkOS), mostly fixes. No Combobox or date picker. Composes with `asChild`, so custom components must spread props and forward refs |
| React, starting kit | **shadcn/ui** (copies code into the repo; Base UI by default, `-b radix` for Radix) | A starting point, not a look. Pick a style, then replace its theme variables with DESIGN.md's tokens before building any screen |
| Vue | **Reka UI** (full date suite), Ark UI | `radix-vue` is frozen (use Reka UI); Headless UI for Vue hasn't published since 2024 |
| Svelte | **Bits UI** (Svelte 5), Ark UI | |
| Solid | Ark UI, Kobalte (pre-1.0) | |
| Any framework | Ark UI / Zag.js (state machines) | React, Vue, Svelte and Solid from one source |
| Astro, plain HTML | Native first; a framework island (`client:visible`) only for a pattern native lacks | Ship zero JS by default |
| SwiftUI | System controls (`Menu`, `Picker`, `sheet`, `TabView`) | The system is the tested primitive. Style it, don't rebuild it |

Specialised pieces:
- **Toasts:** Sonner, or Base UI Toast.
- **Tables:** TanStack Table, now on **v9**.
- **Dates:** React Aria (field, picker and calendar). react-day-picker, now on **v10**, is only the
  calendar grid; the input, popover and parsing are yours to build.
- **Positioning a custom floating element:** Floating UI.
- **Command menu:** prefer the family's Combobox or Autocomplete inside a Dialog. **cmdk** hasn't
  released since March 2025, and its repo has moved.
- **Drawers:** **vaul** is marked unmaintained. Use Base UI Drawer or a `<dialog>` sheet.

## Pattern → what to use

| Pattern | Use | Never |
| --- | --- | --- |
| Button | `<button>`; a variant and a size from tokens | A clickable `<div>` or `<span>` |
| Link | `<a href>` | A button that navigates |
| Dialog / sheet | `<dialog>` with invoker commands, or the family's Dialog | A fixed div with a manual focus trap |
| Menu (actions) | The family's Menu | A div toggled by click with no arrow keys or Esc, or `popover` with `role="menu"` added by hand |
| Disclosure of links (e.g. a nav dropdown) | `popover` or `<details>`, links stay links | ARIA menu roles on plain navigation |
| Select / combobox | `<select>`; the family's Select or Combobox for rich options | A text input plus a hand-built list |
| Date picker | React Aria, or Reka UI on Vue | A grid of day buttons written by hand |
| Tabs | The family's Tabs | Buttons that swap content with no `tablist` semantics or arrow keys |
| Tooltip | The family's Tooltip, for supplementary text only | Essential information in a tooltip, or hover-only on touch |
| Accordion / FAQ | `<details>` (`name` for exclusive) | A div that animates height in JS |
| Toast | Sonner or the family's Toast, polite live region | Toasts for errors that need action |
| Table | Semantic `<table>`, plus TanStack Table for sorting and filtering | A grid of divs pretending to be a table |

## Your system: four layers

1. **Tokens, in three tiers** (as in GitHub's Primer):
   - **Base:** raw values (`--gray-9`, `--orange-6`).
   - **Functional:** roles (`--ink-1`, `--ground`, `--accent`), the only tier components read.
   - **Component:** used only inside one component's CSS (`--button-height`).

   In Tailwind v4, declare them in `@theme`, clear the default palette with `--color-*: initial`,
   and use `@theme inline` for variables that reference variables. The DTCG format (stable since
   2025.10) is the exchange format if tokens ever leave the repo.
2. **Primitives:** native elements, or the chosen family from the table above.
3. **Your components:**
   - Primitives styled with functional tokens only. No raw hex, pixel sizes or durations.
   - Visual options live in one variant recipe (cva or Tailwind Variants): a `variant` (2–3) and a
     `size` (2–3).
   - "Make the common configurable, make the uncommon composable" (Nathan Curtis): slots or a
     render prop, not 30 props.
   - Every state designed: default, hover, focus-visible, pressed, disabled, loading, error and
     selected, where each applies. Style them from the primitive's `data-*` state attributes.
   - Forward refs and spread props so components compose.
4. **Patterns and screens:** components composed.

## Process for a one-person system

- **Extract on the third repetition, not the first.** A wrong abstraction costs more than
  duplication; when one appears, inline it back and extract again.
- **Copy, don't publish.** Copy components into each project (the shadcn model) and share one
  `theme.css`, rather than maintaining a versioned package.
- **Test every interactive component:** keyboard (Tab, Enter or Space, Esc, focus return, a visible
  ring), axe, and one screen reader pass. Storybook stories can double as render, interaction and
  accessibility tests. Make visual snapshots in one fixed environment.

## Size the system to the product

These are estimates; no published benchmark exists.

| Product | System |
| --- | --- |
| Portfolio, marketing page | Tokens + native HTML + about 8–15 small components. No kit, no JS framework required |
| App | Tokens + one primitive family + about 20–30 owned components |
| SaaS | The app set + patterns (forms, tables, empty, error and loading states) + test gates |

## Keep a distinct look on top of a kit

- Own the tokens. Linear runs Radix inside its own system and generates each theme from 3 inputs
  (base, accent, contrast) instead of 98 hand-set values. The kit supplies behaviour; the inputs
  supply the look.
- Choose the type, radii, ink staircase and motion from DESIGN.md. A kit's defaults are a
  placeholder.
- The lint warns on an untouched kit theme, hand-written widget roles, positive `tabindex` and
  stale libraries.
