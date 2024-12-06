import { solve } from "../runner/typescript";
import { max, sum, groupBy, values, uniqBy } from "lodash";

type Coord = { x: number; y: number };
function parser(input: string) {
  const lines = input.split("\n").map((l) => l.split(""));
  const width = lines[0].length;
  const height = lines.length;
  let guardPosition;
  const blocks: Coord[] = [];
  lines.forEach((line, y) => {
    line.forEach((char, x) => {
      if (char === ".") return;
      if (char === "#") {
        blocks.push({ x, y });
      }
      if (char === "^") {
        guardPosition = { x, y };
      }
    });
  });
  return { blocks, guardPosition, width, height };
}
type Parsed = ReturnType<typeof parser>;

const directions = [
  { dx: 0, dy: -1 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: 1 },
  { dx: -1, dy: 0 },
];

function part1({ blocks, guardPosition, width, height }: Parsed): number {
  console.log({ blocks, guardPosition, width, height });

  let visited: Coord[] = [];
  let direction = directions[0];
  while (
    guardPosition.x < width &&
    guardPosition.y < height &&
    guardPosition.x >= 0 &&
    guardPosition.y >= 0
  ) {
    visited.push(guardPosition);

    const nextPosition = {
      x: guardPosition.x + direction.dx,
      y: guardPosition.y + direction.dy,
    };
    if (blocks.some((b) => b.x === nextPosition.x && b.y === nextPosition.y)) {
      direction = directions[(directions.indexOf(direction) + 1) % 4];
    } else {
      guardPosition = nextPosition;
    }
  }
  return uniqBy(visited, (v) => `${v.x},${v.y}`).length;
}

function part2(values: Parsed): number {
  return 0;
}

solve({
  parser,
  part1,
  // part2,

  part1Tests: [
    [
      "....#.....\n.........#\n..........\n..#.......\n.......#..\n..........\n.#..^.....\n........#.\n#.........\n......#...",
      41,
    ],
  ],
  part2Tests: [
    // ["aaa", 0],
    // ["a", 0],
  ],
});
