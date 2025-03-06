export interface CalorieResult {
  bmr: number;
  tdee: number;
  activityMultiplier: number;
  dailyCalories: {
    maintain: number;
    mildLoss: number;
    moderateLoss: number;
    extremeLoss: number;
    mildGain: number;
    moderateGain: number;
    extremeGain: number;
  };
}
