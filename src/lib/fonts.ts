import { Archivo } from 'next/font/google';

/**
 * Archivo: the one family for headings, figures and body.
 *
 * Preloaded, with `display: 'optional'`: the page <h1> is the LCP element, and
 * with `swap` the heading was re-laid-out from the fallback whenever paint
 * beat the font file (measured on the Vercel preview as CLS 0.086). Chrome
 * holds first paint briefly for a preloaded optional font and never swaps
 * afterwards, so text is painted once.
 */
export const siteFont = Archivo({
  subsets: ['latin'],
  display: 'optional',
  preload: true,
  variable: '--site-font',
});

/** Put this on <html> className. */
export const fontVariables = siteFont.variable;
