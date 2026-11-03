/**
 * Query strings on this site can hold health data: a shared result's `?r=` token
 * is a base64url encoding of the age, sex, height and weight entered, and `?q=`
 * is whatever was typed into search. Analytics gets the path and nothing after it.
 */
export function pathOnlyUrl(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.search = '';
    parsed.hash = '';
    return parsed.toString();
  } catch {
    return '';
  }
}

export function withoutQueryString<T extends { url: string }>(event: T): T {
  return { ...event, url: pathOnlyUrl(event.url) };
}

const GA_URL_FIELDS = /(^|[?&\n])(dl|dr|ep\.page_location|ep\.page_referrer)=([^&\r\n]*)/g;
const GA_SEARCH_FIELDS = /(^|[?&\n])(ep\.search_term|ep\.q_[^=&\r\n]*)=[^&\r\n]*/g;
const GA_HIT_URL =
  /^https:\/\/[^/]*(google-analytics\.com|analytics\.google\.com|doubleclick\.net|google\.com)\/(g|ccm)\/collect/;

function decodeOrEmpty(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return '';
  }
}

/** Rewrites a GA4 hit, either its URL or its newline-separated POST body. */
export function redactGaPayload(payload: string): string {
  return payload
    .replace(
      GA_URL_FIELDS,
      (_match, lead: string, key: string, value: string) =>
        `${lead}${key}=${encodeURIComponent(pathOnlyUrl(decodeOrEmpty(value)))}`
    )
    .replace(GA_SEARCH_FIELDS, '$1$2=(redacted)');
}

/**
 * gtag has no beforeSend. Setting page_location covers its ordinary hits, but
 * Enhanced Measurement's history-change page_view (on by default for a new web
 * stream) passes the raw old and new URLs explicitly, and its site search
 * reports `?q=` as search_term, so those can only be caught as they leave.
 */
export function installGaHitRedaction(): void {
  // A hit whose body can't be read here is dropped rather than sent unredacted.
  const isReadable = (body: unknown) =>
    body === undefined || body === null || typeof body === 'string';

  const nativeBeacon = navigator.sendBeacon?.bind(navigator);
  if (nativeBeacon) {
    navigator.sendBeacon = (url, data) => {
      if (!GA_HIT_URL.test(String(url))) return nativeBeacon(url, data);
      if (!isReadable(data)) return true;
      return nativeBeacon(
        redactGaPayload(String(url)),
        typeof data === 'string' ? redactGaPayload(data) : data
      );
    };
  }

  const nativeFetch = window.fetch.bind(window);
  window.fetch = (input, init) => {
    const url = input instanceof Request ? input.url : String(input);
    if (!GA_HIT_URL.test(url)) return nativeFetch(input, init);
    if (input instanceof Request || !isReadable(init?.body)) {
      return Promise.resolve(new Response(null, { status: 204 }));
    }
    return nativeFetch(
      redactGaPayload(url),
      typeof init?.body === 'string' ? { ...init, body: redactGaPayload(init.body) } : init
    );
  };
}
