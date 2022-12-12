import { readFile } from "../shared/index.ts";

const fileContent = await readFile('./input.txt');

type Section = [number, number]
type Pair = [Section, Section];

const fullContain = (fSection: Section, sSection: Section) => fSection[0] <= sSection[0] && fSection[1] >= sSection[1];

const doesOverlap = ([fSection, sSection]: Pair): number => {
    if (fullContain(fSection, sSection) || fullContain(sSection, fSection)) return 1;
    return 0;
}

const result = 
    fileContent.trim()
        .split('\n')
        .map(str => str.split(',').map(pair => pair.split('-').map(Number) as [number, number]) as Pair)
        .map(doesOverlap)
        .reduce((acc, cur) => acc + cur, 0);

console.log(result);