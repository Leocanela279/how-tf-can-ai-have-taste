# Rendering cost of visual effects and animation in the browser (what is expensive, what stays cheap)

Labels used throughout: **[MEASURED]** = a number someone actually recorded in a profiler or test; **[CALC]** = arithmetic from a stated formula, not a profiler reading; **[GUIDELINE]** = vendor/DevRel recommendation; **[OPINION]** = practitioner judgment. Source dates matter here: several canonical sources are 2015–2021, and browser compositing support has changed since then.

## 1. The pipeline, the frame budget, and which properties trigger layout vs paint vs composite

### Takeaway
Every visual change goes through JS → Style → Layout → Paint → Composite. Changes to geometry run all five stages, changes to colour or shadow skip layout, and changes to transform or opacity on an already-promoted layer skip both layout and paint. At 60 Hz you get about 16.7 ms per frame, of which about 10 ms is usable for your own work. At 120 Hz the whole frame is about 8 ms. The set of "compositor-only" properties has grown from transform and opacity (2015) to include filter, and per Motion in 2025, clip-path. The data on CSS Triggers is described as outdated for those properties.

### Cited Findings
- **[GUIDELINE] Frame budget at 60 Hz.** Displays refresh about 60 times a second, which gives about 16.66 ms per frame. Browser overhead leaves about 10 ms for your work, and animations should hit that 10 ms target. Missing it drops frames ("jank"). — [web.dev, Paul Lewis, "Rendering performance" (updated 2023-12-13)](https://web.dev/articles/rendering-performance)
- **[GUIDELINE] Budget at 120 fps.** Motion's docs give 16.7 ms at 60 fps and about 8 ms at 120 fps. They also say re-renders can take over 100 ms, which is why they discourage layout animation. — [Motion docs, Performance](https://motion.dev/docs/performance)
- **[GUIDELINE] Responsiveness thresholds.** Discrete UI changes should feel instant: 100 ms is the common figure, and INP's "good" threshold is 200 ms or less. — [web.dev, Rendering performance](https://web.dev/articles/rendering-performance)
- **[GUIDELINE] The five stages.** (1) JavaScript, or CSS animations, transitions and WAAPI; (2) Style: matching rules and computing styles; (3) Layout: geometry; (4) Paint: drawing and rasterising pixels; (5) Composite: assembling layers in order. — [web.dev, Rendering performance](https://web.dev/articles/rendering-performance)
- **[GUIDELINE] Three paths.** Geometry changes (`width`, `height`, `top`, `left`) run Style → Layout → Paint → Composite. Paint-only changes (`background-image`, `color`, `box-shadow`) run Style → Paint → Composite. Composite-only changes run Style → Composite, which is "the cheapest path and is best for animations and scrolling." — [web.dev, Rendering performance](https://web.dev/articles/rendering-performance)
- **[GUIDELINE, 2015] Only transform and opacity.** web.dev's "Stick to compositor-only properties" says only `transform` and `opacity` can be handled by the compositor alone. The element should be promoted to its own layer, and the article suggests FLIP to turn other changes into transform and opacity. It also targets about 4–5 ms of compositing time during scrolling or transitions. The page was last updated 2015-03-20, so the property list is stale. — [web.dev, Paul Lewis](https://web.dev/articles/stick-to-compositor-only-properties-and-manage-layer-count)
- **[GUIDELINE, 2020] Animate only transform and opacity where possible.** The page says to restrict animations to these two properties. It warns that a `top`/`left` animation "is likely to be slow" and that blur-type effects such as shadows take longer to paint than simple shapes. — [web.dev, "How to create high-performance CSS animations," Basques & Andrew (updated 2020-10-06)](https://web.dev/articles/animations-guide)
- **[GUIDELINE, 2021] Chrome's accelerated list.** Chrome accelerates `opacity`, `filter` and `transform` by default. `background-color` and `clip-path` were announced as "soon," with no version given. SVG animations are accelerated by default from Chromium 89, and percentage-based transforms are composited from Chromium 89 "as long as the layout size is not changing every frame." — [Chrome for Developers, Una Kravets, "Updates in hardware-accelerated animation capabilities" (updated 2021-02-22)](https://developer.chrome.com/blog/hardware-accelerated-animations)
- **[GUIDELINE, 2025] Motion's top tier.** Motion's S-tier ("composite-only," which stays smooth even when the main thread is busy) is `transform`, `opacity`, `filter` and `clip-path`, run through CSS, WAAPI or a WAAPI-based library. Scroll Timelines and View Timelines driving these properties are accelerated too. — [Motion Magazine, Matt Perry, "The Web Animation Performance Tier List" (2025-11-05)](https://motion.dev/blog/web-animation-performance-tier-list)
- **Conflict about clip-path and background-color.** Motion's performance docs say Chrome and Firefox composite `filter` and SVG, but describe `background-color` and `clip-path` as something Chrome "is adding." The 2025 tier-list post puts `clip-path` in S-tier. — [Motion docs](https://motion.dev/docs/performance) vs [Motion tier list](https://motion.dev/blog/web-animation-performance-tier-list)
- **[GUIDELINE] CSS Triggers is out of date.** Motion's docs call it useful for layout properties but outdated for `clip-path` and `filter`. — [Motion docs, Performance](https://motion.dev/docs/performance)
- **[GUIDELINE] Animating colour, radius and gradients.** Geometry changes trigger layout, and colour, `border-radius` and similar changes trigger paint, with cost scaling with the painted area. — [Motion tier list](https://motion.dev/blog/web-animation-performance-tier-list)
- **[GUIDELINE] Silent fallback to the main thread.** Composited animations can quietly fall back to the main thread. Safari's Core Animation doesn't support a `playbackRate` other than 1, and Chrome historically didn't composite `%` translate. — [Motion tier list](https://motion.dev/blog/web-animation-performance-tier-list)

### Inferences
- A practical rule for the skill: at 120 Hz the whole frame is about 8 ms, so any per-frame Style, Layout or Paint work on a ProMotion iPhone or 120 Hz Android has roughly half the 60 Hz headroom. "Fine on my 60 Hz monitor" is not evidence.
- Treat `transform` and `opacity` as the only universally safe pair. Treat `filter` and `clip-path` as composited on modern Chromium and Firefox but worth profiling, and verify Safari separately.

### Gaps
- I didn't fetch csstriggers.com itself, and I found no maintained successor dataset for per-browser trigger tables. Motion's docs are the most recent source that names the gaps.
- I found no primary Chrome doc confirming which version shipped composited `background-color` or `clip-path` animations.

## 2. Costly effects with evidence, and the cheap alternative for each

### Takeaway
Paint-bound effects (box-shadow, gradients, blur) cost roughly in proportion to the painted area, and get worse with blur radius. Layer-bound tricks (`will-change`, 3D transforms) trade paint cost for GPU memory, at 4 bytes per pixel per layer, multiplied for high-DPI screens. Animating an inherited CSS variable can force style recalculation across a whole subtree. Most fixes come down to "animate opacity or transform of a pre-painted thing."

### Cited Findings

**Animating width, height, top or left (layout)**
- **[MEASURED] Frame drops, top/left vs transform.** In web.dev's demo with the FPS meter, the `top`/`left` animation dropped 50% of frames and the `transform` version dropped 1%. In the same article, one DevTools summary showed 37 ms of rendering and 79 ms of painting. — [web.dev animations guide](https://web.dev/articles/animations-guide)
- **[GUIDELINE] Layout cost.** Layout-triggering animations run the full pipeline every frame and can drop frames even on high-end devices. Cost scales with the size and complexity of the affected tree. Isolating the element with `position: absolute`/`fixed` or `contain` limits the damage. — [Motion tier list](https://motion.dev/blog/web-animation-performance-tier-list)
- **Cheap alternative [GUIDELINE].** Use FLIP: measure once, then animate `transform`. Motion's layout animations do this (its "B-tier," an up-front measurement plus a transform animation). Per-frame scale correction keeps them on the main thread. — [Motion tier list](https://motion.dev/blog/web-animation-performance-tier-list); [web.dev compositor-only](https://web.dev/articles/stick-to-compositor-only-properties-and-manage-layer-count)
- **[GUIDELINE] Layout thrashing (F-tier).** Alternating DOM writes with reads such as `offsetWidth` forces repeated synchronous layouts, and several libraries reading and writing at once can cause this by accident. Motion says its batched reads and writes make it 2.5× faster than GSAP when starting from unknown values and 6× faster at unit conversion. These are vendor benchmarks against a competitor, so treat them as such. — [Motion tier list](https://motion.dev/blog/web-animation-performance-tier-list)

**box-shadow**
- **[GUIDELINE/OPINION, 2015] Animating box-shadow repaints every frame.** Phones may stutter even when desktops cope. The fix is to put the larger shadow on a `::after` pseudo-element with `opacity: 0`, then on hover animate only that `opacity` (plus a `transform` scale on the element). DevTools showed visibly fewer paints, but the article gives no FPS number. — [Tobias Ahlin, "How to animate box-shadow with silky smooth performance" (2015-11-18)](https://tobiasahlin.com/blog/how-to-animate-box-shadow/)
- **[GUIDELINE] Shadows are expensive to paint.** Blur-based effects such as shadows take longer to paint than simple shapes. — [web.dev animations guide](https://web.dev/articles/animations-guide)
- `box-shadow` is a paint-only property, so it runs Style → Paint → Composite. — [web.dev Rendering performance](https://web.dev/articles/rendering-performance)

**filter: blur() and backdrop-filter**
- **[GUIDELINE/OPINION] Blur gets more expensive with radius and layer size.** `filter: blur()` is accelerated but not free, and its cost rises with radius and layer size. Matt Perry added a warning in Framer for blur values over 10px. — [Motion tier list](https://motion.dev/blog/web-animation-performance-tier-list)
- **[GUIDELINE] backdrop-filter creates a layer.** It is listed among the triggers for layer promotion. — [Motion tier list](https://motion.dev/blog/web-animation-performance-tier-list)
- **[OPINION, secondary] How backdrop blur works.** Secondary blogs say the browser must capture what's behind the element, copy it to a separate buffer, blur it, and composite it back. Full-screen or large blurred areas are reported as high cost, and several blurs compound. These sources are blogs and framework docs, and none has benchmarks. — [OpenReplay blog](https://blog.openreplay.com/creating-blurred-backgrounds-css-backdrop-filter/); [loke.dev on blur bottlenecks](https://loke-dev-lokedevs-projects.vercel.app/blog/css-filter-blur-performance-bottlenecks)
- **[MEASURED-ish, bug report] Engine differences.** A Mozilla bug said Firefox backdrop blur was much slower than Chrome on a lower-end phone, and it was closed as fixed after WebRender. — [Bugzilla 925025](https://bugzilla.mozilla.org/show_bug.cgi?id=925025)
- **Cheap alternatives [GUIDELINE/OPINION].** Keep the radius small (Perry's warning threshold is 10px). Keep the blurred area small, such as a nav bar rather than a full-screen overlay. Use a semi-opaque solid background as a fallback, or a pre-blurred static image when the backdrop doesn't change. — [Motion tier list](https://motion.dev/blog/web-animation-performance-tier-list); [OpenReplay](https://blog.openreplay.com/creating-blurred-backgrounds-css-backdrop-filter/)

**Gradients**
- **[GUIDELINE] Animating gradients redraws them.** Animating `background-image` or `mask-image` gradients costs more than animating `background-color`, because a new gradient image is drawn every frame. — [Motion tier list](https://motion.dev/blog/web-animation-performance-tier-list)
- **Cheap alternative [inference from the pipeline rules].** Paint the gradient once on a layer and animate its `transform` (translate or scale an oversized gradient) or its `opacity` (cross-fade two gradients).

**CSS custom properties (variables)**
- **[MEASURED, reported by Motion] The "inheritance bomb."** Animating a global CSS variable can invalidate styles across a whole tree, even elements that don't use the variable. One site forced recalculation on more than 1,300 elements at about 8 ms per frame, the entire budget at 120 fps. Targeted JS style updates cut this to "almost nothing." — [Motion tier list](https://motion.dev/blog/web-animation-performance-tier-list)
- **[GUIDELINE] Variables always trigger paint.** Changing a variable triggers paint on affected elements even when it only feeds `opacity`. The fixes are to narrow the variable's scope, or register it with `@property { inherits: false }`, and to batch `@property` registrations because each one causes a recalculation. — [Motion tier list](https://motion.dev/blog/web-animation-performance-tier-list)
- **[GUIDELINE] Variables are not accelerated.** Animating CSS variables is not hardware-accelerated, even when the variable feeds `transform`. — [Motion docs, Performance](https://motion.dev/docs/performance); consistent with [Bramus, "The gotcha with @property" (2023)](https://www.bram.us/2023/02/01/the-gotcha-with-property)

**clip-path, SVG, View Transitions**
- **[GUIDELINE] clip-path.** It is in S-tier in Motion's 2025 list, but Motion's docs still call Chrome support "being added" (see section 1). — [Motion tier list](https://motion.dev/blog/web-animation-performance-tier-list); [Motion docs](https://motion.dev/docs/performance)
- **[GUIDELINE] SVG geometry attributes.** Animating `d`, `cx`, `cy` or `r` repaints every frame, so use `transform` to move or resize. — [Motion tier list](https://motion.dev/blog/web-animation-performance-tier-list)
- **[GUIDELINE] View Transitions.** Cross-fades use opacity (cheap), but size and position changes may animate `width`/`height`. Motion ranks them C because they can't be cleanly interrupted. A technique by Bramus removes the width/height keyframes, which lifts them to S-tier. — [Motion tier list](https://motion.dev/blog/web-animation-performance-tier-list)

**will-change, layer count, and GPU memory**
- **[CALC] Layer memory is 4 bytes per pixel.** Composited layers are stored as uncompressed RGBA. A 320×240 solid rectangle that is 104 bytes as a PNG takes 307,200 bytes as a layer. A carousel of ten 800×600 photos with `will-change: transform` adds about 19 MB. One 3000×3000 animated element takes about 36 MB. High-density screens multiply layer weight by 4 to 9. — [Smashing Magazine, Sergey Chikuyonok, "CSS GPU Animation: Doing It Right" (2016-12-09)](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/)
- **[CALC] Device headroom.** The author estimated an iPhone 6 (1 GB shared RAM and VRAM) had only about 200–300 MB for GPU effects. A milestone of the "Chaos Fighters" promo page crashed an iPhone 5 within seconds of loading, and it worked after layer optimisation. That is an anecdotal outcome with no profiler numbers. — [Smashing Magazine](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/)
- **[CALC] Scale-down trick.** Paint a layer smaller and upscale it with `transform: scale()`. A 100×100 solid layer (40,000 bytes) becomes 10×10 scaled 10× (400 bytes), a 100× saving that looks identical. This suits solid or soft content, and sharp content may lose quality. Shrinking the sun-ray textures by 10% saved 19% (469 KB to 380 KB). — [Smashing Magazine](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/)
- **[GUIDELINE] Implicit compositing ("layer explosion").** Elements stacked above a composited element get promoted to layers themselves, so one animated element can promote its neighbours. Layer triggers include 3D transforms, `<video>`, `<canvas>`, `<iframe>`, `position: fixed`, `will-change`, `filter`, and active transform or opacity animations. The CPU-to-GPU texture upload takes about 3–5 ms and can itself cause jank. — [Smashing Magazine](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/)
- **[GUIDELINE] Promotion rules.** "Do not promote elements unnecessarily." Applying `will-change` or `translateZ(0)` to `*` promotes the whole page. Each layer needs memory and management, and on low-memory devices the cost can "far outweigh" the benefit. — [web.dev compositor-only](https://web.dev/articles/stick-to-compositor-only-properties-and-manage-layer-count)
- **[GUIDELINE] Use will-change late.** It is not recommended early in optimisation. Set it from JS shortly before a change and remove it afterwards, unless the element is always about to change. — [web.dev animations guide](https://web.dev/articles/animations-guide)
- **[GUIDELINE] Composited animations always create a layer.** This can exhaust GPU memory on mobile, and long cloned tickers or marquees are a classic offender. 3D transforms and `perspective` can promote more elements than expected. — [Motion tier list](https://motion.dev/blog/web-animation-performance-tier-list); [Motion docs](https://motion.dev/docs/performance)
- **[GUIDELINE] Without a layer, transform and opacity still repaint.** The element must be promoted, otherwise `transform` and `opacity` trigger paint. — [Motion tier list](https://motion.dev/blog/web-animation-performance-tier-list)

### Inferences
- A cost model for the skill: paint-bound effects cost about (painted area) × (effect complexity, for example blur radius) per frame. Layer-bound effects cost about width × height × 4 × DPR² in GPU memory, held for as long as the layer exists. A full-viewport blur on a 3× DPR phone is therefore the worst case on both counts. That is an inference from the sources above, not a measured result.
- For the skill, "outstanding" UIs usually perform badly not because one effect is costly but because the effects stack: a backdrop-blurred sticky nav, plus a hover-shadow animation, plus an animated gradient hero, plus a global CSS-variable-driven scroll effect, each fine alone, adding up past 8 ms at 120 Hz.

### Gaps
- I found no primary-source benchmark that quantifies `backdrop-filter` cost as a function of radius and area. The scaling claim rests on Matt Perry's guidance and secondary blogs.
- I found no measured data on `mix-blend-mode` cost, and didn't search it in depth. It is generally believed to force compositing or isolation, but I have no citation for that.
- I didn't research splitting text into many spans for text animations. The "thousands of small elements" note in the next section is the closest data I have.
- I found no measured numbers for animated box-shadow, only DevTools paint-count screenshots.

## 3. Main thread vs compositor: CSS/WAAPI, JS rAF, React, Motion, GSAP, smooth-scroll libraries

### Takeaway
CSS transitions and animations, and WAAPI, on composited properties can run on the compositor thread and survive a busy main thread. requestAnimationFrame-driven animation (GSAP, custom rAF, Lenis, shaders) always runs on the main thread and competes with React renders and other JS. In React, the big cost is re-rendering per frame, which motion values avoid by writing to the DOM directly. JS animation overhead itself is rarely the bottleneck.

### Cited Findings
- **[GUIDELINE] JS animations live on the main thread.** JS animations such as `requestAnimationFrame` always run on the main thread and can jank when it's busy. WAAPI and CSS can run some animations on the compositor. Acceleration can be disabled under many conditions, so treat it as progressive enhancement. — [Motion docs, Performance](https://motion.dev/docs/performance)
- **[GUIDELINE] Motion uses WAAPI for transforms; GSAP doesn't.** Motion sends `transform`, including independent `x` and `scale`, to WAAPI, so it can run on the compositor. GSAP and custom rAF animations run on the main thread. JS overhead is "rarely the bottleneck; expensive renders usually are." rAF or GSAP can beat hardware acceleration when animating thousands of small elements. — [Motion tier list](https://motion.dev/blog/web-animation-performance-tier-list). (Motion is a vendor and GSAP a competitor, so read this as a vendor position.)
- **[GUIDELINE] Motion values skip React's render cycle.** Changing a motion value updates the DOM "without triggering a React re-render," and updates are batched to the next animation frame. — [Motion docs, useMotionValue](https://motion.dev/docs/react-motion-value)
- **[GUIDELINE, community] Don't drive animation through React state.** Community guidance is never to use `useState` for frame-by-frame values, because each update re-renders. Use `useMotionValue`, `useTransform` and `.set()`, and don't read `.get()` during render for conditional UI. — [Mintlify mirror of Motion docs, motion values](https://www.mintlify.com/motiondivision/motion/concepts/motion-values) (secondary)
- **[GUIDELINE] Re-render cost.** Re-renders "can take over 100ms." — [Motion docs, Performance](https://motion.dev/docs/performance)
- **[GUIDELINE] Shaders drop frames with the main thread.** WebGL shaders are scheduled via rAF, so they can miss frames when the main thread is blocked. — [Motion tier list](https://motion.dev/blog/web-animation-performance-tier-list)
- **[GUIDELINE] Scroll-linked effects.** Effects that read `scrollTop` lag scroll by a frame (D-tier). Compositor-driven scroll animations (Scroll and View Timelines) and `position: sticky`/`fixed` are smoother, especially in Safari. `IntersectionObserver` tracks visibility off the main thread and can pause off-screen animations. — [Motion tier list](https://motion.dev/blog/web-animation-performance-tier-list)
- **Lenis [GUIDELINE, docs].** The official README drives Lenis with a per-frame `lenis.raf(time)` call in a requestAnimationFrame loop, or adds it to GSAP's ticker so they share one loop. Its per-frame work is ordinary main-thread JS. I found no official benchmark of Lenis's runtime cost, and "built with performance in mind" is a marketing claim. — [Lenis README (jsDelivr)](https://cdn.jsdelivr.net/npm/lenis@1.3.23/README.md)
- **GSAP [GUIDELINE, older official posts].** GSAP 1.12 (2014) introduced `lagSmoothing`, which "heals" from CPU spikes while keeping animations synchronised, and "lazy" rendering to avoid layout thrashing when many tweens start together. It also introduced `force3D: "auto"`, which uses 3D (layer-promoting) transforms during a tween and returns to 2D at the end. — [GSAP community, "GSAP 1.12.0"](https://gsap.com/community/gsap-1-12-0). The GreenSock skill recommends `x`/`y` over `left`/`top` and `will-change` only on elements that will animate. — [greensock/gsap-skills: gsap-performance (tessl mirror)](https://tessl.io/registry/skills/github/greensock/gsap-skills/gsap-performance)
- **[MEASURED, old, secondary] GreenSock's CPU tests.** Circa 2015, GreenSock tests reportedly found CSS transform animations used about 2× the CPU of JS in Chrome's task manager. I saw only a search snippet, not the original, and it's about a decade old. — [GreenSock forums (tag page)](https://greensock.com/forums/tags/test/)

### Inferences
- For the skill: "CSS/WAAPI on transform or opacity" is the default for anything that must stay smooth during hydration, data fetching or heavy React renders, such as page-load and route transitions in Next.js. rAF libraries (GSAP, Lenis) are fine when the main thread is otherwise quiet, and are better for very many small elements.
- Smooth-scroll libraries replace native, compositor-threaded scrolling with main-thread JS, so any long task now stalls scrolling itself. That follows from the sources above, but I have no benchmark.

### Gaps
- I found no quantified Lenis or Locomotive per-frame cost or INP impact.
- I found no recent primary-source GSAP benchmark against WAAPI, and I didn't reach gsap.com's current performance docs page.
- I found no quantified measurement of React re-render cost per frame against motion values; only the qualitative "over 100 ms" upper bound.

## 4. Media: hero video, GIF vs video, Lottie, WebGL, image decoding

### Takeaway
Video is far smaller than GIF for the same animation, but decoded image and video frames, and every composited media layer, cost memory by pixel count, not file size. Lottie on the web rasterises vector paths per frame, usually on the main thread. Large images decoded synchronously can blow a frame budget by 10×.

### Cited Findings
- **[MEASURED] GIF vs video size.** In web.dev's example the same animation was 3.7 MB as GIF, 551 KB as MP4 and 341 KB as WebM. The recommended markup is `autoplay loop muted playsinline` with WebM listed before MP4, since browsers use the first supported `<source>`. There are no CPU or decoding claims. — [web.dev, Djirdeh & Wagner, "Replace animated GIFs with video" (updated 2018-11-05)](https://web.dev/articles/replace-gifs-with-videos)
- **[GUIDELINE] Video is a layer.** `<video>`, `<canvas>` and `<iframe>` are composited-layer triggers, so they cost GPU memory and can implicitly promote overlapping elements. — [Smashing Magazine](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/)
- **[MEASURED, secondary] Synchronous image decode.** In one demo a synchronous image decode took 167 ms, against a 16 ms frame budget, causing visible jank. `decoding="async"` and `img.decode()` reduced main- or raster-thread blocking. This is a secondary blog, not Chrome docs. — [Dexecure, "Image decoding on the web"](https://new-dexecure.netlify.com/blog/image-decoding/)
- **[CALC, secondary] Decoded size follows pixels.** A 2000×2000 image takes about 16 MB of RAM once decoded (4 bytes per pixel), however small the compressed file. — [loke.dev](https://loke-dev-lokedevs-projects.vercel.app/blog/image-decoder-main-thread-bottleneck); consistent with the 4-byte RGBA figure in [Smashing](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/)
- **[GUIDELINE] Canvas decoding.** There is no cross-browser way to decode an image for canvas `drawImage()` without blocking the main thread. — [Web Performance Calendar 2025, "Non-blocking image canvas"](https://calendar.perfplanet.com/2025/non-blocking-image-canvas/)
- **[GUIDELINE, vendor] Lottie on the web.** LottieFiles says the classic web runtime rasterises every path, matte and gradient each frame on the main thread, or a worker "if you're lucky." It markets WebGL and WebGPU backends in dotlottie-web as the fix, with no independent benchmark. — [LottieFiles blog](https://lottiefiles.com/blog/working-with-lottie-animations/hardware-accelerated-lottie-on-the-web-dotlottie-web-now-ships-webgl-webgpu)
- **[MEASURED, rough] Off-screen Lottie.** On one MacBook Air M1 in Chrome, destroying Lottie animations when off-screen dropped CPU from about 60–99% to about 27.5–90%. The author calls these rough estimates. — [ICS Media, "Adding Lottie animations with JavaScript and optimizing performance" (2024)](https://ics.media/en/entry/240625/)
- **[GUIDELINE] Lottie on iOS (context).** On iOS, lottie-ios's legacy engine rendered on the app main thread each frame. Its Core Animation engine (3.4.0+) renders out-of-process and "do[es] not consume any of the app's CPU" once playing. This is native, not web, but shows the main-thread rasterisation problem. — [airbnb/lottie-ios discussion #1627](https://github.com/airbnb/lottie-ios/discussions/1627)
- **[GUIDELINE] WebGL.** Shaders drop frames when the main thread is busy (section 3). `IntersectionObserver` can pause off-screen work. — [Motion tier list](https://motion.dev/blog/web-animation-performance-tier-list)

### Inferences
- A hero video carries three costs: network bytes (fine with MP4/WebM), continuous decode (CPU or the hardware decoder), and a full-bleed composited layer (width × height × 4 × DPR² bytes, per the Smashing formula). On a 3× DPR phone a 390×844 CSS-pixel full-bleed layer is about 390·3 × 844·3 × 4 ≈ 11.8 MB. That is my calculation, not a measurement.
- Simple loops (spinners, check marks, fades) should be CSS or SVG transform and opacity, not Lottie. Keep Lottie or video for illustrations that need path morphing, and pause or destroy it off-screen.

### Gaps
- I found no source quantifying battery or power drain of WebGL or three.js on mobile GPUs, or of autoplay hero video. That remains an unanswered gap.
- I found no primary-source size budget for autoplay hero videos.
- I found no direct Lottie vs CSS vs video benchmark.

## 5. Measured examples and case studies

### Takeaway
Real measurements are scarce and mostly old. The strongest numbers are web.dev's top/left vs transform frame drops (50% vs 1%), Motion's CSS-variable case (1,300+ elements at about 8 ms per frame), the GIF→video size drop (3.7 MB → 341 KB), a 167 ms synchronous image decode, and Smashing's layer-memory arithmetic (10 photos with will-change ≈ 19 MB; a 3000×3000 element ≈ 36 MB).

### Cited Findings
- **[MEASURED]** `top`/`left` animation dropped 50% of frames and the `transform` version 1%, in Chrome's FPS meter. — [web.dev animations guide](https://web.dev/articles/animations-guide)
- **[MEASURED, as reported]** A global CSS-variable animation caused style recalculation on more than 1,300 elements, about 8 ms per frame. Targeted JS updates cut it to "almost nothing." — [Motion tier list](https://motion.dev/blog/web-animation-performance-tier-list)
- **[MEASURED, vendor]** Motion's batched reads and writes were 2.5× faster than GSAP from unknown start values, and 6× faster at unit conversion. — [Motion tier list](https://motion.dev/blog/web-animation-performance-tier-list)
- **[MEASURED]** The same animation was 3.7 MB as GIF, 551 KB as MP4 and 341 KB as WebM. — [web.dev](https://web.dev/articles/replace-gifs-with-videos)
- **[MEASURED, secondary]** A synchronous image decode took 167 ms. — [Dexecure](https://new-dexecure.netlify.com/blog/image-decoding/)
- **[CALC]** Layer memory: ten 800×600 `will-change` photos ≈ 19 MB, a 3000×3000 element ≈ 36 MB, high-DPI multiplies by 4–9, and the scale-down trick saves up to 100×. Anecdotally, an iPhone 5 crashed before layer optimisation. — [Smashing Magazine](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/)
- **[MEASURED, rough]** Destroying off-screen Lottie animations dropped CPU from about 60–99% to about 27.5–90% on an M1 MacBook Air. — [ICS Media](https://ics.media/en/entry/240625/)
- **[GUIDELINE/OPINION]** Matt Perry's Framer warning threshold for blur is 10px. — [Motion tier list](https://motion.dev/blog/web-animation-performance-tier-list)

### Inferences
- The scarcity of recent primary benchmarks is itself a finding. Most "never animate X" rules are guidelines derived from the pipeline model rather than measured on current hardware. The skill should tell the agent to verify with DevTools (Paint Flashing, the FPS meter, the Performance panel and the Layers panel) on a throttled or low-end device. DevTools' own methodology for this is described in [web.dev animations guide](https://web.dev/articles/animations-guide).

### Gaps
- I didn't reach Paul Lewis's aerotwist articles, Surma's or Jake Archibald's posts, or Josh Comeau's articles, within the tool budget. They may hold more measured examples, particularly Josh Comeau on shadows and backdrop-filter.
- I found no 2024–2026 Chrome DevRel benchmark quantifying blur, shadow or gradient paint cost in milliseconds.
