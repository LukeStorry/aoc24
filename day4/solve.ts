import { solve } from "../runner/typescript";
import { sum } from "lodash";

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
        (char, i) => char === lines[y + i * dy]?.[x + i * dx]
      )
    ).length;

  return sum(getAllCoordinates(lines).map(countXmasStartingFrom));
}

function part2(input: string): number {
  const lines = input.split("\n");

  function isMiddleOfCrossMas([x, y]: [number, number]): boolean {
    if (lines[y][x] !== "A") return false;

    // get the four diagonal characters, in order
    const diagonals = [
      lines[y - 1]?.[x + 1], // NE
      lines[y + 1]?.[x + 1], // SE
      lines[y + 1]?.[x - 1], // SW
      lines[y - 1]?.[x - 1], // NW
    ];

    // Check if any rotation matches the pattern MMSS
    return [0, 1, 2, 3].some((rotation) =>
      ["M", "M", "S", "S"].every(
        (char, i) => char === diagonals[(rotation + i) % 4]
      )
    );
  }

  return getAllCoordinates(lines).filter(isMiddleOfCrossMas).length;
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
