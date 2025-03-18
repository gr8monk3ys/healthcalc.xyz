import { HEART_RATE_ZONE_DEFINITIONS } from '@/constants/heartRateZones';
import type { HeartRateZoneMethod, HeartRateZonesResult } from '@/types/heartRateZones';

export function estimateMaxHeartRate(age: number): number {
  return Math.round(220 - age);
}

export function calculateHeartRateZones(options: {
  age: number;
  method: HeartRateZoneMethod;
  restingHeartRate?: number;
}): HeartRateZonesResult {
  const { age, method, restingHeartRate } = options;
  const maxHeartRate = estimateMaxHeartRate(age);
  const reserve = typeof restingHeartRate === 'number' ? maxHeartRate - restingHeartRate : 0;

  const zones = HEART_RATE_ZONE_DEFINITIONS.map(zone => {
    const minPercent = zone.minPercent / 100;
    const maxPercent = zone.maxPercent / 100;

    const minBpm =
      method === 'karvonen'
        ? Math.round(reserve * minPercent + (restingHeartRate || 0))
        : Math.round(maxHeartRate * minPercent);
    const maxBpm =
      method === 'karvonen'
        ? Math.round(reserve * maxPercent + (restingHeartRate || 0))
        : Math.round(maxHeartRate * maxPercent);

    return {
      id: zone.id,
      label: zone.label,
      minBpm,
      maxBpm,
      description: zone.description,
    };
  });

  return {
    age,
    method,
    maxHeartRate,
    restingHeartRate,
    zones,
  };
}
