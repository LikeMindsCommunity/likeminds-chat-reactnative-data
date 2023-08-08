import { Conversation } from "src/shared/responseModels/Conversation";

export interface PostPollConversationResponse {
  id: number;
  conversation: Conversation;
}
