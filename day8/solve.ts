import { solve } from "../runner/typescript";
import { groupBy, range } from "lodash";

type Point = { x: number; y: number };
const isEqual = (a: Point, b: Point) => a.x === b.x && a.y === b.y;
const gradient = (a: Point, b: Point) => (a.x - b.x) / (a.y - b.y);
const distance = (a: Point, b: Point) =>
  Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

function parser(input: string) {
  const lines = input.split("\n");
  const cells = lines.flatMap((line, y) =>
    line.split("").flatMap((char, x) => (char != "." ? [{ x, y, char }] : []))
  );
  return {
    antennaeByType: Object.values(groupBy(cells, "char")),
    size: lines.length,
  };
}
type Parsed = ReturnType<typeof parser>;

function countAntipodes(
  { size, antennaeByType }: Parsed,
  isAntipode: (test: Point, antennaOne: Point, antennaTwo: Point) => boolean
): number {
  const grid = range(size).flatMap((x) => range(size).map((y) => ({ x, y })));
  return grid.filter((test: Point) =>
    antennaeByType.some((antennae) =>
      antennae.some((a) =>
        antennae.some((b) => !isEqual(a, b) && isAntipode(test, a, b))
      )
    )
  ).length;
}

function part1(data: Parsed): number {
  return countAntipodes(
    data,
    (test, antennaOne, antennaTwo) =>
      distance(antennaOne, test) == 2 * distance(antennaTwo, test) &&
      gradient(antennaOne, test) === gradient(antennaTwo, test)
  );
}

function part2(data: Parsed): number {
  return countAntipodes(
    data,
    (test, antennaOne, antennaTwo) =>
      isEqual(antennaOne, test) ||
      gradient(antennaOne, test) === gradient(antennaTwo, test)
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
