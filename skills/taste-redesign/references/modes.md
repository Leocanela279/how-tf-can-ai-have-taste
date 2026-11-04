# Modes

Read at stage 0. A redesign is a choice of layer, and the cost to users of relearning sets the
risk. Misclassifying the mode is the biggest single cause of bad AI redesigns
("refinement preserves; redesign replaces; never split the difference", Impeccable). Evidence and
sources: the repo's `reports/Redesigning existing project UIs.md`.

| Mode | What may change | What may not | Typical request |
| --- | --- | --- | --- |
| **Review** | Nothing. Diagnose and report only | Anything | "What's wrong with it?", "audit this", "critique" |
| **Fix** | One named defect (contrast, focus, overflow, a broken state) | Everything else | "The button text is unreadable" |
| **Polish** | Drift, defects, missing states, alignment, consistency | The look: palette, type, layout, IA | "Tidy it up", "make it feel finished" |
| **Restyle** | Tokens: type calibration, colour use, ink steps, spacing, radii, icons, imagery, copy tone | Layout, navigation, IA, flows, URLs | "Make it look better / less AI / less dated" |
| **Realign** | Hierarchy, grouping, density, section layouts inside the same pages and flows | Navigation, IA, flows, URLs | "It's cluttered", "nothing stands out", "too sparse" |
| **Redesign** | Navigation, templates, flows, content model | Brand constants unless the user frees them | "People can't find X", "rethink the dashboard" |
| **Overhaul / rebrand** | Everything visual, keeping content and IA | Content, routes | "Replace the look entirely", a new brand. Record the before (stage 1), then hand to `taste` |

Surface (no relearning): fix, polish, restyle. Structure (relearning): realign, partly; redesign,
fully. Structural changes need evidence (task or findability failure, a funnel step that leaks,
new features that do not fit) or the user's explicit request with the relearning cost stated.

## The one question message

Ask once, all in one message, then proceed:
1. What prompted this? (a complaint, a metric, a feeling, a brand change)
2. Who uses it, and how often? (daily users relearn; first-time visitors don't)
3. What must not move? (logo, colours, fonts, nav labels, URLs, anything people rely on)
4. Keep the current look and tighten it, or replace the look and keep the content?
5. If the palette stays: the brand hues only, or every existing colour value?

## Defaults when there is no answer

- "Make it better / less AI / less dated / prettier" → **restyle**.
- "What's wrong with it?" / "review" / "audit" → **review**.
- "Clean it up" / "polish" → **polish**.
- Say which mode you assumed in one line, and continue.

## Never mix

- A polish never smuggles in a restyle. If the concept is wrong, say so and recommend the higher
  mode instead of half-doing it.
- A restyle never leaves half the pages on the old look: one theme on every page.
- "Already right" is a valid result for any finding or the whole page.
