# Animation and Transitions in UI: When Motion Helps, What Works, and When It Is Overengineering

Evidence labels used throughout:
- **[Measured]**: controlled study or usability test with observed behaviour or data.
- **[Guideline]**: published design system or standards body (Material, Apple HIG, Carbon, W3C, NN/g practitioner guidance).
- **[Opinion]**: individual practitioner's craft advice (Emil Kowalski etc.).

Research date: 2026-10-29. Button press and hover micro-interactions are covered by another researcher. These notes cover motion as a whole.

---

## 1. Why motion helps: purposes and the evidence behind them

### Takeaway
Motion helps when it explains **change**: what changed, where something came from or went, that an input registered, or that the system is busy. Lab evidence is strongest for animated transitions that keep objects identifiable between two states (object constancy and spatial memory). The supporting studies are Heer & Robertson 2007 and Bederson & Boltman 1999. Every major design system frames motion as functional first and expressive second.

### Cited Findings

**NN/g taxonomy of purposes [Guideline, informed by usability testing]** ([NN/g, The Role of Animation and Motion in UX](https://www.nngroup.com/articles/animation-purpose-ux/))
- **Feedback.** Motion confirms that the system recognised an action, and people notice movement more readily than static change. NN/g's example is a cart badge that updates without animation: users can miss it and add the item twice.
- **State changes and modes.** Loading indicators and skeleton screens with a moving shimmer tell users the system is not ready for input.
- **Spatial metaphors and navigation.** Zooming in or out implies moving down or up a hierarchy, and sliding implies moving forward or back through a process such as checkout. NN/g says animation does **not** replace visible navigation labels.
- **Preventing disorientation.** Animating accordions, anchor-link jumps and overlays shows users they are still on the same page. Users who think they reached a new page may press Back and leave the site.
- **Signifiers.** The direction of motion hints at how to dismiss or use an element: a card that slides down can be pulled down, and a small bounce hints at a swipe.
- **Attention capture.** NN/g calls this "double-edged". It cites Pratt et al. (2010, *Psychological Science* 21:1724–1730), which found that animate-like motion captures attention.

**Material Design transition patterns [Guideline]** ([Material Components Android, Motion docs](https://raw.githubusercontent.com/material-components/material-components-android/master/docs/theming/Motion.md))

| Pattern | Use it for |
|---|---|
| **Container transform** | Moving between elements that share a container: a card or list item expanding into a detail page, a FAB opening a screen, a search bar expanding. It visibly links the start and end containers. |
| **Shared axis** | Elements with a spatial or navigational relationship. Use the x-axis for onboarding steps, the y-axis for a stepper, and the z-axis for parent/child navigation. |
| **Fade through** | Destinations with no strong relationship: bottom-nav tabs, a refresh, an account switcher. |
| **Fade** | Elements that enter or exit inside the screen bounds: dialog, menu, snackbar, FAB. |

**Apple HIG Motion [Guideline]** ([Apple HIG Motion](https://developer.apple.com/design/human-interface-guidelines/motion.md), last change logged September 9, 2025 for Liquid Glass)
- Motion serves "conveying status, providing feedback and instruction, and enriching the visual experience".
- "Add motion purposefully, supporting the experience without overshadowing it. Don't add motion for the sake of adding motion." Gratuitous animation "can distract people and may make them feel disconnected or physically uncomfortable."
- Feedback motion should be realistic and match the gesture. A view revealed by sliding down should not be dismissed by sliding sideways.
- "Aim for brevity and precision in feedback animations." Brief, precise animation often conveys more than prominent animation.
- System motion adapts to the input method. Liquid Glass reacts with more emphasis to direct touch and with a subdued effect to a trackpad.

**Heer & Robertson 2007, "Animated Transitions in Statistical Data Graphics" (IEEE InfoVis) [Measured]** ([PDF](https://homes.cs.washington.edu/~jheer/files/2007-AnimatedTrans-InfoVis.pdf))
- **Participants:** 24 subjects, aged 26–62 (mean 49.6).
- **Experiment 1:** object tracking. Static (instant) transitions were compared with 1.25 s animated transitions.
- **Experiment 2:** estimating value change. Static transitions were compared with 2 s animated transitions.
- **Exp. 1 result:** animation was significantly better than static in every condition. Staged animation beat unstaged animation everywhere except the timestep scatter plot.
- **Exp. 2 result:** animation significantly beat static for scatter plots and grouped bars, with mixed results elsewhere. "Unknown" responses were more frequent with static transitions, but they also appeared in animated conditions when the axis was rescaled.
- **Preference:** staged animation was preferred to animation, which was preferred to static, with significant differences for all transition types.
- **Design principles**, quoted from the paper:
  - "Maximize predictability" (use slow-in/slow-out).
  - "Use simple transitions" (translation and expand/contract are easier to follow than rotation).
  - "Use staging for complex transitions" (for example, separate axis rescaling from value changes).
  - "Minimize occlusion".
  - "Group similar transitions" (common fate).
  - "Make transitions as long as needed, but no longer". The authors cite Robertson et al., who found that simple transitions of **about 1 second** performed best for data-visualisation transitions, and they note that small movements can run faster.
- **Caveat from the paper:** animation can mislead if it violates the data semantics, and it is no guarantee of better performance.

**Bederson & Boltman 1999, "Does Animation Help Users Build Mental Maps of Spatial Information?" (IEEE InfoVis) [Measured]** ([UMD tech report CS-TR-3964](https://www.cs.umd.edu/projects/hcil/jazz/learn/papers/CS-TR-3964.pdf); [DRUM record](https://drum.lib.umd.edu/handle/1903/984))
- Animating viewpoint changes in a zoomable family-tree interface improved users' ability to reconstruct the information space from memory.
- Animation imposed no penalty on task time.
- The authors recommend animated transitions for apps with fixed spatial data that users navigate. The finding is summarised by Heer & Robertson (PDF above).

**Chang & Ungar 1993, "Animation: From Cartoons to the User Interface" (UIST '93, pp. 45–55) [Design paper, not a controlled study]** ([PDF copy](https://courses.ischool.berkeley.edu/i247/s08/readings/Chang_AnimationInUI_UIST93.pdf); [Self bibliography](https://bibliography.selflanguage.org/animation.html))
- The paper applies cartoon techniques to the Self UI so objects move "solidly" rather than teleporting.
- Techniques include motion blur for fast moves, dissolves for arrivals and departures, anticipation, and slow-in/slow-out pacing.
- This is per the abstract and secondary summaries; the PDF text layer could not be extracted.

**Harrison et al. 2007, "Rethinking the Progress Bar" (UIST '07, pp. 115–118) [Measured]** ([project page](https://www.chrisharrison.net/index.php/Research/ProgressBars); [PDF](https://www.chrisharrison.net/projects/progressbars/ProgBarHarrison.pdf))
- **Method:** 22 participants compared 9 progress functions of equal real duration in pairs.
- **Result:** the functions fell into three clusters, perceived as slower than, equal to, or faster than linear.
  - Functions with pauses near the end (Slow Wavy, Fast Wavy, Late Pause) all felt **slower** than linear.
  - **Accelerating** progress was strongly favoured.
- **Recommendation:** put the slow or variable work first and accelerate progress toward the end.
- A follow-up (Harrison, Yeo & Hudson, CHI 2010, "Faster Progress Bars") is reported second-hand to show that backward-moving ribbing made waits feel about 11% shorter. **Unverified.** It appears only in a secondary summary ([UX Movement](https://uxmovement.com/buttons/how-to-make-progress-bars-feel-faster-to-users/)).

### Inferences
- The best-supported benefit of motion is **object constancy across a state change**: knowing that a thing is the same thing in a new place, size or form. Container transform, shared-element (view-transition-name) morphs and list reorder animations are the UI equivalents of Heer & Robertson's transitions.
- Staging (one change at a time) beats simultaneous change for complex transitions. In UI terms: move first, then resize or reveal content. Do not animate everything at once.
- The roughly 1 s optimum comes from data-visualisation comprehension tasks with non-trivial tracking. It does **not** transfer to everyday UI chrome, where guidelines put durations at 100–400 ms (see section 4).

### Gaps
- **Material's three principles** ("informative, focused, expressive") are from Material 2 (material.io/design/motion/understanding-motion). The page was not fetched this session, so the wording is unverified. The m3.material.io pages render client-side and could not be read.
- **Baudisch et al. 2006 "Phosphor"** (afterglow effects explaining transitions) and the **change blindness** literature (Simons & Rensink) were not retrieved. They are known to support "abrupt change without motion is easily missed", but I have no fetched citation.
- No full-text numbers for Chang & Ungar or for the CHI 2010 progress-bar follow-up.
- No peer-reviewed study of skeleton screens versus spinners was retrieved.

---

## 2. When motion is required, optional, or decorative

### Takeaway
Treat motion as **required** when, without it, a state or spatial change would be missed or would disorient the user. That covers overlays and accordions, reordering, elements moving between containers, and anything long-running. Motion is **optional** when it smooths an appearance that is already understandable (a toast or popover fading in). It is **decorative**, and should be rare, when it carries no information. Decorative motion belongs only on low-frequency, leisure surfaces such as marketing pages and onboarding.

### Cited Findings
- **Required for disorientation and missed-change cases.** NN/g reports users missing a static cart-badge update and adding the item twice. Users also misread un-animated overlays or anchor jumps as new pages and pressed Back. [Measured, usability observation] ([NN/g](https://www.nngroup.com/articles/animation-purpose-ux/))
- **Required for long waits.** Loading indicators and skeleton shimmer signal that the system is not ready ([NN/g](https://www.nngroup.com/articles/animation-purpose-ux/)). Progress-bar shape changes perceived duration ([Harrison et al. 2007](https://www.chrisharrison.net/projects/progressbars/ProgBarHarrison.pdf)).
- **Emil Kowalski's purpose test.** Ask "what's the purpose of this animation?" before adding one. [Opinion] ([You Don't Need Animations](https://emilkowal.ski/ui/you-dont-need-animations)) Valid purposes:
  - explaining how a feature works (marketing);
  - making the interface feel responsive;
  - making an appearance less abrupt (a toast);
  - spatial consistency, such as a toast entering and leaving in the same direction so a swipe-to-dismiss feels natural;
  - delight, but **only where frequency is low**.
- Emil adds that motion belongs only where it adds information or indicates a state change, such as a modal entering and exiting or an App Store-style card expansion. [Opinion] ([Great Animations](https://emilkowal.ski/ui/great-animations))
- **IBM Carbon productive vs expressive.** [Guideline] ([Carbon Motion](https://carbondesignsystem.com/elements/motion/overview/))
  - *Productive* motion is "efficient, responsive, and subtle". Use it while users focus on tasks: button states, dropdowns, data tables.
  - *Expressive* motion is "vibrant and highly visible". Reserve it for significant moments: opening a new page, triggering a primary action, alerts.
- **Carbon on static fallbacks.** Messages must also be communicable statically. Motion that users notice often should be reduced or removed, and subtle motion may be missed on mobile. [Guideline] ([Carbon](https://carbondesignsystem.com/elements/motion/overview/))
- **Apple: make motion optional.** Never make motion the only carrier of important information; pair it with haptics or audio. [Guideline] ([Apple HIG](https://developer.apple.com/design/human-interface-guidelines/motion.md))
- **NN/g on parallax and decorative motion.** Decorative scroll effects suit leisure browsing, narrative and brand sites, not task-focused users. [Measured, qualitative usability test] ([NN/g Parallax](https://www.nngroup.com/articles/parallax-usability/))

### Inferences
Decision rule for the taste skill:
1. Would a user **miss** a change, or be **unsure where something went**, without motion? Then motion is required. Keep it short, and use container transform, shared axis or a layout animation.
2. Is the change already obvious, but the appearance abrupt? Then a short fade or scale (under about 200 ms) is optional polish.
3. Does the motion carry no information? Then it is decorative. Allow it only on low-frequency surfaces (landing pages, onboarding, empty states, success moments), and never in tool chrome.

### Gaps
- No quantitative study was found comparing task success with and without each Material pattern.

---

## 3. When motion hurts

### Takeaway
Motion hurts when it is **frequent** (hundreds of times a day), **keyboard-triggered**, **slow** (over about 300–400 ms in product UI), **blocking** (the user must wait for it), **scroll-hijacking**, **parallax on text**, **autoplaying**, or **too much at once**. It also hurts when it ignores reduced-motion preferences or animates layout properties and causes jank.

### Cited Findings

**Frequency and keyboard**
- Raycast is used hundreds of times a day and has no open animation. Hover effects seen many times a day probably work best with none. Keyboard-initiated actions should "_never_" be animated, because repeated animated keyboard actions feel slow and disconnected. [Opinion] ([Emil, You Don't Need Animations](https://emilkowal.ski/ui/you-dont-need-animations))
- Tooltips: delay the first one, then open later tooltips instantly with no animation. [Opinion] ([Emil](https://emilkowal.ski/ui/you-dont-need-animations))
- Apple: "In apps, generally avoid adding motion to UI interactions that occur frequently." [Guideline] ([Apple HIG](https://developer.apple.com/design/human-interface-guidelines/motion.md))
- Apple: "Let people cancel motion… don't make people wait for an animation to complete before they can do anything, especially if they have to experience the animation more than once." [Guideline] ([Apple HIG](https://developer.apple.com/design/human-interface-guidelines/motion.md))
- NN/g: long or exaggerated animations become annoying with repeated use. More frequent animations should be shorter and subtler. [Guideline] ([NN/g Animation Duration](https://www.nngroup.com/articles/animation-duration/))

**Slowness**
- NN/g: "It is far more common for animations to be too long than too short." 400 ms is already "a very slow animation", and around 500 ms animations "start to feel like a real drag". [Guideline] ([NN/g](https://www.nngroup.com/articles/animation-duration/))
- Emil: a 180 ms dropdown feels more responsive than a 400 ms one. A 500 ms enter animation on a frequently opened tool frustrates users. [Opinion] ([You Don't Need Animations](https://emilkowal.ski/ui/you-dont-need-animations); [Great Animations](https://emilkowal.ski/ui/great-animations))

**Overload and irrelevance** ([NN/g Role of Animation](https://www.nngroup.com/articles/animation-purpose-ux/)) [Measured, usability test observations, no numbers]
- Hipmunk's loading screen ran several animations at once, and each weakened the others.
- Motion unrelated to the task "can substantially degrade the user experience".
- Animations that only fill transition time frustrated test participants.
- An animation that is benign on one element becomes "a distracting usability problem" when used site-wide.
- Flashing countdown timers are labelled a dark pattern.

**Scrolljacking** [Measured, qualitative usability study] ([NN/g Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/))
- Most participants were at least mildly disoriented. On Crypto.com, where the whole page was scrolljacked, **all** participants were disoriented.
- Long scrolljacks were worst, and so were scrolljacks combined with text the user had to read.
- Some users thought their scroll input was broken, refreshed the page, or left. Some assumed the page had ended when a scrolljack stopped revealing content.
- Problems were worse on mobile.
- A short, functional scrolljack on BBC News was tolerated.
- **NN/g verdict:** scrolljacking "leads to more user pain than benefits", so avoid it by default. If it must be used, it should be:
  - short, below the fold, and never reversing scroll direction;
  - free of essential text;
  - mixed with normal-scrolling sections;
  - tested for scroll rate;
  - escapable via sticky navigation;
  - usually skipped on mobile.

**Parallax** [Measured, qualitative usability test, no sample sizes] ([NN/g Parallax](https://www.nngroup.com/articles/parallax-usability/))
- Effects tied to scroll speed passed before users could read them.
- Heavy parallax on text made reading harder and could cause nausea.
- Users often ignored motion because they associate it with ads.
- Most users were indifferent; praise appeared mainly when researchers asked about the effects directly.
- **Recommendations:**
  - keep parallax on background or peripheral imagery;
  - freeze effects after they play once and don't replay them on scroll-up;
  - prefer subtle effects;
  - use parallax only for leisure or brand goals.

**Vestibular and accessibility requirements**
- **WCAG 2.2 SC 2.3.3 Animation from Interactions (Level AAA)** [Guideline] ([W3C Understanding 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html))
  - Text: "Motion animation triggered by interaction can be disabled, unless the animation is essential to the functionality or the information being conveyed."
  - "Motion animation" excludes colour, blur and opacity changes that don't alter perceived size, shape or position. **Cross-fades are therefore acceptable reduced-motion substitutes.**
  - Named triggers: scroll-triggered movement and parallax.
  - Reported effects: dizziness, nausea, migraines, potentially "needing bed rest to recover".
  - Techniques: C39 (CSS `prefers-reduced-motion`), SCR40 (the same query in JS), and a user preference toggle.
  - Examples: a parallax site with a global off switch, and a page-flip transition disabled under reduced motion.
- **WCAG SC 2.2.2 Pause, Stop, Hide (Level A)** covers motion the page starts *automatically*, as distinct from motion triggered by interaction ([W3C 2.3.3 page](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)). Its text was not re-fetched this session; see the [Understanding 2.2.2 page](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html). From the standard: moving, blinking or scrolling content that starts automatically, lasts more than 5 seconds and runs alongside other content needs a pause, stop or hide mechanism.
- **web.dev on `prefers-reduced-motion`** ([web.dev](https://web.dev/articles/prefers-reduced-motion))
  - Triggers named: parallax, scroll-linked animations, zoom effects, autoplaying video, animated decorative gradients.
  - `reduce` should remove all non-essential movement.
  - Recommended pattern: gate motion with `@media (prefers-reduced-motion: no-preference)`, so motion is opt-in and the no-motion version is the base.
  - Don't force `animation: none !important`, because some code relies on `animationend` firing.
  - Browser support: Chrome 74, Edge 79, Firefox 63, Safari 10.1.
- **Emil's reduced-motion pattern:** swap the motion for a fade instead of removing feedback entirely. His example replaces a bounce with a 0.2 s fade. In Motion/Framer Motion, `useReducedMotion` lets you zero the x-offset but keep the opacity change. [Opinion] ([Great Animations](https://emilkowal.ski/ui/great-animations))
- **Apple:** when Reduce Motion is on, minimise or eliminate animations. In visionOS, avoid motion in the periphery, avoid rotating the world, and avoid sustained oscillation around **0.2 Hz**, which people are very sensitive to. [Guideline] ([Apple HIG](https://developer.apple.com/design/human-interface-guidelines/motion.md))

**Performance**
- Animate `transform` and `opacity`, which only trigger compositing. Animating padding or margin triggers layout, paint and composite. Target 60 fps. [Opinion, consistent with browser rendering docs] ([Emil, Great Animations](https://emilkowal.ski/ui/great-animations))
- When the main thread is busy, prefer CSS animations or WAAPI, which can run off the main thread. Emil says Framer Motion's `requestAnimationFrame` path is not hardware-accelerated. [Opinion] ([Emil, Great Animations](https://emilkowal.ski/ui/great-animations))
- Carbon notes that some devices can't run complex motion smoothly, and recommends simpler motion on mobile and tablet. [Guideline] ([Carbon](https://carbondesignsystem.com/elements/motion/overview/))

### Inferences
Hard "never" list for product UI:
- animating keyboard-triggered actions such as command palettes, shortcuts and tab switching by key;
- animation on the hottest paths (actions used more than about 50 times a day);
- blocking input until an animation finishes;
- scrolljacking in tools;
- parallax on text;
- replaying scroll-reveal animations;
- non-composited properties in long animations;
- shipping without a `prefers-reduced-motion` path.

Under reduced motion, replace spatial motion with opacity fades rather than removing all feedback. WCAG's own definition excludes opacity from "motion animation".

### Gaps
- No prevalence figure for vestibular disorders was found in fetched sources (web.dev and W3C give none). Commonly repeated figures, such as "35% of adults over 40", come from the Vestibular Disorders Association and were not verified this session.
- No quantitative study of annoyance thresholds was found. The NN/g, Apple and Emil frequency rules are guidelines or opinion, not measured cut-offs.

---

## 4. Timing and easing standards

### Takeaway
Product UI motion lives at **about 100–300 ms**. Use 400 ms or more only for large, full-screen moves, and around 1 s only for data-visualisation comprehension. Use **ease-out (decelerate) for entering**, **ease-in (accelerate) for permanently exiting**, and **standard ease-in-out for on-screen moves**. Exits are a little faster than entrances. Larger distance or size means a longer duration, and spring stiffness also scales with size.

### Cited Findings

**NN/g [Guideline]** ([Animation Duration](https://www.nngroup.com/articles/animation-duration/))
- Most animations run 100–500 ms.
- About 100 ms suits simple feedback such as checkboxes and toggles.
- 200–300 ms suits substantial changes such as a modal entering.
- 400 ms is very slow and should be reserved for large movement across big screens.
- Entrances should be slightly longer than exits, for example a popup appearing in 300 ms and disappearing in 200–250 ms.
- Use ease-out for entrances. Ease-in can feel unresponsive. Avoid linear motion for movement.
- NN/g notes these are practitioner figures, not measured thresholds.

**Material Design 3 tokens [Guideline]** ([MDC-Android Motion docs](https://raw.githubusercontent.com/material-components/material-components-android/master/docs/theming/Motion.md))

Duration tokens:

| Range | Tokens |
|---|---|
| Short | 1–4: 50, 100, 150, 200 ms |
| Medium | 1–4: 250, 300, 350, 400 ms |
| Long | 1–4: 450, 500, 550, 600 ms |
| Extra-long | 1–4: 700, 800, 900, 1000 ms |

Easing tokens:

| Token | Value | Use |
|---|---|---|
| Standard | `cubic-bezier(0.2, 0, 0, 1)` | Utility motion that starts and ends on screen |
| Standard decelerate | `cubic-bezier(0, 0, 0, 1)` | Entering the screen |
| Standard accelerate | `cubic-bezier(0.3, 0, 1, 1)` | Exiting the screen |
| Emphasized | Path-based curve, not a single cubic-bezier | Common M3-style motion |
| Emphasized decelerate | `cubic-bezier(0.05, 0.7, 0.1, 1)` | Entering |
| Emphasized accelerate | `cubic-bezier(0.3, 0, 0.8, 0.15)` | Exiting |
| Linear | `cubic-bezier(0, 0, 1, 1)` | Non-stylised motion |

The container-transform table in the same doc also lists the legacy standard curve `cubic-bezier(0.4, 0.0, 0.2, 1)`.

Spring tokens (MDC 1.13+, M3 Expressive). Spatial springs move things; effects springs animate colour and opacity without overshoot.

| Token | Damping | Stiffness | Use |
|---|---|---|---|
| Fast spatial | 0.9 | 1400 | Small components (switches, buttons) |
| Fast effects | 1 | 3800 | Colour and opacity on small components |
| Default spatial | 0.9 | 700 | Partial-screen motion (bottom sheets) |
| Default effects | 1 | 1600 | Effects on partial-screen motion |
| Slow spatial | 0.9 | 300 | Full-screen motion |
| Slow effects | 1 | 800 | Effects on full-screen motion |

**IBM Carbon [Guideline]** ([Carbon Motion](https://carbondesignsystem.com/elements/motion/overview/))

Duration tokens:

| Token | Value | Use |
|---|---|---|
| fast-01 | 70 ms | Buttons, toggles |
| fast-02 | 110 ms | Fades |
| moderate-01 | 150 ms | Small expansions, short moves |
| moderate-02 | 240 ms | Expansion, toasts, system communication |
| slow-01 | 400 ms | Large expansions, important notifications |
| slow-02 | 700 ms | Background dimming |

Micro-interactions should respond with ease-out in a static **90–120 ms** range. Larger changes in distance or scale get longer durations on a non-linear scale, and productive motion is significantly faster than expressive.

Easing:

| Curve | Productive | Expressive |
|---|---|---|
| Standard | `cubic-bezier(0.2, 0, 0.38, 0.9)` | `cubic-bezier(0.4, 0.14, 0.3, 1)` |
| Entrance | `cubic-bezier(0, 0, 0.38, 0.9)` | `cubic-bezier(0, 0, 0.3, 1)` |
| Exit | `cubic-bezier(0.2, 0, 1, 0.9)` | `cubic-bezier(0.4, 0.14, 1, 1)` |

Side panels that leave but stay nearby should use standard easing, not exit easing.

**Emil Kowalski [Opinion]** ([Great Animations](https://emilkowal.ski/ui/great-animations); [You Don't Need Animations](https://emilkowal.ski/ui/you-dont-need-animations))
- UI animations "should also usually be shorter than 300ms".
- Use ease-out for snappy motion. He used `ease` (slightly slower) for Sonner toasts to get an elegant feel.
- Animations should be **interruptible**, retargeting smoothly mid-flight. CSS transitions and Motion support this.
- Tune springs with stiffness, damping and mass.
- Marketing sites are the exception to the speed rule.
- Faster spinners improve perceived performance.

**Apple [Guideline]** ([Apple HIG](https://developer.apple.com/design/human-interface-guidelines/motion.md))
- No millisecond values are given. The guidance is to be brief and precise, follow the gesture, and let people cancel.
- For games, 30–60 fps.
- Its system feel comes from interruptible springs; SwiftUI exposes `.spring(duration:)`.

**Data visualisation [Measured]**
- Robertson et al., cited by [Heer & Robertson 2007](https://homes.cs.washington.edu/~jheer/files/2007-AnimatedTrans-InfoVis.pdf), recommend transitions of about 1 s for comprehension. Heer & Robertson's experiments used 1.25 s and 2 s. Slow-in/slow-out improves predictability.

### Inferences
Cross-system consensus for a web taste skill:

| Kind of motion | Duration | Notes |
|---|---|---|
| Micro feedback | 70–150 ms | |
| Small UI (dropdown, popover, tooltip, toast) | 150–250 ms | |
| Medium (modal, sheet, drawer) | 200–350 ms | |
| Full-screen or page | 300–500 ms | |
| Exits | about 20–30% shorter than entrances | |
| Background dim | Can be slower (Carbon: 700 ms) | |

| Direction | Easing |
|---|---|
| Enter | `cubic-bezier(0, 0, 0.2, 1)`-class decelerate, or M3 `(0.05, 0.7, 0.1, 1)` for emphasis |
| Exit | Accelerate, for example `(0.3, 0, 1, 1)` |
| On-screen move | `(0.2, 0, 0, 1)` |

- Never use linear easing for spatial movement. Linear is fine for opacity, progress or spinners.
- Prefer springs for gesture-driven or interruptible motion. The M3 spatial damping ratio of 0.9 means a near-critically-damped spring with almost no bounce, so product UI should not bounce noticeably.

### Gaps
- **Val Head's specific duration and easing guidance** (*Designing Interface Animation*, 2016) was not fetched; it is only cited by NN/g.
- **Rauno Freiberg's guidance** (rauno.me, "Invisible Details of Interaction Design") was not fetched.
- Apple's default SwiftUI spring parameters (response and damping fraction values) were not retrieved from a primary source.
- The M3 "emphasized" path control points were not retrieved; the docs say it isn't a single cubic-bezier.
- m3.material.io could not be rendered.

---

## 5. Page and route transitions, View Transitions API, scroll-driven animation, and marketing vs product

### Takeaway
Page transitions help when the next page shares an element with the current one: a thumbnail becoming a hero image, a persistent header, or a filtered grid. The View Transitions API now makes these cheap and progressive-enhancement-friendly in all major engines for same-document transitions. Marketing and leisure pages tolerate expressive, scroll-linked motion. Task-focused product apps should keep transitions short, functional and cancellable.

### Cited Findings

**View Transitions API** ([Chrome for Developers, View Transitions](https://developer.chrome.com/docs/web-platform/view-transitions); [View Transitions in 2025](https://developer.chrome.com/blog/view-transitions-in-2025))
- **Mechanism:** the browser snapshots the old and new states, updates the DOM with rendering suppressed, and animates the change with CSS animations. It works for SPAs and MPAs.
- **Same-document (SPA):** call `document.startViewTransition()` with a fallback.

| Feature | Chrome/Edge | Firefox | Safari |
|---|---|---|---|
| Same-document transitions | 111 | 144 (stable October 2025) | 18 |
| Cross-document transitions | 126 | Not listed as supported on the docs page | 18.2 |
| `view-transition-name: match-element` (auto-naming) | 137 | 144 | 18.4 |
| `document.activeViewTransition` | 142 | 147 | 26.2 |
| Nested view transition groups | 140 | Not supported | Not supported |
| Element-scoped view transitions | Experimental (the post is inconsistent between Chrome 140 and 147) | Not supported | Not supported |

- **Cross-document (MPA):** triggered by a same-origin navigation when both pages opt in with `@view-transition { navigation: auto; }`. There is no JS call to start one.
- Other features: view transition types (2024; missing from Firefox's initial implementation) and `view-transition-class`.
- React has a `<ViewTransition>` component in canary.
- Use cases Chrome cites: a thumbnail growing into a full image, a persistent nav bar across pages, grid items moving when filtered.

**Reduced motion for page transitions**
- WCAG's own example disables a page-flip transition when the user prefers reduced motion ([W3C 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)).
- Opacity-only cross-fades fall outside "motion animation" ([W3C 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)).

**Marketing vs product**
- Emil: marketing sites are the exception to the under-300 ms rule. He gives Linear's marketing animation as an example of motion that explains a feature. [Opinion] ([Emil](https://emilkowal.ski/ui/you-dont-need-animations))
- Carbon's productive (task) vs expressive (moment) split maps directly onto tool vs marketing. [Guideline] ([Carbon](https://carbondesignsystem.com/elements/motion/overview/))
- NN/g: parallax and storytelling scroll fit leisure browsing and brand building. Task-oriented users want content first and prominent in-page navigation. [Measured, qualitative] ([NN/g Parallax](https://www.nngroup.com/articles/parallax-usability/); [NN/g Scrolljacking](https://www.nngroup.com/articles/scrolljacking-101/))
- Material's fade-through for unrelated destinations (bottom-nav tabs) and shared-axis for hierarchical or sequential navigation give the route-transition taxonomy. [Guideline] ([MDC Motion](https://raw.githubusercontent.com/material-components/material-components-android/master/docs/theming/Motion.md))

### Inferences
Route-transition rules for web:

| Kind of navigation | Transition |
|---|---|
| Tabs or unrelated destinations | Instant, or a fade-through of about 150–250 ms |
| Hierarchy (list to detail) | Container transform or shared element via `view-transition-name` |
| Sequential steps (wizard) | Shared x-axis slide with a small offset (tens of px, not full width) |
| Keyboard-driven navigation in tools | None |

- Build cross-document view transitions as progressive enhancement and wrap them in a reduced-motion media query.
- Scroll-driven CSS animations (`animation-timeline: scroll()` or `view()`) are appropriate for progress indicators and subtle reveals on marketing pages, under NN/g's constraints: play once, keep them peripheral, and keep text static.

### Gaps
- Chrome's scroll-driven animations docs (support matrix, `animation-timeline`) were not fetched this session, so browser support for scroll-driven animations is unverified here.
- No systematic study was found comparing award-winning (Awwwards) sites with top product apps. The "what top products do" evidence is anecdotal: Raycast has no open animation, Linear's marketing explains features, and the App Store uses card expansions (all from Emil, as above).
- Motion (formerly Framer Motion) and GSAP-specific guidance was not retrieved beyond Emil's notes on `useReducedMotion` and rAF vs hardware acceleration.

---

## 6. Overengineering signals and how to audit motion

### Takeaway
Motion is overengineered when it fails the purpose test, appears on most elements, plays on frequent or keyboard paths, makes users wait, replays, stacks several effects at once, or runs long. Audit by **listing every animation**, then checking each for **purpose, frequency, duration, trigger and reduced-motion path**. Delete anything that is decorative and high-frequency.

### Cited Findings
- **Signals from usability tests** [Measured, qualitative] ([NN/g Role of Animation](https://www.nngroup.com/articles/animation-purpose-ux/)):
  - multiple simultaneous animations competing (Hipmunk);
  - motion irrelevant to the task;
  - motion that only fills downtime;
  - one effect applied site-wide.
- **Parallax signals** [Measured, qualitative] ([NN/g Parallax](https://www.nngroup.com/articles/parallax-usability/)):
  - effects users only praise when asked;
  - replaying on scroll-up;
  - motion on text;
  - slow loading behind effects.
- **Scrolljacking signals:** whole-page scrolljacks, changed scroll direction, and scrolljacking above the fold. [Measured, qualitative] ([NN/g Scrolljacking](https://www.nngroup.com/articles/scrolljacking-101/))
- **Apple signals:** "motion for the sake of adding motion", motion on frequent interactions, and non-cancellable motion. [Guideline] ([Apple HIG](https://developer.apple.com/design/human-interface-guidelines/motion.md))
- **Emil's checks** [Opinion] ([You Don't Need Animations](https://emilkowal.ski/ui/you-dont-need-animations); [Great Animations](https://emilkowal.ski/ui/great-animations)):
  - frequency of exposure;
  - keyboard trigger;
  - duration over 300 ms;
  - non-interruptible;
  - animates layout properties;
  - no reduced-motion handling.
  - He also suggests reviewing animations again the next day with fresh eyes.
- **Carbon check:** reduce or remove motion users notice often, and keep a static channel for every message. [Guideline] ([Carbon](https://carbondesignsystem.com/elements/motion/overview/))
- **Heer & Robertson:** "Make transitions as long as needed, but no longer". Uninformative animation violates congruence. [Measured + principle] ([Heer & Robertson 2007](https://homes.cs.washington.edu/~jheer/files/2007-AnimatedTrans-InfoVis.pdf))

### Inferences
Suggested audit procedure, synthesised from the sources above:
1. **Inventory.** Grep for `transition`, `animation`, `@keyframes`, `motion.`, `gsap.`, `startViewTransition` and `animate(`. Count the animated elements per screen.
2. **Purpose.** Tag each animation as one of feedback, state change, spatial/continuity, loading, attention, or decoration. Decoration on a product surface is a deletion candidate.
3. **Frequency.** Estimate exposures per user per day. At more than about 20 per day, shorten it or make it instant. Keyboard-triggered means instant.
4. **Duration and easing.**

   | Surface | Ceiling |
   |---|---|
   | Small elements | 300 ms or less |
   | Large or full-screen | 400–500 ms or less |
   | Any surface | No linear easing for spatial motion; exits shorter than entrances |

5. **Blocking and interruptibility.** Can the user act or retarget mid-animation?
6. **Concurrency.** Is more than one attention-seeking animation visible at once? Are staggered entrances everywhere? Staggers on every list and section are an overengineering tell. Reserve them for first-load hero moments.
7. **Accessibility.** Does `prefers-reduced-motion` have a path that keeps the information (opacity) and drops spatial motion? Is there a pause control for autoplay over 5 s?
8. **Performance.** Does it animate only `transform` and `opacity`? Does it hold 60 fps on a mid-range phone?

**Rule of thumb for the skill:** the product should feel almost the same with motion off. If removing an animation makes something confusing, it was required. If no one would notice its removal, it was decoration, and on a high-frequency surface it is overengineering.

### Gaps
- **No controlled studies were found** that measure user annoyance or tolerance as a function of animation count, duration or stagger. Evidence is limited to qualitative usability observations (NN/g) and practitioner opinion.
- No published auditing checklist from a major design system was retrieved. The procedure above is a synthesis.
