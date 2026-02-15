'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useFunnelTracking } from '@/hooks/useFunnelTracking';

interface ResultsEmailCaptureProps {
  /** Optional custom headline */
  headline?: string;
  /** Optional custom description */
  description?: string;
  /** Optional className for outer wrapper */
  className?: string;
  /** Source identifier sent with the subscription request */
  source?: string;
}

interface SubmitState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Email capture component designed to appear directly after calculator results.
 * Positioned at the moment of highest user engagement for maximum conversion.
 * Submits to the existing /api/newsletter endpoint.
 */
export function ResultsEmailCapture({
  headline = 'Get personalized health insights',
  description = 'Track your progress and stay informed with evidence-based tips.',
  className = '',
  source = 'calculator',
}: ResultsEmailCaptureProps): React.ReactElement {
  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: 'idle',
    message: '',
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const { trackEvent } = useFunnelTracking();

  // Move focus to success message for screen reader announcement
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
          body: JSON.stringify({ email: trimmedEmail, source }),
        });

        const result = await response.json();

        if (result.success) {
          trackEvent('newsletter_subscribe', { source, placement: 'calculator_results' });
          setSubmitState({
            status: 'success',
            message: result.message || 'You are subscribed. Check your inbox to confirm.',
          });
          setEmail('');
        } else {
          setSubmitState({
            status: 'error',
            message: result.error || 'Something went wrong. Please try again.',
          });
        }
      } catch {
        setSubmitState({
          status: 'error',
          message: 'Could not connect. Please check your connection and try again.',
        });
      }
    },
    [email, source, trackEvent]
  );

  // Success state
  if (submitState.status === 'success') {
    return (
      <div
        className={`glass-panel-strong rounded-3xl p-7 md:p-8 ${className}`}
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          <div
            className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
            aria-hidden="true"
          >
            <svg
              className="w-5 h-5 text-green-600 dark:text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
              You are all set
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">{submitState.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-panel rounded-3xl p-7 md:p-8 ${className}`}>
      <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-1">{headline}</h3>
      <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">{description}</p>

      {/* Value proposition bullets */}
      <ul className="space-y-2 mb-5 text-sm text-slate-700 dark:text-slate-200/90">
        <li className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-accent flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>Weekly health and fitness tips</span>
        </li>
        <li className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-accent flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>Track your metrics over time</span>
        </li>
        <li className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-accent flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>New calculator and tool alerts</span>
        </li>
      </ul>

      {/* Email form */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="results-email-capture" className="sr-only">
              Email address
            </label>
            <input
              ref={inputRef}
              id="results-email-capture"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={submitState.status === 'loading'}
              className="ui-input text-sm disabled:opacity-60"
              aria-required="true"
              aria-invalid={submitState.status === 'error' ? true : undefined}
              aria-describedby={
                submitState.status === 'error'
                  ? 'results-email-capture-error'
                  : 'results-email-capture-privacy'
              }
              autoComplete="email"
            />
          </div>
          <button
            type="submit"
            disabled={submitState.status === 'loading'}
            className="ui-btn-primary text-sm whitespace-nowrap"
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
              'Get Insights'
            )}
          </button>
        </div>
      </form>

      {/* Error message */}
      {submitState.status === 'error' && (
        <p
          id="results-email-capture-error"
          role="alert"
          className="text-red-600 dark:text-red-400 text-sm mt-2"
        >
          {submitState.message}
        </p>
      )}

      {/* Privacy notice */}
      <p
        id="results-email-capture-privacy"
        className="text-xs text-slate-500 dark:text-slate-400 mt-3"
      >
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}

export default ResultsEmailCapture;
