import DLClient from "@likeminds.community/chat-js";
import LMResponse from "src/core/services/lmresponse";
import { ModelConverter } from "../../utils/ModelConverter";
import { HomeFeedResponse } from "./responseModels/HomeFeedResponse";
import {
  HomeFeed,
  CRid,
  INVITE,
  IaType,
  Device,
  Participant,
} from "@likeminds.community/chat-js/dist/pages/home-feed/types";
import { GetInvitesResponse } from "./responseModels/GetInvitesResponse";
import { Nothing } from "src/shared/responseModels/Nothing";
import { GetExploreTabCountResponse } from "./responseModels/GetExploreTabCountResponse";
import { API } from "src/shared/constants/api.constant";

class HomeFeedClient {
  async getExploreTabCount(
    dlClient: DLClient
  ): Promise<LMResponse<GetExploreTabCountResponse>> {
    return dlClient
      .makeAuthenticatedRequest(`${API.GET_EXPLORE_TAB_COUNT}`)
      .then((resData: any) => {
        // Handle the response and return the LMResponse object
        const responseData: GetExploreTabCountResponse =
          ModelConverter.responseBodyParser(resData);

        return new LMResponse<GetExploreTabCountResponse>(
          responseData,
          null,
          true
        );
      })
      .catch((error) => {
        return new LMResponse<GetExploreTabCountResponse>(
          null,
          error.message || "An error occurred",
          false
        );
      });
  }

  async getHomeFeed(
    homeFeed: HomeFeed,
    dlClient: DLClient
  ): Promise<LMResponse<HomeFeedResponse>> {
    try {
      const resp = await dlClient.getHomeFeed(homeFeed);
      const convertedResp: HomeFeedResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<HomeFeedResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<HomeFeedResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async getInvites(
    invite: INVITE,
    dlClient: DLClient
  ): Promise<LMResponse<GetInvitesResponse>> {
    try {
      const resp = await dlClient.getInvites(invite);
      const convertedResp: GetInvitesResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<GetInvitesResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<GetInvitesResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async sendInvites(
    participant: Participant,
    dlClient: DLClient
  ): Promise<LMResponse<Nothing>> {
    try {
      const resp = await dlClient.sendInvites(participant);
      const convertedResp: Nothing = ModelConverter.responseBodyParser(resp);
      return new LMResponse<Nothing>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<Nothing>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async registerDevice(
    device: Device,
    dlClient: DLClient
  ): Promise<LMResponse<Nothing>> {
    try {
      const resp = await dlClient.registerDevice(device);
      const convertedResp: Nothing = ModelConverter.responseBodyParser(resp);
      return new LMResponse<Nothing>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<Nothing>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async inviteAction(
    iaType: IaType,
    dlClient: DLClient
  ): Promise<LMResponse<Nothing>> {
    try {
      const resp = await dlClient.inviteAction(iaType);
      const convertedResp: Nothing = ModelConverter.responseBodyParser(resp);
      return new LMResponse<Nothing>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<Nothing>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  firebaseInstance(dlClient: DLClient) {
    try {
      return dlClient.fbInstance();
    } catch (error) {
      return error.message;
    }
  }

  homeFeedListener(callback: any, route: any, dlClient: DLClient) {
    try {
      return dlClient.homeFeedListener(callback, route);
    } catch (error) {
      return error.message;
    }
  }
}

export { HomeFeedClient as default };
