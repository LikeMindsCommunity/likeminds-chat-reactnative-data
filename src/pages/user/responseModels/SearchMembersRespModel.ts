interface MemberCohort {
  cohortId: number;
  name: string;
}

interface SdkClientInfo {
  community: number;
  user: number;
  userUniqueId: string;
  uuid: string;
}

interface Member {
  clientUserUniqueId: string;
  customClickText?: string;
  customIntroText: string;
  customTitle?: string;
  id: number;
  imageUrl?: string;
  isOwner: boolean;
  memberCohorts: MemberCohort[];
  menu: { route: string; title: string }[];
  name: string;
  sdkClientInfo: SdkClientInfo;
  state: number;
  updatedAt: number;
  userUniqueId: string;
  uuid: string;
}

interface Data {
  members: Member[];
}

export interface SearchMembersResponse {
  success: boolean;
  data: Data;
}
