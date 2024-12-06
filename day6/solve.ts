import { solve } from "../runner/typescript";

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
    obstructions: new Set(
      cells.filter(({ char }) => char === "#").map(({ x, y }) => `${x},${y}`)
    ),
  };
}

function tryPatrol({ obstructions, start, size }: Parsed): {
  cyclic: boolean;
  visited: Set<string>;
} {
  const visited = new Set<string>();
  const visitedWithDirection = new Set<string>();
  let { x, y, direction } = start;
  while (true) {
    const hash = `${x},${y},${direction}`;
    if (visitedWithDirection.has(hash)) return { cyclic: true, visited };
    visitedWithDirection.add(hash);
    visited.add(`${x},${y}`);

    const nextX = [0, 1, 0, -1][direction] + x;
    const nextY = [-1, 0, 1, 0][direction] + y;
    if (nextX >= size || nextY >= size || nextX < 0 || nextY < 0)
      return { cyclic: false, visited };

    if (obstructions.has(`${nextX},${nextY}`)) {
      direction = (direction + 1) % 4;
    } else {
      x = nextX;
      y = nextY;
    }
  }
}

function part1(input: Parsed): number {
  return tryPatrol(input).visited.size;
}

function part2(input: Parsed): number {
  return Array.from(tryPatrol(input).visited)
    .map((o) => new Set([...input.obstructions, o]))
    .filter((obstructions) => tryPatrol({ ...input, obstructions }).cyclic)
    .length;
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
});
