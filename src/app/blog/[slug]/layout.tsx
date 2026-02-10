import type { Metadata } from 'next';
import { BLOG_METADATA } from '@/constants/blogMetadata';

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

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <>{children}</>;
}
