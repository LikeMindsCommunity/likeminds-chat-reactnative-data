import { Attachment } from "src/shared/responseModels/Attachment";
import { Chatroom } from "src/shared/responseModels/Chatroom";
import { Community } from "src/shared/responseModels/Community";
import { Conversation } from "src/shared/responseModels/Conversation";
import { Member } from "src/shared/responseModels/Member";
import { Poll } from "src/shared/responseModels/Poll";

export interface SyncChatroomResponse {
  userMeta: { [key: string]: Member }; // Map<string, Member> equivalent in TypeScript
  conversationMeta: { [key: string]: Conversation };
  communityMeta: { [key: string]: Community };
  chatroomsData: { [key: string]: Chatroom[] };
  convAttachmentsMeta: { [key: string]: Attachment[] };
  convPollsMeta: { [key: string]: Poll[] };
  widgets: { [key: string]: any };
}
