lines = open("day6/input.txt").read().splitlines()
start = next(
  (x, y, 0)
  for y, line in enumerate(lines)
  for x, char in enumerate(line)
  if char == "^"
)
size = len(lines)


obstructions = {
  (x, y)
  for y, line in enumerate(lines)
  for x, char in enumerate(line)
  if char == "#"
}


def patrol(
  new_obstruction: tuple[int, int] | None = None,
) -> tuple[set[tuple[int, int]], int]:
  all_obstructions = obstructions | {new_obstruction}
  previous, visited = {start}, {(start[0], start[1])}
  state = start
  while True:
    x, y, direction = state
    dx, dy = [(0, -1), (1, 0), (0, 1), (-1, 0)][direction]
    next_x, next_y = x + dx, y + dy

    if not (0 <= next_x < size and 0 <= next_y < size):
      return visited, 0

    if (next_x, next_y) in all_obstructions:
      state = (x, y, (direction + 1) % 4)
    else:
      state = (next_x, next_y, direction)

    if state in previous:
      return visited, 1

    previous.add(state)
    visited.add((state[0], state[1]))


visited, _ = patrol()
part1 = len(visited)

part2 = sum(
  patrol((x, y))[1] for x, y in visited if (x, y, 0) != start
)

print(part1, part2)
