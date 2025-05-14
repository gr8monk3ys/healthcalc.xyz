'use client';

import React, { useMemo } from 'react';
import { useSavedResults } from '@/context/SavedResultsContext';
import { CALCULATOR_METRICS, extractMetricValue } from '@/constants/calculatorMetrics';
import MetricCard from './MetricCard';
import TrendChart from './TrendChart';
import QuickActions from './QuickActions';
import ProgressTimeline from './ProgressTimeline';

/** Group saved results by calculator type, returning the latest and previous values. */
function useMetricSummaries(
  savedResults: { calculatorType: string; date: string; data: Record<string, unknown> }[]
): {
  slug: string;
  latestValue: number;
  previousValue?: number;
  lastUpdated: string;
}[] {
  return useMemo(() => {
    const grouped = new Map<string, { date: string; value: number }[]>();

    for (const r of savedResults) {
      const value = extractMetricValue(r.calculatorType, r.data);
      if (value === undefined) continue;

      const list = grouped.get(r.calculatorType) ?? [];
      list.push({ date: r.date, value });
      grouped.set(r.calculatorType, list);
    }

    const summaries: {
      slug: string;
      latestValue: number;
      previousValue?: number;
      lastUpdated: string;
    }[] = [];

    Array.from(grouped.entries()).forEach(([slug, points]) => {
      if (!CALCULATOR_METRICS[slug]) return;

      const sorted = points.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      summaries.push({
        slug,
        latestValue: sorted[0].value,
        previousValue: sorted.length > 1 ? sorted[1].value : undefined,
        lastUpdated: sorted[0].date,
      });
    });

    return summaries;
  }, [savedResults]);
}

export default function HealthDashboard(): React.JSX.Element {
  const { savedResults } = useSavedResults();
  const summaries = useMetricSummaries(savedResults);

  // Types that have 2+ data points → show chart
  const chartTypes = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of savedResults) {
      if (!CALCULATOR_METRICS[r.calculatorType]) continue;
      const value = extractMetricValue(r.calculatorType, r.data);
      if (value === undefined) continue;
      counts.set(r.calculatorType, (counts.get(r.calculatorType) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .filter(([, count]: [string, number]) => count >= 2)
      .map(([slug]: [string, number]) => slug);
  }, [savedResults]);

  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      {summaries.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {summaries.map(s => {
            const metric = CALCULATOR_METRICS[s.slug];
            if (!metric) return null;
            return (
              <MetricCard
                key={s.slug}
                metric={metric}
                calculatorSlug={s.slug}
                latestValue={s.latestValue}
                previousValue={s.previousValue}
                lastUpdated={s.lastUpdated}
              />
            );
          })}
        </div>
      )}

      {/* Trend Charts */}
      {chartTypes.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {chartTypes.map(slug => {
            const metric = CALCULATOR_METRICS[slug];
            if (!metric) return null;
            return (
              <TrendChart key={slug} metric={metric} calculatorSlug={slug} results={savedResults} />
            );
          })}
        </div>
      )}

      {savedResults.length > 0 && <ProgressTimeline savedResults={savedResults} />}

      {/* Quick Actions */}
      <QuickActions savedResults={savedResults} />
    </div>
  );
}
