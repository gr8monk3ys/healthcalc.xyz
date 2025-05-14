'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/context/LocaleContext';
import type { SupportedLocale } from '@/i18n/config';
import {
  getCategoryType,
  getCategoryBadgeLabel,
  getCategorySortPriority,
} from '@/constants/blogCategories';

type BlogStrings = {
  searchPlaceholder: string;
  searchAria: string;
  clearSearchAria: string;
  allLabel: string;
  featuredSectionAria: string;
  featuredTitle: string;
  resultsCount: (shown: number, total: number) => string;
  resultsForPrefix: string;
  emptyTitle: string;
  emptyBody: string;
  clearAllFilters: string;
  guidesTitle: string;
  reviewsTitle: string;
};

function getBlogStrings(locale: SupportedLocale): BlogStrings {
  switch (locale) {
    case 'es':
      return {
        searchPlaceholder: 'Buscar artículos...',
        searchAria: 'Buscar artículos',
        clearSearchAria: 'Borrar búsqueda',
        allLabel: 'Todas',
        featuredSectionAria: 'Artículos destacados',
        featuredTitle: 'Artículos destacados',
        resultsCount: (shown, total) => `Mostrando ${shown} de ${total} artículos`,
        resultsForPrefix: 'para',
        emptyTitle: 'No se encontraron artículos',
        emptyBody: 'Prueba ajustando tu búsqueda o seleccionando otra categoría.',
        clearAllFilters: 'Limpiar filtros',
        guidesTitle: 'Guías e Investigación',
        reviewsTitle: 'Reseñas de Productos',
      };
    case 'fr':
      return {
        searchPlaceholder: 'Rechercher des articles...',
        searchAria: 'Rechercher des articles',
        clearSearchAria: 'Effacer la recherche',
        allLabel: 'Tous',
        featuredSectionAria: 'Articles à la une',
        featuredTitle: 'Articles à la une',
        resultsCount: (shown, total) => `Affichage de ${shown} sur ${total} articles`,
        resultsForPrefix: 'pour',
        emptyTitle: 'Aucun article trouvé',
        emptyBody: 'Essayez de modifier votre recherche ou de choisir une autre catégorie.',
        clearAllFilters: 'Réinitialiser les filtres',
        guidesTitle: 'Guides et Recherche',
        reviewsTitle: 'Avis sur les Produits',
      };
    case 'de':
      return {
        searchPlaceholder: 'Artikel suchen...',
        searchAria: 'Artikel suchen',
        clearSearchAria: 'Suche löschen',
        allLabel: 'Alle',
        featuredSectionAria: 'Empfohlene Artikel',
        featuredTitle: 'Empfohlene Artikel',
        resultsCount: (shown, total) => `Zeige ${shown} von ${total} Artikeln`,
        resultsForPrefix: 'für',
        emptyTitle: 'Keine Artikel gefunden',
        emptyBody: 'Versuchen Sie eine andere Suche oder wählen Sie eine andere Kategorie.',
        clearAllFilters: 'Alle Filter zurücksetzen',
        guidesTitle: 'Ratgeber und Forschung',
        reviewsTitle: 'Produktbewertungen',
      };
    case 'pt':
      return {
        searchPlaceholder: 'Buscar artigos...',
        searchAria: 'Buscar artigos',
        clearSearchAria: 'Limpar busca',
        allLabel: 'Todos',
        featuredSectionAria: 'Artigos em destaque',
        featuredTitle: 'Artigos em destaque',
        resultsCount: (shown, total) => `Mostrando ${shown} de ${total} artigos`,
        resultsForPrefix: 'para',
        emptyTitle: 'Nenhum artigo encontrado',
        emptyBody: 'Tente ajustar a busca ou selecionar outra categoria.',
        clearAllFilters: 'Limpar filtros',
        guidesTitle: 'Guias e Pesquisa',
        reviewsTitle: 'Avaliações de Produtos',
      };
    case 'zh':
      return {
        searchPlaceholder: '搜索文章...',
        searchAria: '搜索文章',
        clearSearchAria: '清除搜索',
        allLabel: '全部',
        featuredSectionAria: '精选文章',
        featuredTitle: '精选文章',
        resultsCount: (shown, total) => `显示 ${shown}/${total} 篇文章`,
        resultsForPrefix: '关于',
        emptyTitle: '未找到文章',
        emptyBody: '请调整搜索关键词或选择其他分类。',
        clearAllFilters: '清除筛选',
        guidesTitle: '指南与研究',
        reviewsTitle: '产品评测',
      };
    case 'en':
    default:
      return {
        searchPlaceholder: 'Search articles...',
        searchAria: 'Search articles',
        clearSearchAria: 'Clear search',
        allLabel: 'All',
        featuredSectionAria: 'Featured articles',
        featuredTitle: 'Featured Articles',
        resultsCount: (shown, total) => `Showing ${shown} of ${total} articles`,
        resultsForPrefix: 'for',
        emptyTitle: 'No articles found',
        emptyBody: 'Try adjusting your search or selecting a different category.',
        clearAllFilters: 'Clear all filters',
        guidesTitle: 'Guides & Research',
        reviewsTitle: 'Product Reviews',
      };
  }
}

const ALL_CATEGORY = 'All';

interface BlogPost {
  title: string;
  description: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

interface BlogIndexClientProps {
  posts: BlogPost[];
}

const TYPE_BADGE_STYLES: Record<string, string> = {
  Guide: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Review: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Comparison: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
};

function PostCard({
  post,
  priority = false,
  large = false,
}: {
  post: BlogPost;
  priority?: boolean;
  large?: boolean;
}): React.ReactElement {
  const { localizePath } = useLocale();
  const postType = getCategoryType(post.category);
  const badgeLabel = getCategoryBadgeLabel(postType);
  const badgeStyle = TYPE_BADGE_STYLES[badgeLabel] || TYPE_BADGE_STYLES.Guide;

  return (
    <Link
      href={localizePath(`/blog/${post.slug}`)}
      className="group block glass-panel-strong rounded-3xl overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 h-full"
    >
      <div className="relative hc-aspect-og overflow-hidden bg-slate-100/70 dark:bg-slate-900/40">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes={large ? '(max-width: 768px) 100vw, 560px' : '(max-width: 768px) 100vw, 448px'}
          priority={priority}
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent opacity-90"
          aria-hidden="true"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block bg-accent/10 text-accent text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {post.category}
          </span>
          <span
            className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${badgeStyle}`}
          >
            {badgeLabel}
          </span>
        </div>
        <h3 className={`font-bold mb-1.5 leading-snug ${large ? 'text-xl' : 'text-lg'}`}>
          {post.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 line-clamp-2">
          {post.description}
        </p>
        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
          <span>{post.date}</span>
          <span className="mx-1.5" aria-hidden="true">
            &middot;
          </span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogIndexClient({ posts }: BlogIndexClientProps): React.ReactElement {
  const { locale } = useLocale();
  const strings = getBlogStrings(locale);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = (value: string): void => {
    setInputValue(value);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setSearchQuery(value);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // Sort categories: educational first, then comparisons, then reviews
  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const post of posts) {
      counts[post.category] = (counts[post.category] || 0) + 1;
    }
    return Object.entries(counts).sort(([a], [b]) => {
      const priorityA = getCategorySortPriority(a);
      const priorityB = getCategorySortPriority(b);
      if (priorityA !== priorityB) return priorityA - priorityB;
      return a.localeCompare(b);
    });
  }, [posts]);

  const featuredPosts = useMemo(() => {
    return posts.filter(p => p.featured).slice(0, 3);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return posts.filter(post => {
      const matchesCategory = activeCategory === ALL_CATEGORY || post.category === activeCategory;
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  const showFeatured = activeCategory === ALL_CATEGORY && !searchQuery.trim() && !inputValue.trim();

  const mainPosts = useMemo(() => {
    if (!showFeatured) return filteredPosts;
    const featuredSlugs = new Set(featuredPosts.map(p => p.slug));
    return filteredPosts.filter(p => !featuredSlugs.has(p.slug));
  }, [filteredPosts, featuredPosts, showFeatured]);

  // Split posts into guides (educational) and reviews/comparisons for sectioned view
  const showSectioned =
    activeCategory === ALL_CATEGORY && !searchQuery.trim() && !inputValue.trim();

  const { guidePosts, reviewPosts } = useMemo(() => {
    const guides: BlogPost[] = [];
    const reviews: BlogPost[] = [];
    const featuredSlugs = new Set(featuredPosts.map(p => p.slug));
    for (const post of mainPosts) {
      if (showFeatured && featuredSlugs.has(post.slug)) continue;
      const type = getCategoryType(post.category);
      if (type === 'educational') {
        guides.push(post);
      } else {
        reviews.push(post);
      }
    }
    return { guidePosts: guides, reviewPosts: reviews };
  }, [mainPosts, featuredPosts, showFeatured]);

  return renderBlogIndexClientView({
    activeCategory,
    categories,
    debounceRef,
    featuredPosts,
    guidePosts,
    handleSearchChange,
    inputValue,
    mainPosts,
    posts,
    reviewPosts,
    setActiveCategory,
    setInputValue,
    setSearchQuery,
    showFeatured,
    showSectioned,
    strings,
  });
}

type BlogIndexClientViewProps = {
  activeCategory: string;
  categories: Array<[string, number]>;
  debounceRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>;
  featuredPosts: BlogPost[];
  guidePosts: BlogPost[];
  handleSearchChange: (value: string) => void;
  inputValue: string;
  mainPosts: BlogPost[];
  posts: BlogPost[];
  reviewPosts: BlogPost[];
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  showFeatured: boolean;
  showSectioned: boolean;
  strings: BlogStrings;
};

function renderBlogIndexClientView({
  activeCategory,
  categories,
  debounceRef,
  featuredPosts,
  guidePosts,
  handleSearchChange,
  inputValue,
  mainPosts,
  posts,
  reviewPosts,
  setActiveCategory,
  setInputValue,
  setSearchQuery,
  showFeatured,
  showSectioned,
  strings,
}: BlogIndexClientViewProps) {
  return (
    <>
      {/* Search */}
      <div className="mb-6">
        <div className="glass-panel rounded-2xl flex items-center px-4 py-3">
          <svg
            className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder={strings.searchPlaceholder}
            value={inputValue}
            onChange={e => handleSearchChange(e.target.value)}
            className="w-full bg-transparent outline-none text-sm placeholder-slate-400 dark:placeholder-slate-500"
            aria-label={strings.searchAria}
          />
          {inputValue && (
            <button
              type="button"
              onClick={() => {
                setInputValue('');
                setSearchQuery('');
                if (debounceRef.current) {
                  clearTimeout(debounceRef.current);
                }
              }}
              className="ml-2 text-gray-400 hover:text-gray-600"
              aria-label={strings.clearSearchAria}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-8 overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex gap-2 min-w-max pb-1">
          <button
            type="button"
            onClick={() => setActiveCategory(ALL_CATEGORY)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              activeCategory === ALL_CATEGORY
                ? 'bg-accent text-white shadow-lg'
                : 'elevated-pill hover:-translate-y-0.5'
            }`}
          >
            {strings.allLabel} ({posts.length})
          </button>
          {categories.map(([category, count]: [string, number]) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-accent text-white shadow-lg'
                  : 'elevated-pill hover:-translate-y-0.5'
              }`}
            >
              {category} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Featured Section */}
      {showFeatured && featuredPosts.length >= 3 && (
        <section className="mb-10" aria-label={strings.featuredSectionAria}>
          <h2 className="text-lg font-bold mb-4 text-accent">{strings.featuredTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:row-span-2">
              <PostCard post={featuredPosts[0]} priority large />
            </div>
            <div>
              <PostCard post={featuredPosts[1]} priority />
            </div>
            <div>
              <PostCard post={featuredPosts[2]} priority />
            </div>
          </div>
        </section>
      )}

      {/* Results Count */}
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
        {strings.resultsCount(mainPosts.length, posts.length)}
        {inputValue.trim() && (
          <span>
            {' '}
            {strings.resultsForPrefix} &ldquo;
            <span className="font-medium text-gray-700">{inputValue.trim()}</span>
            &rdquo;
          </span>
        )}
      </p>

      {/* Post Grid - sectioned when showing all, flat when filtered */}
      {mainPosts.length > 0 ? (
        showSectioned ? (
          <>
            {/* Guides & Research section */}
            {guidePosts.length > 0 && (
              <section className="mb-10" aria-label={strings.guidesTitle}>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  {strings.guidesTitle}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {guidePosts.map(post => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </section>
            )}

            {/* Product Reviews section */}
            {reviewPosts.length > 0 && (
              <section aria-label={strings.reviewsTitle}>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-amber-600 dark:text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                  {strings.reviewsTitle}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reviewPosts.map(post => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mainPosts.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )
      ) : (
        <div className="glass-panel rounded-3xl p-8 text-center">
          <svg
            className="w-12 h-12 mx-auto text-gray-300 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-slate-700 dark:text-slate-200 font-medium mb-1">
            {strings.emptyTitle}
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{strings.emptyBody}</p>
          <button
            type="button"
            onClick={() => {
              setInputValue('');
              setSearchQuery('');
              setActiveCategory(ALL_CATEGORY);
              if (debounceRef.current) {
                clearTimeout(debounceRef.current);
              }
            }}
            className="mt-4 text-accent text-sm font-medium hover:underline"
          >
            {strings.clearAllFilters}
          </button>
        </div>
      )}
    </>
  );
}
