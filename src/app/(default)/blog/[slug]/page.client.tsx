'use client';

import React, { Suspense } from 'react';
import { notFound, useParams } from 'next/navigation';
import { BlogLoadingFallback } from '@/components/DynamicComponent';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import { BlogEmailCapture } from '@/components/BlogEmailCapture';
import { AuthorBio } from '@/components/AuthorBio';
import { BLOG_REGISTRY } from '@/lib/blog/registry';
import { useFunnelTracking } from '@/hooks/useFunnelTracking';
import { POST_BODIES } from './postBodies';

/**
 * Dynamic blog post page that uses code splitting to load content
 */
export default function BlogPost(): React.JSX.Element {
  const params = useParams<{ slug: string }>();
  const slug = params.slug as string;
  const { trackEvent } = useFunnelTracking();

  // Post bodies render their Amazon links as plain anchors, so clicks are
  // tracked by delegation here rather than in each post.
  const trackAffiliateClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[rel~="sponsored"]');
    if (!link) return;
    trackEvent('affiliate_click', { kind: 'blog', post: slug, destination: link.href });
  };

  // Get the dynamic component for this slug
  const PostContent = POST_BODIES[slug];

  if (!PostContent) {
    notFound();
  }

  const hasAffiliateLinks = BLOG_REGISTRY.find(p => p.slug === slug)?.affiliate;

  return (
    <Suspense fallback={<BlogLoadingFallback />}>
      <AuthorBio variant="compact" className="mb-6" />
      {hasAffiliateLinks && <AffiliateDisclosure variant="short" />}
      <div onClick={trackAffiliateClick} onAuxClick={trackAffiliateClick}>
        <PostContent />
      </div>
      <BlogEmailCapture className="mt-8 mb-8" />
      {hasAffiliateLinks && <AffiliateDisclosure />}
    </Suspense>
  );
}
