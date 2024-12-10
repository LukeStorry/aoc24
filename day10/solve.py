from runner.python import solve


def parse_map(input: str) -> list[list[int]]:
  return [list(map(int, line)) for line in input.split("\n")]


def find_trailheads(map: list[list[int]]) -> list[tuple[int, int]]:
  return [
    (x, y)
    for y in range(len(map))
    for x in range(len(map[0]))
    if map[y][x] == 0
  ]


def find_end_of_all_trails(
  x: int,
  y: int,
  map: list[list[int]],
) -> list[tuple[int, int]]:
  if map[y][x] == 9:
    return [(x, y)]

  return [
    trail_end
    for next_x, next_y in [(x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)]
    if 0 <= next_y < len(map)
    and 0 <= next_x < len(map[0])
    and map[next_y][next_x] == map[y][x] + 1
    for trail_end in find_end_of_all_trails(next_x, next_y, map)
  ]


def part1(input: str) -> int:
  map = parse_map(input)
  return sum(
    len(set(find_end_of_all_trails(x, y, map)))
    for x, y in find_trailheads(map)
  )


def part2(input: str) -> int:
  map = parse_map(input)
  return sum(
    len(find_end_of_all_trails(x, y, map)) for x, y in find_trailheads(map)
  )


solve(
  part1,
  "89010123\n78121874\n87430965\n96549874\n45678903\n32019012\n01329801\n10456732",
  36,
  part2,
  "89010123\n78121874\n87430965\n96549874\n45678903\n32019012\n01329801\n10456732",
  81,
)
