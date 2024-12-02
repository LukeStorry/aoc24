import { solve } from "../runner/typescript";
import { sum, countBy, zip } from "lodash";

function parser(input: string): number[][] {
  const numbers = input
    .split("\n")
    .map((line) => line.match(/\d+/g).map(Number));
  return zip(...numbers);
}

function part1([left, right]: number[][]): number {
  const sortedRight = right.toSorted();
  return sum(left.toSorted().map((l, i) => Math.abs(l - sortedRight[i])));
}

function part2([left, right]: number[][]): number {
  const counts = countBy(right);
  return sum(left.map((l) => l * counts[l] || 0));
}

solve({
  parser,
  part1,
  part2,
  part1Tests: [["3   4\n4   3\n2   5\n1   3\n3   9\n3   3", 11]],
  part2Tests: [["3   4\n4   3\n2   5\n1   3\n3   9\n3   3", 31]],
});
