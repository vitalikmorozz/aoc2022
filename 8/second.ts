import { readFile } from "../shared/index.ts";

const fileContent = await readFile('./input.txt');

const parseGrid = (contentStr: string): number[][] => contentStr.trim().split('\n').reduce((acc, str) => acc.concat([str.trim().split('').map(Number)]), [] as number[][]);

const calculateTreeScore = (grid: number[][], y: number, x: number): number => {
    const currentValue = grid[y][x];
    let sliceScore = 0;
    let score = 1;
    let slice: number[] = []

    slice = grid[y].slice(0, x).reverse();

    for (let i = 0; i < slice.length; i++) {
        sliceScore++;
        if (slice[i] >= currentValue) break;
    }

    score *= sliceScore;
    sliceScore = 0;

    slice = grid[y].slice(x + 1);

    for (let i = 0; i < slice.length; i++) {
        sliceScore++;
        if (slice[i] >= currentValue) break;
    }

    score *= sliceScore;
    sliceScore = 0;

    for (let i = y - 1; i >= 0; i--) {
        sliceScore++;
        if (grid[i][x] >= currentValue) break;
    }

    score *= sliceScore;
    sliceScore = 0;

    for (let i = y + 1; i < grid.length; i++) {
        sliceScore++;
        if (grid[i][x] >= currentValue) break;
    }

    score *= sliceScore;

    return score;
} 

const grid = parseGrid(fileContent);

const res = grid
    .map((arr, y) => arr
        .reduce((max, _, x) => {
            const score = calculateTreeScore(grid, y, x);
            return score > max ? score : max;
        }, 0)
    ).reduce((max, cur) => cur > max ? cur : max);

console.log(res);