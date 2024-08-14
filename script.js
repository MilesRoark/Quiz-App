const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
  {
    question: "Which European country was the first to reach India by sea?",
    answers: [
      { text: "Portugal", correct: true },
      { text: "England", correct: false },
      { text: "Spain", correct: false },
      { text: "France", correct: false },
    ],
  },
  {
    question: "The Mona Lisa was painted by which famous artist?",
    answers: [
      { text: "Raffaello Sanzio da Urbino", correct: false },
      { text: "Leonardo Da Vinci", correct: true },
      { text: "Donato di Niccolò di Betto Bardi", correct: false },
      { text: "Michelangelo di Lodovico Buonarroti Simoni", correct: false },
    ],
  },
  {
    question: "Who was the first actor to play James Bond in the film series?",
    answers: [
      { text: "Sean Connery", correct: true },
      { text: "Pierce Brosnan", correct: false },
      { text: "Roger Moore", correct: false },
      { text: "Daniel Craig", correct: false },
    ],
  },
  {
    question: "What is the capital city of Australia?",
    answers: [
      { text: "Perth", correct: false },
      { text: "Melbourne", correct: false },
      { text: "Sydney", correct: false },
      { text: "Canberra", correct: true },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "fe", correct: false },
      { text: "xy", correct: false },
      { text: "Au", correct: true },
      { text: "Na", correct: false },
    ],
  },
];

startQuiz();

function startQuiz() {
  score = 0;
  questionContainer.style.display = "flex";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  nextButton.classList.remove("hide");
  restartButton.classList.add("hide");
  resultDiv.classList.add("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  const answerIndex = Array.from(
    answerButtons.querySelectorAll("input")
  ).findIndex((radio) => radio.checked);
  if (answerIndex !== -1) {
    if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct) {
      score++;
    }
    currentQuestionIndex++;
    if (shuffledQuestions.length > currentQuestionIndex) {
      setNextQuestion();
    } else {
      endQuiz();
    }
  } else {
    alert("Please select an answer");
  }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
  questionContainer.style.display = "none";
  nextButton.classList.add("hide");
  restartButton.classList.remove("hide");
  resultDiv.classList.remove("hide");
  resultDiv.innerText = `Your Final Score: ${score} / ${shuffledQuestions.length}`;
}
