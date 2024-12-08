from typing import Callable
from runner.python import solve

Point = tuple[int, int]


def parser(input):
  lines = input.split("\n")
  antennae = [
    [
      (x, y)
      for y, line in enumerate(lines)
      for x, char in enumerate(line)
      if char == antenna_type
    ]
    for antenna_type in {
      char for line in lines for char in line if char != "."
    }
  ]

  return (antennae, len(lines))


def gradient(a, b):
  return (
    (a[0] - b[0]) / (a[1] - b[1])
    if (a[1] - b[1]) != 0
    else float("inf")
  )


def distance(a, b):
  return abs(a[0] - b[0]) + abs(a[1] - b[1])


def count_antipodes(
  antennae: list[list[Point]],
  size: int,
  is_antipode: Callable[[Point, Point, Point], bool],
):
  grid = [(x, y) for x in range(size) for y in range(size)]

  return sum(
    any(
      any(
        any(a != b and is_antipode(test, a, b) for b in antenna)
        for a in antenna
      )
      for antenna in antennae
    )
    for test in grid
  )


def part1(input):
  antennae, size = parser(input)

  def is_antipode(test, antenna_one, antenna_two):
    return distance(antenna_one, test) == 2 * distance(
      antenna_two, test
    ) and gradient(antenna_one, test) == gradient(antenna_two, test)

  return count_antipodes(antennae, size, is_antipode)


def part2(input):
  antennae, size = parser(input)

  def is_antipode(test, antenna_one, antenna_two):
    return antenna_one == test or gradient(
      antenna_one, test
    ) == gradient(antenna_two, test)

  return count_antipodes(antennae, size, is_antipode)


solve(
  part1,
  "............\n........0...\n.....0......\n.......0....\n....0.......\n......A.....\n............\n............\n........A...\n.........A..\n............\n............",
  14,
  part2,
  "............\n........0...\n.....0......\n.......0....\n....0.......\n......A.....\n............\n............\n........A...\n.........A..\n............\n............",
  34,
)
