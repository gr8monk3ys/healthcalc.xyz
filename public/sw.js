/**
 * HealthCheck Service Worker
 * Provides offline support and caching for better performance
 * 
 * Enhanced with workbox-inspired strategies and improved offline support
 */

const CACHE_NAME = 'healthcheck-cache-v2';
const STATIC_CACHE_NAME = 'healthcheck-static-v2';
const DYNAMIC_CACHE_NAME = 'healthcheck-dynamic-v2';
const API_CACHE_NAME = 'healthcheck-api-v2';
const OFFLINE_PAGE = '/offline.html';

// Resources to cache on install
const PRECACHE_RESOURCES = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/images/og-image.jpg',
  '/images/placeholder.png',
  '/favicon.ico'
];

// Static assets to cache (CSS, JS, fonts)
const STATIC_RESOURCES = [
  '/styles.css',
  '/main.js',
  '/fonts/inter-var.woff2'
];

// API routes to cache with network-first strategy
const API_ROUTES = [
  '/api/bmi',
  '/api/tdee',
  '/api/body-fat',
  '/api/whr',
  '/api/absi'
];

// Maximum age for cached API responses (24 hours)
const API_CACHE_MAX_AGE = 24 * 60 * 60 * 1000;

// Install event - precache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      // Cache core resources
      caches.open(CACHE_NAME).then((cache) => {
        console.log('Service Worker: Caching core files');
        return cache.addAll(PRECACHE_RESOURCES);
      }),
      
      // Cache static assets
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_RESOURCES);
      })
    ])
    .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, STATIC_CACHE_NAME, DYNAMIC_CACHE_NAME, API_CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!currentCaches.includes(cacheName)) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      console.log('Service Worker: Claiming clients');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache or network with different strategies
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Skip browser-sync requests
  if (event.request.url.includes('browser-sync')) {
    return;
  }
  
  const url = new URL(event.request.url);
  
  // Strategy 1: Network-first for HTML pages (with offline fallback)
  if (event.request.headers.get('Accept')?.includes('text/html')) {
    event.respondWith(
      networkFirstWithOfflineFallback(event.request)
    );
    return;
  }
  
  // Strategy 2: Cache-first for static assets (CSS, JS, fonts)
  if (isStaticAsset(url.pathname)) {
    event.respondWith(
      cacheFirstWithNetworkFallback(event.request, STATIC_CACHE_NAME)
    );
    return;
  }
  
  // Strategy 3: Network-first with timed cache for API routes
  if (isApiRoute(url.pathname)) {
    event.respondWith(
      networkFirstWithTimedCache(event.request)
    );
    return;
  }
  
  // Strategy 4: Cache-first with network fallback for images
  if (isImageRequest(url.pathname)) {
    event.respondWith(
      cacheFirstWithPlaceholderFallback(event.request)
    );
    return;
  }
  
  // Default strategy: Cache first, then network
  event.respondWith(
    cacheFirstWithNetworkFallback(event.request, DYNAMIC_CACHE_NAME)
  );
});

/**
 * Network-first strategy with offline fallback for HTML pages
 */
async function networkFirstWithOfflineFallback(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    // Cache successful response
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, networkResponse.clone());
    
    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If not in cache, return offline page
    return caches.match(OFFLINE_PAGE);
  }
}

/**
 * Cache-first strategy with network fallback
 */
async function cacheFirstWithNetworkFallback(request, cacheName) {
  // Try cache first
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // If not in cache, get from network
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful response
    const cache = await caches.open(cacheName);
    cache.put(request, networkResponse.clone());
    
    return networkResponse;
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
}

/**
 * Network-first strategy with timed cache for API routes
 */
async function networkFirstWithTimedCache(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    // Cache successful response
    const cache = await caches.open(API_CACHE_NAME);
    
    // Add timestamp to response
    const responseToCache = networkResponse.clone();
    const data = await responseToCache.json();
    const timestampedData = {
      data,
      timestamp: Date.now()
    };
    
    const timestampedResponse = new Response(JSON.stringify(timestampedData), {
      headers: {
        'Content-Type': 'application/json',
        'X-Cached-At': Date.now().toString()
      }
    });
    
    cache.put(request, timestampedResponse);
    
    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      // Check if cache is still valid
      const data = await cachedResponse.json();
      
      if (data.timestamp && (Date.now() - data.timestamp < API_CACHE_MAX_AGE)) {
        // Return the original data without the timestamp wrapper
        return new Response(JSON.stringify(data.data), {
          headers: {
            'Content-Type': 'application/json',
            'X-Cached-At': data.timestamp.toString()
          }
        });
      }
    }
    
    // If no valid cache, propagate the error
    throw error;
  }
}

/**
 * Cache-first strategy with placeholder fallback for images
 */
async function cacheFirstWithPlaceholderFallback(request) {
  // Try cache first
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // If not in cache, get from network
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful response
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    cache.put(request, networkResponse.clone());
    
    return networkResponse;
  } catch (error) {
    console.error('Image fetch failed:', error);
    
    // Return placeholder image
    return caches.match('/images/placeholder.png');
  }
}

/**
 * Check if the request is for a static asset
 */
function isStaticAsset(pathname) {
  return (
    pathname.endsWith('.css') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.woff') ||
    pathname.endsWith('.woff2') ||
    pathname.endsWith('.ttf') ||
    pathname.endsWith('.eot') ||
    STATIC_RESOURCES.includes(pathname)
  );
}

/**
 * Check if the request is for an API route
 */
function isApiRoute(pathname) {
  return (
    pathname.startsWith('/api/') ||
    API_ROUTES.includes(pathname)
  );
}

/**
 * Check if the request is for an image
 */
function isImageRequest(pathname) {
  return (
    pathname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/) !== null ||
    pathname.includes('/images/')
  );
}

// Push notification event
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const notification = event.data.json();
  const title = notification.title || 'HealthCheck Update';
  const options = {
    body: notification.body || 'New content is available!',
    icon: notification.icon || '/icons/icon-192x192.png',
    badge: notification.badge || '/icons/badge-72x72.png',
    data: notification.data || { url: '/' },
    actions: notification.actions || [
      { action: 'view', title: 'View' }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'view' || !event.action) {
    const urlToOpen = event.notification.data && event.notification.data.url 
      ? event.notification.data.url 
      : '/';
    
    event.waitUntil(
      clients.matchAll({ type: 'window' })
        .then((windowClients) => {
          // Check if there is already a window/tab open with the target URL
          for (let client of windowClients) {
            if (client.url === urlToOpen && 'focus' in client) {
              return client.focus();
            }
          }
          // If no window/tab is open, open a new one
          if (clients.openWindow) {
            return clients.openWindow(urlToOpen);
          }
        })
    );
  }
});

// Background sync event
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-saved-results') {
    event.waitUntil(syncSavedResults());
  }
});

// Function to sync saved results with server
async function syncSavedResults() {
  try {
    // Get saved results from IndexedDB
    const db = await openDatabase();
    const savedResults = await getAllSavedResults(db);
    
    // Send to server
    if (savedResults.length > 0) {
      const response = await fetch('/api/sync-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ results: savedResults })
      });
      
      if (response.ok) {
        // Mark as synced in IndexedDB
        await markResultsAsSynced(db, savedResults);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Helper function to open IndexedDB
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('healthcheck-db', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('saved-results')) {
        db.createObjectStore('saved-results', { keyPath: 'id' });
      }
    };
  });
}

// Helper function to get all saved results
function getAllSavedResults(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('saved-results', 'readonly');
    const store = transaction.objectStore('saved-results');
    const request = store.getAll();
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

// Helper function to mark results as synced
function markResultsAsSynced(db, results) {
  return Promise.all(results.map((result) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('saved-results', 'readwrite');
      const store = transaction.objectStore('saved-results');
      result.synced = true;
      const request = store.put(result);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }));
}
