'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import ChainSelector from '@/components/chains/ChainSelector';
import { CALCULATOR_CHAINS, getChainById } from '@/constants/calculatorChains';
import { useChainState } from '@/hooks/useChainState';

interface ChainsPageClientProps {
  initialChainId: string | null;
}

function WorkflowStartCard({ chainId }: { chainId: string }) {
  const router = useRouter();
  const { startChain } = useChainState();
  const chain = getChainById(chainId);

  if (!chain) {
    return null;
  }

  const handleStart = () => {
    const firstSlug = startChain(chainId);
    if (firstSlug) {
      router.push(`/${firstSlug}`);
    }
  };

  return (
    <div className="mb-8 rounded-2xl border border-accent/25 bg-accent/5 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-accent">Workflow ready</p>
      <h2 className="mt-2 text-xl font-semibold">{chain.name}</h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{chain.description}</p>
      <button className="ui-btn-primary mt-4" type="button" onClick={handleStart}>
        Start {chain.steps.length}-step workflow
      </button>
    </div>
  );
}

export default function ChainsPageClient({
  initialChainId,
}: ChainsPageClientProps): React.JSX.Element {
  const router = useRouter();
  const { startChain } = useChainState();
  const hasAttemptedAutoStartRef = useRef(false);

  useEffect(() => {
    if (!initialChainId || hasAttemptedAutoStartRef.current) {
      return;
    }

    hasAttemptedAutoStartRef.current = true;
    const firstSlug = startChain(initialChainId);
    if (firstSlug) {
      router.replace(`/${firstSlug}`);
    }
  }, [initialChainId, router, startChain]);

  return (
    <div className="mx-auto max-w-4xl">
      <Breadcrumb />
      <h1 className="mb-2 text-3xl font-bold">Guided Health Workflows</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Follow a step-by-step workflow to get a complete health assessment. Enter your details once
        and they carry forward to each calculator automatically.
      </p>

      {initialChainId ? <WorkflowStartCard chainId={initialChainId} /> : null}

      <ChainSelector chains={CALCULATOR_CHAINS} />

      <div className="mt-12 glass-panel rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-2">How it works</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>Choose a workflow that matches your goal</li>
          <li>Complete each calculator in sequence — your inputs carry forward automatically</li>
          <li>View your results on the Health Dashboard when you finish</li>
        </ol>
      </div>
    </div>
  );
}
