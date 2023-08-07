interface Member {
  customTitle: string;
  id: number;
  imageUrl: string;
  isOwner: boolean;
  memberSince: string;
  name: string;
  route: string;
  state: number;
  updatedAt: number;
}

interface Question {
  canAddOptions: boolean;
  community: number;
  field: boolean;
  helpText: string;
  id: number;
  isCompulsory: boolean;
  isHidden: boolean;
  optional: boolean;
  questionTitle: string;
  rank: number;
  removeState: boolean;
  state: number;
  value: string;
}

interface QuestionAnswer {
  answer: string;
  communityId: number;
  imageUrl: string;
  memberId: number;
  questionId: number;
}

interface Data {
  communityName: string;
  member: Member;
  menu: any[]; // Replace 'any' with the appropriate type if you know the structure of the menu
  questionAnswers: QuestionAnswer[];
}

export interface GetProfileResponse {
  success: boolean;
  data: Data;
}
