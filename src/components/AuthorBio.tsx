import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Reviewer } from '@/constants/reviewers';
import { REVIEWER_SARAH_CHEN } from '@/constants/reviewers';

interface AuthorBioProps {
  variant?: 'compact' | 'full';
  reviewer?: Reviewer;
  className?: string;
}

function InitialsAvatar({
  name,
  className = '',
}: {
  name: string;
  className?: string;
}): React.JSX.Element {
  const initials = name
    .split(' ')
    .map(w => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-accent/10 text-accent font-bold ${className}`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

export function AuthorBio({
  variant = 'compact',
  reviewer = REVIEWER_SARAH_CHEN,
  className = '',
}: AuthorBioProps): React.JSX.Element {
  const displayName = reviewer.credentials
    ? `${reviewer.name}, ${reviewer.credentials}`
    : reviewer.name;

  if (variant === 'compact') {
    return (
      <div
        className={`flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 ${className}`}
      >
        {reviewer.imageUrl ? (
          <Image
            src={reviewer.imageUrl}
            alt=""
            width={40}
            height={40}
            unoptimized
            className="h-10 w-10 rounded-full object-cover"
            aria-hidden="true"
          />
        ) : (
          <InitialsAvatar name={reviewer.name} className="h-10 w-10 text-sm" />
        )}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{displayName}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{reviewer.title}</p>
        </div>
        <Link
          href="/about/editorial"
          className="ml-auto shrink-0 text-xs font-medium text-accent hover:underline"
        >
          Our process
        </Link>
      </div>
    );
  }

  return (
    <div className={`neumorph rounded-lg p-6 ${className}`}>
      <div className="flex items-start gap-4">
        {reviewer.imageUrl ? (
          <Image
            src={reviewer.imageUrl}
            alt=""
            width={64}
            height={64}
            unoptimized
            className="h-16 w-16 rounded-full object-cover"
            aria-hidden="true"
          />
        ) : (
          <InitialsAvatar name={reviewer.name} className="h-16 w-16 text-xl" />
        )}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{displayName}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{reviewer.title}</p>
          {reviewer.bio && (
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">{reviewer.bio}</p>
          )}
          <Link
            href="/about/editorial"
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            Learn more about our editorial process
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
