import { Member } from "src/shared/responseModels/Member";

interface MemberRight {
  id: number;
  isLocked: boolean;
  isSelected: boolean;
  state: number;
  title: string;
  subTitle?: string;
}

interface Data {
  createdAt: string;
  editRequired: boolean;
  member: Member;
  memberRights: MemberRight[];
  state: number;
  toolState: number;
}

export interface ProfileDataResponse {
  data: Data;
}
