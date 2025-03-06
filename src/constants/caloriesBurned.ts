interface CaloriesBurnedActivity {
  value: string;
  label: string;
  met: number;
  description: string;
}

export const CALORIES_BURNED_ACTIVITIES: CaloriesBurnedActivity[] = [
  { value: 'walking_3', label: 'Walking (3.0 mph)', met: 3.3, description: 'Brisk walk pace' },
  { value: 'walking_4', label: 'Walking (4.0 mph)', met: 5.0, description: 'Very brisk walk' },
  { value: 'running_5', label: 'Running (5.0 mph)', met: 8.3, description: '12 min/mile' },
  { value: 'running_6', label: 'Running (6.0 mph)', met: 9.8, description: '10 min/mile' },
  { value: 'cycling_light', label: 'Cycling (light)', met: 5.8, description: 'Leisure pace' },
  { value: 'cycling_mod', label: 'Cycling (moderate)', met: 7.5, description: '10-12 mph' },
  { value: 'swimming', label: 'Swimming (laps)', met: 6.0, description: 'Moderate effort' },
  { value: 'elliptical', label: 'Elliptical', met: 5.0, description: 'Moderate resistance' },
  { value: 'strength', label: 'Strength Training', met: 6.0, description: 'Moderate lifting' },
  { value: 'hiit', label: 'HIIT / Circuit', met: 8.0, description: 'High intensity' },
  { value: 'yoga', label: 'Yoga', met: 2.5, description: 'Hatha flow' },
  { value: 'basketball', label: 'Basketball', met: 6.5, description: 'Recreational play' },
];
