import { describe, it, expect } from 'vitest';
import {
  calculateLeanMass,
  calculateFatMass,
  calculateFFMI,
  calculateAdjustedFFMI,
  getFFMICategory,
  isLikelyNatural,
  getNaturalLimitInterpretation,
  validateFFMIInputs,
  processFFMICalculation,
} from './ffmi';

describe('FFMI Calculator - Core Functions', () => {
  describe('calculateLeanMass', () => {
    it('should calculate lean mass correctly', () => {
      // 70kg at 15% body fat = 59.5kg lean mass
      expect(calculateLeanMass(70, 15)).toBeCloseTo(59.5, 1);

      // 80kg at 20% body fat = 64kg lean mass
      expect(calculateLeanMass(80, 20)).toBeCloseTo(64, 1);

      // 90kg at 10% body fat = 81kg lean mass
      expect(calculateLeanMass(90, 10)).toBeCloseTo(81, 1);
    });

    it('should handle edge cases', () => {
      // 0% body fat
      expect(calculateLeanMass(70, 0)).toBe(70);

      // Very high body fat
      expect(calculateLeanMass(100, 50)).toBe(50);
    });

    it('should throw error for invalid inputs', () => {
      expect(() => calculateLeanMass(-70, 15)).toThrow('Weight must be greater than 0');
      expect(() => calculateLeanMass(70, -5)).toThrow(
        'Body fat percentage must be between 0 and 100'
      );
      expect(() => calculateLeanMass(70, 105)).toThrow(
        'Body fat percentage must be between 0 and 100'
      );
    });
  });

  describe('calculateFatMass', () => {
    it('should calculate fat mass correctly', () => {
      // 70kg at 15% body fat = 10.5kg fat mass
      expect(calculateFatMass(70, 15)).toBeCloseTo(10.5, 1);

      // 80kg at 20% body fat = 16kg fat mass
      expect(calculateFatMass(80, 20)).toBeCloseTo(16, 1);

      // 90kg at 10% body fat = 9kg fat mass
      expect(calculateFatMass(90, 10)).toBeCloseTo(9, 1);
    });

    it('should handle edge cases', () => {
      // 0% body fat
      expect(calculateFatMass(70, 0)).toBe(0);

      // Very high body fat
      expect(calculateFatMass(100, 50)).toBe(50);
    });

    it('should throw error for invalid inputs', () => {
      expect(() => calculateFatMass(-70, 15)).toThrow('Weight must be greater than 0');
      expect(() => calculateFatMass(70, -5)).toThrow(
        'Body fat percentage must be between 0 and 100'
      );
    });
  });

  describe('calculateFFMI', () => {
    it('should calculate FFMI correctly', () => {
      // 59.5kg lean mass at 1.75m height
      const ffmi = calculateFFMI(59.5, 1.75);
      expect(ffmi).toBeCloseTo(19.43, 2);
    });

    it('should calculate FFMI for different heights', () => {
      // Same lean mass, different heights
      const leanMass = 70;

      // Shorter person (1.65m) has higher FFMI
      const ffmiShort = calculateFFMI(leanMass, 1.65);
      expect(ffmiShort).toBeCloseTo(25.71, 2);

      // Taller person (1.85m) has lower FFMI
      const ffmiTall = calculateFFMI(leanMass, 1.85);
      expect(ffmiTall).toBeCloseTo(20.45, 2);
    });

    it('should throw error for invalid inputs', () => {
      expect(() => calculateFFMI(-70, 1.75)).toThrow('Lean mass must be greater than 0');
      expect(() => calculateFFMI(70, -1.75)).toThrow('Height must be greater than 0');
    });
  });

  describe('calculateAdjustedFFMI', () => {
    it('should adjust FFMI for height differences', () => {
      const ffmi = 20;

      // At 1.8m (reference height), adjusted FFMI equals FFMI
      const adjusted180 = calculateAdjustedFFMI(ffmi, 1.8);
      expect(adjusted180).toBeCloseTo(20, 1);

      // Shorter than reference (1.7m) gets adjustment added
      const adjusted170 = calculateAdjustedFFMI(ffmi, 1.7);
      expect(adjusted170).toBeCloseTo(20.61, 2);

      // Taller than reference (1.9m) gets adjustment subtracted
      const adjusted190 = calculateAdjustedFFMI(ffmi, 1.9);
      expect(adjusted190).toBeCloseTo(19.39, 2);
    });

    it('should handle extreme height differences', () => {
      const ffmi = 22;

      // Very short person (1.5m)
      const adjustedShort = calculateAdjustedFFMI(ffmi, 1.5);
      expect(adjustedShort).toBeCloseTo(23.83, 2);

      // Very tall person (2.1m)
      const adjustedTall = calculateAdjustedFFMI(ffmi, 2.1);
      expect(adjustedTall).toBeCloseTo(20.17, 2);
    });

    it('should throw error for invalid inputs', () => {
      expect(() => calculateAdjustedFFMI(-20, 1.75)).toThrow('FFMI must be greater than 0');
      expect(() => calculateAdjustedFFMI(20, -1.75)).toThrow('Height must be greater than 0');
    });
  });
});

describe('FFMI Calculator - Category Classification', () => {
  describe('getFFMICategory', () => {
    it('should classify Below Average correctly', () => {
      const category = getFFMICategory(17);
      expect(category.name).toBe('Below Average');
      expect(category.color).toBe('#6B7280');
    });

    it('should classify Average correctly', () => {
      const category = getFFMICategory(19);
      expect(category.name).toBe('Average');
      expect(category.color).toBe('#3B82F6');
    });

    it('should classify Above Average correctly', () => {
      const category = getFFMICategory(21);
      expect(category.name).toBe('Above Average');
      expect(category.color).toBe('#10B981');
    });

    it('should classify Excellent correctly', () => {
      const category = getFFMICategory(22.5);
      expect(category.name).toBe('Excellent');
      expect(category.color).toBe('#FBBF24');
    });

    it('should classify Superior correctly', () => {
      const category = getFFMICategory(24);
      expect(category.name).toBe('Superior');
      expect(category.color).toBe('#F97316');
    });

    it('should classify Suspicious correctly', () => {
      const category = getFFMICategory(26);
      expect(category.name).toBe('Suspicious');
      expect(category.color).toBe('#EF4444');
    });

    it('should classify Almost Certainly Not Natural correctly', () => {
      const category = getFFMICategory(28);
      expect(category.name).toBe('Almost Certainly Not Natural');
      expect(category.color).toBe('#DC2626');
    });

    it('should handle boundary values correctly', () => {
      // Test exact boundaries
      expect(getFFMICategory(18).name).toBe('Average');
      expect(getFFMICategory(20).name).toBe('Above Average');
      expect(getFFMICategory(22).name).toBe('Excellent');
      expect(getFFMICategory(23).name).toBe('Superior');
      expect(getFFMICategory(25).name).toBe('Suspicious');
      expect(getFFMICategory(27).name).toBe('Almost Certainly Not Natural');
    });
  });

  describe('isLikelyNatural', () => {
    it('should return true for natural FFMI values', () => {
      expect(isLikelyNatural(20)).toBe(true);
      expect(isLikelyNatural(22)).toBe(true);
      expect(isLikelyNatural(24.5)).toBe(true);
    });

    it('should return false for suspicious FFMI values', () => {
      expect(isLikelyNatural(25)).toBe(false);
      expect(isLikelyNatural(26)).toBe(false);
      expect(isLikelyNatural(28)).toBe(false);
    });

    it('should handle boundary value correctly', () => {
      expect(isLikelyNatural(24.9)).toBe(true);
      expect(isLikelyNatural(25.0)).toBe(false);
    });
  });

  describe('getNaturalLimitInterpretation', () => {
    it('should provide correct interpretation for low FFMI', () => {
      expect(getNaturalLimitInterpretation(16)).toBe('Well below natural limit');
    });

    it('should provide correct interpretation for average FFMI', () => {
      expect(getNaturalLimitInterpretation(20)).toBe('Below natural limit with room for growth');
    });

    it('should provide correct interpretation for high natural FFMI', () => {
      expect(getNaturalLimitInterpretation(23)).toBe('Approaching natural limit');
      expect(getNaturalLimitInterpretation(24.5)).toBe('Near natural limit');
    });

    it('should provide correct interpretation for suspicious FFMI', () => {
      expect(getNaturalLimitInterpretation(25.5)).toBe(
        'At or slightly above typical natural limit'
      );
      expect(getNaturalLimitInterpretation(26.5)).toBe('Above natural limit, likely enhanced');
    });

    it('should provide correct interpretation for very high FFMI', () => {
      expect(getNaturalLimitInterpretation(28)).toBe(
        'Well above natural limit, almost certainly enhanced'
      );
    });
  });
});

describe('FFMI Calculator - Validation', () => {
  describe('validateFFMIInputs', () => {
    it('should validate correct inputs', () => {
      const result = validateFFMIInputs(70, 175, 15);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should catch invalid weight', () => {
      const result = validateFFMIInputs(-70, 175, 15);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should catch invalid height', () => {
      const result = validateFFMIInputs(70, -175, 15);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should catch invalid body fat percentage', () => {
      expect(() => validateFFMIInputs(70, 175, -5)).toThrow();
    });

    it('should warn about unusually high body fat', () => {
      const result = validateFFMIInputs(70, 175, 65);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(err => err.includes('unusually high'))).toBe(true);
    });

    it('should warn about very low lean mass', () => {
      const result = validateFFMIInputs(40, 180, 60);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(err => err.includes('lean mass is very low'))).toBe(true);
    });
  });
});

describe('FFMI Calculator - Complete Calculation', () => {
  describe('processFFMICalculation', () => {
    it('should process complete calculation correctly', () => {
      // 70kg, 175cm, 15% body fat
      const result = processFFMICalculation(70, 175, 15, 'kg');

      expect(result.ffmi).toBeCloseTo(19.4, 1);
      expect(result.adjustedFFMI).toBeCloseTo(19.7, 1);
      expect(result.leanMass).toBeCloseTo(59.5, 1);
      expect(result.fatMass).toBeCloseTo(10.5, 1);
      expect(result.category).toBe('Average');
      expect(result.isNatural).toBe(true);
      expect(result.weightUnit).toBe('kg');
    });

    it('should handle bodybuilder stats', () => {
      // 90kg, 180cm, 10% body fat (competitive natural bodybuilder)
      const result = processFFMICalculation(90, 180, 10, 'kg');

      expect(result.ffmi).toBeCloseTo(25, 1);
      expect(result.adjustedFFMI).toBeCloseTo(25.0, 1);
      expect(result.leanMass).toBeCloseTo(81, 1);
      expect(result.fatMass).toBeCloseTo(9, 1);
      expect(result.category).toBe('Suspicious');
      expect(result.isNatural).toBe(false);
    });

    it('should handle enhanced athlete stats', () => {
      // 100kg, 180cm, 8% body fat (likely enhanced)
      const result = processFFMICalculation(100, 180, 8, 'kg');

      expect(result.ffmi).toBeCloseTo(28.4, 1);
      expect(result.adjustedFFMI).toBeCloseTo(28.4, 1);
      expect(result.leanMass).toBeCloseTo(92, 1);
      expect(result.fatMass).toBeCloseTo(8, 1);
      expect(result.category).toBe('Almost Certainly Not Natural');
      expect(result.isNatural).toBe(false);
    });

    it('should convert to pounds correctly', () => {
      // 70kg, 175cm, 15% body fat, display in lb
      const result = processFFMICalculation(70, 175, 15, 'lb');

      expect(result.leanMass).toBeCloseTo(131.2, 1); // 59.5kg in lb
      expect(result.fatMass).toBeCloseTo(23.1, 1); // 10.5kg in lb
      expect(result.weightUnit).toBe('lb');
    });

    it('should handle different heights correctly', () => {
      // Same weight and body fat, different heights
      const result160 = processFFMICalculation(70, 160, 15, 'kg');
      const result190 = processFFMICalculation(70, 190, 15, 'kg');

      // Shorter person has higher FFMI but similar adjusted FFMI
      expect(result160.ffmi).toBeGreaterThan(result190.ffmi);
      expect(Math.abs(result160.adjustedFFMI - result190.adjustedFFMI)).toBeLessThan(10);
    });

    it('should throw error for invalid inputs', () => {
      expect(() => processFFMICalculation(-70, 175, 15, 'kg')).toThrow();
      expect(() => processFFMICalculation(70, -175, 15, 'kg')).toThrow();
      expect(() => processFFMICalculation(70, 175, -5, 'kg')).toThrow();
    });
  });
});

describe('FFMI Calculator - Real World Examples', () => {
  it('should calculate for average male', () => {
    // Average untrained male: 75kg, 178cm, 20% body fat
    const result = processFFMICalculation(75, 178, 20, 'kg');

    expect(result.adjustedFFMI).toBeCloseTo(19.1, 1);
    expect(result.category).toBe('Average');
    expect(result.isNatural).toBe(true);
  });

  it('should calculate for trained athlete', () => {
    // Well-trained natural athlete: 85kg, 180cm, 12% body fat
    const result = processFFMICalculation(85, 180, 12, 'kg');

    expect(result.adjustedFFMI).toBeCloseTo(23.1, 1);
    expect(result.category).toBe('Superior');
    expect(result.isNatural).toBe(true);
  });

  it('should calculate for elite natural bodybuilder', () => {
    // Elite natural bodybuilder at competition: 88kg, 175cm, 6% body fat
    const result = processFFMICalculation(88, 175, 6, 'kg');

    expect(result.adjustedFFMI).toBeCloseTo(27.3, 1);
    expect(result.category).toBe('Almost Certainly Not Natural');
    expect(result.isNatural).toBe(false);
  });

  it('should calculate for powerlifter', () => {
    // Powerlifter: 105kg, 183cm, 18% body fat
    const result = processFFMICalculation(105, 183, 18, 'kg');

    expect(result.adjustedFFMI).toBeCloseTo(25.5, 1);
    expect(result.category).toBe('Suspicious');
    expect(result.isNatural).toBe(false);
  });

  it('should calculate for beginner lifter', () => {
    // Beginner lifter: 68kg, 172cm, 22% body fat
    const result = processFFMICalculation(68, 172, 22, 'kg');

    expect(result.adjustedFFMI).toBeCloseTo(18.4, 1);
    expect(result.category).toBe('Average');
    expect(result.isNatural).toBe(true);
  });
});
