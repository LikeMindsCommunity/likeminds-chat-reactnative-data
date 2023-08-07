interface SdkClientInfo {
  community: number;
  user: number;
  userUniqueId: string;
  uuid: string;
}

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
  member: {
    customTitle: string;
    id: number;
    imageUrl: string;
    isGuest: boolean;
    isOwner: boolean;
    name: string;
    organisationName: string | null;
    sdkClientInfo: SdkClientInfo;
    state: number;
    updatedAt: number;
    userUniqueId: string;
    uuid: string;
  };
  memberRights: MemberRight[];
  state: number;
  toolState: number;
}

export interface ProfileDataResponse {
  success: boolean;
  data: Data;
}
