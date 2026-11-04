# Diagnosis (stage 2): before shots

Run as a **separate pass** (no subagent available in this session): `diagnose.md` and
`<taste>/references/critic.md` re-read, the pictures in `design/before/shots/` judged first, the
numbers (inventory, probe, lint, `tells.md`) read second, then each finding verified in
`design/before/index.html`. This is **one evaluator**: structural conclusions are hypotheses.

## 1. The pictures

- **Focal point (blur, 1440):** the name "Leandro Canela." — one focal point. The two light pills
  (CV in the bar, "Get in touch") are the next brightest blobs: two filled light pills on the first
  screen.
- **Competing elements above the fold:** 6 (eyebrow line, name, serif intro, 3-row facts list, two
  buttons, strip peeking in). Acceptable.
- **Typical of its kind:** yes, an unmistakable developer portfolio: nav, name, intro, work index,
  about, contact, footer.
- **5-second read:** a full-stack developer in Barcelona who cares about the backend; actions are
  "Get in touch" and "See the work". Passes.
- **Top tasks:** (1) see the work: one click/tap, rows open in place; (2) contact: email in two
  places, copy button; (3) CV: in the bar. All reachable.
- **What works (must stay):** the display name with the orange period; the serif intro whose
  italic aside names the three invisible things; the year-led project index with in-place detail and
  the cursor-following screenshot; the contact close; the colophon with the live clock.

What looks off in the pictures:

- Small text speaks in three voices: tracked mono capitals ("SELECTED WORK · 2025–2026",
  "ABOUT", "CONTACT", "WORK", "COLOPHON", every Role/When/Stack label), mono lowercase
  ("01 / schema"), and the sans. The mono capitals are on every section and read as the stock
  2025 dev-portfolio label, not as this person's voice.
- Smaller tools (1440 s3): the columns are scrambled. The stack ("Electron · Vue · SQLite") sits
  right-aligned in the first column, the name in the middle, the description pushed to the right
  edge. On the phone the same rows are correct.
- A pulsing orange dot before "Full-stack" signals "live" but nothing is live; it is the only moving
  thing on the first screen and it competes, small but orange, with the period of the logo.
- Skills: "BACKEND" and "DATA" in orange, "FRONTEND" and "TOOLS" in grey: alternating colour that
  reads as decoration; the meaning (backend-weighted) is not explained.
- Contact → footer: one dark field with about 180px of nothing between the email and the footer
  rule (1440 s4).
- The bar wordmark is the name *without* the orange period, so the logo appears in its full form
  only once.

## 2. The numbers

- **Inventory:** 14 font sizes (14px×76, 12px×57, 15px×38, 16px×12 …, 13px×1, 18px×5), 22
  spacings, 12 line heights, 3 families; 6 text colours; near-duplicate grounds `#1a1915` ≈
  `#171613`. Body text is split across 14, 15 and 16px.
- **Probe:** 0 errors. 43 small uppercase labels; mono 8–9% of text; touch targets "CV" 46×36
  (its `::after` extends the hit area to 44px, which the probe cannot see) and footer "Email"
  35×44 on the phone; 282 KB of fonts.
- **Lint:** slow UI motion (>400ms) in 6 places — `.shot` (.9s) and `.reveal` (.8s) rules, and no
  element uses either class (dead CSS + a dead IntersectionObserver script); 105 arbitrary values.
- **Tells present (tells.md, tier 2):** mono for small labels; tracked all-caps eyebrow above every
  heading; `A · B` meta strings; 01 / 02 / 03 numbering on a non-sequence; pulsing "live" dot;
  italic muted aside in three headings; near-black + vermilion. The last two are brand constants or
  copy voice (kept, see below).

## 3. Findings, verified, ranked by leverage

| # | Finding | Where (before) | Layer | Bucket | Severity | Leverage |
| --- | --- | --- | --- | --- | --- | --- |
| F1 | Label voice: 43 tracked mono capitals + "01 / x" numbering make every section open with the stock dev-portfolio eyebrow | index.html:109–111, 141/146/151, 162, 306, 333, 346–358, 369, 399/409/418, 427, all project `dt` (187, 191, 213 …) | surface | subtractive | P1 | high: one class pattern, whole page |
| F2 | Smaller-tools grid scrambled at ≥640px: stack lands in column 1 because `row-start-1` is never reset | index.html:313, 318, 323 (`row-start-1 … sm:col-start-auto` without `sm:row-start-auto`) | fix | corrective | P1 | very high: 3 class edits |
| F3 | Colour on decoration: pulsing signal dot; signal on 2 of 4 skill heads; the logo's period missing from the wordmark while a second orange dot sits above the name | index.html:110, 346, 354, 95 | surface | subtractive + corrective | P2 | high |
| F4 | Type drift: running text at 14/15/16 for the same role; 13px CV label; 18px plus glyph; hero and about statements at 35.2 vs 33.6 (near-duplicate) | inventory; index.html:100, 117, 143, 165, 178, 182, 336 | surface | corrective | P2 | medium |
| F5 | Spacing drift: section tops 128 / 144 / 160 / 160; contact → footer ≈180px dead band | index.html:159, 304, 330, 367–368, 390 | surface | corrective | P2 | medium |
| F6 | Two filled light pills on the first screen (CV in the bar, "Get in touch"); the code comment says the CV pill should "sit quietly" | index.html:100, 130, 42 | surface | corrective | P2 | medium |
| F7 | Footer "Email" link 35px wide on touch; dead motion CSS/JS over 400ms | index.html:414, 27–35, 507–520 | fix / code | corrective + subtractive | P2 | medium |
| F8 | Desktop work index shows no picture of the work until hover (the phone shows thumbnails) | index.html:61, 172 | structure (realign) | additive | proposed | needs evidence |
| F9 | Phone bar hides About (< 640) and Contact (< 400) | index.html:98–99 | structure (navigation) | additive | proposed | needs evidence |

## 4. The three changes that would move the page most

1. **F1: one label voice.** Sentence-case Geist at 14px in muted for every label; Geist Mono kept
   only where the content is code-like (years, stacks, the clock, the strip's `schema / access /
   failure`).
2. **F2 + F7: fix the broken tools grid and the touch/dead-code defects.**
3. **F3 + F6: signal back to its roles** — the logo period (now in the bar too), the action and its
   states; one filled pill per screen.

F4 and F5 (scale and rhythm) are cheap enough to ride along in their own slices.

## Considered but rejected

- **Dropping the serif italic aside in headings** (a tier-2 tell): rejected. It is the copy voice
  and carries the page's idea ("the data model, the permissions, … what happens when something
  fails"). Must survive.
- **Merging `deep` into `card`** (near-duplicate grounds): rejected, palette frozen by the brief.
- **Cutting to two families** (probe WARN): rejected, fonts fixed by the brief.
- **Replacing the three-column strip** (tell: row of three): rejected for restyle — layout. Its copy
  is specific; only its numbering changes.
- **F8, F9:** structural. Proposed for the owner, not built.
