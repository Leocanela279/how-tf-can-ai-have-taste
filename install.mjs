#!/usr/bin/env node
// Install the taste skills into any coding agent that reads SKILL.md folders.
//   npx github:Leocanela279/how-tf-can-ai-have-taste [--agent <ids>] [-g] [--dry-run] [--uninstall] [--list]
// No dependencies. Copies skills/taste and skills/taste-redesign (with their scripts and
// references) into each agent's skills folder. Both skills are always installed together:
// taste-redesign uses taste's scripts and library.
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const SKILLS = ['taste', 'taste-redesign'];
const home = homedir();

// Project and global skill folders per agent, from vercel-labs/skills docs/agents.md (2026-11).
// Most agents now share .agents/skills/ inside a project.
const AGENTS = {
  'claude-code': { name: 'Claude Code', project: '.claude/skills', global: join(home, '.claude/skills'), detect: join(home, '.claude') },
  codex: { name: 'Codex', project: '.agents/skills', global: join(home, '.agents/skills'), detect: join(home, '.codex') },
  cursor: { name: 'Cursor', project: '.agents/skills', global: join(home, '.cursor/skills'), detect: join(home, '.cursor') },
  'gemini-cli': { name: 'Gemini CLI', project: '.agents/skills', global: join(home, '.gemini/skills'), detect: join(home, '.gemini') },
  'github-copilot': { name: 'GitHub Copilot', project: '.agents/skills', global: join(home, '.copilot/skills'), detect: join(home, '.copilot') },
  opencode: { name: 'OpenCode', project: '.agents/skills', global: join(home, '.config/opencode/skills'), detect: join(home, '.config/opencode') },
  windsurf: { name: 'Windsurf', project: '.windsurf/skills', global: join(home, '.codeium/windsurf/skills'), detect: join(home, '.codeium/windsurf') },
  cline: { name: 'Cline', project: '.agents/skills', global: join(home, '.agents/skills'), detect: join(home, '.cline') },
  amp: { name: 'Amp', project: '.agents/skills', global: join(home, '.config/agents/skills'), detect: join(home, '.config/amp') },
  'kiro-cli': { name: 'Kiro CLI', project: '.kiro/skills', global: join(home, '.kiro/skills'), detect: join(home, '.kiro') },
  roo: { name: 'Roo Code', project: '.roo/skills', global: join(home, '.roo/skills'), detect: join(home, '.roo') },
  goose: { name: 'Goose', project: '.goose/skills', global: join(home, '.config/goose/skills'), detect: join(home, '.config/goose') },
  universal: { name: 'Any agent reading .agents/skills', project: '.agents/skills', global: join(home, '.agents/skills'), detect: null },
};

const args = process.argv.slice(2);
const has = (...f) => f.some((x) => args.includes(x));
const value = (f) => { const i = args.indexOf(f); return i === -1 ? null : args[i + 1]; };

if (has('--help', '-h')) {
  console.log(`Install the taste skills (taste + taste-redesign) into your coding agents.

  npx github:Leocanela279/how-tf-can-ai-have-taste            this project, detected agents
  npx github:Leocanela279/how-tf-can-ai-have-taste -g         your user folder, every project
  ... --agent claude-code,codex                               pick agents (see --list)
  ... --dry-run                                               show what would be written
  ... --uninstall                                             remove the skills again

Without --agent it installs for Claude Code and the shared .agents/skills folder (read by Codex,
Cursor, Gemini CLI, GitHub Copilot, OpenCode, Cline, Amp, Warp and others), plus any other agent
whose config folder exists in your home directory. The scripts need Node 22+ and a Chromium-based
browser.`);
  process.exit(0);
}
if (has('--list')) {
  for (const [id, a] of Object.entries(AGENTS)) console.log(`${id.padEnd(15)} ${a.name.padEnd(34)} ${a.project.padEnd(18)} ${a.global.replace(home, '~')}`);
  process.exit(0);
}

const global = has('-g', '--global');
const dry = has('--dry-run');
const uninstall = has('--uninstall');
let ids = value('--agent')?.split(',').map((s) => s.trim()).filter(Boolean);
if (ids) {
  const unknown = ids.filter((id) => !AGENTS[id]);
  if (unknown.length) { console.error(`Unknown agent(s): ${unknown.join(', ')}. See --list.`); process.exit(2); }
} else {
  ids = ['claude-code', 'universal', ...Object.keys(AGENTS).filter((id) => AGENTS[id].detect && existsSync(AGENTS[id].detect))];
}

for (const s of SKILLS) {
  if (!existsSync(join(here, 'skills', s, 'SKILL.md'))) { console.error(`Missing skills/${s}/SKILL.md next to the installer.`); process.exit(1); }
}

// Several agents share a folder; write each folder once.
const targets = new Map();
for (const id of [...new Set(ids)]) {
  const dir = global ? AGENTS[id].global : resolve(process.cwd(), AGENTS[id].project);
  targets.set(dir, [...(targets.get(dir) || []), AGENTS[id].name]);
}

for (const [dir, names] of targets) {
  for (const s of SKILLS) {
    const dest = join(dir, s);
    if (uninstall) {
      if (existsSync(dest)) { if (!dry) rmSync(dest, { recursive: true, force: true }); console.log(`${dry ? 'would remove' : 'removed'} ${dest}`); }
      continue;
    }
    if (!dry) {
      mkdirSync(dir, { recursive: true });
      rmSync(dest, { recursive: true, force: true });
      cpSync(join(here, 'skills', s), dest, { recursive: true });
    }
    console.log(`${dry ? 'would write' : 'installed'} ${dest}`);
  }
  console.log(`         for ${names.join(', ')}`);
}
if (!uninstall && !dry) {
  console.log(`\nDone. Ask your agent for a new page (taste) or to redesign an existing one (taste-redesign).`);
  const n = readdirSync(join(here, 'skills', 'taste', 'library')).length - 1;
  console.log(`The reference library has ${n} measured sites; add your own with the probe script (see skills/taste/library/README.md).`);
}
