# Constraint-led redesign: levers when palette, fonts and logo are fixed, and what famous redesigns changed

Method note: in this session WebFetch could not reach linear.app, stripe.com, github.blog, vercel.com or plushcap.com (DNS blocked by the session's network allow-list). All findings below come from web-search result summaries of the named primary pages, not full-text reads. Numbers were kept only where the search summary attributed them to the primary page. Evidence tags: **[measured]** = study or count with a method; **[company-reported]** = the company describing its own work; **[practitioner]** = opinion or secondary write-up.

## 1. Case studies: what changed, what stayed, and why

### Takeaway
None of the flagship product redesigns in this set changed the logo, and most kept the typeface family. What they changed was **how the existing values relate to each other**: they regenerated colour ramps in perceptual spaces (Linear LCH, Stripe CIELAB, GitHub Primer primitives), cut the number of hand-picked values (Linear went from 98 theme variables to 3 inputs), made the chrome recede (dimmer sidebar, fewer and smaller icons, softer borders), and restructured navigation (Vercel, Stripe). The redesigns criticised hardest (iOS 26 Liquid Glass) were the ones that added material effects at the cost of content legibility.

### Cited Findings

**Linear, March 2024 ("How we redesigned the Linear UI", part II)**
- The theme system was rebuilt so that each theme is generated from **3 inputs (base colour, accent colour, contrast)** instead of **98 hand-defined variables per theme**. [company-reported] — [Linear: How we redesigned the Linear UI (part II)](https://linear.app/now/how-we-redesigned-the-linear-ui); mirrored at [Karri Saarinen's site](https://karrisaarinen.com/posts/how-we-redesigned-the-linear-ui/)
- Linear generates themes in **LCH** because lightness is perceptually uniform, so colours at the same L value look about equally bright. The contrast input controls text and border intensity, and the same mechanism generates elevated and translucent surface variants. [company-reported] — [Linear part II](https://linear.app/now/how-we-redesigned-the-linear-ui)
- An engineer on the team describes a generated "theme" as "98 colors and a few other variables (shadows etc)". [company-reported, individual] — [Andreas Eldh on X](https://x.com/eldh/status/1773462917754532032)
- A later Linear engineering post says a custom theme derives **more than a hundred colour variables** in LCH from those inputs. [company-reported] — [Linear: Styling Linear for the future with StyleX](https://linear.app/now/styling-linear-for-the-future-stylex)
- The changelog frames the work as redefining "the foundational layers of Linear's design to improve hierarchy, balance, and density". The redesign shipped March 2024, and the default dark and light themes gained contrast. [company-reported] — [Linear changelog: Welcome to the new Linear (2024-03-20)](https://linear.app/changelog/2024-03-20-new-linear-ui)
- What stayed: the brand, the logo and the product's structure. No source found says the logo or core brand colour changed. (Absence of evidence. See Gaps.)

**Linear, March 2026 ("A calmer interface for a product in motion")**
- The changelog describes a "calmer, more consistent interface". Its stated goals are easier scanning, easier movement between workflows, and helping users stay focused. [company-reported] — [Linear changelog 2026-03-12 UI refresh](https://linear.app/changelog/2026-03-12-ui-refresh)
- Concrete changes:
  - Navigation sidebars are "a few shades dimmer", so the main content area leads.
  - Desktop tabs are more compact.
  - **Fewer icons, at smaller sizes.**
  - **Colored team-icon backgrounds were removed.**
  - Borders and separators were reduced or softened (rounded edges, lower contrast), so they give structure "without clutter".
  - Governing principle: **"Don't compete for attention you haven't earned."**

  [company-reported] — [Linear: A calmer interface for a product in motion](https://linear.app/now/behind-the-latest-design-refresh)
- The post also notes that the design system and component library changed while other teams kept building features on top of them. In other words, they recalibrated the system in place, not with a big-bang rewrite. [company-reported] — [same](https://linear.app/now/behind-the-latest-design-refresh)
- A third-party critique is titled "Linear dimmed its sidebar and called it a design principle". This shows that users and critics notice even small tone shifts. [practitioner] — [grain feed post](https://grain-8opupt1uu-deeplangai.vercel.app/feed/OVMC4GyElMX)

**Stripe, accessible colour system ("Designing accessible color systems", 2019)**
- The problem: different hues at the same nominal "level" are perceived at different lightness, and standard colour spaces (HSL/RGB) ignore this. Stripe converted its colour scales to **CIELAB** and adjusted them by perceptual lightness. The result was "a set of colors which have uniform contrast across all the hues". [company-reported] — [Stripe: Designing accessible color systems](https://stripe.com/blog/accessible-color-systems)
- Built-in contrast rule: any two colours **at least 5 levels apart** are guaranteed sufficient contrast for small text, and **4 levels apart** is enough for icons and large text. [company-reported] — [Stripe](https://stripe.com/blog/accessible-color-systems)
- Restatement of the rule: when scale numbers differ by 500 or more, the pair meets AA 4.5:1. [practitioner] — [Matt Ström-Awn: How to generate color palettes for design systems](https://mattstromawn.com/writing/generating-color-palettes/)
- A Hacker News commenter reports Stripe's view that Lab lightness aligns more closely with how WCAG contrast is computed. [practitioner] — [HN discussion](https://news.ycombinator.com/item?id=21267606)
- Relevance: Stripe kept its brand hues and changed the **lightness relationships** between steps. This is a pure calibration change.

**Stripe Dashboard (May 2024)**
- The top navigation was updated:
  - Billing and Connect moved into a new **Products** section.
  - Product catalog was added to the top bar.
  - Products feed a **Shortcuts** list, and users can pin frequently visited pages.

  [company-reported] — [Stripe support: Dashboard update May 2024](https://support.stripe.com/questions/dashboard-update-may-2024)
- The customer detail page got a new layout, and Stripe says more pages will adopt it. [company-reported] — [Stripe support: Updates to the customer detail page](https://support.stripe.com/questions/updates-to-the-customer-detail-page)
- A claim that primary navigation went from 8 to 5 top-level items comes from an unreliable community page and is NOT verified. — [skill-wiki page](https://skill-wiki.github.io/atom/frontend-design/feedback-stripe-redesign-2024)

**GitHub Primer colour/contrast rework (2023)**
- GitHub improved contrast in the default light and dark themes on github.com in March 2023. [company-reported] — [GitHub changelog 2023-03-27](https://github.blog/changelog/2023-03-27-light-and-dark-theme-color-contrast-improvements/)
- The team "immediately identified **over 100 color pairs**" (text on background) used across Primer components. Instead of checking them by hand in Figma, they changed tokens in code and wrote a **script that automatically ran contrast checks for all tokens across all themes**. [company-reported] — [GitHub Blog: Unlocking inclusive design: how Primer's color system is making GitHub.com more inclusive](https://github.blog/engineering/user-experience/unlocking-inclusive-design-how-primers-color-system-is-making-github-com-more-inclusive/)
- Token architecture used to propagate the fix: **base tokens → functional tokens** (global UI patterns such as text, borders, shadows and backgrounds) **→ component tokens**. Changing the bottom layer (Primer Primitives) carried the fix through every component. [company-reported] — [same](https://github.blog/engineering/user-experience/unlocking-inclusive-design-how-primers-color-system-is-making-github-com-more-inclusive/)
- Primitives v9.0.0 replaced theme-specific neutral scales with **two inverted neutral scales, light and dark**: step 0 is lightest in light mode and darkest in dark mode. Functional tokens were "tested to meet minimum contrast requirements". [company-reported] — [primer/primitives v9.0.0 release](https://github.com/primer/primitives/releases/tag/v9.0.0)
- GitHub built **Primer Prism**, a palette tool for the high-contrast and colour-blind themes. [company-reported] — [GitHub Blog: Accelerating GitHub theme creation with color tooling](https://github.blog/2022-06-14-accelerating-github-theme-creation-with-color-tooling/)

**Vercel (dashboard navigation 2026; Geist)**
- The new dashboard navigation became the default for all users on **26 Feb 2026**, after an opt-in beta in January. Changes:
  - Horizontal tabs moved into a **resizable, hideable sidebar**.
  - Tabs are consistent across team and project levels.
  - Items were reordered around common developer workflows.
  - Projects act as filters, so one click switches between team and project views of the same page.
  - Mobile uses a floating bottom bar for one-handed use.

  [company-reported] — [Vercel changelog: New dashboard redesign is now the default](https://vercel.com/changelog/dashboard-navigation-redesign-rollout); [New dashboard navigation available](https://vercel.com/changelog/new-dashboard-navigation-available)
- Some users pushed back, in a community thread titled "layout change of the dashboard it sucks". [practitioner/user feedback] — [Vercel Community](https://community.vercel.com/t/layout-change-of-the-dashboard-it-sucks/35367)
- A community reconstruction (not Vercel documentation) describes Geist as about 36 colour tokens, 15 type styles across Geist Sans and Geist Mono, and 40+ components. [practitioner, unverified] — [shadcn.io: Vercel's Geist design system](https://www.shadcn.io/design/vercel)

**Airbnb DLS (2015 onward)**
- Karri Saarinen (later Linear co-founder) led the DLS. Its stated goal was "a more beautiful and accessible design language". The system covers typography, colour and spacing guidelines plus a component library on Android, iOS, React Native and web, along with the processes and tooling to maintain it. [company-reported, individual] — [Karri Saarinen: Airbnb DLS](https://karrisaarinen.com/dls/); [Designer News AMA](https://www.designernews.co/stories/69628--%E2%80%A6stems-at-airbnb)
- Airbnb has no official public design-system site. The public record is mostly the Medium write-ups ("Building a Visual Language") and the product itself. [practitioner] — [superdesign.dev breakdown](https://superdesign.dev/blog/airbnb-design-system)

**Spotify Encore**
- Before Encore, Spotify had **22 disconnected design systems**. Encore brought them under one brand as a "system of systems". [company-reported via secondary reposts] — [Reimagining Design Systems at Spotify (repost)](https://ensigngohome.blogspot.com/2024/04/reimagining-design-systems-at-spotify.html); [Roger Swannell notes](https://rogerswannell.com/notes/reimagining-design-systems-at-spotify/)
- Layers:
  - **Encore Foundation**: colour, type styles, motion, spacing, writing, accessibility and tokens. It is "the minimum bar for every Spotify product".
  - **Encore Web and Encore Mobile** sit on top of Foundation.
  - **Local systems** hold product-specific components. They need a governed naming pattern and at least one component unique to them.

  [company-reported via secondary] — [same](https://rogerswannell.com/notes/reimagining-design-systems-at-spotify/); [Figma blog: Creating coherence](https://www.figma.com/blog/creating-coherence-how-spotifys-design-system-goes-beyond-platforms/)
- A later Spotify retrospective says the growth of local systems strained the Encore model. [company-reported via secondary] — [Can I get an Encore? (cur.at mirror)](https://cur.at/q8afwkA?m=web)

**Google Material 3 Expressive (2025)**
- Google reports **46 studies with more than 18,000 participants**, and says participants spotted key UI elements **"up to 4× faster"** on expressive screens. The levers were bolder colour emphasis, shape, size contrast and motion, applied to the same Material foundations. [company-reported, measured internally] — [Material Design blog: Start building with M3 Expressive](https://m3.material.io/blog/building-with-m3-expressive)
- The 4× figure is a best case: attention reached the send button in an email UI 4× faster in one eye-tracking test. It is not an average. [practitioner] — [Android Police](https://www.androidpolice.com/im-excited-about-material-3-expressive/)
- A secondary summary claims expressive designs "effectively removed the age effect" in spotting key elements. This is unverified against Google's primary text. [practitioner] — [Android Central](https://www.androidcentral.com/apps-software/android-os/google-leaked-its-own-design-process-for-material-3-expressive)
- No independent replication was found.

**Apple iOS 26 Liquid Glass (2025) and iOS 7**
- NN/g argues that Liquid Glass "obscures content instead of letting it take the spotlight". Problems it lists:
  - controls over noisy backgrounds
  - jittery animated buttons
  - shrunken, crowded tab bars
  - collapsing navigation
  - ubiquitous search bars

  [practitioner, expert review] — [NN/g: Liquid Glass Is Cracked, and Usability Suffers in iOS 26](https://www.nngroup.com/articles/liquid-glass/)
- User complaints covered readability and animation lag. Reduce Transparency is the closest available opt-out. [practitioner/press] — [MacRumors](https://www.macrumors.com/2025/09/17/ios-26-liquid-glass-critiques/); [Gizmodo](https://gizmodo.com/if-you-hate-liquid-glass-on-ios-26-heres-how-to-make-it-better-2000659046)
- Wikipedia summarises reception as mixed-to-negative and reports that Apple announced a Liquid Glass revamp for iOS 27 at WWDC 2026 in response. [secondary] — [Wikipedia: Liquid Glass](https://en.wikipedia.org/wiki/Liquid_Glass)
- Gizmodo notes that Apple faced "similar usability issues back in the age of iOS 7". [press] — [Gizmodo](https://gizmodo.com/if-you-hate-liquid-glass-on-ios-26-heres-how-to-make-it-better-2000659046)

### Inferences
- Across Linear 2024, Stripe 2019 and GitHub 2023, the common move was to **keep the hues and regenerate the lightness and contrast relationships in a perceptual space**, then lock those relationships into a rule (Stripe's "5 steps apart = AA for text"; Linear's 3 inputs; Primer's automated contrast script). This directly supports the skill's belief that "taste is calibration".
- Linear 2026 is the clearest model for a fixed-brand refresh. It changed no brand asset, only **attention allocation**: a dimmer sidebar, fewer and smaller icons, colour removed from decorative icon backgrounds, lower-contrast borders. The principle "don't compete for attention you haven't earned" makes a good audit question for every element.
- Navigation and information-architecture redesigns (Vercel, Stripe) get louder user pushback than visual recalibration, because they break learned motor paths. Pure tone and spacing changes rarely do.
- Liquid Glass shows the failure mode: a redesign that adds a new material without protecting text contrast. Changing the surface treatment is a high-risk lever. Spacing, tone and hierarchy are low-risk.

### Gaps
- Could not read the full text of any Linear, Stripe, GitHub or Vercel post (domains blocked). The following are unverified from training memory and NOT sourced here:
  - Linear 2024's use of Inter Display for headings
  - sidebar or header pixel changes
  - team size and timeline
  - the "part I" post's content
- No official Vercel write-up was found on the Geist-specific visual changes to the dashboard (font switch from Inter to Geist, grey scale), so before/after values are missing.
- No primary source was found on iOS 7's specific changes (Helvetica Neue Light/Thin, removal of skeuomorphism, translucency) in this session.
- The Spotify Encore details come from reposts and secondary notes, not the spotify.design original.
- The Stripe.com marketing-site redesigns (e.g. the gradient "wave" era) were not covered by results.

## 2. Levers that remain when palette, fonts and logo are fixed

### Takeaway
With the brand constants locked, the remaining levers are **relationships and quantities**:
- lightness steps and contrast between colour tokens
- the proportion of brand colour on screen
- neutral tinting
- how many type sizes and weights are used, and the ratios between them
- spacing rhythm and density
- icon count, size and consistency
- border and separator contrast
- navigation structure and component states

The case studies show teams win mainly by **removing** (fewer variables, icons, borders, colours on decoration) and by **re-deriving ramps from brand hues in perceptual colour spaces**.

### Cited Findings
- **Generate ramps from the brand colour in a perceptual space.**
  - Evil Martians' Harmonizer uses OKLCH plus APCA (or WCAG) to keep chroma and contrast consistent across levels and hues. You pick the colour closest to your brand colour, and it emits primitive, text, border and surface variables (P3 or sRGB). Its rationale is that in typical palettes, "same level" colours vary in lightness and chroma. [practitioner tool] — [evilmartians/harmonizer](https://github.com/evilmartians/harmonizer); [Web Standards news on Harmonizer](https://web-standards.dev/news/2025/11/harmonizer-color-palette-generator/)
  - OKLCH is better than HSL for colour modification and palette generation. [practitioner] — [Evil Martians: OKLCH in CSS](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)
  - The same idea at company scale: Stripe (CIELAB), Linear (LCH), and Primer (primitives regenerated, contrast-checked). [company-reported] — [Stripe](https://stripe.com/blog/accessible-color-systems); [Linear](https://linear.app/now/how-we-redesigned-the-linear-ui); [GitHub Blog](https://github.blog/engineering/user-experience/unlocking-inclusive-design-how-primers-color-system-is-making-github-com-more-inclusive/)
  - A further critique: HSL-based systems produce uneven perceived lightness. [practitioner] — [Wildbit: Accessible Palette: stop using HSL for color systems](https://www.wildbit.com/blog/accessible-palette-stop-using-hsl-for-color-systems.html)
- **Fewer hand-picked values, more derived ones.** Linear went from 98 variables to 3 inputs per theme. [company-reported] — [Linear](https://linear.app/now/how-we-redesigned-the-linear-ui)
- **Contrast as a single dial.** Linear's "contrast" input scales text and border intensity together. [company-reported] — [Linear](https://linear.app/now/how-we-redesigned-the-linear-ui)
- **Make the chrome recede and let content lead.** Linear 2026 used four moves: a dimmer sidebar, compact tabs, fewer and smaller icons, and softer, lower-contrast borders. [company-reported] — [Linear 2026](https://linear.app/now/behind-the-latest-design-refresh)
- **Take colour away from decoration.** Linear removed coloured team-icon backgrounds. [company-reported] — [Linear 2026](https://linear.app/now/behind-the-latest-design-refresh)
- **Emphasis by size, shape and colour contrast on the key action.** M3 Expressive reports faster spotting of key elements, up to 4× in the best case. [company-reported] — [Material blog](https://m3.material.io/blog/building-with-m3-expressive)
- **Navigation structure and density as levers.**
  - Vercel: horizontal tabs became a collapsible sidebar, and items were reordered by workflow. — [Vercel changelog](https://vercel.com/changelog/dashboard-navigation-redesign-rollout)
  - Stripe: items regrouped under Products, with pinnable shortcuts. — [Stripe support](https://support.stripe.com/questions/dashboard-update-may-2024)

  [company-reported]
- **Token layering so one change propagates.** Primer uses base → functional → component tokens. Spotify's Encore Foundation holds colour, type, motion, spacing and writing as the shared minimum. [company-reported] — [GitHub Blog](https://github.blog/engineering/user-experience/unlocking-inclusive-design-how-primers-color-system-is-making-github-com-more-inclusive/); [Roger Swannell notes on Spotify](https://rogerswannell.com/notes/reimagining-design-systems-at-spotify/)

### Inferences
Answering the owner's question "Is it icons? Colours? Font style? Hierarchy?", in order of payoff and risk:

1. **Colour usage, not colour choice.**
   - Keep the brand hues, but regenerate the ramps in OKLCH/LCH so steps are perceptually even.
   - Reserve the saturated brand colour for primary actions and the active state.
   - Tint the neutrals slightly toward the brand hue.
   - Remove colour from decorative elements.

   Evidence: Linear, Stripe, Primer.
2. **Chrome vs content contrast.** Dim the navigation and supporting surfaces, lower border contrast, and reduce separators. Evidence: Linear 2026.
3. **Icons.** Use fewer, use smaller, and use one family and stroke. Evidence: Linear 2026. The specific "one stroke, one grid" prescription is practitioner convention not sourced here.
4. **Typography within the same family.** Consolidate sizes and weights into a scale with fixed ratios, and use weight and size contrast for hierarchy. This is supported indirectly by audit findings (11 sizes on one homepage, below) and by M3 Expressive's size-contrast emphasis. No case study here sourced specific before/after type values.
5. **Structure and navigation.** This has the biggest functional payoff but also the most user pushback (Vercel community thread). Do it last and behind an opt-in beta, as Vercel and Linear did.
6. **Surface material effects** (glass, blur) carry the highest legibility risk. Evidence: NN/g on Liquid Glass.

### Gaps
- No sourced numbers were found for:
  - the 60-30-10 rule
  - typical type-scale ratios used in named redesigns
  - spacing-scale changes (e.g. 4 px to 8 px base) in Linear, Vercel or Stripe
- Radix Colors' custom palette generator and "tinted neutrals" did not appear in results. They are known practitioner techniques, but they are unsourced here.
- No source quantified icon-consistency effects.

## 3. Auditing an existing UI's tokens: finding drift and consolidating

### Takeaway
The standard first step is an **interface inventory**: screenshot or extract every colour, type style, button and spacing value actually in use. Stylesheet analysers (CSS Stats, StyleStats) routinely surface dozens of near-duplicate greys and too many font sizes. Teams then normalise them to a small token set and, as GitHub did, enforce the result with automated checks.

### Cited Findings
- Brad Frost calls the interface inventory "a critical first step for establishing an effective interface design system". It lists colour, typography, buttons and other categories, and recommends tools such as **CSS Stats** and Stylify Me for capturing colours. [practitioner] — [Brad Frost: Conducting an Interface Inventory](https://bradfrost.com/blog/post/conducting-an-interface-inventory/)
- CSS Stats is a free, open-source stylesheet visualiser. It reports unique colours and typography (family, size, weight, line height). [practitioner tool] — [Brad Frost](https://bradfrost.com/blog/post/conducting-an-interface-inventory/); [StyleStats on GitHub](https://www.github.com/nixsiow/stylestats); [CSS Stats Analyzer](https://apify.com/automation-lab/css-stats-analyzer)
- Example drift findings:
  - One audit found **85 unique colours**, including what "looks like 50 shades of grey" and several "flavors of Facebook blue". The recommendation was to "round up these different colors and start to normalize them". [measured, single case] — [OpenClassrooms: Explore the benefits of design systems](https://openclassrooms.com/en/courses/4556206-design-the-visual-side-of-experiences-ui-design/5259131-explore-the-benefits-of-design-systems)
  - A homepage audit found **7 unique [text] styles, 11 unique font sizes, 4 unique button styles**. [measured, single case] — [RadPad Interface Inventory](https://medium.com/@itsjustmath/radpad-interface-inventory-6164f62c9cc4)
- Scope the audit first: agree the criteria (colour, spacing, typography, borders, sizes). Mainmatter's own inventory covered only font size, because that was what it needed. [practitioner] — [Mainmatter: How to create an interface inventory](https://mainmatter.com/blog/2021/06/02/how-to-create-an-interface-inventory/)
- Automating the check: GitHub identified 100+ text/background pairs and replaced manual Figma checks with a script that runs contrast checks on all tokens across all themes. [company-reported] — [GitHub Blog](https://github.blog/engineering/user-experience/unlocking-inclusive-design-how-primers-color-system-is-making-github-com-more-inclusive/)

### Inferences
An AI skill can run the inventory mechanically on an existing codebase:
1. Grep or parse the CSS, Tailwind classes and computed styles.
2. Count the unique colours, font sizes, weights, line heights, radii, shadows and spacing values.
3. Cluster near-duplicates (e.g. OKLCH ΔE below a threshold, or font sizes within 1 px).
4. Map each cluster to a ramp step derived from the brand colour.
5. Re-check every text/background pair for contrast.

The audit output itself answers "how do you know what to change": the values with the most variants are where calibration has drifted.

### Gaps
- No source was found for Figma "variables audit" workflows, or for named "design token inventory" tools beyond CSS Stats and StyleStats (e.g. Project Wallace and design-lint plugins were not covered).
- No benchmark was found for a "normal" count (e.g. how many greys or font sizes a well-calibrated product has). The example counts are single cases.
- I could not confirm that CSS Stats is still maintained.

## 4. Brand refresh vs rebrand: keeping recognition

### Takeaway
Ehrenberg-Bass and Jenni Romaniuk's distinctive-assets framework says recognition lives in assets that are both **famous** (people link them to the brand) and **unique** (they link them to no other brand). Assets above both thresholds should be protected, so a UI refresh should keep them fixed and recalibrate everything around them. Rebrand risk is mainly a fame problem: changing an asset people already know throws away recognition. Internal boredom is not a reason to rebrand.

### Cited Findings
- Romaniuk's **Distinctive Asset Grid** scores each asset on **Fame** and **Uniqueness**, commonly with **50% thresholds** on both axes.
  - High fame and high uniqueness: the asset can be used alone to stand for the brand.
  - High uniqueness, low fame: invest in building it.
  - Famous but not unique: avoid using it on its own.

  [practitioner summaries of Romaniuk, *Building Distinctive Brand Assets* (2018)] — [The Brand Algorithm: Distinctive Asset Grid](https://www.the-brand-algorithm.com/distinctive-asset-grid/); [TianPan summary](https://tianpan.co/blog/2025/09/01/building-distinctive-brand-assets-by-jenni-romaniuk)
- Romaniuk recommends an "early warning system" to detect threats to distinctive assets before they become serious. [practitioner summary] — [Marketing Architects](https://www.marketingarchitects.com/blog/v41-n3-your-brand-assets-may-be-working-against-you)
- A 2026 peer-reviewed benchmark found the average distinctive asset scores **26% Fame and 54% Uniqueness**, and that **shape-based assets are strongest** across industries. [measured, academic] — [Taylor & Francis, Int. J. of Advertising 2026: Shape-based assets are strongest](https://www.tandfonline.com/doi/full/10.1080/02650487.2026.2637295)
- Practitioner blogs cite the failed Cracker Barrel rebrand as putting design trends over recognition, and argue that internal boredom is not a strategic reason to rebrand. [practitioner opinion] — [Studio Kalex](https://www.studiokalex.com/blog/distinctive-brand-assets-how-to-build-them); [Adam Arnold](https://adamarnold.me/brand-strategy-blog/what-are-distinctive-brand-assets)

### Inferences
- For the owner's case (keep the palette, fonts and logo), the distinctive-asset lens says these are probably the brand's highest-fame assets. The redesign should change **how they are deployed**, not what they are.
- Because the average asset has low fame (26%), protect whichever few assets do reach recognition. Typically that is the logo shape and the signature brand colour. Spend the redesign on everything else: neutrals, spacing, type scale, icons, states.
- A UI refresh that keeps the brand hue but changes its proportion still preserves recognition. Restraint can even sharpen the hue's distinctiveness. Using the brand colour for the primary action and active state only is consistent with Linear removing colour from decorative icon backgrounds.

### Gaps
- No primary Ehrenberg-Bass or Romaniuk text was retrieved. The grid thresholds and advice come from practitioner summaries.
- No research was found on what **software users** notice in a UI refresh (e.g. whether users notice tone or spacing changes vs navigation changes). The Vercel community pushback is anecdotal.
- NN/g material on visual design consistency was not retrieved in this session.
