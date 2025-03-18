/**
 * SEO utility functions for generating meta tags, canonical URLs, and other SEO-related data
 */
import { getPublicSiteUrl, toAbsoluteUrl } from '@/lib/site';

/**
 * Generates a canonical URL for a given path
 * @param path - The path to generate a canonical URL for
 * @returns The canonical URL
 */
export function getCanonicalUrl(path: string): string {
  const baseUrl = getPublicSiteUrl();
  const normalizedPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

/**
 * Truncates a string to a specified length, ensuring it doesn't cut off in the middle of a word
 * @param text - The text to truncate
 * @param maxLength - The maximum length of the truncated text
 * @returns The truncated text
 */
export function truncateText(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text;

  // Find the last space before the maxLength
  const lastSpace = text.substring(0, maxLength).lastIndexOf(' ');

  // If no space found, just cut at maxLength
  if (lastSpace === -1) return `${text.substring(0, maxLength)}...`;

  // Otherwise, cut at the last space and add ellipsis
  return `${text.substring(0, lastSpace)}...`;
}

/**
 * Generates a meta description from content
 * @param content - The content to generate a meta description from
 * @param maxLength - The maximum length of the meta description
 * @returns The generated meta description
 */
export function generateMetaDescription(content: string, maxLength: number = 160): string {
  // Remove HTML tags
  const textContent = content.replace(/<[^>]*>/g, ' ');

  // Remove extra whitespace
  const cleanText = textContent.replace(/\s+/g, ' ').trim();

  // Truncate to maxLength
  return truncateText(cleanText, maxLength);
}

/**
 * Generates keywords from content
 * @param content - The content to generate keywords from
 * @param additionalKeywords - Additional keywords to include
 * @param maxKeywords - The maximum number of keywords to include
 * @returns The generated keywords as a comma-separated string
 */
export function generateKeywords(
  content: string,
  additionalKeywords: string[] = [],
  maxKeywords: number = 10
): string {
  // Remove HTML tags and extra whitespace
  const textContent = content
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Common words to exclude
  const stopWords = new Set([
    'a',
    'an',
    'the',
    'and',
    'or',
    'but',
    'in',
    'on',
    'at',
    'to',
    'for',
    'with',
    'by',
    'about',
    'as',
    'into',
    'like',
    'through',
    'after',
    'before',
    'between',
    'from',
    'up',
    'down',
    'of',
    'off',
    'over',
    'under',
    'again',
    'further',
    'then',
    'once',
    'here',
    'there',
    'when',
    'where',
    'why',
    'how',
    'all',
    'any',
    'both',
    'each',
    'few',
    'more',
    'most',
    'other',
    'some',
    'such',
    'no',
    'nor',
    'not',
    'only',
    'own',
    'same',
    'so',
    'than',
    'too',
    'very',
    'can',
    'will',
    'just',
    'should',
    'now',
    'if',
    'this',
    'that',
    'these',
    'those',
    'is',
    'are',
    'was',
    'were',
    'be',
    'been',
    'being',
    'have',
    'has',
    'had',
    'having',
    'do',
    'does',
    'did',
    'doing',
  ]);

  // Split into words, filter out stop words, and count occurrences
  const words = textContent
    .toLowerCase()
    .split(/\W+/)
    .filter(word => word.length > 3 && !stopWords.has(word));

  const wordCounts: Record<string, number> = {};
  words.forEach(word => {
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  });

  // Sort by frequency
  const sortedWords = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word);

  // Combine with additional keywords and limit to maxKeywords
  const allKeywords = Array.from(new Set([...additionalKeywords, ...sortedWords]));
  const finalKeywords = allKeywords.slice(0, maxKeywords);

  return finalKeywords.join(', ');
}

/**
 * Generates a slug from a string
 * @param text - The text to generate a slug from
 * @returns The generated slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
    .trim();
}

/**
 * Formats a date for SEO purposes (ISO format)
 * @param date - The date to format
 * @returns The formatted date
 */
export function formatSeoDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString();
}

/**
 * Generates image metadata for SEO
 * @param src - The image source URL
 * @param alt - The image alt text
 * @param width - The image width
 * @param height - The image height
 * @returns The image metadata object
 */
export function generateImageMetadata(
  src: string,
  alt: string,
  width: number,
  height: number
): { url: string; width: number; height: number; alt: string } {
  const absoluteSrc = toAbsoluteUrl(src);

  return {
    url: absoluteSrc,
    width,
    height,
    alt,
  };
}

/**
 * Generates structured data for a breadcrumb
 * @param items - The breadcrumb items
 * @returns The structured data object
 */
export function generateBreadcrumbData(
  items: { name: string; url: string }[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generates structured data for an article
 * @param article - The article data
 * @returns The structured data object
 */
export function generateArticleData(article: {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.imageUrl || toAbsoluteUrl('/images/og-image.jpg'),
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'HealthCheck',
      logo: {
        '@type': 'ImageObject',
        url: toAbsoluteUrl('/icons/icon-512x512.png'),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  };
}

/**
 * Generates structured data for a FAQ page
 * @param faqs - The FAQs
 * @returns The structured data object
 */
export function generateFaqData(
  faqs: { question: string; answer: string }[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates structured data for a calculator tool
 * @param calculator - The calculator data
 * @returns The structured data object
 */
export function generateCalculatorData(calculator: {
  name: string;
  description: string;
  url: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: calculator.name,
    description: calculator.description,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: calculator.url,
  };
}
