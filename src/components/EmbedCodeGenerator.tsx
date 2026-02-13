'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { getPublicSiteUrl } from '@/lib/site';

interface EmbedCodeGeneratorProps {
  calculatorSlug: string;
  calculatorTitle: string;
}

const SITE_URL = getPublicSiteUrl();
const MIN_WIDTH = 300;
const MAX_WIDTH = 800;
const MIN_HEIGHT = 400;
const MAX_HEIGHT = 1000;
const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 600;

export const EmbedCodeGenerator: React.FC<EmbedCodeGeneratorProps> = ({
  calculatorSlug,
  calculatorTitle,
}) => {
  const [width, setWidth] = useState<number>(DEFAULT_WIDTH);
  const [height, setHeight] = useState<number>(DEFAULT_HEIGHT);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [copied, setCopied] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const codeRef = useRef<HTMLTextAreaElement>(null);

  const embedUrl = `${SITE_URL}/api/embed/${calculatorSlug}${theme === 'dark' ? '?theme=dark' : ''}`;

  const embedCode = `<iframe src="${embedUrl}" width="${width}" height="${height}" frameborder="0" title="${calculatorTitle} - HealthCheck" style="border:none;border-radius:12px;max-width:100%;" loading="lazy"></iframe>`;

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

  const handleWidthChange = useCallback((value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= MIN_WIDTH && num <= MAX_WIDTH) {
      setWidth(num);
    }
  }, []);

  const handleHeightChange = useCallback((value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= MIN_HEIGHT && num <= MAX_HEIGHT) {
      setHeight(num);
    }
  }, []);

  return (
    <div className="neumorph p-6 rounded-lg mt-6">
      <h3 className="text-lg font-semibold mb-4">Embed This Calculator</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Add the {calculatorTitle} to your website for free. Copy the code below and paste it into
        your HTML.
      </p>

      {/* Customization Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="embed-width" className="block text-sm font-medium mb-1">
            Width (px)
          </label>
          <input
            type="number"
            id="embed-width"
            value={width}
            onChange={e => handleWidthChange(e.target.value)}
            min={MIN_WIDTH}
            max={MAX_WIDTH}
            step={10}
            className="w-full p-2 neumorph-inset rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label htmlFor="embed-height" className="block text-sm font-medium mb-1">
            Height (px)
          </label>
          <input
            type="number"
            id="embed-height"
            value={height}
            onChange={e => handleHeightChange(e.target.value)}
            min={MIN_HEIGHT}
            max={MAX_HEIGHT}
            step={10}
            className="w-full p-2 neumorph-inset rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label htmlFor="embed-theme" className="block text-sm font-medium mb-1">
            Theme
          </label>
          <select
            id="embed-theme"
            value={theme}
            onChange={e => setTheme(e.target.value as 'light' | 'dark')}
            className="w-full p-2 neumorph-inset rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      {/* Embed Code */}
      <div className="mb-4">
        <label htmlFor="embed-code" className="block text-sm font-medium mb-1">
          Embed Code
        </label>
        <textarea
          ref={codeRef}
          id="embed-code"
          readOnly
          value={embedCode}
          rows={3}
          className="w-full p-3 neumorph-inset rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          onClick={e => (e.target as HTMLTextAreaElement).select()}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={handleCopy}
          className="px-4 py-2 neumorph text-accent font-medium rounded-lg hover:shadow-neumorph-inset transition-all focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 text-sm"
          aria-label="Copy embed code to clipboard"
        >
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="px-4 py-2 neumorph text-gray-600 dark:text-gray-400 font-medium rounded-lg hover:shadow-neumorph-inset transition-all focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 text-sm"
          aria-expanded={showPreview}
          aria-controls="embed-preview"
        >
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>
      </div>

      {/* Preview */}
      {showPreview && (
        <div id="embed-preview" className="mb-4">
          <p className="text-sm font-medium mb-2">Preview</p>
          <div className="neumorph-inset rounded-lg p-2 overflow-auto" style={{ maxWidth: '100%' }}>
            <iframe
              src={embedUrl}
              width={Math.min(width, 480)}
              height={height}
              style={{ border: 'none', borderRadius: '12px', maxWidth: '100%' }}
              title={`${calculatorTitle} embed preview`}
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Attribution Notice */}
      <div className="text-xs text-gray-500 dark:text-gray-500 border-t border-gray-200 dark:border-gray-700 pt-3">
        <p className="font-medium mb-1">Attribution requirement</p>
        <p>
          The embedded calculator includes a &quot;Powered by HealthCheck&quot; link. This
          attribution must remain visible and unmodified. By using this embed code, you agree to
          keep the attribution link intact.
        </p>
      </div>
    </div>
  );
};
