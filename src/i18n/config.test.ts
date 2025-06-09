import { describe, expect, it } from 'vitest';
import {
  defaultLocale,
  getLocaleFromAcceptLanguage,
  getLocaleFromPathname,
  isLocalizablePath,
  normalizeLocale,
  prefixPathWithLocale,
  stripLocaleFromPathname,
} from '@/i18n/config';

describe('i18n config helpers', () => {
  it('normalizes locale values from common browser formats', () => {
    expect(normalizeLocale('es-MX')).toBe('es');
    expect(normalizeLocale('pt_BR')).toBe('pt');
    expect(normalizeLocale('zh-CN')).toBe('zh');
    expect(normalizeLocale('de')).toBe('de');
    expect(normalizeLocale('unknown')).toBeNull();
  });

  it('detects locale from pathname', () => {
    expect(getLocaleFromPathname('/es/blog')).toBe('es');
    expect(getLocaleFromPathname('/fr')).toBe('fr');
    expect(getLocaleFromPathname('/blog')).toBeNull();
  });

  it('strips locale prefixes from pathname', () => {
    expect(stripLocaleFromPathname('/es/blog/post')).toBe('/blog/post');
    expect(stripLocaleFromPathname('/fr')).toBe('/');
    expect(stripLocaleFromPathname('/blog')).toBe('/blog');
  });

  it('prefixes pathnames for non-default locales', () => {
    expect(prefixPathWithLocale('/blog', 'es')).toBe('/es/blog');
    expect(prefixPathWithLocale('/es/blog', 'de')).toBe('/de/blog');
    expect(prefixPathWithLocale('/fr', defaultLocale)).toBe('/');
  });

  it('chooses locale from accept-language', () => {
    expect(getLocaleFromAcceptLanguage('de-DE,de;q=0.9,en;q=0.8')).toBe('de');
    expect(getLocaleFromAcceptLanguage('pt-BR,pt;q=0.8,en;q=0.7')).toBe('pt');
    expect(getLocaleFromAcceptLanguage(null)).toBe(defaultLocale);
  });

  it('identifies which paths should be localized', () => {
    expect(isLocalizablePath('/blog')).toBe(true);
    expect(isLocalizablePath('/es/blog')).toBe(true);
    expect(isLocalizablePath('/api/health')).toBe(false);
    expect(isLocalizablePath('/_next/static/chunk.js')).toBe(false);
    expect(isLocalizablePath('/robots.txt')).toBe(false);
  });
});
