import React, { ReactNode } from 'react';
import Card from './Card';

interface ResultCardProps {
  title: string;
  value: string | number;
  unit?: string;
  description?: string;
  icon?: ReactNode;
  status?: 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export default function ResultCard({
  title,
  value,
  unit,
  description,
  icon,
  status = 'info',
  className = '',
}: ResultCardProps) {
  const statusColors = {
    success: 'text-emerald-600 dark:text-emerald-400',
    warning: 'text-amber-600 dark:text-amber-400',
    danger: 'text-red-600 dark:text-red-400',
    info: 'text-accent',
  };

  const statusBars = {
    success: 'bg-emerald-500/70',
    warning: 'bg-amber-500/70',
    danger: 'bg-red-500/70',
    info: 'bg-accent/70',
  };

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      <span className={`absolute inset-y-3 left-0 w-1 rounded-r-full ${statusBars[status]}`} />
      <div className="flex items-start pl-2">
        {icon && (
          <div className={`mr-4 ${statusColors[status]}`} aria-hidden="true">
            {icon}
          </div>
        )}

        <div className="flex-1">
          <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400 mb-1">
            {title}
          </h3>

          <div className="flex items-baseline gap-1.5">
            <span
              className={`text-3xl font-extrabold tracking-tight tabular-nums ${statusColors[status]}`}
            >
              {value}
            </span>

            {unit && (
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{unit}</span>
            )}
          </div>

          {description && (
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
