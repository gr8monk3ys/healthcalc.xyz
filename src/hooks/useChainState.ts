'use client';

import { useCallback, useEffect, useState } from 'react';
import { getChainById } from '@/constants/calculatorChains';

const STORAGE_KEY = 'healthcheck-chain-state';

export interface ChainState {
  chainId: string;
  currentStepIndex: number;
  completedSlugs: string[];
  sharedData: Record<string, string | number>;
}

function readChainState(): ChainState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ChainState;
  } catch {
    return null;
  }
}

function writeChainState(state: ChainState | null): void {
  if (typeof window === 'undefined') return;
  if (state === null) {
    sessionStorage.removeItem(STORAGE_KEY);
  } else {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
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

  const getPrefillData = useCallback((slug: string): Record<string, string | number> | null => {
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
  }, []);

  return {
    chainState,
    isInChain: chainState !== null,
    startChain,
    advanceStep,
    exitChain,
    getPrefillData,
  };
}
