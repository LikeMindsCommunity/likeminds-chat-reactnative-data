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
  async postPollConversation(
    postPollConversationRequest: PostPollConversationRequest,
    dlClient: DLClient
  ): Promise<LMResponse<PostPollConversationResponse>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(
      //   postPollConversationRequest
      // );
      const resp = await dlClient.postPollConversation(
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
    getPollUsersRequest: GetPollUsersRequest,
    dlClient: DLClient
  ): Promise<LMResponse<GetPollUsersResponse>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(getPollUsersRequest);
      const resp = await dlClient.getPollUsers(getPollUsersRequest);
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
    addPollOptionRequest: AddPollOptionRequest,
    dlClient: DLClient
  ): Promise<LMResponse<AddPollResponse>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(addPollOptionRequest);
      const resp = await dlClient.addPollOption(addPollOptionRequest);
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
    submitPollRequest: SubmitPollRequest,
    dlClient: DLClient
  ): Promise<LMResponse<Success>> {
    try {
      // const params = ModelConverter.requestBodyGenerator(submitPollRequest);
      const resp = await dlClient.submitPoll(submitPollRequest);
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
