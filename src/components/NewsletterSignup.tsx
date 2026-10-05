'use client';

import Link from 'next/link';
import React, { useId, useRef, useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { useFunnelTracking } from '@/hooks/useFunnelTracking';

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  buttonText?: string;
  className?: string;
  onSubmit?: (email: string) => Promise<{ success: boolean; message: string }>;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Newsletter signup component for email capture
 * Helps with user engagement and building an audience
 */
export default function NewsletterSignup({
  title,
  description,
  buttonText,
  className = '',
  onSubmit,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [fieldError, setFieldError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  // Unique per instance: this form can render more than once on a page.
  const baseId = useId();
  const inputId = `${baseId}-email`;
  const errorId = `${baseId}-email-error`;
  const privacyNoteId = `${baseId}-privacy-note`;
  const { trackEvent } = useFunnelTracking();
  const { localizePath, t } = useLocale();
  const resolvedTitle = title ?? t('newsletter.title');
  const resolvedDescription = description ?? t('newsletter.description');
  const resolvedButtonText = buttonText ?? t('newsletter.button');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !EMAIL_PATTERN.test(email)) {
      // Inline, next to the field, and focus the field so it can be fixed.
      setFieldError(t('newsletter.validation.invalidEmail'));
      inputRef.current?.focus();
      return;
    }

    setFieldError('');
    setLoading(true);
    setMessage(null);

    try {
      // If onSubmit prop is provided, use it
      if (onSubmit) {
        const result = await onSubmit(email);
        setMessage({
          text: result.message,
          type: result.success ? 'success' : 'error',
        });
        if (result.success) {
          trackEvent('newsletter_subscribe', {
            source: 'newsletter',
            placement: 'newsletter_signup',
          });
          setEmail('');
        }
      } else {
        // Call the newsletter API endpoint
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const result = await response.json();
        setMessage({
          text: result.success ? result.message : result.error,
          type: result.success ? 'success' : 'error',
        });

        if (result.success) {
          trackEvent('newsletter_subscribe', {
            source: 'newsletter',
            placement: 'newsletter_signup',
          });
          setEmail('');
        }
      }
    } catch {
      setMessage({
        text: t('newsletter.error.generic'),
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`neumorph p-6 rounded-lg ${className}`}>
      <h2 className="text-xl font-bold mb-2">{resolvedTitle}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{resolvedDescription}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor={inputId} className="sr-only">
            {t('newsletter.emailLabel')}
          </label>
          <input
            ref={inputRef}
            spellCheck={false}
            id={inputId}
            type="email"
            placeholder={t('newsletter.emailPlaceholder')}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              if (fieldError) setFieldError('');
            }}
            className="ui-input w-full px-4 py-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-transparent"
            disabled={loading}
            autoComplete="email"
            inputMode="email"
            enterKeyHint="send"
            name="email"
            required
            aria-required="true"
            aria-invalid={fieldError ? true : undefined}
            aria-describedby={fieldError ? `${errorId} ${privacyNoteId}` : privacyNoteId}
          />
          {fieldError && (
            <p id={errorId} role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
              {fieldError}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={`ui-btn-primary w-full px-4 py-2 rounded-lg font-medium ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? t('newsletter.status.loading') : resolvedButtonText}
        </button>
      </form>

      {message && (
        <div
          className={`mt-4 p-3 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
          }`}
          role={message.type === 'error' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {message.text}
        </div>
      )}

      <p id={privacyNoteId} className="text-xs text-gray-500 dark:text-gray-400 mt-4">
        {t('newsletter.privacy.prefix')}{' '}
        <Link href={localizePath('/privacy')} className="text-accent hover:underline">
          {t('newsletter.privacy.privacyPolicy')}
        </Link>{' '}
        {t('newsletter.privacy.and')}{' '}
        <Link href={localizePath('/terms')} className="text-accent hover:underline">
          {t('newsletter.privacy.terms')}
        </Link>
        {t('newsletter.privacy.suffix')}
      </p>
    </div>
  );
}
