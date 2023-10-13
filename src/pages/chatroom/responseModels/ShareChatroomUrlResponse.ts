interface ChatroomShare {
  creatorShareUrl: string;
  linkCreatedAt: string;
  shareUrl: string;
}

export interface ShareChatroomUrlResponse {
  chatroomShare: ChatroomShare;
}
