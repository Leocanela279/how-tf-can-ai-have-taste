# Mobile

Phone rules for step 5 (Build) and step 8 (Motion). Read this before building the 390px layout.
The evidence, sources and confidence for each rule are in the repo's
`reports/Mobile first UI taste.md`. The probe checks the measurable ones when run with
`--width 390` and `--width 360`.

A phone is a window about 12° wide and 25° tall, held about 32cm from the eye. The whole width is
seen in one glance, the gaze rests in the middle, and a line is still read in several fixations.

## The phone screen

- **First screen.** It says what this is, shows one real visual or a typographic statement, and
  lets the next section peek in. No full-height hero that ends in empty space: it makes the page
  look finished.
- **One primary action.** One filled primary action per screen, at least 48px tall, in the
  lower-middle where the thumb and the gaze already are. Rare actions can live in the top corners.
- **Navigation stays visible.** 3–5 labelled items, or a short top bar. A hamburger alone hides
  destinations that would fit.
- **Nothing is removed.** Secondary detail collapses under clear headers; decision content (price,
  proof, the action) stays visible. Search engines index the phone version only.
- **Forms.** Fields at 16px or more (iOS zooms in below that), and zoom is never disabled.
- **No auto-motion.** No auto-advancing carousel and no autoplay video. Horizontal rows show part of
  the next item so people know they scroll.
- **Touch reaches everything.** Everything reachable by hover is also reachable by tap. Targets
  44px or more, bigger at the screen edges.
- **Standard controls.** Novelty goes into type, the one visual, motion and copy. Navigation, back,
  scrolling and tap stay standard.

## Comfort

- **Size.** Running text at least 16px, nothing under 12px, and weight 300 or lighter only at 20px
  and up.
- **Motion.** Anything that moves across a phone screen fills most of the view, so keep large motion
  rare and short, and always ship the reduced-motion fallback.
- **Theme.** Never sell a palette as easier on the eyes: blue-light and "dark mode is healthier"
  claims are not supported. Comfort comes from size, contrast and stillness. Dark text on a light
  ground reads best; offer dark when the user wants it, on a near-black (about `#121212`), never
  pure black under white body text.
