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
