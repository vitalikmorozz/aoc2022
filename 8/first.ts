import { readFile } from "../shared/index.ts";

const fileContent = await readFile('./input.txt');

const parseGrid = (contentStr: string): number[][] => contentStr.trim().split('\n').reduce((acc, str) => acc.concat([str.trim().split('').map(Number)]), [] as number[][]);

const isVisible = (grid: number[][], y: number, x: number): boolean => {
    // Check if value is at the border
    if (y === 0 || y === grid.length - 1) return true;
    if (x === 0 || x === grid[0].length - 1) return true;
    const currentValue = grid[y][x];

    // Check by y axis
    if (grid[y].slice(0, x).every(n => n < currentValue)) return true;
    if (grid[y].slice(x + 1).every(n => n < currentValue)) return true;

    // Check by x axis
    let f1 = true;
    let f2 = true;

    for (let i = 0; i < y; i++) {
        if (grid[i][x] >= currentValue) {
            f1 = false;
            break;
        }
    }

    for (let i = y + 1; i < grid.length; i++) {
        if (grid[i][x] >= currentValue) {
            f2 = false;
            break;
        }
    }

    return f1 || f2;
} 

const grid = parseGrid(fileContent);

const res = grid
    .map((arr, y) => arr
        .reduce((acc, _, x) => isVisible(grid, y, x) ? ++acc : acc, 0)
    ).reduce((sum, cur) => sum + cur, 0);

console.log(res);