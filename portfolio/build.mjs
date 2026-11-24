import { mkdir, rm, writeFile, copyFile, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { site, projects } from "./content.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, "dist");

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const githubIcon = `<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>`;

const themeIcon = `<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.75" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 1.25a6.75 6.75 0 0 0 0 13.5Z" fill="currentColor"/></svg>`;

function nowInCity() {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: site.timeZone,
  }).format(new Date());
}

const headScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t;}catch(e){}})();`;

const bodyScript = `(function(){
var c=document.querySelector("[data-clock]");
var f=new Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",hour12:false,timeZone:${JSON.stringify(site.timeZone)}});
function tick(){if(c)c.textContent=${JSON.stringify(site.city + " ")}+f.format(new Date());}
tick();setInterval(tick,15000);
var b=document.querySelector("[data-theme-toggle]");
if(b)b.addEventListener("click",function(){
var d=document.documentElement,n=d.dataset.theme==="dark"?"light":"dark";
d.dataset.theme=n;b.setAttribute("aria-pressed",String(n==="dark"));
try{localStorage.setItem("theme",n);}catch(e){}
});
})();`;

function header({ nameTag }) {
  return `<header class="top">
  <div class="id">
    <${nameTag} class="name">${esc(site.name)}<span class="dot">.</span></${nameTag}>
    <p class="role">${esc(site.role)}</p>
  </div>
  <div class="meta">
    <p class="clock"><span class="live" aria-hidden="true"></span><span data-clock>${esc(site.city)} ${nowInCity()}</span></p>
    <div class="icons">
      <a class="icon" href="${site.github}" aria-label="GitHub" target="_blank" rel="noopener">${githubIcon}</a>
      <button class="icon" type="button" aria-label="Toggle dark mode" aria-pressed="false" data-theme-toggle>${themeIcon}</button>
    </div>
  </div>
</header>`;
}

const contactLine = `<p class="muted">Write to me at <a class="mail u" href="mailto:${site.email}">${esc(site.email)}</a>.</p>`;

function page({ title, description, body }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#fafaf8">
<link rel="preload" href="/fonts/geist-mono-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/geist-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/styles.css">
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><circle cx="8" cy="8" r="4" fill="#d4572a"/></svg>')}">
<script>${headScript}</script>
</head>
<body>
<main>
${body}
</main>
<script>${bodyScript}</script>
</body>
</html>
`;
}

function home() {
  const list = projects
    .map((p) => `      <li><a href="/work/${p.slug}/"><span class="u">${esc(p.title)}</span><span class="go" aria-hidden="true">→</span><span class="yr">${esc(p.year)}</span></a></li>`)
    .join("\n");
  const body = `${header({ nameTag: "h1" })}
<section class="sec" aria-labelledby="today">
  <h2 id="today">Today</h2>
  <p class="muted">${esc(site.today)}</p>
</section>
<section class="sec" aria-labelledby="projects">
  <h2 id="projects">Projects</h2>
  <div>
    <ul class="rows">
${list}
    </ul>
    <p class="muted">Each project has a page underneath.</p>
  </div>
</section>
<section class="sec" aria-labelledby="contact">
  <h2 id="contact">Contact</h2>
  ${contactLine}
</section>`;
  return page({
    title: `${site.name} — ${site.role}`,
    description: `${site.name}, ${site.role.toLowerCase()} in ${site.city}.`,
    body,
  });
}

function project(p, i) {
  const next = projects[(i + 1) % projects.length];
  const body = `${header({ nameTag: "p" })}
<section class="sec" aria-labelledby="project-label">
  <h2 id="project-label">Project</h2>
  <div>
    <p><a class="hit back" href="/"><span class="u">← All work</span></a></p>
    <h1 class="title">${esc(p.title)}</h1>
    <dl class="facts">
      <dt>Year</dt><dd>${esc(p.year)}</dd>
      <dt>Role</dt><dd>${esc(p.role)}</dd>
      <dt>Stack</dt><dd class="chips">${p.stack.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</dd>
    </dl>
    <div class="prose">
${p.body.map((t) => `      <p>${esc(t)}</p>`).join("\n")}
    </div>
  </div>
</section>
<section class="sec" aria-labelledby="underneath-label">
  <h2 id="underneath-label">Underneath</h2>
  <ul class="notes">
${p.underneath.map((t) => `    <li>${esc(t)}</li>`).join("\n")}
  </ul>
</section>
<section class="sec" aria-labelledby="links-label">
  <h2 id="links-label">Links</h2>
  <div class="links">
    <p><a class="hit ext" href="${p.link.href}" target="_blank" rel="noopener"><span class="u">${esc(p.link.text)}</span><span class="u arrow">↗</span></a></p>
    <p><a class="hit ext" href="/work/${next.slug}/"><span class="u">Next: ${esc(next.title)}</span><span class="u arrow">→</span></a></p>
    ${contactLine}
  </div>
</section>`;
  return page({
    title: `${p.title} — ${site.name}`,
    description: p.body[0],
    body,
  });
}

async function write(path, html) {
  const file = join(out, path);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

await rm(out, { recursive: true, force: true });
await mkdir(join(out, "fonts"), { recursive: true });
const fontDir = join(root, "node_modules/@fontsource-variable/geist/files");
for (const f of ["geist-latin-wght-normal.woff2", "geist-latin-ext-wght-normal.woff2"]) {
  await copyFile(join(fontDir, f), join(out, "fonts", f));
}
await copyFile(
  join(root, "node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2"),
  join(out, "fonts", "geist-mono-latin-wght-normal.woff2"),
);
await writeFile(join(out, "styles.css"), await readFile(join(root, "styles.css")));
await write("index.html", home());
for (const [i, p] of projects.entries()) await write(`work/${p.slug}/index.html`, project(p, i));
console.log(`Built ${1 + projects.length} pages into dist/`);
