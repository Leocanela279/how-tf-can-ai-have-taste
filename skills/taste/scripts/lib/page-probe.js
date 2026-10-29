// In-page probe. Evaluated inside a rendered page (by probe.mjs, or pasted into devtools) and
// returns the page's real design profile plus the raw numbers the checks need.
// It measures what is rendered, not what the CSS declares.
(() => {
  const round = (n, d = 2) => Math.round(n * 10 ** d) / 10 ** d;
  const tally = (map, key, w = 1) => map.set(key, (map.get(key) || 0) + w);
  const top = (map, n = 12) =>
    [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, n)
      .map(([value, weight]) => ({ value, weight: Math.round(weight) }));
  const share = (map, total) =>
    [...map.entries()].sort((a, b) => b[1] - a[1])
      .map(([value, w]) => ({ value, share: round(w / Math.max(total, 1)) }));

  // Colour maths for WCAG contrast.
  const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  const parse = (c) => {
    const m = c.match(/^rgba?\(([^)]+)\)$/);
    if (m) {
      const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
      return { r, g, b, a };
    }
    // oklch(), color(), lab() and friends: let the canvas convert to sRGB.
    if (c === 'transparent' || c.includes('/ 0)')) return { r: 0, g: 0, b: 0, a: 0 };
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = c;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    return { r, g, b, a: a / 255 };
  };
  const over = (top, under) => ({
    r: top.r * top.a + under.r * (1 - top.a),
    g: top.g * top.a + under.g * (1 - top.a),
    b: top.b * top.a + under.b * (1 - top.a),
    a: 1,
  });
  const lum = ({ r, g, b }) => {
    const f = (v) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const ratio = (a, b) => {
    const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
  };
  // The colour actually behind an element, compositing translucent layers. Null when an image or
  // gradient sits behind it, because contrast can't be known from styles then.
  const backdrop = (el) => {
    const layers = [];
    for (let n = el; n; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.backgroundImage !== 'none') return null;
      const c = parse(cs.backgroundColor);
      if (c && c.a > 0) { layers.push(c); if (c.a >= 1) break; }
    }
    let base = { r: 255, g: 255, b: 255, a: 1 };
    for (const c of layers.reverse()) base = over(c, base);
    return base;
  };
  // Rendered line count of an element's text.
  const lines = (el) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    const tops = new Set([...range.getClientRects()].filter((r) => r.width > 1).map((r) => Math.round(r.top)));
    return tops.size;
  };

  const vw = innerWidth;
  const fonts = new Map(), sizes = new Map(), weights = new Map(), inks = new Map(),
    grounds = new Map(), radii = new Map(), shadows = new Map(), spacing = new Map(), bodySizes = new Map();
  let gradients = 0, borders = 0, blur = 0, transitionAll = 0, monoText = 0, totalText = 0;
  const smallCaps = [], tinyText = [], lowContrast = [], smallTargets = [], blurSurfaces = [];
  // Phone checks (reports/Mobile first UI taste.md): touch targets, form text, thin small text,
  // centred paragraphs, and what the first screen holds.
  const touchTargets = [], smallInputs = [], thinSmall = [], centred = [];
  const proseSizes = new Map();
  const vh = innerHeight;
  let firstWords = 0, firstVisual = false, bottomBandFilled = false;
  const inFirst = (r) => r.top < vh && r.bottom > 0;
  const inBottomBand = (r) => r.top < vh && r.bottom > vh * 0.7;
  let largest = { size: 0 };

  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || Number(cs.opacity) === 0) continue;

    if (cs.backgroundColor !== 'rgba(0, 0, 0, 0)') tally(grounds, cs.backgroundColor, (r.width * r.height) / 1e4);
    // Gradients that read as surfaces; thin animated link underlines don't count.
    if (cs.backgroundImage.includes('gradient') && r.width >= 48 && r.height >= 32 &&
        !/(^|\s)(0%|0px|1px|2px)(\s|$)/.test(cs.backgroundSize)) gradients++;
    if (cs.backdropFilter && cs.backdropFilter !== 'none') {
      blur++;
      const fill = parse(cs.backgroundColor);
      blurSurfaces.push({
        radius: parseFloat((cs.backdropFilter.match(/blur\(([\d.]+)px\)/) || [])[1] || 0),
        areaShare: round((r.width * Math.min(r.height, innerHeight)) / (vw * innerHeight)),
        fillAlpha: fill ? round(fill.a) : 0,
      });
    }
    if (cs.boxShadow !== 'none') tally(shadows, cs.boxShadow);
    if (cs.borderRadius !== '0px') tally(radii, cs.borderRadius);
    if (cs.transitionProperty.split(',').some((p) => p.trim() === 'all') &&
        cs.transitionDuration.split(',').some((d) => parseFloat(d) > 0)) transitionAll++;
    if (['Top', 'Right', 'Bottom', 'Left'].some((s) =>
      parseFloat(cs[`border${s}Width`]) > 0 && cs[`border${s}Style`] !== 'none')) borders++;
    for (const p of ['paddingTop', 'paddingLeft', 'marginTop', 'marginBottom', 'rowGap', 'columnGap']) {
      const v = parseFloat(cs[p]);
      if (v > 0) tally(spacing, Math.round(v));
    }

    // Product fragments shown as pictures are measured for the profile but not held to the checks.
    const picture = el.closest('[data-ui], [aria-hidden="true"], [inert]');

    // Interactive targets; links inside running text are exempt (WCAG 2.5.8).
    const srOnly = r.width <= 1 && r.height <= 1;
    if (!picture && !srOnly && el.matches('button, a[href], input:not([type=hidden]), select, textarea, summary, [role=button]')) {
      const inline = el.matches('a') && [...el.parentElement.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      const label = (el.textContent || el.getAttribute('aria-label') || el.tagName).trim().slice(0, 40);
      if (!inline && (r.width < 24 || r.height < 24)) {
        smallTargets.push({ text: label, w: Math.round(r.width), h: Math.round(r.height) });
      } else if (!inline && (r.width < 44 || r.height < 44)) {
        touchTargets.push({ text: label, w: Math.round(r.width), h: Math.round(r.height) });
      }
      if (el.matches('input:not([type=checkbox]):not([type=radio]):not([type=range]), select, textarea') && parseFloat(cs.fontSize) < 16) {
        smallInputs.push({ field: el.name || el.type || el.tagName.toLowerCase(), size: parseFloat(cs.fontSize) });
      }
    }

    // A real picture or media in the first screen (not icons).
    if (!picture && el.matches('img, picture, video, canvas, svg') && r.width >= 120 && r.height >= 80) {
      if (inFirst(r)) firstVisual = true;
      if (inBottomBand(r)) bottomBandFilled = true;
    }
    if (!picture && el.matches('button, a[href], input, select, textarea') && inBottomBand(r)) bottomBandFilled = true;

    // Text: only elements that own a non-empty text node.
    const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').trim();
    if (!own) continue;
    const chars = own.length, size = parseFloat(cs.fontSize);
    const family = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim();
    totalText += chars;
    tally(fonts, family, chars);
    tally(sizes, round(size, 1), chars);
    tally(weights, cs.fontWeight, chars);
    tally(inks, cs.color, chars);
    if (chars > 80) tally(bodySizes, round(size, 1), chars);
    if (/mono|courier|consolas/i.test(cs.fontFamily) && !el.closest('pre, code, kbd, samp')) monoText += chars;
    if (cs.textTransform === 'uppercase' && size <= 14 && chars < 40) smallCaps.push(own.slice(0, 30));
    if (size < 12) tinyText.push({ text: own.slice(0, 30), size });
    if (Number(cs.fontWeight) <= 300 && size < 20) thinSmall.push({ text: own.slice(0, 30), size, weight: cs.fontWeight });
    if (inFirst(r)) firstWords += own.split(/\s+/).length;
    if (inBottomBand(r)) bottomBandFilled = true;
    if (el.matches('p, li, dd, blockquote') && chars > 80) {
      tally(proseSizes, round(size, 1), chars);
      if (cs.textAlign === 'center' && lines(el) > 2) centred.push(own.slice(0, 40));
    }

    const fg = parse(cs.color), bg = picture ? null : backdrop(el);
    if (fg && bg) {
      const contrast = ratio(over(fg, bg), bg);
      const large = size >= 24 || (size >= 18.66 && Number(cs.fontWeight) >= 700);
      if (contrast < (large ? 3 : 4.5)) lowContrast.push({ text: own.slice(0, 40), ratio: round(contrast), size, need: large ? 3 : 4.5 });
    }

    if (size > largest.size) {
      largest = {
        size, family, weight: cs.fontWeight, text: own.slice(0, 60),
        lineHeight: cs.lineHeight === 'normal' ? 'normal' : round(parseFloat(cs.lineHeight) / size),
        tracking: cs.letterSpacing === 'normal' ? 0 : round(parseFloat(cs.letterSpacing) / size, 3),
      };
    }
  }

  // Line length of running text, in characters per rendered line.
  const measures = [...document.querySelectorAll('p, li, dd, blockquote')]
    .filter((p) => p.textContent.trim().length > 160 && p.getBoundingClientRect().width > 0)
    .map((p) => Math.round(p.textContent.trim().length / Math.max(lines(p), 1)));
  measures.sort((a, b) => a - b);

  const headings = [...document.querySelectorAll('h1, h2, h3')]
    .filter((h) => h.getBoundingClientRect().width > 0)
    .map((h) => ({ tag: h.tagName.toLowerCase(), text: h.textContent.trim().slice(0, 50), lines: lines(h) }));

  const body = top(bodySizes, 1)[0]?.value ?? null;
  const proseTotal = [...proseSizes.values()].reduce((a, b) => a + b, 0);
  const proseUnder = (px) => round([...proseSizes].filter(([k]) => k < px).reduce((a, [, v]) => a + v, 0) / Math.max(proseTotal, 1));
  const h1 = [...document.querySelectorAll('h1')].find((h) => h.getBoundingClientRect().width > 0);
  const viewportMeta = document.querySelector('meta[name=viewport]')?.content || '';
  const overflowingHeadings = [...document.querySelectorAll('h1, h2')]
    .filter((h) => h.getBoundingClientRect().width > 0 && (h.scrollWidth > h.clientWidth + 1 || h.getBoundingClientRect().right > vw + 1))
    .map((h) => h.textContent.trim().slice(0, 40));
  const text = document.body.innerText;

  // Performance: what loading and motion cost. __tastePerf exists when probe.mjs instrumented the load.
  const P = window.__tastePerf || null;
  const lcpEl = P?.lcp?.element || null;
  const bytes = { script: 0, css: 0, font: 0, image: 0 };
  let unknownSizes = 0;
  for (const e of performance.getEntriesByType('resource')) {
    const kind = /\.(woff2?|ttf|otf)(\?|$)/.test(e.name) ? 'font'
      : e.initiatorType === 'script' ? 'script'
      : /\.css(\?|$)|fonts\.googleapis\.com/.test(e.name) ? 'css'
      : e.initiatorType === 'img' || /\.(png|jpe?g|webp|avif|gif|svg)(\?|$)/.test(e.name) ? 'image' : null;
    if (!kind) continue;
    const size = e.transferSize || e.encodedBodySize;
    if (size) bytes[kind] += size; else unknownSizes++;
  }
  const blockingScripts = [...document.head.querySelectorAll('script[src]')]
    .filter((s) => !s.async && !s.defer && s.type !== 'module').map((s) => s.src);
  const motionProps = (a) => {
    const props = new Set();
    try { for (const k of a.effect.getKeyframes()) for (const p of Object.keys(k)) props.add(p); } catch {}
    if (a.transitionProperty) props.add(a.transitionProperty);
    for (const p of ['offset', 'easing', 'composite', 'computedOffset']) props.delete(p);
    return [...props];
  };
  const COMPOSITED = /^(transform|translate|scale|rotate|opacity|filter)$/;
  const anims = document.getAnimations().map((a) => ({
    name: a.animationName || a.transitionProperty || 'script',
    props: motionProps(a),
    infinite: a.effect?.getTiming?.().iterations === Infinity,
  }));

  const perf = {
    lcp: P?.lcp ? {
      ms: Math.round(P.lcp.startTime),
      tag: lcpEl?.tagName?.toLowerCase() ?? null,
      lazy: lcpEl?.getAttribute?.('loading') === 'lazy',
      priority: lcpEl?.getAttribute?.('fetchpriority') ?? null,
      what: (lcpEl?.currentSrc || lcpEl?.textContent || '').trim().slice(0, 50),
    } : null,
    cls: P ? round(P.cls, 3) : null,
    longTasks: P ? { count: P.longTasks.length, longest: Math.max(0, ...P.longTasks) } : null,
    longFrames: P ? { count: P.frames.length, longest: Math.max(0, ...P.frames) } : null,
    blockingScripts,
    runtimeCss: blockingScripts.concat([...document.scripts].map((s) => s.src)).some((s) => /cdn\.tailwindcss\.com/.test(s)),
    kb: Object.fromEntries(Object.entries(bytes).map(([k, v]) => [k, Math.round(v / 1024)])),
    unknownSizes,
    fontsLoaded: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family.replace(/["']/g, '')} ${f.weight}`),
    animations: {
      running: anims.length,
      nonComposited: anims.filter((a) => a.props.some((p) => !COMPOSITED.test(p))).slice(0, 6),
      infinite: anims.filter((a) => a.infinite).length,
      moving: anims.filter((a) => a.props.some((p) => /^(transform|translate|scale|rotate)$/.test(p))).length,
    },
    blurSurfaces,
  };

  return {
    url: location.href,
    viewport: { width: vw, height: innerHeight },
    pageHeightScreens: round(document.documentElement.scrollHeight / innerHeight, 1),
    type: {
      families: share(fonts, totalText).slice(0, 5),
      weights: share(weights, totalText).slice(0, 6),
      sizesPx: share(sizes, totalText).slice(0, 14),
      distinctSizes: sizes.size,
      bodySizePx: body,
      largest: { ...largest, vw: round((largest.size / vw) * 100, 1) },
      headlineToBody: body ? round(largest.size / body, 1) : null,
      measureChars: measures.length ? { median: measures[Math.floor(measures.length / 2)], max: measures.at(-1) } : null,
      monospaceShareOutsideCode: round(monoText / Math.max(totalText, 1)),
    },
    color: { inks: top(inks, 8), grounds: top(grounds, 8) },
    shape: { radii: top(radii, 8), shadows: top(shadows, 5), elementsWithBorders: borders, gradients, backdropBlur: blur },
    spacingPx: top(spacing, 16).sort((a, b) => a.value - b.value),
    perf,
    findings: {
      overflowX: document.documentElement.scrollWidth > vw + 1,
      lowContrast: lowContrast.slice(0, 10), lowContrastCount: lowContrast.length,
      smallTargets: smallTargets.slice(0, 10), smallTargetCount: smallTargets.length,
      tinyText: tinyText.slice(0, 5), tinyTextCount: tinyText.length,
      smallCapsLabels: smallCaps.slice(0, 6), smallCapsCount: smallCaps.length,
      headings,
      overflowingHeadings,
      transitionAll,
      imagesWithoutAlt: document.querySelectorAll('img:not([alt])').length,
      placeholderText: /lorem ipsum|john doe|jane doe|\bacme\b/i.test(text),
      touchTargets: touchTargets.slice(0, 10), touchTargetCount: touchTargets.length,
      smallInputs: smallInputs.slice(0, 5),
      zoomLocked: /maximum-scale\s*=\s*1(\.0)?\b|user-scalable\s*=\s*(no|0)/i.test(viewportMeta),
      prose: proseTotal ? { under16: proseUnder(16), under14: proseUnder(14) } : null,
      thinSmall: thinSmall.slice(0, 5), thinSmallCount: thinSmall.length,
      centredParagraphs: centred.slice(0, 5),
      firstScreen: {
        words: firstWords,
        visual: firstVisual,
        bottomBandFilled,
        h1Top: h1 ? round(h1.getBoundingClientRect().top / vh) : null,
      },
      emoji: (text.match(/\p{Emoji_Presentation}|\p{Extended_Pictographic}️/gu) || []).length,
    },
  };
})();
