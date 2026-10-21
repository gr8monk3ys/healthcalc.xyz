'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
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
  const dialogRef = useRef<HTMLDialogElement>(null);

  const resetFormState = useCallback(() => {
    setEmail('');
    setStatus('idle');
    setErrorMessage('');
  }, []);

  const handleClose = useCallback(() => {
    resetFormState();
    onClose();
  }, [onClose, resetFormState]);

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

  // A real modal dialog: showModal() moves focus inside, makes the page
  // behind inert, handles Escape (cancel event) and restores focus on close.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog || dialog.open) return;
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    // Keep the page behind from scrolling while the dialog is up.
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
      if (dialog.open) dialog.close();
    };
  }, [open]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      // Clicks on the ::backdrop land on the <dialog> element itself.
      if (e.target === e.currentTarget) {
        handleClose();
      }
    },
    [handleClose]
  );

  const handleCancel = useCallback(
    (e: React.SyntheticEvent<HTMLDialogElement>) => {
      e.preventDefault();
      handleClose();
    },
    [handleClose]
  );

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onCancel={handleCancel}
      className="glass-panel w-full max-w-md overscroll-contain rounded-2xl p-0 shadow-xl backdrop:bg-black/40 backdrop:backdrop-blur-sm"
      aria-labelledby="auth-modal-title"
    >
      <div className="relative p-6">
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-1 text-foreground opacity-60 transition-opacity hover:opacity-100"
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

        <h2 id="auth-modal-title" className="mb-1 text-xl font-bold text-foreground">
          Sign In to <span translate="no">HealthCalc</span>
        </h2>
        <p className="mb-5 text-sm text-foreground opacity-70">
          Save your calculator results to the cloud so you can access them from any device.
        </p>

        {status === 'sent' ? (
          <div
            className="rounded-xl bg-green-100 p-4 text-center dark:bg-green-900/30"
            role="status"
          >
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
            <p className="font-semibold text-green-800 dark:text-green-200">Check Your Email</p>
            <p className="mt-1 text-sm text-green-700 dark:text-green-300">
              We sent a magic link to <strong>{email}</strong>. Click the link to sign in.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="auth-email"
                className="mb-1 block text-sm font-medium text-foreground"
              >
                Email address
              </label>
              <input
                name="auth-email"
                spellCheck={false}
                id="auth-email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com…"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="neumorph-input w-full rounded-xl px-4 py-3 text-sm"
                disabled={status === 'sending'}
              />
            </div>

            {status === 'error' && errorMessage && (
              <p
                role="alert"
                className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300"
              >
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending…' : 'Send Magic Link'}
            </button>

            <p className="text-center text-xs text-foreground opacity-50">
              No password needed. We will email you a secure sign-in link.
            </p>
          </form>
        )}
      </div>
    </dialog>
  );
}
