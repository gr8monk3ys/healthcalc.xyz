import type { CaloriesBurnedRunningResult } from '@/types/caloriesBurnedRunning';

const RUNNING_MET_TABLE: Array<{ speed: number; met: number }> = [
  { speed: 5.0, met: 8.3 },
  { speed: 6.0, met: 9.8 },
  { speed: 7.0, met: 11.5 },
  { speed: 8.0, met: 11.8 },
  { speed: 9.0, met: 12.8 },
  { speed: 10.0, met: 14.5 },
  { speed: 11.0, met: 16.0 },
  { speed: 12.0, met: 19.0 },
];

function interpolateMET(speedMph: number): number {
  const sorted = RUNNING_MET_TABLE;
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

export function calculateCaloriesBurnedRunning(
  weightKg: number,
  durationMinutes: number,
  speedMph: number
): CaloriesBurnedRunningResult {
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
