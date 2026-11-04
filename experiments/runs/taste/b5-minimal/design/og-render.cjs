// Renders design/og.html to portfolio/public/og.png. Run from the repo root: node experiments/runs/taste/b5-minimal/design/og-render.cjs
const path = require('path');
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.goto('file://' + path.join(__dirname, 'og.html'));
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(__dirname, '../../../../../portfolio/public/og.png') });
  await b.close();
})();
