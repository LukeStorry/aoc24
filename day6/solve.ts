import { solve } from "../runner/typescript";
import { uniqBy } from "lodash";

type Parsed = ReturnType<typeof parser>;
function parser(input: string) {
  const lines = input.split("\n");
  const cells = lines.flatMap((l, y) =>
    l.split("").map((char, x) => ({ char, x, y }))
  );
  const guard = cells.find(({ char }) => char === "^");
  return {
    size: lines.length,
    start: { direction: 0, x: guard.x, y: guard.y }!,
    obstacles: new Set(
      cells.filter(({ char }) => char === "#").map(({ x, y }) => `${x},${y}`)
    ),
    emptyCells: cells
      .filter(({ char }) => char === ".")
      .map(({ x, y }) => ({ x, y })),
  };
}

const move = [
  (x, y) => [x, y - 1],
  (x, y) => [x + 1, y],
  (x, y) => [x, y + 1],
  (x, y) => [x - 1, y],
];
function tryPatrol({ obstacles, start, size }: Parsed): {
  cyclic: boolean;
  visited: Set<string>;
} {
  const visited = new Set<string>();
  let { x, y, direction } = start;
  while (true) {
    const hash = `${x},${y},${direction}`;
    if (visited.has(hash)) return { cyclic: true, visited };
    visited.add(hash);

    const [nextX, nextY] = move[direction](x, y);
    if (nextX >= size || nextY >= size || nextX < 0 || nextY < 0)
      return { cyclic: false, visited };

    if (obstacles.has(`${nextX},${nextY}`)) {
      direction = (direction + 1) % 4;
    } else {
      [x, y] = [nextX, nextY];
    }
  }
}

function part1(input: Parsed): number {
  const { visited } = tryPatrol(input);
  return uniqBy(Array.from(visited), (v) => v.slice(0, -1)).length;
}

function part2(input: Parsed): number {
  return input.emptyCells
    .map(({ x, y }) =>
      tryPatrol({
        ...input,
        obstacles: new Set([...input.obstacles, `${x},${y}`]),
      })
    )
    .filter((patrol) => patrol.cyclic).length;
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
