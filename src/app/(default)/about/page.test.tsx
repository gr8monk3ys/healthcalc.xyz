/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CALCULATOR_CATALOG } from '@/constants/calculatorCatalog';
import AboutPage from './page';

describe('About page', () => {
  it('states the calculator count from the catalog', () => {
    const { container } = render(<AboutPage />);
    expect(container.textContent).toContain(
      `a collection of ${CALCULATOR_CATALOG.length} health and fitness calculators`
    );
  });
});
