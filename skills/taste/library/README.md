# Reference library

Each folder is one real site, measured with `scripts/probe.mjs` at 1440 wide:
- `tokens.json` holds the measured numbers.
- `notes.md` says why the site works, what to borrow and what to leave.

Pick 1–2 whose job and tone fit the brief. Borrow their calibration (ink steps, tone steps, the size
jump, spacing rhythm, tracking), never their subject or their whole layout.

| Profile | Kind | Ground | Tone | Teaches |
| --- | --- | --- | --- | --- |
| [linear-app](linear-app/notes.md) | Product / SaaS | Dark | Precise, quiet | Tone-step elevation, a four-ink staircase, one tuned family, real product UI as the picture |

To add a site:

```bash
node <skill>/scripts/probe.mjs <url> --out <skill>/library/<slug>/tokens.json
```

Then write `notes.md` in the same three sections (Why it works / Borrow / Leave), and add a row here.
Notes in the user's own words are worth more than anything else in this folder.
