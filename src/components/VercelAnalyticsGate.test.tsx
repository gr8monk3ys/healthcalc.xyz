import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { buildSharedResultToken } from '@/utils/resultSharing';
import VercelAnalyticsGate from './VercelAnalyticsGate';

type BeforeSend = (event: { type: 'pageview'; url: string }) => { url: string } | null;

const consent = vi.hoisted(() => ({ analytics: false }));
const analyticsStub = vi.hoisted(() => ({ beforeSend: undefined as unknown, mounted: false }));

vi.mock('@/components/CookieConsent', () => ({
  useCookieConsent: () => ({
    analytics: consent.analytics,
    advertising: false,
    openConsentBanner: () => {},
  }),
}));

vi.mock('next/dynamic', () => ({
  default: () =>
    function AnalyticsStub({ beforeSend }: { beforeSend: unknown }) {
      analyticsStub.mounted = true;
      analyticsStub.beforeSend = beforeSend;
      return null;
    },
}));

describe('VercelAnalyticsGate', () => {
  beforeEach(() => {
    consent.analytics = false;
    analyticsStub.mounted = false;
    analyticsStub.beforeSend = undefined;
  });

  it('does not mount analytics without consent', () => {
    render(<VercelAnalyticsGate />);

    expect(analyticsStub.mounted).toBe(false);
  });

  it('strips a shared result token from the URL sent to analytics', () => {
    consent.analytics = true;
    render(<VercelAnalyticsGate />);

    const token = buildSharedResultToken({
      calculator: 'bmi',
      inputs: { age: 40, gender: 'male', heightCm: 180, weightKg: 90 },
    } as Parameters<typeof buildSharedResultToken>[0]);
    const beforeSend = analyticsStub.beforeSend as BeforeSend;
    const sent = beforeSend({
      type: 'pageview',
      url: `https://www.healthcalc.xyz/bmi?r=${token}`,
    });

    expect(sent?.url).toBe('https://www.healthcalc.xyz/bmi');
  });

  it('drops events after consent is withdrawn mid-session', () => {
    consent.analytics = true;
    const { rerender } = render(<VercelAnalyticsGate />);
    const beforeSend = analyticsStub.beforeSend as BeforeSend;

    consent.analytics = false;
    rerender(<VercelAnalyticsGate />);

    expect(beforeSend({ type: 'pageview', url: 'https://www.healthcalc.xyz/bmi' })).toBeNull();
  });
});
