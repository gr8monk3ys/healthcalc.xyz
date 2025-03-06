export type HeartRateZoneId = 'zone1' | 'zone2' | 'zone3' | 'zone4' | 'zone5';

interface HeartRateZoneDefinition {
  id: HeartRateZoneId;
  label: string;
  minPercent: number;
  maxPercent: number;
  description: string;
}

export const HEART_RATE_ZONE_DEFINITIONS: HeartRateZoneDefinition[] = [
  {
    id: 'zone1',
    label: 'Zone 1 (Recovery)',
    minPercent: 50,
    maxPercent: 60,
    description: 'Very light effort for recovery and warm-ups.',
  },
  {
    id: 'zone2',
    label: 'Zone 2 (Endurance)',
    minPercent: 60,
    maxPercent: 70,
    description: 'Easy aerobic pace that builds endurance and fat oxidation.',
  },
  {
    id: 'zone3',
    label: 'Zone 3 (Tempo)',
    minPercent: 70,
    maxPercent: 80,
    description: 'Moderate effort for improving aerobic capacity.',
  },
  {
    id: 'zone4',
    label: 'Zone 4 (Threshold)',
    minPercent: 80,
    maxPercent: 90,
    description: 'Hard effort near lactate threshold for speed development.',
  },
  {
    id: 'zone5',
    label: 'Zone 5 (VO2 Max)',
    minPercent: 90,
    maxPercent: 100,
    description: 'Maximum effort intervals to improve VO2 max.',
  },
];
