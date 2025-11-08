'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SearchResult {
  title: string;
  description: string;
  url: string;
  type: 'calculator' | 'article' | 'page';
  category?: string;
  tags?: string[];
  score: number;
}

interface SearchIndex {
  [key: string]: {
    title: string;
    description: string;
    url: string;
    type: 'calculator' | 'article' | 'page';
    category?: string;
    tags?: string[];
    content?: string;
  };
}

interface SearchProps {
  placeholder?: string;
  maxResults?: number;
  className?: string;
  showIcon?: boolean;
  autoFocus?: boolean;
  onSearch?: (query: string, results: SearchResult[]) => void;
  initialQuery?: string; // Initial query value
}

/**
 * Search component for implementing search functionality with proper indexing
 * Helps users find content and improves SEO by ensuring all content is indexed
 */
export default function Search({
  placeholder = 'Search calculators, articles...',
  maxResults = 10,
  className = '',
  showIcon = true,
  autoFocus = false,
  onSearch,
  initialQuery = '',
}: SearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchIndex, setSearchIndex] = useState<SearchIndex | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load search index
  useEffect(() => {
    const loadSearchIndex = async () => {
      try {
        // In a real implementation, this would be a proper search index
        // For now, we'll use a static JSON file
        const response = await fetch('/search-index.json');
        const data = await response.json();
        setSearchIndex(data);
      } catch (error) {
        console.error('Error loading search index:', error);
        // Fallback to empty index
        setSearchIndex({});
      }
    };

    loadSearchIndex();
  }, []);

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Auto-focus input if specified
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Handle search
  const handleSearch = (searchQuery: string) => {
    if (!searchIndex || searchQuery.trim().length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);

    // Split query into terms
    const terms = searchQuery.toLowerCase().trim().split(/\s+/);

    // Search through index
    const searchResults: SearchResult[] = Object.values(searchIndex)
      .map(item => {
        // Calculate score based on matches in title, description, content, tags
        let score = 0;

        // Title matches (highest weight)
        terms.forEach(term => {
          if (item.title.toLowerCase().includes(term)) {
            score += 10;
            // Exact title match or starts with term
            if (
              item.title.toLowerCase() === term ||
              item.title.toLowerCase().startsWith(`${term} `)
            ) {
              score += 15;
            }
          }
        });

        // Description matches
        terms.forEach(term => {
          if (item.description.toLowerCase().includes(term)) {
            score += 5;
          }
        });

        // Content matches
        if (item.content) {
          terms.forEach(term => {
            const contentMatches = (item.content?.toLowerCase().match(new RegExp(term, 'g')) || [])
              .length;
            score += contentMatches * 0.5; // Lower weight for content matches
          });
        }

        // Tag matches
        if (item.tags) {
          terms.forEach(term => {
            item.tags?.forEach(tag => {
              if (tag.toLowerCase().includes(term)) {
                score += 8;
                // Exact tag match
                if (tag.toLowerCase() === term) {
                  score += 5;
                }
              }
            });
          });
        }

        // Category matches
        if (item.category) {
          terms.forEach(term => {
            if (item.category?.toLowerCase().includes(term)) {
              score += 7;
            }
          });
        }

        // URL matches (for direct page searches)
        terms.forEach(term => {
          if (item.url.toLowerCase().includes(term)) {
            score += 3;
          }
        });

        // Type-specific boosts
        if (item.type === 'calculator') {
          score *= 1.2; // Boost calculators
        }

        return {
          title: item.title,
          description: item.description,
          url: item.url,
          type: item.type,
          category: item.category,
          tags: item.tags,
          score,
        };
      })
      .filter(item => item.score > 0) // Only include items with matches
      .sort((a, b) => b.score - a.score) // Sort by score (descending)
      .slice(0, maxResults); // Limit results

    setResults(searchResults);
    setShowResults(searchResults.length > 0);
    setIsLoading(false);

    // Call onSearch callback if provided
    if (onSearch) {
      onSearch(searchQuery, searchResults);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length >= 2) {
      handleSearch(value);
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (query.trim().length >= 2) {
      // Navigate to search results page
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setShowResults(false);
    }
  };

  // Handle result click
  const handleResultClick = (url: string) => {
    setShowResults(false);
    router.push(url);
  };

  // Get icon for result type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'calculator':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        );
      case 'article':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        );
    }
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <form onSubmit={handleSubmit} role="search">
        <div className="relative">
          {showIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          )}

          <input
            ref={inputRef}
            type="search"
            className={`block w-full rounded-lg border border-gray-300 bg-white py-2 ${showIcon ? 'pl-10' : 'pl-4'} pr-4 text-gray-900 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent`}
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onFocus={() => query.trim().length >= 2 && setShowResults(true)}
            aria-label="Search"
            autoComplete="off"
          />

          {isLoading && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className="animate-spin h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}
        </div>
      </form>

      {showResults && (
        <div className="absolute z-10 mt-2 w-full rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="max-h-60 overflow-y-auto py-2">
            {results.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {results.map((result, index) => (
                  <li key={index}>
                    <button
                      className="flex w-full items-start px-4 py-2 text-left hover:bg-gray-50"
                      onClick={() => handleResultClick(result.url)}
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-500 mr-3">
                        {getTypeIcon(result.type)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{result.title}</p>
                        <p className="text-xs text-gray-500 truncate">{result.description}</p>
                        {result.category && (
                          <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            {result.category}
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-4 py-2 text-sm text-gray-500">No results found</p>
            )}
          </div>

          {results.length > 0 && (
            <div className="bg-gray-50 px-4 py-3 text-right">
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                className="text-xs font-medium text-accent hover:text-accent-dark"
                onClick={() => setShowResults(false)}
              >
                View all results
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * SearchPage component for displaying search results page
 */
export function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get query from URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const q = searchParams.get('q') || '';
      setQuery(q);
    }
  }, []);

  // Handle search results
  const handleSearchResults = (searchQuery: string, searchResults: SearchResult[]) => {
    setResults(searchResults);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>

      <div className="mb-8">
        <Search
          placeholder="Search calculators, articles..."
          maxResults={100}
          autoFocus={true}
          onSearch={handleSearchResults}
          initialQuery={query}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <svg
            className="animate-spin h-8 w-8 text-accent"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
            {results.length > 0
              ? `Found ${results.length} result${results.length === 1 ? '' : 's'} for "${query}"`
              : `No results found for "${query}"`}
          </p>

          {results.length > 0 ? (
            <ul className="space-y-6">
              {results.map((result, index) => (
                <li key={index} className="neumorph p-4 rounded-lg">
                  <Link href={result.url} className="block hover:no-underline">
                    <div className="flex items-start">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent mr-3">
                        {result.type === 'calculator' ? (
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
                              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                        ) : result.type === 'article' ? (
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
                              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                            />
                          </svg>
                        ) : (
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
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        )}
                      </span>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 hover:text-accent">
                          {result.title}
                        </h2>
                        <p className="mt-1 text-gray-600">{result.description}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {result.category && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {result.category}
                            </span>
                          )}
                          {result.tags &&
                            result.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent"
                              >
                                {tag}
                              </span>
                            ))}
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                            {result.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="neumorph p-6 rounded-lg text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-xl font-semibold mb-2">No results found</h2>
              <p className="text-gray-600 mb-4">
                We couldn't find any matches for "{query}". Please try another search.
              </p>
              <div className="mt-6">
                <h3 className="font-medium mb-3">Popular Calculators</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  <Link
                    href="/bmi"
                    className="inline-block px-4 py-2 bg-white rounded-lg hover:shadow-md transition-shadow"
                  >
                    BMI Calculator
                  </Link>
                  <Link
                    href="/body-fat"
                    className="inline-block px-4 py-2 bg-white rounded-lg hover:shadow-md transition-shadow"
                  >
                    Body Fat Calculator
                  </Link>
                  <Link
                    href="/tdee"
                    className="inline-block px-4 py-2 bg-white rounded-lg hover:shadow-md transition-shadow"
                  >
                    TDEE Calculator
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
