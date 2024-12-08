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


def count_antipodes(
  antennae: list[list[Point]],
  generate_antipodes: Callable[[int, int, int, int], set[Point]],
):
  antipodes = {
    point
    for antenna_group in antennae
    for antennaOne in antenna_group
    for antennaTwo in antenna_group
    if antennaOne != antennaTwo
    for point in generate_antipodes(*antennaOne, *antennaTwo)
  }
  return len(antipodes)


def part1(input):
  antennae, size = parser(input)

  def generate_antipodes(ax, ay, bx, by):
    dx = bx - ax
    dy = by - ay
    return [
      (x, y)
      for x, y in [(bx + dx, by + dy), (ax - dx, ay - dy)]
      if 0 <= x < size and 0 <= y < size
    ]

  return count_antipodes(antennae, generate_antipodes)


def part2(input):
  antennae, size = parser(input)

  def generate_antipodes(ax, ay, bx, by):
    dx = bx - ax
    dy = by - ay
    return {
      (ax + dx * i, ay + dy * i)
      for i in range(-size, size)
      if 0 <= ax + dx * i < size and 0 <= ay + dy * i < size
    }

  return count_antipodes(antennae, generate_antipodes)


solve(
  part1,
  "............\n........0...\n.....0......\n.......0....\n....0.......\n......A.....\n............\n............\n........A...\n.........A..\n............\n............",
  14,
  part2,
  "............\n........0...\n.....0......\n.......0....\n....0.......\n......A.....\n............\n............\n........A...\n.........A..\n............\n............",
  34,
)
