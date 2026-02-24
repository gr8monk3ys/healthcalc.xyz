'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  decodeSharedResultFromSearchParams,
  type ShareCalculatorSlug,
  type SharedResultInputMap,
} from '@/utils/resultSharing';

export function useSharedResultPrefill<C extends ShareCalculatorSlug>(
  calculator: C
): SharedResultInputMap[C] | null {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const payload = decodeSharedResultFromSearchParams(searchParams, calculator);
    if (!payload) {
      return null;
    }

    return payload.i as SharedResultInputMap[C];
  }, [calculator, searchParams]);
}

export function requestCalculatorFormSubmit(delayMs = 120): void {
  if (typeof window === 'undefined') return;

  window.setTimeout(() => {
    const form = document.querySelector<HTMLFormElement>('form[data-calculator-form="1"]');
    form?.requestSubmit();
  }, delayMs);
}
