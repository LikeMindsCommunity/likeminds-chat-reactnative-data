import { Conversation } from "../../../shared/responseModels/Conversation";

export interface PostConversationsResponse {
  conversations: Conversation;
  id: string | null;
}
