'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import AuthModal from '@/components/auth/AuthModal';

export default function UserMenu(): React.JSX.Element {
  const { user, isAuthenticated, isLoading, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside.
  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const handleSignOut = useCallback(async () => {
    setMenuOpen(false);
    await signOut();
  }, [signOut]);

  if (isLoading) {
    return (
      <div className="elevated-pill flex h-9 w-9 items-center justify-center rounded-full">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="elevated-pill rounded-full px-4 py-2 text-sm font-semibold text-accent transition-all hover:-translate-y-0.5"
        >
          Sign in
        </button>
        <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  const initial = (user.email?.[0] ?? '?').toUpperCase();

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setMenuOpen(prev => !prev)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-lg shadow-accent/30 transition-all hover:-translate-y-0.5"
        aria-label="User menu"
        aria-expanded={menuOpen}
        aria-haspopup="true"
      >
        {initial}
      </button>

      {menuOpen && (
        <div className="glass-panel absolute right-0 top-full z-50 mt-2 w-56 rounded-xl p-3 shadow-xl">
          <p
            className="truncate border-b border-white/20 pb-2 text-sm font-medium text-[var(--foreground)] dark:border-white/10"
            title={user.email}
          >
            {user.email}
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-2 w-full rounded-lg px-3 py-2 text-left text-sm text-[var(--foreground)] opacity-80 transition-all hover:bg-red-100 hover:text-red-700 hover:opacity-100 dark:hover:bg-red-900/30 dark:hover:text-red-300"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
