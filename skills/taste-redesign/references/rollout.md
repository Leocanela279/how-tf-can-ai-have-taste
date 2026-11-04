# Rollout

Read at stages 5, 6 and 8. Every famous redesign failure was a forced cutover that removed or
moved something people relied on, with no cheap way back.

| Case | What went wrong | Cost |
| --- | --- | --- |
| Digg v4 (2010) | Removed the bury button, pushed publisher content | Traffic −34% UK, −26% US |
| Snapchat (2018) | Forced, rushed, shipped over internal warnings | 1.2M-signature petition; DAU 191M → 188M |
| Skype (2017) | Stories-style feed made calling harder | Rolled back in 2018 |
| Sonos app (2024) | Replaced before reaching feature parity; broke screen readers | $20–30M to fix; CEO left |
| Twitter (2021) | High-contrast buttons, new font | Eye-strain complaints; toned down in ~2 days |

Whatever was removed (Digg's bury, Sonos features, Skype calling) had to come back.

## In code: reversible slices

1. **Zero-diff first.** Introduce tokens mapped to the *current* values. `shoot` against the before
   shows no visible change. Commit.
2. **Then change values,** in separate commits: defects (function, accessibility) → colour and
   inks → type scale → spacing and density → states → components and sections only where they
   can't be saved → motion last.
3. **Mechanical and manual edits in separate commits.** Codemods only suggest; review them.
4. **Lock it in.** Lint against hard-coded values and deprecated tokens; remove fallbacks once done.
5. Stop when the chosen findings are fixed. Don't keep going.

## Contracts that never change silently

Routes and URLs, link targets, navigation labels, form field names and order, `data-testid`
values, analytics hooks, ARIA roles and accessible names, keyboard shortcuts, legal copy.
`parity.mjs` records them before and checks them after. Anything removed, renamed or made harder
to reach goes on a sign-off list for the user. Never remove a feature to make a design cleaner
without asking.

## Size the rollout to the change

| Change | Rollout |
| --- | --- |
| Fix, polish, token-only restyle | Ship directly |
| Realign | Behind a preview flag or a preview deploy first |
| Structural redesign | Opt-in beta → default with opt-out → mandatory, with dates announced and a holdout (GitHub's navigation and Gmail took about six months each) |

## Reading the first weeks

Novelty inflates early numbers; primacy (relearning) depresses them. Judge on behaviour after
weeks, not the first days. Change aversion is real but short, and it "isn't an excuse for
worsening user experience" (Google): backlash that persists usually means people lost expertise or
the new design is worse. Write what moved and where it went, in a note users can read.
