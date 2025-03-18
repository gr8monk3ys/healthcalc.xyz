import { describe, it, expect } from 'vitest';
import { calculateBloodPressure, getBloodPressureCategory } from './bloodPressure';

describe('Blood Pressure Calculator', () => {
  it('classifies normal blood pressure', () => {
    const result = calculateBloodPressure(118, 78);
    expect(result.categoryId).toBe('normal');
  });

  it('classifies elevated blood pressure', () => {
    const result = calculateBloodPressure(125, 78);
    expect(result.categoryId).toBe('elevated');
  });

  it('classifies stage 1 hypertension', () => {
    const result = calculateBloodPressure(132, 82);
    expect(result.categoryId).toBe('stage1');
  });

  it('classifies stage 2 hypertension', () => {
    const result = calculateBloodPressure(142, 95);
    expect(result.categoryId).toBe('stage2');
  });

  it('classifies hypertensive crisis', () => {
    const result = calculateBloodPressure(181, 121);
    expect(result.categoryId).toBe('crisis');
  });

  it('uses the higher category when systolic and diastolic differ', () => {
    const category = getBloodPressureCategory(128, 92);
    expect(category.id).toBe('stage2');
  });
});
