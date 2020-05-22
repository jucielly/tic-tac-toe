const X_CLASS = "x"
const CIRCLE_CLASS = "circle"

const cellElements = document.querySelectorAll("[data-cell]")
const board = document.getElementById("board")
let circleTurn = ""


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

const handleClick = (e) => {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)

    swapTurns()
    setBoardHoverClass()
}


const startGame = () => {
    cellElements.forEach(cell => {
        cell.addEventListener("click", handleClick, {
            once: true
        })
    })

}