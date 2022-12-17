import { readFile } from "../shared/index.ts";

const fileContent = await readFile('./input.txt');

type Directions = 'R' | 'L' | 'U' | 'D';
type Position = {
    x: number;
    y: number;
}

const isTooFar = (head: Position, tail: Position): boolean => {
    if (head.x < tail.x - 1 || head.x > tail.x + 1) return true;
    if (head.y < tail.y - 1 || head.y > tail.y + 1) return true;
    return false;
}

const head: Position = { x: 0, y: 0 };
const tail: Position = { x: 0, y: 0 };

let prevHeadX = head.x;
let prevHeadY = head.y;

const tailPrevPositions = new Set<string>(['0:0']);

const moves = fileContent
    .trim()
    .split('\n');

moves
    .forEach(move => {
        const [direction, count] = move.split(' ') as [Directions, string];

        for (let i = 0; i < Number(count); i++) {
            prevHeadX = head.x;
            prevHeadY = head.y;

            if (direction === 'U') head.y++;
            if (direction === 'D') head.y--;
            if (direction === 'R') head.x++;
            if (direction === 'L') head.x--;

            if (isTooFar(head, tail)) {
                tail.x = prevHeadX;
                tail.y = prevHeadY;
                tailPrevPositions.add(`${tail.x}:${tail.y}`);
            }
        }
    });

console.log(Array.from(tailPrevPositions.values()).length);