# Mobile-first strategy in 2026: is it mandatory, and when should it be the priority?

Research date: 2026-10-29. Evidence tags used throughout: **[measured]** = analytics or panel data; **[expert consensus]** = documented guidance from standards bodies, platform docs or widely agreed practitioners; **[opinion]** = single practitioner, vendor or forum view; **[inference]** = my reasoning from the cited material.

Method note: in this session, WebFetch could not reach `developers.google.com`, `gs.statcounter.com` or most primary pages, because they are outside the session's allowed network domains. Every figure below comes from search-engine extracts of the cited pages. Numbers attributed to StatCounter, Contentsquare and Google come from snippets of their own pages where possible. Numbers attributed to Similarweb usually come through aggregators, and they are flagged as such. Before quoting any number publicly, check it against the primary page.

---

## 1. What share of web traffic comes from each device, globally and by site category? Where does desktop still dominate?

### Takeaway
Worldwide, mobile is a clear but not overwhelming majority of page views, roughly 52–60% in StatCounter's 2026 snapshots and about 70% of sessions in Contentsquare's Q4 2025 benchmark. The split depends far more on the *task* and the *audience* than on the year. Consumer, retail, travel and media sites run 65–90% mobile. B2B SaaS, software, developer-facing and "work" sites still run majority desktop, often 55–80%.

### Cited Findings
**Global**
- StatCounter worldwide platform share, September 2026: Mobile 58.99%, Desktop 39.26%, Tablet 1.76% [measured; page views]. Earlier 2026 months were much closer: June 2026 Mobile 52.23% / Desktop 47.77%, and July 2026 Mobile 53.37% / Desktop 46.63% [measured]. StatCounter's figures swing by several points from month to month. — [StatCounter platform share (worldwide)](https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/worldwide); [StatCounter desktop vs mobile](https://gs.statcounter.com/platform-market-share/desktop-mobile)
- Contentsquare 2026 Digital Experience Benchmark (Q4 2025, 99 billion web and app sessions, 6,500+ sites, 9 industries): 69.9% of website traffic came from mobile. Desktop was about 30% of visits but **47% of total time spent** [measured]. — [Contentsquare engagement benchmark 2026](https://contentsquare.com/guides/digital-experience-benchmark/engagement/); [Contentsquare 15 mobile analytics stats](https://contentsquare.com/guides/mobile-analytics/stats/)
- Contentsquare's guide frames this as "most people arrive on a phone, but the deepest engagement still happens on desktop" [measured + vendor framing]. — [Contentsquare mobile analytics stats](https://contentsquare.com/guides/mobile-analytics/stats/)
- Similarweb country pages: United States, November 2024: mobile 57.76%, desktop 39.91%. United Kingdom, January 2025: mobile 65.08% [measured; visits]. — [Similarweb US](https://www.similarweb.com/platforms/united-states/); [Similarweb UK](https://www.similarweb.com/platforms/united-kingdom/)

**By category**
- Retail: 77% of retail site traffic was mobile in 2025, and 23% was desktop (Contentsquare) [measured]. — [Contentsquare retail guide](https://contentsquare.com/guides/retail-digital-experience/)
- Siege Media analysed 13.4 billion sessions across 120 brands. It found mobile share by industry ranging from about **89% down to about 21%**, with a global figure of about 62%. Its central claim is that device share is driven by the *task the visitor is trying to complete* more than by the audience. Its SaaS group came out at 23.6% mobile on an all-traffic basis, and Media & Digital Content at 88.6% [measured; agency study with a disclosed sample]. — [Siege Media: Mobile vs Desktop traffic share](https://www.siegemedia.com/research/mobile-vs-desktop-traffic-share). Note: the 23.6% and 88.6% figures came through a search summary of the page, not a full read.
- An industry table attributed to Similarweb/Cloudflare for Q4 2025, via an aggregator, gives mobile shares of Travel & Hospitality 77.5%, Retail 77.0%, Media 57.9%, Financial Services 52.1%, Software 46.1%, Telecommunications 35.7% and Services 20.1% [measured, but secondary and the method is unclear]. — [MangoThrive compilation](https://mangothrive.com/mobile-vs-desktop-website-traffic/)
- B2B SaaS & Software is put at 34.7% mobile / 65.3% desktop, attributed to Similarweb via secondary sources, with Media & Publishing at 66.2% mobile [measured, secondary]. — [Quantumrun](https://www.quantumrun.com/consulting/mobile-website-traffic/); [Rubyroid Labs](https://rubyroidlabs.com/blog/mobile-optimization-b2b-websites/). This **conflicts** with MangoThrive's 46.1% for Software and Siege's 23.6% for SaaS. The defensible range for B2B SaaS and software is roughly **25–45% mobile**.
- A single B2B content platform reports 79–86% desktop visitors in 2026 [measured, n=1 site]. — [Averi](https://www.averi.ai/blog/86-desktop-in-2026-our-audience-doesn-t-read-on-phones-(and-what-we-changed))
- LinkedIn web traffic (Similarweb, August 2024 to January 2025, via aggregator): desktop 74.24%, mobile web 25.76%. Estimates that include the native app put total LinkedIn usage at about 57–70% mobile [measured, secondary; the two metrics differ]. — [SQ Magazine LinkedIn mobile vs desktop](https://sqmagazine.co.uk/linkedin-mobile-vs-desktop-statistics)

### Inferences
- [inference] "Mobile is 60% of the web" is true on average but misleading for any one site. The categories this repo targets split as follows:
  - **Mobile-majority (≈65–90%)**: consumer landing pages, e-commerce, DTC product sites, media and news, restaurants and local, travel, anything reached from social feeds.
  - **Roughly balanced (≈45–60% mobile)**: general marketing sites, finance, personal portfolios and blogs that get social traffic.
  - **Desktop-majority (≈55–80% desktop)**: B2B SaaS marketing sites, developer tools and docs, internal tools, dashboards and pro apps.
- [inference] The Contentsquare "30% of visits but 47% of time" finding is the key nuance. Even on sites where phones bring most of the *arrivals*, the deep, long, high-value sessions skew toward desktop. Phone users form first impressions, and desktop users do the deep reading.
- [inference] Developer-tool and docs sites are very likely desktop-majority, because developers work at desks. No primary dataset for "developer tools" was found (see Gaps).

### Gaps
- No primary, current Similarweb industry breakdown could be fetched. All per-industry Similarweb numbers are second-hand and inconsistent.
- No dataset was found specifically for **developer tools or docs** or for **personal portfolios**. The developer-tools claim above is an inference.
- No **news-specific** 2025–2026 primary figure was found beyond the "Media" rows above.
- StatCounter's month-to-month swing (52% in June to 59% in September 2026) was not explained in the extracts, so a methodology or panel change cannot be ruled out.

---

## 2. What is Google's mobile-first indexing status, and what does it actually require?

### Takeaway
Mobile-first indexing is finished. Google announced it as complete in October 2023, and after **July 5, 2024** sites are crawled and indexed with Googlebot Smartphone only. A site whose content cannot be reached on a phone is no longer indexable. What it requires is **content parity and accessibility on mobile**, not a mobile-first *visual design* process. A desktop-first design is fine for indexing as long as the mobile rendering contains the same content.

### Cited Findings
- Google's Search Central post "Mobile-first indexing has landed" (October 31, 2023) said the switch was complete. A small set of sites that didn't work on phones stayed on the "legacy desktop Googlebot crawler for the time being." Named failure cases were: errors shown to every mobile visitor, every mobile page redirecting to the homepage, and a mobile version blocked in robots.txt while desktop was allowed [expert consensus; Google statement relayed by secondary sources]. — [Brandon Lazovic: two end dates](https://brandonlazovic.dev/articles/mobile-first-indexing-two-dates/); [Ahrefs: Mobile-first indexing goes mobile-only](https://ahrefs.com/blog/mobile-first-indexing/)
- After **July 5, 2024**, Google crawls and indexes those remaining sites with Googlebot Smartphone only. "If your site's content is not accessible at all with a mobile device, it will no longer be indexable" [expert consensus; Google statement relayed]. — [Ahrefs](https://ahrefs.com/blog/mobile-first-indexing/); [White Label IQ July 2024 checklist](https://www.whitelabeliq.com/blog/googles-mobile-first-indexing-checklist-july-2024-update/)
- Google still sends some desktop-user-agent crawls, so seeing them in logs is expected [expert consensus, relayed]. — [Ahrefs](https://ahrefs.com/blog/mobile-first-indexing/)
- Content-parity requirements, as summarised by SEO practitioners from Google's docs: the same primary text, headings, images with the same alt text, internal links, metadata and structured data must be present on mobile. Content inside tabs or accordions still counts if it is in the mobile DOM. Content *removed* from the mobile DOM does not exist for ranking. Verify with URL Inspection, which renders as Googlebot Smartphone [expert consensus]. — [Shopify dev docs: ensure content parity mobile/desktop](https://shopify.dev/docs/storefronts/themes/best-practices/performance/ensure-content-parity-mobile-desktop.md); [Gracker SEO 101](https://gracker.ai/seo-101/mobile-first-indexing-strategies-2025)
- Google retired the Mobile-Friendly Test, the Mobile-Friendly Test API and the Search Console Mobile Usability report on December 1–4, 2023. It said mobile usability "remains a part of our page experience guidance" and pointed to Lighthouse instead [measured/official, relayed by trade press]. — [Search Engine Land](https://searchengineland.com/google-officially-drops-mobile-usability-report-mobile-friendly-test-tool-and-mobile-friendly-test-api-435377)

### Inferences
- [inference] For SEO, "mobile-first" means "**mobile-complete**". Never hide content, links or structured data from the small-screen DOM. Collapsing content into accordions or tabs is fine, but `display:none`-then-delete patterns or separate "lite" mobile templates are not.
- [inference] Google does not reward a design for being conceived on a phone first. It rewards a page that works and is complete on a phone. A desktop-first portfolio with a correct responsive layout is fully compliant.
- [inference] A rule for an AI skill: if a section is dropped at small widths "to save space", it disappears from Google's index. Restructure it (stack, collapse, carousel with all items in the DOM) instead of removing it.

### Gaps
- Google's own docs page ("Mobile-first indexing best practices") could not be fetched in this session because `developers.google.com` is not allowed. The parity list above comes from secondary summaries, which agree with each other. Verify the exact wording on the primary page.

---

## 3. What does "mobile first" mean: origin, content-first, progressive enhancement and intrinsic design? Is it a design priority, a CSS authoring order, or both?

### Takeaway
"Mobile First" (Luke Wroblewski, book 2011) was a **product and design prioritisation philosophy**. Its three arguments were that mobile was growing, that small screens force focus on what matters, and that phones add capabilities. It was quickly fused with **progressive enhancement** and the `min-width` media-query **CSS authoring order**, which Tailwind and most frameworks bake in today. "Content first" (Zeldman) and "intrinsic web design" (Jen Simmons, 2018) refine it. The real discipline is to prioritise content and let layout respond to available space, which container queries and `clamp()` now make practical. In 2026 "mobile-first" means two separable things: (a) a *thinking* discipline about priority, and (b) a *CSS* convention of writing base styles for narrow screens and adding complexity with `min-width`. You can follow (b) while designing desktop-led.

### Cited Findings
- Wroblewski's *Mobile First* (A Book Apart, 2011). Part 1 "Why Mobile First?" has three chapters: **Growth, Constraints, Capabilities**. Part 2 covers organization, actions, inputs and layout. It argues that designing for mobile first "can not only open up new opportunities for growth, it can lead to a better overall user experience" [expert consensus; primary text]. — [LukeW: Mobile First (book page)](https://lukew.com/resources/mobile_first.asp); [Mobile First PDF](https://static.lukew.com/mobilefirst/mobile-first.pdf)
- His talk framing: "mobile is seeing explosive growth; mobile forces you to focus; mobile extends your capabilities" [expert consensus]. — [WebExpo 2017 talk](https://webexpo.net/prague2017/talk/mobile-first/index.html)
- Brad Frost (2011): mobile-first is "a philosophy created by Luke Wroblewski that highlights the need to prioritize the mobile context," and mobile-first *responsive* design "comes down to using Progressive Enhancement as a foundation." He credits it with forcing designers to "focus on core content and functionality" [expert consensus]. — [Brad Frost: Mobile-First Responsive Web Design](https://v9.bradfrost.com/blog/post/mobile-first-responsive-web-design)
- An early critique of that framing: "the rallying cry is not so much about Mobile First but Content First" [opinion]. — [Adactio link log](https://adactio.com/links/4676)
- Zeldman's "Content First" talk (An Event Apart, 2012): thinking mobile first "forces you to only keep what matters." Zeldman also wrote that "design in the absence of content is not design, it's decoration" [expert consensus]. — [Zeldman: content first category](https://zeldman.com/category/content-first/); [Elmastudio notes on Zeldman](https://elmastudio.de/en/jeffrey-zeldman-thinking-mobile-first/?markdown=1)
- Jen Simmons, "Everything You Know About Web Design Just Changed" (An Event Apart Seattle, 2018), introduced **Intrinsic Web Design** as "responsive web design +". Responsive design uses flexible images, fluid columns and media queries. Intrinsic design allows flexible *or* fixed images, fluid columns *and rows*, and "doesn't necessarily need" media queries [expert consensus; secondary notes by Jeremy Keith]. — [Adactio notes on Jen Simmons](https://adactio.medium.com/676d2799bd02)
- Container queries became **Baseline Widely Available on 2025-08-14**, supported from Chrome 105, Firefox 110 and Safari 16 [measured/official]. — [web.dev Baseline digest Aug 2025](https://web.dev/blog/baseline-digest-aug-2025); [web-features explorer: container queries](https://web-platform-dx.github.io/web-features-explorer/features/container-queries)
- Tailwind's model is explicitly mobile-first. Unprefixed utilities apply at every width, and prefixed ones (`md:`) apply "at the specified breakpoint and above." Default breakpoints are sm 640, md 768, lg 1024, xl 1280 and 2xl 1536 px, and `max-*` variants exist for desktop-down overrides [expert consensus; official docs]. — [Tailwind: Responsive design](https://tailwindcss.com/docs/responsive-design); [Tailwind: Breakpoints](https://tailwindcss.com/docs/breakpoints)
- Smashing Magazine (May 2024): media queries "are still often the de facto tool," and adoption of modern intrinsic approaches "seems slow to take off" [opinion/expert]. — [Beyond CSS Media Queries (Smashing, via Conffab)](https://conffab.com/elsewhere/beyond-css-media-queries-smashing-magazine)
- `@media` is used by 93.06% of sites in Project Wallace's 2026 CSS dataset [measured]. — [Project Wallace: The CSS Selection 2026](https://deploy-preview-119--projectwallace.netlify.app/the-css-selection/2026)

### Inferences
- [inference] There are three meanings to separate, and only the first and third really matter:
  1. **Priority discipline**: decide the single most important content and action as if you only had 360 px. This is valuable for *every* project, desktop-led ones included, and it is Zeldman's "content first".
  2. **CSS authoring order**: write the narrow layout as the default and add columns with `min-width` or container queries. This is the industry default (Tailwind) and costs nothing. Narrow-first CSS is usually *less* code, because single-column flow is what the browser does by default.
  3. **Fluid/intrinsic layout**: use `clamp()` type and spacing, `grid-template-columns: repeat(auto-fit, minmax(…))`, and container queries for components. This reduces the "mobile vs desktop" binary to a continuum and is the modern best practice.
- [inference] "Mobile-first" as a *visual design* order (designing the phone comp first, then the desktop comp) is **optional**. For desktop-majority products it can actively produce worse desktop layouts (see section 5).

### Gaps
- Wroblewski's original 2009 blog post, "Mobile First" on lukew.com, is commonly cited as the term's origin. The searches in this session surfaced only the 2011 book, so the 2009 date is unverified here.
- No HTTP Archive Web Almanac 2024 or 2025 figure for `min-width` vs `max-width` usage, container-query adoption or `clamp()` adoption was retrieved, because almanac.httparchive.org was not reachable through search extracts.
- No primary source for `clamp()`/Utopia fluid-type guidance was retrieved. The recommendation is expert practice and is uncited here.

---

## 4. Is there a conversion or engagement gap between mobile and desktop, and what causes it?

### Takeaway
Most large datasets still show desktop converting better per session. Contentsquare's 2026 benchmark has desktop at about 3.4% vs mobile at about 2%. Desktop also gets more time per visit. However, the gap is contested and partly a mix effect, and one dataset (Dynamic Yield, late 2025 to 2026) now shows mobile ahead. Mobile visitors add to cart more but abandon more. The gap is caused by task type (browse on phone, buy or compare on desktop), cross-device journeys, friction in forms and checkout, and mediocre mobile UX, not by phones being inherently inferior.

### Cited Findings
- Contentsquare 2026 benchmark (Q4 2025): average conversion **3.4% desktop vs 2% mobile** across industries, and **3.7% vs 2%** in retail [measured]. — [Contentsquare engagement benchmark 2026](https://contentsquare.com/guides/digital-experience-benchmark/engagement/); [Contentsquare conversions benchmark](https://contentsquare.com/guides/digital-experience-benchmark/conversions/)
- Contentsquare 2025 benchmark (2024 data, 90 billion sessions, 6,000 sites): conversion rates fell 6.1% year over year, and 40% of visits were affected by user frustration [measured; not split by device]. — [Contentsquare 2025 benchmarks](https://contentsquare.com/blog/2025-digital-experience-benchmarks/)
- Dynamic Yield, trailing 12 months October 2025 to September 2026: **mobile 2.86% vs desktop 2.23%**. This reverses its 2024 data (desktop 3.2%, mobile 2.8%). Mobile add-to-cart was 6.35% vs 5.21% on desktop, but cart abandonment was 79.84% vs 69.48% [measured, via aggregator]. — [Exploding Topics conversion benchmarks](https://explodingtopics.com/blog/ecommerce-conversion-rate); [RetentionEdge mobile conversion](https://retentionedge.co/articles/average-mobile-ecommerce-conversion-rate)
- One analysis attributes the Dynamic Yield reversal to **sector mix**. Beauty, the best-converting sector, gets about 91% of its traffic from mobile, while Home & Furniture, one of the lowest, gets about 63% [opinion/analysis]. — [RetentionEdge](https://retentionedge.co/articles/average-mobile-ecommerce-conversion-rate)
- Littledata (Shopify): median conversion is about 1.5% on both devices, but median add-to-cart is 5.4% on mobile vs 9.9% on desktop [measured, via aggregator]. — [Exploding Topics](https://explodingtopics.com/blog/ecommerce-conversion-rate)
- For B2B SaaS, a vendor claims that "70%+ of paid conversions still happen on desktop even when 50%+ of traffic is mobile" [opinion/vendor]. — [Sleek: Mobile vs desktop analytics 2026](https://getsleek.io/blog/mobile-vs-desktop-analytics-2026)
- Baymard 2025 mobile e-commerce benchmark (52,000+ rated elements, 150+ leading sites): mobile UX "improved significantly in 2025, yet most sites still rank as 'mediocre,' bordering on 'poor'" [measured; expert audit]. — [Baymard: Mobile UX trends](https://baymard.com/blog/mobile-ux-ecommerce)
- NN/g (comprehension study): there was "no practical differences in the comprehension scores" between phone and computer readers, but phone readers read slightly slower. NN/g still recommends brevity on mobile [measured]. — [NN/g: Mobile content](https://www.nngroup.com/articles/mobile-content/)
- NN/g 2013 (**old**): task success was 80% on PCs vs 59% on phones. On phones, mobile-specific sites scored 64% vs 53% for full desktop sites [measured, dated 2013]. — [MediaPost on NN/g report](https://www.mediapost.com/publications/article/110103/report-mobile-web-is-miserable.html)

### Inferences
- [inference] The causes in order of evidence: (1) **intent and task mix**: phones get discovery and social traffic, while desktops get deliberate, comparison and purchase sessions (Siege's "task" thesis, Contentsquare's time-spent split). (2) **Friction**: forms, checkout and long comparisons are harder on phones, which shows up as higher mobile abandonment. (3) **Mediocre mobile UX** (Baymard). (4) **Cross-device journeys**: discover on the phone, convert on the laptop.
- [inference] For a portfolio or product landing page, the phone visit's job is usually to **earn the return visit or the save/share**, not to close. So the phone first screen must instantly communicate who or what this is and offer one easy next step: contact, email, "send to desktop", or a calendar link.
- [inference] Comprehension parity (NN/g) means you don't need to dumb content down for phones. You need to **structure** it: shorter paragraphs, clear headings, and progressive disclosure.

### Gaps
- No Baymard device-level *conversion* figure could be verified. Aggregators attribute conflicting numbers to Baymard.
- No B2B SaaS lead-form conversion split by device was found from a primary or neutral source.
- No conversion or engagement data for portfolios or personal sites exists in the sources found.

---

## 5. When is desktop-first the right call? What are the risks of each approach? (Decision rules)

### Takeaway
Desktop-first, or more precisely **desktop-led design with mobile-complete content**, is right when the product's core job happens at a desk: dense tools, dashboards, pro apps, developer tools and B2B SaaS where analytics show 55%+ desktop. Mobile-led design is right for consumer, social-traffic, retail and local sites. Most portfolios and product marketing sites are "both, equally": the first impression and contact path must be flawless on a phone, and the showcase must be rich on desktop. Each approach has a characteristic failure: desktop designs **crammed** onto phones, and mobile designs **stretched** into empty, low-density desktops.

### Cited Findings
- Desktop-first means planning for large screens and adapting down. It "suggests itself" for complex navigation or data-heavy content, but must still be balanced so mobile users are not an afterthought [opinion/glossary]. — [Branded Agency: desktop-first](https://www.brandedagency.com/glossary-keywords/desktop-first)
- Desktop dashboards serve comparison, filtering, exports and multi-column analysis. Phone use is mostly checking status, responding to an alert or confirming a small action. Treating a desktop dashboard as a narrower layout "breaks or looks cluttered" [opinion/practitioner]. — [skills.sh mobile-responsive-ux](https://www.skills.sh/jacob-balslev/skill-graph/mobile-responsive-ux); [Fuselab: How to design a mobile dashboard](https://fuselabcreative.com/how-to-design-a-mobile-dashboard/)
- Mobile-first's main benefit is forcing teams to prioritise and cut clutter [opinion/practitioner]. — [Designing all-device Tableau dashboards](https://design.forem.com/dipti_m_2e7ba36c478d1a48a/designing-all-device-compatible-tableau-dashboards-a-complete-guide-3lm8)
- Desktop gets 30% of visits but 47% of time spent, so the deep work is on desktop [measured]. — [Contentsquare mobile stats](https://contentsquare.com/guides/mobile-analytics/stats/)
- NN/g 2013 (old): full desktop sites on phones scored 53% task success vs 64% for mobile-specific sites. This is the cost of *cramming* [measured, dated]. — [MediaPost on NN/g](https://www.mediapost.com/publications/article/110103/report-mobile-web-is-miserable.html)
- B2B SaaS and software traffic is roughly 55–75% desktop (sources conflict, see section 1) [measured, secondary]. — [Siege Media](https://www.siegemedia.com/research/mobile-vs-desktop-traffic-share); [Quantumrun](https://www.quantumrun.com/consulting/mobile-website-traffic/)

### Inferences
**Decision rules for the skill** [inference, synthesised from sections 1–5]
1. **Mobile-led** (design the phone composition first; desktop is the enhancement) applies when *any* of these hold:
   - consumer, retail or DTC, food, local, events, travel
   - the main traffic source is social (Instagram, TikTok, X), SMS or QR codes
   - the page is a single-action landing page (sign-up, waitlist, buy)
   - analytics or the category benchmark is above 60% mobile
2. **Desktop-led** (design the 1280–1440 composition first, then deliberately re-compose for phones) applies when *any* of these hold:
   - dashboards, admin, analytics, editors, IDE-like or pro tools, data tables
   - B2B SaaS or developer-tool product sites and docs
   - the core task needs a keyboard, multiple panes, comparison or long sessions
   - analytics are above 55% desktop

   For **app screens** of this type, the phone version should be a *different, reduced task set* (status, alerts, approvals, a single record view), not a reflowed copy.
3. **Both, equally** (sketch the 390 and 1440 compositions together, and neither is derived from the other) applies to:
   - personal portfolios
   - product marketing sites with mixed traffic
   - agency and studio sites
   - editorial sites where both the phone first impression *and* desktop depth matter
4. **Always, regardless of which applies**:
   - mobile-complete content (Google indexing)
   - narrow-first CSS (`min-width` / Tailwind defaults)
   - fluid type and spacing
   - verification at phone widths before shipping
   - no horizontal scroll
   - tap targets ≥24 px (44 px preferred)

**Characteristic failure modes** [inference; the "cramming" one is supported by NN/g data]
- *Desktop crammed onto phone*: tiny multi-column grids, hover-only affordances, giant hero images pushing the headline below the fold, 12-item nav menus, data tables that overflow, modals bigger than the viewport, and tap targets that are too small.
- *Mobile stretched onto desktop*: a single centred 600 px column floating in whitespace, a hamburger menu at 1440 px, phone-sized cards in a one-column stack, oversized buttons, and no use of horizontal space for comparison, side-by-side media or richer layouts. This is the classic "AI-generated landing page" look: generic, under-designed and low-density. For a taste skill, this is the more relevant risk, because AI generators default to safe, stacked, centred layouts.
- The fix for both is to treat the narrow and wide layouts as **two compositions of the same content priority**, connected by fluid rules, rather than one being an automatic resize of the other.

### Gaps
- No rigorous study was found that compares outcomes of desktop-led vs mobile-led design processes for SaaS or dashboards. The guidance is practitioner opinion.
- The vendor claim that "60% of dashboard consumption happens on mobile" (Perceptive Analytics) has no methodology and was excluded as unreliable.

---

## 6. Who views developer and designer portfolios, and on what device?

### Takeaway
There is **no reliable, current dataset** on recruiter or hiring-manager device usage for portfolios. The evidence is anecdotal and mixed. One portfolio owner's analytics showed about 70% desktop. Some creative directors say they often look only on phones. Recruiters sometimes do a 30-second phone triage. LinkedIn *web* traffic is about 74% desktop, but LinkedIn *usage* including the app is majority mobile. So links clicked inside the LinkedIn or X apps, or from email on a phone, will open on mobile. The safe rule is that **the first impression must be excellent on a phone and the full evaluation must be excellent on desktop**.

### Cited Findings
- 2016 hiring panel (UX portfolios, **old**): a recruiter said he "sometimes views portfolios on his phone" and spends about 30 seconds on a first pass. Another panellist said "Make sure it's mobile-friendly" [opinion; dated]. — [Medium/theuxblog: What recruiters look for](https://medium.com/theuxblog/what-do-recruiters-and-hiring-managers-look-for-in-a-ux-portfolio-2ed9e7c1c207)
- Glassdoor designer community thread (about 2 years old): a group creative director said they often view portfolios only on mobile. A UX designer reported "About 70% of my portfolio visits are on desktop." Several reviewers check responsiveness by resizing a desktop browser [opinion/anecdotal; one data point is measured, n=1]. — [Glassdoor community thread](https://www.glassdoor.com/Community/ui-and-ux-designers/do-u-think-its-necessary-to-optimize-ur-portfolio-on-mobile-screens-is-there-any-hiring-manager-really-looking-at-a-candidatea)
- LinkedIn: Similarweb web-only traffic for August 2024 to January 2025 was desktop 74.24% / mobile 25.76%. App-inclusive estimates put about 57–70% of usage on mobile, and about 74% of *time spent* on mobile per app analytics [measured, secondary; the metrics differ]. — [SQ Magazine: LinkedIn mobile vs desktop](https://sqmagazine.co.uk/linkedin-mobile-vs-desktop-statistics)
- LinkedIn's own historical figure: 58% of all traffic was mobile by Q1 2016 [measured; old]. — [Medianama LinkedIn Q1 FY16](https://www.medianama.com/2016/05/223-linkedin-q1fy16-results/)
- Email: Litmus data puts 41.6% of email opens on mobile clients, 40.6% webmail and 16.2% desktop clients (date unclear; secondary). Another 2025 source claims 55% on phones and tablets [measured, secondary, conflicting]. — [Mailmodo mobile email stats](https://www.mailmodo.com/guides/mobile-email-statistics); [Genesys Growth](https://genesysgrowth.com/blog/mobile-email-engagement-stats-for-marketing-leaders)

### Inferences
- [inference] Portfolio traffic is **bimodal by source**:
  - **Phone**: social shares (X, LinkedIn feed and app, Bluesky, Instagram), DMs, QR codes from talks or CVs, and email links opened on phones. These are usually triage-level glances.
  - **Desktop**: ATS and recruiter workflows, take-home review, hiring managers doing a deep read, and links opened from desktop LinkedIn or Gmail.
- [inference] A developer's portfolio targeting engineering hiring managers likely skews desktop, because the deep review happens at work. But the *first* touch is often a phone tap from a social or LinkedIn feed, and a broken phone experience kills the second look.
- [inference] Practical portfolio rule. **Design both equally.** On a 390 px phone, the first viewport must show name, role, a one-line value statement and a visible primary link (work, contact or CV). Project cards must be tappable and fast, and case studies readable without zooming. On desktop, use the width for richer project showcases (larger media, side-by-side code and screenshots, multi-column case-study layouts) instead of a stretched phone column.
- [inference] The owner should **instrument his own site** (e.g. Plausible, Umami or Vercel Analytics), split by device *and referrer*, and revisit after a few weeks. Real data beats any benchmark here.

### Gaps
- No survey (2023–2026) of recruiters or hiring managers on portfolio-viewing devices was found.
- No data was found on the share of LinkedIn or X *outbound link clicks* that occur on mobile.
- No developer-portfolio-specific analytics dataset (beyond the n=1 anecdote) was found.

---

## 7. Practical rules: which widths to design and verify, and what must work first on a phone?

### Takeaway
Verify at a small set of real-world CSS widths: **360, 390–393 and 414–430** (phones), **768** (portrait tablet or large phone landscape), **1024** (small laptop or landscape tablet), **1280–1366** (common laptops), **1440 and 1536** (the most common scaled desktop widths), and **1920** (full HD). Use fluid rules between them rather than designing only at the breakpoints. On phones, the non-negotiables are complete content, no horizontal scroll, readable type without zoom, ≥24 px tap targets (44 px preferred), a visible primary action, and fast first paint.

### Cited Findings
- StatCounter worldwide screen resolutions (all platforms, September 2026): 414×896 at 8.03%, 1920×1080 at 10.7%, 360×800 at 4.82% and 390×844 at 3.64%. Desktop only (August 2026): 1920×1080 at 22.22% and 1536×864 at 6.7% [measured]. — [StatCounter screen resolution stats](https://gs.statcounter.com/screen-resolution-stats/desktop-mobile-tablet/worldwide); [StatCounter desktop resolutions](https://gs.statcounter.com/screen-resolution-stats/desktop-ww/worldwide)
- "1920×1080 remains the most common desktop resolution," and many phones report viewports of about 360×800 CSS pixels [expert/secondary]. — [Clutch: most common screen resolutions](https://clutch.co/resources/most-common-screen-resolutions-website-dimensions)
- Tailwind default breakpoints: 640 / 768 / 1024 / 1280 / 1536, all `min-width`, so mobile is the default [expert consensus/official]. — [Tailwind breakpoints](https://tailwindcss.com/docs/breakpoints)
- WCAG 2.2 SC 2.5.8 Target Size (Minimum, AA): 24×24 CSS px, or enough spacing that a 24 px circle centred on the target doesn't touch another target. Inline text links are exempt. AAA 2.5.5 asks for 44×44. Apple's HIG says 44 pt and Material says 48 dp [expert consensus/standard]. — [AllAccessible: WCAG 2.5.8 guide](https://allaccessible.org/blog/wcag-258-target-size-minimum-implementation-guide); [Disability World: 2.5.8](https://www.disabilityworld.org/toolkit/standards/wcag/2-5-8-target-size-minimum/)
- Container queries are Baseline Widely Available as of August 2025, so component-level responsiveness is production-safe [measured/official]. — [web.dev Baseline digest Aug 2025](https://web.dev/blog/baseline-digest-aug-2025)
- Google points to Lighthouse for mobile usability checks since retiring the Mobile-Friendly Test (December 2023) [official, relayed]. — [Search Engine Land](https://searchengineland.com/google-officially-drops-mobile-usability-report-mobile-friendly-test-tool-and-mobile-friendly-test-api-435377)
- NN/g: comprehension is equal on phones, but reading is slower, so be brief and structure content [measured]. — [NN/g mobile content](https://www.nngroup.com/articles/mobile-content/)

### Inferences
**Verification widths for the skill's real-browser inspector** [inference from StatCounter + Tailwind]

| Width (CSS px) | Represents | Why check |
|---|---|---|
| 360 | Small and mid Android (360×800 class) | Narrowest common width. Catches overflow, long words, buttons that don't fit |
| 390 / 393 | Current iPhone and Pixel class | Most common modern phone width. Primary phone comp |
| 414–430 | Large phones (414×896 class, Pro Max) | Checks that the layout doesn't look sparse |
| 768 | Portrait tablet / `md` | The awkward middle where two-column layouts often break |
| 1024 | Landscape tablet, small laptop / `lg` | Where desktop nav usually appears. Check nav doesn't wrap |
| 1280–1366 | Mainstream laptops / `xl` | Common real laptop viewport after browser chrome |
| 1440 / 1536 | Typical designer comp; 1920 at 125% Windows scaling | Primary desktop comp. 1536×864 is the #2 desktop resolution (inference: it is 1920 scaled 125%) |
| 1920+ | Full HD | Check max-width containers and that hero media and type don't become absurd |

**What must work first on a phone** [inference; grounded in Google parity, WCAG and NN/g]
1. All content and links present: no content removed at small widths (Google indexing).
2. No horizontal scroll at 360 px. Long words, URLs and code blocks wrap or scroll inside their own container.
3. Body text at least about 16 px with comfortable line length. No zooming needed.
4. Tap targets at least 24×24 CSS px (WCAG AA), and aim for 44 px on primary actions.
5. The first viewport communicates who or what it is and shows one primary action. The hero image must not push the headline off-screen.
6. Navigation is reachable with one thumb. Nothing depends on hover.
7. Forms use proper `type` and `inputmode`, autocomplete, and labels that stay visible.
8. Performance: images are sized and lazy-loaded, no layout shift, and fonts don't block text.
9. Tables, code and charts get explicit small-screen treatments: scroll containers, card transforms or summaries.

**What must use the width on desktop** (anti-"stretched mobile") [inference]
- The layout must not be a single narrow column centred at 1440 unless that is a deliberate editorial choice with a strong typographic grid.
- Use multi-column compositions, asymmetric grids, larger media, side-by-side comparison and persistent navigation.
- Constrain *text* measure to about 60–75 characters, not the whole layout.

**CSS approach** [inference; expert practice]
- Write narrow-first base styles and add `min-width` media queries for page-level layout changes. Use container queries for components that appear in different column widths. Use `clamp()` for type scale and section spacing. Use `minmax()` and `auto-fit` grids to cut breakpoint count.
- Design-first order is independent of this: a desktop-led design can still be authored narrow-first in CSS.

### Gaps
- Current, primary 2025–2026 *viewport* (as opposed to *screen resolution*) distribution data was not retrieved. StatCounter reports screen resolution, which for phones roughly equals CSS viewport width, but for desktops overstates the viewport because of browser chrome and scaling.
- No primary source was retrieved for recommended body-text minimums or line-length (60–75 characters). These are long-standing typographic conventions but are uncited here.
- No web.dev or Utopia primary page on `clamp()` fluid scales was retrieved in this session.
