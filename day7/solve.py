from collections import deque
from runner.python import solve


def parse(input):
  return [
    (
      int(line.split(": ")[0]),
      [int(x) for x in line.split(": ")[1].split(" ")],
    )
    for line in input.splitlines()
  ]


def can_be_solved(target: int, values: list[int], with_concat=False):
  queue = [(1, values[0])]  # index, subtotal

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


def part1(input):
  return sum(
    target
    for target, values in parse(input)
    if can_be_solved(target, values)
  )


def part2(input):
  return sum(
    target
    for target, values in parse(input)
    if can_be_solved(target, values, with_concat=True)
  )


solve(
  part1,
  "190: 10 19\n3267: 81 40 27\n83: 17 5\n156: 15 6\n7290: 6 8 6 15\n161011: 16 10 13\n192: 17 8 14\n21037: 9 7 18 13\n292: 11 6 16 20",
  3749,
  part2,
  "190: 10 19\n3267: 81 40 27\n83: 17 5\n156: 15 6\n7290: 6 8 6 15\n161011: 16 10 13\n192: 17 8 14\n21037: 9 7 18 13\n292: 11 6 16 20",
  11387,
)
