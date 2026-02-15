'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { toAbsoluteUrl } from '@/lib/site';

interface EmbeddableCalculator {
  slug: string;
  title: string;
  description: string;
  defaultHeight: number;
}

const EMBEDDABLE_CALCULATORS: EmbeddableCalculator[] = [
  {
    slug: 'bmi',
    title: 'BMI Calculator',
    description:
      'Calculate Body Mass Index to assess weight relative to height. Shows BMI value, category, and healthy weight range.',
    defaultHeight: 450,
  },
  {
    slug: 'tdee',
    title: 'TDEE Calculator',
    description:
      'Calculate Total Daily Energy Expenditure based on the Mifflin-St Jeor equation with activity multipliers.',
    defaultHeight: 650,
  },
  {
    slug: 'body-fat',
    title: 'Body Fat Calculator',
    description:
      'Estimate body fat percentage using the U.S. Navy circumference method with gender-specific formulas.',
    defaultHeight: 650,
  },
  {
    slug: 'calorie-deficit',
    title: 'Calorie Deficit Calculator',
    description:
      'Plan safe weight loss with a personalized daily calorie target, timeline projections, and safety warnings.',
    defaultHeight: 750,
  },
];

function CopyableEmbedCode({
  calculator,
  theme,
}: {
  calculator: EmbeddableCalculator;
  theme: 'light' | 'dark';
}): React.JSX.Element {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLTextAreaElement>(null);

  const embedPath = `/api/embed/${calculator.slug}${theme === 'dark' ? '?theme=dark' : ''}`;
  const embedUrl = toAbsoluteUrl(embedPath);
  const embedCode = `<iframe src="${embedUrl}" width="100%" height="${calculator.defaultHeight}" title="${calculator.title} - HealthCheck" style="border:0;border-radius:16px;max-width:100%;min-width:320px;" loading="lazy"></iframe>`;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
    } catch {
      if (codeRef.current) {
        codeRef.current.select();
        document.execCommand('copy');
        setCopied(true);
      }
    }
  }, [embedCode]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div>
      <textarea
        ref={codeRef}
        readOnly
        value={embedCode}
        rows={3}
        className="ui-textarea mb-2 resize-none text-xs font-mono"
        onClick={e => (e.target as HTMLTextAreaElement).select()}
        aria-label={`Embed code for ${calculator.title}`}
      />
      <button
        onClick={handleCopy}
        className="ui-btn-soft text-xs"
        aria-label={`Copy ${calculator.title} embed code`}
      >
        {copied ? 'Copied!' : 'Copy Code'}
      </button>
    </div>
  );
}

export default function EmbedPage(): React.JSX.Element {
  const [globalTheme, setGlobalTheme] = useState<'light' | 'dark'>('light');
  const [previewSlug, setPreviewSlug] = useState<string | null>(null);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="glass-panel-strong rounded-3xl px-7 py-8 md:px-10 md:py-10 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Embed Free Health Calculators</h1>
        <p className="text-lg text-slate-700 dark:text-slate-200/90 mb-4">
          Add accurate, science-backed health calculators to your website with a single line of
          code. Our embeddable calculators are free to use, fully responsive, and work in any
          iframe-compatible site.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="elevated-pill rounded-full px-3 py-1">Free to use</span>
          <span className="elevated-pill rounded-full px-3 py-1">No registration required</span>
          <span className="elevated-pill rounded-full px-3 py-1">Mobile responsive</span>
          <span className="elevated-pill rounded-full px-3 py-1">Light and dark themes</span>
        </div>
        <div className="mt-6 text-sm text-slate-600 dark:text-slate-300">
          Need our full widget library (all calculators)?{' '}
          <Link href="/calculator-widgets" className="font-semibold text-accent hover:underline">
            Use Calculator Widgets
          </Link>
          .
        </div>
      </div>

      {/* How It Works */}
      <div className="glass-panel rounded-3xl p-7 md:p-8 mb-8">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-2xl font-bold text-accent mb-2">1</div>
            <h3 className="font-semibold mb-1">Choose a Calculator</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Pick from our library of health calculators below.
            </p>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent mb-2">2</div>
            <h3 className="font-semibold mb-1">Copy the Code</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Copy the iframe snippet and paste it into your HTML.
            </p>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent mb-2">3</div>
            <h3 className="font-semibold mb-1">Done</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              The calculator appears on your site immediately. No setup needed.
            </p>
          </div>
        </div>
      </div>

      {/* Theme Selector */}
      <div className="flex items-center gap-4 mb-6">
        <label htmlFor="global-theme" className="text-sm font-medium">
          Theme for embed codes:
        </label>
        <select
          id="global-theme"
          value={globalTheme}
          onChange={e => setGlobalTheme(e.target.value as 'light' | 'dark')}
          className="ui-select text-sm"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      {/* Calculator Cards */}
      <div className="space-y-6 mb-10">
        {EMBEDDABLE_CALCULATORS.map(calc => (
          <div key={calc.slug} className="glass-panel-strong rounded-3xl p-7 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{calc.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                  {calc.description}
                </p>
                <Link href={`/${calc.slug}`} className="text-sm text-accent hover:underline">
                  View full calculator
                </Link>
              </div>
              <button
                onClick={() => setPreviewSlug(previewSlug === calc.slug ? null : calc.slug)}
                className="ui-btn-soft text-xs whitespace-nowrap self-start"
                aria-expanded={previewSlug === calc.slug}
              >
                {previewSlug === calc.slug ? 'Hide Preview' : 'Live Preview'}
              </button>
            </div>

            <CopyableEmbedCode calculator={calc} theme={globalTheme} />

            {previewSlug === calc.slug && (
              <div className="mt-5 glass-panel rounded-2xl p-4 overflow-auto">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  Preview (scaled to fit)
                </p>
                <iframe
                  src={toAbsoluteUrl(
                    `/api/embed/${calc.slug}${globalTheme === 'dark' ? '?theme=dark' : ''}`
                  )}
                  width={400}
                  height={calc.defaultHeight}
                  style={{
                    border: 'none',
                    borderRadius: '12px',
                    maxWidth: '100%',
                  }}
                  title={`${calc.title} embed preview`}
                  loading="lazy"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Attribution and Terms */}
      <div className="glass-panel rounded-3xl p-7 md:p-8 mb-8">
        <h2 className="text-xl font-semibold mb-4">Attribution Requirements</h2>
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <p>
            Our embeddable calculators are free to use on any website, blog, or application. We have
            one simple requirement:
          </p>
          <div className="glass-panel-strong p-4 rounded-2xl">
            <p className="font-semibold text-slate-900 dark:text-white mb-1">
              Keep the &quot;Powered by HealthCheck&quot; link visible
            </p>
            <p>
              Each embedded calculator includes a small attribution link at the bottom. This link
              must remain visible and functional. Do not hide, remove, or modify the attribution
              link.
            </p>
          </div>
          <p>
            By embedding our calculators, you agree to these terms. If you need a white-label
            solution without attribution, please{' '}
            <Link href="/contact" className="text-accent hover:underline">
              contact us
            </Link>{' '}
            to discuss licensing options.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="glass-panel rounded-3xl p-7 md:p-8 mb-8">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-1">Is there a cost to embed calculators?</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              No. Our calculators are completely free to embed as long as the attribution link
              remains visible.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Can I customize the size?</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Yes. Adjust the width and height attributes in the iframe code. The calculators are
              responsive and will adapt to the container. Minimum recommended width is 300px.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Do embedded calculators use cookies?</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              No. The embedded calculators are self-contained HTML pages that run all calculations
              client-side. They do not set cookies, track users, or send data to our servers.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">
              Will more calculators be available for embedding?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Yes. We plan to expand the embed library over time.{' '}
              <Link href="/contact" className="text-accent hover:underline">
                Let us know
              </Link>{' '}
              which calculators you would like to see next.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Does the embed affect my page performance?</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              The embeds are lightweight HTML pages with no external dependencies, no frameworks,
              and no tracking scripts. They load fast and have minimal impact on your page
              performance. The iframe uses lazy loading by default.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
