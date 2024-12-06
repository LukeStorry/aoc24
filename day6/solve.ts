import { solve } from "../runner/typescript";
import { max, sum, groupBy, values, uniqBy, isEqual, omit } from "lodash";

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
type Parsed = ReturnType<typeof parser>;

const directions = [
  { dx: 0, dy: -1 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: 1 },
  { dx: -1, dy: 0 },
];

function tryPatrol({ obstacles, start, size }: Parsed): {
  cyclic: boolean;
  visited: { x: number; y: number }[];
} {
  let visited = [];
  const visitedSet = new Set();
  let current = start;
  while (true) {
    if (
      current.x >= size ||
      current.y >= size ||
      current.x < 0 ||
      current.y < 0
    )
      return { cyclic: false, visited };

    // Set check instead of array.some gets from 8s to 0.1s!
    const hash = `${current.x},${current.y},${current.direction}`;
    if (visitedSet.has(hash)) return { cyclic: true, visited };
    visited.push(current);
    visitedSet.add(hash);

    const next = {
      ...current,
      x: current.x + directions[current.direction].dx,
      y: current.y + directions[current.direction].dy,
    };
    current = obstacles.has(`${next.x},${next.y}`)
      ? { ...current, direction: (current.direction + 1) % 4 }
      : next;
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
