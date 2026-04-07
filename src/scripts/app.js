import { CONFIG } from './config.js';
import { getQuestions } from './questions.js';
import { createScoring } from './scoring.js';
import { createTimer, getTimerState } from './timer.js';
import { calculateResults, formatResults } from './results.js';

// --- DOM Cache ---
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const questionNumber = document.getElementById('question-number');
const scoreDisplay = document.getElementById('score-display');
const streakDisplay = document.getElementById('streak-display');
const streakText = document.getElementById('streak-text');

const timerDisplay = document.getElementById('timer-display');
const timerBar = document.getElementById('timer-bar');

const finalScore = document.getElementById('final-score');
const accuracy = document.getElementById('accuracy');
const totalTime = document.getElementById('total-time');

const difficultyBtns = document.querySelectorAll('.difficulty-btn');

// --- Game State ---
let questions = [];
let currentIndex = 0;
let startTime = 0;
let selectedDifficulty = CONFIG.DEFAULT_DIFFICULTY;
const scoring = createScoring();

function handleTimerTick(timeLeft, total) {
  timerDisplay.textContent = timeLeft;
  timerBar.style.width = `${(timeLeft / total) * 100}%`;

  const state = getTimerState(timeLeft);
  timerDisplay.classList.remove('warning', 'danger');
  timerBar.classList.remove('warning', 'danger');
  if (state !== 'normal') {
    timerDisplay.classList.add(state);
    timerBar.classList.add(state);
  }
}

function handleTimerExpire() {
  scoring.recordAnswer(false);
  updateScore();
  updateStreak();
  nextQuestion();
}

const timer = createTimer(handleTimerTick, handleTimerExpire);

// --- Screen Management ---
function showScreen(screen) {
  startScreen.classList.remove('active');
  quizScreen.classList.remove('active');
  resultsScreen.classList.remove('active');
  screen.classList.add('active');
}

// --- Quiz Flow ---
function startQuiz() {
  questions = getQuestions();
  currentIndex = 0;
  scoring.reset();
  startTime = Date.now();
  updateScore();
  streakDisplay.hidden = true;
  showScreen(quizScreen);
  showQuestion();
}

function showQuestion() {
  const q = questions[currentIndex];
  questionText.textContent = q.question;
  questionNumber.textContent = `Question ${currentIndex + 1} / ${questions.length}`;
  answersContainer.innerHTML = '';

  q.answers.forEach((answer, index) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = answer;
    btn.addEventListener('click', () => selectAnswer(index));
    answersContainer.appendChild(btn);
  });

  const duration = CONFIG.DIFFICULTY[selectedDifficulty].timerSeconds;
  timer.start(duration);
}

function selectAnswer(index) {
  timer.stop();
  const q = questions[currentIndex];
  scoring.recordAnswer(index === q.correct);
  updateScore();
  updateStreak();
  nextQuestion();
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    timer.stop();
    showResults();
  }
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${scoring.getScore()}`;
}

function updateStreak() {
  const streak = scoring.getStreak();
  const multiplier = scoring.getMultiplier();

  if (multiplier > 1) {
    streakDisplay.hidden = false;
    streakText.textContent = `${streak} streak! ${multiplier}x points`;
    streakDisplay.className = `streak-display streak-${multiplier}x`;
  } else if (streak > 0) {
    streakDisplay.hidden = false;
    streakText.textContent = `${streak} in a row`;
    streakDisplay.className = 'streak-display';
  } else {
    streakDisplay.hidden = true;
  }
}

function showResults() {
  const results = calculateResults(scoring, questions.length, startTime, Date.now());
  const formatted = formatResults(results);

  finalScore.textContent = formatted.score;
  accuracy.textContent = formatted.accuracy;
  totalTime.textContent = formatted.totalTime;

  showScreen(resultsScreen);
}

// --- Difficulty Selection ---
difficultyBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    difficultyBtns.forEach((b) => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedDifficulty = btn.dataset.difficulty;
  });
});

// --- Event Listeners ---
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', () => showScreen(startScreen));
