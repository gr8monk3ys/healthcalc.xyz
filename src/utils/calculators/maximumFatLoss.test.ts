/**
 * Tests for Maximum Fat Loss Calculator
 * Based on Alpert S.S. (2005) research
 */

import { describe, it, expect } from 'vitest';
import {
  calculateMaximumFatLoss,
  getBodyFatCategory,
  formatBodyFatWithContext,
} from './maximumFatLoss';
import type { MaximumFatLossFormData } from '@/types/maximumFatLoss';
import {
  FAT_OXIDATION_RATE_PER_LB,
  PROTEIN_RECOMMENDATIONS,
  MIN_BODY_FAT_PERCENTAGE,
  ABSOLUTE_MIN_CALORIES,
  CALORIES_PER_KG_FAT,
  PROJECTION_WEEKS,
} from '@/constants/maximumFatLoss';

describe('calculateMaximumFatLoss', () => {
  const baseFormData: MaximumFatLossFormData = {
    gender: 'male',
    age: 30,
    heightCm: 180,
    weightKg: 90,
    activityLevel: 'moderately_active',
    bodyFatPercentage: 20,
  };

  describe('Basic Calculations', () => {
    it('should calculate maximum fat loss for male', () => {
      const result = calculateMaximumFatLoss(baseFormData);

      expect(result.currentWeightKg).toBe(90);
      expect(result.bodyFatPercentage).toBe(20);
      expect(result.tdee).toBeGreaterThan(2500);
      expect(result.tdee).toBeLessThan(3000);
      expect(result.bmr).toBeGreaterThan(1800);
      expect(result.bmr).toBeLessThan(2100);
    });

    it('should calculate maximum fat loss for female', () => {
      const femaleData: MaximumFatLossFormData = {
        ...baseFormData,
        gender: 'female',
        weightKg: 70,
        bodyFatPercentage: 25,
      };

      const result = calculateMaximumFatLoss(femaleData);

      expect(result.currentWeightKg).toBe(70);
      expect(result.bodyFatPercentage).toBe(25);
      expect(result.tdee).toBeGreaterThan(2000);
      expect(result.tdee).toBeLessThan(2500);
      expect(result.bmr).toBeGreaterThan(1400);
      expect(result.bmr).toBeLessThan(1700);
    });
  });

  describe('Body Composition Calculations', () => {
    it('should calculate fat mass and lean mass correctly', () => {
      const result = calculateMaximumFatLoss(baseFormData);

      // 90kg at 20% body fat = 18kg fat mass, 72kg lean mass
      expect(result.fatMassKg).toBeCloseTo(18, 1);
      expect(result.leanMassKg).toBeCloseTo(72, 1);
      expect(result.fatMassLbs).toBeCloseTo(39.7, 0);
      expect(result.leanMassLbs).toBeCloseTo(158.7, 0);
    });

    it('should calculate body composition for high body fat', () => {
      const highBodyFatData: MaximumFatLossFormData = {
        ...baseFormData,
        weightKg: 100,
        bodyFatPercentage: 30,
      };

      const result = calculateMaximumFatLoss(highBodyFatData);

      // 100kg at 30% = 30kg fat, 70kg lean
      expect(result.fatMassKg).toBeCloseTo(30, 1);
      expect(result.leanMassKg).toBeCloseTo(70, 1);
    });

    it('should calculate body composition for low body fat', () => {
      const lowBodyFatData: MaximumFatLossFormData = {
        ...baseFormData,
        weightKg: 75,
        bodyFatPercentage: 10,
      };

      const result = calculateMaximumFatLoss(lowBodyFatData);

      // 75kg at 10% = 7.5kg fat, 67.5kg lean
      expect(result.fatMassKg).toBeCloseTo(7.5, 1);
      expect(result.leanMassKg).toBeCloseTo(67.5, 1);
    });
  });

  describe('Maximum Deficit Calculations (Alpert 2005)', () => {
    it('should calculate maximum deficit based on fat mass', () => {
      const result = calculateMaximumFatLoss(baseFormData);

      // 18kg fat = 39.7 lbs
      // Max deficit = 39.7 * 26.5 = ~1052 kcal/day
      const expectedDeficit = result.fatMassLbs * FAT_OXIDATION_RATE_PER_LB;
      expect(result.maximumDeficit).toBeCloseTo(expectedDeficit, -1);
      expect(result.maximumDeficit).toBeGreaterThan(900);
      expect(result.maximumDeficit).toBeLessThan(1200);
    });

    it('should calculate larger deficit for higher body fat', () => {
      const highBodyFatData: MaximumFatLossFormData = {
        ...baseFormData,
        weightKg: 100,
        bodyFatPercentage: 30,
      };

      const result = calculateMaximumFatLoss(highBodyFatData);

      // More fat mass = larger safe deficit
      expect(result.maximumDeficit).toBeGreaterThan(1200);
      expect(result.maximumDeficit).toBeLessThan(2000);
    });

    it('should calculate smaller deficit for lower body fat', () => {
      const lowBodyFatData: MaximumFatLossFormData = {
        ...baseFormData,
        weightKg: 75,
        bodyFatPercentage: 10,
      };

      const result = calculateMaximumFatLoss(lowBodyFatData);

      // Less fat mass = smaller safe deficit
      expect(result.maximumDeficit).toBeGreaterThan(300);
      expect(result.maximumDeficit).toBeLessThan(600);
    });

    it('should apply minimum calorie safety limit for males', () => {
      const extremeData: MaximumFatLossFormData = {
        gender: 'male',
        age: 25,
        heightCm: 165,
        weightKg: 60,
        activityLevel: 'sedentary',
        bodyFatPercentage: 12,
      };

      const result = calculateMaximumFatLoss(extremeData);

      expect(result.minimumCalories).toBeGreaterThanOrEqual(ABSOLUTE_MIN_CALORIES.male);
    });

    it('should apply minimum calorie safety limit for females', () => {
      const extremeData: MaximumFatLossFormData = {
        gender: 'female',
        age: 25,
        heightCm: 155,
        weightKg: 50,
        activityLevel: 'sedentary',
        bodyFatPercentage: 18,
      };

      const result = calculateMaximumFatLoss(extremeData);

      expect(result.minimumCalories).toBeGreaterThanOrEqual(ABSOLUTE_MIN_CALORIES.female);
    });
  });

  describe('Minimum Calories Calculation', () => {
    it('should calculate minimum calories as TDEE minus maximum deficit', () => {
      const result = calculateMaximumFatLoss(baseFormData);

      expect(result.minimumCalories).toBeCloseTo(result.tdee - result.maximumDeficit, -1);
    });

    it('should not let minimum calories go below safety limit', () => {
      const smallPersonData: MaximumFatLossFormData = {
        gender: 'female',
        age: 30,
        heightCm: 155,
        weightKg: 55,
        activityLevel: 'sedentary',
        bodyFatPercentage: 20,
      };

      const result = calculateMaximumFatLoss(smallPersonData);

      expect(result.minimumCalories).toBeGreaterThanOrEqual(ABSOLUTE_MIN_CALORIES.female);
      if (result.warnings.length > 0) {
        expect(result.warnings.some(w => w.includes('safe minimum'))).toBe(true);
      }
    });
  });

  describe('Weekly Fat Loss Projections', () => {
    it('should calculate expected weekly fat loss in kg', () => {
      const result = calculateMaximumFatLoss(baseFormData);

      // Weekly deficit = daily deficit * 7
      const weeklyDeficit = result.maximumDeficit * 7;
      const expectedLoss = weeklyDeficit / CALORIES_PER_KG_FAT;

      expect(result.expectedWeeklyFatLoss).toBeCloseTo(expectedLoss, 2);
      expect(result.expectedWeeklyFatLoss).toBeGreaterThan(0);
      expect(result.expectedWeeklyFatLoss).toBeLessThan(1.5); // Safe maximum
    });

    it('should calculate expected weekly fat loss in lbs', () => {
      const result = calculateMaximumFatLoss(baseFormData);

      // Should match kg conversion
      const expectedLbs = result.expectedWeeklyFatLoss * 2.20462;
      expect(result.expectedWeeklyFatLossLbs).toBeCloseTo(expectedLbs, 1); // 1 decimal precision
    });

    it('should have reasonable weekly fat loss rate', () => {
      const result = calculateMaximumFatLoss(baseFormData);

      // For 20% body fat, weekly loss should be moderate
      expect(result.expectedWeeklyFatLoss).toBeGreaterThan(0.5);
      expect(result.expectedWeeklyFatLoss).toBeLessThan(1.2);
    });
  });

  describe('Protein Recommendations', () => {
    it('should calculate minimum protein based on lean mass', () => {
      const result = calculateMaximumFatLoss(baseFormData);

      const expectedMinProtein = result.leanMassKg * PROTEIN_RECOMMENDATIONS.minimum;
      expect(result.recommendations.minimumProtein).toBeCloseTo(expectedMinProtein, 0);
    });

    it('should calculate optimal protein based on lean mass', () => {
      const result = calculateMaximumFatLoss(baseFormData);

      const expectedOptimalProtein = result.leanMassKg * PROTEIN_RECOMMENDATIONS.optimal;
      expect(result.recommendations.optimalProtein).toBeCloseTo(expectedOptimalProtein, 0);
      expect(result.proteinRecommendation).toBe(result.recommendations.optimalProtein);
    });

    it('should recommend higher protein for leaner individuals', () => {
      const leanData: MaximumFatLossFormData = {
        ...baseFormData,
        weightKg: 75,
        bodyFatPercentage: 10,
      };

      const averageData: MaximumFatLossFormData = {
        ...baseFormData,
        weightKg: 90,
        bodyFatPercentage: 25,
      };

      const leanResult = calculateMaximumFatLoss(leanData);
      const averageResult = calculateMaximumFatLoss(averageData);

      // More lean mass = more protein needed
      const leanProteinPerKg = leanResult.proteinRecommendation / leanResult.currentWeightKg;
      const averageProteinPerKg = averageResult.proteinRecommendation / averageResult.currentWeightKg;

      expect(leanProteinPerKg).toBeGreaterThan(averageProteinPerKg);
    });
  });

  describe('Water and Recovery Recommendations', () => {
    it('should calculate water intake based on body weight', () => {
      const result = calculateMaximumFatLoss(baseFormData);

      // 2.5 base + 90 * 0.033 = ~5.47L
      expect(result.recommendations.waterLiters).toBeGreaterThan(4.5);
      expect(result.recommendations.waterLiters).toBeLessThan(6);
    });

    it('should recommend adequate sleep', () => {
      const result = calculateMaximumFatLoss(baseFormData);

      expect(result.recommendations.sleepHours).toBe(8);
    });

    it('should recommend strength training frequency', () => {
      const result = calculateMaximumFatLoss(baseFormData);

      expect(result.recommendations.strengthTrainingDays).toBe(3);
    });
  });

  describe('12-Week Projections', () => {
    it('should generate projections up to 12 weeks', () => {
      const result = calculateMaximumFatLoss(baseFormData);

      expect(result.projections.length).toBeGreaterThan(0);
      expect(result.projections[0].weeks).toBe(0);

      // Check that projections don't exceed 12 weeks
      const maxWeeks = Math.max(...result.projections.map(p => p.weeks));
      expect(maxWeeks).toBeLessThanOrEqual(PROJECTION_WEEKS);
    });

    it('should show decreasing weight in projections', () => {
      const result = calculateMaximumFatLoss(baseFormData);

      // Weight should decrease over time (or at least not increase)
      for (let i = 1; i < result.projections.length; i++) {
        expect(result.projections[i].projectedWeightKg).toBeLessThanOrEqual(
          result.projections[i - 1].projectedWeightKg
        );
      }
    });

    it('should show decreasing body fat percentage in projections', () => {
      const result = calculateMaximumFatLoss(baseFormData);

      // Body fat % should decrease over time
      for (let i = 1; i < result.projections.length; i++) {
        expect(result.projections[i].projectedBodyFatPercentage).toBeLessThan(
          result.projections[i - 1].projectedBodyFatPercentage + 0.1
        );
      }
    });

    it('should adjust deficit as fat mass decreases', () => {
      const result = calculateMaximumFatLoss(baseFormData);

      // Deficit should generally decrease over time as fat mass decreases
      const firstDeficit = result.projections[0].adjustedDeficit;
      const lastDeficit = result.projections[result.projections.length - 1].adjustedDeficit;

      expect(lastDeficit).toBeLessThanOrEqual(firstDeficit);
    });

    it('should stop projections before reaching minimum body fat', () => {
      const lowBodyFatData: MaximumFatLossFormData = {
        ...baseFormData,
        bodyFatPercentage: 12,
      };

      const result = calculateMaximumFatLoss(lowBodyFatData);
      const minBodyFat = MIN_BODY_FAT_PERCENTAGE.male;

      // All projections should stay above minimum body fat
      result.projections.forEach(projection => {
        expect(projection.projectedBodyFatPercentage).toBeGreaterThanOrEqual(minBodyFat);
      });
    });
  });

  describe('Safety Warnings', () => {
    it('should warn about very low body fat (within 2% of minimum)', () => {
      const veryLowBodyFatData: MaximumFatLossFormData = {
        ...baseFormData,
        bodyFatPercentage: 6, // Male minimum is 5%
      };

      const result = calculateMaximumFatLoss(veryLowBodyFatData);

      expect(result.warnings.some(w => w.includes('very low'))).toBe(true);
    });

    it('should warn about low body fat (within 5% of minimum)', () => {
      const lowBodyFatData: MaximumFatLossFormData = {
        ...baseFormData,
        bodyFatPercentage: 9, // Male minimum is 5%
      };

      const result = calculateMaximumFatLoss(lowBodyFatData);

      expect(result.warnings.some(w => w.includes('approaching'))).toBe(true);
    });

    it('should warn about aggressive deficit (>1000 cal)', () => {
      const highBodyFatData: MaximumFatLossFormData = {
        ...baseFormData,
        weightKg: 110,
        bodyFatPercentage: 35,
      };

      const result = calculateMaximumFatLoss(highBodyFatData);

      if (result.maximumDeficit > 1000) {
        expect(result.warnings.some(w => w.includes('aggressive'))).toBe(true);
      }
    });

    it('should warn when calorie adjustment is needed', () => {
      const smallPersonData: MaximumFatLossFormData = {
        gender: 'female',
        age: 30,
        heightCm: 150,
        weightKg: 50,
        activityLevel: 'sedentary',
        bodyFatPercentage: 20,
      };

      const result = calculateMaximumFatLoss(smallPersonData);

      if (result.minimumCalories === ABSOLUTE_MIN_CALORIES.female) {
        expect(result.warnings.some(w => w.includes('adjusted'))).toBe(true);
      }
    });

    it('should provide context for high body fat males', () => {
      const highBodyFatData: MaximumFatLossFormData = {
        ...baseFormData,
        bodyFatPercentage: 28,
      };

      const result = calculateMaximumFatLoss(highBodyFatData);

      expect(result.warnings.some(w => w.includes('higher body fat'))).toBe(true);
    });

    it('should provide context for high body fat females', () => {
      const highBodyFatData: MaximumFatLossFormData = {
        gender: 'female',
        age: 30,
        heightCm: 165,
        weightKg: 75,
        activityLevel: 'moderately_active',
        bodyFatPercentage: 35,
      };

      const result = calculateMaximumFatLoss(highBodyFatData);

      expect(result.warnings.some(w => w.includes('higher body fat'))).toBe(true);
    });

    it('should warn about very small deficit', () => {
      const lowBodyFatData: MaximumFatLossFormData = {
        ...baseFormData,
        weightKg: 70,
        bodyFatPercentage: 8,
      };

      const result = calculateMaximumFatLoss(lowBodyFatData);

      if (result.maximumDeficit < 250) {
        expect(result.warnings.some(w => w.includes('very small'))).toBe(true);
      }
    });
  });

  describe('Activity Level Impact', () => {
    it('should calculate different TDEEs for sedentary vs active', () => {
      const sedentaryData: MaximumFatLossFormData = {
        ...baseFormData,
        activityLevel: 'sedentary',
      };

      const veryActiveData: MaximumFatLossFormData = {
        ...baseFormData,
        activityLevel: 'very_active',
      };

      const sedentaryResult = calculateMaximumFatLoss(sedentaryData);
      const veryActiveResult = calculateMaximumFatLoss(veryActiveData);

      expect(veryActiveResult.tdee).toBeGreaterThan(sedentaryResult.tdee);
      expect(veryActiveResult.minimumCalories).toBeGreaterThan(sedentaryResult.minimumCalories);
    });

    it('should handle all activity levels correctly', () => {
      const activityLevels: Array<MaximumFatLossFormData['activityLevel']> = [
        'sedentary',
        'lightly_active',
        'moderately_active',
        'very_active',
        'extremely_active',
      ];

      const results = activityLevels.map(level =>
        calculateMaximumFatLoss({ ...baseFormData, activityLevel: level })
      );

      // TDEE should increase with activity level
      for (let i = 1; i < results.length; i++) {
        expect(results[i].tdee).toBeGreaterThan(results[i - 1].tdee);
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle very heavy individuals', () => {
      const heavyData: MaximumFatLossFormData = {
        ...baseFormData,
        weightKg: 150,
        bodyFatPercentage: 40,
      };

      const result = calculateMaximumFatLoss(heavyData);

      expect(result.fatMassKg).toBe(60);
      expect(result.leanMassKg).toBe(90);
      expect(result.maximumDeficit).toBeGreaterThan(1500);
    });

    it('should handle very light individuals', () => {
      const lightData: MaximumFatLossFormData = {
        gender: 'female',
        age: 25,
        heightCm: 155,
        weightKg: 50,
        activityLevel: 'lightly_active',
        bodyFatPercentage: 22,
      };

      const result = calculateMaximumFatLoss(lightData);

      expect(result.fatMassKg).toBe(11);
      expect(result.leanMassKg).toBe(39);
      expect(result.minimumCalories).toBeGreaterThanOrEqual(ABSOLUTE_MIN_CALORIES.female);
    });

    it('should handle elderly users', () => {
      const elderlyData: MaximumFatLossFormData = {
        ...baseFormData,
        age: 70,
      };

      const result = calculateMaximumFatLoss(elderlyData);

      expect(result.bmr).toBeLessThan(baseFormData.age === 30 ? 2000 : Infinity);
      expect(result.tdee).toBeGreaterThan(1800);
    });

    it('should handle young adults', () => {
      const youngData: MaximumFatLossFormData = {
        ...baseFormData,
        age: 18,
      };

      const result = calculateMaximumFatLoss(youngData);

      expect(result.bmr).toBeGreaterThan(1800);
      expect(result.tdee).toBeGreaterThan(2500);
    });

    it('should handle very tall people', () => {
      const tallData: MaximumFatLossFormData = {
        ...baseFormData,
        heightCm: 200,
        weightKg: 100,
      };

      const result = calculateMaximumFatLoss(tallData);

      expect(result.bmr).toBeGreaterThan(2000);
    });

    it('should handle very short people', () => {
      const shortData: MaximumFatLossFormData = {
        gender: 'female',
        age: 30,
        heightCm: 145,
        weightKg: 45,
        activityLevel: 'lightly_active',
        bodyFatPercentage: 25,
      };

      const result = calculateMaximumFatLoss(shortData);

      expect(result.bmr).toBeLessThan(1400);
    });

    it('should handle athlete body fat levels', () => {
      const athleteData: MaximumFatLossFormData = {
        ...baseFormData,
        bodyFatPercentage: 12,
      };

      const result = calculateMaximumFatLoss(athleteData);

      // Lower body fat = smaller safe deficit
      expect(result.maximumDeficit).toBeLessThan(800);
      expect(result.fatMassKg).toBeCloseTo(10.8, 1); // 90kg * 12%
      expect(result.leanMassKg).toBeCloseTo(79.2, 1);
    });

    it('should handle high body fat levels', () => {
      const highBodyFatData: MaximumFatLossFormData = {
        ...baseFormData,
        weightKg: 120,
        bodyFatPercentage: 40,
      };

      const result = calculateMaximumFatLoss(highBodyFatData);

      expect(result.fatMassKg).toBe(48);
      expect(result.maximumDeficit).toBeGreaterThan(1500);
    });
  });
});

describe('getBodyFatCategory', () => {
  describe('Male Categories', () => {
    it('should categorize essential fat (very low)', () => {
      expect(getBodyFatCategory(5, 'male')).toBe('Essential fat (very low)');
      expect(getBodyFatCategory(4, 'male')).toBe('Essential fat (very low)');
    });

    it('should categorize athletic', () => {
      expect(getBodyFatCategory(10, 'male')).toBe('Athletic');
      expect(getBodyFatCategory(13, 'male')).toBe('Athletic');
    });

    it('should categorize fitness', () => {
      expect(getBodyFatCategory(15, 'male')).toBe('Fitness');
      expect(getBodyFatCategory(17, 'male')).toBe('Fitness');
    });

    it('should categorize average', () => {
      expect(getBodyFatCategory(20, 'male')).toBe('Average');
      expect(getBodyFatCategory(24, 'male')).toBe('Average');
    });

    it('should categorize above average', () => {
      expect(getBodyFatCategory(26, 'male')).toBe('Above average');
      expect(getBodyFatCategory(35, 'male')).toBe('Above average');
    });
  });

  describe('Female Categories', () => {
    it('should categorize essential fat (very low)', () => {
      expect(getBodyFatCategory(12, 'female')).toBe('Essential fat (very low)');
      expect(getBodyFatCategory(10, 'female')).toBe('Essential fat (very low)');
    });

    it('should categorize athletic', () => {
      expect(getBodyFatCategory(18, 'female')).toBe('Athletic');
      expect(getBodyFatCategory(20, 'female')).toBe('Athletic');
    });

    it('should categorize fitness', () => {
      expect(getBodyFatCategory(23, 'female')).toBe('Fitness');
      expect(getBodyFatCategory(24, 'female')).toBe('Fitness');
    });

    it('should categorize average', () => {
      expect(getBodyFatCategory(28, 'female')).toBe('Average');
      expect(getBodyFatCategory(31, 'female')).toBe('Average');
    });

    it('should categorize above average', () => {
      expect(getBodyFatCategory(33, 'female')).toBe('Above average');
      expect(getBodyFatCategory(40, 'female')).toBe('Above average');
    });
  });
});

describe('formatBodyFatWithContext', () => {
  it('should format body fat percentage with category for male', () => {
    const formatted = formatBodyFatWithContext(15, 'male');
    expect(formatted).toContain('15.0%');
    expect(formatted).toContain('Fitness');
  });

  it('should format body fat percentage with category for female', () => {
    const formatted = formatBodyFatWithContext(25, 'female');
    expect(formatted).toContain('25.0%');
    expect(formatted).toContain('Average');
  });

  it('should handle decimal values correctly', () => {
    const formatted = formatBodyFatWithContext(18.5, 'male');
    expect(formatted).toContain('18.5%');
  });

  it('should handle low body fat values', () => {
    const formatted = formatBodyFatWithContext(5, 'male');
    expect(formatted).toContain('Essential fat (very low)');
  });

  it('should handle high body fat values', () => {
    const formatted = formatBodyFatWithContext(35, 'female');
    expect(formatted).toContain('Above average');
  });
});
