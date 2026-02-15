import { defaultLocale, supportedLocales, type SupportedLocale } from '@/i18n/config';
import {
  generateStaticParams as generateStaticParamsBase,
  generateMetadata,
} from '@/app/calculator/[slug]/page';

export { default } from '@/app/calculator/[slug]/page';
export { generateMetadata };

export function generateStaticParams(): Array<{ locale: SupportedLocale; slug: string }> {
  const slugs = generateStaticParamsBase();
  const locales = supportedLocales.filter(locale => locale !== defaultLocale);
  return locales.flatMap(locale => slugs.map(item => ({ locale, slug: item.slug })));
}
