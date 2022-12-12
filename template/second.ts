import { readFile } from "../shared/index.ts";

const fileContent = await readFile('./input.txt');
const result = fileContent;

console.log(result);