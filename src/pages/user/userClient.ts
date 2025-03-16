import DLClient, { LMSeverity } from "@likeminds.community/chat-js";
import LMResponse from "src/core/services/lmresponse";
import { ModelConverter } from "../../utils/ModelConverter";
import {
  GetAllMembersRequest as GetAllMembers,
  LogoutRequest as Logout,
  Search,
  InitUserWithUuid,
  EditProfile,
  LeaveCommunityRequest as LeaveCommunity,
} from "@likeminds.community/chat-js/dist/pages/user/types";
import { InitiateUserResponse } from "./responseModels/InitUserResponse";
import { GetMemberStateResponse } from "./responseModels/GetMemberStateResponse";
import { SearchMembersResponse } from "./responseModels/SearchMembersResponse";
import { GetAllMembersResponse } from "./responseModels/GetAllMemberResponse";
import { Nothing } from "src/shared/responseModels/Nothing";
import { API } from "src/shared/constants/api.constant";
import { AddMemberToCohort } from "./responseModels/AddMemberToCohort";
import { clearDb } from "src/localDb/db/queries/appConfig";
import LMChatLogger from "../errorLogger/LMChatLogger";

class UserClient {
  async initiateUser(
    initUser: InitUserWithUuid,
    dlClient: DLClient
  ) {
    return await dlClient.initiateUserWithUuid(initUser);
  }

  async logout(
    logout: Logout,
    dlClient: DLClient
  ): Promise<LMResponse<Nothing>> {
    try {
      const resp = await dlClient.logout(logout);
      const convertedResp: Nothing = ModelConverter.responseBodyParser(resp);
      // to clear localDb
      await clearDb();
      return new LMResponse<Nothing>(convertedResp, null, true);
    } catch (error) {
      await LMChatLogger.handleException(
        error,
        error?.stack,
        LMSeverity.INFO
      )
      return new LMResponse<Nothing>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async leaveCommunity(
    leaveCommunity: LeaveCommunity,
    dlClient: DLClient
  ): Promise<LMResponse<Nothing>> {
    try {
      const resp = await dlClient.leaveCommunity(leaveCommunity);
      const convertedResp: Nothing = ModelConverter.responseBodyParser(resp);
      return new LMResponse<Nothing>(convertedResp, null, true);
    } catch (error) {
      await LMChatLogger.handleException(
        error,
        error?.stack,
        LMSeverity.INFO
      )
      return new LMResponse<Nothing>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async addMemberToCohort(
    addMemberToCohort: AddMemberToCohort,
    dlClient: DLClient
  ): Promise<LMResponse<Nothing>> {
    const params = ModelConverter.requestBodyGenerator(addMemberToCohort);
    return dlClient
      .makeAuthenticatedRequest(`${API.PUT_MEMBER_TO_COHORT}`, {
        params: params,
      })
      .then((response) => {
        // Handle the response and return the LMResponse object
        const responseData: Nothing =
          ModelConverter.responseBodyParser(response);
        return new LMResponse<Nothing>(responseData, null, true);
      })
      .catch((error) => {
        LMChatLogger.handleException(
          error,
          error?.stack,
          LMSeverity.INFO
        )
        return new LMResponse<Nothing>(
          null,
          error.message || "An error occurred",
          false
        );
      });
  }

  async getMemberState(
    dlClient: DLClient
  ): Promise<LMResponse<GetMemberStateResponse>> {
    try {
      const resp = await dlClient.getMemberState();
      const convertedResp: GetMemberStateResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<GetMemberStateResponse>(convertedResp, null, true);
    } catch (error) {
      await LMChatLogger.handleException(
        error,
        error?.stack,
        LMSeverity.INFO
      )
      return new LMResponse<GetMemberStateResponse>(
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
      const resp = await dlClient.searchMembers(search);
      const convertedResp: SearchMembersResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<SearchMembersResponse>(convertedResp, null, true);
    } catch (error) {
      await LMChatLogger.handleException(
        error,
        error?.stack,
        LMSeverity.INFO
      )
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
      const resp = await dlClient.getAllMembers(getAllMembers);
      const convertedResp: GetAllMembersResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<GetAllMembersResponse>(convertedResp, null, true);
    } catch (error) {
      await LMChatLogger.handleException(
        error,
        error?.stack,
        LMSeverity.INFO
      )
      return new LMResponse<GetAllMembersResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async editProfile(
    editProfile: EditProfile,
    dlClient: DLClient
  ): Promise<LMResponse<Nothing>> {
    try {
      const resp = await dlClient.editProfile(editProfile);
      const convertedResp: Nothing = ModelConverter.responseBodyParser(resp);
      return new LMResponse<Nothing>(convertedResp, null, true);
    } catch (error) {
      await LMChatLogger.handleException(
        error,
        error?.stack,
        LMSeverity.INFO
      )
      return new LMResponse<Nothing>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }
}

export { UserClient as default };
