/**
 * Client-side instrumentation is intentionally disabled until a production DSN
 * is configured. Shipping the full telemetry SDK without an active backend
 * adds bundle weight and hurts Lighthouse without any observability benefit.
 */

export function onRouterTransitionStart(): void {}
