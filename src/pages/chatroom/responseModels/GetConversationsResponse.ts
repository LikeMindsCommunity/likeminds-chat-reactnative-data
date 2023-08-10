import { Conversation } from "../../../shared/responseModels/Conversation";

export interface GetConversationsResponse {
  conversations: Conversation[] | null;
  count: number;
}
