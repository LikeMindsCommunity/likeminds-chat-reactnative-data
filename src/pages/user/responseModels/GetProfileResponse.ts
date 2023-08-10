import { Member } from "src/shared/responseModels/Member";
import { MemberAction } from "src/shared/responseModels/MemberAction";

interface QuestionAnswer {
  answer: string;
  communityId: number;
  imageUrl: string;
  memberId: number;
  questionId: number;
}

export interface GetProfileResponse {
  communityName: string;
  member: Member;
  menu: MemberAction[];
  questionAnswers: QuestionAnswer[];
}
