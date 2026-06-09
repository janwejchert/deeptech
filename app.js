/* Aperture LP Letter — application script.
 * Five concerns, each in its own IIFE for legibility:
 *   1. ApertureCalc — timing math module (exposed on window for tests)
 *   2. initCalcUI    — renders the calculator into #calc-root
 *   3. initAnnotations — hover/tap reveal for annotated quote exhibits
 *   4. initFootnotes — click-to-reveal footnote popover
 *   5. initAudio    — play/pause toggle for the machine-read audio
 */

/* ---------------------------------------------------------------------------
 * 1. ApertureCalc — timing math
 *
 * Model:
 *   physical_required = q_logical * overhead
 *   years_needed      = log2(physical_required / PHYSICAL_QUBITS_NOW)
 *                       * doubling_years
 *   year_advantage    = ceil(YEAR_NOW + years_needed)
 *
 * Anchors (verified Day 1 against published roadmaps and SOTA results):
 *   PHYSICAL_QUBITS_NOW  — current SOTA single-processor physical qubit count
 *   YEAR_NOW             — calendar year of the letter
 *   Industry years       — cited from public roadmaps per use case
 * ---------------------------------------------------------------------------
 */
const ApertureCalc = (function () {
  const PHYSICAL_QUBITS_NOW = 1121;  // IBM Condor (2023). Update if writer finds a more recent SOTA.
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

if (typeof window !== 'undefined') {
  window.ApertureCalc = ApertureCalc;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ApertureCalc;
}

/* ---------------------------------------------------------------------------
 * 2. initCalcUI — render the calculator into #calc-root and wire the sliders
 * ---------------------------------------------------------------------------
 */
(function initCalcUI() {
  if (typeof document === 'undefined') return;
  const root = document.getElementById('calc-root');
  if (!root) return;

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
        <input id="calc-overhead" type="range" min="100" max="1500" step="50" value="100" />
        <span class="value" id="calc-overhead-value">100 : 1</span>
        <div class="calc-hint"><span>100 — best demonstrated</span><span>1,500 — projected need</span></div>
      </div>
      <div class="calc-row">
        <label for="calc-doubling">Doubling cadence (years)</label>
        <input id="calc-doubling" type="range" min="1" max="3" step="0.25" value="1" />
        <span class="value" id="calc-doubling-value">1.00 yr</span>
        <div class="calc-hint"><span>1 yr — roadmap pace</span><span>3 yr — observed</span></div>
      </div>
    </div>

    <div class="calc-compare">
      <div>
        <div class="compare-label">Industry claims</div>
        <div class="compare-year" id="calc-industry-year">2030</div>
        <div class="compare-source">per public roadmaps</div>
      </div>
      <div class="vs">vs.</div>
      <div>
        <div class="compare-label">Your assumptions</div>
        <div class="compare-year yours" id="calc-your-year">2030</div>
        <div class="compare-source">per the math above</div>
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

/* ---------------------------------------------------------------------------
 * 3. initAnnotations — hover/tap reveal for inline annotated quotes
 *
 * Content for each annotation is stored in ANNOTATIONS keyed by data-annotation.
 * Filled with real Maya counter-evidence on Day 3 (Stage 4 of this build).
 * ---------------------------------------------------------------------------
 */
const ANNOTATIONS = {
  ibm: {
    body: 'IBM\'s published hardware demonstrations of error-corrected logical qubits remain at the single-logical-qubit level. The November 2025 Loon chip validated <em>components</em> of the fault-tolerant architecture; the first logical-memory chip (Kookaburra, 12 logical qubits) is roadmapped for 2026. Starling\'s 200 logical qubits sit two orders of magnitude beyond anything IBM has operated — and the 2022 roadmap framed the practical era as beginning with 4,000 physical qubits in 2025.',
    citation: 'IBM Newsroom: 10 June 2025 (Starling); 12 November 2025 (Loon); 10 May 2022 (4,000-qubit goal).',
  },
  ionq: {
    body: 'IonQ has, in fact, delivered ahead of its own roadmap — #AQ 35 in January 2024, a year early; #AQ 64 in September 2025, three months early — and its revenue is ramping. But "algorithmic qubits" is a benchmark IonQ defined for itself, and the sentence on the left has survived every annual filing since the 2021 listing. The metric moves. The admission stays.',
    citation: 'IonQ investor releases, 25 January 2024 and 25 September 2025; IonQ Forms 10-K, FY2022–FY2025, Risk Factors.',
  },
};

(function initAnnotations() {
  if (typeof document === 'undefined') return;
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

    quote.addEventListener('mouseenter', () => popover.classList.add('is-open'));
    quote.addEventListener('mouseleave', () => popover.classList.remove('is-open'));
    quote.addEventListener('click', () => popover.classList.toggle('is-open'));
  });
})();

/* ---------------------------------------------------------------------------
 * 4. initFootnotes — click-to-reveal footnote popover
 * Footnote content keyed by string number to match data-fn attribute.
 * ---------------------------------------------------------------------------
 */
const FOOTNOTES = {
  '1': '<strong>IBM Newsroom</strong>, "IBM Debuts Next-Generation Quantum Processor &amp; IBM Quantum System Two, Extends Roadmap to Advance Era of Quantum Utility," 4 December 2023: <em>"IBM Condor, a 1,121 superconducting qubit quantum processor based on cross-resonance gate technology."</em> Still the largest gate-based superconducting processor announced as of June 2026. <a href="https://newsroom.ibm.com/2023-12-04-IBM-Debuts-Next-Generation-Quantum-Processor-IBM-Quantum-System-Two,-Extends-Roadmap-to-Advance-Era-of-Quantum-Utility" target="_blank" rel="noopener">newsroom.ibm.com</a>.',
  '2': '<strong>PsiQuantum / BusinessWire</strong>, "PsiQuantum Raises $1 Billion to Build Million-Qubit Scale, Fault-Tolerant Quantum Computers," 10 September 2025: <em>"PsiQuantum was founded on the premise that commercially valuable quantum computing requires error correction—and therefore on the order of a million physical qubits."</em> <a href="https://www.businesswire.com/news/home/20250910135739/en/PsiQuantum-Raises-1-Billion-to-Build-Million-Qubit-Scale-Fault-Tolerant-Quantum-Computers" target="_blank" rel="noopener">businesswire.com</a>.',
  '3': '<strong>Google Quantum AI</strong>, "Quantum error correction below the surface code threshold," <em>Nature</em> 638, 920–926 (2025; published online 9 December 2024). Best demonstrated overhead: a 101-qubit distance-7 surface-code logical qubit. Projection: <em>"achieving a 10⁻⁶ error rate would require a distance-27 logical qubit using 1,457 physical qubits."</em> <a href="https://www.nature.com/articles/s41586-024-08449-y" target="_blank" rel="noopener">nature.com</a>.',
  '4': '<strong>Bravyi, Cross, Gambetta, Maslov, Rall, Yoder (IBM)</strong>, "High-threshold and low-overhead fault-tolerant quantum memory," <em>Nature</em> 627, 778–782 (27 March 2024). Shows, via circuit-level noise simulations, that bivariate-bicycle codes could preserve 12 logical qubits for nearly one million syndrome cycles using 288 physical qubits, assuming 0.1% physical error rates — a ~10× overhead improvement over surface codes, not yet demonstrated on hardware as of June 2026. <a href="https://www.nature.com/articles/s41586-024-07107-7" target="_blank" rel="noopener">nature.com</a>.',
  '5': '<strong>IBM Newsroom</strong>, "IBM Unveils New Roadmap to Practical Quantum Computing Era; Plans to Deliver 4,000+ Qubit System," 10 May 2022: <em>"All three of these scalability techniques will be leveraged toward IBM\'s 2025 goal: a 4,000+ qubit processor built with multiple clusters of modularly scaled processors."</em> <a href="https://newsroom.ibm.com/2022-05-10-IBM-Unveils-New-Roadmap-to-Practical-Quantum-Computing-Era-Plans-to-Deliver-4,000-Qubit-System" target="_blank" rel="noopener">newsroom.ibm.com</a>.',
  '6': '<strong>IBM Newsroom</strong>, "IBM Sets the Course to Build World\'s First Large-Scale, Fault-Tolerant Quantum Computer at New IBM Quantum Data Center," 10 June 2025. Starling: 100 million quantum operations on 200 logical qubits, delivered by 2029; Blue Jay: <em>"capable of executing 1 billion quantum operations over 2,000 logical qubits,"</em> roadmapped for 2033. <a href="https://newsroom.ibm.com/2025-06-10-IBM-Sets-the-Course-to-Build-Worlds-First-Large-Scale,-Fault-Tolerant-Quantum-Computer-at-New-IBM-Quantum-Data-Center" target="_blank" rel="noopener">newsroom.ibm.com</a>.',
  '7': '<strong>IonQ, Inc.</strong>, Annual Report on Form 10-K, FY ended 31 December 2024 (filed 26 February 2025): FY2024 revenue $43.1M (vs. $22.0M in 2023). Customer concentration per IonQ\'s 2024 Forms 10-Q: two customers accounted for 69% (Q1), 75% (H1), and 79% (nine months) of total revenue. The $54.5M Air Force Research Lab award (25 September 2024) was the largest U.S. quantum contract of 2024. IonQ\'s FY2025 revenue surpassed $100M — the mix remains hardware, networking, and government R&amp;D-led. <a href="https://www.sec.gov/Archives/edgar/data/1824920/000095017025027722/ionq-20241231.htm" target="_blank" rel="noopener">SEC EDGAR</a> · <a href="https://www.ionq.com/news/ionq-announces-largest-2024-u-s-quantum-contract-award-of-usd54-5m-with" target="_blank" rel="noopener">ionq.com</a>.',
  '8': '<strong>John Preskill</strong>, "Beyond NISQ: The Megaquop Machine," <em>ACM Transactions on Quantum Computing</em> 6(3), Article 18, pp. 1–7 (29 April 2025); keynote at Q2B 2024, Silicon Valley, 11 December 2024: <em>"There is no proposed application of NISQ computing with commercial value for which quantum advantage has been demonstrated when compared to the best classical hardware running the best algorithms for solving the same problems. Nor are there persuasive theoretical arguments indicating that commercially viable applications will be found that do not use quantum error-correcting codes and fault-tolerant quantum computing."</em> DOI: <a href="https://doi.org/10.1145/3723153" target="_blank" rel="noopener">10.1145/3723153</a>.',
  '9': '<strong>Global Risk Institute</strong>, Quantum Threat Timeline Reports (Mosca &amp; Piani). 2024 edition, 32 experts: probability of a cryptographically relevant quantum computer within 10 years of 19–34%, spanning pessimistic-to-optimistic readings of expert responses (within 5 years: 5–14%). 2025 edition, 26 experts: within 10 years, 28–49%. <a href="https://globalriskinstitute.org/publication/2024-quantum-threat-timeline-report/" target="_blank" rel="noopener">2024 report</a> · <a href="https://globalriskinstitute.org/publication/quantum-threat-timeline-report-2025b/" target="_blank" rel="noopener">2025 report</a>.',
  '10': '<strong>Quantum sensing, shipped and trialled:</strong> wearable OPM-MEG brain scanners are sold commercially by Cerca Magnetics (University of Nottingham spin-out) — <a href="https://www.cercamagnetics.com/cerca-opm-meg" target="_blank" rel="noopener">cercamagnetics.com</a>; CSIRO\'s SQUID-based LANDTEM has been used in mineral exploration for two decades and is credited with multi-billion-dollar ore discoveries — <a href="https://csiropedia.csiro.au/landtem/" target="_blank" rel="noopener">csiro.au</a>; Q-CTRL\'s Ironstone Opal quantum navigation completed airborne trials and a 144-hour Royal Australian Navy sea trial in 2025 — <a href="https://q-ctrl.com/blog/q-ctrls-new-maritime-quantum-navigation-solution-successfully-undergoes-first-defense-trials-at-sea" target="_blank" rel="noopener">q-ctrl.com</a>.',
  '11': '<strong>NIST</strong> finalized the first three post-quantum cryptography standards — FIPS 203 (ML-KEM), FIPS 204 (ML-DSA), FIPS 205 (SLH-DSA) — on 13 August 2024 (<a href="https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards" target="_blank" rel="noopener">nist.gov</a>). Draft NIST IR 8547 (November 2024) proposes deprecating RSA-2048/ECC after 2030 and disallowing them after 2035 (<a href="https://csrc.nist.gov/pubs/ir/8547/ipd" target="_blank" rel="noopener">csrc.nist.gov</a>). NSA\'s CNSA 2.0 requires new national-security acquisitions to comply from 2027, with exclusive use by 2033 (<a href="https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF" target="_blank" rel="noopener">nsa.gov</a>). The migration is mandated and dated — independent of when a cryptographically relevant quantum computer arrives.',
};

/* Short tags for the right-rail source index. Keyed like FOOTNOTES. */
const SOURCE_TAGS = {
  '1':  { tag: 'IBM Condor — 1,121 qubits', kind: 'Newsroom ’23' },
  '2':  { tag: 'PsiQuantum — million-qubit premise', kind: 'Wire ’25' },
  '3':  { tag: 'Google Willow — error correction', kind: 'Nature ’24' },
  '4':  { tag: 'IBM — low-overhead codes', kind: 'Nature ’24' },
  '5':  { tag: 'IBM roadmap — 4,000 qubits by 2025', kind: 'Newsroom ’22' },
  '6':  { tag: 'IBM roadmap — Starling & Blue Jay', kind: 'Newsroom ’25' },
  '7':  { tag: 'IonQ — 10-K & AFRL award', kind: 'SEC / IR' },
  '8':  { tag: 'Preskill — "Beyond NISQ"', kind: 'ACM ’25' },
  '9':  { tag: 'GRI — expert surveys', kind: '’24 & ’25' },
  '10': { tag: 'Quantum sensing in production', kind: 'Field' },
  '11': { tag: 'NIST — post-quantum standards', kind: 'FIPS ’24' },
};

(function initFootnotes() {
  if (typeof document === 'undefined') return;

  // Two UIs share the footnote content:
  //   - Desktop: a sticky "marginalia" panel in the right sidebar; updates on scroll AND click
  //   - Mobile:  a corner popover triggered only on click (marginalia hidden by CSS)
  // We pick which to drive based on viewport.
  const isWide = () => window.matchMedia('(min-width: 1101px)').matches;

  const popover = document.createElement('div');
  popover.className = 'fn-popover';
  popover.innerHTML = `
    <button class="fn-close" aria-label="Close">×</button>
    <div class="fn-content"></div>
  `;
  document.body.appendChild(popover);
  const popContent = popover.querySelector('.fn-content');
  popover.querySelector('.fn-close').addEventListener('click', () => {
    popover.classList.remove('is-open');
  });

  const marginalia = document.getElementById('marginalia');
  const sourceIndex = document.getElementById('source-index');

  function setActiveSource(num) {
    if (!sourceIndex) return;
    sourceIndex.querySelectorAll('.source-row').forEach((row) => {
      row.classList.toggle('is-active', row.getAttribute('data-fn') === num);
    });
  }

  function renderMarginalia(num) {
    if (!marginalia) return;
    marginalia.innerHTML = `
      <div class="marginalia-active">
        <p class="marginalia-num">FOOTNOTE ${num}</p>
        <p class="marginalia-body">${FOOTNOTES[num] || '[footnote missing]'}</p>
      </div>
    `;
    setActiveSource(num);
  }

  // Persistent source index in the right rail — every source, one row each,
  // clickable to surface the full footnote in the marginalia viewer above.
  if (sourceIndex) {
    const keys = Object.keys(SOURCE_TAGS).sort((a, b) => Number(a) - Number(b));
    sourceIndex.innerHTML = keys.map((n) => `
      <button class="source-row" data-fn="${n}" aria-label="Show footnote ${n}">
        <span class="source-num">${n}</span>
        <span class="source-tag">${SOURCE_TAGS[n].tag}</span>
        <span class="source-kind">${SOURCE_TAGS[n].kind}</span>
      </button>
    `).join('');
    sourceIndex.addEventListener('click', (e) => {
      const row = e.target.closest('.source-row');
      if (row) renderMarginalia(row.getAttribute('data-fn'));
    });
  }

  function openPopover(num) {
    popContent.innerHTML = `<span class="fn-num">${num}.</span>${FOOTNOTES[num] || '[footnote missing]'}`;
    popover.classList.add('is-open');
  }

  document.querySelectorAll('.fn-ref').forEach((ref) => {
    const num = ref.getAttribute('data-fn');
    ref.setAttribute('role', 'button');
    ref.setAttribute('tabindex', '0');
    if (!ref.textContent) ref.textContent = num;

    function activate() {
      if (isWide()) {
        renderMarginalia(num);
      } else {
        openPopover(num);
      }
    }

    ref.addEventListener('click', activate);
    ref.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
  });

  // Scroll-driven marginalia: as a footnote ref enters viewport, surface it
  // in the right-side panel. Most-recently-entered wins.
  if (marginalia && 'IntersectionObserver' in window) {
    let lastNum = null;
    const refs = Array.from(document.querySelectorAll('.fn-ref'));
    const io = new IntersectionObserver((entries) => {
      if (!isWide()) return;
      // Find the entries that are now intersecting; pick the last one (lowest in document order).
      const intersecting = entries.filter(e => e.isIntersecting);
      if (intersecting.length === 0) return;
      const last = intersecting[intersecting.length - 1];
      const num = last.target.getAttribute('data-fn');
      if (num !== lastNum) {
        renderMarginalia(num);
        lastNum = num;
      }
    }, {
      rootMargin: '-30% 0px -50% 0px',  // fire when ref is near the middle of the viewport
      threshold: 0,
    });
    refs.forEach(r => io.observe(r));
  }
})();

/* ---------------------------------------------------------------------------
 * 4a. initFootnoteList — populate the bottom-of-page <ol> from FOOTNOTES
 * Keeps the static list in sync with the JS data so screen readers and
 * non-JS readers see the full source list.
 * ---------------------------------------------------------------------------
 */
(function initFootnoteList() {
  if (typeof document === 'undefined') return;
  const list = document.getElementById('footnotes-list');
  if (!list) return;
  const keys = Object.keys(FOOTNOTES).sort((a, b) => Number(a) - Number(b));
  list.innerHTML = keys.map(n => `<li id="fn-${n}">${FOOTNOTES[n]}</li>`).join('');
})();

/* ---------------------------------------------------------------------------
 * 4b. initSectionNav — scroll-spy on the left sidebar section navigation
 * ---------------------------------------------------------------------------
 */
(function initSectionNav() {
  if (typeof document === 'undefined') return;
  const navLinks = document.querySelectorAll('.section-nav a[data-nav]');
  if (navLinks.length === 0) return;
  if (!('IntersectionObserver' in window)) return;

  const sectionIds = ['why', 'what', 'how', 'ask'];
  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(link => {
      const isMatch = link.getAttribute('data-nav') === id;
      link.classList.toggle('is-active', isMatch);
    });
  }

  // Use a simple scroll-position check on every observed intersection — the
  // section whose top is closest to (but past) the viewport top wins.
  function updateFromScroll() {
    const trigger = window.innerHeight * 0.35;  // 35% down the viewport
    let activeId = sectionIds[0];
    for (const sec of sections) {
      const top = sec.getBoundingClientRect().top;
      if (top <= trigger) activeId = sec.id;
    }
    setActive(activeId);
  }

  // IntersectionObserver kicks the update; the actual decision is from scroll position.
  const io = new IntersectionObserver(updateFromScroll, {
    rootMargin: '-30% 0px -50% 0px',
    threshold: 0,
  });
  sections.forEach(s => io.observe(s));
  updateFromScroll();
})();

/* ---------------------------------------------------------------------------
 * 5. initAudio — play/pause toggle for the machine-read audio
 * ---------------------------------------------------------------------------
 */
(function initAudio() {
  if (typeof document === 'undefined') return;
  const btn = document.getElementById('audio-toggle');
  const el = document.getElementById('audio-el');
  if (!btn || !el) return;
  btn.addEventListener('click', () => {
    if (el.paused) {
      el.play().catch(() => {
        btn.textContent = '✕ Audio not yet available';
        setTimeout(() => { btn.textContent = '▶ Listen'; }, 2000);
      });
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

/* ---------------------------------------------------------------------------
 * 6. initProgress — thin gold reading-progress bar along the top edge
 * ---------------------------------------------------------------------------
 */
(function initProgress() {
  if (typeof document === 'undefined') return;
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  function update() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = pct + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
