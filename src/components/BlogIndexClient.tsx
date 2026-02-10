'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

function PostCard({
  post,
  priority = false,
  large = false,
}: {
  post: BlogPost;
  priority?: boolean;
  large?: boolean;
}): React.ReactElement {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block neumorph rounded-lg overflow-hidden transition-all hover:shadow-neumorph-inset h-full"
    >
      <div className="overflow-hidden bg-gray-100">
        <Image
          src={post.image}
          alt={post.title}
          width={1200}
          height={630}
          sizes={large ? '(max-width: 768px) 100vw, 560px' : '(max-width: 768px) 100vw, 448px'}
          priority={priority}
          className={`w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] ${large ? 'h-56 md:h-72' : 'h-44'}`}
        />
      </div>
      <div className="p-5">
        <span className="inline-block bg-accent/10 text-accent text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">
          {post.category}
        </span>
        <h3 className={`font-bold mb-1.5 leading-snug ${large ? 'text-xl' : 'text-lg'}`}>
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.description}</p>
        <div className="flex items-center text-xs text-gray-500">
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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const post of posts) {
      counts[post.category] = (counts[post.category] || 0) + 1;
    }
    return Object.entries(counts).sort(([a], [b]) => a.localeCompare(b));
  }, [posts]);

  const featuredPosts = useMemo(() => {
    return posts.filter(p => p.featured).slice(0, 3);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return posts.filter(post => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  const showFeatured = activeCategory === 'All' && !searchQuery.trim();

  const mainPosts = useMemo(() => {
    if (!showFeatured) return filteredPosts;
    const featuredSlugs = new Set(featuredPosts.map(p => p.slug));
    return filteredPosts.filter(p => !featuredSlugs.has(p.slug));
  }, [filteredPosts, featuredPosts, showFeatured]);

  return (
    <>
      {/* Search */}
      <div className="mb-6">
        <div className="neumorph rounded-lg flex items-center px-4 py-3">
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
            placeholder="Search articles..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
            aria-label="Search articles"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="ml-2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
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
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              activeCategory === 'All'
                ? 'bg-accent text-white shadow-lg'
                : 'neumorph hover:shadow-neumorph-inset'
            }`}
          >
            All ({posts.length})
          </button>
          {categories.map(([category, count]) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-accent text-white shadow-lg'
                  : 'neumorph hover:shadow-neumorph-inset'
              }`}
            >
              {category} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Featured Section */}
      {showFeatured && featuredPosts.length >= 3 && (
        <section className="mb-10" aria-label="Featured articles">
          <h2 className="text-lg font-bold mb-4 text-accent">Featured Articles</h2>
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
      <p className="text-sm text-gray-500 mb-4">
        Showing {mainPosts.length} of {posts.length} articles
        {searchQuery.trim() && (
          <span>
            {' '}
            for &ldquo;<span className="font-medium text-gray-700">{searchQuery.trim()}</span>
            &rdquo;
          </span>
        )}
      </p>

      {/* Post Grid */}
      {mainPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mainPosts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="neumorph p-8 rounded-lg text-center">
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
          <p className="text-gray-600 font-medium mb-1">No articles found</p>
          <p className="text-gray-500 text-sm">
            Try adjusting your search or selecting a different category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
            }}
            className="mt-4 text-accent text-sm font-medium hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </>
  );
}
