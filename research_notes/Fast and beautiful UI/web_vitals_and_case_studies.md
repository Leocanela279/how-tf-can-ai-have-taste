# Beautiful vs fast: Core Web Vitals, design choices that hurt loading and responsiveness, real-world data, and fast-and-beautiful case studies

Research date: 2026-10-29. Evidence labels used throughout:
- **[Measured-field]**: real-user data (CrUX or RUM).
- **[Measured-lab]**: synthetic tests (Lighthouse, WebPageTest).
- **[Vendor/self-reported]**: a company reporting its own results, or Google reporting partner results. No independent audit.
- **[Guidance]**: normative documentation from a standards or browser vendor.
- **[Opinion]**: a commentator's view.
- **[Secondary]**: an aggregator or second-hand account of a primary source I could not open.

---

## 1. Core Web Vitals thresholds and evidence of business impact

### Takeaway
"Good" means LCP ≤ 2.5 s, INP ≤ 200 ms and CLS ≤ 0.1, measured at the 75th percentile of page loads, separately for mobile and desktop. The business-impact evidence is plentiful but almost all of it is self-reported by Google or its partners. The best-designed study is Deloitte's 37-brand analysis, which was commissioned by Google. None of the figures are independent peer-reviewed research.

### Cited Findings
**Thresholds [Guidance]**
- Good thresholds are LCP within 2.5 s, INP of 200 ms or less, and CLS of 0.1 or less. Google says to assess the 75th percentile of page loads, segmented by mobile and desktop. The page was last updated 2024-10-31. — [web.dev: Web Vitals](https://web.dev/articles/vitals)
- INP was promoted in 2023 and became a stable Core Web Vital in 2024, replacing FID. — [web.dev: Web Vitals](https://web.dev/articles/vitals)
- A secondary source dates the swap to March 2024. INP measures every interaction during the page's lifetime, not just the first. — [Secondary, via Preply/Medium search result](https://medium.com/preply-engineering/how-preply-improved-inp-on-a-next-js-application-without-react-server-components-and-app-router-491713149875)
- The "poor" cut-offs (commonly LCP > 4 s, INP > 500 ms, CLS > 0.25) only appear as graphics on the vitals page, so the text-only fetch could not confirm them this session. See the Gaps section. — [web.dev: Web Vitals](https://web.dev/articles/vitals)

**Deloitte "Milliseconds Make Millions" (2020) [Vendor-commissioned measured-field; correlational]**
- Deloitte Digital studied four weeks of mobile data from 37 brands in retail, travel, luxury and lead generation, across Europe and the US. — [web.dev case study](https://web.dev/case-studies/milliseconds-make-millions); [WARC summary](https://www.warc.com/en/article/milliseconds-make-millions%3A-a-study-on-how-improvements-in-mobile-site-speed-positively-affect-a-brand%E2%80%99s-bottom-line-4ce17b61c16949cbb961036aafa85dbb)
- A 0.1 s improvement in mobile site speed went with +8.4% conversions for retail and +10.1% for travel. Retail shoppers also spent 9.2% more. WARC rounds the conversion figures to 8% and 10%. — [web.dev](https://web.dev/case-studies/milliseconds-make-millions); [WARC](https://www.warc.com/en/article/milliseconds-make-millions%3A-a-study-on-how-improvements-in-mobile-site-speed-positively-affect-a-brand%E2%80%99s-bottom-line-4ce17b61c16949cbb961036aafa85dbb); [The Drum](https://www.thedrum.com/news/2020/05/21/milliseconds-make-millions-report-finds-faster-site-speed-increases-revenue-brands)
- The 0.1 s gain had to hold on four speed metrics across every page of the user journey. — [web.dev](https://web.dev/case-studies/milliseconds-make-millions)
- Quality note: Google commissioned the study, and it is observational across brands, not a controlled experiment.

**Google bounce data [Vendor claim, 2017]**
- Think with Google says the probability of bounce rises 32% as page load time goes from 1 s to 3 s. — [Think with Google](https://thinkwithgoogle.com/data/page-load-time-statistics)
- The widely repeated "53% of mobile visitors leave after 3 s" figure is often credited to Google. The search found it attributed to Akamai in a stats roundup, and I could not confirm a Google primary source. Do not cite it as Google/SOASTA without checking. — [websitesetup.org roundup](https://websitesetup.org/website-load-time-statistics/)
- Quality note: the methodology (the Google/SOASTA neural-net model) is not documented on the page, so treat the 32% as a vendor claim.

**web.dev "business impact" collection [Vendor/self-reported; Google publishes partner stories]**
- Vodafone Italy: LCP improved 31%, sales rose 8%. Vodafone ran this as an A/B test, per the original web.dev case. — [web.dev](https://web.dev/case-studies/vitals-business-impact)
- Redbus: CLS fell from 1.65 to 0 and TBT from about 1,200 ms to 700 ms. Mobile conversion rose 80–100%. — [web.dev](https://web.dev/case-studies/vitals-business-impact)
- Lazada: LCP was 3x faster and mobile conversion rose 16.9%. — [web.dev](https://web.dev/case-studies/vitals-business-impact)
- Agrofy: LCP improved 70% and load abandonment fell 76%. — [web.dev](https://web.dev/case-studies/vitals-business-impact)
- Yahoo! Japan: fixing CLS cut poor pages by 98% and lifted page views per session by 15%. — [web.dev](https://web.dev/case-studies/vitals-business-impact)
- AliExpress: CLS was 10x better and LCP 2x better, and bounce fell 15%. — [web.dev](https://web.dev/case-studies/vitals-business-impact)
- Tokopedia: LCP improved 55% and average session duration rose 23%. — [web.dev](https://web.dev/case-studies/vitals-business-impact)
- Nykaa: LCP improved 40% and organic traffic from tier-2/3 cities rose 28%. — [web.dev](https://web.dev/case-studies/vitals-business-impact)
- Cdiscount: all three metrics improved, giving a 6% revenue uplift on Black Friday. — [web.dev](https://web.dev/case-studies/vitals-business-impact)
- iCook: CLS improved 15% and ad revenue rose 10%. — [web.dev](https://web.dev/case-studies/vitals-business-impact)
- GEDI: CLS fell 77% and bounce fell 8%. — [web.dev](https://web.dev/case-studies/vitals-business-impact)
- Trendyol: INP was cut 50%, from 963 ms on the mobile product listing page, with a 1% uplift in click-through rate. — [web.dev Trendyol INP](https://web.dev/case-studies/trendyol-inp)

**Classic response-time limits [Opinion/HCI synthesis, long-standing]**
- Nielsen's limits are:
  - 0.1 s feels instantaneous.
  - 1 s keeps the user's flow of thought intact, though the delay is noticed.
  - 10 s is the limit for holding attention.

  Over 10 s needs a percent-done indicator and a way to interrupt. The 2014 update says the limits have not changed in decades. — [NN/g, Response Times: 3 Important Limits](https://www.nngroup.com/articles/response-times-3-important-limits/)

### Inferences
- The thresholds line up well with Nielsen's limits. INP ≤ 200 ms sits between "instant" (100 ms) and "flow" (1 s), and LCP 2.5 s is the "flow is breaking" zone on a real phone.
- The business-impact case studies suffer from survivorship and selection bias, since only wins get published. Many also bundle speed work with other product changes; NDTV, for example, is explicitly "with other product changes". The skill should present these as directional evidence, not guaranteed ROI.
- The most defensible general claim is that speed regressions measurably hurt conversion and engagement on mobile, and that the effect appears even at the 100 ms scale (Deloitte).

### Gaps
- The "needs improvement" and "poor" thresholds were not text-verified this session. Check them against web.dev/articles/defining-core-web-vitals-thresholds.
- I found no independent, peer-reviewed study tying Core Web Vitals to revenue across many sites. Everything found is Google-published or Google-commissioned.
- I did not locate a primary source for the "53% abandon after 3 s" figure.

---

## 2. Design choices that hurt LCP, INP and CLS

### Takeaway
The signature moves of design-led sites line up with the metrics they damage:
- **LCP:** hero media, lazy-loaded or unprioritized hero images, and preloaders.
- **CLS:** many web-font families and weights, plus unsized images and embeds.
- **INP and TBT:** JS animation and scroll libraries, client hydration, and third-party scripts.

Real-world data shows each of these failure modes is common, not hypothetical.

### Cited Findings
**LCP: images and hero media [Measured-field/lab, Web Almanac 2025, data from July 2025]**
- Images are the LCP element on 85.3% of desktop and 76.0% of mobile pages. Text is the LCP element on 14.4% and 23.7%. — [Web Almanac 2025 Performance](https://almanac.httparchive.org/en/2025/performance)
- About 16–17% of pages lazy-load their LCP image, which is an anti-pattern. Native `loading="lazy"` on the LCP image is 10.4% on mobile and 11.5% on desktop. — [Web Almanac 2025 Performance](https://almanac.httparchive.org/en/2025/performance)
- Only about 17% of mobile pages use `fetchpriority="high"` on the LCP image, up from 15% in 2024. Preload is about 2.1–2.2%. — [Web Almanac 2025 Performance](https://almanac.httparchive.org/en/2025/performance)
- LCP image formats are JPG 57%, PNG 26%, WebP 11% and AVIF 0.7%. — [Web Almanac 2025 Performance](https://almanac.httparchive.org/en/2025/performance)
- LCP pass rate ("good") is 74% on desktop and 62% on mobile. Poor is 7% and 13%. — [Web Almanac 2025 Performance](https://almanac.httparchive.org/en/2025/performance)
- Only 13% (desktop) and 15% (mobile) of pages pass the render-blocking-resources audit. — [Web Almanac 2025 Performance](https://almanac.httparchive.org/en/2025/performance)
- Video bytes are growing. The median video bytes per page rose 28% year on year, from 246 KB to 315 KB. Among home pages that use video, the median is 512 KB on mobile and 288 KB on desktop. At the 90th percentile, video is 4.8 MB on mobile. — [Web Almanac 2025 Page Weight](https://almanac.httparchive.org/en/2025/page-weight)

**CLS: fonts, unsized images and embeds [Measured, Web Almanac 2025]**
- 62% of mobile and 65% of desktop pages have at least one unsized image. The median is 2 unsized images per page, at about 100 px tall each. — [Web Almanac 2025 Performance](https://almanac.httparchive.org/en/2025/performance)
- CLS "good" is 81% on mobile and 72% on desktop, up from 62% in 2021. CLS is now the least-failed metric. — [Web Almanac 2025 Performance](https://almanac.httparchive.org/en/2025/performance)
- Font usage:
  - About 88% of pages use web fonts.
  - The median font file is about 35–36 KB.
  - Median font bytes on a home page are 122 KB (mobile) and 139 KB (desktop).

  — [Web Almanac 2025 Fonts](https://almanac.httparchive.org/en/2025/fonts); [Web Almanac 2025 Page Weight](https://almanac.httparchive.org/en/2025/page-weight)
- `font-display` usage:
  - `swap` on about 50% of pages.
  - `block` on about 25%, mostly icon fonts.
  - `fallback` on about 5%.
  - `optional` on about 0.5%.

  — [Web Almanac 2025 Fonts](https://almanac.httparchive.org/en/2025/fonts)
- Font preload is on about 12% of pages. Variable fonts are on about 39–41% of sites, up from 33–34%. WOFF2 is about 65% of font requests. Google Fonts appears on 54% of desktop and 47% of mobile sites. — [Web Almanac 2025 Fonts](https://almanac.httparchive.org/en/2025/fonts)
- **Mechanism [Guidance].** `font-display: swap` causes a layout shift when the fallback is replaced by the web font. Matching the fallback's metrics fixes this:
  - `ascent-override`, `descent-override` and `line-gap-override` noticeably reduce the shift.
  - Adding `size-adjust` can effectively eliminate it.
  - Tooling: `next/font` does this automatically from Next 13, Nuxt has `@nuxtjs/fontaine`, and there is the standalone Fontaine library.

  — [Chrome for Developers: Improved font fallbacks](https://developer.chrome.com/blog/font-fallbacks) (last updated 2023-02-10)
- Font-related resource hints: `preconnect` 22%, `dns-prefetch` 24%, `preload` 15–16%. — [Web Almanac 2025 Performance](https://almanac.httparchive.org/en/2025/performance)

**INP and TBT: JavaScript, animation, hydration, third parties [Measured + case studies]**
- Mobile INP "good" is 77% and desktop is 97%. The top-1,000 mobile sites manage only 63%, up from 53%, so big rich sites do worse than average on mobile. — [Web Almanac 2025 Performance](https://almanac.httparchive.org/en/2025/performance)
- Median mobile Total Blocking Time in the lab is 1,916 ms, up 58% from 1,209 ms in 2024. The 90th percentile is 7,555 ms. Desktop median is 92 ms. — [Web Almanac 2025 Performance](https://almanac.httparchive.org/en/2025/performance)
- 40% of mobile and 44% of desktop pages have non-composited animations, meaning they animate properties that force layout or paint. — [Web Almanac 2025 Performance](https://almanac.httparchive.org/en/2025/performance)
- Median JavaScript is 646 KB on mobile across 22 requests. The 90th percentile is 1.9 MB. — [Web Almanac 2025 Page Weight](https://almanac.httparchive.org/en/2025/page-weight)
- Hydration [Vendor/self-reported engineering blog]: Preply found that interactions during hydration are slower, which hurts INP on a Next.js app. — [Preply Engineering](https://medium.com/preply-engineering/how-preply-improved-inp-on-a-next-js-application-without-react-server-components-and-app-router-491713149875)
- Trendyol [Vendor/self-reported]: the worst long task was an IntersectionObserver callback calling React `setState` during scroll. The fix was deferring work with `setTimeout` or `scheduler.yield()`. — [web.dev Trendyol](https://web.dev/case-studies/trendyol-inp)
  - This pattern is exactly what scroll-reveal animations do.
- Economic Times [Vendor/self-reported, lab]: load-time TBT fell from 3,260 ms to 120 ms. — [web.dev Economic Times](https://web.dev/case-studies/economic-times-inp)
- Third parties [Measured-lab, older and indirect]: Greenspector found betterup.com made over 200 requests to about 50 domains on load. It reached over 400 requests and over 12 MB when scrolled to the bottom, and accepting cookies triggered about 30 more requests. — [Greenspector 2022](http://greenspector.com/en/resources/blog/analysis_sites_nominated_mobile_excellence_awwwards/)

**Preloaders and intro animations**
- I found no measured study isolating the cost of preloaders or intro animations. By definition, LCP is when the largest content element renders. A full-screen loader that hides content until JS and assets finish pushes LCP to after the loader. This is an inference, not a measurement.

### Inferences
- Signature design moves map to metric failures as follows:
  - **Full-bleed hero photo or video → LCP.** It is fine if the hero is a correctly sized AVIF/WebP with `fetchpriority="high"`, not lazy-loaded, and served from the same origin. Hero video should have a lightweight poster image as the LCP candidate.
  - **Two or three display families in several weights → CLS and LCP.** Text-LCP pages wait on fonts. Use variable fonts, subset, preload only the one critical face, and add metric-matched fallbacks.
  - **Scroll-triggered reveal and smooth-scroll libraries → INP and TBT.** They tie up the main thread and often animate non-composited properties. Prefer CSS transforms and opacity, plus CSS scroll-driven animations.
  - **Preloader or intro sequence → LCP.** It delays the very thing LCP measures.
  - **Embeds, ads, cookie banners and analytics → CLS and INP.**
- The 58% jump in median mobile TBT in a single year (Almanac 2025), while INP pass rates rose, suggests the problem is not solved. Lab main-thread work keeps growing even as field INP improves, perhaps because of real-world device mixes and the newer scheduling APIs.

### Gaps
- I found no published measurement attributing LCP or INP regressions specifically to GSAP, Lenis, Framer Motion or Three.js across many sites.
- I found no quantitative study on preloaders or intro animations.
- The Almanac 2025 Fonts chapter text I read did not report `size-adjust` or metric-override usage. That may be in the unread tail of the chapter.

---

## 3. Real-world data: page weight, CrUX pass rates, and how award or design-gallery sites score

### Takeaway
About half of origins pass all three Core Web Vitals: 48% on mobile and 56% on desktop in 2025. Pages keep getting heavier, with a 2.56 MB median mobile home page in 2025, up 8.4% year on year. I found no rigorous public study of Awwwards Site-of-the-Day Core Web Vitals. The only measured data is a small 2022 Greenspector analysis of Awwwards "Mobile Excellence" nominees, which found a wide spread from about 1 MB to 12 MB or more.

### Cited Findings
**Core Web Vitals pass rates [Measured-field, CrUX via Web Almanac 2025, July 2025 data]**
- All three Core Web Vitals pass on 48% of mobile origins (44% in 2024, 36% in 2023) and 56% of desktop origins (55% in 2024). — [Web Almanac 2025 Performance](https://almanac.httparchive.org/en/2025/performance)
- By rank:
  - The top 1,000 sites pass 51% on mobile.
  - The top 100,000 drop to 37%.
  - The rate recovers to 48% across all origins.

  — [Web Almanac 2025 Performance](https://almanac.httparchive.org/en/2025/performance)
- Home pages pass less often than secondary pages: 45% vs 56% on mobile, and 47% vs 61% on desktop. — [Web Almanac 2025 Performance](https://almanac.httparchive.org/en/2025/performance)
  - This matters because design ambition concentrates on the home page and hero.
- FCP "good" is 55% on mobile. TTFB "good" is 44% on mobile. — [Web Almanac 2025 Performance](https://almanac.httparchive.org/en/2025/performance)
- A secondary roundup quotes a CrUX pass rate of about 43–44%, and other sources give lower figures depending on method. — [woodcentral.com](https://www.woodcentral.com/-/peter/how-rare-is-a-perfect-lighthouse-score/) [Secondary]

**Page weight [Measured, Web Almanac 2025 Page Weight]**

| Median home page | Mobile | Desktop |
|---|---|---|
| Total | 2,559 KB | 2,862 KB |
| Images | 911 KB | 1,058 KB |
| JavaScript | 632 KB | 697 KB |
| Fonts | 122 KB | — |
| CSS | 77 KB | — |

— [Web Almanac 2025 Page Weight](https://almanac.httparchive.org/en/2025/page-weight)

- Growth: the median mobile home page grew 8.4% year on year, and about 203% over a decade. At the 90th percentile, mobile pages weigh 8.3 MB, of which images are 6.3 MB. — [Web Almanac 2025 Page Weight](https://almanac.httparchive.org/en/2025/page-weight)
- Source inconsistency: the chapter text gives the July 2025 mobile home page as 2,362 KB, but its chart and per-type breakdown give 2,559 KB. — [Web Almanac 2025 Page Weight](https://almanac.httparchive.org/en/2025/page-weight)
- The Almanac 2025 Performance chapter also has an internal inconsistency on Speculation Rules adoption figures. — [Web Almanac 2025 Performance](https://almanac.httparchive.org/en/2025/performance)

**Award and design-gallery sites [Measured-lab, small sample, 2022]**
- Greenspector (2022-10-05) examined Awwwards "Mobile Excellence" nominees:
  - **betterup.com:** 200+ requests to about 50 domains on load, and more than 400 requests and more than 12 MB at the page bottom.
  - **webflow.com:** 200+ requests, about 2 MB, more than 57 domains, and over 100 JS requests.
  - **datagrid.co.jp:** loading never finishes.
  - **ladispensadelchianti.it (higher-ranked):** just over 1 MB and 60 requests.
  - **ingridparis.com:** no third parties, but about 20 font requests and a 1 MB autoplay video.
  - **azzerad.com:** 15 font requests, with images loaded twice.

  Conclusion [Opinion]: design-ranked sites lean on images, animation and video, and Awwwards usability scores can stay high despite weak accessibility. — [Greenspector](http://greenspector.com/en/resources/blog/analysis_sites_nominated_mobile_excellence_awwwards/)
- Awwwards judging: usability carries about 30% of the score and includes performance. This comes from third-party explainers, not Awwwards itself. — [webdesignawards.io](https://www.webdesignawards.io/awards/awwwards); [hontran.dev](https://www.hontran.dev/blog/awwwards-judging-criteria) [Secondary]
- Lighthouse benchmarks for landing pages: one article claims typical scores of about 70 on desktop and under 40 on mobile, with no clear method. — [contentsquare](https://contentsquare.com/blog/lighthouse-core-web-vitals-a-comprehensive-analysis-and-comparison/) [Secondary, weak]

### Inferences
- Award sites skew toward the patterns the Almanac flags as harmful: heavy imagery and video, many font requests, motion-heavy JS. Their worst cases (12 MB, 400 requests) sit near or above the 90th-percentile web page (8.3 MB). This is suggestive only, given the tiny sample.
- An AI agent chasing "award-level" looks should assume a performance budget will be broken by default, and build in guardrails. For example:
  - Mobile home page under the median of about 2.5 MB.
  - JS under about 650 KB.
  - At most 2 font files on the critical path.

### Gaps
- I found no systematic, recent measurement of Awwwards SOTD, FWA or CSSDA winners' CrUX or Lighthouse scores. A searched-for "study" did not exist. If the report needs this, run the CrUX API or PageSpeed Insights over a sample of SOTD URLs.
- I found no CrUX data for the named exemplar sites: Linear, Vercel, Stripe, Apple. These could be pulled live from PageSpeed Insights.

---

## 4. Fast-and-beautiful case studies

### Takeaway
The best-documented "rich and fast" engineering is either:
- **Platform-level work:** Shopify's speculation rules, and Next.js `next/font` automating metric-matched fallbacks.
- **Main-thread discipline in rich apps:** NYT's React 18 upgrade, Trendyol, GitHub's diff viewer, and Linear's local-first sync for perceived instantness.

Primary engineering write-ups from Stripe, Apple, Vercel and Josh Comeau were not found in this session.

### Cited Findings
**Linear [Secondary accounts; primary talks not fetched]**
- Linear's speed is attributed to a local-first architecture:
  - Reads come from a local in-browser store.
  - Mutations apply immediately (optimistic).
  - A sync engine reconciles in the background.

  — [dev.to: Why Linear feels fast](https://dev.to/0xgosu/why-linear-feels-fast-local-data-small-updates-and-product-discipline-1m53) [Secondary]
- Co-founder Jori Lallo said offline support was "a byproduct of how we build Linear". — [devtools.fm / Podbean](https://podbean.com/site/EpisodeDownload/DIR16037D8B5IBW6?page=5) [Secondary transcript]
- Aggressive code splitting is credited for fast first loads despite client rendering. — [fooqux](https://fooqux.com/article/5355) [Secondary, unverified]

**Shopify speculation rules [Vendor/self-reported, A/B on real visitors]**
- Since June 2025, Shopify has run platform-wide `prefetch` with conservative eagerness on Liquid storefronts. Real-visitor A/B data showed better TTFB, FCP and LCP at all percentiles. — [Shopify Performance blog](https://performance.shopify.com/blogs/blog/speculation-rules-at-shopify)
- Shopify's docs give the median gain on Chromium as about 220 ms on desktop and about 20 ms on mobile, at the cost of about 0.7% more renderer traffic. Safari and Firefox ignore the rules. — [Shopify dev docs](https://shopify.dev/docs/storefronts/themes/best-practices/performance/use-speculation-rules)
- A vendor (Fudge) reports different numbers. — [fudge.ai](https://www.fudge.ai/guides/speculation-rules-shopify/) [Vendor, conflicting]

**The New York Times [Self-reported, relayed]**
- The React 18 upgrade on the core news site reportedly cut INP by about 30% and halved re-renders. The original is at open.nytimes.com/enhancing-the-new-york-times-web-performance-with-react-18-d6f91a7c5af8, which was not fetched directly. — [Reddit relay of the NYT post](https://redlib.hackliberty.org/r/reactjs/comments/1drbsak/enhancing_the_new_york_times_web_performance_with); [JavaScript Weekly link](https://javascriptweekly.com/link/157211/web)

**GitHub [Secondary]**
- GitHub's React "Files changed" diff viewer was reworked to stay responsive on huge pull requests, using a single top-level event handler and flattened Map-based state. The source was an AI summary of the original post. — [engineered.at](https://engineered.at/articles/the-uphill-climb-of-making-diff-lines-performant) [Secondary, verify]

**Trendyol and Preply [Self-reported]**
- Trendyol halved INP from 963 ms by yielding to the main thread in scroll-observer callbacks, with a 1% CTR uplift. — [web.dev](https://web.dev/case-studies/trendyol-inp)
- Preply improved INP on Next.js without React Server Components by targeting hydration-time interactions. — [Preply Engineering](https://medium.com/preply-engineering/how-preply-improved-inp-on-a-next-js-application-without-react-server-components-and-app-router-491713149875)

**Vercel [Guidance]**
- Vercel's guide credits React 18's split between urgent and non-urgent updates (transitions) and its automatic batching with improving INP. — [Vercel KB: Optimizing Core Web Vitals in 2024](https://vercel.com/kb/guide/optimizing-core-web-vitals-in-2024)
- Next.js `next/font` generates metric-matched fallbacks automatically. — [Chrome for Developers](https://developer.chrome.com/blog/font-fallbacks)

### Inferences
- The repeatable recipe for "beautiful and fast" from these cases:
  1. Make the hero LCP a correctly prioritized, modern-format image. Treat motion as progressive enhancement on top of it.
  2. Use metric-matched font fallbacks, ideally framework-automated.
  3. Keep scroll and animation logic off React state and on composited CSS.
  4. Yield long tasks.
  5. Prefetch or prerender likely next pages (Speculation Rules).
  6. For apps, use local or optimistic state so interactions resolve in under 100 ms.
- The Shopify mobile gain is small (about 20 ms median), so prefetching is not a substitute for a light first load on mobile.

### Gaps
- I found no primary engineering write-ups for Stripe (e.g. their site's WebGL gradient), Apple product pages (scroll-scrubbed image sequences or video), Vercel's own marketing site, or Josh Comeau's blog. The searches did not surface them, and no CrUX numbers were gathered for these sites.
- I found no primary Linear engineering post. Tuomas Artman's talks on the sync engine are the likely primary source but were not fetched.
- The View Transitions API was not researched with case-study data this session.

---

## 5. Perceived performance: optimistic UI, sub-100 ms feedback, prefetch, skeletons vs spinners

### Takeaway
The 0.1 s, 1 s and 10 s limits remain the reference for perceived responsiveness. Optimistic or local-first UI, as at Linear, is how rich apps meet the 0.1 s bar. The evidence that skeletons beat spinners is weak and mixed: one controlled test found skeletons felt slower, and another found them better. Skeletons should not be assumed to improve perceived speed.

### Cited Findings
- Nielsen's limits:
  - 0.1 s feels instantaneous.
  - 1 s keeps the user's flow.
  - 10 s holds attention.

  For delays over 1 s, show that the system is working. Over 10 s, show percent-done and allow interruption. — [NN/g](https://www.nngroup.com/articles/response-times-3-important-limits/) [Long-standing HCI guidance]
- Viget (2017) [Measured, small online experiment]:
  - 136 mobile participants saw identical-length GIF loaders.
  - The skeleton screen produced the longest perceived wait.
  - 59% of the skeleton group agreed the content "loaded quickly", vs 74% for the spinner.
  - Limitations: GIFs rather than real loads, and only 39–58 participants per group.

  — [Viget: A Bone to Pick with Skeleton Screens](https://www.viget.com/articles/a-bone-to-pick-with-skeleton-screens)
- Mejtoft et al. (2018) [Academic, small]: on a fictional news site, skeleton screens scored higher on perceived speed and ease of navigation than spinners. — [Secondary summary via search; uxdesign.cc overview](https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a)
- The often-cited "LinkedIn skeletons cut perceived load by 40%" claim has no traceable primary source. — [theplusaddons (vendor blog)](https://theplusaddons.com/blog/skeleton-loading-screen/) [Unverified]
- Linear's optimistic and local-first approach applies mutations immediately and syncs in the background, so clicks resolve "at the speed of your laptop". — [dev.to](https://dev.to/0xgosu/why-linear-feels-fast-local-data-small-updates-and-product-discipline-1m53) [Secondary]
- Prefetch on intent: Shopify's conservative-eagerness speculation rules prefetch on pointer-down or hover intent and improve navigation LCP for real visitors. — [Shopify](https://performance.shopify.com/blogs/blog/speculation-rules-at-shopify)

### Inferences
- For a taste skill:
  - Interactions should give visual feedback within 100 ms (pressed state, optimistic update) even if the work takes longer.
  - Content-shaped placeholders are fine for layout stability (CLS), but don't count on them to make waits feel shorter.
  - Never gate first content behind a decorative intro.
- Polish (motion, texture, type) and perceived speed probably compound: an interface that responds instantly reads as higher quality. I found no direct empirical study linking perceived speed to aesthetic or "quality" ratings, so this remains an inference.

### Gaps
- I found no rigorous study linking perceived speed to judgments of visual quality or brand quality. The "aesthetic-usability effect" literature was not covered here.
- I found no evidence on View Transitions or progressive rendering's effect on perceived performance.
- The Mejtoft et al. primary paper was not fetched. Its sample and method details are unverified.
