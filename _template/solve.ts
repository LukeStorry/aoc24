import { solve } from "../runner/typescript";
import { max, sum, groupBy } from "lodash";

function parser(input: string) {
  function lineParser(line: string) {
    console.log(line);

    const values = line.match(/\d/g).map(Number);
    console.log(values);
    console.log("\n");

    return values;
  }

  const lines = input.split("\n");
  // const firstLine = lines[0];
  // const first = lineParser(firstLine);

  // return [first];
  const result = lines.map(lineParser);
  return result;
}
type Parsed = ReturnType<typeof parser>;

function part1(values: Parsed): number {
  console.log({ values });

  return 0;
}

function part2(values: Parsed): number {
  return 0;
}

solve({
  parser,
  part1,
  // part2,

  part1Tests: [
    ["aaa", 0],
    // ["a", 0],
  ],
  part2Tests: [
    // ["aaa", 0],
    // ["a", 0],
  ],
});
