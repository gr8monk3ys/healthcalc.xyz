export default function Loading() {
  // Full viewport height on purpose. The layout is a min-h-screen flex column,
  // so a shorter fallback pins the footer to the bottom of the first screen;
  // when the page content streams in it pushes the footer thousands of pixels
  // down and Lighthouse records a 0.32 layout shift on the footer node.
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      role="status"
      aria-label="Loading"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-accent dark:border-slate-700 dark:border-t-accent" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
