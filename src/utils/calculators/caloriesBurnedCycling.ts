import type { CaloriesBurnedCyclingResult } from '@/types/caloriesBurnedCycling';
import { interpolateMET, type MetTable } from './metInterpolation';

const CYCLING_MET_TABLE: MetTable = [
  { speed: 10.0, met: 6.8 },
  { speed: 12.0, met: 8.0 },
  { speed: 14.0, met: 10.0 },
  { speed: 16.0, met: 12.0 },
  { speed: 20.0, met: 15.8 },
];

export function calculateCaloriesBurnedCycling(
  weightKg: number,
  durationMinutes: number,
  speedMph: number
): CaloriesBurnedCyclingResult {
  if (weightKg <= 0 || durationMinutes <= 0 || speedMph <= 0) {
    throw new Error('Inputs must be greater than 0');
  }

  const met = interpolateMET(speedMph, CYCLING_MET_TABLE);
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
