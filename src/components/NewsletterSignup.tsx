'use client';

import React, { useState } from 'react';
import { useFunnelTracking } from '@/hooks/useFunnelTracking';

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  buttonText?: string;
  className?: string;
  onSubmit?: (email: string) => Promise<{ success: boolean; message: string }>;
}

/**
 * Newsletter signup component for email capture
 * Helps with user engagement and building an audience
 */
export default function NewsletterSignup({
  title = 'Subscribe to Our Newsletter',
  description = 'Get the latest health and fitness tips, calculator updates, and exclusive content delivered to your inbox.',
  buttonText = 'Subscribe',
  className = '',
  onSubmit,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const { trackEvent } = useFunnelTracking();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage({ text: 'Please enter a valid email address', type: 'error' });
      return;
    }

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
        text: 'An error occurred. Please try again later.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`neumorph p-6 rounded-lg ${className}`}>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="ui-input w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            disabled={loading}
            autoComplete="email"
            inputMode="email"
            enterKeyHint="send"
            name="email"
            required
            aria-required="true"
            aria-describedby="newsletter-privacy-note"
          />
        </div>

        <button
          type="submit"
          className={`ui-btn-primary w-full px-4 py-2 rounded-lg font-medium ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? 'Subscribing...' : buttonText}
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

      <p id="newsletter-privacy-note" className="text-xs text-gray-500 dark:text-gray-400 mt-4">
        By subscribing, you agree to our{' '}
        <a href="/privacy" className="text-accent hover:underline">
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href="/terms" className="text-accent hover:underline">
          Terms of Service
        </a>
        . We'll never share your email with anyone else.
      </p>
    </div>
  );
}
