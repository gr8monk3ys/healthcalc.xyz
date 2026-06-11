import { describe, it, expect } from 'vitest';
import { calculateCalorieNeeds } from './calorie';

describe('Calorie Calculator', () => {
  it('matches Mifflin-St Jeor for a 30-year-old male (80kg, 180cm, moderately active)', () => {
    // BMR = 10×80 + 6.25×180 − 5×30 + 5 = 800 + 1125 − 150 + 5 = 1780
    // TDEE = 1780 × 1.55 = 2759
    const result = calculateCalorieNeeds({
      gender: 'male',
      age: 30,
      weightKg: 80,
      heightCm: 180,
      activityLevel: 'moderately_active',
    });
    expect(result.bmr).toBe(1780);
    expect(result.activityMultiplier).toBe(1.55);
    expect(result.tdee).toBe(2759);
    // Goal targets: TDEE ± fixed adjustments (−250/−500/−1000, +250/+500/+1000)
    expect(result.dailyCalories.maintain).toBe(2759);
    expect(result.dailyCalories.mildLoss).toBe(2509);
    expect(result.dailyCalories.moderateLoss).toBe(2259);
    expect(result.dailyCalories.extremeLoss).toBe(1759);
    expect(result.dailyCalories.mildGain).toBe(3009);
    expect(result.dailyCalories.moderateGain).toBe(3259);
    expect(result.dailyCalories.extremeGain).toBe(3759);
  });

  it('matches Mifflin-St Jeor for a 25-year-old sedentary female and floors loss targets at 1200', () => {
    // BMR = 10×60 + 6.25×165 − 5×25 − 161 = 600 + 1031.25 − 125 − 161 = 1345.25 → 1345
    // TDEE = 1345.25 × 1.2 = 1614.3 → 1614
    // moderateLoss raw = 1614.3 − 500 = 1114 → floored to the 1200 kcal safety minimum
    // extremeLoss raw = 1614.3 − 1000 = 614 → floored to 1200
    const result = calculateCalorieNeeds({
      gender: 'female',
      age: 25,
      weightKg: 60,
      heightCm: 165,
      activityLevel: 'sedentary',
    });
    expect(result.bmr).toBe(1345);
    expect(result.activityMultiplier).toBe(1.2);
    expect(result.tdee).toBe(1614);
    expect(result.dailyCalories.mildLoss).toBe(1364);
    expect(result.dailyCalories.moderateLoss).toBe(1200);
    expect(result.dailyCalories.extremeLoss).toBe(1200);
    expect(result.dailyCalories.mildGain).toBe(1864);
  });

  it('applies the −166 kcal female offset in Mifflin-St Jeor, all else equal', () => {
    // male: +5, female: −161 → constant difference of 166 in BMR
    const shared = { age: 40, weightKg: 70, heightCm: 170, activityLevel: 'sedentary' };
    const male = calculateCalorieNeeds({ gender: 'male', ...shared });
    const female = calculateCalorieNeeds({ gender: 'female', ...shared });
    expect(male.bmr - female.bmr).toBe(166);
  });

  it('scales TDEE with higher activity multipliers', () => {
    const shared = { gender: 'male' as const, age: 30, weightKg: 80, heightCm: 180 };
    const sedentary = calculateCalorieNeeds({ ...shared, activityLevel: 'sedentary' });
    const veryActive = calculateCalorieNeeds({ ...shared, activityLevel: 'very_active' });
    // Same BMR (1780); TDEE = 1780 × 1.2 = 2136 vs 1780 × 1.725 = 3070.5 → 3071
    expect(sedentary.tdee).toBe(2136);
    expect(veryActive.tdee).toBe(3071);
  });

  it('throws on invalid age, weight, or height', () => {
    const valid = {
      gender: 'male' as const,
      age: 30,
      weightKg: 80,
      heightCm: 180,
      activityLevel: 'sedentary',
    };
    expect(() => calculateCalorieNeeds({ ...valid, age: 0 })).toThrow(
      'Age must be between 1 and 120 years'
    );
    expect(() => calculateCalorieNeeds({ ...valid, age: 121 })).toThrow(
      'Age must be between 1 and 120 years'
    );
    expect(() => calculateCalorieNeeds({ ...valid, weightKg: 0 })).toThrow(
      'Weight must be greater than 0 kg'
    );
    expect(() => calculateCalorieNeeds({ ...valid, heightCm: -180 })).toThrow(
      'Height must be greater than 0 cm'
    );
  });
});
