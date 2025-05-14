'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Reviewer } from '@/constants/reviewers';

interface ReviewedByProps {
  reviewer: Reviewer;
  lastReviewed: string;
  className?: string;
}

function formatReviewDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

const ShieldIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M10 1a1 1 0 01.707.293l6 6A1 1 0 0117 8v5a7 7 0 01-14 0V8a1 1 0 01.293-.707l6-6A1 1 0 0110 1zm0 2.414L4 9.414V13a5 5 0 0010 0V9.414L10 3.414z"
      clipRule="evenodd"
    />
    <path d="M9 11.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L9 11.586z" />
  </svg>
);

const ReviewedBy: React.FC<ReviewedByProps> = ({ reviewer, lastReviewed, className = '' }) => {
  return (
    <Link
      href="/about/editorial"
      className={`group mt-6 flex items-center gap-3 rounded-xl border border-slate-200/60 bg-white/50 px-4 py-3 backdrop-blur-sm transition-all duration-200 hover:border-accent/30 hover:bg-white/70 dark:border-slate-700/50 dark:bg-slate-800/40 dark:hover:border-accent/30 dark:hover:bg-slate-800/60 ${className}`}
      aria-label={`Reviewed by ${reviewer.name}. Learn about our editorial process.`}
    >
      {/* Reviewer avatar or initials */}
      {reviewer.imageUrl ? (
        <Image
          src={reviewer.imageUrl}
          alt=""
          width={36}
          height={36}
          className="h-9 w-9 rounded-full object-cover"
          aria-hidden="true"
        />
      ) : (
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent"
          aria-hidden="true"
        >
          {getInitials(reviewer.name)}
        </span>
      )}

      {/* Text content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <ShieldIcon className="h-3.5 w-3.5 shrink-0 text-green-600 dark:text-green-400" />
          <span className="text-sm font-medium leading-tight text-slate-800 dark:text-slate-200">
            {reviewer.name}
            {reviewer.credentials && (
              <span className="text-slate-500 dark:text-slate-400">, {reviewer.credentials}</span>
            )}
          </span>
        </div>
        <p className="mt-0.5 text-xs leading-tight text-slate-500 dark:text-slate-400">
          {reviewer.title} &middot; Last reviewed {formatReviewDate(lastReviewed)}
        </p>
      </div>

      {/* Arrow hint */}
      <svg
        className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
};

export default ReviewedBy;
