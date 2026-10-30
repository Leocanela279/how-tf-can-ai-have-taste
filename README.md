# how-tf-can-ai-have-taste

How tf can AI have taste making UIs? I've tried everything and I still get AI slop UI. This repo is
dedicated to finding out how tf AI can have taste.

## The short answer so far

The model *has* taste: the sharpened average of the web. That average is what slop is. Banning
ingredients (no Inter, no gradients, no cards) only moves the model to the next average. What
separates good interfaces from slop is **calibration**, meaning the numbers and the relationships
between them. linear.app ships Inter, pills, gradients and borders and still looks expensive,
because its tone steps, ink staircase, weights and spacing are precise. So the fix is to move real
information into the context and then look at the result:

- the subject's own material
- reference sites measured into numbers
- a written token plan before any code

Full write-up: [`reports/Giving AI UI design taste.md`](<reports/Giving AI UI design taste.md>).

## What's here

| Path | What |
| --- | --- |
| `research/00-questions.md` | The questions this repo answers, and where |
| `research/01-skill-audit.md` | Why the 14 installed design skills collide and contradict |
| `reports/` | The research report, with every claim tagged by its evidence grade |
| `research_notes/` | The raw research notes behind the report, with sources |
| `skills/taste/` | **The skill.** One lean art-direction skill with probe, shoot and lint scripts |
| `references/candidates.md` | Shortlist of sites to measure into the skill's library (needs picks) |
| `experiments/prompts.md` | Blind A/B/C briefs (B1–B4) and the replication test (R1) |
| `portfolio/` | The owner's portfolio (the B4 winner, dark, with the mobile fixes), ready for Cloudflare Pages |
| `.claude-plugin/` | Plugin and marketplace manifests, so the skill installs with `/plugin` |

## Install the skill

**Claude Code, as a plugin (recommended).** Inside Claude Code:

```
/plugin marketplace add Leocanela279/how-tf-can-ai-have-taste
/plugin install taste@how-tf-can-ai-have-taste
```

On Claude Code 2.1.275 or later, one line does both:
`/plugin install taste --marketplace Leocanela279/how-tf-can-ai-have-taste`.
Updates arrive with `/plugin marketplace update`.

**Claude Code, as a plain skill.** Copy or link the folder into your skills directory, for every
project (`~/.claude/skills/`) or one project (`.claude/skills/` in that repo):

```bash
git clone https://github.com/Leocanela279/how-tf-can-ai-have-taste
ln -s "$PWD/how-tf-can-ai-have-taste/skills/taste" ~/.claude/skills/taste
```

**Claude apps (claude.ai, desktop).** Zip the `skills/taste` folder and upload it under
Settings → Capabilities → Skills. The written rules and library work there. The probe, shoot and lint
scripts need a machine with Node and Chrome, so the measured checks only run in Claude Code.

It triggers on its own when you ask for a page, screen or redesign, or call it directly
(`/taste`, or `/taste:taste` when installed as a plugin).

For a clean test, temporarily move the other art-direction skills out of `~/.claude/skills`
(frontend-design, design-taste-frontend, ui-ux-pro-max, design, ui-styling), and disable the
taste-skill, ui-ux-pro-max, ux-ui-agent-skills and superdesign plugins. Otherwise they compete for
the same request. Keep `animate` and `review-animations` for motion polish.

The scripts need Node 22+ and Chrome, Chromium, Edge or Brave:

```bash
node skills/taste/scripts/probe.mjs https://example.com --check   # measure a page, flag budget problems
node skills/taste/scripts/shoot.mjs index.html --ref https://linear.app --out shots   # critique screenshots
node skills/taste/scripts/lint.mjs src                             # static defects and tells
```

## Status

- [x] Skill audit
- [x] Research report
- [x] Taste skill draft, with scripts tested on a deliberately sloppy page and on linear.app
- [x] Blind test B4 (owner's portfolio): the no-skill baseline won. Lessons folded into the skill:
      the user's taste first, typical structure with novelty on the surface, richness, and tells as
      warnings only (`experiments/results.md`)
- [x] Research rounds 2 and 3: what makes UI captivating, and fast and beautiful UI. They became
      `references/defaults.md`, `references/performance.md`, and a cost and reduced-motion pass in
      `probe.mjs --check`
- [x] Research round 4: mobile first, attention, density, eye comfort and reach (`reports/Mobile first UI taste.md`)
      Folded into the skill: phone checks in `probe.mjs --check --width 390`, phone rules in `SKILL.md`,
      and a phone pass in the critic brief
- [x] Research round 5: reusable components (`reports/Reusable UI components.md`). Folded into the skill:
      `references/components.md` (native first, then one primitive family, then your own component) and
      lint rules for hand-rolled widget roles, positive tabindex, untouched kit themes and stale libraries
- [ ] Reference library: 8 of the owner's 9 picks measured with notes; x.ai blocks headless browsers
- [x] Portfolio: mobile fixes applied (16px running text on phones, 44px touch targets, build-time
      CSS, self-hosted fonts, no header blur), packaged in `portfolio/` for Cloudflare Pages
- [x] Installable as a Claude Code plugin
- [ ] Experiments B1–B3 and R1, judged blind, plus a B4 re-run with the current skill
