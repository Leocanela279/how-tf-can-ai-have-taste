# Colour and Contrast in UI: What Works for the Human Eye

Evidence labels used throughout:
- **[Measured]**: a controlled study with reported data. Sample size is noted where found.
- **[Standard]**: a normative spec such as WCAG or APCA. It is derived from vision science but is a threshold, not an experiment.
- **[Vendor]**: a design system's documented choice (Material, Radix, Stripe, Linear). This is what top products do, not proof that it is optimal.
- **[Opinion]**: practitioner or blog advice, or a mechanism that is widely repeated without a controlled study behind it.

Research date: 2026-10-29. Several primary pages (Apple HIG, m2/m3.material.io, the PNAS full text, PMC) returned empty or blocked content to the fetch tool. Where a claim depends on those pages, this is noted.

---

## Contrast comfort: WCAG 2.2 vs APCA, maximum contrast, near-black and off-white, dark-mode values

### Takeaway
WCAG 2.2 sets a floor: 4.5:1 for body text and 3:1 for large text and UI parts. APCA adds per-size and per-weight Lc targets: Lc 90 is preferred for body text, Lc 75 is the body minimum and Lc 60 is the minimum for other content text. APCA is also the only one of the two to suggest a *ceiling*, around Lc 90, for very large and bold text and for large colour areas. Top systems avoid pure #000 surfaces in dark mode (Material uses #121212) and soften pure white text (Material uses 87% white). The evidence for this is mostly vendor guidance and mechanism. I found no controlled study showing that #000 on #fff harms reading.

### Cited Findings
- **[Standard]** WCAG 2.2 SC 1.4.3 (AA) requires at least 4.5:1 for text and 3:1 for large text, defined as 18pt, or 14pt bold, which is roughly 24px regular or 18.67px bold. The 4.5:1 figure compensates for the contrast-sensitivity loss at about 20/40 vision, a factor of roughly 1.5 applied to a 3:1 baseline. Ratios are thresholds and are not rounded, so 4.499:1 fails. — [W3C Understanding 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- **[Standard]** The same page warns that anti-aliasing can make thin fonts render fainter than their CSS colour. It suggests heavier strokes or exceeding the minimum. It also notes that some people with cognitive disabilities need *lower*-contrast combinations, so authors should provide a way to adjust colours. This is the closest WCAG comes to recognising that maximum contrast is not ideal for everyone. — [W3C Understanding 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- **[Standard]** The other WCAG criteria that matter here are 1.4.6 (AAA: 7:1 for text, 4.5:1 for large text), 1.4.11 Non-text Contrast (3:1 for UI component boundaries, states and meaningful graphics) and 1.4.1 Use of Color (colour must not be the only way information is conveyed). These pages were not re-fetched in this session. The thresholds are as stated in the spec. — [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- **[Standard]** APCA Lc levels by use case:
  - **Lc 90**: preferred for body text. Body columns at ≥18px/300 or ≥14px/400; non-body text at ≥12px/400.
  - **Lc 75**: minimum for body text. Body columns at ≥24px/300, 18px/400, 16px/500 or 14px/700.
  - **Lc 60**: minimum for content text that isn't body text. ≥24px/400, 18px/600 or 16px/700. Add Lc 15 to use these sizes as body text.
  - **Lc 45**: headlines and large text, ≥36px normal or 24px bold, plus fine-detail icons.
  - **Lc 30**: absolute minimum for placeholder, disabled and spot-readable text, and for solid icons.
  - **Lc 15**: absolute minimum for non-text such as dividers and thick focus rings.

  Sizes assume a 0.52 x-height and Helvetica/Arial weights. — [APCA in a Nutshell](https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell)
- **[Standard]** APCA suggests Lc 90 as a *maximum* only for very large, bold text (over 36px bold) and large colour areas. Small fonts have no maximum. APCA says it is perceptually uniform across light and dark, so it can guide dark-mode design where WCAG 2.x cannot. It recommends letting users choose a light or dark scheme. — [APCA in a Nutshell](https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell)
- **[Vendor]** Material Design's dark theme uses #121212 as the base surface rather than #000. Elevation is shown by lighter white overlays rather than shadows. Text on dark surfaces uses white at 87% (high emphasis), 60% (medium) and 38% (disabled). Pure white is avoided because it can visually "vibrate" on dark backgrounds. Material cites 15.8:1 between text and background, and requires body text to still reach 4.5:1 on the lightest elevated surface. These points come from search-result summaries of [Material 2 Dark theme](https://m2.material.io/design/color/dark-theme) and the [Material dark theme codelab](https://codelabs.developers.google.com/codelabs/design-material-darktheme/). The m2 page itself returned no body text to the fetch tool.
- **[Vendor]** Material advises desaturating accents on dark surfaces by using lighter tonal variants, around the "200" level, because saturated colours vibrate against dark surfaces and can fail contrast. — [Material 2 Dark theme](https://m2.material.io/design/color/dark-theme) (via search summary)
- **[Opinion]** Some third-party guides recommend an off-white such as #E0E0E0 for dark-mode body copy instead of 87% white. — [UX Planet, 8 Tips for Dark Theme Design](https://uxplanet.org/8-tips-for-dark-theme-design-8dfc2f8f7ab6)
- **[Opinion, with mechanism]** Halation is the usual explanation for avoiding white-on-black. A dark screen dilates the pupil, and a wider pupil lets in more optical aberration, so bright text bleeds or looks fuzzy. This is said to be worse with astigmatism. I found no controlled study testing astigmatism × polarity directly. Sources are accessibility vendors and blogs. Estimates of astigmatism prevalence vary, from about 1 in 3 to 30–50% of adults. — [Level Access: Accessibility for people with astigmatism](https://www.levelaccess.com/blog/accessibility-for-people-with-astigmatism/); [Science Insights](https://scienceinsights.org/is-dark-background-better-for-your-eyes/)
- **[Measured, mechanism support]** The pupil-size mechanism is partly supported by one study. Smaller pupils improve discrimination only for stimuli at the threshold of visual acuity, which is consistent with the positive-polarity advantage being strongest for small text. — [Mathôt & Ivanov 2019, PeerJ](https://peerj.com/articles/8220)
- **[Vendor]** Radix Colors guarantees that step 11 (low-contrast text) reaches APCA Lc 60 and step 12 (high-contrast text) reaches Lc 90 against step 2 of the same scale. In other words, a production system deliberately targets Lc 90, not Lc 106 (pure black on white), for primary text. — [Radix: Understanding the scale](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale)

### Inferences
- **Rule: hit the floor, then aim for comfort.** Body text should pass WCAG 4.5:1 *and* APCA Lc ≥75, preferably about Lc 90. Secondary text should be at least Lc 60 and WCAG 4.5:1. Placeholder and disabled text should be at least Lc 30. Exempt disabled text can go below 4.5:1, but should not drop below about 3:1 if it still needs to be read. Borders and focus rings on interactive controls need WCAG 3:1 under 1.4.11.
- **Rule: don't default to #000 on #fff for large surfaces.** Top systems (Radix step 12 ≈ Lc 90; Material #121212 with 87% white) leave about 10–15% headroom below maximum contrast. Practical defaults are text around #111–#1a1a1a on #fff or a slightly warm or cool off-white (#fafafa–#fcfcfc) in light mode. In dark mode, use a surface around #0f–#18 (Material uses #121212) with text around #e5–#ededed or 87% white. This is a taste and comfort convention, not a measured requirement. Label it that way in the skill.
- **Rule: dark mode needs lighter, less saturated accents.** Pull accents to a lighter tone (Material's ~200 level) and lower chroma so they don't vibrate and still pass contrast against dark surfaces.
- **Rule: show elevation in dark mode with lighter surfaces, not shadows.** Shadows don't read on near-black.
- Pure black is not *harmful* for small text in measured studies. The case against it rests on comfort, halation for astigmatic users and vendor convention. An agent should treat it as a strong default, not a hard prohibition. On OLED or "true black" themes, #000 is a legitimate choice for battery and pairs well with off-white text.

### Gaps
- No controlled study found that measures harm, glare or fatigue from #000 on #fff versus near-black on off-white at normal sizes. The "maximum contrast is harsh" claim is unverified beyond APCA's suggested Lc 90 ceiling for large bold text and areas, and vendor convention.
- No controlled study found on astigmatism and light-on-dark reading. The Bauer & Cavonius (1980) "26% better accuracy" figure appears only secondhand on non-authoritative pages and is unverified.
- The Apple HIG Dark Mode and Color pages returned no content to the fetch tool. Apple's exact recommended contrast values (commonly quoted as 4.5:1 minimum and 7:1 preferred for small text) and its system background values (iOS dark systemBackground #000, secondary #1C1C1E, tertiary #2C2C2E, from memory) are **not verified here**. A writer should check them at https://developer.apple.com/design/human-interface-guidelines/dark-mode before citing.
- Linear's exact surface and text hex values were not found. Only the methodology is documented (see palette section).
- The APCA dark-mode-specific draft guidance (in the Myndex discussion forum) was not retrieved.

---

## Readability research: positive vs negative polarity, dark-mode reading performance and eye strain, blue light

### Takeaway
For people with normal vision, dark text on a light background (positive polarity) gives better acuity and proofreading accuracy at all ages. The advantage grows as text gets smaller, and the most likely cause is pupil constriction under the brighter display. Dark mode has no measured performance advantage for general users. It may help some low-vision users, such as those with cataract, and is preferred by some people at night. Blue-light-filtering claims are not supported by the 2023 Cochrane review.

### Cited Findings
- **[Measured]** Piepenbrock et al. (2013, *Ergonomics*) compared younger (18–33) and older (60–85) adults without eye disease. Positive polarity (light mode) won on a Landolt-C acuity task and on proofreading in both age groups. The acuity advantage was smaller in older adults, and fatigue measures showed no significant polarity effect. NN/g's summary does not give the sample size. — [NN/g: Dark Mode vs. Light Mode](https://www.nngroup.com/articles/dark-mode/)
- **[Measured]** Piepenbrock et al. (2013, *Human Factors*) found the light-mode advantage grows as font size *decreases*. Participants reported no subjective difference even though their performance was better in light mode. — [NN/g](https://www.nngroup.com/articles/dark-mode/)
- **[Measured]** Piepenbrock, Mayr & Buchner (2014, *Ergonomics*) found smaller pupils and better proofreading with positive polarity. This supports the "display luminance hypothesis": the brighter display constricts the pupil and sharpens the retinal image. Buchner, Mayr & Brandt (2009) reached a similar conclusion. — [Mathôt & Ivanov 2019, PeerJ (reviewing these studies)](https://peerj.com/articles/8220); [Fundación Mapfre record](https://documentacion.fundacionmapfre.org/documentacion/publico/en/bib/150136.do)
- **[Measured]** Dobres, Chahine & Reimer (2017, *Applied Ergonomics*, MIT AgeLab) used a glanceable lexical-decision task. In simulated daytime, polarity had no significant effect. At night, light mode was faster and small text was much harder in dark mode. NN/g does not give the sample size. — [NN/g](https://www.nngroup.com/articles/dark-mode/)
- **[Measured, small n]** Aleman, Wang & Schaeffel (2018, *Scientific Reports*), **n = 7**: one hour of light-mode reading thinned the choroid, a marker linked to myopia, and dark mode thickened it. The effect was stronger in participants who were already myopic. NN/g calls the result intriguing but not conclusive. — [NN/g](https://www.nngroup.com/articles/dark-mode/)
- **[Measured, older]** Legge et al. (1985), with 7 participants with cloudy ocular media such as cataract, found faster reading in dark mode. Central-vision loss showed no polarity effect. The study used CRTs, which flicker more in light mode and may have biased results. — [NN/g](https://www.nngroup.com/articles/dark-mode/)
- **[Opinion, NN/g recommendation]** Don't make dark mode the default for general audiences. Offer it as an option, and prioritise it for long-form reading apps and low-vision users, following the OS setting. — [NN/g](https://www.nngroup.com/articles/dark-mode/)
- **[Measured, systematic review]** The Cochrane review (2023) covered 17 RCTs with 619 participants in six countries. Blue-light-filtering spectacles "may not reduce" short-term computer eyestrain. There is no evidence that they protect the retina, and effects on sleep and vision quality are unclear. Studies were searched up to March 2022. — [Cochrane CD013244](https://www.cochrane.org/CD013244/EYES_do-blue-light-filtering-spectacle-lenses-reduce-digital-eye-strain); [AOP news, 18 Aug 2023](https://www.aop.org.uk/ot/news/2023/08/18/cochrane-review-on-blue-light-filtering-spectacles-published)
- **[Opinion]** One source says there is no scientific evidence that dark mode reduces eye-muscle strain, but that it may reduce subjective fatigue in low ambient light. — [Science Insights](https://scienceinsights.org/is-dark-background-better-for-your-eyes/)

### Inferences
- **Rule: default reading-heavy UI to light mode, and always support `prefers-color-scheme` dark.** Light is the measured performance winner. Dark mode is a preference and accessibility feature.
- **Rule: in dark mode, make small text larger, heavier or higher-contrast.** The polarity penalty is worst for small text. APCA also makes light-on-dark text need more Lc than WCAG suggests. Avoid thin weights (≤300) for light-on-dark body text.
- **Rule: never justify a palette with "reduces blue light" or "easier on the eyes" claims.** Neither is supported.
- Users can't feel the light-mode advantage (Piepenbrock *Human Factors*). Preference tests alone will not detect it.

### Gaps
- Exact sample sizes for the Piepenbrock and Dobres studies were not retrieved because the full texts were not accessible.
- I found no large modern (OLED-era, post-2020) RCT on dark-mode reading performance or eye strain.
- Buchner & Baumgartner (2007) details, including ambient-light conditions and n, were not retrieved beyond NN/g's mention.

---

## Combinations to avoid: chromostereopsis, vibrating complements, red/green and CVD, saturated large areas, colour-only meaning

### Takeaway
Avoid placing highly saturated, spectrally distant hues directly next to each other, especially red and blue. They create a depth illusion (chromostereopsis) that is tiring to look at. Never rely on red versus green alone, because red-green colour vision deficiency affects about 1 in 12 men and 1 in 200 women. Keep saturated colour to small areas. WCAG 1.4.1 forbids colour as the only way to carry meaning.

### Cited Findings
- **[Measured / perceptual]** Chromostereopsis makes one colour appear to advance and another recede. It appears most readily with discrete elements in colours far apart on the spectrum, such as blue text on a red background, and the paper measures colour-difference thresholds on flat displays. — [PMC4382974: Colour difference threshold of chromostereopsis induced by flat display emission](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4382974/)
- **[Opinion, textbook]** The effect is strongest for red/blue and can also occur with red/green. Designers should avoid these pairings adjacent to each other because they are hard on the eyes. — [Weinschenk, *100 Things Every Designer Needs to Know About People* (O'Reilly)](https://www.oreilly.com/library/view/100-things-every/9780136746959/ch10.xhtml); [Weinschenk blog #9](https://www.blog.theteamw.com/2009/11/09/100-things-you-should-know-about-people-9-chromostereopsis-is-hard-on-the-eyes/)
- **[Opinion]** Suggested mitigations are to desaturate one or both colours, change one colour's lightness so the pair separates on value, and add space, outlines or shadows between them. — [Lime Creative: Chromostereopsis](https://limeiscreative.com/tips-for-diy-designers-part-1-chromostereopsis/)
- **[Measured, epidemiological, secondhand]** Colour vision deficiency affects about 1 in 12 males and 1 in 200 females, citing Cleveland Clinic. Another source gives 5–8% of men and 0.5–1% of women. Prevalence is highest in people of Northern European descent, about 7–8% of men. — [Live Science](https://www.livescience.com/health/genetics/why-is-color-blindness-so-much-more-common-in-men-than-in-women); [News-Medical](https://www.news-medical.net/health/Color-Blindness-Prevalence.aspx)
- **[Opinion, example]** Red and green lines on a hospital floor map were indistinguishable to a colour-blind visitor. Colour-coded information should remain understandable without colour. — [Worqx: Color contrast](https://worqx.com/color/color_contrast.htm)
- **[Vendor]** Saturated colours "vibrate" against dark surfaces and can fail contrast, so Material desaturates accents in dark mode. — [Material 2 Dark theme](https://m2.material.io/design/color/dark-theme) (via search summary)
- **[Vendor]** Stripe found that WCAG measures only contrast, not vibrancy, so a pair can pass and still look muddy. Their scales were tuned to stay both vibrant and accessible. — [Stripe: Designing accessible color systems (2019)](https://stripe.com/blog/accessible-color-systems)
- **[Standard]** WCAG 2.2 SC 1.4.1 says colour must not be the only visual means of conveying information, indicating an action, prompting a response or distinguishing an element. This page was not re-fetched in this session. — [WCAG 2.2](https://www.w3.org/TR/WCAG22/#use-of-color)

### Inferences
- **Rule: no saturated red text on blue, or blue on red, and no saturated red next to saturated green.** If two strong hues must sit side by side, separate them by lightness (APCA Lc ≥45 between them), not just by hue.
- **Rule: pair every status colour with a second channel.** Use an icon, a label, a shape or a pattern. For example, error = red + ⚠ icon + text; success = green + check. Charts need labels, shapes or patterns plus a colour-vision-safe palette. Prefer blue/orange over red/green for binary encodings.
- **Rule: keep saturated colour to small areas.** Use full-chroma colour for buttons, links, badges and highlights. Large fills (hero sections, sidebars, full-page backgrounds) should be neutral or low-chroma tints (Radix steps 1–3). In dark mode, also lower the chroma of accents.
- **Rule: test with a CVD simulator** (protanopia, deuteranopia, tritanopia) and in greyscale. If the UI still makes sense in greyscale, colour is not doing semantic work alone.

### Gaps
- I found no primary NEI or epidemiological paper in this session. Prevalence figures are cited secondhand via Cleveland Clinic through Live Science.
- No controlled study found on "vibrating complementary colours" (for example, saturated orange/blue text pairs) in a UI context beyond chromostereopsis. The claim is practitioner consensus.
- No measured threshold found for how large a saturated area can be before it becomes fatiguing.

---

## Colour preference research: ecological valence, cross-cultural patterns, saturation and lightness

### Takeaway
Palmer & Schloss's Ecological Valence Theory (PNAS 2010) explains about 80% of the variance in average colour preference by how much people like the objects associated with each colour. Blues and other "clean sky/water" colours tend to be liked, and browns and dark yellows ("feces, rotten food") tend to be disliked. For UI this is mild support for blue and saturated, clear accents, and against muddy olive and brown accents. It is an average, not a rule, and it is culture- and context-dependent.

### Cited Findings
- **[Measured]** Ecological Valence Theory says colour preferences arise from people's average affective responses to colour-associated objects. Browns are disliked through their association with feces and rotten food. — [Palmer & Schloss 2010, PNAS abstract (Wichita mirror)](https://psy311.wichita.edu/wp-content/uploads/2020/07/Palmer_PNAS_abstract_2010.pdf); [PNAS](https://www.pnas.org/doi/10.1073/pnas.0906172107)
- **[Measured]** The model predicts 80% of the variance in average colour-preference ratings from the "Weighted Affective Valence Estimates" (WAVEs) of correspondingly coloured objects. In the related conference work, 48 participants rated 32 chromatic colours from the Berkeley Color Project on a −100 to +100 scale. — [CIC 2010 (IS&T)](https://library.imaging.org/cic/articles/18/1/art00026); [SPIE 7527: Human preference for individual colors](https://www.spiedigitallibrary.org/conference-proceedings-of-spie/7527/752718/Human-preference-for-individual-colors/10.1117/12.849110.full)
- **[Measured]** Follow-up work from the same lab is available, including Schloss, Poggesi & Palmer (2011) on how social and institutional affiliation shifts preferences, for example university colours. It was not fetched in detail. — [Schloss, Poggesi & Palmer 2011 PDF](https://palmerlab.berkeley.edu/pdf/SchlossPoggesi&Palmer-2011.pdf); [Palmer & Schloss full paper PDF](https://palmerlab.berkeley.edu/pdf/Palmer%26Schloss%282010%29.pdf)
- **[Measured, marketing]** Labrecque & Milne (2012, *J. Academy of Marketing Science* 40(5):711–727) ran four studies mapping hue to brand-personality dimensions. Their title pairs red with "exciting" and blue with "competent", not "trustworthy". They also tested how saturation and value amplify these traits and how colour affects likability and familiarity. — [EconBiz record](https://econbiz.de/Record/exciting-red-and-competent-blue-the-importance-of-color-in-marketing-labrecque-lauren/10009997374)

### Inferences
- **Rule: blue is the statistically safest accent**, both for preference (EVT) and for "competent" brand perception (Labrecque & Milne). It is also the most common, so it is the least distinctive. The taste skill should present blue as the safe default, not the best choice.
- **Rule: avoid low-lightness, low-to-mid-chroma yellows and oranges (olive, mustard, brown) as primary accents** unless the brand intends earthy or organic warmth. EVT predicts these are the least liked on average.
- **Rule: accents read better as clear and saturated at moderate lightness than as muddy**, which echoes Stripe's "vibrant, not muddy" goal. Large surfaces should still stay low-chroma (see the previous section).
- Preference is shaped by object associations and group affiliation (Schloss et al. 2011), so brand context can override population averages.

### Gaps
- I could not access the PNAS full text (403) or PMC (CAPTCHA). The exact ranked colour list ("dark yellow least preferred", "saturated blue most preferred") and the main study's n are **not verified here**, though both are widely attributed to the paper.
- Cross-cultural replication data (for example Taniguchi et al., Japan) was not retrieved. No sourced claim about cross-cultural differences can be made from this session.
- Saturation and lightness preference effects (beyond Labrecque & Milne's amplification claim) were not quantified in the sources retrieved.

---

## Palette structure in top products: neutral-dominant, tinted neutrals, perceptual colour spaces, 12-step scales, semantic colours

### Takeaway
Leading systems build palettes in perceptually uniform spaces (CIELAB at Stripe, LCH at Linear, HCT/tonal palettes at Material). They do this so that a given lightness step has the same contrast across every hue. They generate full themes from very few inputs: Linear uses 3 (base, accent, contrast) instead of 98 hand-picked variables. Each hue is a functional scale with fixed roles per step, as in Radix's 12 steps. The result is a UI that is mostly neutral (backgrounds, borders, text) with one accent scale used sparingly.

### Cited Findings
- **[Vendor]** Stripe moved from HSL to CIELAB because HSL's lightness is not perceptual: at equal HSL lightness, blues look darker and yellows and greens look lighter. Every hue in Stripe's palette follows the *same lightness curve*, so a given level has the same contrast value whatever the hue. Any two colours **5+ levels apart pass small-text contrast**, and **4+ levels apart pass for icons and large text**. Text colours pass on white and on the lightest tint of every hue. For badges, they shift both background and text by one level rather than hand-tuning each pair. — [Stripe: Designing accessible color systems](https://stripe.com/blog/accessible-color-systems)
- **[Vendor]** Linear rebuilt theme generation in **LCH**, where red and yellow at L=50 look equally light. Each theme now comes from **3 inputs (base colour, accent colour, contrast)** instead of **98 variables**. The contrast input automatically produces high-contrast accessibility themes. — [Linear: How we redesigned the Linear UI](https://linear.app/now/how-we-redesigned-the-linear-ui); [Linear changelog 2020-12-04 (themes from background, text, accent)](https://linear.app/changelog/2020-12-04-themes)
- **[Vendor]** The Radix 12-step scale assigns a role to each step:
  1. app background
  2. subtle background
  3. UI element background
  4. hovered UI element
  5. active or selected element
  6. subtle border (non-interactive)
  7. interactive border
  8. strong border and focus ring
  9. solid background, the highest-chroma step for accents
  10. hovered solid
  11. low-contrast text (Lc 60)
  12. high-contrast text (Lc 90)

  — [Radix: Understanding the scale](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale)
- **[Vendor]** On dark themes, Material tints #121212 surfaces with a low-opacity overlay of the primary colour to make branded dark surfaces. This is a tinted neutral. — [Material dark theme (via search summary)](https://m2.material.io/design/color/dark-theme)
- **[Vendor]** Material 3 uses the HCT colour space and tonal palettes (tones 0–100). Its documentation page returned no content to the fetch tool, so details are not verified here. — [M3: How the color system works](https://m3.material.io/styles/color/system/how-the-system-works)

### Inferences
- **Rule: build scales in OKLCH (or LCH/CIELAB), never HSL.** Use a single lightness curve for all hues, so "step N on any hue" has a predictable contrast against white and against black. Then you can guarantee contrast by step distance, as Stripe does with 5+ steps for text and 4+ for icons.
- **Rule: use one neutral scale, one accent scale, and four semantic scales** (success green, warning amber/yellow, danger red, info blue). Map them to Radix-style roles. Steps 1–2 for page backgrounds, 3–5 for component fills and states, 6–8 for borders, 9–10 for solid accent fills, 11–12 for text.
- **Rule: proportions should be neutral-dominant.** A practical target is roughly 80–90% of the visible surface area in neutrals (steps 1–3 and 12), about 5–10% in neutral borders and secondary text, and accent (step 9) at around 5% or less, reserved for primary actions, selection and focus. These proportions are an inference from how Radix roles and Linear themes distribute colour. They are **not** a measured optimum. The often-quoted "60-30-10 rule" is interior-design folklore with no source found here.
- **Rule: tint the neutrals.** Shift greys slightly toward the accent hue or the brand's temperature, at very low chroma (about 0.005–0.02 in OKLCH). Material's primary overlay on #121212 and Linear's base-colour input both do this. It makes a palette feel intentional rather than default grey.
- **Rule: expose one contrast knob**, as Linear does, so high-contrast mode comes from the same generator rather than a separate theme.
- **Rule: semantic colour conventions.** Red means danger or destructive, amber or yellow means warning, green means success, blue means info or neutral-positive. Yellow and amber need dark text on top, because yellow at step 9 is too light for white text. In dark mode, use lighter, desaturated semantic tones.

### Gaps
- No primary measurement found of actual accent-to-neutral area ratios in top products. The 80–90% neutral figure above is an inference, not a measurement.
- Linear's exact LCH formulas and hex values were not published in the sources found.
- Material 3 HCT tone-to-role mappings (for example surface tones 98 and 6, on-surface 10 and 90) were not verified in this session because the fetch returned empty.
- The "60-30-10" rule has no credible origin found.

---

## Brand colour, trust and quality: credible research vs marketing myths

### Takeaway
Credible research shows that hue, saturation and value shift brand-personality perceptions: red reads as exciting and blue as competent. Fit between colour and the brand's positioning matters more than any fixed meaning. The widely quoted "62–90% of judgments are based on colour alone" comes from one 2006 literature review that itself stressed inconsistencies in colour psychology. It is routinely misquoted as "90% of buying decisions". Tidy "colour emotion" charts (green = calm, red = urgency, blue = trust) are not well supported.

### Cited Findings
- **[Literature review, often misused]** Singh (2006, *Management Decision*) states people form judgments within 90 seconds and that "about 62–90 percent" of the assessment is based on colour. The abstract also describes the field's inconsistencies and controversies. — [Singh 2006 PDF](https://newion.uwinnipeg.ca/~ssingh5/x/color.pdf); [Emerald record](https://emerald.com/insight/content/doi/10.1108/00251740610673332)
- **[Opinion, critique]** The range has been reduced to "90% of snap buying decisions" in marketing blogs, which changes "assessment" into "buying decisions". — [Wishpond (example of the misquote)](https://wishpond.com/blog/conversion-rate-optimization-chapter-9); [ReachLink critique](https://www.reachlink.com/advice/family-caretakers/color-psychology-marketing/)
- **[Opinion]** Popular colour-emotion infographics are largely unsupported. Colour works through *fit* with brand expectations and positioning. — [The Music Case: The Power of Color in Advertising](https://www.themusicase.com/?p=8103)
- **[Measured]** Labrecque & Milne (2012) ran four studies. Hue maps onto brand-personality dimensions (red = exciting, blue = competent), and saturation and value amplify these traits and affect likability and familiarity. — [EconBiz record](https://econbiz.de/Record/exciting-red-and-competent-blue-the-importance-of-color-in-marketing-labrecque-lauren/10009997374)

### Inferences
- **Rule: choose the accent by fit with the product's personality, not by a "colour meaning" chart.** Blue or indigo suits competent, utility or fintech products. Red, orange or magenta suits exciting, consumer or creative products. Keep it consistent.
- **Rule: perceived quality comes from restraint and consistency more than from hue.** Neutral-dominant palettes, perceptual scales and tested contrast are what top products share (see the palette section). This is an inference from vendor practice, not a measured causal claim.
- **Rule: never cite the "90%" statistic or similar colour-psychology numbers** in generated copy or design rationale.

### Gaps
- I found no rigorous study linking specific UI accent colours to *measured* trust or conversion in software products. A/B claims online (for example "red button +21%") are uncontrolled anecdotes and were not pursued.
- The full text of Labrecque & Milne (sample sizes, effect sizes) was not retrieved.
- The often-cited Ciotti (2014) critique was not verified from the original.
