import { describe, expect, it } from 'vitest';
import { interpolateMET, type MetTable } from './metInterpolation';

const TABLE: MetTable = [
  { speed: 2, met: 3 },
  { speed: 4, met: 5 },
  { speed: 8, met: 9 },
];

describe('interpolateMET', () => {
  it('clamps below the slowest and above the fastest point', () => {
    expect(interpolateMET(1, TABLE)).toBe(3);
    expect(interpolateMET(20, TABLE)).toBe(9);
  });

  it('returns the exact MET at a table point', () => {
    expect(interpolateMET(4, TABLE)).toBe(5);
  });

  it('interpolates linearly between neighbouring points', () => {
    expect(interpolateMET(3, TABLE)).toBe(4);
    expect(interpolateMET(6, TABLE)).toBe(7);
  });

  it('works with a single-point table', () => {
    expect(interpolateMET(5, [{ speed: 3, met: 4 }])).toBe(4);
  });
});
