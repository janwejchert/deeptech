# Deep Tech Venturing — Group Project Design Spec

**Course:** IE Business School · Deep Tech Venturing and Investment (Prof. David)
**Deliverable:** 1,000-word magazine article on a deep tech area, delivered online
**Deadline:** Sunday 14 June 2026, 17:59 CET
**Internal target:** Saturday 13 June 2026, 21:00 CET (24-hour buffer)
**Team:** 3 people, full-stack (writer, designer, developer)
**Topic:** Quantum computing
**Date:** 2026-06-09

---

## 1. The artifact

A single immersive web page at a custom URL, presenting:

> **A 1,000-word fictional letter** from Maya Chen, founding partner of the (fictional) deep-tech VC fund **Aperture Quantum Partners**, to the limited partners of her firm's $312M Fund II — recommending an early wind-down of the fund's quantum-computing positions, three years ahead of schedule, because the timing thesis the fund was built on did not hold.

**Aperture Quantum Partners and Maya Chen are fictional.** Every cited number, physics claim, public-company roadmap quote, and SEC-filed financial detail inside the letter is real and footnoted. This is disclosed in a small italic editor's note at the very top of the page, before the letterhead, so the framing is unambiguous.

The page hosts the letter, an embedded interactive timing calculator, three annotated public-company deck exhibits, an optional machine-read audio version, expandable footnotes, and the Strategic Ask.

---

## 2. Thesis

**Quantum computing is real, but the 5-year timelines being sold to LPs and corporate buyers are fiction. The physics is on a 15–20 year curve. Capital is being deployed against the wrong clock.**

The piece is a *contrarian / skeptic* lens on the quantum sector. It targets the gap between PR-stated milestones (industry: quantum advantage by ~2030) and what the physics of error-correction overhead, qubit-doubling cadence, and required logical-qubit thresholds actually predict (closer to ~2042).

The contrarian thesis is delivered by a *believer who paid for being wrong* — Maya is an insider admitting an expensive mistake. This is what makes the argument hard to dismiss: it isn't an outside skeptic pointing fingers, it's the LP's own GP returning their money.

### Why this thesis lands with the prof

Direct callbacks to his stated lessons (per the student's learning journal):
- **Session 1: "Timing is the most underrated of the five ingredients."** This piece IS that lesson, applied to quantum.
- **Session 2: Relatability.** Maya is a character; the LPs are real readers; the prof feels the room.
- **Session 3: The Nvidia order** — own it, admit the problem, apologize, ask, offer a path. Maya's letter literally follows this order.
- **Session 3: Why → What → How → Ask** structure. The letter is structured exactly this way.
- **Session 4: Genhelix.** The letter is a leadership-under-pressure moment of the kind the prof spent a whole session on.
- **Working demo > slide.** The embedded calculator IS the demo.

---

## 3. Narrative architecture

The 1,000 words map to the prof's Why → What → How → Ask:

### Why (~200 words) — The hook
Opening line: *"When I raised this fund in 2022, I told you quantum advantage was a 2028 event. I owe you an honest update: I was wrong by at least a decade."*

Sets the tone: measured, lucid, owning the mistake. Frames the letter as an accounting, not a pitch.

### What (~450 words) — The evidence, three pillars
1. **Error-correction overhead reality** — today ~1,000 physical qubits per logical qubit; industry targets 100:1 and treats it as imminent. Peer-reviewed physics says otherwise. (Cites: surface-code threshold theorem papers, Google 2023 logical-qubit demonstration, IBM roadmap published.)
2. **Public-company roadmap slippage** — the gap between what IBM/IonQ/PsiQuantum told investors in 2021 vs. what they're telling them now, with one-quarter-at-a-time slippage. (Cites: IBM annual report, IonQ S-1 and 10-K filings, PsiQuantum press releases.)
3. **The LP–physicist conversation gap** — what the experts say in private vs. the press releases. (Cites: published quotes from John Preskill, Scott Aaronson, etc.)

Each pillar surfaces in one of the three inline exhibits (calculator + 2 annotated decks).

### How (~250 words) — The path
The wind-down plan, the redeployment thesis ("we are reallocating to quantum sensing and post-quantum cryptography migration, which are narrower but real on a 3-year horizon"), and what's kept ("the relationships and the conviction in deep tech itself, not in this timeline").

### Ask (~100 words) — The Strategic Ask
The LP vote on early redemption + Maya's personal carry concession (offering to forfeit a portion of her own carry to make LPs whole on management fees already drawn).

---

## 4. Page architecture

**Single long scroll, document-authentic.** Renders as a real fund letter that happens to be online.

```
┌────────────────────────────────────────────┐
│ [italic editor's note: fictional scenario] │ ← fiction disclosure, 1 line
├────────────────────────────────────────────┤
│ APERTURE · QUANTUM PARTNERS                │ ← letterhead
│ 14 June 2026 · LP Letter · Fund II         │
│                                            │
│ A Letter to Our Limited Partners           │ ← title
│                                            │
│ [audio play button: machine-read version]  │ ← optional audio
│                                            │
│ Dear Limited Partners,                     │
│   [Why prose...]                           │
│                                            │
│   [Exhibit A: TIMING CALCULATOR ─────────┐ │ ← inline interactive
│    YEAR: 2042                            │ │
│    [3 sliders] [industry vs. yours]      │ │
│   ─────────────────────────────────────┘ │
│                                            │
│   [What prose...]                          │
│                                            │
│   [Exhibit B: ANNOTATED IBM ROADMAP ─────┐ │ ← inline exhibit
│    "We expect ... by 2030" ─ hover ─    │ │
│       ↳ Maya's annotation appears        │ │
│   ─────────────────────────────────────┘ │
│                                            │
│   [How prose...]                           │
│                                            │
│   [Exhibit C: ANNOTATED IONQ INVESTOR DAY]│
│                                            │
│   [Ask prose...]                           │
│                                            │
│ Yours sincerely,                           │
│ Maya Chen                                  │
│ Managing Partner, Aperture Quantum         │
│                                            │
│ [Strategic Ask: LP vote button (visual)]   │ ← Strategic Ask
│                                            │
│ ─── footnotes 1–N ─── (expandable)         │
│ ─── About this piece ─── (team, course)    │ ← real disclosure
└────────────────────────────────────────────┘
```

Inline exhibits are designed as embedded "exhibits" the way a real fund memo would embed a chart — not as feature widgets. They earn their place by sitting where Maya cites the relevant evidence.

---

## 5. The interactive timing calculator (Exhibit A)

**Treatment: "Doomsday clock"** — minimal, dramatic, fits inside a letter.

### Visual
One giant year number at the top of the exhibit. Below it: three labeled sliders. Below those: a two-column comparison strip — *"INDUSTRY CLAIMS: 2030"* vs. *"YOUR ASSUMPTIONS: 2042"*.

### Inputs (3)
1. **Logical qubits needed** — preset by use case: chemistry (~150) / optimization (~1,000) / RSA-2048 break (~4,000)
2. **Overhead** — physical-to-logical ratio, slider from 100:1 (industry target) to 1,000:1 (current best)
3. **Doubling cadence** — physical qubit doubling time, slider from 1 year (industry promise) to 3 years (observed)

### Output
A single year. Computed via simple compounding model: current physical-qubit count, doubled per cadence, divided by overhead, until it meets the logical-qubit threshold for the selected use case. Math is published in the footnotes so it's auditable.

### Default values
On load, default inputs reproduce the most-cited *industry* claim for the selected use case (e.g., RSA-2048 break: industry-cited ~2030, chemistry advantage: industry-cited ~2027). The year output reads the industry number. The reader is implicitly asked to adjust toward reality. As soon as they touch the overhead or cadence slider, the year jumps to the 2040s. The comparison strip always shows both: "INDUSTRY CLAIMS: [year]" vs. "YOUR ASSUMPTIONS: [year]" — and the industry number is anchored to a specific cited source per use case, not made up.

### Math sources
- Surface-code threshold theorem (Fowler et al., 2012)
- Logical qubit overhead estimates (Google 2023, Nature)
- Roadmap doubling claims vs. observed (IBM annual reports 2021–2025, IonQ 10-K filings)

---

## 6. Annotated deck exhibits (Exhibits B–C, possibly D)

Three public-company sources, embedded as "annotated quotes." Each shows the original quote (verbatim, dated, sourced) and, on hover, reveals Maya's marginal counter-evidence with citation.

### Companies and angles
1. **IBM** — their published 2023 quantum roadmap claiming Condor (1,121 qubits) and beyond on aggressive cadence. Maya's annotation: physical-qubit count ≠ usable computation; the logical-qubit number is what matters and IBM has demonstrated <10.
2. **PsiQuantum** — public claims about reaching a 1M-physical-qubit datacenter on a ~5–10 year horizon. Maya's annotation: total worldwide physical-qubit production today is in the thousands; the production-rate curve doesn't reach 1M in the claimed window. (Exact target year verified Day 1 against the most recent public PsiQuantum statement.)
3. **IonQ** — investor-day claims about algorithmic qubits and revenue. Maya's annotation: their SEC filings show the gap between booked revenue and actual quantum compute usage.

### Interaction
Original quote sits inline in the prose, styled as a pulled blockquote. Hovering (or tapping on mobile) reveals an animated margin note with Maya's annotation and the source citation.

### Sourcing rules
- **Direct quotes only.** No paraphrasing — protects against any "you misrepresented us" challenge and makes the exhibits feel evidence-led, not editorial.
- Every quote linked to a public source (annual report, SEC filing, press release, investor day transcript).
- Every annotation linked to a peer-reviewed paper or another public corporate source.

---

## 7. Supporting layers

### Audio
ElevenLabs machine-read of the full letter. Female voice, measured pacing. Disclosed at top of the page as "machine-read." Play/pause control near the title. Optional, not autoplay.

### Footnotes
Howard-Marks-memo style. Numbered superscripts in the prose. Click expands the footnote inline (or surfaces it in a side drawer on desktop). Every numerical claim, quote, and physics statement has a footnote.

### Fiction disclosure
Small italic editor's note at the very top of the page, before the letterhead:

> *A constructed scenario for the IE Business School Deep Tech Venturing & Investment course. Aperture Quantum Partners and Maya Chen are fictional. All cited claims, data, physics, and corporate quotes are real, sourced, and accurate as of June 2026.*

### Real disclosure (page footer)
Names of the three team members, course name, professor, date, submission context. Plus a link to the underlying citation list as a downloadable PDF.

---

## 8. Visual design language

**Treatment: Howard Marks memo.**

- **Background:** ivory (`#faf7f0`)
- **Primary text:** ink black (`#1a1a1a`)
- **Accent:** muted gold (`#b8a050`) for rules, exhibit borders, footnote markers
- **Type:** Times New Roman (or a close serif: Source Serif Pro, Spectral) for body and display
- **Pull quotes:** italic, slightly darker than body, indented with a thin gold left rule
- **Exhibits:** white background, thin gold border, restrained — they sit inside the document, not on top of it

The design intent: looks like an actual private investor letter someone scanned and uploaded. Restrained, expensive, demanding. Doesn't read as "designed."

---

## 9. Phase plan

5 working days (Tue 9 Jun → Sat 13 Jun) + Sunday buffer.

| Day | Date | Goal | Writer-lead | Designer-lead | Developer-lead |
|---|---|---|---|---|---|
| 1 | Tue 9 Jun | Foundation + research lock | Source every cited claim; build citation table | Typography exploration in Figma; design system tokens | Scaffold web project (Next.js + Tailwind) and Vercel pipeline; stub calculator math |
| 2 | Wed 10 Jun | Draft + mockup sprint | Letter draft v1 (full 1,000 words, rough OK) | Full page mockup in Figma — hero through footer | Calculator math validated; page skeleton live at staging URL |
| 3 | Thu 11 Jun | Integration + first critique | Letter draft v2 with footnotes verified | Design freeze; hand off CSS, fonts, exhibit components | Page implemented with real prose; calculator UI live; hover-annotation working |
| 4 | Fri 12 Jun | Content lock + polish | Letter draft v3 = final; fiction disclosure finalized | Typography polish; mobile-responsive pass | Annotated decks integrated; footnotes; audio (ElevenLabs evening session) |
| 5 | Sat 13 Jun | QA + ship | Three independent read-throughs (one aloud); copy edit | Final design audit | Cross-browser; Lighthouse; deploy to production; **submit by 21:00 CET** |
| 6 | Sun 14 Jun | Buffer | Touch only if regression found; final submission by 17:00 CET if anything slipped | | |

### Mandatory critique gates
- **End of Day 2:** all three read the draft, look at the mockup, click the calculator. Vote: does this reach "wow"? If no, what's missing? Adjust Days 3–4.
- **End of Day 4:** "the prof read-through" — one team member pretends to be Prof. David, reads cold, narrates reactions out loud.

### Risk register
1. **Voice doesn't feel like Maya** → Day 2 critique catches; Day 3 absorbs rewrite.
2. **Calculator math is gameable** → use only peer-reviewed math; publish the formula in the footnotes.
3. **Annotations read as gimmicky** → direct quotes only, no paraphrasing.
4. **Audio sounds robotic** → ElevenLabs v3 + pacing pass; fallback is a "Maya's voice notes" written sidebar instead of audio.
5. **Submission link breaks** → submit Saturday 21:00 CET; Sunday is buffer.
6. **Professor reads it as fraud** → fiction disclosure is the FIRST element on the page, italic editor's note, unambiguous.

---

## 10. Definition of "done" — submission criteria

A green checkbox on each of these before we submit:

- [ ] 1,000-word letter, ±5%, reads aloud cleanly
- [ ] Fiction disclosure is the first element above the letterhead, unambiguous
- [ ] Why / What / How / Ask all clearly present and labeled (even if visually subtle)
- [ ] Calculator works: default reproduces industry's ~2030, realistic inputs land 2040+, math published in footnotes
- [ ] 3 annotated public-company exhibits with verbatim quotes and sourced annotations
- [ ] All footnotes have real sources (no fabricated citations); citation list downloadable as PDF
- [ ] Audio version plays cleanly with a disclosure
- [ ] Mobile-responsive, Lighthouse score ≥ 90 on performance and accessibility
- [ ] Loads in < 2 seconds on cold cache
- [ ] Real disclosure footer with team names, course, professor, date
- [ ] URL is shareable, stable, and not behind any login
- [ ] Three team members have read the final version aloud and approved

---

## 11. Out of scope (intentionally not building)

- A landing page or "Aperture Partners brand site" — only the LP letter exists
- A real database / CMS — page is static
- Login or LP authentication — the page is public; the "private letter" conceit is a design framing, not a real privacy layer
- A second piece (companion explainer, podcast episode, video) — focus is one artifact, executed at the highest possible craft
- Coverage of quantum sensing or quantum cryptography beyond brief mention in the "How" section — the thesis is computing-focused
- A live data feed of public quantum companies — citations are point-in-time as of June 2026

---

## 12. Open decisions deferred to implementation

These are deliberately *not* decided here, because they're better decided during the build with the artifact in hand:

- Exact Maya Chen biography details (resume, age, geography) — drafted on Day 1, finalized Day 3
- Exact wording of the Strategic Ask — drafted Day 2, finalized Day 4
- Which footnote system (inline expand vs. side drawer) — implemented Day 4 after mobile responsiveness is known
- Specific ElevenLabs voice — selected Day 4 evening
- Whether to include a 4th annotated exhibit (Quantinuum) — kept as optional stretch goal for Day 4
