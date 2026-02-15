'use client';

import React from 'react';
import Link from 'next/link';
import { getRelatedCalculators } from '@/constants/relatedCalculators';
import { useLocale } from '@/context/LocaleContext';

interface RelatedCalculatorsProps {
  currentSlug: string;
  title?: string;
}

export default function RelatedCalculators({ currentSlug, title }: RelatedCalculatorsProps) {
  const { localizePath, t } = useLocale();
  const resolvedTitle = title ?? t('calculator.relatedCalculators.title');
  const calculators = getRelatedCalculators(currentSlug);

  if (calculators.length === 0) {
    return null;
  }

  return (
    <div className="neumorph p-6 rounded-lg my-8">
      <h2 className="text-2xl font-semibold mb-4 text-accent">{resolvedTitle}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {calculators.map(calculator => (
          <Link
            key={calculator.slug}
            href={localizePath(`/${calculator.slug}`)}
            className="block p-4 rounded-lg bg-white hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-1">{calculator.title}</h3>
            <p className="text-sm text-gray-600">{calculator.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
