import { getQuestions } from '../src/scripts/questions.js';

describe('questions', () => {
  test('getQuestions returns an array of 10 questions', () => {
    const questions = getQuestions();
    expect(questions).toHaveLength(10);
  });

  test('each question has required fields', () => {
    const questions = getQuestions();
    questions.forEach((q) => {
      expect(q).toHaveProperty('question');
      expect(q).toHaveProperty('answers');
      expect(q).toHaveProperty('correct');
      expect(q.answers).toHaveLength(4);
      expect(q.correct).toBeGreaterThanOrEqual(0);
      expect(q.correct).toBeLessThan(4);
    });
  });

  test('getQuestions returns a copy, not the original', () => {
    const a = getQuestions();
    const b = getQuestions();
    expect(a).not.toBe(b);
    expect(a).toEqual(b);
  });
});
