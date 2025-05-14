'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { CALCULATOR_CATALOG } from '@/constants/calculatorCatalog';
import { getChainCalculatorSlugs, CALCULATOR_CHAINS } from '@/constants/calculatorChains';
import type { SavedResult } from '@/context/SavedResultsContext';
import ChainSelector from '@/components/chains/ChainSelector';

interface QuickActionsProps {
  savedResults: SavedResult[];
}

const FALLBACK_SLUGS = ['bmi', 'tdee', 'body-fat', 'macro'];

export default function QuickActions({ savedResults }: QuickActionsProps): React.JSX.Element {
  const usedSlugs = useMemo(() => new Set(savedResults.map(r => r.calculatorType)), [savedResults]);

  const suggestions = useMemo(() => {
    const chainSlugs = getChainCalculatorSlugs();

    // Find untried calculators, prioritize chain members
    const untried = CALCULATOR_CATALOG.filter(c => !usedSlugs.has(c.slug))
      .sort((a, b) => {
        const aInChain = chainSlugs.has(a.slug) ? 0 : 1;
        const bInChain = chainSlugs.has(b.slug) ? 0 : 1;
        return aInChain - bInChain;
      })
      .slice(0, 4);

    if (untried.length >= 2) return untried;

    // Fallback if user has tried almost everything
    return CALCULATOR_CATALOG.filter(c => FALLBACK_SLUGS.includes(c.slug)).slice(0, 4);
  }, [usedSlugs]);

  // Empty state — show chain selector
  if (savedResults.length === 0) {
    return (
      <div>
        <h3 className="mb-3 text-lg font-semibold">Get Started with a Guided Workflow</h3>
        <ChainSelector chains={CALCULATOR_CHAINS} />
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide opacity-60">Try Next</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {suggestions.map(calc => (
          <Link
            key={calc.slug}
            href={`/${calc.slug}`}
            className="glass-panel rounded-xl p-3 text-center transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <p className="text-sm font-medium">{calc.title.replace(' Calculator', '')}</p>
            <p className="mt-1 text-xs text-[var(--accent)]">Try it &rarr;</p>
          </Link>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Link
          href="/fitness-age"
          className="glass-panel rounded-xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          <p className="text-sm font-semibold">Fitness Age Quiz</p>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
            Combine your saved metrics into one age-style score.
          </p>
        </Link>
        <Link
          href="/report"
          className="glass-panel rounded-xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          <p className="text-sm font-semibold">Printable Health Report</p>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
            Generate a PDF-ready summary for a clinician or coach.
          </p>
        </Link>
      </div>
    </div>
  );
}
