import { GroupTag } from "src/shared/responseModels/GroupTag";
import { Member } from "../../../shared/responseModels/Member";

export interface GetTaggingListResponse {
  groupTags: GroupTag[];
  chatroomParticipants: Member[];
  communityMembers: Member[];
}
