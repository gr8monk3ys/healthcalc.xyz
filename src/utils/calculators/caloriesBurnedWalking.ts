import type { CaloriesBurnedWalkingResult } from '@/types/caloriesBurnedWalking';

const WALKING_MET_TABLE: Array<{ speed: number; met: number }> = [
  { speed: 2.0, met: 2.8 },
  { speed: 2.5, met: 3.0 },
  { speed: 3.0, met: 3.3 },
  { speed: 3.5, met: 3.8 },
  { speed: 4.0, met: 5.0 },
  { speed: 4.5, met: 6.3 },
];

function interpolateMET(speedMph: number): number {
  const sorted = WALKING_MET_TABLE;
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

export function calculateCaloriesBurnedWalking(
  weightKg: number,
  durationMinutes: number,
  speedMph: number
): CaloriesBurnedWalkingResult {
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
