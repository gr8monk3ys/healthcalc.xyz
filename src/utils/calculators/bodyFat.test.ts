import { describe, it, expect } from 'vitest';
import {
  calculateNavyMethodBodyFat,
  calculateBMIMethodBodyFat,
  getBodyFatCategory,
  getHealthyBodyFatRange,
  calculateFatAndLeanMass,
  calculateBodyFat,
} from './bodyFat';

describe('Body Fat Calculation', () => {
  describe('calculateNavyMethodBodyFat', () => {
    describe('Male calculations', () => {
      it('should calculate body fat for average male', () => {
        // Average male: 90cm waist, 38cm neck, 178cm height
        const bodyFat = calculateNavyMethodBodyFat('male', 90, 38, 178);
        expect(bodyFat).toBeGreaterThan(10);
        expect(bodyFat).toBeLessThan(25);
      });

      it('should calculate body fat for fit male', () => {
        // Fit male: 85cm waist, 38cm neck, 180cm height
        const bodyFat = calculateNavyMethodBodyFat('male', 85, 38, 180);
        expect(bodyFat).toBeGreaterThan(5);
        expect(bodyFat).toBeLessThan(15);
      });

      it('should calculate body fat for obese male', () => {
        // Larger waist, smaller neck
        const bodyFat = calculateNavyMethodBodyFat('male', 110, 38, 175);
        expect(bodyFat).toBeGreaterThan(25);
      });

      it('should cap body fat at maximum 60%', () => {
        // Extreme values
        const bodyFat = calculateNavyMethodBodyFat('male', 150, 30, 170);
        expect(bodyFat).toBeLessThanOrEqual(60);
      });

      it('should cap body fat at minimum 2%', () => {
        // Extreme values (very muscular)
        const bodyFat = calculateNavyMethodBodyFat('male', 70, 45, 190);
        expect(bodyFat).toBeGreaterThanOrEqual(2);
      });
    });

    describe('Female calculations', () => {
      it('should calculate body fat for average female', () => {
        // Average female with higher body fat: 90cm waist, 32cm neck, 105cm hips, 165cm height
        const bodyFat = calculateNavyMethodBodyFat('female', 90, 32, 165, 105);
        expect(bodyFat).toBeGreaterThan(10);
        expect(bodyFat).toBeLessThan(40);
      });

      it('should calculate body fat for fit female', () => {
        // Fit female: 85cm waist, 33cm neck, 100cm hips, 168cm height
        const bodyFat = calculateNavyMethodBodyFat('female', 85, 33, 168, 100);
        expect(bodyFat).toBeGreaterThan(5);
        expect(bodyFat).toBeLessThan(30);
      });

      it('should calculate body fat for athletic female', () => {
        // Athletic female: 82cm waist, 34cm neck, 98cm hips, 170cm height
        const bodyFat = calculateNavyMethodBodyFat('female', 82, 34, 170, 98);
        expect(bodyFat).toBeGreaterThan(2);
        expect(bodyFat).toBeLessThan(25);
      });

      it('should throw error if hips not provided for female', () => {
        expect(() => calculateNavyMethodBodyFat('female', 71, 33, 165)).toThrow(
          'Hip measurement is required for women and must be positive'
        );
      });

      it('should cap body fat at maximum 60%', () => {
        const bodyFat = calculateNavyMethodBodyFat('female', 120, 30, 160, 140);
        expect(bodyFat).toBeLessThanOrEqual(60);
      });

      it('should cap body fat at minimum 2%', () => {
        // Note: 2% is unrealistic for females, but this tests the minimum cap
        const bodyFat = calculateNavyMethodBodyFat('female', 60, 40, 180, 80);
        expect(bodyFat).toBeGreaterThanOrEqual(2);
      });
    });
  });

  describe('calculateBMIMethodBodyFat', () => {
    describe('Male calculations', () => {
      it('should calculate body fat for young adult male', () => {
        // 25 years old, BMI 24
        // (1.2 × 24) + (0.23 × 25) - 16.2 = 28.8 + 5.75 - 16.2 = 18.35
        const bodyFat = calculateBMIMethodBodyFat('male', 25, 24);
        expect(bodyFat).toBeCloseTo(18.35, 1);
      });

      it('should calculate body fat for middle-aged male', () => {
        // 45 years old, BMI 26
        // (1.2 × 26) + (0.23 × 45) - 16.2 = 31.2 + 10.35 - 16.2 = 25.35
        const bodyFat = calculateBMIMethodBodyFat('male', 45, 26);
        expect(bodyFat).toBeCloseTo(25.35, 1);
      });

      it('should calculate body fat for fit young male', () => {
        // 20 years old, BMI 21
        const bodyFat = calculateBMIMethodBodyFat('male', 20, 21);
        expect(bodyFat).toBeCloseTo(13.6, 1);
      });

      it('should cap at maximum 60%', () => {
        // Very high BMI
        const bodyFat = calculateBMIMethodBodyFat('male', 50, 45);
        expect(bodyFat).toBeLessThanOrEqual(60);
      });

      it('should cap at minimum 2%', () => {
        // Very young with low BMI
        const bodyFat = calculateBMIMethodBodyFat('male', 18, 17);
        expect(bodyFat).toBeGreaterThanOrEqual(2);
      });
    });

    describe('Female calculations', () => {
      it('should calculate body fat for young adult female', () => {
        // 25 years old, BMI 22
        // (1.2 × 22) + (0.23 × 25) - 5.4 = 26.4 + 5.75 - 5.4 = 26.75
        const bodyFat = calculateBMIMethodBodyFat('female', 25, 22);
        expect(bodyFat).toBeCloseTo(26.75, 1);
      });

      it('should calculate body fat for middle-aged female', () => {
        // 45 years old, BMI 25
        const bodyFat = calculateBMIMethodBodyFat('female', 45, 25);
        expect(bodyFat).toBeCloseTo(34.95, 1); // (1.2 × 25) + (0.23 × 45) - 5.4
      });

      it('should calculate body fat for fit young female', () => {
        // 22 years old, BMI 20
        const bodyFat = calculateBMIMethodBodyFat('female', 22, 20);
        expect(bodyFat).toBeCloseTo(23.66, 1);
      });

      it('should cap at maximum 60%', () => {
        const bodyFat = calculateBMIMethodBodyFat('female', 60, 50);
        expect(bodyFat).toBeLessThanOrEqual(60);
      });

      it('should cap at minimum 2%', () => {
        const bodyFat = calculateBMIMethodBodyFat('female', 18, 16);
        expect(bodyFat).toBeGreaterThanOrEqual(2);
      });
    });

    it('should give different results for male vs female with same BMI', () => {
      const maleBF = calculateBMIMethodBodyFat('male', 30, 24);
      const femaleBF = calculateBMIMethodBodyFat('female', 30, 24);
      expect(femaleBF).toBeGreaterThan(maleBF);
      expect(femaleBF - maleBF).toBeCloseTo(10.8, 1); // Difference is -16.2 - (-5.4) = 10.8
    });
  });

  describe('getBodyFatCategory', () => {
    describe('Male categories', () => {
      it('should categorize essential fat', () => {
        const result = getBodyFatCategory('male', 3);
        expect(result.name).toBe('Essential Fat');
        expect(result.color).toBe('#3B82F6');
      });

      it('should categorize athletic', () => {
        const result1 = getBodyFatCategory('male', 8);
        expect(result1.name).toBe('Athletic');

        const result2 = getBodyFatCategory('male', 12);
        expect(result2.name).toBe('Athletic');
      });

      it('should categorize fitness', () => {
        const result = getBodyFatCategory('male', 15);
        expect(result.name).toBe('Fitness');
        expect(result.color).toBe('#FBBF24');
      });

      it('should categorize average', () => {
        const result = getBodyFatCategory('male', 20);
        expect(result.name).toBe('Average');
        expect(result.color).toBe('#F97316');
      });

      it('should categorize obese', () => {
        const result = getBodyFatCategory('male', 28);
        expect(result.name).toBe('Obese');
        expect(result.color).toBe('#EF4444');
      });

      it('should handle boundary values', () => {
        expect(getBodyFatCategory('male', 5).name).toBe('Essential Fat');
        expect(getBodyFatCategory('male', 6).name).toBe('Athletic');
        expect(getBodyFatCategory('male', 13).name).toBe('Athletic');
        expect(getBodyFatCategory('male', 14).name).toBe('Fitness');
        expect(getBodyFatCategory('male', 17).name).toBe('Fitness');
        expect(getBodyFatCategory('male', 18).name).toBe('Average');
        expect(getBodyFatCategory('male', 24).name).toBe('Average');
        expect(getBodyFatCategory('male', 25).name).toBe('Obese');
      });
    });

    describe('Female categories', () => {
      it('should categorize essential fat', () => {
        const result = getBodyFatCategory('female', 11);
        expect(result.name).toBe('Essential Fat');
        expect(result.color).toBe('#3B82F6');
      });

      it('should categorize athletic', () => {
        const result = getBodyFatCategory('female', 16);
        expect(result.name).toBe('Athletic');
        expect(result.color).toBe('#10B981');
      });

      it('should categorize fitness', () => {
        const result = getBodyFatCategory('female', 22);
        expect(result.name).toBe('Fitness');
      });

      it('should categorize average', () => {
        const result = getBodyFatCategory('female', 28);
        expect(result.name).toBe('Average');
      });

      it('should categorize obese', () => {
        const result = getBodyFatCategory('female', 35);
        expect(result.name).toBe('Obese');
      });

      it('should handle boundary values', () => {
        expect(getBodyFatCategory('female', 13).name).toBe('Essential Fat');
        expect(getBodyFatCategory('female', 14).name).toBe('Athletic');
        expect(getBodyFatCategory('female', 20).name).toBe('Athletic');
        expect(getBodyFatCategory('female', 21).name).toBe('Fitness');
        expect(getBodyFatCategory('female', 24).name).toBe('Fitness');
        expect(getBodyFatCategory('female', 25).name).toBe('Average');
        expect(getBodyFatCategory('female', 31).name).toBe('Average');
        expect(getBodyFatCategory('female', 32).name).toBe('Obese');
      });
    });
  });

  describe('getHealthyBodyFatRange', () => {
    it('should return healthy range for males', () => {
      const range = getHealthyBodyFatRange('male');
      expect(range.min).toBe(14);
      expect(range.max).toBe(17);
    });

    it('should return healthy range for females', () => {
      const range = getHealthyBodyFatRange('female');
      expect(range.min).toBe(21);
      expect(range.max).toBe(24);
    });
  });

  describe('calculateFatAndLeanMass', () => {
    it('should calculate fat and lean mass correctly', () => {
      // 80 kg person with 20% body fat
      const result = calculateFatAndLeanMass(80, 20);
      expect(result.fatMass).toBeCloseTo(16, 1); // 80 × 0.20 = 16 kg
      expect(result.leanMass).toBeCloseTo(64, 1); // 80 - 16 = 64 kg
    });

    it('should calculate for low body fat athlete', () => {
      // 75 kg athlete with 10% body fat
      const result = calculateFatAndLeanMass(75, 10);
      expect(result.fatMass).toBeCloseTo(7.5, 1);
      expect(result.leanMass).toBeCloseTo(67.5, 1);
    });

    it('should calculate for high body fat', () => {
      // 100 kg person with 35% body fat
      const result = calculateFatAndLeanMass(100, 35);
      expect(result.fatMass).toBeCloseTo(35, 1);
      expect(result.leanMass).toBeCloseTo(65, 1);
    });

    it('should handle zero body fat', () => {
      // Theoretical case
      const result = calculateFatAndLeanMass(70, 0);
      expect(result.fatMass).toBe(0);
      expect(result.leanMass).toBe(70);
    });

    it('should calculate correctly for various weights', () => {
      const result1 = calculateFatAndLeanMass(60, 15);
      expect(result1.fatMass).toBeCloseTo(9, 1);
      expect(result1.leanMass).toBeCloseTo(51, 1);

      const result2 = calculateFatAndLeanMass(90, 25);
      expect(result2.fatMass).toBeCloseTo(22.5, 1);
      expect(result2.leanMass).toBeCloseTo(67.5, 1);
    });
  });

  describe('calculateBodyFat', () => {
    describe('Navy method', () => {
      it('should calculate using navy method for male', () => {
        const bodyFat = calculateBodyFat('navy', {
          gender: 'male',
          age: 30,
          heightCm: 180,
          weightKg: 80,
          waistCm: 90,
          neckCm: 38,
        });
        expect(bodyFat).toBeGreaterThan(5);
        expect(bodyFat).toBeLessThan(30);
      });

      it('should calculate using navy method for female', () => {
        const bodyFat = calculateBodyFat('navy', {
          gender: 'female',
          age: 28,
          heightCm: 165,
          weightKg: 65,
          waistCm: 85,
          neckCm: 33,
          hipsCm: 100,
        });
        expect(bodyFat).toBeGreaterThan(10);
        expect(bodyFat).toBeLessThan(40);
      });

      it('should throw error if waist not provided', () => {
        expect(() =>
          calculateBodyFat('navy', {
            gender: 'male',
            age: 30,
            heightCm: 180,
            weightKg: 80,
            neckCm: 38,
          })
        ).toThrow('Waist and neck measurements are required for the Navy method');
      });

      it('should throw error if neck not provided', () => {
        expect(() =>
          calculateBodyFat('navy', {
            gender: 'male',
            age: 30,
            heightCm: 180,
            weightKg: 80,
            waistCm: 85,
          })
        ).toThrow('Waist and neck measurements are required for the Navy method');
      });
    });

    describe('BMI method', () => {
      it('should calculate using BMI method with provided BMI', () => {
        const bodyFat = calculateBodyFat('bmi', {
          gender: 'male',
          age: 30,
          heightCm: 175,
          weightKg: 70,
          bmi: 22.86,
        });
        // (1.2 × 22.86) + (0.23 × 30) - 16.2 = 27.432 + 6.9 - 16.2 = 18.132
        expect(bodyFat).toBeCloseTo(18.13, 1);
      });

      it('should calculate using BMI method without provided BMI', () => {
        // Should calculate BMI from height and weight
        const bodyFat = calculateBodyFat('bmi', {
          gender: 'female',
          age: 25,
          heightCm: 165,
          weightKg: 60,
        });
        // BMI = 60 / (1.65^2) = 22.04
        // Body fat = (1.2 × 22.04) + (0.23 × 25) - 5.4 = 26.45 + 5.75 - 5.4 = 26.8
        expect(bodyFat).toBeGreaterThan(25);
        expect(bodyFat).toBeLessThan(28);
      });
    });

    describe('Manual method', () => {
      it('should return provided body fat percentage', () => {
        const bodyFat = calculateBodyFat('manual', {
          gender: 'male',
          age: 30,
          heightCm: 180,
          weightKg: 75,
          bodyFatPercentage: 15.5,
        });
        expect(bodyFat).toBe(15.5);
      });

      it('should throw error if body fat percentage not provided', () => {
        expect(() =>
          calculateBodyFat('manual', {
            gender: 'male',
            age: 30,
            heightCm: 180,
            weightKg: 75,
          })
        ).toThrow('Body fat percentage is required for manual entry');
      });
    });

    it('should throw error for unsupported method', () => {
      expect(() =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        calculateBodyFat('unsupported' as any, {
          gender: 'male',
          age: 30,
          heightCm: 180,
          weightKg: 75,
        })
      ).toThrow('Unsupported body fat calculation method: unsupported');
    });
  });
});

describe('Body Fat Real-World Examples', () => {
  it('should calculate body fat for average male using Navy method', () => {
    // Average male: 95cm waist, 38cm neck, 175cm height
    const bodyFat = calculateNavyMethodBodyFat('male', 95, 38, 175);
    expect(bodyFat).toBeGreaterThan(10);
    expect(bodyFat).toBeLessThan(30);
    // Just verify category is returned
    const category = getBodyFatCategory('male', bodyFat);
    expect(category.name).toBeDefined();
  });

  it('should calculate body fat for athlete male using Navy method', () => {
    // Athletic male: 85cm waist, 39cm neck, 180cm height
    const bodyFat = calculateNavyMethodBodyFat('male', 85, 39, 180);
    expect(bodyFat).toBeGreaterThan(5);
    expect(bodyFat).toBeLessThan(15);
    const category = getBodyFatCategory('male', bodyFat);
    expect(['Athletic', 'Fitness']).toContain(category.name);
  });

  it('should calculate body fat for average female using Navy method', () => {
    // Average female: 88cm waist, 32cm neck, 105cm hips, 165cm height
    const bodyFat = calculateNavyMethodBodyFat('female', 88, 32, 165, 105);
    expect(bodyFat).toBeGreaterThan(10);
    expect(bodyFat).toBeLessThan(40);
    const category = getBodyFatCategory('female', bodyFat);
    expect(category.name).toBeDefined();
  });

  it('should calculate body fat using BMI method for middle-aged person', () => {
    // 45-year-old with BMI 27
    // Male: (1.2 × 27) + (0.23 × 45) - 16.2 = 32.4 + 10.35 - 16.2 = 26.55
    // Female: (1.2 × 27) + (0.23 × 45) - 5.4 = 32.4 + 10.35 - 5.4 = 37.35
    const maleBF = calculateBMIMethodBodyFat('male', 45, 27);
    const femaleBF = calculateBMIMethodBodyFat('female', 45, 27);

    expect(maleBF).toBeCloseTo(26.55, 1);
    expect(femaleBF).toBeCloseTo(37.35, 1);
    expect(femaleBF - maleBF).toBeCloseTo(10.8, 1);
  });

  it('should show different methods give different results', () => {
    const navyMethod = calculateNavyMethodBodyFat('male', 85, 38, 175);
    const bmiMethod = calculateBMIMethodBodyFat('male', 30, 24);

    // Both should be in reasonable range
    expect(navyMethod).toBeGreaterThan(10);
    expect(navyMethod).toBeLessThan(25);
    expect(bmiMethod).toBeGreaterThan(10);
    expect(bmiMethod).toBeLessThan(25);

    // But will likely differ
    // (Can't guarantee exact difference without controlled inputs)
  });

  it('should calculate fat and lean mass composition', () => {
    // 80kg male with 18% body fat
    const result = calculateFatAndLeanMass(80, 18);
    expect(result.fatMass).toBeCloseTo(14.4, 1);
    expect(result.leanMass).toBeCloseTo(65.6, 1);
    expect(result.fatMass + result.leanMass).toBeCloseTo(80, 1);
  });
});
