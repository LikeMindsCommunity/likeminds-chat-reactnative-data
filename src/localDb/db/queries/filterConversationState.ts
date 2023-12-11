import { FilterConversationStateRO } from "src/localDb/models/FilterConversationStateRO";
import { convertToFilterConversationStateRO } from "../ROConverter";
import Db from "../db";
import { ConversationState } from "src/enums";

// Method to set filterConversationState
export async function setFilterConversationState(
  filterConversationState?: ConversationState[]
) {
  const realm = new Realm(Db.getInstance());

  try {
    const filterConversationStateRO = convertToFilterConversationStateRO(
      filterConversationState
    );

    realm.write(() => {
      realm.create(
        FilterConversationStateRO.schema.name,
        filterConversationStateRO,
        Realm.UpdateMode.All
      );
    });
  } finally {
    realm.close();
  }
}
// Method to get filterConversationState
export async function getFilterConversationState(realm: Realm) {
  const filterConversationState = realm.objects<FilterConversationStateRO>(
    FilterConversationStateRO.schema.name
  );
  const serializedData = JSON.parse(JSON.stringify(filterConversationState));
  return serializedData[0];
}
