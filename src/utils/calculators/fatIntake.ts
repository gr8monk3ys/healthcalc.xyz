import type { FatIntakeResult } from '@/types/fatIntake';

export function calculateFatIntake(calories: number, fatPercent: number): FatIntakeResult {
  if (calories <= 0) {
    throw new Error('Calories must be greater than 0');
  }

  if (fatPercent <= 0 || fatPercent > 100) {
    throw new Error('Fat percentage must be between 1 and 100');
  }

  const fatCalories = (calories * fatPercent) / 100;
  const fatGrams = fatCalories / 9;

  return {
    calories: Math.round(calories),
    fatPercent,
    fatCalories: Math.round(fatCalories),
    fatGrams: Math.round(fatGrams),
  };
}
