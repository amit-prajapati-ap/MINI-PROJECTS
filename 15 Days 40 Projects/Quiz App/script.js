//<----------- API Call & Handling ------------>
let currQuestionIndex = 0;
let score = 0;
let questions = [];
async function generateRandomQuestions() {
    let response = await fetch(`https://opentdb.com/api.php?amount=10&category=18&type=multiple`);
    let data = await response.json();
    let questionsArray = data.results;
    const newPromise = new Promise((resolve) => {
        setTimeout(() => {
            creatingQuestion(questionsArray);
            resolve();
        }, 0);
    });
    newPromise.then(() => {
        startQuiz();
    });
}
function creatingQuestion(quesArr) {
    for (let i = 0; i < quesArr.length; i++) {
        let ques = {};
        let ansArr = [{}, {}, {}, {}];
        ques.question = quesArr[i].question;
        let randomindex = Math.floor(Math.random() * 4);
        let correctAnswer = quesArr[i].correct_answer;
        ansArr[randomindex].text = correctAnswer;
        let k = 0;
        for (let j = 0; j < 4; j++) {
            if (ansArr[j].text === correctAnswer) {
                ansArr[j].correct = true;
                continue;
            }
            ansArr[j].text = quesArr[i].incorrect_answers[k];
            ansArr[j].correct = false;
            k++;
        }
        ques.answer = ansArr;
        questions.push(ques);
        console.log(questions);
    }
}

//<----------- Question Desplaying Handling ------------>

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("ans-buttons");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-btn");
const mainButtons = document.querySelector(".buttons");
const quizDisplay = document.querySelector(".quiz");

startButton.addEventListener("click", () => {
    generateRandomQuestions();
});

function startQuiz() {
    startButton.style.display = "none";
    quizDisplay.style.display = "block";
    currQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currQuestionIndex];
    let questionNo = currQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach((answer) => {
        const ans = document.createElement("button");
        ans.innerHTML = answer.text;
        ans.classList.add("btn");
        answerButton.appendChild(ans);
        if (answer.correct) {
            ans.dataset.correct = answer.correct;
        }
        ans.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (currQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
})

function handleNextButton() {
    currQuestionIndex++;
    if (currQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    startButton.style.display = "block";
    mainButtons.style.display = "flex";
    nextButton.style.display = "block";
}
