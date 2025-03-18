import { describe, expect, it } from 'vitest';
import { estimateMetricPercentile } from './metricPercentiles';

describe('estimateMetricPercentile', () => {
  it('returns undefined for unsupported calculator slugs', () => {
    expect(estimateMetricPercentile('unknown', 123)).toBeUndefined();
  });

  it('returns around 50th percentile near the configured mean', () => {
    expect(estimateMetricPercentile('bmi', 27.5)).toBe(50);
    expect(estimateMetricPercentile('tdee', 2200)).toBe(50);
  });

  it('returns lower percentiles for lower-than-mean values', () => {
    const percentile = estimateMetricPercentile('bmi', 20);
    expect(percentile).toBeDefined();
    expect(percentile!).toBeLessThan(50);
  });

  it('returns higher percentiles for higher-than-mean values', () => {
    const percentile = estimateMetricPercentile('vo2-max', 55);
    expect(percentile).toBeDefined();
    expect(percentile!).toBeGreaterThan(50);
  });

  it('clamps results into 1-99 range', () => {
    expect(estimateMetricPercentile('bmi', -999)).toBe(1);
    expect(estimateMetricPercentile('bmi', 999)).toBe(99);
  });
});
