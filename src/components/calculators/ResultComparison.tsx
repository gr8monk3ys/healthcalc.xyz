'use client';

import React, { useId, useMemo, useState } from 'react';
import type { SavedResult } from '@/context/SavedResultsContext';
import MiniChart from '@/components/ui/MiniChart';

interface ResultComparisonProps {
  results: SavedResult[];
  calculatorType: string;
  onClose: () => void;
}

function formatDateLabel(dateString: string): string {
  const d = new Date(dateString);
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, s => s.toUpperCase())
    .trim();
}

function getNumericValue(value: unknown): number | null {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? null : parsed;
  }
  return null;
}

function getPrimaryNumericKey(data: Record<string, unknown>): string | null {
  const keys = Object.keys(data);
  for (const key of keys) {
    if (typeof data[key] === 'number') return key;
  }
  return null;
}

function DiffIndicator({
  oldVal,
  newVal,
}: {
  oldVal: number;
  newVal: number;
}): React.JSX.Element | null {
  const diff = newVal - oldVal;
  if (Math.abs(diff) < 0.01) {
    return <span className="text-xs text-gray-400 ml-1">--</span>;
  }

  const isPositive = diff > 0;
  return (
    <span
      className={`ml-1 inline-flex items-center text-xs font-semibold ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        className={`mr-0.5 ${isPositive ? '' : 'rotate-180'}`}
      >
        <path d="M5 2 L8 6 L2 6 Z" fill="currentColor" />
      </svg>
      {isPositive ? '+' : ''}
      {diff.toFixed(1)}
    </span>
  );
}

export default function ResultComparison({
  results,
  calculatorType: _calculatorType,
  onClose,
}: ResultComparisonProps): React.JSX.Element {
  const idPrefix = useId();
  const sorted = useMemo(
    () => [...results].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [results]
  );

  const [leftIndex, setLeftIndex] = useState<number>(sorted.length >= 2 ? 0 : 0);
  const [rightIndex, setRightIndex] = useState<number>(sorted.length >= 2 ? sorted.length - 1 : 0);

  const leftResult = sorted[leftIndex];
  const rightResult = sorted[rightIndex];

  const chartData = useMemo(() => {
    if (sorted.length < 2) return [];
    const primaryKey = getPrimaryNumericKey(sorted[0].data);
    if (!primaryKey) return [];

    return sorted
      .map(r => {
        const val = getNumericValue(r.data[primaryKey]);
        if (val === null) return null;
        return { date: r.date, value: val, label: formatKey(primaryKey) };
      })
      .filter((d): d is { date: string; value: number; label: string } => d !== null);
  }, [sorted]);

  const allKeys = useMemo(() => {
    const keySet = new Set<string>();
    if (leftResult) Object.keys(leftResult.data).forEach(k => keySet.add(k));
    if (rightResult) Object.keys(rightResult.data).forEach(k => keySet.add(k));
    return Array.from(keySet);
  }, [leftResult, rightResult]);

  return (
    <div className="glass-panel rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Compare Results</h3>
        <button
          type="button"
          onClick={onClose}
          className="elevated-pill rounded-full px-3 py-1 text-sm font-medium hover:-translate-y-0.5 transition-transform"
        >
          Close
        </button>
      </div>

      {/* Chart */}
      {chartData.length >= 2 && (
        <div className="mb-5">
          <MiniChart data={chartData} showArea showDots height={120} />
        </div>
      )}

      {/* Selectors */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label
            htmlFor={`${idPrefix}-earlier-result`}
            className="block text-xs font-medium opacity-60 mb-1"
          >
            Earlier result
          </label>
          <select
            id={`${idPrefix}-earlier-result`}
            value={leftIndex}
            onChange={e => setLeftIndex(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
          >
            {sorted.map((r, i) => (
              <option key={r.id} value={i}>
                {formatDateLabel(r.date)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor={`${idPrefix}-later-result`}
            className="block text-xs font-medium opacity-60 mb-1"
          >
            Later result
          </label>
          <select
            id={`${idPrefix}-later-result`}
            value={rightIndex}
            onChange={e => setRightIndex(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
          >
            {sorted.map((r, i) => (
              <option key={r.id} value={i}>
                {formatDateLabel(r.date)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-side comparison */}
      {leftResult && rightResult && (
        <div className="space-y-1">
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_auto_auto] gap-2 py-2 border-b border-gray-200 dark:border-gray-700 text-xs font-semibold opacity-60">
            <span>Metric</span>
            <span className="w-24 text-right">{formatDateLabel(leftResult.date)}</span>
            <span className="w-32 text-right">{formatDateLabel(rightResult.date)}</span>
          </div>

          {allKeys.map(key => {
            const leftVal = leftResult.data[key];
            const rightVal = rightResult.data[key];
            const leftNum = getNumericValue(leftVal);
            const rightNum = getNumericValue(rightVal);

            return (
              <div
                key={key}
                className="grid grid-cols-[1fr_auto_auto] gap-2 py-2 border-b border-gray-100 dark:border-gray-800 last:border-0 text-sm"
              >
                <span className="text-gray-600 dark:text-gray-400">{formatKey(key)}</span>
                <span className="w-24 text-right font-medium">
                  {leftVal !== undefined
                    ? typeof leftVal === 'object'
                      ? JSON.stringify(leftVal)
                      : String(leftVal)
                    : '--'}
                </span>
                <span className="w-32 text-right font-medium">
                  {rightVal !== undefined
                    ? typeof rightVal === 'object'
                      ? JSON.stringify(rightVal)
                      : String(rightVal)
                    : '--'}
                  {leftNum !== null && rightNum !== null && (
                    <DiffIndicator oldVal={leftNum} newVal={rightNum} />
                  )}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {sorted.length < 2 && (
        <p className="text-sm text-gray-500 text-center py-4">
          Save at least two results for this calculator to compare them.
        </p>
      )}
    </div>
  );
}
