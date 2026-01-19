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
  convertExtendedWeight,
  convertExtendedHeight,
  convertExtendedVolume,
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

// Additional tests for better coverage

describe('Height Conversions - Additional Units', () => {
  describe('convertHeight with inches', () => {
    it('should convert cm to inches correctly', () => {
      expect(convertHeight(100, 'cm', 'in')).toBeCloseTo(39.37, 1);
      expect(convertHeight(2.54, 'cm', 'in')).toBeCloseTo(1, 1);
    });

    it('should convert inches to cm correctly', () => {
      expect(convertHeight(39.37, 'in', 'cm')).toBeCloseTo(100, 1);
      expect(convertHeight(12, 'in', 'cm')).toBeCloseTo(30.48, 1);
    });

    it('should convert inches to ft correctly', () => {
      expect(convertHeight(12, 'in', 'ft')).toBeCloseTo(1, 1);
      expect(convertHeight(36, 'in', 'ft')).toBeCloseTo(3, 1);
    });
  });

  describe('convertHeight with meters', () => {
    it('should convert cm to meters correctly', () => {
      expect(convertHeight(100, 'cm', 'm')).toBe(1);
      expect(convertHeight(175, 'cm', 'm')).toBe(1.75);
    });

    it('should convert meters to cm correctly', () => {
      expect(convertHeight(1.8, 'm', 'cm')).toBe(180);
      expect(convertHeight(2, 'm', 'cm')).toBe(200);
    });

    it('should convert meters to ft correctly', () => {
      expect(convertHeight(1, 'm', 'ft')).toBeCloseTo(3.28, 1);
    });

    it('should convert meters to inches correctly', () => {
      expect(convertHeight(1, 'm', 'in')).toBeCloseTo(39.37, 1);
    });
  });
});

describe('Weight Conversions - Additional Units', () => {
  describe('convertWeight with grams', () => {
    it('should convert kg to g correctly', () => {
      expect(convertWeight(1, 'kg', 'g')).toBe(1000);
      expect(convertWeight(2.5, 'kg', 'g')).toBe(2500);
    });

    it('should convert g to kg correctly', () => {
      expect(convertWeight(1000, 'g', 'kg')).toBe(1);
      expect(convertWeight(500, 'g', 'kg')).toBe(0.5);
    });

    it('should convert g to lb correctly', () => {
      expect(convertWeight(453.592, 'g', 'lb')).toBeCloseTo(1, 1);
    });
  });

  describe('convertWeight with ounces', () => {
    it('should convert kg to oz correctly', () => {
      expect(convertWeight(1, 'kg', 'oz')).toBeCloseTo(35.274, 1);
    });

    it('should convert oz to kg correctly', () => {
      expect(convertWeight(35.274, 'oz', 'kg')).toBeCloseTo(1, 1);
    });

    it('should convert lb to oz correctly', () => {
      expect(convertWeight(1, 'lb', 'oz')).toBeCloseTo(16, 0);
    });
  });

  describe('convertWeight with stone', () => {
    it('should convert kg to stone correctly', () => {
      expect(convertWeight(6.35029, 'kg', 'stone')).toBeCloseTo(1, 1);
      expect(convertWeight(70, 'kg', 'stone')).toBeCloseTo(11.02, 1);
    });

    it('should convert stone to kg correctly', () => {
      expect(convertWeight(1, 'stone', 'kg')).toBeCloseTo(6.35, 1);
      expect(convertWeight(10, 'stone', 'kg')).toBeCloseTo(63.5, 1);
    });

    it('should convert stone to lb correctly', () => {
      expect(convertWeight(1, 'stone', 'lb')).toBeCloseTo(14, 0);
    });
  });
});

describe('Length Conversions - Additional Units', () => {
  describe('convertLength with ft', () => {
    it('should convert ft to cm correctly', () => {
      expect(convertLength(1, 'ft', 'cm')).toBeCloseTo(30.48, 1);
      expect(convertLength(6, 'ft', 'cm')).toBeCloseTo(182.88, 1);
    });

    it('should convert ft to m correctly', () => {
      expect(convertLength(3.28, 'ft', 'm')).toBeCloseTo(1, 1);
    });

    it('should convert ft to in correctly', () => {
      expect(convertLength(1, 'ft', 'in')).toBeCloseTo(12, 0);
    });
  });

  describe('convertLength with yd', () => {
    it('should convert yd to cm correctly', () => {
      expect(convertLength(1, 'yd', 'cm')).toBeCloseTo(91.44, 1);
    });

    it('should convert yd to ft correctly', () => {
      expect(convertLength(1, 'yd', 'ft')).toBeCloseTo(3, 0);
    });

    it('should convert yd to m correctly', () => {
      expect(convertLength(1, 'yd', 'm')).toBeCloseTo(0.9144, 2);
    });
  });

  describe('convertLength with miles', () => {
    it('should convert mi to km correctly', () => {
      expect(convertLength(1, 'mi', 'km')).toBeCloseTo(1.609, 2);
    });

    it('should convert mi to m correctly', () => {
      expect(convertLength(1, 'mi', 'm')).toBeCloseTo(1609.34, 0);
    });

    it('should convert km to mi correctly', () => {
      expect(convertLength(1.609, 'km', 'mi')).toBeCloseTo(1, 1);
    });
  });

  describe('convertLength with km', () => {
    it('should convert km to m correctly', () => {
      expect(convertLength(1, 'km', 'm')).toBe(1000);
    });

    it('should convert km to cm correctly', () => {
      expect(convertLength(1, 'km', 'cm')).toBe(100000);
    });

    it('should convert m to km correctly', () => {
      expect(convertLength(1000, 'm', 'km')).toBe(1);
    });
  });

  it('should throw error for negative length', () => {
    expect(() => convertLength(-100, 'cm', 'm')).toThrow('Length value cannot be negative');
  });

  it('should throw error for unsupported unit', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => convertLength(100, 'invalid' as any, 'cm')).toThrow();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => convertLength(100, 'cm', 'invalid' as any)).toThrow();
  });
});

describe('Volume Conversions - Additional Units', () => {
  describe('convertVolume with cups', () => {
    it('should convert cup to ml correctly', () => {
      expect(convertVolume(1, 'cup', 'ml')).toBeCloseTo(236.59, 0);
    });

    it('should convert ml to cup correctly', () => {
      expect(convertVolume(236.588, 'ml', 'cup')).toBeCloseTo(1, 1);
    });

    it('should convert cup to l correctly', () => {
      expect(convertVolume(4, 'cup', 'l')).toBeCloseTo(0.946, 2);
    });
  });

  describe('convertVolume with tablespoons', () => {
    it('should convert tbsp to ml correctly', () => {
      expect(convertVolume(1, 'tbsp', 'ml')).toBeCloseTo(14.79, 1);
    });

    it('should convert ml to tbsp correctly', () => {
      expect(convertVolume(14.787, 'ml', 'tbsp')).toBeCloseTo(1, 1);
    });
  });

  describe('convertVolume with teaspoons', () => {
    it('should convert tsp to ml correctly', () => {
      expect(convertVolume(1, 'tsp', 'ml')).toBeCloseTo(4.93, 1);
    });

    it('should convert ml to tsp correctly', () => {
      expect(convertVolume(4.929, 'ml', 'tsp')).toBeCloseTo(1, 1);
    });

    it('should convert tbsp to tsp correctly', () => {
      expect(convertVolume(1, 'tbsp', 'tsp')).toBeCloseTo(3, 0);
    });
  });

  describe('convertVolume with pints', () => {
    it('should convert pt to ml correctly', () => {
      expect(convertVolume(1, 'pt', 'ml')).toBeCloseTo(473.18, 0);
    });

    it('should convert pt to l correctly', () => {
      expect(convertVolume(2, 'pt', 'l')).toBeCloseTo(0.946, 2);
    });
  });

  describe('convertVolume with quarts', () => {
    it('should convert qt to ml correctly', () => {
      expect(convertVolume(1, 'qt', 'ml')).toBeCloseTo(946.35, 0);
    });

    it('should convert qt to l correctly', () => {
      expect(convertVolume(1, 'qt', 'l')).toBeCloseTo(0.946, 2);
    });

    it('should convert qt to pt correctly', () => {
      expect(convertVolume(1, 'qt', 'pt')).toBeCloseTo(2, 0);
    });
  });

  describe('convertVolume with gallons', () => {
    it('should convert gal to ml correctly', () => {
      expect(convertVolume(1, 'gal', 'ml')).toBeCloseTo(3785.41, 0);
    });

    it('should convert gal to l correctly', () => {
      expect(convertVolume(1, 'gal', 'l')).toBeCloseTo(3.785, 2);
    });

    it('should convert gal to qt correctly', () => {
      expect(convertVolume(1, 'gal', 'qt')).toBeCloseTo(4, 0);
    });
  });

  it('should throw error for negative volume', () => {
    expect(() => convertVolume(-100, 'ml', 'l')).toThrow('Volume value cannot be negative');
  });

  it('should throw error for unsupported unit', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => convertVolume(100, 'invalid' as any, 'ml')).toThrow();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => convertVolume(100, 'ml', 'invalid' as any)).toThrow();
  });
});

describe('Extended Conversion Functions', () => {
  describe('convertExtendedWeight', () => {
    it('should convert between all weight units', () => {
      expect(convertExtendedWeight(1000, 'g', 'kg')).toBe(1);
      expect(convertExtendedWeight(1, 'kg', 'g')).toBe(1000);
      expect(convertExtendedWeight(1, 'lb', 'oz')).toBeCloseTo(16, 0);
      expect(convertExtendedWeight(1, 'stone', 'lb')).toBeCloseTo(14, 0);
    });

    it('should return same value when units are the same', () => {
      expect(convertExtendedWeight(100, 'g', 'g')).toBe(100);
      expect(convertExtendedWeight(70, 'kg', 'kg')).toBe(70);
    });

    it('should handle round-trip conversions accurately', () => {
      const original = 1000;
      const converted = convertExtendedWeight(original, 'g', 'oz');
      const backToG = convertExtendedWeight(converted, 'oz', 'g');
      expect(backToG).toBeCloseTo(original, 0);
    });

    it('should throw error for negative values', () => {
      expect(() => convertExtendedWeight(-100, 'g', 'kg')).toThrow(
        'Weight value cannot be negative'
      );
    });

    it('should throw error for unsupported units', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => convertExtendedWeight(100, 'invalid' as any, 'g')).toThrow();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => convertExtendedWeight(100, 'g', 'invalid' as any)).toThrow();
    });
  });

  describe('convertExtendedHeight', () => {
    it('should convert between all height units', () => {
      expect(convertExtendedHeight(100, 'cm', 'in')).toBeCloseTo(39.37, 1);
      expect(convertExtendedHeight(100, 'cm', 'm')).toBe(1);
      expect(convertExtendedHeight(1, 'ft', 'in')).toBeCloseTo(12, 0);
      expect(convertExtendedHeight(1, 'm', 'ft')).toBeCloseTo(3.28, 1);
    });

    it('should return same value when units are the same', () => {
      expect(convertExtendedHeight(100, 'cm', 'cm')).toBe(100);
      expect(convertExtendedHeight(1.75, 'm', 'm')).toBe(1.75);
    });

    it('should handle round-trip conversions accurately', () => {
      const original = 180;
      const converted = convertExtendedHeight(original, 'cm', 'in');
      const backToCm = convertExtendedHeight(converted, 'in', 'cm');
      expect(backToCm).toBeCloseTo(original, 0);
    });

    it('should throw error for negative values', () => {
      expect(() => convertExtendedHeight(-100, 'cm', 'm')).toThrow(
        'Height value cannot be negative'
      );
    });

    it('should throw error for unsupported units', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => convertExtendedHeight(100, 'invalid' as any, 'cm')).toThrow();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => convertExtendedHeight(100, 'cm', 'invalid' as any)).toThrow();
    });
  });

  describe('convertExtendedVolume', () => {
    it('should convert between all volume units', () => {
      expect(convertExtendedVolume(1000, 'ml', 'l')).toBe(1);
      expect(convertExtendedVolume(1, 'l', 'ml')).toBe(1000);
      expect(convertExtendedVolume(1, 'cup', 'ml')).toBeCloseTo(236.59, 0);
      expect(convertExtendedVolume(1, 'tbsp', 'tsp')).toBeCloseTo(3, 0);
      expect(convertExtendedVolume(1, 'gal', 'qt')).toBeCloseTo(4, 0);
    });

    it('should return same value when units are the same', () => {
      expect(convertExtendedVolume(1000, 'ml', 'ml')).toBe(1000);
      expect(convertExtendedVolume(2, 'l', 'l')).toBe(2);
    });

    it('should convert tbsp and tsp correctly', () => {
      expect(convertExtendedVolume(1, 'tbsp', 'ml')).toBeCloseTo(14.79, 1);
      expect(convertExtendedVolume(1, 'tsp', 'ml')).toBeCloseTo(4.93, 1);
    });

    it('should handle round-trip conversions accurately', () => {
      const original = 1000;
      const converted = convertExtendedVolume(original, 'ml', 'floz');
      const backToMl = convertExtendedVolume(converted, 'floz', 'ml');
      expect(backToMl).toBeCloseTo(original, 0);
    });

    it('should throw error for negative values', () => {
      expect(() => convertExtendedVolume(-100, 'ml', 'l')).toThrow(
        'Volume value cannot be negative'
      );
    });

    it('should throw error for unsupported units', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => convertExtendedVolume(100, 'invalid' as any, 'ml')).toThrow();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => convertExtendedVolume(100, 'ml', 'invalid' as any)).toThrow();
    });
  });
});

describe('Additional Error Handling', () => {
  describe('heightFtInToCm negative values', () => {
    it('should throw error for negative feet', () => {
      expect(() => heightFtInToCm(-5, 6)).toThrow('Height values cannot be negative');
    });

    it('should throw error for negative inches', () => {
      expect(() => heightFtInToCm(5, -6)).toThrow('Height values cannot be negative');
    });
  });

  describe('heightCmToFtIn negative values', () => {
    it('should throw error for negative cm', () => {
      expect(() => heightCmToFtIn(-180)).toThrow('Height value cannot be negative');
    });
  });

  describe('heightCmToFtIn inches rounding edge case', () => {
    it('should handle inches rounding to 12', () => {
      // Test value that would round inches to 12
      const result = heightCmToFtIn(182.88); // exactly 6 feet
      expect(result.feet).toBe(6);
      expect(result.inches).toBeCloseTo(0, 0);
    });
  });

  describe('weightLbToKg negative values', () => {
    it('should throw error for negative pounds', () => {
      expect(() => weightLbToKg(-150)).toThrow('Weight value cannot be negative');
    });
  });

  describe('weightKgToLb negative values', () => {
    it('should throw error for negative kg', () => {
      expect(() => weightKgToLb(-70)).toThrow('Weight value cannot be negative');
    });
  });

  describe('convertEnergy negative values', () => {
    it('should throw error for negative energy', () => {
      expect(() => convertEnergy(-100, 'kcal', 'kj')).toThrow('Energy value cannot be negative');
    });
  });
});
