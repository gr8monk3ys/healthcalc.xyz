import { ActivityMultiplier, TDEEFormula } from '@/types/tdee';
import { ActivityLevel, Gender } from '@/types/common';

// Activity level multipliers
export const ACTIVITY_MULTIPLIERS: ActivityMultiplier[] = [
  {
    level: 'sedentary',
    value: 1.2,
    label: 'Sedentary',
    description: 'Little or no exercise, desk job',
  },
  {
    level: 'lightly_active',
    value: 1.375,
    label: 'Lightly Active',
    description: 'Light exercise or sports 1-3 days/week',
  },
  {
    level: 'moderately_active',
    value: 1.55,
    label: 'Moderately Active',
    description: 'Moderate exercise or sports 3-5 days/week',
  },
  {
    level: 'very_active',
    value: 1.725,
    label: 'Very Active',
    description: 'Hard exercise or sports 6-7 days/week',
  },
  {
    level: 'extremely_active',
    value: 1.9,
    label: 'Extremely Active',
    description: 'Very hard exercise, physical job, or training twice a day',
  },
];

// BMR calculation formulas
export const TDEE_FORMULAS: TDEEFormula[] = [
  {
    id: 'mifflin_st_jeor',
    name: 'Mifflin-St Jeor',
    description: 'Most accurate for most people',
    calculate: (gender: Gender, age: number, weightKg: number, heightCm: number) => {
      const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
      return gender === 'male' ? base + 5 : base - 161;
    },
  },
  {
    id: 'harris_benedict',
    name: 'Harris-Benedict',
    description: 'Classic formula, slightly less accurate',
    calculate: (gender: Gender, age: number, weightKg: number, heightCm: number) => {
      if (gender === 'male') {
        return 66.5 + 13.75 * weightKg + 5.003 * heightCm - 6.75 * age;
      } else {
        return 655.1 + 9.563 * weightKg + 1.85 * heightCm - 4.676 * age;
      }
    },
  },
  {
    id: 'katch_mcardle',
    name: 'Katch-McArdle',
    description: 'Best when body fat percentage is known',
    calculate: (
      gender: Gender,
      age: number,
      weightKg: number,
      heightCm: number,
      bodyFatPercentage?: number
    ) => {
      // If body fat percentage is not provided, estimate it
      if (bodyFatPercentage === undefined) {
        // Use a simple estimation based on gender
        bodyFatPercentage = gender === 'male' ? 15 : 25;
      }

      // Calculate lean body mass
      const leanBodyMass = weightKg * (1 - bodyFatPercentage / 100);

      // Katch-McArdle formula
      return 370 + 21.6 * leanBodyMass;
    },
  },
];

// Default values for TDEE calculator
export const DEFAULT_TDEE_VALUES = {
  male: {
    age: 30,
    heightCm: 175,
    heightFt: 5,
    heightIn: 9,
    weightKg: 70,
    weightLb: 154,
    activityLevel: 'moderately_active' as ActivityLevel,
  },
  female: {
    age: 30,
    heightCm: 163,
    heightFt: 5,
    heightIn: 4,
    weightKg: 60,
    weightLb: 132,
    activityLevel: 'moderately_active' as ActivityLevel,
  },
};

// Calorie adjustments for weight goals
export const WEIGHT_GOAL_ADJUSTMENTS = {
  mildLoss: -250, // 0.5 lb per week
  moderateLoss: -500, // 1 lb per week
  extremeLoss: -1000, // 2 lb per week
  mildGain: 250, // 0.5 lb per week
  moderateGain: 500, // 1 lb per week
  extremeGain: 1000, // 2 lb per week
};
