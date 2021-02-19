const grid = document.querySelector(".grid");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const scoreDisplay = document.getElementById("score");
const buttonUp = document.getElementById("up")
const buttonDown = document.getElementById("down")
const buttonLeft = document.getElementById("left")
const buttonRight = document.getElementById("right")

//Initial values
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let width = 10;
let appleIndex = 0;
let score = 0;
scoreDisplay.textContent = score;
let intervalTime = 1000;
let speed = 0.8
let timerId = 0

const createGrid = () => {
    for (i = 0; i < width * width; i++) {
        const square = document.createElement('div');
        square.classList.add('squares');
        grid.appendChild(square);
        squares.push(square);
    }
};
createGrid();

currentSnake.forEach(blockOfSnake => squares[blockOfSnake].classList.add('snake'))

const resetGame = () => {
    currentSnake.forEach(partOfSnake => squares[partOfSnake].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [2, 1, 0]
    score = 0
    direction = 1
    scoreDisplay.textContent = score;
    currentSnake.forEach(resettedSnakePart => squares[resettedSnakePart].classList.add('snake'))
}

const startNewGame = () => {
    resetGame()
    generateApple()
    timerId = setInterval(moveSnake, intervalTime)
}

const moveSnake = () => {
    if (
        (currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains('snake'))
        return clearInterval(timerId);

    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)

    if (squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        generateApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(moveSnake, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
};

const generateApple = () => {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}

const controlSnake = (event) => {
    switch (true) {
        case (event.target.id === "right") || (event.keyCode === 39):
            direction = 1;
            break;
        case (event.target.id === "up") || (event.keyCode === 38):
            direction = -width;
            break;
        case (event.target.id === "left") || (event.keyCode === 37):
            direction = -1;
            break;
        case (event.target.id === "down") || (event.keyCode === 40):
            direction = + width;
            break;
        default:
            return console.log('default')
    }
}

const stopGame = () => {
    clearInterval(timerId)
}

document.addEventListener('keydown', controlSnake)
startButton.addEventListener('click', startNewGame)
resetButton.addEventListener('click', resetGame)
stopButton.addEventListener('click', stopGame)

buttonUp.addEventListener('click', controlSnake)
buttonDown.addEventListener('click', controlSnake)
buttonLeft.addEventListener('click', controlSnake)
buttonRight.addEventListener('click', controlSnake)