import { describe, it, expect } from 'vitest';
import {
  CALCULATOR_CHAINS,
  getChainById,
  getChainsForCalculator,
  getChainCalculatorSlugs,
} from './calculatorChains';

describe('CALCULATOR_CHAINS', () => {
  it('has 4 chains', () => {
    expect(CALCULATOR_CHAINS).toHaveLength(4);
  });

  it('each chain has a unique id', () => {
    const ids = CALCULATOR_CHAINS.map(c => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('each chain has at least 2 steps', () => {
    for (const chain of CALCULATOR_CHAINS) {
      expect(chain.steps.length, `${chain.id} has <2 steps`).toBeGreaterThanOrEqual(2);
    }
  });

  it('each step has required fields', () => {
    for (const chain of CALCULATOR_CHAINS) {
      for (const step of chain.steps) {
        expect(step.slug).toBeTruthy();
        expect(step.label).toBeTruthy();
        expect(step.description).toBeTruthy();
        expect(Array.isArray(step.sharedFields)).toBe(true);
      }
    }
  });
});

describe('getChainById', () => {
  it('finds weight-loss-journey chain', () => {
    const chain = getChainById('weight-loss-journey');
    expect(chain).toBeDefined();
    expect(chain!.name).toBe('Weight Loss Journey');
  });

  it('returns undefined for unknown chain', () => {
    expect(getChainById('nonexistent')).toBeUndefined();
  });
});

describe('getChainsForCalculator', () => {
  it('BMI appears in multiple chains', () => {
    const chains = getChainsForCalculator('bmi');
    expect(chains.length).toBeGreaterThanOrEqual(2);
  });

  it('returns empty for non-chain calculator', () => {
    expect(getChainsForCalculator('age')).toEqual([]);
  });
});

describe('getChainCalculatorSlugs', () => {
  it('returns a set of slugs', () => {
    const slugs = getChainCalculatorSlugs();
    expect(slugs.has('bmi')).toBe(true);
    expect(slugs.has('tdee')).toBe(true);
    expect(slugs.has('water-intake')).toBe(true);
  });

  it('does not include non-chain calculators', () => {
    const slugs = getChainCalculatorSlugs();
    expect(slugs.has('age')).toBe(false);
    expect(slugs.has('sleep')).toBe(false);
  });
});
