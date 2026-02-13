'use client';

import React from 'react';
import Link from 'next/link';
import { useCookieConsent } from '@/components/CookieConsent';
import { useLocale } from '@/context/LocaleContext';

export default function Footer(): React.JSX.Element {
  const { openConsentBanner } = useCookieConsent();
  const { localizePath, t } = useLocale();
  return (
    <footer className="px-3 pb-6 pt-4 md:px-4 md:pb-8">
      <div className="glass-panel-strong container mx-auto rounded-[1.75rem] px-6 py-8 md:px-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link
              href={localizePath('/')}
              className="notranslate inline-flex items-baseline gap-1 text-xl font-black tracking-tight text-accent"
            >
              HealthCheck
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-accent/80">
              {t('footer.section.calculators')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={localizePath('/bmi')}
                  className="text-sm text-slate-700 hover:text-accent dark:text-slate-200"
                >
                  {t('footer.calc.bmi')}
                </Link>
              </li>
              <li>
                <Link
                  href={localizePath('/body-fat')}
                  className="text-sm text-slate-700 hover:text-accent dark:text-slate-200"
                >
                  {t('footer.calc.bodyFat')}
                </Link>
              </li>
              <li>
                <Link
                  href={localizePath('/calorie-deficit')}
                  className="text-sm text-slate-700 hover:text-accent dark:text-slate-200"
                >
                  {t('footer.calc.calorieDeficit')}
                </Link>
              </li>
              <li>
                <Link
                  href={localizePath('/tdee')}
                  className="text-sm text-slate-700 hover:text-accent dark:text-slate-200"
                >
                  {t('footer.calc.tdee')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-accent/80">
              {t('footer.section.company')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={localizePath('/about')}
                  className="text-sm text-slate-700 hover:text-accent dark:text-slate-200"
                >
                  {t('footer.company.about')}
                </Link>
              </li>
              <li>
                <Link
                  href={localizePath('/about/editorial')}
                  className="text-sm text-slate-700 hover:text-accent dark:text-slate-200"
                >
                  {t('footer.company.editorial')}
                </Link>
              </li>
              <li>
                <Link
                  href={localizePath('/contact')}
                  className="text-sm text-slate-700 hover:text-accent dark:text-slate-200"
                >
                  {t('footer.company.contact')}
                </Link>
              </li>
              <li>
                <Link
                  href={localizePath('/blog')}
                  className="text-sm text-slate-700 hover:text-accent dark:text-slate-200"
                >
                  {t('footer.company.blog')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-accent/80">
              {t('footer.section.legal')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={localizePath('/privacy')}
                  className="text-sm text-slate-700 hover:text-accent dark:text-slate-200"
                >
                  {t('footer.legal.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href={localizePath('/terms')}
                  className="text-sm text-slate-700 hover:text-accent dark:text-slate-200"
                >
                  {t('footer.legal.terms')}
                </Link>
              </li>
              <li>
                <Link
                  href={localizePath('/disclaimer')}
                  className="text-sm text-slate-700 hover:text-accent dark:text-slate-200"
                >
                  {t('footer.legal.disclaimer')}
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openConsentBanner}
                  className="text-sm text-slate-700 hover:text-accent dark:text-slate-200"
                >
                  {t('footer.legal.cookies')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust signals */}
        <div className="mt-7 flex items-center justify-center gap-2 border-t border-white/40 pt-5 text-xs text-slate-600 dark:border-indigo-200/10 dark:text-slate-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-accent shrink-0"
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
          <span className="mx-1">|</span>
          <Link href={localizePath('/about/editorial')} className="text-accent hover:underline">
            {t('footer.trust.learnProcess')}
          </Link>
        </div>

        {/* Medical disclaimer */}
        <div className="mt-4 border-t border-white/40 pt-4 text-center text-xs text-slate-600 dark:border-indigo-200/10 dark:text-slate-400">
          <p>{t('footer.medicalDisclaimer')}</p>
        </div>

        <div className="mt-4 border-t border-white/40 pt-4 text-center text-sm text-slate-700 dark:border-indigo-200/10 dark:text-slate-300">
          &copy; {new Date().getFullYear()} HealthCheck. {t('footer.rightsReserved')}
        </div>
      </div>
    </footer>
  );
}
