import { describe, it, expect } from 'vitest';
import { calculateArmyBodyFat } from './armyBodyFat';

describe('Army Body Fat Calculator', () => {
  it('throws for non-positive required measurements', () => {
    expect(() =>
      calculateArmyBodyFat({
        gender: 'male',
        heightIn: 0,
        waistIn: 34,
        neckIn: 15,
      })
    ).toThrow('Measurements must be greater than 0');
  });

  it('requires hip measurement for women', () => {
    expect(() =>
      calculateArmyBodyFat({
        gender: 'female',
        heightIn: 65,
        waistIn: 30,
        neckIn: 13,
      })
    ).toThrow('Hip measurement is required for women');
  });

  it('calculates body fat percentage and category for men', () => {
    const result = calculateArmyBodyFat({
      gender: 'male',
      heightIn: 70,
      waistIn: 34,
      neckIn: 15,
    });
    expect(result.bodyFatPercentage).toBeCloseTo(17.5, 1);
    expect(result.category).toBe('Fit range');
    expect(result.method).toBe('U.S. Army Circumference');
  });

  it('calculates body fat percentage and category for women', () => {
    const result = calculateArmyBodyFat({
      gender: 'female',
      heightIn: 65,
      waistIn: 30,
      neckIn: 13,
      hipIn: 38,
    });
    expect(result.bodyFatPercentage).toBeCloseTo(28.6, 1);
    expect(result.category).toBe('Fit range');
  });

  it('assigns above-average category when thresholds are exceeded', () => {
    const male = calculateArmyBodyFat({
      gender: 'male',
      heightIn: 68,
      waistIn: 44,
      neckIn: 14,
    });
    const female = calculateArmyBodyFat({
      gender: 'female',
      heightIn: 63,
      waistIn: 40,
      neckIn: 12,
      hipIn: 46,
    });

    expect(male.category).toBe('Above average');
    expect(female.category).toBe('Above average');
  });
});
