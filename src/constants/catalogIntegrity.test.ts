import { existsSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { CALCULATOR_CATALOG } from '@/constants/calculatorCatalog';
import { calculators as relatedCards, relatedMap } from '@/constants/relatedCalculators';
import { BLOG_REGISTRY } from '@/lib/blog/registry';

const APP_DIR = path.join(process.cwd(), 'src', 'app', '(default)');
const catalogSlugs = new Set(CALCULATOR_CATALOG.map(calculator => calculator.slug));

describe('catalog integrity', () => {
  it('has a route with a page.tsx for every catalog slug', () => {
    const missing = [...catalogSlugs].filter(
      slug => !existsSync(path.join(APP_DIR, slug, 'page.tsx'))
    );
    expect(missing).toEqual([]);
  });

  it('only relates calculators that exist in the catalog', () => {
    const referenced = [
      ...relatedCards.map(card => card.slug),
      ...Object.keys(relatedMap),
      ...Object.values(relatedMap).flat(),
    ];
    expect(referenced.filter(slug => !catalogSlugs.has(slug))).toEqual([]);
  });

  it('has a card for every related-calculator target', () => {
    const cardSlugs = new Set(relatedCards.map(card => card.slug));
    const targets = Object.values(relatedMap).flat();
    expect(targets.filter(slug => !cardSlugs.has(slug))).toEqual([]);
  });

  it('has a content.tsx for every registered blog post', () => {
    const missing = BLOG_REGISTRY.map(post => post.slug).filter(
      slug => !existsSync(path.join(APP_DIR, 'blog', slug, 'content.tsx'))
    );
    expect(missing).toEqual([]);
  });
});
