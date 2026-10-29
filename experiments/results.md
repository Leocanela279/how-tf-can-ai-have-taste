# Experiment results

## B4: portfolio (2026-10-29)

**Brief.** The owner's real portfolio. Content was pulled from his GitHub: 6 projects plus 3 small
tools, with real screenshots. Both variants got identical content and assets.

| | Variant | Built by | Gate (probe at 1440) |
| --- | --- | --- | --- |
| A | Baseline: no skill, one pass, plain prompt | Fresh agent, skills forbidden | 3 errors (contrast, small targets), 5 warnings: 3 families, 13 eyebrow labels, 18% monospace, 12 gradients, blur |
| B | `skills/taste`, round 1, critic fixes *not* applied | This session | 0 errors, 0 warnings |

**Verdict (owner, blind): A.** "I really really like A." His only change: he prefers a dark theme.

The owner preferred the variant the gate scored *worse*. The gate measures defects and defaults; it
does not measure what he likes.

**Why A won, as hypotheses** (to confirm with the owner's own reasons):

1. **Prototypicality.** First impressions favour low complexity *plus* high prototypicality
   (Tuch 2012; Reinecke 2013), and novelty only pays off while the design still reads as typical
   (MAYA, Hekkert 2003).
   - A reads as a recognizable, polished developer portfolio.
   - B's cinnamon field and inverted hierarchy are novel structure. The skill pushes novelty into
     *structure*; the evidence says to put it in *surface* (type, one visual, one motion) and keep
     the structure typical.
2. **Richness beats austerity.** A has many more parts: a sticky nav, a meta strip, a live clock, a
   three-column focus strip, an index, a db-doctor card, a dark contact block. taste-skill's own
   blind tests found the same: "a page that has lost its labels, rules and cards and gained nothing
   in their place reads as thin". B removed ornament and replaced it mostly with space.
3. **The owner's taste includes tier-2 devices.** Mono labels, serif italic accents, a warm accent
   and eyebrows are "tells" by the catalogue. They are also what he likes. The tells list is
   calibration, not law. The owner wins (this is the skill's own rule, and the run broke it by
   treating tells as targets to minimise).
4. **Dark preference was never asked.** The skill's step 1 asks about subject and content, not about
   the owner's existing taste. B chose light with no input.

**Changes this suggests for the skill:**
- Step 1 asks for 2–3 sites the user loves, plus light or dark, before anything else.
- Step 3 keeps the structure prototypical for the category; novelty goes into the surface.
- The richness check becomes part of the critique (does every screen carry enough content and
  parts?).
- Tells stay WARN-only and never drive the plan.

**Follow-up.** `runs/baseline/b4-dark/` is A in a calibrated dark theme, at the owner's request:
- warm near-black ground `#0F0E0C` and raised `#171613`/`#1A1915`
- off-white ink `#ECE8DF`
- muted `#A39E93`
- accent lifted to `#EC7044` for dark
- dim labels raised to 4.5:1
- links padded to 24px targets

The probe reports 0 errors at 1440 and 390.
