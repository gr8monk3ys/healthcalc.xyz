import { describe, it, expect } from 'vitest';
import { calculateBodyFatBurn } from './bodyFatBurn';
import { BodyFatBurnFormData } from '@/types/bodyFatBurn';
import {
  
  
  
  
} from '@/constants/bodyFatBurn';

describe('Body Fat Burn Calculator', () => {
  describe('calculateBodyFatBurn - Basic Calculations', () => {
    it('should calculate REE using Mifflin-St Jeor formula for male', () => {
      const data: BodyFatBurnFormData = {
        gender: 'male',
        age: 30,
        weight: 70, // kg
        height: 175, // cm
        unitSystem: 'metric',
        activity: 'walking',
        speed: 3.0,
        duration: 30,
        frequency: 3,
        burnGoal: 5,
      };

      const result = calculateBodyFatBurn(data);

      // REE = (10 * 70) + (6.25 * 175) - (5 * 30) + 5
      // REE = 700 + 1093.75 - 150 + 5 = 1648.75
      expect(result.restingEnergyExpenditure).toBe(1649);
    });

    it('should calculate REE using Mifflin-St Jeor formula for female', () => {
      const data: BodyFatBurnFormData = {
        gender: 'female',
        age: 25,
        weight: 60, // kg
        height: 165, // cm
        unitSystem: 'metric',
        activity: 'walking',
        speed: 3.0,
        duration: 30,
        frequency: 3,
        burnGoal: 5,
      };

      const result = calculateBodyFatBurn(data);

      // REE = (10 * 60) + (6.25 * 165) - (5 * 25) - 161
      // REE = 600 + 1031.25 - 125 - 161 = 1345.25
      expect(result.restingEnergyExpenditure).toBe(1345);
    });

    it('should calculate activity energy expenditure for walking', () => {
      const data: BodyFatBurnFormData = {
        gender: 'male',
        age: 30,
        weight: 70, // kg
        height: 175, // cm
        unitSystem: 'metric',
        activity: 'walking',
        speed: 3.0, // 3 mph
        duration: 30, // minutes
        frequency: 3,
        burnGoal: 5,
      };

      const result = calculateBodyFatBurn(data);

      // Walking base MET: 3.5
      // Speed adjustment: (3.0 - 2.0) * 0.3 = 0.3
      // Adjusted MET: 3.5 + 0.3 = 3.8
      // Energy = MET * weight * duration_in_hours
      // Energy = 3.8 * 70 * 0.5 = 133
      expect(result.activityEnergyExpenditure).toBeCloseTo(133, 0);
    });

    it('should calculate activity energy expenditure for running', () => {
      const data: BodyFatBurnFormData = {
        gender: 'male',
        age: 30,
        weight: 70, // kg
        height: 175, // cm
        unitSystem: 'metric',
        activity: 'running',
        speed: 6.0, // 6 mph
        duration: 30, // minutes
        frequency: 3,
        burnGoal: 5,
      };

      const result = calculateBodyFatBurn(data);

      // Running base MET: 8.0
      // Speed adjustment: (6.0 - 5.0) * 0.8 = 0.8
      // Adjusted MET: 8.0 + 0.8 = 8.8
      // Energy = 8.8 * 70 * 0.5 = 308
      expect(result.activityEnergyExpenditure).toBeCloseTo(308, 0);
    });

    it('should calculate distance for distance-based activities', () => {
      const data: BodyFatBurnFormData = {
        gender: 'male',
        age: 30,
        weight: 70,
        height: 175,
        unitSystem: 'metric',
        activity: 'running',
        speed: 6.0, // mph
        duration: 60, // 1 hour
        frequency: 3,
        burnGoal: 5,
      };

      const result = calculateBodyFatBurn(data);

      // Distance = speed * duration_in_hours = 6 * 1 = 6 miles
      expect(result.distancePerSession).toBe(6.0);
    });

    it('should not calculate distance for non-distance activities', () => {
      const data: BodyFatBurnFormData = {
        gender: 'male',
        age: 30,
        weight: 70,
        height: 175,
        unitSystem: 'metric',
        activity: 'weightTraining',
        speed: 5,
        duration: 60,
        frequency: 3,
        burnGoal: 5,
      };

      const result = calculateBodyFatBurn(data);

      // Weight training doesn't calculate distance
      expect(result.distancePerSession).toBe(0);
    });

    it('should calculate time to reach goal', () => {
      const data: BodyFatBurnFormData = {
        gender: 'male',
        age: 30,
        weight: 70,
        height: 175,
        unitSystem: 'metric',
        activity: 'running',
        speed: 6.0,
        duration: 30,
        frequency: 3, // 3 times per week
        burnGoal: 5, // 5 pounds
      };

      const result = calculateBodyFatBurn(data);

      // Activity energy per session ≈ 308 calories
      // Weekly burn = 308 * 3 = 924 calories
      // Goal calories = 5 * 3500 = 17500 calories
      // Weeks to goal = 17500 / 924 ≈ 18.9 weeks
      expect(result.timeToReachGoal.weeks).toBeGreaterThan(17);
      expect(result.timeToReachGoal.weeks).toBeLessThan(20);
    });
  });

  describe('Unit Conversions', () => {
    it('should handle imperial units correctly', () => {
      const data: BodyFatBurnFormData = {
        gender: 'male',
        age: 30,
        weight: 154, // pounds (≈ 70 kg)
        height: 69, // inches (≈ 175 cm)
        unitSystem: 'imperial',
        activity: 'walking',
        speed: 3.0,
        duration: 30,
        frequency: 3,
        burnGoal: 5,
      };

      const result = calculateBodyFatBurn(data);

      // REE should be similar to metric test (1649)
      expect(result.restingEnergyExpenditure).toBeGreaterThan(1600);
      expect(result.restingEnergyExpenditure).toBeLessThan(1700);
    });

    it('should produce same results for equivalent metric and imperial inputs', () => {
      const metricData: BodyFatBurnFormData = {
        gender: 'female',
        age: 25,
        weight: 60, // kg
        height: 165, // cm
        unitSystem: 'metric',
        activity: 'running',
        speed: 6.0,
        duration: 30,
        frequency: 3,
        burnGoal: 5,
      };

      const imperialData: BodyFatBurnFormData = {
        gender: 'female',
        age: 25,
        weight: 132.28, // pounds (60 kg)
        height: 64.96, // inches (165 cm)
        unitSystem: 'imperial',
        activity: 'running',
        speed: 6.0,
        duration: 30,
        frequency: 3,
        burnGoal: 5,
      };

      const metricResult = calculateBodyFatBurn(metricData);
      const imperialResult = calculateBodyFatBurn(imperialData);

      expect(metricResult.restingEnergyExpenditure).toBeCloseTo(
        imperialResult.restingEnergyExpenditure,
        0
      );
      expect(metricResult.activityEnergyExpenditure).toBeCloseTo(
        imperialResult.activityEnergyExpenditure,
        0
      );
    });
  });

  describe('All Activities', () => {
    it('should calculate for walking activity', () => {
      const data: BodyFatBurnFormData = {
        gender: 'male',
        age: 30,
        weight: 70,
        height: 175,
        unitSystem: 'metric',
        activity: 'walking',
        speed: 3.5,
        duration: 45,
        frequency: 5,
        burnGoal: 10,
      };

      const result = calculateBodyFatBurn(data);
      expect(result.activityEnergyExpenditure).toBeGreaterThan(0);
      expect(result.distancePerSession).toBeGreaterThan(0); // Walking calculates distance
    });

    it('should calculate for cycling activity', () => {
      const data: BodyFatBurnFormData = {
        gender: 'female',
        age: 28,
        weight: 65,
        height: 168,
        unitSystem: 'metric',
        activity: 'cycling',
        speed: 15.0,
        duration: 60,
        frequency: 4,
        burnGoal: 8,
      };

      const result = calculateBodyFatBurn(data);
      expect(result.activityEnergyExpenditure).toBeGreaterThan(0);
      expect(result.distancePerSession).toBe(15.0); // 15 mph * 1 hour
    });

    it('should calculate for swimming activity', () => {
      const data: BodyFatBurnFormData = {
        gender: 'male',
        age: 35,
        weight: 80,
        height: 180,
        unitSystem: 'metric',
        activity: 'swimming',
        speed: 2.0,
        duration: 45,
        frequency: 3,
        burnGoal: 7,
      };

      const result = calculateBodyFatBurn(data);
      expect(result.activityEnergyExpenditure).toBeGreaterThan(0);
      expect(result.distancePerSession).toBeCloseTo(1.5, 1); // 2 mph * 0.75 hours
    });

    it('should calculate for elliptical activity', () => {
      const data: BodyFatBurnFormData = {
        gender: 'female',
        age: 32,
        weight: 62,
        height: 163,
        unitSystem: 'metric',
        activity: 'elliptical',
        speed: 7, // level
        duration: 40,
        frequency: 4,
        burnGoal: 6,
      };

      const result = calculateBodyFatBurn(data);
      expect(result.activityEnergyExpenditure).toBeGreaterThan(0);
      expect(result.distancePerSession).toBe(0); // Elliptical doesn't calculate distance
    });

    it('should calculate for stairMaster activity', () => {
      const data: BodyFatBurnFormData = {
        gender: 'male',
        age: 28,
        weight: 75,
        height: 178,
        unitSystem: 'metric',
        activity: 'stairMaster',
        speed: 8, // level
        duration: 30,
        frequency: 5,
        burnGoal: 5,
      };

      const result = calculateBodyFatBurn(data);
      expect(result.activityEnergyExpenditure).toBeGreaterThan(0);
      expect(result.distancePerSession).toBe(0);
    });

    it('should calculate for rowing activity', () => {
      const data: BodyFatBurnFormData = {
        gender: 'male',
        age: 30,
        weight: 78,
        height: 182,
        unitSystem: 'metric',
        activity: 'rowing',
        speed: 6, // intensity
        duration: 45,
        frequency: 3,
        burnGoal: 8,
      };

      const result = calculateBodyFatBurn(data);
      expect(result.activityEnergyExpenditure).toBeGreaterThan(0);
      expect(result.distancePerSession).toBe(0);
    });

    it('should calculate for hiking activity', () => {
      const data: BodyFatBurnFormData = {
        gender: 'female',
        age: 29,
        weight: 58,
        height: 160,
        unitSystem: 'metric',
        activity: 'hiking',
        speed: 5, // grade %
        duration: 90,
        frequency: 2,
        burnGoal: 10,
      };

      const result = calculateBodyFatBurn(data);
      expect(result.activityEnergyExpenditure).toBeGreaterThan(0);
      expect(result.distancePerSession).toBe(0);
    });

    it('should calculate for weight training activity', () => {
      const data: BodyFatBurnFormData = {
        gender: 'male',
        age: 26,
        weight: 85,
        height: 183,
        unitSystem: 'metric',
        activity: 'weightTraining',
        speed: 7, // intensity
        duration: 60,
        frequency: 4,
        burnGoal: 12,
      };

      const result = calculateBodyFatBurn(data);
      expect(result.activityEnergyExpenditure).toBeGreaterThan(0);
      expect(result.distancePerSession).toBe(0);
    });

    it('should calculate for yoga activity', () => {
      const data: BodyFatBurnFormData = {
        gender: 'female',
        age: 33,
        weight: 56,
        height: 158,
        unitSystem: 'metric',
        activity: 'yoga',
        speed: 3, // intensity
        duration: 60,
        frequency: 5,
        burnGoal: 3,
      };

      const result = calculateBodyFatBurn(data);
      expect(result.activityEnergyExpenditure).toBeGreaterThan(0);
      expect(result.distancePerSession).toBe(0);
    });
  });

  describe('Speed/Intensity Adjustments', () => {
    it('should increase MET value with higher walking speed', () => {
      const slowWalk: BodyFatBurnFormData = {
        gender: 'male',
        age: 30,
        weight: 70,
        height: 175,
        unitSystem: 'metric',
        activity: 'walking',
        speed: 2.0, // min speed
        duration: 60,
        frequency: 3,
        burnGoal: 5,
      };

      const fastWalk: BodyFatBurnFormData = {
        ...slowWalk,
        speed: 4.0, // higher speed
      };

      const slowResult = calculateBodyFatBurn(slowWalk);
      const fastResult = calculateBodyFatBurn(fastWalk);

      // Higher speed should burn more calories
      expect(fastResult.activityEnergyExpenditure).toBeGreaterThan(
        slowResult.activityEnergyExpenditure
      );
    });

    it('should increase MET value with higher running speed', () => {
      const slowRun: BodyFatBurnFormData = {
        gender: 'male',
        age: 30,
        weight: 70,
        height: 175,
        unitSystem: 'metric',
        activity: 'running',
        speed: 5.0, // min speed
        duration: 30,
        frequency: 3,
        burnGoal: 5,
      };

      const fastRun: BodyFatBurnFormData = {
        ...slowRun,
        speed: 8.0, // higher speed
      };

      const slowResult = calculateBodyFatBurn(slowRun);
      const fastResult = calculateBodyFatBurn(fastRun);

      expect(fastResult.activityEnergyExpenditure).toBeGreaterThan(
        slowResult.activityEnergyExpenditure
      );
    });

    it('should adjust MET for elliptical level', () => {
      const lowLevel: BodyFatBurnFormData = {
        gender: 'female',
        age: 28,
        weight: 60,
        height: 165,
        unitSystem: 'metric',
        activity: 'elliptical',
        speed: 1, // min level
        duration: 30,
        frequency: 3,
        burnGoal: 5,
      };

      const highLevel: BodyFatBurnFormData = {
        ...lowLevel,
        speed: 10, // max level
      };

      const lowResult = calculateBodyFatBurn(lowLevel);
      const highResult = calculateBodyFatBurn(highLevel);

      expect(highResult.activityEnergyExpenditure).toBeGreaterThan(
        lowResult.activityEnergyExpenditure
      );
    });
  });

  describe('Duration and Frequency', () => {
    it('should double calories with double duration', () => {
      const shortDuration: BodyFatBurnFormData = {
        gender: 'male',
        age: 30,
        weight: 70,
        height: 175,
        unitSystem: 'metric',
        activity: 'running',
        speed: 6.0,
        duration: 30,
        frequency: 3,
        burnGoal: 5,
      };

      const longDuration: BodyFatBurnFormData = {
        ...shortDuration,
        duration: 60, // double duration
      };

      const shortResult = calculateBodyFatBurn(shortDuration);
      const longResult = calculateBodyFatBurn(longDuration);

      expect(longResult.activityEnergyExpenditure).toBeCloseTo(
        shortResult.activityEnergyExpenditure * 2,
        0
      );
    });

    it('should reduce time to goal with higher frequency', () => {
      const lowFrequency: BodyFatBurnFormData = {
        gender: 'male',
        age: 30,
        weight: 70,
        height: 175,
        unitSystem: 'metric',
        activity: 'running',
        speed: 6.0,
        duration: 30,
        frequency: 2, // 2 times per week
        burnGoal: 10,
      };

      const highFrequency: BodyFatBurnFormData = {
        ...lowFrequency,
        frequency: 5, // 5 times per week
      };

      const lowResult = calculateBodyFatBurn(lowFrequency);
      const highResult = calculateBodyFatBurn(highFrequency);

      // Higher frequency should reach goal faster
      expect(highResult.timeToReachGoal.weeks).toBeLessThan(lowResult.timeToReachGoal.weeks);
      expect(highResult.timeToReachGoal.days).toBeLessThan(lowResult.timeToReachGoal.days);
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum duration (5 minutes)', () => {
      const data: BodyFatBurnFormData = {
        gender: 'male',
        age: 30,
        weight: 70,
        height: 175,
        unitSystem: 'metric',
        activity: 'walking',
        speed: 3.0,
        duration: 5,
        frequency: 1,
        burnGoal: 1,
      };

      const result = calculateBodyFatBurn(data);
      expect(result.activityEnergyExpenditure).toBeGreaterThan(0);
      expect(result.activityEnergyExpenditure).toBeLessThan(50);
    });

    it('should handle maximum duration (120 minutes)', () => {
      const data: BodyFatBurnFormData = {
        gender: 'male',
        age: 30,
        weight: 70,
        height: 175,
        unitSystem: 'metric',
        activity: 'walking',
        speed: 3.0,
        duration: 120,
        frequency: 1,
        burnGoal: 1,
      };

      const result = calculateBodyFatBurn(data);
      expect(result.activityEnergyExpenditure).toBeGreaterThan(200);
    });

    it('should handle very young person', () => {
      const data: BodyFatBurnFormData = {
        gender: 'male',
        age: 18,
        weight: 65,
        height: 170,
        unitSystem: 'metric',
        activity: 'running',
        speed: 6.0,
        duration: 30,
        frequency: 3,
        burnGoal: 5,
      };

      const result = calculateBodyFatBurn(data);
      expect(result.restingEnergyExpenditure).toBeGreaterThan(1400);
      expect(result.activityEnergyExpenditure).toBeGreaterThan(0);
    });

    it('should handle older person', () => {
      const data: BodyFatBurnFormData = {
        gender: 'female',
        age: 65,
        weight: 60,
        height: 160,
        unitSystem: 'metric',
        activity: 'walking',
        speed: 2.5,
        duration: 45,
        frequency: 4,
        burnGoal: 5,
      };

      const result = calculateBodyFatBurn(data);
      // REE should be lower for older people (age multiplier)
      expect(result.restingEnergyExpenditure).toBeGreaterThan(900);
      expect(result.restingEnergyExpenditure).toBeLessThan(1300);
    });

    it('should handle large burn goal (50 pounds)', () => {
      const data: BodyFatBurnFormData = {
        gender: 'male',
        age: 30,
        weight: 100,
        height: 180,
        unitSystem: 'metric',
        activity: 'running',
        speed: 6.0,
        duration: 45,
        frequency: 5,
        burnGoal: 50, // maximum goal
      };

      const result = calculateBodyFatBurn(data);
      // 50 pounds * 3500 = 175,000 calories
      expect(result.timeToReachGoal.weeks).toBeGreaterThan(50);
    });

    it('should handle small burn goal (1 pound)', () => {
      const data: BodyFatBurnFormData = {
        gender: 'male',
        age: 30,
        weight: 70,
        height: 175,
        unitSystem: 'metric',
        activity: 'running',
        speed: 6.0,
        duration: 45,
        frequency: 5,
        burnGoal: 1, // minimum goal
      };

      const result = calculateBodyFatBurn(data);
      // 1 pound * 3500 = 3,500 calories
      expect(result.timeToReachGoal.weeks).toBeLessThan(5);
    });

    it('should throw error for invalid activity', () => {
      const data: BodyFatBurnFormData = {
        gender: 'male',
        age: 30,
        weight: 70,
        height: 175,
        unitSystem: 'metric',
        activity: 'invalidActivity',
        speed: 3.0,
        duration: 30,
        frequency: 3,
        burnGoal: 5,
      };

      expect(() => calculateBodyFatBurn(data)).toThrow('Invalid activity selected');
    });
  });

  describe('Real-World Examples', () => {
    it('should calculate for person trying to lose 10 pounds walking 3x/week', () => {
      const data: BodyFatBurnFormData = {
        gender: 'female',
        age: 35,
        weight: 75, // kg (165 lbs)
        height: 165,
        unitSystem: 'metric',
        activity: 'walking',
        speed: 3.5, // brisk walk
        duration: 45,
        frequency: 3,
        burnGoal: 10,
      };

      const result = calculateBodyFatBurn(data);

      // Should take several months (walking burns fewer calories)
      expect(result.timeToReachGoal.weeks).toBeGreaterThan(30);
      expect(result.timeToReachGoal.weeks).toBeLessThan(70);

      // Should burn reasonable calories per session
      expect(result.activityEnergyExpenditure).toBeGreaterThan(150);
      expect(result.activityEnergyExpenditure).toBeLessThan(300);
    });

    it('should calculate for athlete running 5x/week', () => {
      const data: BodyFatBurnFormData = {
        gender: 'male',
        age: 28,
        weight: 70,
        height: 178,
        unitSystem: 'metric',
        activity: 'running',
        speed: 7.5, // 7.5 mph (8 min/mile pace)
        duration: 60,
        frequency: 5,
        burnGoal: 5,
      };

      const result = calculateBodyFatBurn(data);

      // High intensity should reach goal faster
      expect(result.timeToReachGoal.weeks).toBeLessThan(10);

      // Should burn significant calories per run
      expect(result.activityEnergyExpenditure).toBeGreaterThan(500);

      // Should cover good distance
      expect(result.distancePerSession).toBeCloseTo(7.5, 1);
    });

    it('should calculate for beginner doing yoga', () => {
      const data: BodyFatBurnFormData = {
        gender: 'female',
        age: 42,
        weight: 68,
        height: 163,
        unitSystem: 'metric',
        activity: 'yoga',
        speed: 2, // low intensity
        duration: 60,
        frequency: 4,
        burnGoal: 3,
      };

      const result = calculateBodyFatBurn(data);

      // Yoga burns fewer calories
      expect(result.activityEnergyExpenditure).toBeGreaterThan(100);
      expect(result.activityEnergyExpenditure).toBeLessThan(250);

      // Will take longer to reach goal
      expect(result.timeToReachGoal.weeks).toBeGreaterThan(8);
    });

    it('should calculate for cyclist training 4x/week', () => {
      const data: BodyFatBurnFormData = {
        gender: 'male',
        age: 32,
        weight: 75,
        height: 180,
        unitSystem: 'metric',
        activity: 'cycling',
        speed: 18.0, // 18 mph
        duration: 90, // 1.5 hours
        frequency: 4,
        burnGoal: 8,
      };

      const result = calculateBodyFatBurn(data);

      // Long cycling sessions burn significant calories
      expect(result.activityEnergyExpenditure).toBeGreaterThan(600);

      // Should cover good distance
      expect(result.distancePerSession).toBeCloseTo(27.0, 1); // 18 mph * 1.5 hours

      // Consistent training should reach goal in reasonable time
      expect(result.timeToReachGoal.weeks).toBeGreaterThan(5);
      expect(result.timeToReachGoal.weeks).toBeLessThan(15);
    });
  });

  describe('Formula Validation', () => {
    it('should match Mifflin-St Jeor REE formula for males', () => {
      const data: BodyFatBurnFormData = {
        gender: 'male',
        age: 40,
        weight: 80, // kg
        height: 180, // cm
        unitSystem: 'metric',
        activity: 'walking',
        speed: 3.0,
        duration: 30,
        frequency: 3,
        burnGoal: 5,
      };

      const result = calculateBodyFatBurn(data);

      // Manual calculation:
      // REE = (10 * 80) + (6.25 * 180) - (5 * 40) + 5
      // REE = 800 + 1125 - 200 + 5 = 1730
      expect(result.restingEnergyExpenditure).toBe(1730);
    });

    it('should match Mifflin-St Jeor REE formula for females', () => {
      const data: BodyFatBurnFormData = {
        gender: 'female',
        age: 35,
        weight: 65, // kg
        height: 170, // cm
        unitSystem: 'metric',
        activity: 'walking',
        speed: 3.0,
        duration: 30,
        frequency: 3,
        burnGoal: 5,
      };

      const result = calculateBodyFatBurn(data);

      // Manual calculation:
      // REE = (10 * 65) + (6.25 * 170) - (5 * 35) - 161
      // REE = 650 + 1062.5 - 175 - 161 = 1376.5
      expect(result.restingEnergyExpenditure).toBe(1377);
    });

    it('should match MET calculation formula', () => {
      const data: BodyFatBurnFormData = {
        gender: 'male',
        age: 30,
        weight: 70, // kg
        height: 175,
        unitSystem: 'metric',
        activity: 'running',
        speed: 7.0, // 7 mph
        duration: 60, // 1 hour
        frequency: 3,
        burnGoal: 5,
      };

      const result = calculateBodyFatBurn(data);

      // Manual calculation:
      // Base MET for running: 8.0
      // Speed adjustment: (7.0 - 5.0) * 0.8 = 1.6
      // Adjusted MET: 8.0 + 1.6 = 9.6
      // Energy = MET * weight * duration_in_hours
      // Energy = 9.6 * 70 * 1 = 672
      expect(result.activityEnergyExpenditure).toBeCloseTo(672, 0);
    });

    it('should match calorie-to-fat conversion (3500 cal/lb)', () => {
      const data: BodyFatBurnFormData = {
        gender: 'male',
        age: 30,
        weight: 70,
        height: 175,
        unitSystem: 'metric',
        activity: 'running',
        speed: 6.0,
        duration: 60, // burns ~600 cal
        frequency: 7, // daily
        burnGoal: 1, // 1 pound
      };

      const result = calculateBodyFatBurn(data);

      // 1 pound = 3500 calories
      // Weekly burn ≈ 600 * 7 = 4200 calories
      // Weeks to goal = 3500 / 4200 ≈ 0.83 weeks
      expect(result.timeToReachGoal.weeks).toBe(0);
      expect(result.timeToReachGoal.days).toBeLessThan(10);
    });
  });
});
