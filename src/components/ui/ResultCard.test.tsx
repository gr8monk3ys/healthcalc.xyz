/**
 * Tests for ResultCard component
 * Tests rendering of calculator result values, units, status colors, descriptions, and icons
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultCard from './ResultCard';

describe('ResultCard', () => {
  const defaultProps = {
    title: 'BMI',
    value: '22.5',
  };

  describe('Basic Rendering', () => {
    it('should render the title', () => {
      render(<ResultCard {...defaultProps} />);

      expect(screen.getByText('BMI')).toBeInTheDocument();
    });

    it('should render the value', () => {
      render(<ResultCard {...defaultProps} />);

      expect(screen.getByText('22.5')).toBeInTheDocument();
    });

    it('should render a numeric value', () => {
      render(<ResultCard {...defaultProps} value={22.5} />);

      expect(screen.getByText('22.5')).toBeInTheDocument();
    });

    it('should render 0 as value', () => {
      render(<ResultCard {...defaultProps} value={0} />);

      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('should render the title as a heading', () => {
      render(<ResultCard {...defaultProps} />);

      expect(screen.getByRole('heading', { name: 'BMI' })).toBeInTheDocument();
    });
  });

  describe('Unit Display', () => {
    it('should render the unit when provided', () => {
      render(<ResultCard {...defaultProps} unit="kg/m2" />);

      expect(screen.getByText('kg/m2')).toBeInTheDocument();
    });

    it('should not render unit element when not provided', () => {
      const { container } = render(<ResultCard {...defaultProps} />);

      // Only the value span should be in the baseline container,
      // no unit span
      const baselineContainer = container.querySelector('.items-baseline');
      const spans = baselineContainer?.querySelectorAll('span');
      expect(spans).toHaveLength(1); // only value, no unit
    });
  });

  describe('Description', () => {
    it('should render the description when provided', () => {
      render(<ResultCard {...defaultProps} description="Normal weight range" />);

      expect(screen.getByText('Normal weight range')).toBeInTheDocument();
    });

    it('should not render description element when not provided', () => {
      const { container } = render(<ResultCard {...defaultProps} />);

      const paragraphs = container.querySelectorAll('p');
      expect(paragraphs).toHaveLength(0);
    });
  });

  describe('Icon', () => {
    it('should render the icon when provided', () => {
      const icon = <svg data-testid="result-icon" />;

      render(<ResultCard {...defaultProps} icon={icon} />);

      expect(screen.getByTestId('result-icon')).toBeInTheDocument();
    });

    it('should hide icon from assistive technology', () => {
      const icon = <svg data-testid="result-icon" />;

      const { container } = render(<ResultCard {...defaultProps} icon={icon} />);

      const iconWrapper = container.querySelector('[aria-hidden="true"]');
      expect(iconWrapper).toBeInTheDocument();
      expect(iconWrapper).toContainElement(screen.getByTestId('result-icon'));
    });

    it('should not render icon container when icon is not provided', () => {
      const { container } = render(<ResultCard {...defaultProps} />);

      expect(container.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument();
    });
  });

  describe('Status Variants', () => {
    it('should apply info status colors by default', () => {
      const { container } = render(<ResultCard {...defaultProps} />);

      const valueElement = container.querySelector('.text-accent');
      expect(valueElement).toBeInTheDocument();
    });

    it('should apply success status colors', () => {
      const { container } = render(<ResultCard {...defaultProps} status="success" />);

      const valueElement = container.querySelector('.text-green-600');
      expect(valueElement).toBeInTheDocument();
    });

    it('should apply warning status colors', () => {
      const { container } = render(<ResultCard {...defaultProps} status="warning" />);

      const valueElement = container.querySelector('.text-yellow-600');
      expect(valueElement).toBeInTheDocument();
    });

    it('should apply danger status colors', () => {
      const { container } = render(<ResultCard {...defaultProps} status="danger" />);

      const valueElement = container.querySelector('.text-red-600');
      expect(valueElement).toBeInTheDocument();
    });

    it('should apply status color to icon container as well', () => {
      const icon = <svg data-testid="status-icon" />;
      const { container } = render(<ResultCard {...defaultProps} icon={icon} status="danger" />);

      const iconWrapper = container.querySelector('[aria-hidden="true"]');
      expect(iconWrapper).toHaveClass('text-red-600');
    });
  });

  describe('Custom ClassName', () => {
    it('should apply custom className to the card', () => {
      const { container } = render(<ResultCard {...defaultProps} className="mt-4" />);

      // The Card wrapper div should have the custom class
      const cardDiv = container.firstElementChild;
      expect(cardDiv).toHaveClass('mt-4');
    });

    it('should apply empty className by default', () => {
      const { container } = render(<ResultCard {...defaultProps} />);

      // Should render without error
      expect(container.firstElementChild).toBeInTheDocument();
    });
  });

  describe('Full Result Display', () => {
    it('should render a complete result card with all props', () => {
      const icon = <svg data-testid="full-icon" />;

      render(
        <ResultCard
          title="Body Mass Index"
          value="24.9"
          unit="kg/m2"
          description="You are in the normal weight range"
          icon={icon}
          status="success"
          className="mb-4"
        />
      );

      expect(screen.getByRole('heading', { name: 'Body Mass Index' })).toBeInTheDocument();
      expect(screen.getByText('24.9')).toBeInTheDocument();
      expect(screen.getByText('kg/m2')).toBeInTheDocument();
      expect(screen.getByText('You are in the normal weight range')).toBeInTheDocument();
      expect(screen.getByTestId('full-icon')).toBeInTheDocument();
    });
  });
});
