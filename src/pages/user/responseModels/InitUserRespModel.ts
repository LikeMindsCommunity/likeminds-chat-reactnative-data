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

interface CommunitySettingRight {
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
  communitySettingRights: CommunitySettingRight[];
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
  whitelabelInfo: null | any; // Replace 'any' with the appropriate type if you know the structure
}

interface User {
  id: number;
  imageUrl: string;
  isGuest: boolean;
  name: string;
  organisationName: null | string;
  sdkClientInfo: {
    community: number;
    user: number;
    userUniqueId: string;
    uuid: string;
  };
  updatedAt: number;
  userUniqueId: string;
  uuid: string;
}

interface Data {
  access_token: string;
  app_access: boolean;
  community: Community;
  has_answers: boolean;
  refresh_token: string;
  user: User;
}

export interface InitUserResponse {
  success: boolean;
  data: Data;
}
