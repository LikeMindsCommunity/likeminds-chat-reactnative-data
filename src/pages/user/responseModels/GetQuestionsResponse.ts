import { Community } from "src/shared/responseModels/Community";
import { Question } from "src/shared/responseModels/Questions";

export interface GetQuestionsResponse {
  community: Community;
  header: string;
  questions: Question[];
  title: string;
}
