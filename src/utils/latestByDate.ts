/**
 * Latest and second-latest entries by `date`, in one pass.
 *
 * Replaces "sort the whole group, read [0] and [1]": O(n) instead of
 * O(n log n), and the input array is never mutated. Ties keep input order,
 * matching what a stable descending sort would return.
 */
export function latestTwoByDate<T extends { date: string }>(
  points: readonly T[]
): [T | undefined, T | undefined] {
  let latest: T | undefined;
  let previous: T | undefined;
  let latestTime = -Infinity;
  let previousTime = -Infinity;
  for (const point of points) {
    const time = new Date(point.date).getTime();
    if (time > latestTime) {
      previous = latest;
      previousTime = latestTime;
      latest = point;
      latestTime = time;
    } else if (time > previousTime) {
      previous = point;
      previousTime = time;
    }
  }
  return [latest, previous];
}
