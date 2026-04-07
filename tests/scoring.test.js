import { createScoring } from '../src/scripts/scoring.js';
import { CONFIG } from '../src/scripts/config.js';

describe('scoring', () => {
  let scoring;

  beforeEach(() => {
    scoring = createScoring();
  });

  test('initial score is 0', () => {
    expect(scoring.getScore()).toBe(0);
    expect(scoring.getCorrectCount()).toBe(0);
  });

  test('correct answer adds points', () => {
    scoring.recordAnswer(true);
    expect(scoring.getScore()).toBe(CONFIG.POINTS_PER_QUESTION);
    expect(scoring.getCorrectCount()).toBe(1);
  });

  test('wrong answer does not add points', () => {
    scoring.recordAnswer(false);
    expect(scoring.getScore()).toBe(0);
    expect(scoring.getCorrectCount()).toBe(0);
  });

  test('multiple correct answers accumulate', () => {
    scoring.recordAnswer(true);
    scoring.recordAnswer(true);
    scoring.recordAnswer(true);
    expect(scoring.getScore()).toBe(CONFIG.POINTS_PER_QUESTION * 3);
    expect(scoring.getCorrectCount()).toBe(3);
  });

  test('mixed answers track correctly', () => {
    scoring.recordAnswer(true);
    scoring.recordAnswer(false);
    scoring.recordAnswer(true);
    scoring.recordAnswer(false);
    expect(scoring.getScore()).toBe(CONFIG.POINTS_PER_QUESTION * 2);
    expect(scoring.getCorrectCount()).toBe(2);
  });

  test('reset clears score and correct count', () => {
    scoring.recordAnswer(true);
    scoring.recordAnswer(true);
    scoring.reset();
    expect(scoring.getScore()).toBe(0);
    expect(scoring.getCorrectCount()).toBe(0);
  });

  test('getAccuracy returns correct percentage', () => {
    scoring.recordAnswer(true);
    scoring.recordAnswer(false);
    scoring.recordAnswer(true);
    scoring.recordAnswer(false);
    expect(scoring.getAccuracy(4)).toBe(50);
  });

  test('getAccuracy returns 0 for zero total questions', () => {
    expect(scoring.getAccuracy(0)).toBe(0);
  });

  test('getAccuracy rounds to nearest integer', () => {
    scoring.recordAnswer(true);
    expect(scoring.getAccuracy(3)).toBe(33);
  });
});

describe('streak bonus', () => {
  let scoring;

  beforeEach(() => {
    scoring = createScoring();
  });

  test('initial streak is 0', () => {
    expect(scoring.getStreak()).toBe(0);
    expect(scoring.getMultiplier()).toBe(1);
  });

  test('correct answers increment streak', () => {
    scoring.recordAnswer(true);
    expect(scoring.getStreak()).toBe(1);
    scoring.recordAnswer(true);
    expect(scoring.getStreak()).toBe(2);
  });

  test('wrong answer resets streak to 0', () => {
    scoring.recordAnswer(true);
    scoring.recordAnswer(true);
    scoring.recordAnswer(false);
    expect(scoring.getStreak()).toBe(0);
    expect(scoring.getMultiplier()).toBe(1);
  });

  test('2x multiplier activates after 3 correct in a row', () => {
    scoring.recordAnswer(true);
    scoring.recordAnswer(true);
    scoring.recordAnswer(true);
    expect(scoring.getStreak()).toBe(3);
    expect(scoring.getMultiplier()).toBe(CONFIG.STREAK_2X_MULTIPLIER);
  });

  test('3x multiplier activates after 5 correct in a row', () => {
    for (let i = 0; i < 5; i++) {
      scoring.recordAnswer(true);
    }
    expect(scoring.getStreak()).toBe(5);
    expect(scoring.getMultiplier()).toBe(CONFIG.STREAK_3X_MULTIPLIER);
  });

  test('2x multiplier applies starting from 4th correct answer', () => {
    // Answers 1-3: streak 0,1,2 → 1x each = 30
    scoring.recordAnswer(true);
    scoring.recordAnswer(true);
    scoring.recordAnswer(true);
    const scoreAfter3 = CONFIG.POINTS_PER_QUESTION * 3;
    expect(scoring.getScore()).toBe(scoreAfter3);

    // Answer 4: streak 3 → 2x = 20
    scoring.recordAnswer(true);
    expect(scoring.getScore()).toBe(scoreAfter3 + CONFIG.POINTS_PER_QUESTION * CONFIG.STREAK_2X_MULTIPLIER);
  });

  test('3x multiplier applies starting from 6th correct answer', () => {
    // Answers 1-3: 1x each = 30
    // Answers 4-5: 2x each = 40
    for (let i = 0; i < 5; i++) {
      scoring.recordAnswer(true);
    }
    const scoreAfter5 =
      CONFIG.POINTS_PER_QUESTION * 3 +
      CONFIG.POINTS_PER_QUESTION * CONFIG.STREAK_2X_MULTIPLIER * 2;
    expect(scoring.getScore()).toBe(scoreAfter5);

    // Answer 6: streak 5 → 3x = 30
    scoring.recordAnswer(true);
    expect(scoring.getScore()).toBe(scoreAfter5 + CONFIG.POINTS_PER_QUESTION * CONFIG.STREAK_3X_MULTIPLIER);
  });

  test('streak resets on timeout (wrong answer)', () => {
    scoring.recordAnswer(true);
    scoring.recordAnswer(true);
    scoring.recordAnswer(true);
    expect(scoring.getMultiplier()).toBe(CONFIG.STREAK_2X_MULTIPLIER);

    scoring.recordAnswer(false);
    expect(scoring.getStreak()).toBe(0);
    expect(scoring.getMultiplier()).toBe(1);
  });

  test('reset clears streak', () => {
    scoring.recordAnswer(true);
    scoring.recordAnswer(true);
    scoring.recordAnswer(true);
    scoring.reset();
    expect(scoring.getStreak()).toBe(0);
    expect(scoring.getMultiplier()).toBe(1);
  });

  test('streak rebuilds after reset by wrong answer', () => {
    scoring.recordAnswer(true);
    scoring.recordAnswer(true);
    scoring.recordAnswer(false);
    scoring.recordAnswer(true);
    scoring.recordAnswer(true);
    scoring.recordAnswer(true);
    expect(scoring.getStreak()).toBe(3);
    expect(scoring.getMultiplier()).toBe(CONFIG.STREAK_2X_MULTIPLIER);
  });
});
