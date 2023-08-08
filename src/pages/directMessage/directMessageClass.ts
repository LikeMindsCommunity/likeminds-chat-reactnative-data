import { ModelConverter } from "../../utils/ModelConverter";
import {
  FetchDMFeed,
  CheckDMStatus,
  CheckDMLimit,
  CreateDMChatroom,
  SendDMRequest,
  BlockMember,
  CID,
  CANDM,
} from "@likeminds.community/chat-js/dist/pages/direct-message/types";
import DLClient from "@likeminds.community/chat-js";
import { FetchDMResponse } from "./responseModels/FetchDMResponse";
import { DMStatusResponse } from "./responseModels/DMStatusResponse";
import { DMLimitResponse } from "./responseModels/DMLimitResponse";
import { SendDMRequestResponse } from "./responseModels/SendDMRequestResponse";
import { CheckDMTabResponse } from "./responseModels/CheckDMTabResponse";
import LMResponse from "../../core/services/lmresponse";
import { CreateDMChatroomResponse } from "./responseModels/CreateDMChatroomResponse";
import { BlockDMRequestResponse } from "./responseModels/BlockDMRequestResponse";
import { GetDMFeedResponse } from "./responseModels/GetDMFeedResponse";
import { CanDMFeedResponse } from "./responseModels/CanDMFeedResponse";

class DirectMessage {
  private static dlClient: DLClient;

  async fetchDMFeed(
    fetchDMFeed: FetchDMFeed
  ): Promise<LMResponse<FetchDMResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(fetchDMFeed);
      const resp = await DirectMessage.dlClient.conversationsFetch(params);
      const convertedResp: FetchDMResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<FetchDMResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<FetchDMResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async checkDMStatus(
    checkDMStatus: CheckDMStatus
  ): Promise<LMResponse<DMStatusResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(checkDMStatus);
      const resp = await DirectMessage.dlClient.checkDMStatus(params);
      const convertedResp: DMStatusResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<DMStatusResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<DMStatusResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async checkDMLimit(
    checkDMLimit: CheckDMLimit
  ): Promise<LMResponse<DMLimitResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(checkDMLimit);
      const resp = await DirectMessage.dlClient.checkDMLimit(params);
      const convertedResp: DMLimitResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<DMLimitResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<DMLimitResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }
  async createDMChatroom(
    createDMChatroom: CreateDMChatroom
  ): Promise<LMResponse<CreateDMChatroomResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(createDMChatroom);
      const resp = await DirectMessage.dlClient.checkDMLimit(params);
      const convertedResp: CreateDMChatroomResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<CreateDMChatroomResponse>(
        convertedResp,
        null,
        true
      );
    } catch (error) {
      return new LMResponse<CreateDMChatroomResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async sendDMRequest(
    sendDMRequest: SendDMRequest
  ): Promise<LMResponse<SendDMRequestResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(sendDMRequest);
      const resp = await DirectMessage.dlClient.sendDMRequest(params);
      const convertedResp: SendDMRequestResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<SendDMRequestResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<SendDMRequestResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async blockMember(
    blockMember: BlockMember
  ): Promise<LMResponse<BlockDMRequestResponse>> {
    try {
      const params = ModelConverter.requestBodyGenerator(blockMember);
      const resp = await DirectMessage.dlClient.blockMember(params);
      const convertedResp: BlockDMRequestResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<BlockDMRequestResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<BlockDMRequestResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async checkDMTab(): Promise<LMResponse<CheckDMTabResponse>> {
    try {
      const resp = await DirectMessage.dlClient.checkDMTab();
      const convertedResp: CheckDMTabResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<CheckDMTabResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<CheckDMTabResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async getDMFeed(cid: CID): Promise<LMResponse<GetDMFeedResponse>> {
    try {
      const resp = await DirectMessage.dlClient.getDMFeed(cid);
      const convertedResp: GetDMFeedResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<GetDMFeedResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<GetDMFeedResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async canDmFeed(dmCan: CANDM): Promise<LMResponse<CanDMFeedResponse>> {
    try {
      const resp = await DirectMessage.dlClient.canDmFeed(dmCan);
      const convertedResp: CanDMFeedResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<CanDMFeedResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<CanDMFeedResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }
}

export { DirectMessage as default };
