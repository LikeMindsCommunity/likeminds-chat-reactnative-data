import Realm from "realm";
import { APP_CONFIG_RO, BOOLEAN } from "../constants";
import { NumberRO } from "./NumberRO";

export class AppConfigRO extends Realm.Object<AppConfigRO> {
  isGroupFeedChatroomsSynced!: boolean;
  isDmFeedChatroomsSynced!: boolean;
  filterStateConversations?: Realm.List<NumberRO>;

  static schema: Realm.ObjectSchema = {
    name: APP_CONFIG_RO,
    properties: {
      isGroupFeedChatroomsSynced: BOOLEAN,
      isDmFeedChatroomsSynced: BOOLEAN,
      filterStateConversations: "NumberRO[]",
    },
  };
}
