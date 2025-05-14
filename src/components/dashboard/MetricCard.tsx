'use client';

import React from 'react';
import Link from 'next/link';
import type { CalculatorMetricDef } from '@/constants/calculatorMetrics';

interface MetricCardProps {
  metric: CalculatorMetricDef;
  calculatorSlug: string;
  latestValue?: number;
  previousValue?: number;
  lastUpdated?: string;
}

function formatValue(value: number, unit?: string): string {
  const formatted = Number.isInteger(value) ? String(value) : value.toFixed(1);
  return unit ? `${formatted} ${unit}` : formatted;
}

function getHealthColor(value: number, metric: CalculatorMetricDef): string {
  if (!metric.healthyRange) return 'text-[var(--accent)]';

  const { min, max } = metric.healthyRange;
  if (value >= min && value <= max) return 'text-emerald-500';

  const range = max - min;
  const lowerBound = min - range * 0.2;
  const upperBound = max + range * 0.2;
  if (value >= lowerBound && value <= upperBound) return 'text-amber-500';

  return 'text-red-500';
}

function getTrendColor(delta: number, higherIsBetter?: boolean): string {
  if (higherIsBetter === undefined) return 'text-[var(--foreground)] opacity-60';
  if (delta === 0) return 'text-[var(--foreground)] opacity-60';

  const isPositiveChange = higherIsBetter ? delta > 0 : delta < 0;
  return isPositiveChange ? 'text-emerald-500' : 'text-red-500';
}

function formatDate(dateString: string): string {
  const d = new Date(dateString);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${months[d.getMonth()]} ${d.getDate()}`;
}

export default function MetricCard({
  metric,
  calculatorSlug,
  latestValue,
  previousValue,
  lastUpdated,
}: MetricCardProps): React.JSX.Element {
  if (latestValue === undefined) {
    return (
      <Link
        href={`/${calculatorSlug}`}
        className="glass-panel rounded-xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg block"
      >
        <p className="text-xs font-medium uppercase tracking-wide opacity-60">{metric.label}</p>
        <p className="mt-2 text-sm text-[var(--foreground)] opacity-50">Not calculated yet</p>
        <p className="mt-1 text-xs text-[var(--accent)] font-medium">Calculate now &rarr;</p>
      </Link>
    );
  }

  const delta = previousValue !== undefined ? latestValue - previousValue : undefined;
  const colorClass = getHealthColor(latestValue, metric);

  return (
    <div className="glass-panel rounded-xl p-4">
      <p className="text-xs font-medium uppercase tracking-wide opacity-60">{metric.label}</p>
      <div className="mt-1 flex items-baseline gap-2">
        <span className={`text-2xl font-bold ${colorClass}`}>
          {formatValue(latestValue, metric.unit)}
        </span>
        {delta !== undefined && delta !== 0 && (
          <span className={`text-sm font-medium ${getTrendColor(delta, metric.higherIsBetter)}`}>
            {delta > 0 ? '↑' : '↓'}
            {Math.abs(delta).toFixed(1)}
          </span>
        )}
      </div>
      {lastUpdated && <p className="mt-1 text-xs opacity-40">{formatDate(lastUpdated)}</p>}
    </div>
  );
}
