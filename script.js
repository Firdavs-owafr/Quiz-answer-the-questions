const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')


startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionsIdnex++
    setNextQuestion()
})

let shuffedQuestions, currentQuestionsIdnex

function startGame() {
    startButton.classList.add('hide')
    shuffedQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionsIdnex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestions(shuffedQuestions[currentQuestionsIdnex])
}

function showQuestions(question) {
    questionElement.innerText = question.question
    question.answer.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}


function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body,correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button,button.dataset.correct)
    })
    if(shuffedQuestions.length > currentQuestionsIdnex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element,correct) {
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}


function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is 7 * 7',
        answer: [
            {text: '4', correct: false},
            {text: '22', correct: false},
            {text: '49', correct: true},
            {text: 'I dont know', correct: false},
        ]
    },
    {
        question: 'You like coding',
        answer: [
            {text: 'Yes very', correct: true},
            {text: 'Well, Yes', correct: true},
            {text: 'NO', correct: true},
            {text: 'Sometimes', correct: true},
        ]
    },
    {
        question: 'You stole others code',
        answer: [
            {text: 'Often', correct: true},
            {text: 'No i make it myself', correct: true},
            {text: 'When I cant write myself I steal', correct: true},
            {text: 'Sometimes', correct: true},
        ]
    },
    {
        question: 'Which youtuber one do you like',
        answer: [
            {text: 'Web Dev Simplified', correct: true},
            {text: 'Samar Badriddinov', correct: true},
            {text: 'freeCodeCamp.org', correct: true},
            {text: 'Фрілансер по життю ', correct: true},
            {text: 'Владилен Минин ', correct: true},
            {text: 'Ivan Petrychenko', correct: true},
        ]
    },
]