import { describe, it, expect } from 'vitest';
import {
  calculateEpley,
  calculateBrzycki,
  calculateLombardi,
  calculateOneRepMax,
  calculateAllFormulas,
  calculateTrainingZones,
  generatePercentageChart,
  estimateRepsAtPercentage,
  validateOneRepMaxWeight,
  validateReps,
  processOneRepMaxCalculation,
  calculateAverageOneRepMax,
  getWeightAtPercentage,
} from './oneRepMax';
import { OneRepMaxFormValues } from '@/types/oneRepMax';

describe('One Rep Max Calculation', () => {
  describe('calculateEpley', () => {
    it('should calculate 1RM correctly with 5 reps', () => {
      // Epley: 1RM = weight x (1 + reps/30)
      // 100 x (1 + 5/30) = 100 x 1.167 = 116.67
      const result = calculateEpley(100, 5);
      expect(result).toBeCloseTo(116.67, 1);
    });

    it('should calculate 1RM correctly with 10 reps', () => {
      // 100 x (1 + 10/30) = 100 x 1.333 = 133.33
      const result = calculateEpley(100, 10);
      expect(result).toBeCloseTo(133.33, 1);
    });

    it('should return the weight itself for 1 rep', () => {
      const result = calculateEpley(100, 1);
      expect(result).toBe(100);
    });

    it('should handle heavier weights', () => {
      // 225 x (1 + 5/30) = 225 x 1.167 = 262.5
      const result = calculateEpley(225, 5);
      expect(result).toBeCloseTo(262.5, 1);
    });

    it('should throw error for negative weight', () => {
      expect(() => calculateEpley(-100, 5)).toThrow('Weight must be greater than 0');
    });

    it('should throw error for zero weight', () => {
      expect(() => calculateEpley(0, 5)).toThrow('Weight must be greater than 0');
    });

    it('should throw error for negative reps', () => {
      expect(() => calculateEpley(100, -5)).toThrow('Reps must be greater than 0');
    });

    it('should throw error for zero reps', () => {
      expect(() => calculateEpley(100, 0)).toThrow('Reps must be greater than 0');
    });

    it('should throw error for more than 30 reps', () => {
      expect(() => calculateEpley(100, 31)).toThrow('Reps must be 30 or less');
    });
  });

  describe('calculateBrzycki', () => {
    it('should calculate 1RM correctly with 5 reps', () => {
      // Brzycki: 1RM = weight x (36 / (37 - reps))
      // 100 x (36 / (37 - 5)) = 100 x (36/32) = 112.5
      const result = calculateBrzycki(100, 5);
      expect(result).toBeCloseTo(112.5, 1);
    });

    it('should calculate 1RM correctly with 10 reps', () => {
      // 100 x (36 / (37 - 10)) = 100 x (36/27) = 133.33
      const result = calculateBrzycki(100, 10);
      expect(result).toBeCloseTo(133.33, 1);
    });

    it('should return the weight itself for 1 rep', () => {
      const result = calculateBrzycki(100, 1);
      expect(result).toBe(100);
    });

    it('should throw error for negative weight', () => {
      expect(() => calculateBrzycki(-100, 5)).toThrow('Weight must be greater than 0');
    });

    it('should throw error for zero weight', () => {
      expect(() => calculateBrzycki(0, 5)).toThrow('Weight must be greater than 0');
    });

    it('should throw error for reps >= 37', () => {
      expect(() => calculateBrzycki(100, 37)).toThrow(
        'Brzycki formula is invalid for 37 or more reps'
      );
    });

    it('should throw error for negative reps', () => {
      expect(() => calculateBrzycki(100, -5)).toThrow('Reps must be greater than 0');
    });
  });

  describe('calculateLombardi', () => {
    it('should calculate 1RM correctly with 5 reps', () => {
      // Lombardi: 1RM = weight x reps^0.10
      // 100 x 5^0.10 = 100 x 1.175 = 117.5
      const result = calculateLombardi(100, 5);
      expect(result).toBeCloseTo(117.5, 1);
    });

    it('should calculate 1RM correctly with 10 reps', () => {
      // 100 x 10^0.10 = 100 x 1.259 = 125.9
      const result = calculateLombardi(100, 10);
      expect(result).toBeCloseTo(125.9, 1);
    });

    it('should return the weight itself for 1 rep', () => {
      const result = calculateLombardi(100, 1);
      expect(result).toBe(100);
    });

    it('should throw error for negative weight', () => {
      expect(() => calculateLombardi(-100, 5)).toThrow('Weight must be greater than 0');
    });

    it('should throw error for zero weight', () => {
      expect(() => calculateLombardi(0, 5)).toThrow('Weight must be greater than 0');
    });

    it('should throw error for negative reps', () => {
      expect(() => calculateLombardi(100, -5)).toThrow('Reps must be greater than 0');
    });

    it('should throw error for more than 30 reps', () => {
      expect(() => calculateLombardi(100, 31)).toThrow('Reps must be 30 or less');
    });
  });

  describe('calculateOneRepMax', () => {
    it('should use Epley formula by default', () => {
      const result = calculateOneRepMax(100, 5);
      const epleyResult = calculateEpley(100, 5);
      expect(result).toBe(epleyResult);
    });

    it('should use specified formula', () => {
      const epley = calculateOneRepMax(100, 5, 'epley');
      const brzycki = calculateOneRepMax(100, 5, 'brzycki');
      const lombardi = calculateOneRepMax(100, 5, 'lombardi');

      expect(epley).toBeCloseTo(116.67, 1);
      expect(brzycki).toBeCloseTo(112.5, 1);
      expect(lombardi).toBeCloseTo(117.5, 1);
    });

    it('should throw error for unknown formula', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => calculateOneRepMax(100, 5, 'unknown' as any)).toThrow('Unknown formula');
    });
  });

  describe('calculateAllFormulas', () => {
    it('should return results from all formulas', () => {
      const results = calculateAllFormulas(100, 5);
      expect(results).toHaveLength(3);
      expect(results.map(r => r.formula)).toContain('epley');
      expect(results.map(r => r.formula)).toContain('brzycki');
      expect(results.map(r => r.formula)).toContain('lombardi');
    });

    it('should include formula names in results', () => {
      const results = calculateAllFormulas(100, 5);
      expect(results.find(r => r.formula === 'epley')?.name).toBe('Epley');
      expect(results.find(r => r.formula === 'brzycki')?.name).toBe('Brzycki');
      expect(results.find(r => r.formula === 'lombardi')?.name).toBe('Lombardi');
    });

    it('should round results to 1 decimal place', () => {
      const results = calculateAllFormulas(100, 5);
      results.forEach(result => {
        const decimalPlaces = (result.oneRepMax.toString().split('.')[1] || '').length;
        expect(decimalPlaces).toBeLessThanOrEqual(1);
      });
    });

    it('should throw error for invalid weight', () => {
      expect(() => calculateAllFormulas(0, 5)).toThrow('Weight must be greater than 0');
    });

    it('should throw error for invalid reps', () => {
      expect(() => calculateAllFormulas(100, 0)).toThrow('Reps must be greater than 0');
    });
  });

  describe('calculateTrainingZones', () => {
    it('should return three training zones', () => {
      const zones = calculateTrainingZones(100);
      expect(zones).toHaveLength(3);
    });

    it('should include strength zone (80-90%)', () => {
      const zones = calculateTrainingZones(100);
      const strength = zones.find(z => z.zone === 'strength');
      expect(strength).toBeDefined();
      expect(strength?.minWeight).toBe(80);
      expect(strength?.maxWeight).toBe(90);
    });

    it('should include hypertrophy zone (65-75%)', () => {
      const zones = calculateTrainingZones(100);
      const hypertrophy = zones.find(z => z.zone === 'hypertrophy');
      expect(hypertrophy).toBeDefined();
      expect(hypertrophy?.minWeight).toBe(65);
      expect(hypertrophy?.maxWeight).toBe(75);
    });

    it('should include endurance zone (50-65%)', () => {
      const zones = calculateTrainingZones(100);
      const endurance = zones.find(z => z.zone === 'endurance');
      expect(endurance).toBeDefined();
      expect(endurance?.minWeight).toBe(50);
      expect(endurance?.maxWeight).toBe(65);
    });

    it('should calculate correct weights for 200kg 1RM', () => {
      const zones = calculateTrainingZones(200);
      const strength = zones.find(z => z.zone === 'strength');
      expect(strength?.minWeight).toBe(160);
      expect(strength?.maxWeight).toBe(180);
    });

    it('should throw error for zero or negative 1RM', () => {
      expect(() => calculateTrainingZones(0)).toThrow('1RM must be greater than 0');
      expect(() => calculateTrainingZones(-100)).toThrow('1RM must be greater than 0');
    });
  });

  describe('generatePercentageChart', () => {
    it('should return 11 percentage entries', () => {
      const chart = generatePercentageChart(100);
      expect(chart).toHaveLength(11);
    });

    it('should include 100% as the first entry', () => {
      const chart = generatePercentageChart(100);
      expect(chart[0].percentage).toBe(100);
      expect(chart[0].weight).toBe(100);
    });

    it('should include 50% as the last entry', () => {
      const chart = generatePercentageChart(100);
      const lastEntry = chart[chart.length - 1];
      expect(lastEntry.percentage).toBe(50);
      expect(lastEntry.weight).toBe(50);
    });

    it('should calculate correct weights for 200kg 1RM', () => {
      const chart = generatePercentageChart(200);
      expect(chart.find(e => e.percentage === 100)?.weight).toBe(200);
      expect(chart.find(e => e.percentage === 80)?.weight).toBe(160);
      expect(chart.find(e => e.percentage === 50)?.weight).toBe(100);
    });

    it('should include estimated rep ranges', () => {
      const chart = generatePercentageChart(100);
      expect(chart.find(e => e.percentage === 100)?.estimatedReps).toBe('1');
      expect(chart.find(e => e.percentage === 80)?.estimatedReps).toBe('7-8');
    });

    it('should throw error for zero or negative 1RM', () => {
      expect(() => generatePercentageChart(0)).toThrow('1RM must be greater than 0');
      expect(() => generatePercentageChart(-100)).toThrow('1RM must be greater than 0');
    });
  });

  describe('estimateRepsAtPercentage', () => {
    it('should return 1 rep at 100%', () => {
      const reps = estimateRepsAtPercentage(100);
      expect(reps).toBe(1);
    });

    it('should return higher reps at lower percentages', () => {
      const reps80 = estimateRepsAtPercentage(80);
      const reps60 = estimateRepsAtPercentage(60);
      expect(reps60).toBeGreaterThan(reps80);
    });

    it('should throw error for invalid percentage', () => {
      expect(() => estimateRepsAtPercentage(0)).toThrow('Percentage must be between 0 and 100');
      expect(() => estimateRepsAtPercentage(101)).toThrow('Percentage must be between 0 and 100');
      expect(() => estimateRepsAtPercentage(-50)).toThrow('Percentage must be between 0 and 100');
    });
  });

  describe('validateOneRepMaxWeight', () => {
    it('should accept valid weight in kg', () => {
      const result = validateOneRepMaxWeight(100, 'kg');
      expect(result.isValid).toBe(true);
    });

    it('should accept valid weight in lb', () => {
      const result = validateOneRepMaxWeight(225, 'lb');
      expect(result.isValid).toBe(true);
    });

    it('should reject zero weight', () => {
      const result = validateOneRepMaxWeight(0, 'kg');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('greater than 0');
    });

    it('should reject negative weight', () => {
      const result = validateOneRepMaxWeight(-100, 'kg');
      expect(result.isValid).toBe(false);
    });

    it('should reject weight exceeding max for kg', () => {
      const result = validateOneRepMaxWeight(501, 'kg');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('less than 500');
    });

    it('should reject weight exceeding max for lb', () => {
      const result = validateOneRepMaxWeight(1101, 'lb');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('less than 1100');
    });

    it('should reject non-numeric input', () => {
      const result = validateOneRepMaxWeight('abc', 'kg');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('valid number');
    });
  });

  describe('validateReps', () => {
    it('should accept valid reps', () => {
      const result = validateReps(5);
      expect(result.isValid).toBe(true);
    });

    it('should accept 1 rep', () => {
      const result = validateReps(1);
      expect(result.isValid).toBe(true);
    });

    it('should accept 30 reps', () => {
      const result = validateReps(30);
      expect(result.isValid).toBe(true);
    });

    it('should reject zero reps', () => {
      const result = validateReps(0);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('greater than 0');
    });

    it('should reject negative reps', () => {
      const result = validateReps(-5);
      expect(result.isValid).toBe(false);
    });

    it('should reject more than 30 reps', () => {
      const result = validateReps(31);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('30 or less');
    });

    it('should reject decimal reps', () => {
      const result = validateReps(5.5);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('whole number');
    });

    it('should reject non-numeric input', () => {
      const result = validateReps('abc');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('valid number');
    });
  });

  describe('processOneRepMaxCalculation', () => {
    it('should return complete result with all fields', () => {
      const values: OneRepMaxFormValues = {
        weight: 100,
        weightUnit: 'kg',
        reps: 5,
        formula: 'epley',
      };

      const result = processOneRepMaxCalculation(values);

      expect(result.oneRepMax).toBeDefined();
      expect(result.allFormulas).toBeDefined();
      expect(result.trainingZones).toBeDefined();
      expect(result.percentageChart).toBeDefined();
      expect(result.selectedFormula).toBe('epley');
      expect(result.weightUnit).toBe('kg');
    });

    it('should use selected formula for primary result', () => {
      const valuesEpley: OneRepMaxFormValues = {
        weight: 100,
        weightUnit: 'kg',
        reps: 5,
        formula: 'epley',
      };

      const valuesBrzycki: OneRepMaxFormValues = {
        weight: 100,
        weightUnit: 'kg',
        reps: 5,
        formula: 'brzycki',
      };

      const epleyResult = processOneRepMaxCalculation(valuesEpley);
      const brzyckiResult = processOneRepMaxCalculation(valuesBrzycki);

      expect(epleyResult.oneRepMax).not.toBe(brzyckiResult.oneRepMax);
      expect(epleyResult.selectedFormula).toBe('epley');
      expect(brzyckiResult.selectedFormula).toBe('brzycki');
    });

    it('should throw error for null values', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => processOneRepMaxCalculation(null as any)).toThrow('Form values are required');
    });

    it('should throw error for invalid weight', () => {
      const values: OneRepMaxFormValues = {
        weight: -100,
        weightUnit: 'kg',
        reps: 5,
        formula: 'epley',
      };

      expect(() => processOneRepMaxCalculation(values)).toThrow();
    });

    it('should throw error for invalid reps', () => {
      const values: OneRepMaxFormValues = {
        weight: 100,
        weightUnit: 'kg',
        reps: 50,
        formula: 'epley',
      };

      expect(() => processOneRepMaxCalculation(values)).toThrow();
    });

    it('should include correct training zones in result', () => {
      const values: OneRepMaxFormValues = {
        weight: 100,
        weightUnit: 'kg',
        reps: 5,
        formula: 'epley',
      };

      const result = processOneRepMaxCalculation(values);

      expect(result.trainingZones).toHaveLength(3);
      expect(result.trainingZones.find(z => z.zone === 'strength')).toBeDefined();
      expect(result.trainingZones.find(z => z.zone === 'hypertrophy')).toBeDefined();
      expect(result.trainingZones.find(z => z.zone === 'endurance')).toBeDefined();
    });

    it('should include correct percentage chart in result', () => {
      const values: OneRepMaxFormValues = {
        weight: 100,
        weightUnit: 'kg',
        reps: 5,
        formula: 'epley',
      };

      const result = processOneRepMaxCalculation(values);

      expect(result.percentageChart).toHaveLength(11);
      expect(result.percentageChart[0].percentage).toBe(100);
    });
  });

  describe('calculateAverageOneRepMax', () => {
    it('should return average of all formulas', () => {
      const average = calculateAverageOneRepMax(100, 5);
      const allFormulas = calculateAllFormulas(100, 5);
      const expectedAverage =
        allFormulas.reduce((sum, f) => sum + f.oneRepMax, 0) / allFormulas.length;

      expect(average).toBeCloseTo(expectedAverage, 1);
    });

    it('should throw error for invalid inputs', () => {
      expect(() => calculateAverageOneRepMax(0, 5)).toThrow();
    });
  });

  describe('getWeightAtPercentage', () => {
    it('should calculate correct weight at 100%', () => {
      const weight = getWeightAtPercentage(100, 100);
      expect(weight).toBe(100);
    });

    it('should calculate correct weight at 80%', () => {
      const weight = getWeightAtPercentage(100, 80);
      expect(weight).toBe(80);
    });

    it('should calculate correct weight at 50%', () => {
      const weight = getWeightAtPercentage(200, 50);
      expect(weight).toBe(100);
    });

    it('should round to 1 decimal place', () => {
      const weight = getWeightAtPercentage(100, 85);
      expect(weight).toBe(85);
    });

    it('should throw error for invalid 1RM', () => {
      expect(() => getWeightAtPercentage(0, 80)).toThrow('1RM must be greater than 0');
      expect(() => getWeightAtPercentage(-100, 80)).toThrow('1RM must be greater than 0');
    });

    it('should throw error for invalid percentage', () => {
      expect(() => getWeightAtPercentage(100, 0)).toThrow('Percentage must be between 0 and 100');
      expect(() => getWeightAtPercentage(100, 101)).toThrow('Percentage must be between 0 and 100');
    });
  });
});

describe('One Rep Max Real-World Examples', () => {
  describe('Bench Press examples', () => {
    it('should calculate 1RM for intermediate lifter', () => {
      // 185 lbs x 5 reps
      const result = calculateEpley(185, 5);
      expect(result).toBeCloseTo(215.8, 0);
    });

    it('should calculate 1RM for advanced lifter', () => {
      // 315 lbs x 3 reps
      const result = calculateEpley(315, 3);
      expect(result).toBeCloseTo(346.5, 0);
    });
  });

  describe('Squat examples', () => {
    it('should calculate 1RM for beginner', () => {
      // 135 lbs x 8 reps
      const result = calculateEpley(135, 8);
      expect(result).toBeCloseTo(171, 0);
    });

    it('should calculate 1RM for advanced lifter', () => {
      // 405 lbs x 5 reps
      const result = calculateEpley(405, 5);
      expect(result).toBeCloseTo(472.5, 0);
    });
  });

  describe('Deadlift examples', () => {
    it('should calculate 1RM for intermediate lifter', () => {
      // 315 lbs x 5 reps
      const result = calculateBrzycki(315, 5);
      expect(result).toBeCloseTo(354.4, 0);
    });
  });

  describe('Formula comparison', () => {
    it('all formulas should give similar results for low reps', () => {
      const weight = 225;
      const reps = 3;

      const epley = calculateEpley(weight, reps);
      const brzycki = calculateBrzycki(weight, reps);
      const lombardi = calculateLombardi(weight, reps);

      // All should be within 10% of each other for low reps
      const average = (epley + brzycki + lombardi) / 3;
      expect(Math.abs(epley - average) / average).toBeLessThan(0.1);
      expect(Math.abs(brzycki - average) / average).toBeLessThan(0.1);
      expect(Math.abs(lombardi - average) / average).toBeLessThan(0.1);
    });

    it('formulas diverge more at higher rep ranges', () => {
      const weight = 100;
      const reps = 15;

      const epley = calculateEpley(weight, reps);
      const lombardi = calculateLombardi(weight, reps);

      // Lombardi tends to give lower estimates at higher reps
      expect(epley).toBeGreaterThan(lombardi);
    });
  });
});

describe('One Rep Max Edge Cases', () => {
  it('should handle 1 rep correctly for all formulas', () => {
    const weight = 100;
    expect(calculateEpley(weight, 1)).toBe(weight);
    expect(calculateBrzycki(weight, 1)).toBe(weight);
    expect(calculateLombardi(weight, 1)).toBe(weight);
  });

  it('should handle very light weights', () => {
    const result = calculateEpley(5, 10);
    expect(result).toBeCloseTo(6.67, 1);
  });

  it('should handle very heavy weights', () => {
    const result = calculateEpley(500, 3);
    expect(result).toBeCloseTo(550, 0);
  });

  it('should handle boundary reps values', () => {
    // 1 rep - minimum
    expect(() => calculateEpley(100, 1)).not.toThrow();

    // 30 reps - maximum
    expect(() => calculateEpley(100, 30)).not.toThrow();
  });

  it('should calculate training zones for edge case 1RMs', () => {
    // Very low 1RM
    const lowZones = calculateTrainingZones(20);
    expect(lowZones[0].minWeight).toBe(16); // 80% of 20

    // Very high 1RM
    const highZones = calculateTrainingZones(500);
    expect(highZones[0].minWeight).toBe(400); // 80% of 500
  });
});
