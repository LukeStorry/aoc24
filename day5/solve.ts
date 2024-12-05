import { sum } from "lodash";
import { solve } from "../runner/typescript";

type Parsed = { rules: [number, number][]; updates: number[][] };
function parser(input: string): Parsed {
  const [rulesStr, updatesStr] = input.split("\n\n");
  return {
    rules: rulesStr.split("\n").map((line) => {
      const [before, after] = line.split("|");
      return [Number(before), Number(after)];
    }),
    updates: updatesStr.split("\n").map((line) => line.split(",").map(Number)),
  };
}

function updateInRightOrder(rules: [number, number][], update: number[]) {
  return rules.every(([before, after]) => {
    const beforeIndex = update.findIndex((value) => value === before);
    const afterIndex = update.findIndex((value) => value === after);
    return beforeIndex === -1 || afterIndex === -1 || beforeIndex < afterIndex;
  });
}

function part1({ rules, updates }: Parsed): number {
  const printed = updates.filter((update) => updateInRightOrder(rules, update));
  const middleValues = printed.map(
    (update) => update[Math.floor(update.length / 2)]
  );
  return sum(middleValues);
}

function part2(values: any[]): any[] {
  function func2(a) {
    return a;
  }

  const out1 = func2(values[0]);

  console.log(out1);

  return values.map(func2);
}

solve({
  parser,
  part1,
  // part2,

  part1Tests: [
    [
      "47|53\n97|13\n97|61\n97|47\n75|29\n61|13\n75|53\n29|13\n97|29\n53|29\n61|53\n97|53\n61|29\n47|13\n75|47\n97|75\n47|61\n75|61\n47|29\n75|13\n53|13\n\n75,47,61,53,29\n97,61,53,29,13\n75,29,13\n75,97,47,61,53\n61,13,29\n97,13,75,29,47",
      143,
    ],
  ],
  part2Tests: [
    // ["aaa", 0],
    // ["a", 0],
  ],
});
