interface CommunityShare {
  publicLink: string;
  privateLink: string;
  privateLinkText: string;
  privateLinkMembersDirectory: string;
  publicLinkText: string;
  privateLinkTextMembersDirectory: string;
}

export interface ShareDataResponse {
  communityShare: CommunityShare;
  success: boolean;
}
