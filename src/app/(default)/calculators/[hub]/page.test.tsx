import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CALCULATOR_HUBS, getCalculatorsForHub } from '@/constants/calculatorCatalog';
import RelatedCalculatorLinks from '@/components/RelatedCalculatorLinks';
import CalculatorHubPage from './page';
import { defined } from '@/test-utils/defined';

vi.mock('@/components/Breadcrumb', () => ({ default: () => null }));

const hub = defined(CALCULATOR_HUBS[0]);
const calculators = getCalculatorsForHub(hub.slug);

function calculatorHrefs(container: HTMLElement): string[] {
  return Array.from(container.querySelectorAll('a'))
    .map(link => link.getAttribute('href') ?? '')
    .filter(href => href !== '/calculators');
}

describe('calculator hub page', () => {
  it('links each calculator to its real route', async () => {
    const { container } = render(
      await CalculatorHubPage({ params: Promise.resolve({ hub: hub.slug }) })
    );

    expect(calculatorHrefs(container)).toEqual(
      calculators.map(calculator => `/${calculator.slug}`)
    );
  });
});

describe('RelatedCalculatorLinks', () => {
  it('links to the real calculator routes', () => {
    const slugs = calculators.map(calculator => calculator.slug);
    const { container } = render(<RelatedCalculatorLinks slugs={slugs} />);

    expect(calculatorHrefs(container)).toEqual(slugs.map(slug => `/${slug}`));
  });
});
