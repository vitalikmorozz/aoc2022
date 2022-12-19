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
let sum = 0;

while (true) {
  if (currentOperationIndex >= commandsInput.length) break;

  cycles++;
  currentOperationCycles++;

  if (cycles === 20 || (cycles - 20) % 40 === 0) {
    // console.log(Current cycle: ${cycles}, X value: ${x});
    // console.log(Signal strength: ${cycles * x});
    sum += cycles * x;
  }

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

console.log(sum);