import { describe, it, expect } from 'vitest';
import { calculateWaterIntake } from './waterIntake';

describe('Water Intake Calculator', () => {
  it('matches 35 ml/kg baseline for a 70kg person with low activity', () => {
    // total = 70 × 35 + 0 = 2450 ml = 2.45 L
    // ounces = 2450 / 29.5735 = 82.84 → 83; cups = 82.84 / 8 = 10.36 → 10.4
    const result = calculateWaterIntake(70, 'low', 'kg');
    expect(result.totalMl).toBe(2450);
    expect(result.liters).toBe(2.45);
    expect(result.ounces).toBe(83);
    expect(result.cups).toBe(10.4);
  });

  it('adds 700 ml for high activity', () => {
    // total = 70 × 35 + 700 = 3150 ml = 3.15 L
    // ounces = 3150 / 29.5735 = 106.51 → 107; cups = 106.51 / 8 = 13.31 → 13.3
    const result = calculateWaterIntake(70, 'high', 'kg');
    expect(result.totalMl).toBe(3150);
    expect(result.liters).toBe(3.15);
    expect(result.ounces).toBe(107);
    expect(result.cups).toBe(13.3);
  });

  it('adds 350 ml for moderate activity', () => {
    // total = 60 × 35 + 350 = 2450 ml = 2.45 L
    const result = calculateWaterIntake(60, 'moderate', 'kg');
    expect(result.totalMl).toBe(2450);
    expect(result.liters).toBe(2.45);
  });

  it('scales with weight and activity level', () => {
    const light = calculateWaterIntake(60, 'low', 'kg');
    const heavy = calculateWaterIntake(90, 'low', 'kg');
    expect(heavy.totalMl).toBeGreaterThan(light.totalMl);

    const low = calculateWaterIntake(70, 'low', 'kg');
    const moderate = calculateWaterIntake(70, 'moderate', 'kg');
    const high = calculateWaterIntake(70, 'high', 'kg');
    expect(moderate.totalMl - low.totalMl).toBe(350);
    expect(high.totalMl - low.totalMl).toBe(700);
  });

  it('echoes the inputs back in the result', () => {
    const result = calculateWaterIntake(72.46, 'moderate', 'lb');
    expect(result.weightKg).toBe(72.5);
    expect(result.activityLevel).toBe('moderate');
    expect(result.weightUnit).toBe('lb');
  });
});
