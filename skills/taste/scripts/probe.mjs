#!/usr/bin/env node
// Measure a rendered page into a design profile.
//   node probe.mjs <url|file> [--width 1440] [--out profile.json] [--check]
// --check also prints budget problems (ERROR / WARN) and exits 1 on any ERROR.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { launch } from './lib/browser.mjs';

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(name);
  return i === -1 ? fallback : args[i + 1];
};
const target = args.find((a, i) => !a.startsWith('--') && !['--width', '--out'].includes(args[i - 1]));
if (!target) {
  console.error('usage: probe.mjs <url|file> [--width 1440] [--out profile.json] [--check]');
  process.exit(2);
}
const width = Number(flag('--width', 1440));
const out = flag('--out');
const check = args.includes('--check');

const probe = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'lib/page-probe.js'), 'utf8');

// Default budgets from the taste skill. A measured reference may justify going over a WARN.
function review(p) {
  const errors = [], warns = [];
  const f = p.findings;
  const used = (list) => list.filter((x) => x.share >= 0.03);

  if (f.overflowX) errors.push(`horizontal overflow at ${p.viewport.width}px`);
  if (f.lowContrastCount) errors.push(`${f.lowContrastCount} text elements below WCAG contrast, e.g. ${f.lowContrast.slice(0, 3).map((x) => `"${x.text}" ${x.ratio}:1 (needs ${x.need})`).join('; ')}`);
  if (f.smallTargetCount) errors.push(`${f.smallTargetCount} targets under 24px, e.g. ${f.smallTargets.slice(0, 3).map((x) => `"${x.text}" ${x.w}×${x.h}`).join('; ')}`);
  if (f.placeholderText) errors.push('placeholder content (lorem ipsum / John Doe / Acme)');
  if (f.imagesWithoutAlt) errors.push(`${f.imagesWithoutAlt} images without alt`);
  if (f.transitionAll) errors.push(`${f.transitionAll} elements use transition: all (name the properties)`);
  if (f.emoji) errors.push(`${f.emoji} emoji in page text`);

  const phone = p.viewport.width <= 480;
  if (f.zoomLocked) errors.push('the viewport meta disables zoom (maximum-scale=1 or user-scalable=no)');
  if (f.overflowingHeadings?.length) errors.push(`headings overflow their box: ${f.overflowingHeadings.slice(0, 3).map((t) => `"${t}"`).join(', ')}`);
  if (phone) {
    if (f.smallInputs?.length) errors.push(`${f.smallInputs.length} form field(s) under 16px (iOS zooms in on focus): ${f.smallInputs.map((x) => `${x.field} ${x.size}px`).join(', ')}`);
    if (f.prose?.under14 > 0) errors.push(`${Math.round(f.prose.under14 * 100)}% of running text is under 14px on a phone`);
    else if (f.prose?.under16 > 0.25) warns.push(`${Math.round(f.prose.under16 * 100)}% of running text is under 16px on a phone (16px is the comfort floor at 32cm)`);
    if (f.touchTargetCount) warns.push(`${f.touchTargetCount} touch targets under 44px, e.g. ${f.touchTargets.slice(0, 3).map((x) => `"${x.text}" ${x.w}×${x.h}`).join('; ')}`);
  }
  const s1 = f.firstScreen;
  if (s1) {
    if (!s1.bottomBandFilled) warns.push('the bottom 30% of the first screen is empty: the page looks finished there; let the next section peek in');
    if (s1.h1Top !== null && s1.h1Top > 0.6) warns.push(`the h1 starts ${Math.round(s1.h1Top * 100)}% of the way down the first screen`);
    if (s1.words < 15 && !s1.visual) warns.push(`the first screen holds ${s1.words} words and no picture: say what this is`);
  }
  if (f.thinSmallCount) warns.push(`${f.thinSmallCount} text elements at weight 300 or lighter under 20px, e.g. "${f.thinSmall[0].text}"`);
  if (f.centredParagraphs?.length) warns.push(`${f.centredParagraphs.length} centred paragraph(s) longer than two lines: left-align running text`);

  const families = used(p.type.families);
  if (families.length > 2) warns.push(`${families.length} font families carry text: ${families.map((x) => x.value).join(', ')}`);
  const weights = used(p.type.weights);
  if (weights.length > 3) warns.push(`${weights.length} weights in use: ${weights.map((x) => x.value).join(', ')}`);
  const sizes = used(p.type.sizesPx);
  if (sizes.length > 6) warns.push(`${sizes.length} font sizes carry 3%+ of text: ${sizes.map((x) => x.value).join(', ')}px`);
  const ratio = p.type.headlineToBody;
  // A phone fits a 2–3× jump; past about 3.5× long words start to overflow.
  if (ratio && ratio < (phone ? 2 : 2.5)) warns.push(`largest type is only ${ratio}× body: no decisive size jump (fine if hierarchy is carried by ink, weight and space on purpose)`);
  if (phone && ratio > 3.5) warns.push(`largest type is ${ratio}× body on a phone: check long words and line count`);
  if (p.type.bodySizePx && p.type.bodySizePx < (phone ? 16 : 13)) warns.push(`body text ${p.type.bodySizePx}px${phone ? ' on a phone (16px floor)' : ''}`);
  const m = p.type.measureChars;
  if (m && m.max > (phone ? 60 : 85)) warns.push(`running text reaches ${m.max} characters per line (aim for ${phone ? '30–60 on a phone' : '45–75'})`);
  for (const h of f.headings) if (h.lines > 3) warns.push(`${h.tag} "${h.text}" runs ${h.lines} lines`);
  if (f.tinyTextCount) warns.push(`${f.tinyTextCount} text elements under 12px`);
  if (f.smallCapsCount >= 3) warns.push(`${f.smallCapsCount} small uppercase labels (eyebrows?): ${f.smallCapsLabels.slice(0, 3).join(' | ')}`);
  if (p.type.monospaceShareOutsideCode > 0.05) warns.push(`monospace carries ${Math.round(p.type.monospaceShareOutsideCode * 100)}% of text outside code`);
  if (p.shape.gradients) warns.push(`${p.shape.gradients} gradient backgrounds`);
  const shadowed = p.shape.shadows.reduce((n, s) => n + s.weight, 0);
  if (shadowed > 8) warns.push(`${shadowed} elements with box-shadow (only floating things need one)`);
  return { errors, warns };
}

// Loading and motion cost, from a load at 4× CPU slowdown and a load with reduced motion on.
function reviewPerf(slow, stillMoving) {
  const errors = [], warns = [];
  const p = slow.perf;
  if (p.runtimeCss) errors.push('runtime CSS compiler (cdn.tailwindcss.com): compile CSS at build time');
  const blocking = p.blockingScripts.filter((s) => !/cdn\.tailwindcss\.com/.test(s));
  if (blocking.length) errors.push(`${blocking.length} render-blocking script(s) in <head>: ${blocking.slice(0, 2).join(', ')} (add defer or type=module)`);
  if (p.lcp?.lazy) errors.push(`the LCP element (${p.lcp.tag}) has loading="lazy"`);
  if (p.lcp?.tag === 'img' && p.lcp.priority !== 'high') warns.push('the LCP image lacks fetchpriority="high"');
  if (p.lcp && p.lcp.ms > 2500) warns.push(`LCP ${p.lcp.ms}ms at 4× CPU slowdown (target ≤2500ms): ${p.lcp.tag} "${p.lcp.what}"`);
  if (p.cls > 0.1) errors.push(`CLS ${p.cls} (target ≤0.1): set image dimensions, metric-matched font fallbacks`);
  else if (p.cls > 0.05) warns.push(`CLS ${p.cls} (target ≤0.1)`);
  if (p.longTasks?.count) warns.push(`${p.longTasks.count} long task(s) at 4× CPU slowdown, longest ${p.longTasks.longest}ms (none over 50ms is the target)`);
  if (p.kb.script > 100) warns.push(`${p.kb.script} KB of script (≤100 KB for pages, ≤170 KB for apps)`);
  if (p.kb.font > 100) warns.push(`${p.kb.font} KB of fonts (${p.fontsLoaded.length} faces): pin axes, fewer families, WOFF2 subsets`);
  if (p.unknownSizes) warns.push(`${p.unknownSizes} resource(s) with unknown size (cross-origin without Timing-Allow-Origin); byte totals are a floor`);
  if (p.animations.nonComposited.length) warns.push(`animations on non-composited properties: ${p.animations.nonComposited.map((a) => `${a.name} (${a.props.join(', ')})`).join('; ')}`);
  for (const b of p.blurSurfaces) {
    if (b.radius > 10) warns.push(`backdrop blur of ${b.radius}px (keep ≤10px)`);
    if (b.areaShare > 0.25) warns.push(`backdrop blur covering ${Math.round(b.areaShare * 100)}% of the screen (bar-sized surfaces only)`);
    if (b.fillAlpha >= 0.85) warns.push(`backdrop blur under a ${Math.round(b.fillAlpha * 100)}% opaque fill: barely visible, drop it or lower the fill`);
  }
  if (stillMoving) errors.push(`${stillMoving} transform animation(s) still run with prefers-reduced-motion: reduce (use a cross-fade instead)`);
  return { errors, warns };
}

// Scroll a screen at a time and count transform animations caught mid-flight.
const MOVING_DURING_SCROLL = `(async () => {
  let most = 0;
  for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight) {
    scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 80));
    const moving = document.getAnimations().filter((a) => {
      try { return a.effect.getKeyframes().some((k) => 'transform' in k || 'translate' in k || 'scale' in k || 'rotate' in k); } catch { return false; }
    }).length;
    most = Math.max(most, moving);
  }
  return most;
})()`;

const page = await launch();
try {
  await page.instrument();
  await page.open(target, width);
  const profile = await page.evaluate(probe);
  if (out) {
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, JSON.stringify(profile, null, 2) + '\n');
    console.log(`profile written to ${out}`);
  } else if (!check) {
    console.log(JSON.stringify(profile, null, 2));
  }
  if (check) {
    const design = review(profile);

    await page.throttle(4);
    await page.open(target, width);
    const slow = await page.evaluate(probe);
    await page.throttle(1);

    await page.reducedMotion(true);
    await page.open(target, width);
    const stillMoving = await page.evaluate(MOVING_DURING_SCROLL);
    await page.reducedMotion(false);

    const cost = reviewPerf(slow, stillMoving);
    const errors = [...design.errors, ...cost.errors], warns = [...design.warns, ...cost.warns];
    for (const e of errors) console.log(`ERROR ${e}`);
    for (const w of warns) console.log(`WARN  ${w}`);
    console.log(`\n${errors.length} error(s), ${warns.length} warning(s) at ${width}px. A WARN stays only if DESIGN.md justifies it.`);
    if (width > 480) console.log('Run again with --width 390 (and 360): the phone checks only run there.');
    process.exitCode = errors.length ? 1 : 0;
  }
} finally {
  await page.close();
}
