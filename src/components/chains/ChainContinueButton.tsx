'use client';

import React from 'react';
import Link from 'next/link';
import { getChainById } from '@/constants/calculatorChains';
import { useChainState } from '@/hooks/useChainState';

interface ChainContinueButtonProps {
  calculatorSlug: string;
  /** Data produced by this calculator step (age, weight, etc.) */
  resultData: Record<string, string | number>;
}

export default function ChainContinueButton({
  calculatorSlug,
  resultData,
}: ChainContinueButtonProps): React.JSX.Element | null {
  const { chainState, advanceStep } = useChainState();

  if (!chainState) return null;

  const chain = getChainById(chainState.chainId);
  if (!chain) return null;

  const currentStep = chain.steps[chainState.currentStepIndex];
  if (!currentStep || currentStep.slug !== calculatorSlug) return null;

  const isLastStep = chainState.currentStepIndex === chain.steps.length - 1;
  const nextStep = !isLastStep ? chain.steps[chainState.currentStepIndex + 1] : null;

  // A real link (Cmd/Ctrl-click and middle-click work); recording the step is
  // a side effect of following it. Chain complete -> the results dashboard.
  const href = nextStep ? `/${nextStep.slug}` : '/saved-results';

  function handleContinue(): void {
    advanceStep(calculatorSlug, resultData);
  }

  return (
    <div className="my-6 animate-fade-in">
      <Link
        href={href}
        onClick={handleContinue}
        className="glass-panel block w-full rounded-xl p-4 text-left ring-2 ring-[var(--accent)] ring-opacity-40 transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--accent)]">
              {isLastStep ? 'View Your Results Dashboard' : `Continue to ${nextStep?.label}`}
            </p>
            <p className="mt-0.5 text-xs opacity-60">
              {isLastStep ? 'All steps complete — see your health overview' : nextStep?.description}
            </p>
          </div>
          <span className="text-lg text-[var(--accent)]" aria-hidden="true">
            &rarr;
          </span>
        </div>
      </Link>
    </div>
  );
}
