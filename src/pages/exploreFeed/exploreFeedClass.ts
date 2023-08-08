import DLClient from "@likeminds.community/chat-js";
import LMResponse from "src/core/services/lmresponse";
import { ModelConverter } from "../../utils/ModelConverter";
import { ExploreFeedData } from "@likeminds.community/chat-js/dist/pages/explore-feed/types";
import { ExploreFeedResponse } from "./responseModels/ExploreFeedResponse";

class ExploreFeed {
  private static dlClient: DLClient;

  async getExploreFeed(
    exploreFeedData: ExploreFeedData
  ): Promise<LMResponse<ExploreFeedResponse>> {
    try {
      const resp = await ExploreFeed.dlClient.getExploreFeed(exploreFeedData);
      const convertedResp: ExploreFeedResponse =
        ModelConverter.responseBodyParser(resp);
      return new LMResponse<ExploreFeedResponse>(convertedResp, null, true);
    } catch (error) {
      return new LMResponse<ExploreFeedResponse>(
        null,
        error.message || "An error occured",
        false
      );
    }
  }
}

export { ExploreFeed as default };
