'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ShareRedirectClientProps {
  targetPath: string;
  title: string;
  description: string;
}

export default function ShareRedirectClient({
  targetPath,
  title,
  description,
}: ShareRedirectClientProps): React.JSX.Element {
  const router = useRouter();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      router.replace(targetPath);
    }, 60);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [router, targetPath]);

  return (
    <main className="max-w-2xl mx-auto py-20 px-4">
      <section className="glass-panel rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{title}</h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{description}</p>
        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
          Opening the calculator with this shared result...
        </p>
        <div className="mt-6">
          <Link href={targetPath} className="ui-btn-primary">
            Open result now
          </Link>
        </div>
      </section>
    </main>
  );
}
