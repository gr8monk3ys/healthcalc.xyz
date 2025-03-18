import { describe, it, expect } from 'vitest';
import {
  createOrganizationSchema,
  createWebsiteSchema,
  createBreadcrumbSchema,
  createFAQSchema,
  createArticleSchema,
  createCalculatorSchema,
} from './schema';

describe('createOrganizationSchema', () => {
  it('should create valid Organization schema', () => {
    const schema = createOrganizationSchema();
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Organization');
    expect(schema.name).toBe('HealthCheck');
    expect(schema.url).toBe('https://www.healthcalc.xyz');
  });

  it('should include logo URL', () => {
    const schema = createOrganizationSchema();
    expect(schema.logo).toBe('https://www.healthcalc.xyz/icons/icon-512x512.png');
  });

  it('should include contactPoint', () => {
    const schema = createOrganizationSchema();
    expect(schema.contactPoint).toEqual({
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@healthcalc.xyz',
      url: 'https://www.healthcalc.xyz/contact',
    });
  });

  it('should have sameAs as an array', () => {
    const schema = createOrganizationSchema();
    expect(Array.isArray(schema.sameAs)).toBe(true);
  });
});

describe('createWebsiteSchema', () => {
  it('should create valid WebSite schema', () => {
    const schema = createWebsiteSchema();
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('WebSite');
    expect(schema.name).toBe('HealthCheck');
    expect(schema.url).toBe('https://www.healthcalc.xyz');
  });

  it('should include SearchAction potential action', () => {
    const schema = createWebsiteSchema();
    const action = schema.potentialAction as Record<string, string>;
    expect(action['@type']).toBe('SearchAction');
    expect(action.target).toContain('{search_term_string}');
    expect(action['query-input']).toContain('search_term_string');
  });
});

describe('createBreadcrumbSchema', () => {
  it('should create valid BreadcrumbList schema', () => {
    const items = [
      { name: 'Home', url: 'https://www.healthcalc.xyz' },
      { name: 'BMI', url: 'https://www.healthcalc.xyz/bmi' },
    ];
    const schema = createBreadcrumbSchema(items);

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement).toHaveLength(2);
  });

  it('should assign 1-based positions', () => {
    const items = [
      { name: 'A', url: '/a' },
      { name: 'B', url: '/b' },
      { name: 'C', url: '/c' },
    ];
    const schema = createBreadcrumbSchema(items);
    const elements = schema.itemListElement as Array<{
      '@type': string;
      position: number;
      name: string;
      item: string;
    }>;

    expect(elements[0].position).toBe(1);
    expect(elements[1].position).toBe(2);
    expect(elements[2].position).toBe(3);
  });

  it('should include ListItem type for each element', () => {
    const items = [{ name: 'Home', url: '/' }];
    const schema = createBreadcrumbSchema(items);
    const elements = schema.itemListElement as Array<{ '@type': string }>;
    expect(elements[0]['@type']).toBe('ListItem');
  });

  it('should handle empty items array', () => {
    const schema = createBreadcrumbSchema([]);
    expect(schema.itemListElement).toHaveLength(0);
  });
});

describe('createFAQSchema', () => {
  it('should create valid FAQPage schema', () => {
    const questions = [
      { question: 'What is BMI?', answer: 'Body Mass Index...' },
      { question: 'How is BMI calculated?', answer: 'BMI = weight / height^2' },
    ];
    const schema = createFAQSchema(questions);

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity).toHaveLength(2);
  });

  it('should format questions as Question/Answer pairs', () => {
    const questions = [{ question: 'Q?', answer: 'A.' }];
    const schema = createFAQSchema(questions);
    const entity = (schema.mainEntity as Array<Record<string, unknown>>)[0];

    expect(entity['@type']).toBe('Question');
    expect(entity.name).toBe('Q?');
    const answer = entity.acceptedAnswer as Record<string, unknown>;
    expect(answer['@type']).toBe('Answer');
    expect(answer.text).toBe('A.');
  });

  it('should handle empty questions array', () => {
    const schema = createFAQSchema([]);
    expect(schema.mainEntity).toHaveLength(0);
  });
});

describe('createArticleSchema', () => {
  const baseArticle = {
    title: 'Understanding BMI',
    description: 'A guide to Body Mass Index',
    url: 'https://www.healthcalc.xyz/blog/understanding-bmi',
    datePublished: '2024-01-15',
    authorName: 'HealthCheck Team',
  };

  it('should create valid Article schema', () => {
    const schema = createArticleSchema(baseArticle);
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Article');
    expect(schema.headline).toBe(baseArticle.title);
    expect(schema.description).toBe(baseArticle.description);
  });

  it('should use default image when imageUrl not provided', () => {
    const schema = createArticleSchema(baseArticle);
    expect(schema.image).toBe('https://www.healthcalc.xyz/images/og-image.jpg');
  });

  it('should use provided imageUrl', () => {
    const schema = createArticleSchema({ ...baseArticle, imageUrl: 'https://img.test/photo.jpg' });
    expect(schema.image).toBe('https://img.test/photo.jpg');
  });

  it('should fall back dateModified to datePublished', () => {
    const schema = createArticleSchema(baseArticle);
    expect(schema.dateModified).toBe(baseArticle.datePublished);
  });

  it('should use explicit dateModified', () => {
    const schema = createArticleSchema({ ...baseArticle, dateModified: '2024-06-01' });
    expect(schema.dateModified).toBe('2024-06-01');
  });

  it('should include author as Person', () => {
    const schema = createArticleSchema(baseArticle);
    const author = schema.author as { '@type': string; name: string };
    expect(author['@type']).toBe('Person');
    expect(author.name).toBe('HealthCheck Team');
  });

  it('should include publisher with logo', () => {
    const schema = createArticleSchema(baseArticle);
    const publisher = schema.publisher as {
      '@type': string;
      name: string;
      logo: { '@type': string; url: string };
    };
    expect(publisher['@type']).toBe('Organization');
    expect(publisher.name).toBe('HealthCheck');
    expect(publisher.logo.url).toContain('icon-512x512.png');
  });

  it('should include mainEntityOfPage', () => {
    const schema = createArticleSchema(baseArticle);
    const mainEntity = schema.mainEntityOfPage as { '@type': string; '@id': string };
    expect(mainEntity['@type']).toBe('WebPage');
    expect(mainEntity['@id']).toBe(baseArticle.url);
  });
});

describe('createCalculatorSchema', () => {
  const baseCalc = {
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index',
    url: 'https://www.healthcalc.xyz/bmi',
  };

  it('should create valid SoftwareApplication schema', () => {
    const schema = createCalculatorSchema(baseCalc);
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('SoftwareApplication');
    expect(schema.name).toBe(baseCalc.name);
    expect(schema.description).toBe(baseCalc.description);
  });

  it('should default applicationCategory to HealthApplication', () => {
    const schema = createCalculatorSchema(baseCalc);
    expect(schema.applicationCategory).toBe('HealthApplication');
  });

  it('should default operatingSystem to Web', () => {
    const schema = createCalculatorSchema(baseCalc);
    expect(schema.operatingSystem).toBe('Web');
  });

  it('should allow overriding applicationCategory', () => {
    const schema = createCalculatorSchema({
      ...baseCalc,
      applicationCategory: 'FitnessApplication',
    });
    expect(schema.applicationCategory).toBe('FitnessApplication');
  });

  it('should allow overriding operatingSystem', () => {
    const schema = createCalculatorSchema({ ...baseCalc, operatingSystem: 'Any' });
    expect(schema.operatingSystem).toBe('Any');
  });

  it('should include free pricing offer', () => {
    const schema = createCalculatorSchema(baseCalc);
    const offers = schema.offers as { '@type': string; price: string; priceCurrency: string };
    expect(offers['@type']).toBe('Offer');
    expect(offers.price).toBe('0');
    expect(offers.priceCurrency).toBe('USD');
  });
});
