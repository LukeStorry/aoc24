from runner.python import solve
from collections import defaultdict
from math import log10


def iterate(rocks, times: int) -> int:
  counts = {rock: 1 for rock in rocks}
  for _ in range(times):
    new_counts: defaultdict[int, int] = defaultdict(int)
    for rock, count in counts.items():
      if rock == 0:
        new_counts[1] += count
      elif 0 == (digits := int(log10(rock)) + 1) % 2:
        divisor = 10 ** (digits // 2)
        new_counts[rock // divisor] += count
        new_counts[rock % divisor] += count
      else:
        new_counts[rock * 2024] += count
    counts = new_counts
  return sum(counts.values())


def part1(input: str) -> int:
  rocks = list(map(int, input.split()))
  return iterate(rocks, 25)


def part2(input: str) -> int:
  rocks = list(map(int, input.split()))
  return iterate(rocks, 75)


solve(
  part1,
  "125 17",
  55312,
  part2,
  "125 17",
  65601038650482,
)
