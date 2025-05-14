'use client';

import React, { useMemo, useReducer } from 'react';
import { buildEmbedCode } from '@/utils/embed';

interface EmbedCalculatorProps {
  calculatorSlug: string;
  title: string;
  height?: number;
  className?: string;
}

interface EmbedRequestState {
  copied: boolean;
  requestName: string;
  requestEmail: string;
  requestSite: string;
  requestNotes: string;
}

type RequestField = 'requestName' | 'requestEmail' | 'requestSite' | 'requestNotes';

type EmbedRequestAction =
  | { type: 'setCopied'; value: boolean }
  | { type: 'setField'; field: RequestField; value: string };

const initialEmbedRequestState: EmbedRequestState = {
  copied: false,
  requestName: '',
  requestEmail: '',
  requestSite: '',
  requestNotes: '',
};

function embedRequestReducer(
  state: EmbedRequestState,
  action: EmbedRequestAction
): EmbedRequestState {
  switch (action.type) {
    case 'setCopied':
      return { ...state, copied: action.value };
    case 'setField':
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
}

export default function EmbedCalculator({
  calculatorSlug,
  title,
  height = 680,
  className = '',
}: EmbedCalculatorProps) {
  const [requestState, dispatchRequestState] = useReducer(
    embedRequestReducer,
    initialEmbedRequestState
  );
  const { copied, requestName, requestEmail, requestSite, requestNotes } = requestState;

  const iframeCode = useMemo(() => {
    return buildEmbedCode({ slug: calculatorSlug, title, height });
  }, [calculatorSlug, height, title]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(iframeCode);
      dispatchRequestState({ type: 'setCopied', value: true });
      window.setTimeout(() => dispatchRequestState({ type: 'setCopied', value: false }), 1800);
    } catch {
      dispatchRequestState({ type: 'setCopied', value: false });
    }
  };

  const handleRequestSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const subject = `Embed request: ${title}`;
    const body = [
      `Name: ${requestName || 'N/A'}`,
      `Email: ${requestEmail || 'N/A'}`,
      `Website: ${requestSite || 'N/A'}`,
      `Calculator: ${title}`,
      `Notes: ${requestNotes || 'N/A'}`,
    ].join('\n');

    const mailto = `mailto:info@healthcalc.xyz?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  };

  return (
    <section className={className} aria-labelledby="embed-heading">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Add this calculator to your site and keep the attribution link for SEO value.
        </p>
        <button
          type="button"
          onClick={handleCopy}
          className="neumorph px-4 py-2 rounded-lg text-sm font-medium text-accent hover:shadow-neumorph-inset focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {copied ? 'Copied!' : 'Copy Embed Code'}
        </button>
      </div>

      <div>
        <label
          htmlFor={`${calculatorSlug}-embed-code`}
          className="block text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2"
        >
          Embed Code
        </label>
        <textarea
          id={`${calculatorSlug}-embed-code`}
          readOnly
          className="w-full h-32 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/40 text-xs font-mono"
          value={iframeCode}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Tip: You can adjust the iframe height if needed, but keep the attribution link.
        </p>
      </div>

      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
          Request Embed Approval
        </h4>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleRequestSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor={`${calculatorSlug}-name`}>
              Name
            </label>
            <input
              id={`${calculatorSlug}-name`}
              type="text"
              className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Your name"
              value={requestName}
              onChange={event =>
                dispatchRequestState({
                  type: 'setField',
                  field: 'requestName',
                  value: event.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor={`${calculatorSlug}-email`}>
              Email
            </label>
            <input
              id={`${calculatorSlug}-email`}
              type="email"
              className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="you@example.com"
              value={requestEmail}
              onChange={event =>
                dispatchRequestState({
                  type: 'setField',
                  field: 'requestEmail',
                  value: event.target.value,
                })
              }
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1" htmlFor={`${calculatorSlug}-site`}>
              Website URL
            </label>
            <input
              id={`${calculatorSlug}-site`}
              type="url"
              className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="https://example.com"
              value={requestSite}
              onChange={event =>
                dispatchRequestState({
                  type: 'setField',
                  field: 'requestSite',
                  value: event.target.value,
                })
              }
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1" htmlFor={`${calculatorSlug}-notes`}>
              Notes (optional)
            </label>
            <textarea
              id={`${calculatorSlug}-notes`}
              rows={3}
              className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Tell us how you plan to use the embed."
              value={requestNotes}
              onChange={event =>
                dispatchRequestState({
                  type: 'setField',
                  field: 'requestNotes',
                  value: event.target.value,
                })
              }
            />
          </div>
          <div className="md:col-span-2 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <button
              type="submit"
              className="neumorph px-4 py-2 rounded-lg text-sm font-medium text-accent hover:shadow-neumorph-inset focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Request Approval
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              This opens your email client with a pre-filled request for our review.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
