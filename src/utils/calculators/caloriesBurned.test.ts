import { describe, it, expect } from 'vitest';
import { calculateCaloriesBurned } from './caloriesBurned';

describe('Calories Burned Calculator', () => {
  it('matches the MET formula for a 70kg runner (MET 8, 30 min)', () => {
    // calories/min = (8 × 3.5 × 70) / 200 = 9.8 → 294 kcal over 30 min, 588 kcal/h
    const result = calculateCaloriesBurned(70, 30, 8, 'Running');
    expect(result.calories).toBe(294);
    expect(result.caloriesPerHour).toBe(588);
  });

  it('matches the MET formula for an 80kg cyclist (MET 6, 45 min)', () => {
    // calories/min = (6 × 3.5 × 80) / 200 = 8.4 → 378 kcal over 45 min, 504 kcal/h
    const result = calculateCaloriesBurned(80, 45, 6, 'Cycling');
    expect(result.calories).toBe(378);
    expect(result.caloriesPerHour).toBe(504);
  });

  it('rounds calories for a 55kg walker (MET 3.5, 60 min)', () => {
    // calories/min = (3.5 × 3.5 × 55) / 200 = 3.369 → 202.125 rounds to 202
    const result = calculateCaloriesBurned(55, 60, 3.5, 'Walking');
    expect(result.calories).toBe(202);
    expect(result.caloriesPerHour).toBe(202);
  });

  it('echoes inputs back in the result', () => {
    const result = calculateCaloriesBurned(70, 30, 8, 'Running');
    expect(result.met).toBe(8);
    expect(result.durationMinutes).toBe(30);
    expect(result.weightKg).toBe(70);
    expect(result.activityLabel).toBe('Running');
  });

  it('throws on zero or negative inputs', () => {
    expect(() => calculateCaloriesBurned(0, 30, 8, 'Running')).toThrow(
      'Inputs must be greater than 0'
    );
    expect(() => calculateCaloriesBurned(70, 0, 8, 'Running')).toThrow(
      'Inputs must be greater than 0'
    );
    expect(() => calculateCaloriesBurned(70, 30, 0, 'Running')).toThrow(
      'Inputs must be greater than 0'
    );
    expect(() => calculateCaloriesBurned(-70, 30, 8, 'Running')).toThrow(
      'Inputs must be greater than 0'
    );
  });
});
