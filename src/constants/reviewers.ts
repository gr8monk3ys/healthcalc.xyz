export interface Reviewer {
  name: string;
  credentials: string;
  title: string;
  imageUrl?: string;
  bio?: string;
}

/** Content is credited to the team; individual reviewers are only named when
 *  they are real, verifiable people. */
export const EDITORIAL_TEAM: Reviewer = {
  name: 'HealthCalc Editorial Team',
  credentials: '',
  title: 'Editorial Review Board',
};
