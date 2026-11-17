# History

## 2026-11-17 — redesign: the section cut

**Mode.** Redesign. The owner asked explicitly: "redesign it because i took emil kowalski's
portfolio and took a lot of inspiration of a minimalistic and clean design, but i want
something unique and to differentiate mine against emil's portfolio." Relearning cost is low
(a one-page portfolio, first-time visitors).

**Constants kept.** Name, role, Barcelona, the orange accent, the four project links (Reskillia,
Tomate, Taste, Club Stas Tarat), the email, GitHub, the live Barcelona time, light and dark
themes with the circular reveal, the no-photo / no-tracker stance, and the first-person copy
voice.

**Direction.** The invisible layer made visible: one section cut in the hero (client → policy →
row, with a dashed return path for failure), and one small plate per project — a radar result,
a 90-minute timer that stores the end as a date, a token plate from the Taste skill, and a
sitemap for the club site. Drawn throughout with 1px lines, `--ink-3`, and one accent.

**Reference.** emilkowal.ski was the anti-reference for composition (we kept its warm paper
and two-ink discipline, dropped its 16px column and its absence of a visual). Calibration was
borrowed from vercel.com (display scale and hard tracking) and libraries.dev (grey chrome,
colour only inside the work, nested technical frames). The plates were checked against the
subject's own material, not a moodboard.

**Token summary.** Grounds `#F6F4EF` / `#12110F`, plates `#FBFAF6` / `#181714`. Inks
`#191814`, `#5A564D`, `#6E6A60` light; `#EDE9E0`, `#A8A298`, `#948F84` dark. Accent `#C24E26`
light, `#EC7044` dark. Geist 400/500 + Geist Mono 400. Display 128 / section 72 / project 40 /
lead 28 / body 17 / secondary 16 / meta 14. No radii except the circular icon button.

**Before → after.** The before was the B5 minimal build: 16px name, one 560px column, no
visual, 0 errors / 1 expected size WARN. The after is 128px name, a 1280px asymmetric grid,
five inline drawings, a nav and a fact strip, and **0 errors at 1440 / 390 / 360**. The before
profile and screenshots are in `design/before/`; the section-cut shots are in the git history,
and the plan is archived in `design/archive/section-cut.md`.

**Warnings that stay.** (1) The 390/360 first-screen check calls the bottom band empty because
it cannot see inline SVG; the section cut is there. (2) The one-time `stroke-dashoffset` draw
is a paint on one path, 900ms, disabled under reduced motion. Both are written up in
`design/archive/section-cut.md` §5b.

**Gates.** `lint` 0 errors (1 warning: the one-time 900ms path draw). `probe --check` 0 errors at
1440 / 390 / 360 in the system (dark) theme; a separate light-theme audit reports 0 contrast
failures, 0 targets under 24px, 0 text under 12px and no overflow at 1440 / 390 / 360. `compare`
reports no regressions: contrast 0→0, targets 0→0, CLS 0→0, overflow false, LCP 556→768ms, fonts
29→39KB. `parity` 0 errors, 4 warnings, 11 notes.

**Parity sign-off list.**
- The four project links keep the same URLs but their text is now the project name alone
  ("Reskillia", "Tomate", "Taste", "Club Stas Tarat"); the year and description are adjacent in
  the same article. The old whole-row link text was a run-on of all three.
- The h1 is "Leandro Canela" (the orange period is now a drawn mark, kept out of the heading
  text), and the old h2 labels "Today", "Projects" and "Contact" are now the hero paragraph,
  "Selected work", and the contact question. The content and the `Contact` nav label remain.
- New links: skip link, brand, Work / About / Contact anchors, "See the work", "Back to the top".

**Independent critic (2026-11-17).** Verdict: **ship**. No P0 or P1. It named the
name-to-plate pairing (128 → 28 → 17px), the Fig. 01–05 drawing system, and the restrained
one-accent material as what must stay, and read the page as its own site rather than Emil's:
the before's fingerprint was one 16px size and a 560px column; the after is a 1280px 7/5 hero
with a 128px name and a bespoke drawing. It flagged one P2 worth fixing: the 390 header had two
rules (an inset one under the brand plus the full-bleed bottom), which made it read as two
stacked toolbars. That rule is removed; the header is one bar on the phone. Two P2s are left as
intended: the Barcelona/Humannova facts are repeated in the eyebrow, sentence and fact strip
(spec-sheet reinforcement, not a bug), and the 390 first screen peeks 37px into the plate
before the fold (the planned reveal; the caption is one scroll away).

**Second critic (quick pass, 2026-11-17).** It measured the hero plate's structural lines as
near 1.2:1 on paper and the frame 10px off the eyebrow cap. Fixed: the frame now uses
`--ink-3` at 95%, the band edges at 75%, the interior grid at 50% `--ink-3`, the project plate
frames at 60%, the radar rings at 45%, and the plate top aligns with the eyebrow cap. It also
preferred a one-row phone header and dropping the repeated Barcelona/Humannova facts; both
left as intended (the header needs the nav row; the fact strip is a scannable summary). Its
verdict: fix the plate, then ship.

**Owner's verdict (2026-11-17).** Not kept. The owner preferred the other approach: no
pictures, project names only, a page per project, and uniform text. The section cut is archived
in `design/archive/section-cut.md`.

## 2026-11-17 — the note, with a page per project

**Brief (verbatim).** "i like the other approach of not adding pictures , only the projects name
maybe we can add a link to another page inside my portfolio with each project description , and
each projects has its own page description , but the main page the simple the better , also i
like the other portfolio's approach on text styling , everything is uniform and homogenous when
we talk about text size and weight." Then: "id like better page transitions , now it looks so
robust and off."

**Mode.** Redesign of the section cut back to the B5 note, with a new content model: the index
is the note; the detail moves to four project pages.

**Constants kept.** Name, role, Barcelona, the orange period, the four project names and URLs,
the email, GitHub, the live time, both themes, the copy voice, and the no-photo/no-tracker
stance.

**What changed.**
- The index is the note again: 16px everywhere, 400/500, two inks, the 560px column and 160px
  gutter. No drawings. The four projects are names only; the years, descriptions and pictures are
  gone.
- Four project pages at `/work/reskillia/`, `/work/tomate/`, `/work/taste/`,
  `/work/club-stas-tarat/`. Each has Project (back, name, Year/Role/Stack, description),
  Underneath (the details from the B4 record) and Links (the live site, the next project, the
  email). All 16px, no images.
- The B5's 14px clock/year is gone too: one size, two weights, on every page.
- `site.js` now owns the clock and theme for the index and the project pages; the theme reveal
  is scoped with a `theme-transition` class so the page transitions do not collide with it.
- The OG card is the text-only B5 card again. The 404 is the B5 note. Geist Mono is removed.

**Page transitions.** Cross-document View Transitions: `@view-transition { navigation: auto; }`
on every page; the header is `site-header`; the clicked project name and the project page title
share a `view-transition-name` and morph; the rest of the page uses the browser cross-fade.
Reduced motion makes it instant; browsers without the API navigate normally; no router or JS.

**Gates.** Index and project page: `probe --check` 0 errors at 1440 / 390 / 360; the single
expected WARN is the uniform 16px type. Light audit 0 contrast / 0 targets under 24px / 0 text
under 12px / no overflow. `lint` 0 errors, 1 warning (the cross-document rule's `@supports` fallback; the top-level
rule is correct, and Firefox navigates normally). `compare` against the B5: no regressions, one size,
1.1 screens, CLS 0, LCP 656ms, fonts 29KB. `parity`: 4 ERRORs because the four external project
links are no longer on the index; they now sit on the project pages. That is the requested
content model; the owner must sign it off.

**Theme reveal fix (2026-11-17, after deploy).** The first live version glitched: the
`theme-transition` class set `animation: none` on both root images, so Chrome considered the
transition finished immediately, removed the class and fell back to the default cross-fade. The
reveal is now real CSS: old root `theme-hold` 360ms, new root `theme-reveal` 360ms from the
button using `--theme-x/y/r`, class held until `transition.finished`, and the custom page fade
removed from the root. Verified with a page-side timing trace (360ms, class present at 300ms)
and a 3s slowed capture of the circle.

**Parity sign-off.** The external Reskillia, Tomate, Taste and Club Stas Tarat links moved from
the index to their project pages. The index names link to `/work/<slug>/`. The old descriptions
are now the project pages. The years are on the project pages, not the index. The index's
"Today"/"Projects"/"Contact" headings and the h1 name are unchanged.

**Owner's verdict.** Pending.
