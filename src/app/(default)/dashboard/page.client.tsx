'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import AuthModal from '@/components/auth/AuthModal';
import HealthDashboard from '@/components/dashboard/HealthDashboard';
import { useAuth } from '@/context/AuthContext';
import { useSavedResults } from '@/context/SavedResultsContext';
import { useLocale } from '@/context/LocaleContext';

export default function DashboardPageClient() {
  const { isAuthenticated, supabaseEnabled } = useAuth();
  const { savedResults, syncPromptPending, confirmSync, dismissSync } = useSavedResults();
  const { localizePath } = useLocale();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const showDashboard = supabaseEnabled
    ? savedResults.length > 0 || isAuthenticated
    : isAuthenticated;

  return (
    <div className="mx-auto max-w-5xl">
      <Breadcrumb />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Health Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Trends, milestones, and quick next actions based on your saved metrics.
          </p>
        </div>

        <div className="flex gap-2">
          <Link href={localizePath('/report')} className="ui-btn-soft">
            Printable Report
          </Link>
          <Link href={localizePath('/fitness-age')} className="ui-btn-primary">
            Fitness Age Quiz
          </Link>
        </div>
      </div>

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

      {supabaseEnabled && !isAuthenticated && (
        <div className="neumorph mb-6 rounded-lg p-6">
          <h2 className="mb-2 text-xl font-semibold">Sign in to sync your dashboard</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Save your trends to the cloud and keep your dashboard in sync across devices.
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

      {showDashboard ? (
        <HealthDashboard />
      ) : (
        <div className="neumorph rounded-lg p-6">
          <h2 className="mb-2 text-xl font-semibold">No dashboard data yet</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Use calculators and save results to unlock trend tracking and milestones.
          </p>
          <Link
            href={localizePath('/calculators')}
            className="text-accent font-medium hover:underline"
          >
            Browse calculators <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      )}
    </div>
  );
}
