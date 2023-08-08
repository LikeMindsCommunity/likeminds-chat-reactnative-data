import { ChatroomResponse } from "src/shared/responseModels/Chatroom";
import { Member } from "src/shared/responseModels/Member";

interface Attachment {
  // Define properties for the Attachment here
}

interface Community {
  // Define properties for the Community here
}

interface SearchChatroom {
  attachments: Attachment[];
  attendingStatus: boolean;
  chatroom: ChatroomResponse;
  community: Community;
  followStatus: boolean;
  id: number;
  isGuest: boolean;
  isTagged: boolean;
  member: Member;
  muteStatus: boolean;
  secretChatroomLeft: boolean;
  state: number;
  updatedAt: number;
  isDisabled: boolean | null;
}

export interface SearchChatroomResponse {
  chatrooms: SearchChatroom[];
}
