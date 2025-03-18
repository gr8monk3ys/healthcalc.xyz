import { describe, it, expect } from 'vitest';
import { calculateLeanBodyMass } from './leanBodyMass';

describe('Lean Body Mass Calculator', () => {
  it('calculates male lean mass using Boer formula when body fat is not provided', () => {
    const result = calculateLeanBodyMass({
      gender: 'male',
      weightKg: 80,
      heightCm: 180,
    });

    expect(result.formula).toBe('Boer');
    expect(result.leanMassKg).toBe(61.4);
    expect(result.fatMassKg).toBe(18.6);
    expect(result.leanMassLb).toBeCloseTo(135.4, 1);
  });

  it('calculates female lean mass using Boer formula when body fat is not provided', () => {
    const result = calculateLeanBodyMass({
      gender: 'female',
      weightKg: 60,
      heightCm: 165,
    });

    expect(result.formula).toBe('Boer');
    expect(result.leanMassKg).toBe(44.9);
    expect(result.fatMassKg).toBe(15.1);
  });

  it('uses body fat percentage formula when provided', () => {
    const result = calculateLeanBodyMass({
      gender: 'male',
      weightKg: 80,
      heightCm: 180,
      bodyFatPercentage: 20,
    });

    expect(result.formula).toBe('Body Fat Percentage');
    expect(result.leanMassKg).toBe(64);
    expect(result.fatMassKg).toBe(16);
    expect(result.bodyFatPercentage).toBe(20);
  });

  it('clamps fat mass at zero when computed lean mass exceeds body weight', () => {
    const result = calculateLeanBodyMass({
      gender: 'male',
      weightKg: 80,
      heightCm: 180,
      bodyFatPercentage: -10,
    });

    expect(result.leanMassKg).toBe(88);
    expect(result.fatMassKg).toBe(0);
  });

  it('throws for non-positive height or weight', () => {
    expect(() =>
      calculateLeanBodyMass({
        gender: 'male',
        weightKg: 0,
        heightCm: 180,
      })
    ).toThrow('Height and weight must be greater than 0');

    expect(() =>
      calculateLeanBodyMass({
        gender: 'female',
        weightKg: 55,
        heightCm: 0,
      })
    ).toThrow('Height and weight must be greater than 0');
  });
});
