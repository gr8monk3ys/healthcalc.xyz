import { describe, it, expect } from 'vitest';
import {
  calculateBMI,
  getBMICategory,
  calculateHealthyWeightRange,
  estimateBMIPercentile,
  getBMIPercentileCategory,
} from './bmi';

describe('BMI Calculation', () => {
  describe('calculateBMI', () => {
    it('should calculate BMI correctly for metric inputs', () => {
      const bmi = calculateBMI(170, 70);
      expect(bmi).toBeCloseTo(24.22, 1);
    });

    it('should calculate BMI correctly for tall person', () => {
      const bmi = calculateBMI(200, 100);
      expect(bmi).toBeCloseTo(25, 0);
    });

    it('should calculate BMI correctly for short person', () => {
      const bmi = calculateBMI(150, 50);
      expect(bmi).toBeCloseTo(22.22, 1);
    });

    it('should throw error for negative weight', () => {
      expect(() => calculateBMI(170, -70)).toThrow('Weight must be greater than 0');
    });

    it('should throw error for negative height', () => {
      expect(() => calculateBMI(-170, 70)).toThrow('Height must be greater than 0');
    });

    it('should throw error for zero height', () => {
      expect(() => calculateBMI(0, 70)).toThrow('Height must be greater than 0');
    });

    it('should throw error for zero weight', () => {
      expect(() => calculateBMI(170, 0)).toThrow('Weight must be greater than 0');
    });
  });

  describe('getBMICategory', () => {
    it('should categorize underweight correctly', () => {
      const result1 = getBMICategory(17);
      expect(result1.name).toBe('Underweight');
      expect(result1.color).toBeDefined();

      const result2 = getBMICategory(18.4);
      expect(result2.name).toBe('Underweight');
    });

    it('should categorize normal weight correctly', () => {
      const result1 = getBMICategory(18.5);
      expect(result1.name).toBe('Normal');

      const result2 = getBMICategory(22);
      expect(result2.name).toBe('Normal');

      const result3 = getBMICategory(24.9);
      expect(result3.name).toBe('Normal');
    });

    it('should categorize overweight correctly', () => {
      const result1 = getBMICategory(25);
      expect(result1.name).toBe('Overweight');

      const result2 = getBMICategory(27);
      expect(result2.name).toBe('Overweight');

      const result3 = getBMICategory(29.9);
      expect(result3.name).toBe('Overweight');
    });

    it('should categorize obese correctly', () => {
      const result1 = getBMICategory(30);
      expect(result1.name).toBe('Obese');

      const result2 = getBMICategory(35);
      expect(result2.name).toBe('Obese');

      const result3 = getBMICategory(40);
      expect(result3.name).toBe('Obese');
    });

    it('should handle boundary values', () => {
      expect(getBMICategory(18.5).name).toBe('Normal');
      expect(getBMICategory(24.9).name).toBe('Normal');
      expect(getBMICategory(25.0).name).toBe('Overweight');
      expect(getBMICategory(29.9).name).toBe('Overweight');
      expect(getBMICategory(30.0).name).toBe('Obese');
    });

    it('should return color for each category', () => {
      expect(getBMICategory(17).color).toBe('#3B82F6'); // blue for underweight
      expect(getBMICategory(22).color).toBe('#10B981'); // green for normal
      expect(getBMICategory(27).color).toBe('#F59E0B'); // yellow for overweight
      expect(getBMICategory(35).color).toBe('#EF4444'); // red for obese
    });

    it('should throw error for zero or negative BMI', () => {
      expect(() => getBMICategory(0)).toThrow('BMI must be greater than 0');
      expect(() => getBMICategory(-5)).toThrow('BMI must be greater than 0');
    });
  });

  describe('calculateHealthyWeightRange', () => {
    it('should calculate healthy weight range for 170cm height', () => {
      const range = calculateHealthyWeightRange(170);
      expect(range.min).toBeCloseTo(53.5, 0); // BMI 18.5 * 1.7^2, rounded to 1 decimal
      expect(range.max).toBeCloseTo(72.0, 0); // BMI 24.9 * 1.7^2, rounded to 1 decimal
    });

    it('should calculate healthy weight range for tall person (200cm)', () => {
      const range = calculateHealthyWeightRange(200);
      expect(range.min).toBeCloseTo(74, 0);
      expect(range.max).toBeCloseTo(99.6, 1);
    });

    it('should calculate healthy weight range for short person (150cm)', () => {
      const range = calculateHealthyWeightRange(150);
      expect(range.min).toBeCloseTo(41.6, 1);
      expect(range.max).toBeCloseTo(56, 0);
    });

    it('should throw error for zero height', () => {
      expect(() => calculateHealthyWeightRange(0)).toThrow('Height must be greater than 0');
    });

    it('should throw error for negative height', () => {
      expect(() => calculateHealthyWeightRange(-170)).toThrow('Height must be greater than 0');
    });
  });

  describe('estimateBMIPercentile', () => {
    it('should estimate percentile for boys', () => {
      const percentile = estimateBMIPercentile(17, 10, 'male');
      expect(percentile).toBeGreaterThanOrEqual(0);
      expect(percentile).toBeLessThanOrEqual(100);
    });

    it('should estimate percentile for girls', () => {
      const percentile = estimateBMIPercentile(17, 10, 'female');
      expect(percentile).toBeGreaterThanOrEqual(0);
      expect(percentile).toBeLessThanOrEqual(100);
    });

    it('should return lower percentile for lower BMI', () => {
      const low = estimateBMIPercentile(15, 10, 'male');
      const high = estimateBMIPercentile(20, 10, 'male');
      expect(low).toBeLessThan(high);
    });

    it('should handle minimum age (2 years)', () => {
      const percentile = estimateBMIPercentile(15, 2, 'male');
      expect(percentile).toBeGreaterThanOrEqual(0);
      expect(percentile).toBeLessThanOrEqual(100);
    });

    it('should handle maximum age (20 years)', () => {
      const percentile = estimateBMIPercentile(22, 20, 'male');
      expect(percentile).toBeGreaterThanOrEqual(0);
      expect(percentile).toBeLessThanOrEqual(100);
    });

    it('should throw error for age below 2', () => {
      expect(() => estimateBMIPercentile(15, 1, 'male')).toThrow(
        'Age must be between 2 and 20 for percentile calculation'
      );
    });

    it('should throw error for age above 20', () => {
      expect(() => estimateBMIPercentile(22, 21, 'male')).toThrow(
        'Age must be between 2 and 20 for percentile calculation'
      );
    });

    it('should throw error for zero or negative BMI', () => {
      expect(() => estimateBMIPercentile(0, 10, 'male')).toThrow('BMI must be greater than 0');
      expect(() => estimateBMIPercentile(-5, 10, 'male')).toThrow('BMI must be greater than 0');
    });
  });

  describe('getBMIPercentileCategory', () => {
    it('should categorize underweight percentile', () => {
      const result1 = getBMIPercentileCategory(4);
      expect(result1.name).toBe('Underweight');
      expect(result1.color).toBeDefined();

      const result2 = getBMIPercentileCategory(4.9);
      expect(result2.name).toBe('Underweight');
    });

    it('should categorize healthy weight percentile', () => {
      const result1 = getBMIPercentileCategory(5);
      expect(result1.name).toBe('Healthy weight');

      const result2 = getBMIPercentileCategory(50);
      expect(result2.name).toBe('Healthy weight');

      const result3 = getBMIPercentileCategory(84.9);
      expect(result3.name).toBe('Healthy weight');
    });

    it('should categorize overweight percentile', () => {
      const result1 = getBMIPercentileCategory(85);
      expect(result1.name).toBe('Overweight');

      const result2 = getBMIPercentileCategory(90);
      expect(result2.name).toBe('Overweight');

      const result3 = getBMIPercentileCategory(94.9);
      expect(result3.name).toBe('Overweight');
    });

    it('should categorize obese percentile', () => {
      const result1 = getBMIPercentileCategory(95);
      expect(result1.name).toBe('Obese');

      const result2 = getBMIPercentileCategory(99);
      expect(result2.name).toBe('Obese');
    });

    it('should handle boundary values', () => {
      expect(getBMIPercentileCategory(5).name).toBe('Healthy weight');
      expect(getBMIPercentileCategory(84.9).name).toBe('Healthy weight');
      expect(getBMIPercentileCategory(85).name).toBe('Overweight');
      expect(getBMIPercentileCategory(94.9).name).toBe('Overweight');
      expect(getBMIPercentileCategory(95).name).toBe('Obese');
    });

    it('should handle edge cases', () => {
      expect(getBMIPercentileCategory(0).name).toBe('Underweight');
      expect(getBMIPercentileCategory(100).name).toBe('Obese');
    });

    it('should throw error for invalid percentile', () => {
      expect(() => getBMIPercentileCategory(-1)).toThrow(
        'Percentile must be between 0 and 100'
      );
      expect(() => getBMIPercentileCategory(101)).toThrow(
        'Percentile must be between 0 and 100'
      );
    });
  });
});

describe('BMI Edge Cases', () => {
  it('should handle extremely high BMI', () => {
    const bmi = calculateBMI(170, 200);
    expect(bmi).toBeGreaterThan(60);
    expect(getBMICategory(bmi).name).toBe('Obese');
  });

  it('should handle extremely low BMI', () => {
    const bmi = calculateBMI(180, 40);
    expect(bmi).toBeLessThan(15);
    expect(getBMICategory(bmi).name).toBe('Underweight');
  });
});

describe('BMI Real-World Examples', () => {
  it('should calculate BMI for average adult male', () => {
    // Average US male: ~89.4 kg, 175.3 cm
    const bmi = calculateBMI(175.3, 89.4);
    expect(bmi).toBeCloseTo(29.1, 1);
    expect(getBMICategory(bmi).name).toBe('Overweight');
  });

  it('should calculate BMI for average adult female', () => {
    // Average US female: ~77.1 kg, 162.6 cm
    const bmi = calculateBMI(162.6, 77.1);
    expect(bmi).toBeCloseTo(29.2, 1);
    expect(getBMICategory(bmi).name).toBe('Overweight');
  });

  it('should calculate BMI for athlete', () => {
    // Muscular athlete: 90 kg, 180 cm
    const bmi = calculateBMI(180, 90);
    expect(bmi).toBeCloseTo(27.8, 1);
    // Note: Athletes may show "overweight" despite being healthy
    // This is a known limitation of BMI
    expect(getBMICategory(bmi).name).toBe('Overweight');
  });

  it('should calculate BMI for child', () => {
    // 10-year-old child: 31.8 kg (70 lbs), 137.2 cm (4\'6")
    const bmi = calculateBMI(137.2, 31.8);
    expect(bmi).toBeCloseTo(16.9, 1);
    // For children, BMI alone isn't enough - need percentile
    const percentile = estimateBMIPercentile(bmi, 10, 'female');
    expect(percentile).toBeGreaterThan(0);
    expect(percentile).toBeLessThan(100);
  });
});
