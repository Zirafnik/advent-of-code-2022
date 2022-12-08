const { readData } = require('../helpers');

const treeGrid = readData('08').map(treeRow => treeRow.split('').map(treeStr => Number(treeStr)));

function iterateUntilEndX(y, x, grid) {
    const rowArr = grid[y];
    
    let rowMax = {
        max: rowArr[x],
        x,
    }

    for(let i = x + 1; i < rowArr.length; i++) {
        if(rowMax.max <= rowArr[i]) {
            // new row max
            rowMax = {
                max: rowArr[i],
                x: i,
            }
        }
    }

    return rowMax;
}

function iterateUntilEndY(y, x, grid) {
    let bottomMax = {
        max: grid[y][x],
        y,
    }

    for(let i = y + 1; i < grid.length; i++) {
        if(bottomMax.max <= grid[i][x]) {
            // new bottom max at this 'x'
            bottomMax = {
                max: grid[i][x],
                y: i,
            }
        }
    }

    return bottomMax;
}

/**
 * Instead of brute force checking if each element in matrix is biggest in all 4 directions, this function loops only once through middle elements in matrix + a couple of times until the end of row/column. Max values are then memoized, to avoid costly calculations and use constant speed for checking if tree is visible.
 */
function getVisibleTreesNum(grid) {
    const topMaxes = grid[0].map(num => ({ max: num, y: 0}));
    const leftMaxes = grid.map(rowArr => ({ max: rowArr[0], x: 0}));
    let rightMax = {
        max: null,
        x: null,
    };
    const bottomMaxes= [];

    let visibleCount = grid.length * 2 + (grid[0].length - 2) * 2;

    for(let y = 1; y < grid.length - 1; y++) {
        for(let x = 1; x < grid[0].length - 1; x++) {
            let isVisible = false;
            const value = grid[y][x];

            // LEFT
            // Bigger than previous max left
            if(value > leftMaxes[y].max) {
                // new left max
                leftMaxes[y] = {
                    max: value,
                    x,
                }
                // is visible left
                isVisible = true;
            }
            else if(value < leftMaxes[y].max) {
                // not visible left
            }

            // TOP
            // Bigger than previous max top
            if(value > topMaxes[x].max) {
                // new top max
                topMaxes[x] = {
                    max: value,
                    y,
                }
                // is visible top
                isVisible = true;
            }
            else if(value < topMaxes[x].max) {
                // not visible top
            }

            // RIGHT
            // if first tree in row
            if(x === 1) {
                // find new right max
                const newRightMax = iterateUntilEndX(y, x + 1, grid);
                rightMax = newRightMax;

                if(value > rightMax.max) {
                    isVisible = true;
                }
            }
            // if on curren row max
            else if(rightMax.x === x) {
                const newRightMax = iterateUntilEndX(y, x + 1, grid);
                rightMax = newRightMax;

                isVisible = true;
            }
            else if(value < rightMax.max) {
                // not visible right
            }

            // BOTTOM
            // if first tree in row
            if(y === 1) {
                // find new bottom max
                const newBottomMax = iterateUntilEndY(y + 1, x, grid);
                bottomMaxes[x] = newBottomMax;

                if(value > newBottomMax.max) {
                    isVisible = true;
                }
            }
            // if on curren row max
            else if(bottomMaxes[x].y === y) {
                const newBottomMax = iterateUntilEndY(y + 1, x, grid);
                bottomMaxes[x] = newBottomMax;

                isVisible = true;
            }
            else if(value < bottomMaxes[x].max) {
                // not visible right
            }

            if(isVisible) { 
                visibleCount++
            };
        }
    }

    return visibleCount;
}

console.log(getVisibleTreesNum(treeGrid));