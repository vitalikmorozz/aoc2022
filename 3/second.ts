import { readFile } from "../shared/index.ts";

const fileContent = await readFile('./input.txt');
const sumOfArray = ((acc = 0, val: number) => acc + val)

const findCommonSymbol = (strings: string[]): string => {
    for (const char of strings[0]) {
        if (strings.slice(1).every(str => str.includes(char))) {
            return char;
        }
    }
    return '';
}

const splitIntoChunks = (arr: any[], chunkSize: number) => {
    const chunks: any[] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
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
    splitIntoChunks(fileContent.trim().split('\n'), 3)
        .map(findCommonSymbol)
        .map(getCharacterPriority)
        .reduce(sumOfArray)

console.log(result);

// const arr1 = [
//     "WwcsbsWwspmFTGVV",
//     "RHtMDHdSMnDBGMSDvnvDjtmpTpjTFggpmjmTFggTjmpP",
//     "vtCSGRMBDzHddvBHBzRhrlcZhlLzWNlqblhzcr",
//     "shhszHNHHZWqSzVNdClMjlFjBBbNTB",
//     "tQQGmnrMnJnGfmvrRRPCjlbljFBdjFCjTjnP",
//     "mRwtfGrMmJtwRDvQJQrJpMLSzVDHzhzHZqZzqSzcWVWH",
//     "WsWWgrtgsrhTQtsFcWPcRMCCTvqvMvqNNqMMHlMq",
//     "bBJrBGbzzLJznJrbSDGGJLqmlvqMqvlmLHRqRZZRNZ",
//     "bzJfDGVSzVrJGwjVGPPpQthdPsPpjdphsc",
//     "pJpCCBSWlczWWBWMHdMmMsFmpddrgF",
//     "wfVqZZGVQvzsMqmMgHjm",
//     "vDZGvPttQTVtGDQDDDGwbSCcSJSCJWTcRRSRczRJ"
//   ]

//   console.log(arr1)