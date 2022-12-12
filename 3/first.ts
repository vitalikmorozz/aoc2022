import { readFile } from "../shared/index.ts";

const fileContent = await readFile('./input.txt');

const sumOfArray = ((acc = 0, val: number) => acc + val)

const findCommonSymbol = ([first_half, second_half]: [string, string]): string => {
    for (const char of first_half) {
        if (second_half.includes(char)) return char;
    }
    return '';
}

const getCharacterPriority = (char: string): number => {
    const code = char.charCodeAt(0);
    // A-Z
    if (code >= 65 && code <= 90) {
        return code - 64 + 26;
    }

    // a-z
    if (code >= 97 && code <= 122) {
        return code - 96;
    }

    return 0;
}

const result = 
    fileContent
        .trim()
        .split('\n')
        .map(str => [str.slice(0, str.length / 2), str.slice(str.length / 2)] as [string, string])
        .map(findCommonSymbol)
        .map(getCharacterPriority)
        .reduce(sumOfArray)

console.log(result);