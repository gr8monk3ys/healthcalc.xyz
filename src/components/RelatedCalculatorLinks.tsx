'use client';

import React from 'react';
import Link from 'next/link';
import { CALCULATOR_CATALOG } from '@/constants/calculatorCatalog';

interface RelatedCalculatorLinksProps {
  title?: string;
  slugs: string[];
  className?: string;
}

export default function RelatedCalculatorLinks({
  title = 'Related Calculators',
  slugs,
  className = '',
}: RelatedCalculatorLinksProps) {
  const calculators = CALCULATOR_CATALOG.filter(calculator => slugs.includes(calculator.slug));

  if (calculators.length === 0) return null;

  return (
    <section className={`my-8 ${className}`}>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {calculators.map(calculator => (
          <Link
            key={calculator.slug}
            href={`/calculator/${calculator.slug}`}
            className="neumorph p-4 rounded-lg hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-accent">{calculator.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{calculator.description}</p>
            <span className="text-sm text-accent mt-3 inline-block">Try calculator →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
