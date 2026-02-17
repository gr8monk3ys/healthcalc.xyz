import { describe, it, expect } from 'vitest';
import { calculateSubstanceImpact } from './substanceImpact';
import { SubstanceImpactFormValues } from '@/types/substanceImpact';

describe('Substance Impact Calculator', () => {
  const baseValues: SubstanceImpactFormValues = {
    mode: 'both',
    age: 35,
    gender: 'male',
    alcohol: {
      type: 'beer',
      drinksPerWeek: 10,
      yearsOfDrinking: 10,
      avgDrinkCost: 7,
    },
    smoking: {
      type: 'cigarettes',
      perDay: 15,
      yearsOfSmoking: 10,
      costPerPack: 8,
    },
  };

  describe('alcohol calculations', () => {
    it('should calculate weekly and yearly alcohol calories', () => {
      const result = calculateSubstanceImpact({
        mode: 'alcohol',
        age: 35,
        gender: 'male',
        alcohol: {
          type: 'beer',
          drinksPerWeek: 10,
          yearsOfDrinking: 5,
          avgDrinkCost: 7,
        },
      });
      // 10 beers * 153 cal = 1530 per week
      expect(result.alcoholCaloriesPerWeek).toBe(1530);
      // 1530 * 52 = 79560
      expect(result.alcoholCaloriesPerYear).toBe(79560);
    });

    it('should calculate fat equivalent from alcohol calories', () => {
      const result = calculateSubstanceImpact({
        mode: 'alcohol',
        age: 35,
        gender: 'male',
        alcohol: {
          type: 'beer',
          drinksPerWeek: 10,
          yearsOfDrinking: 5,
          avgDrinkCost: 7,
        },
      });
      // 79560 / 3500 = 22.7
      expect(result.alcoholEquivalentFatLbs).toBeCloseTo(22.7, 0);
    });

    it('should calculate alcohol financial cost', () => {
      const result = calculateSubstanceImpact({
        mode: 'alcohol',
        age: 35,
        gender: 'male',
        alcohol: {
          type: 'wine',
          drinksPerWeek: 7,
          yearsOfDrinking: 10,
          avgDrinkCost: 10,
        },
      });
      // 7 * 10 * 52 = 3640
      expect(result.alcoholFinancialCostPerYear).toBe(3640);
    });

    it('should apply moderate drinking lifespan impact', () => {
      const result = calculateSubstanceImpact({
        mode: 'alcohol',
        age: 35,
        gender: 'male',
        alcohol: {
          type: 'beer',
          drinksPerWeek: 10, // moderate (8-14)
          yearsOfDrinking: 10,
          avgDrinkCost: 5,
        },
      });
      // -0.5 * 10 = -5
      expect(result.alcoholLifespanImpactYears).toBe(-5);
    });

    it('should apply heavy drinking lifespan impact', () => {
      const result = calculateSubstanceImpact({
        mode: 'alcohol',
        age: 35,
        gender: 'male',
        alcohol: {
          type: 'spirits',
          drinksPerWeek: 20, // heavy (>14)
          yearsOfDrinking: 5,
          avgDrinkCost: 8,
        },
      });
      // -1.5 * 5 = -7.5
      expect(result.alcoholLifespanImpactYears).toBe(-7.5);
    });

    it('should have no lifespan impact for light drinking', () => {
      const result = calculateSubstanceImpact({
        mode: 'alcohol',
        age: 35,
        gender: 'male',
        alcohol: {
          type: 'wine',
          drinksPerWeek: 5, // light (<7)
          yearsOfDrinking: 20,
          avgDrinkCost: 8,
        },
      });
      expect(result.alcoholLifespanImpactYears).toBe(0);
    });
  });

  describe('smoking calculations', () => {
    it('should calculate smoking lifespan impact', () => {
      const result = calculateSubstanceImpact({
        mode: 'smoking',
        age: 35,
        gender: 'male',
        smoking: {
          type: 'cigarettes',
          perDay: 20, // pack/day
          yearsOfSmoking: 15,
          costPerPack: 8,
        },
      });
      // -0.5 * 15 = -7.5
      expect(result.smokingLifespanImpactYears).toBe(-7.5);
    });

    it('should cap smoking lifespan reduction', () => {
      const result = calculateSubstanceImpact({
        mode: 'smoking',
        age: 35,
        gender: 'male',
        smoking: {
          type: 'cigarettes',
          perDay: 40,
          yearsOfSmoking: 40,
          costPerPack: 8,
        },
      });
      expect(result.smokingLifespanImpactYears).toBe(-13);
    });

    it('should calculate cigarettes smoked', () => {
      const result = calculateSubstanceImpact({
        mode: 'smoking',
        age: 35,
        gender: 'male',
        smoking: {
          type: 'cigarettes',
          perDay: 10,
          yearsOfSmoking: 10,
          costPerPack: 8,
        },
      });
      // 10 * 365 * 10 = 36500
      expect(result.cigarettesSmoked).toBe(36500);
    });

    it('should calculate smoking financial cost', () => {
      const result = calculateSubstanceImpact({
        mode: 'smoking',
        age: 35,
        gender: 'male',
        smoking: {
          type: 'cigarettes',
          perDay: 20,
          yearsOfSmoking: 10,
          costPerPack: 10,
        },
      });
      // 20/20 = 1 pack/day * 10 * 365 = 3650
      expect(result.smokingFinancialCostPerYear).toBe(3650);
    });

    it('should apply reduced impact for light smoking', () => {
      const heavy = calculateSubstanceImpact({
        mode: 'smoking',
        age: 35,
        gender: 'male',
        smoking: { type: 'cigarettes', perDay: 20, yearsOfSmoking: 10, costPerPack: 8 },
      });
      const light = calculateSubstanceImpact({
        mode: 'smoking',
        age: 35,
        gender: 'male',
        smoking: { type: 'cigarettes', perDay: 5, yearsOfSmoking: 10, costPerPack: 8 },
      });
      expect(Math.abs(heavy.smokingLifespanImpactYears!)).toBeGreaterThan(
        Math.abs(light.smokingLifespanImpactYears!)
      );
    });
  });

  describe('combined mode', () => {
    it('should combine alcohol and smoking impacts', () => {
      const result = calculateSubstanceImpact(baseValues);
      expect(result.totalLifespanImpact).toBeLessThan(0);
      expect(result.totalFinancialCostPerYear).toBeGreaterThan(0);
      expect(result.recommendations.length).toBeGreaterThan(0);
    });

    it('should include recovery timelines', () => {
      const result = calculateSubstanceImpact(baseValues);
      expect(result.healthRecoveryTimeline.length).toBeGreaterThan(0);
    });
  });

  describe('validation', () => {
    it('should throw for invalid age', () => {
      expect(() => calculateSubstanceImpact({ ...baseValues, age: 0 })).toThrow();
      expect(() => calculateSubstanceImpact({ ...baseValues, age: 150 })).toThrow();
    });

    it('should throw for negative drinks per week', () => {
      expect(() =>
        calculateSubstanceImpact({
          mode: 'alcohol',
          age: 35,
          gender: 'male',
          alcohol: { type: 'beer', drinksPerWeek: -1, yearsOfDrinking: 5, avgDrinkCost: 5 },
        })
      ).toThrow();
    });
  });

  it('should give positive message for low-risk inputs', () => {
    const result = calculateSubstanceImpact({
      mode: 'alcohol',
      age: 35,
      gender: 'male',
      alcohol: {
        type: 'wine',
        drinksPerWeek: 3,
        yearsOfDrinking: 5,
        avgDrinkCost: 8,
      },
    });
    expect(result.recommendations.some(r => r.includes('low-risk'))).toBe(true);
  });
});
