interface Member {
  id: number;
  imageUrl: string;
  isGuest: boolean;
  name: string;
  sdkClientInfo: {
    community: number;
    user: number;
    userUniqueId: string;
    uuid: string;
  };
  userUniqueId: string;
  uuid: string;
}

export interface TaggingListResponse {
  success: boolean;
  data: {
    members: Member[];
  };
}
