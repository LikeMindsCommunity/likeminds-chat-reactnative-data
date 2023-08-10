import { AttachmentRO } from "./AttachmentRO";
import { LinkRO } from "./LinkRO";
import { MemberRO } from "./MemberRO";

export interface LastConversationRO {
  id: string;
  member?: MemberRO | null;
  createdAt?: string | null;
  answer: string;
  state: number;
  attachments: AttachmentRO[];
  date?: string | null;
  deletedBy?: string | null;
  attachmentCount?: number | null;
  attachmentsUploaded?: boolean | null;
  uploadWorkerUUID?: string | null;
  createdEpoch: bigint;
  chatroomId: string;
  communityId: string;
  link?: LinkRO | null;
  deletedByMember?: MemberRO | null;
}
