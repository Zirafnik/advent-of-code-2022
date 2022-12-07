const fs = require('fs');

function readData(day, testBool) {
    const rawData = fs.readFileSync(`./day${day}/${testBool ? 'test' : ''}input.txt`).toString();
    const dataArray = rawData.split(/\n/);
    
    return dataArray;
}

function accessObjectChild(path) {
    let child = this;
    
    for(const prop of path) {
        child = child[prop];
    }
    
    return child;
}

module.exports = {
    readData,
    accessObjectChild,
};