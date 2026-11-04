# DESIGN.md — portfolio, minimal (b5)

## 1. Brief

**The owner's taste (verbatim, 2026-11-04):** "a very minimalistic portfolio, use
https://emilkowal.ski as the reference, do not use photos to show my work, only links, and use
reskillia.humannova.com, usetomate.com and stastarat.com, that's it."

From earlier sessions: prefers dark (B4 follow-up); loved sites include emilkowal.ski, vercel.com,
linear.app, apple.com (`skills/taste/library/README.md`).

**Subject, audience, job.** Leandro Canela, full-stack developer in Barcelona, backend-weighted, at
Humannova, studying computer science. Audience: recruiters and developers, first look usually on a
phone from a LinkedIn or email link. Job: **read** (who he is, what he built), one action: open a
project or write to him.

**Mode.** Both. A text page composes the same on both widths; the desktop gets a label gutter.

**Inventory.** Barcelona and its time zone; the backend habit of storing time as dates (Tomate keeps
time "as dates, not a countdown, so it stays exact when the Mac sleeps"); data model, permissions,
failure; the orange period after his name (`#EC7044`, from the current site); Terrassa's 40-year-old
board game club; DigComp 2.2; Humannova.

**Real content.**
- Leandro Canela — Full-stack developer
- Today: Working at Humannova and studying computer science. I spend most of my time on the part
  people don't see: how the data is shaped, who is allowed to touch it, and what happens when
  something fails.
- Projects (2026, 2026, 2025):
  - Reskillia → https://reskillia.humannova.com — Measures a team's digital skills against DigComp 2.2.
  - Tomate → https://usetomate.com — A macOS timer for 25 to 90 minute study sessions.
  - Club Stas Tarat → https://stastarat.com — Website for a 40-year-old board game club in Terrassa.
- Contact: email, GitHub, CV (PDF).

## 2. Reference

`skills/taste/library/emilkowal-ski` (measured 2026-10-29, 1440 and 390).
- **Borrow:** one size (16px carries 93% of text, 14px the rest), weights 400 → 500 only, a warm
  near-black ink `#21201C` with a grey `#63635E` on `#F9F9F8`, gaps stepping 16 → 64 → 128, a
  ~640px reading column, sections marked only by a 16px medium label and space, projects as
  name + one line.
- **Leave:** his words, his banner, his "More" sentence. The emptiness is acceptable here only
  because the owner asked for it and the projects are live links with their own weight.

## 3. Directions

Skeleton (fixed): name and role, a short "today" paragraph, projects, contact.

| # | Direction | Likely for any brief |
| --- | --- | --- |
| 1 | Emil, as is: one column, one size, no accent | 90% |
| 2 | Emil with section labels in a left gutter on desktop | 60% |
| 3 | A live Barcelona clock beside the name, the only moving thing | 40% |
| 4 | The orange period as the single accent, carried into link underlines | 50% |
| 5 | Projects as dated lines, the year in a quiet column | 35% |

Dropped 1 and 2 (most likely). Chose **3 + 5 as one idea**, because both come from the same
inventory item: time kept as dates.

> On this page, **a backend developer's habit of exact timestamps** becomes **the only ornament:
> a year beside each project and the live time in Barcelona**.

Competitor test: "a designer's habit of exact timestamps" does not hold; the line comes from his
Tomate note and his backend work. Keeps.

The orange period stays (4, in its smallest form) because it is already his mark.

## 4. Token plan

Overrides from the reference: one font size for nearly everything (ratio 1), so the probe's "no
decisive size jump" WARN is expected and justified by the reference and the owner. The skill's
"desktop uses the width" rule is met by the label gutter, not by widening the text.

- **Grounds:** light `#FAFAF8`; dark `#0F0E0C` (his B4 dark ground). Follows the system setting
  (`prefers-color-scheme`), light by default: dark text on light reads best, and dark is there for
  the owner and anyone who asks for it. No surfaces, no borders, no cards.
- **Inks:** light `#21201C` (15.6:1) and `#63635E` (5.8:1). Dark `#ECE8DF` (15.8:1) and `#A39E93`
  (7.2:1). As in the reference: the name, section labels, project names and links use the first
  ink; running text, descriptions, years and the clock the second.
- **Accent:** `#EC7044` (dark, 6.4:1) / `#D4572A` (light, 3.9:1: non-text only), only on the period after the name and the link
  underline on hover. Never on text.
- **Type:** Geist only (variable, self-hosted WOFF2), 400 and 500. Not the reference's face: Geist
  is the owner's current face and comes from vercel.com, one of his loved sites; Emil's calibration
  (one size, two weights, two inks) is what is borrowed.
  - 16px for everything, line-height 1.6. 14px for the years and the clock, `tabular-nums`.
  - Phone: the same 16px (meets the 16px floor). Lines ≈ 40–60 characters at 390.
  - Name 16px/500; section labels 16px/500; descriptions 16px/400 second ink.
- **Spacing:** 4, 8, 16, 24, 64, 128. Inside an item 4; between items 24; between sections 128
  (64 on phones); top of page 128 (64 on phones). Name and role at line-height 1.25 so they read as
  one unit.
- **Layout:** a 560px text column. At ≥ 960px a 160px label gutter sits to its left (labels in the
  gutter, content in the column), total 720px, centred. Below that, labels sit above content.
- **Radii:** none.
- **Boldness:** spent once, on restraint itself: nothing on the page but text, so the live clock
  and the orange period are the only marks.
- **Interaction:** project rows are whole-row links (≥ 48px tall); underline offset 4px in the second
  ink, turning accent on hover and focus; `:focus-visible` 2px accent outline.

**Cost lines.**
- Clock: a text node updated every 15s by a tiny deferred inline script at the end of `<body>`.
  Composite only; no layout shift (fixed-width `tabular-nums`, space reserved).
- Underline colour transition: 150ms, paint only on one element.
- Fonts: one WOFF2 (29KB), preloaded. No images. Plain CSS, no build step.

## Critique log

**Round 1** (`shots/r1`). P0: focal point split, inks reversed against the reference (prose in the
first ink outweighed the name). P1: section gap 64 against the reference's 128. P2: role and city
repeated in the Today line; one-word orphans in phone descriptions; CV link text "here"; Geist not
justified. Fixed in round 2: the P0, the P1, the CV link text, and the Geist note.

**Round 2** (`shots/r2`), pairwise: new kept; the name now leads, as in the reference. Regression:
Contact fell below the fold at 1024×768. Open P2s: repeated role and city, phone orphans.

**Round 3** (`shots/r3`): Today line no longer repeats the role or city; `text-wrap: pretty` on
running text; section gap and top padding `clamp(64px, 14vh, 128px)` on desktop, so tall screens keep
the reference's 128 and 768px screens keep Contact on the first screen.

**Owner request (2026-11-04): a light/dark switch.** A 16px half-filled circle beside the clock,
in a 44px target. The choice is stored in `localStorage` and applied by a one-line inline script
in `<head>` before first paint (no flash); with nothing stored, the system setting decides.
Switching runs a same-document View Transition: the new theme grows as a circle from the button
(`clip-path` on `::view-transition-new(root)`, 450ms, ease-out `cubic-bezier(.2, .7, .2, 1)`).
Cost: one compositor animation over two snapshots, no layout. Fallback: an instant switch when
the browser has no View Transitions or the visitor asks for reduced motion. The icon turns 180°
with the theme.

**Owner request (2026-11-04): icons, then less.** The CV is gone from the site (link and file).
GitHub became an icon-only link in the header, beside the theme button: the same 16px mark size in
a 44px target, `aria-label="GitHub"`, in the second ink, turning first ink on hover. Contact is the
email alone. On phones (< 600px) the Barcelona time moves under the role so the name and role
never wrap; from 600px it sits in the header row, 28px from the icons, the same gap as between them.
