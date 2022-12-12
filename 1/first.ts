import { readFile } from "../shared/index.ts";

const fileContent = await readFile('./input.txt');

const caloriesByElves = fileContent
    .split(/\n\s*\n/)
    .map((calories) => 
        calories
            .split('\n')
            .map(Number)
            .reduce((acc, val) => acc + val, 0)
    )
    .sort((a, b) => a - b)
    .reverse();

const topThree = caloriesByElves.splice(0, 3).reduce((acc, val) => acc + val, 0);

console.log(topThree);