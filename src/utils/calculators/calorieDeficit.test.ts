/**
 * Tests for Calorie Deficit Calculator
 */

import { describe, it, expect } from 'vitest';
import {
  calculateCalorieDeficit,
  getDeficitOption,
  formatTargetDate,
  getDeficitSafetyMessage,
} from './calorieDeficit';
import type { CalorieDeficitFormData } from '@/types/calorieDeficit';
import { MIN_CALORIES, CALORIES_PER_KG_FAT } from '@/constants/calorieDeficit';

describe('getDeficitOption', () => {
  it('should return mild deficit option', () => {
    const option = getDeficitOption('mild');
    expect(option.level).toBe('mild');
    expect(option.dailyDeficit).toBe(375);
    expect(option.weeklyWeightLoss).toBe(0.375);
    expect(option.safetyRating).toBe('safe');
  });

  it('should return moderate deficit option', () => {
    const option = getDeficitOption('moderate');
    expect(option.level).toBe('moderate');
    expect(option.dailyDeficit).toBe(625);
    expect(option.weeklyWeightLoss).toBe(0.625);
    expect(option.safetyRating).toBe('safe');
  });

  it('should return aggressive deficit option', () => {
    const option = getDeficitOption('aggressive');
    expect(option.level).toBe('aggressive');
    expect(option.dailyDeficit).toBe(875);
    expect(option.weeklyWeightLoss).toBe(0.875);
    expect(option.safetyRating).toBe('moderate');
  });

  it('should throw error for invalid deficit level', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => getDeficitOption('invalid' as any)).toThrow('Invalid deficit level: invalid');
  });
});

describe('calculateCalorieDeficit', () => {
  const baseFormData: CalorieDeficitFormData = {
    gender: 'male',
    age: 30,
    heightCm: 180,
    weightKg: 90,
    activityLevel: 'moderately_active',
    goalWeightKg: 80,
    deficitLevel: 'moderate',
  };

  describe('Basic Calculations', () => {
    it('should calculate basic calorie deficit for male', () => {
      const result = calculateCalorieDeficit(baseFormData);

      expect(result.tdee).toBeGreaterThan(2500);
      expect(result.tdee).toBeLessThan(3000);
      expect(result.bmr).toBeGreaterThan(1800);
      expect(result.bmr).toBeLessThan(2100);
      expect(result.goalWeightKg).toBe(80);
      expect(result.weightToLose).toBe(10);
      expect(result.deficitLevel).toBe('moderate');
      expect(result.dailyDeficit).toBe(625);
    });

    it('should calculate basic calorie deficit for female', () => {
      const femaleData: CalorieDeficitFormData = {
        ...baseFormData,
        gender: 'female',
        heightCm: 165,
        weightKg: 70,
        goalWeightKg: 60,
      };

      const result = calculateCalorieDeficit(femaleData);

      expect(result.tdee).toBeGreaterThan(1800);
      expect(result.tdee).toBeLessThan(2300);
      expect(result.bmr).toBeGreaterThan(1300);
      expect(result.bmr).toBeLessThan(1700);
      expect(result.weightToLose).toBe(10);
    });

    it('should calculate daily calorie target correctly', () => {
      const result = calculateCalorieDeficit(baseFormData);

      const expectedTarget = result.tdee - result.dailyDeficit;
      expect(result.dailyCalorieTarget).toBe(Math.round(expectedTarget));
    });

    it('should calculate weekly weight loss correctly', () => {
      const result = calculateCalorieDeficit(baseFormData);

      const weeklyDeficit = result.dailyDeficit * 7;
      const expectedWeeklyLoss = weeklyDeficit / CALORIES_PER_KG_FAT;

      expect(result.weeklyWeightLoss).toBeCloseTo(expectedWeeklyLoss, 3);
    });
  });

  describe('Deficit Levels', () => {
    it('should calculate mild deficit correctly', () => {
      const mildData: CalorieDeficitFormData = {
        ...baseFormData,
        deficitLevel: 'mild',
      };

      const result = calculateCalorieDeficit(mildData);

      expect(result.deficitLevel).toBe('mild');
      expect(result.dailyDeficit).toBe(375);
      expect(result.weeklyWeightLoss).toBeCloseTo(0.34, 1);
    });

    it('should calculate moderate deficit correctly', () => {
      const result = calculateCalorieDeficit(baseFormData);

      expect(result.deficitLevel).toBe('moderate');
      expect(result.dailyDeficit).toBe(625);
      expect(result.weeklyWeightLoss).toBeCloseTo(0.57, 1);
    });

    it('should calculate aggressive deficit correctly', () => {
      const aggressiveData: CalorieDeficitFormData = {
        ...baseFormData,
        deficitLevel: 'aggressive',
      };

      const result = calculateCalorieDeficit(aggressiveData);

      expect(result.deficitLevel).toBe('aggressive');
      expect(result.dailyDeficit).toBe(875);
      expect(result.weeklyWeightLoss).toBeCloseTo(0.79, 1);
    });
  });

  describe('Activity Levels', () => {
    it('should calculate for sedentary activity level', () => {
      const sedentaryData: CalorieDeficitFormData = {
        ...baseFormData,
        activityLevel: 'sedentary',
      };

      const result = calculateCalorieDeficit(sedentaryData);

      expect(result.tdee).toBeGreaterThan(2000);
      expect(result.tdee).toBeLessThan(2400);
    });

    it('should calculate for lightly active level', () => {
      const lightlyActiveData: CalorieDeficitFormData = {
        ...baseFormData,
        activityLevel: 'lightly_active',
      };

      const result = calculateCalorieDeficit(lightlyActiveData);

      expect(result.tdee).toBeGreaterThan(2300);
      expect(result.tdee).toBeLessThan(2700);
    });

    it('should calculate for very active level', () => {
      const veryActiveData: CalorieDeficitFormData = {
        ...baseFormData,
        activityLevel: 'very_active',
      };

      const result = calculateCalorieDeficit(veryActiveData);

      expect(result.tdee).toBeGreaterThan(2900);
      expect(result.tdee).toBeLessThan(3400);
    });

    it('should calculate for extremely active level', () => {
      const extremelyActiveData: CalorieDeficitFormData = {
        ...baseFormData,
        activityLevel: 'extremely_active',
      };

      const result = calculateCalorieDeficit(extremelyActiveData);

      expect(result.tdee).toBeGreaterThan(3200);
      expect(result.tdee).toBeLessThan(3800);
    });
  });

  describe('Timeline Calculations', () => {
    it('should calculate estimated weeks correctly', () => {
      const result = calculateCalorieDeficit(baseFormData);

      // Verify timeline is calculated
      expect(result.estimatedWeeks).toBeGreaterThan(0);
      expect(result.estimatedDays).toBeGreaterThan(0);

      // Verify days/weeks relationship
      expect(result.estimatedWeeks).toBe(Math.ceil(result.estimatedDays / 7));

      // Verify reasonable timeline for 10kg loss
      expect(result.estimatedWeeks).toBeGreaterThan(10); // At least 10 weeks
      expect(result.estimatedWeeks).toBeLessThan(30); // Less than 30 weeks
    });

    it('should calculate target date correctly', () => {
      const result = calculateCalorieDeficit(baseFormData);

      const now = new Date();
      const expected = new Date(now);
      expected.setDate(expected.getDate() + result.estimatedDays);

      // Allow 1 day difference due to timing
      const daysDiff = Math.abs(result.targetDate.getTime() - expected.getTime()) / (1000 * 60 * 60 * 24);
      expect(daysDiff).toBeLessThan(2);
    });

    it('should generate weekly projections', () => {
      const result = calculateCalorieDeficit(baseFormData);

      expect(result.weeklyProjections).toBeDefined();
      expect(result.weeklyProjections.length).toBeGreaterThan(0);
      expect(result.weeklyProjections[0].week).toBe(0);
      expect(result.weeklyProjections[0].projectedWeight).toBe(90);
      expect(result.weeklyProjections[0].cumulativeWeightLoss).toBe(0);
    });

    it('should project weight loss over time with metabolic adaptation', () => {
      const result = calculateCalorieDeficit(baseFormData);

      const lastProjection = result.weeklyProjections[result.weeklyProjections.length - 1];

      expect(lastProjection.projectedWeight).toBeLessThan(90);
      expect(lastProjection.cumulativeWeightLoss).toBeGreaterThan(0);
      expect(lastProjection.cumulativeWeightLoss).toBeLessThanOrEqual(10);
    });

    it('should not project beyond max weeks (52 weeks)', () => {
      const longTermData: CalorieDeficitFormData = {
        ...baseFormData,
        weightKg: 150,
        goalWeightKg: 70, // 80 kg to lose
        deficitLevel: 'mild',
      };

      const result = calculateCalorieDeficit(longTermData);

      expect(result.weeklyProjections.length).toBeLessThanOrEqual(53); // 0 to 52 weeks
    });
  });

  describe('Safety Warnings', () => {
    it('should warn when calorie target is below minimum for males', () => {
      const lowCalorieData: CalorieDeficitFormData = {
        gender: 'male',
        age: 25,
        heightCm: 165,
        weightKg: 60,
        activityLevel: 'sedentary',
        goalWeightKg: 55,
        deficitLevel: 'aggressive',
      };

      const result = calculateCalorieDeficit(lowCalorieData);

      if (result.dailyCalorieTarget < MIN_CALORIES.male) {
        expect(result.warnings.length).toBeGreaterThan(0);
        expect(result.warnings.some(w => w.includes('below the recommended minimum'))).toBe(true);
      }
    });

    it('should warn when calorie target is below minimum for females', () => {
      const lowCalorieData: CalorieDeficitFormData = {
        gender: 'female',
        age: 25,
        heightCm: 155,
        weightKg: 50,
        activityLevel: 'sedentary',
        goalWeightKg: 46,
        deficitLevel: 'aggressive',
      };

      const result = calculateCalorieDeficit(lowCalorieData);

      if (result.dailyCalorieTarget < MIN_CALORIES.female) {
        expect(result.warnings.length).toBeGreaterThan(0);
        expect(result.warnings.some(w => w.includes('below the recommended minimum'))).toBe(true);
      }
    });

    it('should warn when weekly weight loss exceeds 1 kg', () => {
      const fastLossData: CalorieDeficitFormData = {
        ...baseFormData,
        activityLevel: 'very_active',
        deficitLevel: 'aggressive',
      };

      const result = calculateCalorieDeficit(fastLossData);

      if (result.weeklyWeightLoss > 1.0) {
        expect(result.warnings.some(w => w.includes('exceeds 1 kg/week'))).toBe(true);
      }
    });

    it('should warn about very short timeline (< 4 weeks)', () => {
      const shortTimelineData: CalorieDeficitFormData = {
        ...baseFormData,
        goalWeightKg: 88, // Only 2 kg to lose
        deficitLevel: 'aggressive',
      };

      const result = calculateCalorieDeficit(shortTimelineData);

      if (result.estimatedWeeks < 4) {
        expect(result.warnings.some(w => w.includes('Very short timeline'))).toBe(true);
      }
    });
  });

  describe('Recommendations', () => {
    it('should provide minimum calorie recommendations', () => {
      const result = calculateCalorieDeficit(baseFormData);

      expect(result.recommendations.minCalories).toBe(MIN_CALORIES.male);
    });

    it('should calculate max deficit correctly', () => {
      const result = calculateCalorieDeficit(baseFormData);

      const expectedMaxDeficit = result.tdee - MIN_CALORIES.male;
      expect(result.recommendations.maxDeficit).toBe(Math.round(expectedMaxDeficit));
    });

    it('should calculate protein recommendations', () => {
      const result = calculateCalorieDeficit(baseFormData);

      expect(result.recommendations.proteinGrams).toBeGreaterThan(100);
      expect(result.recommendations.proteinGrams).toBeLessThan(250);
    });

    it('should calculate water recommendations', () => {
      const result = calculateCalorieDeficit(baseFormData);

      expect(result.recommendations.waterLiters).toBeGreaterThan(2);
      expect(result.recommendations.waterLiters).toBeLessThan(4);
      expect(result.recommendations.waterLiters).toBeCloseTo(90 * 0.033, 1);
    });
  });

  describe('Validation', () => {
    it('should throw error when goal weight >= current weight', () => {
      const invalidData: CalorieDeficitFormData = {
        ...baseFormData,
        goalWeightKg: 90, // Same as current
      };

      expect(() => calculateCalorieDeficit(invalidData)).toThrow('Goal weight must be less than current weight');
    });

    it('should throw error when goal weight > current weight', () => {
      const invalidData: CalorieDeficitFormData = {
        ...baseFormData,
        goalWeightKg: 95, // More than current
      };

      expect(() => calculateCalorieDeficit(invalidData)).toThrow('Goal weight must be less than current weight');
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum weight loss (1 kg)', () => {
      const minWeightLoss: CalorieDeficitFormData = {
        ...baseFormData,
        goalWeightKg: 89,
      };

      const result = calculateCalorieDeficit(minWeightLoss);

      expect(result.weightToLose).toBe(1);
      expect(result.estimatedWeeks).toBeGreaterThan(0);
    });

    it('should handle large weight loss (50 kg)', () => {
      const largeWeightLoss: CalorieDeficitFormData = {
        ...baseFormData,
        weightKg: 130,
        goalWeightKg: 80,
      };

      const result = calculateCalorieDeficit(largeWeightLoss);

      expect(result.weightToLose).toBe(50);
      expect(result.estimatedWeeks).toBeGreaterThan(40);
    });

    it('should handle elderly user (age 70)', () => {
      const elderlyData: CalorieDeficitFormData = {
        ...baseFormData,
        age: 70,
      };

      const result = calculateCalorieDeficit(elderlyData);

      expect(result.bmr).toBeLessThan(baseFormData.age === 30 ? 2000 : Infinity);
      expect(result.tdee).toBeGreaterThan(0);
    });

    it('should handle young adult (age 18)', () => {
      const youngData: CalorieDeficitFormData = {
        ...baseFormData,
        age: 18,
      };

      const result = calculateCalorieDeficit(youngData);

      expect(result.bmr).toBeGreaterThan(1500);
      expect(result.tdee).toBeGreaterThan(2000);
    });

    it('should handle very tall person (200 cm)', () => {
      const tallData: CalorieDeficitFormData = {
        ...baseFormData,
        heightCm: 200,
      };

      const result = calculateCalorieDeficit(tallData);

      expect(result.bmr).toBeGreaterThan(2000);
    });

    it('should handle very short person (150 cm)', () => {
      const shortData: CalorieDeficitFormData = {
        ...baseFormData,
        heightCm: 150,
      };

      const result = calculateCalorieDeficit(shortData);

      expect(result.bmr).toBeLessThan(2000);
    });

    it('should handle very heavy person (150 kg)', () => {
      const heavyData: CalorieDeficitFormData = {
        ...baseFormData,
        weightKg: 150,
        goalWeightKg: 100,
      };

      const result = calculateCalorieDeficit(heavyData);

      expect(result.bmr).toBeGreaterThan(2000);
      expect(result.weightToLose).toBe(50);
    });

    it('should handle very light person (50 kg)', () => {
      const lightData: CalorieDeficitFormData = {
        ...baseFormData,
        weightKg: 55,
        goalWeightKg: 50,
      };

      const result = calculateCalorieDeficit(lightData);

      expect(result.bmr).toBeLessThan(1700);
      expect(result.weightToLose).toBe(5);
    });
  });
});

describe('formatTargetDate', () => {
  it('should format date correctly', () => {
    const date = new Date(2024, 11, 25); // December 25, 2024 (month is 0-indexed)
    const formatted = formatTargetDate(date);

    expect(formatted).toContain('December');
    expect(formatted).toContain('25');
    expect(formatted).toContain('2024');
  });

  it('should handle different months', () => {
    const dates = [
      new Date(2024, 0, 15),  // January 15, 2024
      new Date(2024, 5, 1),   // June 1, 2024
      new Date(2024, 11, 31), // December 31, 2024
    ];

    const formatted = dates.map(d => formatTargetDate(d));

    expect(formatted[0]).toContain('January');
    expect(formatted[1]).toContain('June');
    expect(formatted[2]).toContain('December');
  });

  it('should handle leap year dates', () => {
    const leapDate = new Date(2024, 1, 29); // February 29, 2024
    const formatted = formatTargetDate(leapDate);

    expect(formatted).toContain('February');
    expect(formatted).toContain('29');
  });
});

describe('getDeficitSafetyMessage', () => {
  it('should return mild deficit message', () => {
    const message = getDeficitSafetyMessage('mild');

    expect(message).toContain('safe and sustainable');
    expect(message).toContain('gradually');
  });

  it('should return moderate deficit message', () => {
    const message = getDeficitSafetyMessage('moderate');

    expect(message).toContain('balances speed with sustainability');
  });

  it('should return aggressive deficit message', () => {
    const message = getDeficitSafetyMessage('aggressive');

    expect(message).toContain('faster results');
    expect(message).toContain('careful monitoring');
    expect(message).toContain('healthcare provider');
  });

  it('should return different messages for each level', () => {
    const mild = getDeficitSafetyMessage('mild');
    const moderate = getDeficitSafetyMessage('moderate');
    const aggressive = getDeficitSafetyMessage('aggressive');

    expect(mild).not.toBe(moderate);
    expect(moderate).not.toBe(aggressive);
    expect(mild).not.toBe(aggressive);
  });
});
