interface CommunityBrandingAdvanced {
  buttonsIconsColour: string;
  headerColour: string;
  textLinksColour: string;
}

interface CommunityBrandingBasic {
  primaryColour: string;
}

interface CommunityBranding {
  advanced: CommunityBrandingAdvanced;
  basic: CommunityBrandingBasic;
}

interface CommunitySettingRights {
  id: number;
  isLocked: boolean;
  isSelected: boolean;
  state: number;
  subTitle: string;
  title: string;
}

interface Community {
  autoApproval: boolean;
  branding: CommunityBranding;
  communitySettingRights: CommunitySettingRights[];
  feeEvent: number;
  feeMembership: number;
  feePaymentPages: number;
  gracePeriod: number;
  hideDmTab: boolean;
  id: number;
  imageUrl: string;
  isDiscoverable: boolean;
  isFreemiumCommunity: boolean;
  isPaid: boolean;
  isWhitelabel: boolean;
  membersCount: number;
  name: string;
  purpose: string;
  referralEnabled: boolean;
  subType: number;
  type: number;
  updatedAt: number;
  whitelabelInfo: null;
}

interface Menu {
  route: string;
  title: string;
}

interface SdkClientInfo {
  community: number;
  user: number;
  userUniqueId: string;
  uuid: string;
}

interface Member {
  customIntroText: string;
  customTitle?: string;
  id: number;
  imageUrl?: string;
  isGuest: boolean;
  isOwner: boolean;
  memberSince: string;
  memberSinceEpoch: number;
  menu: Menu[];
  name: string;
  organisationName: null;
  route: string;
  sdkClientInfo: SdkClientInfo | null;
  state: number;
  updatedAt: number;
  userUniqueId: string;
  uuid: string;
}

interface Data {
  community: Community;
  members: Member[];
  totalFilteredMembers: number;
  totalMembers: number;
  totalOnlyMembers: number;
  totalPendingMembers: number;
}

export interface GetAllMembersResponse {
  success: boolean;
  data: Data;
}
