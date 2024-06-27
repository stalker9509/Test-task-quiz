const questions = [
    {
        question: "How many planets are in the solar system?",
        answer: [
            {text: "8", correct: true},
            {text: "9", correct: false},
            {text: "10", correct: false},
        ]
    },
    {
        question: "What is the freezing point of water?",
        answer: [
            {text: "0", correct: true},
            {text: "-5", correct: false},
            {text: "-6", correct: false},
        ]
    },
    {
        question: "What is the longest river in the world?",
        answer: [
            {text: "Nile", correct: true},
            {text: "Amazon", correct: false},
            {text: "Yangtze", correct: false},
        ]
    },
    {
        question: "How many chromosomes are in the human genome?",
        answer: [
            {text: "42", correct: false},
            {text: "44", correct: false},
            {text: "46", correct: true},
        ]
    },
    {
        question: "Which of these characters are friends with Harry Potter?",
        answer: [
            {text: "Ron Weasley", correct: true},
            {text: "Draco Malfoy", correct: false},
            {text: "Hermione Granger", correct: true},
        ]
    },
    {
        question: "What is the capital of Canada?",
        answer: [
            {text: "Toronto", correct: false},
            {text: "Ottawa", correct: true},
            {text: "Vancouver", correct: false},
        ]
    },
    {
        question: "What is the Jewish New Year called? ",
        answer: [
            {text: "Hanukkah", correct: true},
            {text: "Yom Kippur", correct: false},
            {text: "Kwanzaa", correct: false},
        ]
    },
]

const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answerButtons")
const nextButton = document.getElementById("nextButton")

let currentQuestionIndex
let score
let selectedAnswersCount

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion()
}

function showQuestion() {
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

    const correctAnswersCount = currentQuestion.answer.filter(answer => answer.correct).length
    selectedAnswersCount = 0

    currentQuestion.answer.forEach(answer => {
        const btn = document.createElement("button")
        btn.innerHTML = answer.text
        btn.classList.add("button")
        answerButtons.appendChild(btn)
        if (answer.correct) {
            btn.dataset.correct = answer.correct
        }
        btn.addEventListener("click", (e) => selectAnswer(e, correctAnswersCount))
    })
}

function resetState() {
    nextButton.style.display = "none"
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e, correctAnswersCount) {
    const selectedButton = e.target
    const isCorrect = selectedButton.dataset.correct === "true"

    if (correctAnswersCount === 1) {
        handleSingleAnswer(selectedButton, isCorrect)
    } else {
        handleMultipleAnswer(selectedButton, isCorrect, correctAnswersCount)
    }
}

function handleSingleAnswer(selectedButton, isCorrect) {
    if (isCorrect) {
        selectedButton.classList.add("correct")
        score++
    } else {
        selectedButton.classList.add("incorrect")
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = true
    })

    nextButton.style.display = "block"
}

function handleMultipleAnswer(selectedButton, isCorrect, correctAnswersCount) {
    if (!selectedButton.disabled) {
        if (isCorrect) {
            selectedButton.classList.add("correct")
        } else {
            selectedButton.classList.add("incorrect")
        }
        selectedButton.disabled = true
        selectedAnswersCount++

        if (selectedAnswersCount === correctAnswersCount) {
            Array.from(answerButtons.children).forEach(button => {
                button.disabled = true
                if (button.dataset.correct === "true" && !button.classList.contains("correct")) {
                    button.classList.add("correct")
                }
            })
            calculateScore()
            nextButton.style.display = "block"
        }
    }
}

function calculateScore() {
    const currentQuestion = questions[currentQuestionIndex]
    const selectedCorrect = Array.from(answerButtons.children)
        .filter(button => button.classList.contains("correct") && button.disabled)
        .length
    const totalCorrect = currentQuestion.answer.filter(answer => answer.correct).length

    if (selectedCorrect === totalCorrect) {
        score++
    }
}

function showScore() {
    resetState()
    questionElement.innerHTML = `Score ${score}/${questions.length}`;
    nextButton.innerHTML = "Play again"
    nextButton.style.display = "block"
}

function handleNextButton() {
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        showScore()
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton()
    } else {
        startQuiz()
    }
})

startQuiz()