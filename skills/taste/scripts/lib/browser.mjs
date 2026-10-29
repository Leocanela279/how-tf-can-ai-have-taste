// Zero-dependency headless browser over the Chrome DevTools Protocol.
// Drives an installed Chrome, Chromium, Edge or Brave; set CHROME_PATH to use another.
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  join(homedir(), 'Applications/Google Chrome.app/Contents/MacOS/Google Chrome'),
  '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium',
  '/usr/bin/chromium-browser', '/usr/bin/brave-browser', '/usr/bin/microsoft-edge',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
];

// Viewport height used for each width, so every run frames the same first screen.
export const HEIGHTS = { 390: 844, 768: 1024, 1024: 768, 1440: 900 };

export function findBrowser() {
  const env = process.env.CHROME_PATH;
  if (env && existsSync(env)) return env;
  return CANDIDATES.find((c) => existsSync(c)) ?? null;
}

// A page argument may be a URL or a local file path.
export function toUrl(target) {
  return /^[a-z]+:\/\//i.test(target) ? target : pathToFileURL(resolve(target)).href;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function devtoolsPort(profile, proc) {
  const file = join(profile, 'DevToolsActivePort');
  for (let i = 0; i < 200; i++) {
    if (proc.exitCode !== null) throw new Error(`Browser exited early (code ${proc.exitCode})`);
    if (existsSync(file)) {
      const [port] = readFileSync(file, 'utf8').split('\n');
      if (port) return Number(port);
    }
    await sleep(100);
  }
  throw new Error('Browser did not start within 20s');
}

class Page {
  constructor(ws) {
    this.ws = ws;
    this.seq = 0;
    this.pending = new Map();
    this.waiters = [];
    ws.addEventListener('message', (e) => {
      const msg = JSON.parse(e.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { ok, fail } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        msg.error ? fail(new Error(msg.error.message)) : ok(msg.result);
      } else if (msg.method) {
        this.waiters = this.waiters.filter((w) => (w.method === msg.method ? (w.ok(msg.params), false) : true));
      }
    });
  }

  send(method, params = {}) {
    const id = ++this.seq;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((ok, fail) => this.pending.set(id, { ok, fail }));
  }

  once(method, timeout = 30000) {
    return new Promise((ok) => {
      const timer = setTimeout(() => ok(null), timeout);
      this.waiters.push({ method, ok: (p) => { clearTimeout(timer); ok(p); } });
    });
  }

  async evaluate(expression) {
    const { result, exceptionDetails } = await this.send('Runtime.evaluate', {
      expression, returnByValue: true, awaitPromise: true,
    });
    if (exceptionDetails) throw new Error(exceptionDetails.exception?.description ?? exceptionDetails.text);
    return result.value;
  }

  // Record LCP, layout shifts and long tasks from the first byte of every page loaded after this.
  async instrument() {
    await this.send('Page.addScriptToEvaluateOnNewDocument', { source: `
      window.__tastePerf = { lcp: null, cls: 0, longTasks: [], frames: [] };
      const watch = (type, fn) => {
        try { new PerformanceObserver((list) => list.getEntries().forEach(fn)).observe({ type, buffered: true }); } catch {}
      };
      watch('largest-contentful-paint', (e) => { __tastePerf.lcp = e; });
      watch('layout-shift', (e) => { if (!e.hadRecentInput) __tastePerf.cls += e.value; });
      watch('longtask', (e) => __tastePerf.longTasks.push(Math.round(e.duration)));
      watch('long-animation-frame', (e) => __tastePerf.frames.push(Math.round(e.duration)));
    ` });
  }

  // Slow the CPU down to approximate a mid-range phone (1 = off).
  async throttle(rate) {
    await this.send('Emulation.setCPUThrottlingRate', { rate });
  }

  async reducedMotion(on) {
    await this.send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-motion', value: on ? 'reduce' : 'no-preference' }],
    });
  }

  async viewport(width) {
    const height = HEIGHTS[width] ?? Math.round(width * 0.625);
    await this.send('Emulation.setDeviceMetricsOverride', {
      width, height, deviceScaleFactor: 1, mobile: width < 768,
    });
    return height;
  }

  // Load, wait for fonts, then scroll the whole page once so lazy and scroll-revealed content renders.
  async open(target, width = 1440) {
    await this.send('Page.enable');
    await this.viewport(width);
    const loaded = this.once('Page.loadEventFired');
    await this.send('Page.navigate', { url: toUrl(target) });
    await loaded;
    await this.evaluate('document.fonts.ready.then(() => true)');
    await this.evaluate(`(async () => {
      const step = innerHeight * 0.8;
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        scrollTo(0, y); await new Promise((r) => setTimeout(r, 120));
      }
      scrollTo(0, 0); await new Promise((r) => setTimeout(r, 600));
    })()`);
  }

  async screenshot() {
    const { data } = await this.send('Page.captureScreenshot', { format: 'png' });
    return Buffer.from(data, 'base64');
  }
}

export async function launch() {
  const exe = findBrowser();
  if (!exe) throw new Error('No Chrome, Chromium, Edge or Brave found. Install one or set CHROME_PATH.');
  const profile = mkdtempSync(join(tmpdir(), 'taste-browser-'));
  const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
  const proc = spawn(exe, [
    '--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', '--mute-audio',
    '--force-color-profile=srgb',
    // Chrome refuses to start sandboxed as root (containers, CI).
    ...(process.getuid?.() === 0 ? ['--no-sandbox'] : []),
    // Headless Chrome ignores proxy env vars; pass one through when set.
    ...(proxy ? [`--proxy-server=${proxy}`] : []),
    'about:blank',
  ], { stdio: 'ignore' });

  try {
    const port = await devtoolsPort(profile, proc);
    const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    const target = targets.find((t) => t.type === 'page');
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((ok, fail) => { ws.onopen = ok; ws.onerror = () => fail(new Error('DevTools socket failed')); });
    const page = new Page(ws);
    page.close = async () => {
      ws.close();
      proc.kill();
      await new Promise((r) => (proc.exitCode !== null ? r() : proc.once('exit', r)));
      // Chrome's helpers can still be writing to the profile; leftovers in tmp are harmless.
      try { rmSync(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 }); } catch {}
    };
    return page;
  } catch (err) {
    proc.kill();
    rmSync(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
    throw err;
  }
}
