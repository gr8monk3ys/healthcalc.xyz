'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { createLogger } from '@/utils/logger';
import { toAbsoluteUrl } from '@/lib/site';
import { useFunnelTracking } from '@/hooks/useFunnelTracking';

const logger = createLogger({ component: 'ResultsShare' });
let htmlToImageModulePromise: Promise<typeof import('html-to-image')> | null = null;

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

async function getHtmlToImageModule(): Promise<typeof import('html-to-image')> {
  if (!htmlToImageModulePromise) {
    htmlToImageModulePromise = import('html-to-image');
  }

  return htmlToImageModulePromise;
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
  shareToken,
  className = '',
}: {
  calculatorSlug: string;
  title: string;
  shareToken?: string;
  className?: string;
}): React.JSX.Element {
  const { target, registerTarget } = useResultsShare();
  const { localizePath, t } = useLocale();
  const { trackEvent } = useFunnelTracking();
  const [copied, setCopied] = React.useState(false);
  const [shareStatus, setShareStatus] = React.useState('');
  const [downloading, setDownloading] = React.useState(false);

  const shareUrl = useMemo(() => {
    const localizedPath = shareToken
      ? localizePath(`/share/${calculatorSlug}?r=${encodeURIComponent(shareToken)}`)
      : localizePath(`/${calculatorSlug}`);
    return toAbsoluteUrl(`${localizedPath}#results`);
  }, [calculatorSlug, localizePath, shareToken]);

  const shareIntents = useMemo(
    () => ({
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${shareUrl}`)}`,
    }),
    [shareUrl, title]
  );

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareStatus(t('calculator.resultsShare.linkCopied'));
      setCopied(true);
      trackEvent('results_share_copy_link', { calculator: calculatorSlug });
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      logger.logError('Failed to copy share URL', error);
      setCopied(false);
      setShareStatus(t('calculator.resultsShare.copyFailed'));
    }
  }, [calculatorSlug, shareUrl, t, trackEvent]);

  const trackPlatformShare = useCallback(
    (platform: keyof typeof shareIntents) => {
      trackEvent('results_share_platform', { calculator: calculatorSlug, platform });
    },
    [calculatorSlug, trackEvent]
  );

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
      const [{ toPng }] = await Promise.all([
        getHtmlToImageModule(),
        new Promise<void>(resolve => requestAnimationFrame(() => resolve())),
      ]);

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
      setShareStatus(t('calculator.resultsShare.exportFailed'));
    } finally {
      if (target) {
        delete target.dataset.hcCapturing;
        if (addedShareClass) {
          target.classList.remove('hc-share-target');
        }
      }
      setDownloading(false);
    }
  }, [calculatorSlug, downloading, t, target, title, trackEvent]);

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
          <a
            href={shareIntents.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="ui-btn-soft"
            onClick={() => trackPlatformShare('twitter')}
            aria-label="Share result on Twitter"
          >
            {t('socialShare.platform.twitter')}
          </a>
          <a
            href={shareIntents.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="ui-btn-soft"
            onClick={() => trackPlatformShare('facebook')}
            aria-label="Share result on Facebook"
          >
            {t('socialShare.platform.facebook')}
          </a>
          <a
            href={shareIntents.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="ui-btn-soft"
            onClick={() => trackPlatformShare('linkedin')}
            aria-label="Share result on LinkedIn"
          >
            {t('socialShare.platform.linkedin')}
          </a>
          <a
            href={shareIntents.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="ui-btn-soft"
            onClick={() => trackPlatformShare('whatsapp')}
            aria-label="Share result on WhatsApp"
          >
            WhatsApp
          </a>
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

      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400" role="status">
        {shareStatus}
      </p>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        {t('calculator.resultsShare.tipPrefix')}{' '}
        <span className="font-mono break-all" translate="no">
          {shareUrl}
        </span>
      </p>
    </section>
  );
}
