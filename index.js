const grid = document.querySelector(".grid");
const startButton = document.getElementById("start");
const score = document.getElementById("score");

let squares = [];
let currentSnake = [2, 1, 0];

const createGrid = () => {

    for (i = 0; i < 100; i++) {
        const square = document.createElement('div');
        square.classList.add('squares');
        grid.appendChild(square);
        squares.push(square);
    }
};
createGrid();

currentSnake.forEach(blockOfSnake => squares[blockOfSnake].classList.add('snake'))

const moveSnake = () => {
    //remove last element from currentSnake
    const tail = currentSnake.pop()
    //remove styling from last element
    squares[tail].classList.remove('snake')
    //add square in right direction

    //add styling to represent snek
};

moveSnake();