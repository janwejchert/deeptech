# ElevenLabs audio script — "A Letter to Our Limited Partners"

**Purpose:** machine-read audio version of the letter, played from the page's "Listen" button.
**Output file:** export as MP3 and save to `assets/audio.mp3` (the player already points there).
**Target length:** ~7 minutes at a measured pace (~150 wpm). If the final cut differs, update the "~7 min" label in `index.html`.

## Generation settings (suggested)

- **Model:** Eleven v3 if available (best prosody), otherwise Multilingual v2.
- **Voice:** a measured, lower-register female voice per the spec (Maya: dry, technically literate, no air-punching). Audition 2–3; avoid anything "advertorial."
- **Stability:** ~55%. **Similarity:** ~75%. **Style exaggeration:** low/0. **Speed:** 0.95.
- Generate in **one take** so tone stays consistent; re-roll individual paragraphs only if a number is misread.
- **Pronunciation checks:** "NISQ" should be read as "nisk" (if the voice spells it N-I-S-Q, replace the word with "nisk" in the script); "IonQ" as "eye-on-cue"; "qubit" as "cue-bit."
- The script below spells out money amounts, dates, and awkward numerals so the TTS cannot stumble. Punctuation is the pacing: commas are short pauses, periods are full stops.

---

## SCRIPT (paste everything between the rules into ElevenLabs)

This is a machine-read recording of "A Letter to Our Limited Partners," a fictional fund letter produced for the Deep Tech Venturing and Investment course at IE Business School. Aperture Quantum Partners and Maya Chen are fictional. Every number, quotation, and source in the letter is real.

Dear Limited Partners,

Section one: Why.

When I raised this fund in 2022, I told you quantum advantage was a 2028 event. I owe you an honest update: I was wrong by at least a decade.

I am not writing today to defend that thesis. I am writing to retire it.

What follows is not a pitch. It is an accounting. Over the next thousand words I will lay out three pieces of evidence, the same three I have been carrying into our investment committee for the past nine months, and ask you to vote on what we do about them. The math is real, the quotes are public, and the conclusion is one I should have reached two years ago. We have been allocating against the wrong clock.

You do not need to take my word for any of it. Where I show you a calculation, the assumptions are yours to set. Where I show you a quote, it is verbatim and dated. I will let the physics, the public filings, and the people inside the labs make the case I should have been making to you in 2022.

Section two: What.

Pillar one: error-correction overhead. The headline number in every IBM, PsiQuantum, and Quantinuum press release is the physical qubit count. IBM's Condor crossed one thousand one hundred and twenty-one. PsiQuantum has guided one million. These are real engineering achievements. They are also not the same number as a useful quantum computer.

The useful number is logical qubits: qubits that survive long enough to run a non-trivial algorithm. The best demonstrated overhead today is approximately one hundred physical qubits per logical qubit; the overhead projected for fault-tolerant computation is one thousand to one thousand five hundred. Industry is pushing on this with new code constructions; no one disputes the order-of-magnitude gap remains.

Exhibit A, on the page, lets you build the timeline yourself. Pick a use case. Drag the overhead and doubling-cadence sliders to whatever you believe. The math is unforgiving: under any honest assumption, useful quantum computing arrives sometime in the twenty-forties. Not the twenty-twenties.

Pillar two: public-company roadmap slippage. IBM's 2022 development roadmap forecast a four-thousand-qubit system by 2025 as the gateway to the practical quantum computing era. The 2025 roadmap retired that headline number and replaced it: fault-tolerant operation with two hundred logical qubits by 2029, a system they call Starling, and two thousand logical qubits by 2033, a system they call Blue Jay. The metric of advantage moved; the date moved with it. The goalposts slid right by half a decade.

This is not one company's failure. Exhibits B and C, on the page, are direct quotes from IBM's and IonQ's own investor materials, paired with their most recent published results. You will see the same pattern: a forward roadmap that compresses every twelve months, and a backward-looking record that does not.

Of particular note for our fund: IonQ booked forty-three point one million dollars of fiscal 2024 revenue; across that year's interim reports, two customers accounted for at least two-thirds of it, anchored by a fifty-four point five million dollar Air Force Research Lab award. The top line is growing fast, on hardware, networking, and government R and D. We are paying for the chemistry of the future and receiving the procurement of the present.

Pillar three: the LP-physicist gap. There is a third dataset, less quantitative but harder to ignore. In the eighteen months I have spent with the physicists who actually run these labs, from Caltech to Yale to the IBM Quantum group, not one has told me, in private, that they expect a fault-tolerant quantum advantage inside the next decade.

The same physicists, in public, are quoted in the press releases of the companies we have funded. John Preskill, who coined "quantum supremacy," has been increasingly explicit in recent talks that the NISQ era, the era in which our thesis was conceived, is ending without delivering the applications that justified it. The Global Risk Institute's expert surveys still put the odds of a cryptographically relevant quantum computer arriving inside ten years below a coin flip; the estimate rises each edition and has not crossed even odds.

We have been listening to the wrong people in the same building.

Section three: How.

We have three years left on the clock for Fund Two. Standing on the evidence above, I cannot ask you to underwrite three more years of the same thesis. I am asking your permission to wind down our quantum-computing positions early and return capital, less management fees, by the end of 2026.

The redeployment thesis is narrower than the one I raised against. Two quantum sub-sectors meet a higher bar: the science is on a three-year horizon, and the buyer is identifiable. Quantum sensing meets both: commercial today in brain imaging and mineral exploration, in defense trials for inertial navigation. Post-quantum cryptography migration meets both: not "the cool quantum part," but a real, regulated, near-term procurement cycle inside every bank and government we cover.

If you vote to wind down, our recommendation is to redeploy thirty to forty percent of returned capital into a co-invest vehicle covering these two sub-sectors. I will not be raising a new fund for them. The thesis is too narrow for a dedicated vehicle, and I have used your trust once already.

We are keeping the deep-tech conviction, the LP relationships, the lab-side network. We are not keeping the timeline. I am drawing that line earlier than fiduciary duty requires, because waiting another year does not change the math, only the size of the eventual write-down.

Section four: The Ask.

I am asking for two votes today.

First, on the wind-down. The recommendation, the legal mechanics, and the redeployment vehicle will reach you Monday. We need a quorum response by the thirtieth of June.

Second, on the personal carry concession. I am offering to forfeit the entirety of my carry on Fund Two and to take a thirty percent reduction in already-paid management fees, refundable to limited partners through a structured note over thirty-six months. My partners are offering proportionate terms.

I owe you better. The next letter from Aperture will be shorter, and the thesis will be one we can defend with the physics in front of us.

Yours sincerely,

Maya Chen. Managing Partner, Aperture Quantum Partners.

---

## Differences from the page text (intentional, audio-only)

- Footnote markers are dropped.
- Section heads are spoken as "Section one: Why," etc., mirroring the page's I–IV structure.
- "Exhibit A lets you…" becomes "Exhibit A, on the page, lets you…" (and likewise for B and C) so a standalone listener isn't confused.
- "(Starling)" and "(Blue Jay)" become "a system they call Starling / Blue Jay."
- Money amounts, "Fund II," "30 June," "2040s," and "R&D" are spelled out for the voice.
- A one-line fiction disclosure opens the recording, matching the page's editor's note.
