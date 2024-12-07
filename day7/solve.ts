import { solve } from "../runner/typescript";
import { sum } from "lodash";

type Equation = [number, number[]];

function parser(input: string) {
  return input.split("\n").map<Equation>((line) => {
    const [targetStr, valsStr] = line.split(": ");
    return [Number(targetStr), valsStr.split(" ").map(Number)];
  });
}

function canBeSolved([target, values]: Equation, withConcat = false): boolean {
  function solve(remaining: number[], subtotal: number) {
    if (!remaining.length) return subtotal == target;
    const [next, ...rest] = remaining;
    return (
      solve(rest, subtotal + next) ||
      solve(rest, subtotal * next) ||
      (withConcat && solve(rest, Number(`${subtotal}${next}`)))
    );
  }

  const subtotal = values.shift();
  return solve(values, subtotal);
}

function part1(equations: Equation[]): number {
  return sum(
    equations.filter((e) => canBeSolved(e)).map(([target, _]) => target)
  );
}

function part2(equations: Equation[]): number {
  return sum(
    equations.filter((e) => canBeSolved(e, true)).map(([target, _]) => target)
  );
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
