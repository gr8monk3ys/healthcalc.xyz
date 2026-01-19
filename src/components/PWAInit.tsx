'use client';

import { useEffect } from 'react';
import { registerServiceWorker, checkForUpdates } from '@/utils/serviceWorker';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'PWAInit' });

/**
 * PWAInit Component
 * Registers the service worker and handles PWA functionality
 * Must be a client component to access browser APIs
 */
export default function PWAInit() {
  useEffect(() => {
    // Only run in production and if service workers are supported
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      // Register the service worker
      registerServiceWorker().catch(error => {
        logger.logError('Service Worker registration failed', error);
      });

      // Check for updates
      checkForUpdates(() => {
        // Show notification to the user about the update
        if (window.confirm('A new version is available. Refresh to update?')) {
          window.location.reload();
        }
      });
    }
  }, []);

  // This component doesn't render anything
  return null;
}
