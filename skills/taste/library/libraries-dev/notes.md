# libraries.dev

Measured 2026-10-29 at 1440 and 390 (`tokens.json`, `tokens-390.json`). Dark catalogue of UI
components and models. Job: make you want to touch the components.

## Why it works

- **The chrome is grey; the colour lives in the work.** The grounds are `#101010`, `#131313`,
  `#181818` and `#1A1A1A`, with white at 5% for raised surfaces. Every saturated colour on the page
  (the border beam, the voice ring, the orbs) sits *inside* a demo. The interface around it has
  none, except one blue "Get full access" button.
- **Frames inside frames.** Each demo sits in a 24px-radius outer ring with a 12–14px-radius
  panel inside it, a few px apart. The nested radii read as hardware bezels, and they make a grid
  of dark squares feel crafted rather than templated.
- **Small, quiet type.** Inter at 400 and 500 only. 13–14px carries about 75% of the text; the
  headline is 42px at weight 500, line-height 1.07. The type never competes with the demos.
- **The hero is the product, scattered.** Five live demo tiles float around a centred headline
  at 1440. Nothing is illustrated; every object on the first screen is a real component.

## On the phone

The tiles move *above* the headline: the first screen at 390 is the objects, then a 30px
headline, then the two buttons. The page shows before it tells. Body stays 14px, which is under
the 16px comfort floor in `reports/Mobile first UI taste.md`.

## Borrow

Monochrome chrome with colour confined to the content. Nested radii (outer ≈ inner + gap) on
showcase frames. A single saturated CTA on an otherwise grey page. Letting real product objects
form the hero.

## Leave

The 13–14px body and `#767676`-level greys on a near-black ground for running text. The centred
headline with a pill counter above it ("2,300,000+ installs") is the category default, not the
reason it works.
