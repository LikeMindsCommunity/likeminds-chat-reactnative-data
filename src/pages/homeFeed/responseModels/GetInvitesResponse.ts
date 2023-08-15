import { Chatroom } from "src/shared/responseModels/Chatroom";
import { Member } from "src/shared/responseModels/Member";

interface UserInvite {
  chatroom: Chatroom;
  createdAt: number;
  id: number;
  inviteReceiver: Member;
  inviteSender: Member;
  inviteStatus: number;
  updatedAt: number;
}

export interface GetInvitesResponse {
  userInvites: UserInvite[];
}
