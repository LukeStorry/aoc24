from functools import cmp_to_key
from runner.python import solve


def parse(input: str):
  rules, updates = input.split("\n\n")
  return (
    [tuple(map(int, line.split("|"))) for line in rules.splitlines()],
    [list(map(int, update.split(","))) for update in updates.splitlines()],
  )


def isCorrectlyOrdered(
  rules: list[tuple[int, int]], update: list[int]
) -> bool:
  return all(
    beforeIndex < afterIndex or beforeIndex == -1 or afterIndex == -1
    for before, after in rules
    if before in update
    and after in update
    and (beforeIndex := update.index(before)) >= 0
    and (afterIndex := update.index(after)) >= 0
  )


def part1(input: str) -> int:
  rules, updates = parse(input)
  correct_updates = [
    update for update in updates if isCorrectlyOrdered(rules, update)
  ]
  return sum(update[len(update) // 2] for update in correct_updates)


def orderCorrectly(
  rules: list[tuple[int, int]], update: list[int]
) -> list[int]:
  def compare(left: int, right: int) -> int:
    return next(
      (
        (1 if rule[0] == left else -1)
        for rule in rules
        if rule == (left, right) or rule == (right, left)
      ),
      0,
    )

  return sorted(update, key=cmp_to_key(compare))


def part2(input: str) -> int:
  rules, updates = parse(input)
  return sum(
    orderCorrectly(rules, update)[len(update) // 2]
    for update in updates
    if not isCorrectlyOrdered(rules, update)
  )


solve(
  part1,
  "47|53\n97|13\n97|61\n97|47\n75|29\n61|13\n75|53\n29|13\n97|29\n53|29\n61|53\n97|53\n61|29\n47|13\n75|47\n97|75\n47|61\n75|61\n47|29\n75|13\n53|13\n\n75,47,61,53,29\n97,61,53,29,13\n75,29,13\n75,97,47,61,53\n61,13,29\n97,13,75,29,47",
  143,
  part2,
  "47|53\n97|13\n97|61\n97|47\n75|29\n61|13\n75|53\n29|13\n97|29\n53|29\n61|53\n97|53\n61|29\n47|13\n75|47\n97|75\n47|61\n75|61\n47|29\n75|13\n53|13\n\n75,47,61,53,29\n97,61,53,29,13\n75,29,13\n75,97,47,61,53\n61,13,29\n97,13,75,29,47",
  123,
)
