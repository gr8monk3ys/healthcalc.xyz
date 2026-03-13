import { convertLength } from '@/utils/conversions';
import type { RunningPaceResult, DistanceUnit } from '@/types/runningPace';

function formatPace(minutesPerUnit: number): string {
  const totalSeconds = Math.round(minutesPerUnit * 60);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function calculateRunningPace(options: {
  distance: number;
  distanceUnit: DistanceUnit;
  hours: number;
  minutes: number;
  seconds: number;
}): RunningPaceResult {
  const { distance, distanceUnit, hours, minutes, seconds } = options;

  if (distance <= 0) {
    throw new Error('Distance must be greater than 0');
  }

  const totalMinutes = hours * 60 + minutes + seconds / 60;

  if (totalMinutes <= 0) {
    throw new Error('Time must be greater than 0');
  }

  const distanceMiles = distanceUnit === 'mi' ? distance : convertLength(distance, 'km', 'mi');
  const distanceKm = distanceUnit === 'km' ? distance : convertLength(distance, 'mi', 'km');

  const pacePerMile = totalMinutes / distanceMiles;
  const pacePerKm = totalMinutes / distanceKm;
  const speedMph = distanceMiles / (totalMinutes / 60);
  const speedKph = distanceKm / (totalMinutes / 60);

  return {
    distance,
    distanceUnit,
    totalMinutes: Number(totalMinutes.toFixed(2)),
    pacePerMile: formatPace(pacePerMile),
    pacePerKm: formatPace(pacePerKm),
    speedMph: Number(speedMph.toFixed(2)),
    speedKph: Number(speedKph.toFixed(2)),
  };
}
