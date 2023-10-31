import { ConversationRO } from "../models/ConversationRO";

export const realmDbMigration = (oldVersion: Realm, newVersion: Realm) => {
  if (oldVersion.schemaVersion == 1) {
    const oldObjects = oldVersion.objects<ConversationRO>(
      ConversationRO.schema.name
    );
    // Perform the migration by iterating through existing objects and setting the new property
    for (let i = 0; i < oldObjects.length; i++) {
      const oldObject = oldObjects[i];
      // Initialize the new property for existing objects
      const newObject = { ...oldObject, ogTags: null };
      newVersion.create(ConversationRO.schema.name, newObject);
    }
  }
};

export const DB_SCHEMA_NAME = "likeminds-chat-sdk-rn";
export const DB_SCHEMA_VERSION = 2;
