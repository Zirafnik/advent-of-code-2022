const fs = require('fs');

const rawData = fs.readFileSync('./day01/input.txt');

const inventories = rawData.toString().split(/\n/);

function getHighestSubarraySum(inventories) {
    let currentCalories = 0;
    let maxCalories = 0;

    for(const calories of inventories) {
        if(calories === '') {
            if(currentCalories > maxCalories) {
                maxCalories = currentCalories;
            }

            currentCalories = 0;
            continue;
        }

        const calNum = Number(calories);
        currentCalories += calNum;
    }

    return maxCalories;
}

function getTop3ElvesSum(inventories) {
    let currentCalories = 0;
    let top3Elves = [];

    for(const calories of inventories) {
        if(calories === '') {
            if(top3Elves.length < 3) {
                top3Elves.push(currentCalories);
            } else {
                top3Elves.push(currentCalories);
                top3Elves.sort((a, b) => a - b);
                top3Elves.shift();
            }

            currentCalories = 0;
            continue;
        }

        const calNum = Number(calories);
        currentCalories += calNum;
    }
    
    return top3Elves.reduce((sum, current) => sum + current, 0);
}

console.log(getHighestSubarraySum(inventories));
console.log(getTop3ElvesSum(inventories));