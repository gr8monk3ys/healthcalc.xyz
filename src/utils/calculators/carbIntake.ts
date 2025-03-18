import type { CarbIntakeResult } from '@/types/carbIntake';

export function calculateCarbIntake(calories: number, carbPercent: number): CarbIntakeResult {
  if (calories <= 0) {
    throw new Error('Calories must be greater than 0');
  }

  if (carbPercent <= 0 || carbPercent > 100) {
    throw new Error('Carb percentage must be between 1 and 100');
  }

  const carbCalories = (calories * carbPercent) / 100;
  const carbGrams = carbCalories / 4;

  return {
    calories: Math.round(calories),
    carbPercent,
    carbCalories: Math.round(carbCalories),
    carbGrams: Math.round(carbGrams),
  };
}
