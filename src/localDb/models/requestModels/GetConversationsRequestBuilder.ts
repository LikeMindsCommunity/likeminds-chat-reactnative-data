import { Conversation } from "src/shared/responseModels/Conversation";
import { GetConversationsType } from "./GetConversationsType";
import { GetConversationsRequest } from "./GetConversationsRequest";

class GetConversationsRequestBuilder {
  private chatroomId?: string;
  private limit?: number;
  private medianConversation?: Conversation;
  private type?: GetConversationsType;

  private constructor() {
    // Private constructor to enforce the usage of the static method
  }

  static builder(): GetConversationsRequestBuilder {
    return new GetConversationsRequestBuilder();
  }

  setChatroomId(chatroomId: string): GetConversationsRequestBuilder {
    this.chatroomId = chatroomId;
    return this;
  }

  setLimit(limit: number): GetConversationsRequestBuilder {
    this.limit = limit;
    return this;
  }

  setMedianConversation(
    medianConversation: Conversation
  ): GetConversationsRequestBuilder {
    this.medianConversation = medianConversation;
    return this;
  }

  setType(type: GetConversationsType): GetConversationsRequestBuilder {
    this.type = type;
    return this;
  }

  build(): GetConversationsRequest {
    if (!this.chatroomId || !this.limit) {
      throw new Error("ChatroomId and limit are required");
    }

    return {
      chatroomId: this.chatroomId,
      limit: this.limit,
      medianConversation: this.medianConversation,
      type: this.type,
    };
  }
}

export default GetConversationsRequestBuilder;
