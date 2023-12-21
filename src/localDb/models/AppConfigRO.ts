import Realm from "realm";
import { APP_CONFIG_RO, BOOLEAN, ID, STRING } from "../constants";

export class AppConfigRO extends Realm.Object<AppConfigRO> {
  id!: string;
  isGroupFeedChatroomsSynced!: boolean;
  isDmFeedChatroomsSynced!: boolean;

  static schema: Realm.ObjectSchema = {
    name: APP_CONFIG_RO,
    properties: {
      id: STRING,
      isGroupFeedChatroomsSynced: BOOLEAN,
      isDmFeedChatroomsSynced: BOOLEAN,
    },
    primaryKey: ID,
  };
}
