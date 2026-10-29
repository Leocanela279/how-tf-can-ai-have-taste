# Fast and Beautiful UI: Techniques, Library Choice, Measurement and Performance Budgets

Research date: 2026-10-29. Labels used on findings: **[Measured]** = a reported measurement or a number pulled from a live data source; **[Spec/Support]** = browser-support or spec fact; **[Guideline]** = official recommendation from a vendor or standards body; **[Vendor claim]** = a library maker's statement about its own product; **[Opinion]** = an individual expert's view.

Browser-support numbers come from MDN's browser-compat-data API (bcd.developer.mozilla.org) and Baseline status comes from webstatus.dev (api.webstatus.dev), both queried live on 2026-10-29. Bundle sizes come from the bundlephobia API, also queried on 2026-10-29.

---

## Q1. Platform features that deliver "outstanding" effects cheaply (support and cost)

### Takeaway
Most premium-feeling effects now have a native, mostly declarative platform feature that does the heavy work off the main thread or skips rendering altogether: View Transitions, scroll-driven animations, @starting-style with allow-discrete, content-visibility, AVIF, fetchpriority and WOFF2 subsets. Same-document View Transitions, @starting-style, transition-behavior, content-visibility and fetchpriority are all Baseline (newly available). Cross-document View Transitions and scroll-driven animations are still "limited availability" because stable Firefox lacks them, so treat both as progressive enhancement.

### Cited Findings

**View Transitions API**
- [Spec/Support] Same-document view transitions (`document.startViewTransition`) shipped in Chrome 111, Edge 111, Firefox 144, Safari 18 and Safari iOS 18 — [MDN BCD api.Document.startViewTransition](https://bcd.developer.mozilla.org/bcd/api/v0/current/api.Document.startViewTransition.json); also stated in [Chrome for Developers: View Transitions](https://developer.chrome.com/docs/web-platform/view-transitions).
- [Spec/Support] Same-document View Transitions became Baseline "newly available" on 2025-10-14, the Firefox release date — [webstatus.dev view-transitions](https://api.webstatus.dev/v1/features/view-transitions).
- [Spec/Support] Cross-document (MPA) view transitions (`@view-transition`) shipped in Chrome/Edge 126 and Safari/Safari iOS 18.2. Firefox: not supported. Baseline status: "limited" — [MDN BCD css.at-rules.view-transition](https://bcd.developer.mozilla.org/bcd/api/v0/current/css.at-rules.view-transition.json); [webstatus.dev cross-document-view-transitions](https://api.webstatus.dev/v1/features/cross-document-view-transitions); [Chrome for Developers](https://developer.chrome.com/docs/web-platform/view-transitions).
- [Guideline] The mechanism has three steps. The browser snapshots the old and new states, updates the DOM while rendering is suppressed, and then runs the transition with CSS Animations — [Chrome for Developers](https://developer.chrome.com/docs/web-platform/view-transitions).
- [Guideline/Vendor] Chrome's own team describes the cost as follows. The preparation delay is "negligible… only a few frames," `pageswap` adds at most two stale frames, and snapshot data comes straight from the compositor, so there is no extra layout or repaint. Only one view transition per document can run at a time, and a new one makes the current one skip to its end. Cross-document view transitions do not change FCP or incremental rendering, but `blocking=render` should be used with caution and measured — [Chrome: View transitions misconceptions](https://developer.chrome.com/blog/view-transitions-misconceptions).
- [Guideline] Chrome calls View Transitions "the perfect material for progressive enhancement": unsupported browsers just get the instant swap. The same page says to respect the reduced-motion preference — [Chrome: View transitions misconceptions](https://developer.chrome.com/blog/view-transitions-misconceptions).

**CSS scroll-driven animations (`animation-timeline: scroll()` / `view()`)**
- [Spec/Support] `animation-timeline` shipped in Chrome/Edge 115 and Safari/Safari iOS 26. MDN BCD lists Firefox 159 — [MDN BCD css.properties.animation-timeline](https://bcd.developer.mozilla.org/bcd/api/v0/current/css.properties.animation-timeline.json). webstatus.dev reports Baseline status "limited" with implementation dates Chrome 2023-07-18 and Safari 2025-09-15, and no Firefox date yet — [webstatus.dev scroll-driven-animations](https://api.webstatus.dev/v1/features/scroll-driven-animations). MDN's page also says the feature "is not Baseline" — [MDN animation-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline).
- [Guideline] In Chrome's case study, with a deliberately heavy main-thread script running (a 1e9-iteration loop every 100 ms), the classic JS scroll animation "becomes janky and sluggish," while the CSS scroll-driven version is "completely unaffected by the heavy JavaScript work." The JS `ScrollTimeline` API "tries to use as few main thread resources as possible." The gains are listed as available from Chrome 116. Note: the article gives the CPU comparison only as screenshots, with no numeric fps or CPU figures — [Chrome: scroll animation performance case study](https://developer.chrome.com/blog/scroll-animation-performance-case-study).

**@starting-style and transition-behavior: allow-discrete (enter/exit without JS)**
- [Spec/Support] `@starting-style`: Chrome/Edge 117, Firefox 129, Safari/iOS 17.5. Baseline newly available since 2024-08-06 — [MDN BCD css.at-rules.starting-style](https://bcd.developer.mozilla.org/bcd/api/v0/current/css.at-rules.starting-style.json); [webstatus.dev starting-style](https://api.webstatus.dev/v1/features/starting-style); [MDN @starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) ("Baseline 2024").
- [Spec/Support] `transition-behavior`: Chrome/Edge 117, Firefox 129 (BCD marks it as a partial implementation), Safari/iOS 17.4. Baseline newly available since 2024-08-06 — [MDN BCD css.properties.transition-behavior](https://bcd.developer.mozilla.org/bcd/api/v0/current/css.properties.transition-behavior.json); [webstatus.dev transition-behavior](https://api.webstatus.dev/v1/features/transition-behavior).
- [Guideline] Animating `display` and `content-visibility` in keyframes works from Chrome 116. These properties flip at the start of an entry animation or the end of an exit, not at the 50% point. Two ordering traps: declare `transition-behavior: allow-discrete` after the `transition` shorthand (the shorthand resets it), and since Chrome 130 put `@starting-style` rules after the normal-state declarations. Add `overlay` to the transition so a popover or dialog stays in the top layer while it animates out — [Chrome: Four new CSS features for smooth entry and exit animations](https://developer.chrome.com/blog/entry-exit-animations).
- [Spec/Support] `interpolate-size` (animating to `height: auto`) exists only in Chrome/Edge 129+. Baseline status: "limited" — [MDN BCD css.properties.interpolate-size](https://bcd.developer.mozilla.org/bcd/api/v0/current/css.properties.interpolate-size.json); [webstatus.dev interpolate-size](https://api.webstatus.dev/v1/features/interpolate-size).

**content-visibility: auto and CSS containment**
- [Measured] web.dev's travel-blog demo: initial-load rendering time fell from 232 ms to 30 ms (7x). The article expects a 50%+ cut in load rendering cost in general. A Facebook experiment cited there improved navigation by up to 250 ms when returning to cached views — [web.dev content-visibility](https://web.dev/articles/content-visibility).
- [Guideline] How `content-visibility: auto` works: the element gets layout, style and paint containment. While it is off-screen it also gets size containment and skips painting and hit-testing, and the content stays in the DOM and the accessibility tree. Pair it with `contain-intrinsic-size: auto <estimate>` (for example `auto 300px`) so the scrollbar does not jump; the `auto` keyword remembers the last rendered size. The containment types are size, layout, style and paint — [web.dev content-visibility](https://web.dev/articles/content-visibility).
- [Spec/Support] `content-visibility`: Chrome/Edge 85, Firefox 125, Safari/iOS 18. Baseline newly available since 2025-09-15 — [MDN BCD](https://bcd.developer.mozilla.org/bcd/api/v0/current/css.properties.content-visibility.json); [webstatus.dev content-visibility](https://api.webstatus.dev/v1/features/content-visibility).

**Images: AVIF/WebP, responsive images, fetchpriority**
- [Spec/Support] AVIF is Baseline "widely available": newly available 2024-01-25, widely available 2026-07-25. WebP has been widely available since 2023-03-16 — [webstatus.dev avif](https://api.webstatus.dev/v1/features/avif); [webstatus.dev webp](https://api.webstatus.dev/v1/features/webp).
- [Measured/Vendor] web.dev says Google and others "have seen greater than 50% savings vs. JPEG" with AVIF, and that savings depend on content and settings. Its own sample image was only about 6% smaller (18,769 B vs 20,036 B), so do not assume 50%. Encoding is CPU-heavy: libaom 2.0 to 3.1 cut encode CPU 6.5x and memory 5x, and `--jobs 8` gives roughly 5x faster encoding — [web.dev compress-images-avif](https://web.dev/articles/compress-images-avif).
- [Spec/Support] CSS `image-set()`: Chrome/Edge 113, Firefox 89, Safari 17 — [MDN BCD css.types.image.image-set](https://bcd.developer.mozilla.org/bcd/api/v0/current/css.types.image.image-set.json).
- [Measured] `fetchpriority="high"` on the LCP image improved Google Flights' LCP from 2.6 s to 1.9 s. An earlier Oodle carousel test, which raised priority only on the first image, cut page load by 2 s. For a CSS-background LCP, preload it with `fetchpriority=high` — [web.dev fetch-priority](https://web.dev/articles/fetch-priority).
- [Spec/Support] `fetchpriority` support is Chrome/Edge 102, Firefox 132, Safari 17.2 per [web.dev](https://web.dev/articles/fetch-priority). MDN BCD lists Chrome/Edge 101 for `<img fetchpriority>` instead ([MDN BCD](https://bcd.developer.mozilla.org/bcd/api/v0/current/html.elements.img.fetchpriority.json)), a minor conflict. Baseline newly available since 2024-10-29 — [webstatus.dev fetch-priority](https://api.webstatus.dev/v1/features/fetch-priority).

**Fonts: WOFF2, subsetting, variable fonts**
- [Guideline] WOFF2 uses Brotli and compresses 30% better than WOFF; "use only WOFF2." Latin fonts have 100–1000 glyphs and CJK fonts over 10,000, so subsetting plus `unicode-range` cuts size, but check the license first. Variable fonts "typically have larger file sizes than individual non-variable fonts," so they pay off only when you use many weights or styles — [web.dev font best practices](https://web.dev/articles/font-best-practices).
- [Guideline] Recommended `font-display` values: `optional` for body text (adds at most 100 ms of delay, no swap), `swap` for brand display type. Preload ignores `unicode-range` and competes with other resources, so use it sparingly. Use `size-adjust` and the related fallback metric overrides to reduce CLS — [web.dev font best practices](https://web.dev/articles/font-best-practices).

**User-preference media queries**
- [Spec/Support] `prefers-reduced-motion`: Chrome 74, Edge 79, Firefox 63, Safari 10.1, iOS 10.3, so it is universally available — [MDN BCD](https://bcd.developer.mozilla.org/bcd/api/v0/current/css.at-rules.media.prefers-reduced-motion.json).
- [Spec/Support] `prefers-reduced-data`: experimental, only behind a flag in Chrome/Edge 85, and absent from Firefox and Safari — [MDN BCD](https://bcd.developer.mozilla.org/bcd/api/v0/current/css.at-rules.media.prefers-reduced-data.json). `navigator.connection.saveData` (Chrome 49+, Edge 79+; not Firefox/Safari) is the practical Chromium-only alternative — [web.dev adaptive loading](https://web.dev/articles/adaptive-loading-cds-2019).

**Compositor-friendly properties**
- [Guideline] "Restrict animations to `opacity` and `transform`." Avoid properties that trigger layout or paint, because blur and similar effects are costly to paint. Treat `will-change` as a late, targeted fix: apply it just before a change and remove it afterward, not early in optimization — [web.dev animations guide](https://web.dev/articles/animations-guide).
- [Vendor claim] Motion lists `transform` and `opacity` as widely compositor-accelerated, with `filter`, `background-color`, `clip-path` and SVG supported or gaining support in most browsers. Animating a CSS variable is **not** accelerated even when it feeds a transform. Chrome only recently accelerated `%`-based transforms such as `translateX(100%)` — [motion.dev performance](https://motion.dev/docs/performance).

### Inferences
- Default ladder for an agent: (1) CSS transition with @starting-style for enter and exit; (2) same-document View Transition for state and route changes, which is safe as Baseline; (3) `animation-timeline` for scroll effects behind `@supports (animation-timeline: scroll())`, with a static or IntersectionObserver fallback for Firefox; (4) reach for JS only when Q2's criteria apply.
- As of 2026-10-29, Firefox stable most likely does not ship `animation-timeline`. BCD lists version 159, and Firefox's roughly 4-week cadence from 144 (2025-10-14) puts stable at about 157–158 now. webstatus.dev also shows no Firefox date. Re-check before asserting otherwise.
- Cross-document View Transitions in a Next.js app matter less, because App Router navigations are same-document. The MPA feature matters for static or multi-page sites.

### Gaps
- No primary source found with measured memory or GPU cost of View Transition snapshots (for example, full-page snapshots on low-end Android). Chrome's misconceptions article explicitly does not cover memory.
- The Chrome scroll-driven case study has no numeric fps or CPU data in text form (screenshots only).
- No first-party benchmark of AVIF vs WebP decode cost on low-end phones was found.

---

## Q2. Library choice on performance grounds (CSS vs WAAPI vs View Transitions vs scroll-driven vs Motion vs GSAP)

### Takeaway
Use the platform first, because it costs 0 KB. When JS is needed (springs, gestures, interruptible or layout animations, sequenced timelines), pick a library whose shipped size fits the budget: Motion's mini `animate` is about 3 KB, LazyMotion's `m` about 5 KB and the full `motion` component about 43 KB; GSAP core is about 27 KB gzipped, now free with all plugins. Drive per-frame values through MotionValues or refs, not React state. three.js (~185 KB gz) and lottie-web (~77 KB gz) belong behind a lazy boundary.

### Cited Findings

**Bundle sizes**

Bundlephobia numbers are the **whole-package import** (no tree-shaking) as reported by the API, so they are upper bounds — [bundlephobia API](https://bundlephobia.com/api/size?package=motion), queried 2026-10-29.

| Package (version) | Minified | Min+gzip |
|---|---|---|
| motion 14.8.0 | 175.2 KB | 59.1 KB |
| framer-motion 14.8.0 | 214.7 KB | 73.5 KB |
| gsap 3.15.0 (core) | 70.6 KB | 27.4 KB |
| lenis 1.3.27 | 18.9 KB | 5.5 KB |
| three 0.186.1 | 736.2 KB | 184.9 KB |
| lottie-web 5.13.0 | 305.9 KB | 76.8 KB |
| @lottiefiles/dotlottie-web 0.81.0 | 165.2 KB | 33.1 KB (JS only; it also loads a WASM renderer, size not measured here) |
| web-vitals 6.2.3 | 8.9 KB | 3.3 KB |

- [Vendor claim] Motion's own tree-shaken sizes (Rollup; Webpack "slightly larger"): `useAnimate` mini 3.3 KB; `useAnimate` hybrid 23 KB; `motion` component 43 KB minimum; `m` with `LazyMotion` "just over 5 KB" for the initial render; feature packs `domAnimation` +24 KB and `domMax` +38 KB, the latter needed for layout animations and drag — [motion.dev reduce bundle size](https://motion.dev/docs/react-reduce-bundle-size).
- [Vendor claim] GSAP is "100% free for all users," including ScrollTrigger, SplitText and MorphSVG, and is "A Webflow Product." Its pricing page states no core size — [gsap.com/pricing](https://gsap.com/pricing/).

**Motion's hybrid engine and acceleration claims**
- [Vendor claim] Motion is built on WAAPI, so it can run some animations on the compositor: "An animation that is hardware accelerated will remain smooth, no matter how busy your main JS thread becomes." Motion treats acceleration as progressive enhancement that "gets disabled" under many conditions not fully under the developer's control. rAF and JS-driven animation always run on the main thread — [motion.dev performance](https://motion.dev/docs/performance).
- [Vendor claim] Independent transforms (`x`, `scale`) are hardware accelerated, but animating CSS variables is not — [motion.dev performance](https://motion.dev/docs/performance).
- [Vendor claim] `useScroll` can use the browser's ScrollTimeline "for optimal hardware-accelerated performance" when `scrollYProgress` is passed directly to `opacity`, or through `useTransform` to `opacity`, `transform`, `clipPath` or `filter`. The docs do not say whether values composed with `useSpring` stay accelerated — [motion.dev useScroll](https://motion.dev/docs/react-use-scroll).
- [Vendor claim] MotionValue changes "update the DOM without triggering a React re-render," and multiple updates are batched to the next animation frame. `useTransform` chains values and `useSpring` attaches a spring — [motion.dev motion value](https://motion.dev/docs/react-motion-value).
- [Vendor claim] Frame budgets: 60 fps gives about 16.7 ms per frame and 120 fps about 8 ms. React re-renders "can easily take upwards of 100ms." Under heavy main-thread work, stick to `transform`, `filter`, `clipPath` and `opacity` — [motion.dev performance](https://motion.dev/docs/performance).

**Cost of JS that libraries add**
- [Measured] Reddit's JS takes a median phone (Moto G4) 3–4x longer to execute than a Pixel 3, and a low-end Alcatel 1X more than 6x longer. Download and execution, not parse, are now the dominant costs. Split bundles larger than about 50–100 KB — [V8: The cost of JavaScript 2019](https://v8.dev/blog/cost-of-javascript-2019) (Addy Osmani).

### Inferences
- **Decision rule by need:**
  - Simple hover, press, enter and exit → CSS transitions with @starting-style (0 KB).
  - Imperative one-off with interruption → WAAPI `element.animate()` (0 KB) or Motion mini (~3 KB).
  - Route and state morphs → View Transitions (0 KB). Fall back to Motion `layout` (`domMax`, +38 KB) only for in-component shared-element or layout animation where you need spring interruptibility.
  - Scroll-linked → CSS `animation-timeline` or Motion `useScroll` with accelerated properties.
  - Choreographed timelines, SVG morphing, text splitting → GSAP (~27 KB gz core plus plugins), loaded only on the routes that use it.
  - Smooth-scroll hijacking (Lenis, ~5.5 KB gz) is cheap in bytes but runs scroll on the main thread.
  - 3D (three.js ~185 KB gz) and Lottie (~77 KB gz lottie-web, ~33 KB gz JS for dotlottie-web plus WASM) must be lazy-loaded below the fold or after interaction.
- In React, use LazyMotion with `m` and load `domAnimation` asynchronously, which avoids shipping 43+ KB in the critical bundle.
- JS animation is justified for springs with velocity carry-over, gesture-driven drag or pan, interruptible animations that must retarget mid-flight, and FLIP or layout animations across React re-renders. Even then, keep per-frame values in MotionValues or refs. Never `setState` per frame, given re-renders of 100 ms or more against a 16.7 or 8 ms frame budget.
- Motion's WAAPI acceleration is a vendor claim with explicit caveats. Verify with the DevTools Performance panel under 4x CPU throttle rather than assuming it.
- framer-motion and motion are the same codebase under two package names, so do not ship both.

### Gaps
- No primary source found with tree-shaken sizes for individual GSAP plugins (ScrollTrigger, SplitText) or for three.js with tree-shaking. Bundlephobia gives whole-package numbers only.
- No independent (non-vendor) benchmark comparing Motion, GSAP and CSS on low-end Android was found in this pass.
- The size of the dotlottie-web WASM payload was not measured.

---

## Q3. Measurement: tools, thresholds and budgets

### Takeaway
Measure in the field with Core Web Vitals at the 75th percentile (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1) using the ~3.3 KB `web-vitals` library. Debug in the lab with the DevTools Performance panel (Frames track, long tasks over 50 ms, Layers, Paint Flashing, FPS meter) using calibrated CPU throttling. Enforce byte budgets in CI with Lighthouse budgets or Lighthouse CI, bundlesize or webpack performance hints.

### Cited Findings

**Core Web Vitals thresholds**
- [Guideline] Good thresholds: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1, measured at the 75th percentile of page loads and split by mobile and desktop — [web.dev Web Vitals](https://web.dev/articles/vitals).
- [Guideline] INP ratings: good ≤ 200 ms, needs improvement 200–500 ms, poor > 500 ms. INP is made of input delay (often caused by long tasks), processing duration and presentation delay. Test interactions during page load, when the main thread is busiest — [web.dev INP](https://web.dev/articles/inp).
- [Guideline] `web-vitals` is "a small, production-ready wrapper" with one call per metric, such as `onCLS(sendToAnalytics)` — [web.dev Web Vitals](https://web.dev/articles/vitals). [Measured] Its size is 3.3 KB min+gzip (v6.2.3) — [bundlephobia](https://bundlephobia.com/api/size?package=web-vitals).

**Chrome DevTools**
- [Guideline] Frames track colors: white = idle, green = on time, yellow (sparse dashes) = partially presented, red (dense) = dropped. Long tasks get a red triangle, with the part over 50 ms shaded red. The Layers tab appears after you enable advanced paint instrumentation. The Rendering tab offers Paint Flashing, Layer Borders and the Frame Rendering Stats FPS meter — [Chrome DevTools Performance reference](https://developer.chrome.com/docs/devtools/performance/reference).
- [Guideline] CPU throttling is relative to the host machine, and "DevTools can't truly simulate the CPUs of mobile devices." Use **Calibrate** (Capture settings > CPU) to create low-tier and mid-tier mobile presets for your machine — [Chrome DevTools Performance reference](https://developer.chrome.com/docs/devtools/performance/reference).
- [Guideline] Use the FPS meter to judge smoothness; a high percentage such as 99% means few dropped frames. Paint Flashing exposes expensive paints such as blur — [web.dev animations guide](https://web.dev/articles/animations-guide).

**Performance budgets**
- [Guideline] There are three budget types: quantity-based (bytes, requests, fonts), milestone timings (FCP, TTI and other user-centric metrics) and rule-based (Lighthouse score). Baseline numbers are TTI under 5 s and critical-path resources under 170 KB compressed, on a real mid-range device over 3G. Examples include "<170 KB of JS on mobile" for a product page, "interactive <5 s on slow 3G on a Moto G4" and Lighthouse score above 80. Enforce through webpack performance hints, bundlesize or Lighthouse CI. On a breach, optimize, remove something, or don't add the new thing — [web.dev Performance budgets 101](https://web.dev/articles/performance-budgets-101).
- [Guideline] Lighthouse `budget.json` (LightWallet, Lighthouse v5+, `--budget-path`) supports `timings`, `resourceSizes` (KB by type) and `resourceCounts`. The article's example: script 125 KB, total 300 KB, third-party requests 10, TTI 3000 ms. Lighthouse is lab data, so compare it with field data — [web.dev Use Lighthouse for performance budgets](https://web.dev/articles/use-lighthouse-for-performance-budgets).
- [Opinion, data-backed] Alex Russell's 2024 budgets at P75 for a first load: about 730 KiB total for a JS-heavy site interactive in 3 s (365 KiB JS + 365 KiB markup), or 1.3 MiB in 5 s (650 + 650). Markup-heavy sites get 1.4 MiB in 3 s (75 KiB JS) or 2.5 MiB in 5 s (100 KiB JS). He assumes a 7.2 Mbps down / 1.4 Mbps up / 94 ms RTT network and a Galaxy A51-class phone (refurbished about $150). Desktop test machines should cost no more than about $350, with N4120/N4500/N5105-class chips — [Infrequently: The Performance Inequality Gap 2024](https://infrequently.org/2024/01/performance-inequality-gap-2024/).
- [Measured] Low-end phones run the same JS 3–4x (median Moto G4) to more than 6x (Alcatel 1X) slower than a Pixel 3 — [V8: cost of JavaScript 2019](https://v8.dev/blog/cost-of-javascript-2019).

### Inferences
- **Suggested default budget for an agent** (synthesized, label as guideline-derived). Critical-path JS ≤ 170 KB compressed on mobile per web.dev, with a stricter target for marketing pages, for example ≤ 100 KiB JS per Russell's markup-heavy tier. No single chunk above about 50–100 KB. LCP ≤ 2.5 s, INP ≤ 200 ms and CLS ≤ 0.1 at p75. Animations must show no red "dropped" frames in the DevTools Frames track under a calibrated low-tier CPU preset, or under the widely used 4x slowdown if no calibration is available.
- Motion libraries should count against the JS budget explicitly. For example, a full `motion` component (43 KB) is already a quarter of a 170 KB budget, which argues for LazyMotion or CSS.
- Frame-rate budget: 16.7 ms per frame at 60 Hz and 8 ms at 120 Hz. Main-thread animations must fit inside that alongside any React work.

### Gaps
- No current Chrome doc confirming the exact "4x slowdown" recommendation was retrieved. The DevTools reference now pushes calibrated presets instead, and the 4x figure is common practice but not sourced here.
- No Lighthouse CI `assert` configuration or numbers were retrieved, beyond the mention of Lighthouse CI as an enforcement tool.
- Russell's numbers are from January 2024. No 2025 or 2026 update was retrieved.

---

## Q4. Design process: avoiding the "beautiful but slow" trap

### Takeaway
Industry guidance converges on four practices: set a budget up front and treat it as a design constraint (optimize, remove or don't add); build a fast static core for everyone; layer motion and heavy experiences on as progressive enhancement, gated by feature support (`@supports`, API presence), user preference (`prefers-reduced-motion`, Save-Data) and device capability (`hardwareConcurrency` everywhere, `deviceMemory` and `effectiveType` only on Chromium); and lazy-load heavy experiences (3D, Lottie, GSAP plugins) only on capable devices.

### Cited Findings
- [Guideline] Adaptive loading means "a fast core experience for all users," with high-end-only features added when the device and network can handle them — [web.dev Adaptive loading](https://web.dev/articles/adaptive-loading-cds-2019).
- [Spec/Support] Device signals:
  - `navigator.hardwareConcurrency`: Chrome 37, Edge 15, Firefox 48, Safari 15.4 — [MDN BCD](https://bcd.developer.mozilla.org/bcd/api/v0/current/api.Navigator.hardwareConcurrency.json).
  - `navigator.deviceMemory`: Chrome 63, Edge 79; not in Firefox or Safari — [MDN BCD](https://bcd.developer.mozilla.org/bcd/api/v0/current/api.Navigator.deviceMemory.json).
  - `effectiveType` (Chrome 61+) and `saveData` (Chrome 49+): Chromium only — [web.dev Adaptive loading](https://web.dev/articles/adaptive-loading-cds-2019).
- [Measured/Case study] Examples from production sites:
  - Tinder disables video autoplay, limits prefetching and loads carousel images one at a time on slow networks or with Data Saver.
  - Twitter's Data Saver cut image data 50% on native apps and 80% on the web.
  - eBay uses `React.lazy` and Suspense so only high-end devices get features such as zoom.
  - Facebook buckets devices into classes by OS, cores and RAM.
  - `react-adaptive-hooks` provides `useNetworkStatus`, `useSaveData`, `useHardwareConcurrency` and `useMemoryStatus`.
  - Source: [web.dev Adaptive loading](https://web.dev/articles/adaptive-loading-cds-2019).
- [Guideline] Budget enforcement as process: when a change would breach the budget, "optimize an existing feature or asset, remove an existing feature or asset, or not add the new one." Keep measuring after launch with real-user data — [web.dev Performance budgets 101](https://web.dev/articles/performance-budgets-101).
- [Guideline] View transitions are "the perfect material for progressive enhancement," and you should respect reduced motion — [Chrome: View transitions misconceptions](https://developer.chrome.com/blog/view-transitions-misconceptions).
- [Vendor claim] Hardware acceleration is "great when a browser supports it, but usually not essential," so design so the experience still works if acceleration is lost — [motion.dev performance](https://motion.dev/docs/performance).
- [Opinion, data-backed] Test on cheap hardware: a refurbished Galaxy A51 (about $150) or a Nokia G100 (about $100) for mobile, and a desktop of about $350 or less with 4–8 GB RAM — [Infrequently 2024](https://infrequently.org/2024/01/performance-inequality-gap-2024/).
- [Measured] JS cost grows 3–6x on median and low-end phones, so "ship much less script on mobile" — [V8 cost of JavaScript 2019](https://v8.dev/blog/cost-of-javascript-2019).

### Inferences
- **Playbook an agent can follow:**
  1. Ship static, legible, correctly sized content first (LCP image with `fetchpriority="high"`, AVIF or WebP via `<picture>`/`srcset`, WOFF2 subsets, `font-display: optional` for body text).
  2. Add motion with CSS and platform APIs inside `@supports` and `@media (prefers-reduced-motion: no-preference)`.
  3. Add JS motion via LazyMotion or dynamic `import()` after hydration.
  4. Gate "hero" experiences (WebGL, Lottie, smooth-scroll) behind `hardwareConcurrency >= 4` (plus `deviceMemory >= 4` where available), no Save-Data and no reduced motion. Load them lazily with IntersectionObserver or on interaction, with a static poster image as the fallback. The specific thresholds of 4 are a common heuristic, **not** sourced from web.dev.
- Treat a "motion budget" as two numbers: KB of animation JS on the critical path, and zero dropped frames on a calibrated low-tier CPU profile. Plus a rule that per-frame work never goes through React state.
- Since `deviceMemory` and `effectiveType` are Chromium-only, device-tiering code must default sensibly (treat unknown as mid-tier) for Safari and Firefox.

### Gaps
- No primary source found for a formal "motion budget" methodology (for example from Smashing Magazine or a named design team). Smashing performance articles were not retrieved in this pass.
- No web.dev source gives numeric low-end device cutoffs (such as ≤ 4 GB or ≤ 4 cores). The adaptive-loading article explicitly gives none.
- `prefers-reduced-data` is not usable in production (flag-only in Chromium), so a cross-browser data-saver signal is missing outside Chromium.
