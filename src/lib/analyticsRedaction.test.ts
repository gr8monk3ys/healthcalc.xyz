import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { installGaHitRedaction, pathOnlyUrl, redactGaPayload } from './analyticsRedaction';

const TOKEN = 'eyJ2IjoxLCJjIjoiYm1pIn0';
const encoded = (path: string) => encodeURIComponent(`https://www.healthcalc.xyz${path}`);

describe('pathOnlyUrl', () => {
  it('drops the query string and fragment', () => {
    expect(pathOnlyUrl(`https://www.healthcalc.xyz/bmi?r=${TOKEN}#x`)).toBe(
      'https://www.healthcalc.xyz/bmi'
    );
  });

  it('returns an empty string for an empty or invalid URL', () => {
    expect(pathOnlyUrl('')).toBe('');
    expect(pathOnlyUrl('not a url')).toBe('');
  });
});

describe('redactGaPayload', () => {
  it('strips dl and dr in a hit URL and leaves other fields byte-identical', () => {
    const url = `https://region1.google-analytics.com/g/collect?v=2&tid=G-X&dl=${encoded(`/tdee?r=${TOKEN}`)}&dr=${encoded(`/bmi?r=${TOKEN}`)}&dt=TDEE%20Calculator&en=page_view`;

    expect(redactGaPayload(url)).toBe(
      `https://region1.google-analytics.com/g/collect?v=2&tid=G-X&dl=${encoded('/tdee')}&dr=${encoded('/bmi')}&dt=TDEE%20Calculator&en=page_view`
    );
  });

  it('strips every line of a batched POST body', () => {
    const body = `en=page_view&dl=${encoded(`/bmi?r=${TOKEN}`)}\r\nen=scroll&dr=${encoded(`/bmi?r=${TOKEN}`)}&epn.percent_scrolled=90`;

    expect(redactGaPayload(body)).toBe(
      `en=page_view&dl=${encoded('/bmi')}\r\nen=scroll&dr=${encoded('/bmi')}&epn.percent_scrolled=90`
    );
  });

  it('redacts site search terms and their extra query parameters', () => {
    expect(redactGaPayload('en=view_search_results&ep.search_term=knee%20pain&ep.q_r=abc')).toBe(
      'en=view_search_results&ep.search_term=(redacted)&ep.q_r=(redacted)'
    );
  });

  it('empties a URL field it cannot decode rather than passing it on', () => {
    expect(redactGaPayload('en=page_view&dl=%E0%A4%A')).toBe('en=page_view&dl=');
  });

  it('strips any other field whose value is a URL', () => {
    expect(redactGaPayload(`en=click&ep.link_url=${encoded(`/tdee?r=${TOKEN}`)}&dt=TDEE`)).toBe(
      `en=click&ep.link_url=${encoded('/tdee')}&dt=TDEE`
    );
  });
});

describe('installGaHitRedaction', () => {
  const nativeFetch = window.fetch;
  const nativeBeacon = navigator.sendBeacon;
  const fetchSpy = vi.fn(async () => new Response(null, { status: 204 }));
  const beaconSpy = vi.fn(() => true);
  const nativeOpen = XMLHttpRequest.prototype.open;
  const nativeSend = XMLHttpRequest.prototype.send;
  const nativeSetAttribute = Element.prototype.setAttribute;
  const nativeSrc = [
    HTMLImageElement.prototype,
    HTMLScriptElement.prototype,
    HTMLIFrameElement.prototype,
  ].map(proto => [proto, Object.getOwnPropertyDescriptor(proto, 'src')!] as const);
  const openSpy = vi.fn();
  const sendSpy = vi.fn();
  const hit = `https://region1.google-analytics.com/g/collect?v=2&dl=${encoded(`/bmi?r=${TOKEN}`)}`;

  beforeEach(() => {
    fetchSpy.mockClear();
    beaconSpy.mockClear();
    openSpy.mockClear();
    sendSpy.mockClear();
    window.fetch = fetchSpy as unknown as typeof fetch;
    navigator.sendBeacon = beaconSpy as unknown as typeof navigator.sendBeacon;
    XMLHttpRequest.prototype.open = openSpy;
    XMLHttpRequest.prototype.send = sendSpy;
    installGaHitRedaction();
  });

  afterEach(() => {
    window.fetch = nativeFetch;
    navigator.sendBeacon = nativeBeacon;
    XMLHttpRequest.prototype.open = nativeOpen;
    XMLHttpRequest.prototype.send = nativeSend;
    Element.prototype.setAttribute = nativeSetAttribute;
    for (const [proto, src] of nativeSrc) Object.defineProperty(proto, 'src', src);
  });

  it('redacts GA hits sent with XMLHttpRequest, including the body', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', hit, true);
    xhr.send(`en=x&dr=${encoded(`/bmi?r=${TOKEN}`)}`);

    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(openSpy.mock.calls[0][2]).toBe(true);
    expect(sendSpy).toHaveBeenCalledTimes(1);
    expect(JSON.stringify([openSpy.mock.calls, sendSpy.mock.calls])).not.toContain(TOKEN);
  });

  it('drops XMLHttpRequest GA hits it cannot read', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', hit);
    xhr.send(new Blob([`dl=${TOKEN}`]));

    expect(sendSpy).not.toHaveBeenCalled();
  });

  it('leaves other XMLHttpRequests untouched, even on a reused object', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', hit);
    xhr.open('POST', `/api/saved-results?r=${TOKEN}`);
    const blob = new Blob(['x']);
    xhr.send(blob);

    expect(openSpy).toHaveBeenLastCalledWith('POST', `/api/saved-results?r=${TOKEN}`);
    expect(sendSpy).toHaveBeenCalledWith(blob);
  });

  it.each([
    ['img', () => new Image()],
    ['script', () => document.createElement('script')],
    ['iframe', () => document.createElement('iframe')],
  ])('redacts GA hits sent through %s src', (_name, create) => {
    const byProperty = create();
    byProperty.src = hit;
    const byAttribute = create();
    byAttribute.setAttribute('SRC', hit);

    expect(byProperty.getAttribute('src')).toContain('dl=');
    expect(byProperty.getAttribute('src')).not.toContain(TOKEN);
    expect(byAttribute.getAttribute('src')).not.toContain(TOKEN);
  });

  it('leaves other element src values and attributes untouched', () => {
    const image = new Image();
    image.src = `https://www.healthcalc.xyz/og.png?r=${TOKEN}`;
    image.setAttribute('alt', hit);

    expect(image.getAttribute('src')).toContain(TOKEN);
    expect(image.getAttribute('alt')).toBe(hit);
  });

  it.each([
    'https://www.google-analytics.com/g/collect',
    'https://analytics.google.com/g/collect',
    'https://region1.analytics.google.com/g/collect',
    'https://stats.g.doubleclick.net/g/collect',
    'https://www.google.com/ads/ga-audiences',
    'https://www.googletagmanager.com/j/collect',
  ])('treats %s as a GA hit', host => {
    navigator.sendBeacon(`${host}?dl=${encoded(`/bmi?r=${TOKEN}`)}`);

    expect(JSON.stringify(beaconSpy.mock.calls)).not.toContain(TOKEN);
  });

  it('does not treat a lookalike host as a GA hit', () => {
    const lookalike = `https://notgoogle.com/g/collect?dl=${TOKEN}`;
    navigator.sendBeacon(lookalike);

    expect(beaconSpy).toHaveBeenCalledWith(lookalike, undefined);
  });

  it('redacts GA hits sent with fetch, including the body', async () => {
    await window.fetch(hit, { method: 'POST', body: `en=x&dr=${encoded(`/bmi?r=${TOKEN}`)}` });

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(JSON.stringify(fetchSpy.mock.calls)).not.toContain(TOKEN);
  });

  it('redacts GA hits sent with sendBeacon, including the body', () => {
    navigator.sendBeacon(hit, `en=x&dr=${encoded(`/bmi?r=${TOKEN}`)}`);

    expect(beaconSpy).toHaveBeenCalledTimes(1);
    expect(JSON.stringify(beaconSpy.mock.calls)).not.toContain(TOKEN);
  });

  it('drops GA hits it cannot read instead of sending them', async () => {
    const blob = new Blob([`dl=${TOKEN}`]);

    expect(navigator.sendBeacon(hit, blob)).toBe(true);
    await window.fetch(hit, { method: 'POST', body: blob });
    await window.fetch(new Request(hit));

    expect(beaconSpy).not.toHaveBeenCalled();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('leaves every other request untouched', async () => {
    const init = { method: 'POST', body: `dl=${TOKEN}` };
    await window.fetch(`/api/saved-results?r=${TOKEN}`, init);
    navigator.sendBeacon(`/api/embed-analytics?r=${TOKEN}`, `dl=${TOKEN}`);

    expect(fetchSpy).toHaveBeenCalledWith(`/api/saved-results?r=${TOKEN}`, init);
    expect(beaconSpy).toHaveBeenCalledWith(`/api/embed-analytics?r=${TOKEN}`, `dl=${TOKEN}`);
  });
});
