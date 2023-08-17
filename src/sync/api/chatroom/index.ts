import LMResponse from "src/core/services/lmresponse";
import { API } from "src/shared/constants/api.constant";
// import NetworkLibrary from "src/core/services/networklibrary";
import { ModelConverter } from "src/utils/ModelConverter";
import { SyncChatroomResponse } from "src/sync/model/syncChatroomResponse";
import SyncChatroomRequest from "src/sync/model/syncChatroomRequest";
import DLClient from "@likeminds.community/chat-js";

class SyncClient {

  //   async syncChatroom(
  //     request: SyncChatroomRequest
  //   ): Promise<LMResponse<SyncChatroomResponse>> {
  //     const params = ModelConverter.requestBodyGenerator(request);
  //     return this.networkLibrary
  //       .makeAuthenticatedRequest(`${API.CHATROOM_SYNC}`, {
  //         method: "POST",
  //         data: params,
  //       })
  //       .then((resData: any) => {
  //         // Handle the response and return the LMResponse object
  //         const responseData: SyncChatroomResponse =
  //           ModelConverter.responseBodyParser(resData.data);

  //         return new LMResponse<SyncChatroomResponse>(responseData, null, true);
  //       })
  //       .catch((error) => {
  //         return new LMResponse<SyncChatroomResponse>(
  //           null,
  //           error.message || "An error occurred",
  //           false
  //         );
  //       });
  //   }

  async syncChatroom(
    request: SyncChatroomRequest,
    dlClient: DLClient
  ): Promise<LMResponse<SyncChatroomResponse>> {
    const params = ModelConverter.requestBodyGenerator(request);
    return dlClient
      .makeAuthenticatedRequest(`${API.CHATROOM_SYNC}`)
      .then((resData: any) => {
        // Handle the response and return the LMResponse object
        const responseData: SyncChatroomResponse =
          ModelConverter.responseBodyParser(resData.data);

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
}

export default SyncClient;
