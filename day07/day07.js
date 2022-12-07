const { readData, accessObjectChild } = require('../helpers');
Object.prototype.accessObjectChild = accessObjectChild;

const terminalLines = readData('07');

function buildFileSystemTree(terminal) {
    const fileSystemTree = {};
    let currentDirPath = [];

    for(const line of terminal) {
        const lineArgs = line.split(' ');

        // COMMAND
        if(lineArgs[0] === '$') {
            if(lineArgs[1] === 'cd') {
                const dirName = lineArgs[2];

                if(dirName === '..') {
                    currentDirPath.pop();
                } else if(dirName === '/') {
                    currentDirPath = [];
                } else {
                    currentDirPath.push(dirName);
                }
            }
        }
        // LIST
        else {
            const newDirFile = lineArgs[1];
            const currentDir = fileSystemTree.accessObjectChild(currentDirPath);

            if(lineArgs[0] === 'dir') {
                currentDir[newDirFile] = {};
            } else {
                currentDir[newDirFile] = Number(lineArgs[0]);
            }
        }
    }

    return fileSystemTree;
}

function calculateDirectorySizes(obj, currentDir) {
    const sizes = { 
        [currentDir]: 0,
    };

    for(const [name, value] of Object.entries(obj)) {
        if(typeof value === 'number') {
            sizes[currentDir] += value;
        } else {
            const subDirectoryName = `${currentDir}/${name}`;
            Object.assign(sizes, calculateDirectorySizes(obj[name], subDirectoryName));

            // add newly added directory size to currentDir
            sizes[currentDir] += sizes[subDirectoryName];
        }
    }

    return sizes;
}

const fileSystem = buildFileSystemTree(terminalLines);
const sizes = calculateDirectorySizes(fileSystem, 'root');

console.log(fileSystem);
console.log('---------------------------------------------------');
console.log(sizes);
console.log('---------------------------------------------------');

const sizesUnder100kSum = Object.values(sizes).reduce((sum, size) => {
    if(size <= 100000) {
        return sum + size;
    }
    
    return sum;
}, 0);

console.log('Part 1: ', sizesUnder100kSum);

function getSmallestPossibleDeleteSize(folderSizes) {
    const totalSpace = 70000000;
    const updateSize = 30000000;

    const freeSpace = totalSpace - folderSizes.root;
    const neededSpace = Math.abs(freeSpace - updateSize);

    let smallestSize = Infinity;
    for(const size of Object.values(folderSizes)) {
        if(size >= neededSpace) {
            smallestSize = Math.min(size, smallestSize);
        }
    }

    return smallestSize;
}

console.log('Part 2: ', getSmallestPossibleDeleteSize(sizes));