'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import type { jsPDF } from 'jspdf';
import Breadcrumb from '@/components/Breadcrumb';
import { useSavedResults } from '@/context/SavedResultsContext';
import { useLocale } from '@/context/LocaleContext';
import { CALCULATOR_METRICS, extractMetricValue } from '@/constants/calculatorMetrics';
import { createLogger } from '@/utils/logger';

interface ReportSectionConfig {
  id: string;
  title: string;
  description: string;
  calculatorSlugs: string[];
}

interface ReportRow {
  calculatorSlug: string;
  label: string;
  unit?: string;
  latestValue: number;
  previousValue?: number;
  trendDelta?: number;
  healthyRangeText: string;
  lastUpdated: string;
}

interface ReportSection extends ReportSectionConfig {
  rows: ReportRow[];
}

const logger = createLogger({ component: 'ReportPageClient' });

const REPORT_SECTIONS: ReportSectionConfig[] = [
  {
    id: 'body',
    title: 'Body Composition',
    description: 'Weight status, fat profile, and body composition signals.',
    calculatorSlugs: ['bmi', 'body-fat', 'lean-body-mass', 'ffmi', 'ideal-weight'],
  },
  {
    id: 'nutrition',
    title: 'Nutrition',
    description: 'Calorie and macro targets connected to your current goals.',
    calculatorSlugs: ['macro', 'protein', 'calorie-deficit', 'tdee', 'bmr'],
  },
  {
    id: 'cardio',
    title: 'Cardiovascular Fitness',
    description: 'Heart and endurance markers that influence long-term health.',
    calculatorSlugs: ['vo2-max', 'resting-heart-rate', 'max-heart-rate'],
  },
  {
    id: 'hydration',
    title: 'Hydration & Recovery',
    description: 'Hydration and recovery metrics supporting day-to-day performance.',
    calculatorSlugs: ['water-intake', 'sleep'],
  },
];

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatValue(value: number): string {
  if (Number.isInteger(value)) return String(value);
  return value.toFixed(1);
}

function toHealthyRangeText(slug: string, value: number): string {
  const metric = CALCULATOR_METRICS[slug];
  const range = metric?.healthyRange;
  if (!range) return 'No fixed range';

  if (value < range.min) {
    return `Below target (${range.min}-${range.max})`;
  }

  if (value > range.max) {
    return `Above target (${range.min}-${range.max})`;
  }

  return `In target (${range.min}-${range.max})`;
}

function ensurePdfSpace(doc: jsPDF, y: number, neededHeight: number, margin: number): number {
  const pageHeight = doc.internal.pageSize.getHeight();
  if (y + neededHeight <= pageHeight - margin) {
    return y;
  }

  doc.addPage();
  return margin;
}

function drawWrappedPdfText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight = 13
): number {
  const linesRaw = doc.splitTextToSize(text, maxWidth);
  const lines = Array.isArray(linesRaw) ? linesRaw : [linesRaw];
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

async function exportReportPdf(
  summary: {
    totalEntries: number;
    calculatorsTracked: number;
    generatedAt: string;
  },
  sections: ReportSection[]
): Promise<void> {
  const { jsPDF: JsPdfClass } = await import('jspdf');
  const doc = new JsPdfClass({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter',
  });

  const margin = 44;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - margin * 2;

  let y = margin;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(15, 23, 42);
  doc.text('HealthCheck Report', margin, y);
  y += 28;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(71, 85, 105);
  y = drawWrappedPdfText(
    doc,
    `Generated ${formatDate(summary.generatedAt)} | ${summary.totalEntries} saved entries | ${summary.calculatorsTracked} calculators tracked`,
    margin,
    y,
    contentWidth,
    14
  );
  y += 14;

  for (const section of sections) {
    y = ensurePdfSpace(doc, y, 72, margin);

    doc.setDrawColor(203, 213, 225);
    doc.line(margin, y - 8, pageWidth - margin, y - 8);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(15, 23, 42);
    doc.text(section.title, margin, y + 12);
    y += 30;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    y = drawWrappedPdfText(doc, section.description, margin, y, contentWidth, 13);
    y += 8;

    if (section.rows.length === 0) {
      y = ensurePdfSpace(doc, y, 22, margin);
      doc.setTextColor(100, 116, 139);
      doc.text('No saved metrics in this section yet.', margin, y);
      y += 18;
      continue;
    }

    for (const row of section.rows) {
      y = ensurePdfSpace(doc, y, 56, margin);

      const latestValue = `${formatValue(row.latestValue)}${row.unit ? ` ${row.unit}` : ''}`;
      const trendValue =
        typeof row.trendDelta === 'number'
          ? `${row.trendDelta >= 0 ? '+' : ''}${formatValue(row.trendDelta)}${row.unit ? ` ${row.unit}` : ''}`
          : 'No prior value';

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      y = drawWrappedPdfText(doc, `${row.label}: ${latestValue}`, margin, y, contentWidth);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
      y = drawWrappedPdfText(
        doc,
        `Trend: ${trendValue} | Status: ${row.healthyRangeText} | Updated: ${formatDate(row.lastUpdated)}`,
        margin + 10,
        y + 2,
        contentWidth - 10,
        12
      );
      y += 8;
    }
  }

  y = ensurePdfSpace(doc, y, 48, margin);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  drawWrappedPdfText(
    doc,
    'Educational use only. Review with a licensed healthcare professional before changing treatment, nutrition, or training plans.',
    margin,
    y,
    contentWidth,
    11
  );

  const pageCount = doc.getNumberOfPages();
  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text(`Page ${page} of ${pageCount}`, pageWidth - margin, pageHeight - 18, {
      align: 'right',
    });
  }

  const dateStamp = new Date().toISOString().slice(0, 10);
  doc.save(`healthcheck-report-${dateStamp}.pdf`);
}

export default function ReportPageClient(): React.JSX.Element {
  const { savedResults } = useSavedResults();
  const { localizePath } = useLocale();
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const reportRowsBySection = useMemo<ReportSection[]>(() => {
    const groupedBySlug = new Map<string, { value: number; date: string }[]>();

    for (const result of savedResults) {
      const value = extractMetricValue(result.calculatorType, result.data);
      if (value === undefined) continue;

      const current = groupedBySlug.get(result.calculatorType) ?? [];
      current.push({ value, date: result.date });
      groupedBySlug.set(result.calculatorType, current);
    }

    return REPORT_SECTIONS.map(section => {
      const rows: ReportRow[] = [];

      for (const slug of section.calculatorSlugs) {
        const points = groupedBySlug.get(slug);
        if (!points || points.length === 0) continue;

        const sorted = points.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        const latest = sorted[0];
        const previous = sorted[1];
        const metric = CALCULATOR_METRICS[slug];

        rows.push({
          calculatorSlug: slug,
          label: metric?.label ?? slug,
          unit: metric?.unit,
          latestValue: latest.value,
          previousValue: previous?.value,
          trendDelta: previous ? latest.value - previous.value : undefined,
          healthyRangeText: toHealthyRangeText(slug, latest.value),
          lastUpdated: latest.date,
        });
      }

      return {
        ...section,
        rows,
      };
    });
  }, [savedResults]);

  const summary = useMemo(() => {
    const uniqueCalculators = new Set(savedResults.map(result => result.calculatorType));
    return {
      totalEntries: savedResults.length,
      calculatorsTracked: uniqueCalculators.size,
      generatedAt: new Date().toISOString(),
    };
  }, [savedResults]);

  const hasData = summary.totalEntries > 0;

  const handleDownloadPdf = async () => {
    if (!hasData || isDownloadingPdf) return;

    setIsDownloadingPdf(true);
    try {
      await exportReportPdf(summary, reportRowsBySection);
    } catch (error) {
      logger.logError('Failed to export report PDF', error);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl print:max-w-none">
      <div className="print:hidden">
        <Breadcrumb />
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div>
          <h1 className="text-3xl font-bold">Printable Health Report</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Snapshot generated from your saved calculator results.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={!hasData || isDownloadingPdf}
            className="ui-btn-primary"
          >
            {isDownloadingPdf ? 'Generating PDF...' : 'Download PDF'}
          </button>
          <Link href={localizePath('/saved-results')} className="ui-btn-soft">
            Back to Dashboard
          </Link>
        </div>
      </div>

      {!hasData ? (
        <div className="glass-panel rounded-xl p-6">
          <h2 className="mb-2 text-lg font-semibold">No saved data yet</h2>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
            Save calculator results first, then return here to generate a printable report.
          </p>
          <Link href={localizePath('/saved-results')} className="ui-btn-primary inline-flex">
            Go to Saved Results
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6 grid gap-3 sm:grid-cols-3">
            <div className="glass-panel rounded-xl p-4">
              <p className="text-xs uppercase tracking-wide opacity-60">Total Entries</p>
              <p className="text-2xl font-bold">{summary.totalEntries}</p>
            </div>
            <div className="glass-panel rounded-xl p-4">
              <p className="text-xs uppercase tracking-wide opacity-60">Calculators Tracked</p>
              <p className="text-2xl font-bold">{summary.calculatorsTracked}</p>
            </div>
            <div className="glass-panel rounded-xl p-4">
              <p className="text-xs uppercase tracking-wide opacity-60">Generated</p>
              <p className="text-sm font-semibold">{formatDate(summary.generatedAt)}</p>
            </div>
          </div>

          <div className="space-y-6">
            {reportRowsBySection.map(section => (
              <section key={section.id} className="glass-panel rounded-xl p-5">
                <h2 className="text-xl font-semibold">{section.title}</h2>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                  {section.description}
                </p>

                {section.rows.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No saved metrics in this section yet.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-200/60 dark:border-slate-700/60">
                          <th className="py-2 pr-3">Metric</th>
                          <th className="py-2 pr-3">Latest</th>
                          <th className="py-2 pr-3">Trend</th>
                          <th className="py-2 pr-3">Status</th>
                          <th className="py-2">Updated</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.rows.map(row => (
                          <tr
                            key={row.calculatorSlug}
                            className="border-b border-slate-100/60 align-top dark:border-slate-800/80"
                          >
                            <td className="py-2 pr-3 font-medium">{row.label}</td>
                            <td className="py-2 pr-3">
                              {formatValue(row.latestValue)}
                              {row.unit ? ` ${row.unit}` : ''}
                            </td>
                            <td className="py-2 pr-3">
                              {typeof row.trendDelta === 'number'
                                ? `${row.trendDelta >= 0 ? '+' : ''}${formatValue(row.trendDelta)}`
                                : '—'}
                            </td>
                            <td className="py-2 pr-3">{row.healthyRangeText}</td>
                            <td className="py-2">{formatDate(row.lastUpdated)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </div>
        </>
      )}

      <p className="mt-6 text-xs text-gray-500 print:mt-8">
        Educational use only. Review with a licensed healthcare professional before changing
        treatment, nutrition, or training plans.
      </p>
    </div>
  );
}
