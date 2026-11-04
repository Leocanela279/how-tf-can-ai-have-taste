# Levers

Read at stage 4. With palette, fonts and logo fixed, redesign the relationships between them.
Linear (2024: 98 hand-set colour variables → 3 inputs in LCH; 2026: dimmer chrome, fewer and
smaller icons, softer borders, "don't compete for attention you haven't earned"), Stripe (CIELAB
scales: colours 5 steps apart pass small-text contrast) and GitHub Primer (contrast fixed at the base
token layer) kept their identity and regenerated the relationships. That is the taste skill's
"calibration, not ingredients", applied to an existing product.

## Keep the constants

The few assets people recognise (usually the logo shape and the signature colour) carry the brand;
most assets are weak (average fame 26%, uniqueness 54%; Int. J. of Advertising 2026). Hold the
strong ones fixed and change how they are used, not what they are.

## The levers, by payoff against risk

1. **Colour usage, not colour choice.** Regenerate tints and shades from each brand hue in OKLCH
   so the steps are perceptually even (HSL ramps are not). Reserve the saturated brand colour for
   the primary action and the active state; tint neutrals slightly toward the brand hue; take
   colour off decoration.
2. **Chrome versus content.** Dim navigation and supporting surfaces; lower border contrast; drop
   separators that space already does.
3. **Inks and type inside the family.** 3–4 inks with known ratios; 3–5 sizes with one decisive
   jump; ≤ 3 weights; tracking and leading per size; optical sizes where the family has them.
   Hierarchy comes from de-emphasising competitors, not from making the lead louder.
4. **Spacing and density.** 5–7 values; gaps between groups ≥ 2× gaps inside. Nested radius =
   inner radius + padding.
5. **Icons.** Fewer, smaller, one family, one stroke. No icon tiles above headings.
6. **Copy and states.** Specific claims, verb + noun actions, designed empty, loading and error
   states.
7. **Structure and navigation** last: the biggest functional payoff and the loudest pushback
   (Vercel 2026, Stripe 2024). Propose; ship behind an opt-in.
8. **Glass, blur and material effects** carry the highest legibility risk (iOS 26 Liquid Glass).
   Don't introduce them in a redesign.

## Two conflicts that come up every time

- **The brand colour fails contrast.** Keep the hue, change the role: the brand value on marks,
  large type and fills; a darker step from the same OKLCH ramp for text. (B5 in this repo: `#EC7044`
  on dark, `#D4572A` on light for non-text only.)
- **More contrast is not automatically better.** Twitter's August 2021 high-contrast buttons drew
  eye-strain complaints and were toned down within about two days. Target the ink staircase, not
  the maximum.

Ask what "keep the palette" means: usually the brand hues, with the neutral ramps free. If every
existing value is frozen, the remaining levers are proportion and role only.

## Express every change in the project's system

Use its existing tokens, Tailwind theme, CSS variables or design-system components. No second
styling system, no new dependency, no framework migration without asking.
