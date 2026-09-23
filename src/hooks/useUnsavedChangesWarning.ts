'use client';

import { useCallback, useEffect, useRef } from 'react';

const LEAVE_MESSAGE = 'You have unsent changes in this form. Leave the page anyway?';

/**
 * Warn before the user navigates away from a form with unsent input.
 *
 * Covers both exits: `beforeunload` for reloads, closed tabs and external
 * links, and a capture-phase click guard for in-app `<a>`/`<Link>`
 * navigations (the App Router has no navigation-blocking API). Returns a
 * function to call right before an intentional navigation, such as opening
 * a `mailto:` link on submit, so that one exit is not blocked.
 */
export function useUnsavedChangesWarning(isDirty: boolean): () => void {
  const bypassRef = useRef(false);

  useEffect(() => {
    if (!isDirty) return;

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (bypassRef.current) return;
      event.preventDefault();
      event.returnValue = '';
    };

    const onClickCapture = (event: MouseEvent) => {
      if (bypassRef.current || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.('a[href]');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        return;
      }
      if (!window.confirm(LEAVE_MESSAGE)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    window.addEventListener('beforeunload', onBeforeUnload);
    document.addEventListener('click', onClickCapture, true);
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
      document.removeEventListener('click', onClickCapture, true);
    };
  }, [isDirty]);

  return useCallback(() => {
    bypassRef.current = true;
    window.setTimeout(() => {
      bypassRef.current = false;
    }, 1000);
  }, []);
}
