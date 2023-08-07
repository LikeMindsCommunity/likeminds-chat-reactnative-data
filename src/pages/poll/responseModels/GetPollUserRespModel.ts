interface Member {
  communityId: number;
  createdAt: number;
  id: number;
  imageUrl: string;
  isGuest: boolean;
  isOwner: boolean;
  memberSince: string;
  name: string;
  questionAnswers: QuestionAnswer[];
  route: string;
  sdkClientInfo: null | any; // Replace 'any' with the appropriate type if you know the structure
  state: number;
  userUniqueId: string;
  uuid: string;
}

interface QuestionAnswer {
  communityId: number;
  directoryFields: boolean;
  isHidden: boolean;
  memberId: number;
  questionId: number;
  questionTitle: string;
  state: number;
  value: string;
}

interface Data {
  success: boolean;
  data: {
    members: Member[];
  };
}

export interface GetPollUsersResponse {
  success: boolean;
  data: Data;
}
