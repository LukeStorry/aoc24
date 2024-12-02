import { solve } from "../runner/typescript";

function isSafe(report: number[]): boolean {
  const ascending = report[1] > report[0];
  return report.every((level, index) => {
    if (index === 0) return true;
    const diff = level - report[index - 1];
    return ascending ? diff > 0 && diff <= 3 : diff < 0 && diff >= -3;
  });
}

function isSafeWithDampener(report: number[]): boolean {
  return (
    isSafe(report) ||
    report.some((_, index) => isSafe(report.filter((_, i) => i !== index)))
  );
}

solve({
  parser: (input) =>
    input.split("\n").map((line) => line.match(/\d+/g).map(Number)),
  part1: (reports) => reports.filter(isSafe).length,
  part2: (reports) => reports.filter(isSafeWithDampener).length,

  part1Tests: [
    ["7 6 4 2 1\n1 2 7 8 9\n9 7 6 2 1\n1 3 2 4 5\n8 6 4 4 1\n1 3 6 7 9", 2],
  ],
  part2Tests: [
    ["7 6 4 2 1\n1 2 7 8 9\n9 7 6 2 1\n1 3 2 4 5\n8 6 4 4 1\n1 3 6 7 9", 4],
  ],
});
