import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import StructuredData from '@/components/StructuredData';
import { createCalculatorSchema, createFAQSchema } from '@/utils/schema';
import RelatedCalculatorLinks from '@/components/RelatedCalculatorLinks';
import RelatedGuides from '@/components/RelatedGuides';
import { CALCULATOR_CATALOG, getCalculatorBySlug } from '@/constants/calculatorCatalog';

interface CalculatorDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return CALCULATOR_CATALOG.map(calculator => ({ slug: calculator.slug }));
}

export async function generateMetadata({ params }: CalculatorDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);

  if (!calculator) {
    return {
      title: 'Calculator | HealthCheck',
      description: 'Explore HealthCheck calculators and tools.',
    };
  }

  return {
    title: `${calculator.title} | HealthCheck`,
    description: calculator.detail?.intro || calculator.description,
    alternates: {
      canonical: `https://www.healthcalc.xyz/calculator/${calculator.slug}`,
    },
    openGraph: {
      title: `${calculator.title} | HealthCheck`,
      description: calculator.detail?.intro || calculator.description,
      url: `https://www.healthcalc.xyz/calculator/${calculator.slug}`,
      images: [
        {
          url: calculator.image,
          width: 1200,
          height: 630,
          alt: calculator.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${calculator.title} | HealthCheck`,
      description: calculator.detail?.intro || calculator.description,
      images: [calculator.image],
    },
  };
}

export default async function CalculatorDetailPage({ params }: CalculatorDetailPageProps) {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);

  if (!calculator) {
    notFound();
  }

  const detail = calculator.detail;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumb
        customItems={[
          { name: 'Home', path: '/' },
          { name: 'Calculators', path: '/calculators' },
          { name: calculator.title, path: `/calculator/${calculator.slug}` },
        ]}
      />

      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{calculator.title}</h1>
          <p className="text-gray-600 mb-6">{detail?.intro || calculator.description}</p>

          <div className="neumorph p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Why use this calculator?</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {(detail?.highlights || []).map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {detail?.faqs?.length ? (
            <div className="neumorph p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-4">FAQs</h2>
              <div className="space-y-4">
                {detail.faqs.map(faq => (
                  <div key={faq.question}>
                    <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                    <p className="text-gray-600 mt-1">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <RelatedCalculatorLinks slugs={detail?.relatedCalculators || []} />
          <RelatedGuides />
        </div>

        <aside className="space-y-4">
          <div className="neumorph p-5 rounded-lg">
            <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Category</div>
            <div className="text-lg font-semibold">{calculator.category}</div>
          </div>
          <div className="neumorph p-5 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Ready to calculate?</h2>
            <p className="text-sm text-gray-600 mb-4">
              Open the interactive calculator to get your results.
            </p>
            <Link
              href={`/${calculator.slug}`}
              className="inline-flex items-center justify-center w-full rounded-lg bg-accent text-white px-4 py-2 font-medium hover:bg-accent/90"
            >
              Open calculator
            </Link>
          </div>
        </aside>
      </div>

      <StructuredData
        data={createCalculatorSchema({
          name: calculator.title,
          description: detail?.intro || calculator.description,
          url: `https://www.healthcalc.xyz/calculator/${calculator.slug}`,
        })}
      />
      {detail?.faqs?.length ? <StructuredData data={createFAQSchema(detail.faqs)} /> : null}
    </div>
  );
}
