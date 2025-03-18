import { describe, it, expect } from 'vitest';
import { calculateWaistToHeightRatio } from './waistToHeightRatio';

describe('Waist-to-Height Ratio Calculator', () => {
  it('throws when measurements are not positive', () => {
    expect(() => calculateWaistToHeightRatio(0, 170)).toThrow(
      'Measurements must be greater than 0'
    );
    expect(() => calculateWaistToHeightRatio(80, -170)).toThrow(
      'Measurements must be greater than 0'
    );
  });

  it('returns below typical range for ratio < 0.4', () => {
    const result = calculateWaistToHeightRatio(60, 170);
    expect(result.ratio).toBeCloseTo(0.35, 2);
    expect(result.category).toBe('Below typical range');
  });

  it('returns lower risk range for 0.4 <= ratio < 0.5', () => {
    const result = calculateWaistToHeightRatio(80, 170);
    expect(result.ratio).toBeCloseTo(0.47, 2);
    expect(result.category).toBe('Lower risk range');
  });

  it('returns increased risk range for 0.5 <= ratio < 0.6', () => {
    const result = calculateWaistToHeightRatio(90, 170);
    expect(result.ratio).toBeCloseTo(0.53, 2);
    expect(result.category).toBe('Increased risk range');
  });

  it('returns higher risk range for ratio >= 0.6', () => {
    const result = calculateWaistToHeightRatio(110, 170);
    expect(result.ratio).toBeCloseTo(0.65, 2);
    expect(result.category).toBe('Higher risk range');
  });
});
