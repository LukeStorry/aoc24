from runner.python import solve

# Simple type aliases for better readability
Coords = tuple[int, int]
State = tuple[int, int, int]  # x, y, direction
Parsed = tuple[int, State, set[Coords]]


def parser(input: str) -> Parsed:
  lines = input.split("\n")
  start = next(
    (x, y, 0)
    for y, line in enumerate(lines)
    for x, char in enumerate(line)
    if char == "^"
  )
  obstructions = {
    (x, y)
    for y, line in enumerate(lines)
    for x, char in enumerate(line)
    if char == "#"
  }
  return len(lines), start, obstructions


DIRECTIONS = [(0, -1), (1, 0), (0, 1), (-1, 0)]


def try_patrol(parsed: Parsed) -> tuple[set[Coords], bool]:
  size, start, obstructions = parsed
  visited = {(start[0], start[1])}
  previous_states = {start}
  x, y, direction = start

  while True:
    dx, dy = DIRECTIONS[direction]
    next_x, next_y = x + dx, y + dy

    if not (0 <= next_x < size and 0 <= next_y < size):
      return visited, False

    if (next_x, next_y) in obstructions:
      direction = (direction + 1) % 4
      next_state = (x, y, direction)
    else:
      next_state = (next_x, next_y, direction)
      x, y = next_x, next_y

    if next_state in previous_states:
      return visited, True

    previous_states.add(next_state)
    visited.add((next_state[0], next_state[1]))


def part1(input: str) -> int:
  visited, _ = try_patrol(parser(input))
  return len(visited)


def part2(input: str) -> int:
  size, start, obstructions = parser(input)
  visited, _ = try_patrol((size, start, obstructions))

  return sum(
    try_patrol((size, start, obstructions | {o}))[1]
    for o in visited - {(start[0], start[1])}
  )


solve(
  part1,
  """....#.....\n.........#\n..........\n..#.......\n.......#..\n..........\n.#..^.....\n........#.\n#.........\n......#...""",
  41,
  part2,
  """....#.....\n.........#\n..........\n..#.......\n.......#..\n..........\n.#..^.....\n........#.\n#.........\n......#...""",
  6,
)
