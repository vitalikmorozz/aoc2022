import { readFile } from "../shared/index.ts";

const fileContent = await readFile('./input.txt');

type OpponentMove = 'A' | 'B' | 'C';
type MyMove = 'X' | 'Y' | 'Z';
type MoveAction = OpponentMove | MyMove;
type MovePair = [OpponentMove, MyMove];
type ActionConf = {
    beats: MoveAction;
    draw: MoveAction;
    lose: MoveAction;
    score: number;
}

const rpsMap: Record<MoveAction, ActionConf> = {
    // Rock
    'A': {
        beats: 'Z',
        draw: 'X',
        lose: 'Y',
        score: 0,
    },
    // Paper
    'B': {
        beats: 'X',
        draw: 'Y',
        lose: 'Z',
        score: 0,
    },
    // Scissors
    'C': {
        beats: 'Y',
        draw: 'Z',
        lose: 'X',
        score: 0,
    },
    // Rock
    'X': {
        beats: 'C',
        draw: 'A',
        lose: 'B',
        score: 1
    },
    // Paper
    'Y': {
        beats: 'A',
        draw: 'B',
        lose: 'C',
        score: 2
    },
    // Scissors
    'Z': {
        beats: 'B',
        draw: 'C',
        lose: 'A',
        score: 3
    },
}

const roundOutcome = ([first_move, second_move]: MovePair) => {
    switch (second_move) {
        case 'X': {
            const myMove = rpsMap[rpsMap[first_move].beats];
            return myMove.score + 0
        }

        case 'Y': {
            const myMove = rpsMap[rpsMap[first_move].draw];
            return myMove.score + 3
        }

        case 'Z': {
            const myMove = rpsMap[rpsMap[first_move].lose];
            return myMove.score + 6
        }
            
    }

    // // Draw
    // if (rpsMap[second_move].draw === first_move) return 3;
    // // Win
    // if (rpsMap[second_move].beats === first_move) return 6;
    // // Lose
    // return 0;
}

const finalScore = 
    fileContent
        .trim()
        .split('\n')
        .reduce((sum, cur_pair) => {
            const pair: MovePair = cur_pair.split(' ') as MovePair;
            return sum + roundOutcome(pair);
        }, 0)

console.log(finalScore);