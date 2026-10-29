# Icons in UI: usability, taste, libraries and performance (for an AI "taste" skill)

Evidence labels used throughout: **[Measured]** = a study or measurement with data; **[Guideline]** = official platform or vendor guidance; **[Opinion]** = practitioner or blog view; **[Vendor claim]** = a number from a library's own docs or a third-party comparison site with no stated method. Research date: 2026-10-29.

## 1. Usability evidence: when do icons help or hurt, and does icon-only work?

### Takeaway
The evidence consistently says that very few icons are universally recognized (home, print, search magnifier, and increasingly the hamburger). Every other icon needs a visible text label. Hidden navigation behind an icon measurably lowers discoverability and slows tasks. Icon-only controls are tolerable only for the few universal glyphs, in dense expert surfaces, and always with an accessible name.

### Cited Findings
- **[Guideline/Measured, qualitative]** NN/g (Aurora Harley, 27 Jul 2014): universally recognized icons are rare. The examples given are home, print and the magnifying glass for search. The hamburger was becoming known but was sometimes used to mean "list". Heart and star are misread across sites (one site's heart means "love", another's saves to favorites). A clock icon for history went unclicked by every test participant ("Obscure icon = wasted feature"). — [NN/g, Icon Usability](https://www.nngroup.com/articles/icon-usability/)
- **[Guideline]** The same article: always pair icons with a visible text label, even standard ones. Labels must be visible at all times, because hover-only labels add interaction cost and fail on touch. It quotes Tognazzini: "a word is worth a thousand pictures". — [NN/g, Icon Usability](https://www.nngroup.com/articles/icon-usability/)
- **[Guideline]** NN/g design rules: research the icons competitors and platforms already use. Keep forms schematic, because detail blurs at small sizes. Apply a "5-second rule": if a designer needs more than 5 seconds to think of an icon for a concept, it won't communicate. Test both recognizability and memorability (do users remember the meaning weeks later?). — [NN/g, Icon Usability](https://www.nngroup.com/articles/icon-usability/)
- **[Measured, observational]** Relative size matters. Upworthy's menu icon takes about 20% of the mobile nav bar width but only about 3.5% of the desktop width. Icons are therefore much less noticeable on desktop, where showing navigation outright is often better. — [NN/g, Icon Usability](https://www.nngroup.com/articles/icon-usability/)
- **[Guideline]** Icons make good touch targets. Small text links suffer "read–tap asymmetry". — [NN/g, Icon Usability](https://www.nngroup.com/articles/icon-usability/)
- **[Measured]** NN/g hamburger study (Pernice & Budiu, 26 Jun 2016): 6 live sites, 179 participants. Navigation was used in **27%** of desktop cases when hidden, versus **48%** when visible and **50%** for combo. On mobile it was **57%** hidden versus **86%** combo. Desktop hidden navigation was at least **39% slower** on task time; mobile was **15% slower** than combo. Content discoverability dropped **>20%** with hidden navigation on both devices. Perceived difficulty was 2.6 (hidden), 2.3 (combo) and 2.1 (visible) on a 1–7 scale. Time to first navigation use was about 31s (hidden) versus 23–26s on desktop. — [NN/g, Hamburger Menus and Hidden Navigation Hurt UX Metrics](https://www.nngroup.com/articles/hamburger-menus/)
- **[Measured]** NN/g sparkles study (Kate Kaplan, 20 Sep 2024). The sample was 107 respondents shown the sparkles icon in isolation. Top associations were favoriting or saving (16.82%) and visual effects or optimization (16.82%), followed by important or new information (11.22%) and rewards (6.54%). **No participant** associated it with AI. **73%** of users in a related icon study associated a star with saving or favoriting, and sparkles are easily confused with stars. Recommendation: sparkles "should always be accompanied by a label". Use tooltips to teach new icons, and prefer an established standard icon where one exists. — [NN/g, The AI Sparkles Icon Problem](https://www.nngroup.com/articles/ai-sparkles-icon-problem/)
- **[Measured, academic; secondary summary]** Wiedenbeck (1999) studied novices using text-only, icon-only and icon+text buttons. Label-only and icon+label performed best in session 1, and icon-only was much poorer. The gap narrowed by session 2, but retention for icon-only was weaker. This tells us icon-only costs most for new or infrequent users. — [Scilit record of the study](https://scilit.com/publications/69a8ee4f1d6cf726a650945daf8a929a) (summary via search results; original paper not read)
- **[Opinion/anecdotal]** The Microsoft Outlook icon-only toolbar is a widely repeated anecdote: non-expert users ignored buttons other than Delete until labels were added. This comes from secondary accounts, not a controlled study. — [UX Myths: "Icons enhance usability"](https://uxmyths.com/post/715009009/myth-icons-enhance-usability)
- **[Guideline]** Apple HIG: an interface icon communicates a single concept. Use familiar metaphors, and use standard SF Symbols for common actions (Cut = scissors, Share = square.and.arrow.up, Delete = trash, etc.). Provide alternative text labels for custom icons so VoiceOver can describe them. — [Apple HIG, Icons](https://developer.apple.com/design/human-interface-guidelines/icons)
- **[Guideline]** Red Hat's AI guidelines say not to use sparkles UI icons without an AI disclosure, and not to use brains or robots for AI features. — [Red Hat UX, AI iconography](https://ux.redhat.com/ai-guidelines/iconography/) (via search summary)

### Accessibility (WCAG implications)
- **[Guideline]** Lucide icons ship with `aria-hidden="true"` by default. Decorative icons stay hidden. For icon buttons, put the accessible name on the **button** (visually hidden text is often more reliable than `aria-label`), not on the SVG. Lucide also recommends visible text and avoiding standalone functional icons where possible. — [Lucide, Accessibility](https://lucide.dev/guide/advanced/accessibility)
- **[Guideline/Measured via AT testing]** Sara Soueidan (22 May 2019), backed by Scott O'Hara's screen-reader testing. Preferred options are visible text, then visually hidden text inside the button with `aria-hidden="true"` on the SVG, then `aria-labelledby` pointing at a `hidden` span. `aria-label` on the button is valid but "certainly not the only way, let alone the best". `<title>`/`aria-label` on the SVG itself fails in some browser and AT combinations. If a visible label exists, the accessible name must contain it (WCAG 2.1 label-in-name). Add `focusable="false"` to the SVG to avoid double tab stops in legacy IE. — [Sara Soueidan, Accessible Icon Buttons](https://www.sarasoueidan.com/blog/accessible-icon-buttons/)
- **[Guideline]** Put the label on the interactive element, not the icon. — [Font Awesome accessibility docs](https://docs.fontawesome.com/web/dig-deeper/accessibility.md)

### Inferences
- Default rule for an agent: label text is the primary signal and the icon is the secondary signal. Icon-only is allowed for close (X), search, home, menu (hamburger, on mobile only), and print, plus well-established editor glyphs in dense toolbars (bold, italic, undo). Even then it needs an accessible name and ideally a tooltip.
- Meaning-shifting icons (heart, star, sparkles, share, save/floppy, clock/history, bell vs inbox) should never be icon-only for primary actions.
- On desktop, don't hide primary navigation behind a hamburger. The 27% vs 48–50% usage data is the strongest quantitative argument in this set.

### Gaps
- The NN/g article "Icons need text labels" at /articles/icons-labels/ returned 404. The labeling guidance above comes from "Icon Usability" and the sparkles article instead.
- I didn't find a recent (post-2020) controlled study with numbers comparing icon+label vs icon-only task time. Wiedenbeck 1999 is the cleanest I found, and only via summary.
- I couldn't fetch the Material 3 navigation bar guidance on labels (the page is JS-rendered). From memory, M3 nav bars show labels on 3–5 destinations, but this is **unverified**.
- I didn't fetch the share-icon ambiguity data (iOS vs Android share glyphs). NN/g likely covers it, but I didn't verify it.

## 2. Redundancy: when an icon next to a label helps vs is decoration; when to go text-only

### Takeaway
An icon earns its place when it speeds scanning in repeated or dense structures (nav lists, toolbars, menus, file types, status) or adds a touch target. Next to a self-explanatory label in a one-off context (a single "Email" field, a hero CTA, a section heading), it is mostly decoration and is a common "templated" tell. Text-only is the correct default for most buttons and for any concept that fails the 5-second rule.

### Cited Findings
- **[Guideline]** Icons that don't communicate meaning become decoration or visual noise. Icon benefits are touch targets, toolbar space savings, fast recognition *when familiar*, and consistent style. — [NN/g, Icon Usability](https://www.nngroup.com/articles/icon-usability/)
- **[Guideline]** The 5-second rule: hard-to-depict concepts shouldn't get icons. — [NN/g, Icon Usability](https://www.nngroup.com/articles/icon-usability/)
- **[Guideline]** Apple: include text inside icons only when essential. Provide a separate selected-state icon only if necessary, because standard bars handle selection (for example, the accent color in toolbars). — [Apple HIG, Icons](https://developer.apple.com/design/human-interface-guidelines/icons)
- **[Opinion]** Tooltips are the common middle ground for space-constrained icon-only layouts. — [search summary of NN/g and related sources; Alberta design system example](https://v2.design.alberta.ca/examples/show-a-label-on-an-icon-only-button)
- **[Opinion]** An accessibility writer argues WCAG should prohibit icon-only buttons. — [tempertemper, "What I wish was in WCAG: prohibit icon-only buttons"](https://tempertemper.net/blog/what-i-wish-was-in-wcag-prohibit-icon-only-buttons)
- **[Opinion, counterpoint]** UX Movement argues labels aren't always needed for universally known icons on mobile. — [UX Movement, "Why you shouldn't always label your icons"](https://uxmovement.com/mobile/why-you-shouldnt-always-label-your-icons/)
- **[Opinion]** Identical card grids (icon + heading + text, repeated) are flagged as the default AI homepage template. — [Impeccable "visible tells of AI design"](https://924b8765.impeccable-2rv.pages.dev/slop); [wystack anti-patterns catalog](https://cdn.jsdelivr.net/npm/@wystack/agent-kit@0.12.0/wystack-agent-kit/references/anti-patterns.md)

### Inferences (decision table for the skill)
| Context | Default | Rationale |
|---|---|---|
| Primary/secondary CTA buttons | Text only; at most a trailing arrow or chevron for "go/next", or a leading icon only if it is a universal glyph (+ Add, download) | A label is unambiguous; a leading icon on every button is noise |
| Destructive actions | Text ("Delete project"), optionally with an icon; never icon-only outside dense lists | Ambiguity is costly |
| Mobile tab bar (3–5 items) | Icon + always-visible label | NN/g: labels always visible; hover isn't available |
| Desktop sidebar nav | Icon + label (icons aid scanning in a repeated list); collapsible to icon-only only with tooltips | Repetition makes the icon a scanning aid |
| Desktop top nav (marketing) | Text only | Icons add nothing to 4–6 words |
| Dense toolbars / editors / table row actions | Icon-only allowed for universal glyphs + tooltip + accessible name; overflow menu items get labels | Space; expert/repeat users |
| Form fields ("Email" + envelope) | Usually skip; acceptable only for search inputs (magnifier) or password visibility toggles | The label already says it; the icon is redundant |
| Feature grid / section headings | Avoid an icon tile above every heading; use real visuals (screenshots, numbers) or nothing | AI-slop tell (see section 3) |
| Status / file type / inline metadata | Icon + text, or colored icon + text (never color alone) | Fast scanning of repeated items |

### Gaps
- I found no quantitative study isolating "redundant icon next to a clear label" vs "label only" on scan speed in modern UIs. This remains practitioner judgment.

## 3. Taste: what makes icons cohesive and high quality; AI-slop tells; do libraries make an app unique?

### Takeaway
Cohesion comes from one set, one stroke weight, one size grid and one corner language, matched to the adjacent type's weight and optically aligned. Apple's SF Symbols system makes this explicit: nine weights matched to the font, and scales defined against cap height. Common slop tells: a rounded tinted icon tile above every heading, oversized icon containers, identical icon card grids, unlabeled sparkles for "AI", and emoji used as icons. An off-the-shelf library does not make an app distinctive. Curation, consistent tuning and a few custom glyphs do.

### Cited Findings
- **[Guideline]** Apple: match size, detail, stroke weight and perspective across all interface icons, whether custom or system. Adjust individual dimensions when visual weight differs (for example, an alarm clock may need to exceed the bounds). **Match icon weight to adjacent text** unless you want deliberate emphasis. — [Apple HIG, Icons](https://developer.apple.com/design/human-interface-guidelines/icons)
- **[Guideline]** Apple: asymmetric icons look off-center when geometrically centered (a download arrow looks too low). Nudge them optically and bake the adjustment into the asset as padding. The adjustments are "typically very small, but they can have a big impact". — [Apple HIG, Icons](https://developer.apple.com/design/human-interface-guidelines/icons)
- **[Guideline]** Apple: reduce or thicken detail at small sizes; use vector formats (SVG/PDF). — [Apple HIG, Icons](https://developer.apple.com/design/human-interface-guidelines/icons)
- **[Guideline]** SF Symbols: nine weights (ultralight→black), each corresponding to a San Francisco font weight for "precise weight matching". Three scales (small, medium, large) are "defined relative to the cap height" of SF, which lets emphasis change without breaking weight matching. Symbols "automatically align with text in all weights and sizes". There are four rendering modes (monochrome, hierarchical, palette, multicolor). Prefer system colors so symbols adapt to Dark Mode and accessibility settings. — [Apple HIG, SF Symbols](https://developer.apple.com/design/human-interface-guidelines/sf-symbols)
- **[Guideline]** Material Symbols variable font axes: FILL 0–1 (outlined→filled, useful for selected state), wght 100–700 (default 400), GRAD for fine thickness (negative values reduce glare for light-on-dark, positive values add emphasis), and **opsz 20–48dp, which auto-adjusts stroke as size changes** so icons look consistent across sizes. — [Google Fonts, Material Symbols guide](https://developers.google.com/fonts/docs/material_symbols)
- **[Vendor claim]** Lucide defaults are a 24px canvas and stroke-width 2 (code comment). Heroicons comes as outline/solid on a 24px grid plus "mini" on a 20px grid. Phosphor has six weights (thin, light, regular, bold, fill, duotone). — [PkgPulse comparison](https://www.pkgpulse.com/guides/lucide-vs-heroicons-vs-phosphor-react-icon-libraries-2026)
- **[Guideline]** Radix Icons describes itself as "a crisp set of 15×15 icons" (MIT, designed by WorkOS). This is a pixel-fitted grid intended for small, dense UI. — [GitHub radix-ui/icons](https://github.com/radix-ui/icons)
- **[Opinion]** AI-slop icon tells: an "icon tile stacked above heading" (small rounded-square container above a heading is the standard AI feature-card layout; the fix is to put the icon inline with the heading or drop the container); "massive icons" (containers larger than the content they introduce); and identical icon+heading+text card grids. — [Impeccable, "The visible tells of AI design"](https://924b8765.impeccable-2rv.pages.dev/slop)
- **[Opinion]** AI-built interfaces converge on purple/indigo gradients, Inter, a centered hero and three icon cards in a row. — [devtake, "AI-generated frontend slop"](https://devtake.pages.dev/article/ai-generated-frontend-slop)
- **[Measured]** Sparkles is the de facto AI icon, but no NN/g participant linked it to AI. Used without a label, it is both a usability failure and a cliché. — [NN/g, AI Sparkles Icon Problem](https://www.nngroup.com/articles/ai-sparkles-icon-problem/)
- **[Opinion]** "Lucide is the most common default for general UI work", which is relevant because shadcn/ui-style stacks default to it, making Lucide's look the "generic" look. — [search summary of comparison sites, e.g. OpenReplay](https://blog.openreplay.com/svg-icon-libraries-web-apps/)
- **[Guideline]** Use the platform's or competitors' existing icons first, since familiarity drives recognition. This works against custom-for-novelty's-sake icons. — [NN/g, Icon Usability](https://www.nngroup.com/articles/icon-usability/)

### Inferences (taste rules for the skill)
- **One set per product.** Never mix Lucide with Heroicons or Material in one view. Stroke widths, terminals and corner radii won't match. If a needed glyph is missing, draw it on the same grid with the same stroke, or pick a set that has it (Tabler or Phosphor have larger catalogs).
- **Match stroke to type weight.** With Lucide's default stroke 2 at 24px, icons scaled down to 16px get optically lighter text-adjacent strokes unless `absoluteStrokeWidth` is used. Set stroke so it visually matches the label's stem weight: around 1.5 for regular-weight 14–16px text, thicker for semibold. This is the web analogue of SF Symbols' weight matching. (Inference from the Apple and Material guidance. Lucide's `absoluteStrokeWidth` prop exists, but I didn't verify it on the fetched page.)
- **Size on a scale tied to type.** Use 16px for 13–14px text, 20px for 15–16px text, and 24px for touch toolbars or tab bars. Use the set's native grid (Heroicons mini 20, Radix 15) rather than scaling a 24px glyph down, because pixel-fit grids stay crisp.
- **Alignment.** Center icons vertically to the text's cap height or x-height, not the line box. Use `display:inline-flex; align-items:center; gap:0.375–0.5em`, and nudge asymmetric glyphs (play, download, chevrons) optically.
- **Colour.** Use `currentColor`, with icons inheriting text color or a muted text token. Avoid multi-colored or gradient icons and per-icon brand tints. Use color only for state (destructive, success), always paired with text.
- **Corner and terminal language should match the typeface.** Use round-cap icons (Lucide, Phosphor) with humanist or geometric sans. Use sharper or square-terminal sets with grotesks or monospace UIs. (Opinion/inference; no source found with data.)
- **Distinctiveness.** A library alone does not make an app unique. The generic look comes from default Lucide at stroke 2 inside tinted squares. Distinctiveness comes from (a) using fewer icons, (b) tuning size and stroke to the type, (c) choosing a less-default set or weight (for example Phosphor light, Radix 15px, Geist), and (d) custom-drawing a handful of brand-critical glyphs. Apple's SF Symbols shows the "system" route: icons tied to the font metrics.
- **Emoji as UI icons** render differently per OS and can't take `currentColor`, which reads as amateur. Avoid them except in user content. (Inference; no primary source fetched.)

### Gaps
- I didn't find a primary source on Linear's or Vercel's internal icon practices. Vercel publishes "Geist" icons as part of the Geist design system, but I didn't fetch the details (count, grid, license). Claims that "Linear uses custom icons" are unverified.
- I found no source quantifying "Lucide everywhere" as a slop signal. It is an inference from Lucide's default status in shadcn-style stacks.
- SF Symbols licensing is covered in section 4. Use outside Apple platforms (on the web) is restricted by the license; see section 4.

## 4. Libraries compared (style, grid, size per icon, tree-shaking, license) and uniqueness

### Takeaway
All mainstream React SVG libraries are permissively licensed (MIT or ISC) and tree-shakeable with named imports. Per-icon cost is roughly 0.4–1 KB raw before compression. The real differences are visual (grid, stroke, weights), catalog breadth, and pitfalls like Phosphor bundling all weights per icon. SF Symbols is not licensed for web or non-Apple use and can't appear in logos or app icons.

### Cited Findings
| Library | Style / grid | Count | Per-icon size | License | Source |
|---|---|---|---|---|---|
| Lucide (`lucide-react`) | Outline stroke, 24px, stroke 2 default | ~1,500–1,870 (sources vary; one lists 1,778) | ~0.5 KB avg **[Vendor claim]**; `house.js` ESM source ≈600 chars incl. license header **[Measured, approximate, my fetch of unpkg]** | ISC | [PkgPulse](https://www.pkgpulse.com/guides/lucide-vs-heroicons-vs-phosphor-react-icon-libraries-2026); [unpkg lucide-react house.js](https://unpkg.com/lucide-react@0.460.0/dist/esm/icons/house.js); [license summary](https://dev.to/usapopopooon/what-i-didnt-know-about-icon-library-licenses-and-you-might-not-either-30of) |
| Heroicons (Tailwind Labs) | Outline + solid 24px, mini 20px (and micro 16px per Tailwind; unverified) | ~292–300 per style | ~0.4 KB **[Vendor claim]**; full 24/outline set ~150 KB | MIT | [PkgPulse](https://www.pkgpulse.com/guides/lucide-vs-heroicons-vs-phosphor-react-icon-libraries-2026) |
| Phosphor | 6 weights (thin, light, regular, bold, fill, duotone) | 7,700–9,000+ incl. weights; ~1,500 distinct concepts | ~1 KB avg; **each icon component carries all six weights**, so tree-shaking is per icon, not per weight **[Vendor claim]** | MIT | [PkgPulse](https://www.pkgpulse.com/guides/lucide-vs-heroicons-vs-phosphor-react-icon-libraries-2026); [search summary of comparisons](https://svgicons.com/articles/lucide-vs-tabler-vs-phosphor-icons) |
| Tabler | Outline 24px stroke 2, plus filled variants | ~5,500–6,200 (one lists 6,143 incl. filled) | n/a | MIT | [svgicons.com comparison](https://svgicons.com/articles/lucide-vs-tabler-vs-phosphor-icons) |
| Radix Icons | 15×15 crisp grid | not stated | n/a | MIT (© WorkOS) | [GitHub radix-ui/icons](https://github.com/radix-ui/icons) |
| Material Symbols | Variable font/SVG; FILL, wght 100–700, GRAD, opsz 20–48 | 2,500+ to 3,800+ (page inconsistent) | Font: see section 5 | Apache 2.0 (unverified here) | [Google Fonts Material Symbols guide](https://developers.google.com/fonts/docs/material_symbols) |
| SF Symbols | 9 weights × 3 scales, cap-height aligned | n/a | n/a | Apple license: no use in app icons, logos or trademarks; Apple product symbols can't be customized | [Apple HIG, SF Symbols](https://developer.apple.com/design/human-interface-guidelines/sf-symbols) |
| Iconify via `unplugin-icons` | Any of ~150 sets / 200,000+ icons, compiled to components at build time | — | Only used icons bundled (the full `@iconify/json` is ~120 MB on disk, not shipped) | per set | [GitHub unplugin-icons](https://github.com/unplugin/unplugin-icons) |

- **[Vendor claim]** npm weekly downloads (Jan 2026): Lucide ~5M, Heroicons ~2M, Phosphor ~700k. Full-package sizes per Bundlephobia: Lucide ~1.8 MB, Phosphor ~14 MB. These are install or unminified totals, not shipped bytes. — [PkgPulse](https://www.pkgpulse.com/guides/lucide-vs-heroicons-vs-phosphor-react-icon-libraries-2026)
- **[Guideline]** SF Symbols terms: symbols, or images "confusingly similar", may not be used in app icons, logos or any trademarked use. Apple product and feature symbols can be displayed but not customized. — [Apple HIG, SF Symbols](https://developer.apple.com/design/human-interface-guidelines/sf-symbols)
- **[Opinion]** No license among Lucide, Heroicons, Phosphor or Tabler requires attribution. Lucide is ISC (functionally MIT). — [DEV, icon library licenses](https://dev.to/usapopopooon/what-i-didnt-know-about-icon-library-licenses-and-you-might-not-either-30of)

### Inferences
- Choosing by context: Lucide is a neutral default with broad coverage, but it is the most "default-looking". Heroicons is small and pairs with Tailwind, but its catalog is limited. Phosphor offers weight flexibility for type matching (light/regular/bold), but standardize on one weight and watch the per-icon multi-weight cost. Tabler has the broadest outline catalog. Radix suits dense 13–14px UIs. Material Symbols fits Material/Android-flavored products where variable axes matter. SF Symbols is for Apple-native apps only.
- To look less generic, the agent should change the defaults (stroke, size, weight) and reduce icon count before switching libraries.

### Gaps
- I couldn't verify official current counts from lucide.dev, heroicons.com, phosphoricons.com or tabler.io. The counts above come from comparison blogs with differing dates, so treat them as approximate.
- I didn't fetch details on Remix Icon, Iconoir or Geist icons (style, count, license). From memory, Remix is Apache 2.0 and Iconoir is MIT, but both are **unverified**.
- Bundlephobia per-icon numbers weren't fetched directly. Per-icon gzip figures are vendor-site estimates with no stated method.

## 5. Performance: bytes, tree-shaking, barrel imports, icon fonts vs SVG, sprites, build-time icons

### Takeaway
A tree-shaken inline SVG icon costs roughly 0.4–1 KB raw (much less gzipped) and is effectively free at normal counts. The real costs are (1) barrel imports slowing dev and build in Next.js, which `optimizePackageImports` fixes and which is on by default for lucide-react, (2) unsubsetted icon fonts (Material Symbols full variable font ≈7.9 MB, default ≈295 KB, subset ≈1.7 KB), and (3) many repeated inline SVGs inside JS bundles or HTML, where sprites with `<use>` can help.

### Cited Findings
- **[Measured]** Vercel (Shu Ding, 13 Oct 2023), Next.js `optimizePackageImports`. `lucide-react` went from **1,583 modules to 333**, and dev boot from **5.8s to 3s** (M2 MacBook Air). `@material-ui/icons` went from **11,738 modules to 632** and **10.2s to 2.9s**. The article reports a 15–70% dev-time boost overall, about 28% faster `next build` for a page using lucide-react + headlessui, about 10% faster local cold start, and up to 40% faster serverless cold starts (with other 13.5 changes mixed in). Next.js scans barrel files and rewrites imports to source modules. `lucide-react` is on the default-optimized list. — [Vercel blog, How we optimized package imports in Next.js](https://vercel.com/blog/how-we-optimized-package-imports-in-next-js)
- **[Vendor claim]** Lucide: "Only the icons you import are included in your final bundle." — [Lucide React docs](https://lucide.dev/guide/packages/lucide-react)
- **[Measured, approximate]** A single lucide-react ESM icon module (`house.js`) is about 600 characters including the license comment. It is mainly path data plus a call to a shared `createLucideIcon` factory, so marginal cost per extra icon is just the path data. — [unpkg lucide-react 0.460.0 house.js](https://unpkg.com/lucide-react@0.460.0/dist/esm/icons/house.js)
- **[Vendor claim]** Approximate per-icon cost is ~0.5 KB (Lucide), ~0.4 KB (Heroicons) and ~1 KB (Phosphor). For 50 icons: ~8 KB gz (Lucide), ~7 KB gz (Heroicons), ~15 KB gz (Phosphor). No method is stated. — [PkgPulse](https://www.pkgpulse.com/guides/lucide-vs-heroicons-vs-phosphor-react-icon-libraries-2026)
- **[Measured, vendor]** Material Symbols via Google Fonts. All icons with default axes ≈ **295 KB**. The full variable font with all axes ≈ **7.9 MB**. Subset with `&icon_names=home,palette,settings` ≈ **1.7 KB**. Subset with limited axes ≈ **2.6 KB**. Use `&display=block` so ligature text ("home") isn't shown before load. That is a FOUT-of-ligature-words issue: by default the user can briefly see raw words. — [Google Fonts, Material Symbols guide](https://developers.google.com/fonts/docs/material_symbols)
- **[Opinion, established]** Chris Coyier (CSS-Tricks) on icon fonts vs inline SVG. Browsers anti-alias icon fonts as text, so they can be less crisp. Icon fonts usually inject via a pseudo-element on an empty span, which gives "bad or no semantics", while `<svg>` semantically says "I'm an image". SVG also allows multi-color and precise positioning. — [CSS-Tricks, Inline SVG vs Icon Fonts](https://css-tricks.com/?p=168417) (via search excerpts)
- **[Opinion/analysis]** Jacob Groß, "Breaking Up with SVG-in-JS" (2023, updated 2024, talk 2025). Shipping SVG inside JS bundles costs parse and execute time, so prefer SVG in HTML. Sprites make sense for many small icons, since header overhead on 100 × 1 KB files outweighs the SVG itself, but pulling 1 icon from a 100 KB sprite is wasteful. `<use>` references keep `currentColor` and CSS working. — [kurtextrem.de, SVG-in-JS](https://kurtextrem.de/posts/svg-in-js); [slides PDF](https://kurtextrem.de/SVG-in-JS.pdf)
- **[Opinion]** Unoptimized SVG icons can account for half of a page's HTML bytes. A shared sprite with `<use>` is a more performant alternative to repeating inline SVGs. — [DEV, Deno Fresh SVG sprites](https://dev.to/askrodney/deno-fresh-svg-sprites-optimized-icons-3dpg)
- **[Vendor claim]** `unplugin-icons` compiles Iconify icons into components at build time for React, Vue, Svelte, Solid, Astro and more. It supports SSR/SSG with "no more FOUC" and bundles only the icons used. A `?raw` import gives a raw SVG string. — [GitHub unplugin-icons](https://github.com/unplugin/unplugin-icons)

### Inferences
- **Recommended defaults for the agent:**
  - React/Next: use named per-icon imports from an SVG library (`import { Search } from "lucide-react"`). Don't use dynamic or name-string icon loaders (`DynamicIcon`, `icons[name]`), which pull the whole set. If a library isn't on Next's default list, add it to `experimental.optimizePackageImports` (or `optimizePackageImports` in newer versions). With Phosphor in RSC, prefer its SSR entry; that path is from memory and unverified.
  - Plain HTML / static sites: use inline SVG for a handful of icons. For a dozen or more icons repeated across pages, use an external or inlined `<symbol>` sprite with `<use href="#id">` and `fill/stroke: currentColor`.
  - Vite/Astro/Svelte: `unplugin-icons` (Iconify) for build-time components from any set.
  - Avoid icon fonts for new work. If Material Symbols is required, subset with `icon_names` and restrict axes. Otherwise prefer the SVG versions.
  - CSS `mask-image` icons (`background: currentColor; mask: url(icon.svg)`) are a cacheable, zero-JS option for decorative icons, but they have no semantics, so pair them with text. (No source was fetched for this; it's a known technique, unverified here.)
- Icon bytes are rarely the bottleneck. A page with 30 tree-shaken icons is about 5–15 KB raw. Barrel-import dev slowness and unsubsetted fonts are the real traps.

### Gaps
- I didn't fetch a bundlephobia or measured gzip number for a single lucide-react icon. The ~600-character raw figure is my approximate reading of one file. Gzipped size is likely a few hundred bytes, but that is unverified.
- I found no benchmark comparing render cost (DOM nodes, hydration) of inline SVG components vs sprite `<use>` vs CSS mask at scale.
- I didn't verify the current exact Next.js default `optimizePackageImports` list (it is known to include lucide-react per Vercel's post; other icon packages such as `@heroicons/react` and `@phosphor-icons/react` are believed to be included but are unconfirmed).
