import type { CaloriesBurnedResult } from '@/types/caloriesBurned';

/**
 * Calories burned formula:
 * calories/min = (MET * 3.5 * weightKg) / 200
 */
export function calculateCaloriesBurned(
  weightKg: number,
  durationMinutes: number,
  met: number,
  activityLabel: string
): CaloriesBurnedResult {
  if (weightKg <= 0 || durationMinutes <= 0 || met <= 0) {
    throw new Error('Inputs must be greater than 0');
  }

  const caloriesPerMinute = (met * 3.5 * weightKg) / 200;
  const calories = caloriesPerMinute * durationMinutes;
  const caloriesPerHour = caloriesPerMinute * 60;

  return {
    calories: Math.round(calories),
    caloriesPerHour: Math.round(caloriesPerHour),
    met,
    durationMinutes,
    weightKg,
    activityLabel,
  };
}
