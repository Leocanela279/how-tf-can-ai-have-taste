#!/usr/bin/env node
// Record what a page offers people, so a redesign can prove nothing was lost.
//   node parity.mjs <url|file> [--width 1440] [--crawl 20] --out design/before/parity.json
//   node parity.mjs <url|file> [--width 1440] [--crawl 20] --against design/before/parity.json
// Records, per page: links (href + accessible name), headings, landmarks, forms and their fields,
// buttons and controls, data-testid values, analytics hooks and keyboard shortcuts.
// --against compares with a saved record: a missing item is an ERROR, a renamed one a WARN.
// --crawl follows same-origin links (breadth-first, up to N pages); the default is the page alone.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { launch, toUrl } from '../../taste/scripts/lib/browser.mjs';

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(name);
  return i === -1 ? fallback : args[i + 1];
};
const valued = ['--width', '--crawl', '--out', '--against'];
const target = args.find((a, i) => !a.startsWith('--') && !valued.includes(args[i - 1]));
if (!target || !(flag('--out') || flag('--against'))) {
  console.error('usage: parity.mjs <url|file> [--width 1440] [--crawl N] (--out file.json | --against file.json)');
  process.exit(2);
}
const width = Number(flag('--width', 1440));
const crawl = Number(flag('--crawl', 1));

const COLLECT = `(() => {
  const visible = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
  const name = (el) => {
    const by = el.getAttribute('aria-labelledby');
    if (by) return by.split(/\\s+/).map((id) => document.getElementById(id)?.textContent || '').join(' ').trim();
    return (el.getAttribute('aria-label') || (el.labels && el.labels[0]?.textContent) || el.innerText || el.textContent || el.querySelector?.('img[alt]')?.alt || el.title || el.placeholder || el.value || '').replace(/\\s+/g, ' ').trim().slice(0, 80);
  };
  const path = (href) => { try { const u = new URL(href, location.href); return u.origin === location.origin ? u.pathname + u.hash : u.href; } catch { return href; } };
  return {
    url: location.href,
    title: document.title,
    links: [...document.querySelectorAll('a[href]')].map((a) => ({ href: path(a.getAttribute('href')), name: name(a), hidden: !visible(a) })),
    headings: [...document.querySelectorAll('h1,h2,h3,h4')].map((h) => ({ level: +h.tagName[1], text: h.textContent.replace(/\\s+/g, ' ').trim().slice(0, 80) })),
    landmarks: [...document.querySelectorAll('header,nav,main,footer,aside,[role=banner],[role=navigation],[role=main],[role=contentinfo],[role=search]')].map((l) => (l.getAttribute('role') || l.tagName.toLowerCase()) + (l.getAttribute('aria-label') ? ':' + l.getAttribute('aria-label') : '')),
    forms: [...document.querySelectorAll('form')].map((f) => ({
      action: f.getAttribute('action') || '', method: (f.getAttribute('method') || 'get').toLowerCase(),
      fields: [...f.elements].filter((e) => e.name).map((e) => ({ name: e.name, type: e.type, required: !!e.required })),
    })),
    controls: [...document.querySelectorAll('button,[role=button],input[type=submit],input[type=button],select,summary,[role=tab],[role=switch],[role=menuitem]')].map((b) => ({ kind: b.getAttribute('role') || b.tagName.toLowerCase(), name: name(b), hidden: !visible(b) })),
    testIds: [...document.querySelectorAll('[data-testid],[data-test],[data-cy]')].map((e) => e.getAttribute('data-testid') || e.getAttribute('data-test') || e.getAttribute('data-cy')),
    analytics: [...document.querySelectorAll('*')].flatMap((e) => [...e.attributes].filter((a) => /^data-(analytics|track|event|ga|gtm)/.test(a.name)).map((a) => a.name + '=' + a.value)),
    shortcuts: [...document.querySelectorAll('[accesskey],[aria-keyshortcuts]')].map((e) => e.getAttribute('aria-keyshortcuts') || 'accesskey:' + e.getAttribute('accesskey')),
  };
})()`;

const page = await launch();
const pages = [];
try {
  const start = new URL(toUrl(target));
  const queue = [start.href], seen = new Set();
  while (queue.length && pages.length < crawl) {
    const url = queue.shift();
    const key = url.split('#')[0];
    if (seen.has(key)) continue;
    seen.add(key);
    await page.open(url, width);
    const rec = await page.evaluate(COLLECT);
    pages.push(rec);
    for (const l of rec.links) {
      // Same-origin pages only; files (PDFs, images, archives) are links to check, not pages to crawl.
      const isFile = /\.(pdf|zip|png|jpe?g|gif|webp|avif|svg|mp4|webm|docx?|xlsx?|csv|json|xml|txt)(\?|#|$)/i.test(l.href);
      if (l.href.startsWith('/') && !isFile && start.protocol.startsWith('http')) queue.push(new URL(l.href, start).href.split('#')[0]);
    }
  }
} finally {
  await page.close();
}

const keyOf = (u) => { try { return new URL(u).pathname; } catch { return u; } };
const record = { target, width, pages: Object.fromEntries(pages.map((p) => [keyOf(p.url), p])) };

const outFile = flag('--out');
if (outFile) {
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, JSON.stringify(record, null, 2) + '\n');
  const n = (k) => pages.reduce((s, p) => s + p[k].length, 0);
  console.log(`parity record of ${pages.length} page(s): ${n('links')} links, ${n('headings')} headings, ${n('forms')} forms, ${n('controls')} controls, ${n('testIds')} test ids, ${n('analytics')} analytics hooks`);
  console.log(`written to ${outFile}`);
}

const againstFile = flag('--against');
if (againstFile) {
  const before = JSON.parse(readFileSync(againstFile, 'utf8'));
  const errors = [], warns = [], notes = [];
  for (const [path, b] of Object.entries(before.pages)) {
    const a = record.pages[path];
    if (!a) { errors.push(`page ${path} is gone (or not reachable by the crawl)`); continue; }
    const linkKey = (l) => l.href;
    // The same href can appear several times (nav, body, footer): compare every copy.
    const aLinks = new Map();
    for (const l of a.links) aLinks.set(linkKey(l), [...(aLinks.get(linkKey(l)) || []), l]);
    for (const l of b.links) {
      const now = aLinks.get(linkKey(l));
      if (!now) errors.push(`${path}: link to ${l.href} ("${l.name}") is gone`);
      else if (l.name && !now.some((n) => n.name === l.name)) warns.push(`${path}: link to ${l.href} renamed "${l.name}" → "${now[0].name}"`);
      else if (!l.hidden && now.every((n) => n.hidden)) warns.push(`${path}: link to ${l.href} is now hidden at ${width}px`);
    }
    const ctrl = (c) => `${c.kind}:${c.name}`;
    const aCtrls = new Set(a.controls.map(ctrl));
    for (const c of b.controls) if (c.name && !aCtrls.has(ctrl(c))) warns.push(`${path}: control ${c.kind} "${c.name}" not found (removed or renamed)`);
    const fieldKey = (f) => `${f.action}|${f.fields.map((x) => x.name).join(',')}`;
    const aForms = new Set(a.forms.map(fieldKey));
    for (const f of b.forms) if (!aForms.has(fieldKey(f))) errors.push(`${path}: form ${f.action || '(no action)'} with fields [${f.fields.map((x) => x.name).join(', ')}] changed or is gone`);
    for (const id of b.testIds) if (!a.testIds.includes(id)) errors.push(`${path}: data-testid "${id}" is gone (tests will break)`);
    for (const h of b.analytics) if (!a.analytics.includes(h)) errors.push(`${path}: analytics hook ${h} is gone`);
    for (const s of b.shortcuts) if (!a.shortcuts.includes(s)) errors.push(`${path}: keyboard shortcut ${s} is gone`);
    for (const l of b.landmarks) if (!a.landmarks.includes(l)) warns.push(`${path}: landmark ${l} is gone`);
    const bH = b.headings.map((h) => h.text), aH = new Set(a.headings.map((h) => h.text));
    for (const t of bH) if (t && !aH.has(t)) notes.push(`${path}: heading "${t}" changed or is gone`);
    if (b.title !== a.title) notes.push(`${path}: title "${b.title}" → "${a.title}"`);
    const bLinks = new Set(b.links.map(linkKey));
    for (const l of a.links) if (!bLinks.has(linkKey(l))) notes.push(`${path}: new link to ${l.href} ("${l.name}")`);
  }
  for (const e of errors) console.log(`ERROR ${e}`);
  for (const w of warns) console.log(`WARN  ${w}`);
  for (const n of notes) console.log(`NOTE  ${n}`);
  console.log(`\n${errors.length} error(s), ${warns.length} warning(s), ${notes.length} note(s). Every ERROR and WARN needs the user's sign-off or a fix.`);
  process.exitCode = errors.length ? 1 : 0;
}
