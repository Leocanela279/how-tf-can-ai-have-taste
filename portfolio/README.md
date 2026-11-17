# Portfolio

Live at [leo-dev.es](https://leo-dev.es). Leandro Canela, full-stack developer in Barcelona.

The site is a **note**: name and role, a short Today paragraph, four project names, and an email.
The detail lives one click away, on a page per project. There are no work pictures, no
screenshots, no drawings, no trackers and no cookie banner.

It is deliberately uniform: **one 16px size, two weights (400/500), one family (Geist), two inks
and one small orange accent**. The only hierarchy is ink, weight and space.

## Pages

| URL | File | What |
| --- | --- | --- |
| `/` | `public/index.html` | The note: Today, Projects (names only), Contact |
| `/work/reskillia/` | `public/work/reskillia/index.html` | Reskillia, 2026 |
| `/work/tomate/` | `public/work/tomate/index.html` | Tomate, 2026 |
| `/work/taste/` | `public/work/taste/index.html` | Taste, 2026 |
| `/work/club-stas-tarat/` | `public/work/club-stas-tarat/index.html` | Club Stas Tarat, 2025 |
| `/404.html` | `public/404.html` | Not found |

Each project page has the project name, Year/Role/Stack, a short description, an "Underneath"
section with the real details, and Links (the live project, the next project, the email).
The index names link to those pages; the external project links are on the project pages.

## Page transitions

Cross-document View Transitions, no router and no JS:

- `@view-transition { navigation: auto; }` on every page.
- The header is a shared element (`view-transition-name: site-header`), so it stays put.
- The clicked project name and the project page title share a `view-transition-name`, so the
  name morphs into the page title and back via "All work".
- The rest of the page fades 160/240ms; reduced motion makes it instant; browsers without the
  API navigate normally.
- The theme toggle is a same-document view transition with a circular reveal. A
  `theme-transition` class scopes it so it does not collide with the page transition.

## Stack

Plain HTML, CSS, one font and one small script. No build step, no framework, no dependencies in
the page. `public/` is the whole site:

| File | What |
| --- | --- |
| `public/index.html` | The note |
| `public/work/*/index.html` | The four project pages |
| `public/styles.css` | Tokens, layout, both themes, the transitions |
| `public/site.js` | The Barcelona clock and the theme toggle |
| `public/404.html` | Not found, same tokens |
| `public/fonts/` | Geist variable, WOFF2 |
| `public/favicon.svg` | The L mark with the orange dot |
| `public/og.png` | 1200×630 text-only link preview |
| `public/_headers` | Font caching and safe headers |

The page follows the visitor's light or dark setting until they use the theme button; the choice
is stored and applied before first paint. The Barcelona clock is `Intl.DateTimeFormat` in
`Europe/Madrid`. The theme choice is shared by the index and all project pages.

## Deploy

The live site is the Cloudflare Worker `how-tf-can-ai-have-taste`, serving `public/` as static
assets (`wrangler.jsonc`), with `leo-dev.es` and `www.leo-dev.es` attached. It redeploys on every
push to `main`.

Workers Builds settings (Worker → Settings → Build):

| Setting | Value |
| --- | --- |
| Root directory | `portfolio` |
| Build command | *(empty)* |
| Deploy command | `npx wrangler deploy` |

From your machine instead:

```bash
cd portfolio
npm install
npx wrangler login
npm run deploy
```

The project pages are directories with an `index.html`; Cloudflare's default static-asset
handling serves `/work/reskillia/` from that file and redirects the non-slash URL.

## Editing

Edit the HTML files and `styles.css` directly; a push to `main` publishes them. The current
design and its history are in `design/`:

- `design/DESIGN.md` — the note, the token plan, the page transitions, the gates and the
  parity sign-off.
- `design/history.md` — the section cut that was rejected and the note that replaced it.
- `design/archive/section-cut.md` — the archived first direction, kept for the record.
- `design/og.html` — the source of `og.png` (1200×630, text only).
- `design/before/` and `design/shots/` — the measured before and the final screenshots.

The `design/` folder is not part of the deployed site.
