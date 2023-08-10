import { ChatroomRO } from "./ChatroomRO";
import { ConversationRO } from "./ConversationRO";

export interface CommunityRO {
  id: string;
  name: string;
  imageUrl?: string | null;
  membersCount?: number | null;
  updatedAt?: bigint | null;
  relationshipNeeded: boolean;
  downloadableContentTypes?: string[] | null;
  conversations: ConversationRO[];
  chatrooms: ChatroomRO[];
}
