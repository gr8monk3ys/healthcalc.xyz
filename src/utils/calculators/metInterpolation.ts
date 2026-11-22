import { lastOf, type NonEmptyArray } from '@/utils/nonEmpty';

export interface MetTablePoint {
  speed: number;
  met: number;
}

/** Speed-ordered (slowest first) MET reference points. */
export type MetTable = NonEmptyArray<MetTablePoint>;

/** Linear MET interpolation by speed, clamped to the table's slowest and fastest points. */
export function interpolateMET(speedMph: number, table: MetTable): number {
  const [slowest, ...faster] = table;
  if (speedMph <= slowest.speed) return slowest.met;

  const fastest = lastOf(table);
  if (speedMph >= fastest.speed) return fastest.met;

  let lower = slowest;
  for (const upper of faster) {
    if (speedMph <= upper.speed) {
      const ratio = (speedMph - lower.speed) / (upper.speed - lower.speed);
      return lower.met + ratio * (upper.met - lower.met);
    }
    lower = upper;
  }

  return slowest.met;
}
