import { ModelConverter } from "../../utils/ModelConverter";
import {
  FetchDMFeedRequest,
  CheckDMStatusRequest as CheckDMStatus,
  SendDMRequest as SendDMRequest,
  BlockMemberRequest as BlockMember,
  CID,
  CheckDMLimitWithUuidRequest as CheckDMLimitWithUuid,
  CreateDMChatroomWithUuidRequest as CreateDMChatroomWithUuid,
  CANDMWithUuid,
} from "@likeminds.community/chat-js/dist/pages/direct-message/types";
import { DMLimitResponse } from "./responseModels/DMLimitResponse";
import DLClient from "@likeminds.community/chat-js";
import { FetchDMResponse } from "./responseModels/FetchDMResponse";
import { DMStatusResponse } from "./responseModels/DMStatusResponse";
import { SendDMRequestResponse } from "./responseModels/SendDMRequestResponse";
import { CheckDMTabResponse } from "./responseModels/CheckDMTabResponse";
import LMResponse from "src/core/services/lmresponse";
import { CreateDMChatroomResponse } from "./responseModels/CreateDMChatroomResponse";
import { BlockDMRequestResponse } from "./responseModels/BlockDMRequestResponse";
import { GetDMFeedResponse } from "./responseModels/GetDMFeedResponse";
import { CanDMFeedResponse } from "./responseModels/CanDMFeedResponse";

class DirectMessageClient {
  async fetchDMFeed(
    fetchDMFeed: FetchDMFeedRequest,
    dlClient: DLClient
  ): Promise<LMResponse<FetchDMResponse>> {
    try {
      const resp = await dlClient.fetchDMFeed(fetchDMFeed);
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
    checkDMStatus: CheckDMStatus,
    dlClient: DLClient
  ): Promise<LMResponse<DMStatusResponse>> {
    try {
      const resp = await dlClient.checkDMStatus(checkDMStatus);
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
    checkDMLimit: CheckDMLimitWithUuid,
    dlClient: DLClient
  ) {
    return await dlClient.checkDMLimitWithUuid(checkDMLimit);
  }

  async createDMChatroom(
    createDMChatroom: CreateDMChatroomWithUuid,
    dlClient: DLClient
  ): Promise<LMResponse<CreateDMChatroomResponse>> {
    // @ts-ignore
    return await dlClient.createDMChatroomWithUuid(createDMChatroom);
  }

  async sendDMRequest(
    sendDMRequest: SendDMRequest,
    dlClient: DLClient
  ): Promise<LMResponse<SendDMRequestResponse>> {
    try {
      const resp = await dlClient.sendDMRequest(sendDMRequest);
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
    blockMember: BlockMember,
    dlClient: DLClient
  ): Promise<LMResponse<BlockDMRequestResponse>> {
    try {
      const resp = await dlClient.blockMember(blockMember);
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

  async checkDMTab(
    dlClient: DLClient
  ): Promise<LMResponse<CheckDMTabResponse>> {
    try {
      const resp = await dlClient.checkDMTab();
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

  async getDMFeed(
    cid: CID,
    dlClient: DLClient
  ): Promise<LMResponse<GetDMFeedResponse>> {
    try {
      const resp = await dlClient.getDMFeed(cid);
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

  async canDmFeed(
    dmCan: CANDMWithUuid,
    dlClient: DLClient
  ) {
    return await dlClient.canDmFeedWithUuid(dmCan);
  }
}

export { DirectMessageClient as default };
