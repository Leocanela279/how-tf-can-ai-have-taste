import { mkdir, rm, writeFile, copyFile, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { site, projects } from "./content.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, "dist");

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const handle = new URL(site.github).pathname.split("/").filter(Boolean)[0];
const githubLabel = `github.com/${handle}`;
const initials = site.name
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 2)
  .map((word) => word[0].toUpperCase())
  .join("");

const themeIcon = `<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.75" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 1.25a6.75 6.75 0 0 0 0 13.5Z" fill="currentColor"/></svg>`;

const pinIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" stroke-linejoin="round"/><circle cx="12" cy="10" r="2.25"/></svg>`;

const linkIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M10.2 13.2a4.2 4.2 0 0 0 6 0l1.6-1.6a4.2 4.2 0 0 0-6-6L10.4 7" stroke-linecap="round"/><path d="M13.8 10.8a4.2 4.2 0 0 0-6 0l-1.6 1.6a4.2 4.2 0 0 0 6 6l1.4-1.4" stroke-linecap="round"/></svg>`;

const openIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const externalIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M14 6h4v4M18 6l-8 8" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 13.5V18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

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
function tick(){if(c)c.textContent=f.format(new Date());}
tick();setInterval(tick,15000);
var b=document.querySelector("[data-theme-toggle]");
var m=document.querySelector('meta[name="theme-color"]');
function paint(){
var dark=document.documentElement.dataset.theme==="dark";
if(b)b.setAttribute("aria-pressed",String(dark));
if(m)m.setAttribute("content",dark?"#111110":"#fafaf8");
}
paint();
if(b)b.addEventListener("click",function(){
var n=document.documentElement.dataset.theme==="dark"?"light":"dark";
document.documentElement.dataset.theme=n;
try{localStorage.setItem("theme",n);}catch(e){}
paint();
});
var tabs=document.querySelectorAll("[data-tab]");
function syncTab(){
if(!tabs.length)return;
var id=location.hash==="#contact"?"#contact":"#projects";
tabs.forEach(function(t){
if(t.getAttribute("href")===id)t.setAttribute("aria-current","true");
else t.removeAttribute("aria-current");
});
}
if(tabs.length){syncTab();window.addEventListener("hashchange",syncTab);}
})();`;

function avatar(large) {
  return `<div class="avatar${large ? " avatar-lg" : ""}" aria-hidden="true">${esc(initials)}</div>`;
}

function bar(opts = {}) {
  const leading = opts.back
    ? `<a class="bar-back" href="${opts.back.href}">← ${esc(opts.back.label)}</a>`
    : `<div class="bar-id"><p class="bar-name">${esc(opts.title)}</p>${
        opts.subtitle ? `<p class="bar-sub">${esc(opts.subtitle)}</p>` : ""
      }</div>`;
  return `<header class="bar">
  ${leading}
  <button class="icon" type="button" aria-label="Toggle dark mode" aria-pressed="false" data-theme-toggle>${themeIcon}</button>
</header>`;
}

const contactLine = `<p class="contact-line">Write to me at <a class="mail u" href="mailto:${site.email}">${esc(site.email)}</a>.</p>`;

function page({ title, description, body }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#fafaf8">
<link rel="preload" href="/fonts/geist-latin-ext-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/geist-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/styles.css">
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><circle cx="8" cy="8" r="4" fill="#d4572a"/></svg>')}">
<script>${headScript}</script>
</head>
<body>
<div class="col">
${body}
</div>
<script>${bodyScript}</script>
</body>
</html>
`;
}

function profile() {
  const count = projects.length;
  const label = count === 1 ? "Project" : "Projects";
  return `<section class="profile" aria-labelledby="today">
  <h2 id="today" class="sr-only">Today</h2>
  <div class="banner" aria-hidden="true"></div>
  <div class="profile-body">
    ${avatar(true)}
    <h1 class="display">${esc(site.name)}</h1>
    <p class="handle"><a href="${site.github}" target="_blank" rel="noopener">@${esc(handle)}</a></p>
    <p class="role">${esc(site.role)}</p>
    <p class="bio">${esc(site.today)}</p>
    <ul class="meta">
      <li>${pinIcon}<span>${esc(site.city)}</span></li>
      <li>${linkIcon}<a href="${site.github}" target="_blank" rel="noopener">${esc(githubLabel)}</a></li>
      <li class="clock"><span class="live" aria-hidden="true"></span><span class="sr-only">${esc(site.city)} time </span><span data-clock>${nowInCity()}</span></li>
    </ul>
    <p class="stats"><a href="#projects"><strong>${count}</strong> ${label}</a></p>
  </div>
</section>`;
}

function postCard(p) {
  return `<article class="post">
  ${avatar(false)}
  <div class="post-main">
    <div class="by">
      <a class="by-name" href="/work/${p.slug}/">${esc(site.name)}</a>
      <span class="by-handle">@${esc(handle)}</span>
      <span class="sep" aria-hidden="true">·</span>
      <a class="by-time" href="/work/${p.slug}/"><time datetime="${esc(p.year)}">${esc(p.year)}</time></a>
    </div>
    <h3 class="post-title"><a href="/work/${p.slug}/">${esc(p.title)}</a></h3>
    <div class="copy">
${p.body.map((t) => `      <p>${esc(t)}</p>`).join("\n")}
    </div>
    <div class="actions">
      <a class="action" href="/work/${p.slug}/">${openIcon}<span>Project page</span></a>
      <a class="action" href="${p.link.href}" target="_blank" rel="noopener">${externalIcon}<span>${esc(p.link.text)}</span></a>
    </div>
  </div>
</article>`;
}

function home() {
  const count = projects.length;
  const noun = count === 1 ? "project" : "projects";
  const body = `${bar({ title: site.name, subtitle: `${count} ${noun}` })}
<main>
${profile()}
<nav class="tabs" aria-label="Sections">
  <a class="tab" href="#projects" data-tab aria-current="true">Projects</a>
  <a class="tab" href="#contact" data-tab>Contact</a>
</nav>
<section class="feed" id="projects" aria-labelledby="projects-label">
  <h2 id="projects-label" class="sr-only">Projects</h2>
${projects.map(postCard).join("\n")}
  <p class="note">Each project has a page underneath.</p>
</section>
<section class="sec" id="contact" aria-labelledby="contact-label">
  <h2 id="contact-label">Contact</h2>
  ${contactLine}
</section>
</main>`;
  return page({
    title: `${site.name} — ${site.role}`,
    description: `${site.name}, ${site.role.toLowerCase()} in ${site.city}.`,
    body,
  });
}

function project(p, i) {
  const next = projects[(i + 1) % projects.length];
  const body = `${bar({ back: { href: "/", label: "All work" } })}
<main>
<section aria-labelledby="project-label">
  <h2 id="project-label" class="sr-only">Project</h2>
  <article class="detail">
    <div class="detail-author">
      ${avatar(false)}
      <div>
        <p class="by-name"><a href="/">${esc(site.name)}</a></p>
        <p class="by-handle"><a href="${site.github}" target="_blank" rel="noopener">@${esc(handle)}</a></p>
      </div>
    </div>
    <h1 class="detail-title">${esc(p.title)}</h1>
    <dl class="facts">
      <dt>Year</dt><dd><time datetime="${esc(p.year)}">${esc(p.year)}</time></dd>
      <dt>Role</dt><dd>${esc(p.role)}</dd>
      <dt>Stack</dt><dd class="chips">${p.stack.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</dd>
    </dl>
    <div class="copy copy-lg">
${p.body.map((t) => `      <p>${esc(t)}</p>`).join("\n")}
    </div>
  </article>
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
    <p><a class="hit" href="${p.link.href}" target="_blank" rel="noopener"><span class="u">${esc(p.link.text)}</span><span class="arrow" aria-hidden="true">↗</span></a></p>
    <p><a class="hit" href="/work/${next.slug}/"><span class="u">Next: ${esc(next.title)}</span><span class="arrow" aria-hidden="true">→</span></a></p>
    ${contactLine}
  </div>
</section>
</main>`;
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
await write(
  "404.html",
  page({
    title: `Not found — ${site.name}`,
    description: "This page doesn't exist.",
    body: `${bar({ back: { href: "/", label: "All work" } })}
<main>
<section class="empty">
  <h2 class="kicker">404</h2>
  <h1>Nothing here.</h1>
  <p>This page doesn't exist or has moved.</p>
</section>
</main>`,
  }),
);
console.log(`Built ${1 + projects.length} pages into dist/`);
