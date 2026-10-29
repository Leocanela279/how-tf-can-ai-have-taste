# Reference library: candidate list (needs your approval)

Each approved site gets `references/<slug>/` with `desktop.png`, `mobile.png`, `tokens.json`
(extracted from live computed styles) and `notes.md` (why it works, the one bold move, what it
leaves out).

## The owner's picks (2026-10-29)

These come first. They are the owner's own taste, so they outrank every suggestion below.

| Site | Status |
| --- | --- |
| linear.app | Measured, notes written |
| emilkowal.ski | Measured (`tokens.json`), notes to write |
| vercel.com | To measure |
| apple.com | To measure |
| elevenlabs.io | To measure |
| libraries.dev | To measure |
| skill-issue.in | To measure |
| serus.ai | To measure |
| x.ai | To measure |

The cloud session's network policy blocks these hosts, so measure them from a machine with normal
network access:

```bash
for u in vercel.com apple.com elevenlabs.io libraries.dev skill-issue.in serus.ai x.ai emilkowal.ski; do
  slug=$(echo "$u" | tr . -)
  node skills/taste/scripts/probe.mjs "https://$u" --out "skills/taste/library/$slug/tokens.json"
  node skills/taste/scripts/probe.mjs "https://$u" --width 390 --out "skills/taste/library/$slug/tokens-390.json"
done
```

## Suggestions

Selection rule: every site has to teach something specific and different. No two sites should be
there for the same lesson. Strike, swap or add freely.

## Product / SaaS
| # | Site | What it teaches |
| --- | --- | --- |
| 1 | linear.app | Dark product page done with restraint: type scale, tone steps instead of borders, real product UI as the hero |
| 2 | stripe.com | Dense information without clutter; colour as a system; illustrations of the product's own data |
| 3 | mercury.com | Premium fintech without the fintech clichés: photography, serif/sans pairing, calm |
| 4 | attio.com | A light product page with real UI fragments, and hierarchy carried by weight and grey |
| 5 | culturedcode.com/things | Apple-grade craft: one product, generous space, every detail finished |
| 6 | raycast.com | How to do a dark page *with* glow and gradients and still not look like slop (the exception that proves the rule) |

## Developer tools
| # | Site | What it teaches |
| --- | --- | --- |
| 7 | vercel.com | Geist system: monochrome, grid, typography doing all the work |
| 8 | resend.com | Small company, very high craft: dark, typographic, one accent |
| 9 | zed.dev | Editorial voice for a dev tool; text-led, no card grid |
| 10 | planetscale.com | Brutally plain: almost no decoration, and it still reads as premium |

## Editorial / long-form
| # | Site | What it teaches |
| --- | --- | --- |
| 11 | stripe.press | Book-publisher typography on the web |
| 12 | worksinprogress.co | Magazine grid, illustration, reading comfort |
| 13 | pudding.cool | Content-first design: the subject drives the form |
| 14 | are.na | Utilitarian, almost anti-design, still with clear taste |

## Portfolio / personal
| # | Site | What it teaches |
| --- | --- | --- |
| 15 | rauno.me | Interaction craft; small details as the identity |
| 16 | emilkowal.ski | Minimal text-first portfolio; motion with purpose |
| 17 | paco.me | Extreme restraint: one column, small type, nothing extra |
| 18 | cosmos.so | Image-led grid, the content is the design |

## App screens (public, no login)
| # | Site | What it teaches |
| --- | --- | --- |
| 19 | plausible.io/plausible.io (live demo) | A calm analytics dashboard: one chart leads, numbers are real |
| 20 | vercel.com/docs | Docs layout: navigation, reading width, code blocks |
| 21 | linear.app/changelog | Dense list and content layout inside a product brand |

## E-commerce / brand
| # | Site | What it teaches |
| --- | --- | --- |
| 22 | aesop.com | Luxury through typography, warm neutrals done right, photography |
| 23 | teenage.engineering | A strong product identity: grid, mono and colour as the brand, not as costume |
| 24 | fellowproducts.com | Product photography plus clean commerce |
| 25 | nothing.tech | A dot-matrix motif carried through the whole brand (the "one motif" idea) |

## Questions for you
- Any sites you personally think have taste and want included? Your own taste is the target, so
  your picks matter more than mine.
- Any sites above you find ugly or overrated? Drop them.
