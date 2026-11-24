export const site = {
  name: "Leandro Canela",
  role: "Full-stack developer",
  city: "Barcelona",
  timeZone: "Europe/Madrid",
  github: "https://github.com/Leocanela279",
  email: "leandrocanela279@gmail.com",
  today:
    "Working at Humannova and studying computer science. I spend most of my time on the part people don't see: how the data is shaped, who is allowed to touch it, and what happens when something fails.",
};

export const projects = [
  {
    slug: "reskillia",
    title: "Reskillia",
    year: "2026",
    role: "Full-stack developer at Humannova",
    stack: ["Next.js", "React", "Supabase", "PostgreSQL", "Gemini", "Docker"],
    body: [
      "Reskillia measures a team's digital skills against DigComp 2.2, the European framework.",
      "Each person uploads a CV; Gemini picks seven competences with a target level, writes the questions and scores the answers. The result is a radar of expected against achieved, as a PDF.",
      "ICEX Next is the same codebase cut down for a client who needed privacy first: no AI and no public sign-up. The team invites each person, who sets a password, accepts the policy and submits a CV and a questionnaire.",
    ],
    underneath: [
      "Versioned questionnaires, with drafts migrated between versions.",
      "Every privacy acceptance stored with the version and date it was shown.",
      "Row-level security in PostgreSQL; personal data encrypted with AES-256-GCM.",
      "Local OCR for scanned CVs in the ICEX version.",
    ],
    link: { href: "https://reskillia.humannova.com/", text: "reskillia.humannova.com" },
  },
  {
    slug: "tomate",
    title: "Tomate",
    year: "2026",
    role: "App and download site, solo",
    stack: ["SwiftUI", "macOS 14+", "Astro"],
    body: [
      "A Pomodoro timer for long study sessions, from 25 to 90 minutes. Anything over an hour can be split into two blocks with a break in between. It lives in the menu bar.",
      "Sessions never overlap; notifications let you start or decline. It turns on macOS Focus while studying, through Shortcuts.",
    ],
    underneath: [
      "The end is stored as a date, not a countdown, so it stays exact when the Mac sleeps.",
      "Fully local: no accounts, no server.",
      "The app is SwiftUI; the download site is Astro.",
    ],
    link: { href: "https://usetomate.com/", text: "usetomate.com" },
  },
  {
    slug: "taste",
    title: "Taste",
    year: "2026",
    role: "Solo",
    stack: ["Claude skill", "Node", "Chrome DevTools Protocol"],
    body: [
      "A Claude skill that gives AI-built interfaces taste. It started with a question: how tf can AI have taste making UIs?",
      "The answer is calibration, not a list of banned ingredients: measure a real reference, write a token plan, then look at the result. The skill has two modes — taste for new pages, taste-redesign for existing ones — and scripts that probe, shoot, lint, inventory, compare and check parity.",
    ],
    underneath: [
      "The rules live in SKILL.md; the measured reference library is in the repo.",
      "Built from research, blind tests and the owner's own taste.",
      "This site was built with it.",
    ],
    link: { href: "https://github.com/Leocanela279/how-tf-can-ai-have-taste", text: "GitHub repository" },
  },
  {
    slug: "club-stas-tarat",
    title: "Club Stas Tarat",
    year: "2025",
    role: "One of three developers, with Manuel Ordoñez and Nicolau Miguel",
    stack: ["Laravel 12", "Tailwind 4", "Vite", "Google APIs"],
    body: [
      "A website for a board game and role-playing club in Terrassa that has run for almost forty years: six sections, a weekly schedule, an event calendar, the game library and a members' area.",
      "Live at stastarat.com for a club of about a hundred members.",
    ],
    underneath: [
      "Google APIs for the calendar; PDF and QR generation for members.",
      "Six sections, including the weekly schedule, the event calendar, the game library and the members’ area.",
      "Built with two others, Manuel Ordoñez and Nicolau Miguel.",
    ],
    link: { href: "https://stastarat.com/", text: "stastarat.com" },
  },
];
