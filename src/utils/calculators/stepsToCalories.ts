import { convertLength } from '@/utils/conversions';
import type { StepsToCaloriesResult } from '@/types/stepsToCalories';

type StrideUnit = 'in' | 'cm';

const WALKING_MET_TABLE: Array<{ speed: number; met: number }> = [
  { speed: 2.0, met: 2.8 },
  { speed: 2.5, met: 3.0 },
  { speed: 3.0, met: 3.3 },
  { speed: 3.5, met: 3.8 },
  { speed: 4.0, met: 5.0 },
  { speed: 4.5, met: 6.3 },
];

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

function interpolateMET(speedMph: number, table: Array<{ speed: number; met: number }>): number {
  if (speedMph <= table[0].speed) return table[0].met;
  if (speedMph >= table[table.length - 1].speed) return table[table.length - 1].met;

  for (let i = 0; i < table.length - 1; i += 1) {
    const current = table[i];
    const next = table[i + 1];
    if (speedMph >= current.speed && speedMph <= next.speed) {
      const ratio = (speedMph - current.speed) / (next.speed - current.speed);
      return current.met + ratio * (next.met - current.met);
    }
  }

  return table[0].met;
}

export function calculateStepsToCalories(
  steps: number,
  strideLength: number,
  strideUnit: StrideUnit,
  durationMinutes: number,
  weightKg: number
): StepsToCaloriesResult {
  if (steps <= 0 || strideLength <= 0 || durationMinutes <= 0 || weightKg <= 0) {
    throw new Error('Inputs must be greater than 0');
  }

  const strideInches = strideUnit === 'in' ? strideLength : convertLength(strideLength, 'cm', 'in');
  const distanceInches = steps * strideInches;
  const distanceMiles = distanceInches / 63360;
  const distanceKm = distanceMiles * 1.60934;
  const hours = durationMinutes / 60;
  const speedMph = hours > 0 ? distanceMiles / hours : 0;

  const met =
    speedMph >= 5
      ? interpolateMET(speedMph, RUNNING_MET_TABLE)
      : interpolateMET(speedMph, WALKING_MET_TABLE);
  const caloriesPerMinute = (met * 3.5 * weightKg) / 200;
  const calories = caloriesPerMinute * durationMinutes;

  return {
    calories: Math.round(calories),
    caloriesPerHour: Math.round(caloriesPerMinute * 60),
    distanceMiles: Math.round(distanceMiles * 100) / 100,
    distanceKm: Math.round(distanceKm * 100) / 100,
    speedMph: Math.round(speedMph * 10) / 10,
    durationMinutes,
    steps: Math.round(steps),
  };
}

export type { StrideUnit };
