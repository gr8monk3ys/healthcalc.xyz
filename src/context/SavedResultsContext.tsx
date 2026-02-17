'use client';

import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useAuth } from '@/context/AuthContext';
import { computeSavedResultKey } from '@/utils/savedResultsKey';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export interface SavedResult {
  id: string;
  calculatorType: string;
  calculatorName: string;
  date: string;
  data: Record<string, unknown>;
}

interface SavedResultsContextState {
  savedResults: SavedResult[];
  canSaveResults: boolean;
  saveResult: (
    calculatorType: string,
    calculatorName: string,
    data: Record<string, unknown>
  ) => boolean;
  removeResult: (id: string) => void;
  clearAllResults: () => void;
  isResultSaved: (id: string) => boolean;
  syncPromptPending: boolean;
  confirmSync: () => void;
  dismissSync: () => void;
}

const SavedResultsContext = createContext<SavedResultsContextState | undefined>(undefined);

interface SavedResultsProviderProps {
  children: ReactNode;
}

function generateResultId(type: string, resultData: Record<string, unknown>): string {
  return computeSavedResultKey(type, resultData);
}

function mergeSavedResults(local: SavedResult[], remote: SavedResult[]): SavedResult[] {
  const merged = new Map<string, SavedResult>();

  for (const item of [...remote, ...local]) {
    const existing = merged.get(item.id);
    if (!existing || item.date > existing.date) {
      merged.set(item.id, item);
    }
  }

  return Array.from(merged.values())
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 30);
}

// ---- Supabase helpers (client-side) ----

async function fetchResultsFromSupabase(): Promise<SavedResult[]> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('saved_results')
    .select('id, calculator_type, calculator_name, data, created_at')
    .order('created_at', { ascending: false })
    .limit(30);

  if (error || !data) return [];

  return data.map(row => ({
    id: String(row.id),
    calculatorType: String(row.calculator_type),
    calculatorName: String(row.calculator_name),
    date: String(row.created_at),
    data: (row.data ?? {}) as Record<string, unknown>,
  }));
}

async function upsertResultToSupabase(result: SavedResult, userId: string): Promise<void> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return;

  await supabase.from('saved_results').upsert(
    {
      id: result.id,
      user_id: userId,
      calculator_type: result.calculatorType,
      calculator_name: result.calculatorName,
      data: result.data,
      created_at: result.date,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'id' }
  );
}

async function deleteResultFromSupabase(id: string): Promise<void> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return;

  await supabase.from('saved_results').delete().eq('id', id);
}

async function clearResultsFromSupabase(userId: string): Promise<void> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return;

  await supabase.from('saved_results').delete().eq('user_id', userId);
}

// ---- Legacy fetch-based sync (fallback when Supabase is not enabled) ----

async function syncResultToServer(result: SavedResult): Promise<void> {
  try {
    await fetch('/api/saved-results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        calculatorType: result.calculatorType,
        calculatorName: result.calculatorName,
        data: result.data,
      }),
    });
  } catch {
    // Best-effort sync.
  }
}

async function deleteResultFromServer(id: string): Promise<void> {
  try {
    await fetch(`/api/saved-results/${encodeURIComponent(id)}`, { method: 'DELETE' });
  } catch {
    // Best-effort delete.
  }
}

async function clearResultsFromServer(): Promise<void> {
  try {
    await fetch('/api/saved-results', { method: 'DELETE' });
  } catch {
    // Best-effort delete.
  }
}

export function SavedResultsProvider({ children }: SavedResultsProviderProps): React.JSX.Element {
  const { user, isAuthenticated, supabaseEnabled } = useAuth();
  const [savedResultsByUser, setSavedResultsByUser] = useLocalStorage<
    Record<string, SavedResult[]>
  >('healthcheck-saved-results-by-user', {});

  // Track whether we should prompt to sync local guest results to the cloud.
  const [syncPromptPending, setSyncPromptPending] = useState(false);
  const syncPromptDismissedRef = useRef(false);

  const userKey = user?.email ?? 'guest';
  const savedResults = useMemo(
    () => savedResultsByUser[userKey] ?? [],
    [savedResultsByUser, userKey]
  );
  const savedResultsRef = useRef<SavedResult[]>(savedResults);
  savedResultsRef.current = savedResults;

  // Hydrate from Supabase when the user is authenticated and Supabase is enabled.
  useEffect(() => {
    if (!isAuthenticated || !user || !supabaseEnabled) return;
    const userId = user.id;
    let cancelled = false;

    async function hydrateFromSupabase() {
      try {
        const remoteResults = await fetchResultsFromSupabase();
        const localResults = savedResultsRef.current;

        const merged = mergeSavedResults(localResults, remoteResults);
        if (cancelled) return;

        setSavedResultsByUser(prev => ({
          ...prev,
          [userKey]: merged,
        }));

        // Push local-only items to Supabase.
        const remoteIds = new Set(remoteResults.map(r => r.id));
        const missingRemote = localResults.filter(r => !remoteIds.has(r.id));
        for (const result of missingRemote.slice(0, 30)) {
          void upsertResultToSupabase(result, userId);
        }

        // Check if there are guest results that should be offered for sync.
        const guestBucket = savedResultsByUser['guest'] ?? [];
        if (guestBucket.length > 0 && userKey !== 'guest' && !syncPromptDismissedRef.current) {
          setSyncPromptPending(true);
        }
      } catch {
        // Best-effort hydration.
      }
    }

    void hydrateFromSupabase();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, supabaseEnabled, user?.id, userKey]);

  // Hydrate from legacy server when Supabase is NOT enabled but user exists.
  useEffect(() => {
    if (!user || supabaseEnabled) return;
    let cancelled = false;

    async function hydrateFromServer() {
      try {
        const res = await fetch('/api/saved-results', { method: 'GET' });
        if (!res.ok) return;
        const payload = (await res.json()) as
          | { success: true; results: SavedResult[] }
          | { success: false; error: string };

        if (!payload.success || !Array.isArray(payload.results)) return;

        const remoteResults = payload.results;
        const localResults = savedResultsRef.current;
        const merged = mergeSavedResults(localResults, remoteResults);

        if (cancelled) return;
        setSavedResultsByUser(prev => ({
          ...prev,
          [userKey]: merged,
        }));

        const remoteIds = new Set(remoteResults.map(result => result.id));
        const missingLocal = localResults.filter(result => !remoteIds.has(result.id));
        for (const result of missingLocal.slice(0, 30)) {
          void syncResultToServer(result);
        }
      } catch {
        // Best-effort hydration.
      }
    }

    void hydrateFromServer();

    return () => {
      cancelled = true;
    };
  }, [setSavedResultsByUser, user, userKey, supabaseEnabled]);

  // Confirm sync: copy guest results into the authenticated user bucket and push to Supabase.
  const confirmSync = useCallback(() => {
    setSyncPromptPending(false);
    syncPromptDismissedRef.current = true;

    const guestResults = savedResultsByUser['guest'] ?? [];
    if (guestResults.length === 0 || !user) return;

    const merged = mergeSavedResults(savedResults, guestResults);
    setSavedResultsByUser(prev => ({
      ...prev,
      [userKey]: merged,
      guest: [], // Clear guest bucket after sync.
    }));

    if (supabaseEnabled) {
      for (const result of guestResults) {
        void upsertResultToSupabase(result, user.id);
      }
    }
  }, [savedResultsByUser, savedResults, setSavedResultsByUser, supabaseEnabled, user, userKey]);

  const dismissSync = useCallback(() => {
    setSyncPromptPending(false);
    syncPromptDismissedRef.current = true;
  }, []);

  function saveResult(
    calculatorType: string,
    calculatorName: string,
    data: Record<string, unknown>
  ): boolean {
    const resultId = generateResultId(calculatorType, data);

    if (savedResults.some(result => result.id === resultId)) {
      return false;
    }

    const newResult: SavedResult = {
      id: resultId,
      calculatorType,
      calculatorName,
      date: new Date().toISOString(),
      data,
    };

    const updatedForUser = [newResult, ...savedResults].slice(0, 30);
    setSavedResultsByUser(prev => ({
      ...prev,
      [userKey]: updatedForUser,
    }));

    // Persist to remote.
    if (isAuthenticated && user && supabaseEnabled) {
      void upsertResultToSupabase(newResult, user.id);
    } else if (user) {
      void syncResultToServer(newResult);
    }

    return true;
  }

  function removeResult(id: string): void {
    setSavedResultsByUser(prev => ({
      ...prev,
      [userKey]: (prev[userKey] ?? []).filter(result => result.id !== id),
    }));

    if (isAuthenticated && supabaseEnabled) {
      void deleteResultFromSupabase(id);
    } else {
      void deleteResultFromServer(id);
    }
  }

  function clearAllResults(): void {
    setSavedResultsByUser(prev => ({
      ...prev,
      [userKey]: [],
    }));

    if (isAuthenticated && user && supabaseEnabled) {
      void clearResultsFromSupabase(user.id);
    } else {
      void clearResultsFromServer();
    }
  }

  function isResultSaved(id: string): boolean {
    return savedResults.some(result => result.id === id);
  }

  // Allow saving even without authentication -- results go to localStorage
  // under the 'guest' key and can be synced later.
  const canSave = supabaseEnabled ? true : Boolean(user);

  const value: SavedResultsContextState = {
    savedResults,
    canSaveResults: canSave,
    saveResult,
    removeResult,
    clearAllResults,
    isResultSaved,
    syncPromptPending,
    confirmSync,
    dismissSync,
  };

  return <SavedResultsContext.Provider value={value}>{children}</SavedResultsContext.Provider>;
}

export function useSavedResults(): SavedResultsContextState {
  const context = useContext(SavedResultsContext);
  if (context === undefined) {
    throw new Error('useSavedResults must be used within a SavedResultsProvider');
  }
  return context;
}
