import { ChatroomResponse } from "src/shared/responseModels/Chatroom";

export interface FetchDMResponse {
  dmChatrooms: ChatroomResponse[];
  totalPages: number;
}
