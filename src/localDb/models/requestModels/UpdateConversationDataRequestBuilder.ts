import { Conversation } from "../../../shared/responseModels/Conversation";
import { UpdateConversationDataRequest } from "./UpdateConversationDataRequest"

class UpdateConversationDataRequestBuilder {
  private conversation: Conversation;
  private widgets?: Record<string, any>;

  private constructor() {
    // Private constructor to enforce the usage of the static method
  }

  static builder(): UpdateConversationDataRequestBuilder {
    return new UpdateConversationDataRequestBuilder();
  }

  setConversation(data: Conversation): UpdateConversationDataRequestBuilder {
    this.conversation = data;
    return this;
  }

  setWidgets(widgets: Record<string, any>): UpdateConversationDataRequestBuilder {
    this.widgets = widgets;
    return this;
  }


  build(): UpdateConversationDataRequest {
    if (!this.conversation) {
      throw new Error("data is required");
    }

    return {
        conversation: this.conversation,
        widgets: this.widgets
    };
  }
}

export default UpdateConversationDataRequestBuilder;