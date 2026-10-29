# Portfolio Structure: What Makes a Developer/Designer Portfolio Effective, Non-Card Project Patterns, and Footer Craft

Evidence labels used below: **[MEASURED]** = observed behavior (eye-tracking, logs). **[SURVEY]** = self-reported by reviewers. **[OPINION]** = a practitioner's or editor's view. **[OBSERVED-SITE]** = what I saw on the live site on 2026-10-29 (fetched text, not screenshots, so visual details like hover effects may be missing). Research date: 2026-10-29.

Context from the caller: a blind test in this repo found the owner preferred a richer portfolio with a conventional structure over a sparse, novel one. Several findings below support that result.

## 1. How are portfolios actually reviewed (speed, what gets skimmed, what convinces)?

### Takeaway
Nobody has published an eye-tracking study of portfolio sites. The closest measured data is the Ladders resume study: about 7.4 seconds for an initial screen, with clear headings and simple layouts holding attention best. Survey data says the first pass on a portfolio is a few minutes, it is a scan rather than a read, and reviewers want problem → role → decisions → outcome in 3–5 deep projects, not breadth. For engineers, survey evidence says real project work (GitHub or shipped things) matters. A portfolio *website* is looked at but is rarely required, so the site has to prove something quickly or it adds nothing.

### Cited Findings
- **[MEASURED]** Ladders' 2018 eye-tracking study found recruiters spent an average of 7.4 seconds on an initial resume screen, up from about 6 seconds in its 2012 study. Simple layouts with clear sections and headings did better. Clutter, little white space, multiple columns, long sentences, and missing section headers did worse. — [HR Dive](https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/); [Ladders study PDF (hosted by CSU Global)](https://csuglobal.edu/sites/default/files/blog-files/theladders-eyetracking-studyc2.pdf)
- **[OPINION, critique]** Critics argue the 6–7 second figure measures a keep-reading-or-not filter decision, not a full evaluation, and that the sample was small. — [ERE: "Is the 6-second resume scan a myth?"](https://www.ere.net/articles/is-the-6-second-resume-scan-a-myth)
- **[SURVEY]** NN/g's portfolio guidance draws on a survey of 204 UX professionals involved in hiring. It says hiring managers very rarely read a whole portfolio. They want process, not just the finished product: the problem, your role, constraints, timeline, iterations, how research shaped decisions, and value to users and the business. It recommends picking the top three things a reader should take away and checking the portfolio against them. — [NN/g, "UX Design Portfolios: Research-Based Advice"](https://www.nngroup.com/articles/ux-design-portfolios/)
- **[SURVEY]** NN/g recommends **3–5 detailed case studies** and puts "quality over quantity" ahead of any exact number. Each case study should cover the problem or hypothesis, your role and collaborators, how you reached the solution, whether it worked, challenges including abandoned concepts, impact on users and the business, and what you learned. NN/g suggests one consistent template for all of them: title, project intro, captioned images, results. — [NN/g](https://www.nngroup.com/articles/ux-design-portfolios/)
- **[SURVEY, partly unverified]** UXfolio's "State of UX Portfolios 2026" reportedly surveyed more than 100 design leads and hiring managers who together reviewed over 5,000 portfolios. A LinkedIn snippet that appears to come from it reports these figures, but I could not find the primary report:
  - 65% spend under four minutes on a portfolio the first time they open it.
  - About 78% rely on the portfolio and case studies more than the CV or past employers.
  - 72% prefer a portfolio website over Figma, PDF, or slides.
  - Top red flags: very low visual quality (55%), hard to navigate or confusing structure (48%), obvious overuse of AI (43%), and overly long or dense content (42%).

  — [LinkedIn snippet (Kalin Zdravkov profile page)](https://bg.linkedin.com/in/kalin-zdravkov); [UX Planet, 2026 red flags](https://uxplanet.org/good-ux-portfolios-never-get-interviews-6ea28fb2f9b3). Treat as unconfirmed.
- **[OPINION]** A head of product design, in an ADPList mentor-session summary first published in 2022, gives these benchmarks: an ideal portfolio can be reviewed in about 5 minutes, a full case study takes about 20 minutes to read, and he picks 5–10 candidates a week for phone screens. His red flags: too long or not tailored, too meta, a text-only "boring" About page, no navigation or progressive disclosure, portfolios that all look the same or reuse one template, and too little visible work. He wants a clear story with tension and resolution. *Note:* a search snippet attributed "54% spend 5–10 minutes / 35% about 5 minutes" to this page, but the fetched page has no such survey percentages, so don't cite those numbers. — [ADPList blog](https://adplist.org/blog/what-is-a-hiring-manager-looking-for-in-a-design-portfolio)
- **[OPINION]** Individual design managers describe spending no more than about 5 minutes on a candidate's work at screening, more time before an interview, and reviewing 10–20 portfolios in one sitting. — [uxdesign.cc, "Ever wonder how recruiters look at your design portfolio?"](https://uxdesign.cc/ever-wonder-how-recruiters-look-at-your-design-portfolio-cc8dd1ecb698); [Trustpilot design lead, "Six questions I ask"](https://medium.com/trustpilot-tech/six-questions-i-ask-when-reviewing-design-portfolios-2866a22d139a)
- **[SURVEY, engineers]** In Profy.dev's survey of about 60 hiring managers for (React) developers:
  - 65% would definitely look at an inexperienced candidate's portfolio website, and 93% would be likely to.
  - 51% said a candidate's chances would **not** be lower without one.

  The author concluded that the site itself is less valuable than the projects and code it points to. Small sample, circa 2020. — [DEV Community summary of Profy survey](https://dev.to/profydev/this-survey-among-60-hiring-managers-reveals-don-t-waste-your-time-on-a-react-portfolio-website-17ge) (the original profy.dev page did not resolve when fetched)
- **[SURVEY, engineers]** In HackerRank's 2017-era executive survey:
  - 84.1% said they look at an applicant's GitHub project work and other experience as an important indicator of on-the-job skill.
  - 94.9% ranked problem-solving as the most important qualification.

  These are executives, not day-to-day screeners, and the data is old. — [ITPro Today](https://itprotoday.com/it-management/developers-show-your-github-project-to-attract-job-offers)
- **[OPINION]** Developer-portfolio guides advise:
  - Avoid tutorial clones; they are a weak signal.
  - Each project needs a short case study covering the problem, your role, and the result.
  - A clean GitHub with good READMEs already works as a portfolio.

  — [Scrimba guide](https://scrimba.com/articles/how-to-build-a-web-developer-portfolio-that-gets-you-hired); [soychristian guide summarizing the 60+ manager survey](https://soychristian.pages.dev/contents/developer-portfolio-guide)
- **Unreliable statistic flagged:** a page attributes "84% of employers want live demos" and a "73%" figure to the Stack Overflow 2024 survey with no supporting source. Do not use these. — [hakia.com](https://hakia.com/skills/building-portfolio/)

### Inferences
- The first screen and the opening lines of each project do most of the work. Design for a 5–10 second "keep going?" decision on the home page, then a 2–4 minute scan. A full case study gets read only by someone already interested.
- "Hard to navigate or confusing structure" ranked second among red flags (48%, unverified). The Ladders data rewards clear headings. Together they suggest novelty in *structure* is penalized, which matches the repo's blind-test result: prototypical structure wins, and novelty belongs in craft and details.
- For engineers, the site is a routing layer to proof: shipped products, repos, demos, numbers. Its value comes from making that proof fast to reach and believable, not from being a showpiece.
- "Portfolios that all look the same" and "overuse of AI" (43%) are both red flags. A generic template layout risks reading as low effort even when the structure is conventional. The goal is conventional information architecture with distinctive execution.

### Gaps
- I found no eye-tracking or analytics study of portfolio *websites*. All timing data for websites is from surveys or anecdotes.
- I found no rigorous, recent (2024–2026) survey specifically of *engineering* hiring managers about portfolio sites. The GitHub and portfolio numbers are old or small-sample.
- I could not reach the primary UXfolio 2026 report, so its methodology and exact figures are unconfirmed.

## 2. Structure: first screen, project depth, about, contact, project count, single vs multi-page, writing

### Takeaway
The structure the evidence supports, and admired engineer sites use, is a single scannable home page:

1. Name, role, and a one-line value claim, plus proof: current or past company and a flagship project.
2. 3–5 selected projects, each with a one-line description and a link to depth.
3. Experience with years.
4. Writing, if any.
5. Contact.
6. A footer.

Depth lives on separate case-study pages or an archive. Write each project as problem → your role → decisions → outcome with real numbers, and give it a consistent template.

### Cited Findings
- **First screen pattern [OBSERVED-SITE]:**
  - brittanychiang.com opens with name, title "Frontend Engineer," and a one-sentence value claim about accessible, pixel-perfect web experiences. Next come in-page nav (About / Experience / Projects) and social links. — [brittanychiang.com](https://brittanychiang.com)
  - paco.me opens with name, a short italic tagline, and a bio naming his current role (Linear) and past work (Vercel design system and site). — [paco.me](https://paco.me)
  - emilkowal.ski opens with name and "Design Engineer," then a short "Today" status mentioning Linear and Vercel. — [emilkowal.ski](https://emilkowal.ski)
  - leerob.com opens with name and a bio naming his current employer and past Next.js/Vercel work. — [leerob.com](https://leerob.com)
- **Proof by association:** All four admired engineer sites put recognizable employers or flagship open-source projects in the first lines (Linear, Vercel, Klaviyo/Apple, Next.js). — [paco.me](https://paco.me); [emilkowal.ski](https://emilkowal.ski); [brittanychiang.com](https://brittanychiang.com); [leerob.com](https://leerob.com)
- **Project count [OBSERVED-SITE]:** Featured projects on the home page:
  - paco.me: 3 (cmdk, Writer, Next Themes)
  - emilkowal.ski: 4 (aiforui.dev, Sonner, animations.dev, Vaul)
  - brittanychiang.com: 4, plus a "View Full Project Archive" link to /archive

  These match NN/g's 3–5 range. — [paco.me](https://paco.me); [emilkowal.ski](https://emilkowal.ski); [brittanychiang.com](https://brittanychiang.com); [NN/g](https://www.nngroup.com/articles/ux-design-portfolios/)
- **Experience as a dated list [OBSERVED-SITE]:** Brittany Chiang's Experience section is a list of six entries, newest first. Each has a year range ("2024 — Present"), a linked role and company, a short description, and plain-text tech tags. It is followed by a link to the full résumé PDF. — [brittanychiang.com](https://brittanychiang.com)
- **Single-page home + deeper pages [OBSERVED-SITE]:**
  - rauno.me keeps the home page minimal: name, one line of bio, and tiles linking to Craft, Projects, Field Notes, and History of Software Design. Previous versions are archived at year subdomains (2022.rauno.me, 2023.rauno.me). — [rauno.me](https://rauno.me)
  - joshwcomeau.com is content-led: an article feed, browse-by-category tiles, and a numbered "Popular Content" list. — [joshwcomeau.com](https://www.joshwcomeau.com)
- **Format preference [SURVEY, unverified]:** 72% of reviewers reportedly prefer a portfolio website over PDF, Figma, or slides. — [LinkedIn snippet](https://bg.linkedin.com/in/kalin-zdravkov)
- **Case-study template [SURVEY]:** NN/g's template is title page, project intro, captioned images, and results. Content covers problem, role, process, outcome, challenges, impact, and learning. — [NN/g](https://www.nngroup.com/articles/ux-design-portfolios/)
- **Tailoring and length [OPINION]:** Being too long or untailored is the first red flag listed. Progressive disclosure, a summary first with depth on demand, is explicitly praised. — [ADPList](https://adplist.org/blog/what-is-a-hiring-manager-looking-for-in-a-design-portfolio)
- **About page [OPINION]:** A text-only "boring" About page is a red flag. Reviewers want to sense a personable, curious person (books, experiments). — [ADPList](https://adplist.org/blog/what-is-a-hiring-manager-looking-for-in-a-design-portfolio)
  - Observed examples of personality: Paco's "Now" section about current interests with playlists ([paco.me](https://paco.me)), and Brittany Chiang's About, which ends with hobbies ([brittanychiang.com](https://brittanychiang.com)).
- **Contact [OBSERVED-SITE]:**
  - paco.me has a "Connect" section with X and email.
  - rauno.me has a click-to-copy email that shows a "Copied" state.
  - emilkowal.ski ends with a single sentence linking to Twitter and GitHub.

  — [paco.me](https://paco.me); [rauno.me](https://rauno.me); [emilkowal.ski](https://emilkowal.ski)

### Inferences
- Recommended skeleton for an engineer portfolio, in order:
  1. Hero: name, role, one-line claim, and current or notable affiliation.
  2. Selected work: 3–5 entries, one sentence each, with a link to a case study or the live product or repo.
  3. Experience: dated list.
  4. Writing or notes, optional.
  5. About or Now, short and human.
  6. Contact: an email that is easy to copy.
  7. Footer.

  This is the "prototypical" structure, so reviewers find things where they expect them.
- One-line project descriptions on the index plus deep case-study pages is how admired sites reconcile the "5-minute scan" and "show process" demands.
- Writing guidance, synthesized from NN/g and ADPList:
  - Lead each project with the outcome or problem, not the tech stack.
  - State your role explicitly.
  - Use real numbers where they exist (Brittany Chiang's "100k+ Installs" badge is a small example).
  - Cut any meta-commentary.
  - Keep each entry scannable with headings.
- The rich-over-sparse result from the repo blind test fits this: sparse sites like paco.me and emilkowal.ski work because their owners' fame and famous projects supply the proof. An unknown engineer copying that sparseness loses the proof layer, so an AI agent should default to *richer* proof (dates, roles, outcomes, images) unless the person has strong name recognition.

### Gaps
- I found no controlled evidence on single-page versus multi-page portfolios. The advice is opinion and observed convention.
- I found no data on the ideal word count per case study beyond "a full read takes about 20 minutes, scans are much shorter."

## 3. Non-card ways to present projects (with real examples)

### Takeaway
The admired engineer sites barely use card grids. Their main pattern is a **typographic list**: a name plus a one-line description, sometimes with year or role, in a single column. Around that sit several alternatives:

- a dated experience list with tech tags
- an index or table with hover previews (the agency/designer convention)
- year-archived site versions
- category- and popularity-ranked content lists
- a fully interactive world (Bruno Simon)
- an OS/desktop metaphor (daedalOS)

The more novel the container, the more a site depends on fame or spectacle.

### Cited Findings
- **Plain typographic list (name + one-liner) [OBSERVED-SITE]:**
  - paco.me shows three projects as linked names, each followed by one sentence, with no images, years, or table.
  - emilkowal.ski does the same for four projects and seven articles, with no dates or images.

  — [paco.me](https://paco.me); [emilkowal.ski](https://emilkowal.ski)
- **Dated experience list + featured projects with images + archive [OBSERVED-SITE]:** brittanychiang.com has two layers:
  - Experience: entries with year ranges and plain-text tech tags.
  - Projects: four entries, each with a title, description, screenshot image, and occasional metric badges ("100k+ Installs").

  It links to a full "/archive" project page, which is the "archive table" pattern: a complete list kept off the home page. — [brittanychiang.com](https://brittanychiang.com)
- **Writing list with dates [OBSERVED-SITE]:** leerob.com shows work history only in prose. The rest of the page is a list of topic notes and a list of blog posts with month and year, newest first. This is a numbers- and dates-forward changelog feel without cards. — [leerob.com](https://leerob.com)
- **Hub tiles + year-archived versions [OBSERVED-SITE]:** rauno.me links out to Craft, Projects, and Notes. Each past version of the site is preserved at a year subdomain, so the site's history doubles as a timeline of the work. — [rauno.me](https://rauno.me)
- **Index list with hover preview [OBSERVED in marketplaces]:** This pattern is common enough that Framer sells several components for it:
  - "Project Hover List": a preview image follows the cursor. On touch devices it falls back to an inline thumbnail per row.
  - "ReelIndex": rows of index number, title, category, and year that expand on hover to reveal an image or muted video.
  - "Portfolio Rows": large titles with thin dividers.
  - "Hover Project List": rows with year, keyboard focus, and Escape to close.

  — [Framer: Project Hover List](https://www.framer.com/marketplace/components/project-hover-list/); [Framer: ReelIndex](https://www.framer.com/marketplace/components/reelindex/); [Framer: Portfolio Rows](https://www.framer.com/marketplace/components/portfolio-rows/); [Framer: Hover Project List](https://www.framer.com/marketplace/components/hover-project-list/)
- **Content site organized by category and popularity [OBSERVED-SITE]:** joshwcomeau.com uses a feed of articles (title, subtitle, summary), eight category tiles, and a numbered top-10 "Popular Content" list. The ranked list is a strong non-card device. — [joshwcomeau.com](https://www.joshwcomeau.com)
- **Playable world [OBSERVED-SITE]:** bruno-simon.com is a 3D world you drive a car through to discover information. It has:
  - a map key, achievements, a timed race with a leaderboard, and a visitor message board
  - a "Behind the scene" credits panel (Three.js, Rapier, Howler.js, source on GitHub under MIT)
  - quality and renderer settings and an "I'm stuck!" respawn button

  I saw no text-only fallback, and contact is via Discord. Projects are not listed by name on the landing text. — [bruno-simon.com](https://bruno-simon.com)
- **Desktop/OS metaphor:** daedalOS by Dustin Brett is a web-based desktop environment. It has draggable, resizable windows that remember their size and position, plus built-in apps (Monaco editor, emulators). It is a large open-source project (about 8k GitHub stars, MIT) rather than a conventional portfolio, which shows how much engineering this metaphor takes to do well. — [LinuxLinks](https://linuxlinks.com/daedalos-desktop-environment-web-browser); [Ecosyste.ms](https://awesome.ecosyste.ms/projects/github.com%2FDustinBrett%2FdaedalOS)

### Inferences
Pattern menu for an agent, with when to use each:

| Pattern | Use when | Cost |
|---|---|---|
| **Typographic list** (name, one-liner, optional year/role) | Default for engineers. Fastest scan, highest density. | Gives little proof unless the projects are well known. Add a metric, role, or year. |
| **Index/table with hover preview** (year · name · role · type) | Designer or agency feel with visual work. | Must degrade to inline thumbnails on touch, be keyboard accessible, and keep row text meaningful without the preview. |
| **Dated experience list + 3–4 featured projects with an image and a metric + "full archive" link** (Brittany Chiang pattern) | Best fit for "rich + conventional" (the repo blind-test winner). | More content to write and maintain. |
| **Changelog/timeline** (dated entries, newest first; leerob's dated posts, rauno's year archives) | The person ships often. | Looks thin if updates are rare. |
| **Ranked or "popular" list** (Josh Comeau) | Content-heavy people. | Needs enough items to rank. |
| **Playable world / OS metaphor** (Bruno Simon, daedalOS) | Only when the portfolio itself is the proof of skill (3D/WebGL or systems engineers). | High cost, accessibility risk, and it hides content behind interaction. Conflicts with the "under 4 minutes" scan and the "confusing structure" red flag. |

- A "spec sheet" or README-style entry fits engineers naturally. It would be a project block with labeled fields: Role, Year, Stack, Outcome/metric, and Links (live, repo, write-up). This is an inference that combines NN/g's required fields with the engineer convention of READMEs. I did not find a specific admired site that uses it verbatim.

### Gaps
- I could not verify the jhey.dev, Awwwards, godly.website, or siteinspire examples in this session (tool budget). Index/table-with-hover examples are cited from component marketplaces rather than named personal sites.
- I found no evidence comparing hiring outcomes or reviewer preference across these presentation patterns. Pattern choice is convention and opinion.
- I did not verify embedded live demos (for example, interactive components inline in case studies) on a specific site this session, though Emil Kowalski's and Josh Comeau's writing is known for it.

## 4. Footers: what makes them good, and what a personal-site footer should contain

### Takeaway
NN/g treats the footer as a predictable second-chance zone. Users go there on purpose for contact, about, and social links, or as a last resort when they can't find something. So it should be visible, legible, grouped, and clearly labeled, never collapsed. Large sites (Apple, Josh Comeau) use grouped sitemap columns, utility toggles, and legal links. On a personal site the footer works as a designed sign-off, typically including:

- the contact email (easy to copy) and social links
- a colophon (stack, fonts, tools)
- a sign-off line or motto
- the year or copyright
- optionally local time, availability, last-updated, or back-to-top

### Cited Findings
- **[OPINION/expert guidance, NN/g]** Footers can help but rarely hurt. Users go there either deliberately, for contact, about, or social links, or as "a last resort" or "a second chance to be convinced." Common contents:
  - utility links: contact, privacy, terms
  - doormat navigation repeating the global nav
  - links for secondary audiences (jobs, press, investors)
  - a sitemap (full on-page sitemaps only for sites of about 25 pages or fewer)
  - testimonials or awards
  - social links and newsletter signup

  Pitfalls: too much content, vague labels like "Resources," no grouping or hierarchy, low contrast, and collapsing the footer. "People expect it to be there." — [NN/g, "Footers 101"](https://www.nngroup.com/articles/footers/)
- **Apple's footer [OBSERVED-SITE]:** The homepage footer stacks these layers:
  1. Numbered footnotes and legal disclaimers tied to claims on the page.
  2. 11 grouped sitemap columns, including Shop and Learn, Account, Apple Store, For Business, Apple Values, and About Apple.
  3. A "More ways to shop" contact line with a phone number.
  4. Copyright.
  5. A legal-link row: Privacy Policy, Terms, Sales and Refunds, Legal, Site Map.
  6. A country/region selector.

  No breadcrumb appeared in the homepage footer. Apple's product pages are where the footer breadcrumb normally appears, but I did not verify that this session. — [apple.com](https://www.apple.com/)
- **Josh Comeau's footer [OBSERVED-SITE]:** A personal site with a full doormat footer:
  - category links, course links, and General (About, About This Blog, Contact)
  - a utility row: search, a "disable sounds" toggle, dark mode, RSS, social
  - "© 2018-present Joshua Comeau"
  - legal links

  This is the fat-footer pattern scaled to one person, with personality in the controls. — [joshwcomeau.com](https://www.joshwcomeau.com)
- **Colophon footer [OBSERVED-SITE]:** Brittany Chiang's footer states the site was designed in Figma, coded in VS Code, built with Next.js and Tailwind, deployed on Vercel, and set in Inter. It ends with a playful "time travel" element, a TARDIS GIF, presumably linking to older versions. — [brittanychiang.com](https://brittanychiang.com)
- **Sign-off footer [OBSERVED-SITE]:** paco.me ends with a one-line motto and the year. emilkowal.ski ends with one sentence pointing to Twitter and GitHub. rauno.me's footer is three icon-only links (home, Craft, Projects). — [paco.me](https://paco.me); [emilkowal.ski](https://emilkowal.ski); [rauno.me](https://rauno.me)
- **Award-style footer devices [OBSERVED in galleries/components]:**
  - Footer.design, a gallery of footers only (by NOOON Studio), includes a brand footer with a live monospaced timestamp beside a huge full-width brand name, and minimal single-CTA footers ("Get in Touch").
  - A "Sign-off Footer" component on 21st.dev combines click-to-copy email, a live clock with the visitor's time offset, an availability indicator, social links, and back-to-top.

  — [footer.design](https://www.footer.design/); [21st.dev Sign-off Footer](https://21st.dev/@ham7a311/components/sign-off-footer.md); [maxibestof.one portfolio footers](https://maxibestof.one/websites/portfolio/sections/footer)

### Inferences
- A personal-site footer recipe, from these sources:
  1. A final call to action: "Get in touch" plus an email with copy-to-clipboard and a confirmation state (rauno, 21st.dev).
  2. Social and profile links: GitHub, LinkedIn, X/Bluesky, RSS if writing exists.
  3. Small doormat navigation repeating the main sections (NN/g; Josh Comeau).
  4. A colophon: typeface(s), framework, host, and optionally "designed in / built with" (Brittany Chiang).
  5. A human or crafted touch: local time and city, availability status, last updated, a motto (Paco), or a playful easter egg (Brittany's time travel).
  6. © year (or "2018–present") and a back-to-top link.
- Award-site "designed close" moves, like the name set at full viewport width or a live clock, are decoration on top of NN/g's functional baseline. They should never replace contact and navigation links or reduce legibility, which NN/g warns against.
- Footers on minimalist engineer sites are deliberately tiny. That works because the whole page is short. On a richer, longer portfolio (the blind-test winner), a fuller doormat-plus-colophon footer is more appropriate, since users reach it after a long scroll and use it as navigation.

### Gaps
- I found no measured data, such as click-through or eye-tracking, on footer usage for personal sites. The NN/g article gives qualitative guidance without statistics.
- I did not verify the Apple product-page footer breadcrumb this session, or specific Awwwards "Site of the Day" portfolio footers (full-width name, colophon, local time). Those examples come from galleries and component libraries, not named award sites.
