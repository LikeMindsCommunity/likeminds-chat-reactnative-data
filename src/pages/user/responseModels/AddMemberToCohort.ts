interface CohortRight {
  id: number;
  title: string;
  state: number;
  isSelected: boolean;
  isLocked: boolean;
  subTitle?: string; // Optional for certain rights
}

export interface AddMemberToCohort {
  cohortId: number;
  rights?: CohortRight[];
  memberIds?: number[];
  name?: string;
  uuids: string[];
}
