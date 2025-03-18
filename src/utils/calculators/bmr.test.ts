import { describe, it, expect } from 'vitest';
import { calculateBMRResult } from './bmr';

describe('BMR Calculator', () => {
  it('calculates BMR result using Mifflin-St Jeor', () => {
    const result = calculateBMRResult({
      gender: 'male',
      age: 30,
      heightCm: 180,
      weightKg: 75,
      formulaId: 'mifflin_st_jeor',
    });

    expect(result.bmr).toBe(1730);
    expect(result.formulaName).toBe('Mifflin-St Jeor');
    expect(result.formulaId).toBe('mifflin_st_jeor');
  });

  it('calculates BMR result using Katch-McArdle with body fat percentage', () => {
    const result = calculateBMRResult({
      gender: 'male',
      age: 35,
      heightCm: 182,
      weightKg: 80,
      formulaId: 'katch_mcardle',
      bodyFatPercentage: 20,
    });

    expect(result.bmr).toBe(1752);
    expect(result.formulaName).toBe('Katch-McArdle');
    expect(result.bodyFatPercentage).toBe(20);
  });

  it('throws when the requested formula does not exist', () => {
    expect(() =>
      calculateBMRResult({
        gender: 'male',
        age: 30,
        heightCm: 180,
        weightKg: 75,
        formulaId: 'unknown',
      })
    ).toThrow('Formula not found');
  });
});
