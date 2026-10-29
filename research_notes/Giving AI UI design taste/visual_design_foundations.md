# Visual Design Foundations for Web UI: Cited Principles Turned Into Checkable Rules

Scope: typography, layout/grid, Gestalt spacing, colour, hierarchy and restraint for HTML/CSS/Tailwind UIs. Every source rule below is paraphrased and followed by a "Check:" line, a translation an AI agent can verify from code (computed CSS) or a screenshot. Where sources disagree, both are shown. Research date: 2026-10-29.

Source quality legend: [P] = primary source (author's own site/book page, W3C spec). [S] = secondary summary (blog, book summary, third-party notes). Treat [S] numbers as less authoritative.

---

## Typography: size, measure, leading, scale, caps, weights

### Takeaway
The canonical sources agree closely on body text: about 15–25px on the web, line-height 1.2–1.45 (WCAG asks that content tolerate 1.5), and a measure of about 45–75 characters (Butterick allows up to 90; Every Layout caps it at 60ch). They split on modular scales. Tim Brown, Every Layout and Utopia derive sizes from a ratio. Butterick and Refactoring UI say to pick sizes by eye from a small fixed set. For an AI, a reasonable rule is "a small, fixed set of sizes with consistent steps", checked by counting distinct sizes and measuring the ratios between them.

### Cited Findings

**Body text (Butterick, Practical Typography)** [P]
- Begin with body text, because it sets most of the page's typographic quality. Its four main settings are point size, line spacing, line length and font. — [Typography in ten minutes](https://practicaltypography.com/typography-in-ten-minutes.html)
  - Check: body text styles (`p`, the main content container) are set on purpose, not left at browser defaults (16px Times/serif, `line-height: normal`).
- Body text on the web should be 15–25px. — [Typography in ten minutes](https://practicaltypography.com/typography-in-ten-minutes.html); [Summary of key rules](https://practicaltypography.com/summary-of-key-rules.html)
  - Check: computed `font-size` of body/paragraph text is between 15px and 25px inclusive. In Tailwind, `text-base` (16px) through `text-xl` (20px) pass, and `text-sm` (14px) fails for long-form body copy.
- Line spacing should be 120–145% of the font size. In CSS, use a unitless `line-height` (130% becomes `1.3`). — [Typography in ten minutes](https://practicaltypography.com/typography-in-ten-minutes.html)
  - Check: body `line-height` is unitless and between 1.2 and 1.45. Flag px line-heights on body text. Tailwind `leading-snug` (1.375) and `leading-normal` (1.5) are near or at the range edges. See the WCAG 1.5 note below.
- Average line length should be 45–90 characters including spaces, or 2–3 lowercase alphabets. On the web, keep text from running to the browser edges. — [Typography in ten minutes](https://practicaltypography.com/typography-in-ten-minutes.html)
  - Check: the text container's `max-width` is at most about 90ch, and the rendered average characters per line is 45–90. A screenshot heuristic: no paragraph spans the full width of a viewport wider than about 1000px.
- Use bold and italic as little as possible, and never combine them. Avoid underlining except possibly for links. Use centred text sparingly. Always turn on kerning. — [Summary of key rules](https://practicaltypography.com/summary-of-key-rules.html)
  - Check: no element is both `font-weight >= 600` and `font-style: italic`. `text-decoration: underline` appears only on `a` elements. No paragraph longer than about 3 lines uses `text-align: center`. `font-kerning` is not `none`.
- Separate paragraphs with either a first-line indent (1–4× the font size) or 4–10pt of space between them, never both. — [Summary of key rules](https://practicaltypography.com/summary-of-key-rules.html)
  - Check: `p + p` does not have both a non-zero `text-indent` and a non-zero `margin-top`/`margin-bottom`.
- Use all caps only for less than one line of text (labels, headers, captions), never for paragraphs. All caps and small caps get 5–12% extra letterspacing. — [Summary of key rules](https://practicaltypography.com/summary-of-key-rules.html); [All caps](https://practicaltypography.com/all-caps.html)
  - Check: any element with `text-transform: uppercase` (Tailwind `uppercase`) has text under about 60 characters, or fits on one rendered line, and has `letter-spacing` of 0.05–0.12em (Tailwind `tracking-wider` = 0.05em and `tracking-widest` = 0.1em pass, while `tracking-normal` fails).
- Fonts: use a professional font. Avoid goofy fonts, monospace for body text, most free fonts, and system defaults, and never use Times New Roman or Arial. — [Summary of key rules](https://practicaltypography.com/summary-of-key-rules.html)
  - Check: the body `font-family` stack's first resolved font is not Arial, Times New Roman or a monospace face. This is an opinionated rule; many product UIs deliberately use system UI stacks.

**Headings (Butterick)** [P]
- Use at most three heading levels, and two is better. Increase size only by the smallest visible step (for 12pt body, about 12.5–13pt rather than 14–15pt). Prefer bold over italic. Emphasize headings mainly with space above and below. Avoid all caps, underlining, centring and hyphenation in headings. Butterick explicitly rejects modular scales for heading sizes and prefers visual judgment. — [Headings](https://practicaltypography.com/headings.html)
  - Check: at most 3 distinct heading styles per view (document-style pages). Heading margin-top is greater than heading margin-bottom, so the heading sits closer to its own section. Headings are not `underline`. Note: Butterick's tiny size steps suit documents. Marketing and app UIs commonly use bigger contrast (see Vignelli and NN/g below).

**Measure (Bringhurst via Rutter, The Elements of Typographic Style Applied to the Web)** [P, adaptation of Bringhurst]
- Single-column text at text size: 45–75 characters per line, with 66 (letters and spaces) as the ideal. Multi-column text: 40–50 characters. One character averages about 0.5em, so 33em is about 66 characters. Em-based widths preserve the measure as text resizes. — [webtypography.net 2.1.2](http://webtypography.net/2.1.2)
  - Check: single-column prose container `max-width` is 22.5–37.5em or about 45–75ch, with an ideal near 33em or 66ch. Multi-column or card text is 40–50ch. Tailwind `max-w-prose` (65ch) passes.

**Measure axiom (Every Layout, Bell & Pickering)** [P]
- The measure should never exceed 60ch. They treat 45–75 characters as reasonable and apply the rule globally (`* { max-inline-size: var(--measure) }`), exempting layout containers (html, body, div, header, nav, main, footer). `ch` is used because it scales with font size. — [Every Layout: Axioms](https://every-layout.dev/rudiments/axioms/)
  - Check: text-bearing elements (p, li, h1–h6, blockquote, figcaption) have computed `max-inline-size`/`max-width` of at most about 60–75ch, or sit inside a container that enforces it.

**Modular scale (Tim Brown, A List Apart; Every Layout)** [P]
- A modular scale is a sequence built from a base value times or divided by a ratio. Bringhurst likened it to a musical scale of harmonious proportions. Brown's example uses the golden ratio 1.618 from an 18px body base, and he allows a two-base ("double-stranded") scale. He treats the scale as a guide, rounding or improvising when the design needs it. — [More Meaningful Typography, A List Apart](https://alistapart.com/article/more-meaningful-typography/)
- Every Layout builds one scale for both spacing and type: `--ratio` (1.5 in its examples, golden ratio mentioned), `--s0: 1rem`, `--s1 = s0 × ratio`, `--s-1 = s0 / ratio`, and so on. The base step is tied to the body line-height. It recommends having components accept only integer scale steps, which enforces the scale. — [Every Layout: Modular scale](https://every-layout.dev/rudiments/modular-scale/)
  - Check: collect every distinct computed `font-size` in the view and sort them. The ratio between adjacent sizes should be roughly consistent (for example, the standard deviation of the adjacent ratios is small), and the scale ratio is at least about 1.125–1.2 so steps are distinguishable. Every font-size and spacing value maps to a token (a CSS variable or Tailwind theme key) rather than an arbitrary literal (flag Tailwind `text-[17px]`, `p-[13px]`).
- Contradiction: Butterick rejects computed modular scales for headings ([Headings](https://practicaltypography.com/headings.html)), and Refactoring UI (per a secondary summary) says to hand-pick a limited type scale rather than compute it ([Book summary](https://sglavoie-github-io.pages.dev/posts/2023/09/09/book-summary-refactoring-ui/)) [S]. The point all sources share is constraint (a small fixed set), not the ratio itself.

**Fluid type (Utopia)** [P]
- Define one type scale for a small viewport and one for a large viewport, and let the browser interpolate between them. Headings then map to fixed steps (for example, H2 is always step 4) with no per-breakpoint values. The article's example uses ratio 1.2 at 320px and 1.333 at 1500px. The calculator's default link parameters (an inference, since the fields aren't labelled) appear to be 360px/18px/1.2 to 1240px/20px/1.25. — [Designing with fluid type scales](https://utopia.fyi/blog/designing-with-fluid-type-scales/)
  - Check: if fluid type is used, `font-size` is a `clamp(min, preferred, max)` whose preferred value includes `vw` or `cqi` and a rem component (for zoom accessibility). Small-screen scale ratio is at most the large-screen ratio, so headings shrink more than body text on mobile.

**Weights and hierarchy in type (Refactoring UI via summaries)** [S]
- Limit hierarchy to 2–3 colours and 2–3 font weights. Signal importance with weight and colour, not only size. Use a larger line-height for small text and a smaller one for large text. Tighten letter-spacing on headlines and loosen it on all caps. Line length should be 45–75 characters (about 20–35em). Prefer typefaces with 5 or more weights. Use px or rem for sizes, not em. — [Book summary: Refactoring UI](https://sglavoie-github-io.pages.dev/posts/2023/09/09/book-summary-refactoring-ui/)
- Secondary summaries add: avoid weights below 400 in UI text, and de-emphasize with colour or size rather than a lighter weight. Use about two weights (regular plus semibold or bold). These come from third-party "skill" files and notes, so they are low authority. — [Search summary incl. jsDelivr reference & rjseymour66 notes](https://rjseymour66.github.io/webdev/refactoring-ui/)
  - Check: at most 3 distinct `font-weight` values per view. No body or UI text below weight 400. Line-height falls as font-size rises, so headings (≥ 32px) use about 1.0–1.25 and body uses about 1.4–1.6. Headings ≥ 32px have `letter-spacing` ≤ 0 (Tailwind `tracking-tight`).

**Accessibility floors for text (W3C)** [P]
- WCAG 2.2 SC 1.4.12 Text Spacing (AA): content must keep working when users set line-height to 1.5×, paragraph spacing to 2×, letter-spacing to 0.12× and word-spacing to 0.16× the font size. It doesn't require authors to use these values, only that the layout survive them. — [Understanding 1.4.12](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html)
  - Check: inject a stylesheet with `* { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important } p { margin-bottom: 2em !important }` and confirm no text is clipped (`overflow: hidden` plus fixed heights) or overlapping. Flag fixed `height` on text containers.

### Inferences
- A sensible, defensible default rule set for an AI, combining Butterick, Bringhurst and Every Layout: body 16–20px; line-height 1.4–1.6 (Butterick's upper bound 1.45 sits close to the WCAG tolerance of 1.5); prose `max-width` 60–70ch; at most 3 heading levels; at most 3 weights; all caps only on short labels, with 0.05–0.12em tracking.
- "Number of font sizes per view" is not given numerically by Butterick or Every Layout. The numeric caps come from NN/g (at most 3 sizes: small, medium, large) and Vignelli (two sizes per printed page). Both appear in the Hierarchy section. A practical code check is at most about 5–6 distinct font-sizes per view including UI chrome, and at most 3 in the content area. These numbers are inferred, not sourced.
- Scale ratio of at least 1.2: no source mandates 1.2 as a minimum. Utopia's default small-screen ratio is 1.2, and Tim Brown and Every Layout use 1.5–1.618. "Ratio ≥ 1.2 between adjacent heading steps" is a reasonable inferred threshold, and Butterick would argue for smaller steps in documents.

### Gaps
- Bringhurst's own book text on leading and scale (for example, the 16th-century scale 6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 21, 24, 36, 48, 60, 72) was not fetched from a primary source. Only Rutter's web adaptation of the measure chapter was verified.
- The Refactoring UI book itself was not accessible (the Medium article returned 403). Its hand-picked type scale (for example, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72) and spacing scale (4, 8, 12, 16, 24, 32, 48, 64...) are widely cited and match Tailwind defaults, but neither was verified from a primary source in this session.
- Butterick's all-caps page did not state a letterspacing value. The 5–12% figure comes from his Summary of key rules page.

---

## Layout and grid: Vignelli, Müller-Brockmann/Swiss style, Gestalt-derived spacing rules

### Takeaway
Grid sources (Vignelli, Müller-Brockmann) are mostly available only through secondary summaries. Their message is a small number of typefaces, a consistent column grid, and strong scale contrast. Gestalt sources (NN/g) give the most directly checkable layout rules: space inside a group is smaller than space between groups, a heading sits closer to the content below it than to the content above, and containers (borders or backgrounds) are a stronger grouping cue than spacing but should only be added when spacing isn't enough.

### Cited Findings

**Vignelli Canon** [S, secondary summaries; the free PDF from RIT is the primary source]
- Vignelli worked with a severely limited palette of typefaces (commonly cited: Garamond, Bodoni, Century Expanded, Helvetica). He held that clarity of communication matters more than the choice of face. — [Vignelli Canon summaries via search](https://andrewclark.super.site/all-media/the-vignelli-canon); [SEGD excerpt](https://segd.org/?p=7876)
  - Check: at most 2 font families per view (excluding a monospace face for code and the icon font).
- He usually stuck to no more than two type sizes on a printed page, with headings typically about twice the body size. Scale contrast creates hierarchy, and type size relates to column width. — [SEGD excerpt](https://segd.org/?p=7876) (as summarized in search results)
  - Check (strict "Vignelli mode"): content area uses 2 primary sizes. If a display or heading size is used, it is about 2× body or more, so the contrast is decisive, not timid. Avoid near-duplicate sizes (adjacent sizes differing by less than about 10%).
- A grid that is too coarse restricts, and one that is too fine becomes impractical. Relate the grid to image proportions to minimize cropping. — [Andrew Clark summary](https://andrewclark.super.site/all-media/the-vignelli-canon) [S]
  - Check: images within a grid share a small set of aspect ratios (`aspect-ratio` values), for example at most 2–3 distinct ratios per view.

**Grid systems (Müller-Brockmann / Swiss style)** [S]
- The grid is built from columns, gutters and margins. Müller-Brockmann's 1981 *Grid Systems in Graphic Design* is the canonical reference for using columns, modules and margins to create objective, repeatable order. A baseline grid gives vertical rhythm. Common web practice: 12 columns, gutters of about 16–32px, a 4px or 8px baseline (from a single unverified secondary site). — [IxDF on grid systems](https://ixdf.org/literature/article/how-to-use-grid-systems); [UI/UX Atlas grid lesson](https://uiux-atlas.pages.dev/lessons/visual-design/grid-systems-and-layout-structure)
  - Check: left edges of major blocks snap to a small number of x-positions (in a screenshot, count distinct left-edge x values of top-level blocks; fewer means more aligned). Gutters (`gap`) are a single consistent value per grid. All spacing values are multiples of a 4px base (Tailwind's default spacing unit is 0.25rem = 4px, so arbitrary values like `mt-[13px]` are flagged).

**Gestalt: proximity (NN/g)** [P]
- Elements close together read as related, and separated elements read as distinct groups. Proximity can outweigh similarity of colour or shape. Put more whitespace between groups than within them. A heading should sit closer to its own section than to the preceding one. A form label should sit closer to its own field than to the next pair. Splitting long forms into meaningful sections makes them look easier. Don't place unrelated controls in one cluster. Recheck groupings at every breakpoint, because responsive reflow can separate related items. — [NN/g: Proximity](https://www.nngroup.com/articles/gestalt-proximity/)
  - Check (internal ≤ external rule): for any container, the gap between its children is smaller than the margin or gap separating it from its siblings. Heading `margin-top` is greater than heading `margin-bottom`. Label-to-input gap is smaller than the gap between field groups. Run these checks at 375px and ≥ 1280px.

**Gestalt: common region (NN/g)** [P]
- Elements inside a shared boundary (border or background) read as one group. This is a stronger cue than proximity or similarity. Use it for page regions (sticky header, footer), image plus caption, cards, and alternating table rows. Overuse adds clutter. Full-width colour blocks can look like a page end and stop scrolling. If whitespace alone shows the grouping, the box is redundant. — [NN/g: Common Region](https://www.nngroup.com/articles/common-region/)
  - Check: flag nested containers where both levels have a border or a distinct background (box inside box) with no clear purpose. Flag cards whose border and shadow and background all differ from the page at once (redundant cues). Prefer at most one boundary cue per card.

**Gestalt: similarity, closure** [P, mentioned only]
- NN/g names similarity and closure as original Gestalt principles. Proximity can override similarity. — [NN/g: Proximity](https://www.nngroup.com/articles/gestalt-proximity/)
  - Check (similarity): elements with the same function share identical styles (all primary buttons share one class or variant, all secondary links share one colour). Count distinct button styles per view: at most 3 (primary, secondary, tertiary/ghost). This cap is inferred.

### Inferences
- The most reliable, checkable translation of Gestalt into CSS is a spacing inequality: `gap(within group) < gap(between groups)`, applied recursively. A common rule-of-thumb ratio is outer ≥ 1.5–2× inner. This ratio is inferred, not sourced; NN/g gives the direction, not a number.
- Swiss and Vignelli thinking maps to: a consistent spacing unit (4px/8px), few alignment axes, and strong but few size contrasts. These are checkable by counting distinct values (sizes, left-edge positions, spacing values) per view.
- Every Layout's "intrinsic layout" philosophy (letting content and measure drive breakpoints) was not fetched. It is consistent with the measure axiom above.

### Gaps
- No primary text of Müller-Brockmann's book or the Vignelli Canon PDF was fetched. Specific claims (Vignelli's 2-sizes-per-page and the 2× heading, the grid numbers) come from secondary summaries and should be verified against the RIT PDF of the Vignelli Canon.
- I did not find an authoritative numeric figure-ground rule for UI. NN/g's figure-ground article was not fetched.
- Every Layout's layout primitives (Stack, Cluster, Sidebar, Switcher thresholds) were not fetched.

---

## Colour: shade scales, saturated greys, 60-30-10, OKLCH, WCAG 2.2 / APCA, dark mode

### Takeaway
The firmest numbers are the accessibility thresholds. WCAG 2.2 asks for 4.5:1 for body text, 3:1 for large text (≥ 24px, or ≥ 18.66px bold) and for UI component boundaries, and 7:1 for AAA. APCA (the WCAG 3 candidate, not normative) gives Lc 90/75/60/45/30/15 tiers tied to size and weight. Palette structure from Refactoring UI: 8–10 greys, 1–2 primaries, a few sparing accents, about 9 shades each, defined in advance. OKLCH makes shades predictable by varying only lightness. The 60-30-10 rule comes from interior design and has no documented UI-specific evidence base.

### Cited Findings

**WCAG 2.2 contrast** [P]
- SC 1.4.3 (AA): text needs at least 4.5:1. Large text (≥ 18pt, about 24px, or ≥ 14pt bold, about 18.5px bold) needs at least 3:1. Ratios are not rounded, so 4.499:1 fails. Exempt: inactive or disabled controls, pure decoration, invisible text, text in images with significant other content, and logos (but an author-chosen low-contrast logo is not exempt). SC 1.4.6 (AAA): 7:1 for normal text. — [Understanding 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
  - Check: for each text node, compute the WCAG luminance ratio of its colour against the effective background. Require ≥ 4.5 if size < 24px (or < 18.66px and weight < 700), else ≥ 3.0. Never round.
- SC 1.4.11 Non-text Contrast (AA): the visual cues needed to identify UI components and their states (focus, selected) and the meaningful parts of graphics need ≥ 3:1 against adjacent colours. Exempt: inactive components, untouched user-agent defaults, and graphics whose presentation is essential. 2.999:1 fails. — [Understanding 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
  - Check: input borders, checkbox outlines, focus rings and chart lines have ≥ 3:1 against the adjacent background. A common failure is light grey input borders such as Tailwind `border-gray-200` on white.
- SC 1.4.1 Use of Color (A): colour must not be the only visual means of conveying information, indicating an action or distinguishing an element. Add shape, text or an icon. Technique G183: an inline link can be distinguished from surrounding text by a ≥ 3:1 contrast between link colour and body-text colour. — [Understanding 1.4.1](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)
  - Check: inline `a` inside `p` is underlined, or its colour has ≥ 3:1 contrast with the surrounding text colour. Error and success states include an icon or text, not only red or green. Render the screenshot in greyscale and confirm states are still distinguishable (Refactoring UI makes the same greyscale test, below).

**APCA (WCAG 3 candidate)** [P, maintainer's docs; not part of WCAG 2]
- Lc tiers. Lc 90: preferred for body text (for example, 14px/400 or 18px/300). Lc 75: minimum for body text columns (18px/400, 16px/500, 14px/700, 24px/300). Lc 60: minimum for non-body content text (24px/400, 16px/700, 18px/600). Lc 45: headlines (36px normal or 24px bold) and fine icons. Lc 30: absolute minimum for placeholder or disabled text and large solid icons. Lc 15: minimum for non-text separators. Lc 90 is also a suggested maximum for very large bold text and large colour areas. These figures are based on an x-height ratio of 0.52 (Helvetica/Arial). APCA is the candidate method for WCAG 3 and is not part of WCAG 2. WCAG 2.x overstates contrast for dark colours, so it is a poor guide for dark mode. — [APCA in a Nutshell](https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell.html)
  - Check: compute APCA Lc (absolute value) per text node. Body at 16px/400 should reach |Lc| ≥ 75 (aim for 90). Placeholders ≥ 30. Dividers ≥ 15. In dark mode, prefer APCA over the WCAG 2 ratio. For legal conformance today, still report WCAG 2.2 ratios.

**Palette structure (Refactoring UI)** [P preview chapter + S summaries]
- Greys: 8–10 shades from a very dark grey (not pure black) to white. Primary: 1 (sometimes 2) colours, each with 5–10 shades. Accents for highlights and states (danger, warning, success), used sparingly. A complex UI may need up to about 10 colours with 5–10 shades each. Define shades in advance rather than with lighten() or darken(). Pick the base (mid, button-worthy) shade first, then the darkest (text) and lightest (tinted backgrounds), then fill the gaps. Nine shades (100–900) is a convenient count. Don't keep adding shades. — [Refactoring UI: Building your color palette](https://refactoringui.com/previews/building-your-color-palette)
  - Check: every colour in the CSS resolves to a palette token (CSS variable or Tailwind theme colour). Flag arbitrary hex values (`text-[#3a3a3a]`) and `lighten()`/`darken()`/`color-mix()` used to invent one-off shades. No pure `#000000` text on light backgrounds. Count distinct hues (excluding greys) per view: at most 1–2 primary plus a few semantic accents.
- Saturate greys slightly: cool (blue-tinted) or warm (yellow/orange-tinted) for personality. Use HSL thinking. Green looks brighter than red, which looks brighter than blue. Keep gradient hues within 30° of each other. For badges, use a light tinted background with a dark shade of the same hue as text. To raise contrast without washing a colour out, rotate the hue rather than only changing lightness. Don't rely on colour alone, and check in greyscale. — [Book summary: Refactoring UI](https://sglavoie-github-io.pages.dev/posts/2023/09/09/book-summary-refactoring-ui/) [S]
  - Check: greys in the palette have non-zero chroma (OKLCH C ≈ 0.005–0.03 or HSL S ≈ 5–20%) and a consistent hue. Note: Tailwind's `slate`, `gray` and `zinc` have slight tints, while `neutral` has none. Gradient stops differ in hue by ≤ 30°. Badge and alert text uses the same hue as its tinted background, at the dark end of the scale.

**OKLCH palettes (Evil Martians)** [P for the technique]
- OKLCH's L tracks perceived lightness, so the same L step looks similar across hues, unlike HSL. Ranges: L 0–1, C 0 to about 0.37 (the maximum depends on hue), H 0–360. Make shades by changing only L and keeping C and H fixed. Derive hover states with relative colour, `oklch(from var(--accent) calc(l + 0.1) c h)`. Colours with the same L should give similar contrast against the same text, though the article's changelog warns L alone isn't enough and recommends APCA. Implement dark mode by overriding surface and text tokens under `prefers-color-scheme: dark` (example: surface L 0.96 to about 0, text L 0 to 1). Serve P3 colours under `@media (color-gamut: p3)` with sRGB fallbacks. — [OKLCH in CSS](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)
  - Check: within each colour ramp, H varies by at most a few degrees and L is monotonic with roughly even steps. Semantic colours used as button backgrounds (primary, danger, success) share a similar L, so they carry equal visual weight and the same text colour works on each. Tailwind v4's default palette is defined in OKLCH, so this can be checked directly from the theme.

**60-30-10** [S, low authority]
- The rule comes from interior design, with no named originator: 60% dominant colour (backgrounds and large surfaces), 30% secondary (sections, cards, navigation), 10% accent (buttons, links, CTAs). Sources are design blogs and retailers. One page argues the dominant colour in digital UI is usually a neutral, but that page is post-dated (2027) and unreliable. — [hype4.academy](https://hype4.academy/articles/design/60-30-10-rule-in-ui); [Ideal Home](https://www.idealhome.co.uk/all-rooms/all-rooms-decor/60-30-10-rule)
  - Check (screenshot heuristic only): quantize screenshot pixels into palette roles. Neutral or background takes about 50–70% of area, and the saturated accent (CTA colour) takes about 5–15%, appearing only on interactive or emphasized elements. Flag any view where the accent colour covers more than about 20% of pixels.

**Dark mode** [P for Material, with caveats]
- Material Design (M2) recommends #121212 rather than pure black as the dark surface. Surfaces get lighter as elevation rises. 100% white body text on the dark surfaces reaches at least 15.8:1. The exact elevation-overlay percentages vary between secondary sources (for example, a 9% white overlay at 4dp), so treat them as illustrative. — [Material Design: Dark theme](https://m2.material.io/design/color/dark-theme) (content confirmed via search snippet; direct fetch returned an empty page); [Search summary of Figma/Vuetify sources](https://blog.prototypr.io/how-to-design-a-dark-theme-for-your-android-app-3daeb264637)
- APCA notes WCAG 2.x is unreliable for dark-on-dark judgments, and Evil Martians shows implementing dark mode by swapping tokens. — [APCA in a Nutshell](https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell.html); [OKLCH in CSS](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)
  - Check: the dark-mode page background is not `#000` (prefer L ≈ 0.12–0.2 in OKLCH, for example #121212 or Tailwind `zinc-900`/`neutral-900`). Elevated surfaces (cards, menus, modals) are lighter than the base in dark mode rather than relying on shadows. Dark-mode colours come from overriding the same tokens (one `:root` override or Tailwind `dark:` variants that map to tokens), not a parallel hard-coded palette. Saturated brand colours should be lighter or desaturated in dark mode (Material's "desaturated" advice; the specific tonal value was not verified this session).

### Inferences
- The most robust automatable colour checks are: (1) WCAG 2.2 ratios per text node and per component boundary, (2) APCA Lc as a secondary perceptual check, especially in dark mode, (3) "all colours resolve to tokens", (4) a cap on distinct hues per view, (5) a greyscale-render test for colour-only meaning.
- 60-30-10 is a weak heuristic for UI. It is useful mainly as an "accent is scarce" rule (≤ 10–15% of pixels), consistent with Refactoring UI's "use accents sparingly" and NN/g's colour limits (Hierarchy section).

### Gaps
- Material Design's dark-theme page could not be fetched directly (it renders client-side). The "desaturated primary (tone 200)" advice and the exact text opacity levels (87%/60%/38%, widely cited) were not verified this session.
- Refactoring UI's specific advice on saturated greys and "don't use grey text on coloured backgrounds" came only via a secondary summary.
- Whether G183 also requires an additional cue on hover and focus could not be confirmed. The fetched Understanding page mentions only the 3:1 contrast, so check the G183 technique page directly.

---

## Hierarchy and restraint: one focal point, de-emphasis, limited weights and sizes, "remove one accessory"

### Takeaway
NN/g gives the most numeric hierarchy limits: at most 3 type sizes, at most 2 large elements, at most 2 primary plus 2 secondary colours, and at most 3 contrast variations. It also gives a blur ("squint") test that can be automated on a screenshot. Refactoring UI adds the method: build hierarchy with weight and colour rather than size alone, and emphasize by de-emphasizing competitors. Vignelli and Butterick reinforce restraint (few faces, few sizes, few heading levels).

### Cited Findings
- Visual hierarchy comes from contrast between an element and its surroundings. Use at most 2 primary and 2 secondary colours and at most 3 contrast variations in complex designs. Reserve bright warm colours (red) for warnings and errors. Don't rely on colour alone. — [NN/g: Visual Hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)
  - Check: count distinct text-colour tokens per view (at most 3, for example primary, secondary/muted, accent). Red or orange hues appear only on error, warning or destructive elements.
- Scale: use at most 3 sizes (small, medium, large). Typical web values are body 14–16px, subheads 18–22px, and headers up to 32px. The most important element should be the largest, with at most 2 large elements. If everything is contrasted, nothing stands out. — [NN/g: Visual Hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)
  - Check: within a content region, at most 3 font-size levels. In each viewport-height section, at most 2 elements at the top size tier, and exactly one top-tier element (the h1 or hero headline) above the fold. Note the tension with Butterick's 15px-plus body floor, since NN/g's 14px is a lower bound.
- Squint/blur test: blur the screen to reveal groupings and emphasis. Small blur radii (5–10px) confirmed intended hierarchy, while a 20px blur exposed an unintended focal point. — [NN/g: Visual Hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)
  - Check (screenshot): apply a 10px and a 20px Gaussian blur and compute a saliency or contrast map. The highest-contrast blob should coincide with the intended primary element (h1 or primary CTA), and no secondary element (decorative image, badge) should be the darkest or most saturated region.
- Refactoring UI: hierarchy comes from size, weight and colour, so don't rely on size alone. Limit to 2–3 colours and 2–3 weights. De-emphasize secondary content (smaller, lighter weight, lower contrast). Emphasize the key element by de-emphasizing competitors. Combine label and value ("12 left in stock" rather than "In stock: 12"). Use about 5 fixed shadow levels as an elevation scale (small shadows for buttons, medium for dropdowns, large for modals). Replace borders with spacing, background or shadow. Start with too much whitespace and remove it. — [Book summary: Refactoring UI](https://sglavoie-github-io.pages.dev/posts/2023/09/09/book-summary-refactoring-ui/) [S]
  - Check: secondary text (meta, captions, labels) uses a muted colour token, not only a smaller size. At most 3 font weights. At most about 5 distinct `box-shadow` values in the codebase (Tailwind `shadow-sm` through `shadow-2xl` maps to this). Exactly one primary-styled button per form or card action group, with others secondary or ghost (inferred from "emphasize by de-emphasizing"). Flag `label: value` pairs where the label carries the same visual weight as the value.
- Restraint in type: Vignelli used a few typefaces and about 2 sizes per page ([SEGD excerpt](https://segd.org/?p=7876) [S]). Butterick: at most 3 heading levels and minimal bold or italic ([Headings](https://practicaltypography.com/headings.html); [Summary of key rules](https://practicaltypography.com/summary-of-key-rules.html)) [P].
  - Check: at most 2 font families, at most 3 weights, at most 3 heading levels, no bold-italic, per view.

### Inferences
- "One focal point" is not stated verbatim by NN/g. The closest numeric proxy is "at most 2 large elements" and "most important element is largest". A checkable synthesis: exactly one element per viewport has the maximum combination of size, weight and contrast (the visual-weight argmax is unique), and it is the intended primary (h1 or primary CTA).
- "Remove one accessory" (a design maxim usually attributed to Coco Chanel) has no canonical UI source in this research. It maps to restraint rules that are checkable: count decorative layers per component (border + shadow + gradient + background tint + icon). Flag components using more than 2 simultaneously.
- Combined "restraint budget" per view (inferred from NN/g, Refactoring UI, Vignelli and Butterick): fonts ≤ 2, weights ≤ 3, content type sizes ≤ 3 (about 5–6 including UI chrome), text colours ≤ 3, accent hues ≤ 2, shadow levels ≤ 5, primary buttons per action group = 1.

### Gaps
- No primary source was found for "remove one accessory" in UI design, or for an explicit "one focal point per screen" rule with a number.
- Refactoring UI's primary chapters on hierarchy ("Hierarchy is everything", "Labels are a last resort", "Emphasize by de-emphasizing") were not fetched directly. The Medium article returned 403, so the guidance relies on a secondary book summary.
- No empirical (eye-tracking or user-testing) evidence was collected linking these numeric caps to measured outcomes. They are expert heuristics.
