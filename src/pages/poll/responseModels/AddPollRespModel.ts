interface Poll {
  id: number;
  member: Member;
  text: string;
  userId: number;
}

interface Member {
  id: number;
  imageUrl: string;
  isGuest: boolean;
  name: string;
  organisationName: null | string;
  sdkClientInfo: SdkClientInfo;
  updatedAt: number;
  userUniqueId: string;
  uuid: string;
}

interface SdkClientInfo {
  community: number;
  user: number;
  userUniqueId: string;
  uuid: string;
}

interface Data {
  success: boolean;
  data: {
    poll: Poll;
  };
}

export interface AddPollResponse {
  success: boolean;
  data: Data;
}
