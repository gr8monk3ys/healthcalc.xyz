import type { Metadata } from 'next';
import { BLOG_METADATA } from '@/constants/blogMetadata';
import { createArticleSchema, createBreadcrumbSchema } from '@/utils/schema';
import { toAbsoluteUrl } from '@/lib/site';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const meta = BLOG_METADATA[slug];

  if (!meta) {
    return {
      title: 'Blog Post | HealthCheck',
      description: 'Health and fitness articles from HealthCheck.',
    };
  }

  return meta;
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}): Promise<React.JSX.Element> {
  const { slug } = await params;
  const meta = BLOG_METADATA[slug];

  const title = typeof meta?.title === 'string' ? meta.title : 'Blog Post | HealthCheck';
  const description =
    typeof meta?.description === 'string'
      ? meta.description
      : 'Health and fitness articles from HealthCheck.';

  const articleSchema = createArticleSchema({
    title,
    description,
    url: toAbsoluteUrl(`/blog/${slug}`),
    imageUrl: toAbsoluteUrl(`/images/blog/${slug}.jpg`),
    datePublished: '2025-01-01',
    authorName: 'HealthCheck Editorial Team',
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: toAbsoluteUrl('/') },
    { name: 'Blog', url: toAbsoluteUrl('/blog') },
    { name: title.replace(/ \| HealthCheck.*$/, ''), url: toAbsoluteUrl(`/blog/${slug}`) },
  ]);

  return (
    <>
      {children}
      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    </>
  );
}
