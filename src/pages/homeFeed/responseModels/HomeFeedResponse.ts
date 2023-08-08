import { ChatroomResponse } from "src/shared/responseModels/Chatroom";

interface Data {
  myChatrooms: ChatroomResponse[];
  totalChatroomCount: number;
  totalPages: number;
  totalUnseenCount: number;
  unseenChatroomCount: number;
}

export interface HomeFeedResponse {
  data: Data;
}
