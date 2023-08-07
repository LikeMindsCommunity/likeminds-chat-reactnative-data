interface Poll {
  id: number;
  text: string;
  isSelected: boolean;
  noVotes: number;
  percentage: number;
}

interface Conversation {
  id: number;
  answer: string;
  state: number;
  attachmentsCount: number;
  attachmentsUploaded: boolean;
  isEdited: boolean;
  createdAt: string;
  hasFiles: boolean;
  chatroomId: number;
  communityId: number;
  memberId: number;
  date: string;
  isAnonymous: boolean;
  allowAddOption: boolean;
  pollType: number;
  expiryTime: number;
  polls: Poll[];
  reactions: any[]; // Replace 'any' with the actual type if known
}

export interface PostPollConversationResponse {
  success: boolean;
  id: number;
  conversation: Conversation;
}
