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
  };
  updatedAt: number;
  userUniqueId: string;
  uuid: string;
}

interface Conversation {
  allowAddOption: boolean;
  answer: string;
  attachmentCount: number;
  attachmentsUploaded: boolean;
  chatroomId: number;
  communityId: number;
  createdAt: string;
  createdEpoch: number;
  date: string;
  endTime: number;
  hasEventRecording: boolean;
  hasFiles: boolean;
  id: number;
  isAnonymous: boolean;
  isEdited: boolean;
  member: Member;
  memberId: number;
  pollAnswerText: string;
  reactions: any[]; // Replace 'any' with the appropriate type for reactions if possible
  startTime: number;
  state: number;
}

export interface PutMultimediaResponse {
  success: boolean;
  data: {
    conversation: Conversation;
  };
}
