import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AFFILIATE_DISCLOSURE } from '@/constants/affiliates';
import AffiliateLinks from './AffiliateLinks';

vi.mock('@/hooks/useFunnelTracking', () => ({
  useFunnelTracking: () => ({ canTrack: false, trackEvent: vi.fn() }),
}));

describe('AffiliateLinks', () => {
  it('renders Amazon products without static prices or star ratings', () => {
    const { container } = render(<AffiliateLinks calculatorType="bmi" />);

    expect(container.querySelectorAll('a[rel~="sponsored"]').length).toBeGreaterThan(0);
    expect(container.textContent).not.toMatch(/\$\d/);
    expect(screen.queryByRole('img', { name: /rating/i })).toBeNull();
  });

  it('carries the Amazon Associates statement in its disclosure', () => {
    render(<AffiliateLinks calculatorType="bmi" />);

    expect(screen.getByText(AFFILIATE_DISCLOSURE.short)).toHaveTextContent(
      'As an Amazon Associate I earn from qualifying purchases.'
    );
  });
});
