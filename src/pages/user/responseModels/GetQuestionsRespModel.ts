interface CommunitySettingRight {
  id: number;
  isLocked: boolean;
  isSelected: boolean;
  state: number;
  subTitle: string;
  title: string;
}

interface Branding {
  advanced: {
    buttonsIconsColour: string;
    headerColour: string;
    textLinksColour: string;
  };
  basic: {
    primaryColour: string;
  };
}

interface Community {
  autoApproval: boolean;
  branding: Branding;
  communitySettingRights: CommunitySettingRight[];
  createdBy: string;
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
  managedBy: string;
  membersCount: number;
  name: string;
  purpose: string;
  referralEnabled: boolean;
  subType: number;
  type: number;
  updatedAt: number;
  whitelabelInfo: null;
}

interface Question {
  canAddOptions: boolean;
  communityId: number;
  field: boolean;
  helpText: string;
  id: number;
  isAnswerEditable: boolean;
  isCompulsory: boolean;
  isHidden: boolean;
  optional: boolean;
  questionTitle: string;
  rank: number;
  state: number;
  tag: null;
  value: string;
}

interface Data {
  community: Community;
  header: string;
  questions: Question[];
  title: string;
}

export interface GetQuestionsResponse {
  success: boolean;
  data: Data;
}
