import { ChatroomResponse } from "src/shared/responseModels/Chatroom";

export interface HomeFeedResponse {
  myChatrooms: ChatroomResponse[];
  totalChatroomCount: number;
  totalPages: number;
  totalUnseenCount: number;
  unseenChatroomCount: number;
}
