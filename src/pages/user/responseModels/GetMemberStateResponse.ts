import { Member } from "src/shared/responseModels/Member";

interface MemberRights {
  id: number;
  isLocked: boolean;
  isSelected: boolean;
  state: number;
  subTitle: string;
  title: string;
}

export interface GetMemberStateResponse {
  createdAt: string;
  editRequired: boolean;
  member: Member;
  memberRights: MemberRights[];
  state: number;
  toolState: number;
}
