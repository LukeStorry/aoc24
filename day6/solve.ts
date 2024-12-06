import { solve } from "../runner/typescript";
import { max, sum, groupBy, values, uniqBy } from "lodash";

type Coord = `${number},${number}`;
function parser(input: string) {
  const lines = input.split("\n");
  const size = lines.length;
  const cells = lines.flatMap((l, y) =>
    l.split("").map((char, x) => ({ char, x, y }))
  );

  const guardPosition = cells.find(({ char }) => char === "^");

  const blocks = new Set(
    cells.filter(({ char }) => char === "#").map<Coord>((c) => `${c.x},${c.y}`)
  );
  return { blocks, guardPosition, size };
}
type Parsed = ReturnType<typeof parser>;

const directions = [
  { dx: 0, dy: -1 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: 1 },
  { dx: -1, dy: 0 },
];

function part1({ blocks, guardPosition, size }: Parsed): number {
  let current = { x: guardPosition.x, y: guardPosition.y };
  let visited: Set<Coord> = new Set();
  let direction = 0;

  while (
    current.x < size &&
    current.y < size &&
    current.x >= 0 &&
    current.y >= 0
  ) {
    visited.add(`${current.x},${current.y}`);

    const nextPosition = {
      x: current.x + directions[direction].dx,
      y: current.y + directions[direction].dy,
    };
    if (blocks.has(`${nextPosition.x},${nextPosition.y}`)) {
      direction = (direction + 1) % 4;
    } else {
      current = nextPosition;
    }
  }
  return Array.from(visited).length;
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
    [
      "....#.....\n.........#\n..........\n..#.......\n.......#..\n..........\n.#..^.....\n........#.\n#.........\n......#...",
      6,
    ],
  ],
});
