# Portfolio

A static portfolio site: home page plus one page per project under `/work/<slug>/`.

## Build

```sh
npm install
npm run build
```

The site is written to `dist/` as plain HTML and CSS, so any static host can serve it.

## Where to edit

- `content.mjs`: the words, projects, links and stack chips
- `styles.css`: colours, spacing and type (the tokens at the top), light and dark themes
- `build.mjs`: the page templates and the small script for the clock and theme toggle

## Deploy on Cloudflare (Workers)

The site deploys as the Worker `how-tf-can-ai-have-taste`; `wrangler.jsonc`
tells Cloudflare to build with `npm run build` and serve the `dist/` folder.

In the Cloudflare dashboard: Workers & Pages → how-tf-can-ai-have-taste →
Settings → Build:

| Setting | Value |
| --- | --- |
| Root directory | `portfolio` |
| Build command | `npm run build` (or leave empty) |
| Deploy command | `npx wrangler deploy` |
| Non-production deploy command | `npx wrangler versions upload` |

"Failed: root directory not found" means the Root directory setting points at
a folder that isn't in the repo. Set it to exactly `portfolio` (no leading
slash, nothing after it), save, then retry the latest build.

Fonts: Geist and Geist Mono, from `@fontsource-variable`.
