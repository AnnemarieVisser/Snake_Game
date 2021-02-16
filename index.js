const grid = document.querySelector(".grid");
const startButton = document.getElementById("start");
const score = document.getElementById("score");

let squares = [];

const createGrid = () => {

    for (i = 0; i < 100; i++) {
        const square = document.createElement('div');
        square.classList.add('squares');
        grid.appendChild(square);
        squares.push(square);
    }
};

createGrid();

