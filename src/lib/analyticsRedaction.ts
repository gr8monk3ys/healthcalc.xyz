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
const GA_ANY_FIELD = /(^|[?&\n])([^=&\r\n]+)=([^&\r\n]*)/g;
const QUERY_START = /\?|#|%3f|%23/i;
const HOLDS_SENSITIVE_PARAM = /(?:\?|&|#|%3f|%26|%23)(?:r|q)(?:=|%3d)/i;
const GA_SEARCH_FIELDS = /(^|[?&\n])(ep\.search_term|ep\.q_[^=&\r\n]*)=[^&\r\n]*/g;
const GA_HIT_URL =
  /^https:\/\/(?:[^/]+\.)?(?:google-analytics\.com|doubleclick\.net|google\.com|googletagmanager\.com)\/(?:(?:[a-z]+\/)?collect|ads\/ga-audiences)(?:[/?]|$)/;

function decodeOrEmpty(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return '';
  }
}

function isGaHit(url: unknown): boolean {
  try {
    return GA_HIT_URL.test(new URL(String(url), window.location.href).href);
  } catch {
    return false;
  }
}

/**
 * Any field can hold a URL, and a relative or double-encoded one doesn't look like
 * it, so this goes by what the value holds. A title ending in `?` is left alone.
 */
function stripQueryFromField(match: string, lead: string, key: string, value: string): string {
  if (!value) return match;
  const decoded = decodeOrEmpty(value);
  if (decoded && !/^https?:/i.test(decoded) && !HOLDS_SENSITIVE_PARAM.test(decoded)) return match;
  return `${lead}${key}=${encodeURIComponent(decoded.split(QUERY_START)[0])}`;
}

/** Rewrites a GA4 hit, either its URL or its newline-separated POST body. */
export function redactGaPayload(payload: string): string {
  const stripUrl = (_match: string, lead: string, key: string, value: string) =>
    `${lead}${key}=${encodeURIComponent(pathOnlyUrl(decodeOrEmpty(value)))}`;

  return payload
    .replace(GA_URL_FIELDS, stripUrl)
    .replace(GA_ANY_FIELD, stripQueryFromField)
    .replace(GA_SEARCH_FIELDS, '$1$2=(redacted)');
}

/**
 * gtag has no beforeSend. Setting page_location covers its ordinary hits, but
 * Enhanced Measurement's history-change page_view (on by default for a new web
 * stream) passes the raw old and new URLs explicitly, and its site search
 * reports `?q=` as search_term, so those can only be caught as they leave. That
 * means every way a page can send a request: beacon, fetch, XHR and element src.
 */
export function installGaHitRedaction(): void {
  // A hit whose body can't be read here is dropped rather than sent unredacted.
  const isReadable = (body: unknown) =>
    body === undefined || body === null || typeof body === 'string';

  const nativeBeacon = navigator.sendBeacon?.bind(navigator);
  if (nativeBeacon) {
    navigator.sendBeacon = (url, data) => {
      if (!isGaHit(url)) return nativeBeacon(url, data);
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
    if (!isGaHit(url)) return nativeFetch(input, init);
    if (input instanceof Request || !isReadable(init?.body)) {
      return Promise.resolve(new Response(null, { status: 204 }));
    }
    return nativeFetch(
      redactGaPayload(url),
      typeof init?.body === 'string' ? { ...init, body: redactGaPayload(init.body) } : init
    );
  };

  const xhrHits = new WeakSet<XMLHttpRequest>();
  const nativeOpen = XMLHttpRequest.prototype.open as (...args: unknown[]) => void;
  const nativeSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function (
    this: XMLHttpRequest,
    method: string,
    url: string | URL,
    ...rest: unknown[]
  ) {
    const isHit = isGaHit(url);
    if (isHit) xhrHits.add(this);
    else xhrHits.delete(this);
    nativeOpen.call(this, method, isHit ? redactGaPayload(String(url)) : url, ...rest);
  } as typeof XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.send = function (this: XMLHttpRequest, body) {
    if (!xhrHits.has(this)) return nativeSend.call(this, body);
    if (!isReadable(body)) return;
    nativeSend.call(this, typeof body === 'string' ? redactGaPayload(body) : body);
  };

  for (const proto of [
    HTMLImageElement.prototype,
    HTMLScriptElement.prototype,
    HTMLIFrameElement.prototype,
  ]) {
    const src = Object.getOwnPropertyDescriptor(proto, 'src');
    if (!src?.set) continue;
    const nativeSet = src.set;
    Object.defineProperty(proto, 'src', {
      ...src,
      set(value: unknown) {
        nativeSet.call(this, isGaHit(value) ? redactGaPayload(String(value)) : value);
      },
    });
  }

  const nativeSetAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (this: Element, name, value) {
    const isHit = name.toLowerCase() === 'src' && isGaHit(value);
    nativeSetAttribute.call(this, name, isHit ? redactGaPayload(String(value)) : value);
  };
}
