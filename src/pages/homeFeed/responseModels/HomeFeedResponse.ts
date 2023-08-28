import { Chatroom } from "src/shared/responseModels/Chatroom";

export interface HomeFeedResponse {
  myChatrooms: Chatroom[];
  totalChatroomCount: number;
  totalPages: number;
  totalUnseenCount: number;
  unseenChatroomCount: number;
}
