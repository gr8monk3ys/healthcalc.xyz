import { describe, it, expect } from 'vitest';
import {
  calculateABSI,
  calculateABSIZScore,
  getABSIRiskCategory,
  calculateWaistHeightRatio,
  getWaistHeightRatioCategory,
  calculateABSIMetrics,
} from './absi';

describe('ABSI Calculation', () => {
  describe('calculateABSI', () => {
    it('should calculate ABSI correctly', () => {
      // Example: 90cm waist, 175cm height, 70kg weight
      // BMI = 70 / (1.75^2) = 22.86
      // ABSI = 0.9 / (22.86^(2/3) * 1.75^0.5) = 0.9 / (8.053 * 1.323) ≈ 0.0845
      const absi = calculateABSI(90, 175, 70);
      expect(absi).toBeGreaterThan(0.08);
      expect(absi).toBeLessThan(0.09);
    });

    it('should calculate ABSI for various measurements', () => {
      const absi1 = calculateABSI(85, 170, 65);
      const absi2 = calculateABSI(95, 180, 80);
      const absi3 = calculateABSI(75, 165, 55);

      expect(absi1).toBeGreaterThan(0);
      expect(absi2).toBeGreaterThan(0);
      expect(absi3).toBeGreaterThan(0);
    });

    it('should give higher ABSI for larger waist relative to height/weight', () => {
      // Same height and weight, but different waist
      const absi1 = calculateABSI(80, 175, 70); // Smaller waist
      const absi2 = calculateABSI(100, 175, 70); // Larger waist

      expect(absi2).toBeGreaterThan(absi1);
    });

    it('should handle decimal values', () => {
      const absi = calculateABSI(87.5, 172.5, 68.3);
      expect(absi).toBeGreaterThan(0);
      expect(absi).toBeLessThan(0.1);
    });
  });

  describe('calculateABSIZScore', () => {
    describe('Male z-scores', () => {
      it('should calculate z-score for young adult male', () => {
        // 25-year-old male: mean = 0.0783, sd = 0.0037
        // ABSI = 0.0783 gives z-score = 0
        const zScore = calculateABSIZScore(0.0783, 25, 'male');
        expect(zScore).toBeCloseTo(0, 2);
      });

      it('should calculate positive z-score for high ABSI', () => {
        // ABSI above mean should give positive z-score
        const zScore = calculateABSIZScore(0.085, 30, 'male');
        expect(zScore).toBeGreaterThan(0);
      });

      it('should calculate negative z-score for low ABSI', () => {
        // ABSI below mean should give negative z-score
        const zScore = calculateABSIZScore(0.075, 30, 'male');
        expect(zScore).toBeLessThan(0);
      });

      it('should use correct mean for different age groups', () => {
        const absi = 0.08;
        const zScore20 = calculateABSIZScore(absi, 25, 'male');
        const zScore50 = calculateABSIZScore(absi, 55, 'male');

        // Different age groups have different means, so z-scores differ
        expect(zScore20).not.toBe(zScore50);
      });
    });

    describe('Female z-scores', () => {
      it('should calculate z-score for young adult female', () => {
        // 25-year-old female: mean = 0.0764, sd = 0.0038
        const zScore = calculateABSIZScore(0.0764, 25, 'female');
        expect(zScore).toBeCloseTo(0, 2);
      });

      it('should calculate positive z-score for high ABSI', () => {
        const zScore = calculateABSIZScore(0.085, 30, 'female');
        expect(zScore).toBeGreaterThan(0);
      });

      it('should calculate negative z-score for low ABSI', () => {
        const zScore = calculateABSIZScore(0.070, 30, 'female');
        expect(zScore).toBeLessThan(0);
      });
    });

    it('should throw error for age outside range', () => {
      expect(() => calculateABSIZScore(0.08, 1, 'male')).toThrow(
        'No ABSI mean data found for male age 1'
      );
    });

    it('should handle boundary ages', () => {
      expect(() => calculateABSIZScore(0.08, 2, 'male')).not.toThrow();
      expect(() => calculateABSIZScore(0.08, 120, 'male')).not.toThrow();
    });
  });

  describe('getABSIRiskCategory', () => {
    it('should categorize very low risk', () => {
      const result = getABSIRiskCategory(-1.5);
      expect(result.name).toBe('Very Low Risk');
      expect(result.color).toBe('#10B981');
      expect(result.description).toBeDefined();
    });

    it('should categorize low risk', () => {
      const result1 = getABSIRiskCategory(-0.5);
      expect(result1.name).toBe('Low Risk');
      expect(result1.color).toBe('#34D399');

      const result2 = getABSIRiskCategory(-0.868);
      expect(result2.name).toBe('Low Risk');
    });

    it('should categorize average risk', () => {
      const result1 = getABSIRiskCategory(0);
      expect(result1.name).toBe('Average Risk');
      expect(result1.color).toBe('#FBBF24');

      const result2 = getABSIRiskCategory(-0.1);
      expect(result2.name).toBe('Average Risk');
    });

    it('should categorize high risk', () => {
      const result1 = getABSIRiskCategory(0.5);
      expect(result1.name).toBe('High Risk');
      expect(result1.color).toBe('#F97316');

      const result2 = getABSIRiskCategory(0.229);
      expect(result2.name).toBe('High Risk');
    });

    it('should categorize very high risk', () => {
      const result = getABSIRiskCategory(1.5);
      expect(result.name).toBe('Very High Risk');
      expect(result.color).toBe('#EF4444');
    });

    it('should handle boundary values', () => {
      expect(getABSIRiskCategory(-0.869).name).toBe('Very Low Risk');
      expect(getABSIRiskCategory(-0.868).name).toBe('Low Risk');
      expect(getABSIRiskCategory(-0.272).name).toBe('Average Risk');
      expect(getABSIRiskCategory(0.229).name).toBe('High Risk');
      expect(getABSIRiskCategory(0.798).name).toBe('Very High Risk');
    });
  });

  describe('calculateWaistHeightRatio', () => {
    it('should calculate waist-to-height ratio correctly', () => {
      const ratio = calculateWaistHeightRatio(80, 170);
      expect(ratio).toBeCloseTo(0.471, 3);
    });

    it('should handle various measurements', () => {
      expect(calculateWaistHeightRatio(90, 180)).toBe(0.5);
      expect(calculateWaistHeightRatio(75, 165)).toBeCloseTo(0.455, 3);
      expect(calculateWaistHeightRatio(100, 175)).toBeCloseTo(0.571, 3);
    });

    it('should handle decimal values', () => {
      const ratio = calculateWaistHeightRatio(87.5, 172.5);
      expect(ratio).toBeCloseTo(0.507, 3);
    });
  });

  describe('getWaistHeightRatioCategory', () => {
    it('should categorize underweight', () => {
      const result = getWaistHeightRatioCategory(0.40);
      expect(result.name).toBe('Underweight');
      expect(result.description).toBeDefined();
    });

    it('should categorize healthy range', () => {
      const result = getWaistHeightRatioCategory(0.48);
      expect(result.name).toBeDefined();
      expect(result.description).toBeDefined();
    });

    it('should categorize above healthy range', () => {
      const result = getWaistHeightRatioCategory(0.55);
      expect(result.name).toBeDefined();
      expect(result.description).toBeDefined();
    });
  });

  describe('calculateABSIMetrics', () => {
    it('should calculate all metrics for male', () => {
      const result = calculateABSIMetrics(90, 175, 70, 30, 'male');

      expect(result.absi).toBeGreaterThan(0);
      expect(result.absiZScore).toBeDefined();
      expect(result.riskCategory).toBeDefined();
      expect(result.color).toBeDefined();
      expect(result.bmi).toBeCloseTo(22.86, 1);
      expect(result.bmiCategory).toBeDefined();
      expect(result.waistHeightRatio).toBeCloseTo(0.514, 2);
    });

    it('should calculate all metrics for female', () => {
      const result = calculateABSIMetrics(80, 165, 60, 35, 'female');

      expect(result.absi).toBeGreaterThan(0);
      expect(result.absiZScore).toBeDefined();
      expect(result.riskCategory).toBeDefined();
      expect(result.color).toBeDefined();
      expect(result.bmi).toBeCloseTo(22.04, 1);
      expect(result.bmiCategory).toBeDefined();
      expect(result.waistHeightRatio).toBeCloseTo(0.485, 2);
    });

    it('should return consistent metrics', () => {
      const result = calculateABSIMetrics(95, 180, 85, 45, 'male');

      // ABSI should be calculated from waist, height, weight
      const expectedABSI = calculateABSI(95, 180, 85);
      expect(result.absi).toBeCloseTo(expectedABSI, 4);

      // Z-score should match manual calculation
      const expectedZScore = calculateABSIZScore(result.absi, 45, 'male');
      expect(result.absiZScore).toBeCloseTo(expectedZScore, 4);

      // Waist-height ratio should match
      expect(result.waistHeightRatio).toBeCloseTo(95 / 180, 4);
    });
  });
});

describe('ABSI Real-World Examples', () => {
  it('should calculate ABSI for healthy male', () => {
    // Healthy 30-year-old male: 85cm waist, 175cm height, 70kg
    const result = calculateABSIMetrics(85, 175, 70, 30, 'male');

    expect(result.absi).toBeGreaterThan(0.07);
    expect(result.absi).toBeLessThan(0.09);
    expect(result.bmiCategory).toBe('Normal');
  });

  it('should calculate ABSI for male with abdominal obesity', () => {
    // 50-year-old male with abdominal obesity: 110cm waist, 175cm height, 85kg
    const result = calculateABSIMetrics(110, 175, 85, 50, 'male');

    expect(result.absi).toBeGreaterThan(0.08);
    expect(result.absiZScore).toBeGreaterThan(0);
    // Higher ABSI suggests higher risk
  });

  it('should calculate ABSI for healthy female', () => {
    // Healthy 28-year-old female: 75cm waist, 165cm height, 58kg
    const result = calculateABSIMetrics(75, 165, 58, 28, 'female');

    expect(result.absi).toBeGreaterThan(0.07);
    expect(result.absi).toBeLessThan(0.09);
    expect(result.bmiCategory).toBe('Normal');
  });

  it('should show different risk assessments across age groups', () => {
    // Same measurements but different ages
    const young = calculateABSIMetrics(90, 175, 70, 25, 'male');
    const older = calculateABSIMetrics(90, 175, 70, 65, 'male');

    // ABSI values should be the same
    expect(young.absi).toBeCloseTo(older.absi, 4);

    // But z-scores differ due to age-specific norms
    expect(young.absiZScore).not.toBe(older.absiZScore);
  });

  it('should calculate waist-to-height ratio correctly', () => {
    // Healthy guideline: waist should be less than half your height
    const healthy = calculateABSIMetrics(85, 175, 70, 30, 'male');
    expect(healthy.waistHeightRatio).toBeLessThan(0.5);

    const risk = calculateABSIMetrics(95, 175, 75, 30, 'male');
    expect(risk.waistHeightRatio).toBeGreaterThan(0.5);
  });

  it('should handle athletes with low body fat', () => {
    // Athletic male: 75cm waist, 180cm height, 75kg
    const result = calculateABSIMetrics(75, 180, 75, 28, 'male');

    expect(result.absi).toBeGreaterThan(0);
    expect(result.waistHeightRatio).toBeCloseTo(0.417, 2);
    expect(result.bmiCategory).toBe('Normal');
  });
});

describe('ABSI Edge Cases', () => {
  it('should handle very tall person', () => {
    const result = calculateABSIMetrics(95, 200, 90, 30, 'male');
    expect(result.absi).toBeGreaterThan(0);
    expect(result.absiZScore).toBeDefined();
  });

  it('should handle very short person', () => {
    const result = calculateABSIMetrics(75, 150, 50, 30, 'female');
    expect(result.absi).toBeGreaterThan(0);
    expect(result.absiZScore).toBeDefined();
  });

  it('should handle elderly person', () => {
    const result = calculateABSIMetrics(95, 170, 75, 75, 'male');
    expect(result.absi).toBeGreaterThan(0);
    expect(result.absiZScore).toBeDefined();
    expect(result.riskCategory).toBeDefined();
  });

  it('should handle young adult', () => {
    const result = calculateABSIMetrics(80, 170, 65, 20, 'female');
    expect(result.absi).toBeGreaterThan(0);
    expect(result.absiZScore).toBeDefined();
  });
});

describe('ABSI Formula Validation', () => {
  it('should match the ABSI formula: ABSI = WC / (BMI^(2/3) * H^(1/2))', () => {
    const waistCm = 90;
    const heightCm = 175;
    const weightKg = 70;

    const absi = calculateABSI(waistCm, heightCm, weightKg);

    // Manual calculation
    const waistM = waistCm / 100;
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    const expectedABSI = waistM / (Math.pow(bmi, 2 / 3) * Math.pow(heightM, 1 / 2));

    expect(absi).toBeCloseTo(expectedABSI, 6);
  });

  it('should calculate z-score correctly: (value - mean) / sd', () => {
    const absi = 0.085;
    const age = 30;
    const gender = 'male';

    const zScore = calculateABSIZScore(absi, age, gender);

    // For 30-year-old male: mean = 0.0799, sd = 0.0038
    const expectedZScore = (0.085 - 0.0799) / 0.0038;

    expect(zScore).toBeCloseTo(expectedZScore, 4);
  });
});
