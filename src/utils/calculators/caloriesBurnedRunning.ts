import type { CaloriesBurnedRunningResult } from '@/types/caloriesBurnedRunning';
import { interpolateMET, type MetTable } from './metInterpolation';

const RUNNING_MET_TABLE: MetTable = [
  { speed: 5.0, met: 8.3 },
  { speed: 6.0, met: 9.8 },
  { speed: 7.0, met: 11.5 },
  { speed: 8.0, met: 11.8 },
  { speed: 9.0, met: 12.8 },
  { speed: 10.0, met: 14.5 },
  { speed: 11.0, met: 16.0 },
  { speed: 12.0, met: 19.0 },
];

export function calculateCaloriesBurnedRunning(
  weightKg: number,
  durationMinutes: number,
  speedMph: number
): CaloriesBurnedRunningResult {
  if (weightKg <= 0 || durationMinutes <= 0 || speedMph <= 0) {
    throw new Error('Inputs must be greater than 0');
  }

  const met = interpolateMET(speedMph, RUNNING_MET_TABLE);
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
