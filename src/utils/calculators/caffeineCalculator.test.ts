import { describe, it, expect } from 'vitest';
import {
  calculateTotalCaffeine,
  calculateSafeDailyLimit,
  calculatePreWorkoutDose,
  calculateClearanceTime,
  generateRecommendation,
  processCaffeineCalculation,
} from './caffeineCalculator';
import { CaffeineFormValues } from '@/types/caffeineCalculator';

describe('Caffeine Calculator', () => {
  describe('calculateTotalCaffeine', () => {
    it('should calculate total caffeine from single source', () => {
      const sources = [{ source: 'coffee', servings: 2 }];
      const result = calculateTotalCaffeine(sources);

      expect(result.total).toBe(190); // 95mg * 2
      expect(result.breakdown).toHaveLength(1);
      expect(result.breakdown[0].source).toBe('Coffee');
      expect(result.breakdown[0].caffeineMg).toBe(190);
      expect(result.breakdown[0].servings).toBe(2);
    });

    it('should calculate total caffeine from multiple sources', () => {
      const sources = [
        { source: 'coffee', servings: 2 },
        { source: 'espresso', servings: 1 },
        { source: 'green-tea', servings: 3 },
      ];
      const result = calculateTotalCaffeine(sources);

      // 95*2 + 63*1 + 35*3 = 190 + 63 + 105 = 358
      expect(result.total).toBe(358);
      expect(result.breakdown).toHaveLength(3);
    });

    it('should handle zero servings', () => {
      const sources = [{ source: 'coffee', servings: 0 }];
      const result = calculateTotalCaffeine(sources);

      expect(result.total).toBe(0);
      expect(result.breakdown).toHaveLength(1);
      expect(result.breakdown[0].caffeineMg).toBe(0);
    });

    it('should handle all caffeine sources', () => {
      const sources = [
        { source: 'coffee', servings: 1 },
        { source: 'espresso', servings: 1 },
        { source: 'green-tea', servings: 1 },
        { source: 'black-tea', servings: 1 },
        { source: 'energy-drink', servings: 1 },
        { source: 'pre-workout', servings: 1 },
        { source: 'cola', servings: 1 },
        { source: 'dark-chocolate', servings: 1 },
      ];
      const result = calculateTotalCaffeine(sources);

      // 95 + 63 + 35 + 47 + 80 + 200 + 34 + 12 = 566
      expect(result.total).toBe(566);
      expect(result.breakdown).toHaveLength(8);
    });

    it('should handle decimal servings', () => {
      const sources = [{ source: 'coffee', servings: 1.5 }];
      const result = calculateTotalCaffeine(sources);

      expect(result.total).toBe(142.5); // 95 * 1.5
    });
  });

  describe('calculateSafeDailyLimit', () => {
    it('should calculate safe limit for average adult', () => {
      const limit = calculateSafeDailyLimit(70);
      expect(limit).toBe(420); // 70kg * 6mg/kg
    });

    it('should calculate safe limit for lighter person', () => {
      const limit = calculateSafeDailyLimit(50);
      expect(limit).toBe(300); // 50kg * 6mg/kg
    });

    it('should calculate safe limit for heavier person', () => {
      const limit = calculateSafeDailyLimit(100);
      expect(limit).toBe(600); // 100kg * 6mg/kg
    });

    it('should throw error for zero weight', () => {
      expect(() => calculateSafeDailyLimit(0)).toThrow('Weight must be greater than 0 kg');
    });

    it('should throw error for negative weight', () => {
      expect(() => calculateSafeDailyLimit(-50)).toThrow('Weight must be greater than 0 kg');
    });

    it('should round to nearest integer', () => {
      const limit = calculateSafeDailyLimit(75.5);
      expect(limit).toBe(453); // 75.5 * 6 = 453
    });
  });

  describe('calculatePreWorkoutDose', () => {
    it('should calculate pre-workout dose range for average adult', () => {
      const dose = calculatePreWorkoutDose(70);
      expect(dose.min).toBe(210); // 70kg * 3mg/kg
      expect(dose.max).toBe(420); // 70kg * 6mg/kg
    });

    it('should calculate pre-workout dose range for lighter person', () => {
      const dose = calculatePreWorkoutDose(50);
      expect(dose.min).toBe(150); // 50kg * 3mg/kg
      expect(dose.max).toBe(300); // 50kg * 6mg/kg
    });

    it('should throw error for zero weight', () => {
      expect(() => calculatePreWorkoutDose(0)).toThrow('Weight must be greater than 0 kg');
    });

    it('should throw error for negative weight', () => {
      expect(() => calculatePreWorkoutDose(-50)).toThrow('Weight must be greater than 0 kg');
    });
  });

  describe('calculateClearanceTime', () => {
    it('should calculate clearance time for normal sensitivity (5 hours half-life)', () => {
      const clearance = calculateClearanceTime(5);
      expect(clearance).toBe('1 day 1 hours');
    });

    it('should calculate clearance time for low sensitivity (3 hours half-life)', () => {
      const clearance = calculateClearanceTime(3);
      expect(clearance).toBe('15 hours');
    });

    it('should calculate clearance time for high sensitivity (7 hours half-life)', () => {
      const clearance = calculateClearanceTime(7);
      expect(clearance).toBe('1 day 11 hours');
    });

    it('should format days and hours correctly', () => {
      const clearance = calculateClearanceTime(6);
      expect(clearance).toBe('1 day 6 hours');
    });

    it('should format only days when hours is zero', () => {
      const clearance = calculateClearanceTime(4.8);
      expect(clearance).toBe('1 day');
    });
  });

  describe('generateRecommendation', () => {
    it('should recommend for zero caffeine intake', () => {
      const rec = generateRecommendation(0, 400, 0, false);
      expect(rec).toContain('not consuming any caffeine');
    });

    it('should recommend for low intake (<=50%)', () => {
      const rec = generateRecommendation(150, 400, 37.5, false);
      expect(rec).toContain('low and well within safe limits');
    });

    it('should recommend for moderate intake (50-80%)', () => {
      const rec = generateRecommendation(280, 400, 70, false);
      expect(rec).toContain('moderate and within safe limits');
    });

    it('should recommend for high intake (80-100%)', () => {
      const rec = generateRecommendation(380, 400, 95, false);
      expect(rec).toContain('approaching the safe limit');
    });

    it('should warn when exceeding safe limit', () => {
      const rec = generateRecommendation(500, 400, 125, false);
      expect(rec).toContain('exceeding the safe daily limit');
      expect(rec).toContain('100mg');
    });

    it('should provide pre-workout specific recommendations when timing is enabled', () => {
      const rec = generateRecommendation(150, 400, 37.5, true);
      expect(rec).toContain('pre-workout');
    });

    it('should warn about pre-workout timing when at upper limit', () => {
      const rec = generateRecommendation(380, 400, 95, true);
      expect(rec).toContain('pre-workout timing');
      expect(rec).toContain('side effects');
    });
  });

  describe('processCaffeineCalculation', () => {
    it('should process complete calculation with metric units', () => {
      const values: CaffeineFormValues = {
        weight: 70,
        weightUnit: 'kg',
        sources: [{ source: 'coffee', servings: 2 }],
        sensitivityLevel: 'normal',
        preWorkoutTiming: false,
      };

      const result = processCaffeineCalculation(values);

      expect(result.totalDailyCaffeine).toBe(190);
      expect(result.safeDailyLimit).toBe(420);
      expect(result.isOverLimit).toBe(false);
      expect(result.percentOfLimit).toBe(45);
      expect(result.preWorkoutDose).toBe(315);
      expect(result.halfLifeHours).toBe(5);
      expect(result.clearanceTime).toBe('1 day 1 hours');
      expect(result.sourceBreakdown).toHaveLength(1);
      expect(result.recommendation).toBeTruthy();
    });

    it('should process calculation with imperial units', () => {
      const values: CaffeineFormValues = {
        weight: 154, // ~70kg
        weightUnit: 'lb',
        sources: [{ source: 'espresso', servings: 3 }],
        sensitivityLevel: 'normal',
        preWorkoutTiming: false,
      };

      const result = processCaffeineCalculation(values);

      expect(result.totalDailyCaffeine).toBe(189); // 63 * 3
      expect(result.safeDailyLimit).toBeCloseTo(420, -1); // ~70kg * 6
      expect(result.isOverLimit).toBe(false);
    });

    it('should handle multiple sources', () => {
      const values: CaffeineFormValues = {
        weight: 70,
        weightUnit: 'kg',
        sources: [
          { source: 'coffee', servings: 1 },
          { source: 'energy-drink', servings: 1 },
          { source: 'dark-chocolate', servings: 2 },
        ],
        sensitivityLevel: 'normal',
        preWorkoutTiming: false,
      };

      const result = processCaffeineCalculation(values);

      // 95 + 80 + 24 = 199
      expect(result.totalDailyCaffeine).toBe(199);
      expect(result.sourceBreakdown).toHaveLength(3);
    });

    it('should calculate over limit correctly', () => {
      const values: CaffeineFormValues = {
        weight: 50,
        weightUnit: 'kg',
        sources: [
          { source: 'coffee', servings: 3 },
          { source: 'energy-drink', servings: 2 },
        ],
        sensitivityLevel: 'normal',
        preWorkoutTiming: false,
      };

      const result = processCaffeineCalculation(values);

      // 95*3 + 80*2 = 285 + 160 = 445
      expect(result.totalDailyCaffeine).toBe(445);
      expect(result.safeDailyLimit).toBe(300); // 50kg * 6
      expect(result.isOverLimit).toBe(true);
      expect(result.percentOfLimit).toBe(148);
    });

    it('should adjust half-life based on sensitivity level', () => {
      const baseValues: CaffeineFormValues = {
        weight: 70,
        weightUnit: 'kg',
        sources: [{ source: 'coffee', servings: 2 }],
        sensitivityLevel: 'normal',
        preWorkoutTiming: false,
      };

      const lowSensitivity = processCaffeineCalculation({
        ...baseValues,
        sensitivityLevel: 'low',
      });
      expect(lowSensitivity.halfLifeHours).toBe(3);
      expect(lowSensitivity.clearanceTime).toBe('15 hours');

      const normalSensitivity = processCaffeineCalculation({
        ...baseValues,
        sensitivityLevel: 'normal',
      });
      expect(normalSensitivity.halfLifeHours).toBe(5);
      expect(normalSensitivity.clearanceTime).toBe('1 day 1 hours');

      const highSensitivity = processCaffeineCalculation({
        ...baseValues,
        sensitivityLevel: 'high',
      });
      expect(highSensitivity.halfLifeHours).toBe(7);
      expect(highSensitivity.clearanceTime).toBe('1 day 11 hours');
    });

    it('should handle pre-workout timing flag', () => {
      const values: CaffeineFormValues = {
        weight: 70,
        weightUnit: 'kg',
        sources: [{ source: 'pre-workout', servings: 1 }],
        sensitivityLevel: 'normal',
        preWorkoutTiming: true,
      };

      const result = processCaffeineCalculation(values);

      expect(result.preWorkoutDose).toBe(315); // (210 + 420) / 2
      expect(result.recommendation).toContain('pre-workout');
    });

    it('should throw error for zero weight', () => {
      const values: CaffeineFormValues = {
        weight: 0,
        weightUnit: 'kg',
        sources: [{ source: 'coffee', servings: 1 }],
        sensitivityLevel: 'normal',
        preWorkoutTiming: false,
      };

      expect(() => processCaffeineCalculation(values)).toThrow('Weight must be greater than 0');
    });

    it('should handle edge case: very high caffeine intake', () => {
      const values: CaffeineFormValues = {
        weight: 70,
        weightUnit: 'kg',
        sources: [
          { source: 'pre-workout', servings: 3 },
          { source: 'coffee', servings: 4 },
          { source: 'energy-drink', servings: 2 },
        ],
        sensitivityLevel: 'normal',
        preWorkoutTiming: false,
      };

      const result = processCaffeineCalculation(values);

      // 200*3 + 95*4 + 80*2 = 600 + 380 + 160 = 1140
      expect(result.totalDailyCaffeine).toBe(1140);
      expect(result.isOverLimit).toBe(true);
      expect(result.percentOfLimit).toBe(271);
      expect(result.recommendation).toContain('exceeding');
    });

    it('should handle edge case: no caffeine sources', () => {
      const values: CaffeineFormValues = {
        weight: 70,
        weightUnit: 'kg',
        sources: [],
        sensitivityLevel: 'normal',
        preWorkoutTiming: false,
      };

      const result = processCaffeineCalculation(values);

      expect(result.totalDailyCaffeine).toBe(0);
      expect(result.isOverLimit).toBe(false);
      expect(result.percentOfLimit).toBe(0);
      expect(result.sourceBreakdown).toHaveLength(0);
    });
  });
});
