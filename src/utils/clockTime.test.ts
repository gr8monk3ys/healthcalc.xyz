import { describe, expect, it } from 'vitest';
import { parseClockTime } from './clockTime';

describe('parseClockTime', () => {
  it('splits HH:MM into numbers', () => {
    expect(parseClockTime('07:05')).toEqual({ hours: 7, minutes: 5 });
  });

  it('yields NaN for a missing minutes part instead of undefined', () => {
    const { hours, minutes } = parseClockTime('07');
    expect(hours).toBe(7);
    expect(minutes).toBeNaN();
  });
});
