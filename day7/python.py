input = open("day7/input.txt").read()


equations = [
  (
    int(line.split(": ")[0]),
    [int(x) for x in line.split(": ")[1].split(" ")],
  )
  for line in input.splitlines()
]


def can_be_solved(target: int, values: list[int], with_concat=False):
  queue = [(1, values[0])]

  while queue:
    index, subtotal = queue.pop()
    if index == len(values):
      if subtotal == target:
        return True
      continue

    next_val = values[index]
    queue.append((index + 1, subtotal + next_val))
    queue.append((index + 1, subtotal * next_val))
    if with_concat:
      queue.append((index + 1, int(str(subtotal) + str(next_val))))
  return False


part1 = sum(
  target
  for target, values in equations
  if can_be_solved(target, values)
)


part2 = sum(
  target
  for target, values in equations
  if can_be_solved(target, values, with_concat=True)
)

print(part1, part2)
