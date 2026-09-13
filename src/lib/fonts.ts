import { Fraunces, IBM_Plex_Mono, Instrument_Sans } from 'next/font/google';

/**
 * Fraunces — display serif for headings and drop caps.
 *
 * Preloaded on purpose: the home-page <h1> is the LCP element, and with
 * `preload: false` the browser only discovered this file after parsing the
 * CSS, then re-painted the heading ~2.5 s later when it arrived (LCP 3.7 s,
 * CLS 0.086 from the re-wrap). The latin subset is ~38 KB.
 *
 * `optional` (not `swap`): Chrome holds the first paint briefly for a
 * preloaded optional font and never swaps it in afterwards, so the heading is
 * painted once, in Fraunces. `swap` and `fallback` were both measured on the
 * Vercel preview: whenever the paint beat the font file, the heading was
 * re-laid-out from the metric-adjusted fallback and CLS was back at 0.086.
 */
export const displayFont = Fraunces({
  subsets: ['latin'],
  display: 'optional',
  preload: true,
  variable: '--site-font-display',
});

/** Instrument Sans — body text. Same `optional` reasoning as the display font. */
export const bodyFont = Instrument_Sans({
  subsets: ['latin'],
  display: 'optional',
  variable: '--site-font-body',
});

/** IBM Plex Mono — wall-label metadata, kickers, catalogue numbers. */
export const monoFont = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: false,
  variable: '--site-font-mono',
});

/** Put this on <html> (or <body>) className. */
export const fontVariables = `${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`;
