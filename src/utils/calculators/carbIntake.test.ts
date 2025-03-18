import { describe, it, expect } from 'vitest';
import { calculateCarbIntake } from './carbIntake';

describe('Carb Intake Calculator', () => {
  it('calculates and rounds carbohydrate intake from calories and percentage', () => {
    const result = calculateCarbIntake(1999.7, 33);

    expect(result).toEqual({
      calories: 2000,
      carbPercent: 33,
      carbCalories: 660,
      carbGrams: 165,
    });
  });

  it('throws when calories are zero or negative', () => {
    expect(() => calculateCarbIntake(0, 50)).toThrow('Calories must be greater than 0');
    expect(() => calculateCarbIntake(-100, 50)).toThrow('Calories must be greater than 0');
  });

  it('throws when carb percentage is zero or negative', () => {
    expect(() => calculateCarbIntake(2000, 0)).toThrow('Carb percentage must be between 1 and 100');
    expect(() => calculateCarbIntake(2000, -10)).toThrow(
      'Carb percentage must be between 1 and 100'
    );
  });

  it('throws when carb percentage exceeds 100', () => {
    expect(() => calculateCarbIntake(2000, 101)).toThrow(
      'Carb percentage must be between 1 and 100'
    );
  });
});
