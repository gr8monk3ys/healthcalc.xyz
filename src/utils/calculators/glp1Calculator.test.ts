import { describe, it, expect } from 'vitest';
import { calculateBMR, processGLP1Calculation } from './glp1Calculator';
import { GLP1FormValues } from '@/types/glp1Calculator';

describe('GLP-1 Calculator', () => {
  describe('calculateBMR', () => {
    it('should calculate BMR for an average male', () => {
      // 80kg, 175cm, 35yo male
      // 10*80 + 6.25*175 - 5*35 + 5 = 800 + 1093.75 - 175 + 5 = 1723.75
      const bmr = calculateBMR(80, 175, 35, 'male');
      expect(bmr).toBeCloseTo(1723.75, 1);
    });

    it('should calculate BMR for an average female', () => {
      // 65kg, 163cm, 30yo female
      // 10*65 + 6.25*163 - 5*30 - 161 = 650 + 1018.75 - 150 - 161 = 1357.75
      const bmr = calculateBMR(65, 163, 30, 'female');
      expect(bmr).toBeCloseTo(1357.75, 1);
    });

    it('should throw for invalid weight', () => {
      expect(() => calculateBMR(0, 175, 35, 'male')).toThrow('Weight must be greater than 0');
      expect(() => calculateBMR(-5, 175, 35, 'male')).toThrow('Weight must be greater than 0');
    });

    it('should throw for invalid height', () => {
      expect(() => calculateBMR(80, 0, 35, 'male')).toThrow('Height must be greater than 0');
      expect(() => calculateBMR(80, -10, 35, 'male')).toThrow('Height must be greater than 0');
    });

    it('should throw for invalid age', () => {
      expect(() => calculateBMR(80, 175, 0, 'male')).toThrow('Age must be greater than 0');
      expect(() => calculateBMR(80, 175, -5, 'male')).toThrow('Age must be greater than 0');
    });
  });

  describe('processGLP1Calculation', () => {
    const baseValues: GLP1FormValues = {
      weight: 90,
      height: 178,
      age: 40,
      gender: 'male',
      medication: 'semaglutide',
      activityLevel: 'moderately_active',
      goal: 'weight-loss',
    };

    it('should calculate adjusted calories below TDEE', () => {
      const result = processGLP1Calculation(baseValues);
      expect(result.adjustedCalories).toBeLessThan(result.tdee);
      expect(result.adjustedCalories).toBeGreaterThanOrEqual(1500); // male minimum
    });

    it('should provide adequate protein for weight loss', () => {
      const result = processGLP1Calculation(baseValues);
      // Weight loss: 1.2-1.6 g/kg for 90kg = 108-144g
      expect(result.proteinMinGrams).toBe(108); // 90 * 1.2
      expect(result.proteinMaxGrams).toBe(144); // 90 * 1.6
    });

    it('should calculate higher protein for muscle preservation goal', () => {
      const result = processGLP1Calculation({
        ...baseValues,
        goal: 'muscle-preservation',
      });
      // Muscle preservation: 1.4-2.0 g/kg for 90kg = 126-180g
      expect(result.proteinMinGrams).toBe(126);
      expect(result.proteinMaxGrams).toBe(180);
    });

    it('should apply different appetite reduction per medication', () => {
      const semaglutide = processGLP1Calculation({ ...baseValues, medication: 'semaglutide' });
      const tirzepatide = processGLP1Calculation({ ...baseValues, medication: 'tirzepatide' });
      const liraglutide = processGLP1Calculation({ ...baseValues, medication: 'liraglutide' });

      // Tirzepatide has highest reduction (30%), then semaglutide (25%), then liraglutide (20%)
      expect(tirzepatide.adjustedCalories).toBeLessThan(semaglutide.adjustedCalories);
      expect(semaglutide.adjustedCalories).toBeLessThan(liraglutide.adjustedCalories);
    });

    it('should enforce minimum calorie floor for females', () => {
      const result = processGLP1Calculation({
        ...baseValues,
        gender: 'female',
        weight: 50,
        height: 155,
        age: 60,
        activityLevel: 'sedentary',
        medication: 'tirzepatide',
      });
      expect(result.adjustedCalories).toBeGreaterThanOrEqual(1200);
    });

    it('should enforce minimum calorie floor for males', () => {
      const result = processGLP1Calculation({
        ...baseValues,
        weight: 55,
        height: 165,
        age: 65,
        activityLevel: 'sedentary',
        medication: 'tirzepatide',
      });
      expect(result.adjustedCalories).toBeGreaterThanOrEqual(1500);
    });

    it('should calculate hydration based on body weight', () => {
      const result = processGLP1Calculation(baseValues);
      // 90kg * 0.033 = 2.97L, rounded to 3.0
      expect(result.hydrationLiters).toBeGreaterThanOrEqual(2);
      expect(result.hydrationLiters).toBeCloseTo(3.0, 0);
    });

    it('should include fiber recommendation', () => {
      const result = processGLP1Calculation(baseValues);
      expect(result.fiberMinGrams).toBe(25);
    });

    it('should calculate positive expected weight loss', () => {
      const result = processGLP1Calculation(baseValues);
      expect(result.expectedWeightLossPerWeek.min).toBeGreaterThan(0);
      expect(result.expectedWeightLossPerWeek.max).toBeGreaterThan(
        result.expectedWeightLossPerWeek.min
      );
    });

    it('should include warnings and nutrient priorities', () => {
      const result = processGLP1Calculation(baseValues);
      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.nutrientPriorities.length).toBeGreaterThan(0);
    });

    it('should calculate BMR and TDEE', () => {
      const result = processGLP1Calculation(baseValues);
      expect(result.bmr).toBeGreaterThan(0);
      expect(result.tdee).toBeGreaterThan(result.bmr);
    });

    it('should handle macros summing to total calories', () => {
      const result = processGLP1Calculation(baseValues);
      const totalFromMacros =
        ((result.proteinMinGrams + result.proteinMaxGrams) / 2) * 4 +
        result.fatGrams * 9 +
        result.carbGrams * 4;
      // Allow some rounding tolerance
      expect(Math.abs(totalFromMacros - result.adjustedCalories)).toBeLessThan(15);
    });

    it('should throw for invalid inputs', () => {
      expect(() => processGLP1Calculation({ ...baseValues, weight: -10 })).toThrow();
      expect(() => processGLP1Calculation({ ...baseValues, height: 0 })).toThrow();
      expect(() => processGLP1Calculation({ ...baseValues, age: 150 })).toThrow();
    });

    it('should handle sedentary activity level', () => {
      const sedentary = processGLP1Calculation({ ...baseValues, activityLevel: 'sedentary' });
      const active = processGLP1Calculation({ ...baseValues, activityLevel: 'very_active' });
      expect(sedentary.tdee).toBeLessThan(active.tdee);
      expect(sedentary.adjustedCalories).toBeLessThan(active.adjustedCalories);
    });

    it('should handle maintenance goal with lower protein', () => {
      const result = processGLP1Calculation({ ...baseValues, goal: 'maintenance' });
      // Maintenance: 1.0-1.4 g/kg for 90kg = 90-126g
      expect(result.proteinMinGrams).toBe(90);
      expect(result.proteinMaxGrams).toBe(126);
    });
  });
});
