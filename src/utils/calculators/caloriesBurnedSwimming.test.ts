import { describe, it, expect } from 'vitest';
import { calculateCaloriesBurnedSwimming } from './caloriesBurnedSwimming';

describe('Calories Burned Swimming Calculator', () => {
  it('matches the MET formula for moderate intensity (MET 8.3)', () => {
    // calories/min = (8.3 × 3.5 × 70) / 200 = 10.1675 → 305.025 kcal over 30 min → 305
    // per hour = 10.1675 × 60 = 610.05 → 610
    const result = calculateCaloriesBurnedSwimming(70, 30, 'moderate');
    expect(result.met).toBe(8.3);
    expect(result.calories).toBe(305);
    expect(result.caloriesPerHour).toBe(610);
    expect(result.intensity).toBe('Moderate / Steady');
  });

  it('matches the MET formula for easy intensity (MET 6.0)', () => {
    // calories/min = (6 × 3.5 × 80) / 200 = 8.4 → 504 kcal over 60 min, 504 kcal/h
    const result = calculateCaloriesBurnedSwimming(80, 60, 'easy');
    expect(result.met).toBe(6);
    expect(result.calories).toBe(504);
    expect(result.caloriesPerHour).toBe(504);
    expect(result.intensity).toBe('Easy / Recreational');
  });

  it('matches the MET formula for vigorous intensity (MET 10.3)', () => {
    // calories/min = (10.3 × 3.5 × 60) / 200 = 10.815 → 486.675 kcal over 45 min → 487
    // per hour = 10.815 × 60 = 648.9 → 649
    const result = calculateCaloriesBurnedSwimming(60, 45, 'vigorous');
    expect(result.met).toBe(10.3);
    expect(result.calories).toBe(487);
    expect(result.caloriesPerHour).toBe(649);
    expect(result.intensity).toBe('Vigorous / Fast');
  });

  it('burns more calories at higher intensity', () => {
    const easy = calculateCaloriesBurnedSwimming(70, 30, 'easy');
    const moderate = calculateCaloriesBurnedSwimming(70, 30, 'moderate');
    const vigorous = calculateCaloriesBurnedSwimming(70, 30, 'vigorous');
    expect(moderate.calories).toBeGreaterThan(easy.calories);
    expect(vigorous.calories).toBeGreaterThan(moderate.calories);
  });

  it('throws on zero or negative inputs', () => {
    expect(() => calculateCaloriesBurnedSwimming(0, 30, 'moderate')).toThrow(
      'Inputs must be greater than 0'
    );
    expect(() => calculateCaloriesBurnedSwimming(70, 0, 'moderate')).toThrow(
      'Inputs must be greater than 0'
    );
    expect(() => calculateCaloriesBurnedSwimming(-70, 30, 'easy')).toThrow(
      'Inputs must be greater than 0'
    );
  });
});
