import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import { CALCULATOR_HUBS, getCalculatorsForHub } from '@/constants/calculatorCatalog';

export const metadata: Metadata = {
  title: 'Calculator Categories | HealthCheck',
  description:
    'Browse HealthCheck calculator categories for weight loss, body composition, nutrition, performance, wellness, pregnancy, and more.',
};

export default function CalculatorCategoriesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumb
        customItems={[
          { name: 'Home', path: '/' },
          { name: 'Calculators', path: '/calculators' },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-bold mb-2">Calculator Categories</h1>
      <p className="text-gray-600 mb-8">
        Explore calculators by category to find the exact tool you need faster.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CALCULATOR_HUBS.map(hub => {
          const count = getCalculatorsForHub(hub.slug).length;
          return (
            <Link
              key={hub.slug}
              href={`/calculators/${hub.slug}`}
              className="neumorph rounded-xl p-6 transition-all hover:shadow-neumorph-inset"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{hub.title}</h2>
                  <p className="text-sm text-gray-600">{hub.description}</p>
                </div>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent font-semibold">
                  {count}
                </span>
              </div>
              <div className="text-sm text-accent font-medium mt-4">View calculators →</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
