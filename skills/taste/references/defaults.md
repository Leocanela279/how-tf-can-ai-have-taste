# Defaults

These values apply only when neither the user, a measured reference, nor the subject decides. Each
row is graded:
- **M** measured
- **S** a standard (WCAG)
- **C** a convention shared across design systems
- **O** one source or opinion

Full sources are in the repo's `reports/What makes UI captivating.md`. Most pixel values are
convention: safe and consistent, but not proven.

## Structure

- **Skeleton (M).** Keep the category's typical structure. Spend novelty on type, one visual, one
  motion and the accent.
- **Complexity (M).** Few, well-grouped regions. Group content, don't delete it. A page stripped to
  emptiness loses.
- **Theme (M).** Ask first. Without an answer, use light for reading-heavy pages and general
  audiences. Light text loses legibility faster as it gets smaller.

## Type

| Context | Size | Weight | Leading | Tracking | Grade |
| --- | --- | --- | --- | --- | --- |
| Display | 48–120px | 600–700, or 300–400 for a light editorial look at 40px+ | 0.95–1.15 | −0.02em; −0.04em or tighter only as a brand choice | C |
| Page title | 28–40px | 600 | 1.2–1.25 | −0.02em | C |
| Section heading | 20–24px | 600 | 1.25–1.35 | −0.015 to −0.02em | C |
| Body, reading | 16–18px | 400 | 1.5–1.6 | −0.01em to 0; lines of 45–75ch | C |
| Body, app | 14px | 400 | 1.43 (20px) | −0.006em (Inter) | C |
| Labels, buttons | 13–14px | 500 | 1.2–1.4 | 0 | C |
| Caption, meta | 12px (floor 11px) | 400 | 1.33 | 0 to +0.02em | C |
| All caps | 11–12px | 500–600 | — | +0.06 to +0.1em | O |

- **Tracking curve (C).** Slightly positive at 11–12px, zero around 13px, more negative as size grows.
  Inter's formula is tracking(em) = −0.0223 + 0.185·e^(−0.1745·size). Use the font's own curve;
  never paste Apple's or Material's values onto another face.
- **Weights (C).** 3–4 per system. Nothing at 300 or lighter at text size.
- **Numbers (C).** `tabular-nums` for tables, KPIs and timers. Prices and KPIs stay in the sans;
  monospace is for code and IDs.
- **Mobile inputs (O).** 16px or more, or iOS zooms in.
- **Dark mode text (O).** Light text on dark reads heavier, so drop the weight 10–50 units or use
  `antialiased`.

## Space and shape

- **Spacing (C).** A 4px base: 4, 8, 12, 16, 24, 32, 48, 64. The gap between groups is 2–3× the gap
  inside one.
- **Button height (C).** 32px dense, 36px default, 40px comfortable, 44–48px for touch and hero.
  Horizontal padding about 1–1.7× the label size (`px-3`–`px-4` at 32–36px, `px-4`–`px-6` at 40px).
  Icons 16px with an 8px gap.
- **Hit target (S).** At least 24×24px, 44px on touch.
- **Button hierarchy (M, C).** One filled primary per area. Secondary is tonal or outlined. Ghost
  buttons are tertiary only and never sit on imagery: weak signifiers cost 22% more time.
- **Shape (M, C).** Curves are mildly preferred (g = 0.39). Use 6–8px or pills for friendly and
  consumer; 0–4px for precise and editorial. Pick one family of radii, nested concentrically: inner
  radius = outer radius − padding.

## States

- **Hover (C).** Background ±8–10%, 150ms ease-out, only under `@media (hover: hover)`.
- **Press (C).** `scale(0.97)` and/or `brightness(0.92)`, 100ms or less. Cards scale no lower
  than 0.99.
- **Focus (S).** `:focus-visible`, a 2px outline with a 2px offset, at 3:1 or more against the
  unfocused state.
- **Disabled (C).** 50% opacity, no pointer events. Don't disable submit before the user has tried.
- **Loading (O, M).**
  - Show an indicator after 150–300ms, and keep it up for at least 300–500ms.
  - Progress that speeds up near the end feels faster.
  - Use skeletons only when the layout is known.

## Colour

- **Text contrast (S).**
  - Body 4.5:1 or more; aim for APCA Lc 90, with Lc 75 as the floor.
  - Secondary text Lc 60 or more.
  - Borders and focus rings 3:1.
- **Light theme (C).** Ink around `#111`–`#1a1a1a` on `#fff` or `#fafafa`–`#fcfcfc`. Avoiding pure
  `#000` on `#fff` is a comfort convention; no harm has been measured.
- **Dark theme (C).**
  - Ground `#0f`–`#18`.
  - Elevation by lighter steps, not shadows.
  - Ink around 87% white (`#e5`–`#ed`), muted around 60%.
  - Accents lighter and lower in chroma.
  - Re-check every contrast pair.
- **Palette (C).** OKLCH ramps on one lightness curve. One tinted neutral, one accent and four
  semantic colours. The accent covers about 5–10% of the area.
- **Avoid (M, S).**
  - Saturated red next to blue or green.
  - Colour as the only signal.
  - Full chroma on large areas.

## Motion

| Kind | Duration | Grade |
| --- | --- | --- |
| Micro (toggle, press) | 70–150ms | C |
| Small (popover, toast, tooltip) | 150–250ms; delay the first tooltip, later ones instant | C |
| Medium (modal, sheet) | 200–350ms; exits 20–30% shorter | C |
| Route change | Shared element for list → detail; 150–250ms fade for unrelated views | C |

- **Easing (C).**
  - Enter: `cubic-bezier(0, 0, 0.2, 1)`, or `(0.05, 0.7, 0.1, 1)` for emphasis.
  - Exit: `(0.3, 0, 1, 1)`.
  - Moving on screen: `(0.2, 0, 0, 1)`.
  - Never linear for movement. Springs at damping ≈ 0.9.
- **Required (M).** Overlays, accordions, reordering, list → detail. Stage complex changes one at a
  time.
- **Never (C, M).** Keyboard-triggered or roughly 20+ times a day actions, anything that blocks
  input, scroll-jacking, parallax on text.
- **Reduced motion (S).** Gate motion behind `prefers-reduced-motion: no-preference` and substitute a
  cross-fade.
