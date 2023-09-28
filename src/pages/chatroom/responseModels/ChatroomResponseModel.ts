interface ChatroomActions {
  id: number;
  title: string;
}

export interface ChatroomResponseModel {
  accessWithoutSubscription: boolean;
  canAccessSecretChatroom: boolean;
  chatroomActions: ChatroomActions[];
  participantCount: number;
}
