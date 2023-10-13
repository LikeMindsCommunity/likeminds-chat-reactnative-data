import { Chatroom } from "src/shared/responseModels/Chatroom";

export interface FetchDMResponse {
  dmChatrooms: Chatroom[];
  totalPages: number;
}
