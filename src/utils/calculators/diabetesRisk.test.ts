import { describe, it, expect } from 'vitest';
import { calculateDiabetesRisk, convertA1C } from './diabetesRisk';
import { DiabetesRiskFormValues } from '@/types/diabetesRisk';

describe('Diabetes Risk Calculator', () => {
  describe('calculateDiabetesRisk', () => {
    const lowRiskValues: DiabetesRiskFormValues = {
      age: 30,
      gender: 'male',
      bmi: 22,
      familyHistory: false,
      highBloodPressure: false,
      physicallyActive: true,
      ethnicity: 'standard',
    };

    it('should return low risk for healthy young adult', () => {
      const result = calculateDiabetesRisk(lowRiskValues);
      expect(result.riskLevel).toBe('low');
      expect(result.riskScore).toBeLessThanOrEqual(2);
      expect(result.riskPercentage).toBe(5);
    });

    it('should return higher risk for older adult with risk factors', () => {
      const result = calculateDiabetesRisk({
        ...lowRiskValues,
        age: 55,
        bmi: 32,
        familyHistory: true,
        highBloodPressure: true,
        physicallyActive: false,
        ethnicity: 'hispanic',
      });
      expect(result.riskLevel).toBe('very-high');
      expect(result.riskScore).toBeGreaterThanOrEqual(7);
    });

    it('should score age correctly', () => {
      const under40 = calculateDiabetesRisk({ ...lowRiskValues, age: 35 });
      const in40s = calculateDiabetesRisk({ ...lowRiskValues, age: 45 });
      const in50s = calculateDiabetesRisk({ ...lowRiskValues, age: 55 });
      const over60 = calculateDiabetesRisk({ ...lowRiskValues, age: 65 });

      expect(under40.riskScore).toBeLessThan(in40s.riskScore);
      expect(in40s.riskScore).toBeLessThan(in50s.riskScore);
      expect(in50s.riskScore).toBeLessThan(over60.riskScore);
    });

    it('should score BMI correctly', () => {
      const normal = calculateDiabetesRisk({ ...lowRiskValues, bmi: 22 });
      const overweight = calculateDiabetesRisk({ ...lowRiskValues, bmi: 27 });
      const obese = calculateDiabetesRisk({ ...lowRiskValues, bmi: 33 });
      const severeObese = calculateDiabetesRisk({ ...lowRiskValues, bmi: 42 });

      expect(normal.riskScore).toBeLessThan(overweight.riskScore);
      expect(overweight.riskScore).toBeLessThan(obese.riskScore);
      expect(obese.riskScore).toBeLessThan(severeObese.riskScore);
    });

    it('should add risk for family history', () => {
      const noHistory = calculateDiabetesRisk(lowRiskValues);
      const withHistory = calculateDiabetesRisk({ ...lowRiskValues, familyHistory: true });
      expect(withHistory.riskScore).toBe(noHistory.riskScore + 1);
    });

    it('should add risk for physical inactivity', () => {
      const active = calculateDiabetesRisk(lowRiskValues);
      const inactive = calculateDiabetesRisk({ ...lowRiskValues, physicallyActive: false });
      expect(inactive.riskScore).toBe(active.riskScore + 1);
    });

    it('should add risk for higher-risk ethnicity', () => {
      const standard = calculateDiabetesRisk(lowRiskValues);
      const highRisk = calculateDiabetesRisk({ ...lowRiskValues, ethnicity: 'african-american' });
      expect(highRisk.riskScore).toBe(standard.riskScore + 1);
    });

    it('should include gestational diabetes for females', () => {
      const femaleBase = calculateDiabetesRisk({ ...lowRiskValues, gender: 'female' });
      const withGD = calculateDiabetesRisk({
        ...lowRiskValues,
        gender: 'female',
        gestationalDiabetes: true,
      });
      expect(withGD.riskScore).toBe(femaleBase.riskScore + 1);
    });

    it('should include PCOS for females', () => {
      const femaleBase = calculateDiabetesRisk({ ...lowRiskValues, gender: 'female' });
      const withPCOS = calculateDiabetesRisk({
        ...lowRiskValues,
        gender: 'female',
        polycysticOvary: true,
      });
      expect(withPCOS.riskScore).toBe(femaleBase.riskScore + 1);
    });

    it('should include risk factors and protective factors', () => {
      const result = calculateDiabetesRisk(lowRiskValues);
      expect(result.protectiveFactors.length).toBeGreaterThan(0);
      expect(result.recommendations.length).toBeGreaterThan(0);
    });

    it('should throw for invalid age', () => {
      expect(() => calculateDiabetesRisk({ ...lowRiskValues, age: 0 })).toThrow();
      expect(() => calculateDiabetesRisk({ ...lowRiskValues, age: 150 })).toThrow();
    });

    it('should throw for invalid BMI', () => {
      expect(() => calculateDiabetesRisk({ ...lowRiskValues, bmi: 0 })).toThrow();
    });

    it('should handle waist circumference risk', () => {
      const noWaist = calculateDiabetesRisk(lowRiskValues);
      const highWaist = calculateDiabetesRisk({
        ...lowRiskValues,
        waistCircumference: 110,
      });
      expect(highWaist.riskScore).toBeGreaterThan(noWaist.riskScore);
    });
  });

  describe('convertA1C', () => {
    it('should convert normal A1C correctly', () => {
      const result = convertA1C({ a1cPercentage: 5.0 });
      // eAG = 28.7 * 5.0 - 46.7 = 143.5 - 46.7 = 96.8
      expect(result.estimatedAverageGlucose.mgdl).toBe(97);
      expect(result.category).toBe('Normal');
    });

    it('should identify prediabetes range', () => {
      const result = convertA1C({ a1cPercentage: 6.0 });
      expect(result.category).toBe('Prediabetes');
    });

    it('should identify diabetes range', () => {
      const result = convertA1C({ a1cPercentage: 7.0 });
      expect(result.category).toBe('Diabetes');
      // eAG = 28.7 * 7.0 - 46.7 = 200.9 - 46.7 = 154.2
      expect(result.estimatedAverageGlucose.mgdl).toBe(154);
    });

    it('should convert to mmol/L correctly', () => {
      const result = convertA1C({ a1cPercentage: 6.5 });
      // eAG mg/dL = 28.7 * 6.5 - 46.7 = 186.55 - 46.7 = 139.85 -> 140
      // mmol = 140 / 18.0 = 7.78 -> 7.8
      expect(result.estimatedAverageGlucose.mmol).toBeCloseTo(7.8, 0);
    });

    it('should include interpretation text', () => {
      const result = convertA1C({ a1cPercentage: 5.5 });
      expect(result.interpretation).toBeTruthy();
      expect(result.interpretation.length).toBeGreaterThan(0);
    });

    it('should throw for out-of-range A1C', () => {
      expect(() => convertA1C({ a1cPercentage: 2 })).toThrow();
      expect(() => convertA1C({ a1cPercentage: 25 })).toThrow();
    });

    it('should handle boundary A1C values', () => {
      const normalBoundary = convertA1C({ a1cPercentage: 5.6 });
      expect(normalBoundary.category).toBe('Normal');

      const prediabetesBoundary = convertA1C({ a1cPercentage: 5.7 });
      expect(prediabetesBoundary.category).toBe('Prediabetes');

      const diabetesBoundary = convertA1C({ a1cPercentage: 6.5 });
      expect(diabetesBoundary.category).toBe('Diabetes');
    });
  });
});
