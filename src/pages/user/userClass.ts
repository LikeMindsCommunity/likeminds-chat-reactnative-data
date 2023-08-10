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
    initUser: InitUser,
    dlClient: DLClient
  ): Promise<LMResponse<InitiateUserResponse>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(initUser);
      // console.log("params", params);
      const resp = await dlClient.initiateUser(initUser);
      console.log("respInitial", resp);
      const convertedResp: InitiateUserResponse =
        ModelConverter.responseBodyParser(resp);
      console.log("convertedResp", convertedResp);
      const temp = new LMResponse<InitiateUserResponse>(
        convertedResp,
        null,
        true
      );
      console.log("tempuserClass", temp);
      return temp;
    } catch (error) {
      return new LMResponse<InitiateUserResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async logout(
    logout: Logout,
    dlClient: DLClient
  ): Promise<LMResponse<Success>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(logout);
      const resp = await dlClient.logout(logout);
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
    getProfile: GetProfile,
    dlClient: DLClient
  ): Promise<LMResponse<GetProfileResponse>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(getProfile);
      const resp = await dlClient.getProfile(getProfile);
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
    getMemberChatroom: GetMemberChatroom,
    dlClient: DLClient
  ): Promise<LMResponse<GetMemberResponse>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(getMemberChatroom);
      const resp = await dlClient.getMemberChatroom(getMemberChatroom);
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

  async getQuestions(
    dlClient: DLClient
  ): Promise<LMResponse<GetQuestionsResponse>> {
    try {
      const resp = await dlClient.getQuestions();
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

  async getMemberState(
    dlClient: DLClient
  ): Promise<LMResponse<GetMemberStateResponse>> {
    try {
      const resp = await dlClient.getMemberState();
      console.log("respGetMember", resp);
      const convertedResp: GetMemberStateResponse =
        ModelConverter.responseBodyParser(resp);
      console.log("convertedRespGetMember", convertedResp);
      const temp = new LMResponse<GetMemberStateResponse>(
        convertedResp,
        null,
        true
      );
      console.log("tempGetMemberState", temp);
      return temp;
    } catch (error) {
      return new LMResponse<GetMemberStateResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async editProfile(
    editProfile: EditProfile,
    dlClient: DLClient
  ): Promise<LMResponse<Success>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(editProfile);
      const resp = await dlClient.editProfile(editProfile);
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
    search: Search,
    dlClient: DLClient
  ): Promise<LMResponse<SearchMembersResponse>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(search);
      const resp = await dlClient.searchMembers(search);
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
    getAllMembers: GetAllMembers,
    dlClient: DLClient
  ): Promise<LMResponse<GetAllMembersResponse>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(getAllMembers);
      const resp = await dlClient.getAllMembers(getAllMembers);
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
