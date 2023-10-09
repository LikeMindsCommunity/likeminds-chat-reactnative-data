import { CommunityRO } from "../../models/CommunityRO";
import { convertToCommunity } from "../ROConverter";
import Db from "../db";
import Realm from "realm";

// method to save the community data in realm
export function saveCommunity(communityData: any) {
  const realm = new Realm(Db.getInstance());
  try {
    realm.write(() => {
      let community = convertToCommunity(communityData);
      realm.create(CommunityRO.schema.name, community, Realm.UpdateMode.All);
    });
  } finally {
    realm.close();
  }
}

// To get community data from Realm
export async function getCommunity() {
  const realm = new Realm(Db.getInstance());
  try {
    const communities = realm.objects(CommunityRO.schema.name);
    const communityObject = communities.map((community) => {
      const stringifiedCommunity = JSON.stringify(community);
      return {
        ...JSON.parse(stringifiedCommunity),
      };
    });
    return communityObject;
  } finally {
    realm.close();
  }
}
