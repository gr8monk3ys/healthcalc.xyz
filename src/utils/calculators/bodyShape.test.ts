import { describe, it, expect } from 'vitest';
import { classifyBodyShape, classifySomatotype, processBodyShapeCalculation } from './bodyShape';

describe('Body Shape Calculator', () => {
  describe('classifyBodyShape', () => {
    it('should classify hourglass shape', () => {
      // bust ≈ hips, waist much smaller
      expect(classifyBodyShape(90, 65, 90, 'female')).toBe('hourglass');
      expect(classifyBodyShape(92, 66, 91, 'female')).toBe('hourglass');
    });

    it('should classify pear shape', () => {
      // hips > bust by >5%
      expect(classifyBodyShape(85, 70, 100, 'female')).toBe('pear');
    });

    it('should classify apple shape', () => {
      // waist close to or exceeds bust and hips
      expect(classifyBodyShape(95, 98, 95, 'female')).toBe('apple');
      expect(classifyBodyShape(90, 92, 90, 'male')).toBe('apple');
    });

    it('should classify rectangle shape', () => {
      // all measurements similar
      expect(classifyBodyShape(90, 87, 90, 'female')).toBe('rectangle');
    });

    it('should classify inverted triangle', () => {
      // bust > hips by >5%
      expect(classifyBodyShape(105, 80, 90, 'male')).toBe('inverted-triangle');
    });

    it('should throw for invalid measurements', () => {
      expect(() => classifyBodyShape(0, 70, 90, 'female')).toThrow();
      expect(() => classifyBodyShape(90, 0, 90, 'female')).toThrow();
      expect(() => classifyBodyShape(90, 70, 0, 'female')).toThrow();
    });
  });

  describe('classifySomatotype', () => {
    it('should classify ectomorph for low BMI', () => {
      // BMI ~17.3 (50kg, 170cm)
      expect(classifySomatotype(170, 50)).toBe('ectomorph');
    });

    it('should classify mesomorph for normal BMI', () => {
      // BMI ~24.2 (70kg, 170cm)
      expect(classifySomatotype(170, 70)).toBe('mesomorph');
    });

    it('should classify endomorph for high BMI', () => {
      // BMI ~34.6 (100kg, 170cm)
      expect(classifySomatotype(170, 100)).toBe('endomorph');
    });

    it('should use wrist circumference for frame size', () => {
      // Small frame (ratio > 10.4): height/wrist > 10.4
      // 170/15 = 11.3 -> small frame
      const smallFrame = classifySomatotype(170, 64, 15);
      // Large frame (ratio < 9.6): height/wrist < 9.6
      // 170/18 = 9.4 -> large frame
      const largeFrame = classifySomatotype(170, 64, 18);

      // Both at same height/weight but different frame -> different somatotype
      expect(smallFrame).not.toBe(largeFrame);
    });

    it('should throw for invalid inputs', () => {
      expect(() => classifySomatotype(0, 70)).toThrow();
      expect(() => classifySomatotype(170, 0)).toThrow();
    });
  });

  describe('processBodyShapeCalculation', () => {
    it('should return full result for hourglass female', () => {
      const result = processBodyShapeCalculation({
        gender: 'female',
        bust: 91,
        waist: 66,
        hips: 91,
        height: 165,
        weight: 60,
      });
      expect(result.bodyShape).toBe('hourglass');
      expect(result.shapeDescription).toBeTruthy();
      expect(result.somatotype).toBeTruthy();
      expect(result.healthImplications.length).toBeGreaterThan(0);
      expect(result.exerciseRecommendations.length).toBeGreaterThan(0);
      expect(result.nutritionTips.length).toBeGreaterThan(0);
    });

    it('should calculate ratios correctly', () => {
      const result = processBodyShapeCalculation({
        gender: 'female',
        bust: 90,
        waist: 70,
        hips: 100,
        height: 165,
        weight: 65,
      });
      expect(result.bustToWaistRatio).toBeCloseTo(1.29, 1);
      expect(result.waistToHipRatio).toBeCloseTo(0.7, 1);
      expect(result.bustToHipRatio).toBeCloseTo(0.9, 1);
    });

    it('should throw for missing measurements', () => {
      expect(() =>
        processBodyShapeCalculation({
          gender: 'female',
          bust: 0,
          waist: 70,
          hips: 90,
          height: 165,
          weight: 60,
        })
      ).toThrow();
    });

    it('should include somatotype description', () => {
      const result = processBodyShapeCalculation({
        gender: 'male',
        bust: 100,
        waist: 85,
        hips: 95,
        height: 180,
        weight: 80,
      });
      expect(result.somatotypeDescription).toBeTruthy();
      expect(result.somatotypeDescription.length).toBeGreaterThan(0);
    });
  });
});
