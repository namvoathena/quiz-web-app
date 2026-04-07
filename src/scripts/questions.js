const QUESTIONS = [
  {
    question: 'What does HTML stand for?',
    answers: [
      'Hyper Text Markup Language',
      'High Tech Modern Language',
      'Hyper Transfer Markup Language',
      'Home Tool Markup Language',
    ],
    correct: 0,
  },
  {
    question: 'Which CSS property controls text size?',
    answers: ['font-style', 'text-size', 'font-size', 'text-style'],
    correct: 2,
  },
  {
    question: 'What keyword declares a constant in JavaScript?',
    answers: ['var', 'let', 'static', 'const'],
    correct: 3,
  },
  {
    question: 'Which method selects an element by its ID?',
    answers: [
      'document.querySelector()',
      'document.getElementById()',
      'document.getElement()',
      'document.findById()',
    ],
    correct: 1,
  },
  {
    question: 'What does CSS stand for?',
    answers: [
      'Creative Style Sheets',
      'Cascading Style Sheets',
      'Computer Style Sheets',
      'Colorful Style Sheets',
    ],
    correct: 1,
  },
  {
    question: 'Which operator checks strict equality in JavaScript?',
    answers: ['==', '===', '!=', '='],
    correct: 1,
  },
  {
    question: 'What tag is used for the largest heading in HTML?',
    answers: ['<heading>', '<h6>', '<h1>', '<head>'],
    correct: 2,
  },
  {
    question: 'Which array method adds an element to the end?',
    answers: ['push()', 'pop()', 'shift()', 'unshift()'],
    correct: 0,
  },
  {
    question: 'What does JSON stand for?',
    answers: [
      'JavaScript Object Naming',
      'JavaScript Oriented Notation',
      'JavaScript Object Notation',
      'Java Source Open Notation',
    ],
    correct: 2,
  },
  {
    question: 'Which event fires when the DOM is fully loaded?',
    answers: ['onload', 'DOMContentLoaded', 'ready', 'DOMReady'],
    correct: 1,
  },
];

export function getQuestions() {
  return [...QUESTIONS];
}
