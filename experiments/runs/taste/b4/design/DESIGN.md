# DESIGN.md: Leandro Canela, portfolio (experiment B4, variant: taste skill)

## 1. Brief

- **Subject.** Leandro Canela, a full-stack developer in Barcelona with the weight on the backend,
  and a computer science student. Works at Humannova.
- **Audience.** Tech leads, founders and recruiters skimming in under a minute, plus developers who
  open the code.
- **Job.** Persuade, by proof.
- **The one action.** Email him.

### Inventory: what only he has

1. **His surname.** *Canela* is Spanish for cinnamon, and his password manager is called *Cinnamon
   Key*.
2. **How he describes his work.** He builds the part you don't see so the part you see works: the
   data model, the permissions, what happens when something fails.
3. **Reskillia.** Seven DigComp 2.2 competences chosen per person by Gemini. Personal data encrypted
   with AES-256-GCM, plus RLS policies in PostgreSQL.
4. **ICEX Next.** Every privacy acceptance is stored with its version and date. Questionnaire drafts
   migrate between versions.
5. **CPU City.** A 3D processor that turns into a city as you zoom in, running RISC-V assembly in a
   Web Worker and tracing each instruction down to the ALU.
6. **Tomate.** Pomodoros from 25 to 90 minutes. Time is stored as dates, so it stays exact while the
   Mac sleeps.
7. **Club Stas Tarat.** A board game and role-playing club in Terrassa, almost 40 years old, with
   about 100 members. Built as a team of three.
8. **db-doctor.** A Claude skill that finds the loop silently firing 500 queries.
9. **Tools for himself:** a Go CLI vault, an ASCII converter.
10. **Barcelona.** Spanish, Catalan and English interfaces.

### Content
All copy below comes from his GitHub READMEs and the content file of his earlier portfolio attempt.
Content only: none of that attempt's UI was used. **Sample/assumed, to confirm:** the English
wording of the hero line, and the db-doctor and CPU City one-liners (written from their READMEs).

## 2. References (measured with probe.mjs at 1440)

| Ref | Borrow | Leave |
| --- | --- | --- |
| rauno.me | The scale jump: hero type at 75–85px over 14px meta (ratio ≈ 6–9). One flat field of saturated colour as the single bold move. A single weight (400) even at display size | The yellow circle, horizontal slides, the stepped indent |
| emilkowal.ski | Two inks only (`#21201C` / `#63635E`) carrying all hierarchy at one size. The 24 → 64 → 128px spacing jumps between groups | The tiny single column for the whole page; his warm ground |
| paco.me | Project lists as name + one plain line, ink 1 for the name and ink 2 for the line, weight 400 | Dark ground, serif italics, the 3-column list |

Shared calibration lesson: all three use **one family at one weight**. Hierarchy comes from scale,
ink and space, never from bold.

## 3. Directions (probability of producing this for *any* dev portfolio)

1. Dark terminal look: mono font, green accent, a `$ whoami` prompt (0.30). **Dropped: most likely.**
2. Light single-column list in the Emil or Paco manner (0.22). **Dropped: second most likely.**
3. Bento grid of project cards with tech-logo chips (0.18).
4. The page as a data schema: projects as records with typed fields (0.08).
5. **Under the surface:** each project shown as its surface (a small screenshot) next to what's
   underneath (its backend facts) set large. The page's big type goes to the invisible work (0.07).
6. A cinnamon poster: the name huge on a field the colour of his name (0.05).

**Chosen: 5, opened with 6.** Idea sentence:

> On this page, **the backend work nobody sees** becomes **the headline**, and **the screens people
> see** become **the small print**. The first screen is a field the colour of **canela**.

Competitor test: another backend developer could invert the hierarchy, but not with these facts
(versioned privacy acceptances, RISC-V traced to the ALU, time stored as dates) or this name. The
device is generic-ish; the content makes it his. Accepted, with the cinnamon field carrying identity.

## 4. Token plan

- **Grounds.**
  - Paper: `#FAFAFA`, neutral. Deliberately *not* warm, so cinnamon reads as a decision and not as
    "AI beige".
  - Field: `#8E3F17`, cinnamon stick, in exactly two places: the first screen and the closing name.
  - Surfaces separate by space only. No cards, no borders, no shadows.
- **Inks on paper.** `#161616` (≈18:1) for names and facts. `#5C5C5C` (≈6.6:1) for meta, captions
  and body asides. No third ink.
- **Inks on the field.** `#FBF4EE` (≈7:1) and `#E9C9B5` for the secondary line (target 4.5:1 or
  more, checked by the probe).
- **Accent.** Cinnamon itself. On paper it appears only on link underlines on hover and on the email
  action. Justification for the near-terracotta hue: it comes from the subject's surname, and it is
  paired with neutral (not cream) paper and no serif, so it is not the cream + serif + terracotta
  cluster.
- **Type.** Host Grotesk, one family, weight 400 everywhere (500 for nothing), `tabular-nums` on
  figures.

  | Role | Desktop | Mobile | Leading | Tracking |
  | --- | --- | --- | --- | --- |
  | Display | clamp(52px, 9.6vw, 148px) | 52px | 0.92 | −0.04em |
  | Fact | 30px | 22px | 1.22 | −0.015em |
  | Body | 18px | 17px | 1.55 | 0 |
  | Meta | 14px | 14px | 1.45 | 0 |

  Display ÷ body ≈ 8. Fact ÷ body ≈ 1.7.
- **Spacing.** 8, 16, 24, 48, 96, 160. Inside a group 8–24px, between projects 96px, between
  sections 160px. Outer margins 24px (mobile) and 48px (desktop), equal.
- **Grid.** 12 columns, 24px gap. In a project row the surface takes columns 1–4 and the
  underneath takes 6–12.
- **Radii.** Square everywhere: images, the action, everything.
- **Boldness.** Spent in one place: the cinnamon first screen with the display line. Everything
  after it is quiet paper and two inks.
- **Motion.** None structural. Link underline colour at 150ms ease-out only.

Plan review: lines that would appear in any portfolio, and what was revised:
- "Dark mode + mono" was rejected.
- "Rounded cards for projects" was replaced by space-only grouping.
- "Bold headings" was replaced by a single weight, per the references.
- The hero "Hi, I'm Leandro 👋" was replaced by his own sentence about the invisible part.
