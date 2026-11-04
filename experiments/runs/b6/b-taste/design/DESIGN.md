# Leandro Canela, portfolio: design plan

Skill: taste, full process (no earlier DESIGN.md). Started 2026-11-04.

## 1. Brief

**The owner's words (verbatim, outranks everything below):**
"This is my portfolio (index.html in this folder). Make it better. Keep the palette, the fonts and
the logo (my name with the orange period)."

**Owner not available. Assumptions made in place of the taste questions:**
- Sites they love: unknown. The existing page is the best evidence of taste: warm near-black,
  bone ink, one orange mark, Geist + Newsreader italics, hairline rules, mono meta. I treat that
  as the owner's taste and keep its voice.
- Light or dark: **dark**, because the palette they asked to keep is a dark palette.
- Must keep: palette (`#0f0e0c` paper, `#171613` card, `#1a1915` deep, `#ece8df` ink,
  `#a39e93` muted, `#2b2925` line, `#ec7044` signal), fonts (Geist, Geist Mono, Newsreader),
  logo = "Leandro Canela" + orange period. The header wordmark lacked the period; I add it so the
  logo is the same everywhere.
- Hate: unknown.

**Subject, audience, job.** Leandro Canela, full-stack developer in Barcelona with the weight on
the backend; computer science student. Audience: tech leads, hiring managers and small studios
who need someone careful with data. Job: **persuade**. The one action: **email him** (CV second).

**Mode.** Both (portfolio). Desktop composition leads for the work (screenshots want width); the
phone gets its own one-column composition with the same order.

**Inventory (only his):**
1. His own thesis: "the part of the work that is almost invisible: the data model, the
   permissions, and what happens when something fails."
2. Real screenshots of four shipped things: Reskillia, ICEX Next, CPU City, Tomate, Stas Tarat.
3. Real under-the-screen facts: RLS policies, AES-256-GCM, consent stored with version and date,
   drafts migrated between questionnaire versions, local OCR, timers stored as dates so a sleeping
   Mac can't drift them, a loop that fires 500 queries.
4. Before code he worked in access control and CCTV (CV, 2023–2024): permissions, literally.
5. Barcelona local time (live clock, Europe/Madrid).
6. "Canela" is cinnamon; the orange period is the one warm mark; one of his tools is Cinnamon Key.
7. A path from administrative work (2020) through vocational web development (2024–2026) to
   Humannova and a computer engineering degree (UOC, 2026–).
8. A 40-year-old board game club in Terrassa with about a hundred members.

**Real content.** All copy is the owner's, kept. New content comes only from his own CV
(`Leandro-Canela-CV.pdf`): the "Path" timeline in About. **To confirm with the owner:**
- The timeline itself (is the pre-development work welcome on the portfolio?).
- The CV says Humannova "mar. 2026 – oct. 2026"; the page says "Currently developer at
  Humannova" and "Mar 2026 – now". I kept the page's wording and flag the mismatch.
- No proof was invented: no clients, quotes, logos or metrics beyond what the page already said.

## 2. Reference

No URL from the owner, so two library profiles:
- **linear-app** (dark, precise). Borrow: the ink staircase (four inks, each a clear step), tone-step
  elevation instead of boxes, the small-inside / big-between spacing jump (8 → 32, ratio ~4), negative
  tracking on large type. Leave: its cool greys, gradients, pills everywhere, the 3.5:1 fourth ink.
- **libraries-dev** (dark, crafted). Borrow: chrome stays grey and the colour lives only inside the
  work; nested-radius frames around each real object. Leave: 13–14px body, centred hero.

## 3. Directions

Skeleton (fixed): top bar with name + Work / About / Contact / CV; first screen with name, thesis
and the action; the work; about; contact; footer.

| # | Direction | Likely for any dev portfolio |
| --- | --- | --- |
| A | Keep the accordion index; polish spacing and type | 70% (drop) |
| B | Card grid of screenshots with hover zoom | 60% (drop) |
| C | Terminal look: mono everywhere, prompt-style headings | 45% |
| D | Cross-section: every project shown as its screen, a cut line, and what's underneath it | 20% |
| E | The page as an access log / permission table | 15% |

Dropped A and B. C turns him into the category costume; E is a gimmick that hides the work. **D**
carries inventory items 1–3 and keeps the owner's existing voice.

> On this page, **the invisible layer he says he enjoys (data model, permissions, failure)**
> becomes **a cut line under every screen**: each project shows its real screenshot, then a hairline
> marked "underneath", then the facts below the surface.

Competitor test: another developer's name in the sentence gives a sentence with nothing under the
cut, because the content under the line is his (his thesis words, his RLS/AES/OCR/sleeping-Mac
facts). The device is generic only as a shape; its content is not. Accepted.

## 4. Token plan

**Grounds** (tone steps, no shadows):
- `--paper #0f0e0c` page; `--card #171613` raised (+8 RGB steps); `--deep #1a1915` contact/footer
  band (+11 steps). Frames separate by tone step plus one hairline.
- Hairlines: `--line #2b2925` (1.33:1, structural rules); strong rule = `--ink` 1px at list tops.

**Inks** (on `--paper`; staircase shape from Linear, floor raised to AA):
| Token | Value | Contrast | Use |
| --- | --- | --- | --- |
| `--ink` | `#ece8df` | 15.8:1 | headings, names, body that must be read |
| `--ink-2` | `#cfcabf` | 11.8:1 | running body text in the cases (between ink and muted, same hue) |
| `--muted` | `#a39e93` | 7.2:1 | secondary text, labels |
| `--faint` | `#8a857b` | 5.3:1 | mono meta only (years, stack) |
`--ink-2` and `--faint` are interpolations of the owner's ink and muted, same hue; no new hue enters.

**Accent** `--signal #ec7044` (6.4:1): the logo period (header and hero), and the action (email
arrow, primary button hover, focus ring). Nowhere else; the coloured "Backend / Data" labels go.

**Type**
- Families: Geist (sans, everything), Newsreader (the voice: the thesis line, about statement,
  contact italic), Geist Mono (years, stack, IDs only). **Override of the two-family budget: the
  owner asked to keep the fonts.** Mono share kept under 8% of text.
- Weights: 400, 500 (Geist); 400 + italic (Newsreader). Geist display 500 like Linear's 510.
- Sizes (desktop / phone), five in use:
  | Role | 1440 | 390 | Leading | Tracking |
  | --- | --- | --- | --- | --- |
  | Display (name) | 120px | 52px | 0.92 | −0.045em (owner's existing value) |
  | Section / contact | 64px | 36px | 1.0 | −0.035em |
  | Lead serif, project names | 32px | 26px | 1.15 | −0.01em serif, −0.025em sans |
  | Body | 17px | 16px | 1.55 | 0 |
  | Meta (mono and small sans) | 13px | 13px | 1.4 | +0.02em mono, 0 sans |
  Display / body = 7× at 1440 (the decisive jump), 3.25× at 390. UI (nav, buttons) runs at 15px
  inside the body step (counts with body).
- Body lines 45–68ch.

**Spacing** (px): 4, 8, 16, 24, 40, 64, 128. Inside a group 8–16, between groups 40–64, between
sections 128 (64 on phone).

**Radii:** square for rules and lists; 14px outer / 6px inner nested frames around screenshots
(inner = outer − 8px padding); full pills for buttons. Nothing else is rounded.

**Boldness:** spent on the work: the real screenshots shown large and always visible (today they
only appear after a click or a hover). The chrome stays grey.

**Line review** (would I write this for any brief?):
- "Dark, near-black, grey inks" is the dev category look (Linear's notes warn). Kept anyway: it is
  the owner's palette, warmed by its own hue; not my choice to revise.
- Mono labels everywhere was the existing page's habit (43 uppercase labels). Revised: mono only on
  years and stack lists, no tracked uppercase eyebrows; section labels become plain sans.
- The three-column "01 / schema" band reads as a feature triad. Revised: it stays (it is his
  thesis) but becomes the first "underneath" under the hero, the same device the cases use.

**Cost lines**
- Link underline: `::after` scaleX transform (composite), replaces animated background-size (paint).
- Button hover: background-color, 150ms (paint, tiny surface).
- Press: `scale(.97)`, 100ms (composite).
- Screenshots: `width`/`height` set, first one eager with `fetchpriority="high"`? No: the hero is
  type; the LCP is the name. All screenshots `loading="lazy"` except the first case's.
- Fonts: same files, instanced (Geist wght pinned to 400–500, Newsreader wght pinned to 400) to cut
  ~311 KB toward the 100 KB budget; one preload (Geist).
- JS: the clock and the copy button only; the cursor-following preview and its pointermove handler
  are removed (images are visible now).
- Signature moment: none planned beyond the cut line, which is static.

## Warnings kept, and why
(filled after lint)
