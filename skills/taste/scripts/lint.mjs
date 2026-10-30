#!/usr/bin/env node
// Static checks on UI source for things code can prove.
//   node lint.mjs <files or folders...>
// ERROR = a defect. WARN = a default worth justifying in DESIGN.md (see references/tells.md).
// Exits 1 on any ERROR.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';

const EXTENSIONS = new Set(['.html', '.htm', '.css', '.scss', '.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte', '.astro', '.mdx']);
const SKIP = new Set(['node_modules', '.git', '.next', 'dist', 'build', 'out', '.svelte-kit', '.astro', 'design', 'coverage']);

// [level, id, pattern, message]. Patterns run per line.
const RULES = [
  ['ERROR', 'transition-all', /transition:\s*all\b|\btransition-all\b/, 'name the transitioned properties instead of `all`'],
  ['ERROR', 'scale-zero', /scale\(\s*0\s*\)|\bscale-0\b/, 'never animate from scale(0); start near 0.95 with opacity'],
  ['ERROR', 'placeholder', /lorem ipsum|john doe|jane doe|\bacme (inc|corp)\b/i, 'placeholder content; write the real copy'],
  ['ERROR', 'div-click', /<(div|span)\b[^>]*\bonClick=/, 'clickable div/span; use <button> or <a>'],
  ['ERROR', 'img-alt', /<img\b(?![^>]*\balt=)[^>]*>/, 'image without alt'],
  // Characters that render as emoji (not arrows or ©, which are pictographic but plain text).
  ['ERROR', 'emoji', /\p{Emoji_Presentation}|\p{Extended_Pictographic}️/u, 'emoji in UI source; use words or one icon set'],
  ['WARN', 'gradient-text', /background-clip:\s*text|\bbg-clip-text\b/, 'gradient text'],
  ['WARN', 'violet-default', /\b(from|via|to|bg|text)-(indigo|violet|purple)-\d{3}\b|#(6366f1|4f46e5|8b5cf6|7c3aed|a855f7)\b/i, 'indigo/violet default accent'],
  ['WARN', 'glass', /\bbackdrop-blur(-\w+)?\b|backdrop-filter:\s*blur/, 'glass / backdrop blur'],
  ['WARN', 'eyebrow', /\buppercase\b[^"'`]*\btracking-(wide|wider|widest)\b|\btracking-(wide|wider|widest)\b[^"'`]*\buppercase\b|text-transform:\s*uppercase[^}]*letter-spacing:\s*0?\.\d|letter-spacing:\s*0?\.\d[^}]*text-transform:\s*uppercase/, 'tracked uppercase label (eyebrow?)'],
  ['WARN', 'mono-label', /\bfont-mono\b/, 'monospace outside code'],
  ['WARN', 'attention-motion', /\banimate-(bounce|pulse|ping)\b/, 'attention-seeking loop animation'],
  ['WARN', 'slow-ui-motion', /\bduration-(500|700|1000)\b|(transition|animation)[^;]*(\b([5-9]\d\d|\d{4})ms|(^|[\s:])0?\.[5-9]\d*s\b|\b[1-9](\.\d+)?s\b)/, 'UI motion over 400ms'],
  ['WARN', 'filler-copy', /\b(elevate|seamless(ly)?|unlock|supercharge|revolutioni[sz]e|empower|cutting-edge|game-?chang\w*|next-level)\b/i, 'filler marketing copy'],
  ['WARN', 'arbitrary-value', /\b(text|p[xytrbl]?|m[xytrbl]?|gap|rounded|w|h|leading|tracking)-\[[^\]]+\]/, 'arbitrary Tailwind value; is it in the token plan?'],

  // Performance: see references/performance.md for the cheap twin of each.
  ['ERROR', 'runtime-css', /cdn\.tailwindcss\.com/, 'Tailwind Play CDN compiles CSS in the browser and blocks rendering; build the CSS instead'],
  ['ERROR', 'layout-animation', /transition(-property)?:[^;]*\b(width|height|top|left|right|bottom|margin[\w-]*|padding[\w-]*)\b|\btransition-\[(width|height|top|left|margin|padding)|animate=\{\{[^}]*\b(width|height|top|left)\s*:|gsap\.(to|from|fromTo)\([^)]*\b(width|height|top|left)\s*:/, 'animating a layout property; use transform (FLIP) instead'],
  ['WARN', 'shadow-animation', /transition(-property)?:[^;]*box-shadow|\btransition-shadow\b/, 'animated box-shadow repaints every frame; fade a pseudo-element shadow instead'],
  ['WARN', 'blur-radius', /blur\(\s*(1[1-9]|[2-9]\d|\d{3,})px\)|\b(backdrop-)?blur-(md|lg|xl|2xl|3xl)\b/, 'blur radius over 10px; keep it small and on small surfaces'],
  ['WARN', 'will-change', /will-change\s*:|translateZ\(0\)|\bwill-change-transform\b/, 'static will-change or translateZ(0) holds GPU memory; set it just before the change and remove after'],
  ['WARN', 'scroll-listener', /addEventListener\(\s*['"](scroll|wheel)['"]/, 'scroll listener driving styles; prefer position: sticky, animation-timeline or IntersectionObserver'],
  ['WARN', 'smooth-scroll-lib', /from\s+['"](lenis|@studio-freight\/lenis|locomotive-scroll)['"]|\b(new\s+Lenis|LocomotiveScroll)\b/, 'smooth-scroll library moves scrolling onto the main thread'],
  ['WARN', 'heavy-import', /^\s*import\s[^;]*from\s+['"](three|lottie-web|@lottiefiles\/[\w-]+)['"]/, 'heavy library imported eagerly; load it with import() when visible'],
  ['WARN', 'font-axes', /fonts\.googleapis\.com\/css2\?[^"'\s]*(opsz|wdth),/, 'Google Fonts optical-size or width axis range downloads a much larger file; pin the axis'],
  ['ERROR', 'img-size', /<img\b(?![^>]*\bwidth=)[^>]*>|<img\b(?![^>]*\bheight=)[^>]*>/, 'image without width and height causes layout shift'],
  ['WARN', 'gif', /\.gif\b/, 'animated GIF; a muted looping WebM is about 10x smaller'],

  // Components: see references/components.md.
  ['ERROR', 'tabindex-order', /tabIndex=\{?\s*["']?[1-9]|tabindex=["']?[1-9]/, 'positive tabindex scrambles keyboard order; use 0 or -1 and the DOM order'],
  ['WARN', 'hand-rolled-widget', /role=\{?\s*["'](dialog|alertdialog|menu|menubar|menuitem|listbox|combobox|tooltip|tablist|tab|tabpanel)["']/, 'hand-written widget role; use <dialog>, popover or a tested primitive (references/components.md)'],
  ['WARN', 'stale-library', /from\s+['"](vaul|radix-vue|cmdk|@headlessui\/vue)['"]/, 'unmaintained or frozen library (vaul, radix-vue, cmdk, Headless UI Vue); see references/components.md for the current choice'],
  ['WARN', 'kit-default-theme', /--primary:\s*(222\.2 47\.4% 11\.2%|oklch\(0\.205 0 0\))|#1976d2\b|#0d6efd\b/i, "a component kit's default theme is untouched (shadcn, MUI or Bootstrap); derive the tokens from DESIGN.md"],
];

// Files that import a tested primitive library get their widget roles from it.
const PRIMITIVE_IMPORT = /from\s+['"](@radix-ui\/|radix-ui|react-aria|@react-aria\/|@base-ui|@ark-ui\/|reka-ui|radix-vue|bits-ui|@headlessui\/|@melt-ui\/|@kobalte\/|@ariakit\/|@zag-js\/|cmdk|sonner)/;

// Checks that need more than one line: setState inside per-frame or scroll callbacks.
const FRAME_CALLBACK = /new IntersectionObserver|addEventListener\(\s*['"](scroll|pointermove|mousemove|wheel)['"]|requestAnimationFrame\(/;
const SET_STATE = /\bset[A-Z]\w*\(/;

// Paths inside the project print relative; anything outside prints absolute.
const display = (file) => {
  const rel = relative(process.cwd(), file);
  return rel.startsWith('..') ? resolve(file) : rel;
};

function* walk(path) {
  const stat = statSync(path);
  if (stat.isFile()) {
    if (EXTENSIONS.has(extname(path))) yield path;
    return;
  }
  for (const entry of readdirSync(path)) {
    if (SKIP.has(entry) || entry.startsWith('.')) continue;
    yield* walk(join(path, entry));
  }
}

const roots = process.argv.slice(2);
if (!roots.length) {
  console.error('usage: lint.mjs <files or folders...>');
  process.exit(2);
}

const findings = [];
let animates = false, reducedMotion = false, removesOutline = false, focusVisible = false;

for (const root of roots) {
  for (const file of walk(root)) {
    const source = readFileSync(file, 'utf8');
    if (/@keyframes|\banimation:|\btransition:|\banimate-|\btransition\b|framer-motion|motion\./.test(source)) animates = true;
    if (/prefers-reduced-motion|motion-reduce|motion-safe|useReducedMotion/.test(source)) reducedMotion = true;
    if (/outline:\s*(none|0)\b|\boutline-none\b/.test(source)) removesOutline = true;
    if (/focus-visible/.test(source)) focusVisible = true;

    const lines = source.split('\n');
    const usesPrimitives = PRIMITIVE_IMPORT.test(source);
    lines.forEach((line, i) => {
      if (/^\s*(\/\/|\/\*|\*|<!--)/.test(line)) return;
      for (const [level, id, pattern, message] of RULES) {
        if (id === 'hand-rolled-widget' && usesPrimitives) continue;
        if (pattern.test(line)) findings.push({ level, id, where: `${display(file)}:${i + 1}`, message });
      }
      if (FRAME_CALLBACK.test(line) && lines.slice(i, i + 10).some((l) => SET_STATE.test(l))) {
        findings.push({ level: 'WARN', id: 'state-per-frame', where: `${display(file)}:${i + 1}`, message: 'React state set inside a scroll, observer or frame callback; toggle a class or use a MotionValue instead' });
      }
    });

    // The first image on a page is often the LCP element; it must not wait for lazy loading.
    const firstImg = source.match(/<img\b[^>]*>/);
    if (firstImg && /loading=["']lazy["']/.test(firstImg[0])) {
      findings.push({ level: 'WARN', id: 'lazy-first-image', where: display(file), message: 'first image is loading="lazy"; if it is the hero, load it eagerly with fetchpriority="high"' });
    }
    if (/animation-timeline|@view-transition/.test(source) && !/@supports/.test(source)) {
      findings.push({ level: 'WARN', id: 'unsupported-fallback', where: display(file), message: 'animation-timeline or cross-document view transitions without @supports; Firefox lacks them' });
    }
  }
}

if (animates && !reducedMotion) findings.push({ level: 'ERROR', id: 'reduced-motion', where: '(project)', message: 'motion without a prefers-reduced-motion fallback' });
if (removesOutline && !focusVisible) findings.push({ level: 'ERROR', id: 'focus', where: '(project)', message: 'outlines removed and no :focus-visible style anywhere' });

// A warning repeated in one file is one decision; report it once with its count and first line.
// Arbitrary values only matter in bulk, so fewer than five of them are dropped.
const report = findings.filter((f) => f.level === 'ERROR');
const groups = Map.groupBy(findings.filter((f) => f.level === 'WARN'), (f) => `${f.where.split(':')[0]}|${f.id}`);
for (const hits of groups.values()) {
  const [first] = hits;
  if (first.id === 'arbitrary-value' && hits.length < 5) continue;
  report.push(hits.length === 1 ? first : { ...first, message: `${first.message} (${hits.length} places, first shown)` });
}

report.sort((a, b) => (a.level === b.level ? 0 : a.level === 'ERROR' ? -1 : 1));
for (const f of report) console.log(`${f.level.padEnd(5)} ${f.where}  ${f.id}: ${f.message}`);
const errors = report.filter((f) => f.level === 'ERROR').length;
console.log(`\n${errors} error(s), ${report.length - errors} warning(s). A WARN stays only if DESIGN.md justifies it.`);
process.exitCode = errors ? 1 : 0;
