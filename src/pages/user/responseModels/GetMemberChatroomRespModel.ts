interface ChatroomUser {
  id: number;
  imageUrl: string;
  name: string;
}

interface Member {
  customIntroText: string;
  customTitle: string;
  id: number;
  imageUrl: string;
  isGuest: boolean;
  isOwner: boolean;
  memberSince: string;
  memberSinceEpoch: number;
  name: string;
  organisationName: null | string;
  route: string;
  sdkClientInfo: {
    community: number;
    user: number;
    userUniqueId: string;
    uuid: string;
  };
  state: number;
  updatedAt: number;
  userUniqueId: string;
  uuid: string;
}

interface Reaction {
  member: ChatroomUser;
  reaction: string;
  updatedAt: number;
}

interface Chatroom {
  access: null;
  answerText: string;
  answersCount: number;
  attachmentCount: number;
  attachments: any[]; // Replace 'any' with the appropriate type if you know the structure of the attachments
  attachmentsUploaded: boolean;
  attendingCount: number;
  attendingStatus: boolean;
  audioCount: number;
  audios: any[]; // Replace 'any' with the appropriate type if you know the structure of the audios
  autoFollowDone: boolean;
  cardCreationTime: string;
  chatroomImageUrl: string;
  communityId: number;
  communityName: string;
  conversationUsers: ChatroomUser[];
  createdAt: string;
  customTag: string;
  date: string;
  dateEpoch: number;
  dateTime: number;
  duration: number;
  followStatus: boolean;
  hasEventRecording: boolean;
  header: string;
  id: number;
  imageCount: number;
  images: any[]; // Replace 'any' with the appropriate type if you know the structure of the images
  includeMembersLater: boolean;
  isEdited: boolean;
  isGuest: boolean;
  isPaid: boolean;
  isPending: boolean;
  isPrivate: boolean;
  isPrivateMember: boolean;
  isSecret: boolean;
  isTagged: boolean;
  member: Member;
  muteStatus: boolean;
  onlineLinkEnableBefore: number;
  onlineLinkType: null | string;
  pdf: any[]; // Replace 'any' with the appropriate type if you know the structure of the pdf
  pdfCount: number;
  pollsCount: number;
  reactions: Reaction[];
  secretChatroomLeft: boolean;
  shareLink: string;
  state: number;
  title: string;
  type: number;
  videoCount: number;
  videos: any[]; // Replace 'any' with the appropriate type if you know the structure of the videos
}

interface Data {
  chatrooms: Chatroom[];
  totalChatroomsFollowed: number;
}

export interface GetMemberResponse {
  success: boolean;
  data: Data;
}
