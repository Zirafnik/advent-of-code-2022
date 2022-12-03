const readData = require('../helpers');

const rucksacks = readData('03');

const typePriority = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function getMisplacedItemTypes(rucksacks) {
    let misplacedTypes = [];

    for(const ruck of rucksacks) {
        const half = ruck.length / 2;
        
        const firstCompartment = ruck.slice(0, half);
        const secondCompartment = ruck.slice(half);
        
        let firstTypes = {};

        for(const itemType of firstCompartment) {
            if(!firstTypes[itemType]) {
                firstTypes[itemType] = true;
            }
        }

        for(const itemType of secondCompartment) {
            if(firstTypes[itemType]) {
                misplacedTypes.push(itemType);
                break;
            }
        }
    }

    return misplacedTypes;
}

function getGroupBadges(rucksacks) {
    let badges = [];
    
    for(let i = 0; i < rucksacks.length; i+=3) {
        const items = {};

        const ruck1 = rucksacks[i];
        const ruck2 = rucksacks[i+1];
        const ruck3 = rucksacks[i+2];

        for(const item of ruck1) {
            if(!items[item]) {
                items[item] = 1;
            }
        }

        for(const item of ruck2) {
            if(items[item] === 1) {
                items[item]++;
            }
        }

        for(const item of ruck3) {
            if(items[item] === 2) {
                badges.push(item);
                break;
            }
        }
    }

    return badges;
}

function calculatePrioritiesSum(misplacedTypes) {
    return misplacedTypes.reduce((sum, type) => {
        return sum + (typePriority.indexOf(type) + 1);
    }, 0);
}

console.log(calculatePrioritiesSum(getMisplacedItemTypes(rucksacks)));
console.log(calculatePrioritiesSum(getGroupBadges(rucksacks)));