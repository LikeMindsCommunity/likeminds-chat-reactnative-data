import DLClient from "@likeminds.community/chat-js";
import LMResponse from "src/core/services/lmresponse";
import { ModelConverter } from "../../utils/ModelConverter";
import {
  PostPollConversationRequest,
  GetPollUsersRequest,
  AddPollOptionRequest,
  SubmitPollRequest,
} from "@likeminds.community/chat-js/dist/pages/poll/types";
import { PostPollConversationResponse } from "./responseModels/PostPollConversationResponse";
import { GetPollUsersResponse } from "./responseModels/GetPollUserResponse";
import { AddPollResponse } from "./responseModels/AddPollResponse";
import { Success } from "src/shared/responseModels/Success";

class PollClass {
  private static dlClient: DLClient;

  async postPollConversation(
    postPollConversationRequest: PostPollConversationRequest
  ): Promise<LMResponse<PostPollConversationResponse>> {
    try {
      const resp = await PollClass.dlClient.postPollConversation(
        postPollConversationRequest
      );
      const convertedResp: PostPollConversationResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<PostPollConversationResponse>(
        convertedResp,
        null,
        true
      );
    } catch (error) {
      return new LMResponse<PostPollConversationResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async getPollUsers(
    getPollUsersRequest: GetPollUsersRequest
  ): Promise<LMResponse<GetPollUsersResponse>> {
    try {
      const resp = await PollClass.dlClient.getPollUsers(getPollUsersRequest);
      const convertedResp: GetPollUsersResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<GetPollUsersResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<GetPollUsersResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async addPollOption(
    addPollOptionRequest: AddPollOptionRequest
  ): Promise<LMResponse<AddPollResponse>> {
    try {
      const resp = await PollClass.dlClient.addPollOption(addPollOptionRequest);
      const convertedResp: AddPollResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<AddPollResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<AddPollResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async submitPoll(
    submitPollRequest: SubmitPollRequest
  ): Promise<LMResponse<Success>> {
    try {
      const resp = await PollClass.dlClient.submitPoll(submitPollRequest);
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
}

export { PollClass as default };
