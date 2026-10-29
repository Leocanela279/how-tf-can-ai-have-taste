# linear.app

Measured 2026-10-29 at 1440 wide (`tokens.json`). Dark product page for a work tool. Job: persuade,
by showing the product working.

## Why it works

- **Elevation is tone, not lines.** The grounds are `#08090A`, `#0F1011`, `#101112` and `#161718`,
  one to seven RGB steps apart. Translucent white at 1–2% alpha marks the panels. Borders exist
  (132 elements) but are so faint that they read as surface changes, not outlines.
- **Four inks carry the hierarchy, and size barely does.** The inks are `#F7F8F8`, `#D0D6E0`,
  `#8A8F98` and `#62666D`. On the darkest ground they measure about 18.7, 13.6, 6.1 and 3.5:1. Most
  text sits at 12–15px, and importance comes from ink and weight.
- **One family, tuned.** Inter Variable carries 84% of the text, in two weights: 400 and a custom
  510. Berkeley Mono appears only where something is code or an identifier.
- **One decisive jump in scale.** The headline is 72px at 1440 (5vw), line-height 1.0, tracking
  −0.022em, weight 510. Body is 15px, a ratio of 4.8. There is nothing between 32 and 48 except
  section heads.
- **A tight spacing vocabulary.** Most gaps are 4, 6 or 8px, then a jump to 32px. That is
  small-inside, big-between, with a ratio of about 4.
- **The product is the picture.** The hero image is the real interface, built in HTML at full
  fidelity. There are no illustrations and no stock photography.

## Borrow

The ink staircase and the tone-step elevation. The single weight shift (400 → 510) in place of
bold. The 4/8 → 32 spacing jump. Negative tracking on large type. Showing real interface fragments
instead of describing features.

## Leave

- The subject and its exact palette. A dark near-black page with grey inks *is* the dev-tool
  category look; on a different subject it reads as costume.
- The fourth ink (`#62666D`, 3.5:1) on small text. It fails WCAG AA there, and Linear's own page
  fails the probe's contrast and target checks inside its product mockup (section labels at 3.4:1,
  icon buttons at 14px). Copy the calibration, not the shortfall.
- Pills on every button, and the gradient washes. They work here because everything else is so
  quiet. They are not the reason it works.
