import { solve } from "../runner/typescript";
import { sum, range } from "lodash";

function getAllCoordinates(lines: string[]): [number, number][] {
  return lines.flatMap((line, y) =>
    line.split("").map((_, x) => [x, y] satisfies [number, number])
  );
}

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

  const countXmasStartingFrom = ([x, y]): number =>
    directions.filter(([dx, dy]) =>
      ["X", "M", "A", "S"].every(
        (c, i) => lines[y + i * dy]?.[x + i * dx] === c
      )
    ).length;

  return sum(getAllCoordinates(lines).map(countXmasStartingFrom));
}

function part2(input: string): number {
  const lines = input.split("\n");

  const countCrossMasStartingFrom = ([x, y]: [number, number]): boolean => {
    if (lines[y][x] !== "A") return false;
    const diagonals = [
      lines[y - 1]?.[x + 1],
      lines[y + 1]?.[x + 1],
      lines[y + 1]?.[x - 1],
      lines[y - 1]?.[x - 1],
    ].join("");
    return ["MMSS", "SMMS", "MSSM", "SSMM"].includes(diagonals);
  };

  return getAllCoordinates(lines).filter(countCrossMasStartingFrom).length;
}

solve({
  part1,
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
