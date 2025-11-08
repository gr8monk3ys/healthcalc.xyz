/**
 * Service worker registration utility
 * This enables offline functionality and improves performance
 */

// Type definitions for browser APIs
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface WindowWithInstallPrompt extends Window {
  showInstallPrompt?: () => void;
}

interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

/**
 * Register the service worker
 * @returns A promise that resolves when the service worker is registered
 */
export function registerServiceWorker(): Promise<ServiceWorkerRegistration | undefined> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return Promise.resolve(undefined);
  }

  return navigator.serviceWorker
    .register('/sw.js')
    .then(registration => {
      // eslint-disable-next-line no-console
      console.log('Service Worker registered with scope:', registration.scope);
      return registration;
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error('Service Worker registration failed:', error);
      return undefined;
    });
}

/**
 * Check if the app can be installed (PWA)
 * @param callback Function to call when the app can be installed
 */
export function checkInstallable(callback: () => void): void {
  if (typeof window === 'undefined') return;

  let deferredPrompt: BeforeInstallPromptEvent | null = null;

  window.addEventListener('beforeinstallprompt', (e: Event) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e as BeforeInstallPromptEvent;
    // Notify the app that the app can be installed
    callback();
  });

  // Function to show the install prompt
  (window as unknown as WindowWithInstallPrompt).showInstallPrompt = () => {
    if (!deferredPrompt) return;
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === 'accepted') {
        // eslint-disable-next-line no-console
        console.log('User accepted the install prompt');
      } else {
        // eslint-disable-next-line no-console
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  };
}

/**
 * Check if the app is running in standalone mode (installed PWA)
 * @returns True if the app is running in standalone mode
 */
export function isRunningStandalone(): boolean {
  if (typeof window === 'undefined') return false;

  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as NavigatorWithStandalone).standalone === true
  );
}

/**
 * Update the service worker
 * @param callback Function to call when an update is available
 */
export function checkForUpdates(callback: () => void): void {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

  // Check for service worker updates
  navigator.serviceWorker.ready.then(registration => {
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // New content is available, notify the user
          callback();
        }
      });
    });
  });
}

/**
 * Force update of the service worker
 */
export function forceUpdate(): void {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

  navigator.serviceWorker.ready.then(registration => {
    registration.update();
  });
}
