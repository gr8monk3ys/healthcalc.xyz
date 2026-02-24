'use client';

import React, { useMemo } from 'react';
import { CALCULATOR_METRICS, extractMetricValue } from '@/constants/calculatorMetrics';
import type { SavedResult } from '@/context/SavedResultsContext';

interface ProgressTimelineProps {
  savedResults: SavedResult[];
}

interface TimelineEvent {
  date: string;
  title: string;
  detail: string;
}

function toDayKey(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '';
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function daysBetween(a: string, b: string): number {
  const aDate = new Date(a);
  const bDate = new Date(b);
  if (Number.isNaN(aDate.getTime()) || Number.isNaN(bDate.getTime())) return 0;

  const utcA = Date.UTC(aDate.getUTCFullYear(), aDate.getUTCMonth(), aDate.getUTCDate());
  const utcB = Date.UTC(bDate.getUTCFullYear(), bDate.getUTCMonth(), bDate.getUTCDate());
  return Math.round((utcA - utcB) / (1000 * 60 * 60 * 24));
}

function formatValue(value: number): string {
  if (Number.isInteger(value)) return String(value);
  return value.toFixed(1);
}

export default function ProgressTimeline({
  savedResults,
}: ProgressTimelineProps): React.JSX.Element | null {
  const computed = useMemo(() => {
    if (savedResults.length === 0) return null;

    const sortedNewest = [...savedResults].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const sortedOldest = [...sortedNewest].reverse();
    const first = sortedOldest[0];
    const latest = sortedNewest[0];

    const uniqueDayKeys = Array.from(
      new Set(sortedNewest.map(r => toDayKey(r.date)).filter(Boolean))
    );
    let streak = uniqueDayKeys.length > 0 ? 1 : 0;
    for (let i = 1; i < uniqueDayKeys.length; i += 1) {
      if (daysBetween(uniqueDayKeys[i - 1], uniqueDayKeys[i]) === 1) {
        streak += 1;
      } else {
        break;
      }
    }

    const uniqueCalculatorCount = new Set(savedResults.map(r => r.calculatorType)).size;

    const grouped = new Map<string, { date: string; value: number }[]>();
    for (const result of savedResults) {
      const value = extractMetricValue(result.calculatorType, result.data);
      if (value === undefined) continue;

      const list = grouped.get(result.calculatorType) ?? [];
      list.push({ date: result.date, value });
      grouped.set(result.calculatorType, list);
    }

    let biggestImprovement: {
      slug: string;
      label: string;
      unit?: string;
      deltaRaw: number;
      normalizedImprovement: number;
      date: string;
    } | null = null;

    const groupedEntries = Array.from(grouped.entries());
    for (let index = 0; index < groupedEntries.length; index += 1) {
      const [slug, points] = groupedEntries[index];
      const metric = CALCULATOR_METRICS[slug];
      if (!metric || metric.higherIsBetter === undefined || points.length < 2) continue;

      const sorted = points.sort(
        (a: { date: string }, b: { date: string }) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      const deltaRaw = sorted[sorted.length - 1].value - sorted[0].value;
      const normalizedImprovement = metric.higherIsBetter ? deltaRaw : -deltaRaw;

      if (normalizedImprovement <= 0) continue;

      if (!biggestImprovement || normalizedImprovement > biggestImprovement.normalizedImprovement) {
        biggestImprovement = {
          slug,
          label: metric.label,
          unit: metric.unit,
          deltaRaw,
          normalizedImprovement,
          date: sorted[sorted.length - 1].date,
        };
      }
    }

    const badges: string[] = [];
    if (savedResults.length >= 10) badges.push('Consistency');
    if (streak >= 7) badges.push('7-day streak');
    if (uniqueCalculatorCount >= 4) badges.push('Cross-metric tracker');
    if (biggestImprovement) badges.push('Improvement unlocked');

    const events: TimelineEvent[] = [
      {
        date: first.date,
        title: 'First calculation saved',
        detail: `Started tracking with ${first.calculatorName}.`,
      },
      {
        date: latest.date,
        title: 'Latest dashboard update',
        detail: `Most recent entry from ${latest.calculatorName}.`,
      },
    ];

    if (streak >= 2) {
      events.push({
        date: latest.date,
        title: `${streak}-day tracking streak`,
        detail: 'Consistent logging improves trend reliability.',
      });
    }

    if (biggestImprovement) {
      const deltaPrefix = biggestImprovement.deltaRaw >= 0 ? '+' : '';
      events.push({
        date: biggestImprovement.date,
        title: `Biggest improvement: ${biggestImprovement.label}`,
        detail: `${deltaPrefix}${formatValue(biggestImprovement.deltaRaw)}${biggestImprovement.unit ? ` ${biggestImprovement.unit}` : ''} vs baseline.`,
      });
    }

    for (const result of sortedNewest.slice(0, 3)) {
      events.push({
        date: result.date,
        title: `${result.calculatorName} saved`,
        detail: 'Added to your long-term progress history.',
      });
    }

    const deduped = Array.from(
      new Map(events.map(event => [`${event.date}-${event.title}`, event])).values()
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return {
      badges,
      events: deduped.slice(0, 6),
      streak,
      uniqueCalculatorCount,
    };
  }, [savedResults]);

  if (!computed) return null;

  return (
    <section className="glass-panel rounded-xl p-5">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Progress Timeline</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Milestones from your saved results and behavior patterns.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {computed.badges.length > 0 ? (
          computed.badges.map(badge => (
            <span
              key={badge}
              className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent"
            >
              {badge}
            </span>
          ))
        ) : (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Keep saving results to unlock streak and improvement badges.
          </span>
        )}
      </div>

      <ol className="space-y-3">
        {computed.events.map(event => (
          <li key={`${event.date}-${event.title}`} className="relative pl-6">
            <span className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full bg-accent" />
            <p className="text-sm font-semibold">{event.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(event.date)} • {event.detail}
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        Tracking span: {computed.streak > 0 ? `${computed.streak} day streak` : 'No streak yet'} •{' '}
        {computed.uniqueCalculatorCount} calculator types recorded.
      </p>
    </section>
  );
}
