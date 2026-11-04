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
| `skills/taste-redesign/` | **The redesign skill.** For UIs that already exist: classify, record the before, diagnose, change the cheapest layer, prove it against the before. Shares taste's scripts and library, adds inventory, parity and compare |
| `references/candidates.md` | Shortlist of sites to measure into the skill's library (needs picks) |
| `experiments/prompts.md` | Blind A/B/C briefs (B1–B4) and the replication test (R1) |
| `portfolio/` | The owner's live portfolio (leo-dev.es): the B5 minimal design, deployed as a Cloudflare Worker |
| `.claude-plugin/` | Plugin and marketplace manifests, so the skills install with `/plugin` |
| `install.mjs`, `package.json` | The one-command installer for any agent (`npx github:Leocanela279/how-tf-can-ai-have-taste`) |

## Install the skills

Two skills that work in any agent that reads `SKILL.md` folders (the open Agent Skills format):
`taste` for new pages and screens, and `taste-redesign` for UIs that already exist. Always install
both; `taste-redesign` uses `taste`'s scripts and library.

**Any agent, one command** (Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot, OpenCode,
Windsurf, Cline, Amp, Kiro, Roo, Goose, Warp…). Run it in your project:

```bash
npx github:Leocanela279/how-tf-can-ai-have-taste              # this project, detected agents
npx github:Leocanela279/how-tf-can-ai-have-taste -g           # your user folder, all projects
npx github:Leocanela279/how-tf-can-ai-have-taste --agent codex,cursor
npx github:Leocanela279/how-tf-can-ai-have-taste --list       # agents and their folders
npx github:Leocanela279/how-tf-can-ai-have-taste --uninstall
```

It has no dependencies and copies the two skill folders into each agent's skills folder. Without
`--agent`, it installs for Claude Code (`.claude/skills/`) and the shared `.agents/skills/` folder
that Codex, Cursor, Gemini CLI, Copilot, OpenCode, Cline, Amp and Warp read, plus any other agent
whose config folder it finds in your home directory.

**With the skills.sh installer.** The repo uses the standard `skills/` layout, so this also works
(pick both skills when asked):

```bash
npx skills add Leocanela279/how-tf-can-ai-have-taste
```

**Claude Code, as a plugin.** Inside Claude Code:

```
/plugin marketplace add Leocanela279/how-tf-can-ai-have-taste
/plugin install taste@how-tf-can-ai-have-taste
```

On Claude Code 2.1.275 or later, one line does both:
`/plugin install taste --marketplace Leocanela279/how-tf-can-ai-have-taste`.
Updates arrive with `/plugin marketplace update`.

**By hand.** Copy `skills/taste` and `skills/taste-redesign` into your agent's skills folder:

| Agent | In a project | For your user |
| --- | --- | --- |
| Claude Code | `.claude/skills/` | `~/.claude/skills/` |
| Codex, Cline, Warp | `.agents/skills/` | `~/.agents/skills/` |
| Cursor | `.agents/skills/` | `~/.cursor/skills/` |
| Gemini CLI | `.agents/skills/` | `~/.gemini/skills/` |
| GitHub Copilot | `.agents/skills/` | `~/.copilot/skills/` |
| OpenCode | `.agents/skills/` | `~/.config/opencode/skills/` |
| Windsurf | `.windsurf/skills/` | `~/.codeium/windsurf/skills/` |
| Kiro CLI | `.kiro/skills/` | `~/.kiro/skills/` |

(Paths from the skills.sh agent table, November 2026.)

**Claude apps (claude.ai, desktop).** Zip each of the two folders and upload both under
Settings → Capabilities → Skills. The written rules and library work there. The probe, shoot,
lint, inventory, parity and compare scripts need a machine with Node 22+ and a Chromium-based
browser, so the measured checks run only in coding agents.

The agent picks the right skill on its own: `taste` when you ask for a new page or screen,
`taste-redesign` when you ask to redesign, restyle, polish or review a UI that already exists. In
Claude Code you can also call them as `/taste` and `/taste-redesign` (`/taste:taste` and
`/taste:taste-redesign` when installed as a plugin). Agents without subagents run the critic as a
separate pass, as the skill describes.

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
- [x] B5: the owner's minimal portfolio, built with the skill end to end, three critique rounds
- [x] Why minimal works (Q14): `references/restraint.md`, with Emil's font and fallback measured
- [x] Skill kept as one entry point: a fast path for small edits, phone rules moved to `references/mobile.md`
- [x] Research round: redesigning existing UIs (`reports/Redesigning existing project UIs.md`), and the `taste-redesign` skill built from it
- [x] One-command install for any agent (`npx github:…`), plus skills.sh and the Claude Code plugin
- [x] Blind test B6 for `taste-redesign`: the owner picked its restyle, weakly, over taste and no skill (`experiments/results.md`)
- [ ] B7: taste-redesign on a page with real problems (an AI-generated landing page) and on an app screen
- [ ] Experiments B1–B3 and R1, judged blind, plus a B4 re-run with the current skill
