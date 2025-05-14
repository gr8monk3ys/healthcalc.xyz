'use client';

import React, { useMemo, useState } from 'react';

interface MiniChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

interface MiniChartProps {
  data: MiniChartDataPoint[];
  width?: number;
  height?: number;
  color?: string;
  showDots?: boolean;
  showArea?: boolean;
  className?: string;
}

const PADDING_X = 32;
const PADDING_TOP = 12;
const PADDING_BOTTOM = 24;

function formatDateShort(dateString: string): string {
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

function formatValue(value: number): string {
  if (Number.isInteger(value)) return String(value);
  return value.toFixed(1);
}

export default function MiniChart({
  data,
  width = 320,
  height = 140,
  color = 'var(--accent)',
  showDots = true,
  showArea = true,
  className = '',
}: MiniChartProps): React.JSX.Element | null {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sorted = useMemo(
    () => [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [data]
  );

  const { points, yMin, yMax, chartW, chartH } = useMemo(() => {
    if (sorted.length === 0) return { points: [], yMin: 0, yMax: 0, chartW: 0, chartH: 0 };

    const values = sorted.map(d => d.value);
    const rawMin = Math.min(...values);
    const rawMax = Math.max(...values);
    const range = rawMax - rawMin || 1;
    const padded = range * 0.1;
    const computedYMin = rawMin - padded;
    const computedYMax = rawMax + padded;
    const computedChartW = width - PADDING_X * 2;
    const computedChartH = height - PADDING_TOP - PADDING_BOTTOM;

    const computed = sorted.map((d, i) => {
      const x =
        sorted.length === 1
          ? PADDING_X + computedChartW / 2
          : PADDING_X + (i / (sorted.length - 1)) * computedChartW;
      const y =
        PADDING_TOP +
        computedChartH -
        ((d.value - computedYMin) / (computedYMax - computedYMin)) * computedChartH;
      return { x, y, ...d };
    });

    return {
      points: computed,
      yMin: computedYMin,
      yMax: computedYMax,
      chartW: computedChartW,
      chartH: computedChartH,
    };
  }, [sorted, width, height]);

  if (sorted.length === 0) return null;

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');

  const areaPath =
    linePath +
    ` L ${points[points.length - 1].x.toFixed(1)} ${(PADDING_TOP + chartH).toFixed(1)}` +
    ` L ${points[0].x.toFixed(1)} ${(PADDING_TOP + chartH).toFixed(1)} Z`;

  const gradientId = `mini-chart-grad-${color.replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Progress chart showing values over time"
        className="select-none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(frac => {
          const gy = PADDING_TOP + chartH * (1 - frac);
          return (
            <line
              key={frac}
              x1={PADDING_X}
              y1={gy}
              x2={PADDING_X + chartW}
              y2={gy}
              stroke="currentColor"
              strokeOpacity="0.08"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Area fill */}
        {showArea && points.length > 1 && <path d={areaPath} fill={`url(#${gradientId})`} />}

        {/* Line */}
        {points.length > 1 && (
          <path
            d={linePath}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Dots */}
        {showDots &&
          points.map((p, i) => (
            <circle
              key={`${p.date}-${p.value}-${p.x}`}
              cx={p.x}
              cy={p.y}
              r={hoveredIndex === i ? 4.5 : 3}
              fill={color}
              stroke="var(--glass-fill, #fff)"
              strokeWidth="1.5"
              className="transition-all duration-150"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <title>{`${formatDateShort(p.date)}: ${formatValue(p.value)}${p.label ? ` (${p.label})` : ''}`}</title>
            </circle>
          ))}

        {/* X-axis date labels */}
        {points.length <= 8
          ? points.map(p => (
              <text
                key={`label-${p.date}-${p.x}`}
                x={p.x}
                y={height - 4}
                textAnchor="middle"
                fontSize="9"
                fill="currentColor"
                opacity="0.5"
              >
                {formatDateShort(p.date)}
              </text>
            ))
          : [0, Math.floor(points.length / 2), points.length - 1].map(i => (
              <text
                key={`summary-label-${points[i].date}-${points[i].x}`}
                x={points[i].x}
                y={height - 4}
                textAnchor="middle"
                fontSize="9"
                fill="currentColor"
                opacity="0.5"
              >
                {formatDateShort(points[i].date)}
              </text>
            ))}

        {/* Y-axis labels */}
        <text
          x={PADDING_X - 4}
          y={PADDING_TOP + 3}
          textAnchor="end"
          fontSize="9"
          fill="currentColor"
          opacity="0.4"
        >
          {formatValue(yMax)}
        </text>
        <text
          x={PADDING_X - 4}
          y={PADDING_TOP + chartH + 3}
          textAnchor="end"
          fontSize="9"
          fill="currentColor"
          opacity="0.4"
        >
          {formatValue(yMin)}
        </text>
      </svg>

      {/* Hover tooltip */}
      {hoveredIndex !== null && points[hoveredIndex] && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-lg px-2 py-1 text-xs font-medium shadow-md glass-panel"
          style={{
            left: `${(points[hoveredIndex].x / width) * 100}%`,
            top: `${(points[hoveredIndex].y / height) * 100}%`,
          }}
        >
          <span className="font-bold" style={{ color }}>
            {formatValue(points[hoveredIndex].value)}
          </span>
          <span className="ml-1 opacity-60">{formatDateShort(points[hoveredIndex].date)}</span>
        </div>
      )}
    </div>
  );
}
