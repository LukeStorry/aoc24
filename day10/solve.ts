import { solve } from "../runner/typescript";
import { max, sum, groupBy, uniq } from "lodash";

function parser(input: string) {
  return input.split("\n").map((l) => l.split("").map(Number));
}

function findEndOfAllTrails(
  map: number[][],
  x: number,
  y: number
): `${number},${number}`[] {
  const current = map[y][x];
  if (current === 9) return [`${x},${y}`]; // TODO what if already found?

  return [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ]
    .filter(
      ([nextX, nextY]) =>
        !!map[nextY]?.[nextX] && map[nextY][nextX] === current + 1
    )
    .flatMap(([nextX, nextY]) => findEndOfAllTrails(map, nextX, nextY));
}

function part1(map: number[][]): number {
  // coordinates of all 0s on the map
  const trailheads = map.flatMap((row, y) =>
    row.flatMap((value, x) => (value === 0 ? [[x, y]] : []))
  );

  console.log({ trailheads });
  const scores = trailheads.map(
    ([x, y]) => uniq(findEndOfAllTrails(map, x, y)).length
  );

  console.log({ scores });
  return sum(scores);
}

function part2(map: number[][]): number {
  return 0;
}

solve({
  parser,
  part1,
  // part2,

  part1Tests: [
    ["...0...\n...1...\n...2...\n6543456\n7.....7\n8.....8\n9.....9", 2],
    [
      "89010123\n78121874\n87430965\n96549874\n45678903\n32019012\n01329801\n10456732",
      36,
    ],
  ],
  part2Tests: [
    // ["aaa", 0],
    // ["a", 0],
  ],
});
