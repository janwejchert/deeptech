# Aperture LP Letter — Quantum Computing Group Project

**Course:** IE Business School · Deep Tech Venturing & Investment
**Deliverable:** 1,000-word magazine article on a deep-tech area
**Hard deadline:** Sunday 14 June 2026, 17:59 CET
**Internal target:** Saturday 13 June 2026, 21:00 CET

## What this is

An immersive web piece presenting a fictional 1,000-word letter from Maya Chen, founding partner of the (fictional) deep-tech VC fund **Aperture Quantum Partners**, to the limited partners of her firm's $312M Fund II — recommending an early wind-down of the fund's quantum-computing positions, three years ahead of schedule, because the timing thesis the fund was built on did not hold.

**The fund and Maya are fictional. Every cited number, physics claim, public-company roadmap quote, and SEC-filed financial detail is real and footnoted.**

Designed for the contrarian / skeptic angle the brief allows. Built around the prof's Why→What→How→Ask pitch structure, with a working interactive timing calculator as the embedded "exhibit" and inline annotated quotes from IBM and IonQ public filings.

## Repository layout

```
.
├── index.html               ← the letter page (the deliverable)
├── styles.css               ← Howard Marks design system (ivory + ink + muted gold, serif)
├── app.js                   ← calculator + hover annotations + footnote popover + audio + scroll-spy
├── package.json             ← Vercel detection
├── assets/                  ← audio.mp3 (added Day 4), favicon, og-image
├── citations/               ← source list + downloadable PDF (added Day 4–5)
├── tests/
│   └── calculator.test.html ← in-browser unit tests for calculator math
├── docs/
│   └── superpowers/
│       ├── specs/2026-06-09-quantum-article-design.md       ← the approved spec
│       └── plans/2026-06-09-quantum-article-implementation.md ← the phased plan
└── content/
    ├── letter-source.md         ← writer's working draft (markdown source of truth for the prose)
    └── sources-for-review.md    ← citation verification report from the research pass
```

## Local development

```bash
python3 -m http.server 8000
# Open http://localhost:8000
# Tests: http://localhost:8000/tests/calculator.test.html
```

## Status (as of last commit)

- Site scaffold + Howard Marks design system live
- Letter prose v0 integrated (~1,012 words, in range)
- Calculator math + 11 unit tests passing (chemistry / optimization / RSA × multiple input ranges)
- 3-column responsive layout (sticky nav + reading column + marginalia)
- 9 footnotes wired with real verified URLs (IBM Newsroom, Nature, BusinessWire, SEC EDGAR, Preskill / Caltech, Global Risk Institute)
- Two annotated exhibits with verbatim quotes from IBM Newsroom (10 Jun 2025) and IonQ's S-1 (2021)

## Outstanding before submission

- Audio (ElevenLabs machine-read, Day 4)
- Mobile pass + Lighthouse audit (Day 5)
- Citation PDF export (Day 5)
- Three independent read-throughs + prof read-through critique (Day 4 evening / Day 5)
- Vercel production deploy (Day 5)

## Team

Three members. Roles: writer-lead / designer-lead / developer-lead (all three are full-stack and can swap).

## Authorship note

This project was scaffolded in collaboration with Claude (Anthropic). The thesis, design choices, prose voice, and creative direction are the team's. AI assistance covered: site scaffolding, CSS design system, JS calculator and interactions, draft prose generation, source verification via web research, layout iteration.
