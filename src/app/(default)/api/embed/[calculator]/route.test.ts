/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from './route';

function makeRequest(path: string): NextRequest {
  return new NextRequest(`http://localhost${path}`, { method: 'GET' });
}

function makeParams(calculator: string): { params: Promise<{ calculator: string }> } {
  return { params: Promise.resolve({ calculator }) };
}

describe('GET /api/embed/[calculator]', () => {
  it('returns embeddable HTML for supported calculators', async () => {
    const res = await GET(makeRequest('/api/embed/bmi'), makeParams('bmi'));
    const html = await res.text();

    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('text/html');
    // Framing/CSP headers are enforced by middleware in production.
    expect(res.headers.get('X-Frame-Options')).toBeNull();
    expect(res.headers.get('Content-Security-Policy')).toBeNull();
    expect(res.headers.get('Cache-Control')).toContain('max-age=3600');
    expect(html).toContain('<title>BMI Calculator - HealthCheck</title>');
    expect(html).toContain('Powered by <a href="https://www.healthcalc.xyz/bmi"');
    expect(html).toContain('background: #f0f0f3;');
  });

  it('uses dark theme styles when theme=dark', async () => {
    const res = await GET(makeRequest('/api/embed/bmi?theme=dark'), makeParams('bmi'));
    const html = await res.text();

    expect(res.status).toBe(200);
    expect(html).toContain('background: #1a1a2e;');
  });

  it('falls back to light theme for unknown theme values', async () => {
    const res = await GET(makeRequest('/api/embed/bmi?theme=retro'), makeParams('bmi'));
    const html = await res.text();

    expect(res.status).toBe(200);
    expect(html).toContain('background: #f0f0f3;');
    expect(html).not.toContain('background: #1a1a2e;');
  });

  it('returns 404 and escapes calculator name for unsupported calculators', async () => {
    const calculator = '<img src=x onerror=alert(1)>';
    const res = await GET(makeRequest('/api/embed/does-not-exist'), makeParams(calculator));
    const html = await res.text();

    expect(res.status).toBe(404);
    expect(res.headers.get('Content-Type')).toContain('text/html');
    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;');
    expect(html).toContain('Available: bmi, tdee, body-fat, calorie-deficit');
  });
});
