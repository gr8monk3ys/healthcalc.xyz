import { describe, it, expect } from 'vitest';
import { estimateMaxHeartRate, calculateHeartRateZones } from './heartRateZones';

describe('Heart Rate Zones', () => {
  it('estimates max heart rate from age', () => {
    expect(estimateMaxHeartRate(30)).toBe(190);
  });

  it('calculates zones using percent max method', () => {
    const result = calculateHeartRateZones({ age: 30, method: 'percent-max' });
    expect(result.maxHeartRate).toBe(190);
    expect(result.zones[0].minBpm).toBe(Math.round(190 * 0.5));
  });

  it('calculates zones using Karvonen method', () => {
    const result = calculateHeartRateZones({ age: 30, method: 'karvonen', restingHeartRate: 60 });
    expect(result.zones[0].minBpm).toBe(Math.round((190 - 60) * 0.5 + 60));
  });
});
