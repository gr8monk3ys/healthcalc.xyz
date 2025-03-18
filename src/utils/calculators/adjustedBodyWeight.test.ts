import { describe, it, expect } from 'vitest';
import { calculateAdjustedBodyWeight } from './adjustedBodyWeight';

describe('Adjusted Body Weight Calculator', () => {
  it('matches Devine IBW + 40% correction for a 180cm male at 100kg', () => {
    // heightIn = 180 / 2.54 = 70.866; inches over 5ft = 10.866
    // IBW = 50 + 2.3 × 10.866 = 74.992 → 75.0 kg
    // AjBW = 74.992 + 0.4 × (100 − 74.992) = 84.995 → 85.0 kg
    // lb: 74.992 × 2.20462 = 165.33 → 165.3; 84.995 × 2.20462 = 187.38 → 187.4
    const result = calculateAdjustedBodyWeight({ gender: 'male', heightCm: 180, weightKg: 100 });
    expect(result.idealBodyWeightKg).toBe(75);
    expect(result.adjustedBodyWeightKg).toBe(85);
    expect(result.idealBodyWeightLb).toBeCloseTo(165.3, 1);
    expect(result.adjustedBodyWeightLb).toBeCloseTo(187.4, 1);
    expect(result.formula).toBe('Devine + 40% correction');
  });

  it('matches Devine IBW + 40% correction for a 165cm female at 80kg', () => {
    // heightIn = 165 / 2.54 = 64.961; inches over 5ft = 4.961
    // IBW = 45.5 + 2.3 × 4.961 = 56.909 → 56.9 kg
    // AjBW = 56.909 + 0.4 × (80 − 56.909) = 66.146 → 66.1 kg
    const result = calculateAdjustedBodyWeight({ gender: 'female', heightCm: 165, weightKg: 80 });
    expect(result.idealBodyWeightKg).toBe(56.9);
    expect(result.adjustedBodyWeightKg).toBe(66.1);
    expect(result.idealBodyWeightLb).toBeCloseTo(125.5, 1);
    expect(result.adjustedBodyWeightLb).toBeCloseTo(145.8, 1);
  });

  it('uses the higher male Devine base (50 vs 45.5 kg) at equal height', () => {
    // Same height → male IBW exceeds female IBW by 50 − 45.5 = 4.5 kg
    const male = calculateAdjustedBodyWeight({ gender: 'male', heightCm: 170, weightKg: 90 });
    const female = calculateAdjustedBodyWeight({ gender: 'female', heightCm: 170, weightKg: 90 });
    expect(male.idealBodyWeightKg - female.idealBodyWeightKg).toBeCloseTo(4.5, 1);
  });

  it('increases adjusted weight with higher actual weight', () => {
    const lighter = calculateAdjustedBodyWeight({ gender: 'male', heightCm: 180, weightKg: 90 });
    const heavier = calculateAdjustedBodyWeight({ gender: 'male', heightCm: 180, weightKg: 120 });
    expect(heavier.adjustedBodyWeightKg).toBeGreaterThan(lighter.adjustedBodyWeightKg);
    // IBW depends only on height/gender, so it is unchanged
    expect(heavier.idealBodyWeightKg).toBe(lighter.idealBodyWeightKg);
  });

  it('throws on zero or negative height or weight', () => {
    expect(() =>
      calculateAdjustedBodyWeight({ gender: 'male', heightCm: 0, weightKg: 80 })
    ).toThrow('Height and weight must be greater than 0');
    expect(() =>
      calculateAdjustedBodyWeight({ gender: 'male', heightCm: 180, weightKg: 0 })
    ).toThrow('Height and weight must be greater than 0');
    expect(() =>
      calculateAdjustedBodyWeight({ gender: 'female', heightCm: -165, weightKg: 80 })
    ).toThrow('Height and weight must be greater than 0');
  });
});
