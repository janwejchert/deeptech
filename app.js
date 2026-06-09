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
    body: '[FILLED STAGE 4: Maya\'s rebuttal — IBM annotation]',
    citation: '[FILLED STAGE 4: e.g. Logical-qubit demonstration, Nature, 2024]',
  },
  ionq: {
    body: '[FILLED STAGE 4: Maya\'s rebuttal — IonQ annotation]',
    citation: '[FILLED STAGE 4: e.g. IonQ 10-K, FY2025, item X]',
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
  '1': '[FILLED STAGE 4: footnote 1]',
};

(function initFootnotes() {
  if (typeof document === 'undefined') return;
  const popover = document.createElement('div');
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

  document.querySelectorAll('.fn-ref').forEach((ref) => {
    const num = ref.getAttribute('data-fn');
    ref.setAttribute('role', 'button');
    ref.setAttribute('tabindex', '0');
    if (!ref.textContent) ref.textContent = num;
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
