'use client';

import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import ChainSelector from '@/components/chains/ChainSelector';
import { CALCULATOR_CHAINS, getChainById } from '@/constants/calculatorChains';
import { useChainState } from '@/hooks/useChainState';

export default function ChainsPageClient(): React.JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { startChain } = useChainState();

  useEffect(() => {
    const chainId = searchParams.get('start');
    if (!chainId) return;

    const chain = getChainById(chainId);
    if (!chain) return;

    const firstSlug = startChain(chainId);
    if (firstSlug) {
      router.replace(`/${firstSlug}`);
    }
  }, [searchParams, startChain, router]);

  return (
    <div className="mx-auto max-w-4xl">
      <Breadcrumb />
      <h1 className="mb-2 text-3xl font-bold">Guided Health Workflows</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Follow a step-by-step workflow to get a complete health assessment. Enter your details once
        and they carry forward to each calculator automatically.
      </p>

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
