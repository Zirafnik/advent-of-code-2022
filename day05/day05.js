const readData = require('../helpers');

const input = readData('05');

let [crateMatrix, instructions] = parseCrateMatrix(input);

function parseCrateMatrix(input) {
    let matrix = [];
    let instructions = [];

    let matrixHeight = 0;
    let matrixWidth = 0;

    // get last stack number (matrix width) & stack height (matrix height)
    for(let i = 0; i < input.length; i++) {
        if(input[i].includes('[')) {
            continue;
        } else {
            const numStr = input[i];

            const stackNumbersArr = numStr.trim().split(/\s+/);

            matrixWidth = Number(stackNumbersArr[stackNumbersArr.length - 1]);
            matrixHeight = i;

            break;
        }
    }

    // Build matrix
    const initialMatrix = [];
    for(let level = matrixHeight - 1; level >= 0; level--) {
        const levelArr = input[level]
            .split(/\s\s\s\s|\s/)
            .slice(0, matrixWidth)
            .map(str => str.replace('[', '').replace(']', ''));
        
        initialMatrix.push(levelArr);
    }

    for(let stack = 0; stack < matrixWidth; stack++) {
        matrix[stack] = [];
        
        initialMatrix.forEach(levelArr => {
            if(levelArr[stack]) {
                matrix[stack].push(levelArr[stack]);
            }
        });
    }

    instructions = input.slice(matrixHeight + 2);
    
    return [matrix, instructions];
}

function craneMove(matrix, instructions, craneModel) {
    // iterate over all instructions and execute
    for(const instruction of instructions) {
        const [amount, stackA, stackB] = instruction.split(/\D+/).slice(1)

        const movingCrates = matrix[stackA - 1].splice(-amount);
        const reversedCrates = [...movingCrates].reverse();

        if(craneModel === '9000') {
            matrix[stackB - 1].push(...reversedCrates);
        } else if(craneModel === '9001') {
            matrix[stackB - 1].push(...movingCrates);
        }
    }

    // return final result string
    return matrix.map(stack => stack.slice(-1)).join('');
}

// console.log(craneMove(crateMatrix, instructions, '9000'));
console.log(craneMove(crateMatrix, instructions, '9001'));