import { describe, it, expect } from 'vitest';
import { calculateStepsToMiles } from './stepsToMiles';

describe('Steps to Miles Calculator', () => {
  it('throws when steps or stride length are not positive', () => {
    expect(() => calculateStepsToMiles(0, 30, 'in')).toThrow(
      'Steps and stride length must be greater than 0'
    );
    expect(() => calculateStepsToMiles(2000, -1, 'cm')).toThrow(
      'Steps and stride length must be greater than 0'
    );
  });

  it('converts steps to miles and kilometers using inches', () => {
    const result = calculateStepsToMiles(2000, 30, 'in');
    expect(result.miles).toBeCloseTo(0.95, 2);
    expect(result.kilometers).toBeCloseTo(1.52, 2);
    expect(result.strideUnit).toBe('in');
  });

  it('converts centimeter stride lengths equivalently', () => {
    const inchesResult = calculateStepsToMiles(2500, 30, 'in');
    const cmResult = calculateStepsToMiles(2500, 76.2, 'cm');

    expect(cmResult.miles).toBe(inchesResult.miles);
    expect(cmResult.kilometers).toBe(inchesResult.kilometers);
    expect(cmResult.strideUnit).toBe('cm');
  });

  it('rounds output distances to two decimal places', () => {
    const result = calculateStepsToMiles(1234, 27.35, 'in');
    expect(result.miles).toBeCloseTo(Math.round(result.miles * 100) / 100, 10);
    expect(result.kilometers).toBeCloseTo(Math.round(result.kilometers * 100) / 100, 10);
  });
});
