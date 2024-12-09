import { solve } from "../runner/typescript";
import { max, sum, groupBy, result } from "lodash";

type FileSystem = (undefined | number)[];
function parser(input: string): FileSystem {
  return input
    .split("")
    .flatMap((n, i) => Array(Number(n)).fill(i % 2 ? undefined : i / 2));
}

function part1(filesystem: FileSystem): number {
  while (true) {
    const lastBlock = filesystem.findLastIndex((n) => n !== undefined);
    const firstEmpty = filesystem.indexOf(undefined);
    if (lastBlock < firstEmpty) break;
    filesystem[firstEmpty] = filesystem[lastBlock];
    filesystem[lastBlock] = undefined;
  }
  return sum(filesystem.map((n, i) => i * (n ?? 0)));
}

function part2(values: FileSystem): number {
  return 0;
}

solve({
  parser,
  part1,
  // part2,

  part1Tests: [["2333133121414131402", 1928]],
  part2Tests: [],
});
