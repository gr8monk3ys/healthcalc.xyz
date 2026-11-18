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
    success: 'bg-emerald-600',
    warning: 'bg-amber-500',
    danger: 'bg-red-600',
    info: 'bg-accent',
  };

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      <span className={`absolute inset-x-0 top-0 h-1.5 ${statusBars[status]}`} />
      <div className="flex items-start pt-1.5">
        {icon && (
          <div className={`mr-4 ${statusColors[status]}`} aria-hidden="true">
            {icon}
          </div>
        )}

        <div className="flex-1">
          <h3 className="mb-1 text-sm font-bold text-ink-2">{title}</h3>

          <div className="flex items-baseline gap-1.5">
            <span
              className={`text-4xl font-black tracking-tight tabular-nums ${statusColors[status]}`}
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
