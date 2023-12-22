import Realm from "realm";
import {
  FILTER_CONVERSATION_STATE_RO,
  ID,
  INT,
  LIST,
  STRING,
} from "../constants";
import { ConversationState } from "src/enums";

export class FilterConversationStateRO extends Realm.Object<FilterConversationStateRO> {
  id!: string;
  filterConversationState?: ConversationState[];

  static schema: Realm.ObjectSchema = {
    name: FILTER_CONVERSATION_STATE_RO,
    properties: {
      id: STRING,
      filterConversationState: { type: LIST, objectType: INT },
    },
    primaryKey: ID,
  };
}
