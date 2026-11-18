import { describe, expect, it } from 'vitest';
import { getProductsForCalculator } from './affiliates';

describe('getProductsForCalculator', () => {
  it('represents every mapped category before repeating one', () => {
    const categories = getProductsForCalculator('body-fat', 3).map(product => product.category);

    expect(new Set(categories).size).toBe(3);
  });

  it('honours maxProducts', () => {
    expect(getProductsForCalculator('body-fat', 2)).toHaveLength(2);
  });
});
