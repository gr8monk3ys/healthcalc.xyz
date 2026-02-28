'use client';

import { useMemo } from 'react';
import { useChainState } from './useChainState';

/**
 * Convenience hook for calculator pages. Returns prefill data for the given
 * calculator slug if a chain is active and the slug is the current step, or
 * null otherwise. The returned object is stable (memoized) to avoid
 * unnecessary effect re-runs in consumer components.
 */
export function useChainPrefill(calculatorSlug: string): Record<string, string | number> | null {
  const { getPrefillData } = useChainState();

  return useMemo(() => getPrefillData(calculatorSlug), [getPrefillData, calculatorSlug]);
}
