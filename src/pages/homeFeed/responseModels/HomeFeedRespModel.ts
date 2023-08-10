interface MyChatroom {
  access: null;
  answerText: string;
  answersCount: number;
  attachmentCount: number;
  attachments: any[];
  attachmentsUploaded: boolean;
  attendingCount: number;
  attendingStatus: boolean;
  audioCount: number;
  audios: any[];
  autoFollowDone: boolean;
  cardCreationTime: string;
  chatroomImageUrl: string;
  communityId: number;
  communityName: string;
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
  images: any[];
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
  onlineLinkType: null;
  pdf: any[];
  pdfCount: number;
  pollsCount: number;
  reactions: any[];
  secretChatroomLeft: boolean;
  shareLink: string;
  state: number;
  title: string;
  type: number;
  videoCount: number;
  videos: any[];
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
  organisationName: null;
  route: string;
  sdkClientInfo: SDKClientInfo;
  state: number;
  updatedAt: number;
  userUniqueId: string;
  uuid: string;
}

interface SDKClientInfo {
  community: number;
  user: number;
  userUniqueId: string;
  uuid: string;
}

interface Community {
  autoApproval: boolean;
  branding: Branding;
  communitySettingRights: CommunitySettingRight[];
  feeEvent: number;
  feeMembership: number;
  feePaymentPages: number;
  gracePeriod: number;
  hideDmTab: boolean;
  id: number;
  imageUrl: string;
  isDiscoverable: boolean;
  isFreemiumCommunity: boolean;
  isPaid: boolean;
  isWhitelabel: boolean;
  membersCount: number;
  name: string;
  purpose: string;
  referralEnabled: boolean;
  subType: number;
  type: number;
  updatedAt: number;
  whitelabelInfo: null;
}

interface Branding {
  advanced: Advanced;
  basic: Basic;
}

interface Advanced {
  buttonsIconsColour: string;
  headerColour: string;
  textLinksColour: string;
}

interface Basic {
  primaryColour: string;
}

interface CommunitySettingRight {
  id: number;
  isLocked: boolean;
  isSelected: boolean;
  state: number;
  subTitle: string;
  title: string;
}

interface ConversationUser {
  id: number;
  imageUrl: string;
  name: string;
}

interface LastConversation {
  answer: string;
  attachmentCount: number;
  attachmentsUploaded: boolean;
  chatroomId: number;
  communityId: number;
  createdAt: number;
  createdEpoch: number;
  date: string;
  hasFiles: boolean;
  id: number;
  isEdited: boolean;
  member: Member;
  reactions: any[];
  state: number;
  temporaryId: string;
}

interface SecondLastConversation {
  answer: string;
  attachmentCount: number;
  attachmentsUploaded: boolean;
  chatroomId: number;
  communityId: number;
  createdAt: number;
  createdEpoch: number;
  date: string;
  hasFiles: boolean;
  id: number;
  isEdited: boolean;
  member: Member;
  reactions: any[];
  state: number;
  temporaryId: string;
}

interface Data {
  myChatrooms: MyChatroom[];
  totalChatroomCount: number;
  totalPages: number;
  totalUnseenCount: number;
  unseenChatroomCount: number;
}

export interface HomeFeedResponse {
  success: boolean;
  data: Data;
}
