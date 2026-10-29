# Experiment briefs

The same 4 briefs are built under each variant:
- (a) no design skills
- (b) the current skill pile
- (c) `skills/taste` alone

Every build is a single static `index.html` (Tailwind via CDN is allowed) so the variants are
comparable and render the same way. The briefs are deliberately as short as what people really
type. The skill has to cope with vague input, because that is where generic output comes from.

Screenshots: 1440×900 first screen, full page at 1440, and 390×844 first screen. Saved to
`runs/<variant>/<brief>/`.

## B1. Landing page (product)
> Build a landing page for Tidepool, an app that tells sea swimmers whether conditions are safe at
> their local beach right now (water temperature, swell, tide, jellyfish reports from other
> swimmers). Free with a €4/month plan for alerts.

## B2. SaaS app screen
> Build the main screen of an invoicing tool for freelance translators: a list of invoices with
> status (draft, sent, paid, overdue), totals for the month, and a way to create a new invoice.

## B3. Dashboard
> Build an operations dashboard for a small bakery chain with 4 shops: today's sales by shop,
> what's selling out, waste from yesterday, and staff on shift.

## B4. Portfolio
> Build a portfolio site for Ines Duarte, a type designer in Lisbon who has released 3 typefaces
> and does custom lettering for packaging.

## R1. Replication test (answers "why can't AI copy a style?")
Pick one approved reference site. Build the *same* new brief (B1, Tidepool) "in the style of" that
site four ways, adding one ingredient per step:
1. **Name only:** "in the style of linear.app"
2. **+ screenshot:** attach `references/<slug>/desktop.png`
3. **+ measured tokens:** also paste `references/<slug>/tokens.json`
4. **+ notes and a look loop:** also give `notes.md` (what makes it work), and require
   screenshot → compare with the reference → fix, for 2 rounds

Put all four next to the reference. Where the jump happens tells us which ingredient was
missing. Hypothesis: steps 1–2 give the category average dressed in the reference's colours, and
the real jump comes at step 3 (numbers) and step 4 (looking).

## How to judge
You judge blind. Variants are shuffled to A/B/C per brief before you see them. For each brief:
1. Which one would you ship?
2. Which one looks the most AI-made?
3. One sentence on why.
