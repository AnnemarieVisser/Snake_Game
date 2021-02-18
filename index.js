const grid = document.querySelector(".grid");
const startButton = document.getElementById("start");
const scoreDisplay = document.getElementById("score");

let squares = [];
//snek starts off 3 blocks long
let currentSnake = [2, 1, 0];
//snek starts moving right
let direction = 1;
//width of grid
let width = 10;
//Index to place apple for snek to eat
let appleIndex = 0;
// Set score to start at 0
let score = 0;
scoreDisplay.textContent = score;
//Set standard movement speed to 1000 ms
let intervalTime = 1000;
//Set the speed increase
let speed = 0.8
//set timerId
let timerId = 0

//Create full grid in which to play Snake (100 divs that will be colored)
const createGrid = () => {
    for (i = 0; i < width * width; i++) {
        //create a div
        const square = document.createElement('div');
        //add classlist to color block with CSS
        square.classList.add('squares');
        //append the created grid to the square
        grid.appendChild(square);
        //push the square into the squares array
        squares.push(square);
    }
};
createGrid();

//create starting snek
currentSnake.forEach(blockOfSnake => squares[blockOfSnake].classList.add('snake'))

function startNewGame() {
    //remove snake
    currentSnake.forEach(partOfSnake => squares[partOfSnake].classList.remove('snake'))
    //remove apple
    squares[appleIndex].classList.remove('apple')
    //Reset everything to default values
    clearInterval(timerId)
    currentSnake = [2, 1, 0]
    score = 0
    direction = 1
    intervalTime = 1000
    //Add resetted score to browser
    scoreDisplay.textContent = score;
    //generate new apple
    generateApples()
    //Add snek class to new currentSnake
    currentSnake.forEach(resettedSnakePart => squares[resettedSnakePart].classList.add('snake'))
    // Start Moving snek on set interval
    timerId = setInterval(moveSnake, intervalTime)
}

const moveSnake = () => {
    //check if snake has reached an edge, if so, don't move
    if (
        //if snake has hit bottom and is going down
        (currentSnake[0] + width >= width * width && direction === width) ||
        //if snake has hit right wall and is going right
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        //if snake has hit left wall and is going left
        (currentSnake[0] % width === 0 && direction === -1) ||
        //if snake has hit top and is going up
        (currentSnake[0] - width < 0 && direction === -width) ||
        //snake goes into itself
        squares[currentSnake[0] + direction].classList.contains('snake')
    )
        //stop the snake from moving
        return clearInterval(timerId);

    //otherwise continue moving loop
    //remove last element from currentSnake
    const tail = currentSnake.pop()
    //remove styling from last element
    squares[tail].classList.remove('snake')
    //add square in right direction
    currentSnake.unshift(currentSnake[0] + direction)

    //deal with snek head getting apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        //remove apple
        squares[currentSnake[0]].classList.remove('apple')
        //grow snek by one
        squares[tail].classList.add('snake')
        //grow snek array
        currentSnake.push(tail)
        //generate new apple
        generateApples()
        //add one to score
        score++
        //display score
        scoreDisplay.textContent = score

        //clear old interval
        clearInterval(timerId)
        //speed up snek
        intervalTime = intervalTime * speed
        //set new interval
        timerId = setInterval(moveSnake, intervalTime)
    }



    //add styling to represent snek
    squares[currentSnake[0]].classList.add('snake')
};

//Generate apples for snek to eat
function generateApples() {
    do {
        //get a random number which correlates with a grid square
        appleIndex = Math.floor(Math.random() * squares.length);
        //while head of snek is on the apple
    } while (squares[appleIndex].classList.contains('snake'))
    //then change one square to be the apple
    squares[appleIndex].classList.add('apple')
}
//invoke apple function to create an apple on the grid
generateApples()

//let the snake change direction by passing through the keydown event from the eventlistener
const control = (event) => {
    if (event.keyCode === 39) {
        //move right
        direction = 1;
    } else if (event.keyCode === 38) {
        //move up
        direction = -width;
    } else if (event.keyCode === 37) {
        //move left
        direction = -1;
    } else if (event.keyCode === 40) {
        //move down
        direction = + width;
    } else {
        //not a valid key
        console.log('no valid key pressed')
    }
}
//Event listener for the direction changes
document.addEventListener('keydown', control)
//Event listener to start game
startButton.addEventListener('click', startNewGame)