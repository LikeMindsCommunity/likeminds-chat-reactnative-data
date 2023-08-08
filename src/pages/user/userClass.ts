import DLClient from "@likeminds.community/chat-js";
import LMResponse from "src/core/services/lmresponse";
import { ModelConverter } from "../../utils/ModelConverter";
import {
  InitUser,
  GetProfile,
  GetMemberChatroom,
  EditProfile,
  GetAllMembers,
  Logout,
  MemberState,
  USERTYPE,
  PROFILE,
  Members,
  Search,
} from "@likeminds.community/chat-js/dist/pages/user/types";
import { InitiateUserResponse } from "./responseModels/InitUserResponse";
import { GetProfileResponse } from "./responseModels/GetProfileResponse";
import { GetMemberResponse } from "./responseModels/GetMemberChatroomResponse";
import { GetQuestionsResponse } from "./responseModels/GetQuestionsResponse";
import { GetMemberStateResponse } from "./responseModels/GetMemberStateResponse";
import { SearchMembersResponse } from "./responseModels/SearchMembersResponse";
import { GetAllMembersResponse } from "./responseModels/GetAllMemberResponse";
import { Success } from "src/shared/responseModels/Success";

class UserClass {
  private static dlClient: DLClient;

  async initiateUser(
    initUser: InitUser
  ): Promise<LMResponse<InitiateUserResponse>> {
    try {
      const resp = await UserClass.dlClient.initiateUser(initUser);
      const convertedResp: InitiateUserResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<InitiateUserResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<InitiateUserResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async logout(logout: Logout): Promise<LMResponse<Success>> {
    try {
      const resp = await UserClass.dlClient.logout(logout);
      const convertedResp: Success = ModelConverter.responseBodyParser(resp);
      return new LMResponse<Success>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<Success>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async getProfile(
    getProfile: GetProfile
  ): Promise<LMResponse<GetProfileResponse>> {
    try {
      const resp = await UserClass.dlClient.getProfile(getProfile);
      const convertedResp: GetProfileResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<GetProfileResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<GetProfileResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async getMemberChatroom(
    getMemberChatroom: GetMemberChatroom
  ): Promise<LMResponse<GetMemberResponse>> {
    try {
      const resp = await UserClass.dlClient.getMemberChatroom(
        getMemberChatroom
      );
      const convertedResp: GetMemberResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<GetMemberResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<GetMemberResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async getQuestions(): Promise<LMResponse<GetQuestionsResponse>> {
    try {
      const resp = await UserClass.dlClient.getQuestions();
      const convertedResp: GetQuestionsResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<GetQuestionsResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<GetQuestionsResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async getMemberState(): Promise<LMResponse<GetMemberStateResponse>> {
    try {
      const resp = await UserClass.dlClient.getMemberState();
      const convertedResp: GetMemberStateResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<GetMemberStateResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<GetMemberStateResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async editProfile(editProfile: EditProfile): Promise<LMResponse<Success>> {
    try {
      const resp = await UserClass.dlClient.editProfile(editProfile);
      const convertedResp: Success = ModelConverter.responseBodyParser(resp);
      return new LMResponse<Success>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<Success>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async searchMembers(
    search: Search
  ): Promise<LMResponse<SearchMembersResponse>> {
    try {
      const resp = await UserClass.dlClient.searchMembers(search);
      const convertedResp: SearchMembersResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<SearchMembersResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<SearchMembersResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async getAllMembers(
    getAllMembers: GetAllMembers
  ): Promise<LMResponse<GetAllMembersResponse>> {
    try {
      const resp = await UserClass.dlClient.getAllMembers(getAllMembers);
      const convertedResp: GetAllMembersResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<GetAllMembersResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<GetAllMembersResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }
}

export { UserClass as default };
