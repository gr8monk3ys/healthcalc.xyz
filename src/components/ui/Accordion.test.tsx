/**
 * Tests for Accordion component
 * Tests expand/collapse behavior, accessibility attributes, default state, and keyboard interaction
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Accordion from './Accordion';

describe('Accordion', () => {
  const defaultProps = {
    title: 'What is BMI?',
    children: <p>Body Mass Index is a measure of body fat based on height and weight.</p>,
  };

  describe('Basic Rendering', () => {
    it('should render the title as a button', () => {
      render(<Accordion {...defaultProps} />);

      expect(screen.getByRole('button', { name: /what is bmi/i })).toBeInTheDocument();
    });

    it('should render children content', () => {
      render(<Accordion {...defaultProps} />);

      expect(screen.getByText(/body mass index is a measure/i)).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(<Accordion {...defaultProps} className="mt-8" />);

      expect(container.firstElementChild).toHaveClass('mt-8');
    });
  });

  describe('Default Closed State', () => {
    it('should be collapsed by default', () => {
      render(<Accordion {...defaultProps} />);

      const button = screen.getByRole('button', { name: /what is bmi/i });
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('should mark the panel as hidden when collapsed', () => {
      render(<Accordion {...defaultProps} />);

      const panel = screen.getByRole('region', { hidden: true });
      expect(panel).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Default Open State', () => {
    it('should be expanded when defaultOpen is true', () => {
      render(<Accordion {...defaultProps} defaultOpen={true} />);

      const button = screen.getByRole('button', { name: /what is bmi/i });
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('should mark the panel as visible when expanded', () => {
      render(<Accordion {...defaultProps} defaultOpen={true} />);

      const panel = screen.getByRole('region');
      expect(panel).toHaveAttribute('aria-hidden', 'false');
    });
  });

  describe('Toggle Behavior', () => {
    it('should expand when the button is clicked', async () => {
      const user = userEvent.setup();

      render(<Accordion {...defaultProps} />);

      const button = screen.getByRole('button', { name: /what is bmi/i });
      expect(button).toHaveAttribute('aria-expanded', 'false');

      await user.click(button);

      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('should collapse when clicked again', async () => {
      const user = userEvent.setup();

      render(<Accordion {...defaultProps} defaultOpen={true} />);

      const button = screen.getByRole('button', { name: /what is bmi/i });
      expect(button).toHaveAttribute('aria-expanded', 'true');

      await user.click(button);

      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('should toggle multiple times', async () => {
      const user = userEvent.setup();

      render(<Accordion {...defaultProps} />);

      const button = screen.getByRole('button', { name: /what is bmi/i });

      // closed -> open
      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');

      // open -> closed
      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'false');

      // closed -> open
      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Accessibility', () => {
    it('should link button to panel via aria-controls', () => {
      render(<Accordion {...defaultProps} />);

      const button = screen.getByRole('button', { name: /what is bmi/i });
      const controlsId = button.getAttribute('aria-controls');
      expect(controlsId).toBeTruthy();

      // The panel should have the matching id
      const panel = screen.getByRole('region', { hidden: true });
      expect(panel).toHaveAttribute('id', controlsId);
    });

    it('should link panel back to button via aria-labelledby', () => {
      render(<Accordion {...defaultProps} />);

      const button = screen.getByRole('button', { name: /what is bmi/i });
      const buttonId = button.getAttribute('id');
      expect(buttonId).toBeTruthy();

      const panel = screen.getByRole('region', { hidden: true });
      expect(panel).toHaveAttribute('aria-labelledby', buttonId);
    });

    it('should have the panel as a region role', () => {
      render(<Accordion {...defaultProps} defaultOpen={true} />);

      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('should be activatable by keyboard Enter', async () => {
      const user = userEvent.setup();

      render(<Accordion {...defaultProps} />);

      const button = screen.getByRole('button', { name: /what is bmi/i });

      button.focus();
      await user.keyboard('{Enter}');

      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('should be activatable by keyboard Space', async () => {
      const user = userEvent.setup();

      render(<Accordion {...defaultProps} />);

      const button = screen.getByRole('button', { name: /what is bmi/i });

      button.focus();
      await user.keyboard(' ');

      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('should set inert on panel when collapsed', () => {
      render(<Accordion {...defaultProps} />);

      const panel = screen.getByRole('region', { hidden: true });
      expect(panel).toHaveAttribute('inert');
    });

    it('should not set inert on panel when expanded', () => {
      render(<Accordion {...defaultProps} defaultOpen={true} />);

      const panel = screen.getByRole('region');
      expect(panel).not.toHaveAttribute('inert');
    });
  });

  describe('Chevron Icon', () => {
    it('should render the chevron SVG', () => {
      const { container } = render(<Accordion {...defaultProps} />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('should rotate chevron when expanded', async () => {
      const user = userEvent.setup();
      const { container } = render(<Accordion {...defaultProps} />);

      const svg = container.querySelector('svg');
      expect(svg).not.toHaveClass('rotate-180');

      await user.click(screen.getByRole('button', { name: /what is bmi/i }));

      expect(svg).toHaveClass('rotate-180');
    });
  });

  describe('Complex Children', () => {
    it('should render complex content within the panel', () => {
      render(
        <Accordion title="Details">
          <div data-testid="complex-content">
            <h4>Sub heading</h4>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        </Accordion>
      );

      expect(screen.getByTestId('complex-content')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
  });
});
