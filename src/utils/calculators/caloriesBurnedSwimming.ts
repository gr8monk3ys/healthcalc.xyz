import type { CaloriesBurnedSwimmingResult } from '@/types/caloriesBurnedSwimming';

type SwimmingIntensity = 'easy' | 'moderate' | 'vigorous';

const SWIMMING_MET: Record<SwimmingIntensity, number> = {
  easy: 6.0,
  moderate: 8.3,
  vigorous: 10.3,
};

const INTENSITY_LABELS: Record<SwimmingIntensity, string> = {
  easy: 'Easy / Recreational',
  moderate: 'Moderate / Steady',
  vigorous: 'Vigorous / Fast',
};

export function calculateCaloriesBurnedSwimming(
  weightKg: number,
  durationMinutes: number,
  intensity: SwimmingIntensity
): CaloriesBurnedSwimmingResult {
  if (weightKg <= 0 || durationMinutes <= 0) {
    throw new Error('Inputs must be greater than 0');
  }

  const met = SWIMMING_MET[intensity];
  const caloriesPerMinute = (met * 3.5 * weightKg) / 200;
  const calories = caloriesPerMinute * durationMinutes;

  return {
    calories: Math.round(calories),
    caloriesPerHour: Math.round(caloriesPerMinute * 60),
    met: Math.round(met * 10) / 10,
    intensity: INTENSITY_LABELS[intensity],
    durationMinutes,
  };
}

export type { SwimmingIntensity };
