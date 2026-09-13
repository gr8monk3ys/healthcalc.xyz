import { Fraunces, IBM_Plex_Mono, Instrument_Sans } from 'next/font/google';

/**
 * Fraunces — display serif for headings and drop caps.
 *
 * Preloaded on purpose: the home-page <h1> is the LCP element, and with
 * `preload: false` the browser only discovered this file after parsing the
 * CSS, then re-painted the heading ~2.5 s later when it arrived (LCP 3.7 s,
 * CLS 0.086 from the re-wrap). The latin subset is ~38 KB.
 *
 * `fallback` (not `swap`): a ~100 ms block period lets the preloaded file
 * land before the first paint, so the heading is painted once, in Fraunces,
 * instead of painted in the metric-adjusted fallback and re-laid-out.
 */
export const displayFont = Fraunces({
  subsets: ['latin'],
  display: 'fallback',
  preload: true,
  variable: '--site-font-display',
});

/** Instrument Sans — body text. Same `fallback` reasoning as the display font. */
export const bodyFont = Instrument_Sans({
  subsets: ['latin'],
  display: 'fallback',
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
