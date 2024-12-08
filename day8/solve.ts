import { solve } from "../runner/typescript";
import { groupBy } from "lodash";

type Point = { x: number; y: number };
type Parsed = { antennae: Point[][]; size: number };

function parser(input: string): Parsed {
  const lines = input.split("\n");
  const cells = lines.flatMap((line, y) =>
    line.split("").flatMap((char, x) => (char != "." ? [{ x, y, char }] : []))
  );
  return {
    antennae: Object.values(groupBy(cells, "char")),
    size: lines.length,
  };
}

function isEqual(a: Point, b: Point): boolean {
  return a.x === b.x && a.y === b.y;
}

function pairwise<T>(arr: T[]): [T, T][] {
  return arr.flatMap((a, i) => arr.slice(i + 1).map<[T, T]>((b) => [a, b]));
}

function countAntipodes(
  { size, antennae }: Parsed,
  isAntipode: (antennaOne: Point, antennaTwo: Point, test: Point) => boolean
): number {
  const points = new Set<string>();
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const test = { x, y };
      for (const antennaLocations of antennae) {
        for (const a of antennaLocations) {
          for (const b of antennaLocations) {
            if (isEqual(b, a)) continue;
            if (isAntipode(a, b, test)) {
              points.add(`${x},${y}`);
              break;
            }
          }
        }
      }
    }
  }
  return points.size;
}

function part1(data: Parsed): number {
  return countAntipodes(
    data,
    (antennaOne, antennaTwo, test) =>
      // Difference is twice the difference between the other antenna and the test point
      antennaOne.x - test.x == 2 * (antennaTwo.x - test.x) &&
      antennaOne.y - test.y == 2 * (antennaTwo.y - test.y)
  );
}

function part2(data: Parsed): number {
  return countAntipodes(
    data,
    (antennaOne, antennaTwo, test) =>
      // One of the antennas is the test point
      isEqual(antennaOne, test) ||
      isEqual(antennaTwo, test) ||
      // The gradient from the test point to the antennas is the same
      (antennaOne.x - test.x) / (antennaOne.y - test.y) ==
        (antennaTwo.x - test.x) / (antennaTwo.y - test.y)
  );
}

solve({
  parser,
  part1,
  part2,

  part1Tests: [
    [
      "............\n........0...\n.....0......\n.......0....\n....0.......\n......A.....\n............\n............\n........A...\n.........A..\n............\n............",
      14,
    ],
  ],
  part2Tests: [
    [
      "T.........\n...T......\n.T........\n..........\n..........\n..........\n..........\n..........\n..........\n..........",
      9,
    ],
    [
      "............\n........0...\n.....0......\n.......0....\n....0.......\n......A.....\n............\n............\n........A...\n.........A..\n............\n............",
      34,
    ],
  ],
});
