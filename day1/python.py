from collections import Counter

input = open("day1/input.txt").read()
left, right = zip(
  *(
    (int(num) for num in line.split("   "))
    for line in input.split("\n")
  )
)
part1 = sum(abs(l - r) for l, r in zip(sorted(left), sorted(right)))
counts = Counter(right)
part2 = sum(l * counts.get(l, 0) for l in left)
print(part1, part2)
