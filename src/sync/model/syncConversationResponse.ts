import { Attachment } from "src/shared/responseModels/Attachment";
import { Chatroom } from "src/shared/responseModels/Chatroom";
import { Community } from "src/shared/responseModels/Community";
import { Conversation } from "src/shared/responseModels/Conversation";
import { Member } from "src/shared/responseModels/Member";
import { Poll } from "src/shared/responseModels/Poll";
import { ReactionMeta } from "./reactionMeta";

export interface SyncConversationResponse {
  userMeta: { [key: string]: Member };
  communityMeta: { [key: string]: Community };
  chatroomMeta: { [key: string]: Chatroom };
  conversationsData: { [key: string]: Conversation[] };
  chatroomReactionsMeta: { [key: string]: ReactionMeta[] };
  conversationReactionsMeta: { [key: string]: ReactionMeta[] };
  conversationAttachmentsMeta: { [key: string]: Attachment[] };
  conversationPollMeta: { [key: string]: Poll[] };
}
