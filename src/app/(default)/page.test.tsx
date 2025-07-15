/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Home from './page';

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

vi.mock('@/components/CalculatorCard', () => ({
  default: ({ title, path }: { title: string; path: string }) => (
    <a href={path} data-testid="featured-card">
      {title}
    </a>
  ),
}));

describe('Home Page', () => {
  it('renders hero copy and primary navigation links', () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', {
        name: /BMI, body fat, TDEE, and 50\+ more health calculators/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Browse calculators' })).toHaveAttribute(
      'href',
      '/calculators'
    );
    expect(screen.getByRole('link', { name: /Read the guides/i })).toHaveAttribute('href', '/blog');
    expect(
      screen.getByRole('link', { name: /Search calculators, guides, and blog posts/i })
    ).toHaveAttribute('href', '/search');
  });

  it('renders all featured calculator cards and blog previews', () => {
    render(<Home />);

    const featuredCards = screen.getAllByTestId('featured-card');
    expect(featuredCards).toHaveLength(6);
    expect(screen.getByRole('link', { name: 'Body Fat Calculator' })).toHaveAttribute(
      'href',
      '/body-fat'
    );
    expect(screen.getByRole('link', { name: 'BMI Calculator' })).toHaveAttribute('href', '/bmi');
    expect(
      screen.getByRole('link', { name: /5 Myths About Calorie Deficits Debunked/i })
    ).toHaveAttribute('href', '/blog/calorie-deficit-myths');
    expect(screen.getByRole('link', { name: /Explore all guides and articles/i })).toHaveAttribute(
      'href',
      '/blog'
    );
  });

  it('renders trust signals and Why HealthCheck section', () => {
    const { container } = render(<Home />);

    expect(container.textContent).toContain('54+ Calculators');
    expect(container.textContent).toContain('Evidence-Based Formulas');
    expect(container.textContent).toContain('100% Free');
    expect(screen.getByRole('heading', { name: /Why HealthCheck/i })).toBeInTheDocument();
  });
});
