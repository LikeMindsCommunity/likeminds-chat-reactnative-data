import { Conversation } from "src/shared/responseModels/Conversation";
import { GetConversationsType } from "./GetConversationsType";

export interface GetConversationsRequest {
  chatroomId: string;
  limit: number;
  medianConversation?: Conversation;
  type?: GetConversationsType;
}
