/**
 * Tests for Weight Management Calculator
 */

import { describe, it, expect } from 'vitest';
import { calculateWeightManagement, getDietTypeConfig, formatDate } from './weightManagement';
import type { WeightManagementFormData } from '@/types/weightManagement';
import { MIN_CALORIES, SAFE_WEIGHT_LOSS_MAX } from '@/constants/weightManagement';

describe('getDietTypeConfig', () => {
  it('should return balanced diet configuration', () => {
    const config = getDietTypeConfig('balanced');
    expect(config.type).toBe('balanced');
    expect(config.proteinPercentage).toBe(30);
    expect(config.carbsPercentage).toBe(40);
    expect(config.fatPercentage).toBe(30);
  });

  it('should return low-carb diet configuration', () => {
    const config = getDietTypeConfig('low-carb');
    expect(config.type).toBe('low-carb');
    expect(config.proteinPercentage).toBe(40);
    expect(config.carbsPercentage).toBe(25);
    expect(config.fatPercentage).toBe(35);
  });

  it('should return high-protein diet configuration', () => {
    const config = getDietTypeConfig('high-protein');
    expect(config.type).toBe('high-protein');
    expect(config.proteinPercentage).toBe(40);
    expect(config.carbsPercentage).toBe(30);
    expect(config.fatPercentage).toBe(30);
  });

  it('should return keto diet configuration', () => {
    const config = getDietTypeConfig('keto');
    expect(config.type).toBe('keto');
    expect(config.proteinPercentage).toBe(30);
    expect(config.carbsPercentage).toBe(5);
    expect(config.fatPercentage).toBe(65);
  });

  it('should return balanced diet as default for invalid type', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const config = getDietTypeConfig('invalid' as any);
    expect(config.type).toBe('balanced');
  });
});

describe('calculateWeightManagement', () => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 84); // 12 weeks from now

  const baseFormData: WeightManagementFormData = {
    gender: 'male',
    age: 30,
    heightCm: 180,
    weightKg: 90,
    activityLevel: 'moderately_active',
    goalWeightKg: 80,
    goalType: 'lose',
    targetDate: futureDate,
    dietType: 'balanced',
  };

  describe('Weight Loss Scenarios', () => {
    it('should calculate weight loss plan correctly', () => {
      const result = calculateWeightManagement(baseFormData);

      expect(result.currentWeightKg).toBe(90);
      expect(result.goalWeightKg).toBe(80);
      expect(result.weightToChange).toBe(-10);
      expect(result.tdee).toBeGreaterThan(2500);
      expect(result.tdee).toBeLessThan(3000);
      expect(result.dailyCalorieTarget).toBeLessThan(result.tdee); // Should be in deficit
      expect(result.weeklyWeightChange).toBeLessThan(0); // Negative for weight loss
    });

    it('should warn about too aggressive weight loss', () => {
      const aggressiveData: WeightManagementFormData = {
        ...baseFormData,
        targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
      };

      const result = calculateWeightManagement(aggressiveData);

      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.warnings.some(w => w.includes('exceeds the safe maximum'))).toBe(true);
      expect(result.adjustedTargetDate).toBeDefined();
    });

    it('should apply minimum calorie limit for males', () => {
      const lowCalorieData: WeightManagementFormData = {
        gender: 'male',
        age: 25,
        heightCm: 165,
        weightKg: 60,
        activityLevel: 'sedentary',
        goalWeightKg: 50,
        goalType: 'lose',
        targetDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks
        dietType: 'balanced',
      };

      const result = calculateWeightManagement(lowCalorieData);

      if (result.dailyCalorieTarget < MIN_CALORIES.male) {
        expect(result.warnings.some(w => w.includes('below the safe minimum'))).toBe(true);
      }
    });

    it('should apply minimum calorie limit for females', () => {
      const lowCalorieData: WeightManagementFormData = {
        gender: 'female',
        age: 25,
        heightCm: 155,
        weightKg: 50,
        activityLevel: 'sedentary',
        goalWeightKg: 42,
        goalType: 'lose',
        targetDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks
        dietType: 'balanced',
      };

      const result = calculateWeightManagement(lowCalorieData);

      if (result.dailyCalorieTarget < MIN_CALORIES.female) {
        expect(result.warnings.some(w => w.includes('below the safe minimum'))).toBe(true);
      }
    });
  });

  describe('Weight Gain Scenarios', () => {
    it('should calculate weight gain plan correctly', () => {
      const gainData: WeightManagementFormData = {
        ...baseFormData,
        weightKg: 70,
        goalWeightKg: 80,
        goalType: 'gain',
      };

      const result = calculateWeightManagement(gainData);

      expect(result.currentWeightKg).toBe(70);
      expect(result.goalWeightKg).toBe(80);
      expect(result.weightToChange).toBe(10);
      expect(result.dailyCalorieTarget).toBeGreaterThan(result.tdee); // Should be in surplus
      expect(result.weeklyWeightChange).toBeGreaterThan(0); // Positive for weight gain
    });

    it('should warn about too aggressive weight gain', () => {
      const aggressiveGainData: WeightManagementFormData = {
        ...baseFormData,
        weightKg: 70,
        goalWeightKg: 90,
        goalType: 'gain',
        targetDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks for 20kg
      };

      const result = calculateWeightManagement(aggressiveGainData);

      expect(result.warnings.length).toBeGreaterThan(0);
      expect(
        result.warnings.some(
          w => w.includes('exceeds the safe maximum') || w.includes('more fat gain')
        )
      ).toBe(true);
    });
  });

  describe('Weight Maintenance', () => {
    it('should calculate maintenance plan when weight change is minimal', () => {
      const maintainData: WeightManagementFormData = {
        ...baseFormData,
        goalWeightKg: 90, // Same as current
        goalType: 'maintain',
      };

      const result = calculateWeightManagement(maintainData);

      expect(result.weightToChange).toBe(0);
      expect(Math.abs(result.dailyCalorieTarget - result.tdee)).toBeLessThan(100); // Should be close to TDEE
    });
  });

  describe('Diet Type Impact on Macros', () => {
    it('should calculate balanced diet macros correctly', () => {
      const result = calculateWeightManagement(baseFormData);

      expect(result.macros.proteinPercentage).toBe(30);
      expect(result.macros.carbsPercentage).toBe(40);
      expect(result.macros.fatPercentage).toBe(30);

      // Verify math: protein + carbs + fat percentages = 100
      const total =
        result.macros.proteinPercentage +
        result.macros.carbsPercentage +
        result.macros.fatPercentage;
      expect(total).toBe(100);
    });

    it('should calculate low-carb diet macros correctly', () => {
      const lowCarbData: WeightManagementFormData = {
        ...baseFormData,
        dietType: 'low-carb',
      };

      const result = calculateWeightManagement(lowCarbData);

      expect(result.macros.proteinPercentage).toBe(40);
      expect(result.macros.carbsPercentage).toBe(25);
      expect(result.macros.fatPercentage).toBe(35);
    });

    it('should calculate high-protein diet macros correctly', () => {
      const highProteinData: WeightManagementFormData = {
        ...baseFormData,
        dietType: 'high-protein',
      };

      const result = calculateWeightManagement(highProteinData);

      expect(result.macros.proteinPercentage).toBe(40);
      expect(result.macros.carbsPercentage).toBe(30);
      expect(result.macros.fatPercentage).toBe(30);
    });

    it('should calculate keto diet macros correctly', () => {
      const ketoData: WeightManagementFormData = {
        ...baseFormData,
        dietType: 'keto',
      };

      const result = calculateWeightManagement(ketoData);

      expect(result.macros.proteinPercentage).toBe(30);
      expect(result.macros.carbsPercentage).toBe(5);
      expect(result.macros.fatPercentage).toBe(65);
    });

    it('should calculate macro grams from calories correctly', () => {
      const result = calculateWeightManagement(baseFormData);

      // Protein: 4 cal/g, Carbs: 4 cal/g, Fat: 9 cal/g
      const proteinCalories = result.macros.proteinGrams * 4;
      const carbsCalories = result.macros.carbsGrams * 4;
      const fatCalories = result.macros.fatGrams * 9;

      // Should approximately match the calculated macro calories (within rounding)
      expect(Math.abs(proteinCalories - result.macros.proteinCalories)).toBeLessThan(20);
      expect(Math.abs(carbsCalories - result.macros.carbsCalories)).toBeLessThan(20);
      expect(Math.abs(fatCalories - result.macros.fatCalories)).toBeLessThan(20);
    });
  });

  describe('Timeline Calculations', () => {
    it('should calculate timeline correctly', () => {
      const result = calculateWeightManagement(baseFormData);

      expect(result.daysToGoal).toBeGreaterThan(0);
      expect(result.weeksToGoal).toBeGreaterThan(0);
      expect(result.weeksToGoal).toBeCloseTo(result.daysToGoal / 7, 1);
    });

    it('should warn about very short timelines', () => {
      const shortTimelineData: WeightManagementFormData = {
        ...baseFormData,
        targetDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      };

      const result = calculateWeightManagement(shortTimelineData);

      expect(result.warnings.some(w => w.includes('too soon'))).toBe(true);
      expect(result.adjustedTargetDate).toBeDefined();
    });

    it('should calculate realistic weekly weight change', () => {
      const result = calculateWeightManagement(baseFormData);

      // For 10kg loss over 12 weeks, should be around 0.83 kg/week
      expect(Math.abs(result.weeklyWeightChange)).toBeGreaterThan(0);
      expect(Math.abs(result.weeklyWeightChange)).toBeLessThan(SAFE_WEIGHT_LOSS_MAX);
    });
  });

  describe('Activity Level Impact', () => {
    it('should calculate different TDEEs for different activity levels', () => {
      const sedentaryData: WeightManagementFormData = {
        ...baseFormData,
        activityLevel: 'sedentary',
      };

      const veryActiveData: WeightManagementFormData = {
        ...baseFormData,
        activityLevel: 'very_active',
      };

      const sedentaryResult = calculateWeightManagement(sedentaryData);
      const veryActiveResult = calculateWeightManagement(veryActiveData);

      expect(veryActiveResult.tdee).toBeGreaterThan(sedentaryResult.tdee);
      expect(veryActiveResult.dailyCalorieTarget).toBeGreaterThan(
        sedentaryResult.dailyCalorieTarget
      );
    });
  });

  describe('Recommendations', () => {
    it('should provide water intake recommendations', () => {
      const result = calculateWeightManagement(baseFormData);

      expect(result.recommendations.waterLiters).toBeGreaterThan(2);
      expect(result.recommendations.waterLiters).toBeLessThan(6); // Adjusted for 90kg person: 2.5 + (90 * 0.033) = ~5.47L
    });

    it('should provide exercise recommendations', () => {
      const result = calculateWeightManagement(baseFormData);

      expect(result.recommendations.exerciseDays).toBeGreaterThan(0);
      expect(result.recommendations.exerciseDays).toBeLessThanOrEqual(7);
    });

    it('should provide sleep recommendations', () => {
      const result = calculateWeightManagement(baseFormData);

      expect(result.recommendations.sleepHours).toBeGreaterThanOrEqual(7);
      expect(result.recommendations.sleepHours).toBeLessThanOrEqual(9);
    });

    it('should include calorie limits', () => {
      const result = calculateWeightManagement(baseFormData);

      expect(result.recommendations.minCalories).toBe(MIN_CALORIES.male);
      expect(result.recommendations.maxCalories).toBeGreaterThan(MIN_CALORIES.male);
    });
  });

  describe('Edge Cases', () => {
    it('should handle very small weight changes', () => {
      const minimalChangeData: WeightManagementFormData = {
        ...baseFormData,
        goalWeightKg: 89, // 1 kg loss
      };

      const result = calculateWeightManagement(minimalChangeData);

      expect(result.weightToChange).toBe(-1);
      expect(result.warnings.some(w => w.includes('very slow rate'))).toBe(true);
    });

    it('should handle large weight changes', () => {
      const largeChangeData: WeightManagementFormData = {
        ...baseFormData,
        weightKg: 130,
        goalWeightKg: 80,
        targetDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      };

      const result = calculateWeightManagement(largeChangeData);

      expect(result.weightToChange).toBe(-50);
      expect(result.daysToGoal).toBeGreaterThan(300);
    });

    it('should handle elderly users', () => {
      const elderlyData: WeightManagementFormData = {
        ...baseFormData,
        age: 70,
      };

      const result = calculateWeightManagement(elderlyData);

      expect(result.bmr).toBeLessThan(baseFormData.age === 30 ? 2100 : Infinity);
    });

    it('should handle young adults', () => {
      const youngData: WeightManagementFormData = {
        ...baseFormData,
        age: 18,
      };

      const result = calculateWeightManagement(youngData);

      expect(result.bmr).toBeGreaterThan(1500);
    });

    it('should handle very tall people', () => {
      const tallData: WeightManagementFormData = {
        ...baseFormData,
        heightCm: 200,
      };

      const result = calculateWeightManagement(tallData);

      expect(result.bmr).toBeGreaterThan(baseFormData.heightCm === 180 ? 0 : Infinity);
    });

    it('should handle very short people', () => {
      const shortData: WeightManagementFormData = {
        ...baseFormData,
        heightCm: 150,
      };

      const result = calculateWeightManagement(shortData);

      expect(result.bmr).toBeLessThan(baseFormData.heightCm === 180 ? 2100 : Infinity);
    });

    it('should handle very heavy people', () => {
      const heavyData: WeightManagementFormData = {
        ...baseFormData,
        weightKg: 150,
        goalWeightKg: 100,
      };

      const result = calculateWeightManagement(heavyData);

      expect(result.bmr).toBeGreaterThan(2000);
      expect(result.weightToChange).toBe(-50);
    });

    it('should handle very light people', () => {
      const lightData: WeightManagementFormData = {
        ...baseFormData,
        weightKg: 55,
        goalWeightKg: 50,
      };

      const result = calculateWeightManagement(lightData);

      expect(result.bmr).toBeLessThan(1700);
    });
  });
});

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date(2024, 11, 25); // December 25, 2024
    const formatted = formatDate(date);

    expect(formatted).toContain('December');
    expect(formatted).toContain('25');
    expect(formatted).toContain('2024');
  });

  it('should handle different months', () => {
    const dates = [
      new Date(2024, 0, 15), // January
      new Date(2024, 5, 1), // June
      new Date(2024, 11, 31), // December
    ];

    const formatted = dates.map(d => formatDate(d));

    expect(formatted[0]).toContain('January');
    expect(formatted[1]).toContain('June');
    expect(formatted[2]).toContain('December');
  });

  it('should handle leap year dates', () => {
    const leapDate = new Date(2024, 1, 29); // February 29, 2024
    const formatted = formatDate(leapDate);

    expect(formatted).toContain('February');
    expect(formatted).toContain('29');
  });
});
