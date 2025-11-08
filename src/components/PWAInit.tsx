'use client';

import { useEffect } from 'react';
import { registerServiceWorker, checkForUpdates } from '@/utils/serviceWorker';

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
      registerServiceWorker()
        .then(registration => {
          if (registration) {
            // eslint-disable-next-line no-console
            console.log('✅ Service Worker registered successfully');
          }
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error('❌ Service Worker registration failed:', error);
        });

      // Check for updates
      checkForUpdates(() => {
        // eslint-disable-next-line no-console
        console.log('🔄 New version available! Refresh to update.');

        // Optionally show a toast or notification to the user
        if (window.confirm('A new version is available. Refresh to update?')) {
          window.location.reload();
        }
      });
    }
  }, []);

  // This component doesn't render anything
  return null;
}
