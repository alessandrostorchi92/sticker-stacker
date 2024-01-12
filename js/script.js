"use strict"

/**
 * @type {HTMLDivElement}
 */
// @ts-ignore

const gridGame = document.querySelector(".sticker-stacker-grid-container");

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

function draw() {
    gridMatrix.forEach((rowContent, rowIndex) => {

        rowContent.forEach((cellContent, cellIndex) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            const isRowEven = rowIndex % 2 === 0;
            const isCellEven = cellIndex % 2 === 0;

            if((isRowEven && isCellEven) || (!isRowEven && !isCellEven )) {

                cell.classList.add("cell-dark");

            }

            if(cellContent === 1) {
                cell.classList.add("bar");
            }


            gridGame.append(cell);
        });

    });
}

draw();
