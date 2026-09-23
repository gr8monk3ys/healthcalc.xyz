'use client';

import React, { useMemo } from 'react';
import { useSavedResults } from '@/context/SavedResultsContext';
import { CALCULATOR_METRICS, extractMetricValue } from '@/constants/calculatorMetrics';
import MetricCard from './MetricCard';
import TrendChart from './TrendChart';
import QuickActions from './QuickActions';
import ProgressTimeline from './ProgressTimeline';
import { latestTwoByDate } from '@/utils/latestByDate';

interface MetricSummary {
  slug: string;
  latestValue: number;
  previousValue?: number;
  lastUpdated: string;
}

/**
 * One pass over saved results: group metric values by calculator type, then
 * derive both the metric-card summaries (latest and previous value) and the
 * list of types with enough points for a trend chart.
 */
function useDashboardData(
  savedResults: { calculatorType: string; date: string; data: Record<string, unknown> }[]
): { summaries: MetricSummary[]; chartTypes: string[] } {
  return useMemo(() => {
    const grouped = new Map<string, { date: string; value: number }[]>();

    for (const r of savedResults) {
      if (!CALCULATOR_METRICS[r.calculatorType]) continue;
      const value = extractMetricValue(r.calculatorType, r.data);
      if (value === undefined) continue;

      const list = grouped.get(r.calculatorType) ?? [];
      list.push({ date: r.date, value });
      grouped.set(r.calculatorType, list);
    }

    const summaries: MetricSummary[] = [];
    const chartTypes: string[] = [];
    for (const [slug, points] of grouped) {
      const [latest, previous] = latestTwoByDate(points);
      if (!latest) continue;
      summaries.push({
        slug,
        latestValue: latest.value,
        previousValue: previous?.value,
        lastUpdated: latest.date,
      });
      if (points.length >= 2) chartTypes.push(slug);
    }

    return { summaries, chartTypes };
  }, [savedResults]);
}

export default function HealthDashboard(): React.JSX.Element {
  const { savedResults } = useSavedResults();
  const { summaries, chartTypes } = useDashboardData(savedResults);

  return (
    <div className="space-y-8">
      <h2 className="sr-only">Health Overview</h2>
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
