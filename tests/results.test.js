import { calculateResults, formatResults } from '../src/scripts/results.js';
import { createScoring } from '../src/scripts/scoring.js';

describe('calculateResults', () => {
  let scoring;

  beforeEach(() => {
    scoring = createScoring();
  });

  test('returns correct score from scoring', () => {
    scoring.recordAnswer(true);
    scoring.recordAnswer(true);
    scoring.recordAnswer(false);
    const results = calculateResults(scoring, 3, 0, 10000);
    expect(results.score).toBe(20);
  });

  test('returns correct accuracy percentage', () => {
    scoring.recordAnswer(true);
    scoring.recordAnswer(false);
    scoring.recordAnswer(true);
    scoring.recordAnswer(false);
    const results = calculateResults(scoring, 4, 0, 5000);
    expect(results.accuracy).toBe(50);
  });

  test('returns elapsed time in seconds', () => {
    const results = calculateResults(scoring, 0, 1000, 16000);
    expect(results.totalTime).toBe(15);
  });

  test('rounds elapsed time to nearest second', () => {
    const results = calculateResults(scoring, 0, 0, 7600);
    expect(results.totalTime).toBe(8);
  });

  test('returns 0s for instant completion', () => {
    const results = calculateResults(scoring, 0, 5000, 5000);
    expect(results.totalTime).toBe(0);
  });

  test('returns 0 accuracy when no questions', () => {
    const results = calculateResults(scoring, 0, 0, 1000);
    expect(results.accuracy).toBe(0);
  });

  test('returns 100% accuracy when all correct', () => {
    scoring.recordAnswer(true);
    scoring.recordAnswer(true);
    scoring.recordAnswer(true);
    const results = calculateResults(scoring, 3, 0, 5000);
    expect(results.accuracy).toBe(100);
  });

  test('returns 0% accuracy when all wrong', () => {
    scoring.recordAnswer(false);
    scoring.recordAnswer(false);
    const results = calculateResults(scoring, 2, 0, 5000);
    expect(results.accuracy).toBe(0);
  });
});

describe('formatResults', () => {
  test('formats score as string', () => {
    const formatted = formatResults({ score: 50, accuracy: 75, totalTime: 30 });
    expect(formatted.score).toBe('50');
  });

  test('formats accuracy with percent sign', () => {
    const formatted = formatResults({ score: 0, accuracy: 80, totalTime: 10 });
    expect(formatted.accuracy).toBe('80%');
  });

  test('formats total time with seconds suffix', () => {
    const formatted = formatResults({ score: 0, accuracy: 0, totalTime: 45 });
    expect(formatted.totalTime).toBe('45s');
  });

  test('formats zero values correctly', () => {
    const formatted = formatResults({ score: 0, accuracy: 0, totalTime: 0 });
    expect(formatted.score).toBe('0');
    expect(formatted.accuracy).toBe('0%');
    expect(formatted.totalTime).toBe('0s');
  });

  test('formats perfect score correctly', () => {
    const formatted = formatResults({ score: 100, accuracy: 100, totalTime: 120 });
    expect(formatted.score).toBe('100');
    expect(formatted.accuracy).toBe('100%');
    expect(formatted.totalTime).toBe('120s');
  });
});
