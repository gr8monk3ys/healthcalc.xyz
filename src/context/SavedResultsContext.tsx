'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useUser } from '@clerk/nextjs';
import { clerkEnabled } from '@/utils/auth';

export interface SavedResult {
  id: string;
  calculatorType: string;
  calculatorName: string;
  date: string;
  data: Record<string, unknown>;
}

interface SavedResultsContextState {
  savedResults: SavedResult[];
  canSaveResults: boolean;
  saveResult: (
    calculatorType: string,
    calculatorName: string,
    data: Record<string, unknown>
  ) => boolean;
  removeResult: (id: string) => void;
  clearAllResults: () => void;
  isResultSaved: (id: string) => boolean;
}

const SavedResultsContext = createContext<SavedResultsContextState | undefined>(undefined);

interface SavedResultsProviderProps {
  children: ReactNode;
}

function generateResultId(type: string, resultData: Record<string, unknown>): string {
  const dataString = JSON.stringify(resultData);
  let hash = 0;

  for (let i = 0; i < dataString.length; i++) {
    const char = dataString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash;
  }

  return `${type}-${hash}`;
}

function SavedResultsProviderBase({
  children,
  userKey,
  canSaveResults,
}: {
  children: ReactNode;
  userKey: string;
  canSaveResults: boolean;
}): React.JSX.Element {
  const [savedResultsByUser, setSavedResultsByUser] = useLocalStorage<
    Record<string, SavedResult[]>
  >('healthcheck-saved-results-by-user', {});

  const savedResults = savedResultsByUser[userKey] ?? [];

  function saveResult(
    calculatorType: string,
    calculatorName: string,
    data: Record<string, unknown>
  ): boolean {
    if (!canSaveResults) {
      return false;
    }

    const resultId = generateResultId(calculatorType, data);

    if (savedResults.some(result => result.id === resultId)) {
      return false;
    }

    const newResult: SavedResult = {
      id: resultId,
      calculatorType,
      calculatorName,
      date: new Date().toISOString(),
      data,
    };

    const updatedForUser = [newResult, ...savedResults].slice(0, 30);
    setSavedResultsByUser({
      ...savedResultsByUser,
      [userKey]: updatedForUser,
    });

    return true;
  }

  function removeResult(id: string): void {
    setSavedResultsByUser({
      ...savedResultsByUser,
      [userKey]: savedResults.filter(result => result.id !== id),
    });
  }

  function clearAllResults(): void {
    setSavedResultsByUser({
      ...savedResultsByUser,
      [userKey]: [],
    });
  }

  function isResultSaved(id: string): boolean {
    return savedResults.some(result => result.id === id);
  }

  const value: SavedResultsContextState = {
    savedResults,
    canSaveResults,
    saveResult,
    removeResult,
    clearAllResults,
    isResultSaved,
  };

  return <SavedResultsContext.Provider value={value}>{children}</SavedResultsContext.Provider>;
}

function SavedResultsProviderWithClerk({ children }: SavedResultsProviderProps): React.JSX.Element {
  const { user } = useUser();
  const userKey = user?.id ?? 'guest';
  const canSaveResults = Boolean(user);

  return (
    <SavedResultsProviderBase userKey={userKey} canSaveResults={canSaveResults}>
      {children}
    </SavedResultsProviderBase>
  );
}

function SavedResultsProviderWithoutClerk({
  children,
}: SavedResultsProviderProps): React.JSX.Element {
  return (
    <SavedResultsProviderBase userKey="guest" canSaveResults={false}>
      {children}
    </SavedResultsProviderBase>
  );
}

export function SavedResultsProvider({ children }: SavedResultsProviderProps): React.JSX.Element {
  if (clerkEnabled) {
    return <SavedResultsProviderWithClerk>{children}</SavedResultsProviderWithClerk>;
  }

  return <SavedResultsProviderWithoutClerk>{children}</SavedResultsProviderWithoutClerk>;
}

export function useSavedResults(): SavedResultsContextState {
  const context = useContext(SavedResultsContext);
  if (context === undefined) {
    throw new Error('useSavedResults must be used within a SavedResultsProvider');
  }
  return context;
}
