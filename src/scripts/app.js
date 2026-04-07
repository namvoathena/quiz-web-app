import { CONFIG } from './config.js';
import { getQuestions } from './questions.js';

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

const finalScore = document.getElementById('final-score');
const accuracy = document.getElementById('accuracy');
const totalTime = document.getElementById('total-time');

// --- Game State ---
let questions = [];
let currentIndex = 0;
let score = 0;
let correctCount = 0;
let startTime = 0;

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
  score = 0;
  correctCount = 0;
  startTime = Date.now();
  updateScore();
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
}

function selectAnswer(index) {
  const q = questions[currentIndex];

  if (index === q.correct) {
    score += CONFIG.POINTS_PER_QUESTION;
    correctCount++;
  }

  updateScore();
  nextQuestion();
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function showResults() {
  const elapsed = Math.round((Date.now() - startTime) / 1000);
  const pct = Math.round((correctCount / questions.length) * 100);

  finalScore.textContent = score;
  accuracy.textContent = `${pct}%`;
  totalTime.textContent = `${elapsed}s`;

  showScreen(resultsScreen);
}

// --- Event Listeners ---
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);
