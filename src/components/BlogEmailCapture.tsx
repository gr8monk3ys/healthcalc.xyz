'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';

interface BlogEmailCaptureProps {
  /** Optional custom headline */
  headline?: string;
  /** Optional className for outer wrapper */
  className?: string;
}

interface SubmitState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Compact email capture component for blog posts.
 * Smaller and less prominent than the calculator variant.
 * Designed to appear mid-article or at the bottom of blog content.
 */
export function BlogEmailCapture({
  headline = 'Want more health insights like this?',
  className = '',
}: BlogEmailCaptureProps): React.ReactElement {
  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: 'idle',
    message: '',
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitState.status === 'success' && successRef.current) {
      successRef.current.focus();
    }
  }, [submitState.status]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const trimmedEmail = email.trim();

      if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
        setSubmitState({
          status: 'error',
          message: 'Please enter a valid email address.',
        });
        inputRef.current?.focus();
        return;
      }

      setSubmitState({ status: 'loading', message: '' });

      try {
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmedEmail, source: 'blog' }),
        });

        const result = await response.json();

        if (result.success) {
          setSubmitState({
            status: 'success',
            message: result.message || 'You are subscribed. Check your inbox.',
          });
          setEmail('');
        } else {
          setSubmitState({
            status: 'error',
            message: result.message || 'Something went wrong. Please try again.',
          });
        }
      } catch {
        setSubmitState({
          status: 'error',
          message: 'Could not connect. Please try again later.',
        });
      }
    },
    [email]
  );

  // Success state -- compact confirmation
  if (submitState.status === 'success') {
    return (
      <div
        className={`neumorph rounded-lg p-5 ${className}`}
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{submitState.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`neumorph rounded-lg p-5 ${className}`}>
      <h3 className="font-semibold text-base text-gray-900 dark:text-white mb-3">{headline}</h3>

      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <label htmlFor="blog-email-capture" className="sr-only">
              Email address
            </label>
            <input
              ref={inputRef}
              id="blog-email-capture"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={submitState.status === 'loading'}
              className="w-full px-4 py-2 rounded-lg neumorph-inset focus:outline-none focus:ring-2 focus:ring-accent text-sm disabled:opacity-60"
              aria-required="true"
              aria-invalid={submitState.status === 'error' ? true : undefined}
              aria-describedby={
                submitState.status === 'error'
                  ? 'blog-email-capture-error'
                  : 'blog-email-capture-privacy'
              }
              autoComplete="email"
            />
          </div>
          <button
            type="submit"
            disabled={submitState.status === 'loading'}
            className="px-5 py-2 bg-accent text-white font-medium rounded-lg text-sm transition-colors hover:bg-accent/90 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {submitState.status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Subscribing...
              </span>
            ) : (
              'Subscribe'
            )}
          </button>
        </div>
      </form>

      {/* Error message */}
      {submitState.status === 'error' && (
        <p
          id="blog-email-capture-error"
          role="alert"
          className="text-red-600 dark:text-red-400 text-sm mt-2"
        >
          {submitState.message}
        </p>
      )}

      {/* Privacy notice */}
      <p id="blog-email-capture-privacy" className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}

export default BlogEmailCapture;
