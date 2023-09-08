import LMResponse from "src/core/services/lmresponse";
import { API } from "src/shared/constants/api.constant";
import { ModelConverter } from "src/utils/ModelConverter";
import { SyncChatroomResponse } from "src/sync/model/syncChatroomResponse";
import SyncChatroomRequest from "src/sync/model/syncChatroomRequest";
import DLClient from "@likeminds.community/chat-js";
import SyncConversationRequest from "../model/syncConversationRequest";
import { SyncConversationResponse } from "../model/syncConversationResponse";

class SyncClient {
  async syncChatroom(
    request: SyncChatroomRequest,
    dlClient: DLClient
  ): Promise<LMResponse<SyncChatroomResponse>> {
    const params = ModelConverter.requestBodyGenerator(request);
    const customParamsSerializer = (params) => {
      const serializedParams = [];
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const paramValue = params[key];
          if (Array.isArray(paramValue)) {
            // Serialize arrays as "key=[paramValue]"
            serializedParams.push(`${key}=[${paramValue}]`);
          } else {
            // Serialize other values as "key=value"
            serializedParams.push(`${key}=${paramValue}`);
          }
        }
      }
      return serializedParams.join("&");
    };

    return dlClient
      .makeAuthenticatedRequest(`${API.CHATROOM_SYNC}`, {
        params: params,
        paramsSerializer: customParamsSerializer,
      })
      .then((resData: any) => {
        // Handle the response and return the LMResponse object
        const responseData: SyncChatroomResponse =
          ModelConverter.responseBodyParser(resData);

        return new LMResponse<SyncChatroomResponse>(responseData, null, true);
      })
      .catch((error) => {
        return new LMResponse<SyncChatroomResponse>(
          null,
          error.message || "An error occurred",
          false
        );
      });
  }

  async syncConversation(
    request: SyncConversationRequest,
    dlClient: DLClient
  ): Promise<LMResponse<SyncConversationResponse>> {
    const params = ModelConverter.requestBodyGenerator(request);
    // request;
    return dlClient
      .makeAuthenticatedRequest(`${API.CONVERSATION_SYNC}`, { params: params })
      .then((resData: any) => {
        // Handle the response and return the LMResponse object
        const responseData: SyncConversationResponse =
          ModelConverter.responseBodyParser(resData);

        return new LMResponse<SyncConversationResponse>(
          responseData,
          null,
          true
        );
      })
      .catch((error) => {
        return new LMResponse<SyncConversationResponse>(
          null,
          error.message || "An error occurred",
          false
        );
      });
  }
}

export default SyncClient;
