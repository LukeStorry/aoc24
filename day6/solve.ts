import { solve } from "../runner/typescript";
import { max, sum, groupBy, values, uniqBy, isEqual, omit } from "lodash";

const directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

type Parsed = ReturnType<typeof parser>;
function parser(input: string) {
  const lines = input.split("\n");
  const size = lines.length;
  const cells = lines.flatMap((l, y) =>
    l.split("").map((char, x) => ({ char, x, y }))
  );
  const guard = cells.find(({ char }) => char === "^");
  const start = { direction: 0, x: guard.x, y: guard.y }!;
  const obstacles = new Set(
    cells.filter(({ char }) => char === "#").map((c) => `${c.x},${c.y}`)
  );
  const emptyCells = cells.filter(({ char }) => char === ".");
  return { obstacles, start, size, emptyCells };
}

function tryPatrol({ obstacles, start, size }: Parsed): {
  cyclic: boolean;
  visited: { x: number; y: number }[];
} {
  let visited = [];
  const visitedSet = new Set();
  let { x, y, direction } = start;
  while (true) {
    if (x >= size || y >= size || x < 0 || y < 0)
      return { cyclic: false, visited };

    const hash = `${x},${y},${direction}`;
    if (visitedSet.has(hash)) return { cyclic: true, visited };
    visited.push({ x, y });
    visitedSet.add(hash);

    const [dx, dy] = directions[direction];
    const nextX = x + dx;
    const nextY = y + dy;
    if (obstacles.has(`${nextX},${nextY}`)) {
      direction = (direction + 1) % 4;
    } else {
      x = nextX;
      y = nextY;
    }
  }
}

function part1(input: Parsed): number {
  const { visited } = tryPatrol(input);

  return uniqBy(visited, (v) => `${v.x},${v.y}`).length;
}

function part2(input: Parsed): number {
  return input.emptyCells
    .map(({ x, y }) => new Set([...input.obstacles, `${x},${y}`]))
    .filter((obstacles) => tryPatrol({ ...input, obstacles }).cyclic).length;
}

solve({
  parser,
  part1,
  part2,

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
  onlyTests: true,
});
