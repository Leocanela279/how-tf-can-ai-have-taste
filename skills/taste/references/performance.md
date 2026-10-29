# Performance

A rich page stays fast when each effect is chosen by the rendering stage it costs:
- **Composite only:** `transform`, `opacity`, and on current engines `filter`. These run on the
  compositor and stay smooth while JS is busy.
- **Paint:** colour, shadows, gradients and blur. These redraw pixels on the main thread.
- **Layout:** geometry. This recomputes the page on the main thread.

At 60Hz you get about 10ms of your own work per frame; at 120Hz the whole frame is about 8ms. Pages
get slow by **stacking** effects that are each fine alone, by **thread contention** (animation
competing with hydration and scroll handlers), at **load** (hero media, fonts, render-blocking
scripts), and by being tested on a laptop when phones run the same JS 3–6× slower.

Sources and grades are in the repo's `reports/Fast and beautiful UI.md`.

## Budget

| Budget | Limit |
| --- | --- |
| LCP / INP / CLS (75th percentile, mobile) | ≤2.5s / ≤200ms / ≤0.1 |
| Long tasks during load, scroll and interaction | none over 50ms at 4× CPU slowdown |
| Critical-path JS (compressed) | ≤100 KB for pages and portfolios, ≤170 KB for apps |
| Any one JS chunk | ≤50–100 KB |
| Animation JS on the critical path | ≤~30 KB; 3D and Lottie always lazy |
| Render-blocking scripts | 0 |
| Fonts | ≤2 families, WOFF2, ≤1 preload, ≤~100 KB, axes pinned |
| Hero image | not lazy, `fetchpriority="high"`, AVIF/WebP, served at its rendered size |
| Blur | radius ≤10px, bar-sized surfaces only, never animated over large areas |
| `will-change` | only just before a change, then removed |
| Feedback | visible response (pressed state or optimistic update) within 100ms |
| Hero video | a poster as the LCP; WebM first; ≤~500 KB |

## The cheap way to get each costly effect

The rule behind every row: paint the expensive thing once, then animate the `transform` or `opacity`
of the finished pixels.

| Costly | Cheap twin |
| --- | --- |
| Animating `width`/`height`/`top`/`left` | FLIP: measure once, animate `transform` |
| Growing `box-shadow` on hover | Big shadow on `::after` at opacity 0; animate its opacity plus the element's transform |
| Animated gradient | Paint an oversized gradient once and translate it, or cross-fade two layers |
| Big blur or backdrop blur | ≤10px on a bar; a semi-opaque solid fill; a pre-blurred image if the backdrop never changes |
| Animating a global CSS variable | Scope it to the element, `@property { inherits: false }`, or set the style from JS |
| Per-frame values in React state | MotionValues or refs, which write to the DOM with no re-render |
| JS reading `scrollTop` to drive styles | `position: sticky`; `animation-timeline: scroll()/view()` inside `@supports`; Motion `useScroll` piped to opacity/transform |
| Scroll reveal with observer + `setState` | The observer toggles a class, CSS does the transition, `unobserve` after the first reveal |
| Smooth-scroll libraries (Lenis, Locomotive) | Native scroll, `scroll-behavior`, scroll-driven animation |
| Animated GIF | `<video autoplay loop muted playsinline>`, WebM first (3.7 MB GIF → 341 KB WebM) |
| Lottie for a spinner or checkmark | CSS or SVG transform/opacity; Lottie only for path morphs, lazy, destroyed off-screen |
| WebGL / three.js hero (~185 KB) | A static poster as LCP; load 3D on visibility, on capable devices only, paused off-screen |
| Long sections below the fold | `content-visibility: auto` + `contain-intrinsic-size: auto <estimate>` |
| Preloader or intro sequence | No gate on first content; an intro animates content that is already painted |
| Runtime CSS (Tailwind Play CDN) | Build-time CSS. Same look, no 123 KB render-blocking script |

## Platform features (support as of 2026-10)

- **Use freely, all browsers:**
  - CSS transitions and `@starting-style` for enter and exit without JS.
  - `transition-behavior: allow-discrete`.
  - Same-document View Transitions.
  - `content-visibility`, `fetchpriority`, AVIF.
- **Enhancement only, inside `@supports` with a fallback:**
  - Cross-document View Transitions (Chrome, Safari).
  - Scroll-driven animations (`animation-timeline`; Chrome, Safari; stable Firefox uncertain).
- **Not yet:** `interpolate-size` (Chromium only), `prefers-reduced-data` (behind a flag).

## Libraries (min+gzip, whole package; upper bounds)

| Library | Size |
| --- | --- |
| Motion | `animate` mini 3.3 KB; `m` + LazyMotion ≈ 5 KB + 24 KB (`domAnimation`) |
| GSAP | 27 KB core |
| Lenis | 5.5 KB, but it moves scroll onto the main thread |
| Lottie | 77 KB (dotlottie 33 KB + WASM) |
| three.js | 185 KB |

Reach for JS only where the platform can't do it: springs, gestures, interruptible layout
animation.

## Gate heavy experiences

Load WebGL, Lottie and video loops behind a poster with `import()`, and only when all of these hold:
- the user hasn't asked for reduced motion
- Save-Data is off
- the device is capable: `navigator.hardwareConcurrency` of 4 or more, and `deviceMemory` of 4 or
  more where it exists (a heuristic, not a sourced rule)

Everyone gets the fast core.
