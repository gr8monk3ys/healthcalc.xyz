import { describe, it, expect } from 'vitest';
import {
  getCanonicalUrl,
  truncateText,
  generateMetaDescription,
  generateKeywords,
  generateSlug,
  formatSeoDate,
  generateImageMetadata,
  generateBreadcrumbData,
  generateArticleData,
  generateFaqData,
  generateCalculatorData,
} from './seo';

describe('getCanonicalUrl', () => {
  it('should return base URL for root path', () => {
    expect(getCanonicalUrl('/')).toBe('https://www.healthcalc.xyz');
  });

  it('should append path with leading slash', () => {
    expect(getCanonicalUrl('/bmi')).toBe('https://www.healthcalc.xyz/bmi');
  });

  it('should add leading slash when missing', () => {
    expect(getCanonicalUrl('bmi')).toBe('https://www.healthcalc.xyz/bmi');
  });

  it('should handle nested paths', () => {
    expect(getCanonicalUrl('/blog/best-bmi-scales')).toBe(
      'https://www.healthcalc.xyz/blog/best-bmi-scales'
    );
  });

  it('should handle empty string', () => {
    expect(getCanonicalUrl('')).toBe('https://www.healthcalc.xyz/');
  });
});

describe('truncateText', () => {
  it('should return text unchanged when shorter than maxLength', () => {
    expect(truncateText('Short text', 160)).toBe('Short text');
  });

  it('should truncate at word boundary', () => {
    const longText = 'This is a sentence that is significantly longer than the limit we set';
    const result = truncateText(longText, 30);
    expect(result.length).toBeLessThanOrEqual(33); // 30 + "..."
    expect(result.endsWith('...')).toBe(true);
    expect(result).not.toMatch(/\s\.\.\.$/); // should not have space before ellipsis
  });

  it('should cut at maxLength when no space found', () => {
    const noSpaces = 'abcdefghijklmnopqrstuvwxyz';
    const result = truncateText(noSpaces, 10);
    expect(result).toBe('abcdefghij...');
  });

  it('should use default maxLength of 160', () => {
    const text = 'a '.repeat(100);
    const result = truncateText(text);
    expect(result.length).toBeLessThanOrEqual(163);
  });

  it('should handle exact maxLength match', () => {
    const text = 'Exact length';
    expect(truncateText(text, 12)).toBe('Exact length');
  });
});

describe('generateMetaDescription', () => {
  it('should strip HTML tags', () => {
    const html = '<p>This is <strong>bold</strong> text</p>';
    const result = generateMetaDescription(html);
    expect(result).not.toContain('<');
    expect(result).toContain('bold');
  });

  it('should collapse extra whitespace', () => {
    const text = 'Multiple   spaces   between   words';
    const result = generateMetaDescription(text);
    expect(result).toBe('Multiple spaces between words');
  });

  it('should truncate to maxLength', () => {
    const longContent = 'word '.repeat(100);
    const result = generateMetaDescription(longContent, 50);
    expect(result.length).toBeLessThanOrEqual(53); // 50 + "..."
  });

  it('should handle empty input', () => {
    expect(generateMetaDescription('')).toBe('');
  });
});

describe('generateKeywords', () => {
  it('should extract frequent words', () => {
    const content = 'health calculator health body health weight calculator';
    const result = generateKeywords(content);
    expect(result).toContain('health');
    expect(result).toContain('calculator');
  });

  it('should filter stop words', () => {
    const content = 'the and or but with health calculator';
    const result = generateKeywords(content);
    expect(result).not.toMatch(/\bthe\b/);
    expect(result).not.toMatch(/\band\b/);
  });

  it('should include additional keywords', () => {
    const result = generateKeywords('health calculator', ['bmi', 'fitness']);
    expect(result).toContain('bmi');
    expect(result).toContain('fitness');
  });

  it('should respect maxKeywords limit', () => {
    const content = 'alpha beta gamma delta epsilon zeta health weight body mass index';
    const result = generateKeywords(content, [], 3);
    const keywords = result.split(', ');
    expect(keywords.length).toBeLessThanOrEqual(3);
  });

  it('should deduplicate keywords', () => {
    const result = generateKeywords('health health health', ['health']);
    const keywords = result.split(', ');
    const unique = new Set(keywords);
    expect(keywords.length).toBe(unique.size);
  });

  it('should strip HTML from content before extracting', () => {
    const html = '<p>health <strong>calculator</strong> body</p>';
    const result = generateKeywords(html);
    expect(result).toContain('health');
  });

  it('should filter words with 3 or fewer characters', () => {
    const content = 'the bmi is not good but health calculator';
    const result = generateKeywords(content);
    expect(result).not.toMatch(/\bbmi\b/);
  });
});

describe('generateSlug', () => {
  it('should convert to lowercase', () => {
    expect(generateSlug('BMI Calculator')).toBe('bmi-calculator');
  });

  it('should replace spaces with hyphens', () => {
    expect(generateSlug('body fat calculator')).toBe('body-fat-calculator');
  });

  it('should remove special characters', () => {
    expect(generateSlug('BMI & Body Fat!')).toBe('bmi-body-fat');
  });

  it('should collapse multiple hyphens', () => {
    expect(generateSlug('BMI---Calculator')).toBe('bmi-calculator');
  });

  it('should handle empty string', () => {
    expect(generateSlug('')).toBe('');
  });
});

describe('formatSeoDate', () => {
  it('should format a Date object to ISO string', () => {
    const date = new Date('2024-06-15T00:00:00Z');
    expect(formatSeoDate(date)).toBe(date.toISOString());
  });

  it('should parse and format a date string', () => {
    const result = formatSeoDate('2024-06-15');
    expect(result).toContain('2024-06-15');
  });
});

describe('generateImageMetadata', () => {
  it('should return metadata with absolute URL for relative src', () => {
    const result = generateImageMetadata('/images/og.jpg', 'OG Image', 1200, 630);
    expect(result).toEqual({
      url: 'https://www.healthcalc.xyz/images/og.jpg',
      width: 1200,
      height: 630,
      alt: 'OG Image',
    });
  });

  it('should preserve absolute URLs', () => {
    const result = generateImageMetadata('https://cdn.example.com/img.jpg', 'CDN', 800, 600);
    expect(result.url).toBe('https://cdn.example.com/img.jpg');
  });

  it('should add leading slash for relative paths without one', () => {
    const result = generateImageMetadata('images/test.jpg', 'Test', 400, 300);
    expect(result.url).toBe('https://www.healthcalc.xyz/images/test.jpg');
  });
});

describe('generateBreadcrumbData', () => {
  it('should create valid BreadcrumbList schema', () => {
    const items = [
      { name: 'Home', url: 'https://www.healthcalc.xyz' },
      { name: 'BMI', url: 'https://www.healthcalc.xyz/bmi' },
    ];
    const result = generateBreadcrumbData(items);

    expect(result['@context']).toBe('https://schema.org');
    expect(result['@type']).toBe('BreadcrumbList');
    expect(result.itemListElement).toHaveLength(2);
  });

  it('should assign sequential positions starting at 1', () => {
    const items = [
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
      { name: 'Post', url: '/blog/post' },
    ];
    const result = generateBreadcrumbData(items);
    const elements = result.itemListElement as Array<{ position: number }>;

    expect(elements[0].position).toBe(1);
    expect(elements[1].position).toBe(2);
    expect(elements[2].position).toBe(3);
  });
});

describe('generateArticleData', () => {
  const article = {
    title: 'How to Calculate BMI',
    description: 'A guide to BMI calculation',
    url: 'https://www.healthcalc.xyz/blog/bmi-guide',
    datePublished: '2024-01-15',
    authorName: 'HealthCheck Team',
  };

  it('should create valid Article schema', () => {
    const result = generateArticleData(article);
    expect(result['@context']).toBe('https://schema.org');
    expect(result['@type']).toBe('Article');
    expect(result.headline).toBe(article.title);
  });

  it('should use default image when imageUrl not provided', () => {
    const result = generateArticleData(article);
    expect(result.image).toBe('https://www.healthcalc.xyz/images/og-image.jpg');
  });

  it('should use provided imageUrl when given', () => {
    const result = generateArticleData({ ...article, imageUrl: 'https://img.test/photo.jpg' });
    expect(result.image).toBe('https://img.test/photo.jpg');
  });

  it('should fall back dateModified to datePublished', () => {
    const result = generateArticleData(article);
    expect(result.dateModified).toBe(article.datePublished);
  });

  it('should use explicit dateModified when provided', () => {
    const result = generateArticleData({ ...article, dateModified: '2024-06-01' });
    expect(result.dateModified).toBe('2024-06-01');
  });

  it('should include publisher info', () => {
    const result = generateArticleData(article);
    const publisher = result.publisher as { name: string };
    expect(publisher.name).toBe('HealthCheck');
  });
});

describe('generateFaqData', () => {
  it('should create valid FAQPage schema', () => {
    const faqs = [
      { question: 'What is BMI?', answer: 'Body Mass Index is a measure...' },
      { question: 'How accurate is BMI?', answer: 'BMI is a general indicator...' },
    ];
    const result = generateFaqData(faqs);

    expect(result['@context']).toBe('https://schema.org');
    expect(result['@type']).toBe('FAQPage');
    expect(result.mainEntity).toHaveLength(2);
  });

  it('should format each FAQ as Question with Answer', () => {
    const faqs = [{ question: 'Q?', answer: 'A.' }];
    const result = generateFaqData(faqs);
    const entity = (result.mainEntity as Array<Record<string, unknown>>)[0];

    expect(entity['@type']).toBe('Question');
    expect(entity.name).toBe('Q?');
    const answer = entity.acceptedAnswer as Record<string, unknown>;
    expect(answer['@type']).toBe('Answer');
    expect(answer.text).toBe('A.');
  });
});

describe('generateCalculatorData', () => {
  it('should create valid SoftwareApplication schema', () => {
    const calc = {
      name: 'BMI Calculator',
      description: 'Calculate your BMI',
      url: 'https://www.healthcalc.xyz/bmi',
    };
    const result = generateCalculatorData(calc);

    expect(result['@context']).toBe('https://schema.org');
    expect(result['@type']).toBe('SoftwareApplication');
    expect(result.applicationCategory).toBe('HealthApplication');
    expect(result.operatingSystem).toBe('Web');
  });

  it('should include free pricing offer', () => {
    const calc = { name: 'Test', description: 'Desc', url: '/test' };
    const result = generateCalculatorData(calc);
    const offers = result.offers as { price: string; priceCurrency: string };

    expect(offers.price).toBe('0');
    expect(offers.priceCurrency).toBe('USD');
  });
});
