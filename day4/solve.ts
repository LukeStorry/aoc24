import { solve } from "../runner/typescript";
import { sum, range } from "lodash";

function part1(input: string): number {
  const lines = input.split("\n");

  const directions = [
    [0, -1], // N
    [1, -1], // NE
    [1, 0], // E
    [1, 1], // SE
    [0, 1], // S
    [-1, 1], // SW
    [-1, 0], // W
    [-1, -1], // NW
  ];

  const countXmasStartingFrom = (x: number, y: number): number =>
    directions.filter(([dx, dy]) =>
      range(0, 4).every((i) => lines[y + i * dy]?.[x + i * dx] === "XMAS"[i])
    ).length;

  return sum(
    lines.flatMap((line, y) =>
      range(line.length).map((x) => countXmasStartingFrom(x, y))
    )
  );
}

function part2(input: string): number {
  const lines = input.split("\n");

  const countCrossMasStartingFrom = (x: number, y: number): number => {
    if (lines[y][x] !== "A") return 0;
    console.log(x, y);
    const diagonals = [
      lines[y - 1]?.[x + 1],
      lines[y + 1]?.[x + 1],
      lines[y + 1]?.[x - 1],
      lines[y - 1]?.[x - 1],
    ].join("");
    if (["MMSS", "SMMS", "MSSM", "SSMM"].includes(diagonals)) return 1;
    return 0;
  };

  return sum(
    lines.flatMap((line, y) =>
      range(line.length).map((x) => countCrossMasStartingFrom(x, y))
    )
  );
}

solve({
  // part1,
  part2,
  part1Tests: [
    [
      "MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX\nXMASAMXAMM\nXXAMMXXAMA\nSMSMSASXSS\nSAXAMASAAA\nMAMMMXMMMM\nMXMXAXMASX",
      18,
    ],
  ],
  part2Tests: [
    [
      "MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX\nXMASAMXAMM\nXXAMMXXAMA\nSMSMSASXSS\nSAXAMASAAA\nMAMMMXMMMM\nMXMXAXMASX",
      9,
    ],
  ],
});
