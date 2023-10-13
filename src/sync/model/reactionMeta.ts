import { Member } from "src/shared/responseModels/Member";

export interface ReactionMeta {
  id: number;
  reaction: string;
  chatroomId?: number;
  conversationId?: number;
  userId: number;
  member?: Member;
}
