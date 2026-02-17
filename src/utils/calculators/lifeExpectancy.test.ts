import { describe, it, expect } from 'vitest';
import { calculateLifeExpectancy } from './lifeExpectancy';
import { LifeExpectancyFormValues } from '@/types/lifeExpectancy';

describe('Life Expectancy Calculator', () => {
  const healthyValues: LifeExpectancyFormValues = {
    age: 35,
    gender: 'male',
    bmi: 23,
    smokingStatus: 'never',
    alcoholIntake: 'light',
    exerciseFrequency: 'moderate',
    dietQuality: 'good',
    sleepHours: 8,
    stressLevel: 'low',
    familyHistoryLongevity: true,
    chronicConditions: [],
    socialConnections: 'strong',
  };

  it('should calculate above-baseline for healthy lifestyle', () => {
    const result = calculateLifeExpectancy(healthyValues);
    expect(result.estimatedLifeExpectancy).toBeGreaterThan(result.baselineLifeExpectancy);
    expect(result.netEffect).toBeGreaterThan(0);
  });

  it('should calculate below-baseline for unhealthy lifestyle', () => {
    const result = calculateLifeExpectancy({
      ...healthyValues,
      smokingStatus: 'current-heavy',
      alcoholIntake: 'heavy',
      exerciseFrequency: 'sedentary',
      dietQuality: 'poor',
      sleepHours: 5,
      stressLevel: 'very-high',
      familyHistoryLongevity: false,
      socialConnections: 'isolated',
    });
    expect(result.estimatedLifeExpectancy).toBeLessThan(result.baselineLifeExpectancy);
    expect(result.netEffect).toBeLessThan(0);
  });

  it('should use correct baseline for gender', () => {
    const male = calculateLifeExpectancy(healthyValues);
    const female = calculateLifeExpectancy({ ...healthyValues, gender: 'female' });
    expect(male.baselineLifeExpectancy).toBe(76.3);
    expect(female.baselineLifeExpectancy).toBe(81.2);
  });

  it('should apply smoking impact correctly', () => {
    const nonSmoker = calculateLifeExpectancy(healthyValues);
    const heavySmoker = calculateLifeExpectancy({
      ...healthyValues,
      smokingStatus: 'current-heavy',
    });
    // Heavy smoking should reduce life expectancy significantly
    expect(
      nonSmoker.estimatedLifeExpectancy - heavySmoker.estimatedLifeExpectancy
    ).toBeGreaterThanOrEqual(10);
  });

  it('should apply exercise impact correctly', () => {
    const active = calculateLifeExpectancy({ ...healthyValues, exerciseFrequency: 'active' });
    const sedentary = calculateLifeExpectancy({ ...healthyValues, exerciseFrequency: 'sedentary' });
    expect(active.estimatedLifeExpectancy).toBeGreaterThan(sedentary.estimatedLifeExpectancy);
  });

  it('should apply BMI impact correctly', () => {
    const normalBMI = calculateLifeExpectancy({ ...healthyValues, bmi: 22 });
    const obeseBMI = calculateLifeExpectancy({ ...healthyValues, bmi: 35 });
    expect(normalBMI.estimatedLifeExpectancy).toBeGreaterThan(obeseBMI.estimatedLifeExpectancy);
  });

  it('should apply family history bonus', () => {
    const withHistory = calculateLifeExpectancy({ ...healthyValues, familyHistoryLongevity: true });
    const noHistory = calculateLifeExpectancy({ ...healthyValues, familyHistoryLongevity: false });
    expect(withHistory.estimatedLifeExpectancy).toBeGreaterThan(noHistory.estimatedLifeExpectancy);
  });

  it('should apply chronic condition penalties', () => {
    const healthy = calculateLifeExpectancy(healthyValues);
    const withDiabetes = calculateLifeExpectancy({
      ...healthyValues,
      chronicConditions: ['diabetes'],
    });
    expect(healthy.estimatedLifeExpectancy).toBeGreaterThan(withDiabetes.estimatedLifeExpectancy);
  });

  it('should calculate remaining years correctly', () => {
    const result = calculateLifeExpectancy(healthyValues);
    expect(result.remainingYears).toBeCloseTo(
      result.estimatedLifeExpectancy - healthyValues.age,
      0
    );
  });

  it('should calculate health age', () => {
    const result = calculateLifeExpectancy(healthyValues);
    // Healthy lifestyle should result in younger health age
    expect(result.healthAge).toBeLessThanOrEqual(healthyValues.age);
  });

  it('should never return life expectancy below current age + 1', () => {
    const result = calculateLifeExpectancy({
      ...healthyValues,
      age: 80,
      smokingStatus: 'current-heavy',
      alcoholIntake: 'heavy',
      exerciseFrequency: 'sedentary',
      dietQuality: 'poor',
      chronicConditions: ['heart-disease', 'diabetes'],
    });
    expect(result.estimatedLifeExpectancy).toBeGreaterThanOrEqual(81);
  });

  it('should cap at reasonable maximum', () => {
    const result = calculateLifeExpectancy({
      ...healthyValues,
      age: 20,
    });
    expect(result.estimatedLifeExpectancy).toBeLessThanOrEqual(105);
  });

  it('should generate recommendations for high-impact negatives', () => {
    const result = calculateLifeExpectancy({
      ...healthyValues,
      smokingStatus: 'current-heavy',
      exerciseFrequency: 'sedentary',
    });
    expect(result.topRecommendations.length).toBeGreaterThan(0);
    expect(result.topRecommendations.some(r => r.toLowerCase().includes('smoking'))).toBe(true);
  });

  it('should include positive factors', () => {
    const result = calculateLifeExpectancy(healthyValues);
    expect(result.positiveFactors.length).toBeGreaterThan(0);
  });

  it('should throw for invalid age', () => {
    expect(() => calculateLifeExpectancy({ ...healthyValues, age: 0 })).toThrow();
    expect(() => calculateLifeExpectancy({ ...healthyValues, age: 150 })).toThrow();
  });

  it('should throw for invalid BMI', () => {
    expect(() => calculateLifeExpectancy({ ...healthyValues, bmi: 0 })).toThrow();
  });

  it('should handle sleep impact', () => {
    const goodSleep = calculateLifeExpectancy({ ...healthyValues, sleepHours: 8 });
    const badSleep = calculateLifeExpectancy({ ...healthyValues, sleepHours: 4 });
    expect(goodSleep.estimatedLifeExpectancy).toBeGreaterThan(badSleep.estimatedLifeExpectancy);
  });

  it('should calculate percentile rank', () => {
    const result = calculateLifeExpectancy(healthyValues);
    expect(result.percentileRank).toBeGreaterThanOrEqual(1);
    expect(result.percentileRank).toBeLessThanOrEqual(99);
  });
});
