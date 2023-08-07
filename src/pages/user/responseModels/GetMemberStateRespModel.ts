interface MemberRights {
  id: number;
  isLocked: boolean;
  isSelected: boolean;
  state: number;
  subTitle: string;
  title: string;
}

interface SDKClientInfo {
  community: number;
  user: number;
  userUniqueId: string;
  uuid: string;
}

interface Member {
  customTitle: string;
  id: number;
  imageUrl: string;
  isGuest: boolean;
  isOwner: boolean;
  name: string;
  organisationName: null | string;
  sdkClientInfo: SDKClientInfo;
  state: number;
  updatedAt: number;
  userUniqueId: string;
  uuid: string;
}

interface Data {
  createdAt: string;
  editRequired: boolean;
  member: Member;
  memberRights: MemberRights[];
  state: number;
  toolState: number;
}

export interface GetMemberStateResponse {
  success: boolean;
  data: Data;
}
