import { describe, it, expect } from 'vitest';
import { calculateIdealWeight } from './idealWeight';

describe('Ideal Weight Calculator', () => {
  it('matches all four published formulas for a 180cm male', () => {
    // heightIn = 180 / 2.54 = 70.866; inches over 5ft = 10.866
    // Devine:   50   + 2.3  × 10.866 = 74.99 → 75.0 kg
    // Hamwi:    48   + 2.7  × 10.866 = 77.34 → 77.3 kg
    // Robinson: 52   + 1.9  × 10.866 = 72.65 → 72.6 kg
    // Miller:   56.2 + 1.41 × 10.866 = 71.52 → 71.5 kg
    const result = calculateIdealWeight(180, 'male');
    const bySlug = Object.fromEntries(result.formulas.map(f => [f.id, f]));
    expect(bySlug.devine.weightKg).toBe(75);
    expect(bySlug.hamwi.weightKg).toBe(77.3);
    expect(bySlug.robinson.weightKg).toBe(72.6);
    expect(bySlug.miller.weightKg).toBe(71.5);
    // Devine lb = 74.992 × 2.20462 = 165.33 → 165.3
    expect(bySlug.devine.weightLb).toBeCloseTo(165.3, 1);
  });

  it('computes average and range from the formula results (180cm male)', () => {
    // average = (75.0 + 77.3 + 72.6 + 71.5) / 4 = 296.4 / 4 = 74.1 kg
    // averageLb = 74.1 × 2.20462 = 163.36 → 163.4
    // range: min 71.5 (Miller), max 77.3 (Hamwi)
    const result = calculateIdealWeight(180, 'male');
    expect(result.averageKg).toBe(74.1);
    expect(result.averageLb).toBeCloseTo(163.4, 1);
    expect(result.rangeKg.min).toBe(71.5);
    expect(result.rangeKg.max).toBe(77.3);
    // rangeLb: 71.5 × 2.20462 = 157.63 → 157.6; 77.3 × 2.20462 = 170.42 → 170.4
    expect(result.rangeLb.min).toBeCloseTo(157.6, 1);
    expect(result.rangeLb.max).toBeCloseTo(170.4, 1);
  });

  it('matches all four published formulas for a 165cm female', () => {
    // heightIn = 165 / 2.54 = 64.961; inches over 5ft = 4.961
    // Devine:   45.5 + 2.3  × 4.961 = 56.91 → 56.9 kg
    // Hamwi:    45.5 + 2.2  × 4.961 = 56.41 → 56.4 kg
    // Robinson: 49   + 1.7  × 4.961 = 57.43 → 57.4 kg
    // Miller:   53.1 + 1.36 × 4.961 = 59.85 → 59.8 kg
    const result = calculateIdealWeight(165, 'female');
    const bySlug = Object.fromEntries(result.formulas.map(f => [f.id, f]));
    expect(bySlug.devine.weightKg).toBe(56.9);
    expect(bySlug.hamwi.weightKg).toBe(56.4);
    expect(bySlug.robinson.weightKg).toBe(57.4);
    expect(bySlug.miller.weightKg).toBe(59.8);
    // average = (56.9 + 56.4 + 57.4 + 59.8) / 4 = 230.5 / 4 = 57.625 → 57.6 kg
    expect(result.averageKg).toBe(57.6);
    expect(result.heightIn).toBe(65);
  });

  it('gives heavier ideal weight for males than females at the same height', () => {
    const male = calculateIdealWeight(175, 'male');
    const female = calculateIdealWeight(175, 'female');
    expect(male.averageKg).toBeGreaterThan(female.averageKg);
  });

  it('clamps formula results at 0 for very short heights', () => {
    // At 100 cm, inchesOverFiveFeet is negative enough that some formulas go below 0
    const result = calculateIdealWeight(100, 'female');
    result.formulas.forEach(formula => {
      expect(formula.weightKg).toBeGreaterThanOrEqual(0);
    });
  });
});
