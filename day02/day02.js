const readData = require('../helpers');

const OpponentMoves = {
    A: 'rock',
    B: 'paper',
    C: 'scissors',
}

const MyMoves = {
    X: 'rock',
    Y: 'paper',
    Z: 'scissors',
}

const secondaryMeaning = {
    X: 'LOSS',
    Y: 'DRAW',
    Z: 'WIN',
}

const points = {
    rock: 1,
    paper: 2,
    scissors: 3,
    LOSS: 0,
    DRAW: 3,
    WIN: 6,
}

const strategyGuide = readData('02');

function determineRoundOutcome(opponent, me) {
    if(opponent === me) {
        return 'DRAW';
    } else if(opponent === 'rock' && me === 'paper') {
        return 'WIN';
    } else if(opponent === 'rock' && me === 'scissors') {
        return 'LOSS';
    } else if(opponent === 'paper' && me === 'scissors') {
        return 'WIN';
    } else if(opponent === 'paper' && me === 'rock') {
        return 'LOSS';
    } else if(opponent === 'scissors' && me === 'rock') {
        return 'WIN';
    } else if(opponent === 'scissors' && me === 'paper') {
        return 'LOSS';
    }
}

function determineMyMove(opponent, outcome) {
    if(outcome === 'DRAW') {
        return opponent;
    } else if(opponent === 'rock' && outcome === 'WIN') {
        return 'paper';
    } else if(opponent === 'rock' && outcome === 'LOSS') {
        return 'scissors';
    } else if(opponent === 'paper' && outcome === 'WIN') {
        return 'scissors';
    } else if(opponent === 'paper' && outcome === 'LOSS') {
        return 'rock';
    } else if(opponent === 'scissors' && outcome === 'WIN') {
        return 'rock';
    } else if(opponent === 'scissors' && outcome === 'LOSS') {
        return 'paper';
    }
}

function calculateFinalScore(dataArr, encryption) {
    let totalScore = 0;

    for(const combinationStr of dataArr) {
        const [code1, code2] = combinationStr.split(' ');

        if(encryption === 'move') {
            const outcome = determineRoundOutcome(OpponentMoves[code1], MyMoves[code2]);
            totalScore += points[MyMoves[code2]];
            totalScore += points[outcome];
        } 

        if(encryption === 'outcome') {
            const myMove = determineMyMove(OpponentMoves[code1], secondaryMeaning[code2]);
            totalScore += points[secondaryMeaning[code2]];
            totalScore += points[myMove];
        }

    }

    return totalScore;
}

console.log(calculateFinalScore(strategyGuide, 'move'));
console.log(calculateFinalScore(strategyGuide, 'outcome'));