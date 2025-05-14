'use client';

import React from 'react';
import StructuredData, {
  createOrganizationSchema,
  createWebsiteSchema,
} from '@/components/StructuredData';

/**
 * GlobalStructuredData component for adding organization and website structured data
 * This is a client component that wraps the StructuredData component
 */
export default function GlobalStructuredData() {
  return (
    <>
      <StructuredData data={createOrganizationSchema()} />
      <StructuredData data={createWebsiteSchema()} />
    </>
  );
}
