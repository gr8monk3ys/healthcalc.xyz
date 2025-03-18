import { describe, it, expect } from 'vitest';
import {
  calculateMacroBreakdown,
  calculateMacros,
  calculateTargetCalories,
  calculatePerMealMacros,
  processMacroCalculation,
  calculateProteinRequirement,
  getMacroFoodEquivalents,
} from './macro';
import { MacroFormValues } from '@/types/macro';
import { CALORIES_PER_GRAM } from '@/constants/macro';

describe('Macro Calculator', () => {
  describe('calculateMacroBreakdown', () => {
    it('should calculate protein breakdown correctly', () => {
      // 2000 calories, 30% protein
      // Calories from protein = 2000 * 0.30 = 600
      // Grams of protein = 600 / 4 = 150g
      const result = calculateMacroBreakdown(2000, 30, CALORIES_PER_GRAM.protein);

      expect(result.grams).toBe(150);
      expect(result.calories).toBe(600);
      expect(result.percentage).toBe(30);
    });

    it('should calculate fat breakdown correctly', () => {
      // 2000 calories, 25% fat
      // Calories from fat = 2000 * 0.25 = 500
      // Grams of fat = 500 / 9 = 55.56g ≈ 56g
      const result = calculateMacroBreakdown(2000, 25, CALORIES_PER_GRAM.fat);

      expect(result.grams).toBe(56);
      expect(result.calories).toBe(500);
      expect(result.percentage).toBe(25);
    });

    it('should calculate carbs breakdown correctly', () => {
      // 2500 calories, 45% carbs
      // Calories from carbs = 2500 * 0.45 = 1125
      // Grams of carbs = 1125 / 4 = 281.25g ≈ 281g
      const result = calculateMacroBreakdown(2500, 45, CALORIES_PER_GRAM.carbs);

      expect(result.grams).toBe(281);
      expect(result.calories).toBe(1125);
      expect(result.percentage).toBe(45);
    });

    it('should handle edge case of 0% percentage', () => {
      const result = calculateMacroBreakdown(2000, 0, 4);

      expect(result.grams).toBe(0);
      expect(result.calories).toBe(0);
      expect(result.percentage).toBe(0);
    });

    it('should handle 100% percentage', () => {
      const result = calculateMacroBreakdown(2000, 100, 4);

      expect(result.grams).toBe(500);
      expect(result.calories).toBe(2000);
      expect(result.percentage).toBe(100);
    });

    it('should throw error for zero calories', () => {
      expect(() => calculateMacroBreakdown(0, 30, 4)).toThrow(
        'Target calories must be greater than 0'
      );
    });

    it('should throw error for negative calories', () => {
      expect(() => calculateMacroBreakdown(-2000, 30, 4)).toThrow(
        'Target calories must be greater than 0'
      );
    });

    it('should throw error for percentage below 0', () => {
      expect(() => calculateMacroBreakdown(2000, -10, 4)).toThrow(
        'Percentage must be between 0 and 100'
      );
    });

    it('should throw error for percentage above 100', () => {
      expect(() => calculateMacroBreakdown(2000, 110, 4)).toThrow(
        'Percentage must be between 0 and 100'
      );
    });

    it('should throw error for zero calories per gram', () => {
      expect(() => calculateMacroBreakdown(2000, 30, 0)).toThrow(
        'Calories per gram must be greater than 0'
      );
    });
  });

  describe('calculateMacros', () => {
    it('should calculate all macros for weight loss preset (40/40/20)', () => {
      const result = calculateMacros({
        targetCalories: 2000,
        proteinPercent: 40,
        carbsPercent: 40,
        fatPercent: 20,
      });

      // Protein: 2000 * 0.40 / 4 = 200g
      expect(result.protein.grams).toBe(200);
      expect(result.protein.calories).toBe(800);
      expect(result.protein.percentage).toBe(40);

      // Carbs: 2000 * 0.40 / 4 = 200g
      expect(result.carbs.grams).toBe(200);
      expect(result.carbs.calories).toBe(800);
      expect(result.carbs.percentage).toBe(40);

      // Fat: 2000 * 0.20 / 9 = 44.44g ≈ 44g
      expect(result.fat.grams).toBe(44);
      expect(result.fat.calories).toBe(400);
      expect(result.fat.percentage).toBe(20);
    });

    it('should calculate all macros for maintenance preset (30/35/35)', () => {
      const result = calculateMacros({
        targetCalories: 2500,
        proteinPercent: 30,
        carbsPercent: 35,
        fatPercent: 35,
      });

      // Protein: 2500 * 0.30 / 4 = 187.5g ≈ 188g
      expect(result.protein.grams).toBe(188);

      // Carbs: 2500 * 0.35 / 4 = 218.75g ≈ 219g
      expect(result.carbs.grams).toBe(219);

      // Fat: 2500 * 0.35 / 9 = 97.22g ≈ 97g
      expect(result.fat.grams).toBe(97);
    });

    it('should calculate all macros for muscle gain preset (30/40/30)', () => {
      const result = calculateMacros({
        targetCalories: 3000,
        proteinPercent: 30,
        carbsPercent: 40,
        fatPercent: 30,
      });

      // Protein: 3000 * 0.30 / 4 = 225g
      expect(result.protein.grams).toBe(225);

      // Carbs: 3000 * 0.40 / 4 = 300g
      expect(result.carbs.grams).toBe(300);

      // Fat: 3000 * 0.30 / 9 = 100g
      expect(result.fat.grams).toBe(100);
    });

    it('should throw error when percentages do not sum to 100', () => {
      expect(() =>
        calculateMacros({
          targetCalories: 2000,
          proteinPercent: 30,
          carbsPercent: 30,
          fatPercent: 30, // Total = 90, not 100
        })
      ).toThrow('Macro percentages must sum to 100%');
    });

    it('should throw error when protein is too low', () => {
      expect(() =>
        calculateMacros({
          targetCalories: 2000,
          proteinPercent: 5, // Below minimum 10%
          carbsPercent: 60,
          fatPercent: 35,
        })
      ).toThrow('Protein must be at least 10%');
    });

    it('should throw error when fat is too low', () => {
      expect(() =>
        calculateMacros({
          targetCalories: 2000,
          proteinPercent: 50,
          carbsPercent: 40,
          fatPercent: 10, // Below minimum 15%
        })
      ).toThrow('Fat must be at least 15%');
    });

    it('should throw error when protein is too high', () => {
      expect(() =>
        calculateMacros({
          targetCalories: 2000,
          proteinPercent: 55, // Above maximum 50%
          carbsPercent: 25,
          fatPercent: 20,
        })
      ).toThrow('Protein should not exceed 50%');
    });
  });

  describe('calculateTargetCalories', () => {
    it('should calculate target calories for weight loss', () => {
      const tdee = 2500;
      const target = calculateTargetCalories(tdee, 'weight_loss');

      // Weight loss: TDEE - 500
      expect(target).toBe(2000);
    });

    it('should calculate target calories for maintenance', () => {
      const tdee = 2500;
      const target = calculateTargetCalories(tdee, 'maintenance');

      expect(target).toBe(2500);
    });

    it('should calculate target calories for muscle gain', () => {
      const tdee = 2500;
      const target = calculateTargetCalories(tdee, 'muscle_gain');

      // Muscle gain: TDEE + 300
      expect(target).toBe(2800);
    });

    it('should use custom adjustment when provided', () => {
      const tdee = 2500;
      const target = calculateTargetCalories(tdee, 'custom', -750);

      expect(target).toBe(1750);
    });

    it('should enforce minimum safe calorie intake', () => {
      const tdee = 1500;
      const target = calculateTargetCalories(tdee, 'weight_loss'); // -500 would be 1000

      expect(target).toBe(1200); // Minimum safe calories
    });

    it('should throw error for zero TDEE', () => {
      expect(() => calculateTargetCalories(0, 'maintenance')).toThrow(
        'TDEE must be greater than 0'
      );
    });

    it('should throw error for negative TDEE', () => {
      expect(() => calculateTargetCalories(-2000, 'maintenance')).toThrow(
        'TDEE must be greater than 0'
      );
    });
  });

  describe('calculatePerMealMacros', () => {
    it('should divide macros evenly across 3 meals', () => {
      const result = calculatePerMealMacros(150, 200, 60, 2000);

      expect(result.protein).toBe(50); // 150 / 3
      expect(result.carbs).toBe(67); // 200 / 3 ≈ 66.67 → 67
      expect(result.fat).toBe(20); // 60 / 3
      expect(result.calories).toBe(667); // 2000 / 3 ≈ 666.67 → 667
    });

    it('should handle uneven division with rounding', () => {
      const result = calculatePerMealMacros(100, 100, 50, 1500);

      expect(result.protein).toBe(33); // 100 / 3 ≈ 33.33 → 33
      expect(result.carbs).toBe(33);
      expect(result.fat).toBe(17); // 50 / 3 ≈ 16.67 → 17
      expect(result.calories).toBe(500);
    });
  });

  describe('processMacroCalculation', () => {
    it('should process metric form values correctly', () => {
      const formValues: MacroFormValues = {
        gender: 'male',
        age: 30,
        heightUnit: 'cm',
        heightCm: 175,
        heightFt: 0,
        heightIn: 0,
        weightUnit: 'kg',
        weightKg: 70,
        weightLb: 0,
        activityLevel: 'moderately_active',
        goal: 'maintenance',
      };

      const result = processMacroCalculation(formValues);

      // BMR should be in reasonable range for 30yo male, 70kg, 175cm
      expect(result.bmr).toBeGreaterThan(1600);
      expect(result.bmr).toBeLessThan(1700);

      // TDEE should be BMR * 1.55 (moderately active)
      expect(result.tdee).toBeGreaterThan(2500);
      expect(result.tdee).toBeLessThan(2700);

      // Target calories should equal TDEE for maintenance
      expect(result.targetCalories).toBe(result.tdee);

      // Check macro percentages for maintenance (30/35/35)
      expect(result.protein.percentage).toBe(30);
      expect(result.carbs.percentage).toBe(35);
      expect(result.fat.percentage).toBe(35);

      // Verify goal is set
      expect(result.goal).toBe('maintenance');

      // Verify per-meal breakdown exists
      expect(result.perMeal).toBeDefined();
      expect(result.perMeal.protein).toBeGreaterThan(0);
    });

    it('should process imperial form values correctly', () => {
      const formValues: MacroFormValues = {
        gender: 'female',
        age: 25,
        heightUnit: 'ft',
        heightCm: 0,
        heightFt: 5,
        heightIn: 6,
        weightUnit: 'lb',
        weightKg: 0,
        weightLb: 140,
        activityLevel: 'lightly_active',
        goal: 'weight_loss',
      };

      const result = processMacroCalculation(formValues);

      // Should have reasonable values
      expect(result.bmr).toBeGreaterThan(1300);
      expect(result.bmr).toBeLessThan(1500);

      // Weight loss should reduce target calories
      expect(result.targetCalories).toBeLessThan(result.tdee);

      // Check weight loss macro percentages (40/40/20)
      expect(result.protein.percentage).toBe(40);
      expect(result.carbs.percentage).toBe(40);
      expect(result.fat.percentage).toBe(20);
    });

    it('should handle muscle gain goal correctly', () => {
      const formValues: MacroFormValues = {
        gender: 'male',
        age: 25,
        heightUnit: 'cm',
        heightCm: 180,
        heightFt: 0,
        heightIn: 0,
        weightUnit: 'kg',
        weightKg: 75,
        weightLb: 0,
        activityLevel: 'very_active',
        goal: 'muscle_gain',
      };

      const result = processMacroCalculation(formValues);

      // Muscle gain should increase target calories
      expect(result.targetCalories).toBeGreaterThan(result.tdee);

      // Check muscle gain macro percentages (30/40/30)
      expect(result.protein.percentage).toBe(30);
      expect(result.carbs.percentage).toBe(40);
      expect(result.fat.percentage).toBe(30);
    });

    it('should handle custom calorie adjustment', () => {
      const formValues: MacroFormValues = {
        gender: 'male',
        age: 30,
        heightUnit: 'cm',
        heightCm: 175,
        heightFt: 0,
        heightIn: 0,
        weightUnit: 'kg',
        weightKg: 70,
        weightLb: 0,
        activityLevel: 'sedentary',
        goal: 'custom',
        calorieAdjustment: -300,
        customProteinPercent: 35,
        customCarbsPercent: 40,
        customFatPercent: 25,
      };

      const result = processMacroCalculation(formValues);

      // Custom macros should be applied
      expect(result.protein.percentage).toBe(35);
      expect(result.carbs.percentage).toBe(40);
      expect(result.fat.percentage).toBe(25);

      // Target should be TDEE - 300
      expect(result.targetCalories).toBe(result.tdee - 300);
    });

    it('should calculate correct macro grams', () => {
      const formValues: MacroFormValues = {
        gender: 'male',
        age: 30,
        heightUnit: 'cm',
        heightCm: 175,
        heightFt: 0,
        heightIn: 0,
        weightUnit: 'kg',
        weightKg: 70,
        weightLb: 0,
        activityLevel: 'sedentary',
        goal: 'maintenance',
      };

      const result = processMacroCalculation(formValues);

      // Verify grams add up to target calories
      const totalCalories =
        result.protein.grams * 4 + result.carbs.grams * 4 + result.fat.grams * 9;

      // Allow small rounding difference
      expect(Math.abs(totalCalories - result.targetCalories)).toBeLessThan(20);
    });
  });

  describe('calculateProteinRequirement', () => {
    it('should calculate protein requirement for sedentary person', () => {
      const result = calculateProteinRequirement(70, 'sedentary');

      // Sedentary: 0.8 - 1.0 g/kg
      expect(result.min).toBe(56); // 70 * 0.8
      expect(result.max).toBe(70); // 70 * 1.0
    });

    it('should calculate protein requirement for very active person', () => {
      const result = calculateProteinRequirement(80, 'very_active');

      // Very active: 1.6 - 2.0 g/kg
      expect(result.min).toBe(128); // 80 * 1.6
      expect(result.max).toBe(160); // 80 * 2.0
    });

    it('should calculate protein requirement for extremely active person', () => {
      const result = calculateProteinRequirement(75, 'extremely_active');

      // Extremely active: 1.8 - 2.2 g/kg
      expect(result.min).toBe(135); // 75 * 1.8
      expect(result.max).toBe(165); // 75 * 2.2
    });

    it('should default to sedentary for unknown activity level', () => {
      const result = calculateProteinRequirement(70, 'unknown_level');

      expect(result.min).toBe(56); // 70 * 0.8
      expect(result.max).toBe(70); // 70 * 1.0
    });

    it('should throw error for zero weight', () => {
      expect(() => calculateProteinRequirement(0, 'sedentary')).toThrow(
        'Weight must be greater than 0 kg'
      );
    });

    it('should throw error for negative weight', () => {
      expect(() => calculateProteinRequirement(-70, 'sedentary')).toThrow(
        'Weight must be greater than 0 kg'
      );
    });
  });

  describe('getMacroFoodEquivalents', () => {
    it('should return food equivalents for given macros', () => {
      const result = getMacroFoodEquivalents(150, 200, 50);

      expect(result.protein).toContain('g chicken breast');
      expect(result.carbs).toContain('g cooked rice');
      expect(result.fat).toContain('avocados');
    });

    it('should handle different macro amounts', () => {
      const result = getMacroFoodEquivalents(100, 150, 30);

      expect(result.protein).toBeDefined();
      expect(result.carbs).toBeDefined();
      expect(result.fat).toBeDefined();
    });
  });
});

describe('Macro Calculator Real-World Examples', () => {
  it('should calculate macros for average person on weight loss diet', () => {
    const formValues: MacroFormValues = {
      gender: 'female',
      age: 35,
      heightUnit: 'cm',
      heightCm: 165,
      heightFt: 0,
      heightIn: 0,
      weightUnit: 'kg',
      weightKg: 70,
      weightLb: 0,
      activityLevel: 'moderately_active',
      goal: 'weight_loss',
    };

    const result = processMacroCalculation(formValues);

    // TDEE should be around 2100-2300 for this profile
    expect(result.tdee).toBeGreaterThan(2000);
    expect(result.tdee).toBeLessThan(2400);

    // Target calories should be 500 less
    expect(result.targetCalories).toBe(result.tdee - 500);

    // Protein should be high for weight loss (around 150-200g)
    expect(result.protein.grams).toBeGreaterThan(100);
    expect(result.protein.grams).toBeLessThan(250);
  });

  it('should calculate macros for athlete bulking', () => {
    const formValues: MacroFormValues = {
      gender: 'male',
      age: 22,
      heightUnit: 'cm',
      heightCm: 185,
      heightFt: 0,
      heightIn: 0,
      weightUnit: 'kg',
      weightKg: 85,
      weightLb: 0,
      activityLevel: 'extremely_active',
      goal: 'muscle_gain',
    };

    const result = processMacroCalculation(formValues);

    // Very high TDEE for extremely active young male
    expect(result.tdee).toBeGreaterThan(3200);

    // Target calories should be TDEE + 300
    expect(result.targetCalories).toBe(result.tdee + 300);

    // High carbs for muscle gain
    expect(result.carbs.grams).toBeGreaterThan(350);
  });

  it('should enforce minimum calories for aggressive deficit', () => {
    const formValues: MacroFormValues = {
      gender: 'female',
      age: 50,
      heightUnit: 'cm',
      heightCm: 155,
      heightFt: 0,
      heightIn: 0,
      weightUnit: 'kg',
      weightKg: 55,
      weightLb: 0,
      activityLevel: 'sedentary',
      goal: 'custom',
      calorieAdjustment: -1000, // Very aggressive deficit
      customProteinPercent: 30,
      customCarbsPercent: 40,
      customFatPercent: 30,
    };

    const result = processMacroCalculation(formValues);

    // Should not go below 1200 calories
    expect(result.targetCalories).toBeGreaterThanOrEqual(1200);
  });

  it('should calculate consistent results for same inputs', () => {
    const formValues: MacroFormValues = {
      gender: 'male',
      age: 30,
      heightUnit: 'cm',
      heightCm: 175,
      heightFt: 0,
      heightIn: 0,
      weightUnit: 'kg',
      weightKg: 70,
      weightLb: 0,
      activityLevel: 'moderately_active',
      goal: 'maintenance',
    };

    const result1 = processMacroCalculation(formValues);
    const result2 = processMacroCalculation(formValues);

    expect(result1.bmr).toBe(result2.bmr);
    expect(result1.tdee).toBe(result2.tdee);
    expect(result1.targetCalories).toBe(result2.targetCalories);
    expect(result1.protein.grams).toBe(result2.protein.grams);
    expect(result1.carbs.grams).toBe(result2.carbs.grams);
    expect(result1.fat.grams).toBe(result2.fat.grams);
  });
});

describe('Macro Calorie Verification', () => {
  it('should have protein provide 4 calories per gram', () => {
    const result = calculateMacroBreakdown(2000, 25, CALORIES_PER_GRAM.protein);

    // 2000 * 0.25 = 500 calories
    // 500 / 4 = 125 grams
    // 125 * 4 = 500 calories (verification)
    expect(result.grams * CALORIES_PER_GRAM.protein).toBe(result.calories);
  });

  it('should have carbs provide 4 calories per gram', () => {
    const result = calculateMacroBreakdown(2000, 45, CALORIES_PER_GRAM.carbs);

    expect(result.grams * CALORIES_PER_GRAM.carbs).toBe(result.calories);
  });

  it('should have fat provide 9 calories per gram', () => {
    const result = calculateMacroBreakdown(2000, 30, CALORIES_PER_GRAM.fat);

    // Allow for rounding differences
    expect(Math.abs(result.grams * CALORIES_PER_GRAM.fat - result.calories)).toBeLessThan(5);
  });
});
