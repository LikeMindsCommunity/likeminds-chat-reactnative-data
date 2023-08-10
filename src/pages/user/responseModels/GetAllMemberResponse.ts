import { Community } from "src/shared/responseModels/Community";
import { Member } from "src/shared/responseModels/Member";

export interface GetAllMembersResponse {
  community: Community;
  members: Member[];
  totalFilteredMembers: number;
  totalMembers: number;
  totalOnlyMembers: number;
  totalPendingMembers: number;
}
