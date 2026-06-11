import { describe, it, expect } from 'vitest';
import { calculateCaloriesBurnedRunning } from './caloriesBurnedRunning';

describe('Calories Burned Running Calculator', () => {
  it('matches the MET formula at an exact table speed (6 mph → MET 9.8)', () => {
    // calories/min = (9.8 × 3.5 × 70) / 200 = 12.005 → 360.15 kcal over 30 min → 360
    // per hour = 12.005 × 60 = 720.3 → 720
    const result = calculateCaloriesBurnedRunning(70, 30, 6);
    expect(result.met).toBe(9.8);
    expect(result.calories).toBe(360);
    expect(result.caloriesPerHour).toBe(720);
  });

  it('linearly interpolates MET between table speeds (6.5 mph)', () => {
    // 6.5 mph is halfway between 6 mph (MET 9.8) and 7 mph (MET 11.5) → MET 10.65
    // reported MET is rounded to 1 decimal: 10.65 → 10.7
    // calories/min = (10.65 × 3.5 × 80) / 200 = 14.91 → 670.95 kcal over 45 min → 671
    // per hour = 14.91 × 60 = 894.6 → 895
    const result = calculateCaloriesBurnedRunning(80, 45, 6.5);
    expect(result.met).toBe(10.7);
    expect(result.calories).toBe(671);
    expect(result.caloriesPerHour).toBe(895);
  });

  it('clamps MET below and above the table range', () => {
    // 4 mph ≤ 5 mph table floor → MET 8.3
    const slow = calculateCaloriesBurnedRunning(70, 30, 4);
    expect(slow.met).toBe(8.3);

    // 15 mph ≥ 12 mph table ceiling → MET 19.0
    // calories/min = (19 × 3.5 × 70) / 200 = 23.275 → 698.25 kcal over 30 min → 698
    const fast = calculateCaloriesBurnedRunning(70, 30, 15);
    expect(fast.met).toBe(19);
    expect(fast.calories).toBe(698);
  });

  it('burns more calories at higher speeds and heavier weights', () => {
    const base = calculateCaloriesBurnedRunning(70, 30, 6);
    const faster = calculateCaloriesBurnedRunning(70, 30, 10);
    const heavier = calculateCaloriesBurnedRunning(90, 30, 6);
    expect(faster.calories).toBeGreaterThan(base.calories);
    expect(heavier.calories).toBeGreaterThan(base.calories);
  });

  it('throws on zero or negative inputs', () => {
    expect(() => calculateCaloriesBurnedRunning(0, 30, 6)).toThrow('Inputs must be greater than 0');
    expect(() => calculateCaloriesBurnedRunning(70, 0, 6)).toThrow('Inputs must be greater than 0');
    expect(() => calculateCaloriesBurnedRunning(70, 30, 0)).toThrow(
      'Inputs must be greater than 0'
    );
    expect(() => calculateCaloriesBurnedRunning(-70, 30, 6)).toThrow(
      'Inputs must be greater than 0'
    );
  });
});
