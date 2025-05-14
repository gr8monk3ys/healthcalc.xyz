'use client';

import React from 'react';
import { useLocale } from '@/context/LocaleContext';

export default function SkipToMainLink(): React.JSX.Element {
  const { t } = useLocale();
  return (
    <a href="#main-content" className="skip-link">
      {t('layout.skipToMain')}
    </a>
  );
}
