const fs = require('fs');

function readData(day, testBool) {
    const rawData = fs.readFileSync(`./day${day}/${testBool ? 'test' : ''}input.txt`).toString();
    const dataArray = rawData.split(/\n/);
    
    return dataArray;
}

module.exports = readData;