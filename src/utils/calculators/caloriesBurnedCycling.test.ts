import { describe, it, expect } from 'vitest';
import { calculateCaloriesBurnedCycling } from './caloriesBurnedCycling';

describe('Calories Burned Cycling Calculator', () => {
  it('matches the MET formula at an exact table speed (14 mph → MET 10)', () => {
    // calories/min = (10 × 3.5 × 70) / 200 = 12.25 → 551.25 kcal over 45 min → 551, 735 kcal/h
    const result = calculateCaloriesBurnedCycling(70, 45, 14);
    expect(result.met).toBe(10);
    expect(result.calories).toBe(551);
    expect(result.caloriesPerHour).toBe(735);
  });

  it('linearly interpolates MET between table speeds (13 mph)', () => {
    // 13 mph is halfway between 12 mph (MET 8.0) and 14 mph (MET 10.0) → MET 9.0
    // calories/min = (9 × 3.5 × 80) / 200 = 12.6 → 378 kcal over 30 min, 756 kcal/h
    const result = calculateCaloriesBurnedCycling(80, 30, 13);
    expect(result.met).toBeCloseTo(9.0, 1);
    expect(result.calories).toBe(378);
    expect(result.caloriesPerHour).toBe(756);
  });

  it('clamps MET below and above the table range', () => {
    // 8 mph ≤ 10 mph table floor → MET 6.8
    // calories/min = (6.8 × 3.5 × 70) / 200 = 8.33 → 499.8 kcal over 60 min rounds to 500
    const slow = calculateCaloriesBurnedCycling(70, 60, 8);
    expect(slow.met).toBe(6.8);
    expect(slow.calories).toBe(500);

    // 25 mph ≥ 20 mph table ceiling → MET 15.8
    const fast = calculateCaloriesBurnedCycling(70, 60, 25);
    expect(fast.met).toBe(15.8);
  });

  it('burns more calories at higher speeds and heavier weights', () => {
    const base = calculateCaloriesBurnedCycling(70, 30, 12);
    const faster = calculateCaloriesBurnedCycling(70, 30, 16);
    const heavier = calculateCaloriesBurnedCycling(90, 30, 12);
    expect(faster.calories).toBeGreaterThan(base.calories);
    expect(heavier.calories).toBeGreaterThan(base.calories);
  });

  it('throws on zero or negative inputs', () => {
    expect(() => calculateCaloriesBurnedCycling(0, 45, 14)).toThrow(
      'Inputs must be greater than 0'
    );
    expect(() => calculateCaloriesBurnedCycling(70, 0, 14)).toThrow(
      'Inputs must be greater than 0'
    );
    expect(() => calculateCaloriesBurnedCycling(70, 45, 0)).toThrow(
      'Inputs must be greater than 0'
    );
    expect(() => calculateCaloriesBurnedCycling(70, 45, -5)).toThrow(
      'Inputs must be greater than 0'
    );
  });
});
