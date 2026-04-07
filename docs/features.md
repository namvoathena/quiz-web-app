# Quiz Web App — Feature List

## Core Features (Must Have)

### F1: Quiz Flow
- Display one question at a time with 4 answer buttons
- Advance to next question on answer click
- Support full cycle: start screen → quiz → results screen

### F2: Scoring System
- Track points per question (correct/incorrect)
- Display running score total during the quiz

### F3: Per-Question Timer
- 15-second countdown per question
- Auto-skip to next question when time runs out
- Visual countdown indicator

### F4: Results Screen
- Show final score
- Show accuracy percentage (correct / total)
- Show total time taken

---

## Gamification Features (Pick at least 2)

### F5: Streak Bonus
- 2x point multiplier after 3 correct answers in a row
- 3x point multiplier after 5 correct answers in a row
- Reset streak on wrong answer or timeout

### F6: Leaderboard
- Save top 10 scores in localStorage
- Display leaderboard after each game
- Persist across page reloads

### F7: Difficulty Levels
- Easy: 20-second timer
- Medium: 15-second timer
- Hard: 10-second timer
- Player selects difficulty before starting

### F8: Progress Bar
- Visual indicator showing questions remaining
- Updates after each question

### F9: Animations
- Color flash on correct/wrong answer
- Shake effect on wrong answer
- Confetti on correct answer or quiz completion

### F10: Sound Effects
- Use Web Audio API (no external audio files)
- Correct answer sound
- Wrong answer sound
- Timer warning sound

---

## Bonus Features (Optional)

### F11: Custom Question Bank
- 10+ questions on a chosen topic

### F12: Categories
- Multiple categories (e.g. Claude Code, game design, general knowledge)
- Player can select category before starting

### F13: Multiplayer
- Two players take turns on the same screen
- Track scores separately
- Show winner at end

### F14: Custom Theme
- Match team branding (colors, logo, fonts)

---

## Scoring Rubric

| Criteria                                             | Points |
| ---------------------------------------------------- | ------ |
| Quiz flow works (show → answer → next → results)     | 25     |
| Scoring is correct                                   | 15     |
| Timer works with auto-skip                           | 15     |
| At least 2 gamification features                     | 20     |
| CLAUDE.md exists and is useful                       | 10     |
| Code is clean (no console errors, responsive layout) | 10     |
| Creativity bonus (extra features, polish, fun factor) | 5      |
| **Total**                                            | **100** |
