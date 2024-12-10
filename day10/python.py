map = [
  list(map(int, line))
  for line in open("day10/input.txt").read().splitlines()
]
trailheads = [
  (x, y)
  for y in range(len(map))
  for x in range(len(map[0]))
  if map[y][x] == 0
]


def get_trail_ends_from(x: int, y: int):
  if map[y][x] == 9:
    return [(x, y)]

  return [
    trail_end
    for next_x, next_y in [(x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)]
    if 0 <= next_y < len(map)
    and 0 <= next_x < len(map[0])
    and map[next_y][next_x] == map[y][x] + 1
    for trail_end in get_trail_ends_from(next_x, next_y)
  ]


trail_ends = [get_trail_ends_from(x, y) for x, y in trailheads]
part1 = sum(len(set(trail_end)) for trail_end in trail_ends)
part2 = sum(len(trail_end) for trail_end in trail_ends)
print(part1, part2)
