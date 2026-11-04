# Practitioners and AI tools on redesigning existing UI

Research date: 2026-11-04.

**Access note.** In this session the network let through GitHub (via `git clone`), claude.com, and web search. It did not resolve emilkowal.ski, rogerwong.me, dev.to or web.archive.org. Emil's essays ("Agents with Taste", "Developing Taste", "You Don't Need Animations", "7 Practical Animation Tips") could not be read directly. Wherever these notes quote Emil, the quote comes from one of three places:
- his `emilkowalski/skills` repository, read in full at commit `c8a7962` (2026-11-04). Emil says on X that it is his blog articles turned into skills.
- search-result snippets, marked **[snippet]**.
- earlier repo notes, which are cross-referenced.

rauno.me and refactoringui.com were not fetched. An earlier session in this repo also found rauno.me unreachable. To read Emil's essays verbatim, emilkowal.ski has to be allowed in the session's network settings.

The skill repositories were cloned and read directly:
- `emilkowalski/skills` @ c8a7962
- `pbakaus/impeccable` @ 5af4319 (v4.8.0)
- `Leonxlnx/taste-skill` @ 12af471
- `Leonxlnx/taste-skill-classics` @ 5e08c93
- `jakubkrehel/make-interfaces-feel-better` @ 35545ea
- `vercel-labs/web-interface-guidelines` @ 434b7f9
- `raunofreiberg/interfaces` @ 81f523a

The installed copies of these were also read: Anthropic `frontend-design`, `ux-ui-agent-skills` (plugin87), `ui-ux-pro-max` (nextlevelbuilder) and `superdesign` (superdesigndev).

Evidence tags:
- **[Practitioner opinion]**: one expert's craft rule.
- **[Tool prescription]**: what a skill tells an agent to do, untested unless noted.
- **[Tool's own test]**: the authors report an internal blind test or eval. The data is unpublished.
- **[Snippet]**: from search results only; the source was not read.
- **[Secondary]**: a summary or review written by someone else.

---

## 1. Emil Kowalski: reviewing and improving existing UI, and giving an AI taste

### Takeaway
Emil's position: an agent gets taste by being handed the logical reasons behind each decision, written as precise rules with exact values. He packages improvement work as separate, single-purpose skills that run in phases:
- audit, then plan (read-only)
- review (flagging is the default)
- remove (subtraction only)
- prototype (several divergent variants, the user picks)
- break (worst-case data)

Each phase ends by stopping for the user. "Already right" counts as a valid result.

### Cited Findings
**Transferring taste to an agent**
- [Snippet] The essay "Agents with Taste" (emilkowal.ski/ui/agents-with-taste, reportedly published March 2026) argues that taste has logical reasons, so it can be written down for agents. Secondary summaries paraphrase it as "AI agents can write code, but they don't have 'good taste.' However, good taste usually has logical reasons" and "Almost every 'taste' decision has a logical reason if you look close enough". Per a review, the essay shows `scale(0)` and `scale(0.95)` side by side and explains why the second feels better. — [Agents with Taste](https://emilkowal.ski/ui/agents-with-taste) (not accessible); [Roger Wong review](https://rogerwong.me/2026/05/agents-taste-skill-files) (snippet only); [note.com deep dive](https://note.com/ai_driven/n/n2f8718394117?hl=en) (snippet only)
- [Snippet] Search summaries describe his method as "creating a skill file for each aspect of the interface and describing the rules so agents can follow them". — [search summary of emilkowal.ski](https://emilkowal.ski/ui/agents-with-taste)
- [Practitioner opinion, verbatim] Repo README: "Agents don't have great taste. I have seen plenty of times that agents don't pick the right ingredients for an animation. An `ease-in` easing for an enter animation when it's supposed to be `ease-out` ... Or they choose a solid border instead of a semi-transparent shadow for your UIs. All these small things compound and make your interface either amazing, or just... not that great." — [emilkowalski/skills README](https://github.com/emilkowalski/skills/blob/main/README.md)
- [Practitioner opinion, verbatim] "As explained in Agents with Taste, these skills list all the little mistakes agents can potentially make and explain how to fix them." Also: "All the skills here are a side-effect of domain-expertise. AI doesn't replace such expertise, it amplifies what you can get out of it." — [README](https://github.com/emilkowalski/skills/blob/main/README.md)
- [Practitioner opinion] Emil on X: "Turned my blog articles into one big design engineering skill that you can use with coding agents like Claude Code or Codex." — [X post](https://x.com/emilkowalski/status/2033543717890465985)

**Taste as a trained skill** (from `emil-design-eng`, which encodes his blog. "Developing Taste" itself could not be read.)
- "Good taste is not personal preference. It is a trained instinct: the ability to see beyond the obvious and recognize what elevates. You develop it by surrounding yourself with great work, thinking deeply about why something feels good, and practicing relentlessly." — [emil-design-eng SKILL.md](https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md)
- "Most details users never consciously notice. That is the point." And: "in a world where everyone's software is good enough, taste is the differentiator." — [emil-design-eng](https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md)

**Reviewing existing UI: a Before / After / Why table**
- [Tool prescription, verbatim] "When reviewing UI code, you MUST use a markdown table with Before/After columns ... A single markdown table with | Before | After | Why | columns, one row per issue found." — [emil-design-eng](https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md)
- [Practitioner opinion] "Review your work the next day. Review animations with fresh eyes. You notice imperfections the next day that you missed during development. Play animations in slow motion or frame by frame." — [emil-design-eng, Sonner principles](https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md)
- [Practitioner opinion] Cohesion: "Sonner's animation feels satisfying partly because the whole experience is cohesive ... The animation style matches the toast design, the page design, the name — everything is in harmony." — [emil-design-eng](https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md)

**`improve-animations`: his clearest "improve an existing codebase" workflow** (read-only, audit, then plan)
- Hard rules, verbatim:
  - "Never modify source code. The only files you create or edit live under `plans/`."
  - "Plans must be fully self-contained. The executor has zero context from this conversation and zero taste."
  - "Don't re-litigate settled decisions. If a design doc or comment documents a deliberate motion tradeoff, respect it — note it, don't report it."
  
  — [improve-animations SKILL.md](https://github.com/emilkowalski/skills/blob/main/skills/improve-animations/SKILL.md)
- Phase 1, recon "(always first)":
  - stack
  - where motion lives
  - **conventions**: "existing easing tokens, duration scales, spring configs — plans must extend these, not invent parallel ones"
  - **personality**: "playful consumer app or a crisp dashboard?"
  - a **frequency map**: elements used 100+/day vs occasionally vs rarely, which "drives severity"
  
  — [improve-animations](https://github.com/emilkowalski/skills/blob/main/skills/improve-animations/SKILL.md)
- Phase 3, vet, prioritise and confirm:
  - "Re-read the cited code for every finding yourself. Reject anything that is by-design, mis-attributed, duplicated, or exempt ... Never present a finding you haven't confirmed at its file:line."
  - Findings are ordered "by leverage (impact ÷ effort)".
  - Missed opportunities are listed separately "since they're additive rather than corrective".
  - "Then **stop and wait for the user to select** which findings become plans. If running non-interactively, default to the top 3–5 by leverage."
  
  — [improve-animations](https://github.com/emilkowalski/skills/blob/main/skills/improve-animations/SKILL.md)
- Tone: "A short list of high-confidence, high-leverage plans beats a long padded one — 'the motion here is already right' is a valid audit result. Flag uncertainty honestly: when feel can't be judged from code alone ... put a feel-check step in the plan instead of guessing." — [improve-animations](https://github.com/emilkowalski/skills/blob/main/skills/improve-animations/SKILL.md)
- Effort tiers:
  - `quick`: ~5 findings, HIGH only
  - `standard`: full table
  - `deep`: whole repo plus LOW polish
  
  — [improve-animations](https://github.com/emilkowalski/skills/blob/main/skills/improve-animations/SKILL.md)
- The plan template's "Boundaries" section, verbatim:
  - "Do NOT change markup/structure — motion properties only"
  - "Do NOT add new dependencies"
  - "If a step doesn't match the code you find (drift since the commit stamp), STOP and report instead of improvising."
  
  Every plan also has a mandatory "Feel check": "Motion can be mechanically correct and still feel wrong." — [PLAN-TEMPLATE.md](https://github.com/emilkowalski/skills/blob/main/skills/improve-animations/PLAN-TEMPLATE.md)

**`remove-animations`: improvement by subtraction**
- "Agents add motion by default — fade-in on scroll, hover-scale on cards, animated command palettes — and each one is defensible alone while together they make the product feel slow. So the burden of proof is reversed. An animation stays only if it passes the gate. 'It's already there' and 'it looks nice' are not defenses." — [remove-animations SKILL.md](https://github.com/emilkowalski/skills/blob/main/skills/remove-animations/SKILL.md)
- "Deleting everything is also wrong. Motion that bridges a jarring change ... earns its place." Hard rules:
  - "Only subtract."
  - "Check what depends on the animation before deleting it."
  - "Ask before removing a dependency."
  - "Respect documented decisions."
  
  — [remove-animations](https://github.com/emilkowalski/skills/blob/main/skills/remove-animations/SKILL.md)
- "Reduce means a smaller version of the same motion, never a different animation." — [remove-animations](https://github.com/emilkowalski/skills/blob/main/skills/remove-animations/SKILL.md)

**`review-animations`**
- "Default to flagging. Approval is earned, not assumed." The skill also says "When unsure whether motion feels right, the strongest move is often to delete it." — [review-animations SKILL.md](https://github.com/emilkowalski/skills/blob/main/skills/review-animations/SKILL.md)

**`prototype`: show options instead of committing to one redesign**
- "Never touch production code during exploration."
- "Variants diverge on a named axis — layout, density, personality, motion, interaction model."
- "Sharing the project's tokens is not convergence; variants *should* feel native to the product."
- The default is 3 variants and at most 5. "If two proposed directions would differ only in accent color or copy, they are one direction."
- Scope: "One thing per run. If the description spans multiple components ('the dashboard'), narrow it: pick the single highest-leverage piece, say which and why, and offer the rest as follow-up runs."
- Viewing: render "one variant at a time, full size, in realistic surrounding context ... Side-by-side thumbnails distort spacing and scale."
- Choice: "present the set and **stop — the choice belongs to the user**." Each variant is presented with "When it's the right choice" and "Its cost". "Never pre-pick a favorite."

  — [prototype SKILL.md](https://github.com/emilkowalski/skills/blob/main/skills/prototype/SKILL.md)

**`break-ui`**
- Its premise: "Demo data is chosen, usually without anyone noticing, to make the design look good."
- Its rules: "Change the data, not the component" and "Report before fixing. Some breaks are design decisions (truncate or wrap?) ... List them all, propose a fix for each, then stop. Fix only when asked."

  — [break-ui SKILL.md](https://github.com/emilkowalski/skills/blob/main/skills/break-ui/SKILL.md)

**Other**
- His `ui-cheatsheet.md` lists one-line polish fixes for existing UI. Examples: "Large headings look off → Tighter tracking like `-0.02em`"; "Body text looks awkward → `max-width: 65ch`"; "Count reads '1 members' → `Intl.PluralRules`". — [ui-cheatsheet.md](https://github.com/emilkowalski/skills/blob/main/ui-cheatsheet.md)
- Every Emil skill opens with "When this skill is first invoked without a specific question, respond only with: 'I'm ready to …'. Do not provide any other information until the user asks a question." — [e.g. improve-animations](https://github.com/emilkowalski/skills/blob/main/skills/improve-animations/SKILL.md)

### Inferences
- Emil's skills cover polish of motion and detail, not visual redesign (palette, type, layout). He has no "redesign the page" skill. His general improvement model is still the most transferable part:
  1. Recon the existing conventions.
  2. Audit by category.
  3. Personally verify each finding at file:line.
  4. Rank by leverage.
  5. Stop and let the user choose.
  6. Execute in tight scope with explicit boundaries.
  7. Feel-check.
- He treats "improve" as three distinct jobs: fix what is there (`improve`/`review`), subtract what should not be there (`remove`), and add what is missing (`find-animation-opportunities`). A redesign skill could split its findings into these three buckets, corrective, subtractive and additive, and report them separately.
- His `prototype` skill implies the right response to a broad "redesign this" may be several divergent variants of one high-leverage piece, behind a picker. That fits the taste skill's existing "user is the judge" belief.

### Gaps
- The full text of "Agents with Taste", "Developing Taste", "You Don't Need Animations" and "7 Practical Animation Tips" could not be read (emilkowal.ski did not resolve). I could not confirm whether these essays say anything specific about redesigning an existing interface, as opposed to building one. Earlier notes in this repo (`research_notes/What makes UI captivating/animation_and_transitions.md`) quote "You Don't Need Animations" from an earlier fetch.
- I found no Emil writing on visual redesign (layout, colour, type) of an existing product.

---

## 2. Other practitioners on polishing existing UI

### Takeaway
The polish canon works detail-level and system-preserving:
- **Refactoring UI:** improve hierarchy by de-emphasising competitors and start spacing generous.
- **Rauno:** interaction details "fluidly respond to human intent".
- **Jakub Krehel:** concentric radii, optical alignment, shadows over borders, interruptibility.
- **Vercel:** file:line compliance review.

Jakub's skill adds two guardrails a redesign skill should copy: express every fix in the project's existing styling system, and list what was "considered but rejected".

### Cited Findings
**Refactoring UI (Wathan & Schoger)**
- [Secondary] The book's advice includes:
  - start with more white space than seems needed, then remove it
  - when a primary element does not stand out, de-emphasise the competing elements instead of making the primary louder
  - de-emphasise labels with smaller size, lower contrast and lighter weight
  
  Book text not accessed; wording is paraphrase. — [Liferay "Diary of a first-year designer: Refactoring UI"](https://liferay.design/articles/2021/diary-of-a-first-year-designer-refactoring-ui/); [DEV book review](https://dev.to/updivision/book-review-refactoring-ui-by-adam-wathan-steve-schoger-2f7m); [Smithery refactoring-ui skill summary](https://smithery.ai/skills/wondelai/refactoring-ui)

**Rauno Freiberg**
- [Snippet] "Invisible Details of Interaction Design" defines interaction design as "an artform to make experiences that fluidly respond to human intent". The original was not fetched. — [rauno.me/craft/interaction-design](https://rauno.me/craft/interaction-design) via [mirror snippet](https://spencers-cafe.pages.dev/Readwise/media/articles/Invisible-Details-of-Interaction-Design)
- [Practitioner opinion, verbatim from repo] His "Web Interface Guidelines" describe themselves as "a non-exhaustive list of details that make a good (web) interface ... Some of these may be subjective, but most apply to all websites." Examples:
  - "Font weight should not change on hover or selected state to prevent layout shift"
  - "Interactive elements in a vertical or horizontal list should have no dead areas between each element, instead, increase their `padding`"
  - "Decorative elements (glows, gradients) should disable `pointer-events`"
  
  — [raunofreiberg/interfaces README](https://github.com/raunofreiberg/interfaces/blob/main/README.md)

**Vercel Web Interface Guidelines** (the agent version)
- [Tool prescription] The review command: "Review these files for compliance ... Output concise but comprehensive—sacrifice grammar for brevity. High signal-to-noise." Output format: "Group by file. Use `file:line` format (VS Code clickable). Terse findings." — [vercel-labs/web-interface-guidelines command.md](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md)
- [Tool prescription] Focus-state rules include "Never `outline-none` / `outline: none` without focus replacement" and "Use `:focus-visible` over `:focus`". — [command.md](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md)

**Jakub Krehel: "Details that make interfaces feel better" (skill `make-interfaces-feel-better`)**
- [Tool prescription, verbatim] "Before suggesting or writing a fix, identify the project's existing styling system and express the change in that system: Tailwind in a Tailwind project, plain CSS in a CSS project ... Never introduce a second styling system just to apply a polish fix." — [SKILL.md](https://github.com/jakubkrehel/make-interfaces-feel-better/blob/main/skills/make-interfaces-feel-better/SKILL.md)
- [Practitioner opinion, verbatim] "Outer radius = inner radius + padding. Mismatched radii on nested elements is the most common thing that makes interfaces feel off." Also: "Shadows for Elevation, Borders for Structure" and "Optical Over Geometric Alignment". — [SKILL.md](https://github.com/jakubkrehel/make-interfaces-feel-better/blob/main/skills/make-interfaces-feel-better/SKILL.md)
- [Tool prescription, verbatim] "When reviewing, slow the interface down: replay motion at 10% speed ... and walk every state: hover, focus, active, loading, empty." — [SKILL.md](https://github.com/jakubkrehel/make-interfaces-feel-better/blob/main/skills/make-interfaces-feel-better/SKILL.md)
- [Tool prescription] The review format:
  - modes `quick` (cap 5, HIGH/MEDIUM only) and `full` (cap 15)
  - a coverage table: "Never imply an uninspected surface was reviewed."
  - findings as a Severity / Location / Before / After / Why table
  - "Consolidate a repeated systemic issue into one row"
  - "never pad the report to reach the cap"
  - a **"Considered but Rejected"** table, for example "Increase the shadow — Rejected because existing depth matches the shared surface token; changing one card would reduce consistency"
  - a verdict of Block / Needs changes / Approve, with unverified checks listed
  
  — [SKILL.md](https://github.com/jakubkrehel/make-interfaces-feel-better/blob/main/skills/make-interfaces-feel-better/SKILL.md)

**Paco Coursey**
- Not researched this session; no source was retrieved.

### Inferences
- The polish practitioners (Emil, Rauno, Jakub, Vercel) share three habits:
  - The change is expressed inside the incumbent system: same tokens, same styling method.
  - Findings are tied to file:line.
  - Each reviewer proves restraint, through the "considered but rejected" list, "already right" as a valid result, and "never pad".
- Refactoring UI's "de-emphasise the competitors" is a redesign move with low risk to brand: it changes relative weights without touching identity colours or type. This suits a "preserve" redesign.

### Gaps
- I could not access the text of Refactoring UI or refactoringui.com; the principles above are second-hand.
- The full text of Rauno's essay was not accessed.
- Paco Coursey's writing on polish was not found or read.

---

## 3. AI design skills and tools: redesign, critique and polish modes, and their failure modes

### Takeaway
The mature skills share one sequence:
1. Record the before state.
2. Classify the request (refine/preserve versus redesign/overhaul).
3. Audit and diagnose with evidence, and stop there if it is a review.
4. Get the user's priorities and scope.
5. Apply changes in a low-risk order (tokens, then type, then spacing/colour, then components/states, then motion).
6. Verify against the before state and smoke-test every flow that worked.

Impeccable states the key rule most sharply: "Refinement preserves; redesign replaces ... Never split the difference into polish on the discarded look."

The documented failure modes:
- a generic marketing look replacing the real page
- lost logos and brand identity
- hardcoded off-theme values and inconsistent pages
- rewritten copy, nav, routes and form names
- broken flows
- silent scope creep

### Cited Findings
**Impeccable (pbakaus, v4.8.0)**
- [Tool prescription, verbatim] "**Refinement preserves; redesign replaces.** Refinement keeps the incumbent identity, behavior, copy, and everything outside scope. Ask before replacing factual copy or adding claims. Redesign keeps product truth, content, function, native affordances, and constraints, but treats the old look as evidence and anti-reference ... Never split the difference into polish on the discarded look." — [impeccable SKILL.md](https://github.com/pbakaus/impeccable/blob/main/.devin/skills/impeccable/SKILL.md)
- [Tool prescription] "**The brief wins.** ... Redirecting a clear brief toward your taste is failure." Also: "Visual authority is evidence, not a filename. Missing DESIGN.md alone does not make a project greenfield." — [SKILL.md](https://github.com/pbakaus/impeccable/blob/main/.devin/skills/impeccable/SKILL.md)
- [Tool prescription] The three cases in new-work:
  - "Redesign: preserve product truth, content, function, constraints, and explicit brand commitments; replace the old visual world rather than polishing it. The old look is evidence of what the subject is, not authority over what it becomes."
  - "Established world: inherit it. A missing DESIGN.md does not erase a coherent identity already in code; document that identity instead of inventing a replacement."
  - "Incomplete brand: preserve confirmed assets and recognizable traits, then expand the system with the user."
  
  — [new-work.md](https://github.com/pbakaus/impeccable/blob/main/.devin/skills/impeccable/reference/new-work.md)
- [Tool prescription] `/polish`:
  - "Polish is refinement, never concealed redesign ... If the concept itself is wrong, say so and recommend redesign or `bolder` instead of smuggling in a replacement."
  - It classifies each drift as one of: missing token, one-off implementation, conceptual mismatch, or local defect. "Fix the cause at the narrowest correct level."
  - Triage order:
    1. broken tasks, data loss, inaccessible paths
    2. missing states
    3. flow, hierarchy, responsive and design-system drift
    4. visual and motion inconsistencies
    5. code cleanup
  - "Do not perfect one corner while leaving the rest below the same quality bar." Also: "Do not add animation merely to make polish visible."
  - "Finish with a source diff: remove accidental churn."
  
  — [polish.md](https://github.com/pbakaus/impeccable/blob/main/.devin/skills/impeccable/reference/polish.md)
- [Tool prescription] `/critique` runs two isolated subagents. Assessment A is a design review: specificity verdict, Nielsen scores, cognitive load. Assessment B is detector plus browser evidence. Their rules:
  - "Assessment A must finish before detector findings enter the parent synthesis context. Detector output is deterministic, but it still anchors judgment."
  - Design specificity is judged first: "could an unrelated product use it unchanged?"
  - The report has "What's Working (2–3)" and 3–5 "Priority Issues" tagged P0–P3.
  - It ends with 2–4 targeted questions: priority direction, design intent ("Is that the intended tone?"), scope ("Top 3 only / All issues / Critical only"), and constraints ("Should any sections stay as-is? This prevents the plan from touching things the user considers done").
  - "Every question must reference specific findings ... Offer concrete options."
  
  — [critique.md](https://github.com/pbakaus/impeccable/blob/main/.devin/skills/impeccable/reference/critique.md)
- [Tool prescription] `/distill`: "If any of these are unclear from the codebase, do not guess. Ask." Also: "Simplicity is not about removing features. It's about removing obstacles between users and their goals." `/quieter`: "What's working? (Don't throw away good ideas)" and "reduce visual intensity ... without losing personality or making the result generic." — [distill.md](https://github.com/pbakaus/impeccable/blob/main/.devin/skills/impeccable/reference/distill.md); [quieter.md](https://github.com/pbakaus/impeccable/blob/main/.devin/skills/impeccable/reference/quieter.md)
- [Tool prescription] Bare `/impeccable` presents a context-aware menu: "**Never auto-run a command; the recommendation is a suggestion the user confirms.**" It also says "Never repair drift as a side effect of a design task." — [routing.md](https://github.com/pbakaus/impeccable/blob/main/.devin/skills/impeccable/reference/routing.md); [SKILL.md](https://github.com/pbakaus/impeccable/blob/main/.devin/skills/impeccable/SKILL.md)
- Note: the command list in v4.8.0 has no `/normalize`. Consistency work sits in `extract` ("Pull reusable patterns ... Use when you have drift across the codebase") and in `polish`. — [command-metadata.json](https://github.com/pbakaus/impeccable/blob/main/.devin/skills/impeccable/scripts/command-metadata.json)

**taste-skill (Leonxlnx)**

*Current v2 (installed and on GitHub)*
- [Tool prescription] The "Redesign, restyle or review" special case:
  1. "**Record the before.** Run the project as it is and inspect it ... and lint its source. Read the code: the framework, the styling method ..., the components, and what must survive: routes, forms, data, behaviour, the brand's own assets."
  2. "**A review stops here.** ... name the three changes that would move the page most."
  3. "**Keep the stack, the content and what works.** No framework or styling-library migration ... A restyle keeps the layout and takes type, colour and components from a dealt direction (`--keep` whatever the brand fixes); a redesign deals a full direction and rebuilds the sections ... inside the existing components."
  4. "**Order of work, biggest effect for least risk:** type (faces and scale), colour (one ground, one ink, one accent), the frame (margins, section rhythm ...), states (hover, focus, loading, empty, error), then the stock components ... replaced."
  5. "**Prove it.** Inspect again ..., compare before and after at every width, click through every link, form and menu that worked before, and report the before and after measurements side by side."
  
  — [taste-skill SKILL.md](https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/SKILL.md)
- [Tool prescription] Existing brand: "Pass `--keep palette,type`, map the brand's colours and faces onto the roles, and take only composition from the draw ... if the brand itself requires a banned device (its logo sits in a gradient, its accent is violet), keep the brand asset, say so in the report." — [SKILL.md](https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/SKILL.md)
- [Tool's own test] "Taking the ornaments away is only half the job; a page that has lost its labels, rules and cards and gained nothing in their place reads as thin, and blind jurors rightly prefer a richer page with tells over an empty page without them." — [SKILL.md](https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/SKILL.md)
- The standalone skill `redesign-existing-projects` was folded into the main skill: "Part of `design-taste-frontend`, which audits an existing page in a real browser before changing anything". — [taste-skill README](https://github.com/Leonxlnx/taste-skill/blob/main/README.md)

*Classic v2-experimental (taste-skill-classics), "Redesign Protocol"*
- [Tool prescription] "Misclassifying the mode is the single biggest source of bad redesign output." Its modes:
  - **Greenfield**
  - **Redesign – Preserve**: "Audit first, extract brand tokens, evolve gradually."
  - **Redesign – Overhaul**: "Treat as greenfield for visuals; preserve content and IA."
  
  If unclear, ask once: "Should this redesign preserve the existing brand, or are we starting visually from scratch?" — [classics SKILL.md §11](https://github.com/Leonxlnx/taste-skill-classics/blob/main/skills/taste-skill-v2-experimental/SKILL.md)
- [Tool prescription] Its "Audit Before Touching" list:
  - brand tokens
  - IA
  - content blocks, "what's doing work, what's filler"
  - patterns to preserve: signature interactions, a recognisable hero, copy voice
  - patterns to retire
  - a dial reading of the existing site ("That's your starting point, not the baseline")
  - an SEO baseline: "SEO migration is the #1 redesign risk"
  
  — [classics §11.B](https://github.com/Leonxlnx/taste-skill-classics/blob/main/skills/taste-skill-v2-experimental/SKILL.md)
- [Tool prescription] Preservation rules:
  - "Do not change information architecture unless asked"
  - "A brand that is already purple stays purple"
  - "Preserve copy voice unless asked for a rewrite. Visual modernisation ≠ content rewrite"
  - "Respect existing analytics events"
  
  "What Never Changes Silently": URL slugs, primary nav labels, form field names or order, the logo or wordmark, and legal or consent copy. — [classics §11.C/F](https://github.com/Leonxlnx/taste-skill-classics/blob/main/skills/taste-skill-v2-experimental/SKILL.md)
- [Tool prescription] "Modernisation levers (priority order). Apply in order - stop when the brief is satisfied":
  1. typography refresh: "biggest visual lift per unit of risk"
  2. spacing and rhythm
  3. colour recalibration, keeping the brand accent
  4. motion
  5. hero and key-section recomposition
  6. full block replacement "only when the existing block is unsalvageable"
  
  The decision tree: "IA, content, and SEO sound → targeted evolution (Levers 1-4). ~70% of value at ~40% of risk." This figure is unsourced; treat it as the author's heuristic, not data. — [classics §11.D/E](https://github.com/Leonxlnx/taste-skill-classics/blob/main/skills/taste-skill-v2-experimental/SKILL.md)
- [Tool prescription] Dials: "redesign – preserve: match existing / +1 motion / match"; "redesign – overhaul: +2 / +2 / match". — [classics §1](https://github.com/Leonxlnx/taste-skill-classics/blob/main/skills/taste-skill-v2-experimental/SKILL.md)

**ux-ui-agent-skills (plugin87), `redesign`**
- [Tool prescription] The steps are "Audit-first redesign that preserves behavior": Scan → Diagnose → Direct → Apply → Verify.
  - **Apply:** "tokens first, then typography/spacing, then component states, then motion — without changing routes/data/markup semantics (except a11y fixes)".
  - **Verify:** "smoke-test every previously working flow".
  - **Guardrails:** "Never sacrifice a working feature for aesthetics. Never ship a brand color that fails contrast. Never remove existing accessibility affordances."
  - "Consolidate to ONE shared token theme and make **every page** consume it — a redesign that leaves different pages on different palettes has failed."
  
  — [redesign SKILL.md](https://github.com/plugin87/ux-ui-agent-skills) (path `.claude/skills/redesign/SKILL.md`); [workflows/redesign-audit.md](https://github.com/plugin87/ux-ui-agent-skills) (read from the installed copy)
- [Tool prescription] "Tokens first. Introduce/repair the token layer; replace hardcoded values with semantic tokens. This alone fixes most consistency slop." Also "A partial output is a broken output ... No `// ... rest unchanged`". — [redesign-audit.md](https://github.com/plugin87/ux-ui-agent-skills)
- [Tool prescription] Its Direct step picks "an archetype/system (`apply-aesthetic` skill) that fits the brand". This is a library-of-looks approach and risks swapping the brand for a named system (inference).

**Superdesign (superdesigndev)**
- [Tool prescription] For an existing rendered target: "reproduce first, then branch variations". Its routing note: "the wrong SOP either fabricates a ground truth that doesn't exist or skips one that does". — [SUPERDESIGN.md](https://github.com/superdesigndev/superdesign-skill) (installed copy, `references/SUPERDESIGN.md`)
- [Tool prescription, failure mode] "Read the real render branch ... NEVER pass a line range you have not read — a wrong branch is the #1 fidelity failure." — [SUPERDESIGN.md](https://github.com/superdesigndev/superdesign-skill)
- [Tool prescription, failure mode] "REPRODUCTION PROMPT = STRUCTURE, NOT AESTHETIC ... Do NOT fill a reproduction prompt with design-system adjectives ('premium', 'amber→orange gradient', 'elegant layered shadows', 'Playfair display') — with any context gap the model will render those adjectives as a generic marketing page instead of your real page. Aesthetic language belongs in Step 3b variations." — [SUPERDESIGN.md](https://github.com/superdesigndev/superdesign-skill)
- [Tool prescription, failure mode] "NEVER retry with a thinned/minimal context just to make the call succeed — a reproduction off thin context is invention, not reproduction." Also: "Designs MUST reuse the project's real identity ... explicitly prohibit initials, emoji, generic marks, invented SVGs, or text-only substitutes" for the logo. "Icons ... MUST be reproduced 1:1." — [SUPERDESIGN.md](https://github.com/superdesigndev/superdesign-skill)
- [Tool prescription] "For existing project, for visual approach only ask if they want to keep the same as now OR create new design style." Its iteration modes: "replace refines the selected direction with version history; branch is only for alternatives the user wants to compare." — [SUPERDESIGN.md](https://github.com/superdesigndev/superdesign-skill); [SKILL.md](https://github.com/superdesigndev/superdesign-skill)

**ui-ux-pro-max (nextlevelbuilder)**
- [Tool prescription] It has no dedicated redesign flow. It does protect prior decisions: "If `design-system/<project-slug>/MASTER.md` already exists, `--persist` skips writing ... check whether it exists first (and read it) before regenerating, so you don't silently discard prior decisions the user or a teammate made ... Never use `--force` without explicit user authorization." — [ui-ux-pro-max SKILL.md](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)

**Anthropic frontend-design**
- [Tool prescription] The installed version's description says "when building new UI or reshaping an existing one". Its body has no redesign protocol. It covers grounding in the subject, a two-pass plan reviewed against the brief, "Where the brief pins down a visual direction, follow it exactly — the brief's own words always win", "Spend your boldness in one place", screenshot self-critique, and "take a look in the mirror and remove one accessory". — installed `frontend-design/SKILL.md` (Anthropic plugin)
- The launch post (12 Nov 2025) frames the problem as convergence: "Without direction, Claude samples from this high-probability center", and "Even with explicit instructions to avoid certain patterns, the model can default to other common choices." The post does not address improving existing UI. — [Improving frontend design through Skills](https://claude.com/blog/improving-frontend-design-through-skills)

**User-reported failure modes** (weak evidence: blog posts and agency pieces, not incident data)
- [Snippet] A developer asked AI to fix styling and "it changed some things. Not the right things"; the fix was naming the brand colour explicitly. — [DEV: "I Asked AI to Fix My UI 20+ Times"](https://dev.to/yuki-uix/i-asked-ai-to-fix-my-ui-20-times-the-problem-wasnt-my-prompts-527j) (not fetched; snippet)
- [Snippet] An agency describes sites losing identity after repeated AI revisions and asks which deliberate brand choices were lost. — [izzy.agency](https://izzy.agency/en/blog/ai-website-design-problems/) (snippet)
- [Snippet] Without design tokens, AI writes raw values such as `#3B82F6`, so a brand colour change touches many files. — search-result summary of [uxmagic.ai](https://uxmagic.ai/blog/where-ai-breaks-ux-workflows) (snippet; attribution uncertain)
- The failure modes the tool authors themselves encode, which is indirect evidence of what goes wrong in practice:
  - generic marketing page in place of the real page (Superdesign)
  - wrong render branch reproduced (Superdesign)
  - invented logos or icons (Superdesign)
  - split palettes across pages (ux-ui-agent-skills)
  - SEO/slug/nav/form-name breakage (taste-skill-classics)
  - polish smuggling in a redesign (Impeccable)
  - "re-litigating settled decisions" (Emil)
  - a stripped "thin" page (taste-skill blind tests)
  - "a second styling system" (Jakub)
  - "partial output ... `// rest unchanged`" (ux-ui-agent-skills)
- I found no reliable first-party documentation of v0, Lovable or Bolt "improve design" behaviour, nor systematic user reports about them.

### Inferences
- Agreement is strong on four points:
  1. Classify refine versus redesign first.
  2. Capture the before state as numbers and screenshots.
  3. Preserve function, content, routes and brand assets by default.
  4. Order changes by effect versus risk, starting with tokens or type.
  
  They disagree on whether tokens or type go first. ux-ui-agent-skills says tokens first. taste-skill says type first, since its "restyle" maps tokens implicitly.
- Impeccable's "never split the difference" rule fills a gap in the current taste SKILL.md. A half-redesign (new spacing on the old palette and type) is a known bad outcome. The skill should make the user choose: polish the current world, or replace it.
- Superdesign's lesson applies to any prompt-driven rebuild. Aesthetic adjectives plus thin context of the real page yield a generic page. The before state has to be described structurally and read from the real render path.

### Gaps
- There are no published, controlled comparisons of redesign workflows (e.g. "audit-first vs direct rebuild"). All evidence is tool authors' prescriptions, plus taste-skill's unpublished blind tests.
- Lovable, v0 and Bolt "improve design" behaviour was not researched (no accessible primary sources).
- Community threads (Reddit, GitHub issues) reporting agent redesign failures were not reached.

---

## 4. How should an agent scope a redesign request? (Guidance for the taste skill)

### Takeaway
The skill should treat "redesign" in five steps:
1. **Classify the request** as one of: review only, polish/refine (preserve the world), restyle (keep the layout, new surface), or redesign (new visual world, same product truth). Ask once if it is unclear.
2. **Record the before state:** probe and screenshots, plus the list of what must survive.
3. **Diagnose and rank** the findings, and stop there for review requests.
4. **Ask the user** which findings to act on and what is off-limits.
5. **Change in a fixed low-risk order**, verified against the before state, with flows smoke-tested.

Offering 2–3 divergent variants of the single highest-leverage piece is a strong alternative to one big rebuild.

### Cited Findings
- **Ask what to keep.** Impeccable's critique asks "Should any sections stay as-is? This prevents the plan from touching things the user considers done." — [critique.md](https://github.com/pbakaus/impeccable/blob/main/.devin/skills/impeccable/reference/critique.md). taste-skill-classics asks once whether to preserve the brand or start from scratch. — [classics §11.A](https://github.com/Leonxlnx/taste-skill-classics/blob/main/skills/taste-skill-v2-experimental/SKILL.md). Superdesign asks "keep the same as now OR create new design style". — [SUPERDESIGN.md](https://github.com/superdesigndev/superdesign-skill)
- **Diagnose first, and stop for reviews.** taste-skill: "A review stops here ... name the three changes that would move the page most." — [taste-skill](https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/SKILL.md). Emil's audit "stop[s] and wait[s] for the user to select which findings become plans". — [improve-animations](https://github.com/emilkowalski/skills/blob/main/skills/improve-animations/SKILL.md). Impeccable's routing: "Never auto-run a command". — [routing.md](https://github.com/pbakaus/impeccable/blob/main/.devin/skills/impeccable/reference/routing.md)
- **Preserve brand constants.**
  - "A brand that is already purple stays purple"; logo, nav labels, slugs and form names never change silently. — [classics §11.C/F](https://github.com/Leonxlnx/taste-skill-classics/blob/main/skills/taste-skill-v2-experimental/SKILL.md)
  - `--keep palette,type`, and keep a brand asset even if it breaks a house rule. — [taste-skill](https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/SKILL.md)
  - Logo invariant and icons 1:1. — [Superdesign](https://github.com/superdesigndev/superdesign-skill)
  - "Established world: inherit it." — [Impeccable new-work.md](https://github.com/pbakaus/impeccable/blob/main/.devin/skills/impeccable/reference/new-work.md)
- **Extend conventions, do not fork them.**
  - "Plans must extend these, not invent parallel ones." — [Emil](https://github.com/emilkowalski/skills/blob/main/skills/improve-animations/SKILL.md)
  - "Never introduce a second styling system just to apply a polish fix." — [Jakub](https://github.com/jakubkrehel/make-interfaces-feel-better/blob/main/skills/make-interfaces-feel-better/SKILL.md)
  - "No framework or styling-library migration." — [taste-skill](https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/SKILL.md)
- **Change in stages:**
  - "Apply in order - stop when the brief is satisfied." — [classics §11.D](https://github.com/Leonxlnx/taste-skill-classics/blob/main/skills/taste-skill-v2-experimental/SKILL.md)
  - Type, then colour, then frame, then states, then stock components. — [taste-skill](https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/SKILL.md)
  - Tokens, then type and spacing, then states, then motion. — [ux-ui-agent-skills](https://github.com/plugin87/ux-ui-agent-skills)
  - Functional defects before cosmetic ones. — [Impeccable polish](https://github.com/pbakaus/impeccable/blob/main/.devin/skills/impeccable/reference/polish.md)
- **Show the before and after:**
  - "compare before and after at every width ... report the before and after measurements side by side". — [taste-skill](https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/SKILL.md)
  - The Before | After | Why table. — [Emil](https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md); [Jakub](https://github.com/jakubkrehel/make-interfaces-feel-better/blob/main/skills/make-interfaces-feel-better/SKILL.md)
- **Show options instead of a single rewrite.**
  - Divergent variants on named axes, one piece per run, behind a picker. "The choice belongs to the user." — [Emil prototype](https://github.com/emilkowalski/skills/blob/main/skills/prototype/SKILL.md)
  - Reproduce first, then branch variations. — [Superdesign](https://github.com/superdesigndev/superdesign-skill)
- **Prove restraint.**
  - "'Already right' is a valid audit result." — [Emil](https://github.com/emilkowalski/skills/blob/main/skills/improve-animations/SKILL.md)
  - "Considered but Rejected" table. — [Jakub](https://github.com/jakubkrehel/make-interfaces-feel-better/blob/main/skills/make-interfaces-feel-better/SKILL.md)
  - "Remove accidental churn." — [Impeccable](https://github.com/pbakaus/impeccable/blob/main/.devin/skills/impeccable/reference/polish.md)

### Inferences (proposed concrete guidance for `skills/taste`, synthesised from the above; not itself tested)

The current SKILL.md has a "Small edits: the fast path" and otherwise sends anything called a "redesign" through the full greenfield process (steps 1–9). Steps 3 ("Diverge, then drop the most likely") and 4 assume a blank slate, which risks exactly the "polish on the discarded look", lost-brand and lost-IA failures described above. Suggested additions:

1. **Add a "Redesign an existing UI" route before step 1.** Classify the request into one of four modes, and ask once if unsure. The wording can follow Impeccable or classics: "Keep the current look and tighten it, or replace the look while keeping the content?"
   - **Review**: findings only, no edits.
   - **Polish**: same world, fix drift and defects.
   - **Restyle**: same layout and IA; new type, colour and surface, drawn from the measured reference.
   - **Redesign**: new visual world; same content, IA, routes and function.
   
   Never mix modes. Do not polish a look that is being replaced, and do not hide a redesign inside a polish (Impeccable).
2. **Record the before state** in `design/before/`:
   - Run `probe.mjs` on the current page at 1440, 390 and 360, and `shoot.mjs` at the same widths.
   - Lint the existing source.
   - Write an **inventory of what must survive** into DESIGN.md: routes and slugs, nav labels, form field names and order, analytics ids, copy voice, legal copy, logo and wordmark, brand colours and faces, signature interactions, and existing a11y wins (classics §11.B–F; taste-skill).
   - Also write the **measured incumbent tokens**: the current grounds, inks, type scale and spacing. They become the starting plan for polish and restyle.
3. **Diagnose before deciding.** Spawn the existing critic on the *before* shots, alongside the reference. Return:
   - "What's working" (2–3 items)
   - ranked issues tagged corrective, subtractive or additive (Emil's split)
   - the three changes that would move the page most (taste-skill)
   - a "considered but rejected" list (Jakub)
   
   For a review request, stop here.
4. **Ask with options, in one message, tied to the findings.** Which findings to act on (top 3 / all / critical only), what is off-limits, and whether the brand stays or goes (Impeccable critique questions). This replaces the generic taste questions in step 1 when an existing UI is the input. "Which sites do you love?" still applies to restyle and redesign.
5. **Brand constants are inputs, not choices.** In polish and restyle, the logo, brand accent and brand faces are fixed, and step 3's divergence happens only on the axes left free. If a brand asset trips a tell or lint rule, keep it and note it in DESIGN.md (taste-skill `--keep` / `--allow`).
6. **Work in a fixed order, and stop when the brief is met:**
   1. functional or a11y defects
   2. tokens: replace hardcoded values with the plan's tokens, one shared theme on every page
   3. type scale and calibration
   4. spacing and rhythm
   5. colour recalibration within the brand
   6. states
   7. component and section recomposition, only for what is unsalvageable
   8. motion last, already step 8
   
   Express each change in the project's existing styling system and stack. No migrations and no new dependencies without asking (Emil, Jakub, taste-skill).
7. **Prefer staged, reviewable diffs.** One stage per commit, or a screenshot pair per stage, so the user can stop or revert. For a broad "make it better" request, Emil's `prototype` pattern is an option: 2–3 divergent variants of the single highest-leverage piece (usually the first screen), on named axes, using the project's tokens, behind a dev-only picker. The user picks before the rest is restyled.
8. **Prove it with before and after.**
   - Re-probe and re-shoot.
   - Show the before/after pairs at each width, and a Before | After | Why table of token changes (old value → new value → reason).
   - Click through every link, form and menu that worked before.
   - Run the pairwise critic comparison against the *before* page, not just against the best-so-far build. Keep a change only if it is strictly better.
9. **Restraint is a valid outcome.** "The current design is already right on X" and a short list beat a padded one. Remove only with a dependency check, and never strip without replacing substance. The taste-skill and repo blind tests both found a thin page loses to a rich one with tells.
10. **Record it.** Append the mode, what was preserved, what changed and the user's verdict to `design/history.md`. In later sessions, "Don't re-litigate settled decisions" (Emil): read DESIGN.md and critiques.md first.

### Gaps
- None of these redesign protocols has published outcome data. The proposed guidance is a synthesis of practitioner and tool prescriptions, not a tested result. The repo's own blind-test setup could be used to compare "audit-first staged restyle" with "full greenfield rerun" on an existing page.
- How well agents follow "ask once, then proceed" versus over-asking was not researched.
