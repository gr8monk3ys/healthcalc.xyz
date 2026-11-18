/**
 * Tests for ResultCard component
 * Tests rendering of calculator result values, units, status markers, descriptions, and icons
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

    it('should render the value alone when no unit is provided', () => {
      render(<ResultCard {...defaultProps} />);

      expect(screen.getByText('22.5').parentElement).toHaveTextContent(/^22\.5$/);
    });

    it('should render the unit after the value', () => {
      render(<ResultCard {...defaultProps} unit="kg/m2" />);

      expect(screen.getByText('22.5').parentElement).toHaveTextContent(/^22\.5 kg\/m2$/);
    });
  });

  describe('Description', () => {
    it('should render the description when provided', () => {
      render(<ResultCard {...defaultProps} description="Normal weight range" />);

      expect(screen.getByText('Normal weight range')).toBeInTheDocument();
    });

    it('should render only the title and value when no description is provided', () => {
      const { container } = render(<ResultCard {...defaultProps} />);

      expect(container).toHaveTextContent(/^BMI22\.5$/);
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

      render(<ResultCard {...defaultProps} icon={icon} />);

      expect(screen.getByTestId('result-icon').closest('[aria-hidden="true"]')).not.toBeNull();
      expect(screen.getByRole('heading', { name: 'BMI' })).toBeInTheDocument();
    });

    it('should not render icon container when icon is not provided', () => {
      const { container } = render(<ResultCard {...defaultProps} />);

      expect(container.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument();
    });
  });

  describe('Status Marker', () => {
    it('should render no status marker by default', () => {
      const { container } = render(<ResultCard {...defaultProps} />);

      expect(container.querySelector('[data-status]')).not.toBeInTheDocument();
    });

    it.each(['success', 'warning', 'danger', 'info'] as const)(
      'should mark %s status before the title without adding text',
      status => {
        render(<ResultCard {...defaultProps} status={status} />);

        const marker = screen
          .getByRole('heading', { name: 'BMI' })
          .querySelector(`[data-status="${status}"]`);
        expect(marker).toBeInTheDocument();
        expect(marker).toBeEmptyDOMElement();
        expect(marker).toHaveAttribute('aria-hidden', 'true');
      }
    );

    it('should keep the status marker out of the value', () => {
      render(<ResultCard {...defaultProps} status="danger" />);

      expect(screen.getByText('22.5').querySelector('[data-status]')).toBeNull();
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
