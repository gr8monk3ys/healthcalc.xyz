'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from '@/context/LocaleContext';

interface CalculatorCardProps {
  title: string;
  description: string;
  path: string;
  icon?: React.ReactNode;
}

/**
 * A catalog entry: title under a medium rule, one line of description, and
 * the action. The whole cell is the link.
 */
function CalculatorCard({ title, description, path, icon }: CalculatorCardProps) {
  const { localizePath, t } = useLocale();
  return (
    <Link href={localizePath(path)} className="group block h-full">
      <div className="flex h-full flex-col border-t-4 border-ink pt-3 pb-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h2 className="text-xl font-extrabold tracking-tight underline-offset-4 group-hover:underline">
            {title}
          </h2>
          {icon ? <span className="mt-0.5 shrink-0 [&_svg]:h-6 [&_svg]:w-6">{icon}</span> : null}
        </div>
        <p className="mb-4 text-ink-2">{description}</p>
        <div className="mt-auto font-bold">
          <span className="group-hover:bg-mark group-hover:text-[#0b0b0b]">
            {t('calculatorCard.cta')}
          </span>{' '}
          <span aria-hidden="true">→</span>
        </div>
      </div>
    </Link>
  );
}

/** Memoized so parent re-renders do not re-render every card. */
export const MemoizedCalculatorCard = React.memo(CalculatorCard);

export default CalculatorCard;
