# Diagnose

Read at stage 2. One evaluator finds roughly 20–51% of usability problems; three to five together
find about 75% (Nielsen & Molich 1990 and later). An AI audit is one evaluator: treat its
structural conclusions as hypotheses, and say so in the report.

## The diagnostic critic

Spawn a critic with a fresh context, as in taste step 7, on the *before* shots. Give it this file,
`<taste>/references/critic.md` and DESIGN.md (with the must-survive list). It judges first and
reads numbers second, so the numbers don't anchor it:

1. **Judge the pictures.** Focal point in the blur view (one, two or none). Count the competing
   elements above the fold. Does it read as a typical page of its kind? A 5-second read: what is
   this, and what do I do? A heuristic pass over the top 1–3 tasks. Name 2–3 things that work.
2. **Then read the numbers:** the inventory, the probe baseline, lint, and `<taste>/references/tells.md`.
3. **For each finding:** verify it at file:line; tag its layer (fix, surface, realign, structure,
   code) and bucket (corrective, subtractive, additive); rank by leverage (impact ÷ effort).
4. **Return:** the three changes that would move the page most; the full ranked list; what works
   and must stay; considered but rejected; a note that this is one evaluator.

## From symptom to lever

Change the cheapest layer that fixes the finding. No study ranks the visual levers against each
other; the order follows Reinecke et al. 2013 (complexity outweighs colourfulness) and the case
evidence in `levers.md`.

| What you see | What to measure | Lever | Layer |
| --- | --- | --- | --- |
| Nothing leads; the eye wanders | Blur test; competing elements above the fold | Hierarchy: one lead per view; make competitors smaller, lighter, lower-contrast | Surface / realign |
| Titles look like body | Sizes and weights in use; display-to-body ratio | Type scale inside the family: 3–5 sizes, one decisive jump, ≤ 3 weights | Surface |
| Looks off, can't say why | `inventory`: unique colours, sizes, spacings, radii; near-duplicates | Consolidate tokens; gaps between groups ≥ 2× gaps inside; one radius rule | Surface |
| Busy, colourful, noisy | Saturated area; colour on decoration | Brand colour on action and active state only; neutral chrome | Surface |
| Washed out, hard to read | Contrast per text node; ink staircase | 3–4 inks with known ratios; body ≥ 4.5:1 | Surface |
| Icon soup | Icon count, families, strokes, sizes | Fewer, smaller, one family and one stroke | Surface |
| Generic, AI-made | Tells without a reason; copy specificity | Type calibration, owned imagery, specific copy: defaults removed *and replaced* | Surface |
| Too sparse | Words and parts per screen; empty bands | Real content, meta, figures; a tighter spacing scale | Realign |
| Wrong first clicks; can't find things | First click on top tasks; support tickets | Navigation labels first, then IA | Structure |
| Drop-off at one step | Funnel step rate | That step's form, copy and errors | Local structure |
| Slow or janky | LCP, INP, CLS; bytes; blur | Images, fonts, scripts, reserved space | Code |

## Drift signals

The inventory's largest counts are where calibration drifted, so its output is already a ranked
list. No source gives a normal count. As a rule of thumb (unsourced): more than about 8 font sizes,
12 colour clusters, 10 spacing values or 3 radii on one page is drift worth consolidating. Real
audits have found 85 unique colours on one product and 11 font sizes on one homepage.

## Valid and invalid motives

Valid when tied to a symptom you can show: accessibility failures (low-contrast text on 83.9% of
top home pages, WebAIM 2026), Core Web Vitals over threshold (usually a code fix, not a redesign),
task or findability failure, a leaking funnel step, design-system drift, a generic or dated first
impression, a real brand change. Invalid: boredom, a calendar, copying a competitor, a company
agenda that makes the user's core task harder.
