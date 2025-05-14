'use client';

import React, { useMemo } from 'react';
import MiniChart from '@/components/ui/MiniChart';
import MetricCard from './MetricCard';
import type { CalculatorMetricDef } from '@/constants/calculatorMetrics';
import type { SavedResult } from '@/context/SavedResultsContext';
import { extractMetricValue } from '@/constants/calculatorMetrics';

interface TrendChartProps {
  metric: CalculatorMetricDef;
  calculatorSlug: string;
  results: SavedResult[];
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

export default function TrendChart({
  metric,
  calculatorSlug,
  results,
}: TrendChartProps): React.JSX.Element | null {
  const dataPoints = useMemo(() => {
    const points: { date: string; value: number }[] = [];
    for (const r of results) {
      if (r.calculatorType !== calculatorSlug) continue;
      const value = extractMetricValue(calculatorSlug, r.data);
      if (value !== undefined) {
        points.push({ date: r.date, value });
      }
    }
    return points.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [results, calculatorSlug]);

  // Not enough data for a chart — fall back to a card
  if (dataPoints.length < 2) {
    const latest = dataPoints[0];
    return (
      <MetricCard
        metric={metric}
        calculatorSlug={calculatorSlug}
        latestValue={latest?.value}
        lastUpdated={latest?.date}
      />
    );
  }

  const latest = dataPoints[dataPoints.length - 1];

  return (
    <div className="glass-panel rounded-xl p-4">
      <div className="mb-2 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold">
          {metric.label}
          {metric.unit ? ` (${metric.unit})` : ''}
        </h3>
        <span className="text-xs opacity-40">Updated {formatDate(latest.date)}</span>
      </div>
      <MiniChart data={dataPoints} height={120} showDots showArea />
    </div>
  );
}
