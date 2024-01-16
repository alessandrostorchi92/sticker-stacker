"use strict"

/**
 * @type {HTMLDivElement}
 */
// @ts-ignore
const gridGame = document.querySelector(".sticker-stacker-grid-container");

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

// TODO: Implementation of the sticker stacker grid

/**
 * This function draws the grid of the sticker stacker game
 */

//* Invocation and declaration of the function draw()
draw();

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
}

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
}

/**
 * This function sets up if the orange bar reaches the left edge of the current row of the matrix grid
 * @param {number[]} currentRow 
 */

function isLeftEdge(currentRow) {
    const firstElement = currentRow[0];
    return firstElement === 1;
}

/**
 * This function handles the movement of the orange bar both on the right and the left.
 */

function moveBar() {

    /**
     * @type {number[]}
     */
    const currentRowMatrix = gridMatrix[currentRowIndex];

    if(barDirection === "right") {
        moveBarRight(currentRowMatrix);

        if(isRightEdge(currentRowMatrix)) {
            barDirection = "left";
        }

    } else if(barDirection === "left") {
        moveBarLeft(currentRowMatrix);

        if(isLeftEdge(currentRowMatrix)) {
            barDirection = "right";
        }
        
    }
}

