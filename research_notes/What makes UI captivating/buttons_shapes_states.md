# Buttons, Shapes, Interactive States, Micro-interactions and Spacing: Recommended Values and Evidence

Research date: 2026-10-29. Values marked **[source code]** were read directly from the design system's public repository (most reliable, since many doc sites are JS-rendered and could not be scraped). **[doc]** = official documentation page. **[evidence]** = user study / experiment. **[convention]** = practitioner guidance without study data. Items marked *(not verified this session)* come from prior knowledge and should be double-checked before being quoted as fact.

---

## 1. Button dimensions across design systems (height, padding, label, icon spacing)

### Takeaway
Real systems cluster at **32px (dense/app default) to 40px (comfortable default)**, with 36px as the shadcn/Tailwind default, 44px+ for touch, and 48px+ for marketing "large". Horizontal padding is usually **12–16px at 32–36px heights and 16–24px at 40px** (roughly 1x–1.7x the 14px label size). Labels are almost universally **14px, weight 500 (medium) or 600 (semibold)**; icon size 16–18px with an **8px gap** (4–6px on small buttons).

### Cited Findings

**shadcn/ui (new-york-v4, current `main`)** **[source code]** — [button.tsx](https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/new-york-v4/ui/button.tsx)
- Base: `inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all`, icons `size-4` (16px).
- Sizes: `default: h-9 px-4 py-2` (36px tall, 16px horizontal padding; drops to `px-3` = 12px when it contains an svg); `xs: h-6 gap-1 px-2 text-xs`; `sm: h-8 gap-1.5 px-3` (32px / 12px); `lg: h-10 px-6` (40px / 24px; `px-4` with icon); icon buttons are squares `size-9`, `size-6`, `size-8`, `size-10`.
- Radius `rounded-md` (Tailwind default 6px; shadcn themes typically drive it from a `--radius` variable).
- Focus: `focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50` (3px ring at 50% opacity, no offset). Disabled: `opacity-50 pointer-events-none`.
- Variants and hover: primary `bg-primary hover:bg-primary/90` (hover = 10% lighter/more transparent); secondary `hover:bg-secondary/80`; outline `border bg-background shadow-xs hover:bg-accent`; ghost `hover:bg-accent`; link `underline-offset-4 hover:underline`. No press (`active:`) style by default.

**Radix Themes** **[source code]** — [base-button.css](https://raw.githubusercontent.com/radix-ui/themes/main/packages/radix-ui-themes/src/components/_internal/base-button.css), [button.css](https://raw.githubusercontent.com/radix-ui/themes/main/packages/radix-ui-themes/src/components/button.css), [space.css](https://raw.githubusercontent.com/radix-ui/themes/main/packages/radix-ui-themes/src/styles/tokens/space.css)
- Heights: size 1 = `--space-5` (24px), size 2 = `--space-6` (32px, default), size 3 = `--space-7` (40px), size 4 = `--space-8` (48px). Space scale: 4, 8, 12, 16, 24, 32, 40, 48, 64px.
- Horizontal padding: size 1 = 8px, size 2 = 12px (gap 8px); larger sizes scale up the space tokens.
- Radius per size: `max(var(--radius-1..4), var(--radius-full))`, so a theme-level "full" radius turns every button into a pill.
- "Classic" variant press: `--base-button-classic-active-filter: brightness(0.92) saturate(1.1)` (press = ~8% darker), and a 1–2px `active-padding-top` shift that visually "pushes" the label down.

**GitHub Primer** **[source code]** — [primer/primitives size.json5](https://raw.githubusercontent.com/primer/primitives/main/src/tokens/functional/size/size.json5), [primer/css button.scss](https://raw.githubusercontent.com/primer/css/main/src/buttons/button.scss)
- Control sizes: xsmall 24px (paddingBlock 2px), small 28px (paddingBlock 4px), **medium 32px (default; paddingBlock 6px, gap 8px)**, large 40px (paddingBlock 10px). paddingInline options per size: condensed 8px, normal 12px, spacious 16px. A 44px token exists in the same file (touch minimum).
- Primer CSS `.btn`: `padding: 5px 16px`, `line-height: 20px`, `font-weight: semibold` (600), body font size (14px). `.btn-sm`: `padding: 3px 12px`, small font. `.btn-large`: `padding: … 1.5em`, `border-radius: 0.5em` (em-based padding scales with font).

**IBM Carbon** **[doc]** — [Button style](https://carbondesignsystem.com/components/button/style/)
- Heights: XS 24px, **Small 32px, Medium 40px, Large (productive) 48px, Large (expressive) 48px, XL 64px, 2XL 80px**.
- Padding: 16px left; **64px right when no icon** (left-aligned label, deliberately asymmetric); with icon: 16px both sides and 32px space between label and icon. Ghost with icon: 8px spacing. Icon 16x16 (expressive 20x20).
- Label: 14px Regular 400 (`$body-compact-01`); expressive 16px Regular 400. Carbon is an outlier in using weight 400 and square corners.
- Focus: inset 1px box-shadow using `$focus` and `$focus-inset` tokens (2px blue border + 1px white inset in practice). Don't mix sizes in a button group.

**Shopify Polaris** **[source code]** — [Button.module.css](https://raw.githubusercontent.com/Shopify/polaris/main/polaris-react/src/components/Button/Button.module.css), [height tokens](https://raw.githubusercontent.com/Shopify/polaris/main/polaris-tokens/src/themes/base/height.ts), [border tokens](https://raw.githubusercontent.com/Shopify/polaris/main/polaris-tokens/src/themes/base/border.ts)
- Sizes are **larger on small screens and smaller from the `md` breakpoint up**: micro 28px mobile / 24px desktop (padding 4px 8px); slim+medium 32px mobile / **28px desktop** (padding 6px 12px); large 36px mobile / 32px desktop (padding 6px 12px). (px values derived from Polaris size tokens height-600..900 = 24..36px.)
- Gap `--p-space-050` (2px). Radius `--p-border-radius-200` (8px); focus outline uses `border-radius-300` (12px) so the ring is concentric with the 8px button.

**Material 3 (Material Web tokens v0.192)** **[source code]** — [_md-comp-filled-button.scss](https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-comp-filled-button.scss), [_md-comp-filled-button (unversioned)](https://raw.githubusercontent.com/material-components/material-web/main/tokens/_md-comp-filled-button.scss), [button _shared.scss](https://raw.githubusercontent.com/material-components/material-web/main/button/internal/_shared.scss)
- Filled button: **container-height 40px**, **container-shape `corner-full` (pill)**, leading/trailing space **24px** each, icon 18px, gap 8px, label = typescale Label Large (14px / 500 medium). Vertical padding computed as `(container-height − line-height) / 2`.
- State layers (overlay of the on-color): **hover 0.08, focus 0.12, pressed 0.12, dragged 0.16** — [_md-sys-state.scss](https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-state.scss).
- Focus ring: width 3px, outward offset 2px, "active-width" 8px (it grows then settles), animation duration = `duration-long4` (600ms) — [_md-comp-focus-ring.scss](https://raw.githubusercontent.com/material-components/material-web/main/tokens/_md-comp-focus-ring.scss).
- *(not verified this session)*: M3 Expressive (2025) added XS/S/M/L/XL button sizes (roughly 32/40/56/96/136dp) and round vs square shape options with a shape-morph on press; the m3.material.io spec page is JS-rendered and could not be read.

**Apple HIG** **[doc]** — [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons) (read via the HIG JSON feed)
- "A button needs a hit region of at least **44x44 pt** — in visionOS, **60x60 pt**."
- visionOS button sizes listed: Mini 28pt, Small 32pt, Regular 44pt, Large 52pt, Extra large 64pt. visionOS: place button centers at least 60pt apart; add 4pt padding around 60pt+ buttons.
- Prominence: use a prominent style for the most likely action; "Keep the number of prominent buttons to one or two per view"; too many prominent buttons increase cognitive load.
- Shape: "prefer circular or capsule-shape buttons"; icon-only = circle, text+icon = capsule; "prefer the rounded-rectangle shape in a vertical stack… capsule shape in a horizontal row." "Prefer buttons that have a discernible background shape and fill."

**Atlassian** **[doc]** — [Button examples](https://atlassian.design/components/button/examples)
- Spacing: default and **compact** (for tables). Appearances: default, primary, subtle, warning, danger (+ discovery). "Primary buttons should only appear once per area, but not every screen needs a primary button."
- *(not verified this session)*: default height 32px, compact 24px, radius 3px (legacy) moving to larger radii in the visual refresh.

**Vercel Geist** **[doc]** — [Geist Button](https://vercel.com/geist/button)
- Sizes tiny/small/medium(default)/large; shapes square, circle, rounded (rounded paired with `shadow` on marketing pages); variants default, secondary, tertiary, error, warning. The page HTML contains `height:32px` and `height:48px`; *(not verified)* conventional mapping small 32 / medium 40 / large 48.

**Summary table (default button, desktop web)**

| System | Default height | H-padding | Label | Radius | Source quality |
|---|---|---|---|---|---|
| shadcn/ui | 36px (h-9) | 16px (12 w/ icon) | 14px / 500 | 6px (rounded-md) | source |
| Radix Themes | 32px (size 2) | 12px | 14px | theme radius | source |
| Primer | 32px | 12–16px | 14px / 600 | 6px *(nv)* | source |
| Polaris | 28px desktop / 32px mobile | 12px | 12–13px / 500–650 *(nv)* | 8px | source |
| Carbon | 40px (md); 48px common | 16px L / 64px R | 14px / 400 | 0 (square) *(nv)* | doc |
| Material 3 | 40px | 24px | 14px / 500 | full (pill) | source |
| Apple (iOS) | 44pt hit min | — | — | capsule/rounded | doc |

### Inferences
- Padding-to-font ratio: shadcn 16/14 ≈ 1.14em; Primer 12–16/14 ≈ 0.86–1.14em; M3 24/14 ≈ 1.7em; Polaris 12/13 ≈ 0.9em. So **~1–1.7em horizontal** is the real-world band; dense app UIs sit near 1em, expressive/marketing near 1.5em. Vertical padding is better specified as a fixed height than as padding (all systems above fix height).
- Height/font ratio: 32/14 ≈ 2.3, 36/14 ≈ 2.6, 40/14 ≈ 2.9. A 2.3–2.9x height-to-label ratio reads as "button"; below ~2x it reads as a tag/chip.
- Dense product UIs (GitHub, Shopify admin, Linear-style) default to 28–32px; consumer/marketing to 40–48px. An agent should choose by density, not one universal value: **32px app / 36px shadcn default / 40px comfortable / 44–48px touch & hero CTA**.
- Polaris' mobile-up sizing is a concrete pattern worth copying: `min-height: 36px` on coarse/small viewports, `32px` at md+.
- Icon gap rule of thumb: ~8px at 36–40px heights, 4–6px at 24–32px (shadcn gap-1/1.5/2; Primer gap 4/4/8; M3 8px). Reduce the padding on the icon side by ~4px (shadcn `has-[>svg]:px-3`, M3 16px with leading icon *(nv)*) for optical balance.

### Gaps
- m3.material.io, Apple HIG, Atlassian and Geist pages are JS-rendered; exact M3 Expressive size table, Atlassian px heights/radius, Geist px heights could not be verified from primary text.
- Primer's exact border-radius token and Polaris label weight were not read this session.

---

## 2. Shape: square vs small radius vs pill; concentric radius; evidence on rounded corners

### Takeaway
Pills/capsules are the current default in Material 3 and Apple; small radii (6–8px) dominate dev-tool/SaaS systems (shadcn, Primer, Polaris); square (0px) is a deliberate "enterprise/engineered" signal (Carbon). Evidence for a general human preference for curved contours exists (Bar & Neta), but it is about objects, not button CTR. Nested radii should be concentric.

### Cited Findings
- Material 3 filled button shape token is `corner-full` (pill) — [Material Web tokens](https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-comp-filled-button.scss).
- Apple: "In general, prefer circular or capsule-shape buttons"; "The more rounded a button's shape, the easier it is for people to look steadily at it" (in the visionOS/eye-input context); rounded-rect for vertical stacks, capsule for horizontal rows — [Apple HIG Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons).
- Radix Themes lets a single theme radius setting (none/small/medium/large/full) cascade to every button via `max(var(--radius-N), var(--radius-full))` — [Radix base-button.css](https://raw.githubusercontent.com/radix-ui/themes/main/packages/radix-ui-themes/src/components/_internal/base-button.css).
- Polaris uses 8px button radius and a 12px radius on its focus outline, i.e. outer radius = inner radius + gap (concentric) — [Polaris Button.module.css](https://raw.githubusercontent.com/Shopify/polaris/main/polaris-react/src/components/Button/Button.module.css).
- Vercel Web Interface Guidelines: "Nested radii. Child radius ≤ parent radius & concentric so curves align." — [vercel-labs/web-interface-guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/README.md).
- **[evidence]** Bar & Neta (2006, *Psychological Science*): people preferred curved over sharp-angled versions of objects and of meaningless patterns (140 object pairs + 140 pattern pairs per a summary); hypothesis is that sharp contours convey threat — [PubMed 16913943](https://pubmed.ncbi.nlm.nih.gov/16913943/). Follow-up fMRI (Bar & Neta 2007, *Neuropsychologia*): amygdala more active for sharp than curved everyday objects — [PDF](https://canlab.unl.edu/sites/unl.edu.cas.psychology.cognitive-and-affective-neuroscience/files/media/file/BarNetaNeuropsych2007.pdf). A 2023 *Psychological Research* paper reports sharper angles are perceived as more threatening — [Springer](https://link.springer.com/article/10.1007/s00426-023-01822-y).

### Inferences
- What shape communicates (convention, not evidence): **0px** = precise, engineered, enterprise (Carbon, brutalist); **4–8px** = neutral, tool-like, modern SaaS default; **pill** = friendly, consumer, tappable, "single prominent action" (Material, Apple, marketing CTAs). Pill also makes width differences between buttons more visible, so pills look best for standalone CTAs and toolbars of short labels.
- Concentric rule for CSS: `inner-radius = outer-radius − padding` (or ring `outer = inner + offset + ring-width`). Example: card 16px radius with 8px padding → nested button 8px. Polaris' 8px button + 12px focus ring follows this.
- Pick one radius family and apply it consistently across buttons, inputs, and cards; mixed button radii read as unpolished.
- Bar & Neta supports "rounded is generally more pleasant" but gives no evidence that rounded buttons get more clicks; don't claim CTR effects from it.

### Gaps
- No credible controlled study found isolating button corner radius vs click-through or task time. NN/g has commentary on rounded corners, but no specific article was fetched this session.

---

## 3. Hover, press, focus states

### Takeaway
Every interactive state should **increase** contrast vs rest. Use hover only on hover-capable pointers (`@media (hover: hover) and (pointer: fine)`), give a press response (~8–12% darker or a 0.96–0.98 scale), and show focus with `:focus-visible` and a ring of at least 2px with at least 3:1 change in contrast (WCAG 2.4.13 AAA; 2.4.7 AA requires that it be visible at all).

### Cited Findings
- **Hover magnitudes in real systems [source code]:** shadcn primary `hover:bg-primary/90`, secondary `/80` — [shadcn button.tsx](https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/new-york-v4/ui/button.tsx); Material state layers hover 8%, focus 12%, pressed 12% overlay — [md-sys-state](https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-state.scss); Radix classic press `brightness(0.92) saturate(1.1)` plus 1–2px downward label shift — [Radix base-button.css](https://raw.githubusercontent.com/radix-ui/themes/main/packages/radix-ui-themes/src/components/_internal/base-button.css).
- Vercel: "Interactions increase contrast. `:hover`, `:active`, `:focus` have more contrast than rest state." — [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/README.md).
- Vercel: "Every focusable element shows a visible, unobscured focus ring. Prefer `:focus-visible` over `:focus` to avoid distracting pointer users. Set `:focus-within` for grouped controls." Sticky headers/overlays must never cover the focused element — [same](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/README.md).
- Vercel: match visual and hit targets; if the visual target is < 24px expand the hit target to ≥ 24px; on mobile the minimum is 44px — [same](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/README.md). Uses `@media (pointer: fine)` to scope desktop-only behaviour and warns that `pointer` describes only the primary input, so test hybrid devices.
- **WCAG 2.4.13 Focus Appearance (AAA):** indicator area at least that of a **2 CSS px thick perimeter** of the unfocused component, and **≥ 3:1 contrast between the same pixels in focused vs unfocused states**; a solid 2px outline is the simplest way to comply — [W3C Understanding 2.4.13](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html). 2.4.7 Focus Visible (AA) requires a visible indicator to exist — [same page](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html).
- Ring specs in practice: shadcn 3px ring at 50% opacity, no offset; Material 3px ring with 2px outward offset; Carbon 1px inset shadow (2px border + inset) — sources above ([shadcn](https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/new-york-v4/ui/button.tsx), [Material focus ring](https://raw.githubusercontent.com/material-components/material-web/main/tokens/_md-comp-focus-ring.scss), [Carbon](https://carbondesignsystem.com/components/button/style/)).
- Disabled: shadcn uses `opacity-50` + `pointer-events-none` — [shadcn](https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/new-york-v4/ui/button.tsx). Vercel: "Don't pre-disable submit"; allow submitting to surface validation — [Vercel guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/README.md).

### Inferences
- Recommended CSS/Tailwind recipe (synthesis of the above):
  - Hover: `@media (hover:hover) and (pointer:fine)` (Tailwind v4's `hover:` variant already wraps in `@media (hover: hover)`), background 8–10% darker/lighter, ~150ms.
  - Press: `active:scale-[0.97]` (range 0.96–0.98) and/or ~8% darker; transition ~100ms; no scale on large surfaces (cards) beyond 0.99.
  - Focus: `focus-visible:outline-2 outline-offset-2` in an accent colour with ≥3:1 against adjacent colours; ring radius = button radius + offset (concentric).
  - Never remove focus outlines without a replacement.
- `cursor: pointer` on buttons is a debated convention: native OS buttons use the arrow cursor, while the web convention (and most design systems' CSS) uses the hand. Both are defensible; consistency within the product matters more. *(not verified this session; commonly attributed arguments by Adam Silver and others.)*

### Gaps
- WCAG 2.4.11 Focus Not Obscured (Minimum, AA) and 2.5.8 Target Size (Minimum, AA, 24x24 CSS px) were not fetched from W3C this session. The 24px figure is corroborated by Vercel's guideline above.
- No NN/g hover-specific study or "hover delay" value was retrieved. Common convention: ~100–300ms intent delay for hover menus/tooltips, not for button background changes *(not verified)*.

---

## 4. Animation: durations, easing, what not to animate

### Takeaway
Micro-interactions belong in **100–200ms**, larger UI transitions in **200–300ms**, rarely above 400ms. Use **ease-out** (fast start) for anything responding to the user, never ease-in for entrances; animate only `transform` and `opacity`, never `transition: all`; don't animate keyboard-triggered or very frequent actions.

### Cited Findings
- **Material 3 duration tokens [source code]:** short1–4 = 50/100/150/200ms; medium1–4 = 250/300/350/400ms; long1–4 = 450/500/550/600ms; extra-long1–4 = 700/800/900/1000ms — [_md-sys-motion.scss](https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-motion.scss).
- **Material 3 easing [source code]:** standard / emphasized `cubic-bezier(0.2, 0, 0, 1)`; emphasized-decelerate `cubic-bezier(0.05, 0.7, 0.1, 1)`; emphasized-accelerate `cubic-bezier(0.3, 0, 0.8, 0.15)`; standard-decelerate `cubic-bezier(0, 0, 0, 1)`; standard-accelerate `cubic-bezier(0.3, 0, 1, 1)`; legacy (M2) `cubic-bezier(0.4, 0, 0.2, 1)`, legacy-decelerate `(0, 0, 0.2, 1)`, legacy-accelerate `(0.4, 0, 1, 1)` — [same file](https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-motion.scss).
- **Emil Kowalski [convention, practitioner]:** UI animations should usually be "shorter than 300ms"; a 500ms enter animation is too slow for a frequent action; `ease-out` recommended because it starts fast; "never animate keyboard initiated actions" since they repeat hundreds of times per day; frequent actions (e.g. Raycast) should be animation-free; don't animate padding/margin (layout/paint), prefer `transform`/`opacity`; target 60fps — [emilkowal.ski/ui/great-animations](https://emilkowal.ski/ui/great-animations).
- **Vercel [convention]:** prefer CSS > Web Animations API > JS libraries; animate only when it clarifies cause and effect or adds deliberate delight; animations must be interruptible; "Never `transition: all`" — list properties explicitly, typically `opacity`, `transform`; honor `prefers-reduced-motion`; loading states: ~150–300ms show-delay and ~300–500ms minimum visible time to avoid flicker — [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/README.md).
- shadcn's button uses `transition-all` (no explicit duration, so Tailwind default 150ms with `cubic-bezier(0.4, 0, 0.2, 1)`) — [shadcn button.tsx](https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/new-york-v4/ui/button.tsx); this conflicts with Vercel's "never transition: all" guidance.
- Material focus ring animates over `duration-long4` (600ms), growing to 8px then settling to 3px — [focus ring tokens](https://raw.githubusercontent.com/material-components/material-web/main/tokens/_md-comp-focus-ring.scss).

### Inferences
- Button recipe: `transition: background-color 150ms ease-out, transform 100ms ease-out, box-shadow 150ms ease-out;` hover-out may be slightly slower than hover-in; press should be near-instant (≤100ms) so it feels physical.
- Good custom ease-out curves for UI: Material emphasized-decelerate `(0.05, 0.7, 0.1, 1)` or standard `(0.2, 0, 0, 1)`; a common "snappy" ease-out is `cubic-bezier(0.23, 1, 0.32, 1)` *(widely used in Emil Kowalski's work; not verified on the page fetched)*.
- Do not animate: width/height/padding/margin/top/left, colour of large gradients, anything triggered by keyboard shortcuts, list re-renders on every keystroke.

### Gaps
- Apple's spring parameters for web translation and Emil's exact cubic-bezier values were not on the fetched page.

---

## 5. Clickability signifiers, ghost buttons, labels

### Takeaway
Strong signifiers (filled/bordered buttons, coloured or underlined links) measurably reduce search effort; flat, weak signifiers (including ghost buttons) cost ~22% more time and ~25% more fixations in NN/g's eyetracking study. Use ghost/outline buttons only for secondary actions next to a filled primary.

### Cited Findings
- **[evidence] NN/g eyetracking:** 71 users, 9 live pages from 6 domains, each with strong vs weak signifier versions (18 designs), between-subjects. Weak signifiers: **22% longer task time, 25% more fixations** (both p < 0.05). 6/9 page pairs showed different heatmaps; in every differing case the weak version spread fixations more widely. Brilliant Earth example: 86% (25/29) of strong-version users went heading → target vs 50% (12/24) of weak-version users (p < 0.005); 9 weak-version users stopped at a subheading thinking it was clickable. 3/9 pairs showed no difference: low density, traditional layout, high-contrast prominent targets — [NN/g: Flat UI Elements Attract Less Attention and Cause Uncertainty](https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/).
- NN/g recommendation: use strong traditional signifiers where users must find specific actions; inline links can skip underlines if colour contrast is strong; flat design is safer with low density and consistent layout. Limitation: short single-page findability tasks, so 22% likely overstates real-world cost — [same](https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/).
- NN/g classifies ghost buttons as a weak signifier — [NN/g Flat design article (via search summary)](https://nngroup.com/articles/flat-design-long-exposure/).
- **[weak evidence]** CXL ran a one-off A/B test on its homepage: ghost-button variant got ~20% fewer clicks on the buttons; author calls it a single test, suggestive not conclusive — [CXL: Ghost Buttons](https://conversionxl.com/blog/ghost-buttons/) (figure from search summary; not fetched).
- Apple: "Prefer buttons that have a discernible background shape and fill" — [Apple HIG Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons).
- One primary per area: Apple ("one or two per view"), Atlassian ("Primary buttons should only appear once per area") — [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/buttons), [Atlassian](https://atlassian.design/components/button/examples).

### Inferences
- Hierarchy recipe: 1 filled primary; secondary = tonal/gray fill or outline; tertiary = ghost/link. Ghost buttons on busy imagery are the riskiest use.
- Labels: specific verb + object ("Create project", not "OK/Submit"); keep the same noun across UI (Vercel "Keep nouns consistent" — [guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/README.md)).

### Gaps
- NN/g's dedicated button-label and button-state articles were not fetched this session.

---

## 6. Spacing / padding systems

### Takeaway
All surveyed systems use a **4px base unit with 8px rhythm** (4, 8, 12, 16, 24, 32, 40, 48, 64). Internal padding should be ≤ the spacing between groups so related things cluster (Gestalt proximity).

### Cited Findings
- Radix space scale: 4, 8, 12, 16, 24, 32, 40, 48, 64px — [Radix space.css](https://raw.githubusercontent.com/radix-ui/themes/main/packages/radix-ui-themes/src/styles/tokens/space.css).
- Primer control padding tokens are 2/4/6/8/10/12/16px, i.e. a 4px grid with 2px half-steps for vertical padding — [Primer size.json5](https://raw.githubusercontent.com/primer/primitives/main/src/tokens/functional/size/size.json5).
- Polaris space tokens used in buttons: 050 (2px), 100 (4px), 150 (6px), 200 (8px), 300 (12px) — [Polaris Button.module.css](https://raw.githubusercontent.com/Shopify/polaris/main/polaris-react/src/components/Button/Button.module.css).
- Carbon spacing tokens in buttons: `$spacing-03` 8px, `$spacing-05` 16px, `$spacing-07` 32px, `$spacing-10` 64px — [Carbon Button style](https://carbondesignsystem.com/components/button/style/).
- Tailwind's default spacing unit is 0.25rem (4px), so `h-9` = 36px, `px-4` = 16px — implied by [shadcn button.tsx](https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/registry/new-york-v4/ui/button.tsx) classes.

### Inferences
- Card padding conventions: 16px (dense), 20–24px (default), 32px+ (marketing). Section spacing on marketing pages: 64–128px vertical. *(Convention; card values not verified from a system doc this session.)*
- The "internal ≤ external" rule applies to containers: a card's inner padding should be less than or equal to the space separating it from neighbouring cards or sections. It does not apply to sibling buttons. Those form one group, so the gap between them (typically 8px) is smaller than their own 12–16px padding.

### Gaps
- No primary source fetched for card/section padding values in Material/Polaris/Atlassian.

---

## 7. A/B and user-study evidence on button size, colour, shape vs. clicks

### Takeaway
Credible evidence supports **contrast/visual salience and clear signifiers**, not any specific colour. The famous "red button +21%" (HubSpot/Performable, 2011) is a single small test on a green-dominant page and is best read as a contrast (isolation effect) result.

### Cited Findings
- NN/g eyetracking (above) is the strongest evidence: weak signifiers cost 22% time and 25% fixations — [NN/g](https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/).
- HubSpot/Performable red-vs-green: secondary sources say it ran in August 2011 on Performable's site where green was the dominant brand colour, over a few days with ~2,000 visits; critics attribute the result to contrast/isolation, not "red" — [SitePoint: Red vs Green](https://www.sitepoint.com/button-ux-red-green/), [WordStream](https://www.wordstream.com/blog/ws/2019/02/04/landing-page-design). The original HubSpot URL attempted redirected to an unrelated article, so primary details are unconfirmed.
- HubSpot's A/B-test roundup reports Expoze.io raised CTA clicks 25% by changing the page background (not the button), attributed to added contrast around the CTA — [HubSpot blog (redirected page)](https://blog.hubspot.com/blog/tabid/6307/bid/20566/the-button-color-a-b-test-red-beats-green.aspx).
- CXL ghost-button test: −20% clicks (single test) — [CXL](https://conversionxl.com/blog/ghost-buttons/).
- Fitts's-law-style target sizing is codified in standards rather than CTR studies: 44x44pt Apple, 24px web minimum / 44px mobile per Vercel — [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/buttons), [Vercel](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/README.md).

### Inferences
- Treat "X colour converts better" claims as myths unless they report sample size and context. The defensible rule: the primary CTA should be the highest-contrast, most saturated element in its region, and there should be only one.
- Unverified aggregator stats (e.g., "2,588 A/B tests" colour rankings, "+26% high-contrast buttons") should not be quoted.

### Gaps
- No peer-reviewed controlled study found isolating button size or corner radius on conversion. CXL's original articles were not fetched; their numbers come from search summaries.
