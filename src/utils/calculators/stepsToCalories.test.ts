import { describe, it, expect } from 'vitest';
import { calculateStepsToCalories } from './stepsToCalories';

describe('Steps to Calories Calculator', () => {
  it('throws when any input is not positive', () => {
    expect(() => calculateStepsToCalories(0, 30, 'in', 60, 70)).toThrow(
      'Inputs must be greater than 0'
    );
    expect(() => calculateStepsToCalories(1000, 0, 'in', 60, 70)).toThrow(
      'Inputs must be greater than 0'
    );
    expect(() => calculateStepsToCalories(1000, 30, 'in', 0, 70)).toThrow(
      'Inputs must be greater than 0'
    );
    expect(() => calculateStepsToCalories(1000, 30, 'in', 60, 0)).toThrow(
      'Inputs must be greater than 0'
    );
  });

  it('uses walking MET values for speeds below 5 mph', () => {
    const result = calculateStepsToCalories(6336, 30, 'in', 60, 70); // ~3 mph
    expect(result.speedMph).toBe(3);
    expect(result.calories).toBe(243);
    expect(result.caloriesPerHour).toBe(243);
    expect(result.distanceMiles).toBe(3);
  });

  it('uses running MET values for speeds at or above 5 mph', () => {
    const result = calculateStepsToCalories(12672, 30, 'in', 60, 70); // ~6 mph
    expect(result.speedMph).toBe(6);
    expect(result.calories).toBe(720);
    expect(result.caloriesPerHour).toBe(720);
  });

  it('interpolates MET between running table values', () => {
    const result = calculateStepsToCalories(13728, 30, 'in', 60, 70); // ~6.5 mph
    expect(result.speedMph).toBe(6.5);
    expect(result.calories).toBe(783);
    expect(result.caloriesPerHour).toBe(783);
  });

  it('clamps to the slowest walking MET for very low speeds', () => {
    const result = calculateStepsToCalories(1056, 30, 'in', 60, 70); // ~0.5 mph
    expect(result.speedMph).toBe(0.5);
    expect(result.calories).toBe(206);
    expect(result.caloriesPerHour).toBe(206);
  });

  it('clamps to the highest running MET for very high speeds', () => {
    const result = calculateStepsToCalories(27456, 30, 'in', 60, 70); // ~13 mph
    expect(result.speedMph).toBe(13);
    expect(result.caloriesPerHour).toBe(1397);
  });

  it('supports centimeter stride input and rounds steps output', () => {
    const result = calculateStepsToCalories(8000.6, 76.2, 'cm', 75, 68);
    expect(result.distanceMiles).toBeGreaterThan(0);
    expect(result.distanceKm).toBeGreaterThan(0);
    expect(result.steps).toBe(8001);
  });
});
