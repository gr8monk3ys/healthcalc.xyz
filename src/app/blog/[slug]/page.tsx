'use client';

import React, { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { BlogLoadingFallback } from '@/components/DynamicComponent';
import dynamic from 'next/dynamic';

// Map of blog post slugs to their dynamic components
const BLOG_POSTS: Record<string, React.ComponentType<any>> = {
  'measuring-body-fat': dynamic(() => import('@/app/blog/measuring-body-fat/content'), {
    loading: () => <BlogLoadingFallback />,
  }),
  'tdee-explained': dynamic(() => import('@/app/blog/tdee-explained/content'), {
    loading: () => <BlogLoadingFallback />,
  }),
  'understanding-absi': dynamic(() => import('@/app/blog/understanding-absi/content'), {
    loading: () => <BlogLoadingFallback />,
  }),
  'understanding-body-fat-percentage': dynamic(() => import('@/app/blog/understanding-body-fat-percentage/content'), {
    loading: () => <BlogLoadingFallback />,
  }),
  'waist-to-hip-ratio-guide': dynamic(() => import('@/app/blog/waist-to-hip-ratio-guide/content'), {
    loading: () => <BlogLoadingFallback />,
  }),
  'calorie-deficit-myths': dynamic(() => import('@/app/blog/calorie-deficit-myths/content'), {
    loading: () => <BlogLoadingFallback />,
  }),
};

/**
 * Dynamic blog post page that uses code splitting to load content
 */
export default function BlogPost(): React.JSX.Element {
  const params = useParams<{ slug: string }>();
  const slug = params.slug as string;
  
  // Get the dynamic component for this slug
  const PostContent = BLOG_POSTS[slug];

  if (!PostContent) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="mb-4">Sorry, the blog post you are looking for could not be found.</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<BlogLoadingFallback />}>
      <PostContent />
    </Suspense>
  );
}
