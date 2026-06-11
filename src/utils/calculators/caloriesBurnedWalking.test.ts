import { describe, it, expect } from 'vitest';
import { calculateCaloriesBurnedWalking } from './caloriesBurnedWalking';

describe('Calories Burned Walking Calculator', () => {
  it('matches the MET formula at an exact table speed (3 mph → MET 3.3)', () => {
    // calories/min = (3.3 × 3.5 × 70) / 200 = 4.0425 → 121.275 kcal over 30 min → 121
    // per hour = 4.0425 × 60 = 242.55 → 243
    const result = calculateCaloriesBurnedWalking(70, 30, 3);
    expect(result.met).toBe(3.3);
    expect(result.calories).toBe(121);
    expect(result.caloriesPerHour).toBe(243);
  });

  it('linearly interpolates MET between table speeds (3.75 mph)', () => {
    // 3.75 mph is halfway between 3.5 mph (MET 3.8) and 4 mph (MET 5.0) → MET 4.4
    // calories/min = (4.4 × 3.5 × 80) / 200 = 6.16 → 369.6 kcal over 60 min → 370
    const result = calculateCaloriesBurnedWalking(80, 60, 3.75);
    expect(result.met).toBeCloseTo(4.4, 1);
    expect(result.calories).toBe(370);
    expect(result.caloriesPerHour).toBe(370);
  });

  it('clamps MET below and above the table range', () => {
    // 1 mph ≤ 2 mph table floor → MET 2.8
    // calories/min = (2.8 × 3.5 × 70) / 200 = 3.43 → 205.8 kcal over 60 min → 206
    const slow = calculateCaloriesBurnedWalking(70, 60, 1);
    expect(slow.met).toBe(2.8);
    expect(slow.calories).toBe(206);

    // 6 mph ≥ 4.5 mph table ceiling → MET 6.3
    const fast = calculateCaloriesBurnedWalking(70, 60, 6);
    expect(fast.met).toBe(6.3);
  });

  it('burns more calories at higher speeds and heavier weights', () => {
    const base = calculateCaloriesBurnedWalking(70, 30, 3);
    const faster = calculateCaloriesBurnedWalking(70, 30, 4.5);
    const heavier = calculateCaloriesBurnedWalking(90, 30, 3);
    expect(faster.calories).toBeGreaterThan(base.calories);
    expect(heavier.calories).toBeGreaterThan(base.calories);
  });

  it('throws on zero or negative inputs', () => {
    expect(() => calculateCaloriesBurnedWalking(0, 30, 3)).toThrow('Inputs must be greater than 0');
    expect(() => calculateCaloriesBurnedWalking(70, 0, 3)).toThrow('Inputs must be greater than 0');
    expect(() => calculateCaloriesBurnedWalking(70, 30, 0)).toThrow(
      'Inputs must be greater than 0'
    );
    expect(() => calculateCaloriesBurnedWalking(70, 30, -3)).toThrow(
      'Inputs must be greater than 0'
    );
  });
});
