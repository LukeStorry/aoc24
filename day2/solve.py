from re import findall
from runner.python import solve


def parse(input):
  return [
    [int(n) for n in findall(r"\d+", line)]
    for line in input.split("\n")
  ]


def is_safe(report):
  return (
    report == sorted(report) or report == sorted(report, reverse=True)
  ) and all(
    report[i] - report[i - 1] != 0
    and abs(report[i] - report[i - 1]) <= 3
    for i in range(1, len(report))
  )


def is_safe_with_dampener(report):
  return any(
    is_safe(report[:i] + report[i + 1 :]) for i in range(len(report))
  )


def part1(input):
  return sum(is_safe(report) for report in parse(input))


def part2(input):
  return sum(is_safe_with_dampener(report) for report in parse(input))


solve(
  part1,
  "7 6 4 2 1\n1 2 7 8 9\n9 7 6 2 1\n1 3 2 4 5\n8 6 4 4 1\n1 3 6 7 9",
  2,
  part2,
  "7 6 4 2 1\n1 2 7 8 9\n9 7 6 2 1\n1 3 2 4 5\n8 6 4 4 1\n1 3 6 7 9",
  4,
)
