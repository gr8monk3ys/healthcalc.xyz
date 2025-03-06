export type WaterIntakeActivity = 'low' | 'moderate' | 'high';

interface WaterIntakeActivityOption {
  value: WaterIntakeActivity;
  label: string;
  description: string;
  additionalMl: number;
}

export const WATER_INTAKE_BASE_ML_PER_KG = 35;

export const WATER_INTAKE_ACTIVITY_OPTIONS: WaterIntakeActivityOption[] = [
  {
    value: 'low',
    label: 'Low activity',
    description: 'Mostly sedentary or light daily movement',
    additionalMl: 0,
  },
  {
    value: 'moderate',
    label: 'Moderate activity',
    description: 'Regular workouts or active job',
    additionalMl: 350,
  },
  {
    value: 'high',
    label: 'High activity',
    description: 'Intense training or hot climate',
    additionalMl: 700,
  },
];
