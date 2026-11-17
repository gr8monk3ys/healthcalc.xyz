/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ContactPage from './page';

vi.mock('@/components/ContactForm', () => ({
  default: () => <form aria-label="Contact form" />,
}));

describe('Contact page', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('shows a clear failure instead of the form when no mail provider is configured', () => {
    vi.stubEnv('RESEND_API_KEY', '');

    render(<ContactPage />);

    expect(screen.getByRole('alert')).toHaveTextContent(/contact form is unavailable/i);
    expect(screen.getByRole('link', { name: 'info@healthcalc.xyz' })).toHaveAttribute(
      'href',
      'mailto:info@healthcalc.xyz'
    );
    expect(screen.queryByRole('form', { name: 'Contact form' })).not.toBeInTheDocument();
  });

  it('shows the form when a mail provider is configured', () => {
    vi.stubEnv('RESEND_API_KEY', 'test-key');

    render(<ContactPage />);

    expect(screen.getByRole('form', { name: 'Contact form' })).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
