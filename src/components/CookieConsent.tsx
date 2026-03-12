'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from 'react';
import { usePreferences } from '@/context/PreferencesContext';
import { getAdSensePublisherId, getAdSenseScriptSrc, shouldLoadAdSense } from '@/lib/adsense';
import { useLocale } from '@/context/LocaleContext';

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface CookieConsentState {
  /** Essential cookies are always enabled and cannot be toggled off. */
  essential: true;
  /** User has opted in to analytics cookies (e.g. Google Analytics). */
  analytics: boolean;
  /** User has opted in to advertising cookies (e.g. Google AdSense). */
  advertising: boolean;
  /** ISO-8601 timestamp of when consent was recorded. */
  consentedAt: string;
  /** TCF 2.2 version marker for AdSense compliance auditing. */
  tcfVersion: '2.2';
}

interface CookieConsentContextValue {
  analytics: boolean;
  advertising: boolean;
  /** Re-open the consent banner so the user can change their preferences. */
  openConsentBanner: () => void;
}

/* -------------------------------------------------------------------------- */
/*  Constants                                                                 */
/* -------------------------------------------------------------------------- */

const STORAGE_KEY = 'cookie-consent';

const DEFAULT_CONSENT: CookieConsentState = {
  essential: true,
  analytics: false,
  advertising: false,
  consentedAt: '',
  tcfVersion: '2.2',
};

/* -------------------------------------------------------------------------- */
/*  Context                                                                   */
/* -------------------------------------------------------------------------- */

const CookieConsentContext = createContext<CookieConsentContextValue>({
  analytics: false,
  advertising: false,
  openConsentBanner: () => {},
});

/* -------------------------------------------------------------------------- */
/*  Hook                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Returns the current cookie-consent state so any component can gate behaviour
 * behind analytics / advertising consent.
 *
 * ```ts
 * const { analytics, advertising } = useCookieConsent()
 * ```
 */
export function useCookieConsent(): CookieConsentContextValue {
  return useContext(CookieConsentContext);
}

/* -------------------------------------------------------------------------- */
/*  Internal helpers                                                          */
/* -------------------------------------------------------------------------- */

function readStoredConsent(): CookieConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (
      parsed !== null &&
      typeof parsed === 'object' &&
      'essential' in (parsed as Record<string, unknown>) &&
      'analytics' in (parsed as Record<string, unknown>) &&
      'advertising' in (parsed as Record<string, unknown>)
    ) {
      return parsed as CookieConsentState;
    }
    return null;
  } catch {
    return null;
  }
}

function writeConsent(state: CookieConsentState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Silently fail -- quota exceeded or private browsing.
  }
}

/* -------------------------------------------------------------------------- */
/*  AdSense Loader                                                            */
/* -------------------------------------------------------------------------- */

function AdSenseLoader(): React.JSX.Element | null {
  const { advertising } = useCookieConsent();
  const [loaded, setLoaded] = useState(false);
  const publisherId = getAdSensePublisherId();
  const hasConfiguredAdSlot = Boolean(
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESPONSIVE?.trim()
  );

  useEffect(() => {
    if (
      !advertising ||
      (!hasConfiguredAdSlot && !publisherId) ||
      loaded ||
      typeof window === 'undefined' ||
      !shouldLoadAdSense(window) ||
      process.env.NODE_ENV !== 'production'
    ) {
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
    );
    if (existing) {
      setLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = getAdSenseScriptSrc();
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
    setLoaded(true);
  }, [advertising, hasConfiguredAdSlot, loaded, publisherId]);

  return null;
}

/* -------------------------------------------------------------------------- */
/*  Google Analytics Loader                                                   */
/* -------------------------------------------------------------------------- */

function GoogleAnalyticsLoader(): React.JSX.Element | null {
  const { analytics } = useCookieConsent();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const gaId = process.env.NEXT_PUBLIC_GA_ID;

    // Validate GA Measurement ID format to prevent script injection via
    // a compromised or misconfigured environment variable.
    const GA_ID_PATTERN = /^G-[A-Z0-9]+$/;
    if (
      !analytics ||
      loaded ||
      !gaId ||
      !GA_ID_PATTERN.test(gaId) ||
      typeof window === 'undefined' ||
      process.env.NODE_ENV !== 'production'
    ) {
      return;
    }

    // gtag.js loader
    const gtagScript = document.createElement('script');
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    // Inline config
    const inlineScript = document.createElement('script');
    inlineScript.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `;
    document.head.appendChild(inlineScript);
    setLoaded(true);
  }, [analytics, loaded]);

  return null;
}

/* -------------------------------------------------------------------------- */
/*  Toggle Switch                                                             */
/* -------------------------------------------------------------------------- */

interface ToggleSwitchProps {
  id: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description: string;
}

function ToggleSwitch({
  id,
  checked,
  disabled = false,
  onChange,
  label,
  description,
}: ToggleSwitchProps): React.JSX.Element {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="flex-1 min-w-0">
        <label htmlFor={id} className="block text-sm font-semibold">
          {label}
        </label>
        <p className="mt-0.5 text-xs opacity-70">{description}</p>
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex h-6 w-11 shrink-0 items-center rounded-full
          transition-colors duration-200 focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
          ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
          ${checked ? 'bg-accent' : 'neumorph-inset'}
        `}
      >
        <span
          className={`
            pointer-events-none inline-block h-4 w-4 rounded-full
            bg-white dark:bg-gray-200 shadow-md transition-transform duration-200
            ${checked ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Banner Component                                                          */
/* -------------------------------------------------------------------------- */

function CookieConsentBanner({
  onAcceptAll,
  onRejectNonEssential,
  onSavePreferences,
  initialAnalytics,
  initialAdvertising,
}: {
  onAcceptAll: () => void;
  onRejectNonEssential: () => void;
  onSavePreferences: (analytics: boolean, advertising: boolean) => void;
  initialAnalytics: boolean;
  initialAdvertising: boolean;
}): React.JSX.Element {
  const { t } = useLocale();
  const [expanded, setExpanded] = useState(false);
  const initialAnalyticsRef = useRef(initialAnalytics);
  const initialAdvertisingRef = useRef(initialAdvertising);
  const [analyticsChecked, setAnalyticsChecked] = useState(initialAnalyticsRef.current);
  const [advertisingChecked, setAdvertisingChecked] = useState(initialAdvertisingRef.current);

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={t('cookie.banner.aria')}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[9999] px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 animate-slide-in-up"
    >
      <div className="consent-banner-shell pointer-events-auto mx-auto max-w-3xl p-4 sm:p-6">
        {/* Main message */}
        <div className="mb-3">
          <h2 className="mb-1 text-sm font-bold sm:text-base">{t('cookie.banner.title')}</h2>
          <p className="text-[11px] leading-4 opacity-80 sm:hidden">
            Choose which optional cookies to allow.
          </p>
          <p className="hidden text-sm opacity-80 leading-relaxed sm:block">
            {t('cookie.banner.body')}
          </p>
        </div>

        {/* Expandable preferences panel */}
        {expanded && (
          <div className="neumorph-inset p-4 mb-4 space-y-1">
            <ToggleSwitch
              id="cookie-essential"
              checked={true}
              disabled={true}
              onChange={() => {}}
              label={t('cookie.option.essential.label')}
              description={t('cookie.option.essential.desc')}
            />

            <div className="border-t border-current/10" />

            <ToggleSwitch
              id="cookie-analytics"
              checked={analyticsChecked}
              onChange={setAnalyticsChecked}
              label={t('cookie.option.analytics.label')}
              description={t('cookie.option.analytics.desc')}
            />

            <div className="border-t border-current/10" />

            <ToggleSwitch
              id="cookie-advertising"
              checked={advertisingChecked}
              onChange={setAdvertisingChecked}
              label={t('cookie.option.advertising.label')}
              description={t('cookie.option.advertising.desc')}
            />
          </div>
        )}

        {/* Action buttons */}
        <div className="grid grid-cols-2 items-stretch gap-2 sm:flex sm:flex-row sm:items-center sm:gap-3">
          {/* Accept All -- prominent */}
          <button
            type="button"
            onClick={onAcceptAll}
            className="neumorph-btn col-span-2 w-full justify-center !bg-accent !text-white font-semibold px-6 py-2.5 text-sm
                       hover:!bg-accent-dark focus-visible:ring-2 focus-visible:ring-accent
                       focus-visible:ring-offset-2 transition-opacity order-1 sm:col-span-1 sm:w-auto"
          >
            {t('cookie.action.acceptAll')}
          </button>

          {expanded ? (
            <button
              type="button"
              onClick={() => onSavePreferences(analyticsChecked, advertisingChecked)}
              className="neumorph-btn w-full justify-center text-accent font-semibold px-4 py-2.5 text-sm
                         focus-visible:ring-2 focus-visible:ring-accent
                         focus-visible:ring-offset-2 order-2 sm:w-auto"
            >
              {t('cookie.action.savePreferences')}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="neumorph-btn w-full justify-center text-accent font-medium px-4 py-2.5 text-sm
                         focus-visible:ring-2 focus-visible:ring-accent
                         focus-visible:ring-offset-2 order-2 sm:w-auto"
            >
              {t('cookie.action.managePreferences')}
            </button>
          )}

          {/* Reject Non-Essential */}
          <button
            type="button"
            onClick={onRejectNonEssential}
            className="neumorph-btn w-full justify-center text-sm opacity-70 hover:opacity-100 px-4 py-2.5
                       focus-visible:ring-2 focus-visible:ring-accent
                       focus-visible:ring-offset-2 transition-opacity order-3
                       sm:ml-auto sm:w-auto"
          >
            {t('cookie.action.rejectNonEssential')}
          </button>
        </div>

        {/* TCF 2.2 compliance note */}
        <p className="mt-3 hidden text-[11px] leading-snug text-[color:var(--foreground)] opacity-75 sm:block">
          {t('cookie.note.tcf')}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Provider (wraps the entire app)                                           */
/* -------------------------------------------------------------------------- */

export function CookieConsentProvider({ children }: { children: ReactNode }): React.JSX.Element {
  // Read dark mode to ensure the banner inherits the correct theme.
  // The actual dark class is applied higher in the tree by DarkModeProvider,
  // so we don't need to do anything with this value here -- we just ensure
  // the provider is mounted inside the preferences tree.
  usePreferences();

  const [consentState, setConsentState] = useState<{
    consent: CookieConsentState;
    bannerVisible: boolean;
    hydrated: boolean;
  }>({
    consent: DEFAULT_CONSENT,
    bannerVisible: false,
    hydrated: false,
  });
  const { consent, bannerVisible, hydrated } = consentState;

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = readStoredConsent();
    setConsentState({
      consent: stored ?? DEFAULT_CONSENT,
      bannerVisible: !stored,
      hydrated: true,
    });
  }, []);

  const persist = useCallback((next: CookieConsentState) => {
    setConsentState(prevState => ({
      ...prevState,
      consent: next,
      bannerVisible: false,
    }));
    writeConsent(next);
  }, []);

  const handleAcceptAll = useCallback(() => {
    persist({
      essential: true,
      analytics: true,
      advertising: true,
      consentedAt: new Date().toISOString(),
      tcfVersion: '2.2',
    });
  }, [persist]);

  const handleRejectNonEssential = useCallback(() => {
    persist({
      essential: true,
      analytics: false,
      advertising: false,
      consentedAt: new Date().toISOString(),
      tcfVersion: '2.2',
    });
  }, [persist]);

  const handleSavePreferences = useCallback(
    (analytics: boolean, advertising: boolean) => {
      persist({
        essential: true,
        analytics,
        advertising,
        consentedAt: new Date().toISOString(),
        tcfVersion: '2.2',
      });
    },
    [persist]
  );

  const openConsentBanner = useCallback(() => {
    setConsentState(prevState => ({
      ...prevState,
      bannerVisible: true,
    }));
  }, []);

  const contextValue: CookieConsentContextValue = {
    analytics: consent.analytics,
    advertising: consent.advertising,
    openConsentBanner,
  };

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {children}

      {/* Dynamic script loaders -- only render after hydration */}
      {hydrated && (
        <>
          <AdSenseLoader />
          <GoogleAnalyticsLoader />
        </>
      )}

      {/* Banner -- only render after hydration to avoid flash */}
      {hydrated && bannerVisible && (
        <CookieConsentBanner
          onAcceptAll={handleAcceptAll}
          onRejectNonEssential={handleRejectNonEssential}
          onSavePreferences={handleSavePreferences}
          initialAnalytics={consent.analytics}
          initialAdvertising={consent.advertising}
        />
      )}
    </CookieConsentContext.Provider>
  );
}
