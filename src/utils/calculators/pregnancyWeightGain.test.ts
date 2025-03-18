import { describe, it, expect } from 'vitest';
import { calculatePregnancyWeightGain } from './pregnancyWeightGain';

describe('Pregnancy Weight Gain Calculator', () => {
  it('returns normal-weight guidance by default', () => {
    const result = calculatePregnancyWeightGain({ heightCm: 165, weightKg: 65 });
    expect(result.bmi).toBeCloseTo(23.9, 1);
    expect(result.category).toBe('Normal weight');
    expect(result.totalGain).toEqual(
      expect.objectContaining({
        minLb: 25,
        maxLb: 35,
      })
    );
    expect(result.weeklyGain).toEqual(
      expect.objectContaining({
        minLb: 0.8,
        maxLb: 1.0,
      })
    );
  });

  it('returns underweight guidance for BMI below 18.5', () => {
    const result = calculatePregnancyWeightGain({ heightCm: 170, weightKg: 50 });
    expect(result.category).toBe('Underweight');
    expect(result.totalGain).toEqual(
      expect.objectContaining({
        minLb: 28,
        maxLb: 40,
      })
    );
    expect(result.weeklyGain).toEqual(
      expect.objectContaining({
        minLb: 1.0,
        maxLb: 1.3,
      })
    );
  });

  it('returns overweight guidance for BMI between 25 and 30', () => {
    const result = calculatePregnancyWeightGain({ heightCm: 165, weightKg: 75 });
    expect(result.category).toBe('Overweight');
    expect(result.totalGain).toEqual(
      expect.objectContaining({
        minLb: 15,
        maxLb: 25,
      })
    );
    expect(result.weeklyGain).toEqual(
      expect.objectContaining({
        minLb: 0.5,
        maxLb: 0.7,
      })
    );
  });

  it('returns obese guidance for BMI >= 30', () => {
    const result = calculatePregnancyWeightGain({ heightCm: 160, weightKg: 90 });
    expect(result.category).toBe('Obese');
    expect(result.totalGain).toEqual(
      expect.objectContaining({
        minLb: 11,
        maxLb: 20,
      })
    );
    expect(result.weeklyGain).toEqual(
      expect.objectContaining({
        minLb: 0.4,
        maxLb: 0.6,
      })
    );
  });

  it('returns kilogram conversions rounded to one decimal place', () => {
    const result = calculatePregnancyWeightGain({ heightCm: 165, weightKg: 65 });
    expect(result.totalGain.minKg).toBeCloseTo(Math.round(result.totalGain.minKg * 10) / 10, 10);
    expect(result.totalGain.maxKg).toBeCloseTo(Math.round(result.totalGain.maxKg * 10) / 10, 10);
    expect(result.weeklyGain.minKg).toBeCloseTo(Math.round(result.weeklyGain.minKg * 10) / 10, 10);
    expect(result.weeklyGain.maxKg).toBeCloseTo(Math.round(result.weeklyGain.maxKg * 10) / 10, 10);
  });
});
