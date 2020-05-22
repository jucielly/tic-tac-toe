const X_CLASS = "x"
const CIRCLE_CLASS = "circle"
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [6, 4, 2],
    [0, 4, 8]

]
const cellElements = document.querySelectorAll("[data-cell]")
const board = document.getElementById("board")
const winningMessage = document.querySelector(".winning-message")
const winningMessageText = document.querySelector("[data-winning-message-text]")
const restartBtn = document.getElementById("restart-btn")
let circleTurn = null



const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass)
}


const swapTurns = () => {
    circleTurn = !circleTurn
}

const setBoardHoverClass = () => {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }

}

const checkwin = (currentClass) => {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}


const isDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)

    })
}

const handleClick = (e) => {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)

    if (checkwin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}


const startGame = () => {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.addEventListener("click", handleClick, {
            once: true
        })
    })
    setBoardHoverClass()
    winningMessage.classList.remove("show")
}

startGame()



const endGame = (draw) => {
    if (draw) {
        winningMessageText.innerText = `draw!`
    } else {
        winningMessageText.innerText = `${circleTurn ? "O" : "X"} Wins!`
    }

    winningMessage.classList.add("show")

}


restartBtn.addEventListener("click",startGame)