interface ChatroomActions {
  id: number;
  title: string;
}

export interface GetChatroomResponse {
  accessWithoutSubscription: boolean;
  canAccessSecretChatroom: boolean;
  chatroomActions: ChatroomActions[];
  participantCount: number;
}
