'use client';

import React from 'react';
import Link from 'next/link';

interface Article {
  title: string;
  description: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
}

interface RelatedArticlesProps {
  currentSlug: string;
  articles: Article[];
  title?: string;
  maxArticles?: number;
  className?: string;
}

/**
 * Related Articles component for blog posts
 * Displays a list of related articles, excluding the current one
 * Improves internal linking and user engagement
 */
export default function RelatedArticles({
  currentSlug,
  articles,
  title = 'Related Articles',
  maxArticles = 3,
  className = '',
}: RelatedArticlesProps) {
  // Filter out the current article and limit to maxArticles
  const relatedArticles = articles
    .filter(article => article.slug !== currentSlug)
    .slice(0, maxArticles);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <div className={`neumorph p-6 rounded-lg my-8 ${className}`}>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>

      <div className="space-y-6">
        {relatedArticles.map(article => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="block hover:shadow-neumorph-inset transition-all p-4 rounded-lg neumorph"
          >
            <span className="inline-block bg-accent/10 text-accent text-xs px-2 py-1 rounded-full mb-2">
              {article.category}
            </span>
            <h3 className="font-bold mb-2">{article.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{article.description}</p>
            <div className="flex items-center text-xs text-gray-500">
              <span>{article.date}</span>
              <span className="mx-2">•</span>
              <span>{article.readTime}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-4 text-center">
        <Link href="/blog" className="inline-block text-accent hover:underline">
          View all articles →
        </Link>
      </div>
    </div>
  );
}

// Helper function to get related articles based on category
export function getRelatedArticlesByCategory(
  articles: Article[],
  currentSlug: string,
  currentCategory: string,
  maxArticles = 3
): Article[] {
  // First try to find articles in the same category
  const sameCategory = articles.filter(
    article => article.slug !== currentSlug && article.category === currentCategory
  );

  // If we have enough articles in the same category, return those
  if (sameCategory.length >= maxArticles) {
    return sameCategory.slice(0, maxArticles);
  }

  // Otherwise, add other articles to fill up to maxArticles
  const otherArticles = articles.filter(
    article => article.slug !== currentSlug && article.category !== currentCategory
  );

  return [...sameCategory, ...otherArticles].slice(0, maxArticles);
}
