import { Member } from "../../../shared/responseModels/Member";

interface GroupTag {
  description: string;
  name: string;
  route: string;
  tag: string;
  imageUrl: string;
}
export interface GetTaggingListResponse {
  groupTags: GroupTag[];
  chatroomParticipants: Member[];
  communityMembers: Member[];
}
