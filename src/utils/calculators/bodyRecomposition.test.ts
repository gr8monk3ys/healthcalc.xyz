import { describe, it, expect } from 'vitest';
import {
  calculateBodyRecomposition,
  estimateMonthlyMuscleGain,
  estimateWeeklyFatLoss,
  generateRecommendation,
} from './bodyRecomposition';
import { BodyRecompFormValues } from '@/types/bodyRecomposition';

describe('Body Recomposition Calculation', () => {
  describe('estimateMonthlyMuscleGain', () => {
    it('should return higher gains for beginners', () => {
      const beginnerMale = estimateMonthlyMuscleGain('beginner', 'male');
      const intermediateMale = estimateMonthlyMuscleGain('intermediate', 'male');
      const advancedMale = estimateMonthlyMuscleGain('advanced', 'male');

      expect(beginnerMale).toBeGreaterThan(intermediateMale);
      expect(intermediateMale).toBeGreaterThan(advancedMale);
    });

    it('should return lower gains for females', () => {
      const beginnerMale = estimateMonthlyMuscleGain('beginner', 'male');
      const beginnerFemale = estimateMonthlyMuscleGain('beginner', 'female');

      expect(beginnerMale).toBeGreaterThan(beginnerFemale);
    });

    it('should return realistic beginner male gains', () => {
      const gain = estimateMonthlyMuscleGain('beginner', 'male');
      expect(gain).toBeCloseTo(1.5, 1);
    });

    it('should return realistic advanced female gains', () => {
      const gain = estimateMonthlyMuscleGain('advanced', 'female');
      expect(gain).toBeCloseTo(0.1875, 4);
    });
  });

  describe('estimateWeeklyFatLoss', () => {
    it('should calculate fat loss from deficit correctly', () => {
      // 3500 calorie weekly deficit = 1 lb fat loss
      const loss = estimateWeeklyFatLoss(-3500);
      expect(loss).toBeCloseTo(1, 1);
    });

    it('should handle smaller deficits', () => {
      // 1750 calorie weekly deficit = 0.5 lb fat loss
      const loss = estimateWeeklyFatLoss(-1750);
      expect(loss).toBeCloseTo(0.5, 1);
    });

    it('should return positive value even for negative deficit', () => {
      const loss = estimateWeeklyFatLoss(-3500);
      expect(loss).toBeGreaterThan(0);
    });

    it('should handle large deficits', () => {
      const loss = estimateWeeklyFatLoss(-7000);
      expect(loss).toBeCloseTo(2, 1);
    });
  });

  describe('generateRecommendation', () => {
    it('should generate recommendation for lose-fat-build-muscle goal', () => {
      const rec = generateRecommendation('lose-fat-build-muscle', 'beginner', 20);
      expect(rec).toContain('progressive strength training');
      expect(rec).toContain('compound movements');
    });

    it('should adjust for high body fat', () => {
      const rec = generateRecommendation('lose-fat-build-muscle', 'beginner', 30);
      expect(rec).toContain('faster fat loss');
    });

    it('should generate recommendation for maintain-build-muscle goal', () => {
      const rec = generateRecommendation('maintain-build-muscle', 'intermediate', 15);
      expect(rec).toContain('Maintain current body composition');
    });

    it('should warn about aggressive cuts at low body fat', () => {
      const rec = generateRecommendation('aggressive-cut', 'advanced', 12);
      expect(rec).toContain('Warning');
      expect(rec).toContain('muscle loss');
    });

    it('should provide beginner-specific advice', () => {
      const rec = generateRecommendation('maintain-build-muscle', 'beginner', 18);
      expect(rec).toContain('beginner');
      expect(rec).toContain('form and consistency');
    });
  });

  describe('calculateBodyRecomposition', () => {
    const baseFormValues: BodyRecompFormValues = {
      age: 30,
      gender: 'male',
      weight: 180,
      weightUnit: 'lb',
      heightCm: 0,
      heightFt: 6,
      heightIn: 0,
      heightUnit: 'ft',
      activityLevel: 'moderately_active',
      bodyFatPercentage: 20,
      trainingExperience: 'intermediate',
      goal: 'lose-fat-build-muscle',
      useMetric: false,
    };

    describe('Basic Calculations', () => {
      it('should calculate recomp for typical male', () => {
        const result = calculateBodyRecomposition(baseFormValues);

        expect(result.dailyCalories).toBeGreaterThan(1500);
        expect(result.dailyCalories).toBeLessThan(4000);
        expect(result.proteinGrams).toBeCloseTo(180, 0); // 1g per lb
        expect(result.fatGrams).toBeGreaterThan(0);
        expect(result.carbGrams).toBeGreaterThan(0);
      });

      it('should calculate recomp for typical female', () => {
        const femaleValues: BodyRecompFormValues = {
          ...baseFormValues,
          gender: 'female',
          weight: 140,
          heightFt: 5,
          heightIn: 5,
        };

        const result = calculateBodyRecomposition(femaleValues);

        expect(result.dailyCalories).toBeGreaterThan(1200);
        expect(result.dailyCalories).toBeLessThan(3000);
        expect(result.proteinGrams).toBeCloseTo(140, 0);
      });

      it('should handle metric units', () => {
        const metricValues: BodyRecompFormValues = {
          ...baseFormValues,
          weight: 80,
          weightUnit: 'kg',
          heightCm: 180,
          heightFt: 0,
          heightIn: 0,
          heightUnit: 'cm',
          useMetric: true,
        };

        const result = calculateBodyRecomposition(metricValues);

        expect(result.dailyCalories).toBeGreaterThan(1500);
        expect(result.proteinGrams).toBeGreaterThan(150); // ~176 lbs
      });
    });

    describe('Goal-Based Calculations', () => {
      it('should apply correct surplus/deficit for lose-fat-build-muscle', () => {
        const result = calculateBodyRecomposition(baseFormValues);

        // Training day should be higher than rest day
        expect(result.trainingDayCalories).toBeGreaterThan(result.restDayCalories);

        // Should be roughly +10% and -15% from TDEE
        const ratio = result.trainingDayCalories / result.restDayCalories;
        expect(ratio).toBeGreaterThan(1.2);
        expect(ratio).toBeLessThan(1.35);
      });

      it('should apply correct surplus for maintain-build-muscle', () => {
        const maintainValues: BodyRecompFormValues = {
          ...baseFormValues,
          goal: 'maintain-build-muscle',
        };

        const result = calculateBodyRecomposition(maintainValues);

        // Training day should be significantly higher
        expect(result.trainingDayCalories).toBeGreaterThan(result.restDayCalories);

        // Training day should be ~15% above rest day (maintenance)
        const ratio = result.trainingDayCalories / result.restDayCalories;
        expect(ratio).toBeGreaterThan(1.1);
        expect(ratio).toBeLessThan(1.2);
      });

      it('should apply correct deficit for aggressive-cut', () => {
        const cutValues: BodyRecompFormValues = {
          ...baseFormValues,
          goal: 'aggressive-cut',
        };

        const result = calculateBodyRecomposition(cutValues);

        // Rest day should be much lower
        expect(result.trainingDayCalories).toBeGreaterThan(result.restDayCalories);

        // Rest day should be ~75% of training day
        const ratio = result.restDayCalories / result.trainingDayCalories;
        expect(ratio).toBeGreaterThan(0.7);
        expect(ratio).toBeLessThan(0.8);
      });
    });

    describe('Macro Calculations', () => {
      it('should set protein to 1g per lb bodyweight', () => {
        const result = calculateBodyRecomposition(baseFormValues);
        expect(result.proteinGrams).toBeCloseTo(180, 0);
      });

      it('should set fat to ~25% of calories', () => {
        const result = calculateBodyRecomposition(baseFormValues);
        const fatCalories = result.fatGrams * 9;
        const fatPercentage = fatCalories / result.dailyCalories;

        expect(fatPercentage).toBeGreaterThan(0.23);
        expect(fatPercentage).toBeLessThan(0.27);
      });

      it('should calculate carbs from remaining calories', () => {
        const result = calculateBodyRecomposition(baseFormValues);

        const totalCalories = result.proteinGrams * 4 + result.fatGrams * 9 + result.carbGrams * 4;

        // Should be within rounding error
        expect(Math.abs(totalCalories - result.dailyCalories)).toBeLessThan(50);
      });

      it('should have positive carbs', () => {
        const result = calculateBodyRecomposition(baseFormValues);
        expect(result.carbGrams).toBeGreaterThan(0);
      });
    });

    describe('Estimates and Timeline', () => {
      it('should estimate fat loss for deficit goals', () => {
        const result = calculateBodyRecomposition(baseFormValues);
        expect(result.estimatedWeeklyFatLoss).toBeGreaterThan(0);
        expect(result.estimatedWeeklyFatLoss).toBeLessThan(3); // Realistic limit
      });

      it('should not estimate fat loss for bulk', () => {
        const bulkValues: BodyRecompFormValues = {
          ...baseFormValues,
          goal: 'maintain-build-muscle',
        };

        const result = calculateBodyRecomposition(bulkValues);
        expect(result.estimatedWeeklyFatLoss).toBe(0);
      });

      it('should estimate muscle gain based on experience', () => {
        const beginnerValues: BodyRecompFormValues = {
          ...baseFormValues,
          trainingExperience: 'beginner',
        };

        const advancedValues: BodyRecompFormValues = {
          ...baseFormValues,
          trainingExperience: 'advanced',
        };

        const beginnerResult = calculateBodyRecomposition(beginnerValues);
        const advancedResult = calculateBodyRecomposition(advancedValues);

        expect(beginnerResult.estimatedMonthlyMuscleGain).toBeGreaterThan(
          advancedResult.estimatedMonthlyMuscleGain
        );
      });

      it('should set appropriate timeline', () => {
        const result = calculateBodyRecomposition(baseFormValues);
        expect(result.timelineWeeks).toBeGreaterThan(0);
        expect(result.timelineWeeks).toBeLessThan(20);
      });

      it('should set shorter timeline for aggressive cut', () => {
        const cutValues: BodyRecompFormValues = {
          ...baseFormValues,
          goal: 'aggressive-cut',
        };

        const recompValues: BodyRecompFormValues = {
          ...baseFormValues,
          goal: 'lose-fat-build-muscle',
        };

        const cutResult = calculateBodyRecomposition(cutValues);
        const recompResult = calculateBodyRecomposition(recompValues);

        expect(cutResult.timelineWeeks).toBeLessThan(recompResult.timelineWeeks);
      });
    });

    describe('Activity Level Impact', () => {
      it('should increase calories for very active individuals', () => {
        const sedentaryValues: BodyRecompFormValues = {
          ...baseFormValues,
          activityLevel: 'sedentary',
        };

        const veryActiveValues: BodyRecompFormValues = {
          ...baseFormValues,
          activityLevel: 'very_active',
        };

        const sedentaryResult = calculateBodyRecomposition(sedentaryValues);
        const activeResult = calculateBodyRecomposition(veryActiveValues);

        expect(activeResult.dailyCalories).toBeGreaterThan(sedentaryResult.dailyCalories);
        expect(activeResult.trainingDayCalories).toBeGreaterThan(
          sedentaryResult.trainingDayCalories
        );
      });
    });

    describe('Edge Cases', () => {
      it('should handle very light individuals', () => {
        const lightValues: BodyRecompFormValues = {
          ...baseFormValues,
          weight: 110,
          heightFt: 5,
          heightIn: 2,
        };

        const result = calculateBodyRecomposition(lightValues);
        expect(result.dailyCalories).toBeGreaterThan(1000);
        expect(result.proteinGrams).toBeCloseTo(110, 0);
      });

      it('should handle very heavy individuals', () => {
        const heavyValues: BodyRecompFormValues = {
          ...baseFormValues,
          weight: 280,
          heightFt: 6,
          heightIn: 4,
        };

        const result = calculateBodyRecomposition(heavyValues);
        expect(result.dailyCalories).toBeGreaterThan(2000);
        expect(result.proteinGrams).toBeCloseTo(280, 0);
      });

      it('should handle high body fat percentage', () => {
        const highBfValues: BodyRecompFormValues = {
          ...baseFormValues,
          bodyFatPercentage: 35,
        };

        const result = calculateBodyRecomposition(highBfValues);
        expect(result.recommendation).toContain('faster fat loss');
      });

      it('should handle low body fat percentage', () => {
        const lowBfValues: BodyRecompFormValues = {
          ...baseFormValues,
          bodyFatPercentage: 10,
          goal: 'aggressive-cut',
        };

        const result = calculateBodyRecomposition(lowBfValues);
        expect(result.recommendation).toContain('Warning');
      });
    });

    describe('Recommendation Quality', () => {
      it('should include recommendation text', () => {
        const result = calculateBodyRecomposition(baseFormValues);
        expect(result.recommendation).toBeTruthy();
        expect(result.recommendation.length).toBeGreaterThan(50);
      });

      it('should customize recommendation for experience', () => {
        const beginnerValues: BodyRecompFormValues = {
          ...baseFormValues,
          trainingExperience: 'beginner',
          goal: 'maintain-build-muscle',
        };

        const result = calculateBodyRecomposition(beginnerValues);
        expect(result.recommendation).toContain('beginner');
      });
    });
  });
});
