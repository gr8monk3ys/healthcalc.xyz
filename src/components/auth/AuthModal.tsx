'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps): React.JSX.Element | null {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else {
      // Reset state when modal closes.
      setEmail('');
      setStatus('idle');
      setErrorMessage('');
    }
  }, [open]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim()) return;

      setStatus('sending');
      setErrorMessage('');

      const result = await signIn(email.trim());
      if (result.error) {
        setStatus('error');
        setErrorMessage(result.error);
      } else {
        setStatus('sent');
      }
    },
    [email, signIn]
  );

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="presentation"
    >
      <dialog
        ref={dialogRef}
        open
        className="glass-panel relative m-0 w-full max-w-md rounded-2xl p-6 shadow-xl"
        aria-label="Sign in"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-[var(--foreground)] opacity-60 transition-opacity hover:opacity-100"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="mb-1 text-xl font-bold text-[var(--foreground)]">Sign in to HealthCheck</h2>
        <p className="mb-5 text-sm text-[var(--foreground)] opacity-70">
          Save your calculator results to the cloud so you can access them from any device.
        </p>

        {status === 'sent' ? (
          <div className="rounded-xl bg-green-100 p-4 text-center dark:bg-green-900/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-2 h-10 w-10 text-green-600 dark:text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <p className="font-semibold text-green-800 dark:text-green-200">Check your email</p>
            <p className="mt-1 text-sm text-green-700 dark:text-green-300">
              We sent a magic link to <strong>{email}</strong>. Click the link to sign in.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="auth-email"
                className="mb-1 block text-sm font-medium text-[var(--foreground)]"
              >
                Email address
              </label>
              <input
                ref={inputRef}
                id="auth-email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="neumorph-input w-full rounded-xl px-4 py-3 text-sm"
                disabled={status === 'sending'}
              />
            </div>

            {status === 'error' && errorMessage && (
              <p className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending' || !email.trim()}
              className="w-full rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : 'Send magic link'}
            </button>

            <p className="text-center text-xs text-[var(--foreground)] opacity-50">
              No password needed. We will email you a secure sign-in link.
            </p>
          </form>
        )}
      </dialog>
    </div>
  );
}
