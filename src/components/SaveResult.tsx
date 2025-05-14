'use client';

import React from 'react';
import { useSavedResultsManager } from '@/hooks/useSavedResultsManager';
import Link from 'next/link';
import AuthSavedResultsProviders from '@/components/providers/AuthSavedResultsProviders';
import { useLocale } from '@/context/LocaleContext';

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
function SaveResultContent({
  calculatorType,
  calculatorName,
  data,
  className = '',
}: SaveResultProps) {
  // Rule: Move localStorage logic to dedicated hooks/utilities
  const { saveResult, removeResultByData, isResultSaved, canSaveResults, message, showMessage } =
    useSavedResultsManager();
  const { t } = useLocale();

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
          type="button"
          className="neumorph-btn flex items-center gap-2 px-4 py-2 text-sm font-semibold text-accent transition-all hover:-translate-y-0.5"
          aria-label={t('savedResults.list.deleteAria')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 10h-2v2h2v-2zm-2-8h8v2h-8v-2zm10 0h2v2h-2v-2zm2 8h-2v2h2v-2zm-2-4h-8v2h8v-2zm-10 0h-2v2h2v-2zm10 8h-8v2h8v-2zm-10 0h-2v2h2v-2z" />
          </svg>
          {t('savedResults.button.saved')}
        </button>
      ) : (
        <button
          onClick={handleSaveResult}
          type="button"
          className="neumorph-btn flex items-center gap-2 bg-accent px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:-translate-y-0.5 hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-70"
          aria-label={t('savedResults.button.save')}
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
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          {canSaveResults ? t('savedResults.button.save') : t('savedResults.button.loginToSave')}
        </button>
      )}

      {!canSaveResults && (
        <p className="mt-2 text-xs text-gray-600">{t('savedResults.helper.loginInstruction')}</p>
      )}

      {showMessage && (
        <div className="mt-2 p-2 bg-gray-100 text-gray-800 text-sm rounded-lg" role="alert">
          {message}
        </div>
      )}
    </div>
  );
}

export default function SaveResult(props: SaveResultProps): React.JSX.Element {
  return (
    <AuthSavedResultsProviders>
      <SaveResultContent {...props} />
    </AuthSavedResultsProviders>
  );
}

interface CalculatorGroup {
  type: string;
  name: string;
  results: import('@/context/SavedResultsContext').SavedResult[];
}

function groupByCalculatorType(
  results: import('@/context/SavedResultsContext').SavedResult[]
): CalculatorGroup[] {
  const map = new Map<string, CalculatorGroup>();
  for (const r of results) {
    const existing = map.get(r.calculatorType);
    if (existing) {
      existing.results.push(r);
    } else {
      map.set(r.calculatorType, {
        type: r.calculatorType,
        name: r.calculatorName,
        results: [r],
      });
    }
  }
  return Array.from(map.values());
}

function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, s => s.toUpperCase())
    .trim();
}

function buildCsvContent(results: import('@/context/SavedResultsContext').SavedResult[]): string {
  if (results.length === 0) return '';

  // Collect all unique data keys across all results
  const allKeys = new Set<string>();
  for (const r of results) {
    Object.keys(r.data).forEach(k => allKeys.add(k));
  }
  const dataKeys = Array.from(allKeys);

  const headers = ['Date', 'Calculator', ...dataKeys.map(formatKey)];
  const rows = results.map(r => {
    const date = new Date(r.date).toISOString().slice(0, 10);
    const vals = dataKeys.map(k => {
      const v = r.data[k];
      if (v === undefined || v === null) return '';
      if (typeof v === 'object') return JSON.stringify(v);
      return String(v);
    });
    return [date, r.calculatorName, ...vals];
  });

  const escapeCsv = (val: string): string => {
    if (val.includes(',') || val.includes('"') || val.includes('\n')) {
      return `"${val.replace(/"/g, '""')}"`;
    }
    return val;
  };

  return [headers.map(escapeCsv).join(','), ...rows.map(row => row.map(escapeCsv).join(','))].join(
    '\n'
  );
}

function downloadCsv(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * SavedResultsList component for displaying saved results
 * Groups results by calculator type with charts and comparison
 */
export function SavedResultsList({ className = '' }: { className?: string }) {
  // Rule: Move localStorage logic to dedicated hooks/utilities
  const { savedResults, clearAllResults, removeResult, formatDate } = useSavedResultsManager();
  const { localizePath, t } = useLocale();
  const [comparingType, setComparingType] = React.useState<string | null>(null);
  const [expandedGroups, setExpandedGroups] = React.useState<Set<string>>(new Set());

  const groups = React.useMemo(() => groupByCalculatorType(savedResults), [savedResults]);

  const toggleGroup = (type: string): void => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  const handleExportCsv = (): void => {
    const csv = buildCsvContent(savedResults);
    if (csv) {
      const dateStr = new Date().toISOString().slice(0, 10);
      downloadCsv(csv, `healthcheck-results-${dateStr}.csv`);
    }
  };

  if (savedResults.length === 0) {
    return (
      <div className={`glass-panel rounded-2xl p-6 ${className}`}>
        <h2 className="text-xl font-bold mb-4">{t('savedResults.list.emptyTitle')}</h2>
        <p>{t('savedResults.list.emptyBody')}</p>
      </div>
    );
  }

  // Lazy-load comparison and chart components
  const ResultComparison = React.lazy(() => import('@/components/calculators/ResultComparison'));
  const MiniChart = React.lazy(() => import('@/components/ui/MiniChart'));

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold">{t('savedResults.list.title')}</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCsv}
            className="elevated-pill rounded-full px-4 py-2 text-sm font-medium transition-transform hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1v8m0 0L4 6.5M7 9l3-2.5M2 11h10"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Export CSV
            </span>
          </button>
          <button
            onClick={clearAllResults}
            className="text-sm font-semibold text-danger hover:opacity-90 px-3 py-2"
          >
            {t('savedResults.list.clearAll')}
          </button>
        </div>
      </div>

      {/* Grouped sections */}
      {groups.map(group => {
        const isExpanded = expandedGroups.has(group.type);
        const isComparing = comparingType === group.type;

        // Build chart data from numeric values in results
        const chartData = group.results
          .map(r => {
            const keys = Object.keys(r.data);
            for (const key of keys) {
              if (typeof r.data[key] === 'number') {
                return { date: r.date, value: r.data[key] as number, label: formatKey(key) };
              }
            }
            return null;
          })
          .filter((d): d is { date: string; value: number; label: string } => d !== null)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return (
          <section key={group.type} className="glass-panel rounded-2xl overflow-hidden">
            {/* Section header */}
            <button
              type="button"
              onClick={() => toggleGroup(group.type)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3">
                <h3 className="text-base font-bold">{group.name}</h3>
                <span className="elevated-pill rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums">
                  {group.results.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {group.results.length >= 2 && (
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={e => {
                      e.stopPropagation();
                      setComparingType(isComparing ? null : group.type);
                      if (!expandedGroups.has(group.type)) {
                        setExpandedGroups(prev => {
                          const next = new Set(Array.from(prev));
                          next.add(group.type);
                          return next;
                        });
                      }
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        setComparingType(isComparing ? null : group.type);
                      }
                    }}
                    className="text-accent text-xs font-semibold hover:underline"
                  >
                    {isComparing ? 'Hide comparison' : 'Compare'}
                  </span>
                )}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>

            {/* Mini chart for groups with 2+ results */}
            {isExpanded && chartData.length >= 2 && (
              <div className="px-5 pb-2">
                <React.Suspense fallback={<div className="h-[120px]" />}>
                  <MiniChart data={chartData} showArea showDots height={120} />
                </React.Suspense>
              </div>
            )}

            {/* Comparison panel */}
            {isExpanded && isComparing && (
              <div className="px-5 pb-4">
                <React.Suspense
                  fallback={
                    <div className="h-32 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800" />
                  }
                >
                  <ResultComparison
                    results={group.results}
                    calculatorType={group.type}
                    onClose={() => setComparingType(null)}
                  />
                </React.Suspense>
              </div>
            )}

            {/* Individual results */}
            {isExpanded && (
              <div className="px-5 pb-5 space-y-3">
                {group.results.map(result => (
                  <div key={result.id} className="neumorph p-4 rounded-xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium">{formatDate(result.date)}</p>
                      </div>
                      <button
                        onClick={() => removeResult(result.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        aria-label={t('savedResults.list.deleteAria')}
                      >
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-2 text-sm">
                      {Object.entries(result.data).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800 last:border-0"
                        >
                          <span className="text-gray-600 dark:text-gray-400">{formatKey(key)}</span>
                          <span className="font-medium">
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3">
                      <Link
                        href={localizePath(`/${result.calculatorType}`)}
                        className="text-accent text-sm font-medium hover:underline"
                      >
                        {t('savedResults.list.goToCalculator')}{' '}
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
