import { describe, it, expect } from 'vitest';
import { BMI_GAUGE_SEGMENTS, getBMIGaugePosition } from './bmiGauge';

describe('getBMIGaugePosition', () => {
  it('places a BMI of 24.0 in the normal segment', () => {
    const position = getBMIGaugePosition(24);

    expect(position.segment).toBe('normal');
    expect(position.offset).toBeCloseTo(((24 - 18.5) / 6.5) * 100, 5);
  });

  it.each([
    [18.5, 'normal'],
    [25, 'overweight'],
    [30, 'obese'],
  ] as const)('puts the boundary value %s at the start of %s', (bmi, segment) => {
    expect(getBMIGaugePosition(bmi)).toEqual({ segment, offset: 0 });
  });

  it.each([
    [18.4, 'underweight'],
    [24.9, 'normal'],
    [29.9, 'overweight'],
  ] as const)('keeps %s, just under a boundary, in %s', (bmi, segment) => {
    expect(getBMIGaugePosition(bmi).segment).toBe(segment);
  });

  it('pins values off either end to the nearest edge', () => {
    expect(getBMIGaugePosition(4)).toEqual({ segment: 'underweight', offset: 0 });
    expect(getBMIGaugePosition(55)).toEqual({ segment: 'obese', offset: 100 });
  });

  it('always lands inside the segment that contains the BMI', () => {
    for (let tenths = 0; tenths <= 600; tenths += 1) {
      const bmi = tenths / 10;
      const { segment, offset } = getBMIGaugePosition(bmi);
      const range = BMI_GAUGE_SEGMENTS.find(candidate => candidate.key === segment);

      expect(range).toBeDefined();
      expect(offset).toBeGreaterThanOrEqual(0);
      expect(offset).toBeLessThanOrEqual(100);
      if (range && bmi >= 10 && bmi < 40) {
        expect(bmi).toBeGreaterThanOrEqual(range.from);
        expect(bmi).toBeLessThan(range.to);
      }
    }
  });

  it('draws contiguous segments across the 10-40 domain', () => {
    const widths = BMI_GAUGE_SEGMENTS.map(({ from, to }) => ((to - from) / 30) * 100);

    expect(widths.map(width => Number(width.toFixed(2)))).toEqual([28.33, 21.67, 16.67, 33.33]);
    BMI_GAUGE_SEGMENTS.slice(1).forEach((segment, index) => {
      expect(segment.from).toBe(BMI_GAUGE_SEGMENTS[index].to);
    });
  });
});
