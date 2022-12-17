import { readFile } from "../shared/index.ts";

const fileContent = await readFile('./input.txt');

type Directions = 'R' | 'L' | 'U' | 'D';
type Position = {
    x: number;
    y: number;
}

const visualizeRope = (rope: Position[], gridHeight = 20, gridWidth = 30) => {
    const grid = Array(gridHeight).fill(0).map(_ => Array(gridWidth).fill('.'));

    for (let i = 0; i < rope.length; i ++) {
        const { x, y } = rope[i];
        grid[(gridHeight / 2) + y][(gridWidth / 2) + x] = i;
    }
    
    for (let i = grid.length - 1; i >= 0; i--) {
        console.log(grid[i].join(''));
    }
    console.log();
}

const moveTo = (curr: Position, head: Position) => {
    if (head.x !== curr.x) curr.x += head.x > curr.x ? 1 : -1;
    if (head.y !== curr.y) curr.y += head.y > curr.y ? 1 : -1;
}

const isTooFar = (head: Position, tail: Position): boolean => {
    if (head.x < tail.x - 1 || head.x > tail.x + 1) return true;
    if (head.y < tail.y - 1 || head.y > tail.y + 1) return true;
    return false;
}

const rope: Position[] = new Array(10).fill(0).map(_ => ({ x: 0, y: 0 }));

const tailPrevPositions = new Set<string>(['0:0']);

const moves = fileContent
    .trim()
    .split('\n');

moves
    .forEach(move => {
        const [direction, count] = move.split(' ') as [Directions, string];
        for (let i = 0; i < Number(count); i++) {
            // Move head
            if (direction === 'U') rope[0].y++;
            if (direction === 'D') rope[0].y--;
            if (direction === 'R') rope[0].x++;
            if (direction === 'L') rope[0].x--;

            for (let j = 1; j < rope.length; j ++ ) {
                if (isTooFar(rope[j - 1], rope[j])) {
                    moveTo(rope[j], rope[j - 1])
                }
            }
            tailPrevPositions.add(`${rope[rope.length - 1].x}:${rope[rope.length - 1].y}`);
        }
    });

console.log(Array.from(tailPrevPositions.values()).length);