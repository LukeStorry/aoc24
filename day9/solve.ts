import { solve } from "../runner/typescript";
import { max, sum, groupBy, result } from "lodash";

const EMPTY = ".";
type FileSystem = (typeof EMPTY | number)[];
function parser(input: string): FileSystem {
  return input
    .split("")
    .flatMap((n, i) => Array(Number(n)).fill(i % 2 ? EMPTY : i / 2));
}

function part1(filesystem: FileSystem): number {
  while (true) {
    const lastFile = filesystem.findLastIndex((n) => n !== EMPTY);
    const firstEmpty = filesystem.indexOf(EMPTY);
    if (lastFile < firstEmpty) break;
    filesystem[firstEmpty] = filesystem[lastFile];
    filesystem[lastFile] = EMPTY;
  }
  return sum(filesystem.map((n, i) => i * (n != EMPTY ? n : 0)));
}

function part2(filesystem: FileSystem): number {
  const lastFile: number = filesystem.findLast((n) => n !== EMPTY) as number;
  for (let n = lastFile; n >= 0; n--) {
    const fileStart = filesystem.indexOf(n);
    const fileLength = filesystem.lastIndexOf(n) - fileStart + 1;

    let emptyStart = 0;
    while (emptyStart < fileStart) {
      while (filesystem[emptyStart] !== EMPTY) emptyStart++;
      let emptyLength = 0;
      while (filesystem[emptyStart + emptyLength] === EMPTY) emptyLength++;
      if (emptyLength >= fileLength) break;
      emptyStart += emptyLength + 1;
    }
    if (emptyStart >= fileStart) continue;
    for (let index = 0; index < fileLength; index++) {
      filesystem[emptyStart + index] = n;
      filesystem[fileStart + index] = EMPTY;
    }
  }

  return sum(filesystem.map((n, i) => i * (n !== EMPTY ? n : 0)));
}

solve({
  parser,
  part1,
  part2,

  part1Tests: [["2333133121414131402", 1928]],
  part2Tests: [["2333133121414131402", 2858]],
});
