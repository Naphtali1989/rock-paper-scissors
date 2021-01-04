'use strict';

const gOptions = ['paper', 'scissors', 'rock']
var gScore = localStorage.score || 0
let gStatus

function initGame() {
    const elBtns = document.querySelectorAll('.option-btn')
    elBtns.forEach(elBtn => {
        elBtn.addEventListener('click', (ev) => checkUserChoice(elBtn, elBtn.name))
    })

    const elRulesBtns = document.querySelectorAll('.rules-btn')
    elRulesBtns.forEach(elBtn => {
        elBtn.addEventListener('click', (ev) => toggleRulesModal())
    })

    const elRestartBtn = document.querySelector('.restart-btn')
    elRestartBtn.addEventListener('click', (ev) => restartGame())
    const elScore = document.querySelector('.score-num')
    elScore.innerText = +gScore
}

function checkUserChoice(el, value) {
    const cpuChoice = getCpuChoice()

    if (value === cpuChoice) gStatus = 'draw'
    else if (value === 'paper' && cpuChoice === 'rock' ||
        value === 'scissors' && cpuChoice === 'paper' ||
        value === 'rock' && cpuChoice === 'scissors') gStatus = 'win'
    else gStatus = 'lose'

    const elCpuOption = document.querySelector(`[name=${cpuChoice}]`).cloneNode(true)
    const elUserOption = el.cloneNode(true)
    const elUserChoice = document.querySelector('.user-choice')
    const elCpuChoice = document.querySelector('.cpu-choice')
    const elAnnouncement = document.querySelector('.announcement')

    elUserChoice.appendChild(elUserOption)
    elCpuChoice.appendChild(elCpuOption)
    elAnnouncement.innerText = gStatus === 'draw' ? 'Draw!' : `You ${gStatus}!`

    gScore = (gStatus === 'win') ? +gScore + 1 : +gScore
    const elScore = document.querySelector('.score-num')

    elScore.innerText = +gScore
    localStorage.setItem('score', gScore)

    toggleBoard()
    toggleModal()
}

function getCpuChoice() {
    return gOptions[Math.floor(Math.random() * gOptions.length)]
}

function toggleModal() {
    const elModal = document.querySelector('.choices-board')
    elModal.classList.toggle('hide')
}

function toggleRulesModal() {
    const elModal = document.querySelector('.rules-modal')
    elModal.classList.toggle('hide')
}

function toggleBoard() {
    const elOptionBoard = document.querySelector('.options-board')
    elOptionBoard.classList.toggle('hide')
}

function restartGame() {
    const elUserChoice = document.querySelector('.user-choice')
    const elCpuChoice = document.querySelector('.cpu-choice')
    elUserChoice.innerHTML = ''
    elCpuChoice.innerHTML = ''

    toggleBoard()
    toggleModal()
}