'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { toPng } from 'html-to-image';
import { useLocale } from '@/context/LocaleContext';
import { createLogger } from '@/utils/logger';
import { toAbsoluteUrl } from '@/lib/site';
import { useFunnelTracking } from '@/hooks/useFunnelTracking';

const logger = createLogger({ component: 'ResultsShare' });

type ShareTarget = HTMLElement | null;

interface ResultsShareContextValue {
  target: ShareTarget;
  registerTarget: (target: ShareTarget) => void;
}

const ResultsShareContext = createContext<ResultsShareContextValue | undefined>(undefined);

export function ResultsShareProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [target, setTarget] = React.useState<ShareTarget>(null);

  const registerTarget = useCallback((next: ShareTarget) => {
    setTarget(next);
  }, []);

  const value = useMemo<ResultsShareContextValue>(
    () => ({
      target,
      registerTarget,
    }),
    [registerTarget, target]
  );

  return <ResultsShareContext.Provider value={value}>{children}</ResultsShareContext.Provider>;
}

function useResultsShare(): ResultsShareContextValue {
  const context = useContext(ResultsShareContext);
  if (!context) {
    throw new Error('useResultsShare must be used within a ResultsShareProvider');
  }
  return context;
}

export function ShareableResults({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}): React.JSX.Element {
  const context = useContext(ResultsShareContext);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    context?.registerTarget(ref.current);
    return () => context?.registerTarget(null);
  }, [context]);

  return (
    <div ref={ref} className={`hc-share-target ${className}`}>
      {children}
    </div>
  );
}

function downloadDataUrl(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.click();
}

function toFilenameFragment(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

export function ResultsShareBar({
  calculatorSlug,
  title,
  className = '',
}: {
  calculatorSlug: string;
  title: string;
  className?: string;
}): React.JSX.Element {
  const { target, registerTarget } = useResultsShare();
  const { localizePath, t } = useLocale();
  const { trackEvent } = useFunnelTracking();
  const [copied, setCopied] = React.useState(false);
  const [downloading, setDownloading] = React.useState(false);

  const shareUrl = useMemo(() => {
    const localizedPath = localizePath(`/${calculatorSlug}`);
    return toAbsoluteUrl(`${localizedPath}#results`);
  }, [calculatorSlug, localizePath]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      trackEvent('results_share_copy_link', { calculator: calculatorSlug });
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      logger.logError('Failed to copy share URL', error);
      setCopied(false);
    }
  }, [calculatorSlug, shareUrl, trackEvent]);

  const handleDownload = useCallback(async () => {
    if (!target || downloading) return;

    setDownloading(true);
    let addedShareClass = false;
    try {
      // Add a watermark overlay for the capture only.
      addedShareClass = !target.classList.contains('hc-share-target');
      if (addedShareClass) {
        target.classList.add('hc-share-target');
      }

      target.dataset.hcCapturing = '1';
      await new Promise(requestAnimationFrame);

      const dataUrl = await toPng(target, {
        cacheBust: true,
        pixelRatio: 2,
        filter: node => {
          if (!(node instanceof HTMLElement)) return true;
          return node.dataset.hcShareIgnore !== '1';
        },
      });

      const safeTitle = toFilenameFragment(title) || calculatorSlug;
      downloadDataUrl(dataUrl, `healthcheck-${safeTitle}-results.png`);
      trackEvent('results_share_download_image', { calculator: calculatorSlug });
    } catch (error) {
      logger.logError('Failed to export results image', error, { calculatorSlug });
    } finally {
      if (target) {
        delete target.dataset.hcCapturing;
        if (addedShareClass) {
          target.classList.remove('hc-share-target');
        }
      }
      setDownloading(false);
    }
  }, [calculatorSlug, downloading, target, title, trackEvent]);

  useEffect(() => {
    if (target) return;

    const resultColumn = document.querySelector<HTMLElement>('[id$="-result"]');
    const candidate =
      resultColumn?.querySelector<HTMLElement>('.hc-share-target') ??
      resultColumn?.querySelector<HTMLElement>('.glass-panel-strong') ??
      resultColumn?.querySelector<HTMLElement>('.neumorph') ??
      resultColumn;

    if (candidate) {
      registerTarget(candidate);
    }
  }, [registerTarget, target]);

  return (
    <section className={className} aria-label={t('calculator.resultsShare.title')}>
      <div className="glass-panel flex flex-col gap-3 rounded-2xl px-5 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {t('calculator.resultsShare.title')}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            {t('calculator.resultsShare.description')}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="ui-btn-soft" onClick={handleCopy}>
            {copied
              ? t('calculator.resultsShare.linkCopied')
              : t('calculator.resultsShare.copyLink')}
          </button>
          <button
            type="button"
            className="ui-btn-primary"
            onClick={handleDownload}
            disabled={!target || downloading}
            title={!target ? t('calculator.resultsShare.enableHint') : undefined}
          >
            {downloading
              ? t('calculator.resultsShare.exporting')
              : t('calculator.resultsShare.downloadImage')}
          </button>
        </div>
      </div>

      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        {t('calculator.resultsShare.tipPrefix')} <span className="font-mono">{shareUrl}</span>
      </p>
    </section>
  );
}
