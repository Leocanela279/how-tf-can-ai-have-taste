# Craft for app screens

App screens are worked in, not scrolled through. Their taste is quiet: hierarchy carried by ink and
weight, density without clutter, and every state designed. These rules come from Nielsen's
heuristics, WCAG 2.2, Vercel's Web Interface Guidelines, Rauno Freiberg and Emil Kowalski. Sources
are in the how-tf-can-ai-have-taste repo, under `reports/` and `research_notes/`.

## Shape of the screen

- **One primary action per view.** Others are secondary (quieter ink, no fill) or go in a menu.
- **The main object leads.** It is the list, the table or the chart. Navigation and chrome recede:
  the second or third ink, no fills, no borders where a tone step will do.
- **Separate regions with tone steps.** Use background steps of 2–6% lightness, or hairlines at
  6–12% alpha. Shadows are only for things that float (menus, dialogs, popovers).
- **Density.**
  - Body 13–15px, line-height 1.4–1.5.
  - Table rows 32–44px.
  - Spacing inside a row or field group 4–12px; between groups 24–40px.
- **Figures.**
  - `tabular-nums`, right-aligned in tables.
  - Units in a quieter ink than the number.
  - No invented numbers. Use real or clearly sample data that adds up (totals equal the sum of
    their rows).
- **Charts.**
  - One chart leads.
  - One series in the accent, the rest in inks.
  - The finding stated as a sentence above it ("Sales up 12% on Saturday").
  - No rainbow palettes, no 3D, no gradient fills.

## States, for every data view

| State | Must show |
| --- | --- |
| Loading | A skeleton shaped exactly like the result. Wait 150–300ms before showing it, then keep it up for at least 300ms |
| First use | What this area is for, plus one action that starts it |
| Filtered to nothing | That the filter caused it, plus a way to clear it |
| Error | What happened in plain words, how to fix it, and the user's input kept |
| Sparse (1–2 items) | Still looks intentional, without huge empty cards |
| Dense (100+ items, long strings) | Truncation with a full value on hover or focus, and no layout shift |

## Feedback and timing

- Under 0.1s it feels instant, so no indicator. From 1s, show that the system is busy. From 10s,
  show progress, an estimate and a way to cancel.
- Mutations respond optimistically, or within 500ms.
- Pressed controls give feedback (`scale(0.97)` or a tone shift).
- Destructive actions confirm, or offer undo. Prefer undo.
- `Esc` closes every overlay. Focus returns to the trigger.

## Controls

- Targets are at least 24×24px, and 44px on touch.
- `:focus-visible` rings use the accent at 2px with an offset. Never remove focus outlines without a
  replacement.
- Don't disable submit before the user has tried. Validate on blur or submit and show the error next
  to the field.
- Inputs are at least 16px on mobile, so iOS doesn't zoom.
- Labels are always visible. A placeholder never replaces a label.
- State lives in the URL (filters, tabs, pagination) so links and back behave.

## Copy

- Buttons say verb + noun: "Create invoice", not "Submit". The result echoes the verb: "Invoice
  created".
- Name things the way users do, not the way the system does ("Notifications", not "Webhook config").
- Use sentence case. Write `…` for continuation, and curly quotes.
- Errors never apologise and are never vague.

## Motion in apps

- Animate only what a person caused, and only to show what changed.
- Use no animation on actions repeated many times a day, or on anything triggered from the keyboard.
- Ease-out, 150–250ms, interruptible. Popovers grow from their trigger.
