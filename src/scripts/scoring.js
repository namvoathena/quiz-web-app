import { CONFIG } from './config.js';

export function createScoring() {
  let score = 0;
  let correctCount = 0;
  let streak = 0;

  function getMultiplier() {
    if (streak >= CONFIG.STREAK_3X_THRESHOLD) {
      return CONFIG.STREAK_3X_MULTIPLIER;
    }
    if (streak >= CONFIG.STREAK_2X_THRESHOLD) {
      return CONFIG.STREAK_2X_MULTIPLIER;
    }
    return 1;
  }

  function recordAnswer(isCorrect) {
    if (isCorrect) {
      const multiplier = getMultiplier();
      score += CONFIG.POINTS_PER_QUESTION * multiplier;
      streak++;
      correctCount++;
    } else {
      streak = 0;
    }
  }

  function reset() {
    score = 0;
    correctCount = 0;
    streak = 0;
  }

  function getScore() {
    return score;
  }

  function getCorrectCount() {
    return correctCount;
  }

  function getStreak() {
    return streak;
  }

  function getAccuracy(totalQuestions) {
    if (totalQuestions === 0) {
      return 0;
    }
    return Math.round((correctCount / totalQuestions) * 100);
  }

  return {
    recordAnswer,
    reset,
    getScore,
    getCorrectCount,
    getStreak,
    getMultiplier,
    getAccuracy,
  };
}
