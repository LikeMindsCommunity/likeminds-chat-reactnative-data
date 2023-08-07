interface Chatroom {
  accessWithoutSubscription: boolean;
  attachmentCount: number;
  attachments: any[];
  attachmentsUploaded: boolean;
  attended: boolean;
  attendingCount: number;
  attendingStatus: boolean;
  audioCount: number;
  audios: any[];
  autoFollowDone: boolean;
  cardCreationTime: string;
  chatroomCategory: string;
  cohorts: any[];
  communityId: number;
  communityName: string;
  createdAt: string;
  date: string;
  dateEpoch: number;
  dateTime: number;
  followStatus: boolean;
  hasBeenNamed: boolean;
  hasEventRecording: boolean;
  header: string;
  id: number;
  imageCount: number;
  images: any[];
  includeMembersLater: boolean;
  isEdited: boolean;
  isGuest: boolean;
  isPaid: boolean;
  isPending: boolean;
  isPrivate: boolean;
  isSecret: boolean;
  isTagged: boolean;
  memberCanMessage: boolean;
  memberId: number;
  muteStatus: boolean;
  onlineLinkEnableBefore: number;
  participantsCount: number;
  pdf: any[];
  pdfCount: number;
  pollsCount: number;
  state: number;
  title: string;
  type: number;
  unreadMessages: number;
  videoCount: number;
  videos: any[];
  // Additional properties specific to the secret chatroom
  secretChatroomParticipants?: number[];
  thirdPartyUniqueId?: string;
}

export interface ChatroomRespModel {
  success: boolean;
  data: {
    chatrooms: Chatroom[];
  };
}
