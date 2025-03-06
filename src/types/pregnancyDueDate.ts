export type PregnancyDueDateMethod = 'lmp' | 'conception';

export interface PregnancyMilestones {
  firstTrimesterEnd: string;
  secondTrimesterEnd: string;
  thirdTrimesterStart: string;
}

export interface PregnancyDueDateResult {
  method: PregnancyDueDateMethod;
  inputDate: string;
  dueDate: string;
  gestationalWeeks?: number;
  milestones: PregnancyMilestones;
}
