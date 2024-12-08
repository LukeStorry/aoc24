import { solve } from "../runner/typescript";
import { max, sum, groupBy, range } from "lodash";

function parser(input: string) {
  const lines = input.split("\n");
  const size = lines.length;
  const cells = lines
    .flatMap((l, y) =>
      l.split("").map((char, x) => (char == "." ? null : { x, y, char }))
    )
    .filter((c) => !!c);
  const antennae = groupBy(cells, "char");

  // const firstLine = lines[0];
  // const first = lineParser(firstLine);

  return { antennae, size };
}
type Parsed = ReturnType<typeof parser>;

function print(
  size: number,
  antennae: Record<string, { x: number; y: number }[]>,
  antinodes: Set<string>
) {
  const grid = range(size).map(() => range(size).map(() => "."));
  for (const [antenna, locations] of Object.entries(antennae)) {
    for (const { x, y } of locations) {
      grid[y][x] = antenna;
    }
  }
  for (const a of antinodes) {
    const [x, y] = a.split(",").map(Number);
    grid[y][x] = "#";
  }
  console.log(grid.map((r) => r.join("")).join("\n"));
}

function part1({ size, antennae }: Parsed): number {
  const antinodes = new Set<string>();
  for (const x of range(size)) {
    for (const y of range(size)) {
      for (const locations of Object.values(antennae)) {
        for (const { x: ax, y: ay } of locations) {
          for (const { x: bx, y: by } of locations) {
            if (ax == bx && ay == by) continue;
            const adx = ax - x;
            const ady = ay - y;
            const bdx = bx - x;
            const bdy = by - y;
            if (
              (adx == 2 * bdx && ady == 2 * bdy) ||
              (adx == -2 * bdx && ady == -2 * bdy)
            ) {
              antinodes.add(`${x},${y}`);
            }
          }
        }
      }
    }
  }

  return antinodes.size;
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
      "............\n........0...\n.....0......\n.......0....\n....0.......\n......A.....\n............\n............\n........A...\n.........A..\n............\n............",
      14,
    ],
  ],
  part2Tests: [
    // ["aaa", 0],
    // ["a", 0],
  ],
});
