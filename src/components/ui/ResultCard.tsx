import React, { ReactNode } from 'react';

interface ResultCardProps {
  title: string;
  value: string | number;
  unit?: string;
  description?: string;
  icon?: ReactNode;
  status?: 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

const STATUS_MARKERS = {
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  info: 'bg-info',
};

export default function ResultCard({
  title,
  value,
  unit,
  description,
  icon,
  status,
  className = '',
}: ResultCardProps) {
  return (
    <div className={className}>
      <div className="facts-row">
        <h3 className="flex items-baseline gap-2">
          {status && (
            <span
              data-status={status}
              className={`inline-block h-2.5 w-2.5 shrink-0 ${STATUS_MARKERS[status]}`}
              aria-hidden="true"
            />
          )}
          {icon && <span aria-hidden="true">{icon}</span>}
          {title}
        </h3>

        <p>
          <span className="text-2xl font-black tracking-tight">{value}</span>
          {unit && <span className="text-sm"> {unit}</span>}
        </p>
      </div>

      {description && <p className="text-sm text-ink-2">{description}</p>}
    </div>
  );
}
