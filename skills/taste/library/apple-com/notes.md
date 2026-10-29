# apple.com

Measured 2026-10-29 at 1440 and 390. The home page of a hardware company. Job: show this
season's products, one at a time, and send you to the product page.

## Why it works

- **The page is a stack of product tiles.** Each tile is full-bleed, owns one product, and
  alternates black and light grey (`#F5F5F7`), separated by thin white gutters. One idea per
  tile, every time.
- **Photography is the whole visual budget.** No illustration, no icons, no decoration. The image
  is the product in use, lit on black, and it is huge: about two-thirds of the first screen.
- **A rigid, tiny text stack.** Product name (56px, weight 600, line-height 1.07), a one-line
  pitch (about 28px), an availability line in grey, then two pill buttons. The same stack repeats
  on every tile, centred.
- **One blue.** `#0071E3`-family blue for the filled button and links; the outlined button uses
  the same blue. Text is `#1D1D1F` on light tiles and white on black, with greys made as
  black at 56%, 72% and 88% alpha rather than separate hex values.
- **Pills are 980px radius.** Apple uses a large fixed value instead of 50% so pills stay pills
  at any size.

## On the phone

The structure does not change at all: the same tile, the same centred stack, the headline down
to about 34–40px, the image scaled into the remaining height. A hamburger replaces the long nav.
This is the clearest example of "same composition, re-sized" working, because the composition
was a single centred column to begin with.

## Borrow

One subject per screen. Product photography doing all the visual work. Alpha-black greys. A
repeated, fixed text stack so the eye knows where to look on every tile.

## Leave

The 12px text: it is the giant footer and legal copy (about 70% of all text by count), well under
the comfort floor. The rest of the formula only works with Apple-grade photography; with weaker
images it becomes a generic centred landing page.
