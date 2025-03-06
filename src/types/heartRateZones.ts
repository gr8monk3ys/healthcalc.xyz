import type { HeartRateZoneId } from '@/constants/heartRateZones';

export type HeartRateZoneMethod = 'percent-max' | 'karvonen';

export interface HeartRateZone {
  id: HeartRateZoneId;
  label: string;
  minBpm: number;
  maxBpm: number;
  description: string;
}

export interface HeartRateZonesResult {
  age: number;
  method: HeartRateZoneMethod;
  maxHeartRate: number;
  restingHeartRate?: number;
  zones: HeartRateZone[];
}
