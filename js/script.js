"use strict"

/**
 * @type {HTMLDivElement}
 */
// @ts-ignore
const gridGame = document.querySelector(".sticker-stacker-grid-container");

/**
 * @type {HTMLButtonElement}
 */
// @ts-ignore
const stackBtn = document.querySelector(".stack-btn");

/**
 * @type {HTMLDivElement}
 */
// @ts-ignore
const endGameScreen = document.querySelector(".end-game-screen");

/**
 * @type {HTMLTitleElement}
 */
// @ts-ignore
const endGameText = document.querySelector(".end-game-text");

/**
 * @type {HTMLDivElement}
 */
// @ts-ignore
const counterScore = document.querySelector(".counter-score");

/**
 * @type {HTMLButtonElement}
 */
// @ts-ignore
const playAgainBtn = document.querySelector(".play-again-btn");

/**
 * @type {number[][]}
 */
const gridMatrix = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0],
];

/**
 * @type {number}
 */
let currentRowIndex = gridMatrix.length - 1;

/**
 * @type {string}
 */
let barDirection = "right";

/**
 * @type {number}
 */
let barSize = 3;

let timer;

/**
 * @type {number}
 */
let score = 0;

/**
 * @type {boolean}
 */
let isVictory = false;

// TODO: Implementation of the sticker stacker grid

/**
 * This function draws the grid of the sticker stacker game
 */

function draw() {

    gridGame.innerHTML = "";

    gridMatrix.forEach((rowContent, rowIndex) => {

        rowContent.forEach((cellContent, cellIndex) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            const isRowEven = rowIndex % 2 === 0;
            const isCellEven = cellIndex % 2 === 0;

            if ((isRowEven && isCellEven) || (!isRowEven && !isCellEven)) {

                cell.classList.add("cell-dark");

            }

            if (cellContent === 1) {
                cell.classList.add("bar");
            }


            gridGame.append(cell);
        });

    });
};

// TODO: Updating of the movement of the orange bar inside the rows of the sticker stacker grid

/**
 * This function moves the orange bar on the right
 * @param {number[]} currentRow is the index of the current row of the grid matrix
 */

function moveBarRight(currentRow) {
    currentRow.pop();
    currentRow.unshift(0);
    console.log(currentRow);
};

/**
 * This function moves the orange bar on the left
 * @param {number[]} currentRow is the index of the current row of the grid matrix
 */

function moveBarLeft(currentRow) {
    currentRow.shift();
    currentRow.push(0);
    console.log(currentRow);
};

/**
 * This function sets up if the orange bar reaches the right edge of the current row of the matrix grid
 * @param {number[]} currentRow 
 * @returns {boolean}
 */

function isRightEdge(currentRow) {
    const lastElement = currentRow[currentRow.length - 1];
    return lastElement === 1;
};

/**
 * This function sets up if the orange bar reaches the left edge of the current row of the matrix grid
 * @param {number[]} currentRow 
 */

function isLeftEdge(currentRow) {
    const firstElement = currentRow[0];
    return firstElement === 1;
};

/**
 * This function handles the movement of the orange bar both on the right and the left.
 */

function moveBar() {

    /**
     * @type {number[]}
     */
    const currentRowMatrix = gridMatrix[currentRowIndex];

    if (barDirection === "right") {
        moveBarRight(currentRowMatrix);

        if (isRightEdge(currentRowMatrix)) {
            barDirection = "left";
        }

    } else if (barDirection === "left") {
        moveBarLeft(currentRowMatrix);

        if (isLeftEdge(currentRowMatrix)) {
            barDirection = "right";
        }

    }
};

function main() {
    moveBar();
    draw();
};

draw();

// TODO: Updating of the orange bar on the previous row of the sticker stacker grid and setting of victory and defeat conditions

/**
 * This function sets up when the player loses
 */
function checkIfYouLost() {
    const currentRow = gridMatrix[currentRowIndex];
    const prevRow = gridMatrix[currentRowIndex + 1];

    if (!prevRow) {
        return
    }

    for (let i = 0; i < currentRow.length; i++) {

        if (currentRow[i] === 1 && prevRow[i] === 0) {

            currentRow[i] = 0;
            barSize--;

        }

        if (barSize === 0) {
            clearInterval(timer);
            endGame(false);
        }

    };
}

/**
 * This function sets up when the player wins
 */
function checkIfYouWon() {

    if (currentRowIndex === 0) {
        clearInterval(timer);
        endGame(true);
    }

};

// TODO: Implementation of the features of the stack button

/**
 * This function sets up all the features of the stack button
 */

function onStack() {

    checkIfYouLost();

    checkIfYouWon();

    updateScore();

    //* Change row
    currentRowIndex--;
    barDirection = "right";
    for (let i = 0; i < barSize; i++) {
        gridMatrix[currentRowIndex][i] = 1;
    }
};

stackBtn.addEventListener("click", onStack);

timer = setInterval(main, 1000);

// TODO: Realisation of the score system

function updateScore() {
    score++;
    counterScore.innerText = score.toString().padStart(2, "0");
}

// TODO: Realisation of the end game screens and the feature of the reload of the page

/**
 * This function handles the apperance of the end game screens at the end of the game
 */

function endGame(isVictory) {
    if (isVictory) {
        endGameText.innerHTML = 'You<br>Win<br>🤩';
        endGameScreen.classList.add('end-game-screen');
    }

    endGameScreen.classList.remove('hidden');
};

/**
 * This function reloads the page when the player clicks on the play again button
 */
function playAgain() {
    location.reload();
}

playAgainBtn.addEventListener("click", playAgain);