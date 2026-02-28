'use client';

import React from 'react';
import { getChainById } from '@/constants/calculatorChains';
import type { ChainState } from '@/hooks/useChainState';

interface ChainProgressBarProps {
  chainState: ChainState;
  onExit: () => void;
}

export default function ChainProgressBar({
  chainState,
  onExit,
}: ChainProgressBarProps): React.JSX.Element | null {
  const chain = getChainById(chainState.chainId);
  if (!chain) return null;

  const { currentStepIndex, completedSlugs } = chainState;

  return (
    <div className="glass-panel mb-4 rounded-xl px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium uppercase tracking-wide opacity-60">
            {chain.name}
          </p>
          <div className="mt-2 flex items-center gap-1.5 overflow-x-auto">
            {chain.steps.map((step, i) => {
              const isCompleted = completedSlugs.includes(step.slug);
              const isCurrent = i === currentStepIndex;

              return (
                <React.Fragment key={step.slug}>
                  {i > 0 && (
                    <div
                      className={`hidden h-0.5 w-4 sm:block ${
                        isCompleted ? 'bg-[var(--accent)]' : 'bg-[var(--foreground)] opacity-15'
                      }`}
                    />
                  )}
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                      isCurrent
                        ? 'bg-[var(--accent)] text-white shadow-sm'
                        : isCompleted
                          ? 'bg-[var(--accent)] bg-opacity-20 text-[var(--accent)]'
                          : 'bg-[var(--foreground)] bg-opacity-5 opacity-50'
                    }`}
                  >
                    {isCompleted && !isCurrent ? '\u2713 ' : ''}
                    {step.label}
                  </span>
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          onClick={onExit}
          className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium opacity-60 transition-opacity hover:opacity-100"
          aria-label="Exit guided workflow"
        >
          Exit
        </button>
      </div>
    </div>
  );
}
