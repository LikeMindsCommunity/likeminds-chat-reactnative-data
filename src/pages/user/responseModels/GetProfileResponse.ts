import { Member } from "src/shared/responseModels/Member";

interface QuestionAnswer {
  answer: string;
  communityId: number;
  imageUrl: string;
  memberId: number;
  questionId: number;
}
interface MemberAction {
  // Define properties for the member action object here
}

export interface GetProfileResponse {
  communityName: string;
  member: Member;
  menu: MemberAction[];
  questionAnswers: QuestionAnswer[];
}
