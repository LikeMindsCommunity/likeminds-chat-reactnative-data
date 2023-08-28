import { Attachment } from "src/shared/responseModels/Attachment";
import { Chatroom } from "src/shared/responseModels/Chatroom";
import { Community } from "src/shared/responseModels/Community";
import { Member } from "src/shared/responseModels/Member";

interface SearchChatroom {
  attachments: Attachment[];
  attendingStatus: boolean;
  chatroom: Chatroom;
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
