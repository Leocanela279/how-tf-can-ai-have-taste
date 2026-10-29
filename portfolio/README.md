# Portfolio, ready for Cloudflare Pages

`public/` is the whole site: static HTML, compiled CSS, self-hosted fonts and the project
screenshots. No build step is needed to deploy it.

## Deploy

**Dashboard (no tools):** Cloudflare dashboard → Workers & Pages → Create → Pages →
**Upload assets** → name the project → drag in the `public/` folder → Deploy.

**Git (redeploys on every push):** Workers & Pages → Create → Pages → **Connect to Git** → pick
this repository, then set:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | None |
| Build command | *(leave empty)* |
| Build output directory | `portfolio/public` |

**Command line:**

```bash
cd portfolio
npm install
npx wrangler login
npm run deploy        # rebuilds the CSS, then uploads public/
```

Add a custom domain afterwards under the project's **Custom domains** tab.

## Editing

Edit `public/index.html`. If you add or change Tailwind classes, rebuild the CSS with
`npm run build` (it scans `public/index.html`). Plain CSS in the page's `<style>` block needs no
build.

`public/_headers` sets long caching for fonts, a week for screenshots, and a few safe security
headers.

The design source and its history live in `experiments/runs/baseline/b4-dark/`.
