#!/usr/bin/env node
// Inventory the design values an existing page actually uses, to find drift before a redesign.
//   node inventory.mjs <url|file> [--width 1440] [--src <dir>] [--out inventory.json]
// Prints counts of unique colours (with near-duplicates clustered in OKLab), font sizes, weights,
// line heights, letter spacings, radii, shadows and spacings, each with how often it is used.
// --src also scans source files for hard-coded values that bypass tokens.
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { launch } from '../../taste/scripts/lib/browser.mjs';

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(name);
  return i === -1 ? fallback : args[i + 1];
};
const valued = ['--width', '--src', '--out'];
const target = args.find((a, i) => !a.startsWith('--') && !valued.includes(args[i - 1]));
if (!target) {
  console.error('usage: inventory.mjs <url|file> [--width 1440] [--src <dir>] [--out inventory.json]');
  process.exit(2);
}
const width = Number(flag('--width', 1440));
const src = flag('--src');
const out = flag('--out');

// Runs inside the page: every visible element's computed values, tallied by use.
const COLLECT = `(() => {
  const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  const rgba = (c) => {
    if (!c || c === 'transparent') return null;
    ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = '#000'; ctx.fillStyle = c; ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    return a === 0 ? null : (a === 255 ? [r, g, b] : [r, g, b, a]);
  };
  // #rrggbb, or #rrggbbaa when the colour is translucent.
  const hex = (c) => '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('');
  const t = {};
  const add = (kind, key) => { if (key === null || key === undefined || key === '') return; (t[kind] ||= {})[key] = (t[kind][key] || 0) + 1; };
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const ownText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (ownText) {
      const c = rgba(cs.color); if (c) add('textColors', hex(c));
      add('fontSizes', parseFloat(cs.fontSize));
      add('fontWeights', cs.fontWeight);
      add('fontFamilies', cs.fontFamily.split(',')[0].replace(/["']/g, '').trim());
      const lh = cs.lineHeight === 'normal' ? 'normal' : Math.round(parseFloat(cs.lineHeight) / parseFloat(cs.fontSize) * 100) / 100;
      add('lineHeights', lh);
      if (cs.letterSpacing !== 'normal') add('letterSpacings', Math.round(parseFloat(cs.letterSpacing) / parseFloat(cs.fontSize) * 1000) / 1000 + 'em');
    }
    const bg = rgba(cs.backgroundColor); if (bg) add('backgroundColors', hex(bg));
    for (const s of ['Top', 'Right', 'Bottom', 'Left']) {
      if (parseFloat(cs['border' + s + 'Width']) > 0 && cs['border' + s + 'Style'] !== 'none') {
        const b = rgba(cs['border' + s + 'Color']); if (b) add('borderColors', hex(b));
        break;
      }
    }
    if (cs.borderRadius !== '0px') add('radii', cs.borderRadius);
    if (cs.boxShadow !== 'none') add('shadows', cs.boxShadow);
    for (const p of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'marginTop', 'marginBottom', 'rowGap', 'columnGap']) {
      const v = parseFloat(cs[p]); if (v > 0) add('spacings', Math.round(v));
    }
  }
  return t;
})()`;

// sRGB hex → OKLab, for clustering colours a person could not tell apart.
function oklab(h) {
  const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const [r, g, b] = [1, 3, 5].map((i) => lin(parseInt(h.slice(i, i + 2), 16)));
  const alpha = h.length === 9 ? parseInt(h.slice(7, 9), 16) / 255 : 1;
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s, alpha];
}
// Colour distance plus a penalty for different opacity, so ink at 60% never merges with solid ink.
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) + Math.abs(a[3] - b[3]);
// ΔE in OKLab under about 0.02 is hard to tell apart side by side.
function cluster(counts, threshold = 0.02) {
  const items = Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([h, n]) => ({ h, n, lab: oklab(h) }));
  const groups = [];
  for (const it of items) {
    const g = groups.find((g) => dist(g.lab, it.lab) < threshold);
    if (g) { g.members.push(it.h); g.uses += it.n; } else groups.push({ lead: it.h, lab: it.lab, members: [it.h], uses: it.n });
  }
  return groups.map(({ lead, members, uses }) => ({ lead, members, uses }));
}

// Hard-coded values in source that bypass tokens.
function scanSource(dir) {
  const exts = new Set(['.css', '.scss', '.less', '.html', '.jsx', '.tsx', '.js', '.ts', '.vue', '.svelte', '.astro']);
  const skip = /node_modules|\.git|dist|build|\.next|coverage/;
  const found = { hexColors: {}, arbitraryTailwind: {}, pxFontSizes: {}, files: 0 };
  const walk = (d) => {
    for (const name of readdirSync(d)) {
      const p = join(d, name);
      if (skip.test(p)) continue;
      const st = statSync(p);
      if (st.isDirectory()) walk(p);
      else if (exts.has(extname(p)) && st.size < 2e6) {
        found.files++;
        const text = readFileSync(p, 'utf8');
        for (const m of text.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) found.hexColors[m[0].toLowerCase()] = (found.hexColors[m[0].toLowerCase()] || 0) + 1;
        for (const m of text.matchAll(/\b[a-z-]+-\[[^\]\s]+\]/g)) found.arbitraryTailwind[m[0]] = (found.arbitraryTailwind[m[0]] || 0) + 1;
        for (const m of text.matchAll(/font-size:\s*(\d+(?:\.\d+)?px)/g)) found.pxFontSizes[m[1]] = (found.pxFontSizes[m[1]] || 0) + 1;
      }
    }
  };
  walk(dir);
  return found;
}

const page = await launch();
let raw;
try {
  await page.open(target, width);
  raw = await page.evaluate(COLLECT);
} finally {
  await page.close();
}

const sorted = (o = {}) => Object.entries(o).sort((a, b) => b[1] - a[1]);
const allColors = {};
for (const k of ['textColors', 'backgroundColors', 'borderColors']) for (const [h, n] of sorted(raw[k])) allColors[h] = (allColors[h] || 0) + n;
const colorGroups = cluster(allColors);
const report = {
  target, width,
  counts: {
    colors: Object.keys(allColors).length,
    colorClusters: colorGroups.length,
    textColors: Object.keys(raw.textColors || {}).length,
    fontSizes: Object.keys(raw.fontSizes || {}).length,
    fontWeights: Object.keys(raw.fontWeights || {}).length,
    fontFamilies: Object.keys(raw.fontFamilies || {}).length,
    lineHeights: Object.keys(raw.lineHeights || {}).length,
    radii: Object.keys(raw.radii || {}).length,
    shadows: Object.keys(raw.shadows || {}).length,
    spacings: Object.keys(raw.spacings || {}).length,
  },
  nearDuplicateColors: colorGroups.filter((g) => g.members.length > 1),
  values: Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, sorted(v)])),
  source: src ? scanSource(src) : null,
};

const c = report.counts;
console.log(`Inventory of ${target} at ${width}px`);
console.log(`  colours        ${c.colors} unique, ${c.colorClusters} after merging near-duplicates (${c.textColors} used for text)`);
console.log(`  font sizes     ${c.fontSizes}: ${report.values.fontSizes.map(([v, n]) => `${v}px×${n}`).join(', ')}`);
console.log(`  weights        ${c.fontWeights}: ${report.values.fontWeights.map(([v, n]) => `${v}×${n}`).join(', ')}`);
console.log(`  families       ${c.fontFamilies}: ${report.values.fontFamilies.map(([v]) => v).join(', ')}`);
console.log(`  line heights   ${c.lineHeights}   radii ${c.radii}   shadows ${c.shadows}   spacings ${c.spacings}`);
for (const g of report.nearDuplicateColors.slice(0, 8)) console.log(`  near-duplicates: ${g.members.join(' ≈ ')} (${g.uses} uses)`);
if (report.source) {
  const s = report.source;
  console.log(`  source         ${s.files} files: ${Object.keys(s.hexColors).length} hard-coded hex colours, ${Object.keys(s.arbitraryTailwind).length} arbitrary Tailwind values, ${Object.keys(s.pxFontSizes).length} px font sizes`);
}
console.log('These counts describe drift; they are not budgets. Compare them with the plan and the reference.');
if (out) {
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, JSON.stringify(report, null, 2) + '\n');
  console.log(`inventory written to ${out}`);
}
