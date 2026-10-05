'use client';

import { useState } from 'react';
import { readChainPrefill } from './useChainState';

/**
 * Convenience hook for calculator pages. Returns prefill data for the given
 * calculator slug if a chain is active and the slug is the current step, or
 * null otherwise.
 *
 * Reads storage once (lazy state init) instead of subscribing to the whole
 * chain state, so the page does not re-render when the chain updates. The
 * returned object is stable for the life of the page, which keeps consumer
 * effects from re-running.
 */
export function useChainPrefill(calculatorSlug: string): Record<string, string | number> | null {
  const [prefill] = useState(() => readChainPrefill(calculatorSlug));
  return prefill;
}
