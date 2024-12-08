from itertools import combinations

lines = open("day8/input.txt").readlines()
size = len(lines)
types = {char for line in lines for char in line if char != "."}
antennae_by_type = [
  [
    (x, y)
    for y, line in enumerate(lines)
    for x, char in enumerate(line)
    if char == type
  ]
  for type in types
]

part1 = len(
  {
    (x, y)
    for antennae in antennae_by_type
    for a, b in combinations(antennae, 2)
    for x, y in [
      (b[0] + (b[0] - a[0]), b[1] + (b[1] - a[1])),
      (a[0] - (b[0] - a[0]), a[1] - (b[1] - a[1])),
    ]
    if 0 <= x < size and 0 <= y < size
  }
)

part2 = len(
  {
    (x, y)
    for antennae in antennae_by_type
    for a, b in combinations(antennae, 2)
    for mul in range(-size, size)
    if 0 <= (x := a[0] + (b[0] - a[0]) * mul) < size
    and 0 <= (y := a[1] + (b[1] - a[1]) * mul) < size
  }
)

print(part1, part2)
