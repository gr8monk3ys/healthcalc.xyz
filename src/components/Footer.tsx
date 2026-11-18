'use client';

import React from 'react';
import Link from 'next/link';
import { useCookieConsent } from '@/components/CookieConsent';
import { useLocale } from '@/context/LocaleContext';
import Logo from '@/components/Logo';

export default function Footer(): React.JSX.Element {
  const { openConsentBanner } = useCookieConsent();
  const { localizePath, t } = useLocale();
  const footerLinkClass =
    'inline-flex min-h-6 items-center py-1 text-sm text-ink underline-offset-4 hover:underline';
  return (
    <footer className="mt-8 border-t-[10px] border-ink">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link href={localizePath('/')} className="inline-flex">
              <Logo className="text-xl" markClassName="h-7 w-7" />
            </Link>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-2">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h2 className="mb-3 border-b-4 border-ink pb-1 text-sm font-extrabold">
              {t('footer.section.calculators')}
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href={localizePath('/bmi')} className={footerLinkClass}>
                  {t('footer.calc.bmi')}
                </Link>
              </li>
              <li>
                <Link href={localizePath('/body-fat')} className={footerLinkClass}>
                  {t('footer.calc.bodyFat')}
                </Link>
              </li>
              <li>
                <Link href={localizePath('/calorie-deficit')} className={footerLinkClass}>
                  {t('footer.calc.calorieDeficit')}
                </Link>
              </li>
              <li>
                <Link href={localizePath('/tdee')} className={footerLinkClass}>
                  {t('footer.calc.tdee')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 border-b-4 border-ink pb-1 text-sm font-extrabold">
              {t('footer.section.company')}
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href={localizePath('/about')} className={footerLinkClass}>
                  {t('footer.company.about')}
                </Link>
              </li>
              <li>
                <Link href={localizePath('/about/editorial')} className={footerLinkClass}>
                  {t('footer.company.editorial')}
                </Link>
              </li>
              <li>
                <Link href={localizePath('/contact')} className={footerLinkClass}>
                  {t('footer.company.contact')}
                </Link>
              </li>
              <li>
                <Link href={localizePath('/blog')} className={footerLinkClass}>
                  {t('footer.company.blog')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 border-b-4 border-ink pb-1 text-sm font-extrabold">
              {t('footer.section.legal')}
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href={localizePath('/privacy')} className={footerLinkClass}>
                  {t('footer.legal.privacy')}
                </Link>
              </li>
              <li>
                <Link href={localizePath('/terms')} className={footerLinkClass}>
                  {t('footer.legal.terms')}
                </Link>
              </li>
              <li>
                <Link href={localizePath('/disclaimer')} className={footerLinkClass}>
                  {t('footer.legal.disclaimer')}
                </Link>
              </li>
              <li>
                <button type="button" onClick={openConsentBanner} className={footerLinkClass}>
                  {t('footer.legal.cookies')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust signals */}
        <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-ink pt-4 text-xs text-ink-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span>{t('footer.trust.reviewed')}</span>
          <Link href={localizePath('/about/editorial')} className="text-accent hover:underline">
            {t('footer.trust.learnProcess')}
          </Link>
        </div>

        {/* Medical disclaimer */}
        <div className="mt-4 border-t border-ink pt-4 text-xs text-ink-2">
          <p>{t('footer.medicalDisclaimer')}</p>
        </div>

        <div className="mt-4 border-t border-ink pt-4 text-sm font-bold">
          &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span>{' '}
          <span translate="no">HealthCalc</span>. {t('footer.rightsReserved')}
        </div>
      </div>
    </footer>
  );
}
