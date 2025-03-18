import { describe, it, expect } from 'vitest';
import { calculateMaxHeartRate } from './maxHeartRate';

describe('Max Heart Rate Calculator', () => {
  it('throws when age is not positive', () => {
    expect(() => calculateMaxHeartRate(0)).toThrow('Age must be greater than 0');
    expect(() => calculateMaxHeartRate(-5)).toThrow('Age must be greater than 0');
  });

  it('calculates max heart rate from age', () => {
    const result = calculateMaxHeartRate(30);
    expect(result.traditional).toBe(190);
    expect(result.tanaka).toBe(187);
  });

  it('supports non-integer ages and rounds Tanaka formula', () => {
    const result = calculateMaxHeartRate(29.5);
    expect(result.traditional).toBe(190.5);
    expect(result.tanaka).toBe(187);
  });
});
