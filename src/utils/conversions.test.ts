import { describe, it, expect } from 'vitest';
import {
  convertHeight,
  heightFtInToCm,
  heightCmToFtIn,
  convertWeight,
  weightLbToKg,
  weightKgToLb,
  convertTemperature,
  convertEnergy,
  convertLength,
  convertVolume,
  formatNumber,
} from './conversions';

describe('Height Conversions', () => {
  describe('convertHeight', () => {
    it('should convert cm to ft correctly', () => {
      expect(convertHeight(180, 'cm', 'ft')).toBeCloseTo(5.906, 2);
      expect(convertHeight(170, 'cm', 'ft')).toBeCloseTo(5.577, 2);
      expect(convertHeight(160, 'cm', 'ft')).toBeCloseTo(5.249, 2);
    });

    it('should convert ft to cm correctly', () => {
      expect(convertHeight(6, 'ft', 'cm')).toBeCloseTo(182.88, 1);
      expect(convertHeight(5.5, 'ft', 'cm')).toBeCloseTo(167.64, 1);
      expect(convertHeight(5, 'ft', 'cm')).toBeCloseTo(152.4, 1);
    });

    it('should return same value when units are the same', () => {
      expect(convertHeight(180, 'cm', 'cm')).toBe(180);
      expect(convertHeight(6, 'ft', 'ft')).toBe(6);
    });

    it('should handle zero correctly', () => {
      expect(convertHeight(0, 'cm', 'ft')).toBe(0);
      expect(convertHeight(0, 'ft', 'cm')).toBe(0);
    });

    it('should throw error for invalid conversion', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => convertHeight(180, 'cm' as any, 'invalid' as any)).toThrow();
    });
  });

  describe('heightFtInToCm', () => {
    it('should convert feet and inches to cm correctly', () => {
      expect(heightFtInToCm(5, 11)).toBeCloseTo(180.34, 1);
      expect(heightFtInToCm(6, 0)).toBeCloseTo(182.88, 1);
      expect(heightFtInToCm(5, 6)).toBeCloseTo(167.64, 1);
    });

    it('should handle zero inches', () => {
      expect(heightFtInToCm(5, 0)).toBeCloseTo(152.4, 1);
    });

    it('should handle zero feet', () => {
      expect(heightFtInToCm(0, 6)).toBeCloseTo(15.24, 1);
    });

    it('should handle both zero', () => {
      expect(heightFtInToCm(0, 0)).toBe(0);
    });
  });

  describe('heightCmToFtIn', () => {
    it('should convert cm to feet and inches correctly', () => {
      const result1 = heightCmToFtIn(180);
      expect(result1.feet).toBe(5);
      expect(result1.inches).toBeCloseTo(10.9, 1);

      const result2 = heightCmToFtIn(170);
      expect(result2.feet).toBe(5);
      expect(result2.inches).toBeCloseTo(6.9, 1);
    });

    it('should handle zero', () => {
      const result = heightCmToFtIn(0);
      expect(result.feet).toBe(0);
      expect(result.inches).toBe(0);
    });

    it('should round values appropriately', () => {
      const result = heightCmToFtIn(182.88); // exactly 6 ft
      expect(result.feet).toBe(6);
      expect(result.inches).toBeCloseTo(0, 1);
    });
  });
});

describe('Weight Conversions', () => {
  describe('convertWeight', () => {
    it('should convert kg to lb correctly', () => {
      expect(convertWeight(70, 'kg', 'lb')).toBeCloseTo(154.32, 1);
      expect(convertWeight(80, 'kg', 'lb')).toBeCloseTo(176.37, 1);
      expect(convertWeight(90, 'kg', 'lb')).toBeCloseTo(198.42, 1);
    });

    it('should convert lb to kg correctly', () => {
      expect(convertWeight(150, 'lb', 'kg')).toBeCloseTo(68.04, 1);
      expect(convertWeight(200, 'lb', 'kg')).toBeCloseTo(90.72, 1);
      expect(convertWeight(100, 'lb', 'kg')).toBeCloseTo(45.36, 1);
    });

    it('should return same value when units are the same', () => {
      expect(convertWeight(70, 'kg', 'kg')).toBe(70);
      expect(convertWeight(150, 'lb', 'lb')).toBe(150);
    });

    it('should handle zero correctly', () => {
      expect(convertWeight(0, 'kg', 'lb')).toBe(0);
      expect(convertWeight(0, 'lb', 'kg')).toBe(0);
    });

    it('should throw error for invalid conversion', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => convertWeight(70, 'kg' as any, 'invalid' as any)).toThrow();
    });
  });

  describe('weightLbToKg', () => {
    it('should convert pounds to kilograms correctly', () => {
      expect(weightLbToKg(150)).toBeCloseTo(68.04, 1);
      expect(weightLbToKg(200)).toBeCloseTo(90.72, 1);
      expect(weightLbToKg(100)).toBeCloseTo(45.36, 1);
    });

    it('should handle zero', () => {
      expect(weightLbToKg(0)).toBe(0);
    });
  });

  describe('weightKgToLb', () => {
    it('should convert kilograms to pounds correctly', () => {
      expect(weightKgToLb(70)).toBeCloseTo(154.32, 1);
      expect(weightKgToLb(80)).toBeCloseTo(176.37, 1);
      expect(weightKgToLb(50)).toBeCloseTo(110.23, 1);
    });

    it('should handle zero', () => {
      expect(weightKgToLb(0)).toBe(0);
    });
  });
});

describe('Temperature Conversions', () => {
  describe('convertTemperature', () => {
    it('should convert Celsius to Fahrenheit correctly', () => {
      expect(convertTemperature(0, 'c', 'f')).toBeCloseTo(32, 1);
      expect(convertTemperature(100, 'c', 'f')).toBeCloseTo(212, 1);
      expect(convertTemperature(37, 'c', 'f')).toBeCloseTo(98.6, 1);
    });

    it('should convert Fahrenheit to Celsius correctly', () => {
      expect(convertTemperature(32, 'f', 'c')).toBeCloseTo(0, 1);
      expect(convertTemperature(212, 'f', 'c')).toBeCloseTo(100, 1);
      expect(convertTemperature(98.6, 'f', 'c')).toBeCloseTo(37, 1);
    });

    it('should return same value when units are the same', () => {
      expect(convertTemperature(37, 'c', 'c')).toBe(37);
      expect(convertTemperature(98.6, 'f', 'f')).toBe(98.6);
    });

    it('should throw error for invalid conversion', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => convertTemperature(37, 'c' as any, 'invalid' as any)).toThrow();
    });
  });
});

describe('Energy Conversions', () => {
  describe('convertEnergy', () => {
    it('should convert kcal to kJ correctly', () => {
      expect(convertEnergy(100, 'kcal', 'kj')).toBeCloseTo(418.4, 1);
      expect(convertEnergy(200, 'kcal', 'kj')).toBeCloseTo(836.8, 1);
      expect(convertEnergy(2000, 'kcal', 'kj')).toBeCloseTo(8368, 0);
    });

    it('should convert kJ to kcal correctly', () => {
      expect(convertEnergy(418.4, 'kj', 'kcal')).toBeCloseTo(100, 1);
      expect(convertEnergy(836.8, 'kj', 'kcal')).toBeCloseTo(200, 1);
      expect(convertEnergy(8368, 'kj', 'kcal')).toBeCloseTo(2000, 0);
    });

    it('should return same value when units are the same', () => {
      expect(convertEnergy(2000, 'kcal', 'kcal')).toBe(2000);
      expect(convertEnergy(8368, 'kj', 'kj')).toBe(8368);
    });

    it('should handle zero correctly', () => {
      expect(convertEnergy(0, 'kcal', 'kj')).toBe(0);
      expect(convertEnergy(0, 'kj', 'kcal')).toBe(0);
    });

    it('should throw error for invalid conversion', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => convertEnergy(100, 'kcal' as any, 'invalid' as any)).toThrow();
    });
  });
});

describe('Length Conversions', () => {
  describe('convertLength', () => {
    it('should convert cm to inches correctly', () => {
      expect(convertLength(100, 'cm', 'in')).toBeCloseTo(39.37, 1);
      expect(convertLength(50, 'cm', 'in')).toBeCloseTo(19.69, 1);
    });

    it('should convert inches to cm correctly', () => {
      expect(convertLength(39.37, 'in', 'cm')).toBeCloseTo(100, 1);
      expect(convertLength(12, 'in', 'cm')).toBeCloseTo(30.48, 1);
    });

    it('should convert cm to meters correctly', () => {
      expect(convertLength(100, 'cm', 'm')).toBe(1);
      expect(convertLength(200, 'cm', 'm')).toBe(2);
    });

    it('should return same value when units are the same', () => {
      expect(convertLength(100, 'cm', 'cm')).toBe(100);
      expect(convertLength(10, 'in', 'in')).toBe(10);
      expect(convertLength(1, 'm', 'm')).toBe(1);
    });

    it('should handle zero correctly', () => {
      expect(convertLength(0, 'cm', 'in')).toBe(0);
      expect(convertLength(0, 'in', 'cm')).toBe(0);
    });
  });
});

describe('Volume Conversions', () => {
  describe('convertVolume', () => {
    it('should convert ml to liters correctly', () => {
      expect(convertVolume(1000, 'ml', 'l')).toBe(1);
      expect(convertVolume(500, 'ml', 'l')).toBe(0.5);
    });

    it('should convert liters to ml correctly', () => {
      expect(convertVolume(1, 'l', 'ml')).toBe(1000);
      expect(convertVolume(2.5, 'l', 'ml')).toBe(2500);
    });

    it('should convert ml to fl oz correctly', () => {
      expect(convertVolume(100, 'ml', 'floz')).toBeCloseTo(3.38, 1);
      expect(convertVolume(250, 'ml', 'floz')).toBeCloseTo(8.45, 1);
    });

    it('should return same value when units are the same', () => {
      expect(convertVolume(1000, 'ml', 'ml')).toBe(1000);
      expect(convertVolume(1, 'l', 'l')).toBe(1);
    });

    it('should handle zero correctly', () => {
      expect(convertVolume(0, 'ml', 'l')).toBe(0);
      expect(convertVolume(0, 'l', 'ml')).toBe(0);
    });
  });
});

describe('formatNumber', () => {
  it('should format numbers with default 2 decimals', () => {
    expect(formatNumber(1.234567)).toBe('1.23');
    expect(formatNumber(10.56789)).toBe('10.57');
  });

  it('should format numbers with custom decimal places', () => {
    expect(formatNumber(1.234567, 1)).toBe('1.2');
    expect(formatNumber(1.234567, 3)).toBe('1.235');
    expect(formatNumber(1.234567, 0)).toBe('1');
  });

  it('should handle integers', () => {
    expect(formatNumber(10)).toBe('10.00');
    expect(formatNumber(10, 0)).toBe('10');
  });

  it('should handle zero', () => {
    expect(formatNumber(0)).toBe('0.00');
    expect(formatNumber(0, 1)).toBe('0.0');
  });

  it('should handle negative numbers', () => {
    expect(formatNumber(-1.234)).toBe('-1.23');
    expect(formatNumber(-10.56789, 1)).toBe('-10.6');
  });
});

describe('Edge Cases and Error Handling', () => {
  it('should handle very large numbers', () => {
    expect(convertHeight(1000000, 'cm', 'ft')).toBeGreaterThan(0);
    expect(convertWeight(1000000, 'kg', 'lb')).toBeGreaterThan(0);
  });

  it('should handle very small numbers', () => {
    expect(convertHeight(0.001, 'cm', 'ft')).toBeCloseTo(0.0000328, 4);
    expect(convertWeight(0.001, 'kg', 'lb')).toBeCloseTo(0.0022, 4);
  });

  it('should reject negative numbers in conversions', () => {
    // Negative heights/weights don't make physical sense,
    // conversion functions should reject them
    expect(() => convertHeight(-180, 'cm', 'ft')).toThrow('Height value cannot be negative');
    expect(() => convertWeight(-70, 'kg', 'lb')).toThrow('Weight value cannot be negative');
  });
});

describe('Conversion Accuracy', () => {
  it('should maintain accuracy through round-trip conversions', () => {
    // Height: cm -> ft -> cm
    const originalHeight = 180;
    const convertedToFt = convertHeight(originalHeight, 'cm', 'ft');
    const backToCm = convertHeight(convertedToFt, 'ft', 'cm');
    expect(backToCm).toBeCloseTo(originalHeight, 0); // Within 1 cm

    // Weight: kg -> lb -> kg
    const originalWeight = 70;
    const convertedToLb = convertWeight(originalWeight, 'kg', 'lb');
    const backToKg = convertWeight(convertedToLb, 'lb', 'kg');
    expect(backToKg).toBeCloseTo(originalWeight, 0); // Within 1 kg
  });
});
