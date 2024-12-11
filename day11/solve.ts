import { solve } from "../runner/typescript";

function parser(input: string) {
  return input.split(" ").map(Number);
}

function blink(rock: number): number[] {
  if (rock === 0) return [1];

  const numDigits = Math.floor(Math.log10(rock)) + 1;
  if (numDigits % 2 === 0) {
    const halfDigits = numDigits / 2;
    const divisor = 10 ** halfDigits;
    const rightHalf = rock % divisor;
    const leftHalf = Math.floor(rock / divisor);
    return [leftHalf, rightHalf];
  }

  return [rock * 2024];
}

function part1(rocks: number[]): number {
  for (let i = 0; i < 25; i++) {
    rocks = rocks.flatMap(blink);
  }
  return rocks.length;
}

function part2(rocks: number[]): number {
  for (let i = 0; i < 75; i++) {
    rocks = rocks.flatMap(blink);
    console.log(i, rocks.length);
  }
  return rocks.length;
}

solve({
  parser,
  // part1,
  part2,
  // part1Tests: [["125 17", 55312]],
});
