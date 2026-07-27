'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from '@/context/LocaleContext';

export type CalculatorCardTone = 'indigo' | 'teal' | 'rose' | 'amber' | 'sky' | 'emerald';

interface CalculatorCardProps {
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  /** Hue for the icon chip, used to visually differentiate categories */
  tone?: CalculatorCardTone;
}

const TONE_STYLES: Record<CalculatorCardTone, string> = {
  indigo:
    'bg-gradient-to-br from-indigo-500/18 via-indigo-500/10 to-transparent text-indigo-600 dark:text-indigo-300',
  teal: 'bg-gradient-to-br from-teal-500/18 via-teal-500/10 to-transparent text-teal-600 dark:text-teal-300',
  rose: 'bg-gradient-to-br from-rose-500/18 via-rose-500/10 to-transparent text-rose-600 dark:text-rose-300',
  amber:
    'bg-gradient-to-br from-amber-500/20 via-amber-500/10 to-transparent text-amber-600 dark:text-amber-300',
  sky: 'bg-gradient-to-br from-sky-500/18 via-sky-500/10 to-transparent text-sky-600 dark:text-sky-300',
  emerald:
    'bg-gradient-to-br from-emerald-500/18 via-emerald-500/10 to-transparent text-emerald-600 dark:text-emerald-300',
};

/**
 * Calculator card component that displays a calculator with a title, description, and icon
 * @param title - The calculator title
 * @param description - The calculator description
 * @param path - The path to the calculator page
 * @param icon - The calculator icon
 * @param tone - Optional hue for the icon chip
 * @returns A card component with a link to the calculator
 */
function CalculatorCard({ title, description, path, icon, tone = 'indigo' }: CalculatorCardProps) {
  const { localizePath, t } = useLocale();
  return (
    <Link href={localizePath(path)} className="group block h-full">
      <div className="glass-panel-strong card-interactive flex h-full flex-col rounded-3xl p-6">
        <div className="flex items-start mb-4">
          <div
            className={`mr-4 rounded-2xl p-2.5 transition-transform duration-300 group-hover:scale-110 ${TONE_STYLES[tone]}`}
          >
            {icon}
          </div>
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        </div>
        <p className="mb-4 text-slate-700 dark:text-slate-300">{description}</p>
        <div className="mt-auto font-semibold text-accent">
          {t('calculatorCard.cta')}{' '}
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

/**
 * Memoized version of the CalculatorCard component
 * This prevents unnecessary re-renders when parent components re-render
 */
export const MemoizedCalculatorCard = React.memo(CalculatorCard);

// For backward compatibility and to maintain existing import structure
export default CalculatorCard;
