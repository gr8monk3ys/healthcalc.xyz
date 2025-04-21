const DEFAULT_PUBLIC_SITE_URL = 'https://www.healthcalc.xyz';

function normalizeSiteUrl(url: string): string | null {
  try {
    const normalized = new URL(url);
    return normalized.origin;
  } catch {
    return null;
  }
}

export function getPublicSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return DEFAULT_PUBLIC_SITE_URL;

  return normalizeSiteUrl(configured) ?? DEFAULT_PUBLIC_SITE_URL;
}

function _getPublicSiteHost(): string {
  return new URL(getPublicSiteUrl()).host;
}

export function toAbsoluteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const base = getPublicSiteUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
