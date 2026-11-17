> **Archived 2026-11-17.** The section-cut direction. The owner reviewed it and asked to go
> back to the note: no pictures, project names only, a page per project, and uniform text.
> The current plan is `design/DESIGN.md`.

# DESIGN.md — leo-dev.es, the section cut

## 0. Mode

**Redesign** (explicit request: "redesign it … I want something unique and to differentiate
mine against emil's portfolio"). Navigation, templates and content model may change. Brand
constants stay unless the user frees them.

The request: the current site is the B5 minimal build made with `taste` and
`emilkowal.ski` as its reference — same 16px hierarchy, same narrow column, same quiet
sections. It is clean, but it is a copy of a known surface. The owner wants **minimal and
clean, but his own**.

## 1. Ground the brief

**The owner's taste, in his own words.**
- Current request (2026-11-17): "redesign it because i took emil kowalski's portfolio and
  took a lot of inspiration of a minimalistic and clean design, but i want something unique
  and to differentiate mine against emil's portfolio."
- Earlier, recorded in `skills/taste/library/README.md` and the B4/B5 runs: loved sites are
  emilkowal.ski, vercel.com, linear.app and apple.com; prefers dark; liked mono labels,
  serif italic accents and a warm orange accent in B4; later asked for a very minimal,
  links-only portfolio in B5.
- This redesign keeps the *restraint* he asked for and drops the *imitation*. It does not
  restore B4's density or its dark-only palette.

**Subject, audience, job.** Leandro Canela, full-stack developer in Barcelona, backend-
weighted, at Humannova, studying computer science. Audience: recruiters and developers,
often first seen on a phone from a LinkedIn or email link. Job: **read** — who he is, what
he built — and take one action: open a project or write to him.

**Mode of use.** Both. Desktop leads the composition; the phone is a complete, single-column
edition, not a squeezed desktop.

**The subject's material (inventory).** The part people don't see: data models, permissions
and failure. Humannova. DigComp 2.2 and its five areas / eight levels. Versioned
questionnaires; drafts migrated between versions; every consent stored with the version and
date it was shown. Row-level security in PostgreSQL; AES-256-GCM. A Mac that sleeps
mid-session; Tomate stores the end as a date, not a countdown. Scanned CVs that need OCR; a
query that quietly turns into N+1. A board-game club in Terrassa that has run for forty
years. Barcelona and its time. Geist, and the taste skill's own calibration: measured
references, an ink staircase, one accent, a written token plan.

**Must survive.**
- Name: Leandro Canela. Role: full-stack developer. Barcelona.
- The orange period / accent (`#EC7044` dark, `#D4572A` light in the current build).
- Links: Reskillia → reskillia.humannova.com, Tomate → usetomate.com, Taste →
  github.com/Leocanela279/how-tf-can-ai-have-taste, Club Stas Tarat → stastarat.com.
- Email leandrocanela279@gmail.com and GitHub github.com/Leocanela279.
- Light and dark themes, following the system until the visitor chooses; the choice
  persists; reduced motion is respected.
- The live Barcelona time, the four projects and their one-line descriptions, the copy
  voice (first person, concrete, no adjectives).
- Routes: `/` and `/404`. No analytics, no cookie banner, no images of the work (the B5
  brief: links only).
- What the current page gets right: WCAG AA in both themes, 44px targets, no CLS, no
  layout shift, one request and ~50KB of assets.

**Real content.** All copy below is from the live site or the owner's earlier portfolio
(B4), which recorded the real project details. Product figures are **illustrations** and say
so; no invented customers, quotes, metrics or dates. The only new number is the
illustrative radar shape, labelled as an illustration.

## 2. Reference

The before is the reference for *what not to be*: emilkowal.ski's measured profile (one 16px
size, 400/500, one 640px column, 16/64/128 gaps, no visual). We keep its **warm paper, two-ink
discipline and quietness**; we leave its **scale, column, section markers and absence of a
visual**.

Two measured profiles supply the new calibration:
- **vercel.com** (`skills/taste/library/vercel-com`): display at weight 400–500 with hard
  negative tracking (−0.04 to −0.06em), greyscale plus one mark, a full-width hero with no
  cards. *Borrow:* the display scale and tracking, the confidence of a large name.
  *Leave:* the centred product-marketing skeleton and the 14px body.
- **libraries.dev** (`skills/taste/library/libraries-dev`): grey chrome, colour only inside
  the work, nested frames, real objects as the hero. *Borrow:* the monochrome shell with
  orange confined to the drawings, and the technical-plate framing. *Leave:* the dark
  catalogue, the 13px body, the cards.

## 3. Directions

Skeleton (fixed, typical for a portfolio): name and role → the work → about → contact.

| # | Direction | Likely for any brief |
| --- | --- | --- |
| 1 | Emil again, with an orange accent and a bigger name | 80% |
| 2 | Dark editorial: serif display, mono labels, warm orange (B4 redux) | 65% |
| 3 | Projects as an interactive table with filters and an inspector panel | 45% |
| 4 | **A technical section cut: the page drawn like an engineering plate, with one diagram per project** | **20%** |
| 5 | A field notebook: marginal annotations, handwritten-feeling notes | 30% |

Dropped 1 and 2 (most likely, and 2 is a past build). 3 is a different kind of page (operate,
not read). 5 is charming but fragile and less legible. Chose **4**, because it carries the one
thing only this subject has:

> On this page, **the invisible layer of a web product — the data model, the permissions, the
> failure path — becomes the drawing system**: one section cut in the hero, one small plate
> per project, all in the same 1px language.

Competitor test: "a design engineer's invisible layer" does not hold; a frontend/motion
portfolio has no permissions or failure path to draw. It is his.

The runner-up: the interactive table (3), which would make the work feel like a tool but would
push first-time readers into operating instead of reading.

## 4. Token plan

**Positioning.** Minimal in colour, material and motion; not minimal in scale or content. The
page is a technical sheet, not a note. That is the difference from Emil: **one decisive size
jump, one owned drawing system, a wide asymmetric grid**, where he has one size, no drawing
and a narrow column.

**Grounds** (one tinted neutral, two steps):
- Light page `#F6F4EF`; raised plate `#FBFAF6` (ΔL* ≈ 1.4, just enough to separate a figure);
  hairline `rgb(25 24 20 / 0.14)`.
- Dark page `#12110F`; raised `#181714`; hairline `rgb(237 233 224 / 0.16)`.
- Surfaces separate by a 1px hairline and a one-step tone, never a shadow.

**Inks** (light / dark, contrast on the page ground):
- `--ink` `#191814` (16.2:1) / `#EDE9E0` (15.6:1): name, headings, project titles, links.
- `--ink-2` `#5A564D` (6.7:1) / `#A8A298` (7.5:1): running text, descriptions, notes.
- `--ink-3` `#6E6A60` (4.9:1) / `#948F84` (5.9:1): meta text, figure captions, ticks and
  drawing lines. It clears AA at 14px, so it is not decoration-only; hairlines use the
  alpha `--line` instead.
- One accent: light `#C24E26` (4.3:1, large/non-text only) / dark `#EC7044` (6.3:1).
  It appears on the period, the drawings' signal, the question mark, and hover/focus states.
  Nowhere else.

**Type** — Geist only for text, Geist Mono for drawing annotations and code-like values.
- Families: 2. Weights: 400, 500. No 300, no bold.
- Sizes in use: **128 / 72 / 40 / 28 / 17 / 16 / 14**. Five carry more than 3% of the text
  (14, 16, 17, 28, 72); 15 (fact values), 36 (email) and 128 (name) are role-specific and
  below that share.
  - Display 128px, weight 500, leading 0.88, tracking −0.055em (`clamp(3.5rem, 9vw, 8rem)`).
  - Section 72px, 500, 0.95, −0.045em.
  - Project title 40px, 500, 1.0, −0.035em.
  - Lead 28px (21.6px on a phone), 500, 1.16, −0.025em.
  - Body 17px, 400, 1.6, −0.01em, 45–70ch; secondary notes 16px.
  - Meta 14px, 400/500, 1.35; fact values 15px.
  - Mono annotations 14px, 400, +0.01em.
- Phone: display 51.2px at 360–390 (3.0× body), 56px above; section 36px; project 28px;
  body 17px. The longest word fits at 360 (`Leandro`, `Canela.`).

**Figure contrast.** The hero frame is `--ink-3` at 95%, the band edges at 75%, and the
interior grid at 50% `--ink-3` (≈2:1) so it stays secondary. Project plate frames are 60%
`--ink-3`; radar rings 45%. Captions are text and stay at 14px `--ink-3` (4.9:1 light /
5.9:1 dark). The plate top aligns with the eyebrow cap, not its line box.

**Spacing** (7): 4, 8, 16, 24, 40, 64, 96; section gaps 96–128. Inside a project 8–16; between
projects 40; between sections 96.

**Grid.** Page 1280px max, 48px gutters at 1440; 12 columns, 24px gutter. Hero: 7/5 split.
Projects: 120px meta / flexible body / 440px plate. Below 900px: one column, the plate full
width. The phone uses the width for the drawing, not a phone column floating in the middle.

**Shape.** Square. Radius 0 on every surface; only the theme button is a circle (an icon).
Focus: 2px accent outline, 2px offset.

**Boldness.** Spent once: the **scale of the name + the hero section cut**. Everything else
is quiet: hairlines, two inks, one accent.

**Interaction.**
- Project rows: title underline turns accent on hover/focus; the whole row is one stretched
  link (≥ 220px tall on desktop, ≥ 44px on touch).
- Theme: circular reveal from the button (same-document View Transition, 400ms), instant
  under reduced motion. Persisted.
- One signature moment: the hero request path draws itself once (900ms) on first paint.
- No scroll reveals, no parallax, no hover lift.

**Cost lines.**
- Hero plate: inline SVG, ~5KB of markup, no request, no layout shift (fixed aspect ratio);
  the draw animation is `stroke-dashoffset` (paint on one path, once, then no cost). Under
  reduced motion it is fully drawn immediately.
- Project plates: inline SVG/HTML, ~2KB each, no requests; colour transitions are 150ms on
  one property.
- Fonts: Geist variable (29KB) + Geist Mono 400 (9.6KB), WOFF2, preloaded, `font-display:
  swap`, metric-safe fallback.
- Theme switch: clip-path on the View Transition snapshot (compositor); no layout.
- No images in the page, no blur, no scripts before the body except the 1-line theme
  bootstrap.

## 5. Before | After | Why

| Before (measured) | After (planned) | Why |
| --- | --- | --- |
| Name 16px/500; 1 size carries 93% of text | Name 128px/500; five sizes carry the text, one decisive jump | The page must lead with a person, not read like a note; restores a focal point (blur test) |
| 560px column, 160px label gutter, 720px total | 1280px grid, 7/5 hero, 120/1fr/440 project rows | Use the desktop width; differentiate from the note-like column |
| No visual; the only mark is a period | One section cut + one plate per project | Gives the page a memory and carries the subject's invisible layer |
| Projects as name + one line, no detail | Project title + description + one "Underneath" line + plate | Richer without case-study length (B6: the owner did not prefer long case studies) |
| Section labels "Today / Projects / Contact" only | Nav (Work / About / Contact), numbered sections, a fact strip | Recruiters can scan; the page has a visible structure |
| Dark by system only; light palette from B5 | Both themes re-derived from the same tokens; default follows the system | Keep the owner's toggle and comfort, no flash |
| 0 errors / 1 expected WARN | 0 errors, no regression; the size WARN is gone by design | The new hierarchy earns the scale |

**Not changing:** the name, role, orange, four projects and their links, the email, GitHub,
the time, both themes, the no-image/no-tracker stance, and the copy voice.

## 5b. Warnings, and why they stay

The gate is at **0 errors at 1440, 390 and 360**. Two WARNs remain:

- **The bottom 30% of the first screen is "empty" at 390/360.** It is not: the section
  cut fills it. The probe's first-screen check counts text and `<img>` elements, not inline
  SVG, so it cannot see the drawing. The caption is below the fold by design; the drawing
  itself is the content in that band. At 1440 the fact strip also sits in that band, and the
  check passes.
- **`draw-request` animates `stroke-dashoffset` (non-composited).** It runs once for 900ms
  on a single 1.5px path, paints only that path, and finishes before the visitor moves. It
  is the one signature moment the brief earns. Under `prefers-reduced-motion: reduce` it is
  fully drawn from the start.

No other WARNs: contrast, targets, type sizes, mono share, line length, overflow, CLS,
fonts and reduced motion are clean.

## 6. Build order

1. Tokens and page shell; screenshot the first screen at 1440 and 390 until it is right.
2. Hero plate, then the fact strip.
3. Work section with the four plates, one at a time.
4. About and contact; footer.
5. OG image, 404, headers, README.
6. Gates: lint, probe at 1440/390/360, compare against `design/before/profile-1440.json`,
   parity against `design/before/parity.json`.
7. Critic pass on the shots with a fresh context; fix the priority target; shoot `r2`.

## 7. Sample content to confirm

- The four project descriptions are kept verbatim from the live site; the "Underneath" lines
  are condensed from the B4 record. Confirm they are still true.
- The radar and timer plates are illustrations, not live data.
- The Stas Tarat plate is a sitemap of the six sections rather than a forty-year timeline;
  the forty years stay in the copy, because the exact founding year is not on the live site.
