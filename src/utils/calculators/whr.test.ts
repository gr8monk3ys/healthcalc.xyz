import { describe, it, expect } from 'vitest';
import { calculateWHR, getWHRCategory, calculateWHRWithCategory } from './whr';

describe('WHR Calculation', () => {
  describe('calculateWHR', () => {
    it('should calculate WHR correctly', () => {
      const whr = calculateWHR(80, 100);
      expect(whr).toBe(0.8);
    });

    it('should calculate WHR for various measurements', () => {
      expect(calculateWHR(90, 100)).toBe(0.9);
      expect(calculateWHR(85, 95)).toBeCloseTo(0.895, 2);
      expect(calculateWHR(100, 105)).toBeCloseTo(0.952, 2);
    });

    it('should handle decimal values', () => {
      const whr = calculateWHR(82.5, 98.3);
      expect(whr).toBeCloseTo(0.839, 2);
    });

    it('should throw error for zero hip circumference', () => {
      expect(() => calculateWHR(80, 0)).toThrow('Hip circumference cannot be zero');
    });

    it('should handle edge case where waist equals hips', () => {
      const whr = calculateWHR(95, 95);
      expect(whr).toBe(1.0);
    });

    it('should handle case where waist is larger than hips', () => {
      const whr = calculateWHR(110, 100);
      expect(whr).toBe(1.1);
    });
  });

  describe('getWHRCategory', () => {
    describe('Male categories', () => {
      it('should categorize low risk for males', () => {
        const result = getWHRCategory('male', 0.9);
        expect(result.name).toBe('Low Risk');
        expect(result.color).toBe('#10B981');
        expect(result.healthRisk).toBe('Low');
      });

      it('should categorize moderate risk for males', () => {
        const result1 = getWHRCategory('male', 0.95);
        expect(result1.name).toBe('Moderate Risk');
        expect(result1.color).toBe('#FBBF24');
        expect(result1.healthRisk).toBe('Moderate');

        const result2 = getWHRCategory('male', 0.97);
        expect(result2.name).toBe('Moderate Risk');
      });

      it('should categorize high risk for males', () => {
        const result1 = getWHRCategory('male', 1.0);
        expect(result1.name).toBe('High Risk');
        expect(result1.color).toBe('#F97316');
        expect(result1.healthRisk).toBe('High');

        const result2 = getWHRCategory('male', 1.05);
        expect(result2.name).toBe('High Risk');
      });

      it('should categorize very high risk for males', () => {
        const result = getWHRCategory('male', 1.1);
        expect(result.name).toBe('Very High Risk');
        expect(result.color).toBe('#EF4444');
        expect(result.healthRisk).toBe('Very High');
      });

      it('should handle boundary values for males', () => {
        expect(getWHRCategory('male', 0.94).name).toBe('Low Risk');
        expect(getWHRCategory('male', 0.95).name).toBe('Moderate Risk');
        expect(getWHRCategory('male', 0.99).name).toBe('Moderate Risk');
        expect(getWHRCategory('male', 1.0).name).toBe('High Risk');
        expect(getWHRCategory('male', 1.09).name).toBe('High Risk');
        expect(getWHRCategory('male', 1.1).name).toBe('Very High Risk');
      });
    });

    describe('Female categories', () => {
      it('should categorize low risk for females', () => {
        const result = getWHRCategory('female', 0.75);
        expect(result.name).toBe('Low Risk');
        expect(result.color).toBe('#10B981');
        expect(result.healthRisk).toBe('Low');
      });

      it('should categorize moderate risk for females', () => {
        const result1 = getWHRCategory('female', 0.8);
        expect(result1.name).toBe('Moderate Risk');
        expect(result1.color).toBe('#FBBF24');
        expect(result1.healthRisk).toBe('Moderate');

        const result2 = getWHRCategory('female', 0.82);
        expect(result2.name).toBe('Moderate Risk');
      });

      it('should categorize high risk for females', () => {
        const result1 = getWHRCategory('female', 0.85);
        expect(result1.name).toBe('High Risk');
        expect(result1.color).toBe('#F97316');
        expect(result1.healthRisk).toBe('High');

        const result2 = getWHRCategory('female', 0.87);
        expect(result2.name).toBe('High Risk');
      });

      it('should categorize very high risk for females', () => {
        const result = getWHRCategory('female', 0.9);
        expect(result.name).toBe('Very High Risk');
        expect(result.color).toBe('#EF4444');
        expect(result.healthRisk).toBe('Very High');
      });

      it('should handle boundary values for females', () => {
        expect(getWHRCategory('female', 0.79).name).toBe('Low Risk');
        expect(getWHRCategory('female', 0.8).name).toBe('Moderate Risk');
        expect(getWHRCategory('female', 0.84).name).toBe('Moderate Risk');
        expect(getWHRCategory('female', 0.85).name).toBe('High Risk');
        expect(getWHRCategory('female', 0.89).name).toBe('High Risk');
        expect(getWHRCategory('female', 0.9).name).toBe('Very High Risk');
      });
    });

    it('should return description and healthRisk for all categories', () => {
      const result = getWHRCategory('male', 0.9);
      expect(result.description).toBeDefined();
      expect(result.description.length).toBeGreaterThan(0);
      expect(result.healthRisk).toBeDefined();
    });
  });

  describe('calculateWHRWithCategory', () => {
    it('should calculate WHR and return category for male', () => {
      const result = calculateWHRWithCategory(90, 100, 'male');
      expect(result.whr).toBe(0.9);
      expect(result.category).toBe('Low Risk');
      expect(result.color).toBe('#10B981');
      expect(result.description).toBeDefined();
      expect(result.healthRisk).toBe('Low');
    });

    it('should calculate WHR and return category for female', () => {
      const result = calculateWHRWithCategory(80, 100, 'female');
      expect(result.whr).toBe(0.8);
      expect(result.category).toBe('Moderate Risk');
      expect(result.color).toBe('#FBBF24');
      expect(result.description).toBeDefined();
      expect(result.healthRisk).toBe('Moderate');
    });

    it('should handle high risk male', () => {
      const result = calculateWHRWithCategory(105, 100, 'male');
      expect(result.whr).toBe(1.05);
      expect(result.category).toBe('High Risk');
      expect(result.healthRisk).toBe('High');
    });

    it('should handle very high risk female', () => {
      const result = calculateWHRWithCategory(95, 100, 'female');
      expect(result.whr).toBe(0.95);
      expect(result.category).toBe('Very High Risk');
      expect(result.healthRisk).toBe('Very High');
    });

    it('should throw error for zero hips', () => {
      expect(() => calculateWHRWithCategory(80, 0, 'male')).toThrow(
        'Hip circumference cannot be zero'
      );
    });
  });
});

describe('WHR Real-World Examples', () => {
  it('should calculate WHR for healthy male', () => {
    // Male with good fat distribution: 85cm waist, 95cm hips
    const result = calculateWHRWithCategory(85, 95, 'male');
    expect(result.whr).toBeCloseTo(0.895, 2);
    expect(result.category).toBe('Low Risk');
  });

  it('should calculate WHR for healthy female', () => {
    // Female with good fat distribution: 70cm waist, 95cm hips
    const result = calculateWHRWithCategory(70, 95, 'female');
    expect(result.whr).toBeCloseTo(0.737, 2);
    expect(result.category).toBe('Low Risk');
  });

  it('should calculate WHR for male with abdominal obesity', () => {
    // Male with abdominal obesity: 105cm waist, 95cm hips
    const result = calculateWHRWithCategory(105, 95, 'male');
    expect(result.whr).toBeCloseTo(1.105, 2);
    expect(result.category).toBe('Very High Risk');
  });

  it('should calculate WHR for female with abdominal obesity', () => {
    // Female with abdominal obesity: 90cm waist, 98cm hips
    const result = calculateWHRWithCategory(90, 98, 'female');
    expect(result.whr).toBeCloseTo(0.918, 2);
    expect(result.category).toBe('Very High Risk');
  });

  it('should show different risk levels for same WHR across genders', () => {
    // Same WHR (0.88) has different meanings for men vs women
    const maleResult = calculateWHRWithCategory(88, 100, 'male');
    const femaleResult = calculateWHRWithCategory(88, 100, 'female');

    expect(maleResult.whr).toBe(0.88);
    expect(femaleResult.whr).toBe(0.88);

    // For male: 0.88 is Low Risk (< 0.95)
    expect(maleResult.category).toBe('Low Risk');

    // For female: 0.88 is High Risk (0.85 - 0.9)
    expect(femaleResult.category).toBe('High Risk');
  });

  it('should calculate for average measurements', () => {
    // Average US adult male: ~102cm waist, ~104cm hips
    const maleResult = calculateWHRWithCategory(102, 104, 'male');
    expect(maleResult.whr).toBeCloseTo(0.981, 2);
    expect(maleResult.category).toBe('Moderate Risk');

    // Average US adult female: ~98cm waist, ~108cm hips
    const femaleResult = calculateWHRWithCategory(98, 108, 'female');
    expect(femaleResult.whr).toBeCloseTo(0.907, 2);
    expect(femaleResult.category).toBe('Very High Risk');
  });

  it('should handle athletes with low body fat', () => {
    // Male athlete: 75cm waist, 92cm hips
    const result = calculateWHRWithCategory(75, 92, 'male');
    expect(result.whr).toBeCloseTo(0.815, 2);
    expect(result.category).toBe('Low Risk');
  });
});

describe('WHR Edge Cases', () => {
  it('should handle very small measurements', () => {
    const whr = calculateWHR(60, 80);
    expect(whr).toBe(0.75);
  });

  it('should handle very large measurements', () => {
    const whr = calculateWHR(150, 140);
    expect(whr).toBeCloseTo(1.071, 2);
  });

  it('should handle precise decimal measurements', () => {
    const whr = calculateWHR(87.3, 102.7);
    expect(whr).toBeCloseTo(0.850, 3);
  });

  it('should maintain precision in calculations', () => {
    const result1 = calculateWHR(80.0, 100.0);
    const result2 = calculateWHR(80, 100);
    expect(result1).toBe(result2);
  });
});
