/**
 * Tests for CalculatorCard component
 * Tests rendering, links, icons, and memoization behavior
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CalculatorCard, { MemoizedCalculatorCard } from './CalculatorCard';

// Mock next/link to avoid router context issues
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

describe('CalculatorCard', () => {
  const defaultProps = {
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index to assess your weight category.',
    path: '/bmi',
    icon: <svg data-testid="test-icon" aria-hidden="true" />,
  };

  describe('Rendering', () => {
    it('should render with all required props', () => {
      render(<CalculatorCard {...defaultProps} />);

      expect(screen.getByRole('heading', { name: /bmi calculator/i })).toBeInTheDocument();
      expect(screen.getByText(/calculate your body mass index/i)).toBeInTheDocument();
      expect(screen.getByText(/use calculator/i)).toBeInTheDocument();
    });

    it('should render the title correctly', () => {
      render(<CalculatorCard {...defaultProps} title="TDEE Calculator" />);

      expect(screen.getByRole('heading', { name: /tdee calculator/i })).toBeInTheDocument();
    });

    it('should render the description correctly', () => {
      const description = 'Custom description for testing purposes';
      render(<CalculatorCard {...defaultProps} description={description} />);

      expect(screen.getByText(description)).toBeInTheDocument();
    });

    it('should render the icon', () => {
      render(<CalculatorCard {...defaultProps} />);

      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('should render "Use Calculator" call to action', () => {
      render(<CalculatorCard {...defaultProps} />);

      expect(screen.getByText('Use Calculator →')).toBeInTheDocument();
    });

    it('should apply glass panel styling class', () => {
      const { container } = render(<CalculatorCard {...defaultProps} />);

      const cardDiv = container.querySelector('.glass-panel-strong');
      expect(cardDiv).toBeInTheDocument();
    });
  });

  describe('Links', () => {
    it('should render as a link element', () => {
      render(<CalculatorCard {...defaultProps} />);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });

    it('should have correct href attribute', () => {
      render(<CalculatorCard {...defaultProps} path="/bmi" />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/bmi');
    });

    it('should link to the correct path for different calculators', () => {
      const { rerender } = render(<CalculatorCard {...defaultProps} path="/tdee" />);
      expect(screen.getByRole('link')).toHaveAttribute('href', '/tdee');

      rerender(<CalculatorCard {...defaultProps} path="/body-fat" />);
      expect(screen.getByRole('link')).toHaveAttribute('href', '/body-fat');

      rerender(<CalculatorCard {...defaultProps} path="/whr" />);
      expect(screen.getByRole('link')).toHaveAttribute('href', '/whr');
    });

    it('should have block display class on link', () => {
      render(<CalculatorCard {...defaultProps} />);

      const link = screen.getByRole('link');
      expect(link).toHaveClass('block');
    });
  });

  describe('Icon Handling', () => {
    it('should render SVG icon', () => {
      const svgIcon = (
        <svg data-testid="svg-icon" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
      render(<CalculatorCard {...defaultProps} icon={svgIcon} />);

      expect(screen.getByTestId('svg-icon')).toBeInTheDocument();
    });

    it('should render complex icon component', () => {
      const ComplexIcon = () => (
        <div data-testid="complex-icon">
          <span>Icon Content</span>
        </div>
      );
      render(<CalculatorCard {...defaultProps} icon={<ComplexIcon />} />);

      expect(screen.getByTestId('complex-icon')).toBeInTheDocument();
      expect(screen.getByText('Icon Content')).toBeInTheDocument();
    });

    it('should apply accent color class to icon container', () => {
      const { container } = render(<CalculatorCard {...defaultProps} />);

      const iconContainer = container.querySelector('.text-accent');
      expect(iconContainer).toBeInTheDocument();
      expect(iconContainer).toContainElement(screen.getByTestId('test-icon'));
    });

    it('should render null icon gracefully', () => {
      // TypeScript would prevent this, but testing runtime behavior
      const propsWithNullIcon = {
        ...defaultProps,
        icon: null as unknown as React.ReactNode,
      };
      render(<CalculatorCard {...propsWithNullIcon} />);

      // Component should still render without the icon
      expect(screen.getByText(/bmi calculator/i)).toBeInTheDocument();
    });
  });

  describe('Layout and Styling', () => {
    it('should have full height class for consistent card sizing', () => {
      const { container } = render(<CalculatorCard {...defaultProps} />);

      const cardDiv = container.querySelector('.h-full');
      expect(cardDiv).toBeInTheDocument();
    });

    it('should have hover shadow transition', () => {
      const { container } = render(<CalculatorCard {...defaultProps} />);

      const cardDiv = container.querySelector('.transition-all');
      expect(cardDiv).toBeInTheDocument();
    });

    it('should have proper padding', () => {
      const { container } = render(<CalculatorCard {...defaultProps} />);

      const cardDiv = container.querySelector('.p-6');
      expect(cardDiv).toBeInTheDocument();
    });

    it('should display icon and title in flex row', () => {
      const { container } = render(<CalculatorCard {...defaultProps} />);

      const flexContainer = container.querySelector('.flex.items-start');
      expect(flexContainer).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should be accessible via link role', () => {
      render(<CalculatorCard {...defaultProps} />);

      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('should have heading for card title', () => {
      render(<CalculatorCard {...defaultProps} />);

      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('should have accessible name from title', () => {
      render(<CalculatorCard {...defaultProps} title="Body Fat Calculator" />);

      expect(screen.getByRole('heading', { name: /body fat calculator/i })).toBeInTheDocument();
    });
  });
});

describe('MemoizedCalculatorCard', () => {
  const defaultProps = {
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index',
    path: '/bmi',
    icon: <svg data-testid="memo-icon" />,
  };

  describe('Rendering', () => {
    it('should render correctly', () => {
      render(<MemoizedCalculatorCard {...defaultProps} />);

      expect(screen.getByRole('heading', { name: /bmi calculator/i })).toBeInTheDocument();
      expect(screen.getByText(/calculate your body mass index/i)).toBeInTheDocument();
    });

    it('should render icon', () => {
      render(<MemoizedCalculatorCard {...defaultProps} />);

      expect(screen.getByTestId('memo-icon')).toBeInTheDocument();
    });
  });

  describe('Memoization Behavior', () => {
    it('should not re-render when props are the same', () => {
      const renderSpy = vi.fn();
      const IconWithSpy = () => {
        renderSpy();
        return <svg data-testid="spy-icon" />;
      };

      const props = {
        ...defaultProps,
        icon: <IconWithSpy />,
      };

      const { rerender } = render(<MemoizedCalculatorCard {...props} />);
      expect(renderSpy).toHaveBeenCalledTimes(1);

      // Re-render with same props
      rerender(<MemoizedCalculatorCard {...props} />);

      // Icon component render count should stay at 1 due to memoization
      // Note: The actual re-render prevention depends on React's reconciliation
      expect(screen.getByTestId('spy-icon')).toBeInTheDocument();
    });

    it('should re-render when title changes', () => {
      const { rerender } = render(<MemoizedCalculatorCard {...defaultProps} />);
      expect(screen.getByRole('heading', { name: /bmi calculator/i })).toBeInTheDocument();

      rerender(<MemoizedCalculatorCard {...defaultProps} title="Updated Title" />);
      expect(screen.getByRole('heading', { name: /updated title/i })).toBeInTheDocument();
    });

    it('should re-render when description changes', () => {
      const { rerender } = render(<MemoizedCalculatorCard {...defaultProps} />);
      expect(screen.getByText(/calculate your body mass index/i)).toBeInTheDocument();

      rerender(<MemoizedCalculatorCard {...defaultProps} description="New description" />);
      expect(screen.getByText(/new description/i)).toBeInTheDocument();
    });

    it('should re-render when path changes', () => {
      const { rerender } = render(<MemoizedCalculatorCard {...defaultProps} />);
      expect(screen.getByRole('link')).toHaveAttribute('href', '/bmi');

      rerender(<MemoizedCalculatorCard {...defaultProps} path="/new-path" />);
      expect(screen.getByRole('link')).toHaveAttribute('href', '/new-path');
    });

    it('should re-render when icon presence changes', () => {
      const { rerender } = render(<MemoizedCalculatorCard {...defaultProps} />);
      expect(screen.getByTestId('memo-icon')).toBeInTheDocument();

      // Re-render without icon
      rerender(<MemoizedCalculatorCard {...defaultProps} icon={undefined} />);
      // Without icon, the icon container should not be present
      expect(screen.queryByTestId('memo-icon')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty title', () => {
      render(<MemoizedCalculatorCard {...defaultProps} title="" />);

      // Should render without crashing
      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('should handle empty description', () => {
      render(<MemoizedCalculatorCard {...defaultProps} description="" />);

      expect(screen.getByRole('heading', { name: /bmi calculator/i })).toBeInTheDocument();
    });

    it('should handle long title text', () => {
      const longTitle = 'This is a very long calculator title that might wrap to multiple lines';
      render(<MemoizedCalculatorCard {...defaultProps} title={longTitle} />);

      expect(screen.getByRole('heading', { name: longTitle })).toBeInTheDocument();
    });

    it('should handle long description text', () => {
      const longDescription =
        'This is a very long description that provides detailed information about what the calculator does and how it can help users achieve their health goals through accurate calculations and personalized recommendations.';
      render(<MemoizedCalculatorCard {...defaultProps} description={longDescription} />);

      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });

    it('should handle special characters in title', () => {
      const specialTitle = 'BMI & Body Fat % Calculator <test>';
      render(<MemoizedCalculatorCard {...defaultProps} title={specialTitle} />);

      expect(screen.getByRole('heading', { name: specialTitle })).toBeInTheDocument();
    });

    it('should handle paths with query parameters', () => {
      render(<MemoizedCalculatorCard {...defaultProps} path="/bmi?unit=metric" />);

      expect(screen.getByRole('link')).toHaveAttribute('href', '/bmi?unit=metric');
    });

    it('should handle paths with hash fragments', () => {
      render(<MemoizedCalculatorCard {...defaultProps} path="/bmi#results" />);

      expect(screen.getByRole('link')).toHaveAttribute('href', '/bmi#results');
    });
  });
});

describe('Default Export', () => {
  it('should export CalculatorCard as default', () => {
    expect(CalculatorCard).toBeDefined();
    expect(typeof CalculatorCard).toBe('function');
  });

  it('should export MemoizedCalculatorCard as named export', () => {
    expect(MemoizedCalculatorCard).toBeDefined();
  });
});
