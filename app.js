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

/* ---------------------------------------------------------------------------
 * 3. initAnnotations — hover/tap reveal for inline annotated quotes
 *
 * Content for each annotation is stored in ANNOTATIONS keyed by data-annotation.
 * Filled with real Maya counter-evidence on Day 3 (Stage 4 of this build).
 * ---------------------------------------------------------------------------
 */
const ANNOTATIONS = {
  ibm: {
    body: 'IBM\'s published peer-reviewed demonstrations of logical qubits to date remain in single digits. The gap between "plan to deliver" and "have delivered" has widened in every roadmap revision since 2021. The same 200-logical-qubit milestone existed on the 2021 roadmap, scheduled four years earlier.',
    citation: 'IBM Quantum published demonstrations 2023–2025 vs. successive IBM Quantum Development Roadmap revisions [team to verify exact dates].',
  },
  ionq: {
    body: 'IonQ\'s FY2025 10-K discloses that the majority of booked revenue comes from networking deployments and government R&D contracts. Quantum compute revenue from production workloads remains in low single digits as a percentage of total revenue.',
    citation: 'IonQ Inc. Form 10-K, FY2025 [team to verify specific line items and dollar figures Day 3].',
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
  '1': 'IBM Condor: 1,121-qubit processor announced December 2023. [Team Day 3: verify against IBM Newsroom announcement and any subsequent architecture brief.]',
  '2': 'PsiQuantum has publicly guided a one-million-physical-qubit fault-tolerant datacenter on a ~5–10 year horizon. [Team Day 3: verify exact year and target against most recent public PsiQuantum statement, likely a 2024–25 executive interview or press release.]',
  '3': 'Best demonstrated logical-qubit overhead remains on the order of 1,000:1 physical-to-logical. Cf. Google Quantum AI logical qubit results (Nature, 2023 and subsequent peer-reviewed follow-ups). [Team Day 3: verify against most recent peer-reviewed result.]',
  '4': 'IBM Quantum Development Roadmap (most recent published) targets ~100:1 overhead for the planned error-corrected era. [Team Day 3: verify against IBM Quantum blog roadmap post.]',
  '5': 'IBM Quantum Development Roadmap, 2021 version. [Team Day 3: verify specific 2024–2026 logical-qubit milestone wording, archived URL preferred.]',
  '6': 'IBM Quantum Development Roadmap, most recent (2025) version. [Team Day 3: verify wording showing the same milestone now scheduled for the early 2030s.]',
  '7': 'IonQ Inc., Annual Report on Form 10-K, most recent fiscal year. [Team Day 3: identify and verify the line item disclosing quantum-compute-derived revenue vs. total booked revenue.]',
  '8': 'John Preskill, recent talks and essays on the end of the NISQ era. Likely sources: Preskill\'s Caltech webpage, arXiv, or a 2024–25 keynote transcript. [Team Day 3: locate and cite a specific quote with date.]',
  '9': 'Peer-reviewed survey of working quantum researchers; median fault-tolerant useful-machine timeline ~2040. [Team Day 3: locate a 2024+ published survey; if not findable, substitute with a citation of an alternative documented researcher-consensus source, e.g., a Preskill timeline statement.]',
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

  function renderMarginalia(num) {
    if (!marginalia) return;
    marginalia.innerHTML = `
      <div class="marginalia-active">
        <p class="marginalia-num">FOOTNOTE ${num}</p>
        <p class="marginalia-body">${FOOTNOTES[num] || '[footnote missing]'}</p>
      </div>
    `;
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
