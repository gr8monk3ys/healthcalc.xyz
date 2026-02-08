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
}

interface BlogIndexClientProps {
  posts: BlogPost[];
}

export default function BlogIndexClient({ posts }: BlogIndexClientProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Product Reviews' | 'Education'>('All');

  const filteredPosts = useMemo(() => {
    if (activeFilter === 'All') {
      return posts;
    }

    return posts.filter(post =>
      activeFilter === 'Product Reviews'
        ? post.category === 'Product Reviews'
        : post.category !== 'Product Reviews'
    );
  }, [activeFilter, posts]);

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-8">
        {(['All', 'Product Reviews', 'Education'] as const).map(filter => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === filter
                ? 'bg-accent text-white shadow-lg'
                : 'neumorph hover:shadow-neumorph-inset'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {filteredPosts.map((post, index) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="group block neumorph rounded-lg p-6 transition-all hover:shadow-neumorph-inset"
          >
            <div className="mb-4 overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={post.image}
                alt={post.title}
                width={1200}
                height={630}
                sizes="(max-width: 768px) 100vw, 896px"
                priority={index === 0}
                className="h-48 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <span className="inline-block bg-accent/10 text-accent text-sm px-3 py-1 rounded-full mb-2">
              {post.category}
            </span>
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.description}</p>
            <div className="flex items-center text-sm text-gray-500">
              <span>{post.date}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime}</span>
            </div>
          </Link>
        ))}
        {filteredPosts.length === 0 && (
          <div className="neumorph p-6 rounded-lg text-gray-600">
            No posts found for this category yet. Check back soon.
          </div>
        )}
      </div>
    </>
  );
}
