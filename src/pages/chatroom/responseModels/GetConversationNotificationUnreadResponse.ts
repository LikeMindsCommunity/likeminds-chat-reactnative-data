import { Attachment } from "src/shared/responseModels/Attachment";

export interface GetConversationNotificationUnreadResponse {
  communityName: string;
  chatroomName: string;
  chatroomTitle: string;
  chatroomUserName: string;
  chatroomUserImage: string;
  chatroomId: string;
  communityImage: string;
  communityId: number;
  route: string;
  chatroomUnreadConversationCount: number;
  chatroomLastConversation?: string;
  chatroomLastConversationUserName?: string;
  chatroomLastConversationUserImage?: string;
  routeChild: string;
  chatroomLastConversationUserTimestamp?: number;
  attachments?: Attachment[];
  sortKey?: string;
}
