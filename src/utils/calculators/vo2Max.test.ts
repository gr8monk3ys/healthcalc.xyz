import { describe, it, expect } from 'vitest';
import { calculateVo2Max } from './vo2Max';

describe('VO2 Max Calculator (Rockport walk test)', () => {
  it('matches the Rockport formula for a 30-year-old male', () => {
    // weightLb = 75 × 2.20462 = 165.3465
    // VO2max = 132.853 − 0.0769×165.3465 − 0.3877×30 + 6.315×1
    //          − 3.2649×15 − 0.1565×130 = 45.503 → 45.5
    const result = calculateVo2Max({
      gender: 'male',
      age: 30,
      weightKg: 75,
      walkTimeMinutes: 15,
      heartRate: 130,
    });
    expect(result.vo2Max).toBeCloseTo(45.5, 1);
    expect(result.weightLb).toBeCloseTo(165.3, 1);
  });

  it('matches the Rockport formula for a 45-year-old female', () => {
    // weightLb = 62 × 2.20462 = 136.68644
    // VO2max = 132.853 − 0.0769×136.68644 − 0.3877×45 + 0
    //          − 3.2649×17.5 − 0.1565×142 = 25.537 → 25.5
    const result = calculateVo2Max({
      gender: 'female',
      age: 45,
      weightKg: 62,
      walkTimeMinutes: 17.5,
      heartRate: 142,
    });
    expect(result.vo2Max).toBeCloseTo(25.5, 1);
  });

  it('applies the +6.315 male offset, all else equal', () => {
    const inputs = { age: 40, weightKg: 70, walkTimeMinutes: 16, heartRate: 135 };
    const male = calculateVo2Max({ gender: 'male', ...inputs });
    const female = calculateVo2Max({ gender: 'female', ...inputs });
    expect(male.vo2Max - female.vo2Max).toBeCloseTo(6.315, 1);
  });

  it('decreases with slower walk times and higher heart rates', () => {
    const base = { gender: 'male' as const, age: 30, weightKg: 75, heartRate: 130 };
    const fast = calculateVo2Max({ ...base, walkTimeMinutes: 12 });
    const slow = calculateVo2Max({ ...base, walkTimeMinutes: 20 });
    expect(fast.vo2Max).toBeGreaterThan(slow.vo2Max);

    const lowHr = calculateVo2Max({ ...base, walkTimeMinutes: 15, heartRate: 110 });
    const highHr = calculateVo2Max({ ...base, walkTimeMinutes: 15, heartRate: 170 });
    expect(lowHr.vo2Max).toBeGreaterThan(highHr.vo2Max);
  });
});
