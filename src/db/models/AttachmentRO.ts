import { AttachmentMetaRO } from "./AttachmentMetaRO";

export interface AttachmentRO {
  id: string;
  url: string;
  chatroomId: string;
  communityId: string;
  name?: string | null;
  type: string;
  index?: number | null;
  width?: number | null;
  height?: number | null;
  awsFolderPath?: string | null;
  localFilePath?: string | null;
  thumbnailUrl?: string | null;
  thumbnailAWSFolderPath?: string | null;
  thumbnailLocalFilePath?: string | null;
  metaRO?: AttachmentMetaRO | null;
  createdAt?: bigint | null;
  updatedAt?: bigint | null;
}
