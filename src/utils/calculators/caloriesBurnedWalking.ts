import type { CaloriesBurnedWalkingResult } from '@/types/caloriesBurnedWalking';
import { interpolateMET, type MetTable } from './metInterpolation';

const WALKING_MET_TABLE: MetTable = [
  { speed: 2.0, met: 2.8 },
  { speed: 2.5, met: 3.0 },
  { speed: 3.0, met: 3.3 },
  { speed: 3.5, met: 3.8 },
  { speed: 4.0, met: 5.0 },
  { speed: 4.5, met: 6.3 },
];

export function calculateCaloriesBurnedWalking(
  weightKg: number,
  durationMinutes: number,
  speedMph: number
): CaloriesBurnedWalkingResult {
  if (weightKg <= 0 || durationMinutes <= 0 || speedMph <= 0) {
    throw new Error('Inputs must be greater than 0');
  }

  const met = interpolateMET(speedMph, WALKING_MET_TABLE);
  const caloriesPerMinute = (met * 3.5 * weightKg) / 200;
  const calories = caloriesPerMinute * durationMinutes;

  return {
    calories: Math.round(calories),
    caloriesPerHour: Math.round(caloriesPerMinute * 60),
    met: Math.round(met * 10) / 10,
    speedMph: Math.round(speedMph * 10) / 10,
    durationMinutes,
  };
}
