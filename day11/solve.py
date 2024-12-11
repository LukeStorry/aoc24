from runner.python import solve

import math
from collections import defaultdict


def blink(rock: int) -> list[int]:
  if rock == 0:
    return [1]

  num_digits = math.floor(math.log10(rock)) + 1
  if num_digits % 2 == 0:
    half_digits = num_digits // 2
    divisor = 10**half_digits
    right_half = rock % divisor
    left_half = rock // divisor
    return [left_half, right_half]

  return [rock * 2024]


def part1(input: str) -> int:
  rocks = list(map(int, input.split()))
  for _ in range(25):
    rocks = [r for rock in rocks for r in blink(rock)]
  return len(rocks)


def part2(input: str) -> int:
  rocks = list(map(int, input.split()))
  counts = {rock: 1 for rock in rocks}

  for _ in range(75):
    new_counts = defaultdict(int)
    for rock, count in counts.items():
      for new_rock in blink(rock):
        new_counts[new_rock] += count
    counts = new_counts

  return sum(counts.values())


solve(
  part1,
  "125 17",
  55312,
  part2,
  "125 17",
  65601038650482,
)
