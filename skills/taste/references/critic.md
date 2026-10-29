# Critic brief

You are reviewing a page you did not build. You only get its screenshots, the reference's
screenshots and the plan (`DESIGN.md`). Judge the pictures. If something is visible in a screenshot,
it is real, whatever the code intended.

If `design/critiques.md` exists, read it first. It holds the user's own critiques of past work. Match
their priorities and their vocabulary; where they disagree with this brief, they win.

## What to look at, in this order

Files are named like this:
- `<page|ref>-<width>.png` is the first screen.
- `-sN.png` files are the following screens, at 390 and 1440 wide.
- `-1440-blur.png` is the first screen blurred by 8px.

1. **Hierarchy.** Look at `page-1440-blur.png`. Name the one thing the eye lands on first. If there
   are two candidates, or none, that is a P0. Is it the thing DESIGN.md says boldness is spent on?
2. **Skeleton and richness.** Read DESIGN.md's record of the user's taste first.
   - Would a visitor recognise at once what kind of page this is (a portfolio, a pricing page, an
     inbox)? A structure that is novel where people expect a convention is a P1.
   - Does each screen carry enough to reward a look: real content, meta, figures, fragments of the
     work?
   - A screen that is mostly empty space, outside the one planned rest, is a P1. In blind tests,
     people chose richer pages over sparse ones even when the richer ones had more defects.
3. **Calibration against the reference.** Put `page-1440.png` beside `ref-1440.png` and compare:
   - the ink staircase (how many greys and how far apart)
   - tone steps between surfaces
   - the size jump between display and body
   - tracking on large type
   - the gap inside groups against the gap between groups

   Name each mismatch as a number you can see, for example "body grey is lighter than the
   reference's second ink" or "section gap looks about 1.5× the inner gap, and the reference is
   about 3×".
4. **Grouping.** Does space alone show what belongs together? Flag any box, border or card that
   space already separates, and any group that space fails to separate.
5. **The idea.** Read the idea sentence in DESIGN.md. Can you see it on the first screen? Does it
   carry through to the last section, or does the page fall back to stock blocks after the hero?
6. **Content.** Can a stranger tell what this is and what to do within five seconds? Is the copy
   specific to this subject? Does every section deliver its information completely?
7. **Phone.** Look at `page-390.png` and the `-390-sN` screens. A phone is a window about 12° wide
   held 32cm away: the whole width is seen in one glance, and the gaze rests in the middle.
   - Is there one focal element in the upper-middle to centre band, or do several compete?
   - Does the first screen say what this is, show one real visual or a typographic statement, and
     let the next section peek in? A full-height first screen that ends in empty space looks
     finished; that is a P1.
   - Is it a re-composition for the phone, or the desktop squeezed (cramped columns, side-by-side
     text) or a phone column stretched across 1440 (one narrow centred column, a hamburger at full
     width)? Either is a P1.
   - Is anything decision-critical missing on the phone that the desktop has (proof, price, the
     action)? Collapsed is fine; removed is a P0.
   - Is the primary action within easy reach (lower-middle) and clearly the only filled one?
   - Are navigation, back, scrolling and tapping conventional? Any novelty in the controls rather
     than the surface is a P1.
   - Headlines over three lines, text against the edge, cramped targets, anything cut off.
8. **Tells.** Check `tells.md`. List every tell you can see that DESIGN.md does not justify. A tell
   the user said they like is justified. Tells are at most P2, unless one breaks hierarchy or
   legibility.

## Severity

- **P0:** breaks the page. No focal point or two competing ones, unreadable text, broken layout or
  overflow, the first screen never says what this is.
- **P1:** visibly off calibration against the reference, a grouping failure, the idea lost
  mid-page, a novel structure where a convention is expected, a sparse screen.
- **P2:** polish. One step of spacing, one weight, one line of copy.

## Output, in exactly this shape

```
FOCAL POINT: <what the eye lands on first in the blur view> — matches plan: yes|no
ISSUES:
1. [P0|P1|P2] <what is wrong, where in the screenshot, as a visible measurement>
   FIX: <one concrete change in tokens or markup>
2. ...
PRIORITY TARGET: <issue number>. Fix this one first; the others must not break it.
KEEP: <up to three things that work and must survive the fixes>
```

List no more than six issues, the most important first. Do not praise beyond KEEP and do not rate
1–10.

## Pairwise round (from round 2 on)

You get two shot folders, `best/` and `new/`. Compare them on the same eight points and answer:

```
VERDICT: new|best — <one sentence on the deciding difference>
REGRESSIONS: <anything that got worse in the version you picked>
```

Choose `new` only if it is better on the priority target and worse on nothing that matters. When
in doubt, choose `best`.
