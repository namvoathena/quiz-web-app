import { CONFIG } from './config.js';

export function createScoring() {
  let score = 0;
  let correctCount = 0;

  function recordAnswer(isCorrect) {
    if (isCorrect) {
      score += CONFIG.POINTS_PER_QUESTION;
      correctCount++;
    }
  }

  function reset() {
    score = 0;
    correctCount = 0;
  }

  function getScore() {
    return score;
  }

  function getCorrectCount() {
    return correctCount;
  }

  function getAccuracy(totalQuestions) {
    if (totalQuestions === 0) {
      return 0;
    }
    return Math.round((correctCount / totalQuestions) * 100);
  }

  return { recordAnswer, reset, getScore, getCorrectCount, getAccuracy };
}
