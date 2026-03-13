export default function BlogLoading() {
  return (
    <div className="max-w-4xl mx-auto" role="status" aria-label="Loading blog">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-2">
        <div className="h-9 w-64 rounded-lg bg-slate-200/60 dark:bg-slate-700/40 animate-pulse" />
        <div className="h-5 w-20 rounded bg-slate-200/60 dark:bg-slate-700/40 animate-pulse" />
      </div>
      <div className="h-5 w-full max-w-lg rounded bg-slate-200/60 dark:bg-slate-700/40 animate-pulse mb-8" />

      {/* Search bar skeleton */}
      <div className="mb-6">
        <div className="glass-panel rounded-2xl h-12 animate-pulse" />
      </div>

      {/* Category pills skeleton */}
      <div className="mb-8 flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-9 rounded-full bg-slate-200/60 dark:bg-slate-700/40 animate-pulse"
            style={{ width: `${72 + i * 12}px` }}
          />
        ))}
      </div>

      {/* Post grid skeleton — mirrors grid grid-cols-1 md:grid-cols-2 gap-6 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass-panel-strong rounded-3xl overflow-hidden">
            {/* Image placeholder */}
            <div className="hc-aspect-og bg-slate-200/60 dark:bg-slate-700/40 animate-pulse" />
            {/* Content placeholder */}
            <div className="p-5 space-y-3">
              <div className="flex gap-2">
                <div className="h-5 w-20 rounded-full bg-slate-200/60 dark:bg-slate-700/40 animate-pulse" />
                <div className="h-5 w-14 rounded-full bg-slate-200/60 dark:bg-slate-700/40 animate-pulse" />
              </div>
              <div className="h-5 w-3/4 rounded bg-slate-200/60 dark:bg-slate-700/40 animate-pulse" />
              <div className="h-4 w-full rounded bg-slate-200/60 dark:bg-slate-700/40 animate-pulse" />
              <div className="h-4 w-2/3 rounded bg-slate-200/60 dark:bg-slate-700/40 animate-pulse" />
              <div className="flex gap-2 pt-1">
                <div className="h-3 w-16 rounded bg-slate-200/60 dark:bg-slate-700/40 animate-pulse" />
                <div className="h-3 w-16 rounded bg-slate-200/60 dark:bg-slate-700/40 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}
