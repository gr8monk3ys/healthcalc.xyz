'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SavedResultsList } from '@/components/SaveResult';
import { useAuth } from '@/context/AuthContext';
import { useSavedResults } from '@/context/SavedResultsContext';
import { useLocale } from '@/context/LocaleContext';
import AuthModal from '@/components/auth/AuthModal';
import HealthDashboard from '@/components/dashboard/HealthDashboard';

type Tab = 'dashboard' | 'all-results';

export default function SavedResultsPage() {
  const { isAuthenticated, supabaseEnabled } = useAuth();
  const { savedResults, syncPromptPending, confirmSync, dismissSync } = useSavedResults();
  const { localizePath, t } = useLocale();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  // When Supabase is enabled, show results for both guest and authenticated users.
  // The sign-in prompt appears alongside the results rather than replacing them.
  const showResults = supabaseEnabled
    ? savedResults.length > 0 || isAuthenticated
    : isAuthenticated;

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-2 text-3xl font-bold">{t('savedResults.page.title')}</h1>
      <p className="mb-6 text-gray-600">{t('savedResults.page.subtitle')}</p>

      {/* Tab toggle */}
      <div className="mb-6 flex gap-1 rounded-lg bg-[var(--glass-fill,rgba(255,255,255,0.08))] p-1">
        <button
          type="button"
          onClick={() => setActiveTab('dashboard')}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'dashboard'
              ? 'bg-[var(--accent)] text-white shadow-sm'
              : 'text-[var(--foreground)] opacity-60 hover:opacity-100'
          }`}
        >
          Dashboard
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('all-results')}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'all-results'
              ? 'bg-[var(--accent)] text-white shadow-sm'
              : 'text-[var(--foreground)] opacity-60 hover:opacity-100'
          }`}
        >
          All Results
        </button>
      </div>

      {/* Sync prompt banner */}
      {syncPromptPending && (
        <div className="glass-panel mb-6 flex flex-col gap-3 rounded-xl p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--foreground)]">
            You have saved results from before signing in. Sync them to your account?
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={confirmSync}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-all hover:-translate-y-0.5"
            >
              Sync now
            </button>
            <button
              type="button"
              onClick={dismissSync}
              className="elevated-pill rounded-lg px-4 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Sign-in prompt for Supabase-enabled but unauthenticated users */}
      {supabaseEnabled && !isAuthenticated && (
        <div className="neumorph mb-6 rounded-lg p-6">
          <h2 className="mb-2 text-xl font-semibold">Sign in to sync your results</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Create an account to save your calculator results to the cloud. Access them from any
            device, any time.
          </p>
          <button
            type="button"
            onClick={() => setAuthModalOpen(true)}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-all hover:-translate-y-0.5"
          >
            Sign in with email
          </button>
          <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
        </div>
      )}

      {/* Dashboard tab */}
      {activeTab === 'dashboard' && <HealthDashboard />}

      {/* All Results tab */}
      {activeTab === 'all-results' && (
        <>
          {showResults ? (
            <SavedResultsList />
          ) : !supabaseEnabled ? (
            <div className="neumorph rounded-lg p-6">
              <h2 className="mb-2 text-xl font-semibold">
                {t('savedResults.page.signedOut.title')}
              </h2>
              <p className="mb-4 text-gray-700">{t('savedResults.page.signedOut.body')}</p>
              <Link href={localizePath('/')} className="text-accent font-medium hover:underline">
                {t('savedResults.page.signedOut.cta')} <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          ) : (
            <div className="neumorph rounded-lg p-6">
              <p className="text-gray-600 dark:text-gray-400">
                No saved results yet. Use any calculator and save your results to see them here.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
