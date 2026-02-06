'use client';

import React from 'react';
import { useSavedResultsManager } from '@/hooks/useSavedResultsManager';

interface SaveResultProps {
  calculatorType: string;
  calculatorName: string;
  data: Record<string, unknown>;
  className?: string;
}

/**
 * SaveResult component for saving calculator results
 * Improves user experience and encourages return visits
 */
export default function SaveResult({
  calculatorType,
  calculatorName,
  data,
  className = '',
}: SaveResultProps) {
  // Rule: Move localStorage logic to dedicated hooks/utilities
  const { saveResult, removeResultByData, isResultSaved, canSaveResults, message, showMessage } =
    useSavedResultsManager();

  // Check if this result is already saved
  const isSaved = isResultSaved(calculatorType, data);

  // Save result handler
  const handleSaveResult = (): void => {
    saveResult(calculatorType, calculatorName, data);
  };

  // Remove saved result handler
  const handleRemoveResult = (): void => {
    removeResultByData(calculatorType, data);
  };

  return (
    <div className={`${className}`}>
      {isSaved ? (
        <button
          onClick={handleRemoveResult}
          className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          aria-label="Remove saved result"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 10h-2v2h2v-2zm-2-8h8v2h-8v-2zm10 0h2v2h-2v-2zm2 8h-2v2h2v-2zm-2-4h-8v2h8v-2zm-10 0h-2v2h2v-2zm10 8h-8v2h8v-2zm-10 0h-2v2h2v-2z" />
          </svg>
          Saved
        </button>
      ) : (
        <button
          onClick={handleSaveResult}
          className="flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors disabled:cursor-not-allowed disabled:bg-gray-400"
          aria-label="Save result"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          {canSaveResults ? 'Save Result' : 'Log in to Save'}
        </button>
      )}

      {!canSaveResults && (
        <p className="mt-2 text-xs text-gray-600">
          Sign in from the top-right account button to save and sync results on this browser.
        </p>
      )}

      {showMessage && (
        <div className="mt-2 p-2 bg-gray-100 text-gray-800 text-sm rounded-lg" role="alert">
          {message}
        </div>
      )}
    </div>
  );
}

/**
 * SavedResultsList component for displaying saved results
 */
export function SavedResultsList({ className = '' }: { className?: string }) {
  // Rule: Move localStorage logic to dedicated hooks/utilities
  const { savedResults, clearAllResults, removeResult, formatDate } = useSavedResultsManager();

  if (savedResults.length === 0) {
    return (
      <div className={`neumorph p-6 rounded-lg ${className}`}>
        <h2 className="text-xl font-bold mb-4">Saved Results</h2>
        <p>You haven't saved any calculator results yet.</p>
      </div>
    );
  }

  return (
    <div className={`neumorph p-6 rounded-lg ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Saved Results</h2>
        <button onClick={clearAllResults} className="text-sm text-red-600 hover:text-red-800">
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        {savedResults.map(result => (
          <div key={result.id} className="neumorph p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{result.calculatorName}</h3>
                <p className="text-sm text-gray-500">{formatDate(result.date)}</p>
              </div>
              <button
                onClick={() => removeResult(result.id)}
                className="text-gray-400 hover:text-red-600"
                aria-label="Delete result"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-2 text-sm">
              {Object.entries(result.data).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between py-1 border-b border-gray-100 last:border-0"
                >
                  <span className="text-gray-600">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                  <span className="font-medium">
                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3">
              <a href={`/${result.calculatorType}`} className="text-accent text-sm hover:underline">
                Go to calculator →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
