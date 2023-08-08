interface ChatroomShare {
  creatorShareUrl: string;
  linkCreatedAt: string;
  shareUrl: string;
}

export interface ShareChatroomUrlResponse {
  success: boolean;
  data: {
    chatroomShare: ChatroomShare;
  };
}
