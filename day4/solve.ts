import { solve } from "../runner/typescript";
import { max, sum, groupBy, values, range } from "lodash";

const directions = {
  N: [0, -1],
  NE: [1, -1],
  E: [1, 0],
  SE: [1, 1],
  S: [0, 1],
  SW: [-1, 1],
  W: [-1, 0],
  NW: [-1, -1],
} as const;

function part1(input: string): number {
  const lines = input.split("\n");

  const xCoords = lines.flatMap((line, y) =>
    line
      .split("")
      .map((c, x) => ({ c, x, y }))
      .filter(({ c }) => c === "X")
  );
  console.log(xCoords);

  const out1 = xCoords
    .flatMap(({ x, y }) =>
      Object.values(directions).map(([dx, dy]) =>
        range(0, 4).every((i) => lines[y + i * dy]?.[x + i * dx] === "XMAS"[i])
      )
    )
    .filter(Boolean).length;
  console.log(out1);

  return out1;
}

function part2(values: any[]): any[] {
  function func2(a) {
    return a;
  }

  const out1 = func2(values[0]);

  console.log(out1);

  return values.map(func2);
}

solve({
  part1,
  // part2: part2,

  part1Tests: [
    [
      "MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX\nXMASAMXAMM\nXXAMMXXAMA\nSMSMSASXSS\nSAXAMASAAA\nMAMMMXMMMM\nMXMXAXMASX",
      18,
    ],
  ],
  part2Tests: [
    // ["aaa", 0],
    // ["a", 0],
  ],
});
