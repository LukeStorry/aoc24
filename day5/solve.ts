import { solve as submit } from "../runner/typescript";

type Rule = [number, number];
type Update = number[];
type Parsed = { rules: Rule[]; updates: Update[] };
function parser(input: string): Parsed {
  const [rulesStr, updatesStr] = input.split("\n\n");
  return {
    rules: rulesStr
      .split("\n")
      .map((line) => line.split("|").map(Number) as Rule),
    updates: updatesStr.split("\n").map((line) => line.split(",").map(Number)),
  };
}

function isCorrectlyOrdered(rules: Rule[], update: Update) {
  return rules.every(([before, after]) => {
    const beforeIndex = update.findIndex((value) => value === before);
    const afterIndex = update.findIndex((value) => value === after);
    return beforeIndex === -1 || afterIndex === -1 || beforeIndex < afterIndex;
  });
}

function getMiddleValueSum(updates: Update[]): number {
  return updates
    .map((update) => update[Math.floor(update.length / 2)])
    .reduce((acc, curr) => acc + curr, 0);
}

function part1({ rules, updates }: Parsed): number {
  const correct = updates.filter((update) => isCorrectlyOrdered(rules, update));
  return getMiddleValueSum(correct);
}

function part2({ rules, updates }: Parsed): number {
  const comparator = (left: number, right: number): 1 | -1 | 0 => {
    const [applicableRule] = rules.find(
      ([b, a]) => (b == left && a == right) || (b == right && a == left)
    );
    if (!applicableRule) return 0;
    return applicableRule[0] == left ? 1 : -1;
  };

  const fixedUpdates = updates
    .filter((update) => !isCorrectlyOrdered(rules, update))
    .map((update) => update.sort(comparator));

  return getMiddleValueSum(fixedUpdates);
}

submit({
  parser,
  part1,
  part2,
  part1Tests: [
    [
      "47|53\n97|13\n97|61\n97|47\n75|29\n61|13\n75|53\n29|13\n97|29\n53|29\n61|53\n97|53\n61|29\n47|13\n75|47\n97|75\n47|61\n75|61\n47|29\n75|13\n53|13\n\n75,47,61,53,29\n97,61,53,29,13\n75,29,13\n75,97,47,61,53\n61,13,29\n97,13,75,29,47",
      143,
    ],
  ],
  part2Tests: [
    [
      "47|53\n97|13\n97|61\n97|47\n75|29\n61|13\n75|53\n29|13\n97|29\n53|29\n61|53\n97|53\n61|29\n47|13\n75|47\n97|75\n47|61\n75|61\n47|29\n75|13\n53|13\n\n75,47,61,53,29\n97,61,53,29,13\n75,29,13\n75,97,47,61,53\n61,13,29\n97,13,75,29,47",
      123,
    ],
  ],
});
