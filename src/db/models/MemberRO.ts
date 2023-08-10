import { SDKClientInfoRO } from "./SDKClientInfoRO";

export interface MemberRO {
  uid: string;
  id: string;
  name: string;
  imageUrl: string;
  state: number;
  customIntroText?: string | null;
  customClickText?: string | null;
  customTitle?: string | null;
  communityId?: number | null;
  isOwner: boolean;
  isGuest: boolean;
  userUniqueId: string;
  uuid: string;
  sdkClientInfoRO?: SDKClientInfoRO | null;
}
