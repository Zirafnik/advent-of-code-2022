const readData = require('../helpers');

const elfPairs = readData('04');

function countOverlaps(elfPairs, cb) {
    let counter = 0;

    for(const pair of elfPairs) {
        if(cb(pair)) {
            counter++;
        }
    }

    return counter;
}

function isThereFullOverlap(pair) {
    const [elf1, elf2] = pair.split(',');

    const [elf1Start, elf1End] = elf1.split('-');
    const [elf2Start, elf2End] = elf2.split('-');

    const min = Math.min(elf1Start, elf2Start);
    const max = Math.max(elf1End, elf2End);

    return (elf1Start == min && elf1End == max) 
        || (elf2Start == min && elf2End == max);
}

function isThereOverlap(pair) {
    const [elf1, elf2] = pair.split(',');

    const [elf1StartStr, elf1EndStr] = elf1.split('-');
    const [elf2StartStr, elf2EndStr] = elf2.split('-');

    const elf1Start = Number(elf1StartStr);
    const elf1End = Number(elf1EndStr);
    const elf2Start = Number(elf2StartStr);
    const elf2End = Number(elf2EndStr);

    // which elf has lower end
    const minEnd = Math.min(elf1End, elf2End);
    
    // Elf1
    if(minEnd == elf1End) {
        return !(elf1End < elf2Start);
    }
    // Elf2
    else {
        return !(elf2End < elf1Start);
    }
}

console.log(countOverlaps(elfPairs, isThereFullOverlap));
console.log(countOverlaps(elfPairs, isThereOverlap));