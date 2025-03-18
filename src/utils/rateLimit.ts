import { NextRequest } from 'next/server';

/**
 * Tracks the state of a single rate-limit bucket (one per IP + route combination).
 */
interface RateLimitEntry {
  /** Number of requests recorded in the current window. */
  count: number;
  /** Unix-ms timestamp when the current window expires. */
  resetTime: number;
  /** Number of consecutive windows where the client exceeded the limit. */
  violations: number;
}

interface RateLimitOptions {
  /** Maximum requests per window (default: 10). */
  limit?: number;
  /** Window duration in milliseconds (default: 60000 = 1 minute). */
  windowMs?: number;
  /**
   * Route identifier for per-route limiting (default: 'global').
   *
   * Using a route key means that one route's request count does not affect
   * another. For example, hitting the newsletter endpoint will not consume
   * quota for the contact endpoint, even from the same IP.
   */
  routeKey?: string;
}

interface RateLimitResult {
  /** Whether the request is allowed through. */
  success: boolean;
  /** Number of requests remaining in the current window. */
  remaining: number;
  /**
   * Standard rate-limit response headers. Callers should spread these into
   * their `NextResponse` headers so clients can observe their quota state.
   *
   * Always includes:
   *   - `X-RateLimit-Limit`  -- the configured maximum
   *   - `X-RateLimit-Remaining` -- requests left in the window
   *   - `X-RateLimit-Reset` -- Unix timestamp (seconds) when the window resets
   *
   * When `success` is `false` (HTTP 429), also includes:
   *   - `Retry-After` -- seconds until the client should retry
   */
  headers: Record<string, string>;
}

const DEFAULT_LIMIT = 10;
const DEFAULT_WINDOW_MS = 60_000;

/**
 * Maximum exponential-backoff multiplier so that repeat offenders are not
 * banned for unreasonably long periods within a single serverless instance.
 * With a 1-minute default window and a cap of 8x, the longest effective
 * window is 8 minutes.
 */
const MAX_BACKOFF_MULTIPLIER = 8;

/**
 * In-memory store keyed by a composite of client IP and route identifier.
 *
 * Each serverless cold-start gets its own `Map`, so this store only
 * protects against bursts that hit the **same** warm instance. For
 * sustained, cross-instance protection in production you should layer
 * an external store (Vercel KV, Upstash Redis, etc.) or rely on
 * Vercel's built-in WAF / DDoS mitigation.
 */
const rateLimitMap = new Map<string, RateLimitEntry>();

/**
 * Remove expired entries from the in-memory store to prevent unbounded
 * growth during the lifetime of a warm serverless instance.
 */
function cleanupExpired(): void {
  const now = Date.now();
  rateLimitMap.forEach((entry, key) => {
    if (now >= entry.resetTime) {
      rateLimitMap.delete(key);
    }
  });
}

/**
 * Extract the client IP address from the incoming request.
 *
 * Preference order:
 *   1. `request.ip` -- set by trusted reverse proxies (Vercel, Cloudflare).
 *   2. Last value in `X-Forwarded-For` -- appended by the closest trusted
 *      proxy. Earlier entries are attacker-controlled and trivially spoofed.
 *   3. `'unknown'` -- safe fallback; all unknown clients share one bucket.
 */
function getClientIp(request: NextRequest): string {
  const ip = (request as NextRequest & { ip?: string }).ip;
  if (ip) {
    return ip;
  }

  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const parts = forwarded.split(',');
    return parts[parts.length - 1].trim();
  }

  return 'unknown';
}

/**
 * Build the composite key used to look up a client's rate-limit bucket.
 *
 * The key combines the client IP with an optional route identifier so that
 * per-route limits are independent of each other. An IP that exhausts its
 * newsletter quota can still use the contact endpoint.
 */
function buildKey(ip: string, routeKey: string): string {
  return `${ip}:${routeKey}`;
}

/**
 * Build the standard rate-limit headers for a given state.
 */
function buildHeaders(
  limit: number,
  remaining: number,
  resetTimeMs: number,
  blocked: boolean
): Record<string, string> {
  const resetTimeSec = Math.ceil(resetTimeMs / 1000);
  const headers: Record<string, string> = {
    'X-RateLimit-Limit': String(limit),
    'X-RateLimit-Remaining': String(Math.max(0, remaining)),
    'X-RateLimit-Reset': String(resetTimeSec),
  };

  if (blocked) {
    const retryAfterSec = Math.max(1, Math.ceil((resetTimeMs - Date.now()) / 1000));
    headers['Retry-After'] = String(retryAfterSec);
  }

  return headers;
}

/**
 * In-memory, per-instance rate limiter for Next.js API routes.
 *
 * **Features**
 * - Composite key: limits are tracked per IP **and** per route, so one
 *   endpoint's usage does not affect another.
 * - Exponential backoff: repeat violators see progressively longer windows
 *   (up to {@link MAX_BACKOFF_MULTIPLIER}x the base window).
 * - Standard headers: returns `X-RateLimit-*` and `Retry-After` headers
 *   that callers can attach to their responses.
 *
 * **Serverless Limitations**
 *
 * On Vercel (or any serverless platform) each cold-start creates a fresh
 * `Map`, so the rate limiter only guards against bursts that reach the same
 * warm instance. This is still valuable -- it mitigates simple retry loops,
 * automated scanners, and misbehaving clients that happen to be routed to
 * the same instance -- but it is **not** a substitute for distributed rate
 * limiting.
 *
 * **Recommendations for production hardening:**
 * 1. Enable Vercel WAF / DDoS protection (available on Pro/Enterprise).
 * 2. Add Vercel KV or Upstash Redis for cross-instance counters.
 * 3. Use Cloudflare Rate Limiting or AWS WAF in front of the origin.
 *
 * @example
 * ```ts
 * // Basic usage (backward compatible)
 * const { success, remaining } = rateLimit(request)
 *
 * // Per-route limiting with headers
 * const result = rateLimit(request, {
 *   limit: 5,
 *   windowMs: 60_000,
 *   routeKey: 'newsletter',
 * })
 *
 * if (!result.success) {
 *   return NextResponse.json(
 *     { error: 'Too many requests' },
 *     { status: 429, headers: result.headers },
 *   )
 * }
 *
 * return NextResponse.json(data, { headers: result.headers })
 * ```
 */
export function rateLimit(request: NextRequest, options?: RateLimitOptions): RateLimitResult {
  const limit = options?.limit ?? DEFAULT_LIMIT;
  const baseWindowMs = options?.windowMs ?? DEFAULT_WINDOW_MS;
  const routeKey = options?.routeKey ?? 'global';
  const now = Date.now();

  cleanupExpired();

  const ip = getClientIp(request);
  const key = buildKey(ip, routeKey);
  const entry = rateLimitMap.get(key);

  // --- First request or window has expired -----------------------------------
  if (!entry || now >= entry.resetTime) {
    const violations = entry?.violations ?? 0;

    // Apply exponential backoff if there were prior violations.
    // The multiplier doubles with each consecutive violation window,
    // capped at MAX_BACKOFF_MULTIPLIER.
    const backoffMultiplier =
      violations > 0 ? Math.min(2 ** violations, MAX_BACKOFF_MULTIPLIER) : 1;
    const windowMs = baseWindowMs * backoffMultiplier;

    const resetTime = now + windowMs;

    rateLimitMap.set(key, {
      count: 1,
      resetTime,
      violations,
    });

    const remaining = limit - 1;
    return {
      success: true,
      remaining,
      headers: buildHeaders(limit, remaining, resetTime, false),
    };
  }

  // --- Subsequent request within the current window --------------------------
  entry.count += 1;

  if (entry.count > limit) {
    // Increment violation counter so the *next* window is longer.
    entry.violations = Math.min(
      (entry.violations ?? 0) + 1,
      // Cap at log2(MAX_BACKOFF_MULTIPLIER) so the multiplier does not
      // exceed the maximum.
      Math.ceil(Math.log2(MAX_BACKOFF_MULTIPLIER))
    );

    return {
      success: false,
      remaining: 0,
      headers: buildHeaders(limit, 0, entry.resetTime, true),
    };
  }

  const remaining = limit - entry.count;
  return {
    success: true,
    remaining,
    headers: buildHeaders(limit, remaining, entry.resetTime, false),
  };
}
