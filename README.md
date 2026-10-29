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

## Try the skill

Link it into your skills folder:

```bash
ln -s "$PWD/skills/taste" ~/.claude/skills/taste
```

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
- [ ] Reference library: 8 of the owner's 9 picks measured with notes; x.ai blocks headless browsers
- [ ] Experiments B1–B4 and R1, judged blind
