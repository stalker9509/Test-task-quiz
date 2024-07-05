import {questionElement, answerButtons, nextButton, timerElement, timePerQuestion} from './const.js'
import {questions} from './questions.js'

let currentQuestionIndex = 0
let score = 0
let timer = 0
let selectedAnswersCount = 0
let maxCorrectAnswers = 0
let allCorrectAnswersSelected = false

function startQuiz() {
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion()
}

function showQuestion() {
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

    selectedAnswersCount = 0
    maxCorrectAnswers = currentQuestion.answer.filter(answer => answer.correct).length
    allCorrectAnswersSelected = true

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("button")
        answerButtons.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })

    startTimer()
}

function resetState() {
    clearInterval(timer)
    nextButton.style.display = "none"
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const isCorrect = selectedButton.dataset.correct === "true"

    if (selectedAnswersCount < maxCorrectAnswers) {
        if (isCorrect) {
            selectedButton.classList.add("correct")
        } else {
            selectedButton.classList.add("incorrect")
            allCorrectAnswersSelected = false
        }
        selectedButton.disabled = true
        selectedAnswersCount++

        if (selectedAnswersCount === maxCorrectAnswers) {
            clearInterval(timer)
            if (allCorrectAnswersSelected) {
                score++;
            }
            Array.from(answerButtons.children).forEach(button => {
                if (button.dataset.correct === "true" && !button.classList.contains("correct")) {
                    button.classList.add("correct")
                }
                button.disabled = true
            });
            nextButton.style.display = "block"
        }
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score}/${questions.length}`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
    timerElement.style.display = "none"
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
});

function startTimer() {
    let timeLeft = timePerQuestion
    timerElement.style.display = "block"
    timerElement.innerHTML = timeLeft

    timer = setInterval(() => {
        timeLeft--
        timerElement.innerHTML = timeLeft
        if (timeLeft <= 0) {
            clearInterval(timer);
            selectAnswer({target: document.createElement('button')}); // Выбираем "неправильный" ответ
        }
    }, 1000)
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
}

function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme)
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setInitialTheme()
    startQuiz()

    const themeToggle = document.getElementById('themeToggle')
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme)
    }
});