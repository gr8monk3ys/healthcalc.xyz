import { describe, it, expect } from 'vitest';
import { calculateFatIntake } from './fatIntake';

describe('Fat Intake Calculator', () => {
  it('calculates and rounds fat intake from calories and percentage', () => {
    const result = calculateFatIntake(1999.7, 30);

    expect(result).toEqual({
      calories: 2000,
      fatPercent: 30,
      fatCalories: 600,
      fatGrams: 67,
    });
  });

  it('throws when calories are zero or negative', () => {
    expect(() => calculateFatIntake(0, 30)).toThrow('Calories must be greater than 0');
    expect(() => calculateFatIntake(-1, 30)).toThrow('Calories must be greater than 0');
  });

  it('throws when fat percentage is zero or negative', () => {
    expect(() => calculateFatIntake(2000, 0)).toThrow('Fat percentage must be between 1 and 100');
    expect(() => calculateFatIntake(2000, -5)).toThrow('Fat percentage must be between 1 and 100');
  });

  it('throws when fat percentage exceeds 100', () => {
    expect(() => calculateFatIntake(2000, 120)).toThrow('Fat percentage must be between 1 and 100');
  });
});
