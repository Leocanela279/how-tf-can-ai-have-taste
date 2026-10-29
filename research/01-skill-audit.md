# 01 — Audit of the design skills installed on this machine

Date: 2026-10-29. Sources: `~/.claude/skills/*` and the desktop app's plugin cache
(`~/Library/Application Support/Claude/local-agent-mode-sessions/.../rpm/*`).

## TL;DR

1. **Fourteen skills compete for the same request.** Ask for "a landing page" and at least these
   descriptions match it: `frontend-design` (3 copies), `design-taste-frontend` / `taste-skill`
   (2 copies), `ui-ux-pro-max` (2 copies), `ux-ui-agent-skills:design-screen`, `superdesign`,
   `design`, `ui-styling`, `emil-design-eng`, `apple-design` and `web-design-guidelines`. The model
   loads one, sometimes two. Which one it picks is close to random from your side, and that is the
   "it ignores the skill" experience.
2. **They contradict each other on the exact things that decide the look.** Blending them produces
   "different but ugly". The conflict table is below.
3. **The most data-driven skill measured itself losing to no skill at all.** In taste-skill's own
   blind A/B tests, the no-skill baseline had the higher average score in 4 of 5 rounds and tied in
   the fifth (for example 6.6 vs 7.7 in round 1). The skill only won most of a round's briefs (2 of
   3) in round 5, on briefs it had already seen
   (`design-taste-frontend/references/research.md` §11). Model judges, one per brief, but still.
4. **The keyword-to-style lookup skill produces the slop it is supposed to prevent.**
   `ui-ux-pro-max --design-system "developer tool API monitoring minimal"` returned Tailwind's
   default `slate-900/800/400/700` plus `green-500` and `red-500` hex values, JetBrains Mono, a "dark
   + green accent" scheme, and routed the brief to an *FAQ/Documentation* page pattern. That is
   cluster #2 in frontend-design's own list of AI tells.
5. **Emil Kowalski's skill is not an art-direction skill.** About 90% of it covers motion, easing,
   springs, gestures and component feel. It makes a design *feel* good once the design exists. It
   says almost nothing about composition, type, colour or layout, which is exactly where generic
   output comes from. It isn't failing you; it was never aimed at your problem.

## Inventory

| Skill | Where | SKILL.md | Total | What it actually is |
| --- | --- | --- | --- | --- |
| frontend-design | `~/.claude/skills`, plugin `frontend-design:`, `claude-plugins-official` | 71 lines | 24K | Anthropic's art-direction prompt: ground the design in the subject, plan tokens, review the plan against the "AI cluster" list, spend boldness in one place, screenshot and critique. Short and principled. |
| design-taste-frontend (tasteskill v2) | `~/.claude/skills`, plugin `taste-skill:` | 529 lines | 2.4M | A 10-step pipeline. A script *deals* a direction from a library distilled from 247 gallery sites, an inspector measures the page in headless Chrome or Brave, then a look-and-fix loop runs. Strict ban list. The richest skill installed. |
| ui-ux-pro-max | `~/.claude/skills`, plugin | 214 lines | 3.7M | A CSV search engine: 89 named styles (glassmorphism, claymorphism, aurora, Y2K, cyberpunk, bento…), 192 palettes, 74 font pairings, UX checklists. Matches keywords to a style. |
| ux-ui-agent-skills (24 skills) | plugin | 25–166 each | large kit | A DTCG token pipeline plus gates (contrast, states, responsive, emoji, native-select lint). `apply-aesthetic` maps to 138 named brand systems (apple, linear, stripe…). It is honest that "gates never prove taste". |
| superdesign | plugin | 157 lines | — | Drives an external canvas service over its CLI. A different product, not a taste method. |
| emil-design-eng | `~/.claude/skills` | 674 lines | 28K | Motion and interaction polish: easing, durations, springs, `@starting-style`, clip-path, gestures, Sonner lessons. |
| apple-design | `~/.claude/skills` | 290 lines | 24K | Apple HIG feel for the web: fluid motion, materials, typography details. |
| design, ui-styling, design-system, brand, banner-design | `~/.claude/skills` | 100–330 each | 6M+ combined | General kits: shadcn/Tailwind usage, logo/CIP generation, token architecture. ui-styling alone is 5.8 MB. |

## Contradictions that decide the look

| Axis | Says A | Says B |
| --- | --- | --- |
| Hairline borders | taste-skill: **banned** ("no 1px outlined boxes") | ux-ui `design-doctrine`: "use a **full hairline border** on all sides" |
| Off-black and warm white | `design-doctrine`: "`#000` on `#fff` is a defect, use off-black on warm-white" | frontend-design: warm cream and tinted near-black (`#0B0B0B`, `#111`) are **AI tells** |
| Entrance motion | taste-skill: **required**, a staggered rise on every section, at least 8 moving elements or the page fails | frontend-design: "fade-and-slide-up entrances on each section … read as AI-generated" |
| Hover | ui-ux-pro-max: hover transitions plus `cursor-pointer` on everything | frontend-design: "hover transitions on every card are the generic default" |
| Monospace | ui-ux-pro-max: JetBrains Mono for dev tools | taste-skill: banned outside code. frontend-design: a tell |
| Glass and blur | ui-ux-pro-max: Glassmorphism, Liquid Glass and Aurora are first-class styles | taste-skill: "No glass" |
| Where the look comes from | ui-ux-pro-max: keyword → style CSV. ux-ui: copy a named brand (stripe, linear). taste-skill: a random deal from 20 directions | frontend-design: from the *subject's* own world. taste-skill step 4 says the same |
| Restraint vs richness | frontend-design: "remove one accessory", spend boldness in one place | taste-skill: "do not trade substance for restraint", empty pages lose |

Each one is defensible on its own. Loaded together, or one skill this session and another the
next, they average out to mush or swing between looks.

## Friction that makes skills silently degrade

- **ui-ux-pro-max** documents its script as `${CLAUDE_PLUGIN_ROOT}/.claude/skills/...`. In the
  `~/.claude/skills` copy that variable is empty, so the documented path doesn't exist and the
  model has to improvise. When it fails, the skill says to fall back to "built-in defaults".
- **ux-ui-agent-skills** starts every skill with a kit check (`KIT_OK` here, fine) and needs
  Playwright Chrome for its render gates. With no browser, the gates print `SKIPPED` and exit 0.
- **taste-skill** needs Node 22+ (you have 24) and Chrome, Edge, Chromium or Brave (you have Brave,
  so it works). It is a 10-step run with about 10k tokens of SKILL.md before any references. In
  long sessions models drop late steps (8 "Look" and 9 "Move" are the first to go), and the skill
  itself warns about this.
- **Context cost.** Every skill *description* is always in context. The bodies load on use, so
  taste-skill alone is about 10k tokens plus references. Two design skills loaded together is
  about 20k tokens of partly conflicting instructions sitting on top of the actual task.

## What is genuinely good and worth keeping

- **frontend-design.** "Ground the design in the subject", the explicit list of AI clusters, the
  two-pass plan → review → build, and "spend your boldness in one place". It is short enough to
  be followed fully.
- **taste-skill's study** (`references/research.md`). Real measurements of what separates the
  gallery sites a panel scored highest from the ones it scored lowest (the panel was models, not
  people, so treat it as signal, not proof):
  - Icon-topped feature cards appear on 1% of top sites vs 28% of weak ones.
  - Tiny tracked caps: 16% vs 57%.
  - Gradients: 22% vs 52%.
  - Centred statement with a screenshot below: 7% vs 24%.
  - Largest type: median 8.4vw on top sites vs 5.0vw on weak ones.

  Plus the core lesson of its own failed rounds: **removing ornament without adding substance makes
  the page worse**.
- **taste-skill's "idea sentence" and competitor test.** "On this page, [something only this
  subject has] becomes [the device]". The same sentence with a competitor's name in it must stop
  working.
- **ux-ui's verification honesty.** "Never claim a number you didn't measure", "gates never prove
  taste".
- **Emil, for motion only.** Durations, easing, interruptibility and origin-aware popovers. Load it
  when you polish interaction, not when you design a page.

## Implications for this repo

1. **One voice.** The working setup should be a single art-direction skill, plus Emil for motion
   when needed. Not a stack.
2. **Positive anchors over ban lists.** Taste-skill's own data shows bans alone lose to baseline.
3. **The look comes from the subject and from real references, not from a style catalogue.**
   Catalogues return the category average (finding 4).
4. **Looking is mandatory and must be cheap.** The model has to see screenshots next to a
   reference, in few enough steps that it actually does it.

Hypotheses to test in phase 4 are tracked in `02-why-ai-makes-slop.md`.
