import { APP_CONFIG, FILTER_CONVERSATION_STATE_RO } from "../constants";
import { AppConfigRO } from "../models/AppConfigRO";
import { ConversationRO } from "../models/ConversationRO";
import { FilterConversationStateRO } from "../models/FilterConversationStateRO";

export const realmDbMigration = (oldVersion: Realm, newVersion: Realm) => {
  let oldSchemaVersion = oldVersion.schemaVersion;
  if (oldSchemaVersion == 1) {
    const oldObjects = oldVersion.objects<ConversationRO>(
      ConversationRO.schema.name
    );

    for (let i = 0; i < oldObjects.length; i++) {
      const oldObject = oldObjects[i];
      // Initialize the new property for existing objects
      const newObject = { ...oldObject, ogTags: null };
      newVersion.create(ConversationRO.schema.name, newObject);
    }

    // Increment schema version
    oldSchemaVersion++;
  }
  if (oldSchemaVersion == 2) {
    const oldObjects = oldVersion.objects<AppConfigRO>(AppConfigRO.schema.name);

    for (let i = 0; i < oldObjects.length; i++) {
      const oldObject = oldObjects[i];
      // Initialize the new property for existing objects
      const newObject = { ...oldObject, id: APP_CONFIG };
      newVersion.create(AppConfigRO.schema.name, newObject);
    }

    // Initialise new schema
    newVersion.create(
      FILTER_CONVERSATION_STATE_RO,
      FilterConversationStateRO.schema.properties
    );
    oldVersion._updateSchema(newVersion.schema);

    // Increment schema version
    oldSchemaVersion++;
  }
};

export const DB_SCHEMA_NAME = "likeminds-chat-sdk-rn";
export const DB_SCHEMA_VERSION = 3;
