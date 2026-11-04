# Leandro Canela portfolio: restyle

## Mode

**Restyle** (assumed). The brief is "Make it better. Keep the palette, the fonts and the logo."
`taste-redesign/references/modes.md` maps "make it better" to restyle when there is no answer.
Restyle may change: type calibration, colour use, ink steps, spacing, radii, icons, imagery, copy
tone. It may not change: layout, navigation, IA, flows, URLs. Anything structural is written up as
*proposed*, not built.

## The five questions (owner unavailable; defaults used, decided here)

| Question | Answer used | Source |
| --- | --- | --- |
| 1. What prompted this? | A feeling: "make it better". No complaint or metric. | Brief |
| 2. Who uses it, how often? | First-time visitors: recruiters, clients, other developers, reading once. No relearning cost for daily users. | Assumed (portfolio) |
| 3. What must not move? | Palette, fonts, logo (name + orange period), stated in the brief. Plus everything in "Must survive" below. | Brief + assumed |
| 4. Tighten the current look, or replace it? | Tighten: keep the look, recalibrate the relationships. | Default for restyle |
| 5. Palette: brand hues only, or every value? | Every existing colour value is kept (all 8 theme tokens). No new hue and no new hex. Freedom is in *where* each value is used (roles), and alpha steps of existing values. | Assumed, stricter reading of "keep the palette" |

Other assumptions: the page stays dark (it is dark now and the palette is a dark palette); content
stays word-for-word except label casing and meta separators (no projects, clients or numbers added).

## Must survive

- **Logo:** "Leandro Canela" set in Geist 500 with the period in `signal` `#ec7044`, in the hero
  display and as the wordmark in the bar.
- **Palette (all values):** paper `#0f0e0c`, card `#171613`, deep `#1a1915`, ink `#ece8df`,
  ondeep `#ece8df`, muted `#a39e93`, line `#2b2925`, signal `#ec7044`.
- **Faces:** Geist (variable, 300–700), Geist Mono 400/500, Newsreader roman + italic. All three
  stay in use.
- **Routes and anchors:** `#top`, `#work`, `#about`, `#contact`, `#humannova`, `#icex`,
  `#reskillia`, `#cpu-city`, `#tomate`, `#db-doctor`, `#stastarat`; `Leandro-Canela-CV.pdf`; every
  external link (Reskillia, ICEX, CPU City, Tomate, db-doctor, stastarat.com, GitHub, GitLab).
- **Navigation labels:** Work, About, Contact, CV; footer: Work list, Elsewhere, Colophon, Back to
  top; "Skip to work" link.
- **Copy voice:** first person, plain, specific ("what happens when something fails"); the serif
  italic aside in the hero, the work heading and the contact heading.
- **Signature interactions:** project rows as `<details>` that open in place (and open from a hash
  link); the screenshot that follows the cursor over the index on fine pointers; the copy-email
  button with its "Copied" state and live region; the live Barcelona clock (hero + colophon);
  underline-grow link hover; the `+` that turns into `×`.
- **Accessibility it already gets right:** skip link; `:focus-visible` ring in signal; 44px targets
  in the bar and footer on touch; reduced-motion block; alt text on every screenshot; text contrast
  (ink 15.8:1, muted 7.2:1 on paper); `lang`, landmarks, one h1.

## Baseline (before, measured 2026-11-04)

Pinned copy: `design/before/` (index.html, src.css, styles.css, tailwind.config.js, assets, fonts).

- probe `--check` at 1440 / 390 / 360: **0 errors**. Warnings: 3 families carry text; 43 small
  uppercase labels; mono carries 8–9% of text; 282 KB of fonts; one 51ms long task (1440);
  touch targets "CV" 46×36 and "Email" 35×44 (390, 360).
- lint: 0 errors; WARN slow UI motion (>400ms, 6 places), 105 arbitrary Tailwind values, 44 mono
  labels, first image lazy.
- inventory (1440): 13 colours (12 clusters, 6 text colours), **14 font sizes**, 2 weights,
  3 families, 12 line heights, 2 radii, 1 shadow, **22 spacings**; near-duplicate grounds
  `#1a1915` ≈ `#171613`.
- parity: 27 links, 6 headings, 0 forms, 6 controls.
- Inks on paper: ink 15.78:1, muted 7.23:1, signal 6.40:1, ondeep/60 on deep 5.88:1; line
  1.33:1; outline-button border (ink/25) 1.99:1.

## Diagnosis and scope

Full diagnosis: `design/diagnosis.md` (separate-pass critic, one evaluator). Scope chosen by the
skill's default (owner unavailable): the top findings by leverage at the least disruptive layer,
all surface or fix: **F1** label voice, **F2 + F7** defects, **F3 + F6** colour roles, **F4** type
scale, **F5** spacing. **F8** (pictures in the desktop index) and **F9** (About/Contact in the phone
bar) are structural and only *proposed*.

## Reference calibration (free axes only)

No loved sites given, so two library profiles (`<taste>/library/`):
- **linear-app** (dark): borrow mono *only where something is code or an identifier*, hierarchy by
  ink before size, a small spacing vocabulary with one big jump. Leave its palette, pills, gradients.
- **emilkowal-ski** (portfolio): borrow section labels as plain words with space doing the
  sectioning, and gaps that jump (16 → 64 → 128). Leave the emptiness: B4 showed a sparse page reads
  thin for a less-known developer, and this page is rich; it stays rich.

## Directions on the free axes (label voice, colour roles, scale, rhythm)

| Direction | Likely for any brief |
| --- | --- |
| A. Sentence-case Geist 14px labels, mono kept for data | 0.6 (discarded) |
| B. Keep mono labels, drop the caps and tracking | 0.35 (discarded) |
| C. No labels at all; space and headings carry the sections | 0.3 |
| D. The serif aside becomes the label voice: Newsreader italic for section labels, Geist for UI, Mono only for data | 0.1 |
| E. Labels as routes/identifiers in mono (`/work`, `/about`) | 0.25 |

Picked **D**: it carries the page's own material (the italic aside that already names the invisible
things) and gives each kept face one role. C would lose wayfinding in the long work section; E is the
dev-portfolio costume again.

**Idea sentence:** On this page, **the almost-invisible layer underneath** becomes **a quiet
second voice**: Newsreader italic for every aside and section label, Geist for what you read and
press, Geist Mono only for real data (years, stacks, the clock, schema words).
Competitor test: another developer's portfolio could use three faces, but not the copy that the
italic voice is made of ("the data model, the permissions … what happens when something fails").

## Before | After | Why

Constants (fixed, not in this table): logo, all 8 colour values, the three faces, routes, labels,
copy, signature interactions.

| Axis | Before (measured) | After | Why |
| --- | --- | --- | --- |
| Section labels | Geist Mono 12px, uppercase, +0.08em, muted (Selected work, Smaller tools, About, Contact, footer heads) | Newsreader italic 20px (1.25rem), sentence case, tracking −0.005em, muted (ondeep/60 on deep) | F1; direction D |
| Detail labels (`dt` Role/When/Stack/Outcome/Kept…) | Geist Mono 12px uppercase +0.06em | Geist 14px muted, sentence case, tracking 0 | F1: UI text in the UI face |
| Hero meta | mono 12px caps, `A · B` string, pulsing signal dot | Geist 14px muted "Full-stack, backend-weighted"  · "Barcelona" + clock in Geist Mono 14px ink, tabular; no dot | F1, F3 |
| Strip labels | "01 / schema" mono 12px | `schema` / `access` / `failure` mono 12px (identifiers, no numbering) | F1: mono = identifiers; not a sequence |
| Mono kept for | 62 nodes (8–9% of text) | years, stacks, clock, strip identifiers, SQL thumb, the `+` | linear-app: mono only for code/IDs |
| Footer bottom row | mono 12px | Geist 14px ondeep/60 | F1 |
| Signal `#ec7044` uses | logo period, pulse dot, Backend + Data heads, actions' hover, contact arrow, copy check, focus, selection | logo period (hero **and** bar wordmark **and** footer name), actions' hover, contact arrow, copy check, focus, selection | F3: colour on the mark and on actions only |
| Skill heads | Backend, Data in signal; Frontend, Tools in muted | Backend, Data in ink; Frontend, Tools in muted (ink order encodes "backend-weighted") | F3: meaning by ink, not hue |
| CV pill | filled ink, 13px | outlined (ink/25 border → ink on hover), 14px, same place, same 36px + 44px hit area | F6: one filled light pill on the first screen; the code comment's "sit quietly" |
| Running text | 14 / 15 / 16px for the same role | 16px everywhere (index descriptions, strip copy, detail lists, tools) | F4 |
| Meta / UI text | 13, 14px | 14px | F4 |
| Statements (serif) | hero 35.2px, about 33.6px | one size: 1.65rem → 2.2rem (35.2px) for both | F4: near-duplicate |
| Email (contact) | clamp(1.05rem, 3.2vw, 2rem) = 32px | clamp(1.05rem, 3.2vw, 1.75rem) = 28px, same as project names | F4: one fewer size |
| Plus glyph | 18px | 16px | F4 |
| Size count | 14 | 9 (12, 14, 16, 20, 28, 35.2, 57.6, 96, 109.4) + none other | F4 |
| Section tops | 128 / 144 / 160 / 160 (desktop); 96 / 112 / 112 (phone) | 160 between sections (pt/mt-40), 128 for the tools sub-group inside Work (mt-32); phone 112 / 96 | F5: between > inside, one value per level |
| Contact → footer | ~180px dead band (pb-10 + pt-28) | 96px (pb-0 + pt-24); phone 64px | F5 |
| Footer touch | "Email" 35×44 | min-width 44px on touch | F7 |
| Dead motion | `.reveal` (.8s), `.shot` (.9s) rules and observer, used by nothing; `.pulse` infinite | removed | F7, lint slow-ui-motion |

Unchanged on purpose: grounds and their roles, ink and muted values, radii (pill for actions, 8px
screenshots, 4px thumbs), layout grid, every transition still in use.

## Cost lines

- No new effect is added. Removed: one infinite opacity animation (composite) and an
  IntersectionObserver with no targets.
- Newsreader italic is already loaded (it carried the asides), so the label change adds 0 bytes.
- Hover states unchanged: link underline is `background-size` (paint, 350ms, small areas), arrow
  nudge and `+` rotation are `transform` (composite).

## Warnings kept, with reasons

- **3 families carry text; 282 KB of fonts:** fixed by the brief ("keep the fonts").
- **Monospace outside code:** what remains is data (years, stacks, the clock, schema words).
- **First image lazy:** the first `<img>` is a phone-only thumbnail below the fold; there is no hero
  image (the hero is type).
- **"CV" 46×36 on phones:** the pill keeps its 36px look; its `::after` extends the hit area to
  54×44, which the probe cannot measure.
- **Arbitrary Tailwind values:** the existing project convention; new values are in the table above.

## Build log (reversible slices; no git in this run, so each slice is a snapshot in `design/slices/`)

1. `1-tokens`: size tokens in `tailwind.config.js` mapped to the current values (micro 12, ui 13,
   small 14, body-sm 15, body 16) replacing `text-[Npx]`. `shoot --ref` against the before: no
   visible change (the only pixel diffs are the same 1px font-load jitter a before-vs-before shoot
   shows).
2. `2-defects`: tools grid order (`sm:row-start-auto`), footer links `min-width: 44px` on touch,
   dead `.reveal` / `.shot` CSS and observer removed.
3. `3-colour`: pulse dot removed; period added to the bar wordmark and footer name
   (`aria-hidden`, and `aria-label="Leandro Canela"` on the wordmark link so its name is
   unchanged); CV pill outlined; Backend/Data heads in ink instead of signal.
4. `4-type`: label voice (Newsreader italic `text-label` for section labels; Geist 14px for detail
   labels, hero meta, footer row; mono only for data); 15 → 16 for running text, 13 → 14, 18 → 16,
   about statement = hero statement size, email 32 → 28px; tools rows baseline-aligned. Tokens
   now: micro 12, small 14, body 16, label 20.
5. `5-spacing`: section tops 160 (work, about, contact), tools sub-group 128, contact → footer
   96px; transition durations written in ms (the lint read `.3s` as `3s`).

## Gate (stage 6), after vs before

- probe `--check` 1440 / 390 / 360: **0 errors** (baseline 0). Warnings down from 5 to 1–2: fonts
  (fixed by the brief) and "CV" 49×36 (hit area 57×44 via `::after`, justified above). The
  43 uppercase labels, mono share and the 3-families-carry-text warnings are gone.
- lint: 0 errors; 3 WARN (mono for data, 21 arbitrary values down from 105, phone-only lazy thumb),
  all justified above. slow-ui-motion gone.
- `compare.mjs`: **no regressions**. Distinct sizes 14 → 9; sizes over 3% 5 → 3; Geist Mono under
  3% of text (still used for data); contrast failures 0 → 0; overflow none; LCP 316 → 156ms;
  CLS 0.001 → 0.
- `parity.mjs --against`: **0 errors, 0 warnings, 0 notes**. Every link, name, heading, landmark
  and control is unchanged. Sign-off list: empty.
- inventory: font sizes 14 → 9; spacings 22 → 21; arbitrary Tailwind values 31 → 21 kinds
  (105 → 21 places).

## Look (stage 7)

`design/shots/r1/` (page-* = after, ref-* = before). Critic in before mode as a separate pass:
`design/critic-r1.md`. Verdict **new**; no P0, so one round. Remaining P2s: the italic voice
twice in the Work header; "Full-stack · Humannova" keeps its middot; skill-head ink difference is
subtle; the wordmark period is small.

## What moved and where (note for visitors)

Nothing moved. Every section, link and button is where it was. Labels are now plain words instead
of small capitals, the CV button is outlined instead of filled, and the "Smaller tools" rows read
name, description, stack from left to right.

## Proposed, not built (needs the owner)

- **F8:** show a small screenshot in each work row on desktop too (the phone already does), or
  open the first row by default, so the first look at the work includes a picture. Realign; ship
  behind a preview first.
- **F9:** show About and Contact in the phone bar (tighter gaps fit them at 390). Navigation change.
- Copy: "Full-stack · Humannova" → "Full-stack, Humannova", for one separator style.

## Rollout

Token-only restyle plus two defect fixes: ship directly. Watch in the first weeks: CV PDF clicks
(the pill is quieter now) against "Get in touch" clicks; if CV clicks drop noticeably, return the
pill to filled.
