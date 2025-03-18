import { describe, it, expect } from 'vitest';
import { calculateTargetHeartRate } from './targetHeartRate';

describe('Target Heart Rate Calculator', () => {
  it('throws when age is not positive', () => {
    expect(() => calculateTargetHeartRate({ age: 0, intensityMin: 50, intensityMax: 85 })).toThrow(
      'Age must be greater than 0'
    );
  });

  it('calculates target range using percent-of-max method', () => {
    const result = calculateTargetHeartRate({ age: 30, intensityMin: 50, intensityMax: 85 });
    expect(result.maxHeartRate).toBe(190);
    expect(result.targetMin).toBe(95);
    expect(result.targetMax).toBe(162);
    expect(result.method).toBe('Percent of max heart rate');
  });

  it('uses Karvonen method when resting heart rate is provided', () => {
    const result = calculateTargetHeartRate({
      age: 40,
      intensityMin: 60,
      intensityMax: 80,
      restingHeartRate: 60,
    });

    expect(result.maxHeartRate).toBe(180);
    expect(result.targetMin).toBe(132);
    expect(result.targetMax).toBe(156);
    expect(result.method).toBe('Karvonen (heart rate reserve)');
  });

  it('falls back to percent-of-max method when resting heart rate is 0', () => {
    const result = calculateTargetHeartRate({
      age: 40,
      intensityMin: 60,
      intensityMax: 80,
      restingHeartRate: 0,
    });

    expect(result.method).toBe('Percent of max heart rate');
    expect(result.targetMin).toBe(108);
    expect(result.targetMax).toBe(144);
  });
});
