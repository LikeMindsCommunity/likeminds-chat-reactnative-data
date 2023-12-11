import Realm from "realm";
import {
  FILTER_STATE_CONVERSATIONS_RO,
  ID,
  INT,
  LIST,
  STRING,
} from "../constants";
import { ConversationState } from "src/enums";

export class FilterStateConversationsRO extends Realm.Object<FilterStateConversationsRO> {
  id!: string;
  filterStateConversations?: ConversationState[];

  static schema: Realm.ObjectSchema = {
    name: FILTER_STATE_CONVERSATIONS_RO,
    properties: {
      id: STRING,
      filterStateConversations: { type: LIST, objectType: INT },
    },
    primaryKey: ID,
  };
}
