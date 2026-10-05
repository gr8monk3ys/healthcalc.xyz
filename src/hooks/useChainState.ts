'use client';

import { useCallback, useEffect, useState } from 'react';
import { getChainById } from '@/constants/calculatorChains';

// Versioned so a future shape change can't be misread as the current one.
const STORAGE_KEY = 'healthcheck-chain-state:v1';
const LEGACY_STORAGE_KEY = 'healthcheck-chain-state';

export interface ChainState {
  chainId: string;
  currentStepIndex: number;
  completedSlugs: string[];
  sharedData: Record<string, string | number>;
}

function isChainState(value: unknown): value is ChainState {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.chainId === 'string' &&
    typeof v.currentStepIndex === 'number' &&
    Array.isArray(v.completedSlugs) &&
    !!v.sharedData &&
    typeof v.sharedData === 'object'
  );
}

function readChainState(): ChainState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY) ?? sessionStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isChainState(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function writeChainState(state: ChainState | null): void {
  if (typeof window === 'undefined') return;
  // sessionStorage throws when full or disabled (some private modes); the
  // chain then simply lives in React state for this page.
  try {
    sessionStorage.removeItem(LEGACY_STORAGE_KEY);
    if (state === null) {
      sessionStorage.removeItem(STORAGE_KEY);
    } else {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  } catch {
    // ignore
  }
}

/**
 * Prefill data for `slug` from the active chain, read straight from storage.
 * Module-level so callers that only need a one-time read don't subscribe to
 * chain state (and re-render on every chain update).
 */
export function readChainPrefill(slug: string): Record<string, string | number> | null {
  const current = readChainState();
  if (!current) return null;

  const chain = getChainById(current.chainId);
  if (!chain) return null;

  const step = chain.steps.find(s => s.slug === slug);
  if (!step) return null;

  const relevant: Record<string, string | number> = {};
  for (const field of step.sharedFields) {
    if (field in current.sharedData) {
      relevant[field] = current.sharedData[field];
    }
  }

  return Object.keys(relevant).length > 0 ? relevant : null;
}

export interface UseChainStateReturn {
  chainState: ChainState | null;
  isInChain: boolean;
  startChain: (chainId: string) => string | null;
  advanceStep: (slug: string, data: Record<string, string | number>) => string | null;
  exitChain: () => void;
  getPrefillData: (slug: string) => Record<string, string | number> | null;
}

export function useChainState(): UseChainStateReturn {
  const [chainState, setChainState] = useState<ChainState | null>(null);

  // Hydrate on mount
  useEffect(() => {
    setChainState(readChainState());
  }, []);

  // Listen for storage changes from other tabs
  useEffect(() => {
    function onStorage(e: StorageEvent): void {
      if (e.key === STORAGE_KEY || e.key === null) {
        setChainState(readChainState());
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const startChain = useCallback((chainId: string): string | null => {
    const chain = getChainById(chainId);
    if (!chain || chain.steps.length === 0) return null;

    const initial: ChainState = {
      chainId,
      currentStepIndex: 0,
      completedSlugs: [],
      sharedData: {},
    };
    writeChainState(initial);
    setChainState(initial);
    return chain.steps[0].slug;
  }, []);

  const advanceStep = useCallback(
    (slug: string, data: Record<string, string | number>): string | null => {
      const current = readChainState();
      if (!current) return null;

      const chain = getChainById(current.chainId);
      if (!chain) return null;

      const nextIndex = current.currentStepIndex + 1;
      const updated: ChainState = {
        ...current,
        currentStepIndex: nextIndex,
        completedSlugs: [...current.completedSlugs, slug],
        sharedData: { ...current.sharedData, ...data },
      };
      writeChainState(updated);
      setChainState(updated);

      if (nextIndex < chain.steps.length) {
        return chain.steps[nextIndex].slug;
      }
      return null; // chain complete
    },
    []
  );

  const exitChain = useCallback(() => {
    writeChainState(null);
    setChainState(null);
  }, []);

  // Module-level function: already a stable reference.
  const getPrefillData = readChainPrefill;

  return {
    chainState,
    isInChain: chainState !== null,
    startChain,
    advanceStep,
    exitChain,
    getPrefillData,
  };
}
