import { describe, it, expect } from 'vitest';
import {
  processIFCalculation,
  validateIFInputs,
  getFormattedEatingWindow,
} from './intermittentFasting';
import { IFFormValues } from '@/types/intermittentFasting';

describe('Intermittent Fasting Calculator', () => {
  const baseFormValues: IFFormValues = {
    weight: 80,
    weightUnit: 'kg',
    heightCm: 175,
    heightFt: 5,
    heightIn: 9,
    age: 30,
    gender: 'male',
    activityLevel: 'moderately_active',
    protocol: '16:8',
    goal: 'weight-loss',
    wakeTime: '07:00',
    useMetric: true,
  };

  describe('processIFCalculation', () => {
    it('should calculate correct BMR and TDEE for male', () => {
      const result = processIFCalculation(baseFormValues);

      expect(result.bmr).toBeGreaterThan(1400);
      expect(result.bmr).toBeLessThan(2000);
      expect(result.tdee).toBeGreaterThan(result.bmr);
    });

    it('should calculate correct BMR and TDEE for female', () => {
      const femaleValues = { ...baseFormValues, gender: 'female' as const };
      const result = processIFCalculation(femaleValues);

      expect(result.bmr).toBeGreaterThan(1200);
      expect(result.bmr).toBeLessThan(1800);
      expect(result.tdee).toBeGreaterThan(result.bmr);
    });

    it('should apply 20% deficit for weight-loss goal', () => {
      const result = processIFCalculation(baseFormValues);

      expect(result.dailyCalories).toBeLessThan(result.tdee);
      const deficit = result.tdee - result.dailyCalories;
      const deficitPercent = deficit / result.tdee;
      expect(deficitPercent).toBeGreaterThan(0.15);
      expect(deficitPercent).toBeLessThan(0.25);
    });

    it('should maintain calories for maintenance goal', () => {
      const maintenanceValues = { ...baseFormValues, goal: 'maintenance' as const };
      const result = processIFCalculation(maintenanceValues);

      expect(result.dailyCalories).toBeCloseTo(result.tdee, -1);
    });

    it('should apply 10% surplus for muscle-gain goal', () => {
      const gainValues = { ...baseFormValues, goal: 'muscle-gain' as const };
      const result = processIFCalculation(gainValues);

      expect(result.dailyCalories).toBeGreaterThan(result.tdee);
      const surplus = result.dailyCalories - result.tdee;
      const surplusPercent = surplus / result.tdee;
      expect(surplusPercent).toBeGreaterThan(0.05);
      expect(surplusPercent).toBeLessThan(0.15);
    });

    it('should enforce minimum calorie limits', () => {
      const lightValues = {
        ...baseFormValues,
        weight: 50,
        activityLevel: 'sedentary' as const,
        goal: 'weight-loss' as const,
      };
      const result = processIFCalculation(lightValues);

      expect(result.dailyCalories).toBeGreaterThanOrEqual(1500); // male minimum
    });

    it('should enforce female minimum calorie limits', () => {
      const lightFemaleValues = {
        ...baseFormValues,
        gender: 'female' as const,
        weight: 45,
        activityLevel: 'sedentary' as const,
        goal: 'weight-loss' as const,
      };
      const result = processIFCalculation(lightFemaleValues);

      expect(result.dailyCalories).toBeGreaterThanOrEqual(1200); // female minimum
    });

    it('should convert imperial units correctly', () => {
      const imperialValues = {
        ...baseFormValues,
        weightUnit: 'lb' as const,
        weight: 176, // ~80 kg
        useMetric: false,
      };
      const result = processIFCalculation(imperialValues);

      expect(result.bmr).toBeGreaterThan(1400);
      expect(result.bmr).toBeLessThan(2000);
    });
  });

  describe('16:8 Protocol', () => {
    it('should calculate 16 hours fasting, 8 hours eating', () => {
      const result = processIFCalculation(baseFormValues);

      expect(result.fastingHours).toBe(16);
      expect(result.eatingHours).toBe(8);
    });

    it('should recommend 2 meals for 16:8', () => {
      const result = processIFCalculation(baseFormValues);

      expect(result.mealsInWindow).toBe(2);
    });

    it('should start eating window ~4 hours after waking', () => {
      const values = { ...baseFormValues, wakeTime: '07:00' };
      const result = processIFCalculation(values);

      // Should start around 11:00 (4 hours after 7am wake time)
      expect(result.eatingWindowStart).toMatch(/^1[01]:\d{2}$/);
    });

    it('should end eating window 8 hours after start', () => {
      const result = processIFCalculation(baseFormValues);

      const startHour = parseInt(result.eatingWindowStart.split(':')[0]);
      const endHour = parseInt(result.eatingWindowEnd.split(':')[0]);
      const duration = (endHour - startHour + 24) % 24;

      expect(duration).toBe(8);
    });

    it('should provide meal times within eating window', () => {
      const result = processIFCalculation(baseFormValues);

      expect(result.mealTimes).toHaveLength(2);
      expect(result.mealTimes[0]).toBe(result.eatingWindowStart);
    });
  });

  describe('18:6 Protocol', () => {
    it('should calculate 18 hours fasting, 6 hours eating', () => {
      const values = { ...baseFormValues, protocol: '18:6' as const };
      const result = processIFCalculation(values);

      expect(result.fastingHours).toBe(18);
      expect(result.eatingHours).toBe(6);
    });

    it('should recommend 2 meals for 18:6', () => {
      const values = { ...baseFormValues, protocol: '18:6' as const };
      const result = processIFCalculation(values);

      expect(result.mealsInWindow).toBe(2);
    });
  });

  describe('20:4 Warrior Protocol', () => {
    it('should calculate 20 hours fasting, 4 hours eating', () => {
      const values = { ...baseFormValues, protocol: '20:4' as const };
      const result = processIFCalculation(values);

      expect(result.fastingHours).toBe(20);
      expect(result.eatingHours).toBe(4);
    });

    it('should recommend 1 meal for 20:4', () => {
      const values = { ...baseFormValues, protocol: '20:4' as const };
      const result = processIFCalculation(values);

      expect(result.mealsInWindow).toBe(1);
    });
  });

  describe('OMAD Protocol', () => {
    it('should calculate 23 hours fasting, 1 hour eating', () => {
      const values = { ...baseFormValues, protocol: 'omad' as const };
      const result = processIFCalculation(values);

      expect(result.fastingHours).toBe(23);
      expect(result.eatingHours).toBe(1);
    });

    it('should recommend 1 meal for OMAD', () => {
      const values = { ...baseFormValues, protocol: 'omad' as const };
      const result = processIFCalculation(values);

      expect(result.mealsInWindow).toBe(1);
    });

    it('should provide single meal time', () => {
      const values = { ...baseFormValues, protocol: 'omad' as const };
      const result = processIFCalculation(values);

      expect(result.mealTimes).toHaveLength(1);
    });
  });

  describe('5:2 Protocol', () => {
    it('should use standard eating hours for 5:2', () => {
      const values = { ...baseFormValues, protocol: '5:2' as const };
      const result = processIFCalculation(values);

      expect(result.fastingHours).toBe(0);
      expect(result.eatingHours).toBe(24);
    });

    it('should recommend 3 meals for 5:2', () => {
      const values = { ...baseFormValues, protocol: '5:2' as const };
      const result = processIFCalculation(values);

      expect(result.mealsInWindow).toBe(3);
    });
  });

  describe('Macronutrient Calculations', () => {
    it('should calculate protein target based on bodyweight', () => {
      const result = processIFCalculation(baseFormValues);

      // Weight loss goal: 2.0g per kg bodyweight
      expect(result.proteinTarget).toBeCloseTo(80 * 2.0, 0);
    });

    it('should calculate fat and carb targets', () => {
      const result = processIFCalculation(baseFormValues);

      expect(result.fatTarget).toBeGreaterThan(0);
      expect(result.carbTarget).toBeGreaterThan(0);

      // Verify macros add up to approximately daily calories
      const proteinCals = result.proteinTarget * 4;
      const fatCals = result.fatTarget * 9;
      const carbCals = result.carbTarget * 4;
      const totalCals = proteinCals + fatCals + carbCals;

      expect(totalCals).toBeCloseTo(result.dailyCalories, -2);
    });

    it('should calculate fiber target', () => {
      const result = processIFCalculation(baseFormValues);

      // 14g per 1000 calories
      const expectedFiber = Math.round((result.dailyCalories / 1000) * 14);
      expect(result.fiberTarget).toBe(expectedFiber);
    });

    it('should calculate water target based on bodyweight', () => {
      const result = processIFCalculation(baseFormValues);

      // 35ml per kg = 2.8L for 80kg person
      expect(result.waterTarget).toBeCloseTo(2.8, 1);
    });
  });

  describe('Meal Distribution', () => {
    it('should distribute calories evenly across meals', () => {
      const result = processIFCalculation(baseFormValues);

      const totalMealCalories = result.caloriesPerMeal * result.mealsInWindow;
      expect(totalMealCalories).toBe(result.dailyCalories);
    });

    it('should handle single meal distribution for OMAD', () => {
      const values = { ...baseFormValues, protocol: 'omad' as const };
      const result = processIFCalculation(values);

      expect(result.caloriesPerMeal).toBe(result.dailyCalories);
    });
  });

  describe('Weight Projections', () => {
    it('should generate weight projections for weight-loss goal', () => {
      const result = processIFCalculation(baseFormValues);

      expect(result.weeklyProjections).toBeDefined();
      expect(result.weeklyProjections).toHaveLength(12);
    });

    it('should not generate projections for maintenance goal', () => {
      const values = { ...baseFormValues, goal: 'maintenance' as const };
      const result = processIFCalculation(values);

      expect(result.weeklyProjections).toBeUndefined();
    });

    it('should show decreasing weight over time for weight loss', () => {
      const result = processIFCalculation(baseFormValues);

      if (result.weeklyProjections) {
        const firstWeek = result.weeklyProjections[0].projectedWeight;
        const lastWeek = result.weeklyProjections[11].projectedWeight;

        expect(lastWeek).toBeLessThan(firstWeek);
      }
    });

    it('should account for metabolic adaptation', () => {
      const result = processIFCalculation(baseFormValues);

      if (result.weeklyProjections) {
        const week1Loss = result.weeklyProjections[0].cumulativeWeightLoss;
        const week12Loss = result.weeklyProjections[11].cumulativeWeightLoss;

        // Later weeks should show slower progress due to adaptation
        const week1Rate = week1Loss / 1;
        const week12Rate = week12Loss / 12;

        expect(week12Rate).toBeLessThan(week1Rate);
      }
    });
  });

  describe('Protocol-Specific Tips', () => {
    it('should provide protocol-specific tips', () => {
      const result = processIFCalculation(baseFormValues);

      expect(result.tips).toBeDefined();
      expect(result.tips.length).toBeGreaterThan(3);
    });

    it('should include goal-specific tips', () => {
      const result = processIFCalculation(baseFormValues);

      expect(result.tips.some(tip => tip.toLowerCase().includes('weight'))).toBe(true);
    });

    it('should provide different tips for different protocols', () => {
      const result168 = processIFCalculation({ ...baseFormValues, protocol: '16:8' });
      const resultOMAD = processIFCalculation({ ...baseFormValues, protocol: 'omad' });

      expect(result168.tips).not.toEqual(resultOMAD.tips);
    });
  });

  describe('Protocol Details', () => {
    it('should include protocol description', () => {
      const result = processIFCalculation(baseFormValues);

      expect(result.protocolDescription).toBeTruthy();
      expect(typeof result.protocolDescription).toBe('string');
    });

    it('should include protocol benefits', () => {
      const result = processIFCalculation(baseFormValues);

      expect(result.benefits).toBeDefined();
      expect(result.benefits.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle very early wake times', () => {
      const values = { ...baseFormValues, wakeTime: '05:00' };
      const result = processIFCalculation(values);

      expect(result.eatingWindowStart).toBeTruthy();
      expect(result.eatingWindowEnd).toBeTruthy();
    });

    it('should handle late wake times', () => {
      const values = { ...baseFormValues, wakeTime: '10:00' };
      const result = processIFCalculation(values);

      expect(result.eatingWindowStart).toBeTruthy();
      expect(result.eatingWindowEnd).toBeTruthy();
    });

    it('should handle very light individuals', () => {
      const values = { ...baseFormValues, weight: 50 };
      const result = processIFCalculation(values);

      expect(result.dailyCalories).toBeGreaterThanOrEqual(1500);
    });

    it('should handle very heavy individuals', () => {
      const values = { ...baseFormValues, weight: 150 };
      const result = processIFCalculation(values);

      expect(result.dailyCalories).toBeGreaterThan(2000);
    });

    it('should handle sedentary activity level', () => {
      const values = { ...baseFormValues, activityLevel: 'sedentary' as const };
      const result = processIFCalculation(values);

      expect(result.tdee).toBeGreaterThan(result.bmr);
      expect(result.tdee).toBeLessThan(result.bmr * 1.3);
    });

    it('should handle very active individuals', () => {
      const values = { ...baseFormValues, activityLevel: 'very_active' as const };
      const result = processIFCalculation(values);

      expect(result.tdee).toBeGreaterThan(result.bmr * 1.6);
    });

    it('should throw error for invalid height', () => {
      const values = { ...baseFormValues, heightCm: 0 };

      expect(() => processIFCalculation(values)).toThrow('Invalid height value');
    });

    it('should throw error for invalid weight', () => {
      const values = { ...baseFormValues, weight: 0 };

      expect(() => processIFCalculation(values)).toThrow('Invalid weight value');
    });

    it('should throw error for invalid age', () => {
      const values = { ...baseFormValues, age: 0 };

      expect(() => processIFCalculation(values)).toThrow('Invalid age value');
    });
  });

  describe('validateIFInputs', () => {
    it('should validate valid inputs', () => {
      const errors = validateIFInputs(baseFormValues);

      expect(Object.keys(errors)).toHaveLength(0);
    });

    it('should require age >= 18', () => {
      const errors = validateIFInputs({ ...baseFormValues, age: 16 });

      expect(errors.age).toBeTruthy();
      expect(errors.age).toContain('18');
    });

    it('should validate weight', () => {
      const errors = validateIFInputs({ ...baseFormValues, weight: 0 });

      expect(errors.weight).toBeTruthy();
    });

    it('should validate metric height', () => {
      const errors = validateIFInputs({ ...baseFormValues, heightCm: 0, useMetric: true });

      expect(errors.height).toBeTruthy();
    });

    it('should validate imperial height', () => {
      const errors = validateIFInputs({ ...baseFormValues, heightFt: 0, useMetric: false });

      expect(errors.height).toBeTruthy();
    });

    it('should validate wake time format', () => {
      const errors = validateIFInputs({ ...baseFormValues, wakeTime: 'invalid' });

      expect(errors.wakeTime).toBeTruthy();
    });
  });

  describe('getFormattedEatingWindow', () => {
    it('should format 24-hour time to 12-hour format', () => {
      const formatted = getFormattedEatingWindow('12:00', '20:00');

      expect(formatted).toContain('PM');
      expect(formatted).toContain('-');
    });

    it('should handle morning times', () => {
      const formatted = getFormattedEatingWindow('08:00', '16:00');

      expect(formatted).toContain('AM');
      expect(formatted).toContain('PM');
    });

    it('should handle midnight', () => {
      const formatted = getFormattedEatingWindow('00:00', '08:00');

      expect(formatted).toContain('12:00 AM');
    });

    it('should handle noon', () => {
      const formatted = getFormattedEatingWindow('12:00', '20:00');

      expect(formatted).toContain('12:00 PM');
    });
  });
});
