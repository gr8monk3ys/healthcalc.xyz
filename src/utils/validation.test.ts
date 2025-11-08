import { describe, it, expect } from 'vitest';
import {
  validateAge,
  validateHeight,
  validateWeight,
  validateWaist,
  validateHip,
  validateNeck,
  validateBodyFatPercentage,
  validateCalorieGoal,
  validateSpeed,
  validateDuration,
  validateFrequency,
  validateBurnGoal,
  validateWaistHipRatio,
  sanitizeNumericInput,
  isEmpty,
  VALIDATION_RANGES,
} from './validation';

describe('Age Validation', () => {
  it('should accept valid ages', () => {
    expect(validateAge(25).isValid).toBe(true);
    expect(validateAge(1).isValid).toBe(true);
    expect(validateAge(120).isValid).toBe(true);
    expect(validateAge('50').isValid).toBe(true);
  });

  it('should reject negative ages', () => {
    const result = validateAge(-5);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('at least 1');
  });

  it('should reject age of 0', () => {
    const result = validateAge(0);
    expect(result.isValid).toBe(false);
  });

  it('should reject ages over 120', () => {
    const result = validateAge(121);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('less than 120');
  });

  it('should reject non-integer ages', () => {
    const result = validateAge(25.5);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('whole number');
  });

  it('should reject non-numeric input', () => {
    const result = validateAge('abc');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('valid number');
  });
});

describe('Height Validation', () => {
  it('should accept valid metric heights', () => {
    expect(validateHeight(170, 'metric').isValid).toBe(true);
    expect(validateHeight(150, 'metric').isValid).toBe(true);
    expect(validateHeight(200, 'metric').isValid).toBe(true);
  });

  it('should accept valid imperial heights', () => {
    expect(validateHeight(70, 'imperial').isValid).toBe(true); // ~5'10"
    expect(validateHeight(60, 'imperial').isValid).toBe(true); // 5'
  });

  it('should reject unrealistically small heights', () => {
    const result = validateHeight(10, 'metric');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('at least');
  });

  it('should reject unrealistically tall heights', () => {
    const result = validateHeight(999, 'metric');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('less than');
  });

  it('should reject negative heights', () => {
    const result = validateHeight(-10, 'metric');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('greater than 0');
  });

  it('should reject non-numeric heights', () => {
    const result = validateHeight('tall', 'metric');
    expect(result.isValid).toBe(false);
  });
});

describe('Weight Validation', () => {
  it('should accept valid metric weights', () => {
    expect(validateWeight(70, 'metric').isValid).toBe(true);
    expect(validateWeight(50, 'metric').isValid).toBe(true);
    expect(validateWeight(150, 'metric').isValid).toBe(true);
  });

  it('should accept valid imperial weights', () => {
    expect(validateWeight(150, 'imperial').isValid).toBe(true);
    expect(validateWeight(200, 'imperial').isValid).toBe(true);
  });

  it('should reject unrealistically low weights', () => {
    const result = validateWeight(1, 'metric');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('at least');
  });

  it('should reject unrealistically high weights', () => {
    const result = validateWeight(999, 'metric');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('less than');
  });

  it('should reject negative weights', () => {
    const result = validateWeight(-50, 'metric');
    expect(result.isValid).toBe(false);
  });

  it('should accept decimal weights', () => {
    expect(validateWeight(70.5, 'metric').isValid).toBe(true);
  });
});

describe('Waist Validation', () => {
  it('should accept valid waist measurements', () => {
    expect(validateWaist(80, 'metric').isValid).toBe(true);
    expect(validateWaist(32, 'imperial').isValid).toBe(true);
  });

  it('should reject unrealistic waist measurements', () => {
    expect(validateWaist(10, 'metric').isValid).toBe(false);
    expect(validateWaist(999, 'metric').isValid).toBe(false);
  });

  it('should reject negative waist measurements', () => {
    const result = validateWaist(-10, 'metric');
    expect(result.isValid).toBe(false);
  });
});

describe('Hip Validation', () => {
  it('should accept valid hip measurements', () => {
    expect(validateHip(100, 'metric').isValid).toBe(true);
    expect(validateHip(40, 'imperial').isValid).toBe(true);
  });

  it('should reject unrealistic hip measurements', () => {
    expect(validateHip(10, 'metric').isValid).toBe(false);
    expect(validateHip(999, 'metric').isValid).toBe(false);
  });
});

describe('Neck Validation', () => {
  it('should accept valid neck measurements', () => {
    expect(validateNeck(35, 'metric').isValid).toBe(true);
    expect(validateNeck(15, 'imperial').isValid).toBe(true);
  });

  it('should reject unrealistic neck measurements', () => {
    expect(validateNeck(5, 'metric').isValid).toBe(false);
    expect(validateNeck(999, 'metric').isValid).toBe(false);
  });
});

describe('Body Fat Percentage Validation', () => {
  it('should accept valid body fat percentages', () => {
    expect(validateBodyFatPercentage(15).isValid).toBe(true);
    expect(validateBodyFatPercentage(25).isValid).toBe(true);
    expect(validateBodyFatPercentage(35).isValid).toBe(true);
  });

  it('should reject unrealistic body fat percentages', () => {
    expect(validateBodyFatPercentage(0).isValid).toBe(false);
    expect(validateBodyFatPercentage(80).isValid).toBe(false);
  });

  it('should accept decimal values', () => {
    expect(validateBodyFatPercentage(12.5).isValid).toBe(true);
  });
});

describe('Calorie Goal Validation', () => {
  it('should accept valid calorie goals', () => {
    expect(validateCalorieGoal(500).isValid).toBe(true);
    expect(validateCalorieGoal(-500).isValid).toBe(true); // deficit
    expect(validateCalorieGoal(0).isValid).toBe(true); // maintenance
  });

  it('should reject extreme calorie goals', () => {
    expect(validateCalorieGoal(-6000).isValid).toBe(false);
    expect(validateCalorieGoal(6000).isValid).toBe(false);
  });
});

describe('Speed Validation', () => {
  it('should accept valid speeds', () => {
    expect(validateSpeed(3).isValid).toBe(true);
    expect(validateSpeed(6).isValid).toBe(true);
    expect(validateSpeed(10).isValid).toBe(true);
  });

  it('should reject unrealistic speeds', () => {
    expect(validateSpeed(0).isValid).toBe(false);
    expect(validateSpeed(50).isValid).toBe(false);
  });

  it('should accept decimal speeds', () => {
    expect(validateSpeed(3.5).isValid).toBe(true);
  });
});

describe('Duration Validation', () => {
  it('should accept valid durations', () => {
    expect(validateDuration(30).isValid).toBe(true);
    expect(validateDuration(60).isValid).toBe(true);
    expect(validateDuration(120).isValid).toBe(true);
  });

  it('should reject unrealistic durations', () => {
    expect(validateDuration(0).isValid).toBe(false);
    expect(validateDuration(2000).isValid).toBe(false); // > 24 hours
  });

  it('should accept durations up to 24 hours', () => {
    expect(validateDuration(1440).isValid).toBe(true);
  });
});

describe('Frequency Validation', () => {
  it('should accept valid frequencies', () => {
    expect(validateFrequency(3).isValid).toBe(true);
    expect(validateFrequency(7).isValid).toBe(true);
  });

  it('should reject unrealistic frequencies', () => {
    expect(validateFrequency(0).isValid).toBe(false);
    expect(validateFrequency(20).isValid).toBe(false);
  });

  it('should reject decimal frequencies', () => {
    const result = validateFrequency(3.5);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('whole number');
  });
});

describe('Burn Goal Validation', () => {
  it('should accept valid burn goals', () => {
    expect(validateBurnGoal(10).isValid).toBe(true);
    expect(validateBurnGoal(20).isValid).toBe(true);
    expect(validateBurnGoal(0.5).isValid).toBe(true);
  });

  it('should reject unrealistic burn goals', () => {
    expect(validateBurnGoal(0).isValid).toBe(false);
    expect(validateBurnGoal(600).isValid).toBe(false);
  });
});

describe('Waist-Hip Ratio Validation', () => {
  it('should accept valid waist-hip ratios', () => {
    const result = validateWaistHipRatio(80, 100);
    expect(result.isValid).toBe(true);
  });

  it('should warn when waist >= hip', () => {
    const result = validateWaistHipRatio(100, 90);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('less than hip');
  });

  it('should warn when waist equals hip', () => {
    const result = validateWaistHipRatio(90, 90);
    expect(result.isValid).toBe(false);
  });
});

describe('Utility Functions', () => {
  describe('sanitizeNumericInput', () => {
    it('should remove non-numeric characters', () => {
      expect(sanitizeNumericInput('abc123')).toBe('123');
      expect(sanitizeNumericInput('12.5abc')).toBe('12.5');
      expect(sanitizeNumericInput('$100')).toBe('100');
    });

    it('should preserve decimal points and minus signs', () => {
      expect(sanitizeNumericInput('-12.5')).toBe('-12.5');
      expect(sanitizeNumericInput('12.5')).toBe('12.5');
    });
  });

  describe('isEmpty', () => {
    it('should identify empty values', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty('')).toBe(true);
    });

    it('should identify non-empty values', () => {
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty('0')).toBe(false);
      expect(isEmpty(false)).toBe(false);
    });
  });
});

describe('Edge Cases', () => {
  it('should handle string inputs for numeric validators', () => {
    expect(validateAge('25').isValid).toBe(true);
    expect(validateWeight('70', 'metric').isValid).toBe(true);
    expect(validateHeight('170', 'metric').isValid).toBe(true);
  });

  it('should handle very large numbers', () => {
    expect(validateAge(1000000).isValid).toBe(false);
    expect(validateWeight(1000000, 'metric').isValid).toBe(false);
  });

  it('should handle very small positive numbers', () => {
    expect(validateAge(0.1).isValid).toBe(false);
    expect(validateWeight(0.1, 'metric').isValid).toBe(false);
  });

  it('should handle Infinity', () => {
    expect(validateAge(Infinity).isValid).toBe(false);
    expect(validateWeight(Infinity, 'metric').isValid).toBe(false);
  });

  it('should handle NaN strings', () => {
    expect(validateAge('NaN').isValid).toBe(false);
    expect(validateWeight('not a number', 'metric').isValid).toBe(false);
  });
});

describe('Validation Ranges', () => {
  it('should have consistent validation ranges', () => {
    expect(VALIDATION_RANGES.age.min).toBe(1);
    expect(VALIDATION_RANGES.age.max).toBe(120);
    expect(VALIDATION_RANGES.weight.kg.min).toBe(2);
    expect(VALIDATION_RANGES.height.cm.min).toBe(30);
  });

  it('should have realistic ranges', () => {
    // Age should cover human lifespan
    expect(VALIDATION_RANGES.age.max).toBeGreaterThanOrEqual(100);

    // Height should cover extreme cases
    expect(VALIDATION_RANGES.height.cm.max).toBeGreaterThanOrEqual(250);

    // Weight should cover extreme cases
    expect(VALIDATION_RANGES.weight.kg.max).toBeGreaterThanOrEqual(300);
  });
});
