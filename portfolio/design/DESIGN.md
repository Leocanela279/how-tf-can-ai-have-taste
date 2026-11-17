# DESIGN.md — the note, with a page per project

## 0. Mode

**Redesign** (second pass). The owner reviewed the first section-cut direction and asked for the
other approach: "not adding pictures, only the projects name … a link to another page inside my
portfolio with each project description … the main page the simple the better … everything is
uniform and homogenous when we talk about text size and weight."

The section cut is archived in `design/archive/section-cut.md`. This document describes what
ships now: the text-first note, the four project pages, and the page transitions between them.

## 1. Brief

**The owner's taste, verbatim (2026-11-17).** "i like the other approach of not adding pictures,
only the projects name maybe we can add a link to another page inside my portfolio with each
project description, and each projects has its own page description, but the main page the
simple the better, also i like the other portfolio's approach on text styling, everything is
uniform and homogenous when we talk about text size and weight." Then: "id like better page
transitions, now it looks so robust and off."

**Subject, audience, job.** Leandro Canela, full-stack developer in Barcelona, backend-weighted,
at Humannova, studying computer science. Audience: recruiters and developers, often on a phone.
Job: **read** the note, then open the one project that matters. One action beyond reading: write
to him.

**Mode of use.** Both. The note is the same composition at 390 and 1440: a 560px text column
with a 160px label gutter on desktop, one column on a phone.

**Inventory.** The four projects and their real details: DigComp 2.2, seven competences, a
target level, a radar and a PDF; versioned questionnaires, every consent stored with its version
and date, row-level security, AES-256-GCM, local OCR; Tomate's 25–90 minute sessions, the menu
bar, Focus through Shortcuts, and time stored as dates so a sleeping Mac doesn't lose the
session; the Taste skill, its two modes and its probe/shoot/lint/inventory/compare/parity scripts;
Club Stas Tarat's six sections, weekly schedule, event calendar, game library, members' area,
Google APIs, PDF and QR generation, a club of about a hundred members.

**Must survive.** Name, role, Barcelona, the orange period, the four project names, the four
external project URLs, the email, GitHub, the live Barcelona time, both themes, the no-photo /
no-tracker stance, the copy voice. The project links now go to internal pages first; the external
links live on those pages.

## 2. Reference

**The B5 note / emilkowal.ski** (`skills/taste/library/emilkowal-ski`): one size carries almost all
the text, two weights (400/500), a warm near-black on warm off-white, a 560px column with a
160px gutter, and gaps that step 64 → 128. The owner explicitly asks for this calibration:
**one 16px size, two weights, two inks, one accent**. The earlier section cut's 128px name and
five drawings are the anti-reference for this pass.

**The project pages** use the same note, not a second design system. The only new content
pattern is the project page: Project → Underneath → Links.

## 3. Structure

| URL | What |
| --- | --- |
| `/` | Name and role, Today, the four project names, Contact |
| `/work/reskillia/` | Reskillia: 2026, the description, Underneath, links |
| `/work/tomate/` | Tomate: 2026, the description, Underneath, links |
| `/work/taste/` | Taste: 2026, the description, Underneath, links |
| `/work/club-stas-tarat/` | Club Stas Tarat: 2025, the description, Underneath, links |
| `/404.html` | Not found, in the same note |

The index only carries names. The year, role, stack, description, "Underneath" details and the
live link are on the project page. Every project page has "← All work", "Next: …", the external
link and the email.

## 4. Token plan

- **One family.** Geist, variable, 400–500, self-hosted WOFF2, preloaded. Geist Mono is gone.
- **One size.** 16px for every text node on every page. No display, no 14px meta. Hierarchy is
  ink, weight and space, as in the reference. This is the point of the brief; the probe's "no
  decisive size jump" WARN is expected and is the design.
- **Two weights.** 400 for prose, 500 for names, section labels, the project title, the meta
  labels and the "Underneath"/"Links" labels.
- **Two inks.** `#21201C` / `#63635E` on `#FAFAF8` in light (15.6:1 / 5.8:1); `#ECE8DF` /
  `#A39E93` on `#0F0E0C` in dark (15.8:1 / 7.2:1). One accent: `#D4572A` light (3.9:1, non-text
  only) / `#EC7044` dark (6.4:1) on the period, hover underlines and focus. No accent text.
- **Spacing.** 4, 8, 16, 24, 64, 128. Inside an item 8; between sections 64 on a phone and 128 on
  desktop; the project rows 44px tall with 8px between.
- **Layout.** 560px column + 160px label gutter, max 768px, centred. The phone is one 342–350px
  column, no gutter. The project pages use the same two-column grid: labels in the gutter,
  content in the column.
- **Shape.** Square. No cards, borders, shadows, radii. Icons are 16px marks in 44px targets.
- **Images.** None. No work screenshots, no drawings, no decorative SVG. The only SVGs are the
  GitHub mark, the theme mark and the favicon; the OG card is text.

## 5. Page transitions

The site is five static pages, so the transition is **cross-document View Transitions**:

- `@view-transition { navigation: auto; }` on every page. The browser snapshots the old and new
  pages and animates the change; no router, no fetch, no JS.
- `view-transition-name: site-header` on the header. The header stays put across the navigation.
- The project name is a **shared element**: the index `<span data-project="reskillia">` and the
  project page `<h1 data-project="reskillia">` share `view-transition-name: project-reskillia`
  (and the other three). Clicking a name **morphs it into the page title**; "All work" morphs it
  back to the list. Next/previous project cross-fades because the names differ.
- The rest of the page uses the browser's own cross-fade; the named header and title sit
  outside it. The custom root fade was removed because it collided with the theme reveal.
- **Theme toggle:** the reveal is same-document. A `theme-transition` class turns off the shared
  names, gives the old root a 360ms `theme-hold` and the new root a 360ms `theme-reveal` using
  `--theme-x` / `--theme-y` / `--theme-r` from the button, and stays until the transition
  finishes. Both root images need a real animation: `animation: none` on both makes Chrome
  consider the transition finished instantly, remove the class and fall back to the default
  cross-fade (the glitch this replaced).
- **Reduced motion:** the theme switch is instant (`reduce.matches`); all view-transition
  animations are reduced to 0.01ms. Nothing moves.
- **Fallback:** browsers without cross-document View Transitions navigate normally; the site
  remains complete. No JS is needed for navigation.

Cost: the browser captures snapshots (compositor), the name morph is a transform/opacity
animation on one element, the page navigation uses the browser cross-fade, and the theme reveal
is a 360ms `clip-path` on the new snapshot. No layout, no scroll listeners, no router.
The pages are static and cached; the only script is `site.js` for the clock and the theme.

## 6. Before | After | Why

| Before | After | Why |
| --- | --- | --- |
| The section cut: 128px name, 5 drawings, 4.5 screens | The note: 16px, no pictures, 1.1 screens | The owner asked for the other approach; the main page is the note |
| Four project descriptions inside the index | Four names on the index, one page per project | The index stays simple; the detail gets a URL |
| Five type sizes (128/72/40/28/17/16/14) | One size, two weights | Uniform text, the reference's calibration |
| No page transitions | Cross-document header + title morph + browser cross-fade | The owner asked for better transitions |
| Project links went straight to external sites | Names go to `/work/<slug>/`; external links on the page | The requested content model; sign-off on the parity change |

## 7. Gates and sign-off

- `probe --check`: **0 errors** at 1440 / 390 / 360 on `/` and on `/work/reskillia/` (and spot
  checks on the other project pages). One WARN, the uniform 16px size, is the design.
- Light-theme audit: 0 contrast failures, 0 targets under 24px, 0 text under 12px, no overflow.
- `lint`: 0 errors, 1 warning. The warning asks for an `@supports` wrapper around the
  cross-document rule; wrapping `@view-transition` in `@supports` makes Chrome ignore the rule,
  so the top-level rule is the correct progressive enhancement. Browsers without cross-document
  transitions (Firefox) ignore it and navigate normally.
- `compare` against the B5: no regressions; the single size, the same 1.1-screen page, CLS 0,
  fonts 29KB.
- `parity`: 4 ERRORs — the four external project links are no longer on the index; they are on
  the project pages. That is the requested structure. The owner must sign this off. The project
  pages carry the original URLs.
- The project pages are new URLs; their headings and links are additive.

**Owner's verdict.** Pending.
