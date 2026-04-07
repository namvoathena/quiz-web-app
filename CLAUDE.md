# Quiz Web App

## Build & Run

- Install: `npm install`
- Start: `npm start` (serves on http://localhost:3000)
- Test: `npm test`
- Lint: `npm run lint`
- Format: `npm run format`

## Architecture

- index.html — entry point, all screens (start, quiz, results)
- src/scripts/config.js — game constants (points, timers, streak thresholds)
- src/scripts/questions.js — question bank (10+ questions, multiple categories)
- src/scripts/app.js — quiz engine (flow, timer, scoring, UI updates)
- src/scripts/leaderboard.js — top 10 scores in localStorage
- src/scripts/audio.js — Web Audio API sound effects
- src/styles/index.css — all styles, animations, responsive layout
- tests/ — jest tests for app, leaderboard, questions

## Coding Conventions

- Vanilla HTML/CSS/JS — no frameworks, no build step
- ES modules (`type="module"` in script tags, `import`/`export` in JS)
- Strict equality (`===`), never loose (`==`)
- Responsive layout — mobile-first, works on all viewports
- No console errors in production
- All constants in `config.js`, never hardcoded in logic
- Functions should be small and single-purpose
- DOM queries cached at module load, not repeated

## NEVER

- Do not use external CDN dependencies without asking
- Do not store sensitive data in localStorage
- Do not leave console.log statements in final code
- Do not use `var` — use `const` by default, `let` when reassignment is needed

## Verification

1. `npm test` — all tests pass
2. `npm run lint` — no errors
3. Open `index.html` in browser — full quiz flow works end to end
4. No console errors in DevTools
5. Responsive on mobile viewport (375px width)
6. Leaderboard persists across page reloads
7. Timer auto-skips correctly when time runs out
