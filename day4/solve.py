from runner.python import solve


def part1(input: str) -> int:
  grid = input.split("\n")

  return sum(
    all(
      0 <= (next_y := y + n * dy) < len(grid)
      and 0 <= (next_x := x + n * dx) < len(grid[next_y])
      and char == grid[next_y][next_x]
      for n, char in enumerate("XMAS")
    )
    for y in range(len(grid))
    for x in range(len(grid[0]))
    for dx in [-1, 0, 1]
    for dy in [-1, 0, 1]
  )


def part2(input: str) -> int:
  grid = input.split("\n")
  return sum(
    grid[y][x] == "A"
    and any(
      all(
        (rotated_index := (rotation + index) % 4) is not None
        and (next_y := y + [-1, 1, 1, -1][rotated_index]) >= 0
        and (next_x := x + [1, 1, -1, -1][rotated_index]) >= 0
        and grid[next_y][next_x] == char
        for index, char in enumerate("MMSS")
      )
      for rotation in range(4)
    )
    for y in range(len(grid) - 1)
    for x in range(len(grid[0]) - 1)
  )


solve(
  part1,
  "MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX\nXMASAMXAMM\nXXAMMXXAMA\nSMSMSASXSS\nSAXAMASAAA\nMAMMMXMMMM\nMXMXAXMASX",
  18,
  part2,
  "MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX\nXMASAMXAMM\nXXAMMXXAMA\nSMSMSASXSS\nSAXAMASAAA\nMAMMMXMMMM\nMXMXAXMASX",
  9,
)
