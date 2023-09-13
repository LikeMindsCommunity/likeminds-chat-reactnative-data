import { CommunityRO } from "../../Models/CommunityRO";
import { convertToCommunity } from "../ROConverter";
import Db from "../db";
import Realm from "realm";

// method to save the community data in realm
export function saveCommunityData(communityData: any) {
  return Realm.open(Db.getInstance()).then((realm) => {
    realm.write(() => {
      let community = convertToCommunity(communityData);
      realm.create(CommunityRO.schema.name, community, Realm.UpdateMode.All);
    });
  });
}

// To get community data from Realm
export async function getCommunityData() {
  const realm = await Realm.open(Db.getInstance());
  const communities = realm.objects(CommunityRO.schema.name);
  const communityObject = communities.map((community) => {
    const stringifiedCommunity = JSON.stringify(community);
    return {
      ...JSON.parse(stringifiedCommunity),
    };
  });
  return communityObject;
}
