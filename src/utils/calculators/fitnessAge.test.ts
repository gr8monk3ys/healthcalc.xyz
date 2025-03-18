import { describe, expect, it } from 'vitest';
import { calculateFitnessAge } from './fitnessAge';

describe('calculateFitnessAge', () => {
  it('returns a younger fitness age for strong cardio profile and good habits', () => {
    const result = calculateFitnessAge({
      age: 36,
      gender: 'male',
      vo2Max: 52,
      restingHeartRate: 54,
      bmi: 23.1,
      bodyFatPercentage: 14,
      weeklyTrainingDays: 5,
      balanceScore: 4,
      flexibilityScore: 4,
    });

    expect(result.fitnessAge).toBeLessThan(36);
    expect(result.classification).toBe('younger');
    expect(result.confidenceLabel).toBe('high');
  });

  it('returns an older fitness age for riskier profile', () => {
    const result = calculateFitnessAge({
      age: 41,
      gender: 'female',
      vo2Max: 25,
      restingHeartRate: 88,
      bmi: 31,
      bodyFatPercentage: 39,
      weeklyTrainingDays: 0,
      balanceScore: 2,
      flexibilityScore: 2,
    });

    expect(result.fitnessAge).toBeGreaterThan(41);
    expect(result.classification).toBe('older');
    expect(result.confidenceLabel).toBe('low');
    expect(result.components.bmiPenalty).toBeGreaterThan(0);
    expect(result.components.bodyFatPenalty).toBeGreaterThan(0);
  });

  it('keeps values within clamped bounds', () => {
    const low = calculateFitnessAge({
      age: 20,
      gender: 'male',
      vo2Max: 80,
      restingHeartRate: 35,
      bmi: 20,
      bodyFatPercentage: 8,
      weeklyTrainingDays: 7,
      balanceScore: 5,
      flexibilityScore: 5,
    });

    const high = calculateFitnessAge({
      age: 92,
      gender: 'female',
      vo2Max: 10,
      restingHeartRate: 120,
      bmi: 42,
      bodyFatPercentage: 55,
      weeklyTrainingDays: 0,
      balanceScore: 1,
      flexibilityScore: 1,
    });

    expect(low.fitnessAge).toBeGreaterThanOrEqual(12);
    expect(high.fitnessAge).toBeLessThanOrEqual(95);
  });
});
