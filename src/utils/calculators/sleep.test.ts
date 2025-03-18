import { describe, it, expect } from 'vitest';
import { calculateSleepTimes } from './sleep';

describe('Sleep Calculator', () => {
  it('calculates sleep recommendations for wake time', () => {
    const result = calculateSleepTimes('07:00', 'wake');
    expect(result.recommendations.length).toBe(4);
  });

  it('throws on invalid time', () => {
    expect(() => calculateSleepTimes('invalid', 'wake')).toThrow();
  });
});
