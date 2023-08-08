import DLClient from "@likeminds.community/chat-js";
import LMResponse from "src/core/services/lmresponse";
import { ModelConverter } from "../../utils/ModelConverter";
import {
  SearchType,
  SearchConversation,
} from "@likeminds.community/chat-js/dist/pages/search/types";
import { SearchChatroomResponse } from "./responseModels/SearchChatroomResponse";
import { SearchConversationResponse } from "./responseModels/SearchConversationResponse";

class SearchClass {
  private static dlClient: DLClient;

  async searchChatroom(
    searchType: SearchType
  ): Promise<LMResponse<SearchChatroomResponse>> {
    try {
      const resp = await SearchClass.dlClient.searchChatroom(searchType);
      const convertedResp: SearchChatroomResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<SearchChatroomResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<SearchChatroomResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }

  async searchConversation(
    searchConversation: SearchConversation
  ): Promise<LMResponse<SearchConversationResponse>> {
    try {
      const resp = await SearchClass.dlClient.searchConversation(
        searchConversation
      );
      const convertedResp: SearchConversationResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<SearchConversationResponse>(
        convertedResp,
        null,
        true
      );
    } catch (error) {
      return new LMResponse<SearchConversationResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }
}

export { SearchClass as default };
