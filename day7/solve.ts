import { solve } from "../runner/typescript";
import { sum } from "lodash";

type Equation = { target: number; values: number[] };

function parser(input: string) {
  return input.split("\n").map<Equation>((line) => {
    const [targetStr, valsStr] = line.split(": ");
    return {
      target: Number(targetStr),
      values: valsStr.split(" ").map(Number),
    };
  });
}

function canBeSolved(
  equation: Equation,
  withConcat = false,
  subtotal = equation.values[0],
  index = 1
): boolean {
  if (index == equation.values.length) return subtotal == equation.target;
  const next = equation.values[index];
  return [
    subtotal + next,
    subtotal * next,
    withConcat && Number(`${subtotal}${next}`),
  ].some((subtotal) => canBeSolved(equation, withConcat, subtotal, index + 1));
}

function part1(equations: Equation[]): number {
  const solvable = equations.filter((eq) => canBeSolved(eq));
  return sum(solvable.map((eq) => eq.target));
}

function part2(equations: Equation[]): number {
  const solvableWIthConcat = equations.filter((eq) => canBeSolved(eq, true));
  return sum(solvableWIthConcat.map((eq) => eq.target));
}

solve({
  parser,
  part1,
  part2,

  part1Tests: [
    [
      "190: 10 19\n3267: 81 40 27\n83: 17 5\n156: 15 6\n7290: 6 8 6 15\n161011: 16 10 13\n192: 17 8 14\n21037: 9 7 18 13\n292: 11 6 16 20",
      3749,
    ],
  ],
  part2Tests: [
    [
      "190: 10 19\n3267: 81 40 27\n83: 17 5\n156: 15 6\n7290: 6 8 6 15\n161011: 16 10 13\n192: 17 8 14\n21037: 9 7 18 13\n292: 11 6 16 20",
      11387,
    ],
  ],
});
