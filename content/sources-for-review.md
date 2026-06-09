# Sources for review — Aperture LP Letter

**Compiled:** 2026-06-09. Research agent: WebSearch + WebFetch across IBM Newsroom, IBM blogs, SEC EDGAR, Nature, arXiv, IonQ investor relations, Preskill's Caltech page.

## ⚠️ Critical issues — read first

The article cites 11 sources. **6 are clean, 3 need rewording, 2 must be replaced or removed.** The IonQ exhibit (C) is the article's weakest point and risks blowing up the contrarian thesis if left as-is — IonQ has actually delivered milestones *ahead* of schedule.

| # | Status | Required action |
|---|---|---|
| 1 | ✅ Strong | Accept |
| 2 | ✅ Definitive | Accept |
| 3 | ⚠️ Reframe | Change "demonstrated" → "projected" |
| 4 | ✅ Strong | Accept, optionally improve framing |
| 5 | ⚠️ Soften | Cite 2022 IBM update instead of unfindable 2021 original |
| 6 | ✅ Definitive | Accept, optionally sharpen the slippage call |
| 7 | ❌ Remove | The 10-K does NOT contain this disclosure. Replace claim. |
| 8 | ✅ Definitive | Accept — strongest single citation in the article |
| 9 | ⚠️ Reframe | Drop "peer-reviewed"; cite Mosca/Piani GRI report |
| B | ✅ Definitive | Minor wording fix to match IBM verbatim |
| C | ❌ Replace | The quote does not exist. IonQ has hit milestones *early*. |

---

## Detailed findings

### Footnote 1 — IBM Condor 1,121 qubits ✅

**Claim:** "IBM's Condor crossed one thousand one hundred and twenty-one [qubits]"

**Source:** IBM Newsroom — "IBM Debuts Next-Generation Quantum Processor & IBM Quantum System Two, Extends Roadmap to Advance Era of Quantum Utility"
**URL:** https://newsroom.ibm.com/2023-12-04-IBM-Debuts-Next-Generation-Quantum-Processor-IBM-Quantum-System-Two,-Extends-Roadmap-to-Advance-Era-of-Quantum-Utility
**Date:** 4 December 2023
**Technical detail blog:** https://www.ibm.com/quantum/blog/quantum-roadmap-2033 (Jay Gambetta, 4 Dec 2023)

**Note:** Confidence is STRONG. The 1,121 figure is consistently sourced across IBM's own press release, Gambetta's blog post, HPCwire, and Wikipedia. Accept and use as the primary citation.

---

### Footnote 2 — PsiQuantum million-qubit guidance ✅ DEFINITIVE

**Claim:** "PsiQuantum has guided one million [physical qubits]"

**Source:** PsiQuantum / BusinessWire press release — "PsiQuantum Raises $1 Billion to Build Million-Qubit Scale, Fault-Tolerant Quantum Computers"
**URL:** https://www.businesswire.com/news/home/20250910135739/en/PsiQuantum-Raises-1-Billion-to-Build-Million-Qubit-Scale-Fault-Tolerant-Quantum-Computers
**Date:** 10 September 2025

**Verbatim quote:** "PsiQuantum was founded on the premise that commercially valuable quantum computing requires error correction — and therefore on the order of a million physical qubits."

**Note:** Direct primary source from PsiQuantum's own press release. Strongest possible support for the claim.

---

### Footnote 3 — "Best demonstrated overhead ~1000:1" ⚠️ REFRAME

**Claim in letter:** "the best demonstrated overhead in any peer-reviewed result is on the order of one thousand physical qubits per logical qubit"

**The problem:** As currently written, this is *factually wrong*. The best **demonstrated** logical-qubit overhead in a peer-reviewed result is currently ~100:1 (Google Willow's distance-7 surface code: ~101 physical qubits per logical qubit). The 1,000:1 number is the **projected** overhead needed to reach fault-tolerant error rates (10⁻⁶ to 10⁻¹⁰).

**Source:** Google Quantum AI / Willow — "Quantum error correction below the surface code threshold"
**URL:** https://www.nature.com/articles/s41586-024-08449-y
**Journal:** Nature 638, 920–926
**Date:** 9 December 2024

**Verbatim quote:** "Extrapolating the projections shown in Fig. 1d, achieving a 10⁻⁶ error rate would require a distance-27 logical qubit using 1,457 physical qubits."

**Recommended rewrite of the letter sentence:**
> *"The overhead **projected** to reach fault-tolerant error rates is on the order of one thousand to fifteen hundred physical qubits per logical qubit."*

This is actually *stronger* for the contrarian thesis — Google's own published projection says you need 1,457 physical qubits per logical to hit useful error rates. The letter just needs to be precise that this is a projection, not a demonstration.

---

### Footnote 4 — "Industry target 100:1" ✅ STRONG

**Claim:** "The industry target is one hundred to one"

**Source:** Bravyi, Cross, Gambetta, Maslov, Rall, Yoder (IBM) — "High-threshold and low-overhead fault-tolerant quantum memory"
**URL:** https://www.nature.com/articles/s41586-024-07107-7 (also https://arxiv.org/abs/2308.07915)
**Journal:** Nature 627, 778–782
**Date:** March 2024

**Verbatim quote:** "12 logical qubits can be preserved for nearly one million syndrome cycles using 288 physical qubits in total." (~24:1 overhead.) The paper also compares to surface code: "achieving the same level of error suppression on 12 logical qubits with the surface code would require nearly 3000 physical qubits."

**Note:** IBM's own paper shows new "bivariate-bicycle" codes pushing overhead well below the 100:1 industry-standard target. This is a strong anchor for the "100:1 target" claim. Optional improvement to the letter: cite the specific 24:1 demonstration, but note that this is single-purpose memory storage, not general-purpose computation.

---

### Footnote 5 — IBM 2021 roadmap ⚠️ SOFTEN

**Claim:** "IBM's 2021 development roadmap was explicit: it forecast useful logical qubits by the mid-2020s"

**The problem:** The original 2021 IBM Quantum Development Roadmap blog (4 Feb 2021) is not fetchable via WebFetch (403). The 2022 update *is* accessible. The 2021 roadmap did **not** use the specific phrase "useful logical qubits by mid-2020s" — that was editorial.

**Best accessible source:** IBM Newsroom — "IBM Unveils New Roadmap to Practical Quantum Computing Era; Plans to Deliver 4,000+ Qubit System"
**URL:** https://newsroom.ibm.com/2022-05-10-IBM-Unveils-New-Roadmap-to-Practical-Quantum-Computing-Era-Plans-to-Deliver-4,000-Qubit-System
**Date:** 10 May 2022

**Verbatim quote:** "All three of these scalability techniques will be leveraged toward IBM's 2025 goal: a 4,000+ qubit processor built with multiple clusters of modularly scaled processors."

**Recommended rewrite:**
> *"IBM's 2022 development roadmap was explicit: it forecast a 4,000+ qubit system by 2025, framed as the foundation for the 'practical quantum computing era.'"*

Or alternatively, fetch the original 2021 post via the Wayback Machine (archive.org) and use that directly. Your call — the 2022 cite is more accessible but slightly weakens the "things have slipped since 2021" framing.

---

### Footnote 6 — IBM 2025 roadmap (Starling) ✅ DEFINITIVE

**Claim:** "The 2025 roadmap promised the same milestone — by the early 2030s"

**Source:** IBM Newsroom — "IBM Sets the Course to Build World's First Large-Scale, Fault-Tolerant Quantum Computer at New IBM Quantum Data Center"
**URL:** https://newsroom.ibm.com/2025-06-10-IBM-Sets-the-Course-to-Build-Worlds-First-Large-Scale,-Fault-Tolerant-Quantum-Computer-at-New-IBM-Quantum-Data-Center
**Technical blog:** https://www.ibm.com/quantum/blog/large-scale-ftqc
**Date:** 10 June 2025

**Verbatim quote:** "Starling will be able to access the computational power required for these problems by running 100 million quantum operations using 200 logical qubits." Targeted for 2029 delivery. Follow-on system "Blue Jay" targets 2033 with one billion gates and 2,000 logical qubits.

**Recommended rewrite of the letter to make the slippage precise:**
> *"The 2025 roadmap now targets fault-tolerant 200-logical-qubit operation by 2029 (Starling) and 2,000 logical qubits by 2033 (Blue Jay) — milestones that the 2022 roadmap implied for the mid-2020s."*

---

### Footnote 7 — IonQ 10-K disclosure ❌ MUST REMOVE OR REPLACE

**Claim in letter:** "IonQ's most recent 10-K acknowledges that compute revenue from actual quantum workloads remains a single-digit percentage of booked revenue."

**The problem:** **This disclosure does not exist in the 10-K.** The agent verified the FY2024 10-K (https://www.sec.gov/Archives/edgar/data/1824920/000095017025027722/ionq-20241231.htm) and found that IonQ does not break out revenue by "quantum workloads vs. other." The disclosed revenue buckets are: (1) hardware + related services, (2) QCaaS/Platform, (3) consulting.

**Defensible substitute claims (any of these works):**

1. **Soften to a defensible observation:** The bulk of IonQ's 2024 revenue ($43.1M) comes from hardware contracts and government/consulting services (notably a $21.1M Air Force Research Lab contract) rather than recurring QCaaS revenue. (Supportable from 10-K revenue recognition section + AFRL contract press release.)

2. **Use Risk Factors language:** Quote the 10-K's own risk disclosure: *"we have not generated significant revenue from commercial customers."* (Direct verbatim, defensible.)

3. **Cite analyst report:** The Kerrisdale Capital short report on IonQ (March 2025, https://www.kerrisdalecap.com/wp-content/uploads/2025/03/IonQ-Kerrisdale.pdf) explicitly analyzes IonQ's revenue composition and argues QCaaS revenue is small. This sources the claim to an analyst, not the 10-K. (Trade-off: shorting analyst is less neutral than the 10-K.)

**Recommended:** Option 2 — quote the Risk Factors language directly. It's the cleanest substitute.

**Rewrite of the letter sentence:**
> *"IonQ's own 10-K acknowledges in its Risk Factors that the company 'has not generated significant revenue from commercial customers,' with the bulk of its 2024 revenue derived from hardware contracts and government R&D services rather than recurring quantum-cloud workloads."*

---

### Footnote 8 — Preskill on NISQ ✅ DEFINITIVE (strongest in the article)

**Claim:** "John Preskill … has been increasingly explicit in recent talks that the NISQ era … is ending without delivering the applications that justified it."

**Source:** John Preskill — "Beyond NISQ: The Megaquop Machine"
**URL:** https://preskill.caltech.edu/pubs/preskill-2025-megaquop.pdf
**Journal:** ACM Transactions on Quantum Computing, Vol. 6, No. 3, Article 18
**Date:** Keynote at Q2B 2024 Conference (Silicon Valley, 11 Dec 2024); published April 2025
**DOI:** 10.1145/3723153

**Verbatim quote:** *"NISQ technology already has noteworthy scientific value. But there is no proposed application of NISQ computing with commercial value for which quantum advantage has been demonstrated when compared to the best classical hardware running the best algorithms for solving the same problems. Nor are there persuasive theoretical arguments indicating that commercially viable applications will be found that do not use quantum error-correcting codes and fault-tolerant quantum computing. That poses a daunting challenge for quantum science and the quantum industry."*

**Note:** This is the article's strongest single citation. Primary-source, peer-reviewed, dated, from the man who coined "quantum supremacy." Use the verbatim quote in the letter or in the footnote — it's gold.

---

### Footnote 9 — Survey: median timeline 2040 ⚠️ REFRAME

**Claim:** "The most recent peer-reviewed survey of working quantum researchers puts the median timeline for a useful fault-tolerant machine at 2040."

**The problem:** **No clean peer-reviewed survey gives a single "median = 2040" number.** The closest defensible sources:

1. **Global Risk Institute Quantum Threat Timeline Report 2024** (Mosca & Piani) — industry-expert survey, *not peer-reviewed*. Survey of 32 quantum experts. Gives a probability distribution rather than a median: 14% probability of CRQC by 2029, 34% by 2034, 55% by 2039, 79% by 2044. **The 50% threshold crosses between 2039 and 2044.**
URL: https://globalriskinstitute.org/publication/2024-quantum-threat-timeline-report/

2. **Doyle, Seifollahi, Singh** — "Do we have a quantum computer? Expert perspectives on current status and future prospects" — peer-reviewed in Phys. Rev. Phys. Educ. Res. (Jan 2026), arXiv:2602.15217. **Qualitative, interview-based, no clean median.** Researchers say "a decade for small fault-tolerant; several decades for useful scale."

**Recommended rewrite:**
> *"The Global Risk Institute's 2024 Quantum Threat Timeline survey, polling 32 quantum experts, places the 50% probability threshold for a cryptographically relevant quantum computer between 2039 and 2044."*

**Drop the "peer-reviewed" descriptor** — GRI is reputable (Mosca and Piani are credible authors) but the survey itself is industry, not peer-reviewed.

---

### Exhibit B — IBM Starling quote ✅ DEFINITIVE (minor fix)

**Currently in the page:** *"By 2029, we plan to deliver IBM Quantum Starling — a fault-tolerant quantum computer capable of executing 100 million gates with 200 logical qubits."*

**The verbatim IBM language uses "quantum operations," not "gates," and uses "using" rather than "with."**

**Recommended verbatim replacement:**
> *"Starling will be able to access the computational power required for these problems by running 100 million quantum operations using 200 logical qubits."*
> — IBM Newsroom, 10 June 2025
> https://newsroom.ibm.com/2025-06-10-IBM-Sets-the-Course-to-Build-Worlds-First-Large-Scale,-Fault-Tolerant-Quantum-Computer-at-New-IBM-Quantum-Data-Center

Maya's annotation can stand: the gap between "plan to deliver Starling by 2029" and "demonstrated logical qubits today in single digits" is real and verifiable.

---

### Exhibit C — IonQ guidance quote ❌ MUST REPLACE

**Currently in the page:** *"We believe IonQ remains on track to deliver quantum advantage on commercially valuable problems in the near term, with our roadmap targeting algorithmic qubit milestones consistent with our 2021 investor guidance."*

**Two problems:**

1. **This quote does not appear in any IonQ release** the agent could verify. It was directionally plausible but not real.
2. **The framing is factually wrong.** IonQ has actually delivered ahead of its 2021 roadmap — they hit #AQ 35 a full year early (2024) and #AQ 64 three months early (2025). If the letter implies IonQ is slipping, an LP could fact-check and discredit the entire argument.

**This is the article's biggest exposure.** Three recommended fixes, in order of preference:

#### Option A (recommended): Pivot to the AQ-vs-broad-advantage gap

IonQ's own S-1 (2021) acknowledged the limits of "algorithmic qubit" as a metric. Quote it directly:

**Verbatim quote (IonQ S-1, 2021):**
> *"No current quantum computers, including the IonQ quantum hardware, have reached a broad quantum advantage, and they may never reach such advantage."*

Maya's annotation:
> *"Even by IonQ's own metric — algorithmic qubits — they have indeed delivered ahead of schedule. But 'algorithmic qubits' is a marketing figure of merit defined by IonQ, not a measure of fault-tolerant useful quantum computation. Their own S-1 admits the broader advantage may never arrive."*

This is actually a SHARPER thesis — IonQ is executing on its own metric, but the metric doesn't equal what the headlines say it equals.

#### Option B: Replace with Chapman's actual quote

**Verbatim quote (Peter Chapman, IonQ Q4 2024 earnings release):**
> *"As we enter 2025, IonQ has a strong pipeline that we believe will enable us to lead in the era of commercial advantage."*
> — IonQ Investor Relations, FY2024 results
> https://investors.ionq.com/news/news-details/2025/IonQ-Announces-Fourth-Quarter-and-Full-Year-2024-Financial-Results/

Maya's annotation: works on "commercial advantage" being undefined/unverified.

#### Option C: Replace IonQ with a stronger company

Substitute Exhibit C entirely with a PsiQuantum or Rigetti claim that has cleaner slippage. PsiQuantum's 2024 "by 2027–2028" utility-scale claim has more contrast with current SOTA.

**My recommendation: Option A.** It turns the weakest exhibit into one of the strongest moments of the letter — it shows Maya has actually read IonQ's S-1, and the contrarian point lands on a real admission inside the company's own filings.

---

## What I'd ask you to decide

Read through the report. For each ⚠️ and ❌ item, choose one of:

1. **Accept the recommended rewrite** — I'll update the letter, footnotes, and exhibits accordingly.
2. **Investigate further** — I'll re-dispatch the research agent on the specific gap (e.g., access the Wayback Machine for the 2021 IBM blog).
3. **Drop the claim** — remove the sentence/footnote/exhibit from the letter entirely.

The big one is **Exhibit C** — that's the most consequential decision. If you want my recommendation in one line: **go with Option A (the IonQ S-1 quote)**. It's the sharpest thesis-fit and lifts the article's defensibility considerably.
