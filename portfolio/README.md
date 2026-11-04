# Portfolio

Live at https://leo-dev.es. `public/` is the whole site: one HTML page, one stylesheet, one
self-hosted font (Geist), a favicon, the CV and a 404 page. Plain HTML and CSS, no build step.

The design, its plan and the critique rounds are in `experiments/runs/taste/b5-minimal/` (made with
`skills/taste`, with emilkowal.ski as the reference). The previous, richer version is
`experiments/runs/baseline/b4-dark/`.

## Deploy

The live site is the Cloudflare Worker `how-tf-can-ai-have-taste`, serving `public/` as static
assets (`wrangler.jsonc`), with `leo-dev.es` and `www.leo-dev.es` attached as custom domains. It
redeploys on every push to `main`.

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
npm run deploy        # deploys the Worker
```

## Editing

Edit `public/index.html` and `public/styles.css` directly; a push to `main` publishes them. The page
follows the visitor's light or dark setting; both palettes are the custom properties at the top of
`styles.css`.

`public/_headers` caches the font for a year and the CV for an hour, and sets a few safe security
headers.
