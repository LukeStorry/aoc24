from collections import defaultdict
from math import log10
rocks = list(map(int, open("day11/input.txt").read().split()))

def part(part: int) -> int:
  counts = {rock: 1 for rock in rocks}
  for _ in range(25 if part == 1 else 75):
    new_counts: defaultdict[int, int] = defaultdict(int)
    for rock, count in counts.items():
      if rock == 0:
        new_counts[1] += count
      elif 0 == (digits := int(log10(rock)) + 1) % 2:
        new_counts[rock // 10 ** (digits // 2)] += count
        new_counts[rock % 10 ** (digits // 2)] += count
      else:
        new_counts[rock * 2024] += count
    counts = new_counts
  return sum(counts.values())

print(part(1), part(2))  # 186424 219838428124832