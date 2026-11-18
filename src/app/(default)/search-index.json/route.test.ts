import { describe, expect, it } from 'vitest';
import { GET, dynamic } from './route';
import { CALCULATOR_CATALOG, CALCULATOR_HUBS } from '@/constants/calculatorCatalog';
import { SEARCH_INDEX_EXTRAS } from '@/constants/searchIndexExtras';
import { BLOG_REGISTRY } from '@/lib/blog/registry';
import { buildSearchIndex, type SearchIndex } from '@/lib/searchIndex';

describe('search index', () => {
  const index = buildSearchIndex();
  const urls = new Set(Object.values(index).map(entry => entry.url));

  it('lists every calculator in the catalog', () => {
    const missing = CALCULATOR_CATALOG.filter(calculator => !urls.has(`/${calculator.slug}`));
    expect(missing.map(calculator => calculator.slug)).toEqual([]);
    expect(index.bmi).toMatchObject({ type: 'calculator', title: 'BMI Calculator', url: '/bmi' });
  });

  it('lists every registered blog post', () => {
    const missing = BLOG_REGISTRY.filter(post => !urls.has(`/blog/${post.slug}`));
    expect(missing.map(post => post.slug)).toEqual([]);
  });

  it('lists every calculator hub page', () => {
    const missing = CALCULATOR_HUBS.filter(hub => !urls.has(`/calculators/${hub.slug}`));
    expect(missing.map(hub => hub.slug)).toEqual([]);
  });

  it('has one entry per URL', () => {
    expect(urls.size).toBe(Object.keys(index).length);
  });

  it('only keeps hand-written extras for entries that still exist', () => {
    const derivedKeys = new Set([
      ...CALCULATOR_CATALOG.map(calculator => calculator.slug),
      ...BLOG_REGISTRY.map(post => `blog-${post.slug}`),
    ]);
    const orphans = Object.keys(SEARCH_INDEX_EXTRAS).filter(key => !derivedKeys.has(key));
    expect(orphans).toEqual([]);
  });

  it('is served statically at /search-index.json', async () => {
    expect(dynamic).toBe('force-static');
    const body = (await GET().json()) as SearchIndex;
    expect(body).toEqual(JSON.parse(JSON.stringify(index)));
  });
});
