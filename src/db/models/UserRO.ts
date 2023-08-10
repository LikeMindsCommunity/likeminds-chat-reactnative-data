import { SDKClientInfoRO } from "./SDKClientInfoRO";

export interface UserRO {
  id: string;
  userUniqueId: string;
  imageUrl: string;
  isGuest: boolean;
  name: string;
  organizationName?: string | null;
  updatedAt: bigint;
  sdkClientInfoRO?: SDKClientInfoRO | null;
  isDeleted?: boolean | null;
  customTitle?: string | null;
  uuid: string;
}
