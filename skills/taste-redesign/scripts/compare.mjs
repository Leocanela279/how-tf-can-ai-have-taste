#!/usr/bin/env node
// Diff two probe profiles (before and after a redesign) and flag regressions.
//   node compare.mjs design/before/profile-1440.json design/after/profile-1440.json
// Profiles come from: node <taste>/scripts/probe.mjs <page> --width 1440 --out <file>
// No browser needed.
import { readFileSync } from 'node:fs';

const [beforeFile, afterFile] = process.argv.slice(2);
if (!beforeFile || !afterFile) {
  console.error('usage: compare.mjs <before-profile.json> <after-profile.json>');
  process.exit(2);
}
const b = JSON.parse(readFileSync(beforeFile, 'utf8'));
const a = JSON.parse(readFileSync(afterFile, 'utf8'));
const used = (list = []) => list.filter((x) => (x.share ?? 1) >= 0.03).map((x) => String(x.value));
const rows = [], regressions = [];

function row(label, bv, av, worseIf) {
  const changed = JSON.stringify(bv) !== JSON.stringify(av);
  const worse = worseIf ? worseIf(bv, av) : false;
  rows.push(`${worse ? '✗' : changed ? '•' : ' '} ${label.padEnd(26)} ${String(bv ?? '—').padEnd(28)} → ${av ?? '—'}`);
  if (worse) regressions.push(`${label}: ${bv} → ${av}`);
}
const more = (x, y) => (y ?? 0) > (x ?? 0);

row('font families (3%+)', used(b.type.families).join(', '), used(a.type.families).join(', '), (x, y) => y.split(', ').length > Math.max(2, x.split(', ').length));
row('weights (3%+)', used(b.type.weights).join(' '), used(a.type.weights).join(' '));
row('font sizes (3%+)', used(b.type.sizesPx).length, used(a.type.sizesPx).length, (x, y) => y > Math.max(6, x));
row('distinct sizes (all)', b.type.distinctSizes, a.type.distinctSizes);
row('body size px', b.type.bodySizePx, a.type.bodySizePx, (x, y) => b.viewport.width <= 480 && y < 16 && y < x);
row('headline ÷ body', b.type.headlineToBody, a.type.headlineToBody);
row('inks', b.color.inks.length, a.color.inks.length);
row('grounds', b.color.grounds.length, a.color.grounds.length);
row('gradients', b.shape.gradients, a.shape.gradients);
row('elements with borders', b.shape.elementsWithBorders, a.shape.elementsWithBorders);
row('backdrop blur', b.shape.backdropBlur, a.shape.backdropBlur);
row('contrast failures', b.findings.lowContrastCount, a.findings.lowContrastCount, more);
row('targets under 24px', b.findings.smallTargetCount, a.findings.smallTargetCount, more);
row('touch targets under 44px', b.findings.touchTargetCount, a.findings.touchTargetCount, (x, y) => b.viewport.width <= 480 && more(x, y));
row('text under 12px', b.findings.tinyTextCount, a.findings.tinyTextCount, more);
row('horizontal overflow', b.findings.overflowX, a.findings.overflowX, (x, y) => !x && y);
row('page height (screens)', b.pageHeightScreens, a.pageHeightScreens);
if (b.perf && a.perf) {
  row('LCP ms', b.perf.lcp?.ms, a.perf.lcp?.ms, (x, y) => x && y && y > x * 1.2 && y > 2500);
  row('CLS', b.perf.cls, a.perf.cls, (x, y) => y > Math.max(0.1, x));
  row('script KB', b.perf.kb?.script, a.perf.kb?.script, (x, y) => y > x * 1.2 && y > 100);
  row('font KB', b.perf.kb?.font, a.perf.kb?.font, (x, y) => y > x * 1.2 && y > 100);
}

console.log(`Before ${b.url}\nAfter  ${a.url}\nWidth  ${b.viewport.width}px → ${a.viewport.width}px\n`);
for (const r of rows) console.log(r);
console.log(`\n✗ regression   • changed`);
if (regressions.length) {
  console.log(`\n${regressions.length} regression(s):`);
  for (const r of regressions) console.log(`ERROR ${r}`);
  process.exitCode = 1;
} else {
  console.log('\nNo regressions against the before.');
}
