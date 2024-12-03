from re import findall
from runner.python import solve


def part1(input):
  matches = findall(r"mul\((\d{1,3}),(\d{1,3})\)", input)
  muls = [int(x) * int(y) for x, y in matches]
  return sum(muls)


def part2(input):
  matches = findall(
    r"(do\(\)|don\'t\(\))|mul\((\d{1,3}),(\d{1,3})\)", input
  )
  enabled = True
  return sum(
    int(x) * int(y)
    for switch, x, y in matches
    if (x and y and enabled)
    or (
      (switch == "do()" and (enabled := True) and False)
      or (switch == "don't()" and (enabled := False))
    )
  )


solve(
  part1,
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",
  161,
  part2,
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
  48,
)
