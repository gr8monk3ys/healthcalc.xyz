import nextConfig from 'eslint-config-next';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...nextConfig,
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'none',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Disable overly strict rules for common React patterns
      'react-hooks/set-state-in-effect': 'off', // setMounted(true) in useEffect is standard for SSR hydration
      'react-hooks/immutability': 'off', // window.location.href assignment is valid
      'react-hooks/refs': 'off', // ref comparison in render is sometimes needed
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],
      'react/no-unescaped-entities': 'off',
    },
  },
  // Allow console statements in test files (needed for testing logger output)
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    rules: {
      'no-console': 'off',
    },
  },
];
