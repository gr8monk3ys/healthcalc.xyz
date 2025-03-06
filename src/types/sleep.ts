export type SleepMode = 'wake' | 'bed';

export interface SleepTimeRecommendation {
  cycles: number;
  time: string;
  hours: number;
}

export interface SleepResult {
  mode: SleepMode;
  inputTime: string;
  recommendations: SleepTimeRecommendation[];
  note: string;
}
