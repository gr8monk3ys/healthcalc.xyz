import type { CaloriesBurnedCyclingResult } from '@/types/caloriesBurnedCycling';

const CYCLING_MET_TABLE: Array<{ speed: number; met: number }> = [
  { speed: 10.0, met: 6.8 },
  { speed: 12.0, met: 8.0 },
  { speed: 14.0, met: 10.0 },
  { speed: 16.0, met: 12.0 },
  { speed: 20.0, met: 15.8 },
];

function interpolateMET(speedMph: number): number {
  const sorted = CYCLING_MET_TABLE;
  if (speedMph <= sorted[0].speed) return sorted[0].met;
  if (speedMph >= sorted[sorted.length - 1].speed) return sorted[sorted.length - 1].met;

  for (let i = 0; i < sorted.length - 1; i += 1) {
    const current = sorted[i];
    const next = sorted[i + 1];
    if (speedMph >= current.speed && speedMph <= next.speed) {
      const ratio = (speedMph - current.speed) / (next.speed - current.speed);
      return current.met + ratio * (next.met - current.met);
    }
  }

  return sorted[0].met;
}

export function calculateCaloriesBurnedCycling(
  weightKg: number,
  durationMinutes: number,
  speedMph: number
): CaloriesBurnedCyclingResult {
  if (weightKg <= 0 || durationMinutes <= 0 || speedMph <= 0) {
    throw new Error('Inputs must be greater than 0');
  }

  const met = interpolateMET(speedMph);
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
