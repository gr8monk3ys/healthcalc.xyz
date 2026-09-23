/**
 * Scroll behavior for scrollIntoView/scrollTo that honors
 * prefers-reduced-motion (the CSS `scroll-behavior` reset does not apply to
 * JS-driven smooth scrolling).
 */
export function scrollBehavior(): ScrollBehavior {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'smooth';
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}
