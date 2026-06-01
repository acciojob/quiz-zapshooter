//your JS code here. If required.
const quizData = [
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Hypertext Markdown Language",
    c: "Hyperloop Machine Language",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
];

let currentQuestion = 0;
let score = 0;

// DOM references
const quiz       = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const a_text     = document.getElementById("a_text");
const b_text     = document.getElementById("b_text");
const c_text     = document.getElementById("c_text");
const d_text     = document.getElementById("d_text");
const submitBtn  = document.getElementById("submit");
const radios     = document.querySelectorAll('input[type="radio"]');

// Alert element (created dynamically)
const alert = document.createElement("div");
alert.classList.add("alert");
alert.textContent = "⚠️ Please select an answer before submitting.";
quiz.querySelector(".quiz-options").before(alert);

function loadQuestion() {
  const data = quizData[currentQuestion];
  questionEl.textContent = data.question;
  a_text.textContent     = data.a;
  b_text.textContent     = data.b;
  c_text.textContent     = data.c;
  d_text.textContent     = data.d;

  // Clear previous selection
  radios.forEach((r) => (r.checked = false));
  alert.classList.remove("show");
}

function getSelected() {
  for (const radio of radios) {
    if (radio.checked) return radio.id; // id = "a" | "b" | "c" | "d"
  }
  return null;
}

function showResult() {
  quiz.innerHTML = `
    <div class="result-header">
      <h2>You answered ${score}/${quizData.length} questions correctly</h2>
    </div>
    <button id="submit">Reload</button>
  `;

  document.getElementById("submit").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    location.reload();
  });
}

submitBtn.addEventListener("click", () => {
  const selected = getSelected();

  if (!selected) {
    alert.classList.add("show");
    return;
  }

  alert.classList.remove("show");

  if (selected === quizData[currentQuestion].correct) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

// Initialise first question
loadQuestion();