import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { toAbsoluteUrl } from '@/lib/site';
import ProgrammaticResultPage from '@/components/programmatic/ProgrammaticResultPage';
import { buildTdeeProgrammaticPage, getTdeeProgrammaticSlugs } from '@/utils/programmaticSeo';

export const revalidate = 86400;

interface TdeeProgrammaticPageProps {
  params: Promise<{ resultSlug: string }>;
}

export function generateStaticParams() {
  return getTdeeProgrammaticSlugs().map(resultSlug => ({ resultSlug }));
}

export async function generateMetadata({ params }: TdeeProgrammaticPageProps): Promise<Metadata> {
  const { resultSlug } = await params;
  const data = buildTdeeProgrammaticPage(resultSlug);

  if (!data) {
    return {
      title: 'TDEE Result Not Found | HealthCheck',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalUrl = toAbsoluteUrl(data.canonicalPath);

  return {
    title: data.metadataTitle,
    description: data.metadataDescription,
    alternates: {
      canonical: data.canonicalPath,
    },
    openGraph: {
      title: data.metadataTitle,
      description: data.metadataDescription,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: data.ogImage,
          width: 1200,
          height: 630,
          alt: data.pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.metadataTitle,
      description: data.metadataDescription,
      images: [data.ogImage],
    },
  };
}

export default async function TdeeProgrammaticPage({ params }: TdeeProgrammaticPageProps) {
  const { resultSlug } = await params;
  const data = buildTdeeProgrammaticPage(resultSlug);

  if (!data) {
    notFound();
  }

  return <ProgrammaticResultPage data={data} />;
}
