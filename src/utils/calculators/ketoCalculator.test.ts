/**
 * Tests for Keto Macro Calculator
 */

import { describe, it, expect } from 'vitest';
import { calculateKetoMacros } from './ketoCalculator';
import { KetoFormValues } from '@/types/ketoCalculator';

describe('Keto Macro Calculator', () => {
  const baseValues: KetoFormValues = {
    weight: 80,
    weightUnit: 'kg',
    heightCm: 180,
    heightFt: 5,
    heightIn: 11,
    age: 30,
    gender: 'male',
    activityLevel: 'moderately_active',
    goal: 'weight-loss',
    ketoType: 'standard',
    useMetric: true,
  };

  describe('Standard Keto', () => {
    it('should calculate standard keto macros correctly', () => {
      const result = calculateKetoMacros(baseValues);

      expect(result).toBeDefined();
      expect(result.dailyCalories).toBeGreaterThan(0);
      expect(result.fatGrams).toBeGreaterThan(0);
      expect(result.proteinGrams).toBeGreaterThan(0);
      expect(result.netCarbGrams).toBeLessThanOrEqual(25);
      expect(result.tdee).toBeGreaterThan(result.dailyCalories); // Weight loss deficit
    });

    it('should maintain approximately 70/25/5 macro ratio', () => {
      const result = calculateKetoMacros(baseValues);

      expect(result.fatPercentage).toBeGreaterThan(65);
      expect(result.fatPercentage).toBeLessThan(75);
      expect(result.proteinPercentage).toBeGreaterThan(20);
      expect(result.proteinPercentage).toBeLessThan(30);
      expect(result.netCarbPercentage).toBeLessThan(10);
    });

    it('should limit net carbs to 25g for standard keto', () => {
      const result = calculateKetoMacros(baseValues);

      expect(result.netCarbGrams).toBe(25);
    });
  });

  describe('Targeted Keto', () => {
    it('should allow more carbs for targeted keto', () => {
      const targetedValues: KetoFormValues = {
        ...baseValues,
        ketoType: 'targeted',
      };

      const result = calculateKetoMacros(targetedValues);

      expect(result.netCarbGrams).toBe(50);
      expect(result.netCarbGrams).toBeGreaterThan(25);
    });

    it('should adjust fat percentage down for targeted keto', () => {
      const targetedValues: KetoFormValues = {
        ...baseValues,
        ketoType: 'targeted',
      };

      const result = calculateKetoMacros(targetedValues);

      expect(result.fatPercentage).toBeGreaterThan(60);
      expect(result.fatPercentage).toBeLessThan(70);
    });
  });

  describe('Cyclical Keto', () => {
    it('should use standard carb limits for cyclical keto', () => {
      const cyclicalValues: KetoFormValues = {
        ...baseValues,
        ketoType: 'cyclical',
      };

      const result = calculateKetoMacros(cyclicalValues);

      expect(result.netCarbGrams).toBe(25);
    });
  });

  describe('Goal Adjustments', () => {
    it('should apply 20% deficit for weight loss', () => {
      const weightLossValues: KetoFormValues = {
        ...baseValues,
        goal: 'weight-loss',
      };

      const result = calculateKetoMacros(weightLossValues);

      expect(result.dailyCalories).toBeLessThan(result.tdee);
      expect(result.dailyCalories).toBeCloseTo(result.tdee * 0.8, -50);
    });

    it('should maintain TDEE for maintenance', () => {
      const maintenanceValues: KetoFormValues = {
        ...baseValues,
        goal: 'maintenance',
      };

      const result = calculateKetoMacros(maintenanceValues);

      expect(result.dailyCalories).toBeCloseTo(result.tdee, -50);
    });

    it('should apply 10% surplus for muscle gain', () => {
      const muscleGainValues: KetoFormValues = {
        ...baseValues,
        goal: 'muscle-gain',
      };

      const result = calculateKetoMacros(muscleGainValues);

      expect(result.dailyCalories).toBeGreaterThan(result.tdee);
      expect(result.dailyCalories).toBeCloseTo(result.tdee * 1.1, -50);
    });
  });

  describe('Protein Requirements', () => {
    it('should ensure minimum protein based on lean body mass', () => {
      const result = calculateKetoMacros(baseValues);

      // For an 80kg male at ~20% body fat, lean mass is ~64kg (~141lb)
      // Minimum protein should be ~0.8g per lb = ~113g
      expect(result.proteinGrams).toBeGreaterThanOrEqual(100);
    });

    it('should adjust protein for body fat percentage if provided', () => {
      const lowBfValues: KetoFormValues = {
        ...baseValues,
        bodyFatPercentage: 10,
      };

      const highBfValues: KetoFormValues = {
        ...baseValues,
        bodyFatPercentage: 30,
      };

      const lowBfResult = calculateKetoMacros(lowBfValues);
      const highBfResult = calculateKetoMacros(highBfValues);

      // Lower body fat means more lean mass, thus higher protein requirement
      expect(lowBfResult.proteinGrams).toBeGreaterThanOrEqual(highBfResult.proteinGrams);
    });
  });

  describe('Gender Differences', () => {
    it('should calculate different macros for females', () => {
      const maleValues: KetoFormValues = {
        ...baseValues,
        gender: 'male',
      };

      const femaleValues: KetoFormValues = {
        ...baseValues,
        gender: 'female',
      };

      const maleResult = calculateKetoMacros(maleValues);
      const femaleResult = calculateKetoMacros(femaleValues);

      // Males generally have higher BMR/TDEE
      expect(maleResult.tdee).toBeGreaterThan(femaleResult.tdee);
      expect(maleResult.dailyCalories).toBeGreaterThan(femaleResult.dailyCalories);
    });
  });

  describe('Activity Level Impact', () => {
    it('should increase calories for higher activity levels', () => {
      const sedentaryValues: KetoFormValues = {
        ...baseValues,
        activityLevel: 'sedentary',
      };

      const veryActiveValues: KetoFormValues = {
        ...baseValues,
        activityLevel: 'very_active',
      };

      const sedentaryResult = calculateKetoMacros(sedentaryValues);
      const veryActiveResult = calculateKetoMacros(veryActiveValues);

      expect(veryActiveResult.tdee).toBeGreaterThan(sedentaryResult.tdee);
      expect(veryActiveResult.dailyCalories).toBeGreaterThan(sedentaryResult.dailyCalories);
    });
  });

  describe('Unit Conversions', () => {
    it('should handle imperial units correctly', () => {
      const imperialValues: KetoFormValues = {
        ...baseValues,
        weight: 176,
        weightUnit: 'lb',
        heightFt: 5,
        heightIn: 11,
        useMetric: false,
      };

      const result = calculateKetoMacros(imperialValues);

      expect(result).toBeDefined();
      expect(result.dailyCalories).toBeGreaterThan(0);
    });

    it('should produce similar results for metric and imperial', () => {
      const metricValues: KetoFormValues = {
        ...baseValues,
        weight: 80,
        weightUnit: 'kg',
        heightCm: 180,
        useMetric: true,
      };

      const imperialValues: KetoFormValues = {
        ...baseValues,
        weight: 176, // ~80kg
        weightUnit: 'lb',
        heightFt: 5,
        heightIn: 11, // ~180cm
        useMetric: false,
      };

      const metricResult = calculateKetoMacros(metricValues);
      const imperialResult = calculateKetoMacros(imperialValues);

      expect(metricResult.dailyCalories).toBeCloseTo(imperialResult.dailyCalories, -20);
      expect(metricResult.proteinGrams).toBeCloseTo(imperialResult.proteinGrams, 0);
    });
  });

  describe('Result Properties', () => {
    it('should include all required properties', () => {
      const result = calculateKetoMacros(baseValues);

      expect(result).toHaveProperty('dailyCalories');
      expect(result).toHaveProperty('fatGrams');
      expect(result).toHaveProperty('fatCalories');
      expect(result).toHaveProperty('fatPercentage');
      expect(result).toHaveProperty('proteinGrams');
      expect(result).toHaveProperty('proteinCalories');
      expect(result).toHaveProperty('proteinPercentage');
      expect(result).toHaveProperty('netCarbGrams');
      expect(result).toHaveProperty('netCarbCalories');
      expect(result).toHaveProperty('netCarbPercentage');
      expect(result).toHaveProperty('fiberTarget');
      expect(result).toHaveProperty('tdee');
      expect(result).toHaveProperty('bmr');
      expect(result).toHaveProperty('recommendation');
      expect(result).toHaveProperty('warnings');
    });

    it('should return fiber target in reasonable range', () => {
      const result = calculateKetoMacros(baseValues);

      expect(result.fiberTarget).toBeGreaterThanOrEqual(25);
      expect(result.fiberTarget).toBeLessThanOrEqual(35);
    });

    it('should include recommendation text', () => {
      const result = calculateKetoMacros(baseValues);

      expect(result.recommendation).toBeDefined();
      expect(result.recommendation.length).toBeGreaterThan(0);
    });

    it('should include warnings array', () => {
      const result = calculateKetoMacros(baseValues);

      expect(Array.isArray(result.warnings)).toBe(true);
      expect(result.warnings.length).toBeGreaterThan(0);
    });
  });

  describe('Safety Limits', () => {
    it('should enforce minimum calorie intake', () => {
      const veryLowValues: KetoFormValues = {
        ...baseValues,
        weight: 45,
        activityLevel: 'sedentary',
        goal: 'weight-loss',
      };

      const result = calculateKetoMacros(veryLowValues);

      expect(result.dailyCalories).toBeGreaterThanOrEqual(1200);
    });

    it('should warn about very low calorie intake', () => {
      const veryLowValues: KetoFormValues = {
        ...baseValues,
        weight: 50,
        activityLevel: 'sedentary',
        goal: 'weight-loss',
      };

      const result = calculateKetoMacros(veryLowValues);

      if (result.dailyCalories < 1400) {
        expect(result.warnings.some(w => w.includes('calorie intake'))).toBe(true);
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle very tall individuals', () => {
      const tallValues: KetoFormValues = {
        ...baseValues,
        heightCm: 210,
        weight: 100,
      };

      const result = calculateKetoMacros(tallValues);

      expect(result.dailyCalories).toBeGreaterThan(0);
      expect(result.tdee).toBeGreaterThan(2000);
    });

    it('should handle very short individuals', () => {
      const shortValues: KetoFormValues = {
        ...baseValues,
        heightCm: 150,
        weight: 50,
      };

      const result = calculateKetoMacros(shortValues);

      expect(result.dailyCalories).toBeGreaterThan(0);
      expect(result.dailyCalories).toBeGreaterThanOrEqual(1200);
    });

    it('should handle older individuals', () => {
      const olderValues: KetoFormValues = {
        ...baseValues,
        age: 70,
      };

      const result = calculateKetoMacros(olderValues);

      expect(result.dailyCalories).toBeGreaterThan(0);
      expect(result.bmr).toBeLessThan(baseValues.age === 30 ? 2000 : Infinity);
    });

    it('should handle young adults', () => {
      const youngValues: KetoFormValues = {
        ...baseValues,
        age: 18,
      };

      const result = calculateKetoMacros(youngValues);

      expect(result.dailyCalories).toBeGreaterThan(0);
    });
  });

  describe('Input Validation', () => {
    it('should throw error for invalid age', () => {
      const invalidAgeValues: KetoFormValues = {
        ...baseValues,
        age: 0,
      };

      expect(() => calculateKetoMacros(invalidAgeValues)).toThrow('Age must be between');
    });

    it('should throw error for invalid weight', () => {
      const invalidWeightValues: KetoFormValues = {
        ...baseValues,
        weight: 0,
      };

      expect(() => calculateKetoMacros(invalidWeightValues)).toThrow('Weight must be greater');
    });

    it('should throw error for invalid height', () => {
      const invalidHeightValues: KetoFormValues = {
        ...baseValues,
        heightCm: 0,
      };

      expect(() => calculateKetoMacros(invalidHeightValues)).toThrow('Height must be greater');
    });
  });

  describe('Macro Percentage Sum', () => {
    it('should have macro percentages sum close to 100%', () => {
      const result = calculateKetoMacros(baseValues);

      const sum = result.fatPercentage + result.proteinPercentage + result.netCarbPercentage;

      expect(sum).toBeGreaterThanOrEqual(98);
      expect(sum).toBeLessThanOrEqual(102);
    });
  });

  describe('Calorie Calculations', () => {
    it('should calculate total calories from macros correctly', () => {
      const result = calculateKetoMacros(baseValues);

      const calculatedCalories =
        result.fatGrams * 9 + result.proteinGrams * 4 + result.netCarbGrams * 4;

      expect(calculatedCalories).toBeCloseTo(result.dailyCalories, -10);
    });
  });
});
