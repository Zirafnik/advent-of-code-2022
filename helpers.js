const fs = require('fs');

function readData(day) {
    const rawData = fs.readFileSync(`./day${day}/input.txt`).toString();
    const dataArray = rawData.split(/\n/);

    return dataArray;
}

module.exports = readData;