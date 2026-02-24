import { describe, it, expect } from 'vitest';
import { CALCULATOR_METRICS, extractMetricValue } from './calculatorMetrics';

describe('CALCULATOR_METRICS', () => {
  it('defines metrics for common calculator types', () => {
    expect(CALCULATOR_METRICS['bmi']).toBeDefined();
    expect(CALCULATOR_METRICS['tdee']).toBeDefined();
    expect(CALCULATOR_METRICS['body-fat']).toBeDefined();
    expect(CALCULATOR_METRICS['vo2-max']).toBeDefined();
  });

  it('each metric has required fields', () => {
    for (const [slug, def] of Object.entries(CALCULATOR_METRICS)) {
      expect(def.key, `${slug} missing key`).toBeTruthy();
      expect(def.label, `${slug} missing label`).toBeTruthy();
      expect(def.category, `${slug} missing category`).toBeTruthy();
    }
  });

  it('BMI has a healthy range', () => {
    const bmi = CALCULATOR_METRICS['bmi'];
    expect(bmi.healthyRange).toEqual({ min: 18.5, max: 24.9 });
    expect(bmi.higherIsBetter).toBe(false);
  });
});

describe('extractMetricValue', () => {
  it('extracts a numeric value from result data', () => {
    expect(extractMetricValue('bmi', { bmi: 22.5, category: 'normal' })).toBe(22.5);
  });

  it('returns undefined for unlisted calculator types', () => {
    expect(extractMetricValue('unknown-calc', { value: 42 })).toBeUndefined();
  });

  it('returns undefined when the metric key is missing from data', () => {
    expect(extractMetricValue('bmi', { otherField: 10 })).toBeUndefined();
  });

  it('parses string values', () => {
    expect(extractMetricValue('tdee', { tdee: '2500' })).toBe(2500);
  });

  it('returns undefined for non-finite values', () => {
    expect(extractMetricValue('bmi', { bmi: NaN })).toBeUndefined();
    expect(extractMetricValue('bmi', { bmi: Infinity })).toBeUndefined();
  });
});
