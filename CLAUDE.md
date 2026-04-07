# Quiz Web App

## Build & Run

- Install: `npm install`
- Start: `npm start` (serves on http://localhost:3000)
- Test: `npm test`
- Lint: `npm run lint`
- Format: `npm run format`

## Architecture

- index.html — entry point, contains all screen layouts (start, quiz, results)
- src/scripts/ — quiz engine, game config, question bank, leaderboard, and audio logic
- src/styles/ — all styles, animations, and responsive layout
- tests/ — jest unit tests for core modules

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
