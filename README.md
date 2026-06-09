# Aperture LP Letter

An immersive web piece hosting a fictional 1,000-word letter from Maya Chen, founding partner of (fictional) Aperture Quantum Partners, to the limited partners of her firm's $312M Fund II — recommending an early wind-down of the fund's quantum-computing positions.

The fund and Maya are fictional. Every cited claim, quote, and physics statement is real and sourced.

Produced for the Deep Tech Venturing & Investment module at IE Business School, taught by Prof. David, June 2026.

## Local development

```bash
# Serve locally (any static server)
python3 -m http.server 8000
# Then open http://localhost:8000
```

## Tests

Open `tests/calculator.test.html` in a browser. The page title changes to "FAILING TESTS" if any assertion fails; otherwise all assertions pass and you can read the `pre` output.

## Deploy

```bash
npx vercel --prod
```

## Structure

- `index.html` — the letter
- `styles.css` — Howard Marks design system
- `app.js` — calculator math + UI bindings + hover annotations + footnotes + audio
- `assets/` — audio.mp3, favicon, og-image
- `citations/` — source list (markdown + downloadable PDF)
- `tests/` — in-browser unit tests for calculator math
