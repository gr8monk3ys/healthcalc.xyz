import { CALCULATOR_CATALOG } from '@/constants/calculatorCatalog';
import { SEARCH_INDEX_EXTRAS, SEARCH_INDEX_PAGES } from '@/constants/searchIndexExtras';
import { BLOG_REGISTRY } from '@/lib/blog/registry';

export interface SearchIndexEntry {
  title: string;
  description: string;
  url: string;
  type: 'calculator' | 'article' | 'page';
  category?: string;
  tags?: string[];
  content?: string;
}

export type SearchIndex = Record<string, SearchIndexEntry>;

/** The JSON served at `/search-index.json`: every calculator, every post, and the static pages. */
export function buildSearchIndex(): SearchIndex {
  const index: SearchIndex = { ...SEARCH_INDEX_PAGES };

  for (const calculator of CALCULATOR_CATALOG) {
    index[calculator.slug] = {
      title: calculator.title,
      description: calculator.description,
      url: `/${calculator.slug}`,
      type: 'calculator',
      category: calculator.category,
      ...SEARCH_INDEX_EXTRAS[calculator.slug],
    };
  }

  for (const post of BLOG_REGISTRY) {
    const key = `blog-${post.slug}`;
    index[key] = {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: 'article',
      category: post.category,
      tags: post.keywords.split(',').map(keyword => keyword.trim()),
      ...SEARCH_INDEX_EXTRAS[key],
    };
  }

  return index;
}
