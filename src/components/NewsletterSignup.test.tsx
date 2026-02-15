/**
 * Tests for NewsletterSignup component
 * Tests form validation, submission states, error/success messages, and accessibility
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('@/context/LocaleContext', () => ({
  useLocale: () => ({
    locale: 'en',
    setLocale: vi.fn(),
    localizePath: (path: string) => path,
    t: (key: string) => key,
  }),
}));

import NewsletterSignup from './NewsletterSignup';

// Mock fetch for API calls
const mockFetch = vi.fn();

describe('NewsletterSignup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Setup default fetch mock
    global.fetch = mockFetch;
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, message: 'Thank you for subscribing!' }),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<NewsletterSignup />);

      expect(
        screen.getByRole('heading', { name: /subscribe to our newsletter/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/get the latest health and fitness tips/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/your email address/i)).toBeInTheDocument();
    });

    it('should render with custom title', () => {
      render(<NewsletterSignup title="Join Our Community" />);

      expect(screen.getByRole('heading', { name: /join our community/i })).toBeInTheDocument();
    });

    it('should render with custom description', () => {
      render(<NewsletterSignup description="Custom description text" />);

      expect(screen.getByText(/custom description text/i)).toBeInTheDocument();
    });

    it('should render with custom button text', () => {
      render(<NewsletterSignup buttonText="Sign Up Now" />);

      expect(screen.getByRole('button', { name: /sign up now/i })).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(<NewsletterSignup className="custom-class" />);

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should render privacy policy and terms links', () => {
      render(<NewsletterSignup />);

      const privacyLink = screen.getByRole('link', { name: /privacy policy/i });
      const termsLink = screen.getByRole('link', { name: /terms of service/i });

      expect(privacyLink).toHaveAttribute('href', '/privacy');
      expect(termsLink).toHaveAttribute('href', '/terms');
    });
  });

  describe('Accessibility', () => {
    it('should have accessible email input with label', () => {
      render(<NewsletterSignup />);

      const emailInput = screen.getByLabelText(/email address/i);
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute('type', 'email');
    });

    it('should mark email input as required', () => {
      render(<NewsletterSignup />);

      const emailInput = screen.getByLabelText(/email address/i);
      expect(emailInput).toHaveAttribute('required');
      expect(emailInput).toHaveAttribute('aria-required', 'true');
    });

    it('should display error message with alert role', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = vi.fn().mockResolvedValue({
        success: false,
        message: 'Invalid email format',
      });
      render(<NewsletterSignup onSubmit={mockOnSubmit} />);

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'test@example.com');

      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      await user.click(submitButton);

      const alert = await screen.findByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent(/invalid email format/i);
    });

    it('should have sr-only label for screen readers', () => {
      render(<NewsletterSignup />);

      const label = screen.getByText(/email address/i);
      expect(label).toHaveClass('sr-only');
    });
  });

  describe('Form Validation', () => {
    // Note: HTML5 form validation (type="email", required) handles basic validation
    // These tests verify the custom validation works when HTML5 validation passes
    // but our custom regex fails (e.g., programmatic submission)

    it('should require email field (HTML5 validation)', () => {
      render(<NewsletterSignup />);

      const emailInput = screen.getByLabelText(/email address/i);
      expect(emailInput).toHaveAttribute('required');
      expect(emailInput).toHaveAttribute('type', 'email');
    });

    it('should not call onSubmit when email is empty', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = vi.fn();
      render(<NewsletterSignup onSubmit={mockOnSubmit} />);

      // Try to submit with empty email - HTML5 validation will block
      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      await user.click(submitButton);

      // onSubmit should not be called due to HTML5 required validation
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should not call onSubmit with invalid email format', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = vi.fn();
      render(<NewsletterSignup onSubmit={mockOnSubmit} />);

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'notanemail');

      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      await user.click(submitButton);

      // onSubmit should not be called due to HTML5 email validation
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should accept valid email formats', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = vi.fn().mockResolvedValue({ success: true, message: 'Subscribed!' });
      render(<NewsletterSignup onSubmit={mockOnSubmit} />);

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'test@example.com');

      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith('test@example.com');
      });
    });

    it('should accept email with subdomain', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = vi.fn().mockResolvedValue({ success: true, message: 'Subscribed!' });
      render(<NewsletterSignup onSubmit={mockOnSubmit} />);

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'user@mail.example.com');

      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith('user@mail.example.com');
      });
    });
  });

  describe('Loading States', () => {
    it('should show loading state during submission', async () => {
      const user = userEvent.setup();
      let resolveSubmit: (value: { success: boolean; message: string }) => void;
      const mockOnSubmit = vi.fn().mockImplementation(
        () =>
          new Promise(resolve => {
            resolveSubmit = resolve;
          })
      );
      render(<NewsletterSignup onSubmit={mockOnSubmit} />);

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'test@example.com');

      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      await user.click(submitButton);

      // Check loading state
      expect(screen.getByRole('button', { name: /subscribing/i })).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeDisabled();
      expect(emailInput).toBeDisabled();

      // Resolve the promise
      resolveSubmit!({ success: true, message: 'Success!' });

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
        expect(screen.getByRole('button')).not.toBeDisabled();
      });
    });

    it('should disable input and button during loading', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = vi.fn().mockImplementation(
        () => new Promise(() => {}) // Never resolves
      );
      render(<NewsletterSignup onSubmit={mockOnSubmit} />);

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'test@example.com');

      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(emailInput).toBeDisabled();
        expect(screen.getByRole('button')).toBeDisabled();
      });
    });

    it('should apply opacity style to button during loading', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = vi.fn().mockImplementation(
        () => new Promise(() => {}) // Never resolves
      );
      render(<NewsletterSignup onSubmit={mockOnSubmit} />);

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'test@example.com');

      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByRole('button')).toHaveClass('opacity-70');
        expect(screen.getByRole('button')).toHaveClass('cursor-not-allowed');
      });
    });
  });

  describe('Success States', () => {
    it('should display success message from onSubmit handler', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = vi.fn().mockResolvedValue({
        success: true,
        message: 'Welcome aboard!',
      });
      render(<NewsletterSignup onSubmit={mockOnSubmit} />);

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'test@example.com');

      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      await user.click(submitButton);

      const status = await screen.findByRole('status');
      expect(status).toHaveTextContent(/welcome aboard!/i);
      expect(status).toHaveClass('bg-green-100');
    });

    it('should display default success message without onSubmit handler', async () => {
      const user = userEvent.setup();

      render(<NewsletterSignup />);

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'test@example.com');

      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      await user.click(submitButton);

      // Wait with longer timeout for the mock delay (1000ms)
      await waitFor(
        () => {
          const status = screen.getByRole('status');
          expect(status).toHaveTextContent(/thank you for subscribing/i);
        },
        { timeout: 3000 }
      );
    });

    it('should clear email input on successful submission without onSubmit', async () => {
      const user = userEvent.setup();

      render(<NewsletterSignup />);

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'test@example.com');

      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      await user.click(submitButton);

      // Wait with longer timeout for the mock delay (1000ms)
      await waitFor(() => expect(emailInput).toHaveValue(''), { timeout: 3000 });
    });
  });

  describe('Error States', () => {
    it('should display error message from onSubmit handler', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = vi.fn().mockResolvedValue({
        success: false,
        message: 'This email is already subscribed',
      });
      render(<NewsletterSignup onSubmit={mockOnSubmit} />);

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'test@example.com');

      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      await user.click(submitButton);

      const alert = await screen.findByRole('alert');
      expect(alert).toHaveTextContent(/this email is already subscribed/i);
      expect(alert).toHaveClass('bg-red-100');
    });

    it('should display generic error on exception', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = vi.fn().mockRejectedValue(new Error('Network error'));
      render(<NewsletterSignup onSubmit={mockOnSubmit} />);

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'test@example.com');

      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      await user.click(submitButton);

      const alert = await screen.findByRole('alert');
      expect(alert).toHaveTextContent(/an error occurred. please try again later/i);
      expect(alert).toHaveClass('bg-red-100');
    });

    it('should clear previous message on new submission', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = vi
        .fn()
        .mockResolvedValueOnce({ success: false, message: 'First error' })
        .mockResolvedValueOnce({ success: true, message: 'Success!' });

      render(<NewsletterSignup onSubmit={mockOnSubmit} />);

      const emailInput = screen.getByLabelText(/email address/i);
      const submitButton = screen.getByRole('button', { name: /subscribe/i });

      // First submission - error
      await user.type(emailInput, 'test@example.com');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent(/first error/i);
      });

      // Second submission - success
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        expect(screen.getByRole('status')).toHaveTextContent(/success!/i);
      });
    });
  });

  describe('User Interaction', () => {
    it('should allow typing in email input', async () => {
      const user = userEvent.setup();
      render(<NewsletterSignup />);

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'hello@world.com');

      expect(emailInput).toHaveValue('hello@world.com');
    });

    it('should prevent form submission without email', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = vi.fn();
      render(<NewsletterSignup onSubmit={mockOnSubmit} />);

      const submitButton = screen.getByRole('button', { name: /subscribe/i });
      await user.click(submitButton);

      // HTML5 required validation should prevent submission
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should handle form submission via keyboard', async () => {
      const user = userEvent.setup();
      const mockOnSubmit = vi.fn().mockResolvedValue({ success: true, message: 'Done!' });
      render(<NewsletterSignup onSubmit={mockOnSubmit} />);

      const emailInput = screen.getByLabelText(/email address/i);
      await user.type(emailInput, 'test@example.com{enter}');

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith('test@example.com');
      });
    });
  });
});
