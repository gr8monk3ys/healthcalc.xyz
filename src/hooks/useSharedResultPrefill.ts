'use client';

import { useEffect, useState } from 'react';
import {
  decodeSharedResultFromSearchParams,
  type ShareCalculatorSlug,
  type SharedResultInputMap,
} from '@/utils/resultSharing';

function readSharedResultPrefill<C extends ShareCalculatorSlug>(
  calculator: C
): SharedResultInputMap[C] | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const payload = decodeSharedResultFromSearchParams(
    new URLSearchParams(window.location.search),
    calculator
  );

  if (!payload) {
    return null;
  }

  return payload.i as SharedResultInputMap[C];
}

export function useSharedResultPrefill<C extends ShareCalculatorSlug>(
  calculator: C
): SharedResultInputMap[C] | null {
  const [sharedPrefill, setSharedPrefill] = useState<SharedResultInputMap[C] | null>(null);

  useEffect(() => {
    setSharedPrefill(readSharedResultPrefill(calculator));
  }, [calculator]);

  return sharedPrefill;
}

export function requestCalculatorFormSubmit(delayMs = 120): void {
  if (typeof window === 'undefined') return;

  window.setTimeout(() => {
    const form = document.querySelector<HTMLFormElement>('form[data-calculator-form="1"]');
    form?.requestSubmit();
  }, delayMs);
}
