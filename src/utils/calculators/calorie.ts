import type { CalorieResult } from '@/types/calorie';
import {
  calculateBMR,
  calculateTDEE,
  calculateWeightGoals,
  getActivityMultiplier,
} from '@/utils/calculators/tdee';

interface CalorieInputs {
  gender: 'male' | 'female';
  age: number;
  weightKg: number;
  heightCm: number;
  activityLevel: string;
}

export function calculateCalorieNeeds({
  gender,
  age,
  weightKg,
  heightCm,
  activityLevel,
}: CalorieInputs): CalorieResult {
  const bmr = calculateBMR(gender, age, weightKg, heightCm);
  const activityMultiplier = getActivityMultiplier(activityLevel);
  const tdee = calculateTDEE(bmr, activityMultiplier);
  const weightGoals = calculateWeightGoals(tdee);

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    activityMultiplier,
    dailyCalories: weightGoals,
  };
}
