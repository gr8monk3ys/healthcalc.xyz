import Link from 'next/link';
import { ProgrammaticPageData, ProgrammaticTableColumn } from '@/utils/programmaticSeo';

function TableHeader({ column }: { column: ProgrammaticTableColumn }) {
  const alignClass = column.align === 'right' ? 'text-right' : 'text-left';

  return (
    <th
      scope="col"
      className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300 ${alignClass}`}
    >
      {column.label}
    </th>
  );
}

export default function ProgrammaticResultPage({ data }: { data: ProgrammaticPageData }) {
  return (
    <article className="max-w-5xl mx-auto space-y-8">
      <nav aria-label="Breadcrumb" className="text-sm text-gray-600 dark:text-gray-300">
        <ol className="flex flex-wrap items-center gap-2">
          {data.breadcrumbs.map((item, index) => {
            const isLast = index === data.breadcrumbs.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
                {item.href && !isLast ? (
                  <Link href={item.href} className="hover:underline text-accent">
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
                )}
                {!isLast ? <span aria-hidden="true">/</span> : null}
              </li>
            );
          })}
        </ol>
      </nav>

      <header className="glass-panel rounded-2xl p-6 md:p-8">
        <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Pre-computed result page
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
          {data.pageTitle}
        </h1>
        <p className="mt-3 text-base text-gray-700 dark:text-gray-300">{data.intro}</p>

        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div className="glass-panel-strong rounded-xl p-5">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              {data.heroLabel}
            </p>
            <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-gray-100">
              {data.heroValue}
            </p>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{data.heroSummary}</p>
          </div>

          <div className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent dark:text-accent-light">
            {data.percentileText}
          </div>
        </div>
      </header>

      <section className="glass-panel rounded-2xl p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {data.comparisonTitle}
        </h2>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          {data.comparisonDescription}
        </p>

        <div className="mt-4 overflow-x-auto rounded-xl border border-white/40 dark:border-slate-700/60">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-white/60 dark:bg-slate-900/40">
              <tr>
                {data.comparisonColumns.map(column => (
                  <TableHeader key={column.key} column={column} />
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white/45 dark:divide-slate-800 dark:bg-slate-900/25">
              {data.comparisonRows.map((row, index) => (
                <tr key={index}>
                  {data.comparisonColumns.map(column => {
                    const alignClass = column.align === 'right' ? 'text-right' : 'text-left';
                    return (
                      <td
                        key={column.key}
                        className={`px-4 py-3 text-sm text-gray-800 dark:text-gray-200 ${alignClass}`}
                      >
                        {row[column.key] ?? '-'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="glass-panel rounded-2xl p-6 md:p-8 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {data.contextHeading}
        </h2>
        {data.contextParagraphs.map((paragraph, index) => (
          <p key={index} className="text-sm md:text-base text-gray-700 dark:text-gray-300">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="glass-panel rounded-2xl p-6 md:p-8 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {data.faq.map(item => (
            <details
              key={item.question}
              className="rounded-xl border border-white/45 bg-white/60 p-4 dark:border-slate-700/60 dark:bg-slate-900/35"
            >
              <summary className="cursor-pointer list-none pr-6 text-sm font-semibold text-gray-900 dark:text-gray-100">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="glass-panel rounded-2xl p-6 md:p-8 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Related Result Pages
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {data.relatedPages.map(page => (
            <Link
              key={page.href}
              href={page.href}
              className="rounded-xl border border-white/50 bg-white/70 px-4 py-3 text-sm font-medium text-gray-800 hover:border-accent/40 hover:text-accent dark:border-slate-700/60 dark:bg-slate-900/35 dark:text-gray-200 dark:hover:text-accent-light"
            >
              {page.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="glass-panel-strong rounded-2xl p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Want a personalized calculation?
        </h2>
        <p className="mt-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
          {data.cta.description}
        </p>
        <div className="mt-4">
          <Link href={data.cta.href} className="ui-btn-primary">
            {data.cta.label}
          </Link>
        </div>
      </section>
    </article>
  );
}
