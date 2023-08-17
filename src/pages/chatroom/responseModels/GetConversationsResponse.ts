import { Conversation } from "../../../shared/responseModels/Conversation";

export interface GetConversationsResponse {
  conversations?: Conversation[];
  count: number;
}
