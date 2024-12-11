map = [list(map(int, line)) for line in open("day10/input.txt").read().splitlines()]

def get_trail_ends_from(x, y):
  if map[y][x] == 9:
    return [(x, y)]
  next_steps = [
    (nx, ny)
    for nx, ny in [(x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)]
    if 0 <= ny < len(map) and 0 <= nx < len(map[0]) and map[ny][nx] == map[y][x] + 1
  ]
  return [ends for step in next_steps for ends in get_trail_ends_from(*step)]

trailheads = [(x, y) for y in range(len(map)) for x in range(len(map[0])) if map[y][x] == 0]
trails = [get_trail_ends_from(*head) for head in trailheads]
part1 = sum(len(set(ends)) for ends in trails)
part2 = sum(len(ends) for ends in trails)
print(part1, part2)
