/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CALCULATOR_HUBS } from '@/constants/calculatorCatalog';
import CalculatorCategoriesPage from './page';

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

vi.mock('@/components/Breadcrumb', () => ({
  default: ({ customItems }: { customItems: Array<{ name: string; path: string }> }) => (
    <nav data-testid="breadcrumb">{customItems.map(item => item.name).join(' > ')}</nav>
  ),
}));

describe('Calculator Categories Page', () => {
  it('renders heading, breadcrumb, and category links', () => {
    render(<CalculatorCategoriesPage />);

    expect(screen.getByRole('heading', { name: 'Calculator Categories' })).toBeInTheDocument();
    expect(screen.getByTestId('breadcrumb')).toHaveTextContent('Home > Calculators');
    expect(
      screen.getByText('Explore calculators by category to find the exact tool you need faster.')
    ).toBeInTheDocument();

    const categoryLinks = Array.from(document.querySelectorAll('a[href^="/calculators/"]')).filter(
      link => link.getAttribute('href') !== '/calculators'
    );

    expect(categoryLinks).toHaveLength(CALCULATOR_HUBS.length);
  });

  it('shows known hub labels with call-to-action text', () => {
    render(<CalculatorCategoriesPage />);

    expect(screen.getByRole('heading', { name: 'Weight Loss & Management' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Body Composition' })).toBeInTheDocument();
    expect(screen.getAllByText('View calculators →').length).toBe(CALCULATOR_HUBS.length);
  });
});
