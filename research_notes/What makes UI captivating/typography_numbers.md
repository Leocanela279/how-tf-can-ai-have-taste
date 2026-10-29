# Typography numbers that work in UI: tracking, size, weight, line-height by context

Scope: concrete values from Apple HIG, Inter (rsms), Material 3, IBM Carbon, GitHub Primer, Vercel Geist, Butterick's Practical Typography, plus secondary evidence for Linear. Researched 2026-10-29. Conversions to px/em were done by me from the cited raw values. Polaris and Atlassian pages could not be fetched (connection errors), so they are listed as gaps.

## Tracking (letter-spacing) vs size

### Takeaway
Every system that varies tracking by size has the same shape: slightly positive tracking at very small sizes (11–12px and below), about zero near 12–13px, negative at body/heading sizes, and the most negative at display sizes. For Inter, the formula settles at about -0.022em from roughly 40px upward. Absolute values differ by typeface, so a table built for one font should not be copied onto another. Material 3 (built for Roboto) is the outlier, with positive tracking on body text.

### Cited Findings
**Inter Dynamic Metrics (the formula)**
- Inter's formula is `tracking = a + b * e^(c * z)` with a = -0.0223, b = 0.185, c = -0.1745, where z is the font size. Tracking is in em. — [rsms Inter v3 Dynamic Metrics (archived)](https://d.rsms.me/inter-website/v3/dynmetrics/) (the current rsms.me/inter/dynmetrics URL returns 404 and points to this archive)
- Values I computed from that formula, given as em (px):
  - 11px: +0.0048em (+0.05px)
  - 12px: +0.0005em (0)
  - 13px: -0.0032em (-0.04px)
  - 14px: -0.0062em (-0.09px)
  - 15px: -0.0088em (-0.13px)
  - 16px: -0.011em (-0.18px)
  - 18px: -0.0143em (-0.26px)
  - 20px: -0.0167em (-0.33px)
  - 24px: -0.0195em (-0.47px)
  - 32px: -0.0216em (-0.69px)
  - 40px: -0.0221em (-0.89px)
  - 48px: -0.0223em (-1.07px)
  - 64px: -0.0223em (-1.43px)
  - 72px: -0.0223em (-1.61px)
  - 96px: -0.0223em (-2.14px)
  - 120px: -0.0223em (-2.68px)

  Source: same page. Caveat: the page's interactive demo shows "0.0" at 15px, which does not match the formula's -0.0088em. This may be rounding or a different display unit, and I did not resolve it.
- The page also says Inter derives line-height from the optical font size, but it gives no line-height formula. — [rsms Inter v3 Dynamic Metrics](https://d.rsms.me/inter-website/v3/dynmetrics/)
- Inter 4 has an optical-size axis that runs from "text" to "display". The Text design has a tall x-height plus ink traps and bridges for small lower-case text. The Display design is meant for large text. The page gives no numeric opsz threshold and no tracking advice. — [rsms.me/inter](https://rsms.me/inter/)

**Apple SF Pro tracking table (HIG)**
- Tracking for iOS, iPadOS and visionOS, given as 1/1000 em (pt). The macOS table matches in the rows I could see.
  - 6pt: +41 (+0.24)
  - 8pt: +26 (+0.21)
  - 10pt: +12 (+0.12)
  - 11pt: +6 (+0.06)
  - 12pt: 0
  - 13pt: -6 (-0.08)
  - 14pt: -11 (-0.15)
  - 15pt: -16 (-0.23)
  - 16pt: -20 (-0.31)
  - 17pt: -26 (-0.43)
  - 18pt: -25 (-0.44)
  - 20pt: -23 (-0.45)
  - 22pt: -12 (-0.26)
  - 23pt: -4
  - 24pt: +3 (+0.07)
  - 28pt: +14 (+0.38)
  - 32pt: +13 (+0.41)
  - 34pt: +12 (+0.40)
  - 40pt: +10 (+0.37)
  - 48pt: +8 (+0.35)
  - 56pt: +6 (+0.30)
  - 64pt: +4 (+0.22)
  - 72pt: +2 (+0.14)
  - 76pt: +1
  - 80–96pt: 0

  Footnote on the table: "Not all apps express tracking values as 1/1000 em." — [Apple HIG Typography (JSON of the HIG page)](https://developer.apple.com/tutorials/data/design/human-interface-guidelines/typography.json); human page: https://developer.apple.com/design/human-interface-guidelines/typography
- Apple's system fonts use "dynamic optical sizes", which merge Text and Display into one continuous design that the system interpolates by point size. You don't need discrete optical sizes unless your tool lacks variable-font support. — [Apple HIG Typography](https://developer.apple.com/design/human-interface-guidelines/typography)

**Material 3 (Roboto), from the type-scale tokens.** Each entry is size/line-height, weight, tracking; px is converted at 16px = 1rem.
- display-large: 57/64, regular, -0.25px (≈ -0.0044em)
- display-medium: 45/52, regular, 0
- display-small: 36/44, regular, 0
- headline-large: 32/40, regular, 0
- headline-medium: 28/36, regular, 0
- headline-small: 24/32, regular, 0
- title-large: 22/28, regular, 0
- title-medium: 16/24, medium, +0.15px
- title-small: 14/20, medium, +0.1px
- body-large: 16/24, regular, +0.5px (≈ +0.031em)
- body-medium: 14/20, regular, +0.25px
- body-small: 12/16, regular, +0.4px
- label-large: 14/20, medium, +0.1px
- label-medium: 12/16, medium, +0.5px
- label-small: 11/16, medium, +0.5px

  Source: [material-web tokens, _md-sys-typescale.scss](https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-typescale.scss)

**IBM Carbon (Plex Sans)**
- label-01, helper-text-01, legal-01 and code-01: 12/16, weight 400, +0.32px (≈ +0.027em).
- body-compact-01 and body-01: 14px, +0.16px (≈ +0.011em).
- body-02 at 16px and headings at 16px and up: 0 tracking.
- fluid-display-03 (60/70) and fluid-display-04 (92/102): -0.64px, weight 300.

  Source: [Carbon type sets](https://carbondesignsystem.com/elements/typography/type-sets/)

**Geist (Vercel)**
- The official typography page names the classes:
  - Headings: heading-72/64/56/48/40/32/24/20/16/14
  - Buttons: button-16/14/12
  - Labels: label-20…12, with mono variants
  - Copy: copy-24…13
  
  The page lists no numeric values. — [vercel.com/geist/typography](https://vercel.com/geist/typography)
- A search-result summary of Vercel's design.md quoted heading-64 as 64px/64px, weight 600, -3.84px, and heading-56 as 56px/56px, -3.36px. Both work out to -0.06em. When I fetched [vercel.com/design.md](https://vercel.com/design.md) directly, it showed token names only and no values, so these numbers are **unverified**.

**Linear (secondary, reverse-engineered)**
- Display letter-spacing is reported as -1.584px at 72px and -1.056px at 48px. That is -0.022em, exactly Inter's dynamic-metrics value at those sizes. — [designlang Linear analysis](https://designlang.vercel.app/gallery/linear-app/linear-app-design-language.md) (third-party, possibly scraped or AI-generated)

**Lowercase tracking in general**
- Butterick says lowercase text "doesn't ordinarily need letterspacing". He notes that designers sometimes add tracking below about 9pt and remove it at headline sizes. — [Practical Typography, Letterspacing](https://practicaltypography.com/letterspacing.html)

### Inferences
- **Safe web defaults for neo-grotesques (Inter, Geist, SF-like faces):**

  | Size range | Tracking |
  |---|---|
  | 11–12px | 0 to +0.01em |
  | 14px | about -0.006em |
  | 16px body | about -0.01em |
  | 20–24px | -0.015 to -0.02em |
  | 32–48px | about -0.02em |
  | 48–120px display | -0.02em (Inter's floor), down to -0.04 to -0.06em for a tight "brand" look (Geist's unverified -0.06em) |

  In Tailwind, `tracking-tight` is -0.025em and `tracking-tighter` is -0.05em; these are Tailwind's defaults and were not verified in this session. So `tracking-tight` fits headings around 24–72px, and `tracking-tighter` is the deliberately aggressive display look.
- **Do not transplant Apple's table to web fonts.** Apple's values are deltas from SF's own built-in spacing. Above 24pt they are positive because SF's Display optical size is already tightly spaced. The same positive numbers on Inter or Geist would make headlines look loose.
- **Material 3's positive body tracking (+0.5px at 16px) is specific to Roboto.** It conflicts with Inter and SF, which both use negative tracking at 14–17px. Treat M3 tracking as non-portable.
- **Carbon is conservative:** positive tracking at or below 14px, zero for most headings, and -0.64px only at display sizes. This reads as "neutral and corporate". Inter, Geist and Linear read as "tight, product-y, premium".

### Gaps
- I could not retrieve numeric Geist values from an official page. The Geist Tailwind/Figma tokens would be the authoritative source.
- I did not retrieve Polaris tracking tokens (`font-letter-spacing-dense`, `-densest`, `-negative`) because the fetch failed. Atlassian was not researched.
- The Inter 15px demo discrepancy is unresolved.

### Consolidated per-context reference table (my synthesis of the cited values above; assumes a neo-grotesque like Inter/Geist/SF on the web)

| Context | Size (px) | Weight | Line-height | Tracking | Evidence |
|---|---|---|---|---|---|
| Display / hero | 48–120 (M3 57; Carbon 54–92; Geist up to 72) | 500–700 for sans. Carbon uses 300 at display, which is a legitimate alternative "light display" style. | 1.0–1.15 (M3 1.12; Carbon 1.11–1.19; Geist 1.0 if verified) | -0.02em (Inter) to -0.06em (Geist, unverified); Carbon -0.64px | Inter formula; M3; Carbon; Geist |
| Page title / H1 in product | 28–40 (HIG Large Title 34; Primer 32; M3 32) | 600 (Primer), 400 + bold emphasis (HIG) | 1.2–1.25 (HIG 41/34 = 1.21; M3 1.25) | -0.02em | HIG, Primer, M3 |
| Section heading | 20–24 | 600 | 1.25–1.4 (HIG Title 3 25/20; M3 32/24 = 1.33) | -0.015 to -0.02em | HIG, M3, Inter |
| Small heading / card title | 14–16 | 600 (Carbon heading-01/02; HIG Headline semibold 17) | 1.4–1.5 | ~0 to -0.01em | Carbon, HIG |
| Body (product UI) | 14 (Carbon productive, M3 body-medium) to 16 | 400 | 1.43–1.5 (20/14, 24/16) | -0.006 to -0.011em (Inter); +0.16px (Carbon) | Carbon, M3, Inter |
| Body (reading/marketing) | 16–18 (HIG iOS 17) | 400 | 1.5–1.6 web; Butterick 1.2–1.45 | -0.01em | Practical Typography; Carbon body-02 |
| UI label / menu item | 13–14 (Geist label-14 is "most common") | 400–500 (M3 labels 500) | 1.2–1.43 | ~0 | Geist; M3 |
| Button | 14 default, 16 large, 12 only tiny (Geist) | 500 (M3 label-large medium) | 1.0–1.43 (single line) | 0 to +0.1px | Geist; M3 |
| Caption / helper | 12 (min 11) | 400 | 1.33 (16/12) | 0 to +0.03em (Carbon +0.32px) | HIG, Carbon, M3 |
| All-caps label / eyebrow | 11–12 | 500–600 | 1.2–1.45 | +0.05 to +0.12em | Butterick; M3 label-small +0.5px/11px = +0.045em |
| Numerals / data | same as body or label (Geist label-13) | 400–500 | as context | 0; use `tabular-nums` | Geist; Inter `tnum` |

## Line-height by size

### Takeaway
The ratio drops as size goes up. Display text sits at about 1.0–1.2, headings at about 1.2–1.33, body at about 1.43–1.5 (up to 1.6 for long reading), and captions and labels at about 1.2–1.45. The major systems specify line-height as fixed px/rem pairs on a 4px grid, not as a single multiplier.

### Cited Findings
- **Apple iOS default Dynamic Type sizes, as size/leading in pt (ratio):**
  - Large Title: 34/41 (1.21)
  - Title 1: 28/34 (1.21)
  - Title 2: 22/28 (1.27)
  - Title 3: 20/25 (1.25)
  - Headline: 17/22 (1.29)
  - Body: 17/22 (1.29)
  - Callout: 16/21 (1.31)
  - Subhead: 15/20 (1.33)
  - Footnote: 13/18 (1.38)
  - Caption 1: 12/16 (1.33)
  - Caption 2: 11/13 (1.18)

  Source: [Apple HIG Typography](https://developer.apple.com/design/human-interface-guidelines/typography)
- **Material 3 ratios:**
  - display-large: 64/57 = 1.12
  - display-small: 44/36 = 1.22
  - headline-large: 40/32 = 1.25
  - title-large: 28/22 = 1.27
  - body-large: 24/16 = 1.5
  - body-medium: 20/14 = 1.43
  - body-small: 16/12 = 1.33
  - label-small: 16/11 = 1.45

  Source: [material-web typescale tokens](https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-typescale.scss)
- **Carbon ratios:**
  - body-compact-01: 18/14 = 1.29 (for text of 4 lines or fewer, inside components)
  - body-01: 20/14 = 1.43 (for longer text)
  - body-02: 24/16 = 1.5
  - heading-04: 36/28 = 1.29
  - heading-07: 64/54 = 1.19
  - fluid-display-04: 102/92 = 1.11

  Source: [Carbon type sets](https://carbondesignsystem.com/elements/typography/type-sets/)
- **Primer, as unitless line-heights on a 4px grid:**
  - Display: 2.5rem / 1.375
  - Title large: 2rem / 1.5
  - Title medium: 1.25rem / 1.625
  - Title small: 1rem / 1.5
  - Body: 1.5 (body-small 1.625)
  - Caption: 0.75rem / 1.25
  - Code block: 0.8125rem / 1.5

  Primer also says to keep lines at about 80 characters or fewer. — [Primer typography primitives](https://primer.style/product/primitives/typography/); [Primer typography foundations](https://primer.style/product/getting-started/foundations/typography/)
- Butterick recommends line spacing of 120–145% of the point size, set in CSS as a unitless `line-height`. — [Practical Typography, Line spacing](https://practicaltypography.com/line-spacing.html)
- Geist separates "Label" styles (single line, generous line-height for pairing with icons) from "Copy" styles (multi-line, higher line-height). — [Geist typography](https://vercel.com/geist/typography)

### Inferences
- Primer's 1.375 at display size is loose compared with M3 (1.12) and Carbon (1.11). Primer's display is only 40px, which explains it. At 48px and above, 1.0–1.15 is the consensus.
- HIG body leading (1.29) is tighter than web body leading (1.43–1.5). Apple's values are for short-line app UI. Long-form web reading should use 1.5–1.6.
- Component text (buttons, compact body) can drop to about 1.25–1.3 (Carbon body-compact), while paragraphs stay at 1.43 or more. This "compact vs reading" split is a useful rule for an agent.

### Gaps
- No source found gave a formula linking line-height to size (Inter mentions one exists but does not publish it).

## Font weight usage (including variable intermediates and dark mode)

### Takeaway
Top systems use 3–4 weights. Regular 400 is for body, Medium 500 for labels and buttons, and Semibold 600 for headings; Light 300 appears only at large display sizes (Carbon, Primer). Apple says to avoid Ultralight, Thin and Light in UI. Some products use variable fonts' in-between weights (Linear, reportedly 510 and 590). In dark mode, light text looks heavier, so reduce weight slightly or turn on grayscale antialiasing.

### Cited Findings
- Apple: prefer Regular, Medium, Semibold or Bold, and avoid Ultralight, Thin and Light, which "can be difficult to see, especially when text is small". If a custom font is used in a thin weight, set it larger than the recommended sizes. The default text styles are Regular, except Headline, which is Semibold. Emphasized variants step up to Bold for titles and Semibold for the others. — [Apple HIG Typography](https://developer.apple.com/design/human-interface-guidelines/typography)
- Primer defines exactly 4 base weights (Light 300, Normal 400, Medium 500, Semibold 600). Display uses 500, titles 600, subtitle and caption 400. — [Primer typography primitives](https://primer.style/product/primitives/typography/). Primer discourages arbitrary numbers such as 700 in favor of weight variables. — [Primer foundations](https://primer.style/product/getting-started/foundations/typography/)
- Carbon uses 300, 400 and 600:
  - 400: body and labels
  - 600: small headings (heading-01/02, 14–16px)
  - 400: heading-03 to 05 (20–32px)
  - 300: heading-06/07 and display (42–92px); the display-02/06 variants use 600

  Source: [Carbon type sets](https://carbondesignsystem.com/elements/typography/type-sets/)
- Material 3 uses only regular and medium in its baseline scale. Medium is for title-medium/small and all label roles; a "prominent" bold variant exists for some labels. — [material-web typescale tokens](https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-typescale.scss)
- Geist / Vercel: body copy is regular, emphasis is "scarce", and only published weight tokens are allowed. Fonts load at weights 400–600. Headings use weight 600, per the unverified token summary. — [vercel.com/design.md](https://vercel.com/design.md)
- Linear reportedly uses Inter Variable at 510 as its signature UI and heading weight, and 590 for semibold emphasis (for example, h3 at 20px / 590). — [designlang Linear analysis](https://designlang.vercel.app/gallery/linear-app/linear-app-design-language.md); [webdesignhot Linear design.md](https://www.webdesignhot.com/design.md/linear/) (both third-party and unverified against Linear's CSS)
- Inter 4 has 9 named weights (100–900), with masters drawn at 100, 400 and 900. — [rsms.me/inter](https://rsms.me/inter/)
- **Dark mode:**
  - Robin Rendle (CSS-Tricks, 2020) lowers variable-font weight under `prefers-color-scheme: dark`. His examples are 400 → 350 for Yanone Kaffeesatz and 500 → 400 for Literata body text, described as "a slight change". Google Fonts must be loaded with a range (e.g. `wght@300..500`) for this to work. — [CSS-Tricks, Dark mode and variable fonts](https://css-tricks.com/?p=306566)
  - The same discussion attributes much of the heaviness to macOS subpixel rendering. `-webkit-font-smoothing: antialiased` is reported to fix it; it affects only macOS. — [CSS-Tricks](https://css-tricks.com/?p=306566); [Robin Rendle note](https://robinrendle.com/notes/subtle-optical-phenomenon/)

### Inferences
- Recommended agent defaults:
  - Body 400.
  - UI labels, buttons and tabs 500.
  - Headings 600; display 600–700, or 300 for an "editorial light" display, used only at 40px and above.
  - Cap the system at about 3–4 weights.
- With a variable font, 450–550 for UI text gives a softer "premium" medium, as in Linear's 510.
- In dark mode, drop 10–50 wght units (for example 400 → 370 or 380 for body, 600 → 550 for headings) and apply `antialiased` smoothing. The exact amount is a judgement call; the only cited numbers are Rendle's 50–100.

### Gaps
- There is no primary Linear source for 510 and 590.
- I found no design-system document (Apple, Material, Carbon) that officially prescribes weight reduction in dark mode.

## Font size minimums and common scales

### Takeaway
App UI body text sits at 14px (dense or productive: Carbon, M3 body-medium, Geist copy-14) or 16–17px (reading or expressive: Carbon body-02, M3 body-large, iOS 17pt). The practical floor is 11–12px. Mobile web inputs must be at least 16px to avoid iOS zoom-on-focus.

### Cited Findings
- **Apple defaults and minimums per platform:**

  | Platform | Default | Minimum |
  |---|---|---|
  | iOS / iPadOS | 17pt | 11pt |
  | macOS | 13pt | 10pt |
  | visionOS | 17pt | 12pt |
  | watchOS | 16pt | 12pt |
  | tvOS | 29pt | 23pt |

  These apply to custom fonts too. — [Apple HIG Typography](https://developer.apple.com/design/human-interface-guidelines/typography)
- **Material 3 scale:** 57, 45, 36, 32, 28, 24, 22, 16, 14, 12, 11px. The smallest role is label-small at 11px. — [material-web typescale tokens](https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-typescale.scss)
- **Carbon:**
  - Productive base 14px; expressive base 16px.
  - Fixed headings: 14, 16, 20, 28, 32, 42, 54px.
  - Displays up to 92px.
  - Smallest token: 12px (labels, helper, legal, code).

  Source: [Carbon type sets](https://carbondesignsystem.com/elements/typography/type-sets/)
- **Primer:** 40 (display), 32, 20, 16, 14 (body medium), 12 (body small and caption) px, in rem units so browser zoom works. — [Primer primitives](https://primer.style/product/primitives/typography/)
- **Geist:** button-14 is the default button and button-12 is only for a tiny button inside an input. label-14 is "the most common" style, used in menus. copy-14 is the most commonly used copy style. copy-13 and label-12 are for secondary and tertiary text. — [Geist typography](https://vercel.com/geist/typography)
- **iOS Safari zoom:** Safari zooms into a focused input whose computed font-size is below 16px, and does not zoom back out. The fix is a 16px floor (for example `max(16px, …)`). Disabling zoom with `maximum-scale=1` hurts accessibility. — [Rick Strahl's Weblog](https://weblog.west-wind.com/posts/2023/Apr/17/Preventing-iOS-Textbox-Auto-Zooming-and-ViewPort-Sizing); [HeroUI issue #5326](https://github.com/heroui-inc/heroui/issues/5326). These are community sources, not Apple documentation.

### Inferences
- Scale ratios: none of the systems use a strict modular ratio. M3 and Carbon use hand-tuned steps (roughly 1.14–1.3 between adjacent steps). For an agent, choosing a hand-tuned set such as 12 / 13 / 14 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 72 matches the evidence better than a pure 1.25 ratio.
- Body size choice: 14px for dense dashboards and tools, 15–16px for general apps, 16–18px for marketing and reading. Never go below 11px; 12px is a safer floor on the web.

### Gaps
- I did not retrieve Polaris's font-size tokens (fetch failed); from memory, Polaris has 13px body on desktop, but this is not verified here.
- No primary Apple statement on the 16px input zoom threshold was found.

## Font choices: categories, optical sizes, system vs custom, admired-site patterns

### Takeaway
The evidence I gathered supports three points. First, the admired product systems use neo-grotesque or grotesque sans faces with optical sizes and good OpenType numerals: SF Pro (Apple), Inter and Inter Display (Linear, reportedly), Geist (Vercel), IBM Plex (Carbon), Roboto (Material). Second, monospace companions are restricted to code and IDs. Third, Apple says to use the system font rather than embedding it.

### Cited Findings
- Apple says not to embed system fonts and to reach them via `Font.Design` (`default` for SF, `serif` for New York). — [Apple HIG Typography](https://developer.apple.com/design/human-interface-guidelines/typography)
- Inter 4 has Text and Display optical sizes. The Text designs use a tall x-height and ink traps to help small sizes. The Display designs are for large text. — [rsms.me/inter](https://rsms.me/inter/)
- Vercel's rules on font roles:
  - Geist Sans covers prose, headings, labels, controls, tables, KPIs, dates, counts, percentages and money.
  - Geist Mono is limited to code, commands, paths, raw tokens, timestamps and short IDs (region, plan, SKU, environment).

  Source: [vercel.com/design.md](https://vercel.com/design.md)
- Carbon uses IBM Plex Sans for UI and Plex Mono for code tokens. — [Carbon type sets](https://carbondesignsystem.com/elements/typography/type-sets/)
- Linear's font stack is reportedly `"Inter Variable", "SF Pro Display", -apple-system, system-ui, sans-serif`. — [designlang Linear analysis](https://designlang.vercel.app/gallery/linear-app/linear-app-design-language.md) (third-party)

### Inferences
- Pattern: neutral grotesque or neo-grotesque sans, plus a mono for technical tokens, plus restraint (3–4 weights) reads as "premium SaaS".
- Use the display optical size, or tighter tracking, at 32px and above. With Inter, use `font-variation-settings: "opsz" 32` or the Inter Display family for headings; this is an inference, since the threshold is not documented on the page I read.

### Gaps
- I did not research Söhne (Stripe, OpenAI), GT America, or perceptions of "trustworthy vs premium" by typeface category. I found no cited survey or awards data linking typeface category to perceived premium-ness. Pairing guidance from foundries was not retrieved.

## All-caps and small-caps

### Takeaway
Track all-caps text +5% to +12% (0.05–0.12em) and keep it at small sizes (11–12px) with medium or semibold weight. Systems' small-label tracking (M3 +0.5px at 11–12px, which is about +0.04em; Carbon +0.32px at 12px, which is about +0.027em) sits below that range because they apply it to mixed-case text.

### Cited Findings
- Butterick: add 5–12% letterspacing to all caps and small caps. Lowercase normally needs none. — [Practical Typography, Letterspacing](https://practicaltypography.com/letterspacing.html)
- M3 label-small (11px, medium, +0.5px) and label-medium (12px, medium, +0.5px) are the roles closest to "overline" or caps labels. — [material-web typescale tokens](https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-typescale.scss)
- Geist uses label-12 for "calendar capitals" (tertiary text). — [Geist typography](https://vercel.com/geist/typography)
- Inter offers a `case` feature (case-sensitive forms), which adjusts punctuation and symbols to sit well with capitals and figures. — [rsms.me/inter](https://rsms.me/inter/)

### Inferences
- Agent default for eyebrows and overlines: `text-[11px] or text-xs font-medium uppercase tracking-[0.06em]` to `tracking-[0.1em]`, plus `font-feature-settings: "case"` with Inter.
- Large all-caps headlines need less tracking (about +0.02–0.05em) than small caps labels. This is extrapolated from the same principle of tracking shrinking as size grows; it is not a cited number.

### Gaps
- No source gave a minimum size specifically for all-caps text; the 11px floor comes from general minimums (HIG, M3).

## Numerals: tabular vs proportional

### Takeaway
Use tabular figures (`font-variant-numeric: tabular-nums`, Tailwind `tabular-nums`) anywhere numbers align vertically or change in place: tables, KPIs, prices, timers, counters. Use the default proportional figures in running text.

### Cited Findings
- Geist says to use tabular figures with label-13 when conveying numbers, "for consistent spacing". — [Geist typography](https://vercel.com/geist/typography)
- Vercel's rules call for tabular numerals in aligned comparisons. Peer values should share the same role, size, weight, line-height and numeric treatment. — [vercel.com/design.md](https://vercel.com/design.md)
- Inter's `tnum` gives fixed-width figures for aligning rows. Inter also has `zero` (slashed zero), `ss01` (open digits), `cv01` (alternate one), `frac`, and `sups`/`subs`. — [rsms.me/inter](https://rsms.me/inter/)
- Carbon and Vercel both route codes and IDs to the mono face; Vercel explicitly keeps KPIs and money in the sans, not the mono. — [Carbon type sets](https://carbondesignsystem.com/elements/typography/type-sets/); [vercel.com/design.md](https://vercel.com/design.md)

### Inferences
- Agent rules:
  - Set `tabular-nums` on table cells, stat tiles, price columns and any live-updating number.
  - Add `slashed-zero` where IDs or codes can confuse 0 and O.
  - Keep financial and KPI numbers in the UI sans, not mono, as Vercel does.

### Gaps
- No primary Apple or Material guidance on tabular figures was retrieved in this session.
