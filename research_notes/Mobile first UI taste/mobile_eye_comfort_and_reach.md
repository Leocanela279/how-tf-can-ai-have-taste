# Mobile Visual Comfort and Physical Ergonomics: eye strain, contrast, type, field of view, reach, motion (as of late 2026)

Evidence tags used on every claim:
- **[STRONG]** peer-reviewed experiments or systematic reviews, or a normative standard (WCAG) quoted for what it requires.
- **[MODERATE]** a single peer-reviewed study, a large observational study, or an official platform guideline (Apple, Material).
- **[WEAK]** a small study, a secondary summary of a primary source I could not open, or expert or practitioner opinion.
- **[MYTH]** a popular claim that the evidence contradicts or does not support.
- **[DERIVED]** my own arithmetic from cited numbers. It is labelled so a script author can check the maths.

Method note: these hosts could not be reached from this session: ncbi.nlm.nih.gov, nngroup.com, uxmatters.com, w3.org and publications.aston.ac.uk. Many primary papers were therefore read through search-engine summaries of their abstracts. Where that is the case, the claim is tagged one level lower or flagged. WCAG and MDN references are to stable normative pages, cited from the standard text rather than re-fetched in this session.

Device reference used for the derived numbers: a 6.1-inch iPhone-class phone. The screen is about 65 x 141 mm, and the viewport is 393 CSS px wide, so 1 CSS px is about 0.165 mm. Larger 6.7–6.9-inch phones have about the same CSS px size, with a wider and taller viewport (about 430 x 932).

---

## 1. Digital eye strain on phones: causes, and which ones UI design can actually influence

### Takeaway
Digital eye strain (DES) is real and common. It comes from two groups of causes. The first is focusing and binocular load, which gets worse at the short phone viewing distance of about 32–36 cm and with small text. The second is dry eye, caused by blinking about half as often. Blue light is not a cause. A UI can influence text size, contrast, glare-producing luminance, flicker and flashing, and how hard the eyes have to work to track things. It cannot fix blink rate, session length or the display hardware's PWM.

### Cited Findings
- **[STRONG]** The prevalence of DES is estimated at 50% or more among computer users. Symptoms split into two groups: accommodative or binocular stress, and external dry-eye symptoms. Blink rate and blink completeness are used as objective fatigue indices, but they do not always correlate with subjective symptoms. — [Sheppard & Wolffsohn 2018, BMJ Open Ophthalmology 3:e000146 (PubMed abstract)](https://pubmed.ncbi.nlm.nih.gov/29963645/)
- **[MODERATE]** The 2023 TFOS Lifestyle report notes that DES prevalence of up to 97% has been reported, partly because there is no agreed definition. It is a systematic review of management options, and blinking is one of its key topics. — [TFOS Lifestyle: Impact of the digital environment on the ocular surface (Aston research portal)](https://research.aston.ac.uk/en/publications/tfos-lifestyle-impact-of-the-digital-environment-on-the-ocular-su/)
- **[MODERATE]** The AAO position, as reported in its November 2023 press coverage: screens do not damage eye health but can cause strain through overuse. Blink rate drops from about 15 to about 7 per minute while people look at screens. The AAO recommends the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds. — [HealthDay, citing an AAO release](https://www.healthday.com/health-news/eye-care/screens-are-everywhere-resolve-to-protect-your-vision); [ABC4, AAO spokesperson](https://www.abc4.com/news/its-not-blue-light-that-causes-eye-problem-its-overuse-says-aao/amp). These are secondary coverage. The AAO's own page was not reached.
- **[STRONG]** Phones are held closer than print. Mean working distance was **36.2 cm** for text messages (range 17.5–58 cm, n=129) and **32.2 cm** for web pages (range 19–60 cm, n=100), against about 40 cm for printed text. Mean font size was about 1.1 M for messages and **0.8 M** for web pages, which is comparable to newspaper print, but some subjects read much smaller text. The authors say the closer distance raises the demands on focusing and on eye coordination (vergence). — [Bababekova, Rosenfield, Hue & Huang 2011, Optometry and Vision Science (PubMed)](https://pubmed.ncbi.nlm.nih.gov/21499163/); [News-Medical summary](https://www.news-medical.net/news/20110713/Study-evaluates-viewing-distance-and-font-size-in-smart-phone-users.aspx)
- **[MODERATE]** A 2023 PLOS ONE follow-up (Boccardo, Gurioli & Grasso) measured smartphone viewing distance and character size across the lifespan, in 157 non-presbyopes and 60 presbyopes. Its numbers could not be retrieved in this session. — [PMC10096186](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10096186/)
- **[WEAK]** OLED phones dim by pulse-width modulation (PWM) at low brightness. The panel emits pulses of bright light to look dimmer. Some panels dim by lowering the current down to about 15–35% brightness and only use PWM below that. It is suspected, but not established in controlled studies, that PWM causes headaches in sensitive users. — [ElcomSoft blog (measurements, not a study)](https://blog.elcomsoft.com/2018/03/iphone-x-eye-strain-how-to-stop-oled-flickering-in-just-three-clicks/). I found no independent peer-reviewed study linking smartphone PWM to eye strain. The one paper sometimes cited is reportedly by an author employed at Samsung Display, which is a conflict of interest. — [ledstrain.org forum thread](https://ledstrain.org/d/2652-eyestrain-from-oled-monitorstvs-but-not-oled-smartphones-a-theory/25)

### Inferences
- **[DERIVED]** Sizes that UI controls (text, targets) matter more on phones than on desktop. The 32 cm distance is the reason: content of the same angular size has to be physically smaller, and the eye has to focus harder to see it.
- PWM is a hardware and OS concern. Web UI cannot fix it, but a page can avoid making it worse. Large, very dark full-screen surfaces at low system brightness are the conditions in which OLED panels PWM-dim the most. This is **speculative**, so it should not become a hard rule.
- What UI can influence: text size and x-height, contrast and polarity, overall screen luminance (large bright areas at night), saturated or vibrating colour pairs, flashing and motion, and support for user settings (text scaling, dark mode, reduced motion, increased contrast). What UI cannot influence: blink rate, session length, the display's flicker, or the user's uncorrected refractive error. Avoid "eye-comfort" claims that promise to fix these.

### Gaps
- No primary-source numbers for the 2023 lifespan study (PLOS ONE, PMC10096186) were available, because the host was blocked. Its finding on whether presbyopes hold phones further away is unknown.
- There is no controlled evidence quantifying how much a UI-level change, such as larger text, reduces DES symptoms on phones.
- PWM: no independent, peer-reviewed dose-response data was found.

---

## 2. Contrast and polarity: is maximum contrast tiring? Light vs dark mode, halation, OLED, near-black and off-white, APCA vs WCAG 2

### Takeaway
For people with normal vision, dark text on a light background (positive polarity) gives measurably better legibility and proofreading performance at every age. The advantage grows as text gets smaller. Light text on a dark background is least legible in a dark room, which is exactly where people turn on dark mode. Pure black on pure white is **not** shown to be tiring. Dark themes should use a dark grey base, desaturated accents and off-white text rather than pure white on #000. The aim is to reduce halation, not because "too much contrast" is proven harmful.

### Cited Findings
- **[STRONG]** Positive polarity (dark on light) was advantageous for both younger and older adults, and the authors recommend it for all ages. — [Piepenbrock, Mayr, Mund & Buchner 2013, Ergonomics 56(7):1116–1124 (via citation listing)](https://documentacion.fundacionmapfre.org/documentacion/publico/en/bib/150136.do)
- **[STRONG]** In a proofreading task at 8, 10, 12 and 14 pt, the positive-polarity advantage **increased linearly as character size decreased**. The authors advise avoiding negative-polarity displays especially at small sizes. — [Piepenbrock, Mayr & Buchner 2014, Human Factors, "Positive display polarity is particularly advantageous for small character sizes"](https://metatoc.com/papers/26930-positive-display-polarity-is-particularly-advantageous-for-small-character-sizes-implications-for-display-design)
- **[STRONG]** Glance-like reading (lexical decision) with two type sizes, both polarities, and near-dark vs daylight ambient light: **negative polarity under dark ambient was the least legible**. Positive polarity in the dark, and all conditions in bright light, did better. The proposed mechanism is that brighter light constricts the pupil, which reduces optical aberrations. — [Dobres, Chahine & Reimer 2017, Applied Ergonomics 60:68–73 (PubMed)](https://pubmed.ncbi.nlm.nih.gov/28166901/); [PMC5213401](https://pmc.ncbi.nlm.nih.gov/articles/PMC5213401)
- **[MODERATE]** The NN/g review of the academic literature concludes that light mode gives better performance for users with normal vision, regardless of age, and that dark mode may help some low-vision users, especially those with cloudy ocular media such as cataract. — [NN/g, "Dark Mode vs. Light Mode: Which Is Better?" (summary via aggregator)](https://gi-radar.de/tl/DC-0313); [original](https://www.nngroup.com/articles/dark-mode/), which was not reachable this session.
- **[WEAK]** Halation: bright text on a dark background appears to glow or bleed. This is reported as worse for people with astigmatism, for small type, in low light, and on long reading sessions. The proposed mechanism is the same pupil-dilation account. — [a11ywithdiana Substack](https://a11ywithdiana.substack.com/p/and); [raghuveerdotnet blog citing a UBC researcher](https://raghuveerdotnet.netlify.com/posts/darkmode). I found no controlled study isolating astigmatism and halation. Estimates of astigmatism prevalence **conflict** between secondary sources (about 30% vs about 50%), and no primary source was found.
- **[MODERATE]** Material's dark theme guidance recommends **#121212** dark grey rather than black as the base surface, because shadows and elevation stay visible. It says saturated colours "visually vibrate" against dark backgrounds and should be replaced by lighter, desaturated variants. Body text should reach at least 4.5:1 on the highest-elevation surface, which is why the base surface's contrast with white is about 15.8:1. — [Material Design 2, Dark theme](https://m2.material.io/design/color/dark-theme); [Google Codelab](https://codelabs.developers.google.com/codelabs/design-material-darktheme/). The often-repeated "use tone 200 of your palette" rule comes only from a third-party article ([UX Planet](https://uxplanet.org/8-tips-for-dark-theme-design-8dfc2f8f7ab6)) and is **unverified** against Material's own text.
- **[WEAK]** A 1980 study (Bauer & Cavonius) is widely quoted as finding 26% more reading accuracy with dark characters on a light background. It is cited secondhand only and was not verified. — [summary in search coverage, e.g. a11ywithdiana](https://a11ywithdiana.substack.com/p/and)
- **[STRONG, normative]** WCAG 2.2 SC 1.4.3 (AA) requires a contrast ratio of 4.5:1 for normal text and 3:1 for large text (at least 24 px regular or about 18.66 px bold). SC 1.4.6 (AAA) requires 7:1 and 4.5:1. — [WCAG 2.2](https://www.w3.org/TR/WCAG22/#contrast-minimum)
- **[MODERATE]** APCA (Myndex) scores contrast as Lc and ties it to size and weight. **Lc 75** is the minimum for columns of body text no smaller than **18 px/400**, and **Lc 90** is preferred for fluent body text at **14 px/400** or larger. For body text, add Lc 15 to any lookup value below Lc 75. The body-text target was changed from 80 to 75 during development. — [Myndex apca-w3 README](https://github.com/Myndex/apca-w3); [Myndex "Why APCA"](https://www.github.com/Myndex/SAPC-APCA/blob/master/documentation/WhyAPCA.md); [Myndex gist on polarity](https://gist.github.com/Myndex/c30dba273aa5eca426ad9f5200917c9d)
- **[MODERATE]** APCA is **not** part of any normative WCAG standard. WCAG 3 is still a draft. — [Washington Post design-system write-up](https://steve-frenzel.statichost.eu/posts/learning-about-perceptual-contrast)

### Inferences
- **[MYTH] "Dark mode is easier on the eyes"** is a myth as a universal claim. For normal-vision reading, especially of small text and in a dark room, the evidence favours light mode. Dark mode is legitimate as a user preference, for comfort in a dark room (less total light), for some low-vision users, and to save OLED battery. It should be offered and respected, but it is not "healthier".
- **[MYTH-ish, WEAK] "Pure #000 on #FFF is too harsh and tiring."** No controlled evidence shows that maximum contrast causes fatigue in positive polarity. Piepenbrock and Dobres show higher-legibility conditions win. Softening to something like #111–#1A1A1A on #FFF–#FAFAFA is a harmless aesthetic choice that keeps contrast at about 17–19:1. It is not an eye-health requirement. The real comfort issue is a large bright screen against a dark surround, which is a luminance-adaptation problem, not a text-contrast problem.
- In **dark** themes, the evidence-informed defaults are as follows. Base surface #121212–#1C1C1E, not #000 for reading surfaces; #000 is fine for OLED chrome or immersive media. Body text off-white at roughly #E6E6E6–#EDEDED, or white at about 87% opacity, giving about 13–15:1 on #121212 **[DERIVED]**. Secondary text no lower than WCAG 4.5:1. Accents desaturated, light tints. Avoid hairline or thin (≤300) weights for small light-on-dark text, because halation and the polarity penalty both grow at small sizes. That last point is an inference from Piepenbrock 2014 plus the halation mechanism, and is not directly tested.
- **WCAG 2 vs APCA on mobile:** WCAG 2's ratio is the legal and compliance floor and the thing a script must check. APCA is better at catching two failures WCAG 2 misses: thin or small light-on-dark text that passes 4.5:1, and mid-tone pairs such as white on orange that WCAG 2 over- or under-rates. Recommended practice: **gate on WCAG 2 AA, and warn on APCA**. Warn when body text is below Lc 75 at 16–18 px, or below Lc 90 at 14 px.
- In sunlight, reflected ambient light adds roughly equal luminance to text and background, which compresses the effective contrast ratio **[DERIVED from the definition of contrast ratio (L1+0.05)/(L2+0.05)]**. Design body text with headroom (aim for 7:1 or more) so it survives glare. Dobres 2017 suggests positive polarity under bright light is robust.

### Gaps
- No controlled study was found that directly tests "maximum vs softened contrast" for comfort or fatigue (as opposed to legibility) on phones.
- No primary study was found on astigmatism and halation in UI reading. The prevalence figures conflict.
- NN/g's 2020 article could not be read directly. Whether it gives specific near-black or off-white hex values could not be verified.
- Material 3's current dark-scheme tone values (surface tones) were not verified this session. Only the Material 2 page was summarised.

---

## 3. Saturated colours, vibrating combinations, large bright areas, pure-colour backgrounds

### Takeaway
Fully saturated hues, especially red next to blue (or red next to green), cause chromostereopsis: a depth shift that makes edges "vibrate" and is tiring to read. Saturated blue text is the hardest to focus on, particularly on dark backgrounds. Use saturated colour for small accents. Never use it for body text, and never for full-bleed reading backgrounds.

### Cited Findings
- **[MODERATE]** In chromostereopsis, red tends to look nearer and blue further away. The effect is strongest for red and blue but also occurs with red and green. The combinations are "hard and tiring to look at or read". — [Weinschenk, 100 Things Every Designer Needs to Know About People, ch. 10](https://www.oreilly.com/library/view/100-things-every/9780136746959/ch10.xhtml); [Weinschenk blog](https://www.blog.theteamw.com/2009/11/09/100-things-you-should-know-about-people-9-chromostereopsis-is-hard-on-the-eyes/)
- **[WEAK]** The cause is not fully settled, and the direction of the effect varies between people: some see blue as nearer. — [Gizmodo](https://gizmodo.com/why-certain-color-combinations-drive-your-eyeballs-craz-5974960)
- **[WEAK]** In a small study of 30 young adults reading on dark-themed screens, saturated **blue** text induced the largest accommodative lag (0.61 D) and was rated the most distant and hardest to read. Yellow was rated the easiest. The authors advise avoiding saturated short-wavelength text. — summarised in [search coverage of a chromostereopsis/accommodation study](https://www.arxiv.org/pdf/2503.03968). Note: the arXiv preprint at that URL proposes using chromostereopsis in chat UIs and states that its comfort is **unvalidated**. The 30-subject figures come from the search summary and could not be tied to a confirmed primary source.
- **[MODERATE]** Saturated colours "vibrate" against dark backgrounds, so dark themes should use desaturated, lighter variants. — [Material Design 2, Dark theme](https://m2.material.io/design/color/dark-theme)

### Inferences
- Rules:
  - (a) No body or paragraph text in fully saturated hues. Check: OKLCH chroma of text colours should be low, for example C ≤ 0.10 for body text.
  - (b) Never place saturated red adjacent to saturated blue or green as text and background, or at thin boundaries.
  - (c) In dark mode, reduce accent chroma and raise lightness. Light tints are needed to keep contrast in any case.
  - (d) Large saturated full-bleed backgrounds behind reading text should be avoided. Saturated colour belongs to small areas such as buttons, badges and charts.
- Large bright areas: on a phone at night, a mostly white screen raises total retinal illuminance against a dark surround. This is the legitimate comfort case for offering dark mode or respecting `prefers-color-scheme` **[DERIVED and plausible; not directly measured in sources found]**.

### Gaps
- No peer-reviewed work was found that quantifies a "safe" chroma threshold for text, or the fatigue effect of large saturated backgrounds on phones. The OKLCH chroma threshold above is a heuristic, not an evidence-based limit.

---

## 4. Blue light: myth vs real

### Takeaway
**[MYTH]** Blue light from phone screens does not damage the eye and does not cause digital eye strain. Blue-filtering glasses probably make no difference to eye strain. UI design should not build "blue light reduction" features or claims. Late-night circadian effects come from overall light exposure and use, and the evidence there is mixed. That is the OS's job (Night Shift), not the page's.

### Cited Findings
- **[STRONG]** Cochrane 2023 (Singh, Downie et al.): 17 RCTs from six countries, with 5–156 participants and follow-up from 1 day to 5 weeks. There may be **no short-term advantage** of blue-light-filtering lenses over non-filtering lenses for computer-related visual fatigue. Effects on sleep and vision quality are unclear, and nothing can be concluded about long-term retinal health. Certainty is limited. — [City St George's news release](https://www.citystgeorges.ac.uk/news-and-events/news/2023/08/blue-light-filtering-spectacles-probably-no-difference-eye-strain-visual-performance-sleep-quality); [Ophthalmology Times](https://ophthalmologytimes.com/view/cochrane-review-blue-light-filtering-glasses-show-inconclusive-outcomes)
- **[MODERATE]** The AAO position, as reported: there is no meaningful link between screen blue light and retinal damage or AMD, and blue light does not contribute to screen-related eye strain. Strain comes from overuse and reduced blinking. — [HealthDay citing AAO](https://www.healthday.com/health-news/eye-care/screens-are-everywhere-resolve-to-protect-your-vision)

### Inferences
- A taste skill should **not** generate warm or sepia "eye-saver" palettes as a health feature. The defensible reasons for warmer night palettes are aesthetic preference and lower overall luminance. Respect the OS (Night Shift, `prefers-color-scheme`) rather than tinting pages.
- A separate and real issue is that saturated blue *text* is hard to focus on (section 3). This is about colour and accommodation, not "blue light harm".

### Gaps
- Evidence on whether screen settings such as Night Shift affect sleep was not researched in depth this session. I found no source to cite either way.

---

## 5. Typography for comfort at phone distance

### Takeaway
Reading speed is maximal for an x-height subtending about **0.2° to 2°** of visual angle. The lower edge, the critical print size, is about 0.2° (about 12 arcmin). At a 32 cm phone distance, **16 CSS px** text with a typical sans x-height lands at about 0.24°, just above the critical size. 14 px sits at the edge, and 11–12 px falls below it. So 16 px is the right floor for body text on mobile, and anything smaller must be short, glanceable labels. Larger x-height fonts help most at small sizes.

### Cited Findings
- **[STRONG]** The "fluent range" for maximum reading speed is about **0.2°–2° of angular x-height**. At 40 cm that is an x-height of 1.4 mm (about 4 pt) to 14 mm (about 40 pt). Print sizes in publications sit within this range. — [Legge & Bigelow 2011, "Does print size matter for reading?", Journal of Vision (PDF)](https://legge.dl8.umn.edu/sites/legge.psych.umn.edu/files/2020-08/Legge%20Bigelow%202011%20Does%20size%20matter%20for%20reading%3F%20A%20review%20of%20findings%20from%20vision%20science%20and%20typography.pdf)
- **[MODERATE]** The critical x-height is about 1.5 mm at 40 cm, which is about 0.21°. Reading speed is roughly constant between 0.2° and 2° and drops significantly below the critical size. — [secondary summary citing Legge 2006 and Rubin et al. 2006 (W3C low-vision list)](https://lists.w3.org/Archives/Public/public-low-vision-a11y-tf/2019Sep/0040.html)
- **[STRONG]** Fonts differ at small sizes. Courier's critical print size was about 0.06 logMAR smaller than Times, and below the critical size Times was read up to 50% slower. — [Mansfield, Legge & Bane 1996 (PDF)](https://legge.dl8.umn.edu/sites/legge.psych.umn.edu/files/files/media/mansfield96_psychophysics_of_reading_xv-_font_effects_in_normal_and_low_vision.pdf)
- **[WEAK]** Larger x-height improved reading speed only at small print sizes, by about 248 vs 232 WPM. The effect disappeared at larger sizes. — [Sawyer et al. 2025, VSS abstract](https://www.visionsciences.org/presentation/?id=2645)
- **[STRONG]** Measured phone use: web pages were read at a mean of 0.8 M at 32.2 cm. — [Bababekova et al. 2011](https://pubmed.ncbi.nlm.nih.gov/21499163/)
- **[MODERATE]** Apple's HIG ties text styles to Dynamic Type and says to keep a minimum size most people can read easily. Its spec table's smallest styles (Caption 1 and 2) are **11 pt**. Body at the default "Large" setting is 17 pt; at xSmall, body is 14 pt with 19 pt leading. — [Apple HIG, Typography](https://developer.apple.com/design/human-interface-guidelines/typography). Note: the search summary confirmed the 11 pt caption and the 14 pt xSmall body. The **17 pt default body is standard HIG knowledge but was not re-confirmed this session**.
- **[STRONG, normative]** WCAG 2.2 SC 1.4.12 Text Spacing requires content to survive user overrides without loss: line-height 1.5x, paragraph spacing 2x, letter-spacing 0.12 em and word-spacing 0.16 em. SC 1.4.4 requires text to be resizable to 200%. — [WCAG 2.2](https://www.w3.org/TR/WCAG22/#text-spacing)

### Inferences
- **[DERIVED]** These figures assume 1 CSS px is about 0.165 mm, a 32 cm distance, and a sans x-height of about 0.52 em.

  | CSS font size | x-height (mm) | Visual angle at 32 cm | Verdict vs about 0.2° critical print size |
  |---|---|---|---|
  | 11 px | ~0.94 | ~0.17° (10 arcmin) | below CPS → labels only |
  | 12 px | ~1.03 | ~0.18° (11 arcmin) | below CPS → captions only |
  | 14 px | ~1.20 | ~0.21° (13 arcmin) | at CPS → secondary text, short |
  | 16 px | ~1.37 | ~0.25° (15 arcmin) | above CPS → **body floor** |
  | 17–18 px | ~1.5 | ~0.27° | comfortable body (iOS default) |

  Bababekova's measured mean of 0.8 M at 32.2 cm works out to about 0.21° **[DERIVED: 1 M has an x-height of about 1.45 mm]**. Users already read web pages at about the critical size, so there is no margin for going smaller.
- Rules:
  - Body text at **≥ 16 px**. Prefer 17–18 px for long reading.
  - Never below **12 px** for any text, and use 11–12 px only for non-essential metadata.
  - Prefer fonts with a generous x-height (about 0.5 em or more) for UI text.
  - Body line-height **1.4–1.6**.
  - Do not tighten letter-spacing below 0 at body sizes. Negative tracking belongs to display sizes of 28 px and up. This is a practitioner convention, and only weak evidence supports it.
  - Use `rem`, not px-locked type, so Dynamic Type and Android font scale work. Ensure layouts survive 200% text and the WCAG 1.4.12 spacing overrides.
- Thin weights: at 14–16 px, avoid weights of 300 or lighter, especially in light-on-dark. Thin strokes reduce effective contrast, which WCAG 2's ratio ignores and APCA partially captures. This is an inference, not directly tested in the sources.

### Gaps
- There is no direct experimental study of a minimum CSS px size on phones. The table is derived from vision-science angles and a reference device.
- Letter-spacing and line-height evidence specific to phones was not found in this session. The values given are normative (WCAG) floors or practitioner conventions.
- Presbyopic users, who are most adults over 45, have larger critical print sizes. Lifespan data (PLOS ONE 2023) could not be retrieved.

---

## 6. Field of view and gaze on a phone

### Takeaway
At 32–36 cm, a 6.1-inch phone screen subtends about **10–12° wide by 22–25° tall**. The fovea, about 2°, resolves only about 6–8 characters per fixation, which is roughly a 68–76 CSS px wide disc. The parafovea, out to about 5° from fixation (about a 10° disc), roughly spans the **whole screen width**. So users perceive the full width and layout of a row at a glance, but must make several fixations to read it. Vertically, the screen is about two to two-and-a-half parafoveal discs tall. People look and tap mostly in the **centre** of the screen. F-pattern scanning exists on mobile, but it is a symptom of unformatted text, not a law.

### Cited Findings
- **[STRONG]** In reading, the fovea is the central 2° (about 6–8 characters). The parafovea runs from 2° to 5° (about 15–20 characters). Beyond 5° is the periphery. The English perceptual span runs from about 3 characters left to about 14 characters right of fixation, and it is limited by attention rather than acuity. — [Balota & Rayner 1991, as summarised in reading-research papers (Bournemouth eprint)](https://eprints.bournemouth.ac.uk/22094/1/lastreviewerversion.pdf); [Psychonomic Society / Springer](https://link.springer.com/content/pdf/10.3758/s13414-011-0219-2.pdf)
- **[MODERATE]** NN/g eye-tracking found the F-shaped scanning pattern "alive and well" on both desktop and mobile. It is one of several patterns and appears when text lacks formatting cues. — [NN/g, F-shaped pattern](https://nngroup.com/articles/f-shaped-pattern-reading-web-content/)
- **[MODERATE]** A peer-reviewed mobile eye-tracking study found users search mobile pages in a **"railroad-like"** (vertical, column-following) pattern rather than an F. A mobile convention map predicted where attention first landed, and visual saliency predicted later selection. — [SN Computer Science, doi:10.1007/s42979-020-00166-3](https://doi.org/10.1007/s42979-020-00166-3)
- **[MODERATE]** Hoober's heuristic, based on observation: "People look at the center of the screen." Keep key content in the middle, and add bottom padding so the last content can be scrolled up to the middle of the viewport. — [Hoober, UXmatters, "Design for Fingers, Touch and People, Part 3" (2017)](https://www.uxmatters.com/mt/archives/2017/07/design-for-fingers-touch-and-people-part-3.php), via search summary.

### Inferences
- **[DERIVED]** These figures are for a 6.1-inch phone (about 65 x 141 mm):
  - At 32 cm it subtends about 11.6° x 24.8°. At 36 cm, about 10.3° x 22°.
  - 2° at 32 cm is about 11 mm, or about 68 CSS px.
  - A 10° parafoveal disc is about 56 mm, or about 340 CSS px, which is close to the 393 px viewport width.
  - A 6.9-inch phone is about 12.5° wide at 32 cm.
- Layout rules that follow:
  - (a) A single text column using the full width minus about 16–24 px gutters is right on phones. Line length naturally lands at about 35–45 characters at 16–17 px, which suits one to two parafoveal spans. Do not create multi-column text.
  - (b) Put the content of a screen's purpose (headline, key number, primary content) in the **upper-middle to centre band** of the first viewport, because that is where gaze rests.
  - (c) Left-align body text and front-load key words in headings and list items, because both F and "railroad" scanning anchor on the left edge.
  - (d) Use strong formatting cues (subheads, bold lead-ins, short paragraphs) to break the F-pattern.
  - (e) Provide end-of-page bottom padding so the last item can scroll to mid-viewport, as Hoober advises.
- **[MYTH]** "Users only see the top of the screen" and "the F-pattern is how users read" are both overstatements. Attention follows conventions and saliency. On phones, users scroll content into the centre.

### Gaps
- NN/g's mobile-specific eye-tracking figures (for example, the share of fixations in the top vs centre of a phone viewport) could not be retrieved, because nngroup.com was blocked. I have no reliable percentage to cite.

---

## 7. Thumb zone and reach: how people hold phones, and where primary actions go

### Takeaway
Hoober's observational data (about 1,333 people observed, 780 touching) shows grips are mixed and change constantly: about **49% one-handed, 36% cradled, 15% two-handed**. The popular thumb-zone heat map is an oversimplification that Hoober himself calls wrong. The robust findings are: people **look at and touch the centre** most often, fastest and most accurately; accuracy degrades at the edges and corners, so targets there must be bigger; and on large phones people simply change grip to reach the top. Primary actions should sit in reachable, high-accuracy positions (centre or bottom band, full-width or large). Secondary actions go at the edges, and tertiary ones behind menus.

### Cited Findings
- **[MODERATE]** Hoober observed 1,333 people, of whom 780 were touching the screen: **49% one-handed, 36% cradled, 15% two-handed**. Among one-handed users, 67% used the right thumb and 33% the left. Grips shift often during a task. — [Hoober, "How Do Users Really Hold Mobile Devices?" UXmatters 2013](https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php); [A List Apart, "How We Hold Our Gadgets"](https://hn.jakechampion.name/reader/http://alistapart.com/article/how-we-hold-our-gadgets). Some secondary sources give the two-handed share as 10%, which is a **conflict**; the UXmatters original reports 15%.
- **[MODERATE]** The widely quoted "75% of interactions are thumb-driven" is misleading, because only 49% hold one-handed and 36% cradle and tap with the other hand. Osmani advises not relying on the thumb-zone chart. — [Addy Osmani, "Modern Touch-Friendly Design" (2020, summarising Hoober)](https://addyosmani.com/blog/touch-friendly-design/)
- **[MODERATE]** Hoober's guidance: primary content and actions in the **centre**, secondary actions and tabs along the **edges**, tertiary functions behind menus. People view and touch the centre most, fastest and most accurately. — [Osmani](https://addyosmani.com/blog/touch-friendly-design/); [Hoober, UXmatters Part 3](https://www.uxmatters.com/mt/archives/2017/07/design-for-fingers-touch-and-people-part-3.php)
- **[MODERATE]** Location-dependent minimum target sizes from Hoober: **7 mm centre, 9 mm edges, 12 mm corners**. — [Hoober, via search summary of his site and Medium post](https://medium.com/@shoobe01/44-px-why-apple-is-wrong-6bd6f6846871). Smashing Magazine instead gives **11 mm top and 12 mm bottom** (7 mm centre). — [Smashing, "Accessible Target Sizes Cheatsheet" (2023)](https://www.smashingmagazine.com/2023/04/accessible-tap-target-sizes-rage-taps-clicks?ref=refind). This is a **conflict on the edge value** (9 vs 11 mm). Both agree that edges and corners need larger targets than the centre.
- **[STRONG, older]** In a 1990 touch-kiosk experiment, people tended to touch below the target, and the offset grew lower on the screen. — [Virginia Tech, "Effect of Touch Screen Target Location on User Accuracy"](https://vtechworks.lib.vt.edu/items/21500364-6c06-4f4f-bb1a-a9876f6ea38a). This was a kiosk, not a phone, so it transfers to phones only partly.
- **[WEAK]** On phones larger than about 4 inches, one-handed users stretch past their comfort zone to reach top controls. A 2016 paper notes users cannot reach the whole screen with the thumb. — [Gizmodo](https://gizmodo.com/were-designing-apps-wrong-for-huge-smartphones-1651751412); [ACM 10.1145/2971485.2971562 (Unpaywall)](https://unpaywall.org/10.1145%2F2971485.2971562)
- **[STRONG, normative]** WCAG 2.2 SC 2.5.8 Target Size (Minimum, AA) requires targets of at least **24 x 24 CSS px**, or enough spacing. SC 2.5.5 (AAA) requires 44 x 44. Platform guidelines: Apple 44 x 44 pt, Material 48 x 48 dp. — [WCAG 2.2](https://www.w3.org/TR/WCAG22/#target-size-minimum); Apple and Material values are standard platform guidance and were not re-fetched this session.

### Inferences
- **[DERIVED]** At about 0.165 mm per CSS px: 7 mm is about **42 px**, 9 mm about **55 px**, 11–12 mm about **67–73 px**. Note that Smashing's "7 mm = 27 px" uses the desktop reference pixel (1/96 inch), which **does not apply to phone CSS pixels**. Scripts should use phone CSS px.
- Rules:
  - (a) Interactive targets **≥ 44 x 44 CSS px** everywhere, which is also Apple's minimum and above the WCAG AA floor of 24.
  - (b) Targets in the top bar, bottom bar or corners **≥ 48 px tall**, with spacing of at least 8 px.
  - (c) The single primary action goes in the lower-middle band as a large or full-width button, or in a sticky bottom bar. Do not put it in a top corner.
  - (d) Destructive actions should not sit in the easiest-to-hit spot next to the primary action.
  - (e) Top-corner placement is acceptable for infrequent or secondary actions such as settings and close, because users re-grip.
  - (f) On tall phones, put navigation tabs in a bottom bar (an edge, so make them large), and keep frequently used filters reachable or repeat them lower down.
- **[MYTH]** "Thumb-zone heat map = where to put things" and "75% of people use one thumb" are myths as literal rules. Reach matters, but grip varies by task, phone size and posture, and the centre is the best-performing region for both viewing and touch.

### Gaps
- No 2024–2026 update of Hoober's grip data was found. The data is from 2013–2014, on phones of about 5 inches. Grip distributions on today's 6.1–6.9-inch phones are not measured in any source I found.
- The edge value conflicts (9 mm vs 11 mm) and could not be resolved without access to Hoober's book.

---

## 8. Motion comfort: vestibular disorders, reduced motion, parallax, flashing

### Takeaway
Large motion across the visual field (parallax, scroll-jacking, big zooms and slides) can trigger dizziness, nausea and headaches in people with vestibular disorders. Flashing more than 3 times per second above threshold is a seizure risk, and it is a WCAG Level A failure. On a phone at 32 cm, almost any full-screen element counts as "large" in the visual field, so treat it that way.

### Cited Findings
- **[STRONG, normative]** WCAG SC 2.3.1 (Level A): nothing flashes more than **three times in any one-second** period, unless the flash is below the general flash and red flash thresholds. — [getstark WCAG explained](https://www.getstark.co/wcag-explained/operable/seizures-and-physical-reactions/); [WCAG 2.2](https://www.w3.org/TR/WCAG22/#three-flashes-or-below-threshold). From the WCAG definition (standard text, not re-fetched): a "general flash" is a pair of opposing luminance changes of 10% or more where the darker state is below 0.80 relative luminance, and the combined area exceeds about 0.006 steradian within any 10° visual field.
- **[STRONG, normative]** WCAG SC 2.3.3 Animation from Interactions (AAA): motion animation triggered by interaction can be disabled unless it is essential. The rationale is that people with vestibular disorders can get vertigo, nausea or headaches when content of significant size moves across the visual field. — [dock.codes WCAG 2.3.3](https://wcag.dock.codes/documentation/wcag-success-criteria/wcag233/); [Stark](https://www.getstark.co/wcag-explained/operable/seizures-and-physical-reactions/). WCAG SC 2.2.2 Pause, Stop, Hide (A) covers auto-moving content that lasts more than 5 seconds. — [WCAG 2.2](https://www.w3.org/TR/WCAG22/#pause-stop-hide)
- **[STRONG, normative]** The CSS media query `prefers-reduced-motion: reduce` exposes the OS "Reduce Motion" setting (iOS, Android "Remove animations", macOS, Windows). — [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) (standard reference, not re-fetched this session).

### Inferences
- **[DERIVED]** A 10° field at 32 cm is about 56 mm, which is close to the full width of a phone. So any flashing element that covers about a quarter of the screen width or more can exceed the area threshold. Rule: **no flashing or strobing at all** in generated UI. Script check: no CSS animation that alternates large luminance changes with a period under 333 ms.
- Rules:
  - (a) Wrap every non-essential animation (parallax, scroll-linked transforms, auto-carousels, large page transitions, background video) in `@media (prefers-reduced-motion: no-preference)`. Under `reduce`, replace with opacity fades or no motion.
  - (b) Avoid parallax and scroll-jacking on mobile by default, because the screen is a large part of the visual field.
  - (c) Auto-playing motion longer than 5 s needs a pause control.
  - (d) Keep UI transitions short (about 150–300 ms) and small in travel distance. This is a practitioner convention and is not sourced here.

### Gaps
- I did not find peer-reviewed dose-response data on parallax or scroll-linked motion and vestibular symptoms on phones. The guidance is normative (WCAG) and clinical-anecdotal.
- The W3C Understanding document for 2.3.3, which explicitly discusses parallax, could not be fetched.

---

## 9. Reading in different environments, and system settings to respect

### Takeaway
In bright surroundings, every polarity becomes more legible and positive polarity is robust. In a dark room, light-on-dark text is the *least* legible, even though dark mode lowers total light and is preferred by many users. The UI cannot know the environment, but the OS does. So the page should honour `prefers-color-scheme`, `prefers-contrast`, `prefers-reduced-motion` and OS text scaling, and keep enough contrast headroom for sunlight.

### Cited Findings
- **[STRONG]** Bright, daylight-like ambient light made all polarity conditions more legible. Negative polarity under dark ambient was the least legible. Pupil constriction reducing aberrations is the proposed reason. — [Dobres et al. 2017, Applied Ergonomics](https://pubmed.ncbi.nlm.nih.gov/28166901/)
- **[MODERATE]** Apple: using system text styles gives Dynamic Type and larger accessibility sizes automatically. — [Apple HIG, Typography](https://developer.apple.com/design/human-interface-guidelines/typography); [UIKit "Scaling fonts automatically"](https://developer.apple.com/documentation/uikit/scaling-fonts-automatically.md)
- **[STRONG, normative]** WCAG 1.4.4: text can be resized to 200% without loss of content or function. WCAG 1.4.10 Reflow: no two-dimensional scrolling at 320 CSS px width. — [WCAG 2.2](https://www.w3.org/TR/WCAG22/#resize-text)
- **[STRONG, normative]** CSS user-preference media queries: `prefers-color-scheme`, `prefers-contrast` (more or less), `prefers-reduced-motion`, `prefers-reduced-transparency`, and `forced-colors`. — [MDN, CSS media features](https://developer.mozilla.org/en-US/docs/Web/CSS/@media#media_features) (standard reference, not re-fetched).

### Inferences
These rules consolidate sections 1–9 into checks a script can run. Each rule says whether it is evidence-based, derived or normative.

| # | Rule | Basis | Script check |
|---|---|---|---|
| R1 | Body text ≥ 16 CSS px; no text < 12 px; 11–12 px only for non-essential metadata | Legge CPS about 0.2° + Bababekova distance [DERIVED] | computed `font-size` per text node |
| R2 | Body text sizes in `rem`/`em`, not fixed px; the layout survives 200% text and the WCAG 1.4.12 spacing overrides | WCAG 1.4.4 / 1.4.12 | lint for px `font-size` on body; Playwright test at 200% zoom with no horizontal scroll |
| R3 | Body line-height 1.4–1.6; letter-spacing ≥ 0 below 20 px | WCAG 1.4.12 floor + convention [WEAK] | computed style |
| R4 | Text contrast ≥ 4.5:1 (normal) or ≥ 3:1 (large, ≥ 24 px or ≥ 18.66 px bold) as a hard gate; aim ≥ 7:1 for body (sunlight headroom) | WCAG 1.4.3 / 1.4.6; derived glare argument | WCAG 2 ratio |
| R5 | APCA warning: body text Lc ≥ 75 at ≥ 18 px/400, or Lc ≥ 90 at 14–16 px/400 | Myndex [MODERATE, non-normative] | APCA-W3 `APCAcontrast()` |
| R6 | Light theme default for long reading; offer dark via `prefers-color-scheme` | Piepenbrock 2013/2014, Dobres 2017 [STRONG] | presence of a `prefers-color-scheme: dark` block |
| R7 | Dark theme: base surface not #000 for reading surfaces (L* about 7–12, for example #121212–#1C1C1E); text off-white (about #E6–#ED, not #FFF); accents desaturated | Material [MODERATE]; halation [WEAK] | flag `background:#000` + `color:#fff` text pairs; flag text with OKLCH C > 0.12 on a dark bg |
| R8 | No font-weight ≤ 300 for text < 20 px, especially on dark backgrounds | Inference from Piepenbrock 2014 + halation | computed weight vs size |
| R9 | No saturated red adjacent to saturated blue or green (text/bg or thin borders); no saturated-blue body text on dark | Chromostereopsis [MODERATE/WEAK] | hue-pair check on text/bg with chroma above threshold |
| R10 | Key content and the primary action in the centre or lower-middle of the first viewport; bottom padding so the last item can reach mid-viewport | Hoober [MODERATE] | screenshot heuristic: primary CTA bounding box not in the top 15% corners |
| R11 | Targets ≥ 44 x 44 CSS px; ≥ 48 px in top or bottom bars and corners; ≥ 8 px gap | WCAG 2.5.8 (24 floor), Apple 44 pt, Hoober location sizes [DERIVED] | element bounding boxes for `a, button, [role=button], input` |
| R12 | Single-column text on phones; gutters 16–24 px | FOV derivation [DERIVED] | layout check at 390 px width |
| R13 | All non-essential motion inside `prefers-reduced-motion: no-preference`; no parallax or scroll-jacking by default on mobile | WCAG 2.3.3, vestibular rationale | lint CSS/JS for animations outside the media query |
| R14 | No flashing more than 3 times per second; no auto-motion over 5 s without pause | WCAG 2.3.1, 2.2.2 | animation-duration and keyframe luminance check |
| R15 | Respect `prefers-contrast: more` (raise contrast, remove translucency) and `forced-colors` | MDN/CSS spec | presence of media blocks |
| R16 | Do not market or design "blue-light-safe"/sepia palettes as an eye-health feature | Cochrane 2023, AAO [STRONG/MODERATE] | n/a, a copy and taste rule |

Myths to keep out of the skill:
- "Blue light from screens harms eyes or causes strain" **[MYTH]**.
- "Dark mode is better for your eyes" **[MYTH as a universal claim]**.
- "Pure black on white is tiring" **[UNSUPPORTED]**.
- "75% of users use one thumb" **[MYTH/misread]**.
- "Thumb-zone heat map dictates layout" **[OVERSIMPLIFIED]**.
- "Users only read in an F" **[OVERSIMPLIFIED]**.

### Gaps
- No controlled study on reading phones in direct sunlight was found. The sunlight contrast-headroom rule is derived from the contrast-ratio formula, not measured.
- Android's equivalents (font scale, "Remove animations", high-contrast text) are expected to map to the same CSS media features in Chrome, but this was not verified this session.
- Several primary sources (NN/g, UXmatters, PMC, W3C Understanding docs, the Sheppard & Wolffsohn full text) were blocked. A follow-up pass with those domains allowed should confirm: Hoober's exact edge and corner sizes, NN/g's mobile fixation distributions, the AAO's exact wording, and the 2023 lifespan viewing-distance numbers.
