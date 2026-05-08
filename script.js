// ===============================
// PERGUNTAS DO QUIZ
// ===============================

const questions = [
  {
    question: "Qual linguagem é usada para estilizar páginas web?",
    answers: ["HTML", "Python", "CSS", "Java"],
    correct: 2
  },
  {
    question: "O que significa HTML?",
    answers: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language"
    ],
    correct: 0
  },
  {
    question: "Qual empresa criou o JavaScript?",
    answers: ["Google", "Netscape", "Microsoft", "Apple"],
    correct: 1
  },
  {
    question: "Qual destes é um banco de dados?",
    answers: ["React", "MongoDB", "Bootstrap", "Node.js"],
    correct: 1
  },
  {
    question: "Qual símbolo é usado para comentários em JavaScript?",
    answers: ["<!-- -->", "//", "#", "**"],
    correct: 1
  },
  {
    question: "Qual linguagem roda no navegador?",
    answers: ["Python", "C#", "JavaScript", "C++"],
    correct: 2
  },
  {
    question: "Qual tag HTML cria um link?",
    answers: ["<img>", "<a>", "<p>", "<link>"],
    correct: 1
  },
  {
    question: "Qual propriedade CSS muda a cor do texto?",
    answers: ["font-color", "text-color", "color", "background"],
    correct: 2
  },
  {
    question: "O que significa CPU?",
    answers: [
      "Central Processing Unit",
      "Computer Personal Unit",
      "Control Program Unit",
      "Central Program Utility"
    ],
    correct: 0
  },
  {
    question: "Qual destes NÃO é um sistema operacional?",
    answers: ["Linux", "Windows", "Photoshop", "Android"],
    correct: 2
  }
];

// ===============================
// VARIÁVEIS
// ===============================

let currentQuestion = 0;
let score = 0;
let answered = false;

// ===============================
// ELEMENTOS
// ===============================

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const progressElement = document.getElementById("progress");
const scoreElement = document.getElementById("score");

const nextBtn = document.getElementById("nextBtn");

const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");

const finalMessage = document.getElementById("final-message");

const restartBtn = document.getElementById("restartBtn");

// ===============================
// CARREGAR QUESTÃO
// ===============================

function loadQuestion() {

  answered = false;

  nextBtn.disabled = true;

  const currentQuiz = questions[currentQuestion];

  questionElement.textContent = currentQuiz.question;

  progressElement.textContent =
    `Pergunta ${currentQuestion + 1} de ${questions.length}`;

  answersElement.innerHTML = "";

  currentQuiz.answers.forEach((answer, index) => {

    const button = document.createElement("button");

    button.textContent = answer;

    button.classList.add("answer-btn");

    button.addEventListener("click", () => selectAnswer(index));

    answersElement.appendChild(button);
  });
}

// ===============================
// SELECIONAR RESPOSTA
// ===============================

function selectAnswer(selectedIndex) {

  if (answered) return;

  answered = true;

  const correctIndex = questions[currentQuestion].correct;

  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach((button, index) => {

    button.disabled = true;

    if (index === correctIndex) {
      button.classList.add("correct");
    }

    if (index === selectedIndex && index !== correctIndex) {
      button.classList.add("wrong");
    }

  });

  if (selectedIndex === correctIndex) {
    score++;
    scoreElement.textContent = `Pontuação: ${score}`;
  }

  nextBtn.disabled = false;
}

// ===============================
// PRÓXIMA QUESTÃO
// ===============================

nextBtn.addEventListener("click", () => {

  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }

});

// ===============================
// MOSTRAR RESULTADO
// ===============================

function showResult() {

  quizBox.classList.add("hidden");

  resultBox.classList.remove("hidden");

  const percentage =
    Math.round((score / questions.length) * 100);

  finalMessage.innerHTML = `
    Você acertou <strong>${score}</strong> de
    <strong>${questions.length}</strong> perguntas!
    <br><br>
    Aproveitamento: <strong>${percentage}%</strong>
  `;
}

// ===============================
// REINICIAR QUIZ
// ===============================

restartBtn.addEventListener("click", restartQuiz);

function restartQuiz() {

  currentQuestion = 0;
  score = 0;

  scoreElement.textContent = "Pontuação: 0";

  resultBox.classList.add("hidden");

  quizBox.classList.remove("hidden");

  loadQuestion();
}

// ===============================
// INICIAR QUIZ
// ===============================

loadQuestion();
