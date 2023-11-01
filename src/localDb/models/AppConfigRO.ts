import Realm from "realm";
import { APP_CONFIG_RO, BOOLEAN } from "../constants";

export class AppConfigRO extends Realm.Object<AppConfigRO> {
  isGroupFeedChatroomsSynced!: boolean;
  isDmFeedChatroomsSynced!: boolean;

  static schema: Realm.ObjectSchema = {
    name: APP_CONFIG_RO,
    properties: {
      isGroupFeedChatroomsSynced: BOOLEAN,
      isDmFeedChatroomsSynced: BOOLEAN,
    },
  };
}
