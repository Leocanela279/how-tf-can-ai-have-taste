# Restraint

How to make a minimal page that feels finished instead of empty. Read this when the user asks for
"minimal", "simple", "clean", "like emilkowal.ski", "Apple-like", or names a text-first reference.

Grades, as in `defaults.md`: **M** measured, **S** a standard, **C** a convention across design
systems, **O** one source or opinion, and **R** measured in this repo (`library/`, `experiments/`).

## Why a minimal page can be enough

- **First impressions favour simple and typical (M).** People judge a page in about 50ms and prefer
  low visual complexity plus a layout typical of its kind (Tuch et al. 2012; Reinecke et al. 2013).
  A text-first portfolio scores the maximum on both.
- **Easy reads as good (M).** Processing fluency: what is effortless to perceive is liked more, and
  its content is judged more credible (Reber, Schwarz & Winkielman 2004). Every element removed is
  one less thing to parse.
- **Restraint signals confidence (O).** Next to pages that perform, a page that only points at the
  work reads as "the work doesn't need dressing up". The surprise is the contrast with the category.
- **But emptiness loses (R).** In blind test B4 the owner chose a rich page over the skill's sparse
  one. In B5 the same owner asked for minimal and shipped it. The difference: minimal was *his*
  request, and every project linked to live work that carries the weight.

## When restraint works, and when it doesn't

Use it when all of these hold; otherwise build rich (`defaults.md`, "Complexity"):
1. The user asked for minimal, or a reference they love is minimal.
2. The work lives elsewhere and one click shows it: live products, a famous library, a GitHub repo.
3. The content is specific: real names, real one-line descriptions, real dates. Restraint with
   generic copy is a template.
4. The page's job is *read* or *point*, not *persuade* a cold audience or *operate* a tool.

## The rules, with numbers

1. **Few values, each exact (R).** emilkowal.ski: 2 sizes (16px carries 93% of text, 14px the
   rest), 2 weights (400, 500), 2 inks, 3 gaps. A short list is only clean if every item on it is
   measured, not guessed. Write them all in the token plan.
2. **Hierarchy without size (R).** Ink first, then weight, then space. The name can be body size at
   500. The headline-to-body ratio may be 1; the probe will warn, and DESIGN.md justifies it.
3. **Ink order (R).** The name, section labels, item titles and links in the first ink; running
   text, descriptions and dates in the second. Reversing it makes a paragraph outweigh the name (the
   P0 in B5 round 1).
4. **Warm near-black on warm off-white (R, C).** Emil `#21201C` on `#F9F9F8` (15.6:1, second ink
   `#63635E` at 5.8:1); Apple `#1D1D1F` on `#F5F5F7`. A few steps off pure black and white reads as
   paper instead of screen. Dark: near-black ground about `#0F`–`#12`, ink about `#E5`–`#ED`.
5. **Space instead of boxes (C).** No cards, borders, dividers or shadows: proximity groups. Gaps
   jump, not step: inside an item 4px, between items 16–24px, between sections 64–128px (Emil
   16 → 64 → 128). Phones: halve the section gap, keep the rest.
6. **One column, one edge (C).** Text column about 560–640px (lines of 60–75 characters),
   left-aligned. On desktop, a label gutter to the left uses the width without widening the text.
7. **A screen grotesque at regular weights (R).** Emil: Inter Variable with its optical-size axis
   (opsz 14–32, wght 100–900), used at 400 and 500, never bold. Inter and SF Pro are the
   "Apple-like" look; Geist is a more technical cousin. Set `font-optical-sizing: auto` (the
   default) so small text opens up by itself.
8. **One personal mark (O).** Restraint needs one thing that is the owner's, or it reads as a
   template: a period in the accent, a live clock, a year column. One, and small. Not a hero, not a
   gradient.
9. **Craft nobody sees (R).** Emil's CSS defines a metric-matched fallback: Arial with
   `size-adjust: 107.89%`, `ascent-override: 89.79%`, `descent-override: 22.36%`. The text takes
   the same space before and after the web font loads, so nothing jumps. On a page this quiet, a
   single layout shift is visible. Ship a metric-matched fallback for every web font (next/font
   and fontaine generate them), or preload the font.
10. **Motion only where it explains (O).** Underline colour on hover, 150ms. Anything bigger (a
    theme switch, a drawer) is earned by an action and honours reduced motion.

## Questions to answer before building

Put the answers in DESIGN.md:
- What carries the weight if the page doesn't? Name the links.
- Which 2 sizes, 2 weights, 2 inks and 3 gaps? Measured from which reference?
- Which ink does each kind of text get? Does the name win the blur test?
- What is the one personal mark?
- Is every remaining sentence specific to this person or subject? Would it survive the competitor
  test?

## How the critic checks it

- **Blur test.** At 8px blur, does the eye land on the name or title first? A paragraph that wins is
  an ink-order P0.
- **Exactness.** Is every gap one of the planned three? Does every text line use one of the two
  inks? A minimal page shows a 4px mismatch that a busy page hides.
- **Enough.** Could a stranger reach the real work in one click from the first screen? If not, the
  page is thin, not minimal.
- **Template test.** Swap in another name. If nothing else needs to change, the personal mark or
  the copy is missing.
