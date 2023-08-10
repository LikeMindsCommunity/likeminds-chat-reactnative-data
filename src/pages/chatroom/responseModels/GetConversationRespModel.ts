interface Member {
  id: number;
  imageUrl: string;
  isGuest: boolean;
  name: string;
  organisationName: string | null;
  sdkClientInfo: {
    community: number;
    user: number;
    userUniqueId: string;
    uuid: string;
  } | null;
  state: number;
  updatedAt: number;
  userUniqueId: string;
  uuid: string;
}

interface Reaction {
  member: {
    id: number;
    imageUrl: string;
    isGuest: boolean;
    name: string;
    organisationName: string | null;
    sdkClientInfo: {
      community: number;
      user: number;
      userUniqueId: string;
      uuid: string;
    };
    updatedAt: number;
    userUniqueId: string;
    uuid: string;
  };
  reaction: string;
  updatedAt: number;
}

interface Conversation {
  answer: string;
  attachmentCount: number;
  attachmentsUploaded: boolean;
  chatroomId: number;
  communityId: number;
  createdAt: string;
  createdEpoch: number;
  date: string;
  hasFiles: boolean;
  id: number;
  isEdited: boolean;
  member: Member;
  reactions: Reaction[];
  state: number;
}

export interface GetConversationResponse {
  success: boolean;
  data: {
    conversations: Conversation[];
  };
}
