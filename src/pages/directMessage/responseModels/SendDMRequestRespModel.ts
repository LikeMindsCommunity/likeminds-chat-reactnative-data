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
  memberId: number;
  pollAnswerText: string;
  reactions: any[]; // Replace 'any' with the appropriate type if you have the information about 'reactions'.
  startTime: number;
  state: number;
}

export interface SendDMRequestResponse {
  success: boolean;
  data: {
    conversation: Conversation;
  };
}
