import { readFile } from "../shared/index.ts";

const fileContent = await readFile('./input.txt');

const [initialPositions, moves] = fileContent.split(/\n\s*\n/);

const moveCrates = (crates: string[][], count: number, indexFrom: number, indexTo: number): string[][] => {
    crates[indexTo - 1].unshift(...crates[indexFrom - 1].splice(0, count));

    return crates;
} 

const crates = initialPositions
    .split('\n')
    .slice(0, -1)
    .reverse()
    .map(str => 
        str
            .split(/(.{3}\ ?)/)
            .filter(c => c.length >= 3)
            .map(c => c.replaceAll(/\[|\]/g, '').trim())
        )
    .reduce((acc, cur) => {
        cur.forEach((val, index) => {
            if (!val) return;
            acc[index] ??= [];
            (acc[index]).push(val)
        });
        return acc;
    }, [] as Array<Array<string>>)
    .map(arr => arr.reverse())

moves.split('\n')
    .map(moveStr => moveStr.split(/move |from |to /gm).filter(str => str.length > 0).map(Number) as [number, number, number])
    .forEach(move => moveCrates(crates, ...move));

const res = crates.reduce((acc, crateCol) => acc.concat(crateCol[0]), "")

console.log(res);