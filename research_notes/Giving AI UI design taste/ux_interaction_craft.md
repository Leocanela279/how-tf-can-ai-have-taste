# UX / Interaction Principles and Product-Design Craft, Translated into Agent-Checkable Rules

Scope: proven usability heuristics, UX "laws", and the craft writing of Rauno Freiberg, Emil Kowalski, Vercel, Linear, Stripe and Apple, each turned into a checkable rule for web UIs (React/Next + Tailwind, plain HTML/CSS). Each finding is written as **principle (paraphrased) → checkable rule**. Research date: 2026-10-29.

Rule format: rules prefixed with `[STATIC]` can be checked by reading code or the DOM. Rules prefixed with `[RENDER]` need a rendered page or measurement. Rules prefixed with `[JUDGE]` need a model or human to judge.

---

## 1. Nielsen's 10 usability heuristics: checkable translations

### Takeaway
Nielsen's 10 heuristics (1994, wording refined in 2020, last reviewed Jan 2024) are still the standard checklist for usability. Each one maps to concrete code-level checks: feedback on every action, real-world language, undo/cancel, consistent tokens and terms, constraints and confirmations, visible options, keyboard shortcuts, removing low-value elements, specific error messages, and in-context help.

### Cited Findings
- Source metadata: first published 24 Apr 1994; a 2020 update refined the wording and added examples; last reviewed 30 Jan 2024. The heuristics have stayed essentially unchanged — [NN/g, 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)
- **H1 Visibility of system status.** The UI tells users what is happening, with timely feedback, and announces state before consequential actions → `[STATIC]` every async trigger (button, form submit, mutation) has a pending state (spinner, label change or `aria-busy`), plus a success state and an error state. `[STATIC]` the current navigation item is marked (`aria-current="page"` plus a visual style). `[STATIC]` `<title>` reflects the current view — [NN/g](https://www.nngroup.com/articles/ten-usability-heuristics/); title rule from [Vercel Web Interface Guidelines](https://vercel.com/design/guidelines)
- **H2 Match between system and real world.** Use the user's words, not internal jargon, and follow a natural order → `[JUDGE]` no internal identifiers, enum names, DB field names (`user_id`, `ERR_403`, `status: PENDING_REVIEW`) or raw error codes in visible copy. `[STATIC]` dates, numbers and currency are formatted with `Intl.*` and the user's locale — [NN/g](https://www.nngroup.com/articles/ten-usability-heuristics/); [Vercel guidelines](https://vercel.com/design/guidelines)
- **H3 User control and freedom.** Provide a clearly marked exit, plus undo and redo → `[STATIC]` every modal, drawer or sheet closes with Esc, a visible close or Cancel control, and (for non-destructive content) a backdrop click. `[STATIC]` destructive actions offer Undo or a confirmation. `[STATIC]` multi-step flows have Back — [NN/g](https://www.nngroup.com/articles/ten-usability-heuristics/); [Vercel guidelines](https://vercel.com/design/guidelines)
- **H4 Consistency and standards.** Be consistent internally and follow external conventions → `[STATIC]` one term per concept across the UI (no "Delete", "Remove" and "Trash" for the same action). `[STATIC]` colors, radii and spacing come from tokens, not one-off values. `[STATIC]` links are `<a>`/`<Link>` and actions are `<button>` — [NN/g](https://www.nngroup.com/articles/ten-usability-heuristics/); "keep nouns consistent, few unique terms" in [Vercel guidelines](https://vercel.com/design/guidelines)
- **H5 Error prevention.** Remove error-prone conditions, use constraints and good defaults, and confirm high-cost actions → `[STATIC]` inputs use the correct `type`, `inputmode` and `autocomplete`. `[STATIC]` destructive actions require confirmation or offer Undo. `[STATIC]` warn before leaving with unsaved changes. `[STATIC]` submit buttons are disabled only while the request is in flight, and the request carries an idempotency key — [NN/g](https://www.nngroup.com/articles/ten-usability-heuristics/); [Vercel guidelines](https://vercel.com/design/guidelines)
- **H6 Recognition rather than recall.** Make options visible instead of memorized → `[STATIC]` form fields have persistent visible `<label>`s (the placeholder is not the label). `[STATIC]` filters, tabs and pagination are reflected in the URL so they survive refresh and sharing. `[JUDGE]` recently used or suggested items are surfaced — [NN/g](https://www.nngroup.com/articles/ten-usability-heuristics/); URL-state rule from [Vercel guidelines](https://vercel.com/design/guidelines)
- **H7 Flexibility and efficiency of use.** Add accelerators for experts that novices don't have to see → `[STATIC]` frequent actions have keyboard shortcuts with platform-correct symbols (⌘ vs Ctrl). `[STATIC]` lists support ↑/↓ navigation. `[STATIC]` a textarea submits with ⌘/Ctrl+Enter — [NN/g](https://www.nngroup.com/articles/ten-usability-heuristics/); [Vercel guidelines](https://vercel.com/design/guidelines); [Rauno Freiberg, interfaces](https://github.com/raunofreiberg/interfaces)
- **H8 Aesthetic and minimalist design.** Every extra element competes with the ones that matter. This does not require flat design → `[JUDGE]` each screen has one visually dominant primary action. `[STATIC]` count the number of filled/primary-variant buttons per view (target 1). `[JUDGE]` no decorative element that carries no information — [NN/g](https://www.nngroup.com/articles/ten-usability-heuristics/)
- **H9 Help users recognize, diagnose and recover from errors.** Use plain language, say exactly what went wrong, and suggest a fix → `[STATIC]` no bare "Error", "Something went wrong" or "Invalid input" strings. Every error string names the problem and the remedy. `[STATIC]` errors render next to the field, and focus moves to the first error on submit — [NN/g](https://www.nngroup.com/articles/ten-usability-heuristics/); [NN/g Error-Message Guidelines](https://www.nngroup.com/articles/error-message-guidelines/)
- **H10 Help and documentation.** Help is searchable, task-focused, concise and in context → `[JUDGE]` prefer inline help text near the control. Vercel treats tooltips as a last resort — [NN/g](https://www.nngroup.com/articles/ten-usability-heuristics/); [Vercel guidelines](https://vercel.com/design/guidelines)

### Inferences
- H1, H3, H5 and H9 are the most mechanically checkable (look for pending, error and undo states and for keyboard exits). H2, H8 and H10 need a model-as-judge pass. A practical agent design runs static lint-like checks first, then an LLM rubric pass on screenshots or copy for the judgment heuristics.
- In practice, Vercel's guidelines are a code-level implementation of several Nielsen heuristics (status, control, error prevention, consistency).

### Gaps
- NN/g gives no numeric thresholds for "minimalist" (for example, maximum elements per screen). The "one primary action per view" rule is a common design-system convention, but this session did not verify a canonical source for it.

---

## 2. UX laws (Fitts, Hick, Jakob, Miller, Doherty) and response-time budgets

### Takeaway
The numerically checkable laws are: target size (WCAG 2.2 SC 2.5.8 sets a 24×24 CSS px minimum, Vercel/Apple use 44px on touch), response-time budgets (0.1 s / 1 s / 10 s; Doherty 400 ms; Vercel under 500 ms for mutations), and indicator choice by wait time. Hick and Miller are better used as "chunk and prioritize" heuristics than as hard limits. lawsofux itself warns against arbitrary "7±2" caps.

### Cited Findings
**Fitts's Law** (time to a target grows with distance and shrinks with size) — [Laws of UX](https://lawsofux.com/)
- WCAG 2.2 **SC 2.5.8 Target Size (Minimum), Level AA**: pointer targets are at least 24×24 CSS px. Exception: an undersized target passes if a 24 px-diameter circle centered on it doesn't intersect another target or another target's circle. Other exceptions are inline links in text, unmodified user-agent controls, essential cases (map pins) and an equivalent control elsewhere. Browser zoom does not count toward meeting it — [W3C Understanding 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- Vercel: hit targets ≥24px, ≥44px on mobile. If the visual is smaller than 24px, expand the hit area — [Vercel guidelines](https://vercel.com/design/guidelines)
- Rauno: screen corners act as effectively infinite targets because the pointer can't overshoot them, which is why macOS puts frequent menus there. Radial menus put every item at equal distance. Use "prediction cones" for nested menus so diagonal movement toward a submenu doesn't close it — [rauno.me, Invisible Details of Interaction Design](https://rauno.me/craft/interaction-design); [Rauno interfaces](https://github.com/raunofreiberg/interfaces)
- Rauno: remove dead space between list items by using padding instead of margin, so the gaps are clickable too — [Rauno interfaces](https://github.com/raunofreiberg/interfaces)
- → Rules: `[RENDER]` every interactive element's bounding box is ≥24×24 CSS px or passes the 24px-circle spacing test. `[RENDER]` at ≤768px viewport (or `pointer: coarse`), primary controls are ≥44×44. `[STATIC]` in Tailwind, flag icon buttons smaller than `size-6` (24px) with no padding or pseudo-element hit area. Flag `h-8` (32px) controls on mobile. `[STATIC]` list rows use padding, not margin gaps. `[STATIC]` checkbox/radio and its label share one clickable `<label>`.

**Hick's Law** (decision time grows with the number and complexity of choices; Hick & Hyman, 1952) — [Laws of UX: Hick's Law](https://lawsofux.com/hicks-law/)
- Takeaways: reduce choices where speed matters, split complex tasks into steps, highlight a recommended option, onboard progressively. Caveat: don't simplify so far that the design becomes abstract — [Laws of UX: Hick's Law](https://lawsofux.com/hicks-law/)
- → Rules: `[STATIC]` ≤1 primary-styled button per view or section. `[JUDGE]` any choice set of more than ~5–7 visible peer options is grouped, given a recommended default, or moved behind progressive disclosure. `[JUDGE]` long forms are split into labeled sections or steps.

**Jakob's Law** (users expect your site to work like the sites they already use) — [Laws of UX](https://lawsofux.com/)
- Apple frames this as "Consistency": standard iconography and predictable action placement across platforms — [Apple, Liquid Glass technology overview](https://developer.apple.com/documentation/technologyoverviews/liquid-glass.md)
- → Rules: `[STATIC]` logo top-left links home. Navigation uses real links (Cmd/middle-click works). `[JUDGE]` primary or confirm actions sit in a consistent position (for example, dialog footer right). `[STATIC]` use conventional icons (magnifier for search, × for close) and conventional shortcuts (⌘K for command menu, Esc to close).

**Miller's Law / chunking** (about 7±2 items in working memory; Miller 1956) — [Laws of UX: Miller's Law](https://lawsofux.com/millers-law/)
- lawsofux warns explicitly against using the "magical number seven" to justify arbitrary design limits. The useful takeaway is chunking: break content into small related groups — [Laws of UX: Miller's Law](https://lawsofux.com/millers-law/)
- Related: proximity makes nearby objects read as grouped. Serial position means first and last items are remembered best — [Laws of UX](https://lawsofux.com/)
- → Rules: `[STATIC]` long numbers or codes are formatted in chunks (phone, card, IBAN, OTP). `[JUDGE]` settings and forms are grouped under headings, and spacing within a group is visibly smaller than spacing between groups (proximity). Do not hard-fail a nav because it has 8 items.

**Doherty threshold and response-time budgets**
- Doherty & Thadani (IBM Systems Journal, 1982) argued that system response under ~400 ms keeps users engaged, replacing the earlier 2 s standard. lawsofux adds that perceived speed, animation during processing, and progress bars all help — [Laws of UX: Doherty Threshold](https://lawsofux.com/doherty-threshold/)
- Nielsen's three limits: 0.1 s feels instantaneous and needs no feedback beyond the result. 1 s keeps the flow of thought; beyond 1 s, show that the system is working. 10 s is the limit of attention; beyond it, show percent-done progress, an expected finish time and a way to interrupt — [NN/g Response Times: 3 Important Limits](https://www.nngroup.com/articles/response-times-3-important-limits/) (1993, web update 2014)
- Vercel: POST/PATCH/DELETE should complete in under 500 ms. Use optimistic updates with rollback or Undo on failure — [Vercel guidelines](https://vercel.com/design/guidelines)
- Vercel: spinners and skeletons get a ~150–300 ms show-delay and ~300–500 ms minimum visible time, to avoid flashes — [Vercel guidelines](https://vercel.com/design/guidelines)
- NN/g: under 1 s, show no skeleton or spinner (flashes are jarring). At 2–10 s, use a spinner for a single module or a skeleton for a full page. Over 10 s, use a progress bar with an estimate — [NN/g Skeleton Screens 101](https://www.nngroup.com/articles/skeleton-screens/) (2023, reviewed Sept 2026)
- → Rules: `[STATIC]` loading indicators have a show-delay (≥150 ms) and a minimum display time. `[STATIC]` operations known to take more than 10 s (uploads, exports, imports) use a determinate progress bar, not a spinner. `[STATIC]` mutations use optimistic UI or show pending state within 100 ms. `[STATIC]` long-running operations have Cancel.

### Inferences
- Thresholds to encode: 100 ms (instant feedback), 400–500 ms (mutation budget), 1 s (show busy), 10 s (determinate progress with cancel). Vercel's 150–300 ms show-delay fits Nielsen's "<1 s needs no indicator" guidance.
- Hick and Miller should be applied as `[JUDGE]` grouping and prioritization checks, not hard numeric caps. The one firm rule from Hick in practice is "one visually dominant primary action".

### Gaps
- I did not fetch SC 2.5.5 Target Size (Enhanced, AAA) or Apple's HIG page directly. The HIG is JS-rendered and returned no body text. The 44px touch figure is sourced here only via Vercel's guidelines; the commonly cited Apple 44×44 pt and WCAG 2.5.5 44×44 CSS px values were not verified in this session.
- Fitts's original 1954 paper and Hick (1952) / Hyman (1953) were not consulted directly. Only lawsofux summaries were used.

---

## 3. Rauno Freiberg's "Invisible Details" and the Web Interface Guidelines (Vercel)

### Takeaway
Rauno's essay is about *why* interactions feel right: physics and momentum, gesture trigger timing, interruptibility, spatial consistency, no animation for high-frequency actions, and Fitts corners. His GitHub `interfaces` README and Vercel's Web Interface Guidelines turn that into hundreds of concrete, mostly statically checkable web rules. This is the richest single source of agent-checkable craft rules.

### Cited Findings
**Invisible Details of Interaction Design (principles)** — [rauno.me/craft/interaction-design](https://rauno.me/craft/interaction-design)
- Metaphor and learned gestures: swipe implies stacked layers, and pinch mirrors grasping. The pinch origin is set by where the fingers start.
- Kinetic physics: dismiss gestures should keep the throw's momentum and angle. Conceptually lighter objects bounce less.
- Trigger timing depends on consequence. Lightweight overlays can trigger mid-swipe after a distance threshold. Destructive dismissals (App Switcher) wait for the gesture to end, so the user can change their mind. Peeking snaps only on release, so it can be reversed.
- Responsiveness: apply visual change immediately on input (for example, scale while pinching) rather than waiting for a threshold. Interactions should be interruptible mid-flight.
- Spatial consistency: elements enter from and return to their source (an app expands from its icon or the Dynamic Island).
- Frequency and novelty: animation becomes a cognitive burden on actions done hundreds of times a day. Removing motion from a bookmarking tool made it feel faster. macOS context menus appear instantly but fade out and briefly flash the chosen item to confirm.
- Touch content visibility: don't hide the thing being manipulated under the finger (iOS loupe). Keep a slider drag active after the finger leaves the track.
- Implicit input: use context (brightness up when showing a pass; blur sensitive previews in the switcher).
- Fitts's corners and radial menus (see section 2).
- → Rules: `[STATIC]` popovers and menus set `transform-origin` toward their trigger. `[STATIC]` dialogs and sheets animate from their source or edge direction, consistently. `[STATIC]` drag/slider handlers use pointer capture (`setPointerCapture`) so drags continue outside the element. `[JUDGE]` destructive gestures commit only on release. `[STATIC]` command palettes, context menus and keyboard-driven list highlights have no enter animation, or one of 0–100 ms.

**Rauno's `interfaces` README (concrete rules)** — [github.com/raunofreiberg/interfaces](https://github.com/raunofreiberg/interfaces)
- Interactivity: clicking a label focuses its input. Wrap inputs in `<form>` so Enter submits. Use correct input `type`. Toggles apply immediately with no confirm. Disable the button after submit to prevent duplicates. `user-select: none` on the inner content of interactive elements. `pointer-events: none` on decorative glows and gradients.
- Typography: no weight change on hover or selected (avoids layout shift). No weights below 400. ~500–600 for medium headings. Fluid headings with `clamp()` (e.g. `clamp(48px, 5vw, 72px)`). `tabular-nums` in tables and timers. `-webkit-text-size-adjust: 100%`.
- Motion: disable transitions while switching themes. Interaction animations ≤200 ms. Scale proportionally (dialogs from ~0.8, button press to ~0.96–0.9, never from 0). Skip animation on frequent, low-novelty actions (context menus, list add/delete, trivial hovers). Pause looping animations off-screen.
- Touch: scope hover with `@media (hover: hover)`. Inputs ≥16px font to prevent iOS zoom. No autofocus on touch. `touch-action` on custom pan/zoom. Replace the tap highlight with a designed alternative.
- Optimizations: large `blur()`/`backdrop-filter` values are slow. Use radial gradients instead of blurred rectangles (banding). `will-change` only as a last resort.
- Accessibility: disabled buttons shouldn't carry tooltips (keyboard users can't reach them). Use `box-shadow` focus rings so they follow border-radius. Support ↑/↓ and ⌘⌫ in lists. Open dropdowns on `mousedown`. No interactive content inside hover tooltips. Use prediction cones in nested menus.
- Design: optimistic updates with rollback. Show feedback next to its trigger (inline checkmark after copy). Highlight the relevant inputs on error. Empty states prompt creation, optionally with templates.

**Vercel Web Interface Guidelines (concrete rules)** — [vercel.com/design/guidelines](https://vercel.com/design/guidelines)
- Interactions: everything keyboard-operable per WAI-ARIA APG. Visible `:focus-visible` rings that sticky headers and overlays must not hide. Focus traps, with focus returned on close. Targets ≥24px, ≥44px on mobile. Inputs ≥16px on mobile. Never disable zoom or paste. Loading buttons keep their label and add an indicator. Spinner show-delay 150–300 ms and minimum 300–500 ms. URL holds state (filters, tabs, pagination, expanded panels). Optimistic updates with rollback or Undo. `…` on menu items that open a follow-up. Destructive = confirm or Undo. `touch-action: manipulation`. First tooltip in a group is delayed, its peers are instant. `overscroll-behavior: contain` in modals. Restore scroll on Back. Autofocus the single primary input on desktop only. No dead zones. Drag/swipe always has a click and keyboard alternative. Navigation is `<a>`/`<Link>`, never `<div onClick>`. Toasts and inline validation use `aria-live="polite"`.
- Animations: honor `prefers-reduced-motion`. Prefer CSS over WAAPI over JS. Animate only `transform` and `opacity`. Animate only to clarify cause and effect or for deliberate delight. Easing matched to what changes. Interruptible. No autoplay except muted, non-essential loops. Motion longer than 5 s needs pause. `transform-origin` where the motion starts. **Never `transition: all`.**
- Layout: ±1px optical adjustments. Every element aligned to grid, baseline, edge or optical center. Icon and text lockups matched in weight, size and color. Test mobile, laptop and ultra-wide. Respect `env(safe-area-inset-*)`. No unnecessary scrollbars. Prefer CSS layout to JS measurement.
- Content: inline help over tooltips. Skeletons mirror final content exactly. `<title>` reflects context. Every screen offers a next step or recovery path. Design empty, sparse, dense and error states. Curly quotes and the `…` character. Avoid widows. `tabular-nums` for numbers. Never color alone. Icon-only buttons get an `aria-label`. Native elements over ARIA. Hierarchical headings and a skip link. Layouts handle short, average and very long content. Locale-formatted dates and numbers. Non-breaking spaces in `10&nbsp;MB` and `⌘&nbsp;K`. `translate="no"` on brand names and code.
- Forms: Enter submits a single-input form. ⌘/Ctrl+Enter in a textarea. Every control has a `<label>`. Keep submit enabled until the request starts, then disable it, show a spinner and send an idempotency key. **Don't pre-disable submit** (let submission surface errors). Don't block keystrokes. Errors beside fields, and focus the first error on submit. `autocomplete` and `name` set. Spellcheck off for emails, codes and usernames. Correct `type`/`inputmode`. Placeholders end with `…` and show an example. Warn on unsaved changes. Support password managers and OTP paste.
- Performance: mutations under 500 ms. Virtualize large lists or use `content-visibility: auto`. Explicit image dimensions (no CLS). Preload critical fonts. Lazy-load below-fold images.
- Design: layered shadows (ambient + direct, at least 2 layers). Combine borders and shadows, with semi-transparent borders. Nested radii: child ≤ parent and concentric. On tinted backgrounds, tint borders, shadows and text toward the hue. Hover, active and focus states have more contrast than rest. Prefer APCA over WCAG 2 contrast. `<meta name="theme-color">` matches the background. `color-scheme: dark` in dark themes. Color-blind-safe chart palettes.
- Copywriting: active voice. Title Case for headings and buttons in product UI, sentence case on marketing pages (Vercel house style). Concise. Second person. Numerals for counts. Space between number and unit. Positive, solution-oriented errors that state the fix. Specific labels ("Save API Key", not "Continue").
- Vercel explicitly offers these as agent rules (an AGENTS.md and a `web-design-guidelines` skill) — [Vercel guidelines](https://vercel.com/design/guidelines)

### Inferences
- Many of these rules can be checked by grep or AST: `transition-all` / `transition: all`; `<div onClick>` used as navigation; `<button>` with only an `<svg>` child and no `aria-label`; `outline-none` with no `focus-visible:` replacement; `"..."` instead of `…`; `user-scalable=no`; `onPaste` preventDefault; `disabled={!isValid}` on submit; inputs under `text-base` on mobile; `<img>` with no width/height; `animate-*` with no `motion-reduce:` variant; hover styles not scoped (Tailwind v4 scopes `hover:` to `(hover: hover)` by default).
- Rauno's 200 ms cap is stricter than Emil's 300 ms. A reasonable agent default: ≤200 ms for micro-interactions (hover, press, toggles, tooltips) and ≤300 ms for larger UI transitions (dialogs, drawers).
- Copy casing differs by house: Vercel uses Title Case for product buttons, Polaris and others commonly use sentence case. An agent should pick one per project and enforce consistency, not a universal casing.
- The README carries no date. Rauno worked at Vercel, and its content overlaps Vercel's guidelines heavily, but this session found no statement that one derives from the other.

### Gaps
- No date or version for Vercel's guidelines page was captured. Treat the content as current as of fetch (Oct 2026).
- The Rauno README's "disable spellcheck and autocomplete on most inputs" conflicts with Vercel's "set meaningful `autocomplete`" (better for autofill and password managers). Prefer Vercel's for forms with personal data.
- Geist (Vercel's design system) docs were not fetched, so no Geist-specific token values are recorded here.

---

## 4. Emil Kowalski: animation decision framework, durations, easing, when not to animate

### Takeaway
Emil's framework is a sequence of questions: is there a purpose? How often will users see it (frequent means less or no animation)? Is it keyboard-initiated (then don't animate)? If it does animate: ease-out, under 300 ms, transform and opacity only, interruptible, origin-aware, never from `scale(0)`, and with a reduced-motion fallback.

### Cited Findings
- Purpose first. Legitimate purposes are explaining a feature, press feedback, softening an element's entrance (and setting the spatial direction for dismissal, as in Sonner toasts), and occasional delight — [Emil Kowalski, You Don't Need Animations](https://emilkowal.ski/ui/you-dont-need-animations)
- Frequency: the more often something is seen, the less it should animate. Raycast opens hundreds of times a day with no open animation, which Emil calls optimal. Even hover effects may be better unanimated in high-frequency UIs — [emilkowal.ski](https://emilkowal.ski/ui/you-dont-need-animations)
- Never animate keyboard-initiated actions. Arrow-key list highlights lagging behind key presses feel slow and disconnected — [emilkowal.ski](https://emilkowal.ski/ui/you-dont-need-animations)
- Duration: UI animations under 300 ms. A 180 ms dropdown feels more responsive than a 400 ms one. Marketing sites are the exception — [emilkowal.ski](https://emilkowal.ski/ui/you-dont-need-animations); [7 Practical Animation Tips](https://emilkowal.ski/ui/7-practical-animation-tips)
- Easing: `ease-out` is the default for enter and exit (it starts fast and feels responsive). Avoid `ease-in` for UI (slow start, feels sluggish). Built-in CSS curves are often too weak, so use stronger custom curves (he points to easings.co, no specific values given). `ease` suits slightly slower, elegant motion such as Sonner toasts — [Good vs Great Animations](https://emilkowal.ski/ui/great-animations); [7 Practical Animation Tips](https://emilkowal.ski/ui/7-practical-animation-tips)
- Press feedback: `scale(0.97)` on `:active` — [7 Practical Animation Tips](https://emilkowal.ski/ui/7-practical-animation-tips)
- Never animate from `scale(0)`. Start from ~0.9+ (his example uses 0.93) combined with opacity — [7 Practical Animation Tips](https://emilkowal.ski/ui/7-practical-animation-tips)
- Origin-aware popovers: set `transform-origin` to the trigger (Radix `--radix-dropdown-menu-content-transform-origin`, Base UI `--transform-origin`) — [7 Practical Animation Tips](https://emilkowal.ski/ui/7-practical-animation-tips)
- Tooltips: delay the first one. Once one is open, adjacent tooltips open instantly with `transition-duration: 0ms`. His example tooltip uses 125 ms ease-out on transform and opacity, from `opacity:0; scale(0.97)` — [7 Practical Animation Tips](https://emilkowal.ski/ui/7-practical-animation-tips)
- When easing and duration still feel off, add ~2px `filter: blur()` during the transition to blend the states — [7 Practical Animation Tips](https://emilkowal.ski/ui/7-practical-animation-tips)
- Interruptibility: users must be able to reverse mid-animation. Prefer CSS transitions over keyframe animations where interruption matters (transitions retarget, keyframes restart) — [Good vs Great Animations](https://emilkowal.ski/ui/great-animations)
- Performance: target 60 fps. Animate only `transform` and `opacity`. Avoid `padding`/`margin`/size, which trigger layout. Under a busy main thread, CSS and WAAPI stay smooth, while rAF-driven JS (Framer Motion's default path) can drop frames — [Good vs Great Animations](https://emilkowal.ski/ui/great-animations)
- Reduced motion: under `prefers-reduced-motion: reduce`, fall back to opacity-only (Framer Motion `useReducedMotion` → zero out transforms) — [Good vs Great Animations](https://emilkowal.ski/ui/great-animations)
- Springs are tuned by stiffness, damping and mass. No canonical values are given — [Good vs Great Animations](https://emilkowal.ski/ui/great-animations)
- → Checkable rules:
  - `[STATIC]` UI `transition-duration`/`duration-*` ≤300 ms (flag `duration-500`, `duration-700`, `duration-1000` outside marketing/hero contexts).
  - `[STATIC]` no `ease-in` on enter transitions. Prefer `ease-out` or a custom `cubic-bezier`.
  - `[STATIC]` no `scale-0` / `scale(0)` as an enter start state.
  - `[STATIC]` command palette, context menu and keyboard-focus highlight have no transition, or one ≤100 ms.
  - `[STATIC]` every `@keyframes`/`animate-*`/`motion.*` has a reduced-motion branch (`motion-reduce:` / `motion-safe:` in Tailwind).
  - `[STATIC]` animated properties ⊆ {transform, opacity} (plus filter or clip-path where justified). No `transition-all`.
  - `[STATIC]` buttons have an `active:scale-[0.97]` style press state (optional, a craft signal).
  - `[STATIC]` dropdowns and popovers use origin-aware `transform-origin`.

### Inferences
- Emil's and Rauno's guidance converge: frequency drives whether to animate, ease-out is the default, keep it short, scale from about 0.9–0.97 and never 0, origin-aware, interruptible, transform and opacity only, respect reduced motion. That convergence makes them strong defaults for an agent.
- animations.dev (Emil's paid course) was not fetched. Its contents beyond the free articles are not verified here.

### Gaps
- Emil's free articles give no specific cubic-bezier values. Commonly circulated curves (e.g. `cubic-bezier(0.23, 1, 0.32, 1)`) were not verified from his pages in this session.
- No specific spring parameter recommendations were found.

---

## 5. Linear, Stripe, Vercel/Geist and Apple HIG: stated principles

### Takeaway
Top product teams converge on the same principles: generate color from a few inputs in a perceptually uniform space (LCH or CIELAB) instead of hand-picking from HSL; contrast guaranteed by construction (Stripe: 5 steps apart passes body text); reduce visual noise while keeping alignment precise; a restrained neutral palette with limited accent; and (Apple) hierarchy, harmony and consistency, meaning content first, controls that recede, and standard placement.

### Cited Findings
**Linear, "How we redesigned the Linear UI"** — [linear.app/now/how-we-redesigned-the-linear-ui](https://linear.app/now/how-we-redesigned-the-linear-ui)
- The theme system went from 98 hand-defined variables per theme to 3 inputs (base color, accent color, contrast). All surface, text, icon and control colors are derived from them.
- Colors are generated in LCH rather than HSL because LCH is perceptually uniform: equal lightness looks equally bright, so any base color yields a good theme.
- A contrast parameter supports very high-contrast accessible themes. Elevation (background → panel → dialog → modal) is expressed through lightness steps in LCH.
- The accent's influence on the generated palette was deliberately limited, for a more neutral, timeless look.
- Inter Display for headings, Inter for body.
- Reduced visual noise in sidebar, tabs, headers and filters. Labels, icons and buttons aligned vertically and horizontally ("subtle but noticeable after using it a while"). Stress-tested across view types (list, board, timeline, split, fullscreen) and densities. Apple conventions guided spacing so it feels native.
- → Rules: `[STATIC]` colors defined as tokens derived from a small set of inputs (CSS `oklch()`/`lch()` or a scale), not dozens of unrelated hex literals. Flag more than N distinct raw hex/rgb values in components. `[STATIC]` surface elevation uses a monotonic lightness step (bg < panel < popover in dark mode). `[JUDGE]` accent used sparingly (primary action, focus, selection), not on large surfaces. `[RENDER]` icons and text in nav rows share a vertical center. `[RENDER]` test each view with short, long and dense data.

**Stripe, "Designing accessible color systems" (2019)** — [stripe.com/blog/accessible-color-systems](https://stripe.com/blog/accessible-color-systems)
- Targets are WCAG 4.5:1 for small text and 3:1 for large text and icons. Default text and icon colors pass on white and on the lightest tint of every hue.
- Constructive rule: any two colors five or more levels apart on the scale pass for small text. Four or more levels apart pass for icons and large text.
- Use a perceptually uniform model (CIELAB). HSL lightness misleads, since yellow looks lighter than blue at the same L. Stripe aligned every hue to the same lightness curve, so yellow has the same contrast range as blue.
- Hand-picking and checking afterward, or simple lighten/darken, gave muddy, indistinct colors.
- Badges: shift both background and text one level so contrast holds across all hues without per-pair tuning.
- WCAG measures contrast, not vibrancy. Hue distinctness needs separate attention.
- → Rules: `[STATIC]` palettes defined as numbered scales (e.g. 50–950) with equal lightness per step across hues (OKLCH L). `[STATIC]` text-on-surface pairings use scale steps ≥5 apart (body) or ≥4 apart (icons, large text). `[RENDER]` computed contrast ≥4.5:1 for body text and ≥3:1 for large text, icons and UI boundaries.

**Vercel design guidelines (design section)** — [vercel.com/design/guidelines](https://vercel.com/design/guidelines)
- Layered shadows (ambient + direct). Semi-transparent borders combined with shadows. Concentric nested radii (child ≤ parent). Hue-tinted borders, shadows and text on tinted backgrounds. Interactive states have more contrast than rest. APCA preferred over WCAG 2.
- → Rules: `[STATIC]` `box-shadow` on elevated cards and popovers has ≥2 layers. `[STATIC]` inner radius ≤ outer radius (ideally inner = outer − padding). `[STATIC]` borders on elevated surfaces use alpha (e.g. `border-black/10`, `border-white/10`).

**Apple HIG / Liquid Glass**
- Apple's developer overview frames the platform principles as establishing **hierarchy**, creating **harmony** and maintaining **consistency** across devices — [Apple, Liquid Glass overview](https://developer.apple.com/documentation/technologyoverviews/liquid-glass.md)
- Stated practices: choose a layout and navigation that puts the most important content in focus. Be judicious with color in controls and navigation so they stay legible and content shows through. Fit interface elements to the software and hardware design. Use standard iconography and predictable action placement across platforms — [Apple, Liquid Glass overview](https://developer.apple.com/documentation/technologyoverviews/liquid-glass.md)
- Secondary summaries: hierarchy means controls elevate and distinguish the content beneath them. Harmony means aligning with the concentric geometry of hardware and software. Consistency means familiar patterns. These come from third parties, and the exact HIG wording was not verified — [CreateWithSwift](https://www.createwithswift.com/liquid-glass-redefining-design-through-hierarchy-harmony-and-consistency/)
- Reception of Liquid Glass was mixed. Critics cite distraction and legibility issues — [Wikipedia: Liquid Glass](https://en.wikipedia.org/wiki/Liquid_Glass)
- → Rules: `[JUDGE]` the most important content is the visual focus, and chrome recedes (lower contrast, neutral). `[STATIC]` color in nav and toolbar limited to state (selected/active), not decoration. `[STATIC]` concentric radii (shared with Vercel). `[JUDGE]` standard action placement and icons.

### Inferences
- The shared pattern across Linear, Stripe and Vercel is "constrain by construction": a few inputs or scale steps generate everything, so contrast and harmony are guaranteed rather than checked afterward. For an agent, generating OKLCH scales and pairing rules beats choosing hex values ad hoc.
- "Reduce visual noise" (Linear), "minimalist design" (Nielsen H8) and "hierarchy" (Apple) are the same principle at different levels: one focus per view, recessive chrome.
- APCA (Vercel) and WCAG 2 ratios (Stripe) differ. WCAG 2.x remains the legal and conformance baseline, so an agent should enforce WCAG ratios and may optionally report APCA Lc.

### Gaps
- The Linear LCH theming post (specifically about the color generator) and the "Linear design: the SaaS design trend" writing were not separately fetched. Only the redesign post was used.
- The Apple HIG main pages are JS-rendered and returned no body text. HIG layout and spacing values (44 pt targets, standard margins) are not verified here.
- Geist design system docs (vercel.com/geist) were not fetched.
- Stripe's post does not state how many levels its scale has.

---

## 6. Content-first and UX writing: effect on perceived quality

### Takeaway
Copy is part of the interface. The guidelines agree: specific verb + noun labels, plain language, consistent terms, concise and front-loaded text, constructive errors, and typographic details (curly quotes, `…`, tabular numbers, non-breaking spaces). Real or realistic content should replace lorem ipsum before any review, because placeholder text hides layout failures and blocks meaningful feedback. Evidence for that is practitioner consensus, not a primary study.

### Cited Findings
- Polaris: buttons lead with a strong verb and use {verb}+{noun} ("Activate Apple Pay", "View shipping settings", not "Try Apple Pay" or "View your settings"). Common actions (Save, Close, Cancel, OK) are exceptions. Labels must be predictable, never misleading, and drop articles (the, a, an) — [Polaris Button docs](https://polaris.shopify.com/components/button); [Polaris Common actions](https://polaris.shopify.com/patterns/common-actions/best-practices)
- Vercel: active voice, action verbs, concise, second person, consistent nouns, numerals for counts, specific labels ("Save API Key" over "Continue"), errors that state the fix — [Vercel guidelines](https://vercel.com/design/guidelines)
- Vercel typographic content rules: curly quotes, the `…` character, avoid widows and orphans, `tabular-nums` for compared numbers, non-breaking spaces in `10&nbsp;MB`, locale formatting, `translate="no"` for brand names and code — [Vercel guidelines](https://vercel.com/design/guidelines)
- NN/g error messages (2023): place them near the source, use redundant cues (not color alone), match severity (modals only for serious errors), don't flag normal exploration, plain language, hide codes, be specific (not "An error occurred"), offer a remedy, no blame, no humor, preserve user input, suggest fixes — [NN/g Error-Message Guidelines](https://www.nngroup.com/articles/error-message-guidelines/)
- Nielsen H2: speak the user's language, don't assume your terms are clear — [NN/g heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)
- Vercel: layouts must handle short, average and very long user content — [Vercel guidelines](https://vercel.com/design/guidelines)
- Lorem ipsum: practitioner articles argue that usability testing with lorem ipsum is nearly impossible and that stakeholders can't give useful feedback on it. Luke Wroblewski is quoted warning that dummy content leads to unrealistic assumptions and design flaws. Consensus: use placeholder text only for early layout, then switch to realistic copy — [UX Planet](https://uxplanet.org/should-we-use-lorem-ipsum-in-product-design-f1a09b9fd3ec); [Nick Babich](https://babich.biz/blog/lorem-ipsum-in-product-design/)
- One secondary site claims a 2022 NN/g study found people mistake placeholder text for real content. I could not verify this in a primary source, so treat it as unconfirmed — [hakaru.io](https://hakaru.io/guides/lorem-ipsum-guide)
- → Checkable rules:
  - `[STATIC]` no "lorem ipsum", "Lorem", "placeholder", "Item 1/2/3", "John Doe", "foo/bar" or "Click here" in rendered output. Use domain-realistic sample data with varied lengths.
  - `[STATIC]` button text is not a generic "Submit", "OK", "Continue" or "Click here" when a specific verb + noun fits. Exceptions: Save, Cancel, Close.
  - `[STATIC]` no `"..."` (three periods) in UI strings. Use `…`. Use curly quotes in prose.
  - `[STATIC]` numeric columns, prices and timers use `tabular-nums` (Tailwind `tabular-nums`).
  - `[STATIC]` one casing convention for buttons and headings across the project.
  - `[JUDGE]` error strings name what happened and what to do, without blame, jargon or codes.
  - `[RENDER]` stress-render with 1-character, typical and very long strings (and long unbroken tokens such as emails and URLs). Nothing overflows or overlaps. `truncate`/`line-clamp` plus a `title` or tooltip where truncation happens.

### Inferences
- For an AI agent, "real content" means generating plausible domain data (realistic names, amounts, dates, varied lengths, edge cases) rather than uniform filler. Uniform-length filler hides wrapping and truncation bugs, so the stress test (very long, empty, one item) is the checkable form of content-first.
- Perceived quality depends heavily on small typographic correctness (ellipsis character, curly quotes, tabular numbers, non-breaking units). These are cheap to lint and are the kind of detail top teams list explicitly.

### Gaps
- The Polaris content-guidelines pages ("actionable language", "voice and tone") have moved (polaris-react.shopify.com redirects to shopify.dev) and were not retrieved. Only the button and common-actions pages are cited, via search summaries.
- Material Design 3's UX-writing page is JS-rendered and returned no content.
- No primary empirical study linking copy quality to perceived product quality was found.

---

## 7. States: empty, loading, error, disabled

### Takeaway
Every data-bound view needs designed empty, loading, error, sparse and dense states, and each has concrete rules. Empty states explain and offer a direct next action, and never show "no results" while still loading. Loading indicators are chosen by expected wait time, use a delay and a minimum duration, and skeletons mirror the final layout. Errors are inline, specific and recoverable. Disabled controls are avoided where possible (keep submit enabled and validate on submit), and when used they are explained.

### Cited Findings
**Empty states**
- NN/g (Kaplan, 2021): (1) communicate system status, meaning a clear "nothing matches X" once loading is done and a progress indicator while loading; (2) give learning cues about what the area is for and how it gets filled; (3) give direct pathways, such as a button to create or import, docs links, or demo data. Avoid totally blank areas, showing "no records" while still loading, and vague instructions — [NN/g Empty States](https://www.nngroup.com/articles/empty-state-interface-design/)
- Rauno: empty states should prompt creating a new item, optionally with templates — [Rauno interfaces](https://github.com/raunofreiberg/interfaces)
- Vercel: design empty, sparse, dense and error states. Every screen offers a next step or recovery path — [Vercel guidelines](https://vercel.com/design/guidelines)
- → Rules: `[STATIC]` every list, table or collection component has an explicit `items.length === 0` branch with a heading, one sentence of explanation and a primary CTA. `[STATIC]` the empty branch is unreachable while `isLoading`. `[STATIC]` distinguish "no data yet" (onboarding CTA) from "no results for filter" (clear-filters action).

**Loading**
- NN/g: under 1 s, no indicator. At 2–10 s, a spinner for a module or a skeleton for a full page. Over 10 s, a progress bar with an estimate. Skeletons are for full-page loads. Avoid frame-only skeletons (header and footer only) and distracting shimmer. Use a progress bar for uploads and conversions — [NN/g Skeleton Screens 101](https://www.nngroup.com/articles/skeleton-screens/)
- Nielsen: beyond 10 s, show percent-done, an expected finish time and a way to interrupt — [NN/g Response Times](https://www.nngroup.com/articles/response-times-3-important-limits/)
- Vercel: skeletons mirror final content exactly. Loading buttons keep their original label and add an indicator. Spinners and skeletons get a 150–300 ms show-delay and a 300–500 ms minimum visible time. Add `…` to loading labels. Set image dimensions to avoid layout shift — [Vercel guidelines](https://vercel.com/design/guidelines)
- → Rules: `[RENDER]` CLS ≈ 0 when the skeleton swaps for content (skeleton dimensions equal final dimensions). `[STATIC]` a loading button doesn't collapse width (label kept, or width reserved). `[STATIC]` shimmer or pulse respects `motion-reduce`. `[STATIC]` uploads use `<progress>` or a determinate bar.

**Error**
- See the NN/g error guidelines in section 6. Inline near source, specific, constructive, input preserved, focus moved to the first error on submit, `aria-live="polite"` for inline validation and toasts — [NN/g Error-Message Guidelines](https://www.nngroup.com/articles/error-message-guidelines/); [Vercel guidelines](https://vercel.com/design/guidelines)
- Optimistic updates: on failure, show the error and roll back, or offer Undo — [Vercel guidelines](https://vercel.com/design/guidelines); [Rauno interfaces](https://github.com/raunofreiberg/interfaces)
- → Rules: `[STATIC]` every fetch or mutation has an error branch rendering a message plus a retry or recovery action. `[STATIC]` form errors use `aria-invalid` and `aria-describedby` linking field to message. `[STATIC]` failed forms keep the entered values.

**Disabled**
- Vercel: don't pre-disable submit. Allow incomplete submission so errors surface. Disable only once the request starts — [Vercel guidelines](https://vercel.com/design/guidelines)
- Rauno: disabled buttons shouldn't have tooltips (keyboard users can't focus them). Disable after submit to prevent duplicates — [Rauno interfaces](https://github.com/raunofreiberg/interfaces)
- Design-system and practitioner consensus: disabled buttons give no feedback about why. Prefer validation messages and inline hints. If you must disable, explain what unlocks it (helper text or inline message), and consider `aria-disabled` so the control stays discoverable by screen readers — [Smashing Magazine](https://smashingmagazine.com/2021/08/frustrating-design-patterns-disabled-buttons/); [Hennepin County design system](https://www.hennepincounty.gov/design-system/components/components-library/buttons); [Basis design system](https://design.basis.com/patterns/disabled-buttons)
- Vercel: hover, active and focus states need more contrast than the rest state. Rauno: no font-weight change between states (avoids layout shift) — [Vercel guidelines](https://vercel.com/design/guidelines); [Rauno interfaces](https://github.com/raunofreiberg/interfaces)
- → Rules: `[STATIC]` flag `disabled={!isValid}` / `disabled={!form.isDirty}` on submit buttons. `[STATIC]` any persistently disabled control has adjacent visible text explaining why. `[STATIC]` disabled styling isn't conveyed by opacity alone on an element that still looks clickable (`cursor-not-allowed` plus reduced contrast plus explanation). `[STATIC]` every interactive component defines rest, hover (scoped to hover-capable devices), active/pressed, focus-visible, disabled and loading where applicable.

### Inferences
- The minimum state matrix for any data-bound component: loading (delayed, layout-matched), empty-first-use (explain + CTA), empty-filtered (clear filters), error (specific + retry), sparse (one item looks intentional), dense or overflow (long text, many items, virtualization), and success feedback next to the trigger. A generated UI that renders only the "happy, medium-density" state is a common sign of low craft.
- Vercel's "don't pre-disable submit" and the design-system "avoid disabled" guidance conflict with the common pattern of disabling submit until the form is valid. The weight of these sources favors enabled submit plus validation on submit.

### Gaps
- The Primer, Carbon and Polaris component docs for empty and loading states were not fetched in this session. The cited disabled-state guidance comes from smaller design systems and Smashing Magazine rather than the major systems.
- No authoritative numeric guidance was found on how long success toasts should persist.
