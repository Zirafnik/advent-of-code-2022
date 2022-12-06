const readData = require('../helpers');
const fs = require('fs');

const dataStream = fs.readFileSync('./day06/input.txt').toString();

function findPacketMarker(string, limit) {
    let left = 0;
    let right = 1;

    const passedChars = {
        [string[left]]: true,
    };
    
    while(right < string.length) {
        const charLeft = string[left];
        const charRight = string[right];

        if(!passedChars[charRight]) {
            passedChars[charRight] = true;
            right++;

            if((right - left) === limit) return right;
        } else {
            passedChars[charLeft] = false;
            left++;
        }
    }
}

// Test input
const testStreams = readData('06', true);

console.log('Part 1 test:');
for(const stream of testStreams) {
    console.log(findPacketMarker(stream, 4));
}

console.log('Part 2 test:');
for(const stream of testStreams) {
    console.log(findPacketMarker(stream, 14));
}

// Part 1
console.log({ part1: findPacketMarker(dataStream, 4) });
// Part 2
console.log({ part2: findPacketMarker(dataStream, 14) });
