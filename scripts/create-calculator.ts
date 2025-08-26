import fs from 'node:fs';
import path from 'node:path';

interface Args {
  slug?: string;
  title?: string;
  description?: string;
  dryRun?: boolean;
}

const args = parseArgs(process.argv.slice(2));

if (!args.slug || !args.title) {
  printUsage();
  process.exit(1);
}

const slug = normalizeSlug(args.slug);
const title = args.title.trim();
const description =
  args.description?.trim() || `Calculate your ${title.toLowerCase()} with evidence-based formulas.`;
const camel = toCamel(slug);
const pascal = toPascal(slug);
const componentDir = path.join('src', 'components', 'calculators', slug);
const appDir = path.join('src', 'app', slug);

const files: Array<{ filePath: string; content: string }> = [
  {
    filePath: path.join(appDir, 'layout.tsx'),
    content: layoutTemplate({ title, description, slug }),
  },
  {
    filePath: path.join(appDir, 'page.client.tsx'),
    content: pageClientTemplate({ title, description, slug, pascal }),
  },
  {
    filePath: path.join(appDir, 'page.tsx'),
    content: pageServerTemplate({ title, description }),
  },
  {
    filePath: path.join(componentDir, `${pascal}Result.tsx`),
    content: resultTemplate({ title, pascal, camel }),
  },
  {
    filePath: path.join(componentDir, `${pascal}Info.tsx`),
    content: infoTemplate({ title, pascal }),
  },
  {
    filePath: path.join('src', 'utils', 'calculators', `${camel}.ts`),
    content: utilTemplate({ pascal, camel }),
  },
  {
    filePath: path.join('src', 'utils', 'calculators', `${camel}.test.ts`),
    content: testTemplate({ pascal, camel }),
  },
  {
    filePath: path.join('src', 'types', `${camel}.ts`),
    content: typesTemplate({ pascal }),
  },
  {
    filePath: path.join('src', 'constants', `${camel}.ts`),
    content: constantsTemplate({ pascal }),
  },
];

writeFiles(files, args.dryRun ?? false);

function parseArgs(argv: string[]): Args {
  const parsed: Args = {};

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];

    switch (arg) {
      case '--slug':
        parsed.slug = next;
        i += 1;
        break;
      case '--title':
        parsed.title = next;
        i += 1;
        break;
      case '--description':
        parsed.description = next;
        i += 1;
        break;
      case '--dry-run':
        parsed.dryRun = true;
        break;
      default:
        break;
    }
  }

  return parsed;
}

function printUsage() {
  console.log('Usage: bun run create:calculator -- --slug "sleep" --title "Sleep Calculator"');
  console.log('Optional: --description "..." --dry-run');
}

function normalizeSlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function toCamel(slugValue: string): string {
  return slugValue
    .split('-')
    .map((segment, index) =>
      index === 0 ? segment : segment.charAt(0).toUpperCase() + segment.slice(1)
    )
    .join('');
}

function toPascal(slugValue: string): string {
  return slugValue
    .split('-')
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');
}

function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function writeFiles(fileEntries: Array<{ filePath: string; content: string }>, dryRun: boolean) {
  fileEntries.forEach(({ filePath, content }) => {
    const directory = path.dirname(filePath);
    ensureDir(directory);

    if (dryRun) {
      console.log(`[dry-run] ${filePath}`);
      return;
    }

    if (fs.existsSync(filePath)) {
      console.log(`Skipping existing file: ${filePath}`);
      return;
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Created ${filePath}`);
  });
}

function layoutTemplate({
  title,
  description,
  slug,
}: {
  title: string;
  description: string;
  slug: string;
}) {
  return `import type { Metadata } from 'next';\nimport { ReactNode } from 'react';\n\nexport const metadata: Metadata = {\n  title: '${title} | HealthCheck',\n  description: '${description}',\n  alternates: {\n    canonical: 'https://www.healthcalc.xyz/${slug}',\n  },\n  openGraph: {\n    title: '${title} | HealthCheck',\n    description: '${description}',\n    type: 'website',\n    url: 'https://www.healthcalc.xyz/${slug}',\n    images: [\n      {\n        url: '/images/calculators/${slug}-calculator.jpg',\n        width: 1200,\n        height: 630,\n        alt: '${title}',\n      },\n    ],\n  },\n  twitter: {\n    card: 'summary_large_image',\n    title: '${title} | HealthCheck',\n    description: '${description}',\n    images: ['/images/calculators/${slug}-calculator.jpg'],\n  },\n};\n\nexport default function ${toPascal(slug)}Layout({ children }: { children: ReactNode }) {\n  return <>{children}</>;\n}\n`;
}

function pageServerTemplate({ title, description }: { title: string; description: string }) {
  return `import PageClient from './page.client';\n\nimport { metadata as routeMetadata } from './layout';\nexport const metadata = routeMetadata;\n\nexport default function Page() {\n  return (\n    <PageClient\n      serverHeader={\n        <>\n          <h1 className="text-3xl font-bold mb-2">${title}</h1>\n          <p className="text-gray-600 mb-6 dark:text-gray-400">${description}</p>\n        </>\n      }\n    />\n  );\n}\n`;
}

function pageClientTemplate({
  title,
  description,
  slug,
  pascal,
}: {
  title: string;
  description: string;
  slug: string;
  pascal: string;
}) {
  return `'use client';\n\nimport React, { useState, useCallback } from 'react';\nimport CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';\nimport CalculatorForm from '@/components/calculators/CalculatorForm';\nimport CalculatorErrorDisplay from '@/components/calculators/CalculatorErrorDisplay';\nimport ${pascal}Result from '@/components/calculators/${slug}/${pascal}Result';\nimport ${pascal}Info from '@/components/calculators/${slug}/${pascal}Info';\nimport { isEmpty } from '@/utils/validation';\nimport { calculate${pascal} } from '@/utils/calculators/${toCamel(slug)}';\nimport type { ${pascal}Result as ${pascal}ResultType } from '@/types/${toCamel(slug)}';\n\nconst faqs = [\n  {\n    question: 'How is this calculated?',\n    answer: 'This calculator uses standard formulas to provide a reliable estimate. Use it as a helpful starting point.',\n  },\n  {\n    question: 'How often should I recalculate?',\n    answer: 'Recalculate whenever your measurements or goals change to keep recommendations accurate.',\n  },\n  {\n    question: 'Is this medical advice?',\n    answer: 'No. This tool provides estimates and is not a substitute for professional medical advice.',\n  },\n];\n\nconst relatedArticles = [\n  {\n    title: 'TDEE Explained: Calculate Your Daily Calorie Needs',\n    description: 'Understand how daily energy expenditure impacts your goals.',\n    slug: 'tdee-explained',\n    date: 'February 15, 2025',\n    readTime: '12 min read',\n    category: 'Metabolism',\n  },\n];\n\nexport default function ${pascal}Calculator({ serverHeader }: { serverHeader?: React.ReactNode }) {\n  const [input, setInput] = useState<number | ''>('');\n  const [errors, setErrors] = useState<{ input?: string }>({});\n  const [result, setResult] = useState<${pascal}ResultType | null>(null);\n  const [calculationError, setCalculationError] = useState<string | null>(null);\n\n  const handleSubmit = useCallback(\n    (event: React.FormEvent) => {\n      event.preventDefault();\n      setCalculationError(null);\n\n      const newErrors: { input?: string } = {};\n      if (isEmpty(input)) {\n        newErrors.input = 'This field is required';\n      }\n\n      setErrors(newErrors);\n\n      if (Object.keys(newErrors).length === 0 && typeof input === 'number') {\n        try {\n          setResult(calculate${pascal}(input));\n        } catch (error) {\n          setCalculationError('Unable to calculate. Please double-check your input.');\n        }\n      }\n    },\n    [input]\n  );\n\n  const handleReset = useCallback(() => {\n    setInput('');\n    setErrors({});\n    setResult(null);\n    setCalculationError(null);\n  }, []);\n\n  return (\n    <CalculatorPageLayout\n      serverHeader={serverHeader}\n      title="${title}"\n      description="${description}"\n      calculatorSlug="${slug}"\n      faqs={faqs}\n      relatedArticles={relatedArticles}\n      structuredData={{\n        '@context': 'https://schema.org',\n        '@type': 'WebPage',\n        name: '${title}',\n        description: '${description}',\n        url: 'https://www.healthcalc.xyz/${slug}',\n      }}\n      understandingSection={<${pascal}Info />}\n    >\n      <div className="md:col-span-1">\n        <CalculatorForm\n          title="${title}"\n          onSubmit={handleSubmit}\n          onReset={handleReset}\n          fields={[\n            {\n              name: 'input',\n              label: 'Input',\n              type: 'number',\n              value: input,\n              onChange: setInput,\n              error: errors.input,\n              placeholder: 'Enter a value',\n            },\n          ]}\n        />\n        <CalculatorErrorDisplay error={calculationError} />\n      </div>\n\n      <div className="md:col-span-2">\n        <${pascal}Result result={result} />\n      </div>\n    </CalculatorPageLayout>\n  );\n}\n`;
}

function resultTemplate({
  title,
  pascal,
  camel,
}: {
  title: string;
  pascal: string;
  camel: string;
}) {
  return `import React from 'react';\nimport type { ${pascal}Result } from '@/types/${camel}';\n\ninterface ${pascal}ResultProps {\n  result: ${pascal}Result | null;\n}\n\nexport default function ${pascal}Result({ result }: ${pascal}ResultProps) {\n  if (!result) {\n    return (\n      <div className=\"neumorph p-6 rounded-lg\">\n        <h2 className=\"text-xl font-semibold mb-2\">${title} Result</h2>\n        <p className=\"text-gray-600\">Enter your details to see results.</p>\n      </div>\n    );\n  }\n\n  return (\n    <div className=\"neumorph p-6 rounded-lg\">\n      <h2 className=\"text-xl font-semibold mb-2\">${title} Result</h2>\n      <p className=\"text-3xl font-bold text-accent\">{result.value}</p>\n    </div>\n  );\n}\n`;
}

function infoTemplate({ title, pascal }: { title: string; pascal: string }) {
  return `import React from 'react';\n\nexport default function ${pascal}Info() {\n  return (\n    <div className=\"neumorph p-6 rounded-lg my-8\">\n      <h2 className=\"text-2xl font-semibold mb-4\">About the ${title}</h2>\n      <p className=\"text-gray-600\">\n        This calculator provides a fast, evidence-based estimate to guide your next steps. Use the\n        results as a starting point and consult a qualified professional for personalized advice.\n      </p>\n    </div>\n  );\n}\n`;
}

function utilTemplate({ pascal, camel }: { pascal: string; camel: string }) {
  return `import type { ${pascal}Result } from '@/types/${camel}';\n\nexport function calculate${pascal}(input: number): ${pascal}Result {\n  return {\n    value: input,\n  };\n}\n`;
}

function testTemplate({ pascal, camel }: { pascal: string; camel: string }) {
  return `import { describe, it, expect } from 'vitest';\nimport { calculate${pascal} } from './${camel}';\n\n describe('${pascal} Calculator', () => {\n  it('returns a result', () => {\n    const result = calculate${pascal}(42);\n    expect(result.value).toBe(42);\n  });\n});\n`;
}

function typesTemplate({ pascal }: { pascal: string }) {
  return `export interface ${pascal}Result {\n  value: number;\n}\n`;
}

function constantsTemplate({ pascal }: { pascal: string }) {
  return `export const ${pascal.toUpperCase()}_PLACEHOLDER = true;\n`;
}
