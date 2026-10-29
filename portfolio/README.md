# Portfolio, ready for Cloudflare Pages

`public/` is the whole site: static HTML, compiled CSS, self-hosted fonts and the project
screenshots. No build step is needed to deploy it.

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
npm run deploy        # rebuilds the CSS, then deploys the Worker
```

## Editing

Edit `public/index.html`. If you add or change Tailwind classes, rebuild the CSS with
`npm run build` (it scans `public/index.html`). Plain CSS in the page's `<style>` block needs no
build.

`public/_headers` sets long caching for fonts, a week for screenshots, and a few safe security
headers.

The design source and its history live in `experiments/runs/baseline/b4-dark/`.
