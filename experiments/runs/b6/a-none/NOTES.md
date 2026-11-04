# Notes

## Assumptions
- The page is for people deciding whether to hire or work with Leandro: recruiters, leads, clients. They skim. The work is the evidence, so it should be visible without clicking.
- "Keep the palette, the fonts and the logo" means the colour tokens in `tailwind.config.js`, Geist / Geist Mono / Newsreader, and the wordmark "Leandro Canela" with the orange period. None of these changed. I only reused the existing tokens.
- I didn't add, remove or reword any facts. Every project fact, date, stack and link is copied from the original. The db-doctor panel only rearranges sentences that were already on the page.

## What changed
1. **The work is open, not collapsed.** Each of the five projects used to be an accordion row. Its screenshot showed only on desktop hover, and the backend detail (Kept / Added / Removed for ICEX, Timekeeping, etc.) was hidden. Each project is now an open case study with a numbered header, its tagline, the screenshot (linked to the live site), the description, the links, the facts table and an "Underneath" list. The backend detail is the strongest proof of what the hero claims, so it now shows. The single screenshots stay in view (sticky) on desktop while the text scrolls.
2. **db-doctor has no screenshot.** It gets a typographic panel (reads / looks for / returns) built from its own description, so it doesn't look like a hole in the layout.
3. **Work header has a small index** (01–05) that jumps to each project. It keeps the quick overview the old list gave. The old anchors (`#humannova`, `#reskillia`, `#icex`, `#cpu-city`, ...) still work, so the footer links are unchanged.
4. **Hero name runs on one line at desktop widths** and spans the page. The two-line stack left a big empty area top-right. On phones and tablets it stays two lines as before. The header and footer wordmarks now carry the orange period too, so the logo is the same everywhere.
5. **Fixed a layout bug in "Smaller tools".** On desktop the stack label rendered before the name and the description was pushed to the right. The columns are now name / description / stack.
6. **Mobile project headers** put "01 · 2026 · Solo project" on a line above the title instead of squeezing the title into half the width. Index rows are 44px+ tall on phones.
7. **Cleanup:** removed the accordion and cursor-preview CSS and JS that no longer apply. Projects use the existing (previously unused) `.reveal` fade-in, and it respects reduced motion.

## Not changed
Copy, the hero sentence, the three "invisible things", About, the skills grid, Contact (email + copy button), the footer and colophon, the Barcelona clock and the CV link.

Rebuild styles: `/tmp/claude-0/tw/node_modules/.bin/tailwindcss -c tailwind.config.js -i src.css -o styles.css --minify`
