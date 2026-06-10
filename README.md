# Aperture LP Letter — Quantum Computing Group Project

**Course:** IE Business School · Deep Tech Venturing & Investment
**Deliverable:** 1,000-word magazine article on a deep-tech area
**Hard deadline:** Sunday 14 June 2026, 17:59 CET
**Internal target:** Saturday 13 June 2026, 21:00 CET

## What this is

An immersive web piece presenting a fictional 1,000-word letter from Maya Chen, founding partner of the (fictional) deep-tech VC fund **Aperture Quantum Partners**, to the limited partners of her firm's $312M Fund II — recommending an early wind-down of the fund's quantum-computing positions, three years ahead of schedule, because the timing thesis the fund was built on did not hold.

**The fund and Maya are fictional. Every cited number, physics claim, public-company roadmap quote, and SEC-filed financial detail is real and footnoted.**

Designed for the contrarian / skeptic angle the brief allows. Built around the Why→What→How→Ask pitch structure, with a working interactive timing calculator as the embedded "exhibit," annotated quotes from IBM and IonQ investor materials, a roadmap-slippage table, and an expert-survey chart.

## Repository layout

```
.
├── index.html               ← the letter page (the deliverable)
├── styles.css               ← Howard Marks design system (ivory + ink + muted gold, serif)
├── app.js                   ← calculator + annotations + footnotes/marginalia + source index
│                              + scroll-spy + reading progress + audio toggle
├── package.json             ← Vercel detection
├── assets/                  ← favicon.svg, og-image.png (audio.mp3 still pending — Day 4)
├── citations/               ← index.html (browsable source list) + citations.pdf (download)
├── tests/
│   └── calculator.test.html ← in-browser unit tests for calculator math (12 assertions)
├── docs/
│   └── superpowers/
│       ├── specs/2026-06-09-quantum-article-design.md       ← the approved spec
│       └── plans/2026-06-09-quantum-article-implementation.md ← the phased plan
└── content/
    ├── letter-source.md         ← letter prose v2 (mirrors index.html; Google Doc is canon)
    ├── audio-script.md          ← ready-to-paste ElevenLabs script + generation settings
    └── sources-for-review.md    ← Day-1 citation report + pass-#2 verification ADDENDUM
```

## Local development

```bash
python3 -m http.server 8000
# Open http://localhost:8000
# Tests: http://localhost:8000/tests/calculator.test.html
```

## Status (as of last commit)

- Letter prose v2 integrated: ~1,002 body words (within the 1,000 ±5% brief), every claim re-verified against primary sources in a second adversarial research pass (see `content/sources-for-review.md`, Addendum), em dashes removed throughout (the one inside the verbatim PsiQuantum quote stays, since the source's own punctuation cannot be altered)
- 11 footnotes live, all with verified verbatim quotes and working primary-source URLs (IBM Newsroom, Nature, BusinessWire, SEC EDGAR, ACM/Preskill, Global Risk Institute, NIST/NSA, Cerca/CSIRO/Q-CTRL)
- Four exhibits: A, the interactive timing calculator (sliders annotated with demonstrated-vs-projected anchors, published methodology note); B, annotated IBM quote + roadmap-slippage table; C, annotated IonQ Risk Factors quote; D, expert-survey ten-year-odds range chart with even-odds line
- Visual density pass: fund-at-a-glance stat strip, drop cap, pull quotes, sticky left nav (fixed: sidebars now actually stick), persistent right-rail source index + scroll-driven marginalia, reading-progress bar, two-column sources & notes, print stylesheet
- Team names on the page footer (Jan Wejchert, Caspar Miebach, Bader Al Eisa) plus an on-page AI acknowledgment section; same credits on the citations page
- Calculator math: 12/12 in-browser unit tests pass; interactions (footnote click, source-index click, annotation hover, scroll-spy, slider updates) verified headlessly
- `assets/favicon.svg` + `assets/og-image.png` shipped; `citations/citations.pdf` generated and linked

## Outstanding before submission

- Audio (ElevenLabs machine-read, Day 4): paste `content/audio-script.md` into ElevenLabs, export MP3 to `assets/audio.mp3`; player degrades gracefully until then
- Lighthouse audit + cross-browser pass (Day 5)
- Three independent read-throughs + cold read-through critique (Day 4 evening / Day 5)
- Vercel production deploy (Day 5)

## Team

Jan Wejchert, Caspar Miebach, and Bader Al Eisa. Roles: writer-lead / designer-lead / developer-lead (all three are full-stack and can swap).

## Authorship note

This project was scaffolded in collaboration with Claude (Anthropic). The thesis, design choices, prose voice, and creative direction are the team's. AI assistance covered: site scaffolding, CSS design system, JS calculator and interactions, draft prose generation, two rounds of source verification via web research, layout iteration, asset/PDF generation, and the audio script. A reader-facing AI acknowledgment section appears at the foot of the page itself.
