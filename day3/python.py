from re import findall

input = open("day3/input.txt").read()

part1 = sum(
  int(x) * int(y)
  for x, y in findall(r"mul\((\d{1,3}),(\d{1,3})\)", input)
)

enabled = True
part2 = sum(
  int(x) * int(y)
  for switch, x, y in findall(
    r"(do|don\'t)\(\)|mul\((\d{1,3}),(\d{1,3})\)", input
  )
  if (x and y and enabled)
  or (switch == "do" and (enabled := True) and False)
  or (switch == "don't" and (enabled := False))
)

print(part1, part2)
