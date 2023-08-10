import { ChatroomResponse } from "src/shared/responseModels/Chatroom";

export interface GetMemberResponse {
  chatrooms: ChatroomResponse[];
  totalChatroomsFollowed: number;
}
