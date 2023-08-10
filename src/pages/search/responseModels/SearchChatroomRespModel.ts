interface Attachment {
  index: number;
  type: string;
  url: string;
}

interface Chatroom {
  attachmentCount: number;
  attachmentsUploaded: boolean;
  audioCount: number;
  chatroomWithUser: Record<string, any>; // Replace 'any' with the appropriate type if you know the structure
  createdAt: number;
  deviceId: null | string;
  header: string;
  id: number;
  imageCount: number;
  isDeleted: boolean;
  isPending: boolean;
  isPinned: boolean;
  isPrivate: boolean;
  isSecret: boolean;
  pdfCount: number;
  platform: null | string;
  title: string;
  type: number;
  videoCount: number;
}

interface Community {
  id: number;
  name: string;
}

interface MemberProfile {
  name: string;
}

interface Member {
  id: number;
  profile: MemberProfile;
}

interface ChatroomData {
  attachments: Attachment[];
  attendingStatus: boolean;
  chatroom: Chatroom;
  community: Community;
  followStatus: boolean;
  id: number;
  isGuest: boolean;
  isTagged: boolean;
  member: Member;
  muteStatus: boolean;
  secretChatroomLeft: boolean;
  state: number;
  updatedAt: number;
}

interface Data {
  chatrooms: ChatroomData[];
}

export interface SearchChatroomResponse {
  success: boolean;
  data: Data;
}
