# Reference library

Each folder is one real site, measured with `scripts/probe.mjs` at 1440 wide:
- `tokens.json` holds the measured numbers.
- `notes.md` says why the site works, what to borrow and what to leave.

Pick 1–2 whose job and tone fit the brief. Borrow their calibration (ink steps, tone steps, the size
jump, spacing rhythm, tracking), never their subject or their whole layout.

| Profile | Kind | Ground | Tone | Teaches |
| --- | --- | --- | --- | --- |
| [linear-app](linear-app/notes.md) | Product / SaaS | Dark | Precise, quiet | Tone-step elevation, a four-ink staircase, one tuned family, real product UI as the picture |
| [vercel-com](vercel-com/notes.md) | Product / dev platform | Light | Stark, confident | Display at weight 400 tracked −0.06em, greyscale plus one mark, a three-part hero with no cards |
| [elevenlabs-io](elevenlabs-io/notes.md) | Product / AI | Light, warm | Calm, premium | A weight-300 display face, the product's output as the only imagery, warm greys with true black |
| [libraries-dev](libraries-dev/notes.md) | Catalogue / components | Dark | Crafted, quiet | Grey chrome with colour only inside the work, nested-radius frames, real objects as the hero |
| [skill-issue-in](skill-issue-in/notes.md) | Directory | Light, warm | Playful, editorial | One owned image and a serif logotype lifting an ordinary card list; a pixel icon system |
| [emilkowal-ski](emilkowal-ski/notes.md) | Portfolio | Light | Minimal, text-first | Hierarchy with one font size: ink, weight and 16/64/128 spacing only |

### What the owner's picks share

These six are the owner's own choices (2026-10-29), so their common ground is the closest thing
to a written-down taste:

- **One owned visual, not decoration.** The triangle, the voice orbs, the halftone collage, the
  live component demos, the product UI. Each page has one kind of image and it is specific to the
  subject. None uses stock illustration or decorative blobs.
- **Colour lives in the content; the chrome is neutral.** Greys or warm greys for the interface,
  saturation only inside the product or the one image, plus at most one coloured button.
- **Few weights, regular display.** Display type at 300, 400 or 500, never heavy bold. Authority
  comes from size and tracking.
- **Conventional structure.** Nav, hero, proof, sections, footer. None of them reinvents the page
  skeleton; the identity sits on the surface. This matches the B4 blind-test lesson.
- **Weak spot to avoid copying:** four of the six run body or meta text at 10–14px, under the
  16px comfort floor in `reports/Mobile first UI taste.md`.

Not yet measured: apple.com and serus.ai (their `www.` hosts were blocked by the network policy),
x.ai (its bot protection blocks headless browsers; measure it from a normal machine).

To add a site:

```bash
node <skill>/scripts/probe.mjs <url> --out <skill>/library/<slug>/tokens.json
```

Then write `notes.md` in the same three sections (Why it works / Borrow / Leave), and add a row here.
Notes in the user's own words are worth more than anything else in this folder.
