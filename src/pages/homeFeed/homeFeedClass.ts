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

  async getHomeFeed(homeFeed: HomeFeed): Promise<LMResponse<HomeFeedResponse>> {
    try {
      const resp = await HomeFeedClass.dlClient.getHomeFeed(homeFeed);
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

  async getInvites(invite: INVITE): Promise<LMResponse<GetInvitesResponse>> {
    try {
      const resp = await HomeFeedClass.dlClient.getInvites(invite);
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

  async sendInvites(participant: Participant): Promise<LMResponse<Success>> {
    try {
      const resp = await HomeFeedClass.dlClient.sendInvites(participant);
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

  async registerDevice(device: Device): Promise<LMResponse<Success>> {
    try {
      const resp = await HomeFeedClass.dlClient.registerDevice(device);
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

  async inviteAction(iaType: IaType): Promise<LMResponse<Success>> {
    try {
      const resp = await HomeFeedClass.dlClient.inviteAction(iaType);
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

  fbInstance() {
    try {
      HomeFeedClass.fbDatabase = HomeFeedClass.dlClient.fbInstance();
      return HomeFeedClass.fbDatabase;
    } catch (error) {
      return new LMResponse<Success>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  homeFeedListener(callback: any, route: any) {
    try {
      const query = ref(HomeFeedClass.fbDatabase, route);
      return onValue(query, (snapshot) => {
        if (snapshot.exists()) {
          callback(snapshot.val());
        }
      });
    } catch (error) {
      return new LMResponse<Success>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }
}

export { HomeFeedClass as default };
