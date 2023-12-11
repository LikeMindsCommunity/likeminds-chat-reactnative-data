import { FilterStateConversationsRO } from "src/localDb/models/FilterStateConversationsRO";
import { convertToFilterStateConversationsRO } from "../ROConverter";
import Db from "../db";

// Method to set filterStateConversations
export async function setFilterStateConversations(
  filterStateConversations?: number[]
) {
  const realm = new Realm(Db.getInstance());

  try {
    const filterStateConversationsRO = convertToFilterStateConversationsRO(
      filterStateConversations
    );

    realm.write(() => {
      realm.create(
        FilterStateConversationsRO.schema.name,
        filterStateConversationsRO,
        Realm.UpdateMode.All
      );
    });
  } finally {
    realm.close();
  }
}
// Method to get filterStateConversations
export async function getFilterStateConversations(realm: Realm) {
  const filterStateConversations = realm.objects<FilterStateConversationsRO>(
    FilterStateConversationsRO.schema.name
  );
  const serializedData = JSON.parse(JSON.stringify(filterStateConversations));
  return serializedData[0];
}
