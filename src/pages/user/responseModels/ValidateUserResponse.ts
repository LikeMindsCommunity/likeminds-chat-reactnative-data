import LMResponse from "src/core/services/lmresponse";
import { Community } from "src/shared/responseModels/Community";
import { User } from "src/shared/responseModels/User";

export interface ValidateUserResponse {
  community: Community;
  accessToken: string;
  refreshToken: string;
  user: User;
  appAccess: boolean;
  hasAnswers?: boolean;
  logoutResponse?: LMResponse<null> | null;
}
