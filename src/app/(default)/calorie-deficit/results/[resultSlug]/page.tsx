import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { toAbsoluteUrl } from '@/lib/site';
import ProgrammaticResultPage from '@/components/programmatic/ProgrammaticResultPage';
import {
  buildCalorieDeficitProgrammaticPage,
  getCalorieDeficitProgrammaticSlugs,
} from '@/utils/programmaticSeo';

export const revalidate = 86400;

interface CalorieDeficitProgrammaticPageProps {
  params: Promise<{ resultSlug: string }>;
}

export function generateStaticParams() {
  return getCalorieDeficitProgrammaticSlugs().map(resultSlug => ({ resultSlug }));
}

export async function generateMetadata({
  params,
}: CalorieDeficitProgrammaticPageProps): Promise<Metadata> {
  const { resultSlug } = await params;
  const data = buildCalorieDeficitProgrammaticPage(resultSlug);

  if (!data) {
    return {
      title: 'Calorie Deficit Result Not Found | HealthCheck',
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

export default async function CalorieDeficitProgrammaticPage({
  params,
}: CalorieDeficitProgrammaticPageProps) {
  const { resultSlug } = await params;
  const data = buildCalorieDeficitProgrammaticPage(resultSlug);

  if (!data) {
    notFound();
  }

  return <ProgrammaticResultPage data={data} />;
}
