import { solve } from "../runner/typescript";
import { sum, countBy } from "lodash";

type Parsed = [number[], number[]];
function parser(input: string): Parsed {
  const [left, right] = [[], []];
  input.split("\n").forEach((line) => {
    const [a, b] = line.split("   ").map(Number);
    left.push(a);
    right.push(b);
  });
  return [left, right];
}

function part1([left, right]: Parsed): number {
  const ls = left.sort();
  const rs = right.sort();
  // sum of differences between each pair
  return sum(ls.map((l, i) => Math.abs(l - rs[i])));
}

function part2([left, right]: Parsed): number {
  const counts = countBy(right);
  return sum(left.map((l) => l * counts[l] || 0));
}

solve({
  parser: parser,
  part1: part1,
  part2: part2,

  part1Tests: [["3   4\n4   3\n2   5\n1   3\n3   9\n3   3", 11]],
  part2Tests: [["3   4\n4   3\n2   5\n1   3\n3   9\n3   3", 31]],
});
