import { readFile } from "../shared/index.ts";

const fileContent = await readFile('./input.txt');

const prevFourCharacters: string[] = [];
const chunkSize = 14;
const characters = fileContent.trim().split('');

let marker = 0;

const isAllUnique = (arr: string[]): boolean => {
    return arr.every((val, index) => arr.lastIndexOf(val) === index);
}

for (let i = 0; i < characters.length; i++) {
    prevFourCharacters.push(characters[i]);
    if (i >= chunkSize) {
        prevFourCharacters.shift()
        if (isAllUnique(prevFourCharacters)) {
            marker = i + 1;
            break;
        }
    }
}

console.log(marker);