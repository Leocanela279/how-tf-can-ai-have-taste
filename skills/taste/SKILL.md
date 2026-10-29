---
name: taste
description: >-
  Art direction and visual taste for any web UI: landing pages, product and marketing sites,
  portfolios, app screens, dashboards, settings, lists. Grounds the design in the subject, measures
  real reference sites into numbers, writes a token plan before code, lints, and runs a screenshot
  critique loop against the reference. Use whenever you build, design, redesign, restyle or polish a
  web page or screen in any stack (HTML/CSS, React, Next.js, Tailwind, Vue, Svelte, Astro), and
  whenever output looks generic, templated or AI-made. For motion polish after the layout is settled,
  use the animate or review-animations skills.
---

# Taste

Left alone, a model builds the average of the web. Every choice in it is plausible, and none of them
was actually decided. This skill makes the decisions explicitly and grounds them in two things the
average doesn't have: the subject's own material, and measured numbers from real work. Then it looks
at the result next to its reference.

Four beliefs behind every step:

- **The user's taste outranks every rule here.** They are the only judge of whether it is
  distinctive. In this skill's first blind test, the owner chose a richer no-skill page over the
  skill's own sparser build, even though it broke several "rules". Ask what they love before
  deciding anything.
- **Familiar structure, exact surface.** People judge a page in about 50ms, and they like it when it
  looks simple and typical of its kind. Novelty helps only while the page still reads as typical.
  Keep the skeleton people expect, and spend novelty on the surface.

- **Taste is calibration, not avoidance.** linear.app uses Inter, pills, gradients and borders, and
  it still looks expensive because its values are precise:
  - grounds 1–7 RGB steps apart
  - four ink greys at 18.7 / 13.6 / 6.1 / 3.5:1
  - weight 510
  - −0.022em tracking on the headline
  - a spacing jump from 12 to 32px

  Copy relationships between values, not ingredients.
- **Say what to do, with numbers, and make it fast by construction.** Naming what to avoid primes
  it, and performance retrofitted at the end means deleting effects. Every decision below is written
  positively, and its cost is chosen when it is planned. Then the page is seen next to its
  reference, by someone who didn't build it.

`<skill>` is this folder. Working files go in `design/` at the project root. The scripts need Node 22+
and Chrome, Chromium, Edge or Brave (set `CHROME_PATH` if it isn't found).

## 1. Ground the brief

Start `design/DESIGN.md` with:

- **The user's taste, first.** If the user is there, ask in one message:
  - Which 2–3 sites or apps do you love?
  - Light or dark?
  - Anything you already know you want or hate?

  Record the answers verbatim; they outrank everything below. If `design/critiques.md` exists, read
  it too.
- **Subject, audience, job.** The job is one of persuade, operate, read or experience. Add the one
  action the page exists for.
- **Inventory.** 6–10 things that belong to this subject and to no competitor: its name and what the
  name means, its place, materials, numbers, constraints, rituals, the printed things of its world,
  its real data.
- **Real content.** Write the actual copy and data now, at full density. Use sample details where the
  brief has gaps, and list them for the user to confirm. Proof is never invented: no customers,
  quotes, logos or business metrics.

If the brief carries nothing specific to the subject, ask at most two more questions, in the same
message as the taste questions. Otherwise state your reading in one line and continue.

## 2. Measure a reference

The style lives in numbers that a screenshot doesn't carry.

- **The user named sites they love:** these are the references. For each, run
  `node <skill>/scripts/probe.mjs <url> --out design/refs/<slug>.json`.
- **No URL:** open `<skill>/library/README.md`. Pick the 1–2 profiles whose notes match this job and
  tone, then read each `tokens.json` and `notes.md`.
- **Only an image:** write your estimates (grounds, inks, families, sizes, spacing) as numbers in
  DESIGN.md and mark them as estimates for the user to correct.

For each reference, write one line saying what you borrow (its ink staircase, spacing rhythm, type
calibration) and what you leave (its subject, imagery and composition). Borrow calibration, never the
whole layout.

## 3. Diverge, then drop the most likely

First fix the skeleton: the structure people expect from this kind of page, such as a nav, a clear
first screen, the work, about and contact for a portfolio, or a list with filters for an app screen.
It is not up for divergence. Directions differ on the surface instead: type, the one visual, the one
motion, colour, and how the idea shows.

List five directions. For each, write one line plus your estimate of how likely it is that you would
have produced it for *any* similar brief. Discard the two most likely. From the rest, pick the one that
best carries an item from the inventory and fits the user's taste. Then write the idea sentence:

> On this page, **[something only this subject has]** becomes **[the device]**.

Then run the competitor test: put the nearest competitor's name in the sentence. If it still works,
it is a category idea. Go back to the inventory.

## 4. Write the token plan before any code

Add these to DESIGN.md, all as numbers, derived from the reference profile:

- **Grounds:** 1–3 of them, and how surfaces separate. Use a tone step (give its size), or hairlines
  (give their alpha).
- **Inks:** a 3–4 step staircase, each with its contrast ratio on the main ground. Body text uses the
  strongest or second ink and is at least 4.5:1.
- **Accent:** one hue (two at most), and the places it appears: the action, plus at most one more.
- **Type:**
  - Families: at most two; one is normal.
  - Weights: at most three.
  - Sizes: 3–5 in use, with one decisive jump. Display is at least 3× body on pages and at least 1.6×
    on app screens.
  - Tracking and leading for each size. Large type gets tighter tracking (−0.01 to −0.04em) and
    leading (0.95–1.15).
  - Body: 15–20px on pages, 13–15px on app screens, line-height 1.4–1.6, lines of 45–75 characters.
- **Spacing:** a set of 5–7 values. The gap between groups is at least 2× the gap inside a group.
- **Radii:** one rule (square, small or full), decided by hierarchy. Never one radius on everything.
- **Boldness:** the one place it is spent: a scale jump, a field of colour, an image, a live element.
  Everything else stays quiet.

Then review the plan line by line. Would you have written that line for any similar brief? If so,
revise it from the reference or the inventory, and note the change. Read `design/history.md` if it
exists, and don't repeat a past build's direction.

The budgets above are defaults. A measured reference overrides them (Linear runs four inks); write
down the override and its source. Where neither the reference nor the user decides something (dark
surfaces, button sizes, tracking at each size, hover and focus, motion timing), take the value from
`references/defaults.md`. Don't invent one.

Finally, write a **cost line for every planned effect**: which rendering stage it touches (composite,
paint or layout), and the cheap way to get it from `references/performance.md`. The signature
moment gets its own line, and the performance budget applies to it.

## 5. Build

- **Tokens first,** as CSS custom properties or a Tailwind theme. Components reference tokens only.
  No value outside the plan.
- **Fast from the first line:**
  - CSS compiled at build time, never a runtime compiler.
  - Every `<img>` has `width` and `height`.
  - The hero image is never lazy and gets `fetchpriority="high"`.
  - At most 2 font families, in WOFF2, with variable axes pinned to what is used.
  - No script in `<head>` without `defer` or `type=module`.
- **The first screen first,** at 1440 and 390 wide, until it is right. Then each section, each one
  carrying the idea. Neighbouring sections never share a layout. A section exists only if the content
  has a claim for it.
- **Rich, not sparse.** Every screen carries real content and enough parts to reward a look: meta,
  figures, real fragments of the work. Group things to lower complexity. Don't delete them. Empty
  space is spent once per page at most, on purpose.
- **Every data view ships its states:**
  - loading: a skeleton shaped like the result
  - first use: what this is, plus the next action
  - filtered to nothing
  - error: what happened, how to fix it, input kept
  - sparse and dense
- **Interaction:**
  - a real button for the action, labelled verb + noun
  - `:focus-visible` styles
  - targets of at least 24px (44px on touch)
  - `<a>` for navigation
  - `tabular-nums` on figures
- **Product fragments:** a product fragment shown as a picture (a hero mockup of the app) gets
  `data-ui` and `aria-hidden="true"`. That keeps it out of the contrast and target checks. Everything
  a person can really use stays in.
- **Motion:** none yet. Get it right standing still.

For app screens (dashboards, settings, lists, editors), read `references/craft.md` before building.

## 6. Lint

```bash
node <skill>/scripts/lint.mjs <source files or folder>
node <skill>/scripts/probe.mjs <url or index.html> --check
```

`--check` runs three passes:
- **Design:** contrast, targets, type and colour budgets.
- **Cost:** the page loaded at 4× CPU slowdown, checking LCP, CLS, long tasks, render-blocking
  scripts, script and font bytes, blur and non-composited animations.
- **Reduced motion:** a reload with `prefers-reduced-motion` on, which must leave nothing moving.

Fix every `ERROR`. A `WARN` stays only if DESIGN.md says why the reference, the subject or the user
earns it. The gate measures defects, not liking. A clean gate is the floor, not the verdict.

## 7. Look

1. **Shoot.** Run
   `node <skill>/scripts/shoot.mjs <page> --ref <reference url> --out design/shots/r1`. It captures the
   page and the reference at 390, 1024 and 1440 wide, plus a blurred copy for the hierarchy test.
2. **Critique.** Spawn a critic subagent with a fresh context, one that did not build the page. Give
   it `<skill>/references/critic.md`, the shots folder and DESIGN.md. If `design/critiques.md`
   exists, give it that file too: it holds the user's own example critiques and outranks the rubric.
   The critic returns ranked issues and one priority target.
3. **Fix.** Fix the priority target and at most two more issues, without breaking what already works.
4. **Compare.** Shoot again into `r2`. The critic compares the new version with the best so far,
   pairwise. Keep the new version only if it is strictly better; otherwise revert it.

Run one round by default. Run a second only if round 1 found a P0. Never run more than three. Ship the
best version, not the last one.

## 8. Motion and finish

Only now add motion, and keep it within these limits:

- **Required:** motion that explains a change: things opening, closing, moving or confirming. Also
  press feedback, and tracking an item from a list into its detail.
- **Optional:** one signature moment per page.
- **Never:** on keyboard-triggered or high-frequency actions. No scroll-jacking, and no parallax on
  text.
- **How:**
  - Platform first: CSS transitions, `@starting-style`, same-document View Transitions.
    Scroll-driven animation only inside `@supports`.
  - JS only where the platform can't, and per-frame values never go through React state.
  - `transform` and `opacity` only. Timings from `references/defaults.md`: 70–150ms micro,
    150–250ms small, 200–350ms modals, exits shorter.
  - Ease-out, never from `scale(0)`.
- **Always:** a reduced-motion fallback (a cross-fade).

Use the `animate` skill for anything beyond that. Then look in the mirror and remove one thing.

## 9. Hand over

Tell the user, briefly:

- the reference and what you borrowed from it
- the idea sentence
- the plan in five lines
- the sample content to confirm
- what the critic still flags
- the runner-up direction from step 3, in one line

Then append to `design/history.md`: the date, direction, grounds and accent, families, and what the
user said. The user is the judge of whether it is distinctive. Ask for their verdict in one question.

## When it starts to look generic

`references/tells.md` lists the defaults that generated pages fall into, and pairs each one with the
move that replaces it. Read it during critique, not before planning. Tells are warnings, never
targets to minimise. One is allowed when DESIGN.md says why the reference, the subject or the user
earns it. If the user loves mono labels, they're in.

## Files

| Path | Use |
| --- | --- |
| `library/` | Measured reference profiles (`tokens.json` + `notes.md`), indexed in `library/README.md` |
| `references/critic.md` | Brief for the critic subagent |
| `references/defaults.md` | Values for type, buttons, states, colour, dark mode and motion when nothing else decides |
| `references/performance.md` | Budget, the cheap way to get each costly effect, platform feature readiness |
| `references/craft.md` | App-screen rules: states, feedback, density, copy |
| `references/tells.md` | Default patterns paired with their replacements |
| `scripts/probe.mjs` | Measures a live page into a profile; `--check` adds the design, cost and reduced-motion passes |
| `scripts/shoot.mjs` | Screenshots of page and reference at three widths, plus a blur copy |
| `scripts/lint.mjs` | Static checks on source for defects code can prove |
