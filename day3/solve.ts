import { solve } from "../runner/typescript";
import { sum } from "lodash";

function part1(input: string) {
  const matches = input.matchAll(/mul\((?<X>\d{1,3}),(?<Y>\d{1,3})\)/g);
  return sum(
    Array.from(matches).map(({ groups: { X, Y } }) => parseInt(X) * parseInt(Y))
  );
}

function part2(input: string) {
  const matches = input.matchAll(
    /(?<instruction>do|don't)\(\)|mul\((?<X>\d{1,3}),(?<Y>\d{1,3})\)/g
  );
  let enabled = true;
  const vals = Array.from(matches).map(({ groups: { X, Y, instruction } }) => {
    if (instruction === "do") enabled = true;
    if (instruction === "don't") enabled = false;
    return enabled && X && Y ? parseInt(X) * parseInt(Y) : 0;
  });

  return sum(vals);
}

solve({
  part1,
  part2,

  part1Tests: [
    [
      "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",
      161,
    ],
  ],
  part2Tests: [
    [
      "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
      48,
    ],
  ],
  // onlyTests: true,
});
