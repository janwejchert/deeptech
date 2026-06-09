# Aperture LP Letter — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **For the human team (writer / designer / developer):** Work the phases in order. Each phase is one calendar day. Each task names an owner. Tick checkboxes as you go. End-of-day critique gates are mandatory.

**Goal:** Ship a single immersive web page hosting Maya Chen's fictional 1,000-word LP letter at a public URL by **Sat 13 Jun 2026, 21:00 CET** (3 hours buffer to the 14 Jun 17:59 CET hard deadline, plus a full Sunday buffer for regressions).

**Architecture:** Static single-page web piece — plain HTML + one CSS file + one JS file. No build step. Deployed as a static site on Vercel (free tier). All interactivity is vanilla JS: a calculator with three sliders, hover-revealed annotations on inline quotes, an audio player for the ElevenLabs machine-read version, and an expandable footnote system. Design follows the "Howard Marks memo" treatment: ivory paper, ink, muted gold accent, Times-style serif throughout.

**Tech Stack:**
- HTML5 + CSS (plain, no framework) + vanilla JavaScript
- Figma for design system + page mockups
- ElevenLabs for machine-read audio
- Vercel for deploy (or Netlify as fallback)
- Git for site-folder versioning
- Source files (writing) live in a shared Google Doc; final prose pasted into `index.html` on Day 4

**Team roles** (all confirmed full-stack; pick a lead per discipline):
- **Writer-lead (W)** — owns the prose, citations, voice
- **Designer-lead (D)** — owns Figma, type, color, exhibit components, mobile responsiveness
- **Developer-lead (Dev)** — owns the site repo, calculator math + UI, interactions, deploy

---

## Critical path

```
Day 1 ─┬─ W: citations table
       ├─ D: design system
       └─ Dev: HTML scaffold + calculator math + unit tests
                                ↓
Day 2 ─┬─ W: draft v1 (1000w)            ─┐
       ├─ D: full Figma mockup            │
       └─ Dev: calculator UI              │── CRITIQUE GATE #1 (end of day)
                                          ─┘
Day 3 ─┬─ W: draft v2 + footnote sources  ─┐
       ├─ D: design freeze + handoff      │
       └─ Dev: page integration + hover   │
                                          ─┘
Day 4 ─┬─ W: draft v3 = FINAL             ─┐
       ├─ D: micro-polish + mobile        │
       ├─ Dev: decks + footnotes + audio  │── CRITIQUE GATE #2 ("prof read-through")
       └─ All: ElevenLabs session         ─┘
                                          
Day 5 ─┬─ All: 3 read-throughs           ─┐
       ├─ Dev: Lighthouse + cross-browser │
       └─ Dev: DEPLOY + SUBMIT @ 21:00 CET ┘

Day 6 ─── Buffer (regressions only)
```

---

## File Structure

All paths are relative to `/Users/janwejchert/Desktop/IE Sem3/DeepTechVenturing/`.

```
site/                              ← new git repo, deployed to Vercel
├── index.html                     ← the letter page (everything is here)
├── styles.css                     ← Howard Marks design system
├── app.js                         ← calculator + hover annotations + audio + footnotes
├── assets/
│   ├── audio.mp3                  ← ElevenLabs export (added Day 4)
│   ├── favicon.svg                ← Aperture monogram
│   └── og-image.png               ← social share card
├── citations/
│   ├── citations.md               ← source list (markdown, source of truth)
│   └── citations.pdf              ← downloadable export (added Day 5)
├── tests/
│   └── calculator.test.html       ← in-browser unit tests for calculator math
├── README.md                      ← project README (team, course, license)
├── .gitignore
└── package.json                   ← only used for Vercel detection (no deps)

content/                           ← outside the deploy, in the main project folder
├── letter-source.md               ← writer's working doc (also mirrored in Google Docs)
├── citations-source.md            ← writer's source list, becomes site/citations/citations.md
└── voice-script.txt               ← exported text for ElevenLabs audio recording
```

**Why plain HTML over Next.js:** the spec calls for a single page that reads like a real document. No routing, no SSR, no auth, no API. A framework adds tooling overhead that costs more than it saves in 5 days. One `index.html` makes the source readable and the deploy bulletproof.

---

## Phase 0 — Project setup

**When:** Tuesday 9 June, evening (today). ~2 hours total across the team.
**Goal:** Repos, accounts, comms, shared workspaces all live before anyone writes prose or code.

### Task 0.1 — Initialize the site repo

**Owner:** Dev
**Files:** `site/` (new directory)

- [ ] **Step 1:** Create the directory

```bash
cd "/Users/janwejchert/Desktop/IE Sem3/DeepTechVenturing"
mkdir -p site/assets site/citations site/tests
cd site
git init
```

- [ ] **Step 2:** Create `.gitignore`

```bash
cat > .gitignore << 'EOF'
.DS_Store
node_modules/
.vercel
*.log
.env*
EOF
```

- [ ] **Step 3:** Create a minimal `package.json` (for Vercel detection only — no dependencies)

```json
{
  "name": "aperture-lp-letter",
  "private": true,
  "version": "0.1.0",
  "description": "Aperture Quantum Partners — Letter to Limited Partners (IE Deep Tech Venturing group project)"
}
```

- [ ] **Step 4:** Create a placeholder `index.html` so Vercel has something to deploy

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aperture Quantum Partners — coming Saturday</title>
</head>
<body>
  <p style="font-family: Georgia, serif; padding: 4rem; text-align: center; color: #555;">Coming Saturday.</p>
</body>
</html>
```

- [ ] **Step 5:** First commit

```bash
git add .
git commit -m "chore: scaffold site repo"
```

- [ ] **Step 6:** Push to GitHub (create a private repo first via gh CLI or the GitHub web UI)

```bash
gh repo create aperture-lp-letter --private --source=. --remote=origin --push
# Or if gh isn't available, create the repo manually on github.com, then:
# git remote add origin https://github.com/<your-username>/aperture-lp-letter.git
# git branch -M main
# git push -u origin main
```

- [ ] **Step 7:** Deploy to Vercel (one-time)

```bash
npx vercel --yes
# Note the production URL Vercel prints — this is the URL you'll submit to the professor.
# Save it somewhere visible to the whole team.
```

**Acceptance:** Visiting the Vercel URL shows "Coming Saturday." Repo is on GitHub. Production URL is saved in a shared place (pinned message in team chat).

### Task 0.2 — Stand up team comms and shared workspaces

**Owner:** Whoever's organizing (one person volunteer)

- [ ] **Step 1:** Group chat (WhatsApp, Telegram, Discord — whatever the team already uses). Pin: production URL, deadline, and a link to this plan.

- [ ] **Step 2:** Shared Google Doc named `Aperture Letter — Working Draft`. Set permissions to all three teammates with edit access. Paste the **letter outline** below at the top:

```
APERTURE QUANTUM PARTNERS — LP LETTER, FUND II — 14 June 2026

[WHY ~200 words]
Hook: "When I raised this fund in 2022, I told you quantum advantage was a 2028 event. I owe you an honest update: I was wrong by at least a decade."
- The frame: this is an accounting, not a pitch
- What I will tell you in the next 1,000 words

[WHAT ~450 words]
Pillar 1 — Error-correction overhead reality
Pillar 2 — Public-company roadmap slippage (IBM / PsiQuantum / IonQ)
Pillar 3 — The LP–physicist conversation gap

[HOW ~250 words]
The wind-down plan
The redeployment thesis (sensing + post-quantum crypto migration)
What we keep (the relationships, the deep-tech conviction)

[ASK ~100 words]
LP vote on early redemption
Personal carry concession
Sign-off: "Yours sincerely, Maya Chen"
```

- [ ] **Step 3:** Shared Figma file named `Aperture Letter`. Two pages inside: `Design System` and `Letter Mockup`. Invite all three teammates with edit access.

- [ ] **Step 4:** Open an account at https://elevenlabs.io (free tier supports trial; ~$5 starter unlocks production-grade voice). Pick a female voice; **don't generate audio yet** — that happens Day 4 after the prose is final.

**Acceptance:** All three teammates can edit the Google Doc, the Figma file, and the GitHub repo.

### Task 0.3 — Sign off the citation targets (research scoping)

**Owner:** Writer
**Files:** `content/citations-source.md` (new)

- [ ] **Step 1:** Create the citation skeleton file:

```bash
mkdir -p "/Users/janwejchert/Desktop/IE Sem3/DeepTechVenturing/content"
touch "/Users/janwejchert/Desktop/IE Sem3/DeepTechVenturing/content/citations-source.md"
```

- [ ] **Step 2:** Paste this skeleton — each row is a citation target to fill in Phase 1:

```markdown
# Aperture Letter — Citation Sources

> Source of truth for every numerical claim, quote, and physics statement in the letter.
> Each row needs: (1) the claim, (2) the verbatim source, (3) URL or DOI, (4) date accessed.

## Pillar 1 — Error-correction overhead

| # | Claim in letter | Source quote | URL / DOI | Accessed |
|---|----|----|----|----|
| 1 | "Today the best demonstrated overhead is ~1,000 physical qubits per logical qubit." | TBD: Google 2023 surface code paper | TBD | TBD |
| 2 | "The surface-code threshold theorem requires physical error rates below ~1%." | TBD: Fowler et al. 2012 | TBD | TBD |
| 3 | "Industry target is 100:1 overhead — and they've been saying that for a decade." | TBD: roadmap quote | TBD | TBD |

## Pillar 2 — Public-company roadmap slippage

| # | Claim in letter | Source quote | URL / DOI | Accessed |
|---|----|----|----|----|
| 4 | "IBM's 2021 roadmap promised X by 2025; their 2025 roadmap promises X by 2029." | TBD: IBM Quantum Annual Report 2021 + 2025 | TBD | TBD |
| 5 | "IBM Condor reached 1,121 physical qubits in 2023, but logical qubits demonstrated remain in single digits." | TBD: IBM blog post + recent peer-reviewed result | TBD | TBD |
| 6 | "PsiQuantum has stated a 1M-physical-qubit datacenter by [year]." | TBD: PsiQuantum press release | TBD | TBD |
| 7 | "IonQ's most recent 10-K acknowledges that quantum compute revenue is a small fraction of booked revenue." | TBD: IonQ 10-K, FY2025 | TBD | TBD |

## Pillar 3 — LP–physicist conversation gap

| # | Claim in letter | Source quote | URL / DOI | Accessed |
|---|----|----|----|----|
| 8 | "John Preskill on the gap between near-term and fault-tolerant quantum: ..." | TBD: Preskill talk or paper | TBD | TBD |
| 9 | "Scott Aaronson on the public discourse: ..." | TBD: Aaronson blog post or interview | TBD | TBD |
| 10 | "A peer-reviewed survey of researchers' own timeline estimates: ..." | TBD: 2024+ survey | TBD | TBD |

## Calculator math anchors

| # | Constant | Value | Source |
|---|----|----|----|
| C1 | "Current SOTA physical qubits on a single processor" | ~1,121 (IBM Condor) | TBD |
| C2 | "Industry-claimed advantage years per use case" | Chem ~2027, Opt ~2029, RSA ~2030–33 | TBD: triangulate from public roadmaps |
| C3 | "Observed qubit doubling cadence (2020–2025)" | ~3 years | TBD: compile from public roadmaps |
```

- [ ] **Step 3:** Commit to the project (this file lives outside the site repo; check it into a separate `content/` git repo, or just track via Google Doc — team's choice). Recommended: keep `content/` outside `site/` and rely on Google Doc revision history for collaboration.

**Acceptance:** Citation skeleton exists; Writer knows what they're hunting for in Phase 1.

---

## Phase 1 — Foundation (research + scaffold)

**When:** Tuesday 9 June, late evening into Wednesday morning. ~4–6 hours per role.
**Goal:** Every cited number sourced, design system locked, HTML scaffold + calculator math live with tests passing.

### Task 1.1 — Source all Pillar 1 citations (error-correction)

**Owner:** Writer
**Files:** `content/citations-source.md`

- [ ] **Step 1:** Fill in rows 1, 2, 3 in the Pillar 1 table with real sources. Recommended starting points:
  - Google's logical-qubit surface code result: search `"google quantum logical qubit" 2023 OR 2024 nature`
  - Fowler surface code: search `Fowler "surface codes" 2012 arxiv`
  - Industry overhead claims: IBM's quantum development roadmap blog post

- [ ] **Step 2:** For each source, capture the **verbatim quote**, the URL, and the access date. Paraphrasing is not acceptable for this letter — direct quotes only.

- [ ] **Step 3:** If a claim turns out to be unsupportable, **delete it from the letter outline** rather than soften it. The letter's credibility lives or dies on this.

**Acceptance:** All three rows in Pillar 1 have non-`TBD` source fields. Quotes copied verbatim.

### Task 1.2 — Source all Pillar 2 citations (company roadmaps)

**Owner:** Writer
**Files:** `content/citations-source.md`

- [ ] **Step 1:** Fill rows 4–7. Key sources to chase:
  - IBM Quantum Annual Report 2021 (PDF, find on ibm.com/quantum)
  - IBM Quantum Development Roadmap most recent published
  - PsiQuantum press releases (search `"PsiQuantum" 1 million qubits` + the date of their most recent public claim)
  - IonQ 10-K most recent fiscal year — search `IonQ 10-K SEC filings`. Look specifically at the Risk Factors section and the Revenue Recognition footnote.

- [ ] **Step 2:** When you find IBM's slippage between 2021 and 2025 roadmaps, capture **both** quotes (original promise + current promise) so the annotation has the contrast.

**Acceptance:** All four rows complete. The IBM annotation has both the original and current promise side by side.

### Task 1.3 — Source all Pillar 3 citations (physicist quotes)

**Owner:** Writer
**Files:** `content/citations-source.md`

- [ ] **Step 1:** Fill rows 8, 9, 10.
  - Preskill: search his Caltech faculty page, the "quantum supremacy" coinage piece, or his recent NISQ-era essays
  - Aaronson: shtetl-optimized blog, search his posts on "quantum hype" or "post-quantum"
  - Researcher-timeline survey: search Google Scholar for `"quantum computing" survey timeline 2024 OR 2025`. There are several decent ones.

- [ ] **Step 2:** Each quote must be **directly attributable** and **dated**. No "anonymous researcher told me" — every quote is on the record.

**Acceptance:** All three rows complete. Quotes are verbatim and dated.

### Task 1.4 — Calculator math anchors

**Owner:** Writer (with the Developer for validation)
**Files:** `content/citations-source.md`

- [ ] **Step 1:** Fill C1, C2, C3 in the Calculator Math Anchors table.
  - C1 (current physical qubit SOTA): use the most recent publicly demonstrated processor with a citation
  - C2 (industry-claimed advantage years): triangulate from 2–3 sources per use case
  - C3 (observed doubling cadence): compile a small table of physical-qubit milestones with years (e.g., IBM Eagle 127 → Osprey 433 → Condor 1121 → Heron 156-modular) and compute the actual doubling time

- [ ] **Step 2:** Hand off C1–C3 numbers to the Developer for use in `app.js`.

**Acceptance:** Three constants documented with sources. Developer has the numbers in writing.

### Task 1.5 — Design system in Figma

**Owner:** Designer
**Files:** Figma file `Aperture Letter` → page `Design System`

- [ ] **Step 1:** Define type scale. Use Times New Roman (or a free serif close to it — **Source Serif Pro** is the cleanest open alternative; **Spectral** is more contemporary). Define:
  - Display: 28–32px, regular, italic for the title
  - H2 (section heads "Why" / "What" / "How"): 14px, uppercase, letter-spaced, gold
  - Body: 16px, 1.7 line-height
  - Pull quote: 18px, italic, gold-rule indent
  - Caption / meta: 10px, uppercase, letter-spaced, muted

- [ ] **Step 2:** Define color tokens:
  - `--bg`: `#faf7f0` (ivory)
  - `--ink`: `#1a1a1a`
  - `--ink-secondary`: `#555`
  - `--gold`: `#b8a050` (muted gold — accent for rules, exhibit borders, footnote numbers)
  - `--gold-soft`: `#d6c89a` (lighter, for hover states)
  - `--exhibit-bg`: `#ffffff`

- [ ] **Step 3:** Design the **exhibit components**:
  - Pulled blockquote (with hover state for annotated quotes)
  - Calculator exhibit (the doomsday clock layout)
  - Annotated quote exhibit (original + hover margin annotation)
  - Footnote marker + expanded footnote panel
  - Audio player pill

- [ ] **Step 4:** Document the spacing system: base unit 8px. Section spacing 48px. Exhibit margin 24px above + below.

**Acceptance:** Design System page in Figma has type styles, color styles, and component definitions documented. Designer signs off "ready for handoff Wednesday end-of-day."

### Task 1.6 — HTML scaffold

**Owner:** Developer
**Files:** `site/index.html`

- [ ] **Step 1:** Overwrite the placeholder `index.html` with the full semantic scaffold. Don't write prose yet — leave `[lorem]` placeholders for the writer to replace on Wed/Thu:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>A Letter to Our Limited Partners — Aperture Quantum Partners</title>
  <meta name="description" content="Aperture Quantum Partners LP letter, June 2026. A constructed scenario for the IE Deep Tech Venturing course.">
  <meta property="og:title" content="A Letter to Our Limited Partners — Aperture Quantum Partners">
  <meta property="og:description" content="A fictional fund letter using real data on the quantum-computing timeline gap.">
  <meta property="og:image" content="/assets/og-image.png">
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
  <link rel="stylesheet" href="styles.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
</head>
<body>
  <article class="letter">

    <aside class="disclosure" role="note">
      A constructed scenario for the IE Business School Deep Tech Venturing &amp; Investment course. Aperture Quantum Partners and Maya Chen are fictional. All cited claims, data, physics, and corporate quotes are real, sourced, and accurate as of June 2026.
    </aside>

    <header class="letterhead">
      <p class="brand">APERTURE&nbsp;·&nbsp;QUANTUM&nbsp;PARTNERS</p>
      <p class="meta">14 JUNE 2026&nbsp;·&nbsp;LP LETTER&nbsp;·&nbsp;FUND II</p>
    </header>

    <h1 class="title">A Letter to Our Limited Partners</h1>

    <div class="audio-player" id="audio-player" aria-label="Machine-read audio version">
      <button id="audio-toggle" aria-pressed="false">▶ Listen</button>
      <span class="audio-note">Machine-read · ~7 min</span>
      <audio id="audio-el" src="/assets/audio.mp3" preload="none"></audio>
    </div>

    <section class="prose" id="why">
      <p class="salutation">Dear Limited Partners,</p>
      <p data-section="why">[WHY prose ~200 words — replaced Day 3]</p>
    </section>

    <figure class="exhibit" id="exhibit-calculator" aria-labelledby="exhibit-calculator-label">
      <figcaption id="exhibit-calculator-label" class="exhibit-label">EXHIBIT A&nbsp;·&nbsp;THE TIMING CALCULATOR</figcaption>
      <div class="calc" id="calc-root">
        <!-- Calculator UI rendered by app.js -->
      </div>
    </figure>

    <section class="prose" id="what">
      <h2 class="section-head">What</h2>
      <p data-section="what">[WHAT prose ~450 words — replaced Day 3]</p>
    </section>

    <figure class="exhibit annotated" id="exhibit-ibm" aria-labelledby="exhibit-ibm-label">
      <figcaption id="exhibit-ibm-label" class="exhibit-label">EXHIBIT B&nbsp;·&nbsp;ANNOTATED — IBM ROADMAP</figcaption>
      <blockquote class="annotated-quote" data-annotation="ibm">
        <p>[verbatim IBM quote — filled Day 3]</p>
        <cite>— [source, date]</cite>
      </blockquote>
    </figure>

    <figure class="exhibit annotated" id="exhibit-ionq" aria-labelledby="exhibit-ionq-label">
      <figcaption id="exhibit-ionq-label" class="exhibit-label">EXHIBIT C&nbsp;·&nbsp;ANNOTATED — IONQ INVESTOR DAY</figcaption>
      <blockquote class="annotated-quote" data-annotation="ionq">
        <p>[verbatim IonQ quote — filled Day 3]</p>
        <cite>— [source, date]</cite>
      </blockquote>
    </figure>

    <section class="prose" id="how">
      <h2 class="section-head">How</h2>
      <p data-section="how">[HOW prose ~250 words — replaced Day 3]</p>
    </section>

    <section class="prose" id="ask">
      <h2 class="section-head">Ask</h2>
      <p data-section="ask">[ASK prose ~100 words — replaced Day 3]</p>
    </section>

    <footer class="signoff">
      <p>Yours sincerely,</p>
      <p class="signature">Maya Chen</p>
      <p class="title-line">Managing Partner, Aperture Quantum Partners</p>
    </footer>

    <section class="footnotes" id="footnotes" aria-label="Footnotes">
      <h2 class="section-head">Footnotes</h2>
      <ol id="footnotes-list">
        <!-- footnotes rendered Day 4 -->
      </ol>
      <p class="citations-link">
        <a href="/citations/citations.pdf" download>Download full citation list (PDF)</a>
      </p>
    </section>

    <footer class="real-disclosure">
      <p>This piece was produced by [Team member 1], [Team member 2], and [Team member 3] for the Deep Tech Venturing &amp; Investment module at IE Business School, taught by Professor David, June 2026.</p>
    </footer>

  </article>

  <script src="app.js" defer></script>
</body>
</html>
```

- [ ] **Step 2:** Commit:

```bash
git add index.html
git commit -m "feat: html scaffold with semantic letter structure"
git push
```

**Acceptance:** Loading the deployed URL shows the scaffold with placeholder text. Scaffold has no styles yet (it'll look ugly — that's fine).

### Task 1.7 — Calculator math module (TDD)

**Owner:** Developer
**Files:** `site/app.js`, `site/tests/calculator.test.html`

- [ ] **Step 1:** Write the failing test file first. Create `site/tests/calculator.test.html`:

```html
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Calculator tests</title></head>
<body>
<h1>Calculator math tests</h1>
<pre id="out"></pre>
<script>
  // Tests will fail until app.js exposes window.ApertureCalc
  const out = document.getElementById('out');
  function assert(name, actual, expected, tolerance = 0) {
    const pass = tolerance > 0
      ? Math.abs(actual - expected) <= tolerance
      : actual === expected;
    out.textContent += `${pass ? 'PASS' : 'FAIL'}  ${name}  expected=${expected}  actual=${actual}\n`;
    if (!pass) document.title = 'FAILING TESTS';
  }

  // Test 1: known industry-friendly inputs → realistic optimistic year
  // Chemistry, 100:1 overhead, 1-year doubling: should land around 2030
  // log2(150*100 / 1121) * 1 ≈ log2(13.38) ≈ 3.74 → ceil = 4 → 2026 + 4 = 2030
  assert(
    'chemistry / 100:1 / 1yr → 2030',
    ApertureCalc.compute('chemistry', 100, 1),
    2030
  );

  // Test 2: realistic inputs → late timeline
  // RSA, 1000:1 overhead, 3-year doubling
  // log2(4000*1000 / 1121) * 3 ≈ log2(3568.24) * 3 ≈ 11.80 * 3 = 35.4 → ceil = 36 → 2026 + 36 = 2062
  assert(
    'RSA / 1000:1 / 3yr → 2062',
    ApertureCalc.compute('rsa', 1000, 3),
    2062
  );

  // Test 3: optimization mid-realistic
  // Optimization (1000 logical), 500:1 overhead, 2-year doubling
  // log2(1000*500 / 1121) * 2 ≈ log2(446.03) * 2 ≈ 8.80 * 2 = 17.6 → ceil = 18 → 2044
  assert(
    'optimization / 500:1 / 2yr → 2044',
    ApertureCalc.compute('optimization', 500, 2),
    2044
  );

  // Test 4: industry-claimed years are returned correctly per use case
  assert('industry year — chemistry', ApertureCalc.industryYear('chemistry'), 2027);
  assert('industry year — optimization', ApertureCalc.industryYear('optimization'), 2029);
  assert('industry year — rsa', ApertureCalc.industryYear('rsa'), 2030);

  // Test 5: use case logical qubit counts
  assert('q_logical — chemistry', ApertureCalc.useCase('chemistry').qLogical, 150);
  assert('q_logical — rsa', ApertureCalc.useCase('rsa').qLogical, 4000);
</script>
</body>
</html>
```

- [ ] **Step 2:** Open `site/tests/calculator.test.html` in a browser. Expected: every test FAILs because `ApertureCalc` is undefined (you'll see errors in the console).

- [ ] **Step 3:** Create `site/app.js` with the minimum implementation to pass the tests:

```javascript
/* Aperture Calculator
 * ------------------------------------------------------------------------
 * Computes the calendar year at which physical-qubit growth, given
 * the user's assumptions about overhead and doubling cadence, would
 * be sufficient to support a chosen number of logical qubits.
 *
 * Model:
 *   physical_required = q_logical * overhead
 *   years_needed      = log2(physical_required / PHYSICAL_QUBITS_NOW)
 *                       * doubling_years
 *   year_advantage    = ceil(YEAR_NOW + years_needed)
 *
 * Anchors (verified Day 1):
 *   PHYSICAL_QUBITS_NOW  — TBD (will use IBM Condor 1121 unless replaced)
 *   YEAR_NOW             — 2026
 *   Industry years       — cited from public roadmaps per use case
 * ------------------------------------------------------------------------
 */
const ApertureCalc = (function () {
  const PHYSICAL_QUBITS_NOW = 1121;  // IBM Condor (2023). Update Day 1 if writer finds a more recent SOTA.
  const YEAR_NOW = 2026;

  const USE_CASES = {
    chemistry:    { qLogical: 150,  industryYear: 2027, label: 'Chemistry advantage' },
    optimization: { qLogical: 1000, industryYear: 2029, label: 'Optimization advantage' },
    rsa:          { qLogical: 4000, industryYear: 2030, label: 'RSA-2048 break' },
  };

  function compute(useCaseKey, overhead, doublingYears) {
    const uc = USE_CASES[useCaseKey];
    if (!uc) throw new Error('unknown use case: ' + useCaseKey);
    const physicalRequired = uc.qLogical * overhead;
    const yearsNeeded = Math.log2(physicalRequired / PHYSICAL_QUBITS_NOW) * doublingYears;
    return YEAR_NOW + Math.ceil(yearsNeeded);
  }

  function industryYear(useCaseKey) {
    return USE_CASES[useCaseKey].industryYear;
  }

  function useCase(useCaseKey) {
    return USE_CASES[useCaseKey];
  }

  return {
    compute,
    industryYear,
    useCase,
    USE_CASES,
    PHYSICAL_QUBITS_NOW,
    YEAR_NOW,
  };
})();

// Expose on window for tests; UI binding happens further down (Phase 2 task 2.6).
if (typeof window !== 'undefined') {
  window.ApertureCalc = ApertureCalc;
}
```

- [ ] **Step 4:** Refresh `site/tests/calculator.test.html`. Expected: every test PASSes. Verify by reading the output `pre`.

- [ ] **Step 5:** Commit:

```bash
git add app.js tests/calculator.test.html
git commit -m "feat(calc): timing model with tests, default anchors"
git push
```

**Acceptance:** All 8 assertions pass in the browser. The page title does not say "FAILING TESTS."

---

## Phase 2 — Draft + mockup sprint

**When:** Wednesday 10 June, full day. ~6–8 hours per role.
**Goal:** Letter draft v1 written, full Figma mockup done, calculator UI live (with placeholder data wiring).

### Task 2.1 — Letter draft v1 (Writer)

**Owner:** Writer
**Files:** Google Doc `Aperture Letter — Working Draft`

- [ ] **Step 1:** Working in the shared Google Doc, write the **WHY section** (~200 words). Constraints:
  - Open with the line: *"When I raised this fund in 2022, I told you quantum advantage was a 2028 event. I owe you an honest update: I was wrong by at least a decade."*
  - Establish Maya's fund (Aperture Quantum Partners), Fund II ($312M), her position (founding partner), and the fact that the next 1,000 words are an accounting, not a pitch.
  - End by signposting what the LP is about to read: the three pillars + the path forward + the ask.

- [ ] **Step 2:** Write the **WHAT section** (~450 words). Three pillars, ~150 words each, in order:
  - Pillar 1 — Error-correction overhead reality (cite Pillar 1 sources, refer the LP to *Exhibit A: the timing calculator*)
  - Pillar 2 — Roadmap slippage (cite Pillar 2 sources, refer to *Exhibit B (IBM)* and *Exhibit C (IonQ)*)
  - Pillar 3 — LP–physicist conversation gap (cite Pillar 3 sources, no exhibit — pure prose)

- [ ] **Step 3:** Write the **HOW section** (~250 words). Wind-down mechanics + redeployment (sensing + post-quantum crypto migration) + what's kept.

- [ ] **Step 4:** Write the **ASK section** (~100 words). LP vote + Maya's personal carry concession.

- [ ] **Step 5:** Word-count check. Target 1,000 ± 50. If over, cut.

- [ ] **Step 6:** Post in team chat: "Draft v1 done — feedback in Doc by 6 PM."

**Acceptance:** Google Doc contains a full ~1,000-word letter in Maya's voice, with citation placeholders matching the Phase 1 source table.

### Task 2.2 — Maya Chen bio + voice note

**Owner:** Writer
**Files:** A separate page in the Google Doc titled "Maya — Bio"

- [ ] **Step 1:** Write a 100-word bio of Maya — enough to ground the voice. Suggested skeleton (adjust to taste):
  - Background: PhD in condensed matter physics → IB analyst → joined a deep-tech VC → spun out to start Aperture in 2022
  - Personality: technically credible (she can actually read the physics papers), measured tone, dry
  - Why she'd write this letter: she has the conviction *and* the humility, and she's seen the Nvidia + Genhelix patterns

- [ ] **Step 2:** Voice note: 3 reference writers whose tone Maya echoes. Suggested: Howard Marks (Oaktree memos), Marc Andreessen (early essays), Mary Meeker (Internet Trends decks). Pin one quote from each as a "tone target."

**Acceptance:** Bio + voice note exist. Other teammates can read them and understand who Maya is.

### Task 2.3 — Full page mockup in Figma

**Owner:** Designer
**Files:** Figma `Aperture Letter` → page `Letter Mockup`

- [ ] **Step 1:** Build the full desktop mockup at 1440px width, using the Design System components from Task 1.5. Top to bottom:
  - Editor's note (fiction disclosure) — small italic, max-width 60ch
  - Letterhead block
  - Title
  - Audio player pill
  - WHY prose (using lorem ipsum where the writer hasn't filled in yet)
  - Calculator exhibit (full Doomsday Clock layout — year output, three labeled sliders, industry-vs-yours strip)
  - WHAT prose
  - IBM annotated quote (show hover state on a duplicated frame so dev can see what the reveal looks like)
  - IonQ annotated quote
  - HOW prose
  - ASK prose
  - Sign-off
  - Footnotes panel (collapsed + expanded states)
  - Real disclosure footer

- [ ] **Step 2:** Build a mobile mockup at 375px width. The two-column "industry vs. yours" comparison stacks vertically on mobile. Sliders go full-width.

- [ ] **Step 3:** Annotate the mockup with **spacing measurements** and **type styles by name** so the developer can implement without guessing.

- [ ] **Step 4:** Share Figma link in team chat: "Mockup v1 ready — review and react by EoD."

**Acceptance:** Figma `Letter Mockup` page has desktop + mobile, annotated, with hover-state shown for annotated quotes.

### Task 2.4 — CSS design system foundations

**Owner:** Developer
**Files:** `site/styles.css`

- [ ] **Step 1:** Create `site/styles.css` with the design tokens and base typography. (These match the Figma Design System from Task 1.5.)

```css
/* Aperture LP Letter — Howard Marks treatment
 * Tokens, typography, layout, exhibits.
 */

:root {
  --bg: #faf7f0;
  --ink: #1a1a1a;
  --ink-secondary: #555;
  --ink-muted: #888;
  --gold: #b8a050;
  --gold-soft: #d6c89a;
  --exhibit-bg: #ffffff;

  --serif: 'Source Serif Pro', 'Times New Roman', Georgia, serif;

  --measure: 65ch;
  --unit: 8px;

  --rule-thin: 1px solid var(--gold-soft);
  --rule-strong: 2px solid var(--gold);
}

* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }

body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--serif);
  font-size: 16px;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

.letter {
  max-width: var(--measure);
  margin: 0 auto;
  padding: calc(var(--unit) * 8) calc(var(--unit) * 3);
}

.disclosure {
  font-style: italic;
  font-size: 13px;
  color: var(--ink-muted);
  border-bottom: var(--rule-thin);
  padding-bottom: calc(var(--unit) * 2);
  margin-bottom: calc(var(--unit) * 4);
  line-height: 1.5;
}

.letterhead {
  border-bottom: var(--rule-strong);
  padding-bottom: calc(var(--unit) * 1);
  margin-bottom: calc(var(--unit) * 4);
}
.letterhead .brand {
  margin: 0;
  font-size: 11px;
  letter-spacing: 4px;
  color: var(--gold);
  font-weight: 600;
}
.letterhead .meta {
  margin: calc(var(--unit) * 0.5) 0 0;
  font-size: 10px;
  letter-spacing: 2px;
  color: var(--ink-muted);
}

.title {
  font-weight: 400;
  font-style: italic;
  font-size: 32px;
  line-height: 1.2;
  margin: 0 0 calc(var(--unit) * 3);
  color: var(--ink);
}

.audio-player {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--unit) * 1.5);
  border: var(--rule-thin);
  background: var(--exhibit-bg);
  padding: calc(var(--unit) * 1) calc(var(--unit) * 2);
  border-radius: 999px;
  margin-bottom: calc(var(--unit) * 5);
  font-size: 12px;
}
.audio-player button {
  font-family: var(--serif);
  background: transparent;
  border: 0;
  color: var(--ink);
  font-size: 13px;
  cursor: pointer;
  padding: 0;
}
.audio-player .audio-note {
  color: var(--ink-muted);
  font-size: 10px;
  letter-spacing: 1px;
}

.prose p {
  margin: 0 0 calc(var(--unit) * 2);
}
.salutation {
  font-style: italic;
}

.section-head {
  font-size: 13px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--gold);
  font-weight: 600;
  margin: calc(var(--unit) * 6) 0 calc(var(--unit) * 2);
  font-family: var(--serif);
}

.exhibit {
  background: var(--exhibit-bg);
  border: var(--rule-thin);
  margin: calc(var(--unit) * 5) 0;
  padding: calc(var(--unit) * 3);
}
.exhibit-label {
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: calc(var(--unit) * 2);
  text-align: center;
  font-weight: 600;
}

.signoff {
  margin: calc(var(--unit) * 8) 0 calc(var(--unit) * 4);
}
.signoff p { margin: calc(var(--unit) * 0.5) 0; }
.signoff .signature {
  font-family: 'Brush Script MT', cursive;
  font-size: 32px;
  font-weight: 400;
  font-style: italic;
}
.signoff .title-line {
  font-size: 11px;
  letter-spacing: 2px;
  color: var(--ink-muted);
  text-transform: uppercase;
}

.footnotes {
  border-top: var(--rule-thin);
  padding-top: calc(var(--unit) * 4);
  margin-top: calc(var(--unit) * 8);
  font-size: 13px;
  color: var(--ink-secondary);
}
.footnotes ol { padding-left: 24px; }
.citations-link {
  margin-top: calc(var(--unit) * 3);
  font-size: 12px;
}
.citations-link a {
  color: var(--gold);
  text-decoration: underline;
}

.real-disclosure {
  margin-top: calc(var(--unit) * 6);
  padding-top: calc(var(--unit) * 3);
  border-top: var(--rule-thin);
  font-size: 11px;
  color: var(--ink-muted);
  line-height: 1.5;
}
```

- [ ] **Step 2:** Open the deployed URL or `index.html` locally. Confirm the page now looks like a draft of the Howard Marks treatment (ivory paper, gold rules, serif body). It'll still have placeholder text — fine.

- [ ] **Step 3:** Commit:

```bash
git add styles.css
git commit -m "feat(css): howard-marks design tokens + base layout"
git push
```

**Acceptance:** Page renders with the Howard Marks visual treatment. Type hierarchy and layout match the Figma design system tokens.

### Task 2.5 — Calculator UI (sliders + bindings)

**Owner:** Developer
**Files:** `site/app.js`, `site/styles.css`, `site/index.html`

- [ ] **Step 1:** Add the calculator-specific CSS to `site/styles.css`:

```css
.calc {
  display: flex;
  flex-direction: column;
  gap: calc(var(--unit) * 3);
}
.calc-year {
  font-size: 64px;
  font-weight: 300;
  text-align: center;
  letter-spacing: -2px;
  line-height: 1;
  color: var(--ink);
  font-feature-settings: "lnum";
}
.calc-year-label {
  font-size: 10px;
  letter-spacing: 3px;
  color: var(--ink-muted);
  text-align: center;
  text-transform: uppercase;
}
.calc-controls {
  display: flex;
  flex-direction: column;
  gap: calc(var(--unit) * 2);
  padding-top: calc(var(--unit) * 2);
  border-top: var(--rule-thin);
}
.calc-row {
  display: grid;
  grid-template-columns: 1fr 2fr auto;
  align-items: center;
  gap: calc(var(--unit) * 2);
  font-size: 12px;
}
.calc-row label {
  color: var(--ink-secondary);
  font-weight: 600;
}
.calc-row input[type="range"] {
  accent-color: var(--gold);
  width: 100%;
}
.calc-row select {
  font-family: var(--serif);
  font-size: 12px;
  border: var(--rule-thin);
  background: var(--bg);
  padding: 4px 8px;
  color: var(--ink);
}
.calc-row .value {
  font-weight: 600;
  color: var(--gold);
  font-variant-numeric: tabular-nums;
  text-align: right;
  min-width: 6ch;
}

.calc-compare {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: calc(var(--unit) * 2);
  padding-top: calc(var(--unit) * 2);
  border-top: var(--rule-strong);
  margin-top: calc(var(--unit) * 2);
}
.calc-compare > div { text-align: center; }
.calc-compare .compare-label {
  font-size: 9px;
  letter-spacing: 2px;
  color: var(--ink-muted);
  text-transform: uppercase;
}
.calc-compare .compare-year {
  font-size: 24px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.calc-compare .compare-year.yours { color: var(--gold); }
.calc-compare .vs {
  color: var(--ink-muted);
  font-size: 14px;
}

@media (max-width: 640px) {
  .calc-row { grid-template-columns: 1fr; gap: 4px; }
  .calc-row .value { text-align: left; }
  .calc-compare { grid-template-columns: 1fr; }
  .calc-compare .vs { display: none; }
}
```

- [ ] **Step 2:** Extend `site/app.js`. Add the UI binding below the existing `ApertureCalc` block:

```javascript
/* Calculator UI binding
 * ----------------------
 * Renders the calculator into #calc-root and wires the sliders so the
 * "your year" output updates live as the reader drags.
 */
(function initCalcUI() {
  const root = document.getElementById('calc-root');
  if (!root) return;

  // Render the markup
  root.innerHTML = `
    <div class="calc-year-label">YOUR QUANTUM-ADVANTAGE YEAR</div>
    <div class="calc-year" id="calc-year-out">2030</div>

    <div class="calc-controls">
      <div class="calc-row">
        <label for="calc-usecase">Use case</label>
        <select id="calc-usecase">
          <option value="chemistry">Chemistry advantage (150 logical)</option>
          <option value="optimization">Optimization advantage (1,000 logical)</option>
          <option value="rsa" selected>RSA-2048 crypto break (4,000 logical)</option>
        </select>
        <span></span>
      </div>
      <div class="calc-row">
        <label for="calc-overhead">Overhead (physical : logical)</label>
        <input id="calc-overhead" type="range" min="100" max="1000" step="50" value="100" />
        <span class="value" id="calc-overhead-value">100 : 1</span>
      </div>
      <div class="calc-row">
        <label for="calc-doubling">Doubling cadence (years)</label>
        <input id="calc-doubling" type="range" min="1" max="3" step="0.25" value="1" />
        <span class="value" id="calc-doubling-value">1.00 yr</span>
      </div>
    </div>

    <div class="calc-compare">
      <div>
        <div class="compare-label">Industry claims</div>
        <div class="compare-year" id="calc-industry-year">2030</div>
      </div>
      <div class="vs">vs.</div>
      <div>
        <div class="compare-label">Your assumptions</div>
        <div class="compare-year yours" id="calc-your-year">2030</div>
      </div>
    </div>
  `;

  const useCaseEl = document.getElementById('calc-usecase');
  const overheadEl = document.getElementById('calc-overhead');
  const overheadValEl = document.getElementById('calc-overhead-value');
  const doublingEl = document.getElementById('calc-doubling');
  const doublingValEl = document.getElementById('calc-doubling-value');
  const industryYearEl = document.getElementById('calc-industry-year');
  const yourYearEl = document.getElementById('calc-your-year');
  const mainYearEl = document.getElementById('calc-year-out');

  function update() {
    const uc = useCaseEl.value;
    const overhead = Number(overheadEl.value);
    const doubling = Number(doublingEl.value);

    overheadValEl.textContent = `${overhead} : 1`;
    doublingValEl.textContent = `${doubling.toFixed(2)} yr`;
    industryYearEl.textContent = ApertureCalc.industryYear(uc);

    const yourYear = ApertureCalc.compute(uc, overhead, doubling);
    yourYearEl.textContent = yourYear;
    mainYearEl.textContent = yourYear;
  }

  useCaseEl.addEventListener('change', update);
  overheadEl.addEventListener('input', update);
  doublingEl.addEventListener('input', update);

  update();
})();
```

- [ ] **Step 3:** Refresh the page. Confirm:
  - The big year output is visible
  - All three controls (dropdown + 2 sliders) render
  - Dragging the sliders updates the year live with no flicker
  - The "industry vs. yours" strip updates correctly

- [ ] **Step 4:** Commit:

```bash
git add app.js styles.css
git commit -m "feat(calc): interactive UI with 3 inputs and live year output"
git push
```

**Acceptance:** Calculator works end-to-end on the deployed URL. Default state shows RSA / 100:1 / 1yr → ~2030 in both panels. Dragging the overhead slider to 1000 jumps the "yours" year to the 2060s. Dragging the cadence slider to 3 years also pushes the year out.

### Task 2.6 — Hover annotation prototype

**Owner:** Developer
**Files:** `site/app.js`, `site/styles.css`

- [ ] **Step 1:** Add the annotation CSS to `site/styles.css`:

```css
.annotated-quote {
  position: relative;
  cursor: help;
  margin: 0;
  padding-left: calc(var(--unit) * 2);
  border-left: 3px solid var(--gold);
  font-style: italic;
  font-size: 17px;
  line-height: 1.5;
  color: var(--ink-secondary);
  transition: background 0.2s ease;
}
.annotated-quote cite {
  display: block;
  font-style: normal;
  font-size: 11px;
  letter-spacing: 1px;
  color: var(--ink-muted);
  margin-top: calc(var(--unit) * 1);
  text-transform: uppercase;
}
.annotated-quote:hover {
  background: rgba(184, 160, 80, 0.06);
}

.annotation-popover {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--bg);
  border: 1px solid var(--gold);
  padding: calc(var(--unit) * 2);
  margin-top: calc(var(--unit) * 1);
  z-index: 10;
  font-style: normal;
  font-size: 14px;
  color: var(--ink);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  display: none;
}
.annotation-popover.is-open { display: block; }
.annotation-popover .annotator {
  font-size: 10px;
  letter-spacing: 2px;
  color: var(--gold);
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: calc(var(--unit) * 1);
}
.annotation-popover cite {
  display: block;
  font-size: 11px;
  color: var(--ink-muted);
  margin-top: calc(var(--unit) * 1);
  font-style: italic;
}

@media (hover: none) {
  .annotated-quote::after {
    content: 'tap to reveal annotation';
    display: block;
    font-style: normal;
    font-size: 10px;
    color: var(--gold);
    letter-spacing: 1px;
    margin-top: calc(var(--unit) * 1);
    text-transform: uppercase;
  }
}
```

- [ ] **Step 2:** Add the annotation JS to `site/app.js`. The annotations are stored in a data object that the writer fills in on Day 3:

```javascript
/* Hover annotations
 * Each annotated quote is matched by data-annotation key.
 * Annotation content can be plain text or HTML for the source citation.
 */
const ANNOTATIONS = {
  ibm: {
    body: '[FILLED DAY 3: Maya\'s rebuttal — IBM annotation]',
    citation: '[FILLED DAY 3: e.g. Logical-qubit demonstration, Nature, 2024]',
  },
  ionq: {
    body: '[FILLED DAY 3: Maya\'s rebuttal — IonQ annotation]',
    citation: '[FILLED DAY 3: IonQ 10-K, FY2025, item X]',
  },
};

(function initAnnotations() {
  const quotes = document.querySelectorAll('.annotated-quote');
  quotes.forEach((quote) => {
    const key = quote.getAttribute('data-annotation');
    const annotation = ANNOTATIONS[key];
    if (!annotation) return;

    const popover = document.createElement('div');
    popover.className = 'annotation-popover';
    popover.innerHTML = `
      <div class="annotator">Maya's note</div>
      <div>${annotation.body}</div>
      <cite>${annotation.citation}</cite>
    `;
    quote.appendChild(popover);

    // Desktop: hover
    quote.addEventListener('mouseenter', () => popover.classList.add('is-open'));
    quote.addEventListener('mouseleave', () => popover.classList.remove('is-open'));
    // Touch / keyboard: click toggle
    quote.addEventListener('click', () => popover.classList.toggle('is-open'));
  });
})();
```

- [ ] **Step 3:** Refresh and confirm the IBM and IonQ exhibits show the placeholder quote, and that hovering reveals a "Maya's note" popover with the placeholder.

- [ ] **Step 4:** Commit:

```bash
git add app.js styles.css
git commit -m "feat(annotations): hover/tap reveal for inline quote exhibits"
git push
```

**Acceptance:** Hovering the IBM/IonQ blockquotes shows a margin-style popover with Maya's annotation. Touch devices reveal on tap.

### Task 2.7 — Critique gate #1

**When:** End of Wednesday. ~45 minutes, all three teammates together (in person or call).

- [ ] **Step 1:** Each person opens the deployed URL on their own device + the Figma + the Google Doc.

- [ ] **Step 2:** Read the letter out loud, top to bottom, slowly. One person reads, the others follow on screen.

- [ ] **Step 3:** Click every interactive element on the page. Drag every slider.

- [ ] **Step 4:** Run the **wow vote** — each person says one of:
  - "It's there. Polish from here."
  - "It's close — but [specific gap]."
  - "It's not there. Here's what's missing: [specific gap]."

- [ ] **Step 5:** If anyone votes "not there," scope-adjust Days 3–4 to close the gap. Update this plan's tasks in writing.

- [ ] **Step 6:** Decision log: write the gate result + any scope changes in the team chat with the timestamp.

**Acceptance:** Decision logged. Any scope adjustments propagated to Day 3 / Day 4 tasks below.

---

## Phase 3 — Integration + first critique

**When:** Thursday 11 June. ~6–8 hours per role.
**Goal:** Letter draft v2 (incorporates Wed critique), design freeze, page integrated with real prose, annotations carrying real quotes + sources.

### Task 3.1 — Letter draft v2

**Owner:** Writer

- [ ] **Step 1:** In the Google Doc, accept/reject teammates' Day-2 comments. Resolve each one.

- [ ] **Step 2:** Sharpen pillar transitions. Each pillar's last sentence should set up the next pillar so the LP can't skim past the connection.

- [ ] **Step 3:** Verify every citation in the prose has a matching row in `citations-source.md` with a verbatim quote and source. If a claim doesn't have one, delete the claim.

- [ ] **Step 4:** Send the Doc to a fourth person outside the team (a flatmate, classmate, anyone) and ask them to read it cold. Note where they had to re-read a sentence.

- [ ] **Step 5:** Post draft v2 in team chat.

**Acceptance:** Doc has draft v2 with no `TBD`/`[citation needed]` placeholders. External reader confirmed there are no major confusions.

### Task 3.2 — Annotated-quote content for IBM and IonQ

**Owner:** Writer (working with Developer to paste)

- [ ] **Step 1:** From the Pillar 2 citation table, pick the strongest verbatim IBM quote and the strongest IonQ quote. Each should be the kind of quote that *sounds* benign until you see the annotation.

- [ ] **Step 2:** Write the counter-annotation for each. Constraints:
  - 1–3 sentences
  - Cites a verifiable counter-source (peer-reviewed paper, SEC filing, or a public physicist statement)
  - Reads as a margin note from Maya, not an editorial

- [ ] **Step 3:** Hand the four strings to Developer (IBM quote + cite, IBM annotation + cite, IonQ quote + cite, IonQ annotation + cite).

**Acceptance:** Four annotated content strings handed off, all with sourced citations.

### Task 3.3 — Design freeze + handoff document

**Owner:** Designer

- [ ] **Step 1:** Final pass on the Figma mockup. Lock all type, color, spacing.

- [ ] **Step 2:** Export a one-page "handoff" document (PDF or Figma frame) listing:
  - Any color token diffs vs. the Day 1 design system
  - Any spacing values the developer should add to CSS
  - The annotation popover's positioning rule (above the quote on desktop, below the quote on mobile)
  - The audio player's exact placement

- [ ] **Step 3:** Mark the Figma `Letter Mockup` page as **FROZEN**. Any change after Thursday requires a team vote.

**Acceptance:** Handoff doc shared in team chat. Figma marked FROZEN.

### Task 3.4 — Page integration with real prose

**Owner:** Developer
**Files:** `site/index.html`

- [ ] **Step 1:** Replace the four `[lorem]` placeholders in `index.html` with the actual draft v2 prose from the Google Doc. The Why section becomes the body inside `<section id="why">`, and so on.

- [ ] **Step 2:** Replace the IBM and IonQ exhibit placeholders with the real quote + citation strings from Task 3.2.

- [ ] **Step 3:** Update the `ANNOTATIONS` object in `app.js` with the real annotation body + citation strings.

- [ ] **Step 4:** Wire `<sup class="fn-ref" data-fn="N">` markers into the prose wherever the writer has a footnote. Render them as superscript gold numbers via CSS:

```css
.fn-ref {
  color: var(--gold);
  font-size: 0.7em;
  vertical-align: super;
  cursor: pointer;
  text-decoration: none;
  font-feature-settings: "lnum";
  padding: 0 2px;
}
.fn-ref:hover { text-decoration: underline; }
```

- [ ] **Step 5:** Deploy and visually confirm: the page now reads end-to-end with real prose, real quotes, real annotations, real footnote markers (footnote panel itself is empty for now — Day 4).

- [ ] **Step 6:** Commit:

```bash
git add index.html app.js styles.css
git commit -m "feat: integrate draft v2 prose, real annotations, footnote markers"
git push
```

**Acceptance:** Live URL renders the full letter with real content. Annotations on IBM/IonQ show the real quote+counter on hover. Footnote numbers visible as gold superscripts.

### Task 3.5 — Footnote system

**Owner:** Developer
**Files:** `site/app.js`, `site/styles.css`

- [ ] **Step 1:** Add footnote popover CSS:

```css
.fn-popover {
  position: fixed;
  bottom: 16px;
  right: 16px;
  max-width: 380px;
  background: var(--bg);
  border: 1px solid var(--gold);
  padding: calc(var(--unit) * 2);
  font-size: 13px;
  line-height: 1.5;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  display: none;
  z-index: 100;
}
.fn-popover.is-open { display: block; }
.fn-popover .fn-num {
  color: var(--gold);
  font-weight: 600;
  margin-right: 8px;
}
.fn-popover .fn-close {
  position: absolute;
  top: 8px; right: 8px;
  background: transparent;
  border: 0;
  font-size: 16px;
  cursor: pointer;
  color: var(--ink-muted);
}

@media (max-width: 640px) {
  .fn-popover {
    left: 16px;
    max-width: none;
  }
}
```

- [ ] **Step 2:** Add the footnote logic to `app.js`. The footnotes themselves live in a data object — the writer fills it in Task 3.6:

```javascript
const FOOTNOTES = {
  '1': 'PLACEHOLDER — filled Day 4',
  // '2': '...', '3': '...', etc.
};

(function initFootnotes() {
  // Create a single reusable popover
  let popover = document.createElement('div');
  popover.className = 'fn-popover';
  popover.innerHTML = `
    <button class="fn-close" aria-label="Close">×</button>
    <div class="fn-content"></div>
  `;
  document.body.appendChild(popover);
  const content = popover.querySelector('.fn-content');
  popover.querySelector('.fn-close').addEventListener('click', () => {
    popover.classList.remove('is-open');
  });

  // Hook up all footnote refs
  document.querySelectorAll('.fn-ref').forEach((ref) => {
    const num = ref.getAttribute('data-fn');
    ref.setAttribute('role', 'button');
    ref.setAttribute('tabindex', '0');
    ref.textContent = num;
    function open() {
      content.innerHTML = `<span class="fn-num">${num}.</span>${FOOTNOTES[num] || '[footnote missing]'}`;
      popover.classList.add('is-open');
    }
    ref.addEventListener('click', open);
    ref.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });
})();
```

- [ ] **Step 3:** Test by clicking a footnote marker — popover appears with the placeholder. The × closes it.

- [ ] **Step 4:** Commit:

```bash
git add app.js styles.css
git commit -m "feat(footnotes): click-to-reveal footnote popover"
git push
```

**Acceptance:** Clicking any `.fn-ref` superscript opens the popover with the right footnote number. Close button works.

### Task 3.6 — Footnote content draft

**Owner:** Writer

- [ ] **Step 1:** Walk the draft v2 prose. For every numeric claim, every quote, and every physics statement, the writer needs to ensure there's a `<sup class="fn-ref" data-fn="N">` marker in the HTML at that point.

- [ ] **Step 2:** In the Google Doc, create a new page `Footnotes (final)`. For each numbered footnote, write the entry in the format:
  - "[Source author, year]. [Quoted snippet or short attribution]. [URL]."

- [ ] **Step 3:** Hand the footnote list to the Developer to paste into `FOOTNOTES` on Day 4.

**Acceptance:** Footnotes list complete. Every prose claim numbered. Every number has a sourced entry.

---

## Phase 4 — Content lock + polish

**When:** Friday 12 June. ~6–8 hours per role.
**Goal:** Letter v3 = FINAL. Audio recorded. Mobile responsive. Footnotes wired. Prof read-through done.

### Task 4.1 — Letter draft v3 (FINAL)

**Owner:** Writer

- [ ] **Step 1:** Final copy-edit pass on the Google Doc. Read aloud. Fix anything that trips the tongue.

- [ ] **Step 2:** Word-count check. If over 1,050, cut. If under 950, expand the WHY's stakes.

- [ ] **Step 3:** Final fiction disclosure sentence — confirm exact wording matches the spec (Section 7 of `2026-06-09-quantum-article-design.md`).

- [ ] **Step 4:** Strategic Ask sharpened. The vote terms + Maya's personal carry concession should be specific and time-boxed.

- [ ] **Step 5:** Mark the Doc title with `(FINAL — DO NOT EDIT)`. Any further change requires the team's chat agreement.

- [ ] **Step 6:** Send to Developer to paste.

**Acceptance:** Google Doc marked FINAL. Word count 1,000 ± 50. Strategic Ask is specific.

### Task 4.2 — Replace prose in index.html with v3 FINAL

**Owner:** Developer
**Files:** `site/index.html`

- [ ] **Step 1:** Paste the final v3 prose into the four `<section>` blocks.

- [ ] **Step 2:** Add the final footnote entries to the `FOOTNOTES` object in `app.js`:

```javascript
const FOOTNOTES = {
  '1': '[final footnote 1]',
  '2': '[final footnote 2]',
  // ...etc until N
};
```

- [ ] **Step 3:** Visually check: every `.fn-ref` marker on the page resolves to a real footnote when clicked.

- [ ] **Step 4:** Commit:

```bash
git add index.html app.js
git commit -m "feat: lock v3 prose and final footnotes"
git push
```

**Acceptance:** Live URL renders v3 prose with all footnote markers resolving.

### Task 4.3 — Mobile responsive pass

**Owner:** Designer + Developer
**Files:** `site/styles.css`

- [ ] **Step 1:** Open the live URL on a real phone (or DevTools mobile emulator at 375px).

- [ ] **Step 2:** Check each section for issues:
  - Title doesn't overflow
  - Audio player fits on one line
  - Calculator UI stacks correctly (the responsive rules added in Task 2.5)
  - Annotated quotes are tap-friendly (44px tap target)
  - Footnote popover sits within viewport
  - Read on a phone for 30 seconds without zooming

- [ ] **Step 3:** Fix any issues by adding media queries to `styles.css`. Add this block if not yet present:

```css
@media (max-width: 640px) {
  body { font-size: 15px; }
  .letter { padding: calc(var(--unit) * 4) calc(var(--unit) * 2); }
  .title { font-size: 26px; }
  .calc-year { font-size: 48px; }
  .audio-player { width: 100%; justify-content: center; }
}
```

- [ ] **Step 4:** Commit:

```bash
git add styles.css
git commit -m "fix(responsive): mobile polish at 640px breakpoint"
git push
```

**Acceptance:** Live URL passes a phone read-through with no horizontal scroll, no overflow, no missed tap targets.

### Task 4.4 — Typography micro-polish

**Owner:** Designer

- [ ] **Step 1:** Open the live URL on a high-DPI desktop. Check letterspacing, leading, optical sizes.

- [ ] **Step 2:** If anything reads off, write specific CSS suggestions and pass to Developer (don't push CSS directly unless agreed — the Designer/Developer split keeps regressions out).

- [ ] **Step 3:** Developer applies any agreed type fixes and commits with `style: typography polish`.

**Acceptance:** Designer signs off on the typography.

### Task 4.5 — ElevenLabs audio recording

**Owner:** Whole team, ~1 hour together
**Files:** `content/voice-script.txt`, `site/assets/audio.mp3`

- [ ] **Step 1:** Export the v3 letter prose as plain text into `content/voice-script.txt`. Strip footnote markers. Add light punctuation that helps the TTS pace (periods at natural breath points).

- [ ] **Step 2:** Open https://elevenlabs.io. Sign in. Pick a voice — recommended: a measured female voice in the "professional / narration" category. Test 100 words first to confirm pacing.

- [ ] **Step 3:** Generate the full letter audio. Listen to the result top to bottom.

- [ ] **Step 4:** If the audio sounds robotic in places, regenerate just those paragraphs and stitch. Or accept the regen if it's close. If overall the result is unusable: drop audio for submission, replace the audio player on the page with a small text caption saying "Audio version omitted — see PDF citation download for full sourcing."

- [ ] **Step 5:** Save as `site/assets/audio.mp3`. Commit:

```bash
git add assets/audio.mp3
git commit -m "feat: elevenlabs machine-read audio"
git push
```

- [ ] **Step 6:** On the live URL, click the audio player ▶ button. Confirm it plays. Verify the player toggles to ⏸ during playback and back to ▶ on pause/end.

- [ ] **Step 7:** Add the play/pause toggle JS to `app.js` if not already there:

```javascript
(function initAudio() {
  const btn = document.getElementById('audio-toggle');
  const el = document.getElementById('audio-el');
  if (!btn || !el) return;
  btn.addEventListener('click', () => {
    if (el.paused) {
      el.play();
      btn.textContent = '⏸ Pause';
      btn.setAttribute('aria-pressed', 'true');
    } else {
      el.pause();
      btn.textContent = '▶ Listen';
      btn.setAttribute('aria-pressed', 'false');
    }
  });
  el.addEventListener('ended', () => {
    btn.textContent = '▶ Listen';
    btn.setAttribute('aria-pressed', 'false');
  });
})();
```

- [ ] **Step 8:** Commit:

```bash
git add app.js
git commit -m "feat(audio): play/pause toggle"
git push
```

**Acceptance:** Audio plays on the live URL with a working play/pause button. Or the fallback caption is in place if audio was rejected.

### Task 4.6 — Citation list PDF

**Owner:** Writer
**Files:** `content/citations-source.md` → `site/citations/citations.md` + `site/citations/citations.pdf`

- [ ] **Step 1:** Copy the finalized `content/citations-source.md` into `site/citations/citations.md`.

- [ ] **Step 2:** Export to PDF. Easiest path: open the .md in a markdown previewer (e.g., VS Code, Typora, Obsidian), print to PDF, save as `site/citations/citations.pdf`. Or use `pandoc`:

```bash
pandoc site/citations/citations.md -o site/citations/citations.pdf
```

- [ ] **Step 3:** Visit the live URL. Click the "Download full citation list (PDF)" link in the footnotes section. Confirm it downloads the PDF cleanly.

- [ ] **Step 4:** Commit:

```bash
git add citations/
git commit -m "feat: downloadable citation list pdf"
git push
```

**Acceptance:** PDF downloads from the live URL.

### Task 4.7 — Critique gate #2 ("prof read-through")

**When:** Friday evening, ~45 minutes, full team.

- [ ] **Step 1:** Designate one teammate as "Prof David." That person opens the URL cold, narrates their reactions out loud as they go: "OK, fiction disclosure, fine. Title. Hmm, audio. Let me click the player… OK. First paragraph. Hook. The number is real? OK, footnote one — checks. Continues…"

- [ ] **Step 2:** The other two write down every reaction. Especially every place "Prof David" hesitated, re-read, or said "wait what."

- [ ] **Step 3:** After the read-through, rank the gaps by priority:
  - **Must-fix tonight or Saturday morning** (anything that broke the read)
  - **Nice-to-fix Saturday** (polish)
  - **Won't fix** (out of scope)

- [ ] **Step 4:** Write the must-fix items into the chat as Day 5 tasks. Distribute owners.

**Acceptance:** Gate result + ranked gap list logged in team chat.

---

## Phase 5 — QA + ship

**When:** Saturday 13 June. ~6 hours full team + buffer.
**Goal:** Submit by 21:00 CET.

### Task 5.1 — Resolve Friday's must-fix list

**Owner:** Distributed per Task 4.7

- [ ] **Step 1:** Work the must-fix list before any other QA. Each fix is its own commit:

```bash
git commit -m "fix: <one-line description>"
```

- [ ] **Step 2:** After each fix, re-run the read aloud on the affected section.

**Acceptance:** All must-fix items resolved. Chat updated.

### Task 5.2 — Three independent read-throughs

**Owner:** All three, sequentially

- [ ] **Step 1:** Teammate A reads the entire letter aloud at normal pace, top to bottom. Times it.

- [ ] **Step 2:** Teammate B reads silently on their own device, clicks every interactive, drags every slider, plays the audio.

- [ ] **Step 3:** Teammate C reads silently on a phone, clicks every interactive.

- [ ] **Step 4:** Each writes one paragraph: "what worked, what almost broke, what I'd ship anyway."

**Acceptance:** Three sign-offs logged.

### Task 5.3 — Cross-browser + accessibility audit

**Owner:** Developer

- [ ] **Step 1:** Test the live URL in: Safari, Chrome, Firefox, Edge. Mobile Safari and Chrome Mobile.

- [ ] **Step 2:** Run Lighthouse (Chrome DevTools → Lighthouse → Mobile). Target ≥90 on Performance, Accessibility, Best Practices, SEO.

- [ ] **Step 3:** Common Lighthouse fixes likely needed:
  - Missing `lang` on `<html>` — already set in scaffold
  - Color contrast on gold text — confirm `#b8a050` on `#faf7f0` meets WCAG AA (it's borderline; if it fails, darken to `#9a8540`)
  - Missing alt on images — confirm none used or all have alt
  - Image sizes — only audio.mp3 and favicon; confirm small

- [ ] **Step 4:** Fix any failures, commit individually.

- [ ] **Step 5:** Re-run Lighthouse and screenshot the final score. Save the screenshot to `site/assets/lighthouse-score.png` (for the team's records, not deployed).

**Acceptance:** Lighthouse mobile scores ≥90 across all four categories. Site renders correctly in all four desktop and both mobile browsers.

### Task 5.4 — Final fiction-disclosure sanity check

**Owner:** Writer + Developer together

- [ ] **Step 1:** Open the live URL fresh in an incognito window. The italic editor's note must be the **very first thing** above the letterhead. Not below. Not collapsed. Not hidden.

- [ ] **Step 2:** Read it. Confirm it says exactly:
  > A constructed scenario for the IE Business School Deep Tech Venturing & Investment course. Aperture Quantum Partners and Maya Chen are fictional. All cited claims, data, physics, and corporate quotes are real, sourced, and accurate as of June 2026.

- [ ] **Step 3:** Confirm the real-disclosure footer at the bottom names all three team members + the course + the professor + the date.

**Acceptance:** Both disclosures verified in place, with correct wording, on the production URL.

### Task 5.5 — Definition-of-done checklist

**Owner:** All three

Tick each box on the production URL. If any one fails, fix before submit.

- [ ] 1,000-word letter, ±5%, reads aloud cleanly
- [ ] Fiction disclosure is the first element above the letterhead, unambiguous
- [ ] Why / What / How / Ask all clearly present
- [ ] Calculator works: default reproduces industry's ~2030; realistic inputs land 2040+; math published in footnotes
- [ ] 3 annotated public-company exhibits with verbatim quotes and sourced annotations
- [ ] All footnotes have real sources; PDF downloadable
- [ ] Audio plays cleanly with disclosure (or fallback caption in place)
- [ ] Mobile-responsive, Lighthouse ≥90 on performance and accessibility
- [ ] Loads in < 2 seconds on cold cache
- [ ] Real disclosure footer with team names, course, professor, date
- [ ] URL is shareable, stable, no login required
- [ ] Three teammates have read the final version aloud and approved

**Acceptance:** All 12 ticked.

### Task 5.6 — Deploy to production and submit

**Owner:** Developer + whoever submits to the course portal

- [ ] **Step 1:** Confirm the URL points to the latest commit:

```bash
git log -1 --oneline
npx vercel --prod
```

- [ ] **Step 2:** Open the production URL on at least two devices (desktop + phone). Final smoke test: read the WHY, click one footnote, drag a slider, hover an annotation.

- [ ] **Step 3:** Compose the submission email / portal entry. Format:

  > **Title:** Quantum Computing — A Letter to Our Limited Partners
  > **Authors:** [team]
  > **Course:** Deep Tech Venturing & Investment, IE Business School, June 2026
  > **URL:** https://[the production URL]
  > **Note:** This piece is a constructed scenario — Aperture Quantum Partners and Maya Chen are fictional. Every cited claim, quote, and physics statement is real and sourced (see the footnotes panel and the downloadable citation list).

- [ ] **Step 4:** Submit. Target time **21:00 CET Saturday**. Screenshot the submission confirmation.

- [ ] **Step 5:** Post in team chat: "SUBMITTED ✓ at [time]. Production URL: [URL]. Confirmation screenshot: [link]."

**Acceptance:** Submission confirmation screenshot exists in team chat. Production URL is reachable from a phone with no login.

---

## Phase 6 — Sunday buffer

**When:** Sunday 14 June, until 17:00 CET (1 hour before the 17:59 hard deadline).
**Goal:** Do nothing unless something broke.

### Task 6.1 — Daily smoke test

- [ ] Each teammate opens the production URL at noon Sunday. Reports "still good" in chat. If anyone reports broken, the developer-lead picks it up.

### Task 6.2 — Emergency resubmit window

- [ ] If a regression was found and fixed, resubmit by 17:00 CET with a brief note in the portal: "Updated submission — the original is at the same URL; this is a small correction."

---

## Risk register (recap from spec, with mitigations now linked to tasks)

| Risk | Mitigation task |
|---|---|
| Voice doesn't feel like Maya | Task 2.7 (critique gate #1) and Task 3.1 (draft v2 absorbs critique) |
| Calculator math is gameable | Task 1.7 (TDD on the math) + footnoted formula in `app.js` comment |
| Annotations read as gimmicky | Task 3.2 (verbatim quotes only) |
| Audio sounds robotic | Task 4.5 step 4 (fallback caption if rejected) |
| Submission link breaks | Task 5.6 + Task 6.2 (Sunday buffer) |
| Professor reads it as fraud | Task 5.4 (final disclosure sanity check) |

---

## Self-review notes (from the writing-plans skill)

**Spec coverage:** Every section of `2026-06-09-quantum-article-design.md` maps to at least one task:
- §1 Artifact → Phase 0 + Phase 1
- §2 Thesis → embedded in §1.1 (writer's outline)
- §3 Narrative architecture → §2.1 (draft v1 follows the outline)
- §4 Page architecture → §1.6 (HTML scaffold), §2.4 (CSS)
- §5 Calculator → §1.4 (anchors), §1.7 (math), §2.5 (UI)
- §6 Annotated decks → §2.6 (interaction), §3.2 (content), §3.4 (integration)
- §7 Supporting layers → §4.5 (audio), §3.5–3.6 (footnotes), §5.4 (disclosure)
- §8 Visual design language → §1.5 (Figma), §2.4 (CSS)
- §9 Phase plan → this entire plan
- §10 Definition of done → §5.5
- §11 Out of scope → respected (no landing site, no CMS, no DB)
- §12 Open decisions → flagged in tasks (Maya bio §2.2, Strategic Ask §4.1, footnote UX §3.5, voice §4.5, 4th exhibit §3.2 implicitly)

**Placeholder scan:** Every `[FILLED DAY X]` in the code is intentional and tied to a later task that fills it. No `TBD` or `TODO` outside the citation source table (which is itself a "fill this in" template by design).

**Type consistency:** `ApertureCalc` exported names are consistent (`compute`, `industryYear`, `useCase`, `USE_CASES`, `PHYSICAL_QUBITS_NOW`, `YEAR_NOW`) across the tests (§1.7), the UI binding (§2.5), and the comments. Footnote data key type (`string`, e.g. `'1'`, `'2'`) is consistent between the `FOOTNOTES` object and the `data-fn` HTML attribute.
