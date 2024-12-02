from runner.python import solve
from collections import Counter


def parse(input):
  nums = [
    [int(num) for num in line.split("   ")]
    for line in input.split("\n")
  ]
  return list(zip(*nums))


def part1(input):
  left, right = parse(input)
  return sum(abs(l - r) for l, r in zip(sorted(left), sorted(right)))


def part2(input):
  left, right = parse(input)
  counts = Counter(right)
  return sum(l * counts.get(l, 0) for l in left)


solve(
  part1,
  "3   4\n4   3\n2   5\n1   3\n3   9\n3   3",
  11,
  part2,
  "3   4\n4   3\n2   5\n1   3\n3   9\n3   3",
  31,
)
