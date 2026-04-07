export const CONFIG = {
  POINTS_PER_QUESTION: 10,
  TIMER_SECONDS: 15,
  TOTAL_QUESTIONS: 10,
  STREAK_2X_THRESHOLD: 3,
  STREAK_3X_THRESHOLD: 5,
  STREAK_2X_MULTIPLIER: 2,
  STREAK_3X_MULTIPLIER: 3,
  DIFFICULTY: {
    easy: { label: 'Easy', timerSeconds: 20 },
    medium: { label: 'Medium', timerSeconds: 15 },
    hard: { label: 'Hard', timerSeconds: 10 },
  },
  DEFAULT_DIFFICULTY: 'medium',
};
