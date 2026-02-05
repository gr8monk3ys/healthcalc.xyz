import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import {
  CALCULATOR_HUBS,
  getCalculatorHub,
  getCalculatorsForHub,
} from '@/constants/calculatorCatalog';

interface CalculatorHubPageProps {
  params: Promise<{
    hub: string;
  }>;
}

export function generateStaticParams() {
  return CALCULATOR_HUBS.map(hub => ({ hub: hub.slug }));
}

export async function generateMetadata({ params }: CalculatorHubPageProps): Promise<Metadata> {
  const { hub: hubSlug } = await params;
  const hub = getCalculatorHub(hubSlug);

  if (!hub) {
    return {
      title: 'Calculator Category | HealthCheck',
      description: 'Browse HealthCheck calculators by category.',
    };
  }

  return {
    title: `${hub.title} Calculators | HealthCheck`,
    description: hub.description,
  };
}

export default async function CalculatorHubPage({ params }: CalculatorHubPageProps) {
  const { hub: hubSlug } = await params;
  const hub = getCalculatorHub(hubSlug);
  if (!hub) {
    notFound();
  }

  const calculators = getCalculatorsForHub(hub.slug);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumb
        customItems={[
          { name: 'Home', path: '/' },
          { name: 'Calculators', path: '/calculators' },
          { name: hub.title, path: `/calculators/${hub.slug}` },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{hub.title} Calculators</h1>
        <p className="text-gray-600">{hub.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {calculators.map(calculator => (
          <Link
            key={calculator.slug}
            href={`/calculator/${calculator.slug}`}
            className="neumorph rounded-xl p-6 transition-all hover:shadow-neumorph-inset"
          >
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={calculator.image}
                  alt={calculator.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  {calculator.category}
                </div>
                <h2 className="text-lg font-semibold mt-1">{calculator.title}</h2>
                <p className="text-sm text-gray-600 mt-2">{calculator.description}</p>
                <span className="text-sm text-accent font-medium mt-3 inline-flex items-center gap-1">
                  View details <span aria-hidden="true">→</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <Link href="/calculators" className="text-accent hover:underline">
          Browse all categories →
        </Link>
      </div>
    </div>
  );
}
