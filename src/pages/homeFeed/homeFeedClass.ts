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
import { Success } from "src/shared/responseModels/Success";
import { onValue, ref } from "firebase/database";

class HomeFeedClass {
  private static dlClient: DLClient;
  private static fbDatabase;

  async getHomeFeed(
    homeFeed: HomeFeed,
    dlClient: DLClient
  ): Promise<LMResponse<HomeFeedResponse>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(homeFeed);
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
      // const params = ModelConverter.requestBodyGenerator(invite);
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
  ): Promise<LMResponse<Success>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(participant);
      const resp = await dlClient.sendInvites(participant);
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

  async registerDevice(
    device: Device,
    dlClient: DLClient
  ): Promise<LMResponse<Success>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(device);
      const resp = await dlClient.registerDevice(device);
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

  async inviteAction(
    iaType: IaType,
    dlClient: DLClient
  ): Promise<LMResponse<Success>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(iaType);
      const resp = await dlClient.inviteAction(iaType);
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

  fbInstance(dlClient: DLClient) {
    try {
      return dlClient.fbInstance();
    } catch (error) {
      return error.message;
      // return new LMResponse<Success>(
      //   null,
      //   error.message || "An error occured",
      //   false
      // );
    }
  }

  homeFeedListener(callback: any, route: any, dlClient: DLClient) {
    try {
      return dlClient.homeFeedListener(callback, route);
    } catch (error) {
      return error.message;
      // return new LMResponse<Success>(
      //   null,
      //   error.message || "An error occured",
      //   false
      // );
    }
  }
}

export { HomeFeedClass as default };
