# Leandro Canela portfolio: restyle

## Mode

**Restyle** (assumed). The brief is "Make it better. Keep the palette, the fonts and the logo."
`taste-redesign/references/modes.md` maps "make it better" to restyle when there is no answer.
Restyle may change: type calibration, colour use, ink steps, spacing, radii, icons, imagery, copy
tone. It may not change: layout, navigation, IA, flows, URLs. Anything structural is written up as
*proposed*, not built.

## The five questions (owner unavailable; defaults used, decided here)

| Question | Answer used | Source |
| --- | --- | --- |
| 1. What prompted this? | A feeling: "make it better". No complaint or metric. | Brief |
| 2. Who uses it, how often? | First-time visitors: recruiters, clients, other developers, reading once. No relearning cost for daily users. | Assumed (portfolio) |
| 3. What must not move? | Palette, fonts, logo (name + orange period), stated in the brief. Plus everything in "Must survive" below. | Brief + assumed |
| 4. Tighten the current look, or replace it? | Tighten: keep the look, recalibrate the relationships. | Default for restyle |
| 5. Palette: brand hues only, or every value? | Every existing colour value is kept (all 8 theme tokens). No new hue and no new hex. Freedom is in *where* each value is used (roles), and alpha steps of existing values. | Assumed, stricter reading of "keep the palette" |

Other assumptions: the page stays dark (it is dark now and the palette is a dark palette); content
stays word-for-word except label casing and meta separators (no projects, clients or numbers added).

## Must survive

- **Logo:** "Leandro Canela" set in Geist 500 with the period in `signal` `#ec7044`, in the hero
  display and as the wordmark in the bar.
- **Palette (all values):** paper `#0f0e0c`, card `#171613`, deep `#1a1915`, ink `#ece8df`,
  ondeep `#ece8df`, muted `#a39e93`, line `#2b2925`, signal `#ec7044`.
- **Faces:** Geist (variable, 300–700), Geist Mono 400/500, Newsreader roman + italic. All three
  stay in use.
- **Routes and anchors:** `#top`, `#work`, `#about`, `#contact`, `#humannova`, `#icex`,
  `#reskillia`, `#cpu-city`, `#tomate`, `#db-doctor`, `#stastarat`; `Leandro-Canela-CV.pdf`; every
  external link (Reskillia, ICEX, CPU City, Tomate, db-doctor, stastarat.com, GitHub, GitLab).
- **Navigation labels:** Work, About, Contact, CV; footer: Work list, Elsewhere, Colophon, Back to
  top; "Skip to work" link.
- **Copy voice:** first person, plain, specific ("what happens when something fails"); the serif
  italic aside in the hero, the work heading and the contact heading.
- **Signature interactions:** project rows as `<details>` that open in place (and open from a hash
  link); the screenshot that follows the cursor over the index on fine pointers; the copy-email
  button with its "Copied" state and live region; the live Barcelona clock (hero + colophon);
  underline-grow link hover; the `+` that turns into `×`.
- **Accessibility it already gets right:** skip link; `:focus-visible` ring in signal; 44px targets
  in the bar and footer on touch; reduced-motion block; alt text on every screenshot; text contrast
  (ink 15.8:1, muted 7.2:1 on paper); `lang`, landmarks, one h1.

## Baseline (before, measured 2026-11-04)

Pinned copy: `design/before/` (index.html, src.css, styles.css, tailwind.config.js, assets, fonts).

- probe `--check` at 1440 / 390 / 360: **0 errors**. Warnings: 3 families carry text; 43 small
  uppercase labels; mono carries 8–9% of text; 282 KB of fonts; one 51ms long task (1440);
  touch targets "CV" 46×36 and "Email" 35×44 (390, 360).
- lint: 0 errors; WARN slow UI motion (>400ms, 6 places), 105 arbitrary Tailwind values, 44 mono
  labels, first image lazy.
- inventory (1440): 13 colours (12 clusters, 6 text colours), **14 font sizes**, 2 weights,
  3 families, 12 line heights, 2 radii, 1 shadow, **22 spacings**; near-duplicate grounds
  `#1a1915` ≈ `#171613`.
- parity: 27 links, 6 headings, 0 forms, 6 controls.
- Inks on paper: ink 15.78:1, muted 7.23:1, signal 6.40:1, ondeep/60 on deep 5.88:1; line
  1.33:1; outline-button border (ink/25) 1.99:1.
