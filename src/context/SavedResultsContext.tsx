'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useAuth } from '@/context/AuthContext';

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

function generateResultId(type: string, _resultData: Record<string, unknown>): string {
  return `${type}-${crypto.randomUUID()}`;
}

export function SavedResultsProvider({ children }: SavedResultsProviderProps): React.JSX.Element {
  const { user } = useAuth();
  const [savedResultsByUser, setSavedResultsByUser] = useLocalStorage<
    Record<string, SavedResult[]>
  >('healthcheck-saved-results-by-user', {});

  const userKey = user?.email ?? 'guest';
  const savedResults = savedResultsByUser[userKey] ?? [];

  function saveResult(
    calculatorType: string,
    calculatorName: string,
    data: Record<string, unknown>
  ): boolean {
    if (!user) {
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
    canSaveResults: Boolean(user),
    saveResult,
    removeResult,
    clearAllResults,
    isResultSaved,
  };

  return <SavedResultsContext.Provider value={value}>{children}</SavedResultsContext.Provider>;
}

export function useSavedResults(): SavedResultsContextState {
  const context = useContext(SavedResultsContext);
  if (context === undefined) {
    throw new Error('useSavedResults must be used within a SavedResultsProvider');
  }
  return context;
}
