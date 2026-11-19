import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CalculatorPageLayout from './CalculatorPageLayout';

vi.mock('@/context/LocaleContext', () => ({
  useLocale: () => ({
    locale: 'en',
    setLocale: vi.fn(),
    localizePath: (path: string) => path,
    t: (key: string) => key,
  }),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/bmi',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

const FAQS = [
  { question: 'What is BMI?', answer: 'Weight divided by height squared.' },
  { question: 'Is BMI accurate?', answer: 'It is a screening tool, not a diagnosis.' },
];

function renderLayout(faqs: typeof FAQS) {
  return render(
    <CalculatorPageLayout
      title="BMI Calculator"
      description="Calculate your BMI"
      calculatorSlug="bmi"
      faqs={faqs}
      relatedArticles={[]}
      structuredData={{ '@context': 'https://schema.org', '@type': 'WebPage' }}
    >
      <div />
    </CalculatorPageLayout>
  );
}

function faqSchemas(container: HTMLElement): Element[] {
  return Array.from(container.querySelectorAll('script[data-schema-type="FAQPage"]'));
}

describe('CalculatorPageLayout FAQ structured data', () => {
  it('emits exactly one FAQPage block covering every visible question', () => {
    const { container, getByText } = renderLayout(FAQS);
    const schemas = faqSchemas(container);

    expect(schemas).toHaveLength(1);
    expect(
      JSON.parse(schemas[0].textContent ?? '').mainEntity.map(
        (entity: { name: string }) => entity.name
      )
    ).toEqual(FAQS.map(faq => faq.question));
    for (const faq of FAQS) {
      expect(getByText(faq.question)).toBeInTheDocument();
    }
  });

  it('emits no FAQPage block when there are no FAQs', () => {
    const { container } = renderLayout([]);

    expect(container.querySelector('script[data-schema-type="WebPage"]')).not.toBeNull();
    expect(faqSchemas(container)).toHaveLength(0);
  });
});
