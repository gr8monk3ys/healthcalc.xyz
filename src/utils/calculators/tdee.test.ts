import { describe, it, expect } from 'vitest';
import {
  calculateBMR,
  getActivityMultiplier,
  calculateTDEE,
  calculateWeightGoals,
  estimateWeightChange,
  calculateTimeToTargetWeight,
} from './tdee';

describe('TDEE Calculation', () => {
  describe('calculateBMR', () => {
    describe('Mifflin-St Jeor Formula', () => {
      it('should calculate BMR correctly for adult male', () => {
        // Male: 30 years, 70 kg, 175 cm
        // Formula: (10 × 70) + (6.25 × 175) - (5 × 30) + 5
        // = 700 + 1093.75 - 150 + 5 = 1648.75
        const bmr = calculateBMR('male', 30, 70, 175);
        expect(bmr).toBeCloseTo(1648.75, 1);
      });

      it('should calculate BMR correctly for adult female', () => {
        // Female: 30 years, 60 kg, 163 cm
        // Formula: (10 × 60) + (6.25 × 163) - (5 × 30) - 161
        // = 600 + 1018.75 - 150 - 161 = 1307.75
        const bmr = calculateBMR('female', 30, 60, 163);
        expect(bmr).toBeCloseTo(1307.75, 1);
      });

      it('should calculate BMR for young person', () => {
        const bmr = calculateBMR('male', 20, 75, 180);
        expect(bmr).toBeGreaterThan(1700);
        expect(bmr).toBeLessThan(2000);
      });

      it('should calculate BMR for older person', () => {
        const bmr = calculateBMR('female', 60, 65, 160);
        expect(bmr).toBeGreaterThan(1000);
        expect(bmr).toBeLessThan(1400);
      });
    });

    describe('Harris-Benedict Formula', () => {
      it('should calculate BMR correctly for male', () => {
        // Male: 66.5 + (13.75 × 70) + (5.003 × 175) - (6.75 × 30)
        // = 66.5 + 962.5 + 875.525 - 202.5 = 1702.025
        const bmr = calculateBMR('male', 30, 70, 175, 'harris_benedict');
        expect(bmr).toBeCloseTo(1702, 0);
      });

      it('should calculate BMR correctly for female', () => {
        // Female: 655.1 + (9.563 × 60) + (1.85 × 163) - (4.676 × 30)
        // = 655.1 + 573.78 + 301.55 - 140.28 = 1390.15
        const bmr = calculateBMR('female', 30, 60, 163, 'harris_benedict');
        expect(bmr).toBeCloseTo(1390, 0);
      });

      it('should give different results than Mifflin-St Jeor', () => {
        const mifflin = calculateBMR('male', 30, 70, 175);
        const harris = calculateBMR('male', 30, 70, 175, 'harris_benedict');
        expect(Math.abs(mifflin - harris)).toBeGreaterThan(10);
      });
    });

    describe('Katch-McArdle Formula', () => {
      it('should calculate BMR with body fat percentage', () => {
        // 70 kg, 15% body fat
        // Lean body mass = 70 × (1 - 0.15) = 59.5 kg
        // BMR = 370 + (21.6 × 59.5) = 370 + 1285.2 = 1655.2
        const bmr = calculateBMR('male', 30, 70, 175, 'katch_mcardle', 15);
        expect(bmr).toBeCloseTo(1655.2, 1);
      });

      it('should calculate BMR for low body fat athlete', () => {
        // 80 kg, 10% body fat (athlete)
        // Lean body mass = 80 × 0.9 = 72 kg
        // BMR = 370 + (21.6 × 72) = 370 + 1555.2 = 1925.2
        const bmr = calculateBMR('male', 25, 80, 180, 'katch_mcardle', 10);
        expect(bmr).toBeCloseTo(1925.2, 1);
      });

      it('should estimate body fat if not provided', () => {
        // Should use default estimates: 15% for male, 25% for female
        const bmrMale = calculateBMR('male', 30, 70, 175, 'katch_mcardle');
        const bmrFemale = calculateBMR('female', 30, 60, 163, 'katch_mcardle');

        expect(bmrMale).toBeGreaterThan(1500);
        expect(bmrFemale).toBeGreaterThan(1000);
      });
    });

    describe('Input Validation', () => {
      it('should throw error for zero age', () => {
        expect(() => calculateBMR('male', 0, 70, 175)).toThrow('Age must be between 1 and 120 years');
      });

      it('should throw error for negative age', () => {
        expect(() => calculateBMR('male', -5, 70, 175)).toThrow('Age must be between 1 and 120 years');
      });

      it('should throw error for unrealistic age', () => {
        expect(() => calculateBMR('male', 121, 70, 175)).toThrow('Age must be between 1 and 120 years');
      });

      it('should throw error for zero weight', () => {
        expect(() => calculateBMR('male', 30, 0, 175)).toThrow('Weight must be greater than 0 kg');
      });

      it('should throw error for negative weight', () => {
        expect(() => calculateBMR('male', 30, -70, 175)).toThrow('Weight must be greater than 0 kg');
      });

      it('should throw error for zero height', () => {
        expect(() => calculateBMR('male', 30, 70, 0)).toThrow('Height must be greater than 0 cm');
      });

      it('should throw error for negative height', () => {
        expect(() => calculateBMR('male', 30, 70, -175)).toThrow('Height must be greater than 0 cm');
      });

      it('should throw error for invalid formula', () => {
        expect(() => calculateBMR('male', 30, 70, 175, 'invalid_formula')).toThrow("Formula 'invalid_formula' not found");
      });
    });
  });

  describe('getActivityMultiplier', () => {
    it('should return correct multiplier for sedentary', () => {
      expect(getActivityMultiplier('sedentary')).toBe(1.2);
    });

    it('should return correct multiplier for lightly active', () => {
      expect(getActivityMultiplier('lightly_active')).toBe(1.375);
    });

    it('should return correct multiplier for moderately active', () => {
      expect(getActivityMultiplier('moderately_active')).toBe(1.55);
    });

    it('should return correct multiplier for very active', () => {
      expect(getActivityMultiplier('very_active')).toBe(1.725);
    });

    it('should return correct multiplier for extremely active', () => {
      expect(getActivityMultiplier('extremely_active')).toBe(1.9);
    });

    it('should default to sedentary for invalid activity level', () => {
      expect(getActivityMultiplier('invalid_level')).toBe(1.2);
    });
  });

  describe('calculateTDEE', () => {
    it('should calculate TDEE correctly', () => {
      const bmr = 1650;
      const multiplier = 1.55; // moderately active
      const tdee = calculateTDEE(bmr, multiplier);
      expect(tdee).toBeCloseTo(2557.5, 1);
    });

    it('should calculate TDEE for sedentary person', () => {
      const bmr = 1500;
      const multiplier = 1.2;
      const tdee = calculateTDEE(bmr, multiplier);
      expect(tdee).toBe(1800);
    });

    it('should calculate TDEE for extremely active person', () => {
      const bmr = 2000;
      const multiplier = 1.9;
      const tdee = calculateTDEE(bmr, multiplier);
      expect(tdee).toBe(3800);
    });

    it('should throw error for zero BMR', () => {
      expect(() => calculateTDEE(0, 1.5)).toThrow('BMR must be greater than 0');
    });

    it('should throw error for negative BMR', () => {
      expect(() => calculateTDEE(-1500, 1.5)).toThrow('BMR must be greater than 0');
    });

    it('should throw error for zero activity multiplier', () => {
      expect(() => calculateTDEE(1500, 0)).toThrow('Activity multiplier must be greater than 0');
    });

    it('should throw error for negative activity multiplier', () => {
      expect(() => calculateTDEE(1500, -1.5)).toThrow('Activity multiplier must be greater than 0');
    });
  });

  describe('calculateWeightGoals', () => {
    it('should calculate all weight goals correctly', () => {
      const tdee = 2500;
      const goals = calculateWeightGoals(tdee);

      expect(goals.maintain).toBe(2500);
      expect(goals.mildLoss).toBe(2250); // -250
      expect(goals.moderateLoss).toBe(2000); // -500
      expect(goals.extremeLoss).toBe(1500); // -1000
      expect(goals.mildGain).toBe(2750); // +250
      expect(goals.moderateGain).toBe(3000); // +500
      expect(goals.extremeGain).toBe(3500); // +1000
    });

    it('should enforce minimum safe calories for extreme loss', () => {
      const tdee = 1400;
      const goals = calculateWeightGoals(tdee);

      expect(goals.extremeLoss).toBe(1200); // Should not go below 1200
    });

    it('should enforce minimum safe calories for moderate loss', () => {
      const tdee = 1500;
      const goals = calculateWeightGoals(tdee);

      expect(goals.moderateLoss).toBe(1200); // 1500 - 500 = 1000, but minimum is 1200
    });

    it('should allow gains without minimum restriction', () => {
      const tdee = 1300;
      const goals = calculateWeightGoals(tdee);

      expect(goals.mildGain).toBe(1550); // 1300 + 250
      expect(goals.moderateGain).toBe(1800); // 1300 + 500
    });

    it('should throw error for zero TDEE', () => {
      expect(() => calculateWeightGoals(0)).toThrow('TDEE must be greater than 0');
    });

    it('should throw error for negative TDEE', () => {
      expect(() => calculateWeightGoals(-2500)).toThrow('TDEE must be greater than 0');
    });
  });

  describe('estimateWeightChange', () => {
    it('should estimate weight loss correctly', () => {
      // Current: 80 kg, TDEE: 2500 kcal, Target: 2000 kcal (500 deficit), 30 days
      // Weight change = (500 deficit × 30 days) / 7700 = -1.95 kg
      // Final weight = 80 - 1.95 = 78.05 kg
      const finalWeight = estimateWeightChange(80, 2500, 2000, 30);
      expect(finalWeight).toBeCloseTo(78.05, 1);
    });

    it('should estimate weight gain correctly', () => {
      // Current: 70 kg, TDEE: 2500 kcal, Target: 3000 kcal (500 surplus), 30 days
      // Weight change = (500 surplus × 30 days) / 7700 = +1.95 kg
      // Final weight = 70 + 1.95 = 71.95 kg
      const finalWeight = estimateWeightChange(70, 2500, 3000, 30);
      expect(finalWeight).toBeCloseTo(71.95, 1);
    });

    it('should estimate no change for maintenance calories', () => {
      const finalWeight = estimateWeightChange(75, 2500, 2500, 30);
      expect(finalWeight).toBe(75);
    });

    it('should estimate long-term weight change', () => {
      // 90 days with 250 calorie deficit
      const finalWeight = estimateWeightChange(80, 2500, 2250, 90);
      expect(finalWeight).toBeCloseTo(77.08, 1);
    });

    it('should throw error for zero current weight', () => {
      expect(() => estimateWeightChange(0, 2500, 2000, 30)).toThrow('Current weight must be greater than 0 kg');
    });

    it('should throw error for negative current weight', () => {
      expect(() => estimateWeightChange(-80, 2500, 2000, 30)).toThrow('Current weight must be greater than 0 kg');
    });

    it('should throw error for zero TDEE', () => {
      expect(() => estimateWeightChange(80, 0, 2000, 30)).toThrow('TDEE must be greater than 0');
    });

    it('should throw error for zero target calories', () => {
      expect(() => estimateWeightChange(80, 2500, 0, 30)).toThrow('Target calories must be greater than 0');
    });

    it('should throw error for zero days', () => {
      expect(() => estimateWeightChange(80, 2500, 2000, 0)).toThrow('Days must be greater than 0');
    });
  });

  describe('calculateTimeToTargetWeight', () => {
    it('should calculate time for weight loss correctly', () => {
      // Current: 80 kg, Target: 75 kg (5 kg loss)
      // TDEE: 2500 kcal, Target: 2000 kcal (500 deficit/day)
      // Time = (5 kg × 7700 kcal/kg) / 500 kcal/day = 77 days
      const days = calculateTimeToTargetWeight(80, 75, 2500, 2000);
      expect(days).toBe(77);
    });

    it('should calculate time for weight gain correctly', () => {
      // Current: 70 kg, Target: 75 kg (5 kg gain)
      // TDEE: 2500 kcal, Target: 3000 kcal (500 surplus/day)
      // Time = (5 kg × 7700 kcal/kg) / 500 kcal/day = 77 days
      const days = calculateTimeToTargetWeight(70, 75, 2500, 3000);
      expect(days).toBe(77);
    });

    it('should return 0 when already at target weight', () => {
      const days = calculateTimeToTargetWeight(75, 75, 2500, 2000);
      expect(days).toBe(0);
    });

    it('should return Infinity when deficit is in wrong direction', () => {
      // Want to lose weight (80 → 75) but eating surplus (3000 > 2500)
      const days = calculateTimeToTargetWeight(80, 75, 2500, 3000);
      expect(days).toBe(Infinity);
    });

    it('should return Infinity when surplus is in wrong direction', () => {
      // Want to gain weight (70 → 75) but eating deficit (2000 < 2500)
      const days = calculateTimeToTargetWeight(70, 75, 2500, 2000);
      expect(days).toBe(Infinity);
    });

    it('should return Infinity when eating at maintenance', () => {
      const days = calculateTimeToTargetWeight(80, 75, 2500, 2500);
      expect(days).toBe(Infinity);
    });

    it('should throw error for zero current weight', () => {
      expect(() => calculateTimeToTargetWeight(0, 75, 2500, 2000)).toThrow('Current weight must be greater than 0 kg');
    });

    it('should throw error for zero target weight', () => {
      expect(() => calculateTimeToTargetWeight(80, 0, 2500, 2000)).toThrow('Target weight must be greater than 0 kg');
    });

    it('should throw error for zero TDEE', () => {
      expect(() => calculateTimeToTargetWeight(80, 75, 0, 2000)).toThrow('TDEE must be greater than 0');
    });

    it('should throw error for zero target calories', () => {
      expect(() => calculateTimeToTargetWeight(80, 75, 2500, 0)).toThrow('Target calories must be greater than 0');
    });
  });
});

describe('TDEE Real-World Examples', () => {
  it('should calculate TDEE for average sedentary male', () => {
    // 30-year-old, 70 kg, 175 cm, sedentary
    const bmr = calculateBMR('male', 30, 70, 175);
    const tdee = calculateTDEE(bmr, 1.2);
    expect(tdee).toBeCloseTo(1978.5, 1);
  });

  it('should calculate TDEE for active female', () => {
    // 25-year-old, 60 kg, 163 cm, very active
    const bmr = calculateBMR('female', 25, 60, 163);
    const tdee = calculateTDEE(bmr, 1.725);
    expect(tdee).toBeGreaterThan(2100);
    expect(tdee).toBeLessThan(2400);
  });

  it('should calculate TDEE for athlete using Katch-McArdle', () => {
    // 28-year-old male, 75 kg, 180 cm, 12% body fat, extremely active
    const bmr = calculateBMR('male', 28, 75, 180, 'katch_mcardle', 12);
    const tdee = calculateTDEE(bmr, 1.9);
    expect(tdee).toBeGreaterThan(3000);
  });

  it('should calculate realistic weight loss timeline', () => {
    // Person wants to lose 10 kg over time with 500 calorie deficit
    // TDEE: 2500, eating 2000
    const days = calculateTimeToTargetWeight(80, 70, 2500, 2000);
    expect(days).toBeCloseTo(154, 0); // About 5 months
  });

  it('should show different formulas give different results', () => {
    const mifflin = calculateBMR('male', 30, 70, 175, 'mifflin_st_jeor');
    const harris = calculateBMR('male', 30, 70, 175, 'harris_benedict');
    const katch = calculateBMR('male', 30, 70, 175, 'katch_mcardle', 15);

    // All should be in reasonable range
    expect(mifflin).toBeGreaterThan(1500);
    expect(mifflin).toBeLessThan(1800);
    expect(harris).toBeGreaterThan(1500);
    expect(harris).toBeLessThan(1800);
    expect(katch).toBeGreaterThan(1500);
    expect(katch).toBeLessThan(1800);

    // But should differ from each other
    expect(Math.abs(mifflin - harris)).toBeGreaterThan(20);
  });
});
