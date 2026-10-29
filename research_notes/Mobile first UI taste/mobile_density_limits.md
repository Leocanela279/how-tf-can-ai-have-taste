# Mobile information density and cognitive-load limits: "When is it too much (or too little) for mobile?" (as of Oct 2026)

Evidence-strength tags used on every line:
- **[STRONG]** = normative standard or primary peer-reviewed study, wording confirmed via search excerpt of the primary source.
- **[MODERATE]** = respected practitioner research (NN/g, Baymard, Butterick) seen via search excerpt / secondary summary, or a primary source whose exact wording I could not open.
- **[WEAK]** = blog/vendor/secondary summary, or a number that circulates without a traceable primary source.
- **[INFERENCE]** = my derivation (only in Inferences sections).

Method caveat (important for the report writer): in this session, direct page fetches to www.w3.org, www.nngroup.com and developer.chrome.com failed (domains not in the session's network allow-list), so NN/g, WCAG and Lighthouse claims below are taken from search-engine excerpts of those pages plus secondary summaries, not from full-text reads. Numbers that are part of formal standards (WCAG 24/44 px) are well established; NN/g quotes are excerpts and should be spot-checked before being quoted verbatim in public material.

---

## 1. Mobile typography numbers (body size, line height, measure, heading scale, clamp)

### Takeaway
Body text on a 390px phone should compute to at least 16px (17-18px is the comfortable range), with ~1.4-1.6 line height, giving roughly 38-48 characters per line in a 358px column; Lighthouse fails a page only when 40%+ of text is under 12px, so the script should be stricter than Lighthouse. A 72px desktop headline typically lands at ~32-44px on a phone (about 2-2.75x body), using clamp() with a rem floor.

### Cited Findings
- [STRONG] Lighthouse "Document doesn't use legible font sizes" treats text under 12px as too small on mobile and fails the page when 40% or more of the page text is below 12px (equivalently: pass needs at least 60% of text at 12px or above). Its failure table lists source, selector, % of page text and computed font size. — [Lighthouse font-size audit](https://developer.chrome.com/docs/lighthouse/seo/font-size)
- [STRONG] iOS Safari auto-zooms on focus into any form control whose *computed* font size is below 16px (unit irrelevant: em/rem that computes under 16px still triggers it). The fix is inputs at >= 16px; `maximum-scale=1` also stops it but disables pinch-zoom for everyone and is discouraged. — [Guidefari TIL](https://guidefari.com/safari-ios-input-zoom/); [Jeffery To](https://thingsthemselves.com/no-input-zoom-in-safari-on-iphone-the-pixel-perfect-way/); [GitLab MR fixing iOS input zoom](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/220666)
- [MODERATE] Butterick's Practical Typography: web body text 15-25px; line spacing 120-145% of point size; line length an average of 45-90 characters (2-3 lowercase alphabets). He notes measure should be counted in characters, not physical width. — [Practical Typography: summary of key rules](https://practicaltypography.com/summary-of-key-rules.html); [Line length](https://practicaltypography.com/line-length.html)
- [WEAK] Multiple 2025-2026 practitioner guides set 16px as the mobile body minimum and ~1.5 line height (some say 1.5-1.8 for mobile body). — [FontFYI mobile typography accessibility](https://fontfyi.com/blog/mobile-typography-accessibility/); [OneNine mobile typography tips](https://onenine.com/10-mobile-typography-tips-for-better-readability/)
- [WEAK] Mobile measure recommendations conflict among secondary sources: "40-60 characters for mobile" vs "35-50 characters for mobile (45-75 desktop)"; general guidance 45-75. — [UXPin line length 2026](https://www.uxpin.com/studio/blog/optimal-line-length-for-readability/); [TestMu mobile typography tips](https://www.testmuai.com/blog/19-typography-tips-that-will-change-the-way-you-design-mobile-web/)
- [WEAK] A practitioner type table lists H1 at 28-34px on mobile vs 32-40px desktop for product UI, using a 1.25 ratio example scale and noting mobile sizes are usually smaller. — [FontFYI](https://fontfyi.com/blog/mobile-typography-accessibility/)
- [WEAK] clamp() practice: e.g. `font-size: clamp(1rem, 0.75rem + 1.5vw, 1.5rem)` so body never renders below 16px on small phones; use rem in the preferred value so user font-size settings are respected (pure vw values ignore user zoom/size preferences). — [Robust Branding fluid typography](https://robustbranding.com/fluid-typography-with-css-clamp/); [Medium: Responsive typography beyond clamp()](https://robertcelt95.medium.com/responsive-typography-that-actually-works-beyond-font-size-clamp-acf592b79774)

### Inferences
- [INFERENCE] Characters per line at 390px: with 16px side gutters the text column is 358px. Typical sans-serif average glyph width is roughly 0.48-0.55em, so 16px body gives ~41-47 chars/line, 17px ~38-44, 18px ~36-41. That sits at the low end of Butterick's 45-90 and inside the 35-50 "mobile" band, which is why going below 16px (more chars) or above ~20px (under ~35 chars, ragged, hyphenation-heavy) both degrade. Script check: measure actual chars/line on rendered `p` elements (text length / line count via `getClientRects()` or Range rects). Suggested budget: warn < 30 or > 60 chars/line on body paragraphs at 390px.
- [INFERENCE] Proposed checkable typography budget at 390px:
  - Body paragraphs (`p`, `li` in prose) computed font-size >= 16px (fail), 17-18px ideal; anything < 12px fails outright except legal/fine print (and fine print must be < ~5% of text, much stricter than Lighthouse's 40%).
  - `input, select, textarea` computed font-size >= 16px (fail otherwise: iOS zoom).
  - Body line-height ratio 1.35-1.7 (warn outside); headings 1.0-1.25.
  - Largest heading on mobile: <= ~2.75x body (e.g. <= 44-48px at 16-17px body) AND the longest word of the H1 must fit in 358px without overflow/break (check `scrollWidth <= clientWidth`). A 72px desktop display face would fit only ~5-7 characters per line at 358px, so a word like "Infrastructure" would overflow; scale down to ~36-44px.
  - Type-scale ratio on mobile ~1.2-1.25 (smaller than desktop's 1.333-1.5) so H1->H4 doesn't explode; this is common practice but I found no study testing it.
- [INFERENCE] The "thin" failure mode in typography: very large headings with very short copy (e.g. 64px+ two-word heading, one 14px sentence) produce screens with near-zero information. Pair a heading-size ceiling with a minimum-text floor (see Section 7).

### Gaps
- Apple HIG's default body (17pt Dynamic Type "Large") and Material 3 type scale (Display Large 57sp, Body Large 16sp) are widely cited but I could not open the HIG or m3.material.io pages in this session to confirm current 2026 values.
- No peer-reviewed study found that tests heading type-scale ratios specifically on phones; ratio advice is practitioner convention.
- No study found giving an empirical mobile-specific optimal characters-per-line; the 35-50 / 40-60 bands are practitioner consensus.

---

## 2. Touch targets and spacing

### Takeaway
Legal floor is WCAG 2.2 SC 2.5.8 (AA): 24x24 CSS px or a 24px-diameter clear circle; the quality bar is 44x44 CSS px (WCAG 2.5.5 AAA / Apple 44pt) or 48x48 with 8px gaps (Material). Empirical studies put reliable one-thumb targets at ~9-10mm (~ 44-48 CSS px on modern phones); the script should fail < 24px, warn < 44px, and check spacing.

### Cited Findings
- [STRONG] WCAG 2.2 SC 2.5.8 Target Size (Minimum), Level AA (new in 2.2): pointer targets at least 24x24 CSS px, OR undersized targets spaced so a 24 CSS px diameter circle centred on each target's bounding box does not intersect another target or another target's circle. Exceptions: equivalent control elsewhere on the page, inline (in a sentence/text block), user-agent controlled, essential presentation. Measured on the hit area, not the visible glyph (padding counts). The Understanding doc warns against gaming it (e.g. 1px button with 23px offset). — [W3C Understanding 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) via [WCAG.com 2.5.8](https://wcag.com/developers/2-5-8-target-size-minimum-level-aa/), [Disability World 2.5.8](https://www.disabilityworld.org/toolkit/standards/wcag/2-5-8-target-size-minimum/), [Adrian Roselli 24x24 bookmarklet](https://adrianroselli.com/2022/05/24x24-pixel-cursor-bookmarklet)
- [STRONG] WCAG 2.5.5 Target Size (Enhanced), Level AAA: 44x44 CSS px, no spacing-based alternative; same family of exceptions. — [Disability World 2.5.5](https://www.disabilityworld.org/toolkit/standards/wcag/2-5-5-target-size-enhanced/)
- [WEAK] An 8px gap between targets is common best practice but is not a WCAG requirement. — [WCAG target size guide (TestParty)](https://testparty.ai/blog/wcag-target-size-guide)
- [MODERATE] Apple HIG: minimum 44x44 pt hit target on iOS/iPadOS; Material Design: 48x48 dp minimum touch target with >= 8dp between targets. (1pt = 1dp = 1 CSS px at the platform's reference density, so these map directly to CSS px.) Google's own accessibility page has been noted to misstate Apple's figure as "44x44dp" (units slip). — [AppetiteUI 44pt vs 48dp](https://www.appetiteui.com/blog/touch-target-size-ios-android); [WeAccess touch target sizes](https://www.weaccess.ai/blogs/mobile-touch-target-size)
- [STRONG] Parhi, Karlson & Bederson (MobileHCI 2006), one-handed thumb use: error rates did not differ significantly for discrete targets >= 9.6mm or serial targets >= 7.7mm; recommended 9.2mm for discrete tasks and 9.6mm for serial tasks (e.g. text entry). — [Parhi et al. 2006 PDF (Microsoft Research)](https://www.microsoft.com/en-us/research/wp-content/uploads/2006/01/parhi-mobileHCI06.pdf); [MSR abstract](https://www.microsoft.com/en-us/research/?p=155150)
- [MODERATE] NN/g cites Parhi et al. to recommend touch targets of at least 1cm x 1cm. — [NN/g Touch Targets on Touchscreens](https://www.nngroup.com/articles/touch-target-size/)
- [WEAK] A later replication (Sergeeva, Univ. of Bremen) reported a lower minimum of 6.8mm on a 58.6x115.2mm screen. — [Sergeeva replication (issuu)](https://issuu.com/denytodorova5/docs/target_size_study-anna_sergeeva-den)
- [MODERATE] MIT Touch Lab figures as reported by Smashing: average adult index finger width 16-20mm (~45-57px at the article's 2012 reference density); average adult thumb ~25mm (~72px). — [Smashing Magazine, Finger-Friendly Design (2012)](https://www.smashingmagazine.com/2012/02/finger-friendly-design-ideal-mobile-touchscreen-target-sizes/)
- [MODERATE] Hoober's field observations (1,333 observations, 2013; updated 2017 with literature review and a dataset of 120M+ touch events): reach zones vary by grip/device; accuracy is lower at screen edges than centre; Hoober argues pixel-based standards are unreliable versus physical size. Secondary summaries suggest ~9-12mm row heights for edge-placed actions. — [A List Apart, How We Hold Our Gadgets](https://alistapart.com/article/how-we-hold-our-gadgets/); [Inside UX Design summary](https://insideuxdesign.com/en/blog/touch-targets-how-big-buttons-on-a-phone-need-to-be)
- [WEAK] Recent modelling work (Tappy, 2024; skewed dual-normal model for edge targets, 2026) predicts tap success from element geometry, building on Bi & Zhai's dual-Gaussian model; useful if the probe wants a probabilistic score instead of a hard threshold. — [Tappy (arXiv 2403.03097)](https://arxiv.org/pdf/2403.03097); [Tappy Figma plugin (arXiv 2411.00381)](https://arxiv.org/pdf/2411.00381); [Edge-target model (arXiv 2602.22454)](https://arxiv.org/pdf/2602.22454)

### Inferences
- [INFERENCE] mm -> CSS px: CSS px are defined so ~96 px/inch at arm's length; on phones, browsers map CSS px so that 1 CSS px ~ 0.15-0.17mm on typical iPhones/Pixels (e.g. iPhone 390 CSS px across ~64-65mm usable width ~= 6 CSS px/mm). So Parhi's 9.2-9.6mm ~= 55-58 CSS px, 7.7mm ~= 46 px, and NN/g's 1cm ~= 60 px. 44-48px therefore sits at ~7.3-8mm: OK for centre-of-screen targets, tight for edge/one-thumb use. This is why 44-48 is a reasonable "quality" floor and ~56px is better for primary bottom-of-screen CTAs.
- [INFERENCE] Script-checkable target rules at 390px (all on `getBoundingClientRect()` of a, button, input, [role=button], [onclick], summary, label-for):
  - FAIL: hit area < 24x24 and 24px-circle spacing test fails (WCAG 2.5.8), excluding inline links within running text.
  - WARN: any non-inline target < 44x44.
  - WARN: adjacent targets (rects within 8px of each other) where either < 48px.
  - INFO: primary CTA (largest/most prominent button) < 48px tall or narrower than ~60% of column on mobile.
- [INFERENCE] The Lighthouse tap-target audit historically used 48x48 with 8px spacing; whether it is still shipped in 2026 Lighthouse is unverified (see Gaps), so the repo should own its rule rather than rely on Lighthouse.

### Gaps
- Could not verify Lighthouse's tap-target audit thresholds or whether it still exists in current Lighthouse (developer.chrome.com was not reachable; search did not return it). Believed historically 48px/8px but unconfirmed here.
- The often-quoted "MIT Touch Lab: fingertips 8-10mm, finger pads 10-14mm" (Dandekar et al. 2003) could not be located in a primary or reliable secondary source in this session; do not cite those exact numbers without checking the paper.
- A circulating claim that "56dp targets reduce errors by 31% (Touch Lab)" has no traceable source; exclude.
- No error-rate-by-px curve for modern phones found beyond Parhi 2006 and the replication.

---

## 3. How many items/choices per screen (nav, menus, forms, cards, CTAs, scrolling)

### Takeaway
Hard numbers that exist: bottom nav 3-5 destinations (Material/Apple convention), accordion sub-navigation under ~6 subcategories (NN/g), checkout ~8 total form fields is achievable vs 11.3 average (Baymard). People do scroll, but attention decays steeply by screenful; there is no sourced "max cards/CTAs per viewport", so those budgets must be heuristic.

### Cited Findings
- [MODERATE] Material 3 navigation bar is specified for 3-5 destinations; one measurement of the M3 nav item at 3 items was ~51px high, meeting 48dp. — [AppetiteUI iOS vs Material 3 components](https://www.appetiteui.com/blog/ios-vs-material-3-components); [WeAccess](https://www.weaccess.ai/blogs/mobile-touch-target-size)
- [MODERATE] NN/g: accordion-style mobile subnavigation works when there are few subcategories, recommending fewer than 6 subcategories per primary category; larger structures should use section menus or landing pages. — [NN/g Mobile Subnavigation](https://www.nngroup.com/articles/mobile-subnavigation/)
- [MODERATE] NN/g: mobile navigation must be discoverable, accessible and use little screen space; the hamburger icon is now widely recognised in standard locations but "not foolproof", especially for less tech-savvy users, so provide navigation cues in page content too. — [NN/g hamburger icon recognisability](https://www.nngroup.com/articles/hamburger-menu-icon-recognizability/); [NN/g menu-design checklist](https://www.nngroup.com/articles/menu-design/)
- [MODERATE] Baymard: average checkout in 2024 had 11.3 form fields (11.8 in 2021, 12.7 in 2019; the much-repeated "14.9 fields" figure is from 2016 and outdated); Baymard's testing concludes most sites need only ~8 fields in total. — [Baymard: Checkout from 16 fields to 8](https://baymard.com/blog/checkout-optimization-from-16-fields-to-8); [GroundedKit verification of 2024 figures](https://groundedkit.com/claims/baymard-average-checkout-5-1-steps-11-3-form-fields-2024/)
- [MODERATE] NN/g scrolling and attention (2018 update, eyetracking, ~130,000 fixations, 120 participants): 57% of viewing time above the fold (down from ~80% in 2010), 74% in the first two screenfuls, 81% in the first three. The update note indicates data came from larger desktop monitors, so it is not phone-specific. — [NN/g Scrolling and Attention](https://www.nngroup.com/articles/scrolling-and-attention/) (figures via [Prometheus summary](https://prometheu.website/en/journal/the-fold-myth/))
- [WEAK] "Users scroll below the fold on 92% of pages" attributed to NN/g 2018 could not be found in NN/g text. — [TTG Creatives](https://ttgcreatives.com/articles/above-the-fold-web-design-myth-users-scroll)
- [MODERATE] NN/g: reading on mobile is about twice as difficult as on desktop (comprehension of complex content). — [NN/g Accordions on Mobile](https://www.nngroup.com/articles/mobile-accordions/)

### Inferences
- [INFERENCE] Hick's law gives a log relationship, not a cap; on phones the practical limiter is screen real estate plus target size. With 44-48px targets and a ~650-750px usable viewport (390x844 device minus browser chrome), a single vertical list can physically hold ~12-15 rows, but NN/g's < 6 subcategory guidance and the 3-5 nav convention suggest decision sets of ~5-7 visible peer choices per group.
- [INFERENCE] Proposed per-viewport budgets for the 390px probe (heuristic, untested; tune with blind tests):
  - Bottom/tab nav items: 3-5 (fail > 5, warn 2).
  - Primary-styled CTAs (filled buttons) per viewport: 1 (warn at 2, fail at >= 3 visually equal filled buttons in one viewport).
  - Peer interactive targets in one viewport (excluding inline links): warn > ~12.
  - Cards per viewport: 1-3 full cards in a vertical feed, or a horizontally scrolling row that shows 1.2-2.5 cards (partial card = affordance). Warn if > 4 cards fully visible at 390px (implies cards too small to carry content/tappable text) and if a 2-column card grid has card text < 14px.
  - Form fields per step on mobile: warn > ~6-8 visible fields per screen; whole checkout target ~8 (Baymard).
  - Distinct menu items in an expanded mobile menu level: warn > 7-9; prefer drill-down or landing pages beyond that.
- [INFERENCE] Given 74%/81% of attention in the first 2-3 screenfuls (desktop data), the first 2-3 viewports at 390px should carry the core value proposition and primary action; content can continue below but should be ordered by priority.

### Gaps
- No primary source found for a numeric "max CTAs per screen" or "max cards per viewport"; these are heuristic.
- No phone-specific replication of NN/g's scroll-attention distribution found.
- Apple HIG tab bar limit (5 on iPhone, "More" beyond) not confirmed from HIG directly in this session.
- No mobile-specific Baymard form-field number found (the 8-field figure is overall checkout).

---

## 4. Visual complexity metrics that predict overload

### Takeaway
Perceived visual complexity and colourfulness are computable from screenshots and predict first-impression appeal (about half the variance at 500ms), and clutter correlates negatively with mobile app aesthetics; but none of the studies publish hard thresholds (e.g. "max N colours"), so the probe should use relative/derived budgets.

### Cited Findings
- [STRONG] Reinecke et al. (CHI 2013): 450 websites rated by 548 volunteers for colourfulness, complexity and appeal; computational models of perceived complexity and colourfulness from screenshots; combined with demographics they explain 48% of variance in appeal ratings formed after 500ms of viewing (not 50ms). — [Harvard DASH PDF](https://dash.harvard.edu/bitstream/handle/1/12561368/Predicting%20Users%20First%20Impressions.pdf;sequence=1); [Semantic Scholar](https://www.semanticscholar.org/paper/Predicting-users'-first-impressions-of-website-with-Reinecke-Yeh/aa6baf340d80f61d3e4a770d107b20d7e26878a7)
- [STRONG] Reinecke & Gajos (CHI 2014): 2.4 million ratings from ~40,000 participants; visual preferences vary with demographics (e.g. women preferred more colourful sites than men). — [Quantifying Visual Preferences Around the World](https://www.eecs.harvard.edu/~kgajos/papers/2014/reinecke14visual.pdf)
- [STRONG] Miniukovich & De Angeli: eight computable GUI aesthetics metrics: visual clutter, colour range, number of dominant colours, figure-ground contrast, contour congestion, symmetry, grid quality, white space. On 99 mobile interfaces the metrics explained 40% of subjective complexity and 36% of aesthetics; metrics worked less well for mobile than web GUIs. — [Computation of Interface Aesthetics (CHI 2015)](https://www.researchgate.net/publication/300726008_Computation_of_Interface_Aesthetics); [Miniukovich PhD thesis, Trento](https://iris.unitn.it/retrieve/4428babf-9533-4673-b270-55d7adbd29f9/aesthetics_thesis_v1.2.12_final_1.pdf)
- [STRONG] Miniukovich & De Angeli (2014, iPhone apps): visual complexity correlated negatively with aesthetics; clutter vs aesthetics r = -.22 at 150ms exposure and r = -.30 at 4s. — [Visual Impressions of Mobile App Interfaces](https://www.academia.edu/11396920/Visual_Impressions_of_Mobile_App_Interfaces)

### Inferences
- [INFERENCE] Because correlations are moderate (|r| ~0.2-0.3) and no thresholds are published, use these as warning signals, not gates. Practical per-screen counts the probe can compute at 390px (heuristic budgets, tune via the repo's blind tests):
  - Distinct computed font-size values across visible text: target 4-6, warn > 7.
  - Distinct font families: <= 2 (3 with mono), warn > 3.
  - Distinct font weights: warn > 4.
  - Distinct non-grey "accent" colours (text + backgrounds + borders, after clustering in OKLCH / dE > 10): warn > 3-4 accents.
  - Visible leaf elements per viewport (text nodes, images, icons, controls): warn above ~40-50 at 390x~750; also warn below ~5 (see thin, Section 7).
  - Edge-density / contour-congestion proxy: run Canny on a 390px screenshot and compute edge-pixel ratio per viewport; compare to a corpus of liked pages rather than a fixed number.
- [INFERENCE] Reinecke's work implies a "too simple is also less appealing" curve for some groups (preference depends on demographics), which supports the repo's observation that austere pages read as thin; the target is low-to-moderate complexity, not minimum complexity. (Exact curve shape not confirmed in this session; see Gaps.)

### Gaps
- No published numeric thresholds (max colours, max font sizes, max elements) found in Reinecke or Miniukovich papers via search; full texts not opened.
- Could not confirm from the paper whether Reinecke 2013 reports an inverted-U (optimal moderate complexity) or monotonic relationship; often summarised as "low-to-moderate complexity preferred", but treat as unverified.

---

## 5. Long pages vs accordions, tabs, carousels, "read more" on mobile

### Takeaway
On mobile, prefer one long, well-sectioned scroll or vertically stacked collapsible sections (accordions) over horizontal tabs and auto/hidden carousels; horizontal tabs cause users to miss core content (Baymard), carousels suffer low discoverability and sequential access (NN/g), and anything horizontally scrollable needs an explicit "more" affordance.

### Cited Findings
- [MODERATE] NN/g strongly advocates collapsing content on mobile with accordions because reading on mobile is ~2x harder and the accordion headers provide a "mini-IA" that lets users jump to relevant parts; but long expanded sections cause disorientation and excess scrolling, so a persistent (sticky) accordion header or floating close control helps. — [NN/g Accordions on Mobile](https://www.nngroup.com/articles/mobile-accordions/); [NN/g video](https://www.nngroup.com/videos/accordions-on-mobile/)
- [MODERATE] Baymard: test participants repeatedly overlooked core product content reachable only via horizontal tabs; recommends vertically collapsed/expanded sections, which did not show those discoverability issues. — [Baymard: Avoid "Horizontal Tabs"](https://baymard.com/blog/avoid-horizontal-tabs)
- [MODERATE] Baymard: signal hidden items in horizontal rows explicitly with a "truncation thumbnail" (e.g. a "+3" tile); a partially visible item is a weaker cue; horizontal swatch rows worked on mobile when clear scroll arrows were present at both ends so users don't think there are no more options. — [Baymard: truncating product gallery thumbnails](https://baymard.com/blog/truncating-product-gallery-thumbnails)
- [MODERATE] NN/g: carousels on touch screens have sequential access (users must swipe through items one by one) and low discoverability; swipe must be supported; tiny dot indicators make poor touch controls. — [NN/g Carousels on Mobile Devices](https://www.nngroup.com/articles/mobile-carousels/)
- [WEAK] Secondary summaries of Baymard: many users scroll past homepage carousels or ignore them; only 41% of studied sites with carousels had no carousel usability issues. — [UX Planet summary](https://uxplanet.org/the-usability-of-carousel-design-4e3930a10b29?gi=f4c83bc7ef8c)
- [MODERATE] NN/g on infinite scrolling: appropriate for feeds/browsing, problematic for goal-directed tasks and for reaching footer content. — [NN/g Infinite Scrolling](https://www.nngroup.com/articles/infinite-scrolling-tips/)

### Inferences
- [INFERENCE] Script checks: (a) flag `role=tablist` with horizontal tabs whose panels hold > ~150 words on mobile (suggest accordion/stacked sections); (b) for any horizontal overflow container (`scrollWidth > clientWidth`, overflow-x auto/scroll), require that the last visible item is clipped (peek of 10-40% of an item) or that arrow/"+N"/"See all" controls exist; (c) flag auto-advancing carousels; (d) flag carousel pagination dots < 24px hit area; (e) accordions: require headers >= 44px tall and the first section either open or obviously expandable (chevron icon).
- [INFERENCE] "Read more" truncation: acceptable for secondary long text when 3-5 lines of meaningful content stay visible and the control is a >= 44px target; never truncate the core value prop or price/spec info.

### Gaps
- No primary Baymard or NN/g data found specifically on "read more" truncation of descriptions on mobile.
- Carousel discoverability rates (e.g. % of users who swipe to item 2+) not found in a verifiable primary source in this session.

---

## 6. What to drop vs keep when going desktop -> mobile

### Takeaway
Do not drop content wholesale (mobile readers need the same information), but transform layouts: multi-column grids -> single column (or 2 columns for product/image grids), sidebars -> inline sections or drawers, wide tables -> locked-header horizontal scroll with column selection or stacked "card" rows, hover-only affordances -> visible controls or tap-to-reveal.

### Cited Findings
- [MODERATE] NN/g on mobile tables: locking headers and letting users choose a subset of columns make large tables usable on phones; some tables will always be too big, needing information hiding, column reordering or other advanced features. — [NN/g Mobile & Tablet topic summary (Mobile Tables)](https://www.nngroup.com/topic/mobile-and-tablet-design/?page=4); [NN/g Data Tables: Four Major User Tasks](https://www.nngroup.com/articles/data-tables/)
- [MODERATE] NN/g: actions hidden behind hover or a generic "Actions" menu are hard to discover and can have low accessibility; the "popup tip" is the touchscreen counterpart of the tooltip for interfaces without hover. — [NN/g Data Tables](https://www.nngroup.com/articles/data-tables/); [NN/g UI Elements Glossary](https://www.nngroup.com/articles/ui-elements-glossary/)
- [MODERATE] NN/g: big images at the top of mobile pages can push content below the fold and frustrate users. — [NN/g Big Pictures on Small Screens](https://www.nngroup.com/articles/big-pictures-small-screens/)
- [MODERATE] NN/g: because hidden navigation (hamburger) may be missed, provide supplementary navigation within page content. — [NN/g Mobile Subnavigation](https://www.nngroup.com/articles/mobile-subnavigation/)
- [WEAK] Vendor guidance describes three mobile table modes: horizontal scroll, stack (rows as cards), hide low-priority columns. — [Ninja Tables mobile-first tables](https://ninjatables.com/mobile-first-table-design-principles/)

### Inferences
- [INFERENCE] Script checks at 390px:
  - No horizontal page scroll: `document.documentElement.scrollWidth <= 390` (fail).
  - Text columns: no text block narrower than ~240px side by side with another text block (multi-column text on phone -> fail/warn). Image/product grids may be 2-up.
  - Tables: if `table` wider than viewport, require it inside an overflow-x container with a sticky first column/header, or a stacked layout; flag tables with > 4 columns visible at 390px.
  - Hover-only: flag elements with `:hover`-only revealed content (CSS rules with `:hover` that change `display/visibility/opacity` of children) when there is no `:focus-within`/click equivalent; or simulate `(hover: none)` media and check the content is reachable.
  - Sidebars: any `aside`/sidebar rendered beside main content at 390px is a fail; it should stack or move to a drawer.
- [INFERENCE] Keep-vs-drop rule of thumb: keep all decision-critical content (price, specs, key proof, primary action); compress decorative and repeated content (duplicate CTAs, repeated logos rows, ornamental imagery); collapse secondary detail into accordions rather than deleting it ("same content, different packaging").

### Gaps
- No quantitative study found comparing table patterns (scroll vs stack) on mobile.
- NN/g full article on touch vs hover not retrieved; hover guidance here is from excerpts.

---

## 7. Signs of "too little" (thin pages)

### Takeaway
The best-documented "too little" failure is the illusion of completeness / false floor: a hero or whitespace block that fills the first viewport so the page looks finished and users don't scroll. Combined with the complexity research (appeal is not maximised at minimum complexity), the probe should enforce a content floor in the first viewport and a "peek" of the next section.

### Cited Findings
- [MODERATE] NN/g, Illusion of Completeness: when visible content appears complete, users don't realise more exists below; term from Bruce Tognazzini (1998); large hero graphics and strong horizontal lines/whitespace bands are common causes; remedy is to let the next content visibly peek above the fold. — [NN/g Illusion of Completeness](https://www.nngroup.com/articles/illusion-of-completeness/); [NN/g video](https://www.nngroup.com/videos/illusion-completeness/); [St Andrews digital comms summary](https://digitalcommunications.wp.st-andrews.ac.uk/2020/09/21/scrolling-and-the-illusion-of-completeness/)
- [MODERATE] NN/g: top-of-page images on mobile can push content below the fold and cause frustration. — [NN/g Big Pictures on Small Screens](https://www.nngroup.com/articles/big-pictures-small-screens/)
- [WEAK] A community design-lint project defines a "false floor" rule: a hero that fills the first viewport with nothing peeking below. — [GitHub solomonBoltin/beautiful issue #35](https://github.com/solomonBoltin/beautiful/issues/35)
- [STRONG] Visual complexity relates to appeal in a way that varies by audience (Reinecke & Gajos 2014), i.e. "less" is not universally preferred. — [Reinecke & Gajos 2014](https://www.eecs.harvard.edu/~kgajos/papers/2014/reinecke14visual.pdf)

### Inferences
- [INFERENCE] Checkable "too little" budgets at 390x844 (heuristic; calibrate against the repo's blind tests where austere pages read as thin):
  - First viewport must contain: a heading, at least one supporting text block of >= ~12-15 words (or 2+ lines), and a primary action OR clear scroll cue; fail if first viewport has < ~20 words of readable text and no product image/visual proof.
  - Peek rule: some content from the next section (heading, card edge, image edge) must be visible within the first viewport height (e.g. a non-background element whose top < 0.9 * viewport height after the hero). Fail if the hero (`min-height: 100vh/100svh`) leaves zero peek.
  - Whitespace ratio per viewport: fraction of the viewport covered by text/images/controls (union of bounding boxes) — warn if < ~25-30% on any of the first 3 viewports (too empty) or > ~80% (too dense). Vertical gaps between sections > ~0.5 viewport height (~400px) are a thin-page smell on mobile.
  - Words per viewport for prose sections: warn if < ~15 (one-liner-per-screen "slide deck" pages) on content pages.
  - Heading-to-content ratio: warn if heading text area exceeds body text area in 3+ consecutive viewports.
  - Desktop->mobile copy-paste of desktop padding: section padding > ~96-120px top/bottom at 390px usually signals scaled-down desktop spacing; mobile section rhythm of ~48-80px is typical (practitioner convention, unsourced).
- [INFERENCE] How to reduce without thinning: (1) prioritise, don't delete: reorder by user task, move secondary detail into accordions/"read more" rather than removing; (2) keep one primary CTA per viewport but keep supporting proof (numbers, testimonials, thumbnails) near it; (3) replace decorative space with compact, information-bearing elements (a stat row, a 2-up image grid, a short list); (4) keep every collapsed item's header informative (the mini-IA NN/g describes) so collapsed content still "reads" as substance.

### Gaps
- No primary quantitative study found defining an optimal whitespace ratio or minimum content per mobile viewport; all "too little" numbers above are inferences to be validated with the repo's own blind tests.
- No primary mobile-specific data on how much hero height reduces scroll rate.
