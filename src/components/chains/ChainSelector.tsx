'use client';

import React from 'react';
import Link from 'next/link';
import type { CalculatorChain } from '@/constants/calculatorChains';

interface ChainSelectorProps {
  chains: CalculatorChain[];
  /** Heading level for each card title, so it nests under the page's outline. */
  headingLevel?: 2 | 3 | 4;
}

export default function ChainSelector({
  chains,
  headingLevel = 4,
}: ChainSelectorProps): React.JSX.Element {
  const Heading = `h${headingLevel}` as const;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {chains.map(chain => (
        <Link
          key={chain.id}
          href={`/chains?start=${chain.id}`}
          className="glass-panel rounded-xl p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <Heading className="font-semibold">{chain.name}</Heading>
          <p className="mt-1 text-sm opacity-60">{chain.description}</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs font-medium text-white">
              {chain.steps.length} steps
            </span>
            <span className="text-xs text-[var(--accent)] font-medium">Start &rarr;</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
