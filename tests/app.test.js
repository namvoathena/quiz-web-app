import { jest } from '@jest/globals';

function setupDOM() {
  document.body.innerHTML = `
    <div id="start-screen" class="screen start-screen active">
      <div class="difficulty-selector">
        <div class="difficulty-options">
          <button class="difficulty-btn" data-difficulty="easy">Easy</button>
          <button class="difficulty-btn selected" data-difficulty="medium">Medium</button>
          <button class="difficulty-btn" data-difficulty="hard">Hard</button>
        </div>
      </div>
      <button id="start-btn" class="btn">Start Quiz</button>
    </div>
    <div id="quiz-screen" class="screen quiz-screen">
      <span id="question-number"></span>
      <span id="timer-display" class="timer-display"></span>
      <span id="score-display"></span>
      <div id="streak-display" class="streak-display" hidden>
        <span id="streak-text"></span>
      </div>
      <div id="timer-bar" class="timer-bar"></div>
      <p id="question-text"></p>
      <div id="answers-container"></div>
    </div>
    <div id="results-screen" class="screen results-screen">
      <div id="final-score"></div>
      <div id="accuracy"></div>
      <div id="total-time"></div>
      <button id="restart-btn" class="btn">Play Again</button>
    </div>
  `;
}

describe('app - difficulty selection and quiz flow', () => {
  beforeEach(async () => {
    jest.useFakeTimers();
    setupDOM();
    // Dynamic import so app.js binds to the fresh DOM
    await import('../src/scripts/app.js');
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.resetModules();
  });

  function getActiveScreenId() {
    return document.querySelector('.screen.active')?.id;
  }

  test('start screen is active initially', () => {
    expect(getActiveScreenId()).toBe('start-screen');
  });

  test('clicking Start Quiz transitions to quiz screen', () => {
    document.getElementById('start-btn').click();
    expect(getActiveScreenId()).toBe('quiz-screen');
  });

  test('clicking Play Again returns to start screen, not quiz screen', () => {
    // Start the quiz
    document.getElementById('start-btn').click();
    expect(getActiveScreenId()).toBe('quiz-screen');

    // Answer all questions to reach results
    const totalQuestions = document.getElementById('question-number').textContent.split('/')[1].trim();
    for (let i = 0; i < Number(totalQuestions); i++) {
      const firstBtn = document.querySelector('.answer-btn');
      firstBtn.click();
    }
    expect(getActiveScreenId()).toBe('results-screen');

    // Click Play Again
    document.getElementById('restart-btn').click();
    expect(getActiveScreenId()).toBe('start-screen');
  });

  test('difficulty button selection updates the selected state', () => {
    const easyBtn = document.querySelector('[data-difficulty="easy"]');
    const mediumBtn = document.querySelector('[data-difficulty="medium"]');
    const hardBtn = document.querySelector('[data-difficulty="hard"]');

    // Medium is selected by default
    expect(mediumBtn.classList.contains('selected')).toBe(true);

    // Click easy
    easyBtn.click();
    expect(easyBtn.classList.contains('selected')).toBe(true);
    expect(mediumBtn.classList.contains('selected')).toBe(false);
    expect(hardBtn.classList.contains('selected')).toBe(false);

    // Click hard
    hardBtn.click();
    expect(hardBtn.classList.contains('selected')).toBe(true);
    expect(easyBtn.classList.contains('selected')).toBe(false);
  });

  test('selecting easy difficulty uses 20s timer', () => {
    document.querySelector('[data-difficulty="easy"]').click();
    document.getElementById('start-btn').click();

    const timerDisplay = document.getElementById('timer-display');
    expect(timerDisplay.textContent).toBe('20');
  });

  test('selecting hard difficulty uses 10s timer', () => {
    document.querySelector('[data-difficulty="hard"]').click();
    document.getElementById('start-btn').click();

    const timerDisplay = document.getElementById('timer-display');
    expect(timerDisplay.textContent).toBe('10');
  });

  test('default medium difficulty uses 15s timer', () => {
    document.getElementById('start-btn').click();

    const timerDisplay = document.getElementById('timer-display');
    expect(timerDisplay.textContent).toBe('15');
  });

  test('timer auto-skips after selected difficulty duration', () => {
    document.querySelector('[data-difficulty="hard"]').click();
    document.getElementById('start-btn').click();

    const firstQuestion = document.getElementById('question-text').textContent;

    // Advance 10s (hard difficulty timer)
    jest.advanceTimersByTime(10000);

    const secondQuestion = document.getElementById('question-text').textContent;
    expect(secondQuestion).not.toBe(firstQuestion);
  });

  test('Play Again preserves difficulty selection', () => {
    // Select hard, play through quiz
    document.querySelector('[data-difficulty="hard"]').click();
    document.getElementById('start-btn').click();

    const totalQuestions = document.getElementById('question-number').textContent.split('/')[1].trim();
    for (let i = 0; i < Number(totalQuestions); i++) {
      document.querySelector('.answer-btn').click();
    }

    // Go back to start screen
    document.getElementById('restart-btn').click();
    expect(getActiveScreenId()).toBe('start-screen');

    // Hard should still be selected
    expect(document.querySelector('[data-difficulty="hard"]').classList.contains('selected')).toBe(true);
  });
});
