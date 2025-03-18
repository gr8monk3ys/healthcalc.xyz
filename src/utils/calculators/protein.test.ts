import { describe, it, expect } from 'vitest';
import {
  getProteinRequirement,
  getAgeAdjustment,
  getGoalAdjustment,
  calculateDailyProtein,
  calculateProteinRange,
  calculateProteinPerMeal,
  getProteinRecommendation,
  processProteinCalculation,
  calculateProteinFromLeanMass,
} from './protein';
import { ProteinFormValues } from '@/types/protein';

describe('Protein Intake Calculator', () => {
  describe('getProteinRequirement', () => {
    it('should return correct requirement for sedentary', () => {
      const req = getProteinRequirement('sedentary');
      expect(req.minPerKg).toBe(0.8);
      expect(req.maxPerKg).toBe(1.0);
      expect(req.optimalPerKg).toBe(0.8);
    });

    it('should return correct requirement for lightly active', () => {
      const req = getProteinRequirement('lightly_active');
      expect(req.minPerKg).toBe(1.0);
      expect(req.maxPerKg).toBe(1.2);
      expect(req.optimalPerKg).toBe(1.0);
    });

    it('should return correct requirement for moderately active', () => {
      const req = getProteinRequirement('moderately_active');
      expect(req.minPerKg).toBe(1.2);
      expect(req.maxPerKg).toBe(1.6);
      expect(req.optimalPerKg).toBe(1.4);
    });

    it('should return correct requirement for very active', () => {
      const req = getProteinRequirement('very_active');
      expect(req.minPerKg).toBe(1.6);
      expect(req.maxPerKg).toBe(2.0);
      expect(req.optimalPerKg).toBe(1.8);
    });

    it('should return correct requirement for extremely active', () => {
      const req = getProteinRequirement('extremely_active');
      expect(req.minPerKg).toBe(1.8);
      expect(req.maxPerKg).toBe(2.2);
      expect(req.optimalPerKg).toBe(2.0);
    });
  });

  describe('getAgeAdjustment', () => {
    it('should return 1.0 for young adults (18-40)', () => {
      expect(getAgeAdjustment(25)).toBe(1.0);
      expect(getAgeAdjustment(30)).toBe(1.0);
      expect(getAgeAdjustment(40)).toBe(1.0);
    });

    it('should return 1.1 for middle age (41-65)', () => {
      expect(getAgeAdjustment(45)).toBe(1.1);
      expect(getAgeAdjustment(55)).toBe(1.1);
      expect(getAgeAdjustment(65)).toBe(1.1);
    });

    it('should return 1.2 for older adults (66+)', () => {
      expect(getAgeAdjustment(70)).toBe(1.2);
      expect(getAgeAdjustment(80)).toBe(1.2);
    });

    it('should return 1.0 for children/teens', () => {
      expect(getAgeAdjustment(10)).toBe(1.0);
      expect(getAgeAdjustment(17)).toBe(1.0);
    });

    it('should throw error for invalid age', () => {
      expect(() => getAgeAdjustment(0)).toThrow('Age must be between 1 and 120 years');
      expect(() => getAgeAdjustment(-5)).toThrow('Age must be between 1 and 120 years');
      expect(() => getAgeAdjustment(121)).toThrow('Age must be between 1 and 120 years');
    });
  });

  describe('getGoalAdjustment', () => {
    it('should return correct adjustment for weight loss', () => {
      const adj = getGoalAdjustment('weight_loss');
      expect(adj.multiplier).toBe(1.25);
      expect(adj.additionalPerKg).toBe(0.3);
    });

    it('should return correct adjustment for muscle gain', () => {
      const adj = getGoalAdjustment('muscle_gain');
      expect(adj.multiplier).toBe(1.2);
      expect(adj.additionalPerKg).toBe(0.2);
    });

    it('should return correct adjustment for maintain', () => {
      const adj = getGoalAdjustment('maintain');
      expect(adj.multiplier).toBe(1.0);
      expect(adj.additionalPerKg).toBe(0);
    });

    it('should return correct adjustment for athletic performance', () => {
      const adj = getGoalAdjustment('athletic_performance');
      expect(adj.multiplier).toBe(1.15);
      expect(adj.additionalPerKg).toBe(0.1);
    });

    it('should return correct adjustment for general health', () => {
      const adj = getGoalAdjustment('general_health');
      expect(adj.multiplier).toBe(1.0);
      expect(adj.additionalPerKg).toBe(0);
    });
  });

  describe('calculateDailyProtein', () => {
    it('should calculate protein for sedentary person', () => {
      // 70 kg × 0.8 g/kg = 56g
      const protein = calculateDailyProtein(70, 'sedentary', 'maintain', 30);
      expect(protein).toBeCloseTo(56, 0);
    });

    it('should calculate protein for active person', () => {
      // 70 kg × 1.4 g/kg = 98g
      const protein = calculateDailyProtein(70, 'moderately_active', 'maintain', 30);
      expect(protein).toBeCloseTo(98, 0);
    });

    it('should calculate protein for athlete', () => {
      // 75 kg × 2.0 g/kg = 150g
      const protein = calculateDailyProtein(75, 'extremely_active', 'maintain', 28);
      expect(protein).toBeCloseTo(150, 0);
    });

    it('should increase protein for weight loss goal', () => {
      const maintainProtein = calculateDailyProtein(70, 'moderately_active', 'maintain', 30);
      const weightLossProtein = calculateDailyProtein(70, 'moderately_active', 'weight_loss', 30);
      expect(weightLossProtein).toBeGreaterThan(maintainProtein);
    });

    it('should increase protein for muscle gain goal', () => {
      const maintainProtein = calculateDailyProtein(70, 'moderately_active', 'maintain', 30);
      const muscleGainProtein = calculateDailyProtein(70, 'moderately_active', 'muscle_gain', 30);
      expect(muscleGainProtein).toBeGreaterThan(maintainProtein);
    });

    it('should increase protein for older adults', () => {
      const youngProtein = calculateDailyProtein(70, 'sedentary', 'maintain', 30);
      const olderProtein = calculateDailyProtein(70, 'sedentary', 'maintain', 70);
      expect(olderProtein).toBeGreaterThan(youngProtein);
    });

    it('should throw error for zero weight', () => {
      expect(() => calculateDailyProtein(0, 'sedentary', 'maintain', 30)).toThrow(
        'Weight must be greater than 0 kg'
      );
    });

    it('should throw error for negative weight', () => {
      expect(() => calculateDailyProtein(-70, 'sedentary', 'maintain', 30)).toThrow(
        'Weight must be greater than 0 kg'
      );
    });

    it('should throw error for invalid age', () => {
      expect(() => calculateDailyProtein(70, 'sedentary', 'maintain', 0)).toThrow(
        'Age must be between 1 and 120 years'
      );
    });
  });

  describe('calculateProteinRange', () => {
    it('should return valid min and max for sedentary', () => {
      const range = calculateProteinRange(70, 'sedentary', 'maintain', 30);
      expect(range.min).toBeGreaterThan(0);
      expect(range.max).toBeGreaterThan(range.min);
      expect(range.min).toBeCloseTo(56, 0); // 70 × 0.8
      expect(range.max).toBeCloseTo(70, 0); // 70 × 1.0
    });

    it('should return valid min and max for active', () => {
      const range = calculateProteinRange(70, 'moderately_active', 'maintain', 30);
      expect(range.min).toBeGreaterThan(0);
      expect(range.max).toBeGreaterThan(range.min);
    });

    it('should return higher range for weight loss', () => {
      const maintainRange = calculateProteinRange(70, 'moderately_active', 'maintain', 30);
      const weightLossRange = calculateProteinRange(70, 'moderately_active', 'weight_loss', 30);
      expect(weightLossRange.min).toBeGreaterThan(maintainRange.min);
      expect(weightLossRange.max).toBeGreaterThanOrEqual(maintainRange.max);
    });

    it('should throw error for invalid weight', () => {
      expect(() => calculateProteinRange(0, 'sedentary', 'maintain', 30)).toThrow(
        'Weight must be greater than 0 kg'
      );
    });

    it('should throw error for invalid age', () => {
      expect(() => calculateProteinRange(70, 'sedentary', 'maintain', 0)).toThrow(
        'Age must be between 1 and 120 years'
      );
    });
  });

  describe('calculateProteinPerMeal', () => {
    it('should calculate protein per meal correctly', () => {
      const perMeal = calculateProteinPerMeal(120);
      expect(perMeal.threeMeals).toBe(40);
      expect(perMeal.fourMeals).toBe(30);
      expect(perMeal.fiveMeals).toBe(24);
    });

    it('should round protein per meal', () => {
      const perMeal = calculateProteinPerMeal(100);
      expect(perMeal.threeMeals).toBe(33); // 100/3 = 33.33, rounded
      expect(perMeal.fourMeals).toBe(25);
      expect(perMeal.fiveMeals).toBe(20);
    });

    it('should throw error for zero daily protein', () => {
      expect(() => calculateProteinPerMeal(0)).toThrow('Daily protein must be greater than 0');
    });

    it('should throw error for negative daily protein', () => {
      expect(() => calculateProteinPerMeal(-100)).toThrow('Daily protein must be greater than 0');
    });
  });

  describe('getProteinRecommendation', () => {
    it('should return low for protein below 0.8 g/kg', () => {
      const rec = getProteinRecommendation(0.5);
      expect(rec.message).toBe('Below recommended intake');
      expect(rec.color).toBe('#F59E0B');
    });

    it('should return optimal for protein in normal range', () => {
      const rec = getProteinRecommendation(1.5);
      expect(rec.message).toBe('Optimal protein intake');
      expect(rec.color).toBe('#10B981');
    });

    it('should return high for protein above 2.5 g/kg', () => {
      const rec = getProteinRecommendation(3.0);
      expect(rec.message).toBe('High protein intake');
      expect(rec.color).toBe('#3B82F6');
    });

    it('should return very high for protein above 3.5 g/kg', () => {
      const rec = getProteinRecommendation(4.0);
      expect(rec.message).toBe('Very high protein intake - monitor kidney health');
      expect(rec.color).toBe('#EF4444');
    });
  });

  describe('calculateProteinFromLeanMass', () => {
    it('should calculate protein from lean body mass', () => {
      // 80 kg total, 20% body fat = 64 kg lean mass
      // 64 kg × 2.2 g/kg = 140.8g
      const protein = calculateProteinFromLeanMass(80, 20, 2.2);
      expect(protein).toBeCloseTo(140.8, 1);
    });

    it('should handle low body fat', () => {
      // 75 kg total, 10% body fat = 67.5 kg lean mass
      // 67.5 kg × 2.2 g/kg = 148.5g
      const protein = calculateProteinFromLeanMass(75, 10, 2.2);
      expect(protein).toBeCloseTo(148.5, 1);
    });

    it('should handle higher body fat', () => {
      // 100 kg total, 30% body fat = 70 kg lean mass
      // 70 kg × 2.0 g/kg = 140g
      const protein = calculateProteinFromLeanMass(100, 30, 2.0);
      expect(protein).toBeCloseTo(140, 0);
    });

    it('should throw error for zero weight', () => {
      expect(() => calculateProteinFromLeanMass(0, 20, 2.2)).toThrow(
        'Weight must be greater than 0 kg'
      );
    });

    it('should throw error for invalid body fat percentage', () => {
      expect(() => calculateProteinFromLeanMass(80, -5, 2.2)).toThrow(
        'Body fat percentage must be between 0 and 70'
      );
      expect(() => calculateProteinFromLeanMass(80, 75, 2.2)).toThrow(
        'Body fat percentage must be between 0 and 70'
      );
    });

    it('should throw error for zero protein per kg', () => {
      expect(() => calculateProteinFromLeanMass(80, 20, 0)).toThrow(
        'Protein per kg of lean mass must be greater than 0'
      );
    });
  });
});

describe('processProteinCalculation', () => {
  describe('metric form values', () => {
    it('should process calculation for sedentary male', () => {
      const values: ProteinFormValues = {
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
        goal: 'maintain',
      };

      const result = processProteinCalculation(values);

      expect(result.dailyProteinGrams).toBe(56); // 70 × 0.8
      expect(result.proteinPerKg).toBeCloseTo(0.8, 1);
      expect(result.minProteinGrams).toBeGreaterThan(0);
      expect(result.maxProteinGrams).toBeGreaterThan(result.minProteinGrams);
      expect(result.proteinPerMeal.threeMeals).toBeGreaterThan(0);
      expect(result.proteinCalories).toBe(224); // 56 × 4
    });

    it('should process calculation for active female', () => {
      const values: ProteinFormValues = {
        gender: 'female',
        age: 28,
        heightUnit: 'cm',
        heightCm: 165,
        heightFt: 0,
        heightIn: 0,
        weightUnit: 'kg',
        weightKg: 60,
        weightLb: 0,
        activityLevel: 'moderately_active',
        goal: 'maintain',
      };

      const result = processProteinCalculation(values);

      expect(result.dailyProteinGrams).toBe(84); // 60 × 1.4
      expect(result.proteinPerKg).toBeCloseTo(1.4, 1);
    });

    it('should process calculation for athlete with weight loss goal', () => {
      const values: ProteinFormValues = {
        gender: 'male',
        age: 25,
        heightUnit: 'cm',
        heightCm: 180,
        heightFt: 0,
        heightIn: 0,
        weightUnit: 'kg',
        weightKg: 80,
        weightLb: 0,
        activityLevel: 'very_active',
        goal: 'weight_loss',
      };

      const result = processProteinCalculation(values);

      // Base: 1.8 g/kg, weight loss multiplier: 1.25, additional: 0.3
      // (1.8 × 1.25) + 0.3 = 2.55 g/kg
      // 80 × 2.55 = 204g
      expect(result.dailyProteinGrams).toBeGreaterThan(180);
      expect(result.proteinPerKg).toBeGreaterThan(2.0);
    });

    it('should process calculation for older adult', () => {
      const values: ProteinFormValues = {
        gender: 'male',
        age: 70,
        heightUnit: 'cm',
        heightCm: 170,
        heightFt: 0,
        heightIn: 0,
        weightUnit: 'kg',
        weightKg: 75,
        weightLb: 0,
        activityLevel: 'lightly_active',
        goal: 'maintain',
      };

      const result = processProteinCalculation(values);

      // Base: 1.0 g/kg, age multiplier: 1.2
      // 75 × 1.0 × 1.2 = 90g
      expect(result.dailyProteinGrams).toBe(90);
    });
  });

  describe('imperial form values', () => {
    it('should process calculation with pounds and feet', () => {
      const values: ProteinFormValues = {
        gender: 'male',
        age: 30,
        heightUnit: 'ft',
        heightCm: 0,
        heightFt: 5,
        heightIn: 10,
        weightUnit: 'lb',
        weightKg: 0,
        weightLb: 165, // ~75 kg
        activityLevel: 'moderately_active',
        goal: 'maintain',
      };

      const result = processProteinCalculation(values);

      // ~75 kg × 1.4 g/kg = ~105g
      expect(result.dailyProteinGrams).toBeGreaterThan(95);
      expect(result.dailyProteinGrams).toBeLessThan(115);
      expect(result.proteinPerLb).toBeGreaterThan(0);
    });
  });

  describe('error handling', () => {
    it('should throw error for null values', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => processProteinCalculation(null as any)).toThrow('Form values are required');
    });

    it('should throw error for undefined values', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => processProteinCalculation(undefined as any)).toThrow('Form values are required');
    });

    it('should throw error for zero weight', () => {
      const values: ProteinFormValues = {
        gender: 'male',
        age: 30,
        heightUnit: 'cm',
        heightCm: 175,
        heightFt: 0,
        heightIn: 0,
        weightUnit: 'kg',
        weightKg: 0,
        weightLb: 0,
        activityLevel: 'sedentary',
        goal: 'maintain',
      };

      expect(() => processProteinCalculation(values)).toThrow('Weight must be greater than 0');
    });

    it('should throw error for invalid age', () => {
      const values: ProteinFormValues = {
        gender: 'male',
        age: 0,
        heightUnit: 'cm',
        heightCm: 175,
        heightFt: 0,
        heightIn: 0,
        weightUnit: 'kg',
        weightKg: 70,
        weightLb: 0,
        activityLevel: 'sedentary',
        goal: 'maintain',
      };

      expect(() => processProteinCalculation(values)).toThrow(
        'Age must be between 1 and 120 years'
      );
    });
  });
});

describe('Protein Real-World Examples', () => {
  it('should calculate appropriate protein for average sedentary adult', () => {
    // RDA recommendation: 0.8 g/kg
    const values: ProteinFormValues = {
      gender: 'male',
      age: 35,
      heightUnit: 'cm',
      heightCm: 175,
      heightFt: 0,
      heightIn: 0,
      weightUnit: 'kg',
      weightKg: 80,
      weightLb: 0,
      activityLevel: 'sedentary',
      goal: 'general_health',
    };

    const result = processProteinCalculation(values);
    expect(result.dailyProteinGrams).toBe(64); // 80 × 0.8
    expect(result.proteinPerKg).toBe(0.8);
  });

  it('should calculate appropriate protein for recreational gym-goer', () => {
    const values: ProteinFormValues = {
      gender: 'male',
      age: 28,
      heightUnit: 'cm',
      heightCm: 180,
      heightFt: 0,
      heightIn: 0,
      weightUnit: 'kg',
      weightKg: 75,
      weightLb: 0,
      activityLevel: 'moderately_active',
      goal: 'muscle_gain',
    };

    const result = processProteinCalculation(values);

    // Base: 1.4 g/kg, muscle gain multiplier: 1.2, additional: 0.2
    // (1.4 × 1.2) + 0.2 = 1.88 g/kg
    // 75 × 1.88 = 141g
    expect(result.dailyProteinGrams).toBeGreaterThan(130);
    expect(result.dailyProteinGrams).toBeLessThan(160);
  });

  it('should calculate appropriate protein for competitive athlete', () => {
    const values: ProteinFormValues = {
      gender: 'male',
      age: 24,
      heightUnit: 'cm',
      heightCm: 185,
      heightFt: 0,
      heightIn: 0,
      weightUnit: 'kg',
      weightKg: 85,
      weightLb: 0,
      activityLevel: 'extremely_active',
      goal: 'athletic_performance',
    };

    const result = processProteinCalculation(values);

    // High protein for athlete
    expect(result.dailyProteinGrams).toBeGreaterThan(170);
    expect(result.proteinPerKg).toBeGreaterThan(2.0);
  });

  it('should calculate appropriate protein for dieting individual', () => {
    const values: ProteinFormValues = {
      gender: 'female',
      age: 32,
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

    const result = processProteinCalculation(values);

    // Higher protein during weight loss to preserve muscle
    expect(result.proteinPerKg).toBeGreaterThan(1.6);
    expect(result.dailyProteinGrams).toBeGreaterThan(110);
  });

  it('should calculate appropriate protein for elderly maintaining muscle', () => {
    const values: ProteinFormValues = {
      gender: 'male',
      age: 72,
      heightUnit: 'cm',
      heightCm: 170,
      heightFt: 0,
      heightIn: 0,
      weightUnit: 'kg',
      weightKg: 70,
      weightLb: 0,
      activityLevel: 'lightly_active',
      goal: 'maintain',
    };

    const result = processProteinCalculation(values);

    // Older adults need more protein (1.2× multiplier)
    expect(result.dailyProteinGrams).toBeGreaterThan(70);
    expect(result.proteinPerKg).toBeGreaterThan(1.0);
  });
});

describe('Protein Edge Cases', () => {
  it('should handle very light person', () => {
    const values: ProteinFormValues = {
      gender: 'female',
      age: 25,
      heightUnit: 'cm',
      heightCm: 155,
      heightFt: 0,
      heightIn: 0,
      weightUnit: 'kg',
      weightKg: 45,
      weightLb: 0,
      activityLevel: 'sedentary',
      goal: 'maintain',
    };

    const result = processProteinCalculation(values);
    expect(result.dailyProteinGrams).toBe(36); // 45 × 0.8
    expect(result.minProteinGrams).toBeGreaterThan(30);
  });

  it('should handle very heavy person', () => {
    const values: ProteinFormValues = {
      gender: 'male',
      age: 30,
      heightUnit: 'cm',
      heightCm: 190,
      heightFt: 0,
      heightIn: 0,
      weightUnit: 'kg',
      weightKg: 120,
      weightLb: 0,
      activityLevel: 'very_active',
      goal: 'weight_loss',
    };

    const result = processProteinCalculation(values);

    // High protein for heavy, active person losing weight
    expect(result.dailyProteinGrams).toBeGreaterThan(200);
  });

  it('should enforce minimum protein regardless of activity level', () => {
    // Even with very low values, should maintain at least 0.8 g/kg minimum
    const values: ProteinFormValues = {
      gender: 'female',
      age: 18,
      heightUnit: 'cm',
      heightCm: 160,
      heightFt: 0,
      heightIn: 0,
      weightUnit: 'kg',
      weightKg: 50,
      weightLb: 0,
      activityLevel: 'sedentary',
      goal: 'general_health',
    };

    const result = processProteinCalculation(values);
    expect(result.proteinPerKg).toBeGreaterThanOrEqual(0.8);
  });

  it('should calculate reasonable protein per meal', () => {
    const values: ProteinFormValues = {
      gender: 'male',
      age: 30,
      heightUnit: 'cm',
      heightCm: 175,
      heightFt: 0,
      heightIn: 0,
      weightUnit: 'kg',
      weightKg: 75,
      weightLb: 0,
      activityLevel: 'extremely_active',
      goal: 'muscle_gain',
    };

    const result = processProteinCalculation(values);

    // Per meal should be reasonable (20-60g typically)
    expect(result.proteinPerMeal.threeMeals).toBeGreaterThan(30);
    expect(result.proteinPerMeal.threeMeals).toBeLessThan(100);
    expect(result.proteinPerMeal.fiveMeals).toBeLessThan(result.proteinPerMeal.threeMeals);
  });
});
