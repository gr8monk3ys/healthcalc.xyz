'use client';

import React, { useMemo, useState } from 'react';
import { CALCULATOR_CATALOG } from '@/constants/calculatorCatalog';
import { buildEmbedCode } from '@/utils/embed';
import { toAbsoluteUrl } from '@/lib/site';

const DEFAULT_HEIGHT = 680;

export default function EmbedWidgetPicker() {
  const [selectedSlug, setSelectedSlug] = useState(CALCULATOR_CATALOG[0]?.slug ?? 'bmi');
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [copied, setCopied] = useState(false);
  const [requestName, setRequestName] = useState('');
  const [requestEmail, setRequestEmail] = useState('');
  const [requestSite, setRequestSite] = useState('');
  const [requestNotes, setRequestNotes] = useState('');
  const [websiteConfirm, setWebsiteConfirm] = useState('');
  const [requestStatus, setRequestStatus] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle'
  );

  const selectedCalculator = useMemo(
    () => CALCULATOR_CATALOG.find(item => item.slug === selectedSlug),
    [selectedSlug]
  );

  const embedCode = useMemo(() => {
    if (!selectedCalculator) {
      return '';
    }
    return buildEmbedCode({
      slug: selectedCalculator.slug,
      title: selectedCalculator.title,
      height,
    });
  }, [height, selectedCalculator]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleRequestSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedCalculator) {
      return;
    }

    if (websiteConfirm) {
      setRequestStatus('error');
      return;
    }

    setRequestStatus('sending');

    try {
      const response = await fetch('/api/embed-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: requestName,
          email: requestEmail,
          website: requestSite,
          calculator: selectedCalculator.title,
          calculatorSlug: selectedCalculator.slug,
          notes: requestNotes,
        }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setRequestStatus('success');
      setRequestNotes('');
    } catch {
      setRequestStatus('error');
    }
  };

  return (
    <section className="neumorph p-6 rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Embed HealthCheck Calculators</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Choose a calculator, copy the embed code, and keep the attribution link included.
          </p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="ui-btn-soft text-sm"
          disabled={!embedCode}
        >
          {copied ? 'Copied!' : 'Copy Embed Code'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="embed-calculator">
            Calculator
          </label>
          <select
            id="embed-calculator"
            className="ui-select w-full p-3 focus:outline-none focus:ring-2 focus:ring-accent"
            value={selectedSlug}
            onChange={event => setSelectedSlug(event.target.value)}
          >
            {CALCULATOR_CATALOG.map(calculator => (
              <option key={calculator.slug} value={calculator.slug}>
                {calculator.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="embed-height">
            Height (px)
          </label>
          <input
            id="embed-height"
            type="number"
            min={420}
            max={1400}
            value={height}
            onChange={event => setHeight(Number(event.target.value))}
            className="ui-input w-full p-3 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div className="md:col-span-3">
          <label className="block text-sm font-medium mb-1" htmlFor="embed-code">
            Embed Code
          </label>
          <textarea
            id="embed-code"
            readOnly
            className="ui-textarea w-full h-32 p-3 text-xs font-mono"
            value={embedCode}
          />
        </div>
        <div className="md:col-span-3">
          <label className="block text-sm font-medium mb-1" htmlFor="embed-preview">
            Live Preview
          </label>
          <div className="neumorph p-3 rounded-lg bg-white/70 dark:bg-gray-900/40">
            <iframe
              id="embed-preview"
              src={toAbsoluteUrl(`/${selectedSlug}?embed=1`)}
              title={`${selectedCalculator?.title ?? 'Calculator'} preview`}
              className="w-full"
              style={{ height: `${height}px`, border: 0 }}
              loading="lazy"
              sandbox="allow-forms allow-scripts allow-same-origin"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
          Request Embed Approval
        </h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleRequestSubmit}>
          <div className="hidden" aria-hidden="true">
            <label htmlFor="embed-request-website-confirm">Website (leave blank)</label>
            <input
              id="embed-request-website-confirm"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={websiteConfirm}
              onChange={event => setWebsiteConfirm(event.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="embed-request-name">
              Name
            </label>
            <input
              id="embed-request-name"
              type="text"
              className="ui-input w-full p-3 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Your name"
              value={requestName}
              onChange={event => setRequestName(event.target.value)}
              autoComplete="name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="embed-request-email">
              Email
            </label>
            <input
              id="embed-request-email"
              type="email"
              className="ui-input w-full p-3 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="you@example.com"
              value={requestEmail}
              onChange={event => setRequestEmail(event.target.value)}
              autoComplete="email"
              inputMode="email"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1" htmlFor="embed-request-site">
              Website URL
            </label>
            <input
              id="embed-request-site"
              type="url"
              className="ui-input w-full p-3 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="https://example.com"
              value={requestSite}
              onChange={event => setRequestSite(event.target.value)}
              autoComplete="url"
              inputMode="url"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1" htmlFor="embed-request-notes">
              Notes (optional)
            </label>
            <textarea
              id="embed-request-notes"
              rows={3}
              className="ui-textarea w-full p-3 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Tell us how you plan to use the embed."
              value={requestNotes}
              onChange={event => setRequestNotes(event.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="md:col-span-2 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <button
              type="submit"
              className="ui-btn-primary text-sm"
              disabled={requestStatus === 'sending'}
            >
              {requestStatus === 'sending' ? 'Sending...' : 'Request Approval'}
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              We review requests within 1-2 business days.
            </p>
          </div>
          {requestStatus === 'success' && (
            <p className="md:col-span-2 text-sm text-green-600" role="status" aria-live="polite">
              Request sent. We’ll follow up by email.
            </p>
          )}
          {requestStatus === 'error' && (
            <p className="md:col-span-2 text-sm text-red-600" role="alert">
              Something went wrong. Please try again or email us directly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
