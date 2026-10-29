#!/usr/bin/env node
// Screenshot a page (and optionally its reference) for the critique loop.
//   node shoot.mjs <url|file> --out design/shots/r1 [--ref <url|file>] [--widths 390,1024,1440] [--screens 6]
// Writes <page|ref>-<width>.png (first screen), <page|ref>-<width>-sN.png (each further screen,
// at 390 and 1440), and <page|ref>-1440-blur.png (8px blur, for the hierarchy test).
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { launch } from './lib/browser.mjs';

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(name);
  return i === -1 ? fallback : args[i + 1];
};
const valued = ['--out', '--ref', '--widths', '--screens'];
const target = args.find((a, i) => !a.startsWith('--') && !valued.includes(args[i - 1]));
const out = flag('--out');
if (!target || !out) {
  console.error('usage: shoot.mjs <url|file> --out <dir> [--ref <url|file>] [--widths 390,1024,1440] [--screens 6]');
  process.exit(2);
}
const widths = flag('--widths', '390,1024,1440').split(',').map(Number);
const maxScreens = Number(flag('--screens', 6));
const ref = flag('--ref');
mkdirSync(out, { recursive: true });

const written = [];
const save = (name, png) => {
  writeFileSync(join(out, name), png);
  written.push(join(out, name));
};

async function shoot(page, name, url) {
  for (const width of widths) {
    await page.open(url, width);
    save(`${name}-${width}.png`, await page.screenshot());

    if (width === 1440) {
      await page.evaluate("document.documentElement.style.filter = 'blur(8px)'");
      save(`${name}-1440-blur.png`, await page.screenshot());
      await page.evaluate("document.documentElement.style.filter = ''");
    }

    // The rest of the page, one screen at a time, so the critic sees whether the idea lasts.
    if (width === 390 || width === 1440) {
      const screens = await page.evaluate('Math.ceil(document.documentElement.scrollHeight / innerHeight)');
      for (let s = 2; s <= Math.min(screens, maxScreens); s++) {
        await page.evaluate(`scrollTo(0, ${s - 1} * innerHeight); new Promise((r) => setTimeout(r, 500))`);
        save(`${name}-${width}-s${s}.png`, await page.screenshot());
      }
      await page.evaluate('scrollTo(0, 0)');
    }
  }
}

const page = await launch();
try {
  await shoot(page, 'page', target);
  if (ref) await shoot(page, 'ref', ref);
} finally {
  await page.close();
}
console.log(written.join('\n'));
