import { ChatroomResponse } from "src/shared/responseModels/Chatroom";

interface InviteReceiver {
  id: number;
  imageLink: string;
  isGuest: boolean;
  name: string;
  userUniqueId: string;
}

interface InviteSender {
  id: number;
  imageLink: string;
  isGuest: boolean;
  name: string;
  userUniqueId: string;
}

interface UserInvite {
  chatroom: ChatroomResponse;
  createdAt: number;
  id: number;
  inviteReceiver: InviteReceiver;
  inviteSender: InviteSender;
  inviteStatus: number;
  updatedAt: number;
}

export interface GetInvitesResponse {
  userInvites: UserInvite[];
}
