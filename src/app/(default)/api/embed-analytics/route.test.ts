/**
 * @vitest-environment node
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

function makeRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost/api/embed-analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/embed-analytics', () => {
  let POST: (request: NextRequest) => Promise<Response>;
  let trackMock: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    vi.resetModules();
    vi.doMock('@vercel/analytics/server', () => ({
      track: vi.fn(async () => undefined),
    }));

    const route = await import('./route');
    POST = route.POST;

    const analytics = await import('@vercel/analytics/server');
    trackMock = analytics.track as unknown as ReturnType<typeof vi.fn>;
  });

  it('tracks embed view events for valid payloads', async () => {
    const response = await POST(
      makeRequest({
        calculator: 'bmi',
        action: 'view',
        referrer: 'https://example.org/fitness-tools',
      })
    );

    expect(response.status).toBe(204);
    expect(trackMock).toHaveBeenCalledTimes(1);
    expect(trackMock).toHaveBeenCalledWith(
      'embed_widget_view',
      expect.objectContaining({
        calculator: 'bmi',
        referrer_host: 'example.org',
      }),
      expect.any(Object)
    );
  });

  it('tracks embed calculate events', async () => {
    const response = await POST(
      makeRequest({
        calculator: 'tdee',
        action: 'calculate',
        referrer: 'https://coach.example.com/page',
      })
    );

    expect(response.status).toBe(204);
    expect(trackMock).toHaveBeenCalledTimes(1);
    expect(trackMock).toHaveBeenCalledWith(
      'embed_widget_calculate',
      expect.objectContaining({
        calculator: 'tdee',
        referrer_host: 'coach.example.com',
      }),
      expect.any(Object)
    );
  });

  it('returns 204 without tracking for invalid payloads', async () => {
    const response = await POST(
      makeRequest({
        calculator: 'macro',
        action: 'view',
      })
    );

    expect(response.status).toBe(204);
    expect(trackMock).not.toHaveBeenCalled();
  });

  it('falls back to unknown host when referrer is invalid', async () => {
    const response = await POST(
      makeRequest({
        calculator: 'body-fat',
        action: 'view',
        referrer: 'not-a-url',
      })
    );

    expect(response.status).toBe(204);
    expect(trackMock).toHaveBeenCalledWith(
      'embed_widget_view',
      expect.objectContaining({
        calculator: 'body-fat',
        referrer_host: 'unknown',
      }),
      expect.any(Object)
    );
  });
});
