/**
 * Tests for CalculatorForm component
 * Tests rendering of form fields, submit/reset buttons, error display, and radio/select fields
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CalculatorForm from './CalculatorForm';

// Mock locale context
vi.mock('@/context/LocaleContext', () => ({
  useLocale: () => ({
    locale: 'en',
    setLocale: vi.fn(),
    localizePath: (path: string) => path,
    t: (key: string) => {
      const messages: Record<string, string> = {
        'calculatorForm.submit': 'Calculate',
        'calculatorForm.reset': 'Reset',
        'calculatorForm.embedToggle': 'Embed this calculator',
        'calculatorForm.unitToggleAriaTemplate': 'Toggle {field} unit, currently {unit}',
        'medicalDisclaimer.compact': 'Info only. Not medical advice.',
      };
      return messages[key] ?? key;
    },
  }),
}));

// Mock next/dynamic to avoid dynamic import issues in tests
vi.mock('next/dynamic', () => ({
  default: () => {
    const DynamicComponent = () => null;
    DynamicComponent.displayName = 'DynamicComponent';
    return DynamicComponent;
  },
}));

// Mock MedicalDisclaimer since it renders outside the form and is tested separately
vi.mock('@/components/MedicalDisclaimer', () => ({
  MedicalDisclaimer: ({ className }: { className?: string }) => (
    <div data-testid="medical-disclaimer" className={className}>
      Disclaimer
    </div>
  ),
}));

describe('CalculatorForm', () => {
  const defaultProps = {
    title: 'BMI Calculator',
    fields: [],
    onSubmit: vi.fn((e: React.FormEvent) => e.preventDefault()),
    onReset: vi.fn(),
  };

  describe('Basic Rendering', () => {
    it('should render the form title', () => {
      render(<CalculatorForm {...defaultProps} />);

      expect(screen.getByRole('heading', { name: /bmi calculator/i })).toBeInTheDocument();
    });

    it('should render the submit button with default text', () => {
      render(<CalculatorForm {...defaultProps} />);

      expect(screen.getByRole('button', { name: 'Calculate' })).toBeInTheDocument();
    });

    it('should render the reset button with default text', () => {
      render(<CalculatorForm {...defaultProps} />);

      expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
    });

    it('should render custom submit button text', () => {
      render(<CalculatorForm {...defaultProps} submitButtonText="Compute BMI" />);

      expect(screen.getByRole('button', { name: 'Compute BMI' })).toBeInTheDocument();
    });

    it('should render custom reset button text', () => {
      render(<CalculatorForm {...defaultProps} resetButtonText="Clear All" />);

      expect(screen.getByRole('button', { name: 'Clear All' })).toBeInTheDocument();
    });

    it('should render the medical disclaimer', () => {
      render(<CalculatorForm {...defaultProps} />);

      expect(screen.getByTestId('medical-disclaimer')).toBeInTheDocument();
    });

    it('should have a form element', () => {
      const { container } = render(<CalculatorForm {...defaultProps} />);

      const form = container.querySelector('form');
      expect(form).toBeInTheDocument();
    });
  });

  describe('Number Fields', () => {
    it('should render a number input with label', () => {
      const fields = [
        {
          name: 'weight',
          label: 'Weight',
          type: 'number' as const,
          value: '' as const,
          onChange: vi.fn(),
          placeholder: 'Enter weight',
        },
      ];

      render(<CalculatorForm {...defaultProps} fields={fields} />);

      expect(screen.getByLabelText('Weight')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter weight')).toBeInTheDocument();
    });

    it('should display current value in number input', () => {
      const fields = [
        {
          name: 'weight',
          label: 'Weight',
          type: 'number' as const,
          value: 70,
          onChange: vi.fn(),
        },
      ];

      render(<CalculatorForm {...defaultProps} fields={fields} />);

      expect(screen.getByLabelText('Weight')).toHaveValue(70);
    });

    it('should call onChange when number input value changes', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const fields = [
        {
          name: 'weight',
          label: 'Weight',
          type: 'number' as const,
          value: '' as const,
          onChange,
        },
      ];

      render(<CalculatorForm {...defaultProps} fields={fields} />);

      await user.type(screen.getByLabelText('Weight'), '75');

      expect(onChange).toHaveBeenCalled();
    });

    it('should render unit toggle button when unitToggle is provided', () => {
      const fields = [
        {
          name: 'weight',
          label: 'Weight',
          type: 'number' as const,
          value: 70,
          onChange: vi.fn(),
          unit: 'kg',
          unitToggle: vi.fn(),
        },
      ];

      render(<CalculatorForm {...defaultProps} fields={fields} />);

      const unitButton = screen.getByText('kg');
      expect(unitButton).toBeInTheDocument();
      expect(unitButton.tagName).toBe('BUTTON');
    });

    it('should call unitToggle when unit button is clicked', async () => {
      const user = userEvent.setup();
      const unitToggle = vi.fn();
      const fields = [
        {
          name: 'weight',
          label: 'Weight',
          type: 'number' as const,
          value: 70,
          onChange: vi.fn(),
          unit: 'kg',
          unitToggle,
        },
      ];

      render(<CalculatorForm {...defaultProps} fields={fields} />);

      await user.click(screen.getByText('kg'));

      expect(unitToggle).toHaveBeenCalledTimes(1);
    });
  });

  describe('Error Display', () => {
    it('should display error message for a field', () => {
      const fields = [
        {
          name: 'weight',
          label: 'Weight',
          type: 'number' as const,
          value: -5,
          onChange: vi.fn(),
          error: 'Weight must be positive',
        },
      ];

      render(<CalculatorForm {...defaultProps} fields={fields} />);

      expect(screen.getByText('Weight must be positive')).toBeInTheDocument();
    });

    it('should mark the error message with role="alert"', () => {
      const fields = [
        {
          name: 'weight',
          label: 'Weight',
          type: 'number' as const,
          value: -5,
          onChange: vi.fn(),
          error: 'Weight must be positive',
        },
      ];

      render(<CalculatorForm {...defaultProps} fields={fields} />);

      expect(screen.getByRole('alert')).toHaveTextContent('Weight must be positive');
    });

    it('should set aria-invalid on the input when there is an error', () => {
      const fields = [
        {
          name: 'weight',
          label: 'Weight',
          type: 'number' as const,
          value: -5,
          onChange: vi.fn(),
          error: 'Weight must be positive',
        },
      ];

      render(<CalculatorForm {...defaultProps} fields={fields} />);

      expect(screen.getByLabelText('Weight')).toHaveAttribute('aria-invalid', 'true');
    });

    it('should link input to error via aria-describedby', () => {
      const fields = [
        {
          name: 'weight',
          label: 'Weight',
          type: 'number' as const,
          value: -5,
          onChange: vi.fn(),
          error: 'Weight must be positive',
        },
      ];

      render(<CalculatorForm {...defaultProps} fields={fields} />);

      const input = screen.getByLabelText('Weight');
      expect(input).toHaveAttribute('aria-describedby', 'weight-error');
      expect(screen.getByText('Weight must be positive')).toHaveAttribute('id', 'weight-error');
    });

    it('should not display error when field has no error', () => {
      const fields = [
        {
          name: 'weight',
          label: 'Weight',
          type: 'number' as const,
          value: 70,
          onChange: vi.fn(),
        },
      ];

      render(<CalculatorForm {...defaultProps} fields={fields} />);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(screen.getByLabelText('Weight')).not.toHaveAttribute('aria-invalid');
    });

    it('should display errors for multiple fields', () => {
      const fields = [
        {
          name: 'weight',
          label: 'Weight',
          type: 'number' as const,
          value: '' as const,
          onChange: vi.fn(),
          error: 'Weight is required',
        },
        {
          name: 'height',
          label: 'Height',
          type: 'number' as const,
          value: '' as const,
          onChange: vi.fn(),
          error: 'Height is required',
        },
      ];

      render(<CalculatorForm {...defaultProps} fields={fields} />);

      const alerts = screen.getAllByRole('alert');
      expect(alerts).toHaveLength(2);
      expect(screen.getByText('Weight is required')).toBeInTheDocument();
      expect(screen.getByText('Height is required')).toBeInTheDocument();
    });
  });

  describe('Radio Fields', () => {
    it('should render radio group with options', () => {
      const fields = [
        {
          name: 'sex',
          label: 'Sex',
          type: 'radio' as const,
          value: 'male',
          onChange: vi.fn(),
          options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ],
        },
      ];

      render(<CalculatorForm {...defaultProps} fields={fields} />);

      expect(screen.getByText('Sex')).toBeInTheDocument();
      expect(screen.getByRole('radiogroup', { name: 'Sex' })).toBeInTheDocument();
      expect(screen.getByLabelText('Male')).toBeInTheDocument();
      expect(screen.getByLabelText('Female')).toBeInTheDocument();
    });

    it('should have the correct radio option checked', () => {
      const fields = [
        {
          name: 'sex',
          label: 'Sex',
          type: 'radio' as const,
          value: 'female',
          onChange: vi.fn(),
          options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ],
        },
      ];

      render(<CalculatorForm {...defaultProps} fields={fields} />);

      expect(screen.getByLabelText('Female')).toBeChecked();
      expect(screen.getByLabelText('Male')).not.toBeChecked();
    });

    it('should call onChange when a radio option is clicked', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const fields = [
        {
          name: 'sex',
          label: 'Sex',
          type: 'radio' as const,
          value: 'male',
          onChange,
          options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ],
        },
      ];

      render(<CalculatorForm {...defaultProps} fields={fields} />);

      await user.click(screen.getByLabelText('Female'));

      expect(onChange).toHaveBeenCalledWith('female');
    });
  });

  describe('Select Fields', () => {
    it('should render a select dropdown with options', () => {
      const fields = [
        {
          name: 'activity',
          label: 'Activity Level',
          type: 'select' as const,
          value: 'moderate',
          onChange: vi.fn(),
          options: [
            { value: 'sedentary', label: 'Sedentary' },
            {
              value: 'moderate',
              label: 'Moderate',
              description: '3-5 days/week',
            },
            { value: 'active', label: 'Active' },
          ],
        },
      ];

      render(<CalculatorForm {...defaultProps} fields={fields} />);

      const select = screen.getByLabelText('Activity Level');
      expect(select).toBeInTheDocument();
      expect(select.tagName).toBe('SELECT');

      const options = within(select).getAllByRole('option');
      expect(options).toHaveLength(3);
    });

    it('should display the description for the selected option', () => {
      const fields = [
        {
          name: 'activity',
          label: 'Activity Level',
          type: 'select' as const,
          value: 'moderate',
          onChange: vi.fn(),
          options: [
            { value: 'sedentary', label: 'Sedentary' },
            {
              value: 'moderate',
              label: 'Moderate',
              description: '3-5 days/week',
            },
            { value: 'active', label: 'Active' },
          ],
        },
      ];

      render(<CalculatorForm {...defaultProps} fields={fields} />);

      expect(screen.getByText('3-5 days/week')).toBeInTheDocument();
    });

    it('should call onChange when a select value changes', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const fields = [
        {
          name: 'activity',
          label: 'Activity Level',
          type: 'select' as const,
          value: 'sedentary',
          onChange,
          options: [
            { value: 'sedentary', label: 'Sedentary' },
            { value: 'moderate', label: 'Moderate' },
            { value: 'active', label: 'Active' },
          ],
        },
      ];

      render(<CalculatorForm {...defaultProps} fields={fields} />);

      await user.selectOptions(screen.getByLabelText('Activity Level'), 'active');

      expect(onChange).toHaveBeenCalledWith('active');
    });

    it('should display error on select field', () => {
      const fields = [
        {
          name: 'activity',
          label: 'Activity Level',
          type: 'select' as const,
          value: '',
          onChange: vi.fn(),
          error: 'Please select an activity level',
          options: [
            { value: '', label: 'Choose...' },
            { value: 'sedentary', label: 'Sedentary' },
          ],
        },
      ];

      render(<CalculatorForm {...defaultProps} fields={fields} />);

      expect(screen.getByText('Please select an activity level')).toBeInTheDocument();
      expect(screen.getByLabelText('Activity Level')).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Form Submission', () => {
    it('should call onSubmit when form is submitted', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());

      render(<CalculatorForm {...defaultProps} onSubmit={onSubmit} />);

      await user.click(screen.getByRole('button', { name: 'Calculate' }));

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('should call onReset when reset button is clicked', async () => {
      const user = userEvent.setup();
      const onReset = vi.fn();

      render(<CalculatorForm {...defaultProps} onReset={onReset} />);

      await user.click(screen.getByRole('button', { name: 'Reset' }));

      expect(onReset).toHaveBeenCalledTimes(1);
    });

    it('should have submit button with type="submit"', () => {
      render(<CalculatorForm {...defaultProps} />);

      const submitButton = screen.getByRole('button', { name: 'Calculate' });
      expect(submitButton).toHaveAttribute('type', 'submit');
    });

    it('should have reset button with type="button"', () => {
      render(<CalculatorForm {...defaultProps} />);

      const resetButton = screen.getByRole('button', { name: 'Reset' });
      expect(resetButton).toHaveAttribute('type', 'button');
    });
  });

  describe('Embed Toggle', () => {
    it('should not show embed toggle for non-embeddable calculators', () => {
      render(<CalculatorForm {...defaultProps} calculatorSlug="some-random-calc" />);

      expect(screen.queryByText('Embed this calculator')).not.toBeInTheDocument();
    });

    it('should show embed toggle for embeddable calculators', () => {
      render(<CalculatorForm {...defaultProps} calculatorSlug="bmi" />);

      expect(screen.getByText('Embed this calculator')).toBeInTheDocument();
    });

    it('should toggle embed section on click', async () => {
      const user = userEvent.setup();

      render(<CalculatorForm {...defaultProps} calculatorSlug="bmi" />);

      const toggleButton = screen.getByText('Embed this calculator');
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

      await user.click(toggleButton);

      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should not show embed toggle when calculatorSlug is not provided', () => {
      render(<CalculatorForm {...defaultProps} />);

      expect(screen.queryByText('Embed this calculator')).not.toBeInTheDocument();
    });
  });

  describe('Multiple Fields', () => {
    it('should render all field types together', () => {
      const fields = [
        {
          name: 'weight',
          label: 'Weight',
          type: 'number' as const,
          value: 70,
          onChange: vi.fn(),
        },
        {
          name: 'sex',
          label: 'Sex',
          type: 'radio' as const,
          value: 'male',
          onChange: vi.fn(),
          options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ],
        },
        {
          name: 'activity',
          label: 'Activity Level',
          type: 'select' as const,
          value: 'moderate',
          onChange: vi.fn(),
          options: [
            { value: 'sedentary', label: 'Sedentary' },
            { value: 'moderate', label: 'Moderate' },
          ],
        },
      ];

      render(<CalculatorForm {...defaultProps} fields={fields} />);

      expect(screen.getByLabelText('Weight')).toBeInTheDocument();
      expect(screen.getByRole('radiogroup', { name: 'Sex' })).toBeInTheDocument();
      expect(screen.getByLabelText('Activity Level')).toBeInTheDocument();
    });
  });

  describe('Date and Time Fields', () => {
    it('should render a date input', () => {
      const fields = [
        {
          name: 'birthdate',
          label: 'Date of Birth',
          type: 'date' as const,
          value: '1990-01-15',
          onChange: vi.fn(),
        },
      ];

      render(<CalculatorForm {...defaultProps} fields={fields} />);

      const input = screen.getByLabelText('Date of Birth');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'date');
      expect(input).toHaveValue('1990-01-15');
    });

    it('should render a time input', () => {
      const fields = [
        {
          name: 'sleepTime',
          label: 'Sleep Time',
          type: 'time' as const,
          value: '22:30',
          onChange: vi.fn(),
        },
      ];

      render(<CalculatorForm {...defaultProps} fields={fields} />);

      const input = screen.getByLabelText('Sleep Time');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'time');
      expect(input).toHaveValue('22:30');
    });

    it('should display error on date field', () => {
      const fields = [
        {
          name: 'birthdate',
          label: 'Date of Birth',
          type: 'date' as const,
          value: '',
          onChange: vi.fn(),
          error: 'Date is required',
        },
      ];

      render(<CalculatorForm {...defaultProps} fields={fields} />);

      expect(screen.getByText('Date is required')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });
});
