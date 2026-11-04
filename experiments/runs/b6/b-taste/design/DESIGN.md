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

- `3 font families carry text: Geist, Newsreader, Geist Mono` (probe, all widths). The owner asked
  to keep the fonts. Mono is held to years, indices, stack strings and the cut label (probe: 7% of
  text at the first build, below the 8% the original page ran).
- Gate results (final): lint 0/0; probe `--check` 0 errors at 1440, 390 and 360, only the warning
  above. Fonts went from 311 KB to 77 KB by instancing the same families (Geist wght 400–500,
  Newsreader wght 400 at opsz 36, Geist Mono 400 only; Mono 500 dropped as unused).
- Measured sizes at 1440: 17 / 15 / 13 / 32 / 64 / 120px; display/body 7.1; weights 400 (94%)
  and 500.

## Build notes

- Tailwind removed (`src.css`, `tailwind.config.js` deleted); `styles.css` is plain CSS whose values
  all come from the `:root` tokens. No build step.
- The accordion index and the cursor-following preview are gone: every project's screenshot is
  visible, so the hover-only preview had no job left. No JavaScript besides the clock and the
  copy button.
- `scroll-behavior: smooth` removed: on a page this long it made scripted and keyboard jumps slow,
  and it skewed the screenshot tool's first frame.

## 7. Critique, round 1 (separate pass: shots in `design/shots/r1` + this file only)

No subagent tool is available in this environment, so the critic ran as the skill's separate pass:
`references/critic.md` re-read, only the screenshots and this plan looked at, written before any fix.
Reference shots: linear.app (`ref-*.png`).

```
FOCAL POINT: the name "Leandro Canela." with its orange period (blur view, y 160–260) — matches plan:
partly. The plan spends boldness on the work, which first appears on screen 2 at 1440; the first
screen is a typographic statement, which the brief allows for a portfolio whose logo is the name.
ISSUES:
1. [P1] The idea's own content is hard to read: at 1440 the "Underneath" facts sit in three ~210px
   columns under each screenshot; "Added for ICEX" runs 8 lines, "Kept" 4, "Removed" 1, so the
   cut reads as ragged columns, not a spec sheet (r1/page-1440-s2).
   FIX: under the cut, one row per fact: label in a fixed 8rem column, text beside it, hairline
   between rows (the same rule as the Role/Stack spec on the left).
2. [P1] Smaller tools at 1440: the row reads name … mono stack mid-row … description flush right;
   the eye zig-zags across 776px (r1/page-1440-s6).
   FIX: columns name | description | stack, stack right-aligned at the end.
3. [P1] About at 1440: the label "About" sits alone in a 400px-wide left column for ~600px of
   height (r1/page-1440-s6, s7); the second sparse rest on the page after the contact band.
   FIX: statement across columns 1–8 with the label above it, the body paragraph in columns 9–12.
4. [P2] Tier-2 tell: monospace on labels that aren't code ("Kept", "Added for ICEX", "Calendar").
   FIX: those labels in the sans at 13px muted; mono stays on years, indices, stack strings.
5. [P2] Phone nav shows only Work + CV at 390; "About" fits (logo 112 + 3 items ≈ 330px).
   FIX: show About from 360px up.
6. [P2] Contact at 1440: the right ~45% beside the headline is empty.
   FIX: leave; it is the page's one planned rest before the footer.
PRIORITY TARGET: 1. Fix this one first; the others must not break it.
KEEP: the always-visible screenshots in nested frames; the dashed "Underneath" cut line as the
repeated device; the phone first screen (name, thesis, facts, one filled action, next section
peeking in).
```

Calibration against linear.app: display/body 7× here vs 4.8× there (the name is the logo, kept);
four inks used, as Linear; surfaces separate by tone (paper → card frames → deep band) as Linear's
do; gap inside a case 16–24px vs 128px between cases (ratio ~5–8, Linear ~4). No mismatch worth a fix.

Fixing 1, 2, 3 this round (the skill allows the target plus two).

## Round 2 (pairwise, `design/shots/r2` vs `r1` as best)

```
VERDICT: new — the "Underneath" facts now read as one spec sheet (label column + text, hairline
rows) instead of three ragged columns; tools read left to right; About uses the width.
REGRESSIONS: none seen. At 390, "Removed for ICEX" wraps to two lines in its label column (fine).
```

Then three defects fixed without a new round: the strata titles and the cut label had inherited the
browser's bold (700, outside the weight plan); strata titles set to body size so the thesis line
stays above them in the hierarchy; the hero's lead now sits under the name (top-aligned) and the
900–1199px hero splits 7/5 instead of squeezing the buttons. Project names use the 32px token (a
stray 40px was outside the plan). Round 1 found no P0, so no second critique round.

Still flagged by the critic, not fixed: P2 #5 (show "About" in the phone nav from 360px) and P2 #6
(contact band's empty right side, kept as the page's one rest).

## 8. Motion and finish

Kept to feedback only, all on composite or tiny paint:
- link underline drawn with `::after` `scaleX`, 200ms ease-out (hover and focus);
- arrow nudge `translate(2px,-2px)`, 150ms; button background/border colour 150ms;
- press `scale(.97)`, 100ms, on buttons;
- copy button swaps its icon and label for 2s, announced through a status region.
No scroll reveals, no signature moment: the cut line is static on purpose. Reduced motion collapses
every transition to 0.01ms.

Mirror pass, removed one thing: the "Or read the CV (PDF) first." line under the email (the CV is
already in the top bar and the footer).

## 9. Hand-over

- **Reference:** linear.app (ink staircase, tone-step surfaces, small-inside/big-between spacing) and
  libraries.dev (grey chrome, colour only inside the work, nested-radius frames).
- **Idea:** the invisible layer he says he enjoys becomes a cut line under every screen: real
  screenshot above, a dashed "Underneath" rule, the data/permission/failure facts below.
- **Plan in five lines:** owner's palette as 3 tone-step grounds + a 4-ink staircase (15.8 / 11.8 /
  7.2 / 5.3:1); orange only on the logo period and the action; Geist 400/500 + Newsreader voice +
  Geist Mono for years and stack; sizes 13/15–17/32/64/120 with one 7× jump; spacing 4–128 with
  128 between sections; 14/6px nested frames, pills for buttons, square everything else.
- **To confirm:** the Path timeline taken from the CV; "Currently at Humannova" vs the CV's end date
  of Oct 2026; the new "Runs/Traces", "Calendar/Members", "Finds/Proves" labels re-group the
  page's existing sentences (no new claims).
- **Runner-up direction:** E, the page as an access log ("who can touch what") built on his access
  control past.
