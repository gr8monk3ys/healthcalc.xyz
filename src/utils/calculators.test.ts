import { describe, it, expect } from 'vitest';
import {
  convertHeight,
  convertWeight,
  calculateBMI,
  getBMICategory,
  calculateBMR,
  calculateTDEE,
  activityLevels,
  calculateNavyBodyFat,
  getBodyFatCategory,
  calculateWHR,
  getWHRCategory,
  calculateABSI,
} from './calculators';

describe('calculators utility functions', () => {
  describe('convertHeight', () => {
    it('should return same value when converting same unit', () => {
      expect(convertHeight(170, 'metric', 'metric')).toBe(170);
      expect(convertHeight(67, 'imperial', 'imperial')).toBe(67);
    });

    it('should convert inches to cm', () => {
      expect(convertHeight(39.37, 'imperial', 'metric')).toBeCloseTo(100, 1);
    });

    it('should convert cm to inches', () => {
      expect(convertHeight(100, 'metric', 'imperial')).toBeCloseTo(39.37, 1);
    });
  });

  describe('convertWeight', () => {
    it('should return same value when converting same unit', () => {
      expect(convertWeight(70, 'metric', 'metric')).toBe(70);
      expect(convertWeight(154, 'imperial', 'imperial')).toBe(154);
    });

    it('should convert pounds to kg', () => {
      expect(convertWeight(220, 'imperial', 'metric')).toBeCloseTo(99.79, 1);
    });

    it('should convert kg to pounds', () => {
      expect(convertWeight(100, 'metric', 'imperial')).toBeCloseTo(220.46, 1);
    });
  });

  describe('calculateBMI', () => {
    it('should calculate BMI correctly', () => {
      // 70kg, 170cm = BMI of ~24.22
      expect(calculateBMI(70, 170)).toBeCloseTo(24.22, 1);
    });

    it('should handle edge cases', () => {
      expect(calculateBMI(50, 150)).toBeCloseTo(22.22, 1);
      expect(calculateBMI(100, 180)).toBeCloseTo(30.86, 1);
    });
  });

  describe('getBMICategory', () => {
    it('should return Underweight for BMI < 18.5', () => {
      const result = getBMICategory(17);
      expect(result.category).toBe('Underweight');
      expect(result.color).toBe('#3B82F6');
    });

    it('should return Normal for BMI 18.5-24.9', () => {
      const result = getBMICategory(22);
      expect(result.category).toBe('Normal');
      expect(result.color).toBe('#10B981');
    });

    it('should return Overweight for BMI 25-29.9', () => {
      const result = getBMICategory(27);
      expect(result.category).toBe('Overweight');
      expect(result.color).toBe('#F59E0B');
    });

    it('should return Obese for BMI >= 30', () => {
      const result = getBMICategory(32);
      expect(result.category).toBe('Obese');
      expect(result.color).toBe('#EF4444');
    });

    it('should handle boundary values', () => {
      expect(getBMICategory(18.5).category).toBe('Normal');
      expect(getBMICategory(25).category).toBe('Overweight');
      expect(getBMICategory(30).category).toBe('Obese');
    });
  });

  describe('calculateBMR', () => {
    it('should calculate BMR for males', () => {
      // 70kg, 170cm, 30 years, male
      // BMR = 10 * 70 + 6.25 * 170 - 5 * 30 + 5 = 700 + 1062.5 - 150 + 5 = 1617.5
      expect(calculateBMR(70, 170, 30, true)).toBeCloseTo(1617.5, 1);
    });

    it('should calculate BMR for females', () => {
      // 60kg, 165cm, 25 years, female
      // BMR = 10 * 60 + 6.25 * 165 - 5 * 25 - 161 = 600 + 1031.25 - 125 - 161 = 1345.25
      expect(calculateBMR(60, 165, 25, false)).toBeCloseTo(1345.25, 1);
    });
  });

  describe('calculateTDEE', () => {
    it('should calculate TDEE correctly', () => {
      expect(calculateTDEE(1600, 1.2)).toBe(1920);
      expect(calculateTDEE(1600, 1.55)).toBe(2480);
    });
  });

  describe('activityLevels', () => {
    it('should have 5 activity levels', () => {
      expect(activityLevels).toHaveLength(5);
    });

    it('should have correct multiplier values', () => {
      expect(activityLevels[0].value).toBe(1.2);
      expect(activityLevels[1].value).toBe(1.375);
      expect(activityLevels[2].value).toBe(1.55);
      expect(activityLevels[3].value).toBe(1.725);
      expect(activityLevels[4].value).toBe(1.9);
    });

    it('should have labels and descriptions', () => {
      activityLevels.forEach(level => {
        expect(level.label).toBeDefined();
        expect(level.description).toBeDefined();
      });
    });
  });

  describe('calculateNavyBodyFat', () => {
    it('should calculate body fat for males', () => {
      // Male: waist 85cm, neck 38cm, height 175cm
      const result = calculateNavyBodyFat(85, 38, 175, null, true);
      expect(result).toBeGreaterThan(10);
      expect(result).toBeLessThan(30);
    });

    it('should calculate body fat for females', () => {
      // Female: waist 75cm, neck 33cm, height 165cm, hip 95cm
      const result = calculateNavyBodyFat(75, 33, 165, 95, false);
      expect(result).toBeGreaterThan(15);
      expect(result).toBeLessThan(40);
    });

    it('should throw error for female without hip measurement', () => {
      expect(() => calculateNavyBodyFat(75, 33, 165, null, false)).toThrow(
        'Hip measurement is required for females'
      );
    });
  });

  describe('getBodyFatCategory', () => {
    describe('for males', () => {
      it('should return Essential Fat for < 6%', () => {
        expect(getBodyFatCategory(5, true).category).toBe('Essential Fat');
      });

      it('should return Athletic for 6-13%', () => {
        expect(getBodyFatCategory(10, true).category).toBe('Athletic');
      });

      it('should return Fitness for 14-17%', () => {
        expect(getBodyFatCategory(15, true).category).toBe('Fitness');
      });

      it('should return Average for 18-24%', () => {
        expect(getBodyFatCategory(20, true).category).toBe('Average');
      });

      it('should return Obese for >= 25%', () => {
        expect(getBodyFatCategory(30, true).category).toBe('Obese');
      });
    });

    describe('for females', () => {
      it('should return Essential Fat for < 14%', () => {
        expect(getBodyFatCategory(12, false).category).toBe('Essential Fat');
      });

      it('should return Athletic for 14-20%', () => {
        expect(getBodyFatCategory(18, false).category).toBe('Athletic');
      });

      it('should return Fitness for 21-24%', () => {
        expect(getBodyFatCategory(22, false).category).toBe('Fitness');
      });

      it('should return Average for 25-31%', () => {
        expect(getBodyFatCategory(28, false).category).toBe('Average');
      });

      it('should return Obese for >= 32%', () => {
        expect(getBodyFatCategory(35, false).category).toBe('Obese');
      });
    });
  });

  describe('calculateWHR', () => {
    it('should calculate WHR correctly', () => {
      expect(calculateWHR(80, 100)).toBe(0.8);
      expect(calculateWHR(90, 100)).toBe(0.9);
    });
  });

  describe('getWHRCategory', () => {
    describe('for males', () => {
      it('should return Low for WHR < 0.9', () => {
        const result = getWHRCategory(0.85, true);
        expect(result.category).toBe('Low');
        expect(result.risk).toBe('Low');
      });

      it('should return Moderate for WHR 0.9-0.99', () => {
        const result = getWHRCategory(0.95, true);
        expect(result.category).toBe('Moderate');
        expect(result.risk).toBe('Moderate');
      });

      it('should return High for WHR >= 1.0', () => {
        const result = getWHRCategory(1.0, true);
        expect(result.category).toBe('High');
        expect(result.risk).toBe('High');
      });
    });

    describe('for females', () => {
      it('should return Low for WHR < 0.8', () => {
        const result = getWHRCategory(0.75, false);
        expect(result.category).toBe('Low');
        expect(result.risk).toBe('Low');
      });

      it('should return Moderate for WHR 0.8-0.84', () => {
        const result = getWHRCategory(0.82, false);
        expect(result.category).toBe('Moderate');
        expect(result.risk).toBe('Moderate');
      });

      it('should return High for WHR >= 0.85', () => {
        const result = getWHRCategory(0.9, false);
        expect(result.category).toBe('High');
        expect(result.risk).toBe('High');
      });
    });
  });

  describe('calculateABSI', () => {
    it('should calculate ABSI correctly', () => {
      // 85cm waist, 70kg, 170cm height
      // ABSI uses waist in cm, so values will be higher than typical ABSI (which uses meters)
      const result = calculateABSI(85, 70, 170);
      expect(result).toBeGreaterThan(5);
      expect(result).toBeLessThan(10);
    });

    it('should handle different body compositions', () => {
      const lowerABSI = calculateABSI(75, 70, 175);
      const higherABSI = calculateABSI(95, 70, 170);
      expect(higherABSI).toBeGreaterThan(lowerABSI);
    });
  });
});
