import { describe, it, expect } from 'vitest';
import { calculateBodySurfaceArea } from './bodySurfaceArea';

describe('Body Surface Area Calculator (Mosteller)', () => {
  it('matches the Mosteller formula exactly for 180cm / 80kg', () => {
    // BSA = sqrt((180 × 80) / 3600) = sqrt(4) = 2.00 m²
    const result = calculateBodySurfaceArea(180, 80);
    expect(result.bsa).toBe(2);
  });

  it('matches the Mosteller formula for 170cm / 70kg', () => {
    // BSA = sqrt((170 × 70) / 3600) = sqrt(3.30556) = 1.81812 → 1.82 m²
    const result = calculateBodySurfaceArea(170, 70);
    expect(result.bsa).toBeCloseTo(1.82, 2);
  });

  it('matches the Mosteller formula for 160cm / 50kg', () => {
    // BSA = sqrt((160 × 50) / 3600) = sqrt(2.22222) = 1.49071 → 1.49 m²
    const result = calculateBodySurfaceArea(160, 50);
    expect(result.bsa).toBeCloseTo(1.49, 2);
  });

  it('increases with height and weight', () => {
    const base = calculateBodySurfaceArea(170, 70);
    const taller = calculateBodySurfaceArea(190, 70);
    const heavier = calculateBodySurfaceArea(170, 90);
    expect(taller.bsa).toBeGreaterThan(base.bsa);
    expect(heavier.bsa).toBeGreaterThan(base.bsa);
  });

  it('throws on zero or negative inputs', () => {
    expect(() => calculateBodySurfaceArea(0, 80)).toThrow(
      'Height and weight must be greater than 0'
    );
    expect(() => calculateBodySurfaceArea(180, 0)).toThrow(
      'Height and weight must be greater than 0'
    );
    expect(() => calculateBodySurfaceArea(-180, 80)).toThrow(
      'Height and weight must be greater than 0'
    );
  });
});
