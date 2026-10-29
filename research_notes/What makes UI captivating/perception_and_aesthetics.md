# Perception and aesthetics: what empirically makes a UI look beautiful, high-quality or "wow"

Labels used on every claim: **[measured]** = a primary empirical study (sample size given where found); **[review]** = a meta-analysis, literature review or theory paper that summarizes several studies; **[opinion]** = practitioner or journalist view, or a secondary summary I could not check against the original. "Unverified" means I saw the number only in a secondary source.

Research date: 2026-10-29. Most sources are abstracts, publisher pages or full texts I could open. Where I only saw an abstract, I say so.

---

## 1. First-impression studies: what predicts liking at 17–500 ms, and how big are the effects?

### Takeaway
People judge a site's visual appeal in 17–50 ms, and those snap judgements largely match judgements made with more time. The two best-replicated predictors are **visual complexity** (lower is liked more, measured as text groups, image areas and layout leaves) and **prototypicality** (looking like a typical site of its category). Colorfulness also matters, and its ideal level varies by audience. Simple image metrics (complexity and colorfulness, plus age and education) explain about **half the variance** in first-impression appeal. Order is measurable and can be built in by design.

### Cited Findings
- **[measured] Lindgaard, Fernandes, Dudek & Brown (2006), *Behaviour & IT* 25(2):115–126.** Three studies. Studies 1–2: people rated homepages shown for 500 ms, twice. Study 3 added a 50 ms condition. Appeal ratings agreed strongly across phases and between the 50 ms and 500 ms conditions. The authors concluded that visual appeal can be judged within 50 ms. — [SciSpace abstract](https://typeset.io/papers/attention-web-designers-you-have-50-milliseconds-to-make-a-3axej7ku89); [Crossref record](https://api.crossref.org/works/10.1080%2F01449290500330448)
  - Specific coefficients reported secondhand: r = .97 for 500 ms test–retest, and r ≈ .98 for 500 ms vs unlimited viewing. **Unverified.** I could not open the full text. — [SlideShare summary](https://www.slideshare.net/slideshow/first-impressionofwebsites/28793951)
  - Nature's news coverage: the 50 ms verdicts "tallied well" with longer viewing. It gives no N and no statistics. — [Nature news 2006](https://www.nature.com/news/2006/060109/full/news060109-13.html)
- **[measured] Tuch, Presslaber, Stöcklin, Opwis & Bargas-Avila (2012), *IJHCS* 70(11):794–811 (a Google study).** Study 1 used 119 screenshots of real sites. They varied visual complexity (VC: low, medium, high) and prototypicality (PT: low, high). Exposure was 50, 500 or 1000 ms, varied between subjects. Both VC and PT affected aesthetic ratings within 50 ms. Study 2 found both effects at **17 ms**, with PT weaker than VC. As exposure time grew, PT became as influential as VC. **Low-VC, high-PT sites were rated most appealing.** The authors link this to Leder et al.'s (2004) stage model: complexity is processed earlier than prototypicality. — [Google Research publication page](https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/); [PDF](https://research.google.com/pubs/archive/38315.pdf)
  - Google's blog summary: high complexity lowers beauty even when the design is familiar, and low prototypicality lowers beauty even when the design is simple. "Users love simple and familiar designs." The blog gives no N or effect sizes. — [Google Research blog, 2012](https://research.google/blog/users-love-simple-and-familiar-designs-why-websites-need-to-make-a-great-first-impression/)
- **[measured] Reinecke, Yeh, Miratrix, Mardiko, Zhao, Liu & Gajos (2013), CHI "Predicting users' first impressions of website aesthetics."** Full text read. Pool of 450 websites, including 20 Webby nominees, 20 grayscale sites and sites in foreign scripts. 500 ms exposure, 9-point scales.
  - Perceived **colorfulness** model, built from 184 participants: R² = .78 (r = .88). Predictors: percentages of W3C colors, saturation, Hasler–Süsstrunk colorfulness (r = .71 alone), and the number of image areas. — [CHI 2013 PDF](https://kgajos.seas.harvard.edu/papers/reinecke13aesthetics.pdf)
  - Perceived **visual complexity** model, built from 122 participants: R² = .65 (r = .80). Predictors: text area, non-text area, number of leaves in a space-based (X-Y cut) decomposition (r = .50 alone), number of text groups, number of image areas, colorfulness and hue. Quadtree leaves were only weakly related (r = .28). Symmetry, balance and equilibrium correlated weakly with complexity and were dropped from the model. — [CHI 2013 PDF](https://kgajos.seas.harvard.edu/papers/reinecke13aesthetics.pdf)
  - **No demographic group differed in how complex or colorful it *perceived* sites to be.** Perception looked roughly universal. Preference is where groups differ. — [CHI 2013 PDF](https://kgajos.seas.harvard.edu/papers/reinecke13aesthetics.pdf)
  - **Appeal model:** 242 volunteers from 34 countries; 3,412 rating means after consistency filtering. Inputs: complexity and colorfulness with quadratic (U-shape) terms and demographic interactions. **Adjusted R² = .48.** — [CHI 2013 PDF](https://kgajos.seas.harvard.edu/papers/reinecke13aesthetics.pdf)
  - A failure case for the models: a mostly white page with a few brightly colored buttons was perceived as colorful but **not** complex. The model also overrated how complex text-heavy pages look. — [CHI 2013 PDF](https://kgajos.seas.harvard.edu/papers/reinecke13aesthetics.pdf)
- **[measured] Reinecke & Gajos (2014), CHI "Quantifying Visual Preferences Around the World."** About 2.4 million appeal ratings of 430 sites from about 40,000 LabintheWild participants. The preferred level of colorfulness and complexity varied by group:
  - Women preferred more colorful sites than men.
  - More education went with less preference for colorfulness.
  - Russians preferred lower complexity; Macedonians liked high colorfulness most.

  The authors offer a model to estimate peak appeal for a target group. — [Harvard abstract page](https://eecs.harvard.edu/~kgajos/papers/2014/reinecke14visual.shtml); [PDF](https://iis.seas.harvard.edu/papers/reinecke14visual.pdf)
  - Age effect: people over 40, and more so over 50, preferred more colorful designs. This comes from a secondary summary (Susan Weinschenk), **unverified** against the paper. — [Goodreads blog post](https://www.goodreads.com/author_blog_posts/26009934-100-more-things-183-what-people-find-visually-appealing-depends-on-age?tab=book)
- **[measured] Tuch, Bargas-Avila, Opwis & Wilhelm (2009), *IJHCS* 67(9):703–715.** 48 participants viewed 36 screenshots, with complexity measured by JPEG file size. Higher complexity went with:
  - more arousal and more negative valence;
  - more frown-muscle (corrugator) activity and a lower heart rate;
  - slower visual search and worse recognition memory.

  I saw only the abstract and metadata. — [edoc Basel record](https://edoc.unibas.ch/7990); [DBLP](https://dblp1.uni-trier.de/rec/journals/ijmms/TuchBOW09.html)
- **[measured] Miniukovich & De Angeli (2015), CHI "Computation of Interface Aesthetics" (honorable mention).** Eight automatic metrics, tested on 62 desktop webpages and 53 iPhone apps. They explained up to **49%** of the variance in webpage aesthetics and up to **32%** for apps. Their 2014 complexity metrics (information amount, organization, discriminability) explained about 50% of complexity ratings. I saw only abstracts and thesis records. — [DBLP](https://dblp.uni-trier.de/rec/conf/chi/MiniukovichA15.html); [UniTN thesis PDF](https://iris.unitn.it/retrieve/4428babf-9533-4673-b270-55d7adbd29f9/aesthetics_thesis_v1.2.12_final_1.pdf)
- **[review]** A secondary source says Tractinsky et al. (2006) argue that judgements may take "as little as 10 ms." I could not verify this. The Tractinsky et al. (2006) *IJHCS* 64 paper I know of is titled "Evaluating the consistency of immediate aesthetic perceptions of web pages." — [websiteoptimization summary](https://www.websiteoptimization.com/?p=2578); [Bohrium paper page](https://www.bohrium.com/paper-details/evaluating-the-consistency-of-immediate-aesthetic-perceptions-of-web-pages/812063636309671937-2519)

### Inferences
- The judgement at a glance runs on low-level, measurable properties:
  - how many distinct text and image blocks there are;
  - how much of the page is covered;
  - saturation and hue spread;
  - whether the layout matches the expected "shape" of that kind of site.

  An agent can **compute** proxies for these from a screenshot (block count via X-Y cut, colorfulness via Hasler–Süsstrunk) and use them as a lint step.
- Complexity is about **the number of perceptual groups**, not the amount of content. Text-heavy pages read as less complex than predicted when they are well grouped. So grouping (proximity, alignment, fewer separate regions) lowers perceived complexity without removing content.
- Color accents on a mostly neutral page raise perceived colorfulness without raising perceived complexity. This supports a "neutral base + one or two saturated accents" rule (inference, not tested directly).
- The best-supported baseline for an unknown audience is **low-to-moderate complexity + high prototypicality**, i.e. conventional layout for the category. Colorfulness should be tuned to the audience rather than maximized.
- Effect sizes are moderate. Even the best models explain only about 50% of variance, so a large share of taste is idiosyncratic or content-driven.

### Gaps
- I could not open the full Lindgaard 2006 or Tuch 2012 papers. N per study, exact r values (beyond secondary reports) and effect sizes for VC vs PT are unverified.
- Reinecke & Gajos 2014: exact peak colorfulness and complexity values per group were not retrieved.
- These studies use static screenshots of 2006–2013 era sites. I found no replication on modern (2020s) interfaces, dark mode, or with motion.

---

## 2. Aesthetic-usability effect and halo effects on trust and credibility

### Takeaway
Before use, beautiful interfaces are rated as more usable (Kurosu & Kashimura 1995; Tractinsky 1997/2000), and a polished look is the most-mentioned credibility cue (Fogg/Stanford). But the effect is **not one-directional or unconditional**. In a controlled study of actual use, poor usability lowered perceived beauty, while beauty did not raise perceived usability (Tuch et al. 2012). Polish buys a first impression and trust. It does not cover for friction.

### Cited Findings
- **[measured] Tractinsky (1997), CHI.** Replicated Kurosu & Kashimura's (1995) Japanese study in Israel using the **same 26 ATM layouts**. Found very high correlations between perceived aesthetics and perceived ease of use before use. Correlation strength differed between the two countries, which suggests cultural moderation. — [Tractinsky aesthetics research page (BGU)](https://www.ise.bgu.ac.il/faculty/noam/research/aesthetics.html)
- **[measured] Tractinsky, Katz & Ikar (2000), *Interacting with Computers* 13(2):127–145, "What is beautiful is usable."** Participants used a computerized stand-in for an ATM. Aesthetics and perceived usability were strongly correlated both before and after use. After use, the aesthetic level, not the actual usability manipulation, shifted ratings. I found no direct replication of this ATM experiment. — [OUP abstract](https://academic.oup.com/iwc/article/13/2/127/898608); [Aalto course PDF](https://mycourses.aalto.fi/pluginfile.php/1645430/mod_folder/content/0/Tractinsky%20%282000%29.pdf)
- **[measured] Tuch, Roth, Hornbæk, Opwis & Bargas-Avila (2012), *Computers in Human Behavior* 28(5):1596–1607, "Is beautiful really usable?"** 80 participants. 2×2 design of an online shop: aesthetics low/high × usability low/high.
  - **Aesthetics did not affect perceived usability.**
  - **Usability did affect post-use perceived aesthetics.** Frustration (negative affect) was the proposed mediator.
  - The "beautiful is usable" effect can reverse under a strong usability manipulation.

  — [Google Research pub page](https://research.google/pubs/is-beautiful-really-usable-toward-understanding-the-relation-between-usability-aesthetics-and-affect-in-hci/); [InfoQ summary](https://www.infoq.com/news/2012/05/Aesthetics-Usability)
- **[measured/survey] Stanford Web Credibility / Consumer WebWatch (Fogg et al., 2002; often cited as 2003).** About 2,684 participants evaluated live sites in 10 content categories. **"Design look" was the most-mentioned credibility cue, appearing in 46.1% of comments.** Rates by site category:
  - finance 54.6%
  - health 41.8%
  - nonprofit 39.4%

  Note this is the share of free-text comments, not a causal effect. Fogg's line: "To look good is to be good." — [Consumer Reports Advocacy summary](https://advocacy.consumerreports.org/research/how-do-people-evaluate-a-web-sites-credibility); [Wikipedia: Stanford Web Credibility Project](https://Www.Wikipedia.org/wiki/Stanford_Web_Credibility_Project); [ClickZ coverage](https://clickz.com/study-for-site-cred-looks-matter/56564/)
- **[measured, cited secondhand] Other halo-effect studies are listed in Reinecke et al.'s references,** which shows the topic is well studied. I did not open them:
  - Lindgaard et al. (2011, *TOCHI*) on appeal, trustworthiness and usability;
  - Everard & Galletta (2006) on presentation flaws reducing perceived quality and trust;
  - Moshagen, Musch & Göritz (2009, *Ergonomics*): aesthetics improved performance under some conditions;
  - Sonderegger & Sauer (2010) on aesthetics in usability testing.

  — [Reinecke et al. 2013 reference list](https://kgajos.seas.harvard.edu/papers/reinecke13aesthetics.pdf)
- **[opinion]** Practitioner caution: "attractive things work better *sometimes*." — [uxdesign.cc](https://uxdesign.cc/attractive-things-work-better-sometimes-67479e5fe258)

### Inferences
- Visual polish and the absence of visible presentation flaws are a **trust gate**. They matter most for finance, health and commerce, where design-look mentions were highest.
- The halo is strongest **before or with little use**: landing pages, marketing sites, onboarding, screenshots in app stores. In tools people use for a long time, friction reverses the halo, so usability defects hurt perceived beauty.
- Rule for an agent: never trade a usability or clarity cost for a visual flourish in a work tool. In a first-impression surface, visual quality has a larger payoff.

### Gaps
- I could not retrieve Kurosu & Kashimura (1995) sample size or exact correlations.
- I found no meta-analysis of the aesthetic-usability effect in my searches. One may exist (e.g. Hassenzahl's work, or later reviews) but was not verified.
- The Fogg study is correlational and based on comments. I found no modern replication of the 46.1% figure.

---

## 3. Processing fluency, symmetry, balance, contrast, order vs complexity, Berlyne, MAYA

### Takeaway
The fluency account is the best-supported general theory. Things that are easy to process feel good:
- symmetry
- figure–ground contrast
- clear groups ("figural goodness")
- repetition
- prototypicality

Complexity preference tends toward an inverted U (Berlyne). For screens, though, most web data shows **lower complexity is better within the range of real sites**. The novelty–familiarity trade-off is best captured by Hekkert et al.'s MAYA result: **novelty helps only as long as it doesn't erode typicality.**

### Cited Findings
- **[review] Reber, Schwarz & Winkielman (2004), *Personality and Social Psychology Review* 8(4):364–382.** Aesthetic pleasure comes partly from the perceiver's processing fluency. They review figural goodness, figure–ground contrast, repetition, symmetry and prototypicality, and argue each works via fluency. Priming, which raises fluency, also raises liking. — [UCSD PDF](https://pages.ucsd.edu/~pwinkielman/reber-schwarz-winkielman-beauty-PSPR-2004.pdf); [BORA repository](https://bora.uib.no/bora-xmlui/bitstream/handle/1956/594/BORA_PSPR04.pdf?sequence=1)
- **[measured] Hekkert, Snelders & van Wieringen (2003), *British Journal of Psychology* 94(1):111–124, "Most advanced, yet acceptable."** Three studies of industrial-design products.
  - Typicality and novelty **suppress each other**. Neither correlated with preference directly, but each became highly significant once the other was partialed out.
  - Preference rose with novelty as long as typicality was preserved.
  - Expertise did not change the pattern.
  - Blijlevens et al. (2012) later confirmed that the two are separate, positive factors.
  - MAYA is originally Raymond Loewy's (1951) principle.

  — [VU Amsterdam record](https://research.vu.nl/en/publications/most-advanced-yet-acceptable-typicality-and-novelty-as-joint-pred/); [CogSci summary](https://www.jimdavies.org/summaries/HekkertSneldersVanwieringen2003.html); [UTS paper on joint effect](https://opus.lib.uts.edu.au/bitstream/10453/36796/4/The%20joint%20effect%20of%20typicality%20and%20novelty%20on%20aesthetic%20pleasure%20for%20product%20designs.pdf)
- **[measured, via review] Geissler, Zinkhan & Watson (2006), *Journal of Advertising* 35(2):69–80.** Homepage complexity and its effect on attention, attitude and purchase intent. A later review cites this paper together with Berlyne (1974) for the claim that **moderate complexity maximizes appeal**. A 2001 paper by the same authors found perceived homepage complexity is driven by:
  - number of links
  - number of graphics
  - page length
  - animation

  I could not see the exact 2006 result statistics. — [IJSW review (download)](https://journals.shareok.org/ijsw/article/download/67/53); [DBLP 2001 JAIS](https://dblp.dagstuhl.de/rec/journals/jais/GeisslerZW01.html)
- **[measured] Reinecke et al. (2013)** modeled the appeal–complexity link with quadratic terms "to allow for the postulated U-shape," citing earlier inverted-U findings. Symmetry and balance (computed per Ngo et al. 2003 and Zheng et al.) had only weak correlations with complexity. In Zheng et al.'s earlier work (22 participants, 30 pages), **symmetry and balance** correlated with aesthetics ratings and **equilibrium did not**. — [CHI 2013 PDF](https://kgajos.seas.harvard.edu/papers/reinecke13aesthetics.pdf)
- **[measured] Tuch et al. (2012):** prototypicality (a familiarity/fluency variable) independently raises beauty at 17–50 ms. — [Google Research](https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/)

### Inferences
- Rules that follow from fluency:
  - strong figure–ground contrast;
  - consistent repetition of components and spacing;
  - clear grouping;
  - symmetry or optical balance on the main axis;
  - category-typical layout.

  These are "free" beauty because they also help comprehension.
- "Wow" without losing liking comes from adding **novelty in surface layers** while keeping **the structural skeleton typical**:
  - surface layers: type choice, an illustration, one signature motion, a distinctive accent color;
  - skeleton: navigation location, page flow, form patterns.

  This is the MAYA operating principle.
- The aesthetic "middle" for web screens appears to sit well below the complexity of the average real site. Treat it as "simpler than you think, but not empty."

### Gaps
- No web-specific meta-analysis of the inverted U. Whether real sites ever fall on the "too simple" side is not well quantified.
- I did not retrieve Berlyne's primary texts. Berlyne is cited here only via reviews.

---

## 4. Curvature preference: do people prefer rounded shapes, and does context flip it?

### Takeaway
Yes on average. A 2022 meta-analysis found a reliable, **medium** preference for curved over angular shapes (Hedges' g = 0.39). It is **not universal**: it varies with presentation time, stimulus type, expertise and task, and a sizable minority show no preference. Context matters. Round shapes signal softness, warmth and comfort; angular shapes signal hardness, durability and strength.

### Cited Findings
- **[measured] Bar & Neta (2006), *Psychological Science*, "Humans prefer curved visual objects."** 140 pairs of real objects plus 140 pairs of meaningless patterns. Sharp-angled versions were liked less, even for neutral objects like watches. Hypothesis: sharp contours signal threat. — [PubMed](https://pubmed.ncbi.nlm.nih.gov/16913943/); [PDF (moshebar.org)](https://moshebar.org/_files/ugd/a77db7_5598c791a95a4436960eb2fe671ca1e5.pdf)
- **[measured] Follow-ups:**
  - Silvia & Barona (2009): curvature preference held whether or not the image was balanced.
  - Leder, Tinio & Bar (2011): more amygdala activation for sharp objects (this summary came through search results).

  — [PMC review article](https://pmc.ncbi.nlm.nih.gov/articles/PMC11532414)
- **[review] Chuquichambi et al. (2022), *Annals of the New York Academy of Sciences* 1518:151–165, "How universal is preference for visual curvature?"** Meta-analysis of 61 studies (106 samples, 309 effect sizes). **Pooled Hedges' g = 0.39 (medium).** Moderators: presentation time, stimulus type, expertise and task. The authors judge the effect reliable but **not universal**. — [CBS PDF](https://research-api.cbs.dk/ws/portalfiles/portal/93945556/erick_g_chuquichambi_et_al_how_universal_is_preference_for_visual_curvaturepublishersversion.pdf); [UIB record](https://dspace.uib.es/xmlui/handle/11201/162892?show=full)
- **[measured] Jiang, Gorn, Galli & Chattopadhyay (2016), *Journal of Consumer Research* 42(5):709–726.** Five experiments.
  - **Circular logos prime softness**: products seem more comfortable and companies seem warmer and more attentive to customers.
  - **Angular logos prime hardness**: products seem more durable.
  - The effect worked through visual imagery in working memory, and held even when the shape was seen separately from the logo.

  — [PolyU repository](https://ira.lib.polyu.edu.hk/handle/10397/64985); [APS coverage](https://www.psychologicalscience.org/news/minds-business/the-shape-of-a-logo-has-a-powerful-impact-on-consumers120911.html)

### Inferences
- Rounded corners and soft shapes are a safe default for consumer, friendly or comfort-oriented products. The effect is medium, not decisive.
- Sharper, angular geometry is a legitimate choice for products whose message is precision, strength, durability or seriousness. Examples: pro tools, finance, editorial or luxury aesthetics. That last mapping is my extrapolation from Jiang et al.'s hardness/durability result; "sharp = expensive" was not directly tested in the sources I found.
- Rule: pick one radius philosophy and apply it consistently. Consistency also serves fluency (section 3).

### Gaps
- I found no study of corner radius on **UI components** specifically (buttons, cards) and perceived quality or price.
- I found no direct preregistered replication of Bar & Neta 2006, though the meta-analysis covers many conceptual replications.

---

## 5. Whitespace and density: comprehension, perceived quality, and when dense UIs win

### Takeaway
Empty space is linked to perceived prestige and quality mostly through **advertising** research (Pracejus, Olsen & O'Guinn). Web evidence comes indirectly through complexity: fewer, better-grouped regions are liked more and are searched and remembered better. I found no rigorous primary study showing experts prefer dense UIs. The claim is widespread in practitioner guidance and plausible from chunking theory, but it is unverified.

### Cited Findings
- **[measured] Pracejus, Olsen & O'Guinn (2006), *Journal of Consumer Research*.** Adding passive white space to ads improved perceived product quality and brand prestige. This is reported in a later paper's citation; I did not open the 2006 paper. — [ASU record "Print advertising: White space"](https://asu.elsevierpure.com/en/publications/print-advertising-white-space)
- **[measured] Pracejus, O'Guinn & Olsen (2013), *IJRM* 30(3):211–218.** Three studies. White space works as a **rhetorical/cultural device**, not as an economic "burning money" signal, and its meanings differ across cultures. — [RePEc](https://econpapers.repec.org/RePEc:eee:ijrema:v:30:y:2013:i:3:p:211-218)
- **[measured, survey] Olsen, Pracejus & O'Guinn (2012), *Journal of Business Research* 65(6):855–860.** 31 North American ad creative directors said they use white space for:
  - artistic appeal
  - attention
  - focus on the product and brand
  - conveying prestige

  — [RePEc](https://econpapers.repec.org/RePEc:eee:jbrese:v:65:y:2012:i:6:p:855-860)
- **[measured] Tuch et al. (2009):** higher complexity slowed visual search and lowered recognition memory (N = 48). This is indirect evidence that sparser, grouped layouts aid processing. — [edoc Basel](https://edoc.unibas.ch/7990)
- **[measured] Reinecke et al. (2013):** text-heavy but well-structured pages were perceived as less complex than the model predicted. Grouping, not raw quantity, drives perceived complexity. — [CHI 2013 PDF](https://kgajos.seas.harvard.edu/papers/reinecke13aesthetics.pdf)
- **[opinion]** Design-system guidance says experts prefer denser interfaces and novices sparser ones, with chunking as the mechanism, and recommends user-adjustable density. No primary studies are cited. — [Pattern Playground: density](https://pattern-playground.onrender.com/patterns/density); [BASIS design system: density](https://design.basis.com/foundations/density); [EWM: designing complex interfaces for experts](https://ewm.swiss/en/blog/designing-complex-interfaces-experts)

### Inferences
- For marketing and first-impression surfaces, generous whitespace is supported both by complexity data and by the prestige finding from ads. Spacious, calm pages read as "premium."
- For expert, repeated-use tools, the goal is **low perceived complexity at high information density**. Get there through:
  - strong alignment
  - consistent rhythm
  - grouping
  - restrained color

  Do not get there by removing data. Offer density settings.
- Whitespace is an inter-group separator. It lowers the count of perceived regions, which is the measured complexity driver.

### Gaps
- No primary web or HCI study found on whitespace → comprehension or perceived quality. The commonly cited "whitespace improves comprehension by 20%" statistic was **not found** in any primary source I checked; treat it as folklore unless sourced.
- No primary study found on expert preference for dense UIs; NN/g articles on this were not surfaced by search.

---

## 6. Microinteractions and motion: perceived quality, responsiveness and waiting

### Takeaway
Evidence is **thin and mostly from small studies**. Animated transitions tend to raise liking and preference without changing task performance. Perceived speed is driven by *when new content appears* more than by animation style. Progress indicators can be designed to make waits feel shorter. Skeleton screens have **mixed** evidence: one controlled study found they felt slower than spinners.

### Cited Findings
- **[measured] Harrison, Amento, Kuznetsov & Bell (2007), UIST, "Rethinking the Progress Bar."** People perceive progress bar durations non-linearly. Some progress behaviors make the same process feel faster or slower. The follow-up CHI 2010 "Faster Progress Bars" manipulated perceived duration with visual augmentations; I did not open it and did not verify which specific behavior won. — [Chris Harrison research page](https://chrisharrison.net/index.php/Research/ProgressBars); [Wikipedia: Progress bar](https://en.wikipedia.org/wiki/Progress_bar)
- **[measured] Huhtala et al. (2010), CHI (VTT), "Animated UI transitions and perception of time."** In mobile image transitions, **showing the next image earlier** dominated the sense of a fast transition over the other variables examined. — [VTT record](https://cris.vtt.fi/en/publications/animated-ui-transitions-and-perception-of-time-a-user-study-on-an/)
- **[measured, small N] Viget (2017).** Spinner vs skeleton vs blank screen, with identical waits, about 39 participants per group.
  - Skeleton-screen users judged the wait more negatively and guessed it was longer.
  - Mean perceived wait: skeleton 2.82 s, spinner 2.41 s, blank 2.29 s.
  - Hypothesized cause: skeletons attract attention because they are novel.
  - Practitioner study, not peer reviewed.

  — [Viget: A Bone to Pick with Skeleton Screens](https://viget.com/articles/a-bone-to-pick-with-skeleton-screens)
- **[measured, unverified details] Mejtoft et al. (2018)** reportedly found that a news page with skeleton screens scored higher on perceived speed and ease of navigation than a spinner. I saw this only in secondary summaries and did not open the paper. — [dev.to summary](https://dev.to/helloashish99/skeleton-screens-vs-spinners-perceived-load-time-1nlj)
- **[measured, small N] Further small studies:**
  - Children's educational software (N = 16): no difference in task performance, but the animated interface was rated more "likeable."
  - Aalto master's thesis on a web shop: most users didn't consciously notice the transitions, yet all preferred the animated version. Some animation types were preferred over others, and badly applied animation can make things worse.
  - Animated transitions in adaptive mobile menus improved understandability and trust but added lag.

  — [Zenodo paper](https://zenodo.org/records/1072501/files/9299.pdf); [Aalto thesis](https://aaltodoc.aalto.fi/items/6c78128d-ceb2-47d5-94d7-9bceae447a9d); [VTT adaptive menus](https://cris.vtt.fi/en/publications/animated-transitions-for-adaptive-small-size-mobile-menus/)
- **[measured, via 2001 study]** Animation is one of four drivers of *perceived homepage complexity* (Geissler et al.). Gratuitous motion therefore costs some of the complexity budget. — [DBLP JAIS 2001](https://dblp.dagstuhl.de/rec/journals/jais/GeisslerZW01.html); [IJSW review](https://journals.shareok.org/ijsw/article/download/67/53)

### Inferences
- Motion is a **preference and comprehension** lever, not a performance lever:
  - use it to explain spatial change (where something came from or went);
  - use it to confirm input (press and hover feedback);
  - keep it short;
  - never let it delay content. The earliest-content-wins finding means transitions should not hold back the arrival of the new state.
- Skeleton screens are not automatically better. Keep them calm (low-contrast, minimal shimmer), and use them only where the final layout is known. For very short waits, showing nothing may feel fastest (Viget's blank condition was perceived shortest).
- Motion adds to perceived complexity. One signature motion beats many small ones on a first-impression page.

### Gaps
- No large, controlled, peer-reviewed study of hover or press microfeedback and perceived quality or "delight" was found.
- The CHI 2016 study planned with 300 participants rating hedonic and pragmatic quality of animated transitions was mentioned in search results; its results were not found.
- I did not verify Google's RAIL or Web Vitals responsiveness thresholds (100 ms and similar) here. Those are engineering guidance, outside this note.

---

## 7. What separates award-winning sites from average ones, in measurable terms?

### Takeaway
Little rigorous evidence exists. I found **no study that runs computational aesthetic metrics on Awwwards winners versus a baseline**. The one study of Awwwards winners (MIDI 2024) found many trade usability for aesthetic novelty. Computational web-aesthetics work (Reinecke 2013; Miniukovich & De Angeli 2015) gives the closest measurable proxies.

### Cited Findings
- **[measured] Balcerzak & Kwiatkowska (MIDI 2024), "Balancing Beauty and Usability: A Comprehensive Evaluation of Awwwards Winning Websites."** Combined Nielsen heuristics, eye tracking and user surveys. Found **many award-winning sites show a significant imbalance between aesthetic innovation and practical functionality**. Conference-stage paper, with a final version due in Springer LNNS. — [MIDI 2024 PDF](https://midi2024.opi.org.pl/wp-content/uploads/2024/12/D1-11-Balancing-Beauty-and-Usability-A-Comprehensive-Evaluation-of-Awwwards-Winning-Websites.pdf); [LBM UW news](https://www.lbm.uw.edu.pl/en/publications/news/553-lbm-at-the-12th-machine-intelligence-and-digital-interaction-midi-conference)
- **[opinion]** Awwwards jury weights reported by a course guide: Design 40%, Usability 30%, Creativity 20%, Content 10%. Not verified against Awwwards documentation. — [Web Atelier UDIT guide](https://ruvebal.github.io/web-atelier-udit/lessons/en/web-analysis)
- **[measured]** Reinecke et al. (2013) included 20 Webby nominees in their 450-site pool, but did not report a separate winner-vs-average comparison. — [CHI 2013 PDF](https://kgajos.seas.harvard.edu/papers/reinecke13aesthetics.pdf)
- **[measured]** Computational GUI aesthetics metrics explain up to 49% of variance for webpages and 32% for apps. — [DBLP](https://dblp.uni-trier.de/rec/conf/chi/MiniukovichA15.html); [UniTN thesis](https://iris.unitn.it/retrieve/4428babf-9533-4673-b270-55d7adbd29f9/aesthetics_thesis_v1.2.12_final_1.pdf)

### Inferences
- Award juries reward novelty and craft (the "advanced" in MAYA). The first-impression literature rewards simplicity and typicality (the "acceptable"). Award-style "wow" therefore sits at the novel edge, and the MIDI study suggests it often pays a usability cost.
- For an AI agent building real products: borrow award-site craft (typography, one bold visual idea, polished motion) but keep category-typical structure and usability. That matches both bodies of evidence.

### Gaps
- No computational comparison (colorfulness, complexity, whitespace ratio, type scale, motion count) of Awwwards or CSS Design Awards winners against random sites was found. This is an open research opportunity: the Reinecke metrics code is public.

---

## 8. Synthesis: practical rules for an AI agent designing web UIs (graded by evidence)

### Takeaway
Strongest evidence: minimize **perceived** complexity (fewer, well-grouped regions), keep layout **prototypical** for the category, and tune colorfulness to the audience. These dominate the 50 ms judgement and explain about half of appeal variance. Medium evidence: curvature (g = 0.39), fluency cues (contrast, symmetry, repetition), and MAYA-style controlled novelty. Weak evidence: motion, skeletons, whitespace→comprehension, and expert density, where the rules are mostly practitioner judgement.

### Cited Findings
- **Strong:** VC and PT affect beauty at 17–50 ms; low VC + high PT is best. — [Tuch et al. 2012](https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/)
- **Strong:** Complexity and colorfulness models + demographics → adj. R² = .48 for first-impression appeal. — [Reinecke et al. 2013](https://kgajos.seas.harvard.edu/papers/reinecke13aesthetics.pdf)
- **Strong:** Optimal colorfulness and complexity differ by gender, education and country (N ≈ 40k). — [Reinecke & Gajos 2014](https://eecs.harvard.edu/~kgajos/papers/2014/reinecke14visual.shtml)
- **Medium:** Curvature preference g = 0.39, not universal. — [Chuquichambi et al. 2022](https://research-api.cbs.dk/ws/portalfiles/portal/93945556/erick_g_chuquichambi_et_al_how_universal_is_preference_for_visual_curvaturepublishersversion.pdf)
- **Medium:** Novelty helps only while typicality holds (MAYA). — [Hekkert et al. 2003](https://research.vu.nl/en/publications/most-advanced-yet-acceptable-typicality-and-novelty-as-joint-pred/)
- **Medium (review):** Fluency cues (contrast, symmetry, repetition, prototypicality) raise liking. — [Reber et al. 2004](https://pages.ucsd.edu/~pwinkielman/reber-schwarz-winkielman-beauty-PSPR-2004.pdf)
- **Medium, contested:** Beauty → perceived usability before use; usability → beauty after real use. — [Tractinsky et al. 2000](https://academic.oup.com/iwc/article/13/2/127/898608); [Tuch et al. 2012 CHB](https://research.google/pubs/is-beautiful-really-usable-toward-understanding-the-relation-between-usability-aesthetics-and-affect-in-hci/)
- **Medium (correlational):** Design look is the top credibility cue (46.1% of comments). — [Consumer Reports / Stanford](https://advocacy.consumerreports.org/research/how-do-people-evaluate-a-web-sites-credibility)
- **Weak:** Animation raises liking, not performance. Early content arrival dominates perceived speed. Skeleton evidence is mixed. — [VTT 2010](https://cris.vtt.fi/en/publications/animated-ui-transitions-and-perception-of-time-a-user-study-on-an/); [Viget 2017](https://viget.com/articles/a-bone-to-pick-with-skeleton-screens)

### Inferences
These are the proposed rules for the "taste" skill. They are inferences, each traceable to the findings above.
1. **Count regions, not pixels.** Aim for few distinct visual groups above the fold. Merge, align and group before deleting content. Screenshot-based block counting (X-Y cut) can serve as a self-check.
2. **Be typical in structure, distinctive in surface.** Keep conventional navigation, layout and flow for the category, and spend novelty on type, one hero visual or one signature motion. This is MAYA.
3. **Neutral base, few saturated accents.** Colorfulness raises appeal for some audiences and lowers it for others. Accents add colorfulness cheaply without adding complexity. Lean more colorful for broad consumer audiences and more restrained for highly educated or professional ones (from the Reinecke & Gajos direction of effects).
4. **Maximize fluency:**
   - high figure–ground contrast;
   - consistent spacing and component repetition;
   - optical balance;
   - one clear focal point.
5. **Default to rounded geometry** for friendly or consumer products. Use angular, sharp geometry deliberately for precision, strength or editorial tone. Be consistent either way.
6. **Polish is a trust gate on first-impression surfaces.** Eliminate visible flaws: misalignment, broken images, inconsistent styles. In repeated-use tools, usability beats ornament, because friction makes the UI look worse over time.
7. **Dense ≠ complex.** For expert tools, keep information density high but perceived complexity low, through alignment, rhythm and restrained color. Offer a density toggle. Note that the expert-density preference is practitioner opinion.
8. **Motion explains and confirms. It must never delay content.** Get the new state on screen first. Use few motions on first-impression pages, since animation counts toward perceived complexity. Use calm skeletons only where the layout is known.

### Gaps
- No evidence was found that computational "taste" metrics predict **award-level "wow"** as opposed to average liking. Likeability (simple, familiar) and memorability or "wow" (novel) may be different targets, and the literature mostly measures likeability.
- Almost all first-impression evidence uses static screenshots of 2006–2014 era websites. Modern design conventions (large type, dark mode, gradients, glassmorphism) are untested in this paradigm.
- I found no data on whether designers and engineers judge differently from ordinary users, beyond Hekkert's finding that expertise did not change the typicality/novelty pattern and the meta-analysis listing expertise as a curvature moderator.
