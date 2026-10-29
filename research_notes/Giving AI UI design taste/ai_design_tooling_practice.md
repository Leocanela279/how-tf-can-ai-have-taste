# AI design tooling in practice: how practitioners and tool builders fight "AI slop UI" (2025–2026)

Research date: 2026-10-29. Every claim has an inline source. **[MEASURED]** marks a quantitative result from a paper or benchmark. **[VENDOR]** marks a claim the tool's author makes about their own tool. **[ANECDOTE]** marks a single practitioner's report.

---

## 1. Anthropic's "Improving frontend design through skills" and the frontend-design skill

### Takeaway
Anthropic named the problem "distributional convergence": the model reaches for safe, high-probability defaults. Their fix was a roughly 400-token skill covering typography, color, motion and backgrounds, plus a list of things to avoid. The only evidence offered was a few hand-picked before/after screenshots, with no metrics. The skill has since been rewritten at least twice (2026-06 and 2026-09). The current version explicitly lists the "second-order" Claude defaults (cream + serif + terracotta, acid-green on black, broadsheet hairlines, SaaS-card kit, eyebrow/mono/arrow chrome) as tells. It also adds a plan, then review-against-brief, then build, then screenshot-critique process.

### Cited Findings
- The blog post is dated Nov 12, 2025. Its authors are Prithvi Rajasekaran, Justin Wei and Alexander Bricken (Anthropic Applied AI). — [Claude blog](https://www.claude.com/blog/improving-frontend-design-through-skills)
- Diagnosis: "distributional convergence". Models favor high-probability patterns, and safe design choices dominate the training data, which produces a recognizable "AI slop" look. — [Claude blog](https://www.claude.com/blog/improving-frontend-design-through-skills)
- The original ~400-token prompt covers four areas. Typography: distinctive fonts, contrasting pairings, extreme weight and size contrasts. Color: a cohesive palette in CSS variables, dominant colors with sharp accents. Motion: CSS-only where possible, the Motion library in React, one orchestrated page load with staggered reveals. Backgrounds: layered gradients, geometric patterns, atmosphere instead of solid fills. — [Claude blog](https://www.claude.com/blog/improving-frontend-design-through-skills)
- The original avoid list: "Overused font families (Inter, Roboto, Arial, system fonts)", "Clichéd color schemes (particularly purple gradients on white backgrounds)", "Predictable layouts and component patterns", "Cookie-cutter design that lacks context-specific character". It also warned that the model would fall into a different default, such as Space Grotesk. — [Claude blog](https://www.claude.com/blog/improving-frontend-design-through-skills)
- Evidence: qualitative, captioned before/after screenshots only (a SaaS landing page, a blog, an admin dashboard, plus web-artifacts-builder demos). No metrics, ratings or user study. — [Claude blog](https://www.claude.com/blog/improving-frontend-design-through-skills)
- The anthropics/skills repo history for `skills/frontend-design/SKILL.md` shows commits on 2025-12-01/04 (repo restructure), 2026-06-09 ("Update frontend-design skill") and 2026-09-03 ("Update frontend-design skill to avoid generic design defaults", #1713). — [GitHub anthropics/skills commits](https://github.com/anthropics/skills/commits/main/skills/frontend-design/SKILL.md)
- The current SKILL.md (about 1,500 words, fetched 2026-10-29) does the following. — [anthropics/skills SKILL.md](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md)
  - **Persona framing:** "design lead at a design studio", working for a client who "has already rejected proposals that felt cliché or templated".
  - **Grounding in the subject:** it should infer the subject, audience and primary job from the brief, because "the subject's industry, subject matter, materials, and vernacular are where distinctive visual choices come from".
  - **An explicit calibration list of current AI clusters:**
    1. Warm cream (~#F4F1EA) with a high-contrast serif and a terracotta accent (~#D97757, "Anthropic's own Claude-interaction accent").
    2. Near-black with a single acid-green or vermilion accent.
    3. A broadsheet layout with hairline rules and zero radius.
    4. A SaaS-card kit with identical rounded cards, one radius everywhere, rgba(0,0,0,.1) shadows and gradient washes.
    5. Template chrome: tracked ALL-CAPS eyebrows, 'A · B · C' meta strings, 'WORD — fragment' labels, #0B0B0B/#111 instead of black, mono for data labels, and '→' appended to links.
  - **Banned typographic tells:** accenting a single word in a headline, all-caps labels, unnecessary labels above content, and numbered 01/02/03 markers unless the content really is a sequence. It also bans a fade-and-slide-up on every section and hover effects on every card.
  - **"The brief's own words always win"**, including when the brief asks for one of the default looks.
  - **Two-pass process:** first write a compact token plan (4–6 named hex values, typefaces and roles, a layout concept with ASCII wireframes, principles). Then review the plan against the brief: "work through a similar prompt to see if you arrive somewhere similar". Only then build.
  - **"Spend your boldness in one place".** Screenshot self-critique "if your environment supports it — a picture is worth 1000 tokens", Chanel's "remove one accessory", and keeping notes across passes because "human creatives have memory".
  - **A UX-writing section:** active voice, CTAs that name the action, sentence case.
- A practitioner test (DEV Community) found that plain Claude with no skill produced a cream background, a serif headline and all-caps labels. The skill-guided run dropped those markers. **[ANECDOTE]** — [DEV: skillgild real run](https://dev.to/skillgild/claudes-frontend-design-skill-what-it-does-with-a-real-run-5alm)
- A practitioner argues the gap between Claude web and Claude Code design quality "isn't about capability. It's about instructions": the web product has the skill built in. **[ANECDOTE]** — [Bare Metal Digest](https://baremetaldigest.substack.com/p/the-design-gap-between-claude-web)
- Claude Design guidance (Anthropic's 2026 design product), as quoted second-hand: the model "has strong design instincts, with a consistent default house style. This default is persistent", and a generic correction like "don't use cream" will "shift the model to a different fixed palette rather than producing variety". — [Generative Labs, Bill Cava, 2026-07-14](https://www.generativelabs.com/insights/why-ai-design-tools-look-the-same) (I could not open the primary Anthropic doc)

### Inferences
- Anthropic's own skill moved from a negative style list (ban Inter and purple) to calibration plus process: name the current clusters, plan tokens first, check the plan against "what would I produce for any similar prompt", then screenshot-critique. That shift is implicit evidence that a ban list alone just moves the mode, which the original post already predicted with Space Grotesk.
- The current skill names #D97757 terracotta as Claude's own accent. That suggests the cream + serif + terracotta look partly comes from the model imitating Anthropic/Claude branding, which is a plausible mechanism for the "every Claude site looks the same" complaint.

### Gaps
- Anthropic has published no quantitative before/after evaluation (ratings, win-rate, human study) of the skill.
- I could not access the primary Claude Design documentation behind the "persistent house style" quote.

---

## 2. Impeccable (Paul Bakaus)

### Takeaway
Impeccable started from Anthropic's frontend-design skill. It turns "taste" into a vocabulary of about 24 narrow commands plus a deterministic detector with 62 rules, used as a hook, CLI or Chrome extension. It captures product context in PRODUCT.md and the visual system in DESIGN.md. It is enormously popular (~95k stars), but its only effectiveness evidence is the author's own demos and testimonials.

### Cited Findings
- Self-description: "The design vocabulary for your coding agent". It "started from" Anthropic's frontend-design skill. Apache-2.0, ~95.1k stars, ~2.6k commits (page fetched 2026-10-29). — [GitHub pbakaus/impeccable](https://github.com/pbakaus/impeccable)
- Commands, grouped. — [GitHub pbakaus/impeccable](https://github.com/pbakaus/impeccable)
  - Steer: `bolder`, `quieter`, `distill`, `colorize`, `typeset`, `layout`, `animate`, `delight`, `overdrive`.
  - Review: `critique` (scored UX review), `audit` (technical report ranked P0–P3).
  - Finish: `polish`, `harden`, `clarify`, `adapt`, `optimize`, `onboard`.
  - Live: `live`, `generate`.
  - Setup: `shape`, `init`, `document`, `extract`.
  - `craft` is deprecated.
- `init` writes PRODUCT.md (product context). `document` writes DESIGN.md (the existing visual system). The README says narrow targets give better results. Live mode opens a dev-server overlay to cycle variants and writes accepted changes back to source. — [GitHub pbakaus/impeccable](https://github.com/pbakaus/impeccable)
- Named anti-patterns: Inter used for everything, purple-to-blue gradients, cards nested in cards, gray text on colored backgrounds, and a rounded-square icon tile above every heading. The detector has 62 deterministic rules and needs no LLM or API key. — [GitHub pbakaus/impeccable](https://github.com/pbakaus/impeccable)
- Further tells on the site: italic serif display, "GPT-style thin border, wide shadow", side-tab border, hero eyebrow chip, nested cards, icon tile stack, numbered section labels, AI "thinking" motion, "AI beige", "AI kicker", status-chip soup, "everything equal" (no hierarchy), vague headline, generic CTA, pulsing dot. Principles: design for the job (persuade, operate, read, experience) and respect the existing tokens. — [impeccable.style](https://impeccable.style)
- Evidence: a same-model, same-brief demo with and without Impeccable, plus testimonials on X. Sample metrics on the site (LCP 3.4s→1.1s, JS 412kB→86kB) are illustrative. **[VENDOR]** — [impeccable.style](https://impeccable.style); [GitHub](https://github.com/pbakaus/impeccable)

### Inferences
- Impeccable's design bet is that taste is easier to apply as small, named, targeted operations (quieter, typeset, distill) plus a linter than as one large generation-time prompt. This matches the research finding (section 6) that targeted, structured repair beats open-ended self-refinement.

### Gaps
- I found no independent evaluation of Impeccable's output quality.

---

## 3. Other popular skills and the design guidance baked into builder tools

### Takeaway
The ecosystem has split into four approaches:
- **Style databases and generators:** ui-ux-pro-max.
- **Art-direction libraries with real images and a browser-screenshot fix loop:** taste-skill v2.
- **Narrow craft or motion expertise:** Emil Kowalski.
- **Parallel variant exploration:** superdesign.

Commercial builders bake in very different priors. v0 is restrictive: 3–5 colors, no purple, no gradients, no blobs, no emoji icons, and a mandatory "GenerateDesignInspiration" brief. Lovable is token-centric but encourages gradients. Google's Antigravity prompt actively asks for the slop look: vibrant colors, glassmorphism, Inter, smooth gradients, "WOW".

### Cited Findings

**taste-skill (Leonxlnx/taste-skill, `design-taste-frontend`)**
- ~105.5k stars, MIT. v1 relied on three dials (DESIGN_VARIANCE default 8, MOTION_INTENSITY 6, VISUAL_DENSITY 4). — dials: [mer.vin explainer, 2026-07](https://mer.vin/2026/07/taste-skill-explained-anti-slop-agent-skills-for-ai-frontend-design/); [skillselion guide](https://skillselion.com/guides/design-taste-skill-claude-code). Stars: [GitHub](https://github.com/Leonxlnx/taste-skill)
- v2 is a rewrite. — [GitHub Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)
  - The agent identifies what is unique to the client.
  - A script deals 3 of 20 researched art directions, and the agent picks one and finds a "central idea".
  - It builds with real photos from open collections (Wikimedia, Openverse, the Met; only PD/CC0/CC BY/BY-SA, credited).
  - It checks the page in a real browser at 3 widths and fails "slop".
  - It reviews its own screenshots, fixes the top 3 problems, and repeats for up to 3 rounds.
  - v2.1 adds an app/dashboard route with `inspect.mjs --app`.
  - The repo claims it was distilled from a study of 247 curated gallery sites (One Page Love, Awwwards SOTD). A build costs "30–45 minutes and a few hundred thousand tokens". There is no quantitative benchmark, just four example pages. **[VENDOR]**
- Older variants were moved to taste-skill-classics (minimalist-ui, industrial-brutalist-ui, high-end-visual-design, gpt-taste, stitch-design-taste) and imagegen-skills (image-to-code, brandkit). — [GitHub](https://github.com/Leonxlnx/taste-skill)

**ui-ux-pro-max (nextlevelbuilder)**
- ~143k stars, MIT. A BM25-searchable local database: 79 styles (50 active), 192 palettes, 192 industry "reasoning rules", 74 font pairings, 119 UX guidelines, 34 landing patterns, 25 chart types, 22 stacks. A design-system generator maps product type to pattern, style, colors, type, effects and anti-patterns, and persists the result to MASTER.md. — [GitHub nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
- Anti-patterns are per industry (for example, a spa avoids "AI purple/pink gradients", neon and dark mode). The pre-delivery checklist covers SVG icons instead of emoji, cursor-pointer, 4.5:1 contrast, focus states, prefers-reduced-motion, and breakpoints at 375/768/1024/1440. The README makes no quantitative claims, and its before/after example is labeled "not an official demo, benchmark". — [GitHub](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)

**Emil Kowalski's skills**
- `emil-design-eng` encodes his philosophy of UI polish and animation. Companion skills: `animate`, `review-animations`, `animation-vocabulary` and others. Rules include keeping UI animations under 300ms and using custom easing instead of CSS defaults. Install counts conflict between registries: one shows ~250k installs and 35k stars, another ~77.5k installs. — [skillselion guide](https://skillselion.com/guides/emil-kowalski-skills-claude-code); [remio.ai](https://www.remio.ai/post/emil-kowalski-releases-design-engineer-skills-for-ai-coding-tools); [mcpservers.org listing](https://mcpservers.org/tr/agent-skills/emilkowalski/emil-design-eng)

**superdesign**
- An open-source in-IDE design agent (Cursor, Windsurf, VS Code, Claude Code). It generates many variations in parallel (one list says 10), lets you fork designs, and saves to `.superdesign/`. The IDE extension may now be archived in favor of a web app; sources conflict. — [superdesign docs: parallel generation](https://docs.superdesign.dev/features/design-agent/parallel-generation); [awesome.ecosyste.ms](https://awesome.ecosyste.ms/projects/github.com%2Fsuperdesigndev%2Fsuperdesign); [superdesign blog](https://superdesign.dev/blog/cursor-for-design)

**Smaller anti-slop skills**
- avoid-ai-design (funboy322): a 67-tell catalog split into first-order "purple-gradient slop" and second-order "tasteful defaults" (cream + terracotta, black + acid green, mono/all-caps chrome). It ships a zero-dependency Node scanner, exit code 2 on P0/P1 for CI, and an optional PostToolUse hook. It notes the scanner only catches "code-certain" tells; palette weight, spacing and hierarchy "need a render". Its demo claims 23 tells reduced to 0. **[VENDOR]** — [GitHub funboy322/avoid-ai-design](https://github.com/funboy322/avoid-ai-design)
- Hallmark (Nutlope): an anti-slop skill that logs past builds and hard-fails repeated page structures or themes. Its author admits the nav-rotation rule is "the most-violated rule in practice". — [HN thread](https://news.ycombinator.com/item?id=49058547)
- Anti-AI-UI (Vanszs): flags purple/indigo gradients, Inter everywhere, centered dual-CTA heroes and 3-card feature grids, and uses a "3+ tells" heuristic. — [GitHub Vanszs/Anti-AI-UI](https://github.com/Vanszs/Anti-AI-UI)

**v0 (Vercel) system prompt.** From a leaked or extracted prompt mirrored in x1xhlol/system-prompts-and-models-of-ai-tools, last updated in the repo 2026-05-10. — [GitHub mirror: v0 Prompt.txt](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools/blob/main/v0%20Prompts%20and%20Tools/Prompt.txt)
- "ALWAYS use exactly 3-5 colors total": 1 primary brand color, 2–3 neutrals, 1–2 accents.
- "NEVER use purple or violet prominently, unless explicitly asked for".
- "Avoid gradients entirely unless explicitly asked for". If gradients are used: analogous colors only, at most 2–3 stops, never opposing temperatures.
- At most 2 font families. Body line-height 1.4–1.6. No decorative body fonts and no text under 14px.
- Mobile-first, flexbox before grid, Tailwind spacing scale (no arbitrary values), `gap` rather than `space-*`, `text-balance`/`text-pretty` on titles.
- Semantic tokens only ("DO NOT use direct colors like text-white, bg-white").
- "NEVER generate abstract shapes like gradient circles, blurry squares, or decorative blobs as filler". "NEVER use emojis as icons". Use images "to create engaging, memorable interfaces".
- Final rule: "Ship something interesting rather than boring, but never ugly. Utilize the GenerateDesignInspiration tool before any design work."
- An earlier leaked v0 prompt (Nov 2024) contained mainly coding rules (semantic Tailwind color variables), not aesthetic ones. — [samim.io mirror](https://samim.io/p/2024-11-23-leaked-system-prompts-from-vercels-v0-tool-7n9cfhcf)

**Lovable Agent prompt** (mirror, last updated in the repo 2025-09-16). — [GitHub mirror: Lovable Agent Prompt.txt](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools/blob/main/Lovable/Agent%20Prompt.txt)
- "CRITICAL: The design system is everything". Never write custom styles in components; customize index.css, tailwind.config.ts and shadcn variants.
- "USE SEMANTIC TOKENS FOR COLORS, GRADIENTS, FONTS".
- "Beautiful designs are your top priority". It edits tokens "as often as necessary to avoid boring designs and leverage colors and animations".
- Its example tokens include `--gradient-primary` and a `--primary-glow` shadow.
- No explicit anti-slop list.

**Google Antigravity "Fast" prompt** (mirror, updated in the repo 2025-11-18). — [GitHub mirror: Antigravity Fast Prompt.txt](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools/blob/main/Google/Antigravity/Fast%20Prompt.txt)
- "Use best practices in modern web design (e.g. vibrant colors, dark modes, glassmorphism, and dynamic animations)… Failure to do this is UNACCEPTABLE."
- Modern typography "from Google Fonts like Inter, Roboto, or Outfit".
- "Use smooth gradients". "WOW the user". "If your web app looks simple and basic then you have FAILED!"

**Google Stitch.** Relaunched 2026-03-18 as an infinite-canvas "vibe design" tool that takes text, images or code as input and can pull a design system from a URL or DESIGN.md. — [Blog du Modérateur](https://www.blogdumoderateur.com/google-attaque-figma-stitch-outil-vibe-design/); [MindStudio](https://www.mindstudio.ai/blog/what-is-vibe-design-google-stitch-explained)
- A practitioner guide: if a prompt omits a category (context, structure, aesthetic, stack), "the AI fills in the missing parameters with common defaults". **[ANECDOTE]** — [DEV: Stop generating AI slop… Google Stitch](https://dev.to/seifalmotaz/stop-generating-ai-slop-the-developers-guide-to-google-stitch-jen)
- A Virginia Tech IT guide says Stitch works best when the image supplies structure and the text supplies intent. — [VT IT](https://it.aad.vt.edu/howto/google-stitch/)
- A reviewer calls it "great for inspiration, wrong tool for production design". — [designproject.io](https://designproject.io/blog/google-stitch-review/)

### Inferences
- Tool builders who ship to the general public (v0) have converged on hard numeric constraints (color count, font count, no purple, no gradients, no blobs, no emoji icons) plus a separate "design brief" step before generation. Antigravity's prompt is a counter-example: it literally instructs the slop look. Builder system prompts are therefore a direct cause of some tells, not just training data.
- Every serious skill now externalizes a design decision before code: PRODUCT.md and DESIGN.md (Impeccable), MASTER.md (ui-ux-pro-max), dealt art directions (taste-skill), a token plan (Anthropic), GenerateDesignInspiration (v0). That is the common denominator across the ecosystem.

### Gaps
- I could not verify Bolt's current design guidance. A search of public Bolt repos for its well-known "beautiful, not cookie cutter" line returned nothing, so I won't cite it.
- I found no primary-source design guidance for Figma Make.

---

## 4. Merged catalogue of "AI slop UI tells"

### Takeaway
Lists from Anthropic, Impeccable, avoid-ai-design, v0, ui-ux-pro-max and design blogs agree on a two-tier catalogue. Tier 1 is the original SaaS slop (purple gradients, Inter, centered hero with pill badge, three icon cards, glass, emoji icons). Tier 2 is the "tasteful" second-order defaults that appeared once tier 1 got banned (cream + serif + terracotta, black + acid accent, editorial hairlines, mono/eyebrow chrome, 01/02/03 numbering, single-word headline accent, '→' on links).

### Cited Findings
Deduplicated catalogue (sources per row; A = Anthropic SKILL.md, I = Impeccable, AD = avoid-ai-design, V = v0 prompt, B = blogs):

**Color / surface**
- Purple/indigo-to-blue gradients; gradient text in headlines — A-blog, I, AD, V, B. [Claude blog](https://www.claude.com/blog/improving-frontend-design-through-skills); [Impeccable](https://github.com/pbakaus/impeccable); [avoid-ai-design](https://github.com/funboy322/avoid-ai-design); [v0 prompt](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools/blob/main/v0%20Prompts%20and%20Tools/Prompt.txt); [925studios](https://www.925studios.co/blog/ai-slop-design-tells)
- Indigo origin claim: Tailwind UI shipped its example buttons in indigo in 2020 (blog claim, unverified). — [search summary of AI-slop guides; vibecodekit](https://vibecodekit.dev/ai-slop-design)
- Warm cream (~#F4F1EA) + high-contrast serif + terracotta/clay accent (~#D97757) ("AI beige"). [A SKILL.md](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md); [AD](https://github.com/funboy322/avoid-ai-design); [impeccable.style](https://impeccable.style); [Generative Labs](https://www.generativelabs.com/insights/why-ai-design-tools-look-the-same); [awesome-claude-design](https://github.com/rohitg00/awesome-claude-design)
- Near-black (#0B0B0B/#111) with a single acid-green or vermilion accent. [A](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md); [AD](https://github.com/funboy322/avoid-ai-design)
- Decorative blobs, gradient circles, blurry squares as filler. [V](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools/blob/main/v0%20Prompts%20and%20Tools/Prompt.txt); [Medium, Nijhawan](https://medium.com/@khushboo.nijhawan/your-website-looks-like-everyone-elses-here-s-why-578ec4e88957)
- Gray text on colored backgrounds; muted text below WCAG AA. [I](https://github.com/pbakaus/impeccable); [AD](https://github.com/funboy322/avoid-ai-design)
- Untouched stock shadcn palette; slate/zinc defaults. [AD](https://github.com/funboy322/avoid-ai-design); [DEV, Jun Seo](https://dev.to/kkk_dev_1b0a00f5047cb4de6/why-every-claude-code-built-site-looks-the-same-and-the-image-layer-that-breaks-it-37jp)
- Permanent dark mode. [mania.design](https://www.mania.design/blog/spot-the-slop-a-ui-designers-guide-to-fixing-ai-defaults/)

**Typography**
- Inter (or Roboto/Arial/system) for everything. [A-blog](https://www.claude.com/blog/improving-frontend-design-through-skills); [I](https://github.com/pbakaus/impeccable); [AD](https://github.com/funboy322/avoid-ai-design)
- The "tasteful free font" set: Space Grotesk, Geist, Instrument Serif, Fraunces. Banning Inter just yields Instrument Serif and mono captions. [A-blog (Space Grotesk)](https://www.claude.com/blog/improving-frontend-design-through-skills); [AD](https://github.com/funboy322/avoid-ai-design); [search summary of slop guides](https://vibecodekit.dev/ai-slop-design)
- Italic serif display; one accented word in the headline (italic, bold or a different color). [impeccable.style](https://impeccable.style); [A](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md); [AD](https://github.com/funboy322/avoid-ai-design)
- Tracked ALL-CAPS eyebrow/kicker above every heading; hero eyebrow chip / pill badge. [A](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md); [impeccable.style](https://impeccable.style); [AD](https://github.com/funboy322/avoid-ai-design); [Anti-AI-UI](https://github.com/Vanszs/Anti-AI-UI)
- Monospace for small data labels / mono template chrome; 'A · B · C' meta strings; 'WORD — fragment' labels. [A](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md); [AD](https://github.com/funboy322/avoid-ai-design)
- Fonts declared but never loaded. [AD](https://github.com/funboy322/avoid-ai-design)

**Layout / structure**
- Centered hero (often dual CTA) over a row of three icon feature cards. [Anti-AI-UI](https://github.com/Vanszs/Anti-AI-UI); [AD](https://github.com/funboy322/avoid-ai-design); [925studios](https://www.925studios.co/blog/ai-slop-design-tells)
- Stock section order: hero, logos, features, stats, pricing (three tiers with a highlighted middle), CTA, four-column footer. [AD](https://github.com/funboy322/avoid-ai-design)
- Hero formula: big number + small label + supporting stats + gradient accent. [A](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md)
- Decorative 01/02/03 numbering when the content isn't a sequence. [A](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md); [impeccable.style](https://impeccable.style); [AD](https://github.com/funboy322/avoid-ai-design)
- Broadsheet hairline rules, zero radius, dense newspaper columns. [A](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md); [AD](https://github.com/funboy322/avoid-ai-design)
- "Everything equal": no hierarchy. [impeccable.style](https://impeccable.style)

**Components**
- SaaS-card kit: identical rounded cards, one radius everywhere, the same rgba(0,0,0,.1) shadow, gray borders. [A](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md); [mania.design](https://www.mania.design/blog/spot-the-slop-a-ui-designers-guide-to-fixing-ai-defaults/)
- Cards nested in cards. [I](https://github.com/pbakaus/impeccable)
- Rounded-square icon tile above every heading. [I](https://github.com/pbakaus/impeccable); [AD](https://github.com/funboy322/avoid-ai-design)
- "GPT-style thin border, wide shadow"; side-tab accent border. [impeccable.style](https://impeccable.style)
- rounded-2xl + shadow-lg + backdrop-blur on everything; reflexive glassmorphism. [AD](https://github.com/funboy322/avoid-ai-design)
- Status-chip soup; pulsing "live" dot. [impeccable.style](https://impeccable.style)
- Fake macOS window dots; stock Aceternity/Magic UI effects. [AD](https://github.com/funboy322/avoid-ai-design)
- Missing focus states. [AD](https://github.com/funboy322/avoid-ai-design)

**Icons / imagery**
- Emoji as icons. [V](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools/blob/main/v0%20Prompts%20and%20Tools/Prompt.txt); [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
- The worn Lucide set; sparkle icon for "AI". [AD](https://github.com/funboy322/avoid-ai-design); [DEV, Jun Seo](https://dev.to/kkk_dev_1b0a00f5047cb4de6/why-every-claude-code-built-site-looks-the-same-and-the-image-layer-that-breaks-it-37jp)
- Placeholder avatars; no real or project-specific imagery. [AD](https://github.com/funboy322/avoid-ai-design); [DEV, Jun Seo](https://dev.to/kkk_dev_1b0a00f5047cb4de6/why-every-claude-code-built-site-looks-the-same-and-the-image-layer-that-breaks-it-37jp)

**Motion**
- The same fade-and-slide-up on every section; hover transitions on every card. [A](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md); [AD](https://github.com/funboy322/avoid-ai-design)
- Bounce easing; count-up stats; ignoring reduced-motion; "AI is thinking" motion. [AD](https://github.com/funboy322/avoid-ai-design); [impeccable.style](https://impeccable.style)

**Copy**
- "Elevate / Seamless / Powerful / Unlock"; vague headlines; generic CTAs ("Get Started", "Submit"); '→' appended to every link or button. [AD](https://github.com/funboy322/avoid-ai-design); [A](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md); [impeccable.style](https://impeccable.style)

### Inferences
- Tier 2 is now as recognizable as tier 1, and Anthropic's own skill lists it. Any new "taste" skill that only bans tier 1 will land in tier 2. One that bans both will find a tier 3 unless decisions are tied to the specific subject or brief. Anthropic, Generative Labs, Hallmark's history-tracking and the search summary of slop guides all independently say this.

### Gaps
- No source quantifies how often each tell appears in AI output vs human-designed sites, so frequency rankings (like avoid-ai-design's P0–P2) are expert judgment.

---

## 5. Evidence: reference screenshots / design systems as conditioning

### Takeaway
There is solid measured evidence that models can reproduce a given reference screenshot reasonably well, and that structured style references improve consistency. There is almost no controlled evidence that conditioning on a reference image or tokens improves perceived taste or originality when generating from a brief. That claim rests on practitioner anecdote, though the anecdotes are consistent.

### Cited Findings
- **Design2Code** (NAACL 2025; v1 Mar 2024, v3 Feb 2025): 484 real webpages. Models (GPT-4o/4V, Gemini, Claude) "mostly lag in recalling visual elements from the input webpages" and struggle with correct layouts. **[MEASURED]** — [arXiv 2403.03163](https://arxiv.org/abs/2403.03163)
- Design2Code's "self-revision" prompting gives the model both the reference screenshot and a screenshot of its own render, then asks it to revise (described in later work). — [arXiv 2604.05839](https://arxiv.org/html/2604.05839v1)
- **RAG with brand style references** (MDPI Eng. Proc. 2025): giving brand-related style references "significantly improves the consistency" of generated UI code, measured as CSS recall rather than aesthetics, and effectiveness "heavily depends on the quality of the input data". **[MEASURED, narrow]** — [doi 10.3390/engproc2025120037](https://doi.org/10.3390/engproc2025120037)
- **DesignRepair** (ICSE 2025): uses Material Design 3 guidelines as a knowledge base with dual-stream code + rendered-page (Playwright) analysis and RAG to repair frontend design issues. Data: 196 issues from AI-generated code and 115 from GitHub projects. It is post-hoc repair, not generation-time conditioning. — [arXiv 2411.01606](https://arxiv.org/abs/2411.01606)
- **Generative UI** (Leviathan, Valevski et al., Feb 2026): with proper prompting and tools, raters "overwhelmingly preferred" generated UIs over markdown output. Against human-designed websites they were worse overall but "at least comparable in 50% of cases". Releases the PAGEN expert-UI dataset. **[MEASURED]** — [arXiv 2604.09577](https://arxiv.org/abs/2604.09577)
- **UICrit** (UIST 2024, Duan et al.): 3,059 critiques of 983 mobile UIs from 7 experienced designers. Using the dataset as few-shot and visual prompts gave about a 55% gain in LLM UI-feedback quality. **[MEASURED]** — [arXiv 2407.08850](https://arxiv.org/abs/2407.08850)
- Stitch test: without structured tokens the output skewed to a heavy green palette. With a DESIGN.md of explicit tokens it changed accordingly. **[ANECDOTE]** — [search summary of Stitch reviews; designproject.io](https://designproject.io/blog/google-stitch-review/)
- An HN practitioner tried skills, shuffle.dev, moonchild.ai and screenshot samples. The best result came from sketching the design by hand, redrawing it in Figma/Penpot and prompting a multimodal LLM with that image, yet "LLMs still put something AI-ish into design anyway". **[ANECDOTE]** — [HN Hallmark thread](https://news.ycombinator.com/item?id=49058547)
- Project-specific generated images plus a DESIGN.md "Illustration style" section is claimed as the cheapest way to break the Claude Code template look. The author says the DESIGN.md effect "hasn't been tested across enough projects". **[ANECDOTE]** — [DEV, Jun Seo, May 2026](https://dev.to/kkk_dev_1b0a00f5047cb4de6/why-every-claude-code-built-site-looks-the-same-and-the-image-layer-that-breaks-it-37jp)
- taste-skill v2 bases its approach on curated art directions distilled from 247 gallery sites plus real open-licensed photography. **[VENDOR]** — [GitHub](https://github.com/Leonxlnx/taste-skill)
- Generative Labs' recommendation: bring your own references and write explicit colors, typefaces, density, motion and rejected defaults. **[opinion]** — [Generative Labs](https://www.generativelabs.com/insights/why-ai-design-tools-look-the-same)
- In adjacent image generation, retrieving reference images improves human-rated quality (ImageRAG user study; composition-transfer retrieval). This suggests, but does not demonstrate, the same effect for UI. — [arXiv 2502.09411](https://arxiv.org/html/2502.09411); [arXiv 2605.04609](https://arxiv.org/html/2605.04609v1)

### Inferences
- The measured literature supports "references and tokens increase fidelity and consistency". It is silent on "references increase taste". Practitioners still converge on reference and token conditioning as the most reliable lever, because it replaces the model's prior with a specific target, which a ban list cannot do.
- Since screenshot-to-code fidelity is imperfect (Design2Code), a reference works best as direction (palette, type, density, composition) rather than as a pixel target.

### Gaps
- I found no controlled study comparing brief-only vs brief + reference image vs brief + tokens on human-rated aesthetics or distinctiveness for web UI.
- I did not find WebSight or screenshot-to-code (abi) evaluation results within the call budget.

---

## 6. Evidence: render-screenshot-critique loops (visual self-refinement)

### Takeaway
Measured gains are real but modest, they saturate after about 1–3 rounds, and they depend heavily on a separate or structured critic. Naive self-refinement can degrade ("behavioral collapse") or oscillate as fixes break other regions. Keeping the best candidate across rounds, targeting one issue per round, and requiring strict improvement all help.

### Cited Findings
- **Vision-Guided Iterative Refinement** (Amazon AGI + Bristol, 2026-04-07): generator, Selenium screenshot, VLM visual critic (Claude Sonnet 4.5), code critic, improver, VLM judge; best of 3 cycles; WebDev Arena queries (600 test). **[MEASURED]** — [arXiv 2604.05839](https://arxiv.org/html/2604.05839v1)
  - Sonnet 4.5: 7.584 → 7.958 (+4.9%, cycle 1) → 8.048 (+6.1%, cycle 3). Best-of-cycles: 8.402 (+10.8%).
  - Haiku 4.5: +3.6% / +5.7% / best +9.8%.
  - Distill-Qwen-14B: +6.2% / +8.7% / best +17.8%.
  - **Refinement without the visual critique gained only +1.5%.**
  - Gains flatten after cycle 1. Tokens rise from about 2.6k to 45.8k by cycle 3, and code quality declines slightly (about -3.2%).
  - LoRA distillation of the refined outputs into single-pass recovered about 25% of the best-of gain.
- **ReLook** (Tencent et al., 2025-10-13): RL-trained generate-diagnose-refine with a Qwen2.5-VL-72B screenshot critic. **[MEASURED]** — [arXiv 2510.11498](https://arxiv.org/html/2510.11498v1)
  - Gains of +2 to +8 points on ArtifactsBench subsets for 7–8B models.
  - Human study win/tie/loss of 50:30:20 against the base model.
  - "Forced Optimization" (accept a revision only if it strictly beats the best so far) added about 2 points.
  - Base models without training "degrade after two to three feedback rounds even with MLLM feedback" ("behavioral collapse").
  - Latency is about 123s vs 18s per query.
- **RubSE** (Microsoft-affiliated authors incl. Zhengyuan Yang and Lijuan Wang, Aug 2026): identifies "visual repair coupling", where one local edit fixes a mismatch but breaks already-correct regions, which makes naive self-evolution unstable. Rubrics that pick one prioritized repair target per round, with a rubric history, "substantially outperform naïve self-evolution" across 6 VLMs and 3 benchmarks, reduce trajectory collapse, and let strong rubric generators guide weaker code models. The abstract gives no numbers. **[MEASURED, numbers not extracted]** — [arXiv 2608.24138](https://arxiv.org/abs/2608.24138)
- **Visual prompting with iterative refinement for design critique** (Duan, Cheng, Hartmann, Li; Dec 2024): an iterative multimodal pipeline producing bounding-boxed design comments. Experts preferred its critiques, and it cut the gap to human performance "by 50% for one rating metric". It uses separate models for generation and refinement to reduce self-bias. **[MEASURED]** — [arXiv 2412.16829](https://arxiv.org/abs/2412.16829)
- **Practitioner and tool adoption:** Anthropic's skill ("taking screenshots to review if your environment supports it"), taste-skill v2 (3 widths, fix the top 3 problems, at most 3 rounds), and Impeccable live mode all implement the loop. None publishes measured gains. — [anthropics/skills SKILL.md](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md); [taste-skill](https://github.com/Leonxlnx/taste-skill); [Impeccable](https://github.com/pbakaus/impeccable)
- avoid-ai-design's author notes that palette weight, spacing, hierarchy and structure "need a render". Code scanning only catches code-certain tells. — [avoid-ai-design](https://github.com/funboy322/avoid-ai-design)

### Inferences
- For a lean skill, the evidence supports the following:
  1. One or two screenshot-critique rounds, not open-ended loops.
  2. A critic prompt that is structured and multi-dimensional (rubric or checklist), not "does this look good?".
  3. Fixing the top 1–3 issues per round.
  4. Keeping the best version, not the last.
  5. A deterministic linter for code-certain tells, so the visual critic's budget goes to hierarchy, spacing and composition.
- The large gap between "refine without critique" (+1.5%) and "refine with visual critique" (+5–6% per cycle for Sonnet 4.5) is the clearest measured argument for actually looking at the render.

### Gaps
- All measured gains are scored by VLM judges, not designers. None of the papers measures distinctiveness or "non-genericness", only overall quality or task fit.
- No study tests whether a critique loop reduces slop tells specifically.

---

## 7. Evidence: LLM-as-judge for visual design quality

### Takeaway
MLLM judges are fairly reliable for pairwise preference and structured, checklist-based scoring of web artifacts: 70–94% agreement in the best setups. They are much weaker at absolute scoring, single-dimension "aesthetic" ratings, and subtle web-implementation quality. Multi-dimensional rubrics substantially improve agreement.

### Cited Findings
- **ArtifactsBench** (Tencent, Jul–Sep 2025): renders artifacts as timed screenshots and has an MLLM score them against per-task checklists. It reports 94.4% ranking consistency with WebDev Arena and over 90% pairwise agreement with human experts. **[MEASURED]** — [arXiv 2507.04952](https://arxiv.org/abs/2507.04952)
- **Vision-Guided Iterative Refinement**, on 200 tasks with clear human preference: the multi-dimensional VLM judge agreed with humans 69.5% of the time (22% disagreement, 8.5% draws). The single-dimension judge agreed only 48.5% (23% disagreement, 28.5% draws). The authors warn of over- or under-weighting aesthetics and missing accessibility issues. **[MEASURED]** — [arXiv 2604.05839](https://arxiv.org/html/2604.05839v1)
- **WebDevJudge** (Oct 2025): finds "a significant gap between LLM judges and human experts" in judging web-dev quality, attributed to failing to recognize functional equivalence, failing to verify task feasibility, and bias. (Magnitude not extracted from the abstract.) **[MEASURED]** — [arXiv 2510.18560](https://arxiv.org/abs/2510.18560)
- **MLLM as a UI Judge** (Adobe-affiliated authors incl. Ryan Rossi, Oct 2025): GPT-4o, Claude and Llama on 30 interfaces against crowdsourced perception. Models "approximate human preferences on some UI dimensions but diverge on others". A secondary summary reports about 75–85% agreement; I could not verify this in the abstract. — [arXiv 2510.08783](https://arxiv.org/abs/2510.08783)
- **MLLM-as-a-Judge** (2024, general vision tasks): about 70–79% human agreement on pairwise comparison, but much lower on individual scoring and batch ranking, with a tendency to give high scores. Not design-specific. — [arXiv 2402.04788](https://arxiv.org/pdf/2402.04788); [project page](https://mllm-judge.github.io/)
- **UICrit** motivation: LLM techniques "do not yet match the performance of human evaluators" on UI critique. Few-shot examples from expert critiques improved quality by about 55%. — [arXiv 2407.08850](https://arxiv.org/abs/2407.08850)
- A 2026 study of GPT-5, Claude 4 Sonnet, Gemini 2.5 Pro and Qwen-3 VL against expert ratings of 1,000 UICrit screens reportedly found near-perfect agreement on aesthetics and design-quality dimensions. I saw only a snippet and did not verify it. — [Springer/ACM chapter](https://dl.acm.org/doi/10.1007/978-3-032-30549-7_12)

### Inferences
- A self-critique step in a skill should be pairwise ("is version B better than A on X, Y, Z?") and checklist or rubric-driven, ideally with a few expert-critique examples (the UICrit result), rather than an absolute "rate this 1–10".
- A model judging its own output is the weakest configuration. The literature consistently uses a separate critic model or structured rubrics to reduce self-bias (2412.16829, 2604.05839, 2608.24138).

### Gaps
- No study measures LLM-judge agreement with designers on distinctiveness or "AI-lookingness", the property this project cares about most.
- I did not extract exact WebDevJudge numbers or which UI dimensions diverge in 2510.08783.

---

## 8. Why skills "work for most but not for me": convergence, being ignored, the new uniform look

### Takeaway
The complaints fall into four failure modes:
1. **Ban-list whack-a-mole.** Banning tier-1 tells shifts the model to a new fixed mode (cream + serif + terracotta, black + acid green). Anthropic's own guidance and skill now acknowledge this.
2. **Skills not invoked or not followed.** People report the skill only works if explicitly invoked, and individual rules (like Hallmark's nav-rotation rule) get violated.
3. **No subject-specific input.** Without a concrete brief, references, real content or images, the model has nothing to differ from, so all skills converge on "default Sonnet output".
4. **Skill stacking and conflicts.** Many overlapping skills (ui-ux-pro-max suggesting glassmorphism styles vs Anthropic banning glass; Antigravity demanding glass and gradients) give the agent contradictory priors. This is mostly inference: few sources document conflict directly.

### Cited Findings
- HN thread on Hallmark (about 3 months before 2026-10-29). **[ANECDOTE]** — [HN item 49058547](https://news.ycombinator.com/item?id=49058547)
  - One user had used impeccable, ui-ux-max and others: they help with inconsistencies and accessibility, but "design converges on the same thing" unless you're extremely explicit.
  - Another asked whether anyone has got impeccable or any skill to actually work: "for me it still pretty much looks like slop".
  - A third said most Hallmark showcase screenshots "are practically identical" and look like default Sonnet output.
  - Hallmark's author admits the nav-rotation rule is "the most-violated rule in practice".
- A blog claims the official Anthropic frontend-design skill "is basically producing the slop it was supposed to prevent", and that telling Claude "don't make AI slop please" does not work. Other write-ups call the difference "night and day" and say the skill "consistently lifts the floor". Proposed mechanism: the skill makes the model "commit to a direction first". A counter-view: the guardrails only work if you actively invoke them. **[ANECDOTE, conflicting]** — [search results summary: Chase AI](https://www.chaseai.io/blog/claude-code-frontend-design-skills); [thomas-wiegold.com](https://thomas-wiegold.com/blog/claude-code-frontend-design-plugin/); [theadpharm](https://www.theadpharm.com/insights/claude-design-without-the-ai-slop-look); [firecrawl](https://www.firecrawl.dev/blog/best-claude-code-skills) (I could not attribute each quote to a specific one of these pages; treat them as a cluster)
- Generative Labs (2026-07-14) describes AI design tools' shared look: cream/beige, near-black ink, one saturated accent, serif italics, rounded-rect layouts. "Changing the color scheme doesn't remove the underlying structure." It quotes Claude Design guidance that the default house style is "persistent" and that "don't use cream" swaps in "a different fixed palette rather than producing variety". — [Generative Labs](https://www.generativelabs.com/insights/why-ai-design-tools-look-the-same)
- awesome-claude-design calls the warm-editorial sameness (terracotta, cream, clay, serif body) the biggest community complaint about Claude Design output. — [GitHub rohitg00/awesome-claude-design](https://github.com/rohitg00/awesome-claude-design)
- A Claude Design walkthrough reports oversized serif display, a muted accent and generous padding that feel like a default template ("great tool, not a designer"; May 2026). — [roughworks.ca](https://roughworks.ca/blog/claude-design-may-2026-impact/)
- Claude Code sites converge on Tailwind + shadcn/ui + Lucide + slate/zinc + purple-blue hero gradient + rounded bordered cards: "a visual-stack problem". — [DEV, Jun Seo](https://dev.to/kkk_dev_1b0a00f5047cb4de6/why-every-claude-code-built-site-looks-the-same-and-the-image-layer-that-breaks-it-37jp)
- Anthropic's current skill tells the model to treat its own accent #D97757 as a tell on a user's brief, and the original blog warned of Space Grotesk as the next default. Anthropic itself treats the "new uniform" as a known failure. — [anthropics/skills SKILL.md](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md); [Claude blog](https://www.claude.com/blog/improving-frontend-design-through-skills)
- The quoted skill text "NEVER converge on common choices (Space Grotesk, for example) across generations" relies on cross-generation memory the model lacks. Anthropic's newer skill instead suggests keeping notes "if you have a space to quickly jot down notes about what you've tried". Hallmark implements a build log. — [DEV skillgild](https://dev.to/skillgild/claudes-frontend-design-skill-what-it-does-with-a-real-run-5alm); [SKILL.md](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md); [HN](https://news.ycombinator.com/item?id=49058547)
- Workarounds people report: a CLAUDE.md rule to invoke the skill every session; naming specific design dimensions and references; explicitly ruling out unwanted defaults. **[ANECDOTE]** — [DEV skillgild](https://dev.to/skillgild/claudes-frontend-design-skill-what-it-does-with-a-real-run-5alm); [Bare Metal Digest](https://baremetaldigest.substack.com/p/the-design-gap-between-claude-web)
- Builder prompts conflict with anti-slop skills. Antigravity's system prompt demands "vibrant colors, dark modes, glassmorphism", "smooth gradients" and Inter/Roboto/Outfit. Lovable's prompt templates `--gradient-primary` and `--primary-glow`. — [Antigravity prompt mirror](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools/blob/main/Google/Antigravity/Fast%20Prompt.txt); [Lovable prompt mirror](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools/blob/main/Lovable/Agent%20Prompt.txt)
- ui-ux-pro-max ships 79 named styles (its own skill description elsewhere lists glassmorphism, neon and 3D among banner styles). A style menu can legitimize looks that other skills ban. — [GitHub ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)

### Inferences
- "Works for most but not for me" fits a variance explanation. A skill raises the floor (fewer tier-1 tells, better hierarchy), so demos chosen by the author look good. Users with short, generic briefs ("make a landing page for my SaaS") give the skill nothing subject-specific to anchor on, so output collapses to the skill's own mode, which then becomes the new recognizable look. The fix the evidence points to is forcing subject grounding plus a concrete external reference or token plan before code, and a check of the plan against "what would I produce for any similar prompt". That is exactly what Anthropic's 2026-09 rewrite added.
- For a lean single skill: avoid shipping a style catalogue (it creates new modes); name both tiers of tells as calibration rather than hard bans; let the brief override; require a written token and layout plan; keep a small per-project notes file of previous choices to avoid repeating them across generations.

### Gaps
- I did not reach Reddit r/ClaudeAI or X threads directly. The search returned blogs and HN instead, so the community-sentiment evidence is thinner than requested.
- No source quantifies how often skills are skipped or ignored in Claude Code sessions, and no direct documentation shows two design skills conflicting in one session.
