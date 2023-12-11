import Realm from "realm";
import {
  FILTER_STATE_CONVERSATIONS_RO,
  ID,
  INT,
  LIST,
  STRING,
} from "../constants";

export class FilterStateConversationsRO extends Realm.Object<FilterStateConversationsRO> {
  id!: string;
  filterStateConversations?: number[];

  static schema: Realm.ObjectSchema = {
    name: FILTER_STATE_CONVERSATIONS_RO,
    properties: {
      id: STRING,
      filterStateConversations: { type: LIST, objectType: INT },
    },
    primaryKey: ID,
  };
}
