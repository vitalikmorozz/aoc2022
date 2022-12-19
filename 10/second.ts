import { readFile } from "../shared/index.ts";

const fileContent = await readFile("./input.txt");

const commandsInput = fileContent.trim().split("\n");
let x = 1;

const CommandsMap = {
  'addx': {
    action: (val: number) => {
      x += val;
    },
    cycles: 2,
  },
  'noop': {
    action: () => {},
    cycles: 1,
  },
};

type Commands = keyof typeof CommandsMap;

let cycles = 0;
let currentOperationCycles = 0;
let currentOperationIndex = 0;
const crtScreen: string[][] = Array(6).fill(0).map(_ => []);

while (true) {
  if (currentOperationIndex >= commandsInput.length) break;

  cycles++;
  currentOperationCycles++;

  const row = cycles % 40 - 1;
  const col = Math.ceil(cycles / 40) - 1;
  console.log(`Cycle: ${cycles}, row: ${row}, col: ${col}, X: ${x}`);
  crtScreen[col][row] = row >= x - 1 && row <= x + 1 ? '#' : '.';

  const [command, value] = commandsInput[currentOperationIndex].split(" ") as [
    Commands,
    string | undefined,
  ];

  if (currentOperationCycles >= CommandsMap[command].cycles) {
    currentOperationCycles = 0;
    currentOperationIndex++;
    if (value) CommandsMap[command].action(Number(value));
  }
}

crtScreen.forEach(row => console.log(row.join('')));