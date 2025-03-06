'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// Rule: Use TypeScript for all code; prefer interfaces over types
export interface SavedResult {
  id: string;
  calculatorType: string;
  calculatorName: string;
  date: string;
  data: Record<string, any>;
}

// Rule: Use discriminated unions for complex state types
interface SavedResultsContextState {
  savedResults: SavedResult[];
  saveResult: (calculatorType: string, calculatorName: string, data: Record<string, any>) => void;
  removeResult: (id: string) => void;
  clearAllResults: () => void;
  isResultSaved: (id: string) => boolean;
}

// Create context with default values
const SavedResultsContext = createContext<SavedResultsContextState | undefined>(undefined);

// Rule: Use functional components with TypeScript interfaces
interface SavedResultsProviderProps {
  children: ReactNode;
}

export function SavedResultsProvider({ children }: SavedResultsProviderProps): React.JSX.Element {
  // Rule: Move localStorage logic to dedicated hooks/utilities
  const [savedResults, setSavedResults] = useLocalStorage<SavedResult[]>(
    'healthcheck-saved-results',
    []
  );

  // Generate a unique ID for the result
  function generateResultId(type: string, resultData: Record<string, any>): string {
    // Create a string representation of the data
    const dataString = JSON.stringify(resultData);
    
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < dataString.length; i++) {
      const char = dataString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    return `${type}-${hash}`;
  }

  // Rule: Use explicit return types for all functions
  function saveResult(calculatorType: string, calculatorName: string, data: Record<string, any>): void {
    const resultId = generateResultId(calculatorType, data);
    
    // Check if already saved
    if (savedResults.some(result => result.id === resultId)) {
      return; // Already saved
    }
    
    // Add new result
    const newResult: SavedResult = {
      id: resultId,
      calculatorType,
      calculatorName,
      date: new Date().toISOString(),
      data,
    };
    
    // Limit to 20 saved results (remove oldest if needed)
    setSavedResults([newResult, ...savedResults].slice(0, 20));
  }

  function removeResult(id: string): void {
    setSavedResults(savedResults.filter(result => result.id !== id));
  }

  function clearAllResults(): void {
    setSavedResults([]);
  }

  function isResultSaved(id: string): boolean {
    return savedResults.some(result => result.id === id);
  }

  const value: SavedResultsContextState = {
    savedResults,
    saveResult,
    removeResult,
    clearAllResults,
    isResultSaved,
  };

  return (
    <SavedResultsContext.Provider value={value}>
      {children}
    </SavedResultsContext.Provider>
  );
}

// Custom hook for using saved results context
export function useSavedResults(): SavedResultsContextState {
  const context = useContext(SavedResultsContext);
  if (context === undefined) {
    throw new Error('useSavedResults must be used within a SavedResultsProvider');
  }
  return context;
}
