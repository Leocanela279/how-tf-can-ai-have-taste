---
name: taste-redesign
description: >-
  Redesign, restyle, polish or review the UI of an existing project: a live site, an app with
  screens people already use, a codebase with its own styles, components and brand. Classifies the
  request (review, polish, restyle, realign, redesign), records the current UI as a measured
  baseline, diagnoses what to change, keeps the brand constants (logo, palette, fonts) and
  everything people rely on, changes the cheapest layer in reversible steps, and proves the result
  against the before. Use whenever the user asks to redesign, refresh, modernise, clean up,
  improve, restyle or audit an interface that already exists, or says it looks generic, dated,
  cluttered or AI-made. For new pages with no existing UI, use the taste skill.
---

# Taste: redesign

An existing UI is two things at once. Its constants (logo, brand hues, faces, labels, routes) are
the best-measured reference the product has, and its drift (too many greys and sizes, colour on
decoration, nothing leading) is the anti-reference. Most of the taste in a redesign is deciding
what *not* to change, then recalibrating the relationships between what stays.

Three beliefs:
- **Classify first and never mix modes.** Refinement preserves; redesign replaces.
- **Measure before you touch.** Nothing is edited until the before is recorded.
- **Change the cheapest layer that works, reversibly.** Surface before structure. Removing
  something people use needs the user's sign-off.

`<taste>` is the sibling `taste` skill folder (`<skill>/../taste`). This skill uses its scripts,
library and references in place. If that folder is missing, stop and ask the user to install both
skills (`npx github:Leocanela279/how-tf-can-ai-have-taste` always installs them together). Working files go in `design/` at the project root, as in taste.
The scripts need Node 22+ and Chrome, Chromium, Edge or Brave.

## 0. Classify

Read `references/modes.md`. Map the request to one mode: review, fix, polish, restyle, realign,
redesign, or overhaul (handed to taste). Ask the five questions there in one message. Without an
answer, use the defaults there and state the mode you assumed.

If `design/DESIGN.md` exists and the request is a small edit to that design, use taste's fast path
instead.

## 1. Record the before

Pin the before: a git ref, or a static copy in `design/before/`. Then, at 1440, 390 and 360:

```bash
node <taste>/scripts/probe.mjs <page> --width 1440 --out design/before/profile-1440.json
node <taste>/scripts/probe.mjs <page> --width 1440 --check      # also 390 and 360
node <taste>/scripts/shoot.mjs <page> --out design/before/shots
node <taste>/scripts/lint.mjs <source>
node <skill>/scripts/inventory.mjs <page> --src <source> --out design/before/inventory.json
node <skill>/scripts/parity.mjs <page> --crawl 20 --out design/before/parity.json
```

Record the `--check` errors as the baseline; don't fix anything yet. Start DESIGN.md with the mode,
the answers, and a **Must survive** list: logo, brand hues, faces, routes, navigation labels, form
names, copy voice, legal copy, signature interactions, and the accessibility the product already
gets right.

## 2. Diagnose

Read `references/diagnose.md` and run its diagnostic critic on the before shots. Each finding is
verified at file:line, tagged by layer and bucket, and ranked by leverage. The output names the
three changes that would move the page most, what works, and what was considered but rejected.

**Review mode stops here:** hand over the findings.

## 3. Choose scope with the user

In one message, offer options tied to the findings: the top three, all of them, or critical only;
anything off-limits; brand stays or goes. Without an answer, take the top 3–5 by leverage at the
least disruptive layer. Structural findings without behavioural evidence are *proposed*, not
scheduled.

## 4. Plan the change

Read `references/levers.md`. In DESIGN.md, write a **Before | After | Why** table: the measured
current tokens, the new ones, and the finding each change answers. Mark the constants as fixed.

- Free axes (anything not fixed) take their calibration from the user's loved sites or 1–2
  `<taste>/library/` profiles, as in taste step 2.
- In restyle and redesign, run taste step 3 (directions) on the free axes only.
- For a broad request, you may build 2–3 variants of the first screen on named axes, with the
  project's tokens, behind a dev-only switch, and let the user pick.
- Every planned effect gets a cost line (`<taste>/references/performance.md`).
- Minimal requests: `<taste>/references/restraint.md`. Phones: `<taste>/references/mobile.md`.
  Components: `<taste>/references/components.md`. App screens: `<taste>/references/craft.md`.

## 5. Build in reversible slices

Read `references/rollout.md`. Work in the project's existing stack and styling system: no new
styling system, dependency or migration without asking, and one theme on every page.

1. Tokens mapped to the current values; `shoot --ref` the before shows no visible change. Commit.
2. Then, one commit each: defects → colour and inks → type scale → spacing and density → states →
   components and sections only where they can't be saved → motion last.

Taste step 5's build rules apply. Stop when the chosen findings are fixed.

## 6. Gate against the baseline

```bash
node <taste>/scripts/lint.mjs <source>
node <taste>/scripts/probe.mjs <page> --width 1440 --check      # also 390 and 360
node <taste>/scripts/probe.mjs <page> --width 1440 --out design/after/profile-1440.json
node <skill>/scripts/compare.mjs design/before/profile-1440.json design/after/profile-1440.json
node <skill>/scripts/parity.mjs <page> --crawl 20 --against design/before/parity.json
```

No new probe ERROR; every baseline error in scope is gone; `compare` shows no regression; every
parity ERROR or WARN is fixed or on the user's sign-off list. It isn't done while anything regresses
without an explanation.

## 7. Look against the before

`node <taste>/scripts/shoot.mjs <after> --ref <before> --out design/shots/r1`. The `ref-*` shots are
the before. Run the critic as in taste step 7, with `<taste>/references/critic.md`, in its
**before** mode: new against before, plus recognisability and moved actions. Keep a change only if it
is strictly better than the before. One round, a second only on a P0, never more than three.

## 8. Hand over

Tell the user, briefly:
- the mode, and the constants that were kept
- before/after pairs at 1440 and 390
- the Before | After | Why table
- what moved and where (a note users can read), and the parity sign-off list
- considered but rejected, and what the critic still flags
- a rollout sized to the change (`references/rollout.md`) and what to watch in the first weeks

Ask for the verdict in one question.

## 9. Record

Append to `design/history.md`: date, mode, constants kept, changes, the verdict. Later sessions read
DESIGN.md, history and critiques first and don't re-litigate settled decisions. Small follow-ups go
through taste's fast path.

## Files

| Path | Use |
| --- | --- |
| `references/modes.md` | The modes, the one question message, defaults, never mixing |
| `references/diagnose.md` | The diagnostic critic, symptom → lever table, drift signals, valid motives |
| `references/levers.md` | Redesigning with palette, fonts and logo fixed; brand colour that fails contrast |
| `references/rollout.md` | Reversible slices, contracts that never change silently, rollout sizing, failures |
| `scripts/inventory.mjs` | Every colour, size, weight, spacing, radius and shadow in use, near-duplicates merged; hard-coded values in source |
| `scripts/parity.mjs` | Records links, headings, landmarks, forms, controls, test ids, analytics hooks and shortcuts; `--against` proves nothing was lost |
| `scripts/compare.mjs` | Diffs two probe profiles and flags regressions |
| `<taste>/scripts/` | probe, shoot, lint (shared) |
| `<taste>/library/`, `<taste>/references/` | Reference profiles and rules (shared) |

The evidence behind this skill is in the repo's `reports/Redesigning existing project UIs.md`.
