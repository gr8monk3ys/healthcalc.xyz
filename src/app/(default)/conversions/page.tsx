import { metadata as routeMetadata } from './layout';
export const metadata = routeMetadata;

import React from 'react';
import MeasurementConversionsClient from '@/components/conversions/MeasurementConversionsClient';
import { getConversionsCopy } from '@/i18n/pages/conversions';

export default function MeasurementConversionsPage() {
  return (
    <MeasurementConversionsClient
      copy={getConversionsCopy('en')}
      serverHeader={
        <>
          <h1 className="text-3xl font-bold mb-2">Measurement Conversions</h1>
          <p className="text-gray-600 mb-6 dark:text-gray-400">
            Convert between different units of measurement for weight, height, volume, and more
          </p>
        </>
      }
    />
  );
}
