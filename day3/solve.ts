import { solve } from "../runner/typescript";
import { sum } from "lodash";

function part1(input: string) {
  const matches = input.matchAll(/mul\((?<X>\d{1,3}),(?<Y>\d{1,3})\)/g);
  const muls = Array.from(matches).map(
    ({ groups: { X, Y } }) => parseInt(X) * parseInt(Y)
  );
  return sum(muls);
}

function part2(input: string) {
  const matches = input.matchAll(
    /do\(\)|don't\(\)|mul\((?<X>\d{1,3}),(?<Y>\d{1,3})\)/g
  );
  const { sum } = Array.from(matches).reduce(
    ({ enabled, sum }, { 0: m, groups: { X, Y } }) => {
      if (m === "do()") return { enabled: true, sum };
      if (m === "don't()") return { enabled: false, sum };
      if (enabled) return { enabled, sum: sum + parseInt(X) * parseInt(Y) };
      return { enabled, sum };
    },
    { enabled: true, sum: 0 }
  );
  return sum;
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
