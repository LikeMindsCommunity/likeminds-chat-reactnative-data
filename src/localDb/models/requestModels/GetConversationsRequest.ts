import { Conversation } from "src/shared/responseModels/Conversation";
import { GetConversationsType } from "./GetConversationsType";

export interface GetConversationsRequest {
  type: GetConversationsType;
  limit: number;
  medianConversation?: Conversation;
}
