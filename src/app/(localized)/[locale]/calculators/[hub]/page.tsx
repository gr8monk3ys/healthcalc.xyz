import { defaultLocale, supportedLocales, type SupportedLocale } from '@/i18n/config';
import {
  generateStaticParams as generateStaticParamsBase,
  generateMetadata,
} from '@/app/calculators/[hub]/page';

export { default } from '@/app/calculators/[hub]/page';
export { generateMetadata };

export function generateStaticParams(): Array<{ locale: SupportedLocale; hub: string }> {
  const hubs = generateStaticParamsBase();
  const locales = supportedLocales.filter(locale => locale !== defaultLocale);
  return locales.flatMap(locale => hubs.map(item => ({ locale, hub: item.hub })));
}
