'use client';

import React, { useState, useEffect } from 'react';

interface SavedResult {
  id: string;
  calculatorType: string;
  calculatorName: string;
  date: string;
  data: Record<string, any>;
}

interface SaveResultProps {
  calculatorType: string;
  calculatorName: string;
  data: Record<string, any>;
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
  const [saved, setSaved] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  // Check if this result is already saved
  useEffect(() => {
    const savedResults = getSavedResults();
    const resultId = generateResultId(calculatorType, data);
    
    const isAlreadySaved = savedResults.some(result => result.id === resultId);
    setSaved(isAlreadySaved);
  }, [calculatorType, data]);

  // Generate a unique ID for the result
  const generateResultId = (type: string, resultData: Record<string, any>): string => {
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
  };

  // Get saved results from localStorage
  const getSavedResults = (): SavedResult[] => {
    if (typeof window === 'undefined') return [];
    
    const savedResults = localStorage.getItem('healthcheck-saved-results');
    return savedResults ? JSON.parse(savedResults) : [];
  };

  // Save result to localStorage
  const saveResult = () => {
    if (typeof window === 'undefined') return;
    
    try {
      const savedResults = getSavedResults();
      const resultId = generateResultId(calculatorType, data);
      
      // Check if already saved
      if (savedResults.some(result => result.id === resultId)) {
        setMessage('This result is already saved');
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
        return;
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
      const updatedResults = [newResult, ...savedResults].slice(0, 20);
      
      localStorage.setItem('healthcheck-saved-results', JSON.stringify(updatedResults));
      
      setSaved(true);
      setMessage('Result saved successfully');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    } catch (error) {
      console.error('Error saving result:', error);
      setMessage('Error saving result');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  // Remove saved result
  const removeResult = () => {
    if (typeof window === 'undefined') return;
    
    try {
      const savedResults = getSavedResults();
      const resultId = generateResultId(calculatorType, data);
      
      const updatedResults = savedResults.filter(result => result.id !== resultId);
      
      localStorage.setItem('healthcheck-saved-results', JSON.stringify(updatedResults));
      
      setSaved(false);
      setMessage('Result removed');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    } catch (error) {
      console.error('Error removing result:', error);
      setMessage('Error removing result');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  return (
    <div className={`${className}`}>
      {saved ? (
        <button
          onClick={removeResult}
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
          onClick={saveResult}
          className="flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
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
          Save Result
        </button>
      )}
      
      {showMessage && (
        <div
          className="mt-2 p-2 bg-gray-100 text-gray-800 text-sm rounded-lg"
          role="alert"
        >
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
  const [savedResults, setSavedResults] = useState<SavedResult[]>([]);
  const [loading, setLoading] = useState(true);

  // Load saved results from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const results = localStorage.getItem('healthcheck-saved-results');
      setSavedResults(results ? JSON.parse(results) : []);
    } catch (error) {
      console.error('Error loading saved results:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Clear all saved results
  const clearAllResults = () => {
    if (typeof window === 'undefined') return;
    
    if (window.confirm('Are you sure you want to clear all saved results?')) {
      localStorage.removeItem('healthcheck-saved-results');
      setSavedResults([]);
    }
  };

  // Delete a specific result
  const deleteResult = (id: string) => {
    if (typeof window === 'undefined') return;
    
    const updatedResults = savedResults.filter(result => result.id !== id);
    localStorage.setItem('healthcheck-saved-results', JSON.stringify(updatedResults));
    setSavedResults(updatedResults);
  };

  if (loading) {
    return (
      <div className={`neumorph p-6 rounded-lg ${className}`}>
        <h2 className="text-xl font-bold mb-4">Saved Results</h2>
        <p>Loading saved results...</p>
      </div>
    );
  }

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
        <button
          onClick={clearAllResults}
          className="text-sm text-red-600 hover:text-red-800"
        >
          Clear All
        </button>
      </div>
      
      <div className="space-y-4">
        {savedResults.map((result) => (
          <div
            key={result.id}
            className="neumorph p-4 rounded-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{result.calculatorName}</h3>
                <p className="text-sm text-gray-500">{formatDate(result.date)}</p>
              </div>
              <button
                onClick={() => deleteResult(result.id)}
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
                <div key={key} className="flex justify-between py-1 border-b border-gray-100 last:border-0">
                  <span className="text-gray-600">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                  <span className="font-medium">{typeof value === 'object' ? JSON.stringify(value) : value}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-3">
              <a
                href={`/${result.calculatorType}`}
                className="text-accent text-sm hover:underline"
              >
                Go to calculator →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
