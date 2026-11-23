import { describe, expect, it } from 'vitest';
import { lastOf } from './nonEmpty';

describe('lastOf', () => {
  it('returns the only element of a single-item list', () => {
    expect(lastOf([7])).toBe(7);
  });

  it('returns the final element of a longer list', () => {
    expect(lastOf([1, 2, 3])).toBe(3);
  });
});
